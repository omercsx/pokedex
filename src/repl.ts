import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
	input = input.trim();
	let words = input.split(/\s+/);
	words = words.map(word => {
		word = word.toLowerCase();
		return word;
	});
	return words;
}

export function startREPL(state: State) {
	state.rl.prompt();

	state.rl.on("line", line => {
		const words = cleanInput(line);
		if (words.length === 0) {
			state.rl.prompt();
			return;
		}

		const command = words[0];
		if (command in state.commands) {
			try {
				state.commands[command].callback(state);
			} catch (error) {
				console.error("Error executing command:", error);
			}
		} else {
			console.log(`Unknown command`);
		}
		state.rl.prompt();
	});
}
