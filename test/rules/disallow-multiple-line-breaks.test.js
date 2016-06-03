module.exports = createTest;

var assert = require('assert');

function createTest(linter, fixturesPath) {
  describe('disallowMultipleLineBreaks', function () {
    describe('true', function () {
      before(function () {
        linter.configure({disallowMultipleLineBreaks: true});
      });

      it('should report multiple line breaks', function () {
        assert.equal(linter.checkString('div\r\r\r\ndiv').length, 1);
      });

      it('should not report single line breaks', function () {
        assert.equal(linter.checkString('div\rdiv\ndiv\r\ndiv').length, 0);
      });

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'disallow-multiple-line-breaks.pug');

        assert.equal(result.length, 5);
        assert.equal(result[0].code, 'PUG:LINT_DISALLOWMULTIPLELINEBREAKS');
        assert.equal(result[0].line, 9);
        assert.equal(result[0].column, undefined);
        assert.equal(result[1].line, 10);
        assert.equal(result[2].line, 15);
        assert.equal(result[3].line, 26);
        assert.equal(result[4].line, 44);
      });
    });
  });
}
