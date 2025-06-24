import { modStorage } from "./storage";
import { getNickname, version } from "zois-core";
import { hookFunction, HookPriority } from "zois-core/modsApi";
import { messagesManager } from "zois-core/messaging";
import { toastsManager } from "zois-core/popups";


export let remoteControlIsInteracting: boolean = false;
export const setRemoteControlIsInteracting = (value: boolean) => remoteControlIsInteracting = value;
export const remoteControlControllers: number[] = [];

export enum RemoteConnectMinimumRole {
	FRIEND = 0,
	WHITELIST = 1,
	LOVER = 2,
	OWNER = 3
}

export function hasPermissionForRemoteControl(targetId: number): boolean {
	if (!modStorage.remoteControl.state) return false;
	if (modStorage.remoteControl.connectMinimumRole === RemoteConnectMinimumRole.WHITELIST) {
		return (
			Player.IsLoverOfMemberNumber(targetId) ||
			Player.IsOwnedByMemberNumber(targetId) ||
			Player.WhiteList.includes(targetId)
		);
	}
	if (modStorage.remoteControl.connectMinimumRole === RemoteConnectMinimumRole.LOVER) {
		return (
			Player.IsLoverOfMemberNumber(targetId) ||
			Player.IsOwnedByMemberNumber(targetId)
		);
	}
	if (modStorage.remoteControl.connectMinimumRole === RemoteConnectMinimumRole.OWNER) {
		return Player.IsOwnedByMemberNumber(targetId);
	}
	return Player.FriendList.includes(targetId);
}


export function loadRemoteControl(): void {
	messagesManager.onRequest("remoteControlConnect", (data, senderNumber: number, senderName) => {
		if (!hasPermissionForRemoteControl(senderNumber)) {
			return {
				rejectReason: `You don't fit minimum role`
			};
		}
		if (!ServerPlayerIsInChatRoom()) {
			return {
				rejectReason: "Target player is not in chat room right now"
			};
		}
		if (!remoteControlControllers.includes(senderNumber)) {
			remoteControlControllers.push(senderNumber);
		}
		messagesManager.sendLocal(`<b>${senderName} (${senderNumber})</b> remotely connected to you.`);
		return {
			bundle: {
				ID: Player.OnlineID,
				Name: Player.Name,
				ActivePose: Player.ActivePose,
				ArousalSettings: Player.ArousalSettings,
				AssetFamily: Player.AssetFamily,
				BlackList: Player.BlackList,
				BlockItems: Player.BlockItems,
				Crafting: null,
				Creation: Player.Creation,
				Description: Player.Description,
				Difficulty: Player.Difficulty,
				FavoriteItems: {},
				Game: {},
				Inventory: {},
				LimitedItems: {},
				ItemPermission: Player.ItemPermission,
				Lovership: Player.Lovership,
				LabelColor: Player.LabelColor,
				MemberNumber: Player.MemberNumber,
				Nickname: Player.Nickname,
				OnlineSharedSettings: Player.OnlineSharedSettings,
				Owner: Player.Owner,
				Ownership: Player.Ownership,
				Reputation: Player.Reputation,
				Title: Player.Title,
				WhiteList: [],
				Appearance: ServerAppearanceBundle(Player.Appearance)
			} as ServerAccountDataSynced
		};
	});

	messagesManager.onRequest("remoteControlUpdate", (data, senderNumber: number, senderName) => {
		if (
			!hasPermissionForRemoteControl(senderNumber) ||
			!remoteControlControllers.includes(senderNumber) ||
			!data.bundle
		) {
			return {
				wasChanged: false
			};
		}
		ServerAppearanceLoadFromBundle(
			Player,
			Player.AssetFamily,
			data.bundle,
			senderNumber
		);
		ChatRoomCharacterUpdate(Player);
		messagesManager.sendLocal(`<b>${senderName} (${senderNumber})</b> remotely changed your appearance.`);
		if (modStorage.remoteControl.notifyOthers ?? true) {
			messagesManager.sendAction(`${getNickname(Player)}'s appearance was remotely changed`);
		}
		remoteControlControllers.splice(remoteControlControllers.indexOf(senderNumber), 1);
		return {
			wasChanged: true
		}
	});

	hookFunction("DialogMenuButtonBuild", HookPriority.ADD_BEHAVIOR, (args, next) => {
		next(args);
		if (remoteControlIsInteracting) {
			DialogMenuButton = DialogMenuButton.filter((btn) => btn !== "Activity");
		}
	});

	hookFunction("DialogLeave", HookPriority.ADD_BEHAVIOR, (args, next) => {
		if (remoteControlIsInteracting) {
			return DialogLeaveFocusItem();
		}
		return next(args);
	});

	hookFunction("DialogMenuBack", HookPriority.ADD_BEHAVIOR, async (args, next) => {
		if (remoteControlIsInteracting) {
			const toastId = toastsManager.spinner({
				title: "Updating appearance...",
				message: `Member number: ${CurrentCharacter.MemberNumber}`
			});
			const { data, isError } = await messagesManager.sendRequest<{
				wasChanged: boolean
			}>({
				type: "beep",
				message: "remoteControlUpdate",
				data: {
					bundle: ServerAppearanceBundle(CurrentCharacter.Appearance)
				},
				target: CurrentCharacter.MemberNumber
			});
			toastsManager.removeSpinner(toastId);
			setRemoteControlIsInteracting(false);
			DialogLeave();
			if (data.wasChanged) {
				toastsManager.success({
					message: "Your changes was applied",
					duration: 5000
				});
			} else {
				toastsManager.error({
					message: "Your changes wasn't applied",
					duration: 5000
				});
			}
			return;
		}
		return next(args);
	});
}

