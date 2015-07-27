var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'disallowClassLiteralsBeforeAttributes'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.addErrorForIncorrectTokenTypeOrder('attrs', 'class', errors
        , 'All class literals must be written after any attribute blocks')

    }
  }
