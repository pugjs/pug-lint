// # requireClassLiteralsBeforeIdLiterals: `true`
//
// All class literals must be written before any ID literals.
//
// ```jade
// //- Invalid
// input#id.class(type='text')
//
// //- Valid
// input.class#id(type='text')
// ```

var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'requireClassLiteralsBeforeIdLiterals'

  , contradictions: [ 'disallowClassLiteralsBeforeIdLiterals' ]

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.addErrorForIncorrectTokenTypeOrder('class', 'id', utils.htmlTagBoundaryTypes
        , errors, 'All class literals must be written before any ID literals')

    }
  }
