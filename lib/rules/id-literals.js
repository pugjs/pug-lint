var assert = require('assert')

module.exports = function () {}

module.exports.prototype =
  { name: 'idLiterals'

  , configure: function (options) {

      assert(options === 'require' || options === 'disallow'
        , this.name + ' option requires "require" or "disallow"')

      this._isRequired = options === 'require'
      this._errorMessage =
        [ 'ID'
        , this._isRequired ? 'attribute' : 'literal'
        , 'should be written as'
        , this._isRequired ? 'literal' : 'attribute'
        ].join(' ')

    }

  , lint: function (file) {

      var attributeTokens = file.tokens.filter(function (token) {
          return token.type === 'attrs' && token.attrs && token.attrs.indexOf('id')
        })
        , literalTokens = file.tokens.filter(function (token) {
          return token.type === 'id' && token.val !== ''
        })

      if (this._isRequired) {
        attributeTokens.forEach(function (token) {
          file.errors.push({ message: this._errorMessage, filename: file.filename, line: token.line })
        }, this)
      } else {
        literalTokens.forEach(function (token) {
          file.errors.push({ message: this._errorMessage, filename: file.filename, line: token.line })
        }, this)
      }

    }
  }
