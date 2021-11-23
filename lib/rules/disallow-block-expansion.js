// # disallowBlockExpansion: `true`
//
// Pug must not contain any block expansion operators.
//
// ```pug
// //- Invalid
// p: strong text
// table: tr: td text
// ```

const utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
  name: 'disallowBlockExpansion',

  schema: {
    enum: [null, true]
  },

  configure(options) {
    utils.validateTrueOptions(this.name, options);
  },

  lint(file, errors) {
    file.addErrorForAllTokensByType(':', errors, 'Block expansion operators must not be used');
  }
};
