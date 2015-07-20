var assert = require('assert')

module.exports = function () {}

module.exports.prototype =
  { name: 'spaceAfterCodeBuffer'

  , configure: function (options) {

      assert(options === 'require' || options === 'disallow'
        , this.name + ' option requires "require" or "disallow"')

      var isRequired = options === 'require'

      this._separator = isRequired ? ' ' : ''
      this._errorMessage = isRequired ? 'Missing space after code buffer' : 'Space after code buffer'

    }

  , lint: function (file) {

      var bufferedCodeTokens = file.tokens.filter(function (token) {
          return token.type === 'code' && token.buffer
        })

      bufferedCodeTokens.forEach(function (token) {
        var lineNumber = token.line
          , line = file.lines[lineNumber - 1]
          , regex = new RegExp(/(!?=|-)(\s?)[ \t]*([^\n]+)/g)
          , match

        while ((match = regex.exec(line)) !== null) {
          if (match[2] !== this._separator) {
            file.errors.push({ message: this._errorMessage, filename: file.filename, line: lineNumber })
          }
        }
      }, this)

    }
  }
