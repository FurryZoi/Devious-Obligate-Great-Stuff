import { BaseSubscreen, setSubscreen } from "zois-core/ui";
import icon from "@/images/settings-devious-padlock.png";
import { ModStorage, modStorage, DeviousPadlockProfile, syncStorage, SavedItem } from "@/modules/storage";
import { BasePadlock, basePadlockMinimumRole, canSetKeyHolderMinimumRole, canUseBasePadlock, changePadlockSettings, deviousPadlock, DeviousPadlockSettings, DeviousPadlockUpdateData, getPadlockSettings, hashCombination, hasKeyToPadlock, isItemGroupSynced, isItemGroupSyncedWithConfig, KeyHolderMinimumRole, syncPadlockConfigurationWithItemGroups, unsyncItemGroups, validatePadlockSettingsUpdate } from "@/modules/deviousPadlock";
import { dialogsManager, toastsManager } from "zois-core/popups";
import { messagesManager } from "zois-core/messaging";
import { getNickname } from "zois-core";
import { importAppearance, serverAppearanceBundleToAppearance, smartGetItemName } from "zois-core/wardrobe";
import { StyleModule } from "zois-core/ui-modules";
import { cloneDeep, has, rest, set } from "lodash-es";
import { SyncPadlockMessageDto } from "@/dto/syncPadlockMessageDto";

interface InspectPadlock {
    mode: "inspect-padlock"
    itemGroup: AssetItemGroup
    target: Character
}

interface EditSyncConfig {
    mode: "edit-sync-config"
    syncConfig: DeviousPadlockProfile
}

enum ZoneBorderColor {
    SYNCED = "#0066ffff",
    CAN_BE_SYNCED = "#00FF7F",
    TO_SYNC = "#00C9D5",
    LIMITED = "#ff0000ff"
}

enum ZoneFillColor {
    SYNCED = "#0066ff2a",
    CAN_BE_SYNCED = "#99ffcc50",
    TO_SYNC = "#a2faff3f",
    LIMITED = "#ff00002a"
}

const basePadlockNames = {
    [BasePadlock.EXCLUSIVE]: "Exclusive Padlock",
    [BasePadlock.LOVERS]: "Lovers Padlock",
    [BasePadlock.OWNER]: "Owner Padlock"
};

const minimumRolesNames = {
    [KeyHolderMinimumRole.EVERYONE_EXCEPT_WEARER]: "Everyone except wearer",
    [KeyHolderMinimumRole.FRIEND]: "Friend",
    [KeyHolderMinimumRole.WHITELIST]: "Whitelist",
    [KeyHolderMinimumRole.FAMILY]: "Family",
    [KeyHolderMinimumRole.LOVER]: "Lover",
    [KeyHolderMinimumRole.OWNER]: "Owner"
}

export class DeviousPadlockSettingsSubscreen extends BaseSubscreen {
    private padlockSettings!: Omit<DeviousPadlockSettings, "item"> & { item: SavedItem | null };
    private readonly sourcePadlockSettings!: Omit<DeviousPadlockSettings, "item"> & { item: SavedItem | null };
    private combinationToUnlock: {
        isCorrect: boolean | null
        value: string
    };
    private combinationToLock!: {
        wasChanged: boolean
        type: "PIN-Code" | "password"
        value: string
    };
    private target!: Character;
    private itemGroupName!: AssetGroupItemName;
    private pincodeCombinationInputs: HTMLInputElement[] = [];
    private syncTabCanvasCharacter!: Character;
    private saveButtonElement!: HTMLButtonElement;
    private zoneNamesToSync: AssetGroupName[] = [];
    private syncingSelectedProfile!: {
        settings: DeviousPadlockProfile
        padlockSettings: Omit<DeviousPadlockSettings, "item" | "owner">
    };
    private syncingSelectedProfileName!: string;
    private mode: InspectPadlock["mode"] | EditSyncConfig["mode"];
    private currentSyncConfigName!: string;

    private canEdit = () => this.itemGroupName === undefined || hasKeyToPadlock(this.itemGroupName, Player, this.target) || this.combinationToUnlock.isCorrect;
    private keyDownListener!: (e: KeyboardEvent) => void;
    private onClickListener!: (e: MouseEvent) => void;

