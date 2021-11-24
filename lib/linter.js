const assert = require('assert');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const isAbsolutePath = require('path-is-absolute');
const minimatch = require('minimatch');
const resolve = require('resolve');
const ConfigFile = require('./config-file');
const Errors = require('./errors');
const File = require('./pug-file');
const utils = require('./utils');

const Linter = function () {
  this._basePath = '.';
  this._excludedFileMasks = ['node_modules/**'];
  this._excludedFileMatchers = [];
  this._fileExtensions = ['.pug', '.jade'];
};

Linter.prototype = {
  checkDirectory(directoryPath) {
    const errors = [];

    if (this._isFileExcluded(directoryPath)) {
      return [];
    }

    for (const file of fs.readdirSync(directoryPath)) {
      const filePath = directoryPath + '/' + file;
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        errors.push(...this.checkDirectory(filePath));
      } else if (this._fileExtensions.includes(path.extname(filePath))) {
        errors.push(...this.checkFile(filePath));
      }
    }

    return errors;
  },

  checkFile(filePath) {
    /* istanbul ignore if */
    if (this._isFileExcluded(filePath)) {
      return [];
    }

    return this.checkString(fs.readFileSync(filePath, 'utf8'), filePath);
  },

  checkPath(filePath) {
    filePath = filePath.replace(/\/$/, '');

    if (!fs.existsSync(filePath)) {
      throw new Error('Path ' + filePath + ' was not found');
    }

    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      return this.checkDirectory(filePath);
    }

    return this.checkFile(filePath);
  },

  checkString(source, filename = 'input') {
    const file = this._createFile(filename, source);

    return this._checkFile(file);
  },

  configure(options) {
    this._configuredRules = [];
    this._ruleMasks = [path.join(__dirname, 'rules/*.js')];

    if (options) {
      this._extendConfiguration(options);

      if (Object.prototype.hasOwnProperty.call(options, 'preset')) {
        throw new Error('Presets have been deprecated. See: https://github.com/pugjs/pug-lint#preset-deprecated');
      }

      if (Object.prototype.hasOwnProperty.call(options, 'excludeFiles')) {
        assert(Array.isArray(options.excludeFiles), '"excludeFiles" option requires array value');

        this._excludedFileMasks = options.excludeFiles;
      }

      if (Object.prototype.hasOwnProperty.call(options, 'additionalRules')) {
        assert(Array.isArray(options.additionalRules), '"additionalRules" option requires array value');

        this._ruleMasks.push(...options.additionalRules);
      }

      this._loadExcludedFiles();

      for (const mask of this._ruleMasks) {
        for (const file of glob.sync(mask)) {
          const Rule = require(path.resolve(file));
          const rule = new Rule();
          const {name, contradictions} = rule;

          if (Object.prototype.hasOwnProperty.call(options, name) && options[name] !== null) {
            if (contradictions) {
              for (const contradiction of contradictions) {
                if (Object.prototype.hasOwnProperty.call(options, contradiction) && options[contradiction] !== null) {
                  options[contradiction] = null;
                }
              }
            }

            rule.configure(options[name]);

            this._configuredRules.push(rule);
          }
        }
      }
    }
  },

  getConfiguredRules() {
    return this._configuredRules;
  },

  _checkFile(file) {
    const errors = new Errors(file);

    for (const parseError of file.getParseErrors()) {
      errors.addParseError(parseError);
    }

    const firstToken = file.getFirstToken();

    if (!firstToken || (firstToken && firstToken.type === 'eos')) {
      return errors.getErrors();
    }

    for (const rule of this.getConfiguredRules()) {
      errors.setCurrentRule(rule.name);

      rule.lint(file, errors);
    }

    return errors.getErrors();
  },

  _createFile(filename, source) {
    return new File(filename, source);
  },

  _extendConfiguration(options) {
    if (Object.prototype.hasOwnProperty.call(options, 'extends')) {
      const configPath = this._resolveExtendsFile(options.extends);
      const configOptions = ConfigFile.loadFromFile(configPath);

      for (const key of Object.keys(configOptions)) {
        if (!Object.prototype.hasOwnProperty.call(options, key)) {
          options[key] = configOptions[key];
        }
      }
    }

    return options;
  },

  _isFileExcluded(filePath) {
    filePath = path.resolve(filePath);

    return this._excludedFileMatchers.some(matcher => matcher.match(filePath));
  },

  _loadExcludedFiles() {
    this._excludedFileMatchers = this._excludedFileMasks.map(fileMask => new minimatch.Minimatch(path.resolve(this._basePath, fileMask), {
      dot: true
    }));
  },

  _resolveExtendsFile(filePath) {
    if (isAbsolutePath(filePath) || !/\w|@/.test(filePath.charAt(0))) {
      filePath = path.resolve(this._basePath, filePath);

      if (!fs.existsSync(filePath)) {
        throw new Error('Cannot find configuration file "' + filePath + '" to extend');
      }
    } else {
      const packageName = utils.normalizePackageName(filePath, 'pug-lint-config');

      try {
        filePath = resolve.sync(packageName);
      } catch (error) {
        throw new Error('Cannot find module "' + packageName + '" to extend');
      }
    }

    return filePath;
  }
};

module.exports = Linter;
