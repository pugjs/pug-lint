// # disallowBlockExpansion: `Array` | `true`
//
// ## e.g.: `[ ]`
//
// Pug must not contain...
//
// ```jade
// //- Invalid
// a(href='http://example.com', target='_blank'): img(src='http://example.com/image.jpg')
//
// //- Valid
// ul
//   li: a(href='http://example.com/1') Link 1
// ```
//
// ## if (true)
//
// Pug must not contain any block expansion operators.
//
// ```jade
// //- Invalid
// p: strong text
// table: tr: td text
// ```

var assert = require('assert')
  , utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'disallowBlockExpansion'

  , configure: function (options) {

      assert(typeof options === 'object' || options === true
        , this.name + ' option requires an array, or a true value')

      this._whiteList = options.whiteList

    }

  , lint: function (file, errors) {

      var whiteList = this._whiteList

      if (whiteList) {
        file.iterateTokensByType(':', function (token) {
          var start = file.getPreviousTokenByType(token, utils.htmlTagBoundaryTypes)
            , startIndex = start._index
            , endIndex = token._index
            , hasError = false

          file.iterateTokensByFilter(function (token) {
            return token._index > startIndex && token._index < endIndex
          }, function (token) {
            if (whiteList.indexOf(token.type) === -1) {
              hasError = true
            }
          })

          if (hasError) {
            errors.add('Non-white listed tokens found before block expansion operator', token.line, token.col)
          }
        })
      } else {
        file.addErrorForAllTokensByType(':', errors, 'Block expansion operators must not be used')
      }

    }
  }
