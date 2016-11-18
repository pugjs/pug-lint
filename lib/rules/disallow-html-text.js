// # disallowHtmlText: `true`
//
// Pug must not contain any HTML text.
//
// ```pug
// //- Invalid
// <strong>html text</strong>
// p this is <strong>html</strong> text
// ```

var utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
  name: 'disallowHtmlText',

  schema: {
    enum: [null, true]
  },

  configure: function (options) {
    utils.validateTrueOptions(this.name, options);
  },

  lint: function (file, errors) {
    file.addErrorForAllTokensByFilter(function (token) {
      return token.type === 'text-html' || (token.type === 'text' && /<[^\n]*/.test(token.val));
    }, errors, 'HTML text must not be used');
  }
};
