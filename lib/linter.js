var Errors = require('./errors')
  , fs = require('fs')
  , glob = require('glob')
  , StylusFile = require('./stylus-file')

  , Linter = function () {}

Linter.prototype =
  { checkFile: function (filename) {

      return this.checkString(fs.readFileSync(filename, 'utf8'))

  }

  , checkString: function (source, filename) {

      filename = filename || 'input'

      var file = this._createStylusFile(filename, source)

      return this._checkStylusFile(file)

    }

  , configure: function (options) {

      this._configuredRules = []

      glob.sync(__dirname + '/rules/*.js').forEach(function (file) {
        var Rule = require(file)
          , rule = new Rule()

        if (options && options.hasOwnProperty(rule.name) && options[rule.name] !== null) {
          rule.configure(options[rule.name])

          this._configuredRules.push(rule)
        }
      }, this)

    }

  , getConfiguredRules: function () {

    return this._configuredRules

  }

  , _checkStylusFile: function (file) {

      var errors = new Errors(file)

      file.getParseErrors().forEach(function (parseError) {
        errors.addParseError(parseError)
      })

      var firstToken = file.getToken(0)

      if (firstToken && firstToken.type === 'eos') {
        return errors
      }

      this.getConfiguredRules().forEach(function (rule) {
        errors.setCurrentRule(rule.name)

        rule.lint(file, errors)
      })

      return errors

    }

  , _createStylusFile: function (filename, source) {

      return new StylusFile(filename, source)

    }
  }

module.exports = Linter
