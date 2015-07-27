var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'requireIdLiteralsBeforeAttributes'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.addErrorForIncorrectTokenTypeOrder('id', 'attrs', errors
        , 'All ID literals must be written before any attribute blocks')

    }
  }
