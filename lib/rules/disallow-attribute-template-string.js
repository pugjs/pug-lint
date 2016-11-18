// # disallowAttributeTemplateString: `true` | `'all'`
//
// Pug must not contain template strings in attributes. `true` only fails when
// the attribute is a template string; `'all'` fails when template strings are
// used at all.
//
// ## e.g. `true`
//
// ```pug
// //- Invalid
// a(href=`https://${site}`) Link
//
// //- Valid
// a(href=getLink(`https://${site}`)) Link
// ```
//
// ## e.g. `'all'`
//
// ```pug
// //- Invalid
// a(href=getLink(`https://${site}`)) Link
// ```

var assert = require('assert');

module.exports = function () {};

module.exports.prototype = {
  name: 'disallowAttributeTemplateString',

  schema: {
    enum: [null, true, 'all']
  },

  configure: function (options) {
    assert(options === true || options === 'all',
        this.name + ' option requires either a true value or "all". Otherwise it should be removed');
    this._all = options === 'all';
  },

  lint: function (file, errors) {
    file.iterateTokensByType('attribute', function (token) {
      file.addErrorForTemplateString(token, errors, 'Attribute template string must not be used', this._all);
    }.bind(this));
  }
};
