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

const assert = require('assert');

module.exports = function () {};

module.exports.prototype = {
  name: 'disallowTemplateString',

  schema: {
    enum: [null, true, 'all']
  },

  configure(options) {
    assert(options === true || options === 'all',
      this.name + ' option requires either a true value or "all". Otherwise it should be removed');
    this._all = options === 'all';
  },

  lint(file, errors) {
    file.iterateTokensByFilter(token => (token.type === 'code' && token.buffer), token => {
      file.addErrorForTemplateString(token, errors, 'Template string must not be used', this._all);
    });
  }
};
