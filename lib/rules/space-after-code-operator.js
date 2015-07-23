var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'spaceAfterCodeOperator'

  , configure: function (options) {

      this._isRequired = utils.validateRequirementOptions(this.name, options)

    }

  , lint: function (file, errors) {

      var separator = this._isRequired ? ' ' : ''
        , errorMessage = this._isRequired ? 'Missing space after code operator' : 'Space after code operator'

      file.iterateTokensByType('code', function (token) {
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
