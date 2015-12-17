// # requireSpecificAttributes: `Array`
//
// ## e.g.: `[ { img: [ "alt" ] } ]`
//
// `img` tags must contain all of the attributes specified.
//
// ```jade
// //- Invalid
// img(src='src')
//
// //- Valid
// img(src='src' alt='alt')
// ```

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
            , columnNumber = token.col
            , requiredAttributes = utils.ownProperty(attribute, selector)
            , start = file.getNextTokenByType(token, [ 'newline', 'start-attributes' ])
            , startIndex = (start || token)._index
            , end = file.getNextTokenByType(token, [ 'newline', 'end-attributes' ])
            , endIndex = (end || token)._index
            , attributeNames = []
            , hasAttributes

          if (typeof requiredAttributes === 'string') {
            requiredAttributes = [ requiredAttributes ]
          }

          file.iterateTokensByFilter(function (token) {
            if (token.type === 'attribute' && token._index > startIndex && token._index < endIndex) {
              hasAttributes = true
              return true
            }
          }, function (token) {
            attributeNames.push(token.name.toLowerCase())
          })

          if (hasAttributes) {
            requiredAttributes.forEach(function (attribute) {
              if (attributeNames.indexOf(attribute.toLowerCase()) === -1) {
                errors.add('Tag "' + tag + '" must have attribute "' + attribute + '"', lineNumber, columnNumber)
              }
            })
          } else {
            errors.add('Tag "' + tag + '" must have attributes "' + requiredAttributes.join('", "') + '"'
              , lineNumber, columnNumber)
          }
        })

      }

    }
  }
