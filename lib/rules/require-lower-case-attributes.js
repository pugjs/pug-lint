var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'requireLowerCaseAttributes'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.iterateTokensByType('attrs', function (token) {
        token.attrs.forEach(function (attribute) {
          if (attribute.name !== attribute.name.toLowerCase()) {
            errors.add('All tags must be written in lower case', token.line)
          }
        })
      })

    }
  }
