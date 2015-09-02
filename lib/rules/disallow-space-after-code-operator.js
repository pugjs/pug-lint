var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'disallowSpaceAfterCodeOperator'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.addErrorForAllLinesByFilter(function (token) {
        return token.type === 'code' && !token.requiresBlock
      }, /^\s*(-|([^-].*!?=))\s+\S+/, true, errors, 'Unwanted space after code operator')

    }
  }
