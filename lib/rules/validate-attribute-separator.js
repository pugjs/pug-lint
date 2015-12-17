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

      assert(typeof options === 'string' || typeof options === 'object'
        , this.name + ' option requires string or array value or should be removed')

      if (typeof options === 'string') {
        options =
          { separator: options
          , multiLineSeparator: options
          }
      }

      assert(typeof options.separator === 'string' && /^([ ]|[ ]?,[ ]?)$/.test(options.separator)
          , this.name + ' option.separator requires string value containing only commas or spaces')

      assert(typeof options.multiLineSeparator === 'string' && /^([ ]+|[ ]?,[ ]?)$/.test(options.multiLineSeparator)
          , this.name + ' option.multiLineSeparator requires string value containing only commas or spaces')

      this._separator = options.separator
      this._multiLineSeparator = options.multiLineSeparator

    }

  , lint: function (file, errors) {

      var separator = this._separator
        , multiLineSeparator = this._multiLineSeparator

      file.iterateTokensByType('start-attributes', function (token) {
        var start = token
          , startIndex = start._index
          , end = file.getNextTokenByType(start, 'end-attributes')
          , endIndex = end._index
          , patterns = []
          , regexFind = new RegExp(/[^()#]+/g)
          , match
          , parsedSource
          , parsedSeparator
          , current
          , currentLine
          , currentSeparator

        if (endIndex > startIndex + 2) {
          file.iterateTokensByFilter(function (token) {
            return token.type === 'attribute' && token._index > startIndex && token._index < endIndex
          }, function (token) {
            var value = typeof token.val === 'boolean' ? '' : token.val

            patterns.push(token.name + (value.length > 0 ? '\\s*\\!*=\\s*' : '') +
              value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&'))

            if (current === undefined) {
              current = token
            }
          })

          currentLine = current.line
          parsedSource = getParsedSource(current, start, end, patterns)

          while ((match = regexFind.exec(parsedSource)) !== null) {
            parsedSeparator = match[0]
            current = file.getNextTokenByType(current, [ 'attribute', 'end-attributes' ])
            currentSeparator = separator

            if (current.line > currentLine) {
              currentSeparator = multiLineSeparator
              currentLine = current.line
            }

            if (parsedSeparator.replace('$', '') !== currentSeparator) {
              errors.add('Invalid attribute separator found', currentLine
                , Math.max(current.col - parsedSeparator.length, 1))
            }
          }
        }
      })

      function getParsedSource (current, start, end, patterns) {

        var source = file.getSourceBetweenTokens(current, end).trim()
          , currentIndent = file.getPreviousTokenByType(start, 'indent')
          , currentIndentLength = currentIndent ? currentIndent.val : 0
          , regexReplace = new RegExp(patterns.join('|'), 'g')
          , regexNewLines = new RegExp('(\\r\\n|\\r|\\n)[ \\t]{' + currentIndentLength + '}', 'g')

        source = source.replace(regexReplace, function (val) {
          return Array(val.length + 1).join('#')
        })

        if (start.line !== end.line) {
          // Remove new line characters and use multi-line separator
          source = source.replace(regexNewLines, '$')
        }

        return source

      }

    }
  }
