// # validateDivTags: `true`
//
// Checks that Pug does not contain any unnecessary `div` tags.
//
// ```pug
// //- Invalid
// div.class
// div#id
// div.class(class='class')
//
// //- Valid
// .class
// #id
// .class(class='class')
// ```

var utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
  name: 'validateDivTags',

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
      file.iterateTokensByFilter(function (token) {
        return token.type === 'tag' && token.val === 'div';
      }, function (token) {
        var current = token;
        var currentLineTokens = file.getTokensByFilter(function (token) {
          return token.line === current.line;
        });
        var boundaryStart = file.getPreviousTokenByType(current, utils.htmlTagBoundaryTypes) || currentLineTokens[0];
        var boundaryStartIndex = boundaryStart._index;
        var boundaryEnd = file.getNextTokenByType(current, utils.htmlTagBoundaryTypes);
        var boundaryEndIndex = boundaryEnd._index;

        file.iterateTokensByFilter(function (token) {
          return ['class', 'id'].indexOf(token.type) !== -1 &&
            token._index >= boundaryStartIndex &&
            token._index <= boundaryEndIndex;
        }, function () {
          errors.add('Unnecessary `div` tag', current.line, current.col);
        });
      });
    }
  }
};
