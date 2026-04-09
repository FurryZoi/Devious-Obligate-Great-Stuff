import { ModStorage, modStorage, SavedItem, DeviousPadlockProfile, syncStorage } from "./storage";
import { colorsEqual, getNickname, getPlayer, MOD_DATA, waitFor } from "zois-core";
import { callOriginal, hookFunction, HookPriority } from "zois-core/modsApi";
import { messagesManager } from "zois-core/messaging";
import { getCurrentSubscreen, setSubscreen } from "zois-core/ui";
import deviousPadlockImage from "@/images/devious-padlock.png";
import { cloneDeep, get, isEqual } from "lodash-es";
import { DeviousPadlockSettingsSubscreen } from "@/subscreens/deviousPadlockSettingsSubscreen";
import { remoteControlIsInteracting } from "./remoteControl";
import { smartGetItemName } from "zois-core/wardrobe";
import { SyncPadlockMessageDto } from "@/dto/syncPadlockMessageDto";
import { UpdatePadlockMessageDto } from "@/dto/updatePadlockMessageDto";

export const deviousPadlock: AssetDefinition.Item = {
	Effect: [],
	Extended: true,
	IsLock: true,
	Name: "DeviousPadlock",
	Time: 10,
	Value: 70,
	Wear: false,
	RemoveTime: 1000,
	DynamicDescription(C) { return "Devious Padlock" },
};

export enum BasePadlock {
	EXCLUSIVE = "ExclusivePadlock",
	LOVERS = "LoversPadlock",
	OWNER = "OwnerPadlock",
};

export enum PutPadlockMinimumRole {
	PUBLIC = 3,
	FRIEND = 0,
	WHITELIST = 1,
	LOVER = 2,
	OWNER = 4
};

export enum KeyHolderMinimumRole {
	EVERYONE_EXCEPT_WEARER = 0,
	FRIEND = 4,
	WHITELIST = 5,
	FAMILY = 1,
	LOVER = 2,
	OWNER = 3
};

export interface DeviousPadlockUpdateData {
	baseLock?: DeviousPadlockSettings["baseLock"]
	minimumRole?: DeviousPadlockSettings["minimumRole"]
	memberNumbers?: DeviousPadlockSettings["memberNumbers"]
	note?: DeviousPadlockSettings["note"]
	blockedCommands?: DeviousPadlockSettings["blockedCommands"]
	unlockTime?: DeviousPadlockSettings["unlockTime"]
	combinationToLock?: {
		type: "PIN-Code" | "password"
		value: string
	}
	combinationToUnlock?: string
};

export interface DeviousPadlockSettings {
	item: SavedItem
	owner: number
	baseLock?: BasePadlock
	minimumRole?: KeyHolderMinimumRole
	memberNumbers?: number[]
	note?: string
	blockedCommands?: string[]
	unlockTime?: string
	combination?: {
		type: "PIN-Code" | "password"
		hash: string
	}
}

let deviousPadlockTriggerCooldown: {
	count: number,
	firstTriggerTime: number,
	state: boolean
} = {
	count: 0,
	firstTriggerTime: Date.now(),
	state: false
};

const MAX_TRIGGER_COUNT = 12;
const MINIMUM_FIRST_TRIGGER_INTERVAL = 1000 * 14;
const COOLDOWN_TIME = 1000 * 60 * 2;


function createDeviousPadlock(): void {
	AssetFemale3DCG.forEach((ele) => {
		if (ele.Group === "ItemMisc") {
			ele.Asset.push(deviousPadlock);
		}
	});

	const assetGroup = AssetGroupGet("Female3DCG", "ItemMisc");
	if (!assetGroup) {
		throw new Error('Unable to find ItemMisc group?');
	}
	AssetAdd(assetGroup, deviousPadlock, AssetFemale3DCGExtended);
	InventoryAdd(Player, deviousPadlock.Name, "ItemMisc");
}

function getSavedItemData(item: Item): SavedItem {
	return cloneDeep({
		name: item.Asset.Name,
		color: item.Color,
		craft: item.Craft,
		property: item.Property
	});
}

export function registerDeviousPadlockInModStorage(group: AssetGroupItemName, ownerId: number): void {
	const currentItem = InventoryGet(Player, group);
	if (!currentItem) return;
	const lockDef: DeviousPadlockSettings = {
		item: getSavedItemData(currentItem),
		owner: ownerId,
	};
	const lockedBy = currentItem?.Property?.LockedBy;
	if (lockedBy && lockedBy !== BasePadlock.EXCLUSIVE && Object.values(BasePadlock).includes(lockedBy as BasePadlock)) {
		lockDef.baseLock = lockedBy as BasePadlock;
		lockDef.minimumRole = basePadlockMinimumRole(lockDef.baseLock);
	}
	modStorage.deviousPadlock.itemGroups ??= {};
	modStorage.deviousPadlock.itemGroups[group] = lockDef;
	syncStorage();
}

export async function inspectDeviousPadlock(): Promise<void> {
	const screen = ["Character", "InspectDeviousPadlock"] as unknown as ScreenSpecifier;
	await CommonSetScreen(...screen);
	DialogLeave();
}

function isFriend(a: Character, b: Character) {
	return a.IsPlayer() && a.HasOnFriendlist(b) || b.IsPlayer() && b.HasOnFriendlist(a);
}

