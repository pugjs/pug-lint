var assert = require('assert')
  , utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'requireSpecificAttributes'

  , configure: function (options) {

      assert(typeof options === 'object'
        , this.name + ' option requires array value or should be removed')

      this._requiredAttributes = options
    }

  , lint: function (file, errors) {

      this._requiredAttributes.forEach(function (attribute) {
        file.iterateTokensByFilter(function (token) {
          return token.type === 'tag' && utils.ownProperty(attribute, token.val)
        }, function (token) {
          var lineNumber = token.line
            , tag = token.val
            , requiredAttributes = utils.ownProperty(attribute, tag)
            , hasAttributes

          if (typeof requiredAttributes === 'string') {
            requiredAttributes = [ requiredAttributes ]
          }

          file.iterateTokensByFilter(function (token) {
            if (token.type === 'attrs' && token.line === lineNumber) {
              hasAttributes = true
              return true
            }

            return false
          }, function (token) {
            var attributeNames = []

            token.attrs.forEach(function (attribute) {
              attributeNames.push(attribute.name.toLowerCase())
            })

            requiredAttributes.forEach(function (attribute) {
              if (attributeNames.indexOf(attribute.toLowerCase()) === -1) {
                errors.add('Tag "' + tag + '" must have attribute "' + attribute + '"', lineNumber)
              }
            })
          })

          if (!hasAttributes) {
            errors.add('Tag "' + tag + '" must has attributes "' + requiredAttributes.join('", "') + '"', lineNumber)
          }
        })
      })

    }
  }
