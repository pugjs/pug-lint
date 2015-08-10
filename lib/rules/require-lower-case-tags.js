var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'requireLowerCaseTags'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      var isXml

      file.iterateTokensByType('doctype', function (token) {
        isXml = token.val === 'xml'
      })

      if (!isXml) {
        file.addErrorForAllTokensByFilter(function (token) {
          return token.type === 'tag' && token.val !== token.val.toLowerCase()
        }, errors, 'All tags must be written in lower case')
      }

    }
  }
