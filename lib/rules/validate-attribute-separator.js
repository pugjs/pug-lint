// # validateAttributeSeparator: `string` | `object`
//
// ## e.g.: `", "`
//
// * All attributes must be immediately followed by a comma and then a space.
// * All attributes must be on the same line.
//
// ```pug
// //- Invalid
// input(type='text' name='name' value='value')
// div
//   input(type='text'
//   , name='name'
//   , value='value'
//   )
//
// //- Valid
// input(type='text', name='name', value='value')
// ```
//
// ## e.g.: `{ "separator": " ", "multiLineSeparator": "\n  " }`
//
// * All attributes that are on the same line must be immediately followed by a space.
// * All attributes that are on different lines must be preceded by two spaces.
//
// ```pug
// //- Invalid
// input(type='text', name='name', value='value')
// div
//   input(type='text'
//   , name='name'
//   , value='value'
//   )
//
// //- Valid
// input(type='text' name='name' value='value')
// div
//   input(type='text'
//     name='name'
//     value='value'
// )
// ```

var assert = require('assert');

module.exports = function () {};

module.exports.prototype = {
  name: 'validateAttributeSeparator',

  schema: {
    type: ['null', 'string', 'object'],
    properties: {
      separator: {type: 'string'},
      multiLineSeparator: {type: 'string'}
    }
  },

  configure: function (options) {
    assert(typeof options === 'string' || typeof options === 'object', this.name + ' option requires string or object value or should be removed');

    if (typeof options === 'string') {
      options = {
        separator: options,
        multiLineSeparator: options
      };
    }

    assert(typeof options.separator === 'string' && /^([ ,]+)$/.test(options.separator), this.name + ' option.separator requires string value containing only commas or spaces');

    assert(typeof options.multiLineSeparator === 'string' && /^([ ,\t\r\n]+)$/.test(options.multiLineSeparator), this.name + ' option.multiLineSeparator requires string value containing only commas, spaces or tabs');

    this._separator = options.separator;
    this._multiLineSeparator = options.multiLineSeparator;
  },

  lint: function (file, errors) {
    var separator = this._separator;
    var multiLineSeparator = this._multiLineSeparator;

    file.iterateTokensByType('start-attributes', function (token) {
      var start = token;
      var startIndex = start._index;
      var end = file.getNextTokenByType(start, 'end-attributes');
      var endIndex = end._index;
      var patterns = [];
      var regexFind = new RegExp(/[^()#]+/g);
      var match;
      var parsedSource;
      var parsedSeparator;
      var current;
      var currentLine;
      var currentSeparator;

      if (endIndex > startIndex + 2) {
        file.iterateTokensByFilter(function (token) {
          return token.type === 'attribute' && token._index > startIndex && token._index < endIndex;
        }, function (token) {
          var value = typeof token.val === 'boolean' ? '' : token.val.trim();

          patterns.push(getEscapedPattern(token.name) + (value.length > 0 ? '\\s*\\!*=\\s*' : '') +
              getEscapedPattern(value));

          if (current === undefined) {
            current = token;
          }
        });

        currentLine = current.line;
        parsedSource = getParsedSource(current, start, end, patterns);

        while ((match = regexFind.exec(parsedSource)) !== null) {
          parsedSeparator = match[0];
          current = file.getNextTokenByType(current, ['attribute', 'end-attributes']);
          currentSeparator = separator;

          if (current.line > currentLine) {
            currentSeparator = multiLineSeparator;
            currentLine = current.line;
          }

          if (parsedSeparator !== currentSeparator) {
            errors.add('Invalid attribute separator found', currentLine
                , Math.max(current.col - parsedSeparator.length, 1));
          }
        }
      }
    });

    function getParsedSource(current, start, end, patterns) {
      var source = file.getSourceBetweenTokens(current, end).trim();
      var regexReplace = new RegExp(patterns.join('|'), 'g');
      var regexNewLines = new RegExp('(\\r\\n|\\r|\\n)[ \\t]{' + current._indent + '}', 'g');

      source = source.replace(regexReplace, function (val) {
        return Array(val.length + 1).join('#');
      });

      if (start.line !== end.line) {
          // Remove new line characters and use multi-line separator
        source = source.replace(regexNewLines, '\n');
      }

      return source;
    }

    function getEscapedPattern(literal) {
      return literal.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    }
  }
};
