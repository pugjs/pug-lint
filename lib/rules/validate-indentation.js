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

const assert = require('assert');

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

  configure(options) {
    assert((typeof options === 'number' && options > 0) || options === '\t'
      , this.name + ' option requires a positive number of spaces or "\\t"');

    this._indentSize = typeof options === 'number' ? options : 1;
  },

  lint(file, errors) {
    const indentSize = this._indentSize;
    let currentIndent = 0;

    file.iterateTokensByType(['indent', 'outdent'], token => {
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
