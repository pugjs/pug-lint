// # disallowIdAttributeWithStaticValue: `true` | `object`
//
// Prefer ID literals over `id` attributes with static values.
//
// ## e.g.: `true`
// ```pug
// //- Invalid
// span(id='foo')
//
// //- Valid
// span#foo
// ```
//
// ## e.g. `{ denyTokens: ['::'] }`
// ```pug
// //- Invalid
// span(id='sth::sth-else')
//
// //- Valid
// span(id='sth:sth-else')
// ```
//
// ## e.g. `{ allowTokens: ['{'] }`
// ```pug
// //- Invalid
// span(id='sth::sth-else')
//
// //- Valid
// span(id='{{::testVariable}}')
// ```

var utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
  name: 'disallowIdAttributeWithStaticValue',

  schema: {
    anyOf: [
      {
        enum: [null, true]
      },
      {
        type: 'object',
        properties: {
          allowTokens: {type: 'array'},
          denyTokens: {type: 'array'}
        }
      }
    ]
  },

  configure: function (options) {
    this._options = utils.validateStaticValueOptions(this.name, options);
  },

  lint: function (file, errors) {
    file.addErrorForAllStaticAttributeValues('id', this._options, errors, 'Static attribute "id" must be written as ID literal');
  }
};
