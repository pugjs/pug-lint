// # requireStrictEqualityOperators: `true`
//
// Requires the use of `===` and `!==` instead of `==` and `!=`.
//
// ```pug
// //- Invalid
// if true == false
// if true != false
//
// //- Valid
// if true === false
// if true !== false
// ```

var utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
  name: 'requireStrictEqualityOperators',

  schema: {
    enum: [null, true]
  },

  configure: function (options) {
    utils.validateTrueOptions(this.name, options);
  },

  lint: function (file, errors) {
    file.iterateTokensByType(['if', 'else-if'], function (token) {
      var regex = /([!=]=)(.)/;
      var match = token.val.match(regex);
      var line = file.getLine(token.line);
      var valueIndex = line.indexOf(token.val);
      var columnNumber;
      var operator;

      if (match !== null) {
        operator = match[1];

        if (match[2] !== '=') {
          columnNumber = valueIndex + 1 + match.index;

          errors.add('Expected \'' + operator + '=\' and instead saw \'' + operator + '\'', token.line, columnNumber);
        }
      }
    });
  }
};
