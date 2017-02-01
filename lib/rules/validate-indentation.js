// # validateIndentation: `int` | `"\t"`
//
// ## e.g.: `2`
//
// Indentation must be consistently two spaces.
//
// ```pug
// //- Invalid
// div
// <TAB>div
//
// //- Valid
// div
// <SPACE><SPACE>div
// ```
//
// ## e.g.: `"\t"`
//
// Indentation must be consistently tabs.
//
// ```pug
// //- Invalid
// div
// <SPACE><SPACE>div
//
// //- Valid
// div
// <TAB>div
// ```

var assert = require('assert');

module.exports = function () {};

module.exports.prototype = {
  name: 'validateIndentation',

  schema: {
    anyOf: [
      {
        enum: [null, '\t']
      },
      {
        type: 'integer'
      }
    ]
  },

  configure: function (options) {
    assert((typeof options === 'number' && options > 0) || options === '\t'
        , this.name + ' option requires a positive number of spaces or "\\t"');

    if (typeof options === 'number') {
      this._indentSize = options;
    } else {
      this._indentSize = 1;
    }
  },

  lint: function (file, errors) {
    var indentSize = this._indentSize;
    var currentIndent = 0;

    file.iterateTokensByType(['indent', 'outdent'], function (token) {
      if (token.val) {
        currentIndent += indentSize;
      } else {
        currentIndent -= indentSize;
      }

      if (token.val && token.val !== currentIndent) {
        errors.add('Invalid indentation', token.line, token.col);
      }
    });
  }
};
