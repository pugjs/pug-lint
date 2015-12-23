var assert = require('assert')
  , Errors = require('./errors')
  , fs = require('fs')
  , glob = require('glob')
  , File = require('./pug-file')
  , minimatch = require('minimatch')
  , path = require('path')

  , Linter = function () {

      this._basePath = '.'
      this._excludedFileMasks = [ 'node_modules/**' ]
      this._excludedFileMatchers = []
      this._fileExtensions = [ '.pug', '.jade' ]

    }

Linter.prototype =
  { checkDirectory: function (directoryPath) {

      var errors = []

      fs.readdirSync(directoryPath).forEach(function (file) {
        var filePath = directoryPath + '/' + file
          , stat = fs.statSync(filePath)

        if (stat.isDirectory()) {
          errors = errors.concat(this.checkDirectory(filePath))
        } else {
          if (this._fileExtensions.indexOf(path.extname(filePath)) !== -1) {
            errors = errors.concat(this.checkFile(filePath))
          }
        }
      }, this)

      return errors

    }

  , checkFile: function (filePath) {

      if (this._isFileExcluded(filePath)) return []

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

      var file = this._createFile(filename, source)

      return this._checkFile(file)

    }

  , configure: function (options) {

      this._configuredRules = []
      this._ruleMasks = [ __dirname + '/rules/*.js' ]

      if (options) {
        if (options.hasOwnProperty('preset')) {
          var presetPath = __dirname + '/../presets/' + options.preset + '.json'
            , presetOptions = []

          if (fs.existsSync(presetPath)) {
            presetOptions = JSON.parse(fs.readFileSync(presetPath, 'utf8'))
          } else {
            throw new Error('Preset "' + options.preset + '" does not exist')
          }

          Object.keys(presetOptions).forEach(function (key) {
            if (!options.hasOwnProperty(key)) {
              options[key] = presetOptions[key]
            }
          })
        }

        if (options.hasOwnProperty('excludeFiles')) {
          assert(Array.isArray(options.excludeFiles), '"excludeFiles" option requires array value')

          this._excludedFileMasks = options.excludeFiles
        }

        if (options.hasOwnProperty('additionalRules')) {
          assert(Array.isArray(options.additionalRules), '"additionalRules" option requires array value')

          this._ruleMasks = this._ruleMasks.concat(options.additionalRules)
        }

        this._loadExcludedFiles()

        this._ruleMasks.forEach(function (mask) {
          glob.sync(mask).forEach(function (file) {
            var Rule = require(path.resolve(file))
              , rule = new Rule()
              , name = rule.name

            if (options.hasOwnProperty(name) && options[name] !== null) {
              if (rule.contradictions) {
                rule.contradictions.forEach(function (contradiction) {
                  if (options.hasOwnProperty(contradiction) && options[contradiction] !== null) {
                    options[contradiction] = null
                  }
                })
              }

              rule.configure(options[name])

              this._configuredRules.push(rule)
            }
          }, this)
        }, this)
      }

    }

  , getConfiguredRules: function () {

      return this._configuredRules

    }

  , _checkFile: function (file) {

      var errors = new Errors(file)
        , firstToken

      file.getParseErrors().forEach(function (parseError) {
        errors.addParseError(parseError)
      })

      firstToken = file.getFirstToken()

      if (!firstToken || firstToken && firstToken.type === 'eos') {
        return errors.getErrors()
      }

      this.getConfiguredRules().forEach(function (rule) {
        errors.setCurrentRule(rule.name)

        rule.lint(file, errors)
      })

      return errors.getErrors()

    }

  , _createFile: function (filename, source) {

      return new File(filename, source)

    }

  , _isFileExcluded: function (filePath) {

      filePath = path.resolve(filePath)

      return this._excludedFileMatchers.some(function (matcher) {
        return matcher.match(filePath)
      })

    }

  , _loadExcludedFiles: function () {

      this._excludedFileMatchers = this._excludedFileMasks.map(function (fileMask) {
        return new minimatch.Minimatch(path.resolve(this._basePath, fileMask), {
          dot: true
        })
      }, this)

    }
}

module.exports = Linter
