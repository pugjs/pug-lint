var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'requireClassLiteralsBeforeIdLiterals'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.addErrorForIncorrectTokenTypeOrder('class', 'id', errors
        , 'All class literals must be written before any ID literals')

    }
  }
