module.exports = createTest;

var assert = require('assert');

function createTest(linter, fixturesPath) {
  describe('disallowStringInterpolation', function () {
    describe('true', function () {
      before(function () {
        linter.configure({disallowStringInterpolation: true});
      });

      it('should report string interpolation', function () {
        assert.equal(linter.checkString('h1 #{title} text').length, 1);
      });

      it('should not report string concatenation', function () {
        assert.equal(linter.checkString('h1= title + \'text\'').length, 0);
      });

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'disallow-string-interpolation.pug');

        assert.equal(result.length, 6);
        assert.equal(result[0].code, 'PUG:LINT_DISALLOWSTRINGINTERPOLATION');
        assert.equal(result[0].line, 6);
        assert.equal(result[0].column, 4);
      });
    });
  });
}
