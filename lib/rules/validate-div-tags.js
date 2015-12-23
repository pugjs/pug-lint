// # validateDivTags: `true`
//
// Checks that Pug does not contain any unnecessary `div` tags.
//
// ```jade
// //- Invalid
// div.class
// div#id
// div.class(class='class')
//
// //- Valid
// .class
// #id
// .class(class='class')
// ```

var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'validateDivTags'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      var isXml

      file.iterateTokensByType('doctype', function (token) {
        isXml = token.val === 'xml'
      })

      if (!isXml) {
        file.iterateTokensByFilter(function (token) {
          return token.type === 'tag' && token.val === 'div'
        }, function (token) {
          var current = token
            , currentLineTokens = file.getTokensByFilter(function (token) {
              return token.line === current.line
            })
          , boundaryStart = file.getPreviousTokenByType(current, utils.htmlTagBoundaryTypes) || currentLineTokens[0]
          , boundaryStartIndex = boundaryStart._index
          , boundaryEnd = file.getNextTokenByType(current, utils.htmlTagBoundaryTypes)
          , boundaryEndIndex = boundaryEnd._index

          file.iterateTokensByFilter(function (token) {
            return [ 'class', 'id' ].indexOf(token.type) !== -1 &&
              token._index >= boundaryStartIndex &&
              token._index <= boundaryEndIndex
          }, function (token) {
            errors.add('Unnecessary `div` tag', token.line, token.col)
          })
        })
      }

    }
  }
