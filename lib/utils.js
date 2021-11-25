const assert = require('assert');
const path = require('path');

exports.createTypeArray = function (type) {
	if (typeof type === 'string') {
		type = [type];
	}

	return type;
};

exports.normalizePackageName = function (name, prefix) {
	if (name.includes('\\')) {
		name = path.normalize(name).replace(/\\/g, '/');
	}

	if (name.indexOf('@') === 0) {
		return name;
	}

	if (name.indexOf(prefix + '-') !== 0) {
		name = prefix + '-' + name;
	}

	return name;
};

exports.ownProperty = function (object, propertyName) {
	const properties = [];
	let property;
	let i;

	for (i in object) {
		/* istanbul ignore else */
		if (Object.prototype.hasOwnProperty.call(object, i)) {
			properties.push(i);
		}
	}

	while ((property = properties.pop())) {
		if (property.toLowerCase() === propertyName.toLowerCase()) {
			return object[property];
		}
	}

	return null;
};

exports.validateTrueOptions = function (name, options) {
	assert(
		options === true,
		name + ' option requires a true value or should be removed'
	);
};

exports.validateCodeOperatorOptions = function (name, options) {
	assert(
		options === true || Array.isArray(options),
		name + ' option requires a true or array value or should be removed'
	);

	if (options === true) {
		options = this.codeOperatorTypes;
	}

	return options;
};

exports.codeOperatorTypes = ['-', '=', '!='];

exports.codeOperators = {
	'-': {
		filter(token) {
			return token.type === 'code' && !token.buffer && !token.mustEscape;
		},
		description: 'unbuffered code operator'
	},
	'=': {
		filter(token) {
			return token.type === 'code' && token.buffer && token.mustEscape;
		},
		description: 'buffered code operator'
	},
	'!=': {
		filter(token) {
			return token.type === 'code' && token.buffer && !token.mustEscape;
		},
		description: 'unescaped buffered code operator'
	}
};

exports.htmlTagBoundaryTypes = [
	':',
	'start-pug-interpolation',
	'end-pug-interpolation',
	'newline',
	'indent',
	'outdent',
	'eos'
];

exports.concatenationRegex = /.["']\s*(\+)|(\+)\s*["']./;

exports.getNextAcornToken = function (tokens, previousEnd) {
	for (const token of tokens) {
		if (token.start >= previousEnd) {
			return token;
		}
	}
};
