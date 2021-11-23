// # requireSpaceAfterCodeOperator: `true` | `Array`
//
// ## e.g.: `true`
//
// All code operators (`-`/`=`/`!=`) must be immediately followed by a single space.
//
// ```pug
// //- Invalid
// p='This code is <escaped>'
// p!=  'This code is <strong>not</strong> escaped'
//
// //- Valid
// p= 'This code is <escaped>'
// p!= 'This code is <strong>not</strong> escaped'
// ```
//
// ## e.g.: `[ "-" ]`
//
// All unbuffered code operators (`-`) must be immediately followed by a single space.
//
// ```pug
// //- Invalid
// -var a = 'This is code'
//
// //- Valid
// - var a = 'This is code'
// ```

const utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
  name: 'requireSpaceAfterCodeOperator',

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
    this._codeOperatorTypes = utils.validateCodeOperatorOptions(this.name, options);
  },

  lint(file, errors) {
    file.addErrorForCodeOperator(this._codeOperatorTypes, true, errors);
  }
};
