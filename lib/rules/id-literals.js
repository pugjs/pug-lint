var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'idLiterals'

  , configure: function (options) {

      this._isRequired = utils.validateRequirementOptions(this.name, options)

    }

  , lint: function (file, errors) {

      var errorMessage =
            [ 'ID'
            , this._isRequired ? 'attribute' : 'literal'
            , 'should be written as'
            , this._isRequired ? 'literal' : 'attribute'
            ].join(' ')

      if (this._isRequired) {
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
