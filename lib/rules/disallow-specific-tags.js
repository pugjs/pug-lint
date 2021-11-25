// # disallowSpecificTags: `string` | `Array`
//
// Pug must not contain any of the tags specified.
//
// ## e.g.: `[ "b", "i" ]`
//
// ```pug
// //- Invalid
// b Bold text
// i Italic text
// ```

const assert = require('assert');

module.exports = function () {};

module.exports.prototype = {
	name: 'disallowSpecificTags',

	schema: {
		type: ['null', 'string', 'array'],
		items: {
			type: 'string'
		}
	},

	configure(options) {
		assert(
			typeof options === 'string' || Array.isArray(options),
			this.name +
				' option requires string or array value or should be removed'
		);

		if (typeof options === 'string') {
			options = [options];
		}

		this._disallowedTags = options.map((value) => value.toLowerCase());
	},

	lint(file, errors) {
		const disallowedTags = this._disallowedTags;

		file.iterateTokensByFilter(
			(token) =>
				token.type === 'tag' &&
				disallowedTags.includes(token.val.toLowerCase()),
			(token) => {
				errors.add(
					'Tag "' + token.val + '" must not be used',
					token.line,
					token.col
				);
			}
		);
	}
};
