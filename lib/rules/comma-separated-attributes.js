var assert = require('assert')

module.exports = function () {}

module.exports.prototype =
  { name: 'commaSeparatedAttributes'

  , configure: function (isRequired) {

      assert(typeof isRequired === 'boolean'
        , this.name + ' option requires boolean value')

      this._isRequired = isRequired

    }

  , lint: function (file) {

      var attributeNodes = file.ast.nodes.filter(function (node) {
        return node.type === 'Tag' && node.attrs
      })

      attributeNodes.forEach(function (node) {
        var attributeCount = node.attrs.length
          , separator = this._isRequired ? ', ' : ' '
          , message = this._isRequired ? 'Missing comma after attribute' : 'Comma after attribute'
          , line = file.lines[node.line - 1]
          , regex = new RegExp(/\((.+)\)/g)
          , match

        while ((match = regex.exec(line)) !== null) {
          var attributes = match[1].split(separator).filter(filterAttributes)

          if (attributes.length !== attributeCount) {
            file.errors.push({ message: message, filename: file.filename, line: node.line })
          }
        }
      }, this)

      function filterAttributes(attribute) {
        return attribute.lastIndexOf(',') !== attribute.length - 1
      }

    }
  }
