var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'requireSpaceAfterCodeOperator'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.addErrorForAllLinesByFilter(function (token) {
        return token.type === 'code' && !token.requiresBlock
      }, /^---$|^\s*(-|([^-].*!?=))\s\S+/, false, errors, 'Missing space after code operator')

    }
  }
