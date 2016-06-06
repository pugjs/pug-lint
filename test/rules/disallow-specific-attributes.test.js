module.exports = createTest;

var assert = require('assert');

function createTest(linter, fixturesPath) {
  var fixturePath = fixturesPath + 'disallow-specific-attributes.pug';

  describe('disallowSpecificAttributes', function () {
    describe('string', function () {
      before(function () {
        linter.configure({disallowSpecificAttributes: 'Title'});
      });

      it('should report disallowed attributes', function () {
        assert.equal(linter.checkString('div(title=\'title\')').length, 1);
      });

      it('should not report allowed attributes', function () {
        assert.equal(linter.checkString('div(class=\'class\')').length, 0);
      });

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturePath);

        assert.equal(result.length, 2);
        assert.equal(result[0].code, 'PUG:LINT_DISALLOWSPECIFICATTRIBUTES');
        assert.equal(result[0].line, 1);
        assert.equal(result[0].column, 26);
      });
    });

    describe('array', function () {
      before(function () {
        linter.configure({disallowSpecificAttributes: ['Title', 'alt']});
      });

      it('should report disallowed attributes', function () {
        assert.equal(linter.checkString('div(title=\'title\', a=\'a\')').length, 1);
      });

      it('should not report allowed attributes', function () {
        assert.equal(linter.checkString('div(class=\'class\')').length, 0);
      });

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturePath);

        assert.equal(result.length, 3);
        assert.equal(result[0].code, 'PUG:LINT_DISALLOWSPECIFICATTRIBUTES');
        assert.equal(result[0].line, 1);
        assert.equal(result[0].column, 26);
      });
    });

    describe('object', function () {
      var options = [
        {div: ['A', 'c']},
        {img: 'alt'},
        {Span: ['title']}
      ];

      before(function () {
        linter.configure({disallowSpecificAttributes: options});
      });

      it('should report disallowed attributes', function () {
        assert.equal(linter.checkString('div(title=\'title\', a=\'a\', b=\'b\')').length, 1);
      });

      it('should not report allowed attributes', function () {
        assert.equal(linter.checkString('div(class=\'title\')\r\nimg(title=\'title\')').length, 0);
      });

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturePath);

        assert.equal(result.length, 4);
        assert.equal(result[0].code, 'PUG:LINT_DISALLOWSPECIFICATTRIBUTES');
        assert.equal(result[0].line, 1);
        assert.equal(result[0].column, 5);
      });
    });
  });
}
