module.exports = createTest;

var assert = require('assert');

function createTest(linter, fixturesPath) {
  describe('disallowClassLiteralsBeforeIdLiterals', function () {
    describe('true', function () {
      before(function () {
        linter.configure({disallowClassLiteralsBeforeIdLiterals: true});
      });

      it('should report class literals before ID literals', function () {
        assert.equal(linter.checkString('input.class#id(type=\'text\')').length, 1);
      });

      it('should not report ID literals before class literals', function () {
        assert.equal(linter.checkString('input(type=\'text\')#id.class').length, 0);
      });

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'disallow-class-literals-before-id-literals.pug');

        assert.equal(result.length, 2);
        assert.equal(result[0].code, 'PUG:LINT_DISALLOWCLASSLITERALSBEFOREIDLITERALS');
        assert.equal(result[0].line, 1);
        assert.equal(result[0].column, 25);
      });
    });
  });
}
