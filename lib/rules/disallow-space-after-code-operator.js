// # disallowSpaceAfterCodeOperator: `true` | `Array`
//
// ## e.g.: `true`
//
// No code operators (`-`/`=`/`!=`) should be followed by any spaces.
//
// ```pug
// //- Invalid
// p= 'This code is <escaped>'
// p!=  'This code is <strong>not</strong> escaped'
//
// //- Valid
// p='This code is <escaped>'
// p!='This code is <strong>not</strong> escaped'
// ```
//
// ## e.g.: `[ "-" ]`
//
// No unbuffered code operators (`-`) should be followed by any spaces.
//
// ```pug
// //- Invalid
// - var a = 'This is code'
//
// //- Valid
// -var a = 'This is code'
// ```

const utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
	name: 'disallowSpaceAfterCodeOperator',

	schema: {
		anyOf: [
			{
				enum: [null, true]
			},
			{
				type: 'array',
				items: {
					enum: ['-', '=', '!=']
				}
			}
		]
	},

	configure(options) {
		this._codeOperatorTypes = utils.validateCodeOperatorOptions(
			this.name,
			options
		);
	},

	lint(file, errors) {
		file.addErrorForCodeOperator(this._codeOperatorTypes, false, errors);
	}
};
