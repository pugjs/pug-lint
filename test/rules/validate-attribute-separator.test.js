module.exports = createTest

var assert = require('assert')

function createTest(linter, fixturesPath) {

  var fixturePath = fixturesPath + 'validate-attribute-separator.jade'

  describe('validateAttributeSeparator', function () {

    describe('null', function () {

      it('should be disabled if options are null', function () {
        linter.configure({ validateAttributeSeparator: null })

        assert.equal(linter.getConfiguredRules().length, 0)
      })

    })

    describe('space', function () {

      before(function () {
        linter.configure({ validateAttributeSeparator: ' ' })
      })

      it('should report invalid attribute separator', function () {
        assert.equal(linter.checkString('input(type=\'text\'  name=\'name\'  value=\'value\')').getErrorCount(), 1)
      })

      it('should not report valid attribute separator', function () {
        assert.equal(linter.checkString('input(type=\'text\' name=\'name\' value=\'value\')').getErrorCount(), 0)
      })

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturePath)

        assert.equal(result.getErrorCount(), 9)
        assert.equal(result.getError(0).rule, 'validateAttributeSeparator')
      })

    })

    describe('comma', function () {

      before(function () {
        linter.configure({ validateAttributeSeparator: ',' })
      })

      it('should report invalid attribute separator', function () {
        assert.equal(linter.checkString('input(type=\'text\' name=\'name\' value=\'value\')').getErrorCount(), 1)
      })

      it('should not report valid attribute separator', function () {
        assert.equal(linter.checkString('input(type=\'text\',name=\'name\',value=\'value\')').getErrorCount(), 0)
      })

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturePath)

        assert.equal(result.getErrorCount(), 9)
        assert.equal(result.getError(0).rule, 'validateAttributeSeparator')
      })

    })

    describe('comma-space', function () {

      before(function () {
        linter.configure({ validateAttributeSeparator: ', ' })
      })

      it('should report invalid attribute separator', function () {
        assert.equal(linter.checkString('input(type=\'text\' name=\'name\' value=\'value\')').getErrorCount(), 1)
      })

      it('should not report valid attribute separator', function () {
        assert.equal(linter.checkString('input(type=\'text\', name=\'name\', value=\'value\')').getErrorCount(), 0)
      })

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturePath)

        assert.equal(result.getErrorCount(), 9)
        assert.equal(result.getError(0).rule, 'validateAttributeSeparator')
      })

    })

    describe('space-comma', function () {

      before(function () {
        linter.configure({ validateAttributeSeparator: ' ,' })
      })

      it('should report invalid attribute separator', function () {
        assert.equal(linter.checkString('input(type=\'text\', name=\'name\', value=\'value\')').getErrorCount(), 1)
      })

      it('should not report valid attribute separator', function () {
        assert.equal(linter.checkString('input(type=\'text\' ,name=\'name\' ,value=\'value\')').getErrorCount(), 0)
      })

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturePath)

        assert.equal(result.getErrorCount(), 9)
        assert.equal(result.getError(0).rule, 'validateAttributeSeparator')
      })

    })

    describe('space-comma-space', function () {

      before(function () {
        linter.configure({ validateAttributeSeparator: ' , ' })
      })

      it('should report invalid attribute separator', function () {
        assert.equal(linter.checkString('input(type=\'text\' name=\'name\' value=\'value\')').getErrorCount(), 1)
      })

      it('should not report valid attribute separator', function () {
        assert.equal(linter.checkString('input(type=\'text\' , name=\'name\' , value=\'value\')').getErrorCount(), 0)
      })

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturePath)

        assert.equal(result.getErrorCount(), 9)
        assert.equal(result.getError(0).rule, 'validateAttributeSeparator')
      })

    })

  })

}
