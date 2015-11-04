// # maximumNumberOfLines: `int`
//
// Jade files should be at most the number of lines specified.
//
// # requireClassLiteralsBeforeAttributes: `true`
//
// All class literals must be written before any attribute blocks.
//
// ```jade
// //- Invalid
// input(type='text').class
//
// //- Valid
// input.class(type='text')
// ```

var assert = require('assert')

module.exports = function () {}

module.exports.prototype =
  { name: 'maximumNumberOfLines'

  , configure: function (options) {

      assert(typeof options === 'number'
        , this.name + ' option requires number value or should be removed')

      this._maximumNumberOfLines = options

    }

  , lint: function (file, errors) {

      var lastToken = file.getLastToken()

      if (lastToken.line > this._maximumNumberOfLines) {
        errors.add('File must be at most ' + this._maximumNumberOfLines + ' lines long', lastToken.line)
      }

    }
  }
