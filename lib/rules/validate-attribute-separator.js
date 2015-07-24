var assert = require('assert')

module.exports = function () {}

module.exports.prototype =
  { name: 'validateAttributeSeparator'

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
            , filteredAttributes = attributes.filter(filterSeparators)

          if (attributes.length !== attributeCount || filteredAttributes.length !== attributeCount) {
            errors.add('Invalid attribute separator found', lineNumber)
          }
        }
      })

      function filterSeparators(attribute) {

        var separators = [ ' ', ',' ]
          , firstSeparatorIndex = separators.indexOf(attribute.charAt(0))
          , lastSeparatorIndex = separators.indexOf(attribute.charAt(attribute.length - 1))

        return firstSeparatorIndex === -1 && lastSeparatorIndex === -1

      }

    }
  }
