var async = require('async')
  , fs = require('fs')
  , glob = require('glob')
  , jadeLexer = require('jade-lexer')
  , os = require('os')

  , Linter = function () {}

Linter.prototype =
  { checkFile: function (filename) {

      return this.checkString(fs.readFileSync(filename, 'utf8'))

  }

  , checkString: function (source, filename) {

      filename = filename || 'input'

      var file = this._createStylusFile(filename, source)

      // TODO: Do not check empty strings
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

      async.eachLimit(this.getConfiguredRules(), os.cpus().length, function (rule, cb) {
        rule.lint(file)
        cb()
      })

      return file.errors

    }

  , _createStylusFile: function (filename, source) {

      // TODO: Catch any errors when lexing
      var tokens = jadeLexer(source, filename)
        , file =
          { filename: filename
          , source: source
          , lines: source.split(/\r\n|\r|\n/)
          , tokens: tokens
          , errors: []
          }

      return file

    }
}

module.exports = Linter
