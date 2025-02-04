import { callOriginal, hookFunction } from "./bcModSdk";
import { IModStorage, modStorage, TSavedItem } from "./storage";
import { 
	beautifyMessage, chatSendCustomAction, chatSendDOGSMessage, chatSendLocal,
	colorsEqual, getNickname, getPlayer, notify, requestButtons, waitFor
} from "./utils";
import { remoteControlState } from "./remoteControl";
import deviousPadlockImage from "@/images/devious-padlock.png";
import backArrowImage from "@/images/back-arrow.png";

export const deviousPadlock = {
	AllowType: [],
	Effect: [],
	Extended: true,
	IsLock: true,
	Name: "DeviousPadlock",
	Time: 10,
	Value: 70,
	Wear: false,
	RemovalTime: 1000
};

export enum DeviousPadlockPutPermission {
	FRIENDS_AND_HIGHER = 0,
	WHITELIST_AND_HIGHER = 1,
	LOVERS_AND_HIGHER = 2,
	EVERYONE = 3
};

export enum DeviousPadlockAccessPermission {
	EVERYONE_EXCEPT_WEARER = 0,
	FAMILY_AND_HIGHER = 1,
	LOVERS_AND_HIGHER = 2,
	OWNER = 3,
	FRIENDS_AND_HIGHER = 4,
	WHITELIST_AND_HIGHER = 5
};

const deviousPadlockPutPermissionsHierarchy = [
	DeviousPadlockPutPermission.EVERYONE,
	DeviousPadlockPutPermission.FRIENDS_AND_HIGHER,
	DeviousPadlockPutPermission.WHITELIST_AND_HIGHER,
	DeviousPadlockPutPermission.LOVERS_AND_HIGHER
];

const deviousPadlockAccessPermissionsHierarchy = [
	DeviousPadlockAccessPermission.EVERYONE_EXCEPT_WEARER,
	DeviousPadlockAccessPermission.FRIENDS_AND_HIGHER,
	DeviousPadlockAccessPermission.WHITELIST_AND_HIGHER,
	DeviousPadlockAccessPermission.FAMILY_AND_HIGHER,
	DeviousPadlockAccessPermission.LOVERS_AND_HIGHER,
	DeviousPadlockAccessPermission.OWNER
];

let deviousPadlockMenuData = null;
let deviousPadlockMenuLastData = null;

let deviousPadlockTriggerCooldown: {
	count: number,
	firstTriggerTime: number,
	state: boolean
} = {
	count: 0,
	firstTriggerTime: Date.now(),
	state: false
};

const MAX_TRIGGER_COUNT = 14;
const MAX_FIRST_TRIGGER_INTERVAL = 1000 * 14;
const COOLDOWN_TIME = 1000 * 60 * 2;


function createDeviousPadlock(): void {
	AssetFemale3DCG.forEach((ele) => {
		if(ele.Group === "ItemMisc") {
			ele.Asset.push(deviousPadlock);
		}
	});
	
	const assetGroup = AssetGroupGet("Female3DCG", "ItemMisc");
	AssetAdd(assetGroup, deviousPadlock, AssetFemale3DCGExtended);
	// @ts-ignore
	AssetGet("Female3DCG", "ItemMisc", deviousPadlock.Name).Description = "Devious Padlock";
	InventoryAdd(Player, deviousPadlock.Name, "ItemMisc");
}

function getSavedItemData(item: Item): TSavedItem {
	return {
		name: item.Asset.Name,
		color: item.Color,
		craft: item.Craft,
		property: item.Property
	}
}

export function getNextDeviousPadlockPutPermission(p: DeviousPadlockPutPermission): DeviousPadlockPutPermission {
	if (deviousPadlockPutPermissionsHierarchy.indexOf(p) === deviousPadlockPutPermissionsHierarchy.length - 1) return p;
	return deviousPadlockPutPermissionsHierarchy[deviousPadlockPutPermissionsHierarchy.indexOf(p) + 1];
}

export function getPreviousDeviousPadlockPutPermission(p: DeviousPadlockPutPermission): DeviousPadlockPutPermission {
	if (deviousPadlockPutPermissionsHierarchy.indexOf(p) === 0) return p;
	return deviousPadlockPutPermissionsHierarchy[deviousPadlockPutPermissionsHierarchy.indexOf(p) - 1];
}

export function getNextDeviousPadlockAccessPermission(p: DeviousPadlockAccessPermission): DeviousPadlockAccessPermission {
	if (deviousPadlockAccessPermissionsHierarchy.indexOf(p) === deviousPadlockAccessPermissionsHierarchy.length - 1) return p;
	return deviousPadlockAccessPermissionsHierarchy[deviousPadlockAccessPermissionsHierarchy.indexOf(p) + 1];
}

export function getPreviousDeviousPadlockAccessPermission(p: DeviousPadlockAccessPermission): DeviousPadlockAccessPermission {
	if (deviousPadlockAccessPermissionsHierarchy.indexOf(p) === 0) return p;
	return deviousPadlockAccessPermissionsHierarchy[deviousPadlockAccessPermissionsHierarchy.indexOf(p) - 1];
}

