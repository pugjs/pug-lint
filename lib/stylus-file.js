var jadeLexer = require('jade-lexer')

  , StylusFile = function (filename, source) {

      this._parseErrors = []
      this._filename = filename
      this._source = source
      this._lines = this._source.split(/\r\n|\r|\n/)

      try {
        this._tokens = jadeLexer(this._source, this._filename)
      } catch (e) {
        this._parseErrors.push(e)
      }

    }

StylusFile.prototype =
  { addErrorForAllLinesByFilter: function (filter, regex, isMatch, errors, message) {

      var _this = this

      _this.iterateTokensByFilter(filter, function (token) {
        _this.addErrorForLine(token.line, regex, isMatch, errors, message)
      })

    }

  , addErrorForAllLinesByType: function (type, regex, isMatch, errors, message) {

      if (typeof type === 'string') {
        type = [ type ]
      }

      this.addErrorForAllLinesByFilter(function (token) {
        return type.indexOf(token.type) !== -1
      }, regex, isMatch, errors, message)

    }

  , addErrorForAllTokensByFilter: function (filter, errors, message) {

      this.iterateTokensByFilter(filter, function (token) {
        errors.add(message, token.line)
      })

    }

  , addErrorForAllTokensByType: function (type, errors, message) {

      this.iterateTokensByType(type, function (token) {
        errors.add(message, token.line)
      })

    }

  , addErrorForLine: function (lineNumber, regex, isMatch, errors, message) {

      var line = this.getLine(lineNumber)

      if (regex.test(line) === isMatch) {
        errors.add(message, lineNumber)
      }

    }

  , getFilename: function () {

      return this._filename

    }

  , getLine: function (line) {

      return this.getLines()[line - 1]

    }

  , getLines: function () {

      return this._lines

  }

  , getParseErrors: function () {

      return this._parseErrors

    }

  , getToken: function (index) {

      var tokens = this.getTokens()

      return (tokens && tokens.length > index) ? tokens[index] : null

    }

  , getTokens: function () {

      return this._tokens

    }

  , getTokensByFilter: function (filter) {

      return this.getTokens().filter(filter)

    }

  , iterateTokensByFilter: function (filter, cb) {

      this.getTokensByFilter(filter).forEach(function (token) {
        cb(token)
      })

    }

  , iterateTokensByType: function (type, cb) {

      if (typeof type === 'string') {
        type = [ type ]
      }

      this.iterateTokensByFilter(function (token) {
        return type.indexOf(token.type) !== -1
      }, cb)

    }
  }

module.exports = StylusFile
