module.exports = createTest;

var assert = require('assert');

function createTest(linter, fixturesPath) {
  describe('requireSpecificAttributes', function () {
    describe('object', function () {
      var options = [
        {img: 'alT'},
        {Abbr: ['title', 'laNg']},
        {'Script[aSync]': 'defer'}
      ];

      before(function () {
        linter.configure({requireSpecificAttributes: options});
      });

      it('should report missing required attributes', function () {
        assert.equal(linter.checkString('img(src=\'src\' title=\'title\')').length, 1);
        assert.equal(linter.checkString('img').length, 1);
      });

      it('should not report existing attributes', function () {
        assert.equal(linter.checkString('img(alt=\'alt\')').length, 0);
      });

      it('should not report existing bracketed attributes', function () {
        assert.equal(linter.checkString('img([alt]=\'alt\')').length, 0);
      });

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'require-specific-attributes.pug');

        assert.equal(result.length, 3);
        assert.equal(result[0].code, 'PUG:LINT_REQUIRESPECIFICATTRIBUTES');
        assert.equal(result[0].line, 2);
        assert.equal(result[0].column, 1);
        assert.equal(result[1].line, 3);
        assert.equal(result[2].line, 5);
      });
    });
  });
}
