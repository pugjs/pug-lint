// # disallowSpacesInsideAttributeBrackets: `true`
//
// Disallows space after opening attribute bracket and before closing.
//
// ```pug
// //- Invalid
// input( type='text' name='name' value='value' )
//
// //- Valid
// input(type='text' name='name' value='value')
// ```

const utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
  name: 'disallowSpacesInsideAttributeBrackets',

  schema: {
    enum: [null, true]
  },

  contradictions: ['requireSpacesInsideAttributeBrackets'],

  configure(options) {
    utils.validateTrueOptions(this.name, options);
  },

  lint(file, errors) {
    file.addErrorForIncorrectSpacesAroundType({
      type: 'start-attributes',
      required: false,
      position: 'after',
      description: 'opening bracket'
    }, errors);

    file.addErrorForIncorrectSpacesAroundType({
      type: 'end-attributes',
      required: false,
      position: 'before',
      description: 'closing bracket'
    }, errors);
  }
};
