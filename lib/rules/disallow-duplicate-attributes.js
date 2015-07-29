var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'disallowDuplicateAttributes'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.iterateTokensByType('attrs', function (token) {
        var attributeNames = []
          , lineNumber = token.line

        token.attrs.forEach(function (attribute) {
          var name = attribute.name.toLowerCase()

          if (name !== 'class') {
            if (attributeNames.indexOf(name) === -1) {
              attributeNames.push(name)
            } else {
              errors.add('Duplicate attribute "' + name + '" is not allowed', lineNumber)
            }
          }
        })

        file.iterateTokensByFilter(function (token) {
          return token.type === 'id' && token.line === lineNumber
        }, function (token) {
          if (attributeNames.indexOf('id') !== -1) {
            errors.add('Duplicate attribute "id" is not allowed', token.line)
          }
        })
      })

    }
  }
