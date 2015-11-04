// # disallowImplicitDiv: `true`
//
// Avoid writing `div` when it would otherwise be implicit.
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
  { name: 'disallowImplicitDiv'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.iterateTokensByFilter(function (token) {
        return token.type === 'tag' && token.val === 'div'
      }, function (token) {
        var lineNumber = token.line

        file.iterateTokensByFilter(function (token) {
          return [ 'class', 'id' ].indexOf(token.type) !== -1 && token.line === lineNumber
        }, function (token) {
          errors.add('Must not use `div` when it would otherwise be implicit', token.line, token.col)
        })
      })

    }
  }
