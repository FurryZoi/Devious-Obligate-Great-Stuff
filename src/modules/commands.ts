import { remoteControlState, remoteControlTarget, setRemoteControlState, setRemoteControlTarget } from "./remoteControl";
import { beautifyMessage, chatSendBeep, chatSendLocal, chatSendChangelog } from "./utils";


interface ICommand {
    name: string
    description: string
    args?: string
    action: (text: string) => void
}

const commands: ICommand[] = [
    {
        name: "help",
        description: "Open DOGS help menu",
        action: () => {
            let msg = "<div style='padding: 0.4vw;'><!DOGS!> commands:</div>";
            for (const c of commands) {
                msg += `<div style='padding: 0.4vw;'><!/dogs ${c.name}!> ${c.args ? `${c.args}` : ""} - ${c.description}</div>`;
            }
            chatSendLocal(beautifyMessage(msg), "left");
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
        action: (text) => {
            const args = getArgs(text);
            const targetId = parseInt(args[0]);
            if (!targetId) {
                return chatSendLocal(
                    `Example: /dogs remote <character id>`
                );
            }	

            chatSendBeep({
                action: "remoteControlRequest"
            }, targetId);
            setRemoteControlState("loading");
            setRemoteControlTarget(targetId);
            ChatRoomHideElements();
            ChatRoomStatusUpdate("Preference");
            
            setTimeout(function () {
                if (remoteControlState === "loading") {
                    setRemoteControlState(null);
                    setRemoteControlTarget(null);
                    chatSendLocal("The remote request <!timed out!>! Target player may be <!offline!> or not using <!DOGS!>!");
                }
            }, 5000);
        }
    }
];

function getArgs(text: string): string[] {
	return text.split(",").map((arg) => {
		return arg.trim();
	});
}


export function loadCommands(): void {
    CommandCombine([
        {
            Tag: "dogs",
            Description: "Execute DOGS command",
            Action: function (text) {
                const commandName = text.split(" ")[0];
                const commandText = text.split(" ").slice(1).join(" ");
                const command = commands.find((c) => c.name === commandName);
    
                if (command) {
                    command.action(commandText);
                } else {
                    chatSendLocal(
                        "Unknown command, use <!/dogs help!> to view a list of all available commands!"
                    );
                }
            }
        }
    ]);

}