    private onKeyDown(e: KeyboardEvent): void {
        if (this.pincodeCombinationInputs.length === 0) return;
        if (e.key === "Backspace") {
            const t = this.pincodeCombinationInputs.toReversed().find((w) => w.value !== "");
            if (t) {
                t.value = "";
                t.focus();
            }
            return e.preventDefault();
        }
        const emptyInput = this.pincodeCombinationInputs.find((w) => w.value === "");
        if (emptyInput) emptyInput.focus();
    }

    private onClick(e: MouseEvent): void {
        for (const group of AssetGroup) {
            if (!Array.isArray(group.Zone)) continue;
            const groupItem = InventoryGet(this.target, group.Name);
            if (!groupItem) continue;
            if (!group.IsItem) continue;
            if (groupItem.Property?.Name !== deviousPadlock.Name) continue;
            if (!hasKeyToPadlock(group.Name as AssetGroupItemName, Player, this.target)) continue;
            if (DialogClickedInZone(this.syncTabCanvasCharacter, group.Zone[0], 0.8, 1550, 160, this.syncTabCanvasCharacter.HeightRatio)) {
                if (this.zoneNamesToSync.includes(group.Name)) this.zoneNamesToSync.splice(this.zoneNamesToSync.indexOf(group.Name), 1);
                else this.zoneNamesToSync.push(group.Name);
            }
        }
    }

    private async checkCombination(combinationElement: HTMLInputElement[] | HTMLInputElement) {
        if (Array.isArray(combinationElement)) {
            this.combinationToUnlock.value = combinationElement.map((e) => e.value).join("");
        } else this.combinationToUnlock.value = combinationElement.value;
        this.combinationToUnlock.isCorrect = await hashCombination(this.combinationToUnlock.value) === this.padlockSettings.combination?.hash;
        if (this.combinationToUnlock.isCorrect) {
            if (Array.isArray(combinationElement)) combinationElement.forEach((e) => e.style.setProperty("border-color", "green", "important"));
            else combinationElement.style.setProperty("border-color", "green", "important");
            toastsManager.success({
                message: "Correct combination",
                duration: 3000
            });
        } else {
            if (Array.isArray(combinationElement)) {
                combinationElement.forEach((e) => {
                    e.style.setProperty("border-color", "red", "important");
                    setTimeout(() => e.value = "", 500);
                });
                combinationElement[0].focus();
            } else {
                combinationElement.style.setProperty("border-color", "red", "important");
            }
        }

        document.querySelectorAll("button").forEach((b) => b.textContent === "Save" && b.classList.toggle("zcDisabled", !this.canEdit()));
        document.querySelectorAll("button").forEach((b) => b.textContent === "Remove Padlock" && b.classList.toggle("zcDisabled", !this.combinationToUnlock.isCorrect));
    }

    constructor(args: InspectPadlock)
    constructor(args: EditSyncConfig)
    constructor(args: InspectPadlock | EditSyncConfig) {
        super();
        this.mode = args.mode;

        switch (args.mode) {
            case "inspect-padlock": {
                this.itemGroupName = args.itemGroup.Name;
                this.target = args.target;
                this.padlockSettings = cloneDeep(getPadlockSettings(args.target, args.itemGroup.Name)!);
                this.sourcePadlockSettings = cloneDeep(this.padlockSettings);
                this.combinationToLock = {
                    value: "",
                    type: "password",
                    wasChanged: false
                };
                break;
            }
            case "edit-sync-config": {
                this.padlockSettings = cloneDeep({
                    ...args.syncConfig,
                    combination: {
                        ...args.syncConfig.combination,
                        hash: undefined
                    },
                    item: null,
                    owner: Player.MemberNumber
                });
                this.combinationToLock = {
                    value: args.syncConfig.combination?.value ?? "",
                    type: args.syncConfig.combination?.type ?? "password",
                    wasChanged: false
                };
                this.currentSyncConfigName = args.syncConfig.name;
                break;
            }
            default: {
                console.error(`Unknown subscreen mode`);
            }
        }

        if (this.padlockSettings.minimumRole === undefined) this.padlockSettings.minimumRole = KeyHolderMinimumRole.EVERYONE_EXCEPT_WEARER;
        if (this.padlockSettings.memberNumbers === undefined) this.padlockSettings.memberNumbers = [];
        if (this.padlockSettings.blockedCommands === undefined) this.padlockSettings.blockedCommands = [];
        if (this.padlockSettings.baseLock === undefined) this.padlockSettings.baseLock = BasePadlock.EXCLUSIVE;
        if (this.padlockSettings.note === undefined) this.padlockSettings.note = "";

        this.combinationToUnlock = {
            value: "",
            isCorrect: null
        }
    }

