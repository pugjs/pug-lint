module.exports = function () {};

module.exports.prototype = {
  name: 'additionalRuleA',

  configure: function () {},

  lint: function (file, errors) {
    errors.add(this.name, 0);
  }
};
