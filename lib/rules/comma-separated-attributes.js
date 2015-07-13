var assert = require('assert')

module.exports = function () {}

module.exports.prototype =
  { name: 'commaSeparatedAttributes'

  , configure: function (isRequired) {

      assert(typeof isRequired === 'boolean'
        , this.name + ' option requires boolean value')

      this._isRequired = isRequired

    }

  , lint: function (file) {

      var attributeTokens = file.tokens.filter(function (token) {
        return token.type === 'attrs' && token.attrs
      })

      attributeTokens.forEach(function (token) {
        var attributeCount = token.attrs.length
          , separator = this._isRequired ? ', ' : ' '
          , message = this._isRequired ? 'Missing comma after attribute' : 'Comma after attribute'
          , lineNumber = token.line
          , line = file.lines[lineNumber - 1]
          , regex = new RegExp(/\((.+)\)/g)
          , match

        while ((match = regex.exec(line)) !== null) {
          var attributes = match[1].split(separator).filter(filterAttributes)

          if (attributes.length !== attributeCount) {
            file.errors.push({ message: message, filename: file.filename, line: lineNumber })
          }
        }
      }, this)

      function filterAttributes(attribute) {
        return attribute.lastIndexOf(',') !== attribute.length - 1
      }

    }
  }
