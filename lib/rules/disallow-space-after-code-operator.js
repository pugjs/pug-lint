var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'disallowSpaceAfterCodeOperator'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.iterateTokensByType('code', function (token) {
        file.addErrorForLineMismatch(token.line, /(!?=|-)([^\s\n]+)/, errors, 'Space after code operator')
      })

    }
  }
