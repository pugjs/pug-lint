// # requireLineFeedAtFileEnd: `true`
//
// All files must end with a line feed.

var utils = require('../utils')

module.exports = function () {}

module.exports.prototype =
  { name: 'requireLineFeedAtFileEnd'

  , configure: function (options) {

      utils.validateTrueOptions(this.name, options)

    }

  , lint: function (file, errors) {

      var src = file.getSource()
        , lineBreaks = [ '\r', '\n', '\r\n' ]
        , hasFinalLineFeed

      lineBreaks.forEach(function (lineBreak) {
        var match = src.match(lineBreak + '$')
        if (match !== null && !hasFinalLineFeed) {
          hasFinalLineFeed = match[0] === lineBreak
        }
      })

      if (!hasFinalLineFeed) {
        errors.add('Missing line feed at file end', file.getLines().length)
      }

    }
  }
