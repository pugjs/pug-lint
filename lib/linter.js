var Errors = require('./errors')
  , fs = require('fs')
  , glob = require('glob')
  , JadeFile = require('./jade-file')

  , Linter = function () {}

Linter.prototype =
  { checkFile: function (filename) {

      return this.checkString(fs.readFileSync(filename, 'utf8'))

  }

  , checkString: function (source, filename) {

      filename = filename || 'input'

      var file = this._createJadeFile(filename, source)

      return this._checkJadeFile(file)

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

  , _checkJadeFile: function (file) {

      var errors = new Errors(file)

      file.getParseErrors().forEach(function (parseError) {
        errors.addParseError(parseError)
      })

      var firstToken = file.getFirstToken()

      if (!firstToken || firstToken && firstToken.type === 'eos') {
        return errors
      }

      this.getConfiguredRules().forEach(function (rule) {
        errors.setCurrentRule(rule.name)

        rule.lint(file, errors)
      })

      return errors

    }

  , _createJadeFile: function (filename, source) {

      return new JadeFile(filename, source)

    }
  }

module.exports = Linter