    load(): void {
        super.load?.();
        this.syncTabCanvasCharacter = CharacterCreate(Player.AssetFamily, CharacterType.NPC, "LC_CanvasCharacter");
        ServerAppearanceLoadFromBundle(
            this.syncTabCanvasCharacter,
            this.syncTabCanvasCharacter.AssetFamily,
            ServerAppearanceBundle(this.mode === "inspect-padlock" ? this.target.Appearance : Player.Appearance)
        );
        CharacterRefresh(this.syncTabCanvasCharacter);

        this.saveButtonElement = this.createButton({
            anchor: "bottom-right",
            x: 80,
            y: 50,
            width: 400,
            padding: 4,
            style: "inverted",
            text: "Save",
            isDisabled: () => !this.canEdit(),
            onClick: async () => {
                if (this.mode === "inspect-padlock") {
                    const updateConfig: DeviousPadlockUpdateData = {
                        ...this.padlockSettings,
                        combinationToUnlock: this.combinationToUnlock.value ?? undefined,
                        combinationToLock: this.combinationToLock.wasChanged ? {
                            type: this.combinationToLock.type,
                            value: this.combinationToLock.value
                        } : undefined
                    };
                    if (this.target.IsPlayer()) {
                        const result = await validatePadlockSettingsUpdate(Player, updateConfig, this.itemGroupName);
                        if (result.valid) {
                            await changePadlockSettings(this.itemGroupName, result.data);
                            const itemName = smartGetItemName(InventoryGet(Player, this.itemGroupName)!);
                            messagesManager.sendAction(
                                `${getNickname(Player)} changed devious padlock's configurations on <possessive> ${itemName}`
                            );
                        }
                    } else {
                        messagesManager.sendPacket("changePadlockSettings", {
                            groupName: this.itemGroupName,
                            config: updateConfig
                        }, this.target.MemberNumber);
                    }
                } else {
                    const { item, owner, combination, ...rest } = this.padlockSettings;
                    const profile: DeviousPadlockProfile = {
                        ...rest,
                        name: this.currentSyncConfigName,
                        combination: {
                            type: this.combinationToLock.type,
                            value: this.combinationToLock.value
                        }
                    };
                    const configIndex = (modStorage.deviousPadlock.profiles ?? []).findIndex((c) => c.name === this.currentSyncConfigName);
                    if (configIndex === -1) {
                        modStorage.deviousPadlock.profiles?.push(profile);
                    } else {
                        modStorage.deviousPadlock.profiles![configIndex] = profile;
                    }
                    syncStorage();
                    toastsManager.success({
                        message: "Profile saved",
                        duration: 3000
                    });
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
                            width: 500,
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

                        if (this.mode === "inspect-padlock") {
                            this.createButton({
                                icon: "Icons/Copy.png",
                                anchor: "bottom-right",
                                x: 80,
                                y: 210,
                                width: 90,
                                height: 90,
                                tooltip: {
                                    text: "Export padlock's config",
                                    position: "left"
                                },
                                onClick: async () => {
                                    const result = await dialogsManager.prompt({
                                        message: "Name of profile"
                                    });
                                    if (result === false || result.trim() === "") return;
                                    modStorage.deviousPadlock.profiles ??= [];
                                    const configIndex = modStorage.deviousPadlock.profiles.findIndex((c) => c.name === result);
                                    if (configIndex !== -1 && (await dialogsManager.confirm({ message: "Profile with this name already exists. Do you want to overwrite it?" })) === false) return;
                                    const { owner, item, combination, ...rest } = cloneDeep(this.padlockSettings);
                                    const syncConfig: DeviousPadlockProfile = {
                                        name: result,
                                        ...rest
                                    };
                                    if (configIndex === -1) {
                                        modStorage.deviousPadlock.profiles.push(syncConfig);
                                    } else {
                                        modStorage.deviousPadlock.profiles[configIndex] = syncConfig;
                                    }
                                    syncStorage();
                                }
                            });
                        }

                        if (typeof this.padlockSettings.combination?.hash === "string") {
                            this.createText({
                                text: "Enter combination:",
                                anchor: "top-right",
                                x: 400,
                                y: 220,
                                width: 400,
                            });

                            if (this.padlockSettings.combination.type === "password") {
                                const combination = this.createInput({
                                    anchor: "top-right",
                                    x: 400,
                                    y: 280,
                                    width: 400,
                                    padding: 2,
                                    placeholder: this.padlockSettings.combination.type === "password" ? "Password" : "PIN-Code",
                                    value: this.combinationToUnlock.value,
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
                                        value: this.combinationToUnlock.value[i] ?? "",
                                        onInput: () => {
                                            if (input.value === "") return this.pincodeCombinationInputs[(i - 1) === -1 ? 0 : i - 1].focus();
                                            if (!Number.isInteger(parseInt(input.value))) return input.value = "";
                                            if (input.value.length > 1) return input.value = input.value[0];
                                            const emptyInput = this.pincodeCombinationInputs.find((w) => w.value === "");
                                            if (emptyInput) {
                                                emptyInput.focus();
                                            } else {
                                                this.checkCombination(this.pincodeCombinationInputs);
                                            }
                                        }
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
                                isDisabled: () => !this.combinationToUnlock.isCorrect,
                                onClick: async () => {
                                    const confirmation = await dialogsManager.confirm({
                                        message: "Are you sure you want to remove padlock?",
                                    });
                                    if (!confirmation) return;
                                    if (this.target.IsPlayer()) {
                                        if (this.combinationToUnlock.isCorrect) {
                                            const itemName = smartGetItemName(InventoryGet(Player, this.itemGroupName)!);
                                            delete modStorage.deviousPadlock.itemGroups![this.itemGroupName];
                                            unsyncItemGroups([this.itemGroupName], false);
                                            InventoryUnlock(Player, this.itemGroupName);
                                            ChatRoomCharacterUpdate(Player);
                                            syncStorage();
                                            messagesManager.sendAction(
                                                `${getNickname(Player)} entered the correct combination and devious padlock was unlocked on <possessive> ${itemName}`
                                            );
                                            this.exit();
                                        }
                                    } else {
                                        messagesManager.sendPacket("removePadlock", {
                                            groupName: this.itemGroupName,
                                            combination: this.combinationToUnlock.value
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
                                    x: 1500,
                                    y: 540
                                },
                                {
                                    x: 800,
                                    y: 540
                                }
                            ]
                        });
                        this.drawPolylineArrow({
                            points: [
                                {
                                    x: 1700,
                                    y: 500
                                },
                                {
                                    x: 1700,
                                    y: 430
                                }
                            ]
                        });
                        this.drawPolylineArrow({
                            points: [
                                {
                                    x: 950,
                                    y: 900,
                                },
                                {
                                    x: 800,
                                    y: 900,
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
                            text: `Type: ${this.combinationToLock.type === "password" ? "password" : "PIN-Code"}`,
                            width: 850,
                            x: 100,
                            y: 325,
                            padding: 2,
                            isDisabled: () => !this.canEdit(),
                            onClick: () => {
                                this.combinationToLock.type = this.combinationToLock.type === "password" ? "PIN-Code" : "password";
                                combinationTypeBtn.textContent = `Type: ${this.combinationToLock.type === "password" ? "password" : "PIN-Code"}`;
                                combination.setAttribute("maxlength", this.combinationToLock.type === "password" ? "25" : "6");
                                combination.setAttribute("minlength", this.combinationToLock.type === "password" ? "1" : "6");
                            }
                        });

                        const combination = this.createInput({
                            placeholder: "Combination",
                            x: 100,
                            y: 435,
                            width: 850,
                            padding: 2,
                            value: this.combinationToLock.value,
                            isDisabled: () => !this.canEdit(),
                            onInput: () => {
                                if (
                                    this.combinationToLock.type === "PIN-Code" &&
                                    Number.isNaN(parseInt(combination.value.slice(-1)))
                                ) return combination.value = combination.value.slice(0, -1);
                                this.combinationToLock.value = combination.value;
                                this.combinationToLock.wasChanged = true;
                            }
                        });
                        combination.setAttribute("maxlength", this.combinationToLock.type === "password" ? "25" : "6");
                        combination.setAttribute("minlength", this.combinationToLock.type === "password" ? "1" : "6");

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
                                this.combinationToLock.value = "";
                                this.combinationToLock.wasChanged = true;
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

                        let unlockTimeValue = "";
                        if (this.padlockSettings.unlockTime) {
                            const utcUnlockTime = new Date(this.padlockSettings.unlockTime);
                            const localUnlockTime = new Date(utcUnlockTime.getTime() - (utcUnlockTime.getTimezoneOffset() * 60000));
                            unlockTimeValue = localUnlockTime.toISOString().slice(0, 16);
                        }
                        const unlockTime = this.createInput({
                            x: 1050,
                            y: 325,
                            width: 850,
                            padding: 2,
                            placeholder: "Time",
                            value: unlockTimeValue,
                            onChange: () => {
                                this.padlockSettings.unlockTime = new Date(unlockTime.value).toISOString();
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
                            text: "<b>Base Lock</b>",
                            x: 100,
                            y: 660,
                            width: 850,
                            withBackground: true,
                            padding: 2
                        });

                        this.createBackNextButton({
                            x: 100,
                            y: 780,
                            width: 850,
                            height: 80,
                            currentIndex: Object.values(BasePadlock)
                                .indexOf(this.padlockSettings.baseLock!),
                            isBold: true,
                            items: Object.values(BasePadlock)
                                .map((r) => [basePadlockNames[r], r]),
                            onChange: (value) => {
                                this.padlockSettings.baseLock = value;
                                this.padlockSettings.minimumRole = basePadlockMinimumRole(value, this.padlockSettings.minimumRole);
                                if (value !== BasePadlock.EXCLUSIVE) this.padlockSettings.memberNumbers = [];
                            },
                            isDisabled: (value) => {
                                if (this.mode === "edit-sync-config") return false;
                                return (
                                    !this.canEdit() ||
                                    !canUseBasePadlock(Player, this.target, this.padlockSettings.owner, value)
                                );
                            }
                        });

                        this.createText({
                            text: "In addition to the key, the padlock can be unlocked in other ways",
                            x: 80,
                            y: 210,
                            width: 400,
                            anchor: "bottom-right",
                            withBackground: true,
                            padding: 2
                        });

                        this.createText({
                            text: "The padlock's owner (original applicator) may set the base padlock used in BC. This can reduce the triggers resulting from other users' tampering. Non-Exclusive base locks disables 'Member Numbers' keyholders & forces 'Minimum Role' to at least match the base BC lock.",
                            x: 510,
                            y: 60,
                            width: 510,
                            fontSize: 3,
                            anchor: "bottom-right",
                            withBackground: true,
                            padding: 2
                        })
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
                                .indexOf(this.padlockSettings.minimumRole!),
                            isBold: true,
                            items: Object.values(KeyHolderMinimumRole)
                                .slice(Object.values(KeyHolderMinimumRole).length / 2)
                                .map((r) => [minimumRolesNames[r], r]),
                            onChange: (value) => this.padlockSettings.minimumRole = value,
                            isDisabled: (value) => {
                                if (this.mode === "edit-sync-config") return false;
                                return (
                                    !this.canEdit() || !canSetKeyHolderMinimumRole(Player, this.target, value) || basePadlockMinimumRole(this.padlockSettings.baseLock, value) !== value
                                );
                            }
                        });

                        this.createInputList({
                            title: "Member numbers",
                            x: 100,
                            y: 425,
                            width: 800,
                            height: 500,
                            value: this.padlockSettings.memberNumbers,
                            numbersOnly: true,
                            isDisabled: () => !this.canEdit() || this.padlockSettings.baseLock !== BasePadlock.EXCLUSIVE,
                            onChange: (value: number[]) => {
                                this.padlockSettings.memberNumbers = value;
                            }
                        });

                        this.createText({
                            x: 1200,
                            y: 259,
                            width: 700,
                            text: "The minimum role which will always have the key to the padlock. Must meet base lock minimum.",
                            withBackground: true,
                            padding: 2
                        });

                        this.createText({
                            x: 1000,
                            y: 500,
                            width: 900,
                            text: "Member numbers which will always have the key to the padlock. Disabled if base lock is not 'Exclusive'",
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
                },
                this.mode === "inspect-padlock" && {
                    name: "Syncing",
                    run: async () => {
                        DrawCharacter(this.syncTabCanvasCharacter, 1550, 125, 0.85, true);
                        for (const group of AssetGroup) {
                            if (!Array.isArray(group.Zone)) continue;
                            const groupItem = InventoryGet(this.target, group.Name);
                            if (!groupItem) continue;
                            if (!group.IsItem) continue;
                            if (groupItem.Property?.Name !== deviousPadlock.Name) continue;
                            let borderColor: string;
                            let fillColor: string;
                            if (
                                hasKeyToPadlock(group.Name as AssetGroupItemName, Player, this.target) &&
                                (
                                    this.syncingSelectedProfile.padlockSettings.baseLock === undefined ||
                                    canUseBasePadlock(Player, this.target, this.padlockSettings.owner, this.syncingSelectedProfile.padlockSettings.baseLock)
                                ) &&
                                (
                                    this.syncingSelectedProfile.padlockSettings.minimumRole === undefined ||
                                    canSetKeyHolderMinimumRole(Player, this.target, this.syncingSelectedProfile.padlockSettings.minimumRole)
                                )
                            ) {
                                if (this.zoneNamesToSync.includes(group.Name)) {
                                    borderColor = ZoneBorderColor.TO_SYNC;
                                    fillColor = ZoneFillColor.TO_SYNC;
                                } else {
                                    borderColor = ZoneBorderColor.CAN_BE_SYNCED;
                                    fillColor = ZoneFillColor.CAN_BE_SYNCED;
                                };
                            } else {
                                borderColor = ZoneBorderColor.LIMITED;
                                fillColor = ZoneFillColor.LIMITED;
                            }
                            if (isItemGroupSyncedWithConfig(this.target, group.Name as AssetGroupItemName, this.syncingSelectedProfile.padlockSettings)) {
                                borderColor = ZoneBorderColor.SYNCED;
                                fillColor = ZoneFillColor.SYNCED;
                            }
                            DrawAssetGroupZone(this.syncTabCanvasCharacter, group.Zone, 0.85, 1550, 125, this.syncTabCanvasCharacter.HeightRatio, borderColor, group.Name === this.itemGroupName ? 3 + Math.sin(Date.now() / 200) * 0.85 : 2.5, fillColor);
                        }
                    },
                    load: () => {
                        this.onClickListener = this.onClick.bind(this);
                        window.addEventListener("click", this.onClickListener);
                        this.saveButtonElement.style.display = "none";
                        this.syncingSelectedProfileName = "Current Config";
                        const { item, owner, ...rest } = this.padlockSettings;
                        //@ts-expect-error
                        this.syncingSelectedProfile ??= {};
                        this.syncingSelectedProfile.padlockSettings = cloneDeep(rest);

                        this.createContainer({
                            x: 1250,
                            y: 220,
                            width: 30,
                            height: 30,
                            modules: {
                                base: [
                                    new StyleModule({
                                        background: ZoneBorderColor.CAN_BE_SYNCED,
                                        border: "1px solid black",
                                    })
                                ]
                            }
                        });

                        this.createText({
                            text: "Zones you can sync with choosen profile",
                            x: 1300,
                            y: 220,
                            fontSize: 2.5,
                            width: 280
                        });

                        this.createContainer({
                            x: 1250,
                            y: 300,
                            width: 30,
                            height: 30,
                            modules: {
                                base: [
                                    new StyleModule({
                                        background: ZoneBorderColor.LIMITED,
                                        border: "1px solid black",
                                    })
                                ]
                            }
                        });

                        this.createText({
                            text: "Zones you can't sync with choosen profile due limits",
                            x: 1300,
                            y: 300,
                            fontSize: 2.5,
                            width: 280
                        });

                        this.createContainer({
                            x: 1250,
                            y: 400,
                            width: 30,
                            height: 30,
                            modules: {
                                base: [
                                    new StyleModule({
                                        background: ZoneBorderColor.TO_SYNC,
                                        border: "1px solid black",
                                    })
                                ]
                            }
                        });

                        this.createText({
                            text: "Zones to sync with choosen profile",
                            x: 1300,
                            y: 400,
                            fontSize: 2.5,
                            width: 280
                        });

                        this.createContainer({
                            x: 1250,
                            y: 480,
                            width: 30,
                            height: 30,
                            modules: {
                                base: [
                                    new StyleModule({
                                        background: ZoneBorderColor.SYNCED,
                                        border: "1px solid black",
                                    })
                                ]
                            }
                        });

                        this.createText({
                            text: "Zones already synced with choosen profile",
                            x: 1300,
                            y: 480,
                            fontSize: 2.5,
                            width: 280
                        });

                        this.createText({
                            text: "<b>Profile</b>",
                            x: 200,
                            y: 220,
                            width: 600,
                            withBackground: true,
                            padding: 2
                        });

                        this.createSelect({
                            x: 200,
                            y: 325,
                            width: 600,
                            options: [
                                {
                                    name: "Current Config",
                                    text: "[This Padlock Settings]"
                                },
                                ...(
                                    modStorage.deviousPadlock.profiles?.map((c) => ({
                                        name: c.name,
                                        text: c.name
                                    }))
                                ) ?? []
                            ],
                            onChange: async (configName) => {
                                if (configName === "Current Config") {
                                    const { item, owner, ...rest } = this.padlockSettings;
                                    this.syncingSelectedProfile.padlockSettings = rest;
                                    this.syncingSelectedProfileName = configName;
                                    return;
                                }
                                const profile = modStorage.deviousPadlock.profiles?.find((c) => c.name === configName);
                                if (!profile) return;
                                const { name, combination, ...rest } = profile;
                                let settings: Omit<DeviousPadlockSettings, "item" | "owner"> = {};
                                settings = cloneDeep(rest);
                                if (combination) {
                                    settings.combination = {
                                        type: combination.type,
                                        hash: await hashCombination(combination.value)
                                    };
                                }
                                this.syncingSelectedProfile.padlockSettings = settings;
                                this.syncingSelectedProfile.settings = profile;
                                this.syncingSelectedProfileName = configName;
                            },
                            currentOption: this.syncingSelectedProfileName
                        });

                        this.createButton({
                            text: "Sync Padlocks",
                            x: 200,
                            y: 815,
                            padding: 2,
                            onClick: async () => {
                                if (this.zoneNamesToSync.length === 0) return;
                                const { combination, ...rest } = this.syncingSelectedProfile.padlockSettings;
                                const config: DeviousPadlockUpdateData = rest;
                                if (this.syncingSelectedProfile.settings?.combination) {
                                    config.combinationToLock = {
                                        type: this.syncingSelectedProfile.settings.combination.type,
                                        value: this.syncingSelectedProfile.settings.combination.value
                                    };
                                }
                                if (!this.syncingSelectedProfile.settings && this.combinationToLock.wasChanged) {
                                    config.combinationToLock = {
                                        type: this.combinationToLock.type,
                                        value: this.combinationToLock.value
                                    }
                                }
                                if (this.target.IsPlayer()) {
                                    syncPadlockConfigurationWithItemGroups(this.zoneNamesToSync as AssetGroupItemName[], this.syncingSelectedProfile.padlockSettings);
                                } else {
                                    messagesManager.sendPacket<SyncPadlockMessageDto>("syncPadlockConfigurations", {
                                        groupNames: this.zoneNamesToSync as AssetGroupItemName[],
                                        settings: config
                                    });
                                }
                                this.exit();
                                toastsManager.success({
                                    message: "Profile applied to selected locks",
                                    duration: 3000
                                });
                            }
                        });

                        this.createText({
                            text: `Sync specified padlocks with specified profile`,
                            x: 200,
                            y: 450,
                            width: 800,
                            withBorder: true,
                            padding: 2
                        });
                    },
                    unload: () => {
                        window.removeEventListener("click", this.onClickListener);
                        this.saveButtonElement.style.display = "";
                    }

                }
            ].filter(Boolean),
            currentTabName: "General"
        });
    }

    exit(): void {
        super.exit?.();
        if (this.mode === "inspect-padlock") {
            if (ChatRoomData !== null) CommonSetScreen("Online", "ChatRoom");
            else CommonSetScreen("Room", "MainHall");
        }
    }
}