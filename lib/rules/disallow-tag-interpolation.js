var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'disallowTagInterpolation'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.addErrorForAllTokensByType('start-jade-interpolation', errors
        , 'Tag interpolation operators must not be used')

    }
  }
