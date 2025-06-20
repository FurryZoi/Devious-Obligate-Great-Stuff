import { BaseSubscreen, setSubscreen } from "zois-core/ui";
import icon from "@/images/settings-devious-padlock.png";
import { ModStorage, modStorage, syncStorage } from "@/modules/storage";
import { canSetKeyHolderMinimumRole, changePadlockConfigurations, DeviousPadlockConfigurations, hashCombination, hasKeyToPadlock, KeyHolderMinimumRole } from "@/modules/deviousPadlock";
import { dialogsManager, toastsManager } from "zois-core/popups";
import { messagesManager } from "zois-core/messaging";


const minimumRolesNames = {
    [KeyHolderMinimumRole.EVERYONE_EXCEPT_WEARER]: "Everyone except wearer",
    [KeyHolderMinimumRole.FRIEND]: "Friend",
    [KeyHolderMinimumRole.WHITELIST]: "Whitelist",
    [KeyHolderMinimumRole.FAMILY]: "Family",
    [KeyHolderMinimumRole.LOVER]: "Lover",
    [KeyHolderMinimumRole.OWNER]: "Owner"
}

export class InspectDeviousPadlockSubscreen extends BaseSubscreen {
    private padlockSettings: DeviousPadlockConfigurations;
    private target: Character;
    private itemGroupName: AssetGroupItemName;
    private pincodeCombinationInputs: HTMLInputElement[] = [];

    private canEdit = () => hasKeyToPadlock(this.itemGroupName, Player, this.target) || this.padlockSettings.combinationToUnlock.isCorrect;
    private keyDownListener: (e: KeyboardEvent) => void;

    private onKeyDown(e: KeyboardEvent): void {
        for (const [i, input] of this.pincodeCombinationInputs.entries()) {
            if (e.key === "Backspace") {
                const t = this.pincodeCombinationInputs.toReversed().find((w) => w.value !== "");
                if (t) {
                    t.value = "";
                    t.focus();
                }
                return e.preventDefault();
            }
            if (input.value === "") {
                if (!Number.isInteger(parseInt(e.key))) return e.preventDefault();
                if (document.activeElement !== input) input.focus();
                input.value = e.key;
                if (i === this.pincodeCombinationInputs.length - 1) this.checkCombination(this.pincodeCombinationInputs);
                else this.pincodeCombinationInputs[i + 1].focus();
                return e.preventDefault();
            }
        }
    }

    private async checkCombination(combinationElement: HTMLInputElement[] | HTMLInputElement) {
        if (Array.isArray(combinationElement)) {
            this.padlockSettings.combinationToUnlock.value = combinationElement.map((e) => e.value).join("");
        } else this.padlockSettings.combinationToUnlock.value = combinationElement.value;
        this.padlockSettings.combinationToUnlock.isCorrect = await hashCombination(this.padlockSettings.combinationToUnlock.value) === this.padlockSettings.combinationToUnlock.hash;
        if (this.padlockSettings.combinationToUnlock.isCorrect) {
            if (Array.isArray(combinationElement)) combinationElement.forEach((e) => e.style.setProperty("border-color", "green", "important"));
            else combinationElement.style.setProperty("border-color", "green", "important");
            toastsManager.success({
                message: "Correct combination",
                duration: 3000
            });
        } else {
            if (Array.isArray(combinationElement)) combinationElement.forEach((e) => e.style.setProperty("border-color", "red", "important"));
            else combinationElement.style.setProperty("border-color", "red", "important");
        }
        if (Array.isArray(combinationElement)) MainCanvas.canvas.focus();
        document.querySelectorAll("button").forEach((b) => b.textContent === "Save" && b.classList.toggle("zcDisabled", !this.canEdit()));
        document.querySelectorAll("button").forEach((b) => b.textContent === "Remove Padlock" && b.classList.toggle("zcDisabled", !this.padlockSettings.combinationToUnlock.isCorrect));
    }

