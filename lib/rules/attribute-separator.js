var assert = require('assert')

module.exports = function () {}

module.exports.prototype =
  { name: 'attributeSeparator'

  , configure: function (options) {

      assert(typeof options === 'string' && /^([ ]|[ ]?,[ ]?)$/.test(options)
        , this.name + ' option requires string value containing only commas or spaces')

      this._separator = options

    }

  , lint: function (file, errors) {

      var separator = this._separator

      file.iterateTokensByType('attrs', function (token) {
        var attributeCount = token.attrs.length
          , lineNumber = token.line
          , line = file.getLine(lineNumber)
          , regex = new RegExp(/\((.+)\)/g)
          , match

        while ((match = regex.exec(line)) !== null) {
          var attributes = match[1].split(separator)

          if (attributes.length !== attributeCount) {
            errors.add('Attributes must be separated by "' + separator + '"', lineNumber)
          }
        }
      })

    }
  }
