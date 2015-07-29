var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'disallowMultipleLineBreaks'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      file.getTokens().forEach(function (token, index, tokens) {
        var nextToken = tokens[index + 1]

        if (!nextToken) return

        if (nextToken.line > (token.line + 2)) {
          errors.add('Must not have multiple blank lines in a row', token.line)
        }
      })

    }
  }
