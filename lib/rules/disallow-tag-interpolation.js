// # disallowTagInterpolation: `true`
//
// Pug must not contain any tag interpolation operators.
//
// ```pug
// //- Invalid
// | #[strong html] text
// p #[strong html] text
// ```

var utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
  name: 'disallowTagInterpolation',

  schema: {
    enum: [null, true]
  },

  configure: function (options) {
    utils.validateTrueOptions(this.name, options);
  },

  lint: function (file, errors) {
    file.addErrorForAllTokensByType('start-pug-interpolation', errors, 'Tag interpolation operators must not be used');
  }
};
