var assert = require('assert')

module.exports = function () {}

module.exports.prototype =
  { name: 'disallowTagInterpolation'

  , configure: function (options) {

      assert(options === true
        , this.name + ' option requires a true value or should be removed')

    }

  , lint: function (file) {

      var interpolationTokens = file.tokens.filter(function (token) {
          return token.type === 'start-jade-interpolation'
        })

      interpolationTokens.forEach(function (token) {
        file.errors.push({ message: 'Tag interpolation operators must not be used'
          , filename: file.filename, line: token.line })
      }, this)

    }
  }
