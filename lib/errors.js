var error = require('jade-error')

  , Errors = function (file) {

      this._errors = []
      this._file = file
      this._currentRule = ''

    }

Errors.prototype =
  { add: function (message, line, column) {

      this._errors.push(error(this._currentRule, message
        , { filename: this._file.getFilename()
          , src: this._file.getSource().replace(/\r\n|\r/g, '\n')
          , line: line
          , colum: column
          }
        ))

    }

  , addParseError: function (error) {

       this._errors.push(error)

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

      this._currentRule = 'LINT_' + rule.toUpperCase()

    }
  }

module.exports = Errors