function registerDeviousPadlockInModStorage(group: AssetGroupItemName, ownerId: number): void {
	if (!modStorage.deviousPadlock.itemGroups) {
		// @ts-ignore
		modStorage.deviousPadlock.itemGroups = {};
	}
	const currentItem = InventoryGet(Player, group);
	modStorage.deviousPadlock.itemGroups[group] = {
		item: getSavedItemData(currentItem), 
		owner: ownerId
	};
}

function inspectDeviousPadlock(target: Character, item: Item, itemGroup: AssetItemGroup): void {
	let deviousPadlock;
	if (target.IsPlayer()) {
		deviousPadlock = modStorage.deviousPadlock;
	} else {
		deviousPadlock = target.DOGS.deviousPadlock;
	}
	deviousPadlockMenuData = {
		owner: deviousPadlock.itemGroups[itemGroup.Name].owner,
		accessPermission: deviousPadlock.itemGroups[itemGroup.Name].accessPermission ?? 0,
		memberNumbers: deviousPadlock.itemGroups[itemGroup.Name].memberNumbers ?? [],
		unlockTime: deviousPadlock.itemGroups[itemGroup.Name].unlockTime,
		note: deviousPadlock.itemGroups[itemGroup.Name].note,	
		blockedCommands: deviousPadlock.itemGroups[itemGroup.Name].blockedCommands ?? []
	};
	deviousPadlockMenuLastData = JSON.parse(JSON.stringify(deviousPadlockMenuData));

	const menu = document.createElement("div");
	menu.id = "dogsFullScreen";
	menu.style.cssText = "height: 70vw;";
	menu.append(getDeviousPadlockMenu(target, itemGroup, menu, "General"));
	document.body.append(menu);
}

function canPutDeviousPadlock(groupName: AssetGroupItemName, target1: Character, target2: Character): boolean {
	let storage: IModStorage;
	if (target2.IsPlayer()) storage = modStorage;
	else storage = target2.DOGS;
	if (!storage?.deviousPadlock?.state) return;
	const permission = storage?.deviousPadlock?.permission ?? DeviousPadlockPutPermission.EVERYONE;
	if (target1.MemberNumber === target2.MemberNumber) return true;
	if (permission === DeviousPadlockPutPermission.FRIENDS_AND_HIGHER) return (
		// @ts-ignore
		target1.FriendList?.includes(target2.MemberNumber) || target2.FriendList?.includes(target1.MemberNumber) ||
		target1.WhiteList?.includes(target2.MemberNumber) || target2.WhiteList?.includes(target1.MemberNumber) ||
		target1.IsInFamilyOfMemberNumber(target2.MemberNumber) || target1.IsLoverOfCharacter(target2) || 
		target2.IsOwnedByCharacter(target1)
	);
	if (permission === DeviousPadlockPutPermission.WHITELIST_AND_HIGHER) return (
		target1.WhiteList?.includes(target2.MemberNumber) || target2.WhiteList?.includes(target1.MemberNumber) ||
		target1.IsInFamilyOfMemberNumber(target2.MemberNumber) || target1.IsLoverOfCharacter(target2) || 
		target2.IsOwnedByCharacter(target1)
	);
	if (permission === DeviousPadlockPutPermission.LOVERS_AND_HIGHER) return (
		target1.IsLoverOfCharacter(target2) || target2.IsOwnedByCharacter(target1)
	);
	return true;
}

function canAccessDeviousPadlock(groupName: AssetGroupItemName, target1: Character, target2: Character): boolean {
	if (!target1.CanInteract()) return false;
	if (!target2.IsPlayer() && !target2.DOGS) return false;
	if (target1.MemberNumber === target2.MemberNumber) return false;
	const owner = target2.IsPlayer() ? 
		modStorage.deviousPadlock.itemGroups?.[groupName]?.owner
		: target2.DOGS?.deviousPadlock?.itemGroups?.[groupName]?.owner;
	const permissionKey = target2.IsPlayer() ? 
		(modStorage.deviousPadlock.itemGroups?.[groupName]?.accessPermission ?? DeviousPadlockAccessPermission.EVERYONE_EXCEPT_WEARER)
		: (target2.DOGS?.deviousPadlock?.itemGroups?.[groupName]?.accessPermission ?? DeviousPadlockAccessPermission.EVERYONE_EXCEPT_WEARER);
	const memberNumbers = target2.IsPlayer() ? (modStorage.deviousPadlock.itemGroups?.[groupName]?.memberNumbers ?? []) : (target2.DOGS?.deviousPadlock?.itemGroups?.[groupName]?.memberNumbers ?? []);
	if (target1.MemberNumber === owner || memberNumbers.includes(target1.MemberNumber)) return true;
	if (permissionKey === DeviousPadlockAccessPermission.EVERYONE_EXCEPT_WEARER) return true;
	if (permissionKey === DeviousPadlockAccessPermission.FRIENDS_AND_HIGHER) return (
		// @ts-ignore
		target1.FriendList?.includes(target2.MemberNumber) || target2.FriendList?.includes(target1.MemberNumber) ||
		target2.WhiteList?.includes(target1.MemberNumber) ||
		target1.IsInFamilyOfMemberNumber(target2.MemberNumber) || target1.IsLoverOfCharacter(target2) || 
		target2.IsOwnedByCharacter(target1)
	);
	if (permissionKey === DeviousPadlockAccessPermission.WHITELIST_AND_HIGHER) return (
		// @ts-ignore
		target2.WhiteList?.includes(target1.MemberNumber) ||
		target1.IsInFamilyOfMemberNumber(target2.MemberNumber) || target1.IsLoverOfCharacter(target2) || 
		target2.IsOwnedByCharacter(target1)
	);
	if (permissionKey === DeviousPadlockAccessPermission.FAMILY_AND_HIGHER) return (
		target1.IsInFamilyOfMemberNumber(target2.MemberNumber) || target1.IsLoverOfCharacter(target2) ||
		target2.IsOwnedByCharacter(target1)
	);
	if (permissionKey === DeviousPadlockAccessPermission.LOVERS_AND_HIGHER) return target1.IsLoverOfCharacter(target2) || target2.IsOwnedByCharacter(target1);
	if (permissionKey === DeviousPadlockAccessPermission.OWNER) return target2.IsOwnedByCharacter(target1);
	return true;
}

