// # requireSpacesInsideAttributeBrackets: `true`
//
// Requires space after opening attribute bracket and before closing.
//
// ```jade
// //- Invalid
// input(type='text' name='name' value='value')
//
// //- Valid
// input( type='text' name='name' value='value' )
// ```
//
// # requireSpecificAttributes: `Array`
//
// ## e.g.: `[ { img: [ "alt" ] } ]`
//
// `img` tags must contain all of the attributes specified.
//
// ```jade
// //- Invalid
// img(src='src')
//
// //- Valid
// img(src='src' alt='alt')
// ```

var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'requireSpacesInsideAttributeBrackets'

  , contradictions: [ 'disallowSpacesInsideAttributeBrackets' ]

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.addErrorForIncorrectSpacesAroundType(
        { type: 'start-attributes'
        , required: true
        , position: 'after'
        , description: 'opening bracket'
        }
        , errors)

      file.addErrorForIncorrectSpacesAroundType(
        { type: 'end-attributes'
        , required: true
        , position: 'before'
        , description: 'closing bracket'
        }
        , errors)

    }
  }
