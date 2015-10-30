var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'disallowDuplicateAttributes'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.iterateTokensByType('start-attributes', function (token) {
        var attributeNames = []
          , startIndex = token._index
          , end = file.getNextTokenByType(token, 'end-attributes')
          , endIndex = (end || token)._index
          , lineNumber = token.line

        file.iterateTokensByFilter(function (token) {
          return token.type === 'attribute' && token._index > startIndex && token._index < endIndex
        }, function (token) {
          var name = token.name.toLowerCase()

          if (name !== 'class') {
            if (attributeNames.indexOf(name) === -1) {
              attributeNames.push(name)
            } else {
              errors.add('Duplicate attribute "' + name + '" is not allowed', token.line, token.col)
            }
          }
        })

        file.iterateTokensByFilter(function (token) {
          return token.type === 'id' && token.line === lineNumber
        }, function (token) {
          if (attributeNames.indexOf('id') !== -1) {
            errors.add('Duplicate attribute "id" is not allowed', token.line, token.col)
          }
        })
      })

    }
  }
