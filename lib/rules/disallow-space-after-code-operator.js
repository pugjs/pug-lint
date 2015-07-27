var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'disallowSpaceAfterCodeOperator'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.addErrorForAllLinesByType('code', /(!?=|-)([^\s\n]+)/, false, errors
        , 'Unwanted space after code operator')

    }
  }
