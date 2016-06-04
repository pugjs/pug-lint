module.exports = createTest;

var assert = require('assert');

function createTest(linter) {
  describe('validateLineBreaks', function () {
    describe('CR', function () {
      before(function () {
        linter.configure({validateLineBreaks: 'CR'});
      });

      it('should not validate strings with less than two lines', function () {
        assert.equal(linter.checkString('div').length, 0);
      });

      it('should report invalid line breaks', function () {
        assert.equal(linter.checkString('div\r\ndiv').length, 1);
      });

      it('should not report valid line breaks', function () {
        assert.equal(linter.checkString('div\rdiv').length, 0);
      });
    });

    describe('LF', function () {
      before(function () {
        linter.configure({validateLineBreaks: 'LF'});
      });

      it('should report invalid line breaks', function () {
        assert.equal(linter.checkString('div\r\ndiv').length, 1);
      });

      it('should not report valid line breaks', function () {
        assert.equal(linter.checkString('div\ndiv').length, 0);
      });
    });

    describe('CRLF', function () {
      before(function () {
        linter.configure({validateLineBreaks: 'CRLF'});
      });

      it('should report invalid line breaks', function () {
        assert.equal(linter.checkString('div\rdiv').length, 1);
      });

      it('should not report valid line breaks', function () {
        assert.equal(linter.checkString('div\r\ndiv').length, 0);
      });
    });
  });
}
