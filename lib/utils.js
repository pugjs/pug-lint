var assert = require('assert')

exports.createTypeArray = function (type) {

  if (typeof type === 'string') type = [ type ]
  return type

}

exports.ownProperty = function (obj, propertyName) {

  var properties = []
    , property
    , i

  for (i in obj) {
    properties.push(i)
  }

  while ((property = properties.pop())) {
    if (property.toLowerCase() === propertyName.toLowerCase()) {
      return obj[property]
    }
  }

  return null

}

exports.validateTrueOptions = function (name, options) {

  assert(options === true, this.name + ' option requires a true value or should be removed')

}
