// # disallowSpecificTags: `string` | `Array`
//
// Pug must not contain any of the tags specified.
//
// ## e.g.: `[ "b", "i" ]`
//
// ```pug
// //- Invalid
// b Bold text
// i Italic text
// ```

var assert = require('assert');

module.exports = function () {};

module.exports.prototype = {
  name: 'disallowSpecificTags',

  schema: {
    type: ['null', 'string', 'array'],
    items: {
      type: 'string'
    }
  },

  configure: function (options) {
    assert(typeof options === 'string' || Array.isArray(options), this.name + ' option requires string or array value or should be removed');

    if (typeof options === 'string') {
      options = [options];
    }

    this._disallowedTags = options.map(function (value) {
      return value.toLowerCase();
    });
  },

  lint: function (file, errors) {
    var disallowedTags = this._disallowedTags;

    file.iterateTokensByFilter(function (token) {
      return token.type === 'tag' && disallowedTags.indexOf(token.val.toLowerCase()) !== -1;
    }, function (token) {
      errors.add('Tag "' + token.val + '" must not be used', token.line, token.col);
    });
  }
};
