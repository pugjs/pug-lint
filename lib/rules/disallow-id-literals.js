// # disallowIdLiterals: `true`
//
// Pug must not contain any ID literals.
//
// ```jade
// //- Invalid
// #id
//
// //- Valid
// div(id='id')
// ```

var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'disallowIdLiterals'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.addErrorForAllTokensByType('id', errors, 'ID literals must not be used')

    }
  }
