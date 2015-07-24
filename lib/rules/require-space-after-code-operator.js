var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'requireSpaceAfterCodeOperator'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.iterateTokensByType('code', function (token) {
        file.addErrorForLineMismatch(token.line, /(!?=|-)(\s)([^\s\n]+)/, errors, 'Missing space after code operator')
      })

    }
  }
