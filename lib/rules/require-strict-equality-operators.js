// # requireStrictEqualityOperators: `true`
//
// Requires the use of `===` and `!==` instead of `==` and `!=`.
//
// ```jade
// //- Invalid
// if true == false
// if true != false
//
// //- Valid
// if true === false
// if true !== false
// ```

var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'requireStrictEqualityOperators'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.iterateTokensByType([ 'if', 'else-if' ], function (token) {
        var regex = /([!=]=)(.)/
          , match = token.val.match(regex)
          , operator

        if (match !== null) {
          operator = match[1]

          if (match[2] !== '=') {
            errors.add('Expected \'' + operator + '=\' and instead saw \'' + operator + '\'', token.line)
          }
        }
      })

    }
  }
