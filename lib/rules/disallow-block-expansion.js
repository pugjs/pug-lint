var assert = require('assert')

module.exports = function () {}

module.exports.prototype =
  { name: 'disallowBlockExpansion'

  , configure: function (options) {

      assert(options === true
        , this.name + ' option requires a true value or should be removed')

    }

  , lint: function (file) {

      var interpolationTokens = file.tokens.filter(function (token) {
          return token.type === ':'
        })

      interpolationTokens.forEach(function (token) {
        file.errors.push({ message: 'Block expansion operators must not be used'
          , filename: file.filename, line: token.line })
      }, this)

    }
  }
