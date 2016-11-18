// # disallowClassLiterals: `true`
//
// Pug must not contain any class literals.
//
// ```pug
// //- Invalid
// .class
//
// //- Valid
// div(class='class')
// ```

var utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
  name: 'disallowClassLiterals',

  schema: {
    enum: [null, true]
  },

  configure: function (options) {
    utils.validateTrueOptions(this.name, options);
  },

  lint: function (file, errors) {
    file.addErrorForAllTokensByType('class', errors, 'Class literals must not be used');
  }
};
