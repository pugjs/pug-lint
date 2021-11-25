// # maximumLineLength: `int`
//
// ## e.g.: `80`
//
// Lines in Pug file must not exceed the specified length.

const assert = require('assert');

module.exports = function () {};

module.exports.prototype = {
	name: 'maximumLineLength',

	schema: {
		type: ['null', 'integer']
	},

	configure(options) {
		assert(
			typeof options === 'number',
			this.name + ' option requires number value or should be removed'
		);

		this._maximumLineLength = options;
	},

	lint(file, errors) {
		const max = this._maximumLineLength;

		for (const [index, line] of file.getLines().entries()) {
			if (line.length > max) {
				errors.add(
					'Line length exceeds the maximum of ' + max + ' chars',
					index + 1
				);
			}
		}
	}
};
