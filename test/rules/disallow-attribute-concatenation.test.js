module.exports = createTest;

var assert = require('assert');

function createTest(linter, fixturesPath, test) {
  describe('disallowAttributeConcatenation', function () {
    describe('true', function () {
      before(function () {
        linter.configure({disallowAttributeConcatenation: true});
      });

      it('should report attribute concatenation', function () {
        test('a(href=\'text \' + title) Link', 1, 16);
        test('a(href=title + \'text \') Link', 1, 14);
        test('a(href=title+"text ") Link', 1, 13);
        test('a(href=title + title)');
        test('a(href=\'text \'\n + title) Link', 2, 2);
        test('a(href=\n  \'text \' + title) Link', 2, 11);
        test('img(src=\'logo.png\', alt=\'+G Logo\')');
        test('img(src="logo.png", alt="G+ Logo")');
        test('img(src=\'logo.png\', alt=\'G Logo+\')');
        test('img(src=\'logo.png\', alt=\'+\')');
      });

      it('should not report attribute as template string', function () {
        assert.equal(linter.checkString('a(href=`https://${link}`) Link').length, 0);
      });

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'disallow-attribute-concatenation.pug');

        assert.equal(result.length, 3);
        assert.equal(result[0].code, 'PUG:LINT_DISALLOWATTRIBUTECONCATENATION');
        assert.equal(result[0].line, 13);
        assert.equal(result[0].column, 16);
      });
    });

    describe('aggressive', function () {
      before(function () {
        linter.configure({disallowAttributeConcatenation: 'aggressive'});
      });

      it('should report attribute concatenation', function () {
        test('a(href=\'text \' + title) Link', 1, 16);
        test('a(href=title + \'text \') Link', 1, 14);
        test('a(href=title + "text ") Link', 1, 14);
        test('a(href=title + title)', 1, 14);
        test('a(href=\'text \'\n + title) Link', 2, 2);
        test('a(href=\n  \'text \' + title) Link', 2, 11);
        test('img(src=\'logo.png\', alt=\'+G Logo\')');
        test('img(src="logo.png", alt="G+ Logo")');
        test('img(src=\'logo.png\', alt=\'G Logo+\')');
        test('img(src=\'logo.png\', alt=\'+\')');
      });

      it('should not report attribute as template string', function () {
        assert.equal(linter.checkString('a(href=`https://${link}`) Link').length, 0);
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
