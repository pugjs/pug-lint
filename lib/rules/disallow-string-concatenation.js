var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'disallowStringConcatenation'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      var regex = /['"]\s*\+|\+\s*['"]/

      file.addErrorForAllLinesByType([ 'code', 'attrs' ]
        , regex, true, errors, 'String concatenation must not be used')

    }
  }
