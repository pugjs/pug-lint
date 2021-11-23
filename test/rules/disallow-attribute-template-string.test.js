module.exports = createTest;

const assert = require('assert');

function createTest(linter, fixturesPath, test) {
  describe('disallowAttributeTemplateString', () => {
    describe('true', () => {
      before(() => {
        linter.configure({disallowAttributeTemplateString: true});
      });

      it('should report template strings', () => {
        test('a(href=`https://${site}`) Link', 1, 8);
        test('a(href=getLink(`https://${site}`)) Link');
        test('a(href=`${getLink(`https://${site}`)}`) Link', 1, 8);
        test('a(href=\n String.raw`asdf`)');
      });

      it('should not report template string not in an attribute', () => {
        test('h1= `${title} text`');
      });

      it('should report multiple errors found in file', () => {
        const result = linter.checkFile(fixturesPath + 'disallow-attribute-template-string.pug');

        assert.equal(result.length, 2);
        assert.equal(result[0].code, 'PUG:LINT_DISALLOWATTRIBUTETEMPLATESTRING');
        assert.equal(result[0].line, 1);
        assert.equal(result[0].column, 8);
      });
    });

    describe('all', () => {
      before(() => {
        linter.configure({disallowAttributeTemplateString: 'all'});
      });

      it('should report template strings', () => {
        test('a(href=`https://${site}`) Link', 1, 8);
        test('a(href=getLink(`https://${site}`)) Link', 1, 16);
        test('a(href=\n String.raw`asdf`)', 2, 12);

        const result = linter.checkString('a(href=`${getLink(`https://${site}`)}`) Link');
        assert.equal(result.length, 2);
        assert.equal(result[0].line, 1);
        assert.equal(result[0].column, 19);
        assert.equal(result[1].line, 1);
        assert.equal(result[1].column, 8);
      });

      it('should not report template string not in an attribute', () => {
        test('h1= `${title} text`');
      });

      it('should report multiple errors found in file', () => {
        const result = linter.checkFile(fixturesPath + 'disallow-attribute-template-string.pug');

        assert.equal(result.length, 5);
        assert.equal(result[0].code, 'PUG:LINT_DISALLOWATTRIBUTETEMPLATESTRING');
        assert.equal(result[0].line, 1);
        assert.equal(result[0].column, 8);
      });
    });
  });
}
