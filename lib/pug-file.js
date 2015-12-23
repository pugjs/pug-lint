var attrs = require('pug-attrs')
  , lexer = require('pug-lexer')
  , utils = require('./utils')

  , PugFile = function (filename, source) {

      this._parseErrors = []
      this._tokens = []
      this._filename = filename
      this._source = source
      this._lines = this._source.split(/\r\n|\r|\n/)
      this._lineBreaks = this._source.match(/\r\n|\r|\n/g)

      try {
        this._tokens = lexer(this._source, this._filename)
      } catch (e) {
        this._parseErrors.push(e)
      }

    }

PugFile.prototype =

  { addErrorForAllLinesByFilter: function (filter, regex, isMatch, errors, message) {

      var _this = this

      _this.iterateTokensByFilter(filter, function (token) {
        _this.addErrorForLine(token.line, regex, isMatch, errors, message)
      })

    }

  , addErrorForAllLinesByType: function (type, regex, isMatch, errors, message) {

      type = utils.createTypeArray(type)

      this.addErrorForAllLinesByFilter(function (token) {
        return type.indexOf(token.type) !== -1
      }, regex, isMatch, errors, message)

    }

  , addErrorForAllStaticAttributeValues: function (name, errors, message) {

      this.iterateTokensByFilter(function (token) {
        return token.type === 'attribute' && token.name.toLowerCase() === name.toLowerCase()
      }, function (token) {
        var options =
            { terse: true
            , format: 'html'
            , runtime: function (name) { return name }
            }
          , compiled = attrs([ token ], options)

        if (!/^attr\(.*\)$/g.exec(compiled)) {
          errors.add(message, token.line, token.col)
        }
      })

    }

  , addErrorForAllTokensByFilter: function (filter, errors, message) {

      this.iterateTokensByFilter(filter, function (token) {
        errors.add(message, token.line, token.col)
      })

    }

  , addErrorForAllTokensByType: function (type, errors, message) {

      this.iterateTokensByType(type, function (token) {
        errors.add(message, token.line, token.col)
      })

    }

  // , addErrorForIncorrectSpacesInsideBrackets: function (brackets, token, isRequired, errors) {

  //     var lineNumber = token.line
  //         , line = this.getLine(lineNumber)
  //         , regex = new RegExp('(\\' + brackets[0] + ')(\\s*)\\S([^(]*|.*)\\S(\\s*)(\\' + brackets[1] + ')', 'g')
  //         , match
  //         , separator = ' '
  //         , errorPrefix = isRequired ? 'One space required' : 'Illegal space'
  //         , openingColumn
  //         , closingColumn

  //       while ((match = regex.exec(line)) !== null) {
  //         openingColumn = match[0].indexOf(match[1]) + 1
  //         closingColumn = match[0].lastIndexOf(match[5]) + 1

  //         this.addErrorForMatch(match[2], separator, !isRequired, errors
  //           , errorPrefix + ' after opening bracket', lineNumber, openingColumn)
  //         this.addErrorForMatch(match[4], separator, !isRequired, errors
  //           , errorPrefix + ' before closing bracket', lineNumber, closingColumn)
  //       }

  //   }

  , addErrorForIncorrectSpacesAroundType: function (options, errors) {

      var _this = this

      _this.iterateTokensByType(options.type, function (token) {
        var separator = ' '
          , match
          , columnNumber
          , errorMessage = [ options.required ? 'One space required' : 'Illegal space' ]

        switch (options.position) {
          case 'before':
            columnNumber = token.col - 1
            errorMessage.push('before')
            break
          case 'after':
            columnNumber = token.col + 1
            errorMessage.push('after')
            break
        }

        errorMessage.push(options.description)

        match = _this.getCharacter(token.line, columnNumber)

        _this.addErrorForMatch(match, separator, !options.required, errors
          , errorMessage, token.line, columnNumber)
      })

    }

  , addErrorForIncorrectTokenTypeOrder: function (typeA, typeB, boundaryTypes, errors, message) {

      typeA = utils.createTypeArray(typeA)

      var _this = this

      _this.iterateTokensByType(typeB, function (token) {
        var current = token
          , currentIndex = current._index
          , start = _this.getPreviousTokenByType(token, boundaryTypes) || current
          , startIndex = start._index
          , end = _this.getNextTokenByType(token, boundaryTypes)
          , endIndex = end._index

        _this.iterateTokensByFilter(function (token) {
          return typeA.indexOf(token.type) !== -1 &&
            token._index > currentIndex &&
            token._index >= startIndex &&
            token._index <= endIndex
        }, function (token) {
          errors.add(message, token.line, token.col)
        })
      })

    }

  , addErrorForLine: function (lineNumber, regex, isMatch, errors, message) {

      var line = this.getLine(lineNumber)

      if (regex.test(line) === isMatch) {
        errors.add(message, lineNumber)
      }

    }

  , addErrorForMatch: function (a, b, isMatch, errors, message, lineNumber, columnNumber) {

      if ((a === b) === isMatch) {
        errors.add(message, lineNumber, columnNumber)
      }

    }

  , getCharacter: function (line, column) {

      return this.getLine(line).charAt(column - 1)

    }

  , getFilename: function () {

      return this._filename

    }

  , getFirstToken: function () {

      return this.getToken(0)

    }

  , getLastToken: function () {

      var tokens = this.getTokens()

      return tokens[tokens.length - 1]

    }

  , getLine: function (line) {

      return this.getLines(line, line)[0]

    }

  , getLineBreaks: function () {

      return this._lineBreaks

    }

  , getLines: function (start, end) {

      start = isNaN(start) ? 0 : start - 1
      end = isNaN(end) ? this._lines.length : end

      return this._lines.slice(start, end)

    }

  , getNextTokenByType: function (current, type, direction) {

      type = utils.createTypeArray(type)
      direction = direction !== undefined ? direction : 'next'

      var index = current._index
        , length = this.getTokens().length

      while (index >= 0 && index < length) {
        index = direction === 'next' ? index + 1 : index - 1
        current = this.getToken(index)

        if (current && type.indexOf(current.type) !== -1) {
          return current
        }
      }

    }

  , getParseErrors: function () {

      return this._parseErrors

    }

  , getPreviousTokenByType: function (current, type) {

      return this.getNextTokenByType(current, type, 'previous')

    }

  , getSource: function () {

      return this._source

    }

  , getSourceBetweenTokens: function (start, end) {

      var currentLine = start.line
        , source = []
        , line
        , startIndex
        , endIndex

      while (currentLine <= end.line) {
        line = this._lines[currentLine - 1]

        if (currentLine === start.line) {
          startIndex = start.col - 1
        } else {
          startIndex = 0
        }

        if (currentLine === end.line) {
          endIndex = end.col - 1
        } else {
          endIndex = line.length
        }

        line = line.substring(startIndex, endIndex)

        source.push(line)
        currentLine++
      }

      return source.join('\n')

    }

  , getToken: function (index) {

      var tokens = this.getTokens()

      return (tokens && tokens.length > index) ? tokens[index] : null

    }

  , getTokens: function () {

      return this._tokens.map(function (token, index) {
        token._index = index
        return token
      })

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

      type = utils.createTypeArray(type)

      this.iterateTokensByFilter(function (token) {
        if (type.indexOf(token.type) !== -1) {
          return true
        }

        return false
      }, cb)

    }
  }

module.exports = PugFile
