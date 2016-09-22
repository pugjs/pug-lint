module.exports = createTest;

var assert = require('assert');

function createTest(linter) {
  describe('disallowJavaScriptCode', function () {
    describe('true', function () {
      before(function () {
        linter.configure({disallowJavaScriptCode: true});
      });

      it('should report JavaScript code', function () {
        assert.equal(linter.checkString('- var x = 777\nbody= x').length, 2);
      });

      it('should report JavaScript code in attribute', function () {
        assert.equal(linter.checkString('p(x=y)').length, 1);
        assert.equal(linter.checkString('p(x=1)').length, 1);
        assert.equal(linter.checkString('p(x=`y`)').length, 1);
        assert.equal(linter.checkString('p(x=true)').length, 1);
      });

      it('should not report JavaScript code in attribute', function () {
        assert.equal(linter.checkString('p(x="y")').length, 0);
        assert.equal(linter.checkString('p(x="y\\"y")').length, 0);
        assert.equal(linter.checkString('p(x=\'y\')').length, 0);
        assert.equal(linter.checkString('p(x=\'y\\\'y\')').length, 0);
        assert.equal(linter.checkString('input(checked)').length, 0);
      });

      it('should report JavaScript code in each', function () {
        assert.equal(linter.checkString('each a in b\n\t\tp').length, 1);
      });

      it('should report JavaScript code in while', function () {
        assert.equal(linter.checkString('while true\n\t\tp').length, 1);
      });

      it('should report JavaScript code in condition', function () {
        assert.equal(linter.checkString('if true\n\t\tp\nelse if true\n\tp\nelse\n\tp').length, 3);
      });

      it('should report JavaScript code in case', function () {
        assert.equal(linter.checkString('case x\n\twhen y\n\t\tp\n\tdefault\n\t\tp').length, 3);
      });
    });
  });
}
