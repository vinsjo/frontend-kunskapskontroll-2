const getRegX = (chars) => new RegExp(`[${chars}]`, "ig");
const validateInput = (input) => !!input.match(/[a-z]/i) && input.length === 1;
const matchesAll = (str, regExp) => [...str.match(regExp)].length >= str.length;
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
};
while (player.lives > 0 && !player.hasQuit && !player.hasWon) {
	const message = `${[...gameWord]
		.map((char) => (!!char.match(getRegX(player.guesses)) ? char : "_"))
		.join(" ")}
		\n\nLives left: ${player.lives}
		\nGuesses made: ${[...player.guesses]
			.filter((char) => !char.match(getRegX(gameWord)))
			.join(", ")}`;
	let validInput;
	do {
		const guess = prompt(message);
		if ((player.hasQuit = guess === null)) break;
		if (!(validInput = validateInput(guess))) continue;
		player.guesses += guess;
		if (!gameWord.match(getRegX(guess))) player.lives--;
		else player.hasWon = matchesAll(gameWord, getRegX(player.guesses));
	} while (!validInput);
}
if (player.hasQuit) alert("You have canceled the game");
else if (player.hasWon) alert("You have won, congratulations!");
else alert(`You have lost, the correct word was ${gameWord}`);
