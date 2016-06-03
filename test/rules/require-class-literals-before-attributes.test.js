module.exports = createTest;

var assert = require('assert');

function createTest(linter, fixturesPath) {
  describe('requireClassLiteralsBeforeAttributes', function () {
    describe('true', function () {
      before(function () {
        linter.configure({requireClassLiteralsBeforeAttributes: true});
      });

      it('should report attributes before class literals', function () {
        assert.equal(linter.checkString('input(type=\'text\')#id.class').length, 1);
      });

      it('should not report class literals before attributes', function () {
        assert.equal(linter.checkString('input#id.class(type=\'text\')').length, 0);
        assert.equal(linter.checkString('a(href=\'/#{year}/#{month}/\') #{monthName}#[span.hidden #{year}]').length, 0);
      });

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'require-class-literals-before-attributes.pug');

        assert.equal(result.length, 2);
        assert.equal(result[0].code, 'PUG:LINT_REQUIRECLASSLITERALSBEFOREATTRIBUTES');
        assert.equal(result[0].line, 1);
        assert.equal(result[0].column, 22);
      });
    });
  });
}
