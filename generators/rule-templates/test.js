module.exports = createTest;

var assert = require('assert');

function createTest(linter, fixturesPath, test) {
  describe('<%- optionName %>', function () {
<% options.forEach(function (option) { -%>
    describe(<%- option %>, function () {
      before(function () {
        linter.configure({<%- optionName %>: <%- option %>});
      });

      it('should report <%- negative %>', function () {
        // test(source, #errors, line, col);
        test('bad template', 1, ..., ...);
        test('good template');
      });

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + '<%- filename %>.pug');

        assert.equal(result.length, ...);
        assert.equal(result[0].code, 'PUG:LINT_<%- optionName.toUpperCase() %>');
        assert.equal(result[0].line, ...);
        assert.equal(result[0].column, ...);
      });
    });
<% }); -%>
  });
}
