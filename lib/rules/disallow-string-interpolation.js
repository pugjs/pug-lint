// # disallowStringInterpolation: `true`
//
// Pug must not contain any string interpolation operators.
//
// ```pug
// //- Invalid
// h1 #{title} text
// ```

const utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
  name: 'disallowStringInterpolation',

  schema: {
    enum: [null, true]
  },

  configure(options) {
    utils.validateTrueOptions(this.name, options);
  },

  lint(file, errors) {
    file.addErrorForAllTokensByType('interpolated-code', errors, 'String interpolation operators must not be used');
  }
};
