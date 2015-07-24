var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'disallowClassLiterals'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.addErrorForAllTokensByType('class', errors, 'Class literals must not be used')

    }
  }