    constructor(target: Character, itemGroup: AssetItemGroup) {
        super();

        let deviousPadlock: ModStorage["deviousPadlock"];
        if (target.IsPlayer()) {
            deviousPadlock = modStorage.deviousPadlock;
        } else {
            deviousPadlock = target.DOGS.deviousPadlock;
        }
        this.padlockSettings = {
            owner: deviousPadlock.itemGroups[itemGroup.Name].owner,
            keyHolders: {
                minimumRole: deviousPadlock.itemGroups[itemGroup.Name].minimumRole ?? KeyHolderMinimumRole.EVERYONE_EXCEPT_WEARER,
                memberNumbers: deviousPadlock.itemGroups[itemGroup.Name].memberNumbers ?? [],
            },
            unlockTime: deviousPadlock.itemGroups[itemGroup.Name].unlockTime,
            note: deviousPadlock.itemGroups[itemGroup.Name].note ?? "",
            blockedCommands: deviousPadlock.itemGroups[itemGroup.Name].blockedCommands ?? [],
            combinationToLock: {
                wasChanged: false,
                type: deviousPadlock.itemGroups[itemGroup.Name].combination?.type ?? "PIN-Code",
                value: "",
            },
            combinationToUnlock: {
                isCorrect: null,
                hash: deviousPadlock.itemGroups[itemGroup.Name].combination?.hash,
                type: deviousPadlock.itemGroups[itemGroup.Name].combination?.type,
                value: "",
            }
        };
        this.target = target;
        this.itemGroupName = itemGroup.Name;
    }

