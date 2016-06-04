module.exports = createTest;

var assert = require('assert');

function createTest(linter, fixturesPath) {
  describe('requireIdLiteralsBeforeAttributes', function () {
    describe('true', function () {
      before(function () {
        linter.configure({requireIdLiteralsBeforeAttributes: true});
      });

      it('should report attributes before ID literals', function () {
        assert.equal(linter.checkString('input(type=\'text\')#id.class').length, 1);
      });

      it('should not report ID literals before attributes', function () {
        assert.equal(linter.checkString('input#id.class(type=\'text\')').length, 0);
      });

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'require-id-literals-before-attributes.pug');

        assert.equal(result.length, 2);
        assert.equal(result[0].code, 'PUG:LINT_REQUIREIDLITERALSBEFOREATTRIBUTES');
        assert.equal(result[0].line, 1);
        assert.equal(result[0].column, 19);
      });
    });
  });
}
