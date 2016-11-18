// # disallowAttributeConcatenation: `true`
//
// Pug must not contain any attribute concatenation.
//
// ```pug
// //- Invalid
// a(href='text ' + title) Link
// //- Invalid under `'aggressive'`
// a(href=text + title) Link
// a(href=num1 + num2) Link
// ```

var assert = require('assert');

module.exports = function () {};

module.exports.prototype = {
  name: 'disallowAttributeConcatenation',

  schema: {
    enum: [null, true]
  },

  configure: function (options) {
    assert(options === true || options === 'aggressive',
        this.name + ' option requires either a true value or "aggressive". Otherwise it should be removed');
    this._aggressive = options === 'aggressive';
  },

  lint: function (file, errors) {
    var _this = this;

    file.iterateTokensByType('attribute', function (token) {
      file.addErrorForConcatenation(token, errors, 'Attribute concatenation must not be used', _this._aggressive);
    });
  }
};
