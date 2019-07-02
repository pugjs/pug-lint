module.exports = createTest;

var assert = require('assert');

function createTest(linter, fixturesPath) {
  var fixturePath = fixturesPath + 'validate-attribute-separator.pug';

  describe('validateAttributeSeparator', function () {
    describe('space', function () {
      before(function () {
        linter.configure({validateAttributeSeparator: ' '});
      });

      it('should report invalid attribute separator', function () {
        assert.equal(linter.checkString('input(type=\'text\'  name=\'name\'  value=\'value\')').length, 2);
      });

      it('should not report valid attribute separator', function () {
        assert.equal(linter.checkString('input(type=\'text\' name=\'name\' value=\'value\')').length, 0);
      });

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturePath);

        assert.equal(result.length, 31);
        assert.equal(result[0].code, 'PUG:LINT_VALIDATEATTRIBUTESEPARATOR');
        assert.equal(result[0].line, 3);
        assert.equal(result[0].column, 18);
        assert.equal(result[1].line, 3);
        assert.equal(result[1].column, 30);
      });

      it('should not raise error on attribute having asterisk mark in name', function () {
        assert.doesNotThrow(function () {
          linter.checkString('input(*ngIf=\'editing\' type=\'text\' name=\'name\' value=\'value\')');
        }, /Invalid regular expression/);
      });

      describe('with ellipsis mark in name', () => {
        it('reports invalid attribute separator', () => {
          const result = linter.checkString('input(type=\'text\'  ...props name=\'name\')');

          assert.equal(result.length, 1);
          assert.equal(result[0].code, 'PUG:LINT_VALIDATEATTRIBUTESEPARATOR');
          assert.equal(result[0].line, 1);
          assert.equal(result[0].column, 18);
        });

        it('does not report with valid separator', function () {
          const result = linter.checkString('input(...props type=\'text\' ...props name=\'name\' value=\'value\' ...props)');

          assert.equal(result.length, 0);
        });
      });
    });

    describe('comma', function () {
      before(function () {
        linter.configure({validateAttributeSeparator: ','});
      });

      it('should report invalid attribute separator', function () {
        assert.equal(linter.checkString('input(type=\'text\' name=\'name\' value=\'value\')').length, 2);
      });

      it('should not report valid attribute separator', function () {
        assert.equal(linter.checkString('input(type=\'text\',name=\'name\',value=\'value\')').length, 0);
      });

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturePath);

        assert.equal(result.length, 32);
        assert.equal(result[0].code, 'PUG:LINT_VALIDATEATTRIBUTESEPARATOR');
        assert.equal(result[0].line, 2);
        assert.equal(result[0].column, 18);
      });
    });

    describe('comma-space', function () {
      before(function () {
        linter.configure({validateAttributeSeparator: ', '});
      });

      it('should report invalid attribute separator', function () {
        assert.equal(linter.checkString('input(type=\'text\' name=\'name\' value=\'value\')').length, 2);
      });

      it('should not report valid attribute separator', function () {
        assert.equal(linter.checkString('input(type=\'text\', name=\'name\', value=\'value\')').length, 0);
      });

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturePath);

        assert.equal(result.length, 31);
        assert.equal(result[0].code, 'PUG:LINT_VALIDATEATTRIBUTESEPARATOR');
        assert.equal(result[0].line, 2);
        assert.equal(result[0].column, 18);
      });
    });

    describe('space-comma', function () {
      before(function () {
        linter.configure({validateAttributeSeparator: ' ,'});
      });

      it('should report invalid attribute separator', function () {
        assert.equal(linter.checkString('input(type=\'text\', name=\'name\', value=\'value\')').length, 2);
      });

      it('should not report valid attribute separator', function () {
        assert.equal(linter.checkString('input(type=\'text\' ,name=\'name\' ,value=\'value\')').length, 0);
      });

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturePath);

        assert.equal(result.length, 32);
        assert.equal(result[0].code, 'PUG:LINT_VALIDATEATTRIBUTESEPARATOR');
        assert.equal(result[0].line, 2);
        assert.equal(result[0].column, 18);
      });
    });

    describe('space-comma-space', function () {
      before(function () {
        linter.configure({validateAttributeSeparator: ' , '});
      });

      it('should report invalid attribute separator', function () {
        assert.equal(linter.checkString('input(type=\'text\' name=\'name\' value=\'value\')').length, 2);
      });

      it('should not report valid attribute separator', function () {
        assert.equal(linter.checkString('input(type=\'text\' , name=\'name\' , value=\'value\')').length, 0);
      });

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturePath);

        assert.equal(result.length, 33);
        assert.equal(result[0].code, 'PUG:LINT_VALIDATEATTRIBUTESEPARATOR');
        assert.equal(result[0].line, 2);
        assert.equal(result[0].column, 18);
      });
    });

    describe('indentation - spaces', function () {
      before(function () {
        linter.configure({
          validateAttributeSeparator: {
            separator: ' ',
            multiLineSeparator: '\n  '
          }
        });
      });

      it('should report invalid attribute separator', function () {
        assert.equal(linter.checkString('input(type=\'text\', name=\'name\', value=\'value\')').length, 2);
      });

      it('should not report valid attribute separator', function () {
        assert.equal(linter.checkString('input(type=\'text\' name=\'name\' value=\'value\')').length, 0);
      });

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturePath);

        assert.equal(result.length, 27);
        assert.equal(result[0].code, 'PUG:LINT_VALIDATEATTRIBUTESEPARATOR');
        assert.equal(result[25].line, 42);
        assert.equal(result[25].column, 1);
        assert.equal(result[26].line, 44);
        assert.equal(result[26].column, 1);
      });
    });

    describe('indentation, comma-spaces', function () {
      before(function () {
        linter.configure({
          validateAttributeSeparator: {
            separator: ', ',
            multiLineSeparator: ',\n  '
          }
        });
      });

      it('should not report valid attribute separator', function () {
        var result = linter.checkString('div(foo="1",\n  bar="{hello:\' world\',\\n  666: true}",\n  batz="2")');

        assert.equal(result.length, 0);

        result = linter.checkFile(fixturesPath + 'validate-attribute-separator--multiline.pug');

        assert.equal(result.length, 0);
      });
    });
  });
}