function isInFamilyOfCharacter(a: Character, b: Character) {
	return a.IsInFamilyOfMemberNumber(b.MemberNumber!);
}

export function canUseBasePadlock(target1: Character, target2: Character, padlockOwner: number, baseLock: BasePadlock): boolean {
	if (target1.MemberNumber !== padlockOwner) return false;

	/*
		NOTE:
		We handle the special case of BlockLoverLockOwner on changePadlockConfigurations rather than here,
		both due to easier LogQuery handling and to ensure that we don't accidentally restrict owners from
		getting to the owner padlock (in the inspect subscreen) as a result of the intermediary lovers padlock
		being disabled for them, preventing back/next navigation.

		We also handle Block*LockSelf in changePadlockConfigurations as well, though solely for the aforementioned
		ease of handling.
	*/
	if (baseLock === BasePadlock.EXCLUSIVE) return true;
	if (baseLock === BasePadlock.LOVERS) return (
		(target1.MemberNumber === target2.MemberNumber && target2.Lovership.length > 0) ||
		target1.IsLoverOfCharacter(target2) || target2.IsOwnedByCharacter(target1)
	)
	if (baseLock === BasePadlock.OWNER) return (
		(target1.MemberNumber === target2.MemberNumber && target2.Ownership != null) ||
		target2.IsOwnedByCharacter(target1)
	)
	return false;
}

export function basePadlockMinimumRole(baseLock: BasePadlock, currentMinimumRole?: KeyHolderMinimumRole): KeyHolderMinimumRole {
	if (baseLock === BasePadlock.LOVERS) {
		if (currentMinimumRole === KeyHolderMinimumRole.OWNER) return currentMinimumRole;
		return KeyHolderMinimumRole.LOVER;
	}
	if (baseLock === BasePadlock.OWNER) return KeyHolderMinimumRole.OWNER;
	// Default (includes BasePadlock.EXCLUSIVE)
	return currentMinimumRole ?? KeyHolderMinimumRole.EVERYONE_EXCEPT_WEARER;
}

export function canPutDeviousPadlock(groupName: AssetGroupItemName, target1: Character, target2: Character): boolean {
	let storage: ModStorage;
	if (target2.IsPlayer()) storage = modStorage;
	else {
		if (!target2.DOGS) return false;
		storage = target2.DOGS;
	}
	if (!storage?.deviousPadlock?.state) return false;
	const minimumRole = storage?.deviousPadlock?.putMinimumRole ?? PutPadlockMinimumRole.PUBLIC;
	if (target1.MemberNumber === target2.MemberNumber) return true;
	if (minimumRole === PutPadlockMinimumRole.PUBLIC) return true;
	if (minimumRole === PutPadlockMinimumRole.FRIEND) return (
		isFriend(target1, target2) ||
		target2.HasOnWhitelist(target1) ||
		isInFamilyOfCharacter(target1, target2) || target1.IsLoverOfCharacter(target2) ||
		target2.IsOwnedByCharacter(target1)
	);
	if (minimumRole === PutPadlockMinimumRole.WHITELIST) return (
		target2.HasOnWhitelist(target1) ||
		isInFamilyOfCharacter(target1, target2) || target1.IsLoverOfCharacter(target2) ||
		target2.IsOwnedByCharacter(target1)
	);
	if (minimumRole === PutPadlockMinimumRole.LOVER) return (
		target1.IsLoverOfCharacter(target2) || target2.IsOwnedByCharacter(target1)
	);
	if (minimumRole === PutPadlockMinimumRole.OWNER) return target2.IsOwnedByCharacter(target1);
	return false;
}

export function hasKeyToPadlock(groupName: AssetGroupItemName, target1: Character, target2: Character): boolean {
	if (!target1.CanInteract()) return false;
	if (!target2.IsPlayer() && !target2.DOGS) return false;
	const storage = target2.IsPlayer() ? modStorage : target2.DOGS;
	if (!storage) return false;
	const owner = storage.deviousPadlock.itemGroups?.[groupName]?.owner
	const minimumRole = (storage.deviousPadlock.itemGroups?.[groupName]?.minimumRole ?? KeyHolderMinimumRole.EVERYONE_EXCEPT_WEARER);
	const memberNumbers = storage.deviousPadlock.itemGroups?.[groupName]?.memberNumbers ?? [];
	if (target1.MemberNumber === owner || target1.MemberNumber !== undefined && memberNumbers.includes(target1.MemberNumber)) return true;
	if (minimumRole === KeyHolderMinimumRole.EVERYONE_EXCEPT_WEARER) return target1.MemberNumber !== target2.MemberNumber;
	if (minimumRole === KeyHolderMinimumRole.FRIEND) return (
		isFriend(target1, target2) ||
		target2.HasOnWhitelist(target1) ||
		isInFamilyOfCharacter(target1, target2) || target1.IsLoverOfCharacter(target2) ||
		target2.IsOwnedByCharacter(target1)
	);
	if (minimumRole === KeyHolderMinimumRole.WHITELIST) return (
		target2.HasOnWhitelist(target1) ||
		isInFamilyOfCharacter(target1, target2) || target1.IsLoverOfCharacter(target2) ||
		target2.IsOwnedByCharacter(target1)
	);
	if (minimumRole === KeyHolderMinimumRole.FAMILY) return (
		isInFamilyOfCharacter(target1, target2) || target1.IsLoverOfCharacter(target2) ||
		target2.IsOwnedByCharacter(target1)
	);
	if (minimumRole === KeyHolderMinimumRole.LOVER) return target1.IsLoverOfCharacter(target2) || target2.IsOwnedByCharacter(target1);
	if (minimumRole === KeyHolderMinimumRole.OWNER) return target2.IsOwnedByCharacter(target1);
	return true;
}

