var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'disallowClassLiteralsBeforeIdLiterals'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.addErrorForIncorrectTokenTypeOrder('id', 'class', errors
        , 'All class literals must be written after any ID literals')

    }
  }
