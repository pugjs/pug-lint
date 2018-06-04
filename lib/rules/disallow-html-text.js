// # disallowHtmlText: `true`
//
// Pug must not contain any HTML text.
//
// ```pug
// //- Invalid
// <strong>html text</strong>
// p this is <strong>html</strong> text
// ```

var utils = require("../utils");

module.exports = function() {};

module.exports.prototype = {
  name: "disallowHtmlText",

  schema: {
    enum: [null, true]
  },

  configure: function(options) {
    utils.validateTrueOptions(this.name, options);
  },

  lint: function(file, errors) {
    file.addErrorForAllTokensByFilter(
      function(token) {
        if (token.type === "text-html") {
          return true;
        }

        //allow within specific tags, therefor look up the parent tag
        if (token.type === "text" && /<[^\n]*/.test(token.val)) {
          var previousToken = token;
          do {
            previousToken = file._tokens[previousToken._index - 1];
            if (previousToken.type === "tag") {
              //add allowed tags here
              if (["script"].indexOf(previousToken.val) !== -1) {
                return false;
              }
              return true;
            }
          } while (previousToken);
        }

        return (
          token.type === "text-html" ||
          (token.type === "text" && /<[^\n]*/.test(token.val))
        );
      },
      errors, "HTML text must not be used"
    );
  }
};
