import {getCharRegExp} from "./StringUtils.js";
export default class HangMan {
	static words = {
		values: [
			"Programmering",
			"Stockholm",
			"Studenter",
			"Javascript",
			"Afterwork",
		],
		random() {
			return this.values[Math.floor(Math.random() * this.values.length)];
		},
	};
	constructor() {
		this.word = HangMan.words.random();
	}
	/**
	 * Get the correct, where only the characters matching the given string are shown
	 * @param {String} characters  characters to match against the correct word
	 * @returns {String}
	 */
	getWordOutput(characters) {
		return this.word.replace(getCharRegExp(characters, false, true), "_");
	}
	/**
	 * Get an array of matches in the correct word from a character
	 * @param  {String} char  the character match against the correct word
	 * @returns {Array<String>}  empty array if no matches are found
	 */
	getMatches(char) {
		return this.word.match(getCharRegExp(char)) || [];
	}
}
