// # disallowClassLiterals: `true`
//
// Pug must not contain any class literals.
//
// ```pug
// //- Invalid
// .class
//
// //- Valid
// div(class='class')
// ```

const utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
	name: 'disallowClassLiterals',

	schema: {
		enum: [null, true]
	},

	configure(options) {
		utils.validateTrueOptions(this.name, options);
	},

	lint(file, errors) {
		file.addErrorForAllTokensByType(
			'class',
			errors,
			'Class literals must not be used'
		);
	}
};
