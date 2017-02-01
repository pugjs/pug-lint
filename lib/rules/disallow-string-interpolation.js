// # disallowStringInterpolation: `true`
//
// Pug must not contain any string interpolation operators.
//
// ```pug
// //- Invalid
// h1 #{title} text
// ```

var utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
  name: 'disallowStringInterpolation',

  schema: {
    enum: [null, true]
  },

  configure: function (options) {
    utils.validateTrueOptions(this.name, options);
  },

  lint: function (file, errors) {
    file.addErrorForAllTokensByType('interpolated-code', errors, 'String interpolation operators must not be used');
  }
};
