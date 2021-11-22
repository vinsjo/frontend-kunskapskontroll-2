export default class Player {
	/**
	 * @constructs Player
	 * @param {Number} [lives]  amount of lives player starts with, default is 5
	 */
	constructor(lives = 5) {
		this.lives = lives;
		this.hasWon = false;
		this.hasCanceled = false;
		this.guesses = {
			values: [],
			push(guess) {
				this.values.push(guess);
			},
			toString() {
				return this.values.join("");
			},
		};
	}
	/**
	 * Player has more than zero lives
	 * @type {Boolean}
	 * @readonly
	 */
	get isAlive() {
		return this.lives > 0;
	}
}
