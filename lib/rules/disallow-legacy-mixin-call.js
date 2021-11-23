// # disallowLegacyMixinCall: `true`
//
// The Pug template must not contain legacy mixin call.
//
// ```pug
// //- Invalid
// mixin myMixin(arg)
//
// //- Valid mixin call
// +myMixin(arg)
//
// //- Valid mixin call with block attached
// +myMixin(arg)
//   p Hey
//
// //- Valid mixin definition
// mixin myMixin(arg)
//   p Hey
// ```

const utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
  name: 'disallowLegacyMixinCall',

  schema: {
    enum: [null, true]
  },

  configure(options) {
    utils.validateTrueOptions(this.name, options);
  },

  lint(file, errors) {
    file.addErrorForAllTokensByFilter(token => token.type === 'mixin' && file.getNextToken(token).type !== 'indent', errors, 'Old mixin call syntax is not allowed');
  }
};
