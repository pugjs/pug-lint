var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'disallowStringInterpolation'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.addErrorForAllTokensByFilter(function (token) {
        return (token.type === 'text' && /[!#]{.+}/.test(token.val))
      }, errors, 'TBC')

      file.iterateTokensByType('attrs', function (token) {
        token.attrs.forEach(function (attribute) {
          console.log(999, attribute.val)

          if (/\'\s\+\s\(.*\)\s\+\s\'/g.test(attribute.val)) {
            errors.add('TBC', token.line)
          }
        })
      })

    }
  }
