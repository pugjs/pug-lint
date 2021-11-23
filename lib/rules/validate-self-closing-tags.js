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

const selfClosing = require('void-elements');
const utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
  name: 'validateSelfClosingTags',

  schema: {
    enum: [null, true]
  },

  configure(options) {
    utils.validateTrueOptions(this.name, options);
  },

  lint(file, errors) {
    let isXml;

    file.iterateTokensByType('doctype', token => {
      isXml = token.val === 'xml';
    });

    if (!isXml) {
      file.iterateTokensByType('tag', token => {
        const nextToken = file.getToken(token._index + 1);

        if (nextToken.type === 'slash' && selfClosing[token.val]) {
          errors.add('Unnecessary self closing tag', nextToken.line, nextToken.col);
        }
      });
    }
  }
};
