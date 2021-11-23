module.exports = function () {};

module.exports.prototype = {
  name: 'additionalRuleA',

  configure() {},

  lint(file, errors) {
    errors.add(this.name, 0);
  }
};
