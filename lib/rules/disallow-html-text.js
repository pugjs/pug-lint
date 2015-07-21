var assert = require('assert')

module.exports = function () {}

module.exports.prototype =
  { name: 'disallowHtmlText'

  , configure: function (options) {

      assert(options === true
        , this.name + ' option requires a true value or should be removed')

    }

  , lint: function (file) {

      var htmlTextTokens = file.tokens.filter(function (token) {
          return token.type === 'text-html' && token.val !== ''
        })

      htmlTextTokens.forEach(function (token) {
        file.errors.push({ message: 'HTML text must not be used', filename: file.filename, line: token.line })
      }, this)

    }
  }
