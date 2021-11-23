// # disallowMultipleLineBreaks: `true`
//
// Pug must not contain multiple blank lines in a row.
//
// ```pug
// //- Invalid
// div
//
//
// div
//
// //- Valid
// div
//
// div
// ```

const utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
  name: 'disallowMultipleLineBreaks',

  schema: {
    enum: [null, true]
  },

  configure(options) {
    utils.validateTrueOptions(this.name, options);
  },

  lint(file, errors) {
    let blankLines = 0;

    for (const [index, line] of file.getLines().entries()) {
      if (line.trim().length === 0) {
        blankLines++;

        if (blankLines > 1) {
          errors.add('Must not have multiple blank lines in a row', index + 1);
        }
      } else {
        blankLines = 0;
      }
    }
  }
};
