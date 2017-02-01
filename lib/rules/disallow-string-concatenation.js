// # disallowStringConcatenation: `true` | `'aggressive'`
//
// Pug must not contain any string concatenation.
//
// ```pug
// //- Invalid
// h1= title + 'text'
// //- Invalid under `'aggressive'`
// h1= title + text
// ```

var assert = require('assert');

module.exports = function () {};

module.exports.prototype = {
  name: 'disallowStringConcatenation',

  schema: {
    enum: [null, true, 'aggressive']
  },

  configure: function (options) {
    assert(options === true || options === 'aggressive',
        this.name + ' option requires either a true value or "aggressive". Otherwise it should be removed');
    this._aggressive = options === 'aggressive';
  },

  lint: function (file, errors) {
    var _this = this;

    file.iterateTokensByFilter(function (token) {
      return (token.type === 'code' && token.buffer);
    }, function (token) {
      file.addErrorForConcatenation(token, errors, 'String concatenation must not be used', _this._aggressive);
    });
  }
};
