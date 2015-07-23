var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'disallowHtmlText'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.addErrorForAllTokensByType('text-html', errors, 'HTML text must not be used')

    }
  }
