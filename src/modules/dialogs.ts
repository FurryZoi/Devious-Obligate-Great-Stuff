import { MOD_DATA } from "zois-core";
import { hookFunction, HookPriority } from "zois-core/modsApi";
import { modStorage, syncStorage } from "./storage";
import { deviousPadlock, getPadlocksAmount } from "./deviousPadlock";

export function loadDialogs() {
    hookFunction("CharacterBuildDialog", HookPriority.OBSERVE, (args, next) => {
        if (args[0].AccountName !== "NPC_MagicSchoolLaboratory_Teacher") return next(args);
        next(args);
        const price = getPadlocksAmount(Player) * 750;
        args[0].Dialog.unshift(
            {
                Stage: "0",
                NextStage: `${MOD_DATA.name}_MagicSchoolLaboratoryTeacherRescue`,
                Option: "Can you help me with Devious Padlock?",
                Result: "(She giggles.) I see you are in trouble. I can remove this padlock using my magic at the rate of 1 padlock for 750 dollars. (She winks.)",
                //@ts-expect-error
                Group: null,
                Prerequisite: `${MOD_DATA.name}_PlayerCanBeRescued`,
                //@ts-expect-error
                Trait: null,
                //@ts-expect-error
                Function: null,
            },
            {
                Stage: `${MOD_DATA.name}_MagicSchoolLaboratoryTeacherRescue`,
                NextStage: "0",
                Option: `Pay ${price}$`,
                Result: "(She casts a spell and the devious padlocks disappears.) There you go! Be more careful next time, okay?",
                Group: null,
                Prerequisite: `${MOD_DATA.name}_PlayerHasMoney`,
                Trait: null,
                Function: `${MOD_DATA.name}_StartRescue`,
            },
            {
                Stage: `${MOD_DATA.name}_MagicSchoolLaboratoryTeacherRescue`,
                NextStage: "0",
                Option: "I don't have that much money.",
                Result: "Not my problem, come back when you have enough money.",
                Group: null,
                Prerequisite: null,
                Trait: null,
                Function: null,
            }
        );
    });

    hookFunction("DialogPrerequisite", HookPriority.OBSERVE, (args, next) => {
        if (!args[0]?.Prerequisite?.startsWith(`${MOD_DATA.name}_`)) return next(args);
        switch (args[0].Prerequisite.replace(`${MOD_DATA.name}_`, "")) {
            case "PlayerHasMoney":
                const price = getPadlocksAmount(Player) * 750;
                return Player.Money >= price;
            case "PlayerCanBeRescued":
                if (!modStorage.deviousPadlock.itemGroups) return false;
                return Object.values(modStorage.deviousPadlock.itemGroups).length > 0 && Player.GetDifficulty() < 2;
            default:
                return next(args);
        }
    });

    hookFunction("CommonDynamicFunctionParams", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        if (!args[0]?.startsWith(`${MOD_DATA.name}_`)) return next(args);
        if (CurrentCharacter?.ID !== MagicSchoolLaboratoryTeacher?.ID) return next(args);
        const price = getPadlocksAmount(Player) * 750;
        switch (args[0].replace(`${MOD_DATA.name}_`, "")) {
            case "StartRescue":
                delete modStorage.deviousPadlock.itemGroups;
                delete modStorage.deviousPadlock.synced;
                for (const item of Player.Appearance) {
                    if (item.Property?.Name === deviousPadlock.Name) {
                        InventoryUnlock(Player, item);
                    }
                }
                DialogChangeMoney(`-${price}`);
                ServerPlayerSync();
                ServerPlayerAppearanceSync();
                syncStorage();
        }
    });

    // Every time MagicSchoolLaboratory loads we reload dialog
    hookFunction("MagicSchoolLaboratoryLoad", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        if (MagicSchoolLaboratoryTeacher) {
            CharacterLoadCSVDialog(MagicSchoolLaboratoryTeacher);
        }
        return next(args);
    });
}