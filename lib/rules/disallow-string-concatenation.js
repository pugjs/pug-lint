// # disallowStringConcatenation: `true`
//
// Pug must not contain any string concatenation.
//
// ```jade
// //- Invalid
// h1= title + \'text\'
// ```

var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'disallowStringConcatenation'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.iterateTokensByFilter(function (token) {
        return (token.type === 'code' && token.buffer)
      }, function (token) {
        if (utils.concatenationRegex.test(token.val)) {
          errors.add('String concatenation must not be used', token.line)
        }
      })

    }
  }
