module.exports = createTest;

var assert = require('assert');

function createTest(linter, fixturesPath, test) {
  describe('validateTemplateString', function () {
    describe('variable', function () {
      before(function () {
        linter.configure({validateTemplateString: ['variable']});
      });

      it('should report unnecessary template string', function () {
        test('p #{`${text}`}', 1, 5);
        test('p= `${text}`', 1, 4);
        test('span(class=`${text}`)', 1, 12);
        test('- `${text}`');
        test('p #{`text`}');
        test('p= tagged`${text}`');
      });

      it('should report multiple errors found in Pug file', function () {
        var result = linter.checkFile(fixturesPath + 'validate-template-string.pug');

        assert.equal(result.length, 3);
        assert.equal(result[0].code, 'PUG:LINT_VALIDATETEMPLATESTRING');
        assert.equal(result[0].line, 1);
        assert.equal(result[0].column, 5);
      });
    });

    describe('string', function () {
      before(function () {
        linter.configure({validateTemplateString: ['string']});
      });

      it('should report unnecessary template string', function () {
        test('p #{`text`}', 1, 5);
        test('p= `text`', 1, 4);
        test('span(class=`text`)', 1, 12);
        test('- `text`');
        test('p #{`${text}`}');
        test('p= tagged`text`');
      });

      it('should report multiple errors found in Pug file', function () {
        var result = linter.checkFile(fixturesPath + 'validate-template-string.pug');

        assert.equal(result.length, 3);
        assert.equal(result[0].code, 'PUG:LINT_VALIDATETEMPLATESTRING');
        assert.equal(result[0].line, 4);
        assert.equal(result[0].column, 5);
      });
    });

    describe('concatenation', function () {
      before(function () {
        linter.configure({validateTemplateString: ['concatenation']});
      });

      it('should report unnecessary template string concatenation', function () {
        test('p #{`te${xt}` + text}', 1, 15);
        test('p= "text" + `${te}xt`', 1, 11);
        test('span(class=`${tex}t` + `t${ext}`)', 1, 22);
        test('- `text` + `text`');
      });

      it('should not report other operators', function () {
        test('p #{`te${xt}` - text}');
        test('p= "text" * `${te}xt`');
        test('span(class=`${tex}t` / `t${ext}`)');
      });

      it('should report multiple errors found in Pug file', function () {
        var result = linter.checkFile(fixturesPath + 'validate-template-string.pug');

        assert.equal(result.length, 3);
        assert.equal(result[0].code, 'PUG:LINT_VALIDATETEMPLATESTRING');
        assert.equal(result[0].line, 7);
        assert.equal(result[0].column, 15);
      });
    });

    describe('true', function () {
      before(function () {
        linter.configure({validateTemplateString: true});
      });

      it('should enable all subrules', function () {
        test('p #{`${text}`}', 1, 5);
        test('p= `${text}`', 1, 4);
        test('span(class=`${text}`)', 1, 12);
        test('p #{`text`}', 1, 5);
        test('p= `text`', 1, 4);
        test('span(class=`text`)', 1, 12);
        test('p #{`te${xt}` + text}', 1, 15);
        test('p= "text" + `${te}xt`', 1, 11);
        test('span(class=`${tex}t` + `t${ext}`)', 1, 22);

        test('- `${text}`');
        test('p= tagged`${text}`');
        test('- `text`');
        test('p= tagged`text`');
        test('- `text` + `text`');
      });
    });
  });
}
