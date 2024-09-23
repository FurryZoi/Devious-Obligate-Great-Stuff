import { hookFunction } from "./bcModSdk";
import { modStorage } from "./storage";
import { chatSendBeep, chatSendCustomAction, chatSendLocal, getNickname } from "./utils";

export let remoteControlIsInteracting: boolean = false;
export let remoteControlTarget: number | null = null;
export let remoteControlState: null | "loading" | "interacting" = null;
export const remoteControlControllers: number[] = [];

export function setRemoteControlTarget(target: number | null): void {
    remoteControlTarget = target;
}

export function setRemoteControlState(state: null | "loading" | "interacting"): void {
    remoteControlState = state;
}

export function hasPermissionForRemoteControl(targetId: number): boolean {
	if (!modStorage.remoteControl.state) return false;
	if (modStorage.remoteControl.permission === 2) {
		return (
			Player.IsLoverOfMemberNumber(targetId) ||
			Player.IsOwnedByMemberNumber(targetId)
		);
	}
	if (modStorage.remoteControl.permission === 1) {
		return (
			Player.IsLoverOfMemberNumber(targetId) ||
			Player.IsOwnedByMemberNumber(targetId) ||
			Player.WhiteList.includes(targetId)
		);
	}
	return Player.FriendList.includes(targetId);
}


export function loadRemoteControl(): void {
    hookFunction("DialogMenuButtonBuild", 20, (args, next) => {
        next(args);
        if (remoteControlState === "interacting") {
            DialogMenuButton = DialogMenuButton.filter((btn) => btn !== "Activity");
        }
    });

	hookFunction("DialogLeave", 20, (args, next) => {
		if (remoteControlState === "interacting") {
			return DialogLeaveFocusItem();
		}
		return next(args);
	});

	hookFunction("DialogMenuBack", 20, (args, next) => {
		if (remoteControlState === "interacting") {
			chatSendBeep({
				action: "remoteControlUpdate",
				appearance: ServerAppearanceBundle(CurrentCharacter.Appearance)
			}, remoteControlTarget);
			remoteControlState = null;
			ChatRoomStatusUpdate("");
			DialogLeave();
			return null;
		}
		return next(args);
	});


    hookFunction("ChatRoomRun", 20, (args, next) => {
		switch (remoteControlState) {
			case "loading":
				DrawRect(0, 0, 2e3, 1e3, "#48466D");
				DrawText("Loading...", 1e3, 500, "white", "center");
				return null;
			case "interacting":
				return null;
			default:
				return next(args);
		}
	});

	hookFunction("ServerAccountBeep", 20, (args, next) => {
		const beep: ServerAccountBeepResponse = args[0];
		if (!beep.BeepType) return next(args);
		if (beep.BeepType !== "Leash") {
			return next(args);
		}
		let data: any;

		try {
			data = JSON.parse(beep.Message);
		} catch {
			return next(args);
		}
		if (data.type !== "DOGS") return next(args);

		if (data.action === "remoteControlResponse") {
			if (remoteControlTarget !== beep.MemberNumber) return;
			const C = CharacterLoadOnline(data.bundle, beep.MemberNumber);
			setRemoteControlState("interacting");
			ChatRoomFocusCharacter(C);
			if (!C.AllowItem) C.AllowItem = true;
			DialogChangeMode("items");
			DialogChangeFocusToGroup(C, "ItemArms");
		}
		if (data.action === "remoteControlRequest") {
			if (!hasPermissionForRemoteControl(beep.MemberNumber)) {
				return chatSendBeep({
					action: "remoteControlReject",
					reason: "noPermissions"
				}, beep.MemberNumber);
			}
			if (CurrentScreen !== "ChatRoom") {
				return chatSendBeep({
					action: "remoteControlReject",
					reason: "targetNotInChatRoom"
				}, beep.MemberNumber);
			}
			chatSendBeep({
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
				},
				action: "remoteControlResponse"
			}, beep.MemberNumber);
			if (!remoteControlControllers.includes(beep.MemberNumber)) {
				remoteControlControllers.push(beep.MemberNumber);
			}
			const name = Player.FriendNames.get(beep.MemberNumber) || beep.MemberNumber;
			chatSendLocal(`<!${name}!> used <!remote control!> on you!`);
		}
		if (data.action === "remoteControlUpdate") {
			if (
				!hasPermissionForRemoteControl(beep.MemberNumber)
				|| !remoteControlControllers.includes(beep.MemberNumber)
			) return;
			ServerAppearanceLoadFromBundle(
				Player,
				Player.AssetFamily,
				data.appearance,
				beep.MemberNumber
			);
			const name = Player.FriendNames.get(beep.MemberNumber) || beep.MemberNumber;
			chatSendLocal(`<!${name}!> remotely changed your appearance`);
			chatSendCustomAction(`${getNickname(Player)}'s appearance was remotely changed`);
			ChatRoomCharacterUpdate(Player);
			remoteControlControllers.splice(remoteControlControllers.indexOf(beep.MemberNumber), 1);
		}
		if (data.action === "remoteControlReject") {
			if (remoteControlTarget !== beep.MemberNumber) return;
			if (data.reason === "targetNotInChatRoom") {
				chatSendLocal("The player is not in the <!chat room!>!");
			} else if (data.reason === "noPermissions") {
				chatSendLocal("You dont have <!permission!> to use <!remote control!> on this player!");
			} else {
				chatSendLocal("For <!unknown reasons!>, you failed to use <!remote control!> on this player!");
			}
			remoteControlState = null;
		}
		next(args);
	});



}

