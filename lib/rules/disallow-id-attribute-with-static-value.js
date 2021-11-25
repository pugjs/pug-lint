// # disallowIdAttributeWithStaticValue: `true`
//
// Prefer ID literals over `id` attributes with static values.
//
// ```pug
// //- Invalid
// span(id='foo')
//
// //- Valid
// span#id
// ```

const utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
	name: 'disallowIdAttributeWithStaticValue',

	schema: {
		enum: [null, true]
	},

	configure(options) {
		utils.validateTrueOptions(this.name, options);
	},

	lint(file, errors) {
		file.addErrorForAllStaticAttributeValues(
			'id',
			errors,
			'Static attribute "id" must be written as ID literal'
		);
	}
};