export function canSetKeyHolderMinimumRole(target1: Character, target2: Character, minimumRole: KeyHolderMinimumRole): boolean {
	if (target1.MemberNumber === target2.MemberNumber) return true;
	if (minimumRole === KeyHolderMinimumRole.EVERYONE_EXCEPT_WEARER) return true;
	if (minimumRole === KeyHolderMinimumRole.FRIEND) return (
		isFriend(target1, target2) ||
		target2.HasOnWhitelist(target1) ||
		isInFamilyOfCharacter(target1, target2) || target1.IsLoverOfCharacter(target2) ||
		target2.IsOwnedByCharacter(target1)
	);
	if (minimumRole === KeyHolderMinimumRole.WHITELIST) return (
		target2.HasOnWhitelist(target1) ||
		isInFamilyOfCharacter(target1, target2) || target1.IsLoverOfCharacter(target2) ||
		target2.IsOwnedByCharacter(target1)
	);
	if (minimumRole === KeyHolderMinimumRole.FAMILY) return (
		isInFamilyOfCharacter(target1, target2) || target1.IsLoverOfCharacter(target2) ||
		target2.IsOwnedByCharacter(target1)
	);
	if (minimumRole === KeyHolderMinimumRole.LOVER) return target1.IsLoverOfCharacter(target2) || target2.IsOwnedByCharacter(target1);
	if (minimumRole === KeyHolderMinimumRole.OWNER) return target2.IsOwnedByCharacter(target1);
	return false;
}

export function getPadlockSettings(target: Character, groupName: AssetGroupItemName): DeviousPadlockSettings | null {
	if (target.IsPlayer()) {
		modStorage.deviousPadlock.itemGroups ??= {};
		if (!modStorage.deviousPadlock.itemGroups[groupName]) return null;
		if (isItemGroupSynced(target, groupName)) {
			return {
				...getSyncConfigOfItemGroup(target, groupName),
				item: modStorage.deviousPadlock.itemGroups[groupName].item,
				owner: modStorage.deviousPadlock.itemGroups[groupName].owner
			}
		}
		return modStorage.deviousPadlock.itemGroups[groupName];
	}
	if (!target.DOGS?.deviousPadlock?.itemGroups?.[groupName]) return null;
	if (isItemGroupSynced(target, groupName)) {
		return {
			...getSyncConfigOfItemGroup(target, groupName),
			item: target.DOGS.deviousPadlock.itemGroups[groupName].item,
			owner: target.DOGS.deviousPadlock.itemGroups[groupName].owner
		}
	}
	return target.DOGS.deviousPadlock.itemGroups[groupName];
}

export function getPadlocksAmount(target: Character) {
	return target.Appearance.reduce((count, item) => {
		if (item.Property?.Name === deviousPadlock.Name) return count + 1;
		return count;
	}, 0);
}

export async function validatePadlockSettingsUpdate(from: Character, settings: DeviousPadlockUpdateData, padlockGroupName: AssetGroupItemName): Promise<{
	valid: true
	data: DeviousPadlockUpdateData
} | {
	valid: false
}> {
	if (!modStorage.deviousPadlock?.itemGroups?.[padlockGroupName]) return { valid: false };
	if (typeof modStorage.deviousPadlock.itemGroups[padlockGroupName].combination?.hash === "string" && typeof settings.combinationToUnlock === "string") {
		if (
			!hasKeyToPadlock(padlockGroupName, from, Player) &&
			(
				await hashCombination(settings.combinationToUnlock) !==
				modStorage.deviousPadlock.itemGroups[padlockGroupName].combination?.hash
			)
		) return { valid: false };
	} else {
		if (!hasKeyToPadlock(padlockGroupName, from, Player)) return { valid: false };
	}
	const data: DeviousPadlockUpdateData = {};
	if (settings.combinationToLock) {
		if (
			(
				settings.combinationToLock.type === "PIN-Code" &&
				settings.combinationToLock.value.length === 6 &&
				Number.isInteger(parseInt(settings.combinationToLock.value))
			) ||
			(
				settings.combinationToLock.type === "password" &&
				settings.combinationToLock.value.trim() !== "" &&
				settings.combinationToLock.value.length <= 25
			)
		) {
			data.combinationToLock = settings.combinationToLock;
		}
	}
	if (settings.minimumRole !== undefined && canSetKeyHolderMinimumRole(from, Player, settings.minimumRole)) {
		data.minimumRole = settings.minimumRole;
	}
	if (settings.memberNumbers) {
		data.memberNumbers = settings.memberNumbers;
	}
	if (settings.unlockTime) {
		data.unlockTime = settings.unlockTime.trim();
	}
	if (settings.combinationToLock) {
		data.combinationToUnlock
	}
	if (settings.baseLock && canUseBasePadlock(from, Player, modStorage.deviousPadlock.itemGroups[padlockGroupName].owner, settings.baseLock)) {
		if (
			!(settings.baseLock === BasePadlock.LOVERS && Player.IsOwnedByCharacter(from) && LogQuery("BlockLoverLockOwner", "LoverRule")) &&
			!(Player.MemberNumber === from.MemberNumber && (
				(settings.baseLock === BasePadlock.OWNER && LogQuery("BlockOwnerLockSelf", "OwnerRule")) ||
				(settings.baseLock === BasePadlock.LOVERS && LogQuery("BlockLoverLockSelf", "LoverRule"))
			))
		) data.baseLock = settings.baseLock;
	}
	if (settings.note) {
		data.note = settings.note;
	}
	if (settings.blockedCommands) {
		data.blockedCommands = settings.blockedCommands
			.map((c) => c.trim())
			.filter((c) => c.startsWith("/") && c.length > 1);
	}
	return { valid: true, data };
}

