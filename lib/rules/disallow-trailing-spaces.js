// # disallowTrailingSpaces: `true`
//
// Lines in Pug file must not contain useless spaces at the end.

var utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
  name: 'disallowTrailingSpaces',

  schema: {
    enum: [null, true]
  },

  configure: function (options) {
    utils.validateTrueOptions(this.name, options);
  },

  lint: function (file, errors) {
    file.getLines().forEach(function (line, index) {
      var i = line.length - 1;
      while (i >= 0 && /\s/.test(line[i])) {
        i--;
      }

      if (i < line.length - 1) {
        errors.add('Trailing spaces are not allowed', index + 1, i + 2);
      }
    });
  }
};
