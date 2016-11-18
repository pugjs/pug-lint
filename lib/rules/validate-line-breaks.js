// # validateLineBreaks: `"CR"` | `"LF"` | `"CRLF"`
//
// ## e.g.: `"LF"`
//
// All line break characters must match.
//
// ```pug
// //- Invalid
// div(class='class')<CRLF>
// .button
//
// //- Valid
// div(class='class')<LF>
// .button
// ```

var assert = require('assert');

module.exports = function () {};

module.exports.prototype = {
  name: 'validateLineBreaks',

  schema: {
    enum: [null, 'CR', 'LF', 'CRLF']
  },

  configure: function (options) {
    assert(options === 'CR' || options === 'LF' || options === 'CRLF'
        , this.name + ' option requires "CR", "LF", or "CRLF"');

    var lineBreaks = {
      CR: '\r',
      LF: '\n',
      CRLF: '\r\n'
    };

    this._lineBreak = lineBreaks[options];
  },

  lint: function (file, errors) {
    var lines = file.getLines();

    if (lines.length < 2) {
      return;
    }

    file.getLineBreaks().some(function (lineBreak, i) {
      if (lineBreak !== this._lineBreak) {
        errors.add('Invalid line break', i + 1, lines[i].length);
      }
      return lineBreak;
    }, this);
  }
};
