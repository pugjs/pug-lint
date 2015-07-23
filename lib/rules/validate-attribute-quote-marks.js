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
        , isOpeningQuoteFound

      file.iterateTokensByType('attrs', function (token) {
        token.attrs.forEach(function (attribute) {
          var value = attribute.val
            , quotes = [ '"', '\'' ]
            , openingQuote = value.charAt(0)
            , closingQuote = value.charAt(value.length - 1)

          if (quoteMark === true && !isOpeningQuoteFound) {
            quoteMark = openingQuote
            isOpeningQuoteFound = true
          }

          if (quotes.indexOf(openingQuote) !== -1 && quotes.indexOf(closingQuote) !== -1) {
            if (openingQuote !== quoteMark || closingQuote !== quoteMark) {
              errors.add('Invalid quote mark found', token.line)
            }
          }
        })
      })

    }
  }
