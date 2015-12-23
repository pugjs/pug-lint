// # disallowAttributeConcatenation: `true`
//
// Pug must not contain any attribute concatenation.
//
// ```jade
// //- Invalid
// a(href='text ' + title) Link
// ```

var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'disallowAttributeConcatenation'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      var regex = /['"]\s*\+|\+\s*['"]/

      file.addErrorForAllLinesByType('attribute', regex, true, errors, 'Attribute concatenation must not be used')

    }
  }
