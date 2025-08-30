import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";

export type CLICommand = {
	name: string;
	description: string;
	callback: (state: State) => void;
};

export type State = {
	rl: Interface;
	commands: Record<string, CLICommand>;
};

export function initState(): State {
	const rl = createInterface({
		input: process.stdin,
		output: process.stdout,
		prompt: "Pokedex > "
	});

	const commands = getCommands();
	return {
		rl,
		commands
	};
}

export function getCommands(): Record<string, CLICommand> {
	return {
		exit: {
			name: "exit",
			description: "Exit the Pokedex",
			callback: commandExit
		},
		help: {
			name: "help",
			description: "Displays a help message",
			callback: commandHelp
		}
	};
}
