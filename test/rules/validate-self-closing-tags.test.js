module.exports = createTest;

var assert = require('assert');

function createTest(linter, fixturesPath) {
  describe('validateSelfClosingTags', function () {
    describe('true', function () {
      before(function () {
        linter.configure({validateSelfClosingTags: true});
      });

      it('should report unnecessary self closing tags', function () {
        assert.equal(linter.checkString('area/').length, 1);
      });

      it('should not report custom self closing tags', function () {
        assert.equal(linter.checkString('foo/').length, 0);
      });

      it('should report multiple errors found in HTML file', function () {
        var result = linter.checkFile(fixturesPath + 'validate-self-closing-tags--html.pug');

        assert.equal(result.length, 16);
        assert.equal(result[0].code, 'PUG:LINT_VALIDATESELFCLOSINGTAGS');
        assert.equal(result[0].line, 20);
        assert.equal(result[0].column, 5);
      });

      it('should not report any errors in XML file', function () {
        var result = linter.checkFile(fixturesPath + 'validate-self-closing-tags--xml.pug');

        assert.equal(result.length, 0);
      });
    });
  });
}
