// # requireIdLiteralsBeforeAttributes: `true`
//
// All ID literals must be written before any attribute blocks.
//
// ```pug
// //- Invalid
// input(type='text')#id
//
// //- Valid
// input#id(type='text')
// ```

const utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
  name: 'requireIdLiteralsBeforeAttributes',

  schema: {
    enum: [null, true]
  },

  contradictions: ['disallowIdLiteralsBeforeAttributes'],

  configure(options) {
    utils.validateTrueOptions(this.name, options);
  },

  lint(file, errors) {
    file.addErrorForIncorrectTokenTypeOrder('id', 'start-attributes', utils.htmlTagBoundaryTypes, errors, 'All ID literals must be written before any attribute blocks');
  }
};
