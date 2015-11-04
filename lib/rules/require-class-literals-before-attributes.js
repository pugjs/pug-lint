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

var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'requireClassLiteralsBeforeAttributes'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.addErrorForIncorrectTokenTypeOrder('class', 'start-attributes', errors
        , 'All class literals must be written before any attribute blocks')

    }
  }
