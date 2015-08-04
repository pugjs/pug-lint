var Errors = require('./errors')
  , fs = require('fs')
  , glob = require('glob')
  , JadeFile = require('./jade-file')
  , path = require('path')

  , Linter = function () {}

Linter.prototype =
  { checkDirectory: function (directoryPath) {

      var errors = []

      fs.readdirSync(directoryPath).forEach(function (file) {
        var filePath = directoryPath + '/' + file
          , stat = fs.statSync(filePath)

        if (stat.isDirectory()) {
          errors = errors.concat(this.checkDirectory(filePath))
        } else {
          if (path.extname(filePath) === '.jade') {
            errors = errors.concat(this.checkFile(filePath))
          }
        }
      }, this)

      return errors

    }

  , checkFile: function (filePath) {

      return this.checkString(fs.readFileSync(filePath, 'utf8'), filePath)

    }

  , checkPath: function (filePath) {

      filePath = filePath.replace(/\/$/, '')

      if (!fs.existsSync(filePath)) {
        throw new Error('Path ' + filePath + ' was not found')
      } else {
        var stat = fs.statSync(filePath)

        if (stat.isDirectory()) {
          return this.checkDirectory(filePath)
        }

        return this.checkFile(filePath)
      }

    }

  , checkString: function (source, filename) {

      filename = filename || 'input'

      var file = this._createJadeFile(filename, source)

      return this._checkJadeFile(file)

    }

  , configure: function (options) {

      this._configuredRules = []

      if (options && options.hasOwnProperty('preset')) {
        var presetPath = __dirname + '/../presets/' + options.preset + '.json'

        if (fs.existsSync(presetPath)) {
          options = JSON.parse(JSON.minify(fs.readFileSync(presetPath, 'utf8')))
        } else {
          throw new Error('Preset "' + options.preset + '" does not exist')
        }
      }

      glob.sync(__dirname + '/rules/*.js').forEach(function (file) {
        var Rule = require(file)
          , rule = new Rule()
          , name = rule.name

        if (options && options.hasOwnProperty(name) && options[name] !== null) {
          rule.configure(options[name])

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
        return errors.getErrors()
      }

      this.getConfiguredRules().forEach(function (rule) {
        errors.setCurrentRule(rule.name)

        rule.lint(file, errors)
      })

      return errors.getErrors()

    }

  , _createJadeFile: function (filename, source) {

      return new JadeFile(filename, source)

    }
  }

module.exports = Linter
