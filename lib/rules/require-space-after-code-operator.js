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

      // Unbuffered
      file.addErrorForIncorrectSpacesAroundFilter(
        { filter: function (token) {
            return token.type === 'code' && !token.buffer && !token.mustEscape
          }
        , required: true
        , position: 'after'
        , description: 'unbuffered code operator'
        }
        , errors)

      // Buffered
      file.addErrorForIncorrectSpacesAroundFilter(
        { filter: function (token) {
            return token.type === 'code' && token.buffer && token.mustEscape
          }
        , required: true
        , position: 'after'
        , description: 'buffered code operator'
        }
        , errors)

      // Unescaped buffered
      file.addErrorForIncorrectSpacesAroundFilter(
        { filter: function (token) {
            return token.type === 'code' && token.buffer && !token.mustEscape
          }
        , required: true
        , position: 'after'
        , description: 'unescaped buffered code operator'
        , tokenWidth: 2
        }
        , errors)

    }
  }
