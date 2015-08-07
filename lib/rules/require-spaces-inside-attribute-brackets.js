var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'requireSpacesInsideAttributeBrackets'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.iterateTokensByType('attrs', function (token) {
        var lineNumber = token.line
          , line = file.getLine(lineNumber)
          , regex = new RegExp(/(\()(\s*)\S[^(]*\S(\s*)(\))/g)
          , match
          , separator = ' '

        while ((match = regex.exec(line)) !== null) {
          var openingColumn = line.indexOf(match[1]) + 1
            , closingColumn = line.lastIndexOf(match[4]) + 1

          if (match[2] !== separator) {
            errors.add('One space required after opening bracket', lineNumber, openingColumn)
          }

          if (match[3] !== separator) {
            errors.add('One space required before closing bracket', lineNumber, closingColumn)
          }
        }
      })

    }
  }
