export function cleanInput(input: string): string[] {
	input = input.trim();
	const words = input.split(/\s+/);
	return words;
}
