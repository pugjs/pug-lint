var assert = require('assert')
  , CssParser = require('css-selector-parser').CssSelectorParser
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
        for (var selector in attribute) {
          validateAttribute(attribute, selector)
        }
      })

      function compareAttributes (attrs) {

        return attrs === undefined

      }

      function validateAttribute (attribute, selector) {

        var cssParser = new CssParser()
          , cssRule = cssParser.parse(selector).rule
          , tag = cssRule.tagName
          , attrs = cssRule.attrs

        file.iterateTokensByFilter(function (token) {
          return token.type === 'tag' && token.val.toLowerCase() === tag.toLowerCase() && compareAttributes(attrs)
        }, function (token) {
          var lineNumber = token.line
            , requiredAttributes = utils.ownProperty(attribute, selector)
            , hasAttributes

          if (typeof requiredAttributes === 'string') {
            requiredAttributes = [ requiredAttributes ]
          }

          file.iterateTokensByFilter(function (token) {
            if (token.type === 'attrs' && token.line === lineNumber) {
              hasAttributes = true
              return true
            }
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

      }

    }
  }
