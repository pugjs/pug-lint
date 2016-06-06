var error = require('pug-error');

var Errors = function (file) {
  this._errors = [];
  this._file = file;
  this._currentRule = '';
};

Errors.prototype = {
  add: function (message, line, column) {
    this._errors.push(error(this._currentRule, message, {
      filename: this._file.getFilename(),
      src: this._file.getSource().replace(/\r\n|\r/g, '\n'),
      line: line,
      column: column
    }));
  },

  addParseError: function (error) {
    this._errors.push(error);
  },

  getErrors: function () {
    return this._errors;
  },

  setCurrentRule: function (rule) {
    this._currentRule = 'LINT_' + rule.toUpperCase();
  }
};

module.exports = Errors;
