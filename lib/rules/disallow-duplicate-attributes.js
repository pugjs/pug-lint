// # disallowDuplicateAttributes: `true`
//
// Attribute blocks must not contain any duplicates.
// And if an ID literal is present an ID attribute must not be used. Ignores class attributes.
//
// ```pug
// //- Invalid
// div(a='a' a='b')
// #id(id='id')
//
// //- Valid
// div(class='a', class='b')
// .class(class='class')
// ```

var utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
  name: 'disallowDuplicateAttributes',

  schema: {
    enum: [null, true]
  },

  configure: function (options) {
    utils.validateTrueOptions(this.name, options);
  },

  lint: function (file, errors) {
    file.iterateTokensByType('start-attributes', function (token) {
      var attributeNames = [];
      var attributesStart = token;
      var attributesStartIndex = attributesStart._index;
      var attributesEnd = file.getNextTokenByType(token, 'end-attributes');
      var attributesEndIndex = attributesEnd._index;
      var attributesLineTokens = file.getTokensByFilter(function (token) {
        return token.line === attributesStart.line;
      });
      var boundaryStart = file.getPreviousTokenByType(token, utils.htmlTagBoundaryTypes) || attributesLineTokens[0];
      var boundaryStartIndex = boundaryStart._index;
      var boundaryEnd = file.getNextTokenByType(token, utils.htmlTagBoundaryTypes);
      var boundaryEndIndex = boundaryEnd._index;

      file.iterateTokensByFilter(function (token) {
        return token.type === 'attribute' &&
          token._index > attributesStartIndex &&
          token._index < attributesEndIndex;
      }, function (token) {
        var name = token.name.toLowerCase();

        if (name !== 'class') {
          if (attributeNames.indexOf(name) === -1) {
            attributeNames.push(name);
          } else {
            errors.add('Duplicate attribute "' + name + '" is not allowed', token.line, token.col);
          }
        }
      });

      file.iterateTokensByFilter(function (token) {
        return token.type === 'id' &&
          token._index >= boundaryStartIndex &&
          token._index <= boundaryEndIndex;
      }, function (token) {
        if (attributeNames.indexOf('id') !== -1) {
          errors.add('Duplicate attribute "id" is not allowed', token.line, token.col);
        }
      });
    });
  }
};
