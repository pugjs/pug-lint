var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'requireLineFeedAtFileEnd'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      var lastToken = file.getLastToken()
        , previousToken = file.getPreviousToken(lastToken, [ 'newline', 'outdent' ])

      if (lastToken.line === previousToken.line) {
        errors.add('Missing line feed at file end', lastToken.line)
      }

    }
  }
