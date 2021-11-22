export {getCharRegExp, removeDuplicateChars, addCharSeparator};

/**
 * Get a RegExp object used to match a string of characters
 * @function getCharRegExp
 * @param {String} characters  a string of the characters to match
 * @param {Boolean} [strict]   RegExp is case-sensitive, default is false
 * @param {Boolean} [exclude]  RegExp excludes matches, default is false
 * @returns {RegExp}
 */
function getCharRegExp(characters, strict = false, exclude = false) {
	return new RegExp(
		`[${exclude ? "^" : ""}${removeDuplicateChars(characters)}]`,
		`${!strict ? "i" : ""}g`
	);
}

/**
 * Remove all duplicate characters from a string
 * @param {String} characters  string in which to remove duplicates
 * @param {Boolean} [strict]   matches are case-sensitive, default is false
 * @returns {String}
 */
function removeDuplicateChars(characters, strict = false) {
	const reducer = (str, char) => {
		return str.match(new RegExp(`[${char}]`, `${strict ? "" : "i"}g`))
			? str
			: str + char;
	};
	return characters.split("").reduce(reducer, "");
}

/**
 * Get a modified copy of a string with a separator string between
 * all characters
 * @param {String} str        string to be modified
 * @param {String} separator  separator to be placed between characters
 * @returns {String}
 */
function addCharSeparator(str, separator) {
	return str.split("").join(separator);
}
