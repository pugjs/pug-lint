module.exports = createTest;

var assert = require('assert');

function createTest(linter, fixturesPath) {
  describe('disallowAttributeConcatenation', function () {
    describe('true', function () {
      before(function () {
        linter.configure({disallowAttributeConcatenation: true});
      });

      it('should report attribute concatenation', function () {
        assert.equal(linter.checkString('a(href=\'text \' + title) Link')[0].messages.length, 1);
        assert.equal(linter.checkString('a(href=title + \'text \') Link')[0].messages.length, 1);
        assert.equal(linter.checkString('a(href=title + "text ") Link')[0].messages.length, 1);
        assert.equal(linter.checkString('a(href=title + title)')[0].messages.length, 0);
        assert.equal(linter.checkString('img(src=\'logo.png\', alt=\'+G Logo\')')[0].messages.length, 0);
        assert.equal(linter.checkString('img(src="logo.png", alt="G+ Logo")')[0].messages.length, 0);
        assert.equal(linter.checkString('img(src=\'logo.png\', alt=\'G Logo+\')')[0].messages.length, 0);
        assert.equal(linter.checkString('img(src=\'logo.png\', alt=\'+\')')[0].messages.length, 0);
      });

      it('should not report attribute interpolation', function () {
        assert.equal(linter.checkString('a(href=\'#{title}\') Link')[0].messages.length, 0);
      });

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'disallow-attribute-concatenation.pug');

        assert.equal(result[0].messages.length, 3);
        assert.equal(result[0].messages[0].pugError.code, 'PUG:LINT_DISALLOWATTRIBUTECONCATENATION');
        assert.equal(result[0].messages[0].line, 13);
        assert.equal(result[0].messages[0].column, 16);
      });
    });
  });
}
