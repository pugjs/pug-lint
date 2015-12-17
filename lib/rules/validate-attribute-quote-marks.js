// # validateAttributeQuoteMarks: `"\""` | `"'"` | `true`
//
// ## e.g.: `"'"`
//
// All attribute values must be enclosed in single quotes.
//
// ```jade
// //- Invalid
// input(type="text" name="name" value="value")
//
// //- Valid
// input(type='text' name='name' value='value')
// ```
//
// ## if (true)
//
// All attribute values must be enclosed in quote marks match the first quote mark encountered in the source code.

var assert = require('assert')

module.exports = function () {}

module.exports.prototype =
  { name: 'validateAttributeQuoteMarks'

  , configure: function (options) {

      assert(options === '"' || options === '\'' || options === true
        , this.name + ' option requires \'"\', "\'", or a true value')

      this._quoteMark = options

    }

  , lint: function (file, errors) {

      var quoteMark = this._quoteMark
        , isQuoteMarkFound

      file.iterateTokensByType('attribute', function (token) {
        var value = token.val.length ? token.val : ''
          , quotes = [ '"', '\'' ]
          , openingQuote = value.charAt(0)
          , closingQuote = value.charAt(value.length - 1)

        if (quoteMark === true && !isQuoteMarkFound) {
          quoteMark = openingQuote
          isQuoteMarkFound = true
        }

        if (quotes.indexOf(openingQuote) !== -1 && quotes.indexOf(closingQuote) !== -1) {
          if (openingQuote !== quoteMark || closingQuote !== quoteMark) {
            errors.add('Invalid attribute quote mark found', token.line)
          }
        }
      })

    }
  }
