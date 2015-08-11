var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'disallowSpacesInsideAttributeBrackets'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.iterateTokensByType('attrs', function (token) {
        file.addErrorForIncorrectSpacesInsideBrackets([ '(', ')' ], token, false, errors)
      }, true)
    }
  }
