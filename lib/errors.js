var Errors = function (file) {

    this._errors = []
    this._file = file
    this._currentRule = ''

  }

Errors.prototype =
  { add: function (message, line, column) {

      this._errors.push(
        { filename: this._file.getFilename()
        , rule: this._currentRule
        , message: message
        , line: line
        , column: column
        }
      )

    }

  , getError: function (index) {

      return this.getErrors()[index]

    }

  , getErrors: function () {

      return this._errors

    }

  , getErrorCount: function () {

      return this.getErrors().length

    }

  , setCurrentRule: function (rule) {

      this._currentRule = rule

    }
  }

module.exports = Errors