export async function changePadlockSettings(
	groupName: AssetGroupItemName,
	config: DeviousPadlockUpdateData
): Promise<void> {
	if (!modStorage.deviousPadlock.itemGroups?.[groupName]) return;
	console.log("Changing padlock settings with config", config);
	if (config.unlockTime) {
		if (config.unlockTime === "") delete modStorage.deviousPadlock.itemGroups[groupName].unlockTime;
		else modStorage.deviousPadlock.itemGroups[groupName].unlockTime = config.unlockTime;
	}
	if (config.combinationToLock) {
		if (config?.combinationToLock?.value.trim() === "") {
			delete modStorage.deviousPadlock.itemGroups[groupName].combination;
		} else {
			modStorage.deviousPadlock.itemGroups[groupName].combination = {
				type: config.combinationToLock.type,
				hash: await hashCombination(config.combinationToLock.value)
			};
		}
	}
	if (config.baseLock) {
		const item = InventoryGet(Player, groupName);
		if (item && item.Property?.LockedBy !== config.baseLock) {
			item.Property ??= {};
			item.Property.LockedBy = config.baseLock;
			item.Property.LockMemberNumber = modStorage.deviousPadlock.itemGroups[groupName].owner;
			const successful = ValidationSanitizeLock(Player, item);
			if (successful) {
				modStorage.deviousPadlock.itemGroups[groupName].baseLock = config.baseLock;
				ChatRoomCharacterUpdate(Player);
			}
		}
	}
	if (config.note) {
		modStorage.deviousPadlock.itemGroups[groupName].note = config.note;
	}
	if (config.blockedCommands) {
		modStorage.deviousPadlock.itemGroups[groupName].blockedCommands = config.blockedCommands;
	}
	if (config.memberNumbers) modStorage.deviousPadlock.itemGroups[groupName].memberNumbers = config.memberNumbers;
	if (config.minimumRole !== undefined) modStorage.deviousPadlock.itemGroups[groupName].minimumRole = config.minimumRole;
	unsyncItemGroups([groupName], false);
	syncStorage();
}

function onAppearanceChange(target1: Character, target2: Character): void {
	if (target2.IsPlayer()) checkDeviousPadlocks(target1);
}

