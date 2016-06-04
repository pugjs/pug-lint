module.exports = createTest;

var assert = require('assert');

function createTest(linter, fixturesPath) {
  describe('requireLineFeedAtFileEnd', function () {
    describe('true', function () {
      before(function () {
        linter.configure({requireLineFeedAtFileEnd: true});
      });

      it('should report missing line feed', function () {
        assert.equal(linter.checkString('div').length, 1);
      });

      it('should not report line feed', function () {
        assert.equal(linter.checkString('div\r').length, 0);
        assert.equal(linter.checkString('div\n').length, 0);
        assert.equal(linter.checkString('div\r\n').length, 0);
        assert.equal(linter.checkString('p.\r\rn  Test\r\n').length, 0);
      });

      it('should report missing line feed at file end', function () {
        var result = linter.checkFile(fixturesPath + 'require-line-feed-at-file-end--missing.pug');

        assert.equal(result.length, 1);
        assert.equal(result[0].code, 'PUG:LINT_REQUIRELINEFEEDATFILEEND');
        assert.equal(result[0].line, 2);
        assert.equal(result[0].column, undefined);
      });

      it('should not report line feed at file end', function () {
        var result = linter.checkFile(fixturesPath + 'require-line-feed-at-file-end.pug');

        assert.equal(result.length, 0);
      });
    });
  });
}
