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

var utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
  name: 'disallowLegacyMixinCall',

  schema: {
    enum: [null, true]
  },

  configure: function (options) {
    utils.validateTrueOptions(this.name, options);
  },

  lint: function (file, errors) {
    file.addErrorForAllTokensByFilter(function (token) {
      return token.type === 'mixin' && file.getNextToken(token).type !== 'indent';
    }, errors, 'Old mixin call syntax is not allowed');
  }
};
