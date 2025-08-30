import type { State } from "./state.js";

export function commandHelp(state: State) {
	console.log("Welcome to the Pokedex!");
	console.log("Usage:");
	console.log("");

	// Generate usage section by iterating over the command registry
	for (const [commandName, command] of Object.entries(state.commands)) {
		console.log(`${commandName}: ${command.description}`);
	}
}
