// # validateExtensions: `true`
//
// Pug template must use proper file extensions with inclusion and inheritance
// (`.pug`).
//
// ```pug
// //- Invalid
// include a
// include a.jade
// extends a
// extends a.txt
// extends a.jade
//
// //- Valid
// include a.txt
// include a.pug
// extends a.pug
// ```

var path = require('path');
var utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
  name: 'validateExtensions',

  schema: {
    enum: [null, true]
  },

  configure: function (options) {
    utils.validateTrueOptions(this.name, options);
  },

  lint: function (file, errors) {
    var tokens = file.getTokensByFilter(function (token) {
      return token.type === 'include' || token.type === 'extends' || token.type === 'path';
    });

    tokens.forEach(function (token, i) {
      var next = tokens[i + 1];

      if (!next || next.type !== 'path') {
        return;
      }

      if (token.type === 'include') {
        if (path.basename(next.val).indexOf('.') === -1) {
          errors.add('Included file path must have a file extension', next.line, next.col);
        } else if (path.extname(next.val) === '.jade') {
          errors.add('Included Pug file must end in .pug', next.line, next.col);
        }
      } else /* istanbul ignore else */ if (token.type === 'extends') {
        if (path.extname(next.val) !== '.pug') {
          errors.add('Extended Pug file must end in .pug', next.line, next.col);
        }
      }
    });
  }
};
