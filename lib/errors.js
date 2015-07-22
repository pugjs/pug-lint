var Errors = function (file) {

      this._errors = []
      this._file = file

  }

Errors.prototype =
  { add: function (message, line, column) {

      this._errors.push(
        { filename: this._file.getFilename()
        , message: message
        , line: line
        , column: column
        }
      )

    }

  , getErrors: function () {

      return this._errors

    }

  , getErrorCount: function () {

      return this.getErrors().length

    }
  }

module.exports = Errors
