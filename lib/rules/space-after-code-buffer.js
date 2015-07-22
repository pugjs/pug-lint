var assert = require('assert')

module.exports = function () {}

module.exports.prototype =
  { name: 'spaceAfterCodeBuffer'

  , configure: function (options) {

      assert(options === 'require' || options === 'disallow'
        , this.name + ' option requires "require" or "disallow"')

      this._isRequired = options === 'require'

    }

  , lint: function (file, errors) {

      var separator = this._isRequired ? ' ' : ''
        , errorMessage = this._isRequired ? 'Missing space after code buffer' : 'Space after code buffer'

      file.iterateTokensByFilter(function (token) {
        return token.type === 'code' && token.buffer
      }, function (token) {
        var lineNumber = token.line
          , line = file.getLine(lineNumber)
          , regex = new RegExp(/(!?=|-)(\s?)[ \t]*([^\n]+)/g)
          , match

        while ((match = regex.exec(line)) !== null) {
          if (match[2] !== separator) {
            errors.add(errorMessage, lineNumber)
          }
        }
      })

    }
  }
