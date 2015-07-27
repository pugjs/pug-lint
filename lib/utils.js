var assert = require('assert')

exports.createTypeArray = function (type) {

  if (typeof type === 'string') type = [ type ]
  return type

}

exports.validateTrueOptions = function (name, options) {

  assert(options === true, this.name + ' option requires a true value or should be removed')

}
