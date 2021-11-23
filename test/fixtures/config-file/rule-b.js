module.exports = function () {};

module.exports.prototype = {
  name: 'additionalRuleB',

  configure() {},

  lint(file, errors) {
    errors.add(this.name, 0);
  }
};
