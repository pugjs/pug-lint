// # requireClassLiteralsBeforeAttributes: `true`
//
// All class literals must be written before any attribute blocks.
//
// ```pug
// //- Invalid
// input(type='text').class
//
// //- Valid
// input.class(type='text')
// ```

const utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
  name: 'requireClassLiteralsBeforeAttributes',

  schema: {
    enum: [null, true]
  },

  contradictions: ['disallowClassLiteralsBeforeAttributes'],

  configure(options) {
    utils.validateTrueOptions(this.name, options);
  },

  lint(file, errors) {
    file.addErrorForIncorrectTokenTypeOrder('class', 'start-attributes', utils.htmlTagBoundaryTypes, errors, 'All class literals must be written before any attribute blocks');
  }
};
