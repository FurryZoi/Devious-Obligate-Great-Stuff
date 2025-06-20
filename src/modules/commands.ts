import { toastsManager } from "zois-core/popups";
import { messagesManager } from "zois-core/messaging";
import { setRemoteControlIsInteracting } from "./remoteControl";
import { chatSendChangelog } from "@/index";


interface Command {
    name: string
    description: string
    args?: string
    action: (text: string) => void
}

const commands: Command[] = [
    {
        name: "help",
        description: "Open DOGS help menu",
        action: () => {
            let msg = "<p style='padding: 0.4vw; font-family: Comfortaa, sans-serif;'><b>DOGS</b> commands:</p>";
            for (const c of commands) {
                msg += `<div style='padding: 0.4vw; font-family: Comfortaa, sans-serif;'><b>/dogs ${c.name}</b> ${c.args ? `${c.args}` : ""} - <i>${c.description}</i></div>`;
            }
            messagesManager.sendLocal(msg);
        }
    },
    {
        name: "changelog",
        description: "Show latest DOGS changelog",
        action: chatSendChangelog
    },
    {
        name: "remote",
        description: "Use remote control",
        args: "[member number]",
        action: async (text) => {
            const args = getArgs(text);
            const targetNumber = parseInt(args[0]);
            if (!targetNumber) {
                return messagesManager.sendLocal(
                    `Example: /dogs remote <character id>`
                );
            }

            const toastId = toastsManager.spinner({
                title: "Connecting...",
                message: `Member number: ${targetNumber}`
            });

            const { data, isError } = await messagesManager.sendRequest<{
                rejectReason?: string
                bundle?: ServerAccountDataSynced
            }>({
                type: "beep",
                message: "remoteControlConnect",
                target: targetNumber
            });

            toastsManager.removeSpinner(toastId);

            if (isError) {
                return toastsManager.error({
                    title: "Connection was not established",
                    message: "Something wrong happened... Maybe target player offline or not using DOGS?",
                    duration: 6000
                });
            }

            if (data.rejectReason) {
                return toastsManager.error({
                    title: "Connection rejected",
                    message: data.rejectReason,
                    duration: 6000
                });
            }

            if (!data.bundle) return;
            if (!ServerPlayerIsInChatRoom()) return;
            if (CurrentScreen !== "ChatRoom") CommonSetScreen("Online", "ChatRoom");
            const C = CharacterLoadOnline(data.bundle, targetNumber);
            setRemoteControlIsInteracting(true);
            ChatRoomFocusCharacter(C);
            if (!C.AllowItem) C.AllowItem = true;
            DialogChangeMode("items");
            DialogChangeFocusToGroup(C, "ItemArms");
        }
    }
];

function getArgs(text: string): string[] {
    return text.split(",").map((arg) => arg.trim());
}

export function loadCommands(): void {
    CommandCombine([
        {
            Tag: "dogs",
            Description: "Execute DOGS command",
            Action: (text) => {
                const commandName = text.split(" ")[0];
                const commandText = text.split(" ").slice(1).join(" ");
                const command = commands.find((c) => c.name === commandName);

                if (command) {
                    command.action(commandText);
                } else {
                    messagesManager.sendLocal(
                        "Unknown command, use <b>/dogs help</b> to view a list of all available commands."
                    );
                }
            }
        }
    ]);

}