function checkDeviousPadlocks(target: Character): void {
	if (modStorage.deviousPadlock.itemGroups) {
		let padlocksChangedItemNames: string[] = [];
		let pushChatRoom: boolean = false;
		for (const group in modStorage.deviousPadlock.itemGroups ?? {}) {
			const groupName = group as AssetGroupItemName;
			const currentItem = InventoryGet(Player, groupName);
			if (!currentItem) continue;
			const savedItem = modStorage.deviousPadlock.itemGroups[groupName]!.item;
			const owner = modStorage.deviousPadlock.itemGroups[groupName]!.owner;
			const basePadlock = modStorage.deviousPadlock.itemGroups[groupName]!.baseLock ?? BasePadlock.EXCLUSIVE;

			const property = currentItem?.Property;
			const padlockChanged = !(
				property?.Name === deviousPadlock.Name
				&& property?.LockedBy === basePadlock
			);

			const ignoredProperties = [
				"OrgasmCount", "RuinedOrgasmCount", "TimeSinceLastOrgasm",
				"TimeWorn", "TriggerCount"
			];

			const getValidProperties = (properties: ItemProperties | undefined) => {
				if (!CommonIsObject(properties)) return properties;
				const propertiesCopy = { ...properties };
				ignoredProperties.forEach((p) => {
					delete (propertiesCopy as Record<any, any>)[p];
				});
				return propertiesCopy;
			}

			const getIgnoredProperties = (properties: ItemProperties | undefined) => {
				if (!CommonIsObject(properties)) return properties;
				const propertiesCopy = { ...properties };
				Object.keys(propertiesCopy).forEach((p) => {
					if (!ignoredProperties.includes(p)) {
						delete (propertiesCopy as Record<any, any>)[p];
					}
				});
				return propertiesCopy;
			}

			if (
				currentItem?.Asset?.Name !== savedItem.name ||
				!colorsEqual(currentItem?.Color, savedItem.color) ||
				JSON.stringify(currentItem?.Craft) !== JSON.stringify(savedItem.craft) ||
				JSON.stringify(getValidProperties(currentItem?.Property)) !== JSON.stringify(getValidProperties(savedItem.property))
			) {
				if (hasKeyToPadlock(groupName, target, Player)) {
					if (padlockChanged) {
						delete modStorage.deviousPadlock.itemGroups[groupName];
						unsyncItemGroups([groupName], false);
					} else {
						modStorage.deviousPadlock.itemGroups[groupName]!.item = getSavedItemData(currentItem);
					}
					syncStorage();
				} else if (!deviousPadlockTriggerCooldown.state) {
					const savedAsset = AssetGet(Player.AssetFamily, groupName, savedItem.name)
					if (!savedAsset) continue;

					const difficulty = savedAsset.Difficulty;
					let newItem = InventoryWear(Player, savedItem.name, groupName, savedItem.color, difficulty, Player.MemberNumber, savedItem.craft);
					if (!newItem) return;
					newItem.Property = {
						...getValidProperties(savedItem.property),
						...getIgnoredProperties(currentItem?.Asset?.Name === savedItem.name ? currentItem.Property : savedItem.property)
					};
					if (newItem.Property.Name !== deviousPadlock.Name) newItem.Property.Name = deviousPadlock.Name;
					if (newItem.Property.LockedBy !== basePadlock) newItem.Property.LockedBy = basePadlock;
					if (newItem.Property.LockMemberNumber !== owner) newItem.Property.LockMemberNumber = owner;
					ValidationSanitizeProperties(Player, newItem);
					ValidationSanitizeLock(Player, newItem);
					modStorage.deviousPadlock.itemGroups[groupName]!.item = getSavedItemData(newItem);
					if (padlockChanged) padlocksChangedItemNames.push(newItem.Craft?.Name ? newItem.Craft.Name : newItem.Asset.Description);
					pushChatRoom = true;
					syncStorage();
				}
			} else if (JSON.stringify(getIgnoredProperties(currentItem?.Property)) !== JSON.stringify(getIgnoredProperties(savedItem.property))) {
				modStorage.deviousPadlock.itemGroups[groupName]!.item = getSavedItemData(currentItem);
				syncStorage();
			}
		}

		if (ServerPlayerIsInChatRoom() && pushChatRoom) {
			ChatRoomCharacterUpdate(Player);
			if (padlocksChangedItemNames.length === 1) {
				messagesManager.sendAction(`Devious padlock appears again on ${getNickname(Player)}'s ${padlocksChangedItemNames[0]}`);
			}
			if (padlocksChangedItemNames.length > 1) {
				messagesManager.sendAction(`Devious padlock appears again on ${getNickname(Player)}'s: ${padlocksChangedItemNames.join(", ")}`);
			}
			if (deviousPadlockTriggerCooldown.count === 0) deviousPadlockTriggerCooldown.firstTriggerTime = Date.now();
			deviousPadlockTriggerCooldown.count++;
			if (deviousPadlockTriggerCooldown.count > MAX_TRIGGER_COUNT) {
				deviousPadlockTriggerCooldown.count = 0;
				if ((Date.now() - deviousPadlockTriggerCooldown.firstTriggerTime) < MINIMUM_FIRST_TRIGGER_INTERVAL) {
					deviousPadlockTriggerCooldown.state = true;
					messagesManager.sendAction(`[COOLDOWN] Devious padlocks were disabled for ${COOLDOWN_TIME / (1000 * 60)} minutes, ask any keyholder to remove padlock which conflicts. Please disable DOGS mod if this message repeats`);
					setTimeout(() => {
						deviousPadlockTriggerCooldown.state = false;
						checkDeviousPadlocks(Player);
					}, COOLDOWN_TIME);
				}
			}
		}
	}

	Player.Appearance.forEach((item) => {
		if (
			item.Property?.Name === deviousPadlock.Name &&
			Object.values(BasePadlock).includes(item.Property?.LockedBy as BasePadlock)
		) {
			if (
				!modStorage.deviousPadlock.itemGroups ||
				!modStorage.deviousPadlock.itemGroups[item.Asset.Group.Name as AssetGroupItemName]
			) {
				if (!canPutDeviousPadlock(item.Asset.Group.Name as AssetGroupItemName, target, Player) || deviousPadlockTriggerCooldown.state) {
					InventoryUnlock(Player, item.Asset.Group.Name as AssetGroupItemName);
					ChatRoomCharacterUpdate(Player);
				} else {
					registerDeviousPadlockInModStorage(item.Asset.Group.Name as AssetGroupItemName, target.MemberNumber!);
				}
			}
		}
	});
}

function checkDeviousPadlocksTimers(): void {
	if (!modStorage.deviousPadlock.itemGroups || deviousPadlockTriggerCooldown.state) return;
	let didUnlock = false;
	for (const _groupName in modStorage.deviousPadlock.itemGroups ?? {}) {
		const groupName = _groupName as AssetGroupItemName;
		const unlockTime = modStorage.deviousPadlock.itemGroups[groupName]!.unlockTime;
		const item = InventoryGet(Player, groupName);
		if (!item) continue;
		if (unlockTime && new Date(unlockTime) < new Date()) {
			const itemName = smartGetItemName(item);
			messagesManager.sendAction(`The devious padlock opens on ${getNickname(Player)}'s ${itemName} with loud click`);
			delete modStorage.deviousPadlock.itemGroups[groupName];
			unsyncItemGroups([groupName], false);
			syncStorage();
			InventoryUnlock(Player, groupName);
			didUnlock = true;
		}
	}
	// Only do that once instead of spamming it for each group
	if (didUnlock) {
		ChatRoomCharacterUpdate(Player);
	}
}

