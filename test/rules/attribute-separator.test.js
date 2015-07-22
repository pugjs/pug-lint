module.exports = createTest

var assert = require('assert')

function createTest(linter) {

  describe('attributeSeparator', function () {

    describe('null', function () {

      it('should be disabled if options are null', function () {
        linter.configure({ attributeSeparator: null })

        assert.equal(linter.getConfiguredRules().length, 0)
      })

    })

    describe('space', function () {

      before(function () {
        linter.configure({ attributeSeparator: ' ' })
      })

      it('should report invalid attribute separator', function () {
        assert.equal(linter.checkString('input(type=\'text\'  name=\'name\'  value=\'value\')').getErrorCount(), 1)
      })

      it('should not report valid attribute separator', function () {
        assert.equal(linter.checkString('input(type=\'text\' name=\'name\' value=\'value\')').getErrorCount(), 0)
      })

    })

    describe('comma', function () {

      before(function () {
        linter.configure({ attributeSeparator: ',' })
      })

      it('should report invalid attribute separator', function () {
        assert.equal(linter.checkString('input(type=\'text\' name=\'name\' value=\'value\')').getErrorCount(), 1)
      })

      it('should not report valid attribute separator', function () {
        assert.equal(linter.checkString('input(type=\'text\',name=\'name\',value=\'value\')').getErrorCount(), 0)
      })

    })

    describe('comma-space', function () {

      before(function () {
        linter.configure({ attributeSeparator: ', ' })
      })

      it('should report invalid attribute separator', function () {
        assert.equal(linter.checkString('input(type=\'text\' name=\'name\' value=\'value\')').getErrorCount(), 1)
      })

      it('should not report valid attribute separator', function () {
        assert.equal(linter.checkString('input(type=\'text\', name=\'name\', value=\'value\')').getErrorCount(), 0)
      })

    })

    describe('space-comma', function () {

      before(function () {
        linter.configure({ attributeSeparator: ' ,' })
      })

      it('should report invalid attribute separator', function () {
        assert.equal(linter.checkString('input(type=\'text\', name=\'name\', value=\'value\')').getErrorCount(), 1)
      })

      it('should not report valid attribute separator', function () {
        assert.equal(linter.checkString('input(type=\'text\' ,name=\'name\' ,value=\'value\')').getErrorCount(), 0)
      })

    })

    describe('space-comma-space', function () {

      before(function () {
        linter.configure({ attributeSeparator: ' , ' })
      })

      it('should report invalid attribute separator', function () {
        assert.equal(linter.checkString('input(type=\'text\' name=\'name\' value=\'value\')').getErrorCount(), 1)
      })

      it('should not report valid attribute separator', function () {
        assert.equal(linter.checkString('input(type=\'text\' , name=\'name\' , value=\'value\')').getErrorCount(), 0)
      })

    })

  })

}
