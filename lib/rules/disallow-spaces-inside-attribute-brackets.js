var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'disallowSpacesInsideAttributeBrackets'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.addErrorForIncorrectSpacesAroundType(
        { type: 'start-attributes'
        , required: false
        , position: 'after'
        , description: 'opening bracket'
        }
        , errors)

      file.addErrorForIncorrectSpacesAroundType(
        { type: 'end-attributes'
        , required: false
        , position: 'before'
        , description: 'closing bracket'
        }
        , errors)

    }
  }
