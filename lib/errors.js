var error = require('pug-error');

var Errors = function (file) {
  this._file = file;
  this._currentRule = '';

  this.messages = [];
  this.filePath = file.getFilename();
  this.errorCount = 0;
  this.warningCount = 0;
};

Errors.prototype = {
  _getErrorCode: function () {
    return 'LINT_' + this._currentRule.toUpperCase();
  },

  _pugErrorToESLint: function (error, parseError) {
    return {
      ruleId: parseError ? null : this._currentRule,
      severity: 2,
      message: error.msg,
      line: error.line,
      column: error.column,
      nodeType: null,
      source: error.src && error.line && error.src.split('\n')[error.line - 1] || null,
      fatal: Boolean(parseError),

      // pug-lint specific
      messageWithSource: error.message,
      fullSource: error.src,
      pugError: error
    };
  },

  add: function (message, line, column) {
    this.errorCount++;
    this.messages.push(this._pugErrorToESLint(error(this._getErrorCode(), message, {
      filename: this._file.getFilename(),
      src: this._file.getSource().replace(/\r\n|\r/g, '\n'),
      line: line,
      column: column
    })));
  },

  addParseError: function (error) {
    this.errorCount++;
    this.messages.push(this._pugErrorToESLint(error));
  },

  setCurrentRule: function (rule) {
    this._currentRule = rule;
  }
};

module.exports = Errors;
