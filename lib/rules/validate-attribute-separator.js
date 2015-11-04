// # validateAttributeSeparator: `" "` | `","` | `", "` | `" ,"` | `" , "`
//
// ## e.g.: ", "
//
// All attributes must be immediately followed by a comma and then a space.
//
// ```jade
// //- Invalid
// input(type='text' name='name' value='value')
//
// //- Valid
// input(type='text', name='name', value='value')
// ```

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

      file.iterateTokensByType('start-attributes', function (token) {
        var startIndex = token._index
          , end = file.getNextTokenByType(token, 'end-attributes')
          , endIndex = end._index
          , patterns = []
          , regexFind = new RegExp(/\(([^(]*|.*)\)/g)
          , regexReplace
          , match
          , source
          , parsedSource
          , current
          , currentLine
          , currentColumn

        if (endIndex > startIndex + 2) {
          file.iterateTokensByFilter(function (token) {
            return token.type === 'attribute' && token._index > startIndex && token._index < endIndex
          }, function (token) {
            var value = typeof token.val === 'boolean' ? '' : token.val

            patterns.push(token.name + (value.length > 0 ? '\\s*=\\s*' : '') +
              value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&'))

            if (current === undefined) {
              current = token
            }
          })

          currentLine = current.line
          currentColumn = current.col
          regexFind = new RegExp(/[^()#]+/g)
          regexReplace = new RegExp(patterns.join('|'), 'g')
          source = file.getSourceBetweenTokens(current, end).trim()
          parsedSource = source.replace(regexReplace, function (val) {
            return Array(val.length + 1).join('#')
          })

          while ((match = regexFind.exec(parsedSource)) !== null) {
            if (match[0] !== separator) {
              errors.add('Invalid attribute separator found', currentLine, currentColumn + match.index)
            }
          }
        }
      })

    }
  }
