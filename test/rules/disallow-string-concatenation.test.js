module.exports = createTest;

var assert = require('assert');

function createTest(linter, fixturesPath) {
  describe('disallowStringConcatenation', function () {
    describe('true', function () {
      before(function () {
        linter.configure({disallowStringConcatenation: true});
      });

      it('should report string concatenation', function () {
        assert.equal(linter.checkString('h1= title + \'text\'').length, 1);
        assert.equal(linter.checkString('h1(class="test" + "test")= title + \'text\'').length, 1);
        assert.equal(linter.checkString('h1= \'text+\'').length, 0);
        assert.equal(linter.checkString('h1= test + test').length, 0);
      });

      it('should not report string interpolation', function () {
        assert.equal(linter.checkString('h1 #{title} text').length, 0);
      });

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'disallow-string-concatenation.pug');

        assert.equal(result.length, 2);
        assert.equal(result[0].code, 'PUG:LINT_DISALLOWSTRINGCONCATENATION');
        assert.equal(result[0].line, 7);
        assert.equal(result[0].column, 11);
      });
    });
  });
}
