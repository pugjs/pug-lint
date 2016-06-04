module.exports = createTest;

var assert = require('assert');

function createTest(linter, fixturesPath) {
  describe('disallowBlockExpansion', function () {
    describe('true', function () {
      before(function () {
        linter.configure({disallowBlockExpansion: true});
      });

      it('should report block expansion operator', function () {
        assert.equal(linter.checkString('p: strong text').length, 1);
      });

      it('should report tag multiple block expansion operators', function () {
        assert.equal(linter.checkString('table: tr: td text').length, 2);
      });

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'disallow-block-expansion.pug');

        assert.equal(result.length, 6);
        assert.equal(result[0].code, 'PUG:LINT_DISALLOWBLOCKEXPANSION');
        assert.equal(result[0].line, 4);
        assert.equal(result[0].column, 5);
        assert.equal(result[1].line, 6);
        assert.equal(result[2].line, 6);
        assert.equal(result[3].line, 8);
        assert.equal(result[4].line, 8);
        assert.equal(result[5].line, 8);
      });
    });
  });
}
