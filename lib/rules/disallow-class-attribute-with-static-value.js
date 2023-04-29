// # disallowClassAttributeWithStaticValue: `true` | `object`
//
// Prefer class literals over `class` attributes with static values.
//
// ## e.g.: `true`
// ```pug
// //- Invalid
// span(class='foo')
//
// //- Valid
// span.foo
// ```
//
// ## e.g. `{ denyTokens: ['::'] }`
// ```pug
// //- Invalid
// span(class='sth::sth-else')
//
// //- Valid
// span(class='sth:sth-else')
// ```
//
// ## e.g. `{ allowTokens: ['{'] }`
// ```pug
// //- Invalid
// span(class='sth::sth-else')
//
// //- Valid
// span(class='{{::testVariable}}')
// ```

var utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
  name: 'disallowClassAttributeWithStaticValue',

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
    file.addErrorForAllStaticAttributeValues('class', this._options, errors, 'Static attribute "class" must be written as class literal');
  }
};
