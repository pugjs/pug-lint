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
  { addErrorForAllTokensByFilter: function (filter, errors, message) {

      this.iterateTokensByFilter(filter, function (token) {
        errors.add(message, token.line)
      })

    }

  , addErrorForAllTokensByType: function (type, errors, message) {

      this.iterateTokensByType(type, function (token) {
        errors.add(message, token.line)
      })

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

      this.iterateTokensByFilter(function (token) {
        return token.type === type
      }, cb)

    }
  }

module.exports = StylusFile
