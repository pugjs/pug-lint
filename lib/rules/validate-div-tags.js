// # validateDivTags: `true`
//
// Checks that Jade does not contain any unnecessary `div` tags.
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
          var lineNumber = token.line

          file.iterateTokensByFilter(function (token) {
            return [ 'class', 'id' ].indexOf(token.type) !== -1 && token.line === lineNumber
          }, function (token) {
            errors.add('Unnecessary `div` tag', token.line, token.col)
          })
        })
      }

    }
  }
