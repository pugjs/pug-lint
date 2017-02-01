// # <%- optionName %>: `true`
//
// The Pug template must <%- requirement %>.
//
// ```pug
// //- Invalid
// bleh...
//
// //- Valid
// blah...
// ```

<% if (optionsType !== 'other') { -%>
var utils = require('../utils');
<% } else { -%>
var assert = require('assert');
<% } -%>

module.exports = function () {};

module.exports.prototype = {
  name: '<%- optionName %>',

  schema: {
    enum: [null, true]
  },

  configure: function (options) {
<% if (optionsType === 'true') { -%>
    utils.validateTrueOptions(this.name, options);
<% } else if (optionsType === 'true|codeSep'){ -%>
    utils.validateCodeOperatorOptions(this.name, options);
<% } else { -%>
    // reminder: possible options: <%- options.join('|') %>
    assert(..., this.name + ' option requires ...');
<% } -%>
  },

  lint: function (file, errors) {
    // ...
  }
};
