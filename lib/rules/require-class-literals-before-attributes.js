var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'requireClassLiteralsBeforeAttributes'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.addErrorForIncorrectTokenTypeOrder('class', 'attrs', errors
        , 'All class literals must be written before any attribute blocks')

    }
  }
