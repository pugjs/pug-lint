// # disallowSpaceAfterCodeOperator: `true`
//
// No code operators (unbuffered/buffered/unescped buffered) should be followed by any spaces.
//
// ```jade
// //- Invalid
// p= 'This code is <escaped>'
// p!=  'This code is <strong>not</strong> escaped'
//
// //- Valid
// p='This code is <escaped>'
// p!='This code is <strong>not</strong> escaped'
// ```

var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'disallowSpaceAfterCodeOperator'

  , contradictions: [ 'requireSpaceAfterCodeOperator' ]

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.addErrorForAllLinesByFilter(function (token) {
        return token.type === 'code' && !token.requiresBlock
      }, /^\s*(-|([^-].*!?=))\s+\S+/, true, errors, 'Unwanted space after code operator')

    }
  }
