// # maximumLineLength: `int`
//
// ## e.g.: `80`
//
// Lines in Pug file must not exceed the specified length.

var assert = require('assert');

module.exports = function () {};

module.exports.prototype = {
  name: 'maximumLineLength',

  schema: {
    type: ['null', 'integer']
  },

  configure: function (options) {
    assert(typeof options === 'number', this.name + ' option requires number value or should be removed');

    this._maximumLineLength = options;
  },

  lint: function (file, errors) {
    var max = this._maximumLineLength;

    file.getLines().forEach(function (line, index) {
      if (line.length > max) {
        errors.add('Line length exceeds the maximum of ' + max + ' chars', index + 1);
      }
    });
  }
};