function canSetAccessPermission(target1: Character, target2: Character, accessPermission: DeviousPadlockAccessPermission): boolean {
	if (accessPermission === DeviousPadlockAccessPermission.EVERYONE_EXCEPT_WEARER) return target1.MemberNumber !== target2.MemberNumber;
	if (accessPermission === DeviousPadlockAccessPermission.FRIENDS_AND_HIGHER) return (
		// @ts-ignore
		target1.FriendList?.includes(target2.MemberNumber) || target2.FriendList?.includes(target1.MemberNumber) ||
		target1.WhiteList?.includes(target2.MemberNumber) || target2.WhiteList?.includes(target1.MemberNumber) ||
		target1.IsInFamilyOfMemberNumber(target2.MemberNumber) || target1.IsLoverOfCharacter(target2) || 
		target2.IsOwnedByCharacter(target1)
	);
	if (accessPermission === DeviousPadlockAccessPermission.WHITELIST_AND_HIGHER) return (
		// @ts-ignore
		target1.WhiteList?.includes(target2.MemberNumber) || target2.WhiteList?.includes(target1.MemberNumber) ||
		target1.IsInFamilyOfMemberNumber(target2.MemberNumber) || target1.IsLoverOfCharacter(target2) || 
		target2.IsOwnedByCharacter(target1)
	);
	if (accessPermission === DeviousPadlockAccessPermission.FAMILY_AND_HIGHER) return (
		target1.IsInFamilyOfMemberNumber(target2.MemberNumber) || target1.IsLoverOfCharacter(target2) ||
		target2.IsOwnedByCharacter(target1)
	);
	if (accessPermission === DeviousPadlockAccessPermission.LOVERS_AND_HIGHER) return target1.IsLoverOfCharacter(target2) || target2.IsOwnedByCharacter(target1);
	if (accessPermission === DeviousPadlockAccessPermission.OWNER) return target2.IsOwnedByCharacter(target1);
	return false;
}

function onAppearanceChange(target1: Character, target2: Character): void {
	if (target2.IsPlayer()) checkDeviousPadlocks(target1);
}

