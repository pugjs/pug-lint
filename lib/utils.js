var assert = require('assert')

exports.validateRequireDisallowOptions = function (name, options) {

  assert(options === 'require' || options === 'disallow'
    , this.name + ' option requires "require" or "disallow"')

  return options === 'require'

}

exports.validateTrueOptions = function (name, options) {

  assert(options === true, this.name + ' option requires a true value or should be removed')

}
