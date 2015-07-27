var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'disallowIdLiteralsBeforeAttributes'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.addErrorForIncorrectTokenTypeOrder('attrs', 'id', errors
        , 'All ID literals must be written after any attribute blocks')

    }
  }