function checkDeviousPadlocks(target: Character): void {
	if (modStorage.deviousPadlock.itemGroups) {
		let padlocksChangedItemNames: string[] = [];
		let pushChatRoom: boolean = false;
		Object.keys(modStorage.deviousPadlock.itemGroups).forEach((groupName) => {
			const currentItem = InventoryGet(Player, groupName as AssetGroupName);
			const savedItem: TSavedItem = modStorage.deviousPadlock.itemGroups[groupName].item;

			const property = currentItem?.Property;
			const padlockChanged = !(
				property?.Name === deviousPadlock.Name
				&& property?.LockedBy === "ExclusivePadlock"
			);

			const ignoredProperties = [
				"OrgasmCount", "RuinedOrgasmCount", "TimeSinceLastOrgasm",
				"TimeWorn", "TriggerCount"
			];

			const getValidProperties = (properties) => {
				if (typeof properties === "object") {
					const propertiesCopy = {...properties};
					ignoredProperties.forEach((p) => {
						delete propertiesCopy[p];
					});
					return propertiesCopy;
				}
				return properties; 
			}

			const getIgnoredProperties = (properties) => {
				if (typeof properties === "object") {
					const propertiesCopy = {...properties};
					Object.keys(propertiesCopy).forEach((p) => {
						if (!ignoredProperties.includes(p)) delete propertiesCopy[p];
					});
					return propertiesCopy;
				}
				return properties;
			}
			
			if (
				!deviousPadlockTriggerCooldown.state &&
				(
					currentItem?.Asset?.Name !== savedItem.name ||
					!colorsEqual(currentItem.Color, savedItem.color) ||
					JSON.stringify(currentItem?.Craft) !== JSON.stringify(savedItem.craft) ||
					JSON.stringify(getValidProperties(currentItem?.Property)) !== JSON.stringify(getValidProperties(savedItem.property))
				)
			) {
				if (canAccessDeviousPadlock(groupName as AssetGroupItemName, target, Player)) {
					if (padlockChanged) {
						delete modStorage.deviousPadlock.itemGroups[groupName];
					} else {
						modStorage.deviousPadlock.itemGroups[groupName].item = getSavedItemData(currentItem);
					}
				} else {
					const difficulty = AssetGet(Player.AssetFamily, groupName as AssetGroupName, savedItem.name).Difficulty;
					let newItem: Item = callOriginal("InventoryWear", [Player, savedItem.name, groupName as AssetGroupItemName, savedItem.color, difficulty, Player.MemberNumber, savedItem.craft]);
					newItem.Property = {
						...getValidProperties(savedItem.property),
						...getIgnoredProperties(currentItem?.Asset?.Name === savedItem.name ? currentItem.Property : newItem.Property)
					};
					if (newItem.Property.Name !== deviousPadlock.Name) newItem.Property.Name = deviousPadlock.Name;
					if (newItem.Property.LockedBy !== "ExclusivePadlock") newItem.Property.LockedBy = "ExclusivePadlock";
					if (padlockChanged) padlocksChangedItemNames.push(newItem.Craft?.Name ? newItem.Craft.Name : newItem.Asset.Description);
					pushChatRoom = true;
				}
			}
		});

		if (ServerPlayerIsInChatRoom() && pushChatRoom) {
			ChatRoomCharacterUpdate(Player);
			if (padlocksChangedItemNames.length === 1) {
				chatSendCustomAction(`Devious padlock appears again on ${getNickname(Player)}'s ${padlocksChangedItemNames[0]}`);
			}
			if (padlocksChangedItemNames.length > 1) {
				chatSendCustomAction(`Devious padlock appears again on ${getNickname(Player)}'s: ${padlocksChangedItemNames.join(", ")}`);
			}
			if (deviousPadlockTriggerCooldown.count === 0) deviousPadlockTriggerCooldown.firstTriggerTime = Date.now();
			deviousPadlockTriggerCooldown.count++;
			if (deviousPadlockTriggerCooldown.count > MAX_TRIGGER_COUNT) {
				if ((Date.now() - deviousPadlockTriggerCooldown.firstTriggerTime) < MAX_FIRST_TRIGGER_INTERVAL) {
					deviousPadlockTriggerCooldown.state = true;
					deviousPadlockTriggerCooldown.count = 0;
					chatSendCustomAction(`[COOLDOWN] Devious padlocks were disabled for ${COOLDOWN_TIME / (1000 * 60)} minutes, please disable DOGS mod if this message repeats`);
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
			item.Property?.LockedBy === "ExclusivePadlock"
		) {
			if (
				!modStorage.deviousPadlock.itemGroups ||
				!modStorage.deviousPadlock.itemGroups[item.Asset.Group.Name as AssetGroupItemName]
			) {
				if (!canPutDeviousPadlock(item.Asset.Group.Name as AssetGroupItemName, target, Player) || deviousPadlockTriggerCooldown.state) {
					InventoryUnlock(Player, item.Asset.Group.Name as AssetGroupItemName);
					ChatRoomCharacterUpdate(Player);					
				} else registerDeviousPadlockInModStorage(item.Asset.Group.Name as AssetGroupItemName, target.MemberNumber);
			}
		}
	});
}

function checkDeviousPadlocksTimers(): void {
	if (!modStorage.deviousPadlock.itemGroups || deviousPadlockTriggerCooldown.state) return;
	Object.keys(modStorage.deviousPadlock.itemGroups).forEach((group: AssetGroupItemName) => {
		const unlockTime = modStorage.deviousPadlock.itemGroups[group].unlockTime;
		if (unlockTime && new Date(unlockTime) < new Date()) {
			const itemName = InventoryGet(Player, group).Craft?.Name 
				? InventoryGet(Player, group).Craft.Name 
				: InventoryGet(Player, group).Asset.Name;	
			chatSendCustomAction(`The devious padlock opens on ${getNickname(Player)}'s ${itemName} with loud click`);
			delete modStorage.deviousPadlock.itemGroups[group];
			InventoryUnlock(Player, group);
			ChatRoomCharacterUpdate(Player);
		}
	});
}


function getDeviousPadlockMenu(
	target: Character, group: AssetGroup, 
	menuElement: HTMLDivElement, page: string
): HTMLDivElement {
	const item = InventoryGet(target, group.Name);
	const itemName = item.Craft?.Name ? item.Craft.Name : item.Asset.Description;

	const container = document.createElement("div");
	container.style.cssText = "display: flex; height: 100%;";

	const navContainer = document.createElement("div");
	navContainer.style.cssText = `display: flex; flex-direction: column; align-items: center; justify-content: center;
	row-gap: 6px; center; width: 30%; min-width: 80px; max-width: 300px; background: black; background: #12121217;`;

	const contentContainer = document.createElement("div");
	contentContainer.style.cssText = `display: flex; flex-direction: column; align-items: center; justify-content: center;
	width: 100%; height: 100%; overflow: auto;`;

	const closeBtn = document.createElement("button");
	closeBtn.textContent = "x";
	closeBtn.style.cssText = "display: flex; align-items: center; justify-content: center; position: absolute; top: 5px; right: 5px; min-width: 17px; min-height: 17px; width: 6vw; height: 6vw; font-size: 4.5vw;";
	closeBtn.classList.add("dogsBtn");
	closeBtn.addEventListener("click", function () {
		menuElement.remove();
		if (
			!target.IsPlayer() && 
			JSON.stringify(deviousPadlockMenuLastData) !==
			JSON.stringify(deviousPadlockMenuData)
		) {
			chatSendDOGSMessage("changeDeviousPadlockConfigurations", {
				...deviousPadlockMenuData,
				group: group.Name
			}, target.MemberNumber);
			chatSendCustomAction(
				`${getNickname(Player)} changes the devious padlock configurations on ${getNickname(target)}'s ${itemName}`
			);
		}
	});

	for (let _page of ["General", "Note", "Blocked Commands", "Access"]) {
		const btn = document.createElement("button");
		btn.textContent = _page;
		btn.classList.add("dogsNavBtn");
		if (page === _page) btn.setAttribute("data-active", "true");
		btn.addEventListener("click", () => {			
			container.remove();
			menuElement.append(getDeviousPadlockMenu(target, group, menuElement, _page));	
		});
		navContainer.append(btn);
	}

	container.append(navContainer, contentContainer, closeBtn);

	if (page === "General") {
		const itemPreviewLink = GameVersion.length === 4 ?
			`https://www.bondage-europe.com/${GameVersion}/BondageClub/Assets/Female3DCG/${group.Name}/Preview/${item.Asset.Name}.png`
			: `${window.location.href}Assets/Female3DCG/${group.Name}/Preview/${item.Asset.Name}.png`;

		const preview = document.createElement("div");
		preview.style.cssText = "position: relative; width: 20%; aspect-ratio: 1 / 1; max-width: 150px; max-height: 150px;";

		const previewItem = document.createElement("img");
		previewItem.src = itemPreviewLink;
		previewItem.style.cssText = "background: white; width: 100%; height: 100%;";

		const previewPadlock = document.createElement("img");
		previewPadlock.src = deviousPadlockImage;
		previewPadlock.style.cssText = "z-index: 10; width: 20%; height: 20%; position: absolute; left: 2px; top: 2px;";

		const description = document.createElement("p");
		description.innerHTML = beautifyMessage(
			`Padlock can be managed only by users who <!correspond!> to the <!access permissions!><br><span style="color: #ff0000;">Protected from cheats</span>`
		);
		description.style.cssText = `width: 95%; background: rgb(80 78 116); border-radius: 4px; text-align: center;
		padding: 1vw; color: white; text-align: center; font-size: clamp(12px, 3vw, 24px); margin-top: 1.5vw; box-sizing: border-box;`;
		
		const owner = document.createElement("p");
		owner.innerHTML = beautifyMessage(
			`Owner of the padlock: <!${
				getPlayer(deviousPadlockMenuData.owner) ? `${getNickname(getPlayer(deviousPadlockMenuData.owner))} (${deviousPadlockMenuData.owner})` : `${deviousPadlockMenuData.owner}`
			}!>`
		);
		owner.style.cssText = "width: 95%; color: white; font-size: clamp(12px, 3vw, 24px); margin-top: 1.5vw; box-sizing: border-box;";

		const time = document.createElement("div");
		time.style.cssText = "width: 100%; margin-top: 1.5vw; width: 95%; background: rgb(80 78 116); border-radius: 4px; padding: 1vw; display: flex; flex-direction: column; align-items: center; box-sizing: border-box;";

		const timeText = document.createElement("p");
		timeText.textContent = "When should the lock be removed? (Leave this field empty for permanent 😉)";
		timeText.style.cssText = "font-size: clamp(12px, 3vw, 24px); width: 95%; color: white; text-align: center;";

		const timeField = document.createElement("input");
		timeField.type = "datetime-local";
		timeField.classList.add("dogsTextEdit");
		if (!canAccessDeviousPadlock(group.Name as AssetGroupItemName, Player, target)) {
			timeField.classList.add("disabled");
		}
		timeField.style.cssText = "background: rgb(99 96 147); margin-top: 1vw; width: 95%; height: 4vw; min-height: 15px; font-size: clamp(12px, 3vw, 24px);";
		timeField.value = deviousPadlockMenuData.unlockTime
			? deviousPadlockMenuData.unlockTime
			: "";
		timeField.addEventListener("change", function () {
			deviousPadlockMenuData.unlockTime = timeField.value;
		});

		preview.append(previewItem, previewPadlock);
		time.append(timeText, timeField);
		contentContainer.append(
			preview, description, owner, time
		);
	}

	if (page === "Note") {
		const note = document.createElement("textarea");
		note.classList.add("dogsTextEdit");
		if (!canAccessDeviousPadlock(group.Name as AssetGroupItemName, Player, target)) {
			note.classList.add("disabled");
		}
		note.style.cssText = "width: 85%; height: 30%; min-height: 100px; font-size: clamp(12px, 4vw, 24px);";
		note.placeholder = "You can leave a note that other DOGS users can see";
		note.value = deviousPadlockMenuData.note
			? deviousPadlockMenuData.note
			: "";
		note.addEventListener("change", function () {
			deviousPadlockMenuData.note = note.value;
		});
		contentContainer.append(note);
	}

	if (page === "Blocked Commands") {
		const commands = document.createElement("textarea");
		commands.classList.add("dogsTextEdit");
		if (!canAccessDeviousPadlock(group.Name as AssetGroupItemName, Player, target)) {
			commands.classList.add("disabled");
		}
		commands.style.cssText = "width: 85%; height: 30%; min-height: 100px; font-size: clamp(12px, 4vw, 24px);";
		commands.placeholder = `You can paste commands which will be blocked for the padlock wearer. Example: "/command1, /command2"`;
		commands.value = deviousPadlockMenuData.blockedCommands
			? deviousPadlockMenuData.blockedCommands.join(", ")
			: "";
		commands.addEventListener("change", function () {
			deviousPadlockMenuData.blockedCommands = commands.value.split(",")
				.map((c) => c.trim())
				.filter((c) => c.startsWith("/") && c.length > 1);
		});
		contentContainer.append(commands);
	}

	if (page === "Access") {
		const chaosPadlockAccessPermissionsTexts = {
			[DeviousPadlockAccessPermission.EVERYONE_EXCEPT_WEARER]: "Everyone except wearer", 
			[DeviousPadlockAccessPermission.FRIENDS_AND_HIGHER]: "Wearer's friends and higher",
			[DeviousPadlockAccessPermission.WHITELIST_AND_HIGHER]: "Wearer's whitelist and higher",
			[DeviousPadlockAccessPermission.FAMILY_AND_HIGHER]: "Wearer's family and higher",
			[DeviousPadlockAccessPermission.LOVERS_AND_HIGHER]: "Wearer's lovers and higher",
			[DeviousPadlockAccessPermission.OWNER]: "Wearer's owner"
		};

		const memberNumbers = document.createElement("div");
		memberNumbers.style.cssText = `display: flex; flex-direction: column; align-items: center; box-sizing: border-box;
		width: 95%; background: rgb(80 78 116); border-radius: 4px; padding: 1vw;`;

		const memberNumbersText = document.createElement("p");
		memberNumbersText.style.cssText = "color: white; width: 95%; font-size: clamp(12px, 4vw, 24px); text-align: center;";
		memberNumbersText.textContent = "Member numbers which will always have access to the padlock";

		const memberNumbersField = document.createElement("textarea");
		memberNumbersField.classList.add("dogsTextEdit");
		if (!canAccessDeviousPadlock(group.Name as AssetGroupItemName, Player, target)) {
			memberNumbersField.classList.add("disabled");
		}
		memberNumbersField.placeholder = "Member numbers";
		memberNumbersField.style.cssText = "width: 95%; height: 6.5vw; margin-top: 1vw; font-size: clamp(12px, 4vw, 24px);";
		memberNumbersField.value = deviousPadlockMenuData.memberNumbers
			? deviousPadlockMenuData.memberNumbers.join(", ")
			: "";
		memberNumbersField.addEventListener("change", function () {
			deviousPadlockMenuData.memberNumbers = memberNumbersField.value.split(",").map((n) => parseInt(n));
		});

		let accessPermissionToSubmit = deviousPadlockMenuData.accessPermission;

		const accessBlock = document.createElement("div");
		accessBlock.style.cssText = `display: flex; flex-direction: column; align-items: center; box-sizing: border-box;
		width: 95%; background: rgb(80 78 116); border-radius: 4px; padding: 1vw; margin-top: 2vw;`;

		const currentAccessSetting = document.createElement("p");
		currentAccessSetting.innerHTML = beautifyMessage(`Current access permission: <!${chaosPadlockAccessPermissionsTexts[deviousPadlockMenuData.accessPermission]}!>`);
		currentAccessSetting.style.cssText = "width: 95%; color: white; text-align: center; font-size: clamp(12px, 4vw, 24px);";

		const accessSettings = document.createElement("div");
		accessSettings.style.cssText = `display: flex; align-items: center; justify-content: center; column-gap: 2vw;
		margin-top: 2vw; width: 95%;`;

		const leftBtn = document.createElement("button");
		leftBtn.classList.add("dogsBtn");
		leftBtn.textContent = "<<";
		leftBtn.style.cssText = "display: flex; align-items: center; justify-content: center; width: 4vw; height: 4vw; border-radius: 50%;";
		leftBtn.addEventListener("click", function () {
			accessPermissionToSubmit = getPreviousDeviousPadlockAccessPermission(accessPermissionToSubmit);
			accessText.textContent = chaosPadlockAccessPermissionsTexts[accessPermissionToSubmit];
		});

		const accessText = document.createElement("p");
		accessText.textContent = chaosPadlockAccessPermissionsTexts[accessPermissionToSubmit];
		accessText.style.cssText = "text-align: center; color: white; font-size: clamp(12px, 4vw, 24px);";

		const rightBtn = document.createElement("button");
		rightBtn.classList.add("dogsBtn");
		rightBtn.textContent = ">>";
		rightBtn.style.cssText = "display: flex; align-items: center; justify-content: center; width: 4vw; height: 4vw; border-radius: 50%;";
		rightBtn.addEventListener("click", function () {
			accessPermissionToSubmit = getNextDeviousPadlockAccessPermission(accessPermissionToSubmit);
			accessText.textContent = chaosPadlockAccessPermissionsTexts[accessPermissionToSubmit];
		});

		const submitBtn = document.createElement("button");
		submitBtn.classList.add("dogsBtn");
		if (!canAccessDeviousPadlock(group.Name as AssetGroupItemName, Player, target)) {
			submitBtn.classList.add("disabled");
		}
		submitBtn.textContent = "Submit";
		submitBtn.addEventListener("click", function () {
			if (!canSetAccessPermission(Player, target, accessPermissionToSubmit)) {
				return notify("Not enough rights to set this access permission", 5000, "rgb(137 133 205)", "white");
			}
			deviousPadlockMenuData.accessPermission = accessPermissionToSubmit;
			currentAccessSetting.innerHTML = beautifyMessage(`Current access permission: <!${accessText.textContent}!>`);
		});

		memberNumbers.append(memberNumbersText, memberNumbersField);
		accessSettings.append(leftBtn, accessText, rightBtn, submitBtn);
		accessBlock.append(currentAccessSetting, accessSettings)
		contentContainer.append(memberNumbers, accessBlock);
	}

	return container;
}

export function loadDeviousPadlock(): void {
	createDeviousPadlock();
	Object.keys(modStorage.deviousPadlock.itemGroups ?? {}).forEach((g) => {
		const itemGroup = modStorage.deviousPadlock.itemGroups[g];
		const appearanceItem = ServerBundledItemToAppearanceItem(Player.AssetFamily, {
			Name: itemGroup.item.name,
			Color: itemGroup.item.color,
			Craft: itemGroup.item.craft,
			Property: itemGroup.item.property,
			Group: g as AssetGroupName
		});
		const changed = ValidationSanitizeProperties(Player, appearanceItem);
		if (changed) modStorage.deviousPadlock.itemGroups[g].item = getSavedItemData(appearanceItem);
	});
	checkDeviousPadlocks(Player);
	setInterval(checkDeviousPadlocksTimers, 1000);

	hookFunction("DialogLockingClick", 20, async (args, next) => {
		const C = CharacterGetCurrent();
		const clickedLock: Item = args[0];
		
		if (
			clickedLock?.Asset?.Name === deviousPadlock.Name && 
			!InventoryIsPermissionBlocked(C, deviousPadlock.Name, "ItemMisc")
		) {
			if (C.IsPlayer()) {
				const answer = await requestButtons(
					"This padlock is recommended for those who want to feel really helpless, you will not be able to remove this padlock yourself. Continue? 😏", 80, 600, [
						{
							text: "Yes, i want to lock myself"
						},
						{
							text: "No, i clicked wrong button"
						}
					]
				);
				if (answer === "No, i clicked wrong button") return;
			}
		}

		next(args);
	});

	hookFunction("InventoryItemMiscExclusivePadlockDraw", 20, (args, next) => {
		const item = InventoryGet(CurrentCharacter, CurrentCharacter.FocusGroup.Name);
		if (
			item.Property?.Name === deviousPadlock.Name &&
			(
				CurrentCharacter.IsPlayer() || CurrentCharacter.DOGS
			)
		) {
			inspectDeviousPadlock(CurrentCharacter, item, CurrentCharacter.FocusGroup);
			DialogChangeMode("items");
			return;
		}
		next(args);
	});

	hookFunction("DialogCanUnlock", 20, (args, next) => {
		const [ target, item ] = args as [Character, Item];

		if (
			item?.Property?.Name === deviousPadlock.Name && 
			(
				target.IsPlayer() || target.DOGS
			)
		) {
			if (
				target.IsPlayer() &&
				typeof modStorage.deviousPadlock.itemGroups?.[item.Asset?.Group?.Name] !== "object"
			) {
				registerDeviousPadlockInModStorage(item.Asset.Group.Name as AssetGroupItemName, parseInt(item.Property.LockMemberNumber ?? Player.MemberNumber));
			}
			return canAccessDeviousPadlock(target.FocusGroup?.Name, Player, target);
		}
		return next(args);
	});

	hookFunction("InventoryUnlock", 20, (args, next) => {
		const [ target, group ] = args as [Character, AssetGroupItemName];
		const item = InventoryGet(target, group);
		if (item?.Property?.Name === deviousPadlock.Name) {
			delete item.Property.Name;
		}
		return next(args);
	});

	hookFunction("InventoryLock", 20, (args, next) => {
		const [ C, Item, Lock, MemberNumber ] = args as [Character, Item | AssetGroupName, Item | AssetLockType, null | number | string];
		// @ts-ignore
		if ([Lock.Name, Lock].includes(deviousPadlock.Name)) {
			args[2] = "ExclusivePadlock";
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

	hookFunction("DialogSetStatus", 20, (args, next) => {
		const [ status ] = args as [string];
		if (
			typeof status === "string" &&
			status.startsWith("This looks like its locked by a") &&
			InventoryGet(CurrentCharacter, CurrentCharacter?.FocusGroup?.Name)
				?.Property?.Name === deviousPadlock.Name &&
			(
				CurrentCharacter.IsPlayer() || CurrentCharacter.DOGS
			)
		) {
			if (CurrentCharacter.IsPlayer()) {
				args[0] = "This looks like its locked by a devious padlock, you are totally helpless :3";
			} else {
				args[0] = `This looks like its locked by a devious padlock, ${getNickname(CurrentCharacter)} is totally helpless :3`;
			}
		}
		next(args);
	});

	hookFunction("ChatRoomCharacterItemUpdate", -20, (args, next) => {
		if (remoteControlState === "interacting") return;
		next(args);
		const [ target, group ] = args;
		onAppearanceChange(Player, target);
	});

	hookFunction("ChatRoomSyncItem", -20, (args, next) => {
		next(args);
		const [ data ] = args;
		const item = data?.Item;
		const target1 = getPlayer(data?.Source);
		const target2 = getPlayer(item?.Target);
		if (!target1 || !target2) return;
		onAppearanceChange(target1, target2);	
	});

	hookFunction("ChatRoomSyncSingle", -20, (args, next) => {
		next(args);
		const [ data ] = args;
		const target1 = getPlayer(data?.SourceMemberNumber);
		const target2 = getPlayer(data?.Character?.MemberNumber);
		if (!target1 || !target2) return;
		onAppearanceChange(target1, target2);
	});

	if (GameVersion === "R110") {
		hookFunction("DrawImageResize", 20, (args, next) => {
			var path = args[0];
			if (typeof path === "object") return next(args);
			if (!!path && path === `Assets/Female3DCG/ItemMisc/Preview/${deviousPadlock.Name}.png`) {
				args[0] = deviousPadlockImage;
			}
			return next(args);
		});
	} else { // R111
		hookFunction("ElementButton.CreateForAsset", 0, (args, next) => {
			args[4] ??= {};
			const asset: Asset = "Asset" in args[1] ? args[1].Asset : args[1];
			switch (asset.Name) {
				case deviousPadlock.Name:
					args[4].image = deviousPadlockImage;
					break;
			}
			return next(args);
		});
	}

	hookFunction("DialogInventoryAdd", 20, (args, next) => {
		const [C, item, isWorn, sortOrder] = args;
		const asset = item.Asset;
		
		if (
			asset.Name === deviousPadlock.Name &&
			!C.IsPlayer() &&
			!C.DOGS
		) return;
		return next(args);
	});


	hookFunction("ChatRoomMessage", 20, (args, next) => {
		const message = args[0];
		const sender = getPlayer(message.Sender);
		if (!sender) return next(args);
		if (message.Content === "dogsMsg" && !sender.IsPlayer()) {
			const msg = message.Dictionary.msg;
			const data = message.Dictionary.data;
			if (msg === "changeDeviousPadlockConfigurations") {
				// console.log(data);
				if (!modStorage.deviousPadlock.itemGroups[data.group]) return;
				if (!canAccessDeviousPadlock(data.group, sender, Player)) {
					return;
				}
				if (data.accessPermission && canSetAccessPermission(sender, Player, data.accessPermission)) {
					modStorage.deviousPadlock.itemGroups[data.group as AssetGroupItemName].accessPermission = data.accessPermission;
				}
				if (Array.isArray(data.memberNumbers)) {
					modStorage.deviousPadlock.itemGroups[data.group as AssetGroupItemName].memberNumbers = data.memberNumbers.filter((n) => typeof n === "number");
				}
				if (typeof data.unlockTime === "string") {
					modStorage.deviousPadlock.itemGroups[data.group as AssetGroupItemName].unlockTime = data.unlockTime;
				}
				if (typeof data.note === "string") {
					modStorage.deviousPadlock.itemGroups[data.group as AssetGroupItemName].note = data.note;
				}
				if (Array.isArray(data.blockedCommands)) {
					modStorage.deviousPadlock.itemGroups[data.group as AssetGroupItemName].blockedCommands = data.blockedCommands
						.map((c) => c.trim())
						.filter((c) => c.startsWith("/") && c.length > 1);;
				}
			}
		}
		next(args);
	});

	hookFunction("DialogGetLockIcon", 20, (args, next) => {
		const item: Item = args[0];
		if (InventoryItemHasEffect(item, "Lock")) {
			if (
				item.Property && item.Property.Name === deviousPadlock.Name
			) {
				if (CurrentCharacter !== null && !CurrentCharacter.IsPlayer() && !CurrentCharacter.DOGS) {
					return next(args);
				}
				if (GameVersion === "R110") return [deviousPadlock.Name];
				return [
					{
						name: deviousPadlock.Name,
						iconSrc: deviousPadlockImage,
						tooltipText: `Locked with Devious Padlock from DOGS mod`
					}
				];
			}
		}
		return next(args);
	});

	hookFunction("InventoryIsPermissionBlocked", 20, (args, next) => {
		const [ C, AssetName, AssetGroup, AssetType ] = args;
		if (AssetName === deviousPadlock.Name) return !canPutDeviousPadlock(AssetGroup, Player, C);
		return next(args);
	});

	hookFunction("InventoryTogglePermission", 20, (args, next) => {
		const item: Item = args[0];
		if (item.Asset.Name === deviousPadlock.Name) return;
		return next(args);
	});

	// Fixing Preview Screen
	hookFunction("DrawPreviewIcons", 20, (args, next) => {
		const icons = args[0];
		if (typeof icons === "object") args[0] = args[0].map((i) => i.name ?? i);
		return next(args);
	});

	hookFunction("DrawImageResize", 20, (args, next) => {
		if (args[0] === `Assets/Female3DCG/ItemMisc/Preview/${deviousPadlock.Name}.png`) {
			args[0] = deviousPadlockImage;
		}
		return next(args);
	});

	hookFunction("CommandExecute", 20, (args, next) => {
		const command = args[0].toLowerCase().trim();
		let prevent = false;
		const blockedCommands = Object.values(modStorage.deviousPadlock.itemGroups ?? {})
			.map((v) => v.blockedCommands ?? [])
			.reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);
		blockedCommands.forEach((c) => {
			if (command?.startsWith(c)) {
				chatSendCustomAction(
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
}

