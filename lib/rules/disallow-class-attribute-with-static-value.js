var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'disallowClassAttributeWithStaticValue'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.iterateTokensByType('attrs', function (token) {
        token.attrs.filter(function (attribute) {
          return attribute.name.toLowerCase() === 'class'
        }).forEach(function (attribute) {
          errors.add(attribute, token.line)
        })
      })

    }
  }
