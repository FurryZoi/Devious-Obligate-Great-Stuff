export function sleep(ms: number): Promise<() => {}> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function waitFor(func: () => boolean, cancelFunc = () => false): Promise<boolean> {
	while (!func()) {
		if (cancelFunc()) {
			return false;
		}
		// eslint-disable-next-line no-await-in-loop
		await sleep(10);
	}
	return true;
}

export function getPlayer(value: string | number): Character {
	if (!value) return;
	return ChatRoomCharacter.find((Character) => {
		return (
			Character.MemberNumber == value ||
			Character.Name.toLowerCase() === value ||
			Character.Nickname?.toLowerCase() === value
		);
	});
}

export function getNickname(target: Character): string {
	return CharacterNickname(target);
}

export function beautifyMessage(message: string): string {
	message = message
		.replaceAll("<!", `<span style='color: #48AA6D;'>`)
		.replaceAll("!>", "</span>")
		// .replaceAll(
		// 	"<%",
		// 	`<div style='font-size: 1.1vw; text-align: center; background: ${blueColor}; padding: 4px; border-radius: 8px;'>`
		// )
		// .replaceAll("%>", "</div>")
		// .replaceAll("<*", `<span style='font-size: 1.2vw; color: #de99d9;'>`)
		// .replaceAll("*>", "</span>");
	return message;
}

// export function consoleLog(text: string): void {
// 	console.log(
// 		`%cBCC%c${text}`,
// 		`font-weight: bold; padding: 3px; background: ${pinkColor}; color: ${purpleColor};`,
// 		`padding: 3px 4px; background: ${purpleColor}; color: white;`
// 	);
// }

export function chatSendDOGSMessage(msg: string, _data = undefined, targetNumber = undefined): void {
	const data: ServerChatRoomMessage = {
		Content: "dogsMsg",
		Dictionary: {
			msg
		},
		Type: "Hidden",
	};
	if (_data) data.Dictionary.data = _data;
	if (targetNumber) data.Target = targetNumber;
	ServerSend("ChatRoomChat", data);
}

export function chatSendBeep(data: any, targetId: number): void {
	const beep = {
		IsSecret: true,
		BeepType: "Leash",
		MemberNumber: targetId,
		Message: JSON.stringify({
			type: "DOGS",
			...data
		})
	};

	ServerSend("AccountBeep", beep);
}

export function chatSendCustomAction(message: string): void {
	if (!ServerPlayerIsInChatRoom()) return;

	const isFemale = CharacterPronounDescription(Player) === "She/Her";
	const capPossessive = isFemale ? "Her" : "His";
	const capIntensive = isFemale ? "Her" : "Him";
	const capSelfIntensive = isFemale ? "Herself" : "Himself";
	const capPronoun = isFemale ? "She" : "He";

	message = message
		.replaceAll("<Possessive>", capPossessive)
		.replaceAll("<possessive>", capPossessive.toLocaleLowerCase())
		.replaceAll("<Intensive>", capIntensive)
		.replaceAll("<intensive>", capIntensive.toLocaleLowerCase())
		.replaceAll("<SelfIntensive>", capSelfIntensive)
		.replaceAll("<selfIntensive>", capSelfIntensive.toLocaleLowerCase())
		.replaceAll("<Pronoun>", capPronoun)
		.replaceAll("<pronoun>", capPronoun.toLocaleLowerCase());

	// Taken from LSCG
	ServerSend("ChatRoomChat", {
		Content: "Beep", 
		Type: "Action",
		Dictionary: [
			// EN
			{ Tag: "Beep", Text: "msg" },
			// CN
			{ Tag: "发送私聊", Text: "msg" },
			// DE
			{ Tag: "Biep", Text: "msg" },
			// FR
			{ Tag: "Sonner", Text: "msg" },
			// Message itself
			{ Tag: "msg", Text: message }
		]
	});
}

export function notify(
	message: string, duration: number = 3000, notificationColor: string = "rgb(72,70,109)",
	sliderColor: string = "rgb(61,132,168)"
): void {
	if (document.querySelector("#dogsNotificationBlock")) {
		document.querySelector("#dogsNotificationBlock").remove();
	}
	
	const targetElement: HTMLDivElement = document.querySelector("#dogsFullScreen") ?
		document.querySelector("#dogsFullScreen")
		: document.querySelector("#MainCanvas");

	const notificationCenterBlock: HTMLDivElement = document.createElement("div");
	notificationCenterBlock.id = "dogsNotificationBlock";
	notificationCenterBlock.classList.add("adaptive-font-size");
	notificationCenterBlock.style = `position: absolute; top: ${(document.body.offsetHeight - targetElement.offsetHeight) / 2 + 2}px; margin-left: 50%; transform: translateX(-50%); z-index: 100; font-family: Comfortaa;`;

	const notification = document.createElement("div");
	notification.style = `position: relative; display: flex; justify-content: center; align-items: center; background: ${notificationColor}; color: white; min-width: 150px; padding: 1.4vw; border-radius: clamp(2px, 0.6vw, 4px);`;

	const notificationContent = document.createElement("p");
	notificationContent.style = "text-align: center; width: 90%;";
	notificationContent.innerHTML = beautifyMessage(message);

	const notificationSlider = document.createElement("div");
	notificationSlider.style = `position: absolute; left: 0; bottom: 0; width: 0; height: 0.5vw; max-height: 3px; background: ${sliderColor}; border-radius: clamp(2px, 0.6vw, 4px);`;

	const notificationCloseBtn = document.createElement("div");
	notificationCloseBtn.textContent = "x";
	notificationCloseBtn.style = "cursor: pointer; position: absolute; top: 0.4vw; right: 1vw; color: white; font-size: clamp(12px, 3vw, 26px);";
	notificationCloseBtn.addEventListener("click", () => {
		clearInterval(i);
		notificationCenterBlock.remove();
	});

	notification.append(notificationContent, notificationSlider, notificationCloseBtn);
	notificationCenterBlock.append(notification);
	document.body.append(notificationCenterBlock);

	window.onresize = () => {
		notificationCenterBlock.style = `position: absolute; top: ${(document.body.offsetHeight - targetElement.offsetHeight) / 2 + 2}px; margin-left: 50%; transform: translateX(-50%); z-index: 100; font-family: Comfortaa;`;
	};

	const i = setInterval(() => {
		notificationSlider.style.width = `${parseInt(notificationSlider.style.width.replace("%", ""))+1}%`;
		if (parseInt(notificationSlider.style.width.replace("%", "")) >= 100) {
			clearInterval(i);
			notificationCenterBlock.remove();
		}
	}, duration / 100);
}

