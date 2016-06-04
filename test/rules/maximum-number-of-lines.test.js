module.exports = createTest;

var assert = require('assert');

function createTest(linter, fixturesPath) {
  describe('maximumNumberOfLines', function () {
    describe('int', function () {
      before(function () {
        linter.configure({maximumNumberOfLines: 3});
      });

      it('should report excessive number of lines', function () {
        assert.equal(linter.checkString('p\r\np\r\np\r\n').length, 1);
      });

      it('should not report correct number of lines', function () {
        assert.equal(linter.checkString('p\r\np\r\n').length, 0);
      });

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'maximum-number-of-lines.pug');

        assert.equal(result.length, 1);
        assert.equal(result[0].code, 'PUG:LINT_MAXIMUMNUMBEROFLINES');
        assert.equal(result[0].line, 4);
        assert.equal(result[0].column, undefined);
      });
    });
  });
}
