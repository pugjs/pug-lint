var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'disallowStringInterpolation'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      var errorMessage = 'String interpolation operators must not be used'

      file.addErrorForAllTokensByFilter(function (token) {
        return (token.type === 'text' && /[!#]{.+}/.test(token.val))
      }, errors, errorMessage)

      file.iterateTokensByType('attrs', function (token) {
        token.attrs.forEach(function (attribute) {
          if (/\'\s\+\s\(.*\)\s\+\s\'/g.test(attribute.val)) {
            errors.add(errorMessage, token.line)
          }
        })
      })

    }
  }
