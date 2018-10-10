var acorn = require('acorn');
var acornWalk = require('acorn/dist/walk');
var findLineColumn = require('find-line-column');
var attrs = require('pug-attrs');
var lexer = require('pug-lexer');
var utils = require('./utils');

var PugFile = function (filename, source) {
  this._parseErrors = [];
  this._tokens = [];
  this._filename = filename;
  this._source = source;
  this._lines = this._source.split(/\r\n|\r|\n/);
  this._lineBreaks = this._source.match(/\r\n|\r|\n/g);

  try {
    var currentIndent = 0;
    var indentSize = 0;

    this._tokens = lexer(this._source, {filename: this._filename}).map(function (token, index) {
      if (['indent', 'outdent'].indexOf(token.type) !== -1) {
        if (token.val) {
          if (indentSize === 0) {
            indentSize = token.val;
          }

          currentIndent += indentSize;
        } else {
          currentIndent -= indentSize;
        }
      }

      token._index = index;
      token._indent = currentIndent;
      if (token.loc) {
        // Preserve old location data format for backward compatibility with rules.
        var loc = token.loc.start;
        token.line = loc.line;
        token.col = loc.column;
      }
      return token;
    });
  } catch (e) {
    this._parseErrors.push(e);
  }
};

PugFile.prototype = {
  addErrorForAllStaticAttributeValues: function (name, errors, message) {
    this.iterateTokensByFilter(function (token) {
      return token.type === 'attribute' && token.name.toLowerCase() === name.toLowerCase();
    }, function (token) {
      var options = {
        terse: true,
        format: 'html',
        runtime: function (name) {
          return name;
        }
      };
      var compiled = attrs([token], options);

      if (!/^attr\(.*\)$/g.exec(compiled)) {
        errors.add(message, token.line, token.col);
      }
    });
  },

  addErrorForAllTokensByFilter: function (filter, errors, message) {
    this.iterateTokensByFilter(filter, function (token) {
      errors.add(message, token.line, token.col);
    });
  },

  addErrorForAllTokensByType: function (type, errors, message) {
    this.iterateTokensByType(type, function (token) {
      errors.add(message, token.line, token.col);
    });
  },

  addErrorForIncorrectSpacesAroundType: function (options, errors) {
    options.filter = function (token) {
      return token.type === options.type;
    };

    this.addErrorForIncorrectSpacesAroundFilter(options, errors);
  },

  addErrorForIncorrectSpacesAroundFilter: function (options, errors) {
    var _this = this;

    _this.iterateTokensByFilter(options.filter, function (token) {
      var separator = ' ';
      var match;
      var columnIndex;
      var columnNumber;
      var errorMessage = [options.required ? 'One space required' : 'Illegal space'];
      var tokenWidth = options.tokenWidth || 1;

      switch (options.position) {
        case 'before':
          columnIndex = token.col - 1;
          columnNumber = token.col;
          errorMessage.push('before');
          break;
        default:
          columnIndex = columnNumber = token.col + tokenWidth;
          errorMessage.push('after');
          break;
      }

      errorMessage.push(options.description);

      match = _this.getCharacter(token.line, columnIndex);

      _this.addErrorForMatch(match, separator, !options.required, errors
          , errorMessage.join(' '), token.line, columnNumber);
    });
  },

  addErrorForIncorrectTokenTypeOrder: function (typeA, typeB, boundaryTypes, errors, message) {
    typeA = utils.createTypeArray(typeA);

    var _this = this;

    _this.iterateTokensByType(typeB, function (token) {
      var current = token;
      var currentIndex = current._index;
      var start = _this.getPreviousTokenByType(token, boundaryTypes) || current;
      var startIndex = start._index;
      var end = _this.getNextTokenByType(token, boundaryTypes);
      var endIndex = end._index;

      _this.iterateTokensByFilter(function (token) {
        return typeA.indexOf(token.type) !== -1 &&
          token._index > currentIndex &&
          token._index >= startIndex &&
          token._index <= endIndex;
      }, function (token) {
        errors.add(message, token.line, token.col);
      });
    });
  },

  addErrorWithAcorn: function (token, cb, errors, message) {
    var tokens = [];
    var ast = acorn.parseExpressionAt(token.val, 0, {onToken: tokens});
    var nodes = cb(ast, tokens);

    nodes.forEach(function (node) {
      var startLocation = this.findStartLocation(token.val, token, this.getNextToken(token));

      /* istanbul ignore else: else branch is only a fallback */
      if (startLocation) {
        var loc = findLineColumn(token.val, node.start);

        // loc.col is 0-based. Change it to 1-based.
        loc.col++;
        if (loc.line === 1) {
          loc.col += startLocation.col - 1;
        }

        // loc.line is 1-based.
        errors.add(message, startLocation.line + loc.line - 1, loc.col);
      } else {
        errors.add(message, token.line, token.col);
      }
    }.bind(this));
  },

  // `aggressive` reports *any* addition as error.
  addErrorForConcatenation: function (token, errors, message, aggressive) {
    this.addErrorWithAcorn(token, function (ast, tokens) {
      var badPlus = [];

      acornWalk.simple(ast, {
        BinaryExpression: function (node) {
          if (!badPlus.length && node.operator === '+' && (aggressive || isString(node.left) || isString(node.right))) {
            badPlus.push(utils.getNextAcornToken(tokens, node.left.end));
          }
        }
      });

      return badPlus;

      function isString(node) {
        return node.type === 'Literal' && typeof node.value === 'string';
      }
    }, errors, message);
  },

  addErrorForTemplateString: function (token, errors, message, all) {
    this.addErrorWithAcorn(token, function (ast) {
      var templateLiterals = [];

      if (all) {
        acornWalk.simple(ast, {
          TemplateLiteral: function (node) {
            templateLiterals.push(node);
          }
        });
      } else if (ast.type === 'TemplateLiteral') {
        templateLiterals.push(ast);
      }

      return templateLiterals;
    }, errors, message);
  },

  addErrorForMatch: function (a, b, isMatch, errors, message, lineNumber, columnNumber) {
    if ((a === b) === isMatch) {
      errors.add(message, lineNumber, columnNumber);
    }
  },

  addErrorForCodeOperator: function (types, isRequired, errors) {
    var codeOperators = utils.codeOperators;
    var _this = this;

    types.forEach(function (type) {
      var codeOperator = codeOperators[type];

      _this.addErrorForIncorrectSpacesAroundFilter({
        filter: codeOperator.filter,
        required: isRequired,
        position: 'after',
        description: codeOperator.description,
        tokenWidth: type.length
      }, errors);
    });
  },

  findStartLocation: function (value, start, end) {
    var lines = this.getLines(start.line, end && end.line);
    lines[lines.length - 1] = lines[lines.length - 1].substring(0, end.col);
    var source = lines.join('\n');
    var pos = source.indexOf(value, start.col - 1);

    /* istanbul ignore if: this will only happen under odd circumstances like a
     * lexer bug */
    if (pos === -1) {
      return null;
    }

    var loc = findLineColumn(source, pos);
    return {
      line: start.line + loc.line - 1,
      col: loc.col + 1
    };
  },

  getCharacter: function (line, column) {
    return this.getLine(line).charAt(column - 1);
  },

  getFilename: function () {
    return this._filename;
  },

  getFirstToken: function () {
    return this.getToken(0);
  },

  getLastToken: function () {
    var tokens = this.getTokens();

    return tokens[tokens.length - 1];
  },

  getLine: function (line) {
    return this.getLines(line, line)[0];
  },

  getLineBreaks: function () {
    return this._lineBreaks;
  },

  getLines: function (start, end) {
    start = isNaN(start) ? 0 : start - 1;
    end = isNaN(end) ? this._lines.length : end;

    return this._lines.slice(start, end);
  },

  getNextToken: function (current, direction) {
    return this.getNextTokenByFilter(current, function () {
      return true;
    }, direction);
  },

  getNextTokenByFilter: function (current, filter, direction) {
    direction = direction === undefined ? 'next' : direction;

    var index = current._index;
    var length = this.getTokens().length;

    while (index >= 0 && index < length) {
      index = direction === 'next' ? index + 1 : index - 1;
      current = this.getToken(index);

      if (current && filter(current)) {
        return current;
      }
    }
  },

  getNextTokenByType: function (current, type, direction) {
    type = utils.createTypeArray(type);

    return this.getNextTokenByFilter(current, function (current) {
      return type.indexOf(current.type) !== -1;
    }, direction);
  },

  getParseErrors: function () {
    return this._parseErrors;
  },

  getPreviousTokenByType: function (current, type) {
    return this.getNextTokenByType(current, type, 'previous');
  },

  getSource: function () {
    return this._source;
  },

  getSourceBetweenTokens: function (start, end) {
    var currentLine = start.line;
    var source = [];
    var line;
    var startIndex;
    var endIndex;

    while (currentLine <= end.line) {
      line = this._lines[currentLine - 1];

      if (currentLine === start.line) {
        startIndex = start.col - 1;
      } else {
        startIndex = 0;
      }

      if (currentLine === end.line) {
        endIndex = end.col - 1;
      } else {
        endIndex = line.length;
      }

      line = line.substring(startIndex, endIndex);

      source.push(line);
      currentLine++;
    }

    return source.join('\n');
  },

  getToken: function (index) {
    var tokens = this.getTokens();

    return (tokens && tokens.length > index) ? tokens[index] : null;
  },

  getTokens: function () {
    return this._tokens;
  },

  getTokensByFilter: function (filter) {
    return this.getTokens().filter(filter);
  },

  iterateTokensByFilter: function (filter, cb) {
    this.getTokensByFilter(filter).forEach(function (token) {
      cb(token);
    });
  },

  iterateTokensByType: function (type, cb) {
    type = utils.createTypeArray(type);

    this.iterateTokensByFilter(function (token) {
      if (type.indexOf(token.type) !== -1) {
        return true;
      }

      return false;
    }, cb);
  }
};

module.exports = PugFile;
