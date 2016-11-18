// # disallowTemplateString: `true` | `'all'`
//
// Pug must not contain template strings. `true` only fails when a template
// string is used directly; `'all'` fails when template strings are used at
// all.
//
// ## e.g. `true`
//
// ```pug
// //- Invalid
// h1= `${title} text`
//
// //- Valid
// h1= translate(`${title} text`)
// ```
//
// ## e.g. `'all'`
//
// ```pug
// //- Invalid
// h1= translate(`${title} text`)
// ```

var assert = require('assert');

module.exports = function () {};

module.exports.prototype = {
  name: 'disallowTemplateString',

  schema: {
    enum: [null, true, 'all']
  },

  configure: function (options) {
    assert(options === true || options === 'all',
        this.name + ' option requires either a true value or "all". Otherwise it should be removed');
    this._all = options === 'all';
  },

  lint: function (file, errors) {
    file.iterateTokensByFilter(function (token) {
      return (token.type === 'code' && token.buffer);
    }, function (token) {
      file.addErrorForTemplateString(token, errors, 'Template string must not be used', this._all);
    }.bind(this));
  }
};
