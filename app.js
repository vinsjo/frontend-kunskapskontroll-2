const getRegExp = (chars) => new RegExp(`[${chars}]`, "ig");
const validateInput = (input) => !!input.match(/[a-z]/i) && input.length === 1;
const fullMatch = (str, regExp) => [...str.match(regExp)].length >= str.length;
const gameWord = [
	"Programmering",
	"Stockholm",
	"Studenter",
	"Javascript",
	"Afterwork",
][Math.floor(Math.random() * 5)];
const player = {
	lives: 5,
	guesses: "",
	hasQuit: false,
	hasWon: false,
	get isAlive() {
		return this.lives > 0;
	},
	get regExp() {
		return getRegExp(this.guesses);
	},
};
while (player.isAlive && !player.hasQuit && !player.hasWon) {
	const message =
		[...gameWord]
			.map((char) => (!!char.match(player.regExp) ? char : "_"))
			.join(" ") +
		`\n\nLives left: ${player.lives}` +
		`\nGuesses made: ${[...player.guesses]
			.filter((char) => !char.match(getRegExp(gameWord)))
			.join(", ")}`;
	let validInput;
	do {
		const guess = prompt(message);
		if ((player.hasQuit = guess === null)) break;
		if (!(validInput = validateInput(guess))) continue;
		player.guesses += guess;
		if (!gameWord.match(getRegExp(guess))) player.lives--;
		else player.hasWon = fullMatch(gameWord, player.regExp);
	} while (!validInput);
}
if (player.hasQuit) alert("You have canceled the game");
else if (player.hasWon) alert("You have won, congratulations!");
else alert(`You have lost, the correct word was ${gameWord}`);