    load(): void {
        super.load();
        this.createButton({
            anchor: "bottom-right",
            x: 80,
            y: 50,
            width: 400,
            padding: 4,
            style: "inverted",
            text: "Save",
            isDisabled: () => !this.canEdit(),
            onClick: async () => {
                if (this.target.IsPlayer()) {
                    await changePadlockConfigurations(this.itemGroupName, this.padlockSettings, Player);
                } else {
                    messagesManager.sendPacket("changeDeviousPadlockConfigurations", {
                        groupName: this.itemGroupName,
                        config: this.padlockSettings
                    }, this.target.MemberNumber);
                }
                this.exit();
            }
        });

        this.createTabs({
            x: 65,
            y: 60,
            width: 1725,
            tabs: [
                {
                    name: "General",
                    load: () => {
                        this.keyDownListener = this.onKeyDown.bind(this);
                        window.addEventListener("keydown", this.keyDownListener);
                        this.createText({
                            text: "Protected from cheats",
                            x: 100,
                            y: 200,
                            width: 250,
                            withBackground: true,
                            color: "red",
                            padding: 2
                        }).style.textAlign = "center";

                        this.createText({
                            text: "Member number on padlock: " + this.padlockSettings.owner,
                            width: 800,
                            x: 100,
                            y: 400
                        });

                        this.createText({
                            x: 100,
                            y: 480,
                            text: "Padlock can be unlocked:"
                        }).style.fontWeight = "bold";

                        this.createText({
                            x: 140,
                            y: 540,
                            width: 800,
                            text: "<b>1.</b> By those who have the key to this padlock (Owner of padlock, those who fit the minimum role and those whose member numbers are on padlock)"
                        });

                        this.createText({
                            x: 140,
                            y: 730,
                            width: 800,
                            text: "<b>2.</b> When the timer expires (if it is set on padlock)"
                        });

                        this.createText({
                            x: 140,
                            y: 830,
                            width: 800,
                            text: "<b>3.</b> When the correct code is entered (if padlock accepts codes)"
                        });

                        if (typeof this.padlockSettings.combinationToUnlock.hash === "string") {
                            this.createText({
                                text: "Enter combination:",
                                anchor: "top-right",
                                x: 400,
                                y: 220,
                                width: 400,
                            });

                            if (this.padlockSettings.combinationToUnlock.type === "password") {
                                const combination = this.createInput({
                                    anchor: "top-right",
                                    x: 400,
                                    y: 280,
                                    width: 400,
                                    padding: 2,
                                    placeholder: this.padlockSettings.combinationToUnlock.type === "password" ? "Password" : "PIN-Code",
                                    value: this.padlockSettings.combinationToUnlock.value,
                                    onInput: () => this.checkCombination(combination as HTMLInputElement)
                                });
                            } else {
                                this.pincodeCombinationInputs = [];
                                for (let i = 0; i < 6; i++) {
                                    const input = this.createInput({
                                        anchor: "top-right",
                                        x: 700 - i * 90,
                                        y: 320,
                                        padding: 1,
                                        width: 60,
                                        height: 80,
                                        value: this.padlockSettings.combinationToUnlock.value[i] ?? "",
                                    });
                                    input.setAttribute("maxlength", 1);
                                    this.pincodeCombinationInputs.push(input as HTMLInputElement);
                                }
                            }

                            this.createButton({
                                text: "Remove Padlock",
                                anchor: "top-right",
                                x: 400,
                                y: 450,
                                padding: 2,
                                isDisabled: () => !this.padlockSettings.combinationToUnlock.isCorrect,
                                onClick: async () => {
                                    const confirmation = await dialogsManager.showDialog({
                                        type: "choice_one",
                                        title: "Padlock Removing",
                                        body: "Are you sure you want to remove padlock?",
                                        width: 1200,
                                        buttons: {
                                            direction: "row",
                                            list: [
                                                {
                                                    text: "Remove padlock",
                                                    value: true
                                                },
                                                {
                                                    text: "Cancel",
                                                    value: false
                                                }
                                            ]
                                        }
                                    });
                                    if (!confirmation) return;
                                    if (this.target.IsPlayer()) {
                                        if (this.padlockSettings.combinationToUnlock.isCorrect) {
                                            delete modStorage.deviousPadlock.itemGroups[this.itemGroupName];
                                            InventoryUnlock(Player, this.itemGroupName);
                                            ChatRoomCharacterUpdate(Player);
                                            syncStorage();
                                            this.exit();
                                        }
                                    } else {
                                        messagesManager.sendPacket("removePadlock", {
                                            groupName: this.itemGroupName,
                                            combination: this.padlockSettings.combinationToUnlock.value
                                        }, this.target.MemberNumber);
                                        this.exit();
                                    }
                                }
                            });
                        }

                        if (this.padlockSettings.unlockTime) {
                            this.createText({
                                text: `<b>Timer expires at:</b> ${new Date(this.padlockSettings.unlockTime).toUTCString()}`,
                                x: 1200,
                                y: 600,
                                width: 800
                            });
                        }
                    },
                    unload: () => {
                        window.removeEventListener("keydown", this.keyDownListener);
                    }
                },
                {
                    name: "Locking",
                    run: () => {
                        this.drawPolylineArrow({
                            points: [
                                {
                                    x: 800,
                                    y: 650
                                },
                                {
                                    x: 800,
                                    y: 550
                                }
                            ]
                        });
                        this.drawPolylineArrow({
                            points: [
                                {
                                    x: 800,
                                    y: 650
                                },
                                {
                                    x: 1500,
                                    y: 650
                                },
                                {
                                    x: 1500,
                                    y: 440
                                }
                            ]
                        });
                    },
                    load: () => {
                        this.createText({
                            text: "<b>Combination</b>",
                            width: 850,
                            x: 100,
                            y: 220,
                            withBackground: true,
                            padding: 2
                        });

                        const combinationTypeBtn = this.createButton({
                            text: `Type: ${this.padlockSettings.combinationToLock?.type === "password" ? "password" : "PIN-Code"}`,
                            width: 850,
                            x: 100,
                            y: 325,
                            padding: 2,
                            isDisabled: () => !this.canEdit(),
                            onClick: () => {
                                this.padlockSettings.combinationToLock.type = this.padlockSettings.combinationToLock.type === "password" ? "PIN-Code" : "password";
                                combinationTypeBtn.textContent = `Type: ${this.padlockSettings.combinationToLock.type === "password" ? "password" : "PIN-Code"}`;
                                combination.setAttribute("maxlength", this.padlockSettings.combinationToLock.type === "password" ? "20" : "6");
                            }
                        });

                        const combination = this.createInput({
                            placeholder: "Combination",
                            x: 100,
                            y: 435,
                            width: 850,
                            padding: 2,
                            value: this.padlockSettings.combinationToLock.value,
                            isDisabled: () => !this.canEdit(),
                            onInput: () => {
                                if (
                                    this.padlockSettings.combinationToLock?.type === "PIN-Code" &&
                                    Number.isNaN(parseInt(combination.value.slice(-1)))
                                ) return combination.value = combination.value.slice(0, -1);
                                this.padlockSettings.combinationToLock.value = combination.value;
                                this.padlockSettings.combinationToLock.wasChanged = true;
                            }
                        });
                        combination.setAttribute("maxlength", this.padlockSettings.combinationToLock?.type === "password" ? "25" : "6");

                        this.createButton({
                            text: "Reset",
                            x: 100,
                            y: 540,
                            padding: 2,
                            isDisabled: () => !this.canEdit(),
                            onClick: () => {
                                toastsManager.success({
                                    message: "Combination has been reset",
                                    duration: 3500
                                });
                                this.padlockSettings.combinationToLock.value = "";
                                this.padlockSettings.combinationToLock.wasChanged = true;
                                combination.value = "";
                            }
                        });

                        this.createText({
                            text: "<b>Unlock Time</b>",
                            x: 1050,
                            y: 220,
                            width: 850,
                            withBackground: true,
                            padding: 2
                        });

                        const unlockTime = this.createInput({
                            x: 1050,
                            y: 325,
                            width: 850,
                            padding: 2,
                            placeholder: "Time",
                            value: this.padlockSettings.unlockTime ?? "",
                            onChange: () => {
                                this.padlockSettings.unlockTime = unlockTime.value;
                            },
                            isDisabled: () => !this.canEdit()
                        });
                        unlockTime.setAttribute("type", "datetime-local");

                        this.createButton({
                            text: "Reset",
                            x: 1050,
                            y: 430,
                            padding: 2,
                            isDisabled: () => !this.canEdit(),
                            onClick: () => {
                                toastsManager.success({
                                    message: "Timer has been reset",
                                    duration: 3500
                                });
                                this.padlockSettings.unlockTime = "";
                                unlockTime.value = "";
                            }
                        });

                        this.createText({
                            text: "In addition to the key, the padlock can be unlocked in other ways",
                            x: 500,
                            y: 150,
                            width: 600,
                            anchor: "bottom-left",
                            withBackground: true,
                            padding: 2
                        });
                    }
                },
                {
                    name: "Key Holders",
                    load: () => {
                        this.createText({
                            text: "Minimum role",
                            x: 100,
                            y: 200,
                            width: 800,
                        }).style.textAlign = "center";

                        this.createBackNextButton({
                            x: 100,
                            y: 260,
                            width: 800,
                            height: 80,
                            currentIndex: Object.values(KeyHolderMinimumRole)
                                .slice(Object.values(KeyHolderMinimumRole).length / 2)
                                .indexOf(this.padlockSettings.keyHolders.minimumRole),
                            isBold: true,
                            items: Object.values(KeyHolderMinimumRole)
                                .slice(Object.values(KeyHolderMinimumRole).length / 2)
                                .map((r) => [minimumRolesNames[r], r]),
                            onChange: (value) => this.padlockSettings.keyHolders.minimumRole = value,
                            isDisabled: (value) => !this.canEdit() || !canSetKeyHolderMinimumRole(Player, this.target, value)
                        });

                        this.createInputList({
                            title: "Member numbers",
                            x: 100,
                            y: 425,
                            width: 800,
                            height: 500,
                            value: this.padlockSettings.keyHolders.memberNumbers,
                            numbersOnly: true,
                            isDisabled: () => !this.canEdit(),
                            onChange: (value: number[]) => {
                                this.padlockSettings.keyHolders.memberNumbers = value;
                            }
                        });

                        this.createText({
                            x: 1200,
                            y: 259,
                            width: 700,
                            text: "The minimum role which will always have the key to the padlock",
                            withBackground: true,
                            padding: 2
                        });

                        this.createText({
                            x: 1000,
                            y: 500,
                            width: 900,
                            text: "Member numbers which will always have the key to the padlock",
                            withBackground: true,
                            padding: 2
                        });
                    },
                    run: () => {
                        this.drawPolylineArrow({
                            points: [
                                {
                                    x: 1180,
                                    y: 350
                                },
                                {
                                    x: 1100,
                                    y: 350
                                },
                                {
                                    x: 1100,
                                    y: 280
                                },
                                {
                                    x: 925,
                                    y: 280
                                }
                            ]
                        });

                        this.drawPolylineArrow({
                            points: [
                                {
                                    x: 1450,
                                    y: 650
                                },
                                {
                                    x: 1450,
                                    y: 800
                                },
                                {
                                    x: 925,
                                    y: 800
                                }
                            ]
                        });
                    }
                },
                {
                    name: "Note",
                    load: () => {
                        const note = this.createInput({
                            x: 200,
                            y: 200,
                            width: 1600,
                            height: 600,
                            textArea: true,
                            value: this.padlockSettings.note,
                            placeholder: "You can leave a note that other DOGS users can see",
                            isDisabled: () => !this.canEdit(),
                            onChange: () => {
                                this.padlockSettings.note = note.value;
                            }
                        });
                    }
                },
                {
                    name: "Commands Blocking",
                    load: () => {
                        this.createInputList({
                            title: "Blocked Commands",
                            x: 100,
                            y: 200,
                            width: 1800,
                            height: 600,
                            value: this.padlockSettings.blockedCommands,
                            isDisabled: () => !this.canEdit(),
                            onChange: (value) => {
                                this.padlockSettings.blockedCommands = value as string[];
                            }
                        });
                    }
                }
            ],
            currentTabName: "General"
        });
    }
    
    exit(): void {
        super.exit();
        CommonSetScreen("Online", "ChatRoom");
    }
}