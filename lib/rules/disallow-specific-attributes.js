var assert = require('assert')
  , utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'disallowSpecificAttributes'

  , configure: function (options) {

      assert(typeof options === 'string' || typeof options === 'object'
        , this.name + ' option requires string or array value or should be removed')

      this._disallowedAttributes = options

    }

  , lint: function (file, errors) {

      addErrorForDisallowedAttribute(this._disallowedAttributes)

      function addErrorForDisallowedAttribute (values, lineNumber, tag) {

        if (typeof values === 'string') {
          values = [ values ]
        }

        values.forEach(function (value) {
          if (typeof value === 'object') {
            file.iterateTokensByFilter(function (token) {
              return token.type === 'tag' && utils.ownProperty(value, token.val) !== null
            }, function (token) {
              addErrorForDisallowedAttribute(utils.ownProperty(value, token.val), token.line, token.val)
            })
          } else {
            file.iterateTokensByFilter(function (token) {
              return token.type === 'attrs' && (token.line === lineNumber || lineNumber === undefined)
            }, function (token) {
              token.attrs.forEach(function (attribute) {
                var name = attribute.name
                , errorMessage

                if (name.toLowerCase() === value.toLowerCase()) {
                  errorMessage = tag ? 'Tag "' + tag + '" must not have attribute "' + name + '"'
                    : 'Attribute "' + name + '" must not be used'

                  errors.add(errorMessage, token.line)
                }
              })
            })
          }
        })

      }

    }
  }
