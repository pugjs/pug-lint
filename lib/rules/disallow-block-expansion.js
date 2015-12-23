// # disallowBlockExpansion: `true`
//
// Pug must not contain any block expansion operators.
//
// ```jade
// //- Invalid
// p: strong text
// table: tr: td text
// ```

var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'disallowBlockExpansion'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.addErrorForAllTokensByType(':', errors, 'Block expansion operators must not be used')

    }
  }
