/*
TILL DANNIE:
Hoppas detta inte är alltför svårläst! 
Gjorde en mycket större lösning först (onödigt stor och invecklad) med classes 
och modules och grejer, men jag försökte utmana mig själv genom att göra koden
så kort som möjligt (med vissa undantag för att inte helt förstöra läsbarheten)
och då även få en bra möjlighet att repetera de array-funktioner vi 
gått igenom senaste tiden.
*/
/** Create RegExp that matches characters in a string */
const getRegX = (chars) => (!!chars ? new RegExp(`[${chars}]`, "ig") : /\0/);
/** Validate user input, true if input has a length of 1 and is in range a-z */
const validateInput = (input) => !!input.match(/[a-z]/i) && input.length === 1;
/** Get matches in a string from a RegExp as an array, empty if no matches */
const getMatches = (str, regExp) => str.match(regExp) || [];
/** Determine if all characters in a string matches a RegExp */
const matchesAll = (str, regExp) => getMatches(str, regExp).join("") === str;
/** Hangman Play Function */
const play = () => {
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
};
play();
