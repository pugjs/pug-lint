module.exports = createTest;

var assert = require('assert');

function createTest(linter, fixturesPath, test) {
  describe('disallowStringConcatenation', function () {
    describe('true', function () {
      before(function () {
        linter.configure({disallowStringConcatenation: true});
      });

      it('should report string concatenation', function () {
        test('h1= title + \'text\'', 1, 11);
        test('h1(class="test" + "test")= title + \'text\'', 1, 34);
        test('h1(class="test" + "test")= title + text');
        test('h1= \'text+\'');
        test('= test + test');
      });

      it('should not report string interpolation', function () {
        test('h1 #{title} text');
      });

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'disallow-string-concatenation.pug');

        assert.equal(result.length, 2);
        assert.equal(result[0].code, 'PUG:LINT_DISALLOWSTRINGCONCATENATION');
        assert.equal(result[0].line, 7);
        assert.equal(result[0].column, 11);
      });
    });

    describe('aggressive', function () {
      before(function () {
        linter.configure({disallowStringConcatenation: 'aggressive'});
      });

      it('should report string concatenation', function () {
        test('h1= title + \'text\'', 1, 11);
        test('h1(class="test" + "test")= title + \'text\'', 1, 34);
        test('h1(class="test" + "test")= title + text', 1, 34);
        test('h1= \'text+\'');
        test('= test + test', 1, 8);
      });

      it('should not report string interpolation', function () {
        test('h1 #{title} text');
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
