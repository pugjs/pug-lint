const error = require('pug-error');

const Errors = function (file) {
	this._errors = [];
	this._file = file;
	this._currentRule = '';
};

Errors.prototype = {
	add(message, line, column) {
		this._errors.push(
			error(this._currentRule, message, {
				filename: this._file.getFilename(),
				src: this._file.getSource().replace(/\r\n|\r/g, '\n'),
				line,
				column
			})
		);
	},

	addParseError(error) {
		this._errors.push(error);
	},

	getErrors() {
		return this._errors;
	},

	setCurrentRule(rule) {
		this._currentRule = 'LINT_' + rule.toUpperCase();
	}
};

module.exports = Errors;
