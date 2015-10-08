var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'disallowStringConcatenation'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      var regex = /['"]\s*\+|\+\s*['"]/

      file.addErrorForAllLinesByFilter(function (token) {
        return (token.type === 'code' && token.buffer)
      }, regex, true, errors, 'String concatenation must not be used')

    }
  }
