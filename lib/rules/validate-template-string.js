// # validateTemplateString: `true` | Array
//
// Validate the use of template string in Pug templates.
//
// The option can either be an array or `true`. If it is an array, it can
// contain the following strings. If it is `true` signifies all of the
// following subrules are enabled.
//
// ## `'variable'`
//
// ```pug
// //- Invalid
// h1= `${title}`
//
// //- Valid
// h1= title
// ```
//
// ## `'string'`
//
// ```pug
// //- Invalid
// h1= `title`
//
// //- Valid
// h1= 'title'
// ```
//
// ## `'concatenation'`
//
// ```pug
// //- Invalid
// h1= `title` + `text`
// h1= `title` + variable
//
// //- Valid
// h1= `titletext`
// h1= `title${variable}`
// ```

var assert = require('assert');

var acornWalk = require('acorn/dist/walk');

var utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
  name: 'validateTemplateString',

  schema: {
    anyOf: [
      {
        enum: [null, true]
      },
      {
        type: 'array',
        items: {
          enum: ['variable', 'string', 'concatenation']
        }
      }
    ]
  },

  configure: function (options) {
    assert(options === true || Array.isArray(options), this.name + ' option requires a true or array value or should be removed');

    if (options === true) {
      this._subrules = {
        variable: true,
        string: true,
        concatenation: true
      };
    } else {
      this._subrules = options.reduce(function (prev, cur) {
        prev[cur] = true;
        return prev;
      }, {});
    }
  },

  lint: function (file, errors) {
    var _this = this;

    file.iterateTokensByFilter(function (token) {
      return token.type === 'code' && token.buffer ||
        token.type === 'interpolated-code' ||
        token.type === 'attribute' && typeof token.val === 'string';
    }, function (token) {
      if (_this._subrules.string || _this._subrules.variable) {
        file.addErrorWithAcorn(token, function (ast) {
          var out = [];

          acornWalk.ancestor(ast, {
            TemplateLiteral: function (node, ancestors) {
              if (ancestors.length > 1 && ancestors[ancestors.length - 2].type === 'TaggedTemplateExpression') {
                return;
              }

              var canBeString = _this._subrules.string &&
                !node.expressions.length;
              var canBeVariable = _this._subrules.variable &&
                node.quasis.length === 2 &&
                node.quasis[0].value.raw === '' &&
                node.quasis[1].value.raw === '';

              if (canBeString || canBeVariable) {
                out.push(node);
              }
            }
          });

          return out;
        }, errors, 'Template string is unnecessary');
      }

      if (_this._subrules.concatenation) {
        file.addErrorWithAcorn(token, function (ast, tokens) {
          var out = [];

          acornWalk.simple(ast, {
            BinaryExpression: function (node) {
              if (node.operator === '+' && (isTmpl(node.left) || isTmpl(node.right))) {
                out.push(utils.getNextAcornToken(tokens, node.left.end));
              }

              function isTmpl(node) {
                return node.type === 'TemplateLiteral';
              }
            }
          });

          return out;
        }, errors, 'Unneeded template string concatenation');
      }
    });
  }
};
