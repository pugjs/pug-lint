// # disallowMultipleLineBreaks: `true`
//
// Pug must not contain multiple blank lines in a row.
//
// ```jade
// //- Invalid
// div
//
//
// div
//
// //- Valid
// div
//
// div
// ```

var utils = require('../utils')
  , rMultiNewline = new RegExp(/(\\n|\\r|\n|\r){3,}/g)

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

        // If too many lines between tokens OR call token with args matching multi-line regex above
        if ((nextToken.line > token.line + 2) && (token.type !== 'call' || token.args.match(rMultiNewline) !== null)) {
          errors.add('Must not have multiple blank lines in a row', token.line)
        }
      })
    }
  }
