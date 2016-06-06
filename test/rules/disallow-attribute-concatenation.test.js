module.exports = createTest;

var assert = require('assert');

function createTest(linter, fixturesPath) {
  describe('disallowAttributeConcatenation', function () {
    describe('true', function () {
      before(function () {
        linter.configure({disallowAttributeConcatenation: true});
      });

      it('should report attribute concatenation', function () {
        assert.equal(linter.checkString('a(href=\'text \' + title) Link').length, 1);
        assert.equal(linter.checkString('a(href=title + \'text \') Link').length, 1);
        assert.equal(linter.checkString('a(href=title + "text ") Link').length, 1);
        assert.equal(linter.checkString('a(href=title + title)').length, 0);
        assert.equal(linter.checkString('img(src=\'logo.png\', alt=\'+G Logo\')').length, 0);
        assert.equal(linter.checkString('img(src="logo.png", alt="G+ Logo")').length, 0);
        assert.equal(linter.checkString('img(src=\'logo.png\', alt=\'G Logo+\')').length, 0);
        assert.equal(linter.checkString('img(src=\'logo.png\', alt=\'+\')').length, 0);
      });

      it('should not report attribute interpolation', function () {
        assert.equal(linter.checkString('a(href=\'#{title}\') Link').length, 0);
        assert.equal(linter.checkString('img(src="logo.png", alt="Logo + \'Claim\'")').length, 0);
        assert.equal(linter.checkString('img(src="jsvar + \'.png\'")').length, 0);
      });

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'disallow-attribute-concatenation.pug');

        assert.equal(result.length, 3);
        assert.equal(result[0].code, 'PUG:LINT_DISALLOWATTRIBUTECONCATENATION');
        assert.equal(result[0].line, 13);
        assert.equal(result[0].column, 16);
      });
    });
  });
}
