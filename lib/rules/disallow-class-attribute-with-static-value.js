// # disallowClassAttributeWithStaticValue: `true`
//
// Prefer class literals over `class` attributes with static values.
//
// ```pug
// //- Invalid
// span(class='foo')
//
// //- Valid
// span.foo
// ```

const utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
  name: 'disallowClassAttributeWithStaticValue',

  schema: {
    enum: [null, true]
  },

  configure(options) {
    utils.validateTrueOptions(this.name, options);
  },

  lint(file, errors) {
    file.addErrorForAllStaticAttributeValues('class', errors, 'Static attribute "class" must be written as class literal');
  }
};
