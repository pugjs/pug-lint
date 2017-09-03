module.exports = createTest;

var assert = require('assert');

function createTest(linter) {
  describe('disallowTrailingSpaces', function () {
    describe('true', function () {
      before(function () {
        linter.configure({disallowTrailingSpaces: true});
      });

      var ok = 'html\n' +
               '  head\n' +
               '\n' +
               '  body\n' +
               '    div Some text.\n' +
               '    p Footer.\n' +
               '\n';
      var notOk = 'html\n' +
                  '  head \t\n' +
                  '\t \t \n' +
                  '  body\n' +
                  '    div Some text. \n' +
                  '    p Footer.\n' +
                  ' \n';

      it('should not report normal lines', function () {
        assert.equal(linter.checkString(ok).length, 0);
      });

      it('should report lines with trailing spaces', function () {
        var result = linter.checkString(notOk);

        assert.equal(result.length, 4);
        assert.equal(result[0].code, 'PUG:LINT_DISALLOWTRAILINGSPACES');
        assert.equal(result[0].line, 2);
        assert.equal(result[0].column, 7);
        assert.equal(result[1].code, 'PUG:LINT_DISALLOWTRAILINGSPACES');
        assert.equal(result[1].line, 3);
        assert.equal(result[1].column, 1);
        assert.equal(result[2].code, 'PUG:LINT_DISALLOWTRAILINGSPACES');
        assert.equal(result[2].line, 5);
        assert.equal(result[2].column, 19);
        assert.equal(result[3].code, 'PUG:LINT_DISALLOWTRAILINGSPACES');
        assert.equal(result[3].line, 7);
        assert.equal(result[3].column, 1);
      });
    });
  });
}
