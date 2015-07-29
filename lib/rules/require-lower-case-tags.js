var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'requireLowerCaseTags'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.addErrorForAllTokensByFilter(function (token) {
        return token.type === 'tag' && token.val !== token.val.toLowerCase()
      }, errors, 'TBC')

    }
  }
