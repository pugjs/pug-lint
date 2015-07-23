var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'literalsBeforeAttributes'

  , configure: function (options) {

      this._isRequired = utils.validateRequirementOptions(this.name, options)

    }

  , lint: function (file, errors) {

      var isRequired = this._isRequired
        , tokens = file.getTokens()
        , lineNumbers = []
        , errorMessage =
            [ 'All'
            , isRequired ? 'literals' : 'attribute blocks'
            , 'must be written before any'
            , isRequired ? 'attribute blocks' : 'literals'
            ].join(' ')

      file.iterateTokensByFilter(function (token) {
        var lineNumber = token.line

        if ([ 'class', 'id' ].indexOf(token.type) !== -1 && lineNumbers.indexOf(lineNumber) === -1) {
          lineNumbers.push(lineNumber)

          return true
        }

        return false
      }, function (token) {
        var lineNumber = token.line
          , literalIndex = tokens.indexOf(token)

        file.iterateTokensByFilter(function (token) {
          return token.type === 'attrs' && token.line === lineNumber
        }, function (token) {
          var attributeIndex = tokens.indexOf(token)

          if (isRequired) {
            if (literalIndex > attributeIndex) {
              errors.add(errorMessage, lineNumber)
            }
          } else {
            if (literalIndex < attributeIndex) {
              errors.add(errorMessage, lineNumber)
            }
          }
        })
      })

    }
  }
