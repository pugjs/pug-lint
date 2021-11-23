// # requireClassLiteralsBeforeIdLiterals: `true`
//
// All class literals must be written before any ID literals.
//
// ```pug
// //- Invalid
// input#id.class(type='text')
//
// //- Valid
// input.class#id(type='text')
// ```

const utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
  name: 'requireClassLiteralsBeforeIdLiterals',

  schema: {
    enum: [null, true]
  },

  contradictions: ['disallowClassLiteralsBeforeIdLiterals'],

  configure(options) {
    utils.validateTrueOptions(this.name, options);
  },

  lint(file, errors) {
    file.addErrorForIncorrectTokenTypeOrder('class', 'id', utils.htmlTagBoundaryTypes, errors, 'All class literals must be written before any ID literals');
  }
};
