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
        var currentIndent = 0
          , indentSize = 0

        this._tokens = lexer(this._source, { filename: this._filename }).map(function (token, index) {

          if ([ 'indent', 'outdent' ].indexOf(token.type) !== -1) {
            if (token.val) {
              if (indentSize === 0) indentSize = token.val

              currentIndent += indentSize
            } else {
              currentIndent -= indentSize
            }
          }

          token._index = index
          token._indent = currentIndent
          return token
        })
      } catch (e) {
        this._parseErrors.push(e)
      }

    }

PugFile.prototype =

  { addErrorForAllLinesByFilter: function (filter, pattern, errors, message) {

      var _this = this

      _this.iterateTokensByFilter(filter, function (token) {
        _this.addErrorForLine(token.line, pattern, errors, message)
      })

    }

  , addErrorForAllLinesByType: function (type, pattern, errors, message) {

      type = utils.createTypeArray(type)

      this.addErrorForAllLinesByFilter(function (token) {
        return type.indexOf(token.type) !== -1
      }, pattern, errors, message)

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

  , addErrorForIncorrectSpacesAroundType: function (options, errors) {

      options.filter = function (token) {
        return token.type === options.type
      }

      this.addErrorForIncorrectSpacesAroundFilter(options, errors)

  }

  , addErrorForIncorrectSpacesAroundFilter: function (options, errors) {

      var _this = this

      _this.iterateTokensByFilter(options.filter, function (token) {
        var separator = ' '
          , match
          , columnIndex
          , columnNumber
          , errorMessage = [ options.required ? 'One space required' : 'Illegal space' ]
          , tokenWidth = options.tokenWidth || 1

        switch (options.position) {
          case 'before':
            columnIndex = token.col - 1
            columnNumber = token.col
            errorMessage.push('before')
            break
          case 'after':
            columnIndex = columnNumber = token.col + tokenWidth
            errorMessage.push('after')
            break
        }

        errorMessage.push(options.description)

        match = _this.getCharacter(token.line, columnIndex)

        _this.addErrorForMatch(match, separator, !options.required, errors
          , errorMessage.join(' '), token.line, columnNumber)
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

  , addErrorForConcatenation: function (token, errors, message) {

    var regex = new RegExp(utils.concatenationRegex)
      , match = regex.exec(token.val)
      , line = this.getLine(token.line)
      , columnNumber

      if (match !== null) {
        columnNumber = line.indexOf(token.val) + 1 + match.index + match[0].indexOf(match[1] || match[2])

        errors.add(message, token.line, columnNumber)
      }

  }

  , addErrorForLine: function (lineNumber, pattern, errors, message) {

      var line = this.getLine(lineNumber)
        , regex = new RegExp(pattern)
        , match = regex.exec(line)
        , columnNumber

      if (pattern.test(line)) {
        columnNumber = 1 + match.index + match[0].indexOf(match[1])

        errors.add(message, lineNumber, columnNumber)
      }

    }

  , addErrorForMatch: function (a, b, isMatch, errors, message, lineNumber, columnNumber) {

      if ((a === b) === isMatch) {
        errors.add(message, lineNumber, columnNumber)
      }

    }

  , addErrorForCodeOperator: function (types, isRequired, errors) {

      var codeOperators = utils.codeOperators
        , _this = this

      types.forEach(function (type) {
        var codeOperator = codeOperators[type]

        _this.addErrorForIncorrectSpacesAroundFilter(
          { filter: codeOperator.filter
          , required: isRequired
          , position: 'after'
          , description: codeOperator.description
          , tokenWidth: type.length
          }
          , errors
        )
      })

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

      return this._tokens

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
