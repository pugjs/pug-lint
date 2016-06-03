module.exports = createTest;

var assert = require('assert');

function createTest(linter, fixturesPath) {
  describe('disallowIdLiteralsBeforeAttributes', function () {
    describe('true', function () {
      before(function () {
        linter.configure({disallowIdLiteralsBeforeAttributes: true});
      });

      it('should report class literals before attributes', function () {
        assert.equal(linter.checkString('input#id.class(type=\'text\')').length, 1);
      });

      it('should not report attributes before class literals', function () {
        assert.equal(linter.checkString('input(type=\'text\')#id.class').length, 0);
      });

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'disallow-id-literals-before-attributes.pug');

        assert.equal(result.length, 2);
        assert.equal(result[0].code, 'PUG:LINT_DISALLOWIDLITERALSBEFOREATTRIBUTES');
        assert.equal(result[0].line, 2);
        assert.equal(result[0].column, 10);
      });
    });
  });
}
