// # disallowClassLiteralsBeforeIdLiterals: `true`
//
// All ID literals must be written before any class literals.
//
// ```pug
// //- Invalid
// input.class#id(type='text')
//
// //- Valid
// input#id.class(type='text')
// ```

var utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
  name: 'disallowClassLiteralsBeforeIdLiterals',

  schema: {
    enum: [null, true]
  },

  contradictions: ['requireClassLiteralsBeforeIdLiterals'],

  configure: function (options) {
    utils.validateTrueOptions(this.name, options);
  },

  lint: function (file, errors) {
    file.addErrorForIncorrectTokenTypeOrder('id', 'class', utils.htmlTagBoundaryTypes, errors, 'All class literals must be written after any ID literals');
  }
};
