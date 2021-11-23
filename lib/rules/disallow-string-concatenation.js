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

const assert = require('assert');

module.exports = function () {};

module.exports.prototype = {
  name: 'disallowStringConcatenation',

  schema: {
    enum: [null, true, 'aggressive']
  },

  configure(options) {
    assert(options === true || options === 'aggressive',
      this.name + ' option requires either a true value or "aggressive". Otherwise it should be removed');
    this._aggressive = options === 'aggressive';
  },

  lint(file, errors) {
    const _this = this;

    file.iterateTokensByFilter(token => (token.type === 'code' && token.buffer), token => {
      file.addErrorForConcatenation(token, errors, 'String concatenation must not be used', _this._aggressive);
    });
  }
};
