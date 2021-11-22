// import HangMan from "./modules/HangMan.js";
// import Player from "./modules/Player.js";
import {addCharSeparator, getCharRegExp} from "./modules/StringUtils.js";

/**
 * Validate user input, valid input has a length of 1 and is in range a-z
 * @param {String} input  the input to be evaluated
 * @returns {Boolean}
 */
function validateInput(input) {
	return input.match(/[a-z]/i) && input.length === 1;
}

/**
 * Get prompt message based on current Player guesses and correct word
 * @param {Player} player
 * @param {HangMan} hangMan
 * @returns {String}
 */
function getPromptMessage(player, hangMan) {
	const guessedChars = player.guesses.toString();
	return (
		addCharSeparator(hangMan.getWordOutput(guessedChars), " ") +
		`\n\nLives left: ${player.lives}` +
		`\nGuesses made: ${addCharSeparator(
			guessedChars.replace(getCharRegExp(hangMan.word), ""),
			", "
		)}`
	);
}

/**
 * The game-loop
 */
function play() {
	const hangMan = new HangMan();
	const player = new Player();
	while (player.isAlive && !player.hasCanceled && !player.hasWon) {
		let validInput;
		do {
			const input = prompt(getPromptMessage(player, hangMan));
			if (input === null) {
				player.hasCanceled = true;
				break;
			}
			validInput = validateInput(input);
			if (!validInput) continue;
			player.guesses.push(input);
			if (hangMan.getMatches(input).length === 0) {
				player.lives--;
				continue;
			}
			const allMatches = hangMan.getMatches(player.guesses.toString());
			player.hasWon = allMatches.length === hangMan.word.length;
		} while (!validInput);
	}
	alert(
		player.hasCanceled
			? "You have canceled the game"
			: player.hasWon
			? "You have won, congratulations!"
			: `You have lost, the correct word was ${hangMan.word}`
	);
}

play();
