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

const utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
  name: 'disallowDuplicateAttributes',

  schema: {
    enum: [null, true]
  },

  configure(options) {
    utils.validateTrueOptions(this.name, options);
  },

  lint(file, errors) {
    file.iterateTokensByType('start-attributes', token => {
      const attributeNames = [];
      const attributesStart = token;
      const attributesStartIndex = attributesStart._index;
      const attributesEnd = file.getNextTokenByType(token, 'end-attributes');
      const attributesEndIndex = attributesEnd._index;
      const attributesLineTokens = file.getTokensByFilter(token => token.line === attributesStart.line);
      const boundaryStart = file.getPreviousTokenByType(token, utils.htmlTagBoundaryTypes) || attributesLineTokens[0];
      const boundaryStartIndex = boundaryStart._index;
      const boundaryEnd = file.getNextTokenByType(token, utils.htmlTagBoundaryTypes);
      const boundaryEndIndex = boundaryEnd._index;

      file.iterateTokensByFilter(token => token.type === 'attribute'
          && token._index > attributesStartIndex
          && token._index < attributesEndIndex, token => {
        const name = token.name.toLowerCase();

        if (name !== 'class') {
          if (!attributeNames.includes(name)) {
            attributeNames.push(name);
          } else {
            errors.add('Duplicate attribute "' + name + '" is not allowed', token.line, token.col);
          }
        }
      });

      file.iterateTokensByFilter(token => token.type === 'id'
          && token._index >= boundaryStartIndex
          && token._index <= boundaryEndIndex, token => {
        if (attributeNames.includes('id')) {
          errors.add('Duplicate attribute "id" is not allowed', token.line, token.col);
        }
      });
    });
  }
};
