var assert = require('assert')

module.exports = function () {}

module.exports.prototype =
  { name: 'commaSeparatedAttributes'

  , configure: function (options) {

      assert(options === 'require' || options === 'disallow'
        , this.name + ' option requires "require" or "disallow"')

      var isRequired = options === 'require'

      this._separator = isRequired ? ', ' : ' '
      this._errorMessage = isRequired ? 'Missing comma after attribute' : 'Comma after attribute'

    }

  , lint: function (file) {

      var attributeTokens = file.tokens.filter(function (token) {
        return token.type === 'attrs' && token.attrs
      })

      attributeTokens.forEach(function (token) {
        var attributeCount = token.attrs.length
          , lineNumber = token.line
          , line = file.lines[lineNumber - 1]
          , regex = new RegExp(/\((.+)\)/g)
          , match

        while ((match = regex.exec(line)) !== null) {
          var attributes = match[1].split(this._separator).filter(filterAttributes)

          if (attributes.length !== attributeCount) {
            file.errors.push({ message: this._errorMessage, filename: file.filename, line: lineNumber })
          }
        }
      }, this)

      function filterAttributes(attribute) {
        return attribute.lastIndexOf(',') !== attribute.length - 1
      }

    }
  }
