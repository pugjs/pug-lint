// # disallowAttributeInterpolation: `true`
//
// Pug must not contain any attribute interpolation operators.
//
// ```pug
// //- Invalid
// a(href='text #{title}') Link
// //- Valid
// a(href='text \#{title}') Link
// a(href='text \\#{title}') Link
// ```
//
// ## Compatibility note
//
// Attribute interpolation has already been removed from Pug v2. This rule
// helps transition from legacy "Jade" v1 code bases to Pug, but does not serve
// any real purpose in real world if Pug v2 is used.

var findLineColumn = require('find-line-column');

var utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
  name: 'disallowAttributeInterpolation',

  schema: {
    enum: [null, true]
  },

  configure: function (options) {
    utils.validateTrueOptions(this.name, options);
  },

  lint: function (file, errors) {
    file.iterateTokensByType('attribute', function (token) {
      var result = /(\\)?#\{.+\}/.exec(token.val);
      if (result && !result[1]) {
        var startLocation = file.findStartLocation(token.val, token, file.getNextToken(token));
        var loc = findLineColumn(token.val, result.index);

        loc.col += loc.line === 1 ? startLocation.col : 1;
        loc.line += startLocation.line - 1;
        errors.add('Attribute interpolation operators must not be used', loc.line, loc.col);
      }
    });
  }
};
