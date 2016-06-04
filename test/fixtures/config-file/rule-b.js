module.exports = function () {};

module.exports.prototype = {
  name: 'additionalRuleB',

  configure: function () {},

  lint: function (file, errors) {
    errors.add(this.name, 0);
  }
};
