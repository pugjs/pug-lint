var assert = require('assert')

module.exports = function () {}

module.exports.prototype =
  { name: 'validateIndentation'

  , configure: function (options) {

      assert((typeof options === 'number' && options > 0) || options === '\t'
        , this.name + ' option requires a positive number of spaces or "\\t"')

      if (typeof options === 'number') {
        this._indentChar = ' '
        this._indentSize = options
      } else {
        this._indentChar = '\t'
        this._indentSize = 1
      }

    }

  , lint: function (file, errors) {

      var indentSize = this._indentSize
        , currentIndent = 0

      file.iterateTokensByType([ 'indent', 'outdent' ], function (token) {
        if (token.val) {
          currentIndent += indentSize
        } else {
          currentIndent -= indentSize
        }

        if (token.val && token.val !== currentIndent) {
          errors.add('Invalid indentation', token.line)
        }
      })

    }
  }
