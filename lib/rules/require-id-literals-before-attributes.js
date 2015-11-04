// # requireIdLiteralsBeforeAttributes: `true`
//
// All ID literals must be written before any attribute blocks.
//
// ```jade
// //- Invalid
// input(type='text')#id
//
// //- Valid
// input#id(type='text')
// ```

var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'requireIdLiteralsBeforeAttributes'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.addErrorForIncorrectTokenTypeOrder('id', 'start-attributes', errors
        , 'All ID literals must be written before any attribute blocks')

    }
  }
