// # disallowIdLiteralsBeforeAttributes: `true`
//
// All attribute blocks must be written before any ID literals.
//
// ```jade
// //- Invalid
// input#id(type='text')
//
// //- Valid
// input(type='text')#id
// ```

var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'disallowIdLiteralsBeforeAttributes'

  , contradictions: [ 'requireIdLiteralsBeforeAttributes' ]

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.addErrorForIncorrectTokenTypeOrder('start-attributes', 'id', utils.htmlTagBoundaryTypes
        , errors, 'All ID literals must be written after any attribute blocks')

    }
  }
