var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'spaceAfterCodeBuffer'

  , configure: function (options) {

      this._isRequired = utils.validateRequirementOptions(this.name, options)

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
