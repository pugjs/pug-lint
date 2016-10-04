// # disallowJavaScriptCode: `true`
//
// Pug must not contain any JavaScript code.
//
// ```pug
// //- Invalid
// - var someVariable = 1
// div(class=someVariable)
// div= someVariable
// if someVariable
// each item in someVariable
// while someVariable
// ```

var utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
  name: 'disallowJavaScriptCode',

  configure: function (options) {
    utils.validateTrueOptions(this.name, options);
  },

  lint: function (file, errors) {
    file.addErrorForAllTokensByFilter(function (token) {
      return token.type === 'code' ||
             token.type === 'each' ||
             token.type === 'while' ||
             token.type === 'if' ||
             token.type === 'else-if' ||
             token.type === 'else' ||
             token.type === 'case' ||
             token.type === 'when' ||
             token.type === 'default' ||
             (token.type === 'attribute' && token.val !== true && !(/^-?\d*\.?\d*$/.test(token.val) || /^"(?:[^"\\]|\\.)*"$/.test(token.val) || /^'(?:[^'\\]|\\.)*'$/.test(token.val)));
    }, errors, 'JavaScript code must not be used');
  }
};
