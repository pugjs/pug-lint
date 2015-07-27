var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'requireSpaceAfterCodeOperator'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.addErrorForAllLinesByType('code', /(!?=|-)(\s)([^\s\n]+)/, false, errors
        , 'Missing space after code operator')

    }
  }
