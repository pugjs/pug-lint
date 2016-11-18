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

var utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
  name: 'disallowMultipleLineBreaks',

  schema: {
    enum: [null, true]
  },

  configure: function (options) {
    utils.validateTrueOptions(this.name, options);
  },

  lint: function (file, errors) {
    var blankLines = 0;

    file.getLines().forEach(function (line, index) {
      if (line.trim().length === 0) {
        blankLines++;

        if (blankLines > 1) {
          errors.add('Must not have multiple blank lines in a row', index + 1);
        }
      } else {
        blankLines = 0;
      }
    });
  }
};
