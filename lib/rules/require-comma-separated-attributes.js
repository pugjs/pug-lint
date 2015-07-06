module.exports = function () {}

module.exports.prototype =
  { name: 'requireCommaSeparatedAttributes'
  , check: function (data, errors) {
      var regex = new RegExp(/\((.+)\)/g)
        , match

      while ((match = regex.exec(data)) !== null) {
        var attrs = match[1].split(' ')

        for (var i = 0; i < attrs.length - 1; i++) {
          if (attrs[i].lastIndexOf(',') !== attrs[i].length - 1) {
            errors.push('Missing comma after attribute')
          }
        }
      }
    }
  }
