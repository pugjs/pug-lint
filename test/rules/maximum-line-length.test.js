module.exports = createTest;

var assert = require('assert');

function createTest(linter) {
  describe('maximumLineLength', function () {
    describe('int', function () {
      before(function () {
        linter.configure({maximumLineLength: 40});
      });

      var ok = 'html\n' +
               '  body\n' +
               '    div This is a 40-char-long line ----\n' +
               '    p other line\n';
      var notOk = 'html\n' +
                  '  body\n' +
                  '    div This is a 41-char-long line -----\n' +
                  '    p other line\n';
      var notOk2 = 'html\n' +
                   '  body\n' +
                   '    div This is a 41-char-long line -----\n' +
                   '    p other line\n' +
                   '    div This is a 45-char-long line ---------\n' +
                   '    p other line\n';

      it('should not report normal lines', function () {
        assert.equal(linter.checkString(ok).length, 0);
      });

      it('should report lines too long', function () {
        assert.equal(linter.checkString(notOk).length, 1);
      });

      it('should report multiple errors', function () {
        var result = linter.checkString(notOk2);

        assert.equal(result.length, 2);
        assert.equal(result[0].code, 'PUG:LINT_MAXIMUMLINELENGTH');
        assert.equal(result[0].line, 3);
        assert.equal(result[0].column, undefined);
        assert.equal(result[1].code, 'PUG:LINT_MAXIMUMLINELENGTH');
        assert.equal(result[1].line, 5);
        assert.equal(result[1].column, undefined);
      });
    });
  });
}
