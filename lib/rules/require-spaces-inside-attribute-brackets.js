var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'requireSpacesInsideAttributeBrackets'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.addErrorForIncorrectSpacesAroundType(
        { type: 'start-attributes'
        , required: true
        , position: 'after'
        , description: 'opening bracket'
        }
        , errors)

      file.addErrorForIncorrectSpacesAroundType(
        { type: 'end-attributes'
        , required: true
        , position: 'before'
        , description: 'closing bracket'
        }
        , errors)

    }
  }
