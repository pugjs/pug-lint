var assert = require('assert');
var path = require('path');

exports.createTypeArray = function (type) {
  if (typeof type === 'string') {
    type = [type];
  }
  return type;
};

exports.normalizePackageName = function (name, prefix) {
  if (name.indexOf('\\') > -1) {
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

exports.ownProperty = function (obj, propertyName) {
  var properties = [];
  var property;
  var i;

  for (i in obj) {
    /* istanbul ignore else */
    if (obj.hasOwnProperty(i)) {
      properties.push(i);
    }
  }

  while ((property = properties.pop())) {
    if (property.toLowerCase() === propertyName.toLowerCase()) {
      return obj[property];
    }
  }

  return null;
};

exports.validateTrueOptions = function (name, options) {
  assert(options === true, name + ' option requires a true value or should be removed');
};

exports.validateCodeOperatorOptions = function (name, options) {
  assert(options === true || Array.isArray(options), name + ' option requires a true or array value or should be removed');

  if (options === true) {
    options = this.codeOperatorTypes;
  }

  return options;
};

exports.codeOperatorTypes = [
  '-',
  '=',
  '!='
];

exports.codeOperators = {
  '-': {
    filter: function (token) {
      return token.type === 'code' && !token.buffer && !token.mustEscape;
    },
    description: 'unbuffered code operator'
  },
  '=': {
    filter: function (token) {
      return token.type === 'code' && token.buffer && token.mustEscape;
    },
    description: 'buffered code operator'
  },
  '!=': {
    filter: function (token) {
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

exports.concatenationRegex = /.['"]\s*(\+)|(\+)\s*['"]./;

exports.getNextAcornToken = function (tokens, prevEnd) {
  for (var i = 0; i < tokens.length; i++) {
    if (tokens[i].start >= prevEnd) {
      return tokens[i];
    }
  }
};
