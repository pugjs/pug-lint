var assert = require('assert')

module.exports = function () {}

module.exports.prototype =
  { name: 'attributeSeparator'

  , configure: function (options) {

      assert(typeof options === 'string' && /^([ ]|[ ]?,[ ]?)$/.test(options)
        , this.name + ' option requires string value containing only commas or spaces')

      this._separator = options

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
            file.errors.push({ message: 'Attributes must be separated by "' + this._separator + '"'
              , filename: file.filename, line: lineNumber })
          }
        }
      }, this)

      function filterAttributes(attribute) {
        return attribute.lastIndexOf(',') !== attribute.length - 1
      }

    }
  }