export async function requestButtons(l: string, w: number, maxw: number, btns: {text: string}[]): Promise<string> {
	if (document.querySelector("#dogsPopupContainer")) {
		document.querySelector("#dogsPopupContainer").remove();
	}

	const container = document.createElement("div");
	container.id = "dogsPopupContainer";

	const popup = document.createElement("div");
	popup.id = "dogsPopup";
	popup.classList.add("adaptive-font-size");
	popup.style = `width: ${w}%; min-width: 170px; max-width: ${maxw}px;`;

	const label = document.createElement("p");
	label.style = `color: white; text-align: center; padding: 0px 8px;`;
	label.innerHTML = beautifyMessage(l);

	const btnsBlock = document.createElement("div");
	btnsBlock.style = "display: flex; align-items: center; justify-content: center; flex-wrap: wrap; width: 100%; margin-top: 10px; gap: 10px;";

	btns.forEach((btn) => {
		const el = document.createElement("button");
		el.innerText = btn.text;
		el.classList.add("dogsSquare");
		el.classList.add("adaptive-font-size");
		el.style = `text-wrap: wrap; text-align: center;`; 
		btnsBlock.append(el);
	});

	popup.append(label, btnsBlock);
	container.append(popup);
	document.body.append(container);

	return new Promise((resolve, reject) => {
		btnsBlock.childNodes.forEach((btn) => {
			btn.addEventListener("click", (e) => {
				resolve((e.target as HTMLButtonElement).innerText);
				container.remove();
			});
		});
	});
}


export function chatSendLocal(message: string, align: "center" | "left" = "center", bgColor = "rgb(72,70,109)"): void {
	if (!ServerPlayerIsInChatRoom()) return;
	let style;
	if (align === "center") {
		style = `border-left: clamp(1px, 1vw, 4px) solid white; border-top-left-radius: clamp(2px, 0.6vw, 4px); border-bottom-left-radius: clamp(2px, 0.6vw, 4px); position: relative; box-sizing: border-box; font-size: 2vw; font-family: Comfortaa; margin-top: 4px; margin-bottom: 4px; background: ${bgColor}; color: white; padding: 1vw; text-align: center;`;
	} else if (align === "left") {
		style = `border-left: clamp(1px, 1vw, 4px) solid whhite; border-top-left-radius: clamp(2px, 0.6vw, 4px); border-bottom-left-radius: clamp(2px, 0.6vw, 4px); position: relative; box-sizing: border-box; font-size: 2vw; font-family: Comfortaa; margin-top: 4px; margin-bottom: 4px; background: ${bgColor}; color: white;`;
	}

	const msgElement = document.createElement("div");
	msgElement.innerHTML = beautifyMessage(message);
	msgElement.style = style;
	msgElement.classList.add("dogsMessageBlock");
	const time = document.createElement("div");
	time.style = "position: absolute; font-size: 1.5vw; padding: 1px; text-align: center; background: white; color: rgb(72,70,109); bottom: 0; right: 0;";
	time.classList.add("current-time");
	time.textContent = ChatRoomCurrentTime();
	msgElement.append(time);
	document.querySelector("#TextAreaChatLog").appendChild(msgElement);
	ElementScrollToEnd("TextAreaChatLog");
}

export function drawCheckbox(
	left: number, top: number, width: number, height: number, text: string, 
	isChecked: boolean, isDisabled: boolean = false, textColor = "Black", 
	textLeft: number = 200, textTop: number = 45
): void {
	DrawText(text, left + textLeft, top + textTop, textColor, "Gray");
	DrawButton(left, top, width, height, "", isDisabled ? "#ebebe4" : "White", isChecked ? "Icons/Checked.png" : "", null, isDisabled);
}

export function drawWrappedText(text: string, x: number, y: number, color: string, charactersCount: number, gap: number = 50): void {
	const lines = [];
	let line = "";
	for (let c of text) {
		line += c;
		if (line.length === charactersCount) {
			lines.push(line);
			line = "";
		}
	}
	if (line) lines.push(line);
	
	for (let l in lines) {
		DrawText(lines[parseInt(l)], x, y + parseInt(l) * gap, color);
	}
}

