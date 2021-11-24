const acorn = require('acorn');
const acornWalk = require('acorn/dist/walk');
const findLineColumn = require('find-line-column');
const attrs = require('pug-attrs');
const lexer = require('pug-lexer');
const utils = require('./utils');

const PugFile = function (filename, source) {
  this._parseErrors = [];
  this._tokens = [];
  this._filename = filename;
  this._source = source;
  this._lines = this._source.split(/\r\n|\r|\n/);
  this._lineBreaks = this._source.match(/\r\n|\r|\n/g);

  try {
    let currentIndent = 0;
    let indentSize = 0;

    this._tokens = lexer(this._source, {filename: this._filename}).map((token, index) => {
      if (['indent', 'outdent'].includes(token.type)) {
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
        const loc = token.loc.start;
        token.line = loc.line;
        token.col = loc.column;
      }

      return token;
    });
  } catch (error) {
    this._parseErrors.push(error);
  }
};

PugFile.prototype = {
  addErrorForAllStaticAttributeValues(name, errors, message) {
    this.iterateTokensByFilter(token => token.type === 'attribute' && token.name.toLowerCase() === name.toLowerCase(), token => {
      const options = {
        terse: true,
        format: 'html',
        runtime(name) {
          return name;
        }
      };
      const compiled = attrs([token], options);

      if (!/^attr\(.*\)$/g.test(compiled)) {
        errors.add(message, token.line, token.col);
      }
    });
  },

  addErrorForAllTokensByFilter(filter, errors, message) {
    this.iterateTokensByFilter(filter, token => {
      errors.add(message, token.line, token.col);
    });
  },

  addErrorForAllTokensByType(type, errors, message) {
    this.iterateTokensByType(type, token => {
      errors.add(message, token.line, token.col);
    });
  },

  addErrorForIncorrectSpacesAroundType(options, errors) {
    options.filter = function (token) {
      return token.type === options.type;
    };

    this.addErrorForIncorrectSpacesAroundFilter(options, errors);
  },

  addErrorForIncorrectSpacesAroundFilter(options, errors) {
    const _this = this;

    _this.iterateTokensByFilter(options.filter, token => {
      const separator = ' ';
      let columnIndex;
      let columnNumber;
      const errorMessage = [options.required ? 'One space required' : 'Illegal space'];
      const tokenWidth = options.tokenWidth || 1;

      switch (options.position) {
        case 'before':
          columnIndex = token.col - 1;
          columnNumber = token.col;
          errorMessage.push('before');
          break;
        default:
          columnNumber = token.col + tokenWidth;
          columnIndex = columnNumber;
          errorMessage.push('after');
          break;
      }

      errorMessage.push(options.description);

      const match = _this.getCharacter(token.line, columnIndex);

      _this.addErrorForMatch(match, separator, !options.required, errors
        , errorMessage.join(' '), token.line, columnNumber);
    });
  },

  addErrorForIncorrectTokenTypeOrder(typeA, typeB, boundaryTypes, errors, message) {
    typeA = utils.createTypeArray(typeA);

    const _this = this;

    _this.iterateTokensByType(typeB, token => {
      const current = token;
      const currentIndex = current._index;
      const start = _this.getPreviousTokenByType(token, boundaryTypes) || current;
      const startIndex = start._index;
      const end = _this.getNextTokenByType(token, boundaryTypes);
      const endIndex = end._index;

      _this.iterateTokensByFilter(token => typeA.includes(token.type)
          && token._index > currentIndex
          && token._index >= startIndex
          && token._index <= endIndex, token => {
        errors.add(message, token.line, token.col);
      });
    });
  },

  addErrorWithAcorn(token, cb, errors, message) {
    const tokens = [];
    const ast = acorn.parseExpressionAt(token.val, 0, {onToken: tokens});
    const nodes = cb(ast, tokens);

    for (const node of nodes) {
      const startLocation = this.findStartLocation(token.val, token, this.getNextToken(token));

      /* istanbul ignore else: else branch is only a fallback */
      if (startLocation) {
        const loc = findLineColumn(token.val, node.start);

        // `loc.col` is 0-based. Change it to 1-based.
        loc.col++;
        if (loc.line === 1) {
          loc.col += startLocation.col - 1;
        }

        // `loc.line` is 1-based.
        errors.add(message, startLocation.line + loc.line - 1, loc.col);
      } else {
        errors.add(message, token.line, token.col);
      }
    }
  },

  // `aggressive` reports *any* addition as error.
  addErrorForConcatenation(token, errors, message, aggressive) {
    this.addErrorWithAcorn(token, (ast, tokens) => {
      const badPlus = [];

      acornWalk.simple(ast, {
        BinaryExpression(node) {
          if (!badPlus.length && node.operator === '+' && (aggressive || isString(node.left) || isString(node.right))) {
            badPlus.push(utils.getNextAcornToken(tokens, node.left.end));
          }
        }
      });

      return badPlus;
    }, errors, message);
  },

  addErrorForTemplateString(token, errors, message, all) {
    this.addErrorWithAcorn(token, ast => {
      const templateLiterals = [];

      if (all) {
        acornWalk.simple(ast, {
          TemplateLiteral(node) {
            templateLiterals.push(node);
          }
        });
      } else if (ast.type === 'TemplateLiteral') {
        templateLiterals.push(ast);
      }

      return templateLiterals;
    }, errors, message);
  },

  addErrorForMatch(a, b, isMatch, errors, message, lineNumber, columnNumber) {
    if ((a === b) === isMatch) {
      errors.add(message, lineNumber, columnNumber);
    }
  },

  addErrorForCodeOperator(types, isRequired, errors) {
    const {codeOperators} = utils;
    const _this = this;

    for (const type of types) {
      const codeOperator = codeOperators[type];

      _this.addErrorForIncorrectSpacesAroundFilter({
        filter: codeOperator.filter,
        required: isRequired,
        position: 'after',
        description: codeOperator.description,
        tokenWidth: type.length
      }, errors);
    }
  },

  findStartLocation(value, start, end) {
    const lines = this.getLines(start.line, end && end.line);
    lines[lines.length - 1] = lines[lines.length - 1].slice(0, Math.max(0, end.col));
    const source = lines.join('\n');
    const pos = source.indexOf(value, start.col - 1);

    /* istanbul ignore if: this will only happen under odd circumstances like a
     * lexer bug */
    if (pos === -1) {
      return null;
    }

    const loc = findLineColumn(source, pos);
    return {
      line: start.line + loc.line - 1,
      col: loc.col + 1
    };
  },

  getCharacter(line, column) {
    return this.getLine(line).charAt(column - 1);
  },

  getFilename() {
    return this._filename;
  },

  getFirstToken() {
    return this.getToken(0);
  },

  getLastToken() {
    const tokens = this.getTokens();

    return tokens[tokens.length - 1];
  },

  getLine(line) {
    return this.getLines(line, line)[0];
  },

  getLineBreaks() {
    return this._lineBreaks;
  },

  getLines(start, end) {
    start = Number.isNaN(start) ? 0 : start - 1;
    end = Number.isNaN(end) ? this._lines.length : end;

    return this._lines.slice(start, end);
  },

  getNextToken(current, direction) {
    return this.getNextTokenByFilter(current, () => true, direction);
  },

  getNextTokenByFilter(current, filter, direction) {
    direction = direction === undefined ? 'next' : direction;

    let index = current._index;
    const {length} = this.getTokens();

    while (index >= 0 && index < length) {
      index = direction === 'next' ? index + 1 : index - 1;
      current = this.getToken(index);

      if (current && filter(current)) {
        return current;
      }
    }
  },

  getNextTokenByType(current, type, direction) {
    type = utils.createTypeArray(type);

    return this.getNextTokenByFilter(current, current => type.includes(current.type), direction);
  },

  getParseErrors() {
    return this._parseErrors;
  },

  getPreviousTokenByType(current, type) {
    return this.getNextTokenByType(current, type, 'previous');
  },

  getSource() {
    return this._source;
  },

  getSourceBetweenTokens(start, end) {
    let currentLine = start.line;
    const source = [];
    let line;
    let startIndex;
    let endIndex;

    while (currentLine <= end.line) {
      line = this._lines[currentLine - 1];

      startIndex = currentLine === start.line ? start.col - 1 : 0;
      endIndex = currentLine === end.line ? end.col - 1 : line.length;

      line = line.slice(startIndex, endIndex);

      source.push(line);
      currentLine++;
    }

    return source.join('\n');
  },

  getToken(index) {
    const tokens = this.getTokens();

    return (tokens && tokens.length > index) ? tokens[index] : null;
  },

  getTokens() {
    return this._tokens;
  },

  getTokensByFilter(filter) {
    return this.getTokens().filter(filter);
  },

  iterateTokensByFilter(filter, cb) {
    for (const token of this.getTokensByFilter(filter)) {
      cb(token);
    }
  },

  iterateTokensByType(type, cb) {
    type = utils.createTypeArray(type);

    this.iterateTokensByFilter(token => {
      if (type.includes(token.type)) {
        return true;
      }

      return false;
    }, cb);
  }
};

module.exports = PugFile;

function isString(node) {
  return node.type === 'Literal' && typeof node.value === 'string';
}