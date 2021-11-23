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

const utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
  name: 'requireStrictEqualityOperators',

  schema: {
    enum: [null, true]
  },

  configure(options) {
    utils.validateTrueOptions(this.name, options);
  },

  lint(file, errors) {
    file.iterateTokensByType(['if', 'else-if'], token => {
      const regex = /([!=]=)(.)/;
      const match = token.val.match(regex);
      const line = file.getLine(token.line);
      const valueIndex = line.indexOf(token.val);
      let columnNumber;
      let operator;

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
