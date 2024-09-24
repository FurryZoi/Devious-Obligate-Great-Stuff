import { hookFunction, patchFunction } from "./bcModSdk";
import { modStorage } from "./storage";
import { beautifyMessage, chatSendCustomAction, chatSendDOGSMessage, getNickname, getPlayer, notify, requestButtons, waitFor } from "./utils";
import { remoteControlState } from "./remoteControl";
import deviousPadlockImage from "@/images/devious-padlock.png";
import backArrowImage from "@/images/back-arrow.png";


const deviousPadlock = {
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

const chaosPadlockAccessPermissionsList = [
	"Everyone except wearer", "Wearer's family and higher",
	"Wearer's lovers and higher", "Wearer's owner"
];

let deviousPadlockMenuData = null;
let deviousPadlockMenuLastData = null;

const chaosPadlockRestrictions = {
	forbidWardrobe: 1000,
	forbidSee: 1001,
	forbidBondageOthers: 1002,
	forbidPoses: 1003,
	forbidWalk: 1004,
	forbidMove: 1005,
	forbidRoomAdmin: 1006,
	forceTitle: 1007
};


function createDeviousPadlock(): void {
	AssetFemale3DCG.forEach(ele => {
		if(ele.Group === "ItemMisc") {
			ele.Asset.push(deviousPadlock);
		}
	});
	
	const assetGroup = AssetGroupGet("Female3DCG", "ItemMisc");
	AssetAdd(assetGroup, deviousPadlock, AssetFemale3DCGExtended);
	AssetGet("Female3DCG", "ItemMisc", deviousPadlock.Name).Description = "Devious Padlock";
	InventoryAdd(Player, deviousPadlock.Name, "ItemMisc");
}

function convertExclusivePadlockToDeviousPadlock(item: Item): void {
	if (item.Property?.Name !== deviousPadlock.Name) {
		item.Property.Name = deviousPadlock.Name;
	}
}

function registerDeviousPadlockInModStorage(group: AssetGroupName, ownerId: number): void {
	if (!modStorage.deviousPadlock.itemGroups) {
		modStorage.deviousPadlock.itemGroups = {};
	}
	const item = ServerAppearanceBundle(Player.Appearance).filter((item) => {
		return item.Group === group;
	})[0];
	modStorage.deviousPadlock.itemGroups[group] = {
		item, owner: ownerId
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
	};
	deviousPadlockMenuLastData = JSON.parse(JSON.stringify(deviousPadlockMenuData));

	const menu = document.createElement("div");
	menu.id = "dogsFullScreen";
	menu.style = "height: 70vw;";
	menu.append(getDeviousPadlockMenu(target, itemGroup, menu, "main"));
	document.body.append(menu);
}

function canAccessChaosPadlock(groupName: string, target1: Character, target2: Character): boolean {
	if (!target1.CanInteract()) return false;
	if (!target1.IsPlayer() && !target1.DOGS) return false;
	if (!target2.IsPlayer() && !target2.DOGS) return false;
	if (target1.MemberNumber === target2.MemberNumber) return false;
	const owner = target2.IsPlayer() ? modStorage.deviousPadlock.itemGroups[groupName].owner : target2.DOGS.deviousPadlock.itemGroups[groupName].owner;
	const permissionKey = target2.IsPlayer() ? (modStorage.deviousPadlock.itemGroups[groupName].accessPermission ?? 0) : (target2.DOGS.deviousPadlock.itemGroups[groupName].accessPermission ?? 0);
	const memberNumbers = target2.IsPlayer() ? (modStorage.deviousPadlock.itemGroups[groupName].memberNumbers ?? []) : (target2.DOGS.deviousPadlock.itemGroups[groupName].memberNumbers ?? []);
	if (target1.MemberNumber === owner || memberNumbers.includes(target1.MemberNumber)) return true;
	if (permissionKey === 0) return target1.MemberNumber !== target2.MemberNumber;
	if (permissionKey === 1) return target1.IsInFamilyOfMemberNumber(target2.MemberNumber) || target1.IsLoverOfCharacter(target2) || target2.IsOwnedByCharacter(target1);
	if (permissionKey === 2) return target1.IsLoverOfCharacter(target2) || target2.IsOwnedByCharacter(target1);
	if (permissionKey === 3) return target2.IsOwnedByCharacter(target1);
	return true;
}

function canSetAccessPermission(target1: Character, target2: Character, permissionKey: number): boolean {
	if (permissionKey === 0) return target1.MemberNumber !== target2.MemberNumber;
	if (permissionKey === 1) return target1.IsInFamilyOfMemberNumber(target2.MemberNumber) || target1.IsLoverOfCharacter(target2) || target2.IsOwnedByCharacter(target1);
	if (permissionKey === 2) return target1.IsLoverOfCharacter(target2) || target2.IsOwnedByCharacter(target1);
	if (permissionKey === 3) return target2.IsOwnedByCharacter(target1);
	return false;
}

function onAppearanceChange(target1: Character, target2: Character): void {
	if (target2.IsPlayer()) checkDeviousPadlocks(target1);
}

function checkDeviousPadlocks(target: Character): void {
	if (target.IsPlayer()) {
		if (modStorage.deviousPadlock.itemGroups) {
			Object.keys(modStorage.deviousPadlock.itemGroups).forEach(async (group) => {
				const lockedItem = ServerAppearanceBundle(Player.Appearance).filter((item) => {
					return item.Group === group;
				})[0];

				const property = lockedItem?.Property;
				const padlockChanged = !(
					property?.Name === deviousPadlock.Name
					&& property?.LockedBy === "ExclusivePadlock"
				);

				if (
					JSON.stringify(lockedItem) !== 
					JSON.stringify(modStorage.deviousPadlock.itemGroups[group].item)
					|| padlockChanged
				) {
					const newItem = Object.assign({}, modStorage.deviousPadlock.itemGroups[group].item);

					ServerSend("ChatRoomCharacterUpdate", {
						ID:
							Player.ID === 0
								? Player.OnlineID
								: Player.AccountName.replace("Online-", ""),
						ActivePose: Player.ActivePose,
						Appearance: ServerAppearanceBundle(Player.Appearance)
							.filter((item) => {
								return item.Group !== group;
							})
							.concat([newItem])
					});
					if (padlockChanged) {
						await waitFor(() => {
							return !!InventoryGet(Player, group);
						});
						const itemName = InventoryGet(Player, group).Craft?.Name 
							? InventoryGet(Player, group).Craft.Name 
							: InventoryGet(Player, group).Asset.Description;
						chatSendCustomAction(`Chaos padlock appears again on ${getNickname(Player)}'s ${itemName}`);
					}
				}
			});
		}
	} else {
		if (modStorage.deviousPadlock.itemGroups) {
			Object.keys(modStorage.deviousPadlock.itemGroups).forEach(async (group) => {
				const lockedItem = ServerAppearanceBundle(Player.Appearance).filter((item) => {
					return item.Group === group;
				})[0];

				const property = lockedItem?.Property;
				const padlockChanged = !(
					property?.Name === deviousPadlock.Name
					&& property?.LockedBy === "ExclusivePadlock"
				);

				if (
					JSON.stringify(lockedItem) !== 
					JSON.stringify(modStorage.deviousPadlock.itemGroups[group].item)
				) {
					if (!canAccessChaosPadlock(group, target, Player)) {
						const newItem = Object.assign({}, modStorage.deviousPadlock.itemGroups[group].item);

						ServerSend("ChatRoomCharacterUpdate", {
							ID:
								Player.ID === 0
									? Player.OnlineID
									: Player.AccountName.replace("Online-", ""),
							ActivePose: Player.ActivePose,
							Appearance: ServerAppearanceBundle(Player.Appearance)
								.filter((item) => {
									return item.Group !== group;
								})
								.concat([newItem])
						});
						if (padlockChanged) {
							await waitFor(() => {
								return !!InventoryGet(Player, group);
							});
							const itemName = InventoryGet(Player, group).Craft?.Name 
								? InventoryGet(Player, group).Craft.Name 
								: InventoryGet(Player, group).Asset.Description;
							chatSendCustomAction(`Devious padlock appears again on ${getNickname(Player)}'s ${itemName}`);
						}
					} else {
						if (padlockChanged) {
							delete modStorage.deviousPadlock.itemGroups[group];
						} else {
							modStorage.deviousPadlock.itemGroups[group].item = lockedItem;
						}
					}
				}
			});
		}
	}

	ServerAppearanceBundle(Player.Appearance).forEach((item) => {
		if (
			item.Property?.Name === deviousPadlock.Name &&
			item.Property?.LockedBy === "ExclusivePadlock"
		) {
			if (
				!modStorage.deviousPadlock.itemGroups ||
				!modStorage.deviousPadlock.itemGroups[item.Group]
			) {
				if (!modStorage.deviousPadlock.state) {
					InventoryUnlock(Player, item.Group);
					ChatRoomCharacterUpdate(Player);					
				} else registerDeviousPadlockInModStorage(item.Group, target.MemberNumber);
			}
		}
	});
}

function checkDeviousPadlocksTimers(): void {
	if (!modStorage.deviousPadlock.itemGroups) return;
	Object.keys(modStorage.deviousPadlock.itemGroups).forEach((group: AssetGroupName) => {
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
	if (page === "main") {
		const itemPreviewLink = `https://www.bondage-europe.com/${GameVersion}/BondageClub/Assets/Female3DCG/${group.Name}/Preview/${item.Asset.Name}.png`;

		const centerBlock = document.createElement("div");
		centerBlock.style = "display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; width: 100%; height: 100%;";

		const preview = document.createElement("div");
		preview.style = "position: relative; width: 20%; height: 20%; max-width: 150px; max-height: 150px;";

		const previewItem = document.createElement("img");
		previewItem.src = itemPreviewLink;
		previewItem.style = "background: white; width: 100%; height: 100%;";

		const previewPadlock = document.createElement("img");
		previewPadlock.src = deviousPadlockImage;
		previewPadlock.style = "z-index: 10; width: 20%; height: 20%; position: absolute; left: 2px; top: 2px;";

		const description = document.createElement("p");
		description.innerHTML = beautifyMessage(
			`Padlock can be managed only by users who <!correspond!> to the <!access permissions!><br><span style="color: #ff0000;">Protected from cheats</span>`
		);
		description.style = "width: 100%; text-align: center; background: rgb(63 61 104); padding: 1vw; color: white; text-align: center; font-size: clamp(12px, 3vw, 24px); margin-top: 1.5vw;";
		
		const owner = document.createElement("p");
		owner.innerHTML = beautifyMessage(
			`Owner of the padlock: <!${
				getPlayer(deviousPadlockMenuData.owner) ? `${getNickname(getPlayer(deviousPadlockMenuData.owner))} (${deviousPadlockMenuData.owner})` : `${deviousPadlockMenuData.owner}`
			}!>`
		);
		owner.style = "width: 100%; text-align: center; background: rgb(63 61 104); padding: 1vw; color: white; text-align: center; font-size: clamp(12px, 3vw, 24px); margin-top: 1.5vw;";

		const time = document.createElement("div");
		time.style = "width: 100%; margin-top: 1.5vw; width: 100%; background: rgb(63 61 104); padding: 1vw; display: flex; flex-direction: column; align-items: center;";

		const timeText = document.createElement("p");
		timeText.textContent = "When should the lock be removed? (Leave this field empty for permanent 😉)";
		timeText.style = "font-size: clamp(12px, 3vw, 24px); margin-top: 1vw; color: white; text-align: center;";

		const timeField = document.createElement("input");
		timeField.type = "datetime-local";
		timeField.classList.add("dogsTextEdit");
		if (!canAccessChaosPadlock(group.Name, Player, target)) {
			timeField.classList.add("disabled");
		}
		timeField.style = "background: rgb(99 96 147); margin-top: 1vw; width: 80%; height: 4vw; min-height: 15px; font-size: clamp(12px, 3vw, 24px);";
		timeField.value = deviousPadlockMenuData.unlockTime
			? deviousPadlockMenuData.unlockTime
			: "";
		timeField.addEventListener("change", function (e) {
			deviousPadlockMenuData.unlockTime = e.target.value;
		});

		const rowBtns = document.createElement("div");
		rowBtns.style = "display: flex; align-items: center; gap: 0 1vw;";

		// const manageRestrictionsBtn = document.createElement("button");
		// manageRestrictionsBtn.classList.add("dogsBtn");
		// manageRestrictionsBtn.style = "color: white; font-size: 2.5vw; margin-top: 2vw;";
		// manageRestrictionsBtn.textContent = `Manage restrictions`;
		// manageRestrictionsBtn.addEventListener("click", function () {
		// 	centerBlock.remove();
		// 	menuElement.append(getChaosPadlockMenu(target, group, menuElement, "restrictions"));
		// });

		const noteBtn = document.createElement("button");
		noteBtn.classList.add("dogsBtn");
		noteBtn.style = "color: white; font-size: clamp(12px, 4vw, 24px); margin-top: 2vw;";
		noteBtn.textContent = `Note`;
		noteBtn.addEventListener("click", function () {
			centerBlock.remove();
			menuElement.append(getDeviousPadlockMenu(target, group, menuElement, "note"));
		});

		const accessBtn = document.createElement("button");
		accessBtn.classList.add("dogsBtn");
		accessBtn.style = "color: white; font-size: clamp(12px, 4vw, 24px); margin-top: 2vw;";
		accessBtn.textContent = `Access`;
		accessBtn.addEventListener("click", function () {
			centerBlock.remove();
			menuElement.append(getDeviousPadlockMenu(target, group, menuElement, "access"));
		});

		const closeBtn = document.createElement("button");
		closeBtn.textContent = "x";
		closeBtn.style = "display: flex; align-items: center; justify-content: center; position: absolute; top: 5px; right: 5px; min-width: 17px; min-height: 17px; width: 6vw; height: 6vw; font-size: 4.5vw;";
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

		preview.append(previewItem, previewPadlock);
		time.append(timeText, timeField);
		rowBtns.append(noteBtn, accessBtn);
		centerBlock.append(
			preview, description, owner, time,
			rowBtns, closeBtn
		);

		return centerBlock;
	}

	// if (page === "restrictions") {
	// 	const centerBlock = document.createElement("div");
	// 	centerBlock.style = "display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; width: 100%; height: 100%;";

	// 	const backBtn = document.createElement("button");
	// 	backBtn.style = "display: flex; align-items: center; justify-content: center; position: absolute; top: 5px; right: 5px; min-width: 17px; min-height: 17px; width: 6vw; height: 6vw; font-size: 4.5vw;";
	// 	backBtn.classList.add("dogsBtn");
	// 	backBtn.addEventListener("click", function () {
	// 		centerBlock.remove();
	// 		menuElement.append(getChaosPadlockMenu(target, group, menuElement, "main"));	
	// 	});

	// 	const backBtnIcon = document.createElement("img");
	// 	backBtnIcon.style = "width: 75%; height: auto;";
	// 	backBtnIcon.src = `${staticPath}/images/back-arrow.png`;
	// 	backBtn.append(backBtnIcon);

	// 	const checkBoxes = document.createElement("div");

	// 	Object.keys(chaosPadlockRestrictionsTexts).forEach((id, i) => {
	// 		id = parseInt(id);
	// 		const checkBox = document.createElement("div");
	// 		checkBox.style = "margin-top: 2vw;"
	// 		checkBox.classList.add("dogsCheckBox");
	// 		if (!hasPermissionToChangeChaosPadlockConfigurations(group.Name, Player, target)) {
	// 			checkBox.classList.add("disabled");
	// 		}

	// 		const checkBoxBtn = document.createElement("div");
	// 		if (chaosPadlockMenuData.restrictions.list.includes(String.fromCharCode(id))) {
	// 			checkBoxBtn.setAttribute("checked", "true");
	// 		}
	// 		checkBoxBtn.classList.add("dogsCheckBox-btn");
	// 		checkBoxBtn.addEventListener("click", async function (e) {
	// 			if (!chaosPadlockMenuData.restrictions.list.includes(String.fromCharCode(id))) {
	// 				if (id === chaosPadlockRestrictions.forceTitle) {
	// 					const btns = TitleList.map((t) => {
	// 						return {text: t.Name}
	// 					});
	// 					const title = await requestButtons(`Choose title, which you want to force for <!${getNickname(target)}!> (If <!${getNickname(target)}!> doesnt have this title unlocked, then it will not work)`, 90, 1200, btns);
	// 					chaosPadlockMenuData.restrictions.data.title = title;
	// 				}
	// 				e.target.setAttribute("checked", "true");
	// 				chaosPadlockMenuData.restrictions.list += String.fromCharCode(id);
	// 			} else {
	// 				e.target.setAttribute("checked", "false");
	// 				chaosPadlockMenuData.restrictions.list = chaosPadlockMenuData.restrictions.list.replaceAll(String.fromCharCode(id), "");
	// 			}
	// 		});

	// 		const checkBoxText = document.createElement("p");
	// 		checkBoxText.style = "color: white; font-size: 2.5vw;";
	// 		checkBoxText.textContent = Object.values(chaosPadlockRestrictionsTexts)[i];

	// 		checkBox.append(checkBoxBtn, checkBoxText);
	// 		checkBoxes.append(checkBox);
	// 	});

	// 	centerBlock.append(checkBoxes, backBtn);
	// 	return centerBlock;
	// }

	if (page === "note") {
		const centerBlock = document.createElement("div");
		centerBlock.style = "display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; width: 100%; height: 100%;";

		const backBtn = document.createElement("button");
		backBtn.style = "display: flex; align-items: center; justify-content: center; position: absolute; top: 5px; right: 5px; min-width: 17px; min-height: 17px; width: 6vw; height: 6vw; font-size: 4.5vw;";
		backBtn.classList.add("dogsBtn");
		backBtn.addEventListener("click", function () {
			centerBlock.remove();
			menuElement.append(getDeviousPadlockMenu(target, group, menuElement, "main"));	
		});

		const backBtnIcon = document.createElement("img");
		backBtnIcon.style = "width: 75%; height: auto;";
		backBtnIcon.src = backArrowImage;
		backBtn.append(backBtnIcon);

		const note = document.createElement("textarea");
		note.classList.add("dogsTextEdit");
		if (!canAccessChaosPadlock(group.Name, Player, target)) {
			note.classList.add("disabled");
		}
		note.style = "width: 75%; height: 30%; font-size: clamp(12px, 4vw, 24px);";
		note.placeholder = "You can leave a note that other DOGS users can see";
		note.value = deviousPadlockMenuData.note
			? deviousPadlockMenuData.note
			: "";
		note.addEventListener("change", function (e) {
			deviousPadlockMenuData.note = e.target.value;
		});

		centerBlock.append(note, backBtn);
		return centerBlock;
	}

	if (page === "access") {
		const centerBlock = document.createElement("div");
		centerBlock.style = "display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; width: 100%; height: 100%;";

		const backBtn = document.createElement("button");
		backBtn.style = "display: flex; align-items: center; justify-content: center; position: absolute; top: 5px; right: 5px; min-width: 17px; min-height: 17px; width: 6vw; height: 6vw; font-size: 4.5vw;";
		backBtn.classList.add("dogsBtn");
		backBtn.addEventListener("click", function () {
			centerBlock.remove();
			menuElement.append(getDeviousPadlockMenu(target, group, menuElement, "main"));	
		});

		const backBtnIcon = document.createElement("img");
		backBtnIcon.style = "width: 75%; height: auto;";
		backBtnIcon.src = backArrowImage;
		backBtn.append(backBtnIcon);

		const memberNumbersText = document.createElement("p");
		memberNumbersText.style = "color: white; width: 75%; font-size: clamp(12px, 4vw, 24px); text-align: center;";
		memberNumbersText.textContent = "Member numbers which will always have access to the padlock";

		const memberNumbers = document.createElement("textarea");
		memberNumbers.classList.add("dogsTextEdit");
		if (!canAccessChaosPadlock(group.Name, Player, target)) {
			memberNumbers.classList.add("disabled");
		}
		memberNumbers.placeholder = "Member numbers";
		memberNumbers.style = "width: 75%; height: 6.5vw; margin-top: 1vw; font-size: clamp(12px, 4vw, 24px);";
		memberNumbers.value = deviousPadlockMenuData.memberNumbers
			? deviousPadlockMenuData.memberNumbers.join(", ")
			: "";
		memberNumbers.addEventListener("change", function (e) {
			deviousPadlockMenuData.memberNumbers = e.target.value.split(",").map((n) => parseInt(n));
		});

		const currentAccessSetting = document.createElement("p");
		currentAccessSetting.innerHTML = beautifyMessage(`Current access permission: <!${chaosPadlockAccessPermissionsList[deviousPadlockMenuData.accessPermission]}!>`);
		currentAccessSetting.style = "margin-top: 2.5vw; color: white; text-align: center; font-size: clamp(12px, 4vw, 24px);";

		const accessSettings = document.createElement("div");
		accessSettings.style = "display: flex; align-items: center; column-gap: 2vw; margin-top: 2vw;";

		const leftBtn = document.createElement("button");
		leftBtn.classList.add("dogsBtn");
		leftBtn.textContent = "<<";
		leftBtn.style = "display: flex; align-items: center; justify-content: center; width: 4vw; height: 4vw; border-radius: 50%;";
		leftBtn.addEventListener("click", function () {
			const index = chaosPadlockAccessPermissionsList.indexOf(accessText.textContent);
			if (index > 0) {
				accessText.textContent = chaosPadlockAccessPermissionsList[index - 1];
			} else {
				accessText.textContent = chaosPadlockAccessPermissionsList[index];
			}
		});

		const accessText = document.createElement("p");
		accessText.textContent = chaosPadlockAccessPermissionsList[deviousPadlockMenuData.accessPermission];
		accessText.style = "text-align: center; color: white; font-size: clamp(12px, 4vw, 24px);";

		const rightBtn = document.createElement("button");
		rightBtn.classList.add("dogsBtn");
		rightBtn.textContent = ">>";
		rightBtn.style = "display: flex; align-items: center; justify-content: center; width: 4vw; height: 4vw; border-radius: 50%;";
		rightBtn.addEventListener("click", function () {
			const index = chaosPadlockAccessPermissionsList.indexOf(accessText.textContent);
			if (index < chaosPadlockAccessPermissionsList.length - 1) {
				accessText.textContent = chaosPadlockAccessPermissionsList[index + 1];
			} else {
				accessText.textContent = chaosPadlockAccessPermissionsList[index];
			}
		});

		const submitBtn = document.createElement("button");
		submitBtn.classList.add("dogsBtn");
		submitBtn.textContent = "Submit";
		submitBtn.addEventListener("click", function () {
			if (!canSetAccessPermission(Player, target, chaosPadlockAccessPermissionsList.indexOf(accessText.textContent))) {
				return notify("Not enough rights to set this access permission", 5000, "rgb(137 133 205)", "white");
			}
			deviousPadlockMenuData.accessPermission = chaosPadlockAccessPermissionsList.indexOf(accessText.textContent);
			currentAccessSetting.innerHTML = beautifyMessage(`Current access permission: <!${accessText.textContent}!>`);
		});

		accessSettings.append(leftBtn, accessText, rightBtn, submitBtn);
		centerBlock.append(memberNumbersText, memberNumbers, currentAccessSetting, accessSettings, backBtn);
		return centerBlock;
	}
}

export function loadDeviousPadlock(): void {
	createDeviousPadlock();
	checkDeviousPadlocks(Player);
	setInterval(checkDeviousPadlocksTimers, 1000);

	hookFunction("DialogItemClick", 20, async (args, next) => {
		const C = CharacterGetCurrent();
		const focusGroup = C.FocusGroup;
		const item = InventoryGet(C, focusGroup.Name);
		const clickedItem = args[0];
		if (DialogMenuMode !== "locking") return next(args);
		if (!item) return next(args);
		
		if (
			clickedItem?.Asset?.Name === deviousPadlock.Name && 
			!InventoryIsPermissionBlocked(C, deviousPadlock.Name, "ItemMisc")
		) {
			if (C.IsPlayer()) {
				if (!modStorage.deviousPadlock.state) {
					return notify(`Your devious padlock module is <!disabled!>`, 4000);
				}
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
			} else if (!C.DOGS?.deviousPadlock.state) {
				return notify(`<!${getNickname(C)}'s!> devious padlock module is <!disabled!>`, 4000);
			}

			InventoryLock(C, item, "ExclusivePadlock", Player.MemberNumber);
			convertExclusivePadlockToDeviousPadlock(
				item
			);
			ChatRoomCharacterUpdate(C);
			if (C.IsPlayer()) {
				chatSendCustomAction(`${getNickname(Player)} uses devious padlock on <possessive> ${
					item.Craft?.Name ? item.Craft.Name : item.Asset.Description
				}`);
			} else {
				chatSendCustomAction(`${getNickname(Player)} uses devious padlock on ${getNickname(C)}'s ${
					item.Craft?.Name ? item.Craft.Name : item.Asset.Description
				}`);
			}
			DialogLeave();
			return;
		}

		next(args);
	});

	hookFunction("InventoryItemMiscExclusivePadlockDraw", 20, (args, next) => {
		const item = InventoryGet(CurrentCharacter, CurrentCharacter.FocusGroup.Name);
		if (item.Property?.Name === deviousPadlock.Name) {
			inspectDeviousPadlock(CurrentCharacter, item, CurrentCharacter.FocusGroup);
			DialogChangeMode("items");
			return;
		}
		next(args);
	});

	hookFunction("DialogCanUnlock", 20, (args, next) => {
		const [ target, item ] = args;

		if (item?.Property?.Name === deviousPadlock.Name) return canAccessChaosPadlock(target.FocusGroup?.Name, Player, target);
		return next(args);
	});

	hookFunction("InventoryUnlock", 20, (args, next) => {
		const [ target, group ] = args;
		const item = InventoryGet(target, group);
		if (item?.Property?.Name === deviousPadlock.Name) {
			delete item.Property.Name;
		}
		return next(args);
	});

	hookFunction("DialogSetStatus", 20, (args, next) => {
		const [ status ] = args;
		if (
			typeof status === "string" &&
			status.startsWith("This looks like its locked by a") &&
			InventoryGet(CurrentCharacter, CurrentCharacter?.FocusGroup?.Name)
				?.Property?.Name === deviousPadlock.Name
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

	hookFunction("DrawImageResize", 20, (args, next) => {
		var path = args[0];
		if (typeof path === "object") return next(args);
		if (!!path && path === `Assets/Female3DCG/ItemMisc/Preview/${deviousPadlock.Name}.png`) {
			args[0] = deviousPadlockImage;
		} 
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
				console.log(data);
				if (!modStorage.deviousPadlock.itemGroups[data.group]) return;
				if (!canAccessChaosPadlock(data.group, sender, Player)) {
					return;
				}
				if (data.accessPermission && canSetAccessPermission(sender, Player, data.accessPermission)) {
					modStorage.deviousPadlock.itemGroups[data.group as AssetGroupName].accessPermission = data.accessPermission;
				}
				if (Array.isArray(data.memberNumbers)) {
					modStorage.deviousPadlock.itemGroups[data.group as AssetGroupName].memberNumbers = data.memberNumbers;
				}
				if (typeof data.unlockTime === "string") {
					modStorage.deviousPadlock.itemGroups[data.group as AssetGroupName].unlockTime = data.unlockTime;
				}
				if (typeof data.note === "string") {
					modStorage.deviousPadlock.itemGroups[data.group as AssetGroupName].note = data.note;
				}
			}
		}
		next(args);
	});

	patchFunction("DialogGetLockIcon", {
		[`if (InventoryItemHasEffect(item, "Lock")) {`]:
		`
		if (InventoryItemHasEffect(item, "Lock")) {
			if (item.Property && item.Property.Name === "DeviousPadlock") {
				icons.push("DeviousPadlock");
				return icons; }
		`
	});

}

