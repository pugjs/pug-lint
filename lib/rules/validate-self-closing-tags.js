// # validateSelfClosingTags: `true`
//
// Checks that Pug does not contain any
// [unnecessary self closing tags](http://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements).
// Files with `doctype xml` are ignored.
//
// ```pug
// //- Invalid
// area/
// link/
//
// //- Valid
// area
// link
// foo/
//
// doctype xml
// area/
// ```

var selfClosing = require('void-elements');
var utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
  name: 'validateSelfClosingTags',

  schema: {
    enum: [null, true]
  },

  configure: function (options) {
    utils.validateTrueOptions(this.name, options);
  },

  lint: function (file, errors) {
    var isXml;

    file.iterateTokensByType('doctype', function (token) {
      isXml = token.val === 'xml';
    });

    if (!isXml) {
      file.iterateTokensByType('tag', function (token) {
        var nextToken = file.getToken(token._index + 1);

        if (nextToken.type === 'slash' && selfClosing[token.val]) {
          errors.add('Unnecessary self closing tag', nextToken.line, nextToken.col);
        }
      });
    }
  }
};
