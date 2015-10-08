var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'disallowAttributeInterpolation'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.addErrorForAllLinesByType('attrs', /\(.+[!#]{.+}.+\)/, true, errors
        , 'Attribute interpolation operators must not be used')

    }
  }
