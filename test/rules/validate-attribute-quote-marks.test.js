module.exports = createTest;

var assert = require('assert');

function createTest(linter, fixturesPath) {
  var fixturePath = fixturesPath + 'validate-attribute-quote-marks.pug';

  describe('validateAttributeQuoteMarks', function () {
    describe('double', function () {
      before(function () {
        linter.configure({validateAttributeQuoteMarks: '"'});
      });

      it('should report invalid attribute quote marks', function () {
        assert.equal(linter.checkString('input(type=\'text\' value!=value)').length, 1);
      });

      it('should not report valid attribute quote marks', function () {
        assert.equal(linter.checkString('input(type="text" value!=value)').length, 0);
      });

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturePath);

        assert.equal(result.length, 6);
        assert.equal(result[0].code, 'PUG:LINT_VALIDATEATTRIBUTEQUOTEMARKS');
        assert.equal(result[0].line, 1);
        assert.equal(result[0].column, 7);
        assert.equal(result[1].line, 1);
        assert.equal(result[2].line, 1);
        assert.equal(result[3].line, 2);
        assert.equal(result[4].line, 2);
        assert.equal(result[5].line, 4);
      });
    });

    describe('single', function () {
      before(function () {
        linter.configure({validateAttributeQuoteMarks: '\''});
      });

      it('should report invalid attribute quote marks', function () {
        assert.equal(linter.checkString('input(type="text" value!=value)').length, 1);
      });

      it('should not report valid attribute quote marks', function () {
        assert.equal(linter.checkString('input(type=\'text\' value!=value)').length, 0);
      });

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturePath);

        assert.equal(result.length, 6);
        assert.equal(result[0].code, 'PUG:LINT_VALIDATEATTRIBUTEQUOTEMARKS');
        assert.equal(result[0].line, 2);
        assert.equal(result[0].column, 19);
        assert.equal(result[1].line, 3);
        assert.equal(result[2].line, 3);
        assert.equal(result[3].line, 3);
        assert.equal(result[4].line, 4);
        assert.equal(result[5].line, 4);
      });
    });

    describe('true', function () {
      before(function () {
        linter.configure({validateAttributeQuoteMarks: true});
      });

      it('should report inconsistent attribute quote marks', function () {
        assert.equal(linter.checkString('input(type="text" value=\'value\')').length, 1);
      });

      it('should not report consistent attribute quote marks', function () {
        assert.equal(linter.checkString('input(type=\'text\' value=\'value\')').length, 0);
      });

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturePath);

        assert.equal(result.length, 6);
        assert.equal(result[0].code, 'PUG:LINT_VALIDATEATTRIBUTEQUOTEMARKS');
        assert.equal(result[0].line, 2);
        assert.equal(result[0].column, 19);
        assert.equal(result[1].line, 3);
        assert.equal(result[2].line, 3);
        assert.equal(result[3].line, 3);
        assert.equal(result[4].line, 4);
        assert.equal(result[5].line, 4);
      });
    });
  });
}