export async function hashCombination(combination: string): Promise<string> {
	const data = new TextEncoder().encode(combination);
	const hashBuffer = await crypto.subtle.digest("SHA-256", data);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
	return hashHex;
}

export function syncPadlockConfigurationWithItemGroups(groupNames: AssetGroupItemName[], config: Omit<DeviousPadlockSettings, "item" | "owner">, push = true) {
	unsyncItemGroups(groupNames, false);
	modStorage.deviousPadlock.synced ??= [];
	const sameConfig = modStorage.deviousPadlock.synced.find(({ groupNames, ...rest }) => isEqual(rest, config));
	if (sameConfig) {
		sameConfig.groupNames.push(...groupNames);
	} else {
		modStorage.deviousPadlock.synced.push({
			...config,
			groupNames
		});
	}
	if (push) syncStorage();
}

export function unsyncItemGroups(groupNames: AssetGroupItemName[], push = true) {
	if (!modStorage.deviousPadlock.synced) return;
	modStorage.deviousPadlock.synced = modStorage.deviousPadlock.synced.map((config) => {
		config.groupNames ??= [];
		config.groupNames = config.groupNames.filter((g) => !groupNames.includes(g));
		return config;
	}).filter((config) => config.groupNames.length > 0);
	if (push) syncStorage();
}

export function isItemGroupSynced(target: Character, groupName: AssetGroupItemName): boolean {
	if (target.IsPlayer()) {
		if (!modStorage.deviousPadlock.synced) return false;
		return modStorage.deviousPadlock.synced.some((config) => config.groupNames?.includes(groupName));
	}
	if (!target.DOGS?.deviousPadlock?.synced) return false;
	return target.DOGS.deviousPadlock.synced.some((config) => config.groupNames?.includes(groupName));
}

export function getSyncConfigOfItemGroup(target: Character, groupName: AssetGroupItemName): Omit<DeviousPadlockSettings, "item" | "owner"> | null {
	if (target.IsPlayer()) {
		if (!modStorage.deviousPadlock.synced) return null;
		const config = modStorage.deviousPadlock.synced.find((c) => c.groupNames.includes(groupName));
		if (!config) return null;
		const { groupNames, ...syncConfig } = config;
		return syncConfig;
	}
	if (!target.DOGS?.deviousPadlock?.synced) return null;
	const config = target.DOGS.deviousPadlock.synced.find((c) => c.groupNames.includes(groupName));
	if (!config) return null;
	const { groupNames, ...syncConfig } = config;
	return syncConfig;
}

export function isItemGroupSyncedWithConfig(
	target: Character,
	groupName: AssetGroupItemName,
	config: Omit<DeviousPadlockSettings, "item" | "owner">
): boolean {
	if (target.IsPlayer()) {
		if (!modStorage.deviousPadlock.synced) return false;
		return modStorage.deviousPadlock.synced.some((c) => {
			const { groupNames, ..._c } = c;
			return groupNames?.includes(groupName) && isEqual(_c, config);
		});
	}
	if (!target.DOGS?.deviousPadlock?.synced) return false;
	return target.DOGS.deviousPadlock.synced.some((c) => {
		const { groupNames, ..._c } = c;
		return groupNames?.includes(groupName) && isEqual(_c, config);
	});
}

