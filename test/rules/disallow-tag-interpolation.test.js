module.exports = createTest;

var assert = require('assert');

function createTest(linter, fixturesPath) {
  describe('disallowTagInterpolation', function () {
    describe('true', function () {
      before(function () {
        linter.configure({disallowTagInterpolation: true});
      });

      it('should report tag interpolation at the start', function () {
        assert.equal(linter.checkString('| #[strong html] text').length, 1);
      });

      it('should report tag interpolation anywhere', function () {
        assert.equal(linter.checkString('p #[strong html] text').length, 1);
      });

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'disallow-tag-interpolation.pug');

        assert.equal(result.length, 4);
        assert.equal(result[0].code, 'PUG:LINT_DISALLOWTAGINTERPOLATION');
        assert.equal(result[0].line, 2);
        assert.equal(result[0].column, 5);
        assert.equal(result[1].line, 3);
        assert.equal(result[2].line, 5);
        assert.equal(result[3].line, 6);
      });
    });
  });
}
