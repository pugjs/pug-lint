// # requireLowerCaseAttributes: `true`
//
// All attributes must be written in lower case. Files with `doctype xml` are ignored.
//
// ```pug
// //- Invalid
// div(Class='class')
//
// //- Valid
// div(class='class')
// ```

var utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
  name: 'requireLowerCaseAttributes',

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
      file.iterateTokensByType('attribute', function (token) {
        if (token.name !== token.name.toLowerCase()) {
          errors.add('All attributes must be written in lower case', token.line, token.col);
        }
      });
    }
  }
};
