var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'idLiterals'

  , configure: function (options) {

      this._isRequired = utils.validateRequirementOptions(this.name, options)

    }

  , lint: function (file, errors) {

      var isRequired = this._isRequired
        , errorMessage =
            [ 'ID'
            , isRequired ? 'attribute' : 'literal'
            , 'should be written as'
            , isRequired ? 'literal' : 'attribute'
            ].join(' ')

      if (isRequired) {
        file.iterateTokensByFilter(function (token) {
          return token.type === 'attrs' && token.attrs && token.attrs.indexOf('id')
        }, function (token) {
          errors.add(errorMessage, token.line)
        })
      } else {
        file.addErrorForAllTokensByType('id', errors, errorMessage)
      }

    }
  }
