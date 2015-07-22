var assert = require('assert')

module.exports = function () {}

module.exports.prototype =
  { name: 'disallowBlockExpansion'

  , configure: function (options) {

      assert(options === true
        , this.name + ' option requires a true value or should be removed')

    }

  , lint: function (file, errors) {

      file.addErrorForAllTokensByType(':', errors, 'Block expansion operators must not be used')

    }
  }
