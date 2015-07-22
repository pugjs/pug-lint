var assert = require('assert')

module.exports = function () {}

module.exports.prototype =
  { name: 'disallowTagInterpolation'

  , configure: function (options) {

      assert(options === true
        , this.name + ' option requires a true value or should be removed')

    }

  , lint: function (file, errors) {

      file.addErrorForAllTokensByType('start-jade-interpolation', errors
        , 'Tag interpolation operators must not be used')

    }
  }