export function loadDeviousPadlock(): void {
	createDeviousPadlock();
	let needsSync = false;
	Object.keys(modStorage.deviousPadlock.itemGroups ?? {}).forEach((g) => {
		const groupName = g as AssetGroupItemName;
		const itemGroup = modStorage.deviousPadlock.itemGroups![groupName]!;
		if (
			itemGroup.baseLock === BasePadlock.LOVERS &&
			Player.Lovership.length === 0
		) {
			delete modStorage.deviousPadlock.itemGroups![groupName];
			unsyncItemGroups([groupName], false);
			syncStorage();
			return;
		}
		if (
			itemGroup.baseLock === BasePadlock.OWNER &&
			Player.IsOwned() === false
		) {
			delete modStorage.deviousPadlock.itemGroups![groupName];
			unsyncItemGroups([groupName], false);
			syncStorage();
			return;
		}
		const appearanceItem = ServerBundledItemToAppearanceItem(Player.AssetFamily, {
			Name: itemGroup.item.name,
			Color: itemGroup.item.color,
			Craft: itemGroup.item.craft,
			Property: itemGroup.item.property,
			Group: groupName
		});
		if (!appearanceItem) return;
		const changed = ValidationSanitizeProperties(Player, appearanceItem);
		if (changed) {
			modStorage.deviousPadlock.itemGroups![groupName]!.item = getSavedItemData(appearanceItem);
			needsSync = true;
		}
	});
	if (needsSync) {
		syncStorage();
	}
	checkDeviousPadlocks(Player);
	setInterval(checkDeviousPadlocksTimers, 1000);


	window.InspectDeviousPadlockBackground = "Sheet";
	window.InspectDeviousPadlockLoad = async () => {
		if (!CurrentCharacter || !CurrentCharacter.FocusGroup) return;
		setSubscreen(
			new DeviousPadlockSettingsSubscreen({
				mode: "inspect-padlock",
				itemGroup: CurrentCharacter.FocusGroup,
				target: CurrentCharacter
			})
		);
	};
	window.InspectDeviousPadlockRun = () => {
		getCurrentSubscreen().run?.();
	};
	window.InspectDeviousPadlockClick = () => {
		getCurrentSubscreen().click?.();
	};

	ServerPlayerChatRoom.register({
		screen: "InspectDeviousPadlock" as ScreenName,
		callback: () => getCurrentSubscreen() instanceof DeviousPadlockSettingsSubscreen
	});

	messagesManager.onPacket("changePadlockSettings", UpdatePadlockMessageDto, async (data: UpdatePadlockMessageDto, sender) => {
		const result = await validatePadlockSettingsUpdate(sender, data.config, data.groupName);
		if (!result.valid) {
			console.warn("DOGS", "Ignored invalid padlock update packet:", data);
			return;
		}
		changePadlockSettings(data.groupName, result.data);
		const itemName = smartGetItemName(InventoryGet(Player, data.groupName)!);
		messagesManager.sendAction(
			`${getNickname(sender)} changed devious padlock's configurations on ${getNickname(Player)}'s ${itemName}`
		);
	});

	messagesManager.onPacket(
		"syncPadlockConfigurations",
		SyncPadlockMessageDto,
		async (data: SyncPadlockMessageDto, sender) => {
			for (const groupName of data.groupNames) {
				const result = await validatePadlockSettingsUpdate(sender, data.settings, groupName);
				if (!result.valid) data.groupNames.splice(data.groupNames.indexOf(groupName), 1);
			}
			syncPadlockConfigurationWithItemGroups(data.groupNames, data.settings);
		}
	);

	messagesManager.onPacket("removePadlock", async (data, sender) => {
		const itemGroups = (modStorage.deviousPadlock.itemGroups ??= {});
		const groupName = data.groupName as AssetGroupItemName;
		const item = InventoryGet(Player, groupName);
		if (!item) return;

		if (typeof data.combination === "string" && !!itemGroups[groupName]) {
			if (
				await hashCombination(data.combination) ===
				itemGroups[groupName].combination?.hash
			) {
				const itemName = smartGetItemName(item);
				delete modStorage.deviousPadlock.itemGroups[data.groupName as AssetGroupItemName];
				unsyncItemGroups([data.groupName], false);
				InventoryUnlock(Player, data.groupName as AssetGroupItemName);
				ChatRoomCharacterUpdate(Player);
				syncStorage();
				messagesManager.sendAction(
					`${getNickname(sender)} entered the correct combination and devious padlock was unlocked on ${getNickname(Player)}'s ${itemName}`
				);
			}
		}
	});

	Object.values(BasePadlock).forEach((baseLock) => {
		hookFunction(`InventoryItemMisc${baseLock}Draw`, HookPriority.ADD_BEHAVIOR, (args, next) => {
			if (!CurrentCharacter || !CurrentCharacter.FocusGroup) return next(args);
			const item = InventoryGet(CurrentCharacter, CurrentCharacter.FocusGroup.Name);
			if (!item) return next(args);
			if (
				item.Property?.Name === deviousPadlock.Name &&
				(
					CurrentCharacter.IsPlayer() || CurrentCharacter.DOGS
				)
			) {
				inspectDeviousPadlock();
				// DialogChangeMode("items");
				return;
			}
			return next(args);
		});
	});

	hookFunction("DialogCanUnlock", HookPriority.ADD_BEHAVIOR, (args, next) => {
		const [target, item] = args;
		const itemGroupName = item.Asset?.Group?.Name as AssetGroupItemName;
		if (item?.Property?.Name === deviousPadlock.Name && (target.IsPlayer() || target.DOGS)) {
			if (target.IsPlayer() &&
				!modStorage.deviousPadlock.itemGroups?.[itemGroupName]
			) {
				registerDeviousPadlockInModStorage(itemGroupName, Number(item.Property.LockMemberNumber ?? Player.MemberNumber));
			}
			return hasKeyToPadlock(target.FocusGroup!.Name, Player, target);
		}
		return next(args);
	});

	hookFunction("InventoryUnlock", HookPriority.ADD_BEHAVIOR, (args, next) => {
		const [target, itemOrGroupName] = args;
		const item = typeof itemOrGroupName === "string" ? InventoryGet(target, itemOrGroupName) : itemOrGroupName;
		if (item?.Property?.Name === deviousPadlock.Name) {
			delete item.Property.Name;
		}
		return next(args);
	});

	hookFunction("InventoryLock", HookPriority.ADD_BEHAVIOR, (args, next) => {
		const [C, Item, Lock, MemberNumber] = args as [Character, Item | AssetGroupName, Item | AssetLockType, null | number | string];
		// @ts-ignore
		if ([Lock.Asset?.Name, Lock].includes(deviousPadlock.Name)) {
			args[2] = Object.values(BasePadlock).includes((typeof Lock === "string" ? Lock : Lock.Asset?.Name) as BasePadlock) ? Lock : BasePadlock.EXCLUSIVE;
			if (typeof args[1] === "string") return next(args);
			if (args[1].Property) {
				args[1].Property.Name = deviousPadlock.Name;
			} else {
				args[1].Property = {
					Name: deviousPadlock.Name
				};
			}
		}
		return next(args);
	});

	hookFunction("DialogSetStatus", HookPriority.ADD_BEHAVIOR, (args, next) => {
		const C = CurrentCharacter!;
		const [status] = args;
		if (
			typeof status === "string" &&
			status.startsWith("This looks like its locked by a") &&
			InventoryGet(C, C.FocusGroup!.Name)?.Property?.Name === deviousPadlock.Name &&
			(C.IsPlayer() || C.DOGS)
		) {
			if (C.IsPlayer()) {
				args[0] = "This looks like its locked by a devious padlock, you are totally helpless :3";
			} else {
				args[0] = `This looks like its locked by a devious padlock, ${getNickname(C)} is totally helpless :3`;
			}
		}
		return next(args);
	});

	hookFunction("ChatRoomCharacterItemUpdate", HookPriority.OBSERVE, (args, next) => {
		if (remoteControlIsInteracting) return;
		const ret = next(args);
		const [target, group] = args;
		onAppearanceChange(Player, target);
		return ret;
	});

	hookFunction("ChatRoomSyncItem", HookPriority.OBSERVE, (args, next) => {
		next(args);
		const [data] = args;
		const item = data?.Item;
		const target1 = getPlayer(data?.Source);
		const target2 = getPlayer(item?.Target);
		if (!target1 || !target2) return;
		onAppearanceChange(target1, target2);
	});

	hookFunction("ChatRoomSyncSingle", HookPriority.OBSERVE, (args, next) => {
		next(args);
		const [data] = args;
		const target1 = getPlayer(data?.SourceMemberNumber);
		const target2 = getPlayer(data?.Character?.MemberNumber);
		if (!target1 || !target2) return;
		onAppearanceChange(target1, target2);
	});

	hookFunction("ElementButton.CreateForAsset", HookPriority.OBSERVE, (args, next) => {
		args[4] ??= {};
		const asset: Asset = "Asset" in args[1] ? args[1].Asset : args[1];
		switch (asset.Name) {
			case deviousPadlock.Name:
				args[4].image = deviousPadlockImage;
				break;
		}
		return next(args);
	});


	hookFunction("DialogInventoryAdd", HookPriority.ADD_BEHAVIOR, (args, next) => {
		const [C, item, isWorn, sortOrder] = args;
		const asset = item.Asset;

		if (
			asset.Name === deviousPadlock.Name &&
			!C.IsPlayer() &&
			!C.DOGS
		) return;
		return next(args);
	});

	interface DeviousInventoryIcon {
		name: string;
		iconSrc: string;
		tooltipText: String;
	}

	hookFunction("DialogGetLockIcon", HookPriority.ADD_BEHAVIOR, (args, next) => {
		const item: Item = args[0];
		if (InventoryItemHasEffect(item, "Lock")) {
			if (
				item.Property && item.Property.Name === deviousPadlock.Name
			) {
				if (CurrentCharacter !== null && !CurrentCharacter.IsPlayer() && !CurrentCharacter.DOGS) {
					return next(args);
				}
				const icon: DeviousInventoryIcon = {
					name: deviousPadlock.Name,
					iconSrc: deviousPadlockImage,
					tooltipText: `Locked with Devious Padlock from DOGS mod`
				};
				// Cursed, but we're returning our own icon data here
				return [icon] as unknown as InventoryIcon[];
			}
		}
		return next(args);
	});

	hookFunction("InventoryIsPermissionBlocked", HookPriority.ADD_BEHAVIOR, (args, next) => {
		const [C, AssetName, AssetGroup, AssetType] = args;
		if (AssetName === deviousPadlock.Name) return !canPutDeviousPadlock(AssetGroup as AssetGroupItemName, Player, C);
		return next(args);
	});

	hookFunction("InventoryTogglePermission", HookPriority.ADD_BEHAVIOR, (args, next) => {
		const item: Item = args[0];
		if (item.Asset.Name === deviousPadlock.Name) return undefined as never;
		return next(args);
	});

	// Fixing Preview Screen
	hookFunction("DrawPreviewIcons", HookPriority.ADD_BEHAVIOR, (args, next) => {
		const icons = args[0];
		if (CommonIsArray(icons)) args[0] = icons.map((i: InventoryIcon | DeviousInventoryIcon) => typeof i === "string" ? i : i.name as InventoryIcon);
		return next(args);
	});

	hookFunction("DrawImageResize", HookPriority.ADD_BEHAVIOR, (args, next) => {
		if (args[0] === `Assets/Female3DCG/ItemMisc/Preview/${deviousPadlock.Name}.png`) {
			args[0] = deviousPadlockImage;
		}
		return next(args);
	});

	hookFunction("CommandExecute", HookPriority.ADD_BEHAVIOR, (args, next) => {
		const command = args[0].toLowerCase().trim();
		let prevent = false;
		const blockedCommands = Object.values(modStorage.deviousPadlock.itemGroups ?? {})
			.map((v) => v.blockedCommands ?? [])
			.reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);
		blockedCommands.forEach((c) => {
			if (command?.startsWith(c)) {
				messagesManager.sendAction(
					`${getNickname(
						Player
					)} tried to use blocked command ${c}`
				);
				return prevent = true;
			}
		});
		if (prevent) return false;
		return next(args);
	});

	hookFunction("TextLoad", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
		if ((CurrentScreen as string) === "InspectDeviousPadlock") {
			return undefined as never;
		}
		return next(args);
	});
}

