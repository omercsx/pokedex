import type { CLICommand } from "./command.js";

export function commandHelp(commands: Record<string, CLICommand>) {
	console.log("Welcome to the Pokedex!");
	console.log("Usage:");
	console.log("");

	// Generate usage section by iterating over the command registry
	for (const [commandName, command] of Object.entries(commands)) {
		console.log(`${commandName}: ${command.description}`);
	}
}
