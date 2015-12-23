// # disallowAttributeInterpolation: `true`
//
// Pug must not contain any attribute interpolation operators.
//
// ```jade
// //- Invalid
// a(href='text #{title}') Link
// ```

var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'disallowAttributeInterpolation'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.addErrorForAllLinesByType('attribute', /\(.+[!#]{.+}.+\)/, true, errors
        , 'Attribute interpolation operators must not be used')

    }
  }
