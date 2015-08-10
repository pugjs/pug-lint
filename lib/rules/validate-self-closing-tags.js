var utils = require('../utils')
  , selfClosing = require('void-elements')

module.exports = function () {}

module.exports.prototype =
  { name: 'validateSelfClosingTags'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      var isXml

      file.iterateTokensByType('doctype', function (token) {
        isXml = token.val === 'xml'
      })

      if (!isXml) {
        file.iterateTokensByType('tag', function (token) {
          if (token.selfClosing && selfClosing[token.val]) {
            errors.add('Unnecessary self closing tag', token.line)
          }
        })
      }

    }
  }
