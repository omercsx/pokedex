import { createInterface } from "node:readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import type { CLICommand } from "./command.js";

export function cleanInput(input: string): string[] {
	input = input.trim();
	let words = input.split(/\s+/);
	words = words.map(word => {
		word = word.toLowerCase();
		return word;
	});
	return words;
}

export function startREPL() {
	const rl = createInterface({
		input: process.stdin,
		output: process.stdout,
		prompt: "Pokedex > "
	});

	rl.prompt();

	rl.on("line", line => {
		const words = cleanInput(line);
		if (words.length === 0) {
			rl.prompt();
			return;
		}

		const commands = getCommands();
		const command = words[0];
		if (command in commands) {
			try {
				commands[command].callback(commands);
			} catch (error) {
				console.error("Error executing command:", error);
			}
		} else {
			console.log(`Unknown command`);
		}
		rl.prompt();
	});
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
