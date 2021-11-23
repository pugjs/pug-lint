// # disallowTagInterpolation: `true`
//
// Pug must not contain any tag interpolation operators.
//
// ```pug
// //- Invalid
// | #[strong html] text
// p #[strong html] text
// ```

const utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
  name: 'disallowTagInterpolation',

  schema: {
    enum: [null, true]
  },

  configure(options) {
    utils.validateTrueOptions(this.name, options);
  },

  lint(file, errors) {
    file.addErrorForAllTokensByType('start-pug-interpolation', errors, 'Tag interpolation operators must not be used');
  }
};
