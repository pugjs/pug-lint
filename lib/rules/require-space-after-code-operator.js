// # requireSpaceAfterCodeOperator: `true`
//
// All code operators (unbuffered/buffered/unescaped buffered) must be immediately followed by a single space.
//
// ```jade
// //- Invalid
// p='This code is <escaped>'
// p!=  'This code is <strong>not</strong> escaped'
//
// //- Valid
// p= 'This code is <escaped>'
// p!= 'This code is <strong>not</strong> escaped'
// ```

var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'requireSpaceAfterCodeOperator'

  , contradictions: [ 'disallowSpaceAfterCodeOperator' ]

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.addErrorForAllLinesByFilter(function (token) {
        return token.type === 'code' && !token.requiresBlock
      }, /^---$|^\s*(-|([^-].*!?=))\s\S+/, false, errors, 'Missing space after code operator')

    }
  }
