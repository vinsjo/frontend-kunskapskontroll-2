/*
TILL DANNIE:
Hoppas detta inte är alltför svårläst!

Jag började den här uppgiften med helt onödigt stor och invecklad lösning,
med classes och modules och grejer, men kände sen att det vore roligare att
se hur kort koden skulle kunna bli.

Därför har jag försökt göra koden så kort som möjligt, med prettier-formattering
och max 80 tecken i bredd.
Detta gav mig också ett bra tillfälle att öva lite på ett par av de array-metoder
vi gått igenom senaste tiden

Koden hade såklart kunnat bli ännu kortare men jag kompromissade lite för att 
försöka upprätthålla en rimlig namngivning på variabler/funktioner och en 
logisk/funktionell struktur överlag.
*/

/** Determine if variable is a string and in range a to z */
const aToZ = str => typeof str === "string" && /[a-z]/i.test(str);
/** Create RegExp that matches characters in a given string */
const regX = chars => (aToZ(chars) ? new RegExp(`[${chars}]`, "ig") : /\0/);
/** Determine if all characters in a string matches a RegExp pattern */
const matchesAll = (str, regExp) => (str.match(regExp) || []).join("") === str;

const word = [
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
	const mapper = char => (regX(player.guesses).test(char) ? char : "_");
	const filterer = char => !regX(char).test(word);
	const message =
		`${[...word].map(mapper).join(" ")}\n\nLives left: ${player.lives}` +
		`\nGuesses made: ${[...player.guesses].filter(filterer).join(", ")}`;
	let validInput;
	do {
		const guess = prompt(message);
		if ((player.hasQuit = guess === null)) break;
		if (!(validInput = aToZ(guess) && guess.length === 1)) continue;
		player.guesses += guess;
		if (!regX(guess).test(word)) player.lives--;
		else player.hasWon = matchesAll(word, regX(player.guesses));
	} while (!validInput);
}

if (player.hasQuit) alert("You have canceled the game");
else if (player.hasWon) alert("You have won, congratulations!");
else alert(`You have lost, the correct word was ${word}`);
