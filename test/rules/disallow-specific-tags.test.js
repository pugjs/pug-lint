module.exports = createTest;

var assert = require('assert');

function createTest(linter, fixturesPath) {
  var fixturePath = fixturesPath + 'disallow-specific-tags.pug';

  describe('disallowSpecificTags', function () {
    describe('string', function () {
      before(function () {
        linter.configure({disallowSpecificTags: 'B'});
      });

      it('should report disallowed tags', function () {
        assert.equal(linter.checkString('b bold text').length, 1);
      });

      it('should not report allowed tags', function () {
        assert.equal(linter.checkString('i italic text').length, 0);
      });

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturePath);

        assert.equal(result.length, 2);
        assert.equal(result[0].code, 'PUG:LINT_DISALLOWSPECIFICTAGS');
        assert.equal(result[0].line, 2);
        assert.equal(result[0].column, 4);
      });
    });

    describe('array', function () {
      before(function () {
        linter.configure({disallowSpecificTags: ['b', 'S']});
      });

      it('should report disallowed tags', function () {
        assert.equal(linter.checkString('b bold text').length, 1);
      });

      it('should not report allowed tags', function () {
        assert.equal(linter.checkString('i italic text').length, 0);
      });

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturePath);

        assert.equal(result.length, 4);
        assert.equal(result[0].code, 'PUG:LINT_DISALLOWSPECIFICTAGS');
        assert.equal(result[0].line, 2);
        assert.equal(result[0].column, 4);
      });
    });
  });
}
