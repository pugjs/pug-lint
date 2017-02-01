// # requireSpecificAttributes: `Array`
//
// ## e.g.: `[ { img: [ "alt" ] } ]`
//
// `img` tags must contain all of the attributes specified.
//
// ```pug
// //- Invalid
// img(src='src')
//
// //- Valid
// img(src='src' alt='alt')
// ```

var assert = require('assert');
var CssParser = require('css-selector-parser').CssSelectorParser;
var utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
  name: 'requireSpecificAttributes',

  schema: {
    type: ['null', 'array'],
    items: {
      type: 'object',
      additionalProperties: {
        type: 'array',
        items: {
          type: 'string'
        }
      }
    }
  },

  configure: function (options) {
    assert(Array.isArray(options), this.name + ' option requires array value or should be removed');

    this._requiredAttributes = options;
  },

  lint: function (file, errors) {
    this._requiredAttributes.forEach(function (attribute) {
      for (var selector in attribute) {
        /* istanbul ignore else */
        if (attribute.hasOwnProperty(selector)) {
          validateAttribute(attribute, selector);
        }
      }
    });

    function compareAttributes(attrs) {
      return attrs === undefined;
    }

    function validateAttribute(attribute, selector) {
      var cssParser = new CssParser();
      var cssRule = cssParser.parse(selector).rule;
      var tag = cssRule.tagName;
      var attrs = cssRule.attrs;

      file.iterateTokensByFilter(function (token) {
        return token.type === 'tag' && token.val.toLowerCase() === tag.toLowerCase() && compareAttributes(attrs);
      }, function (token) {
        var lineNumber = token.line;
        var columnNumber = token.col;
        var requiredAttributes = utils.ownProperty(attribute, selector);
        var start = file.getNextTokenByType(token, ['newline', 'start-attributes']);
        var startIndex = (start || token)._index;
        var end = file.getNextTokenByType(token, ['newline', 'end-attributes']);
        var endIndex = (end || token)._index;
        var attributeNames = [];
        var hasAttributes;

        if (typeof requiredAttributes === 'string') {
          requiredAttributes = [requiredAttributes];
        }

        file.iterateTokensByFilter(function (token) {
          if (token.type === 'attribute' && token._index > startIndex && token._index < endIndex) {
            hasAttributes = true;
            return true;
          }
        }, function (token) {
          attributeNames.push(token.name.toLowerCase());
        });

        if (hasAttributes) {
          requiredAttributes.forEach(function (attribute) {
            if (attributeNames.indexOf(attribute.toLowerCase()) === -1) {
              errors.add('Tag "' + tag + '" must have attribute "' + attribute + '"', lineNumber, columnNumber);
            }
          });
        } else {
          errors.add('Tag "' + tag + '" must have attributes "' + requiredAttributes.join('", "') + '"'
              , lineNumber, columnNumber);
        }
      });
    }
  }
};
