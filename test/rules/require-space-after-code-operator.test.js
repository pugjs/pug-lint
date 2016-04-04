module.exports = createTest

var assert = require('assert')

function createTest (linter, fixturesPath) {

  describe('requireSpaceAfterCodeOperator', function () {

    describe('true', function () {

      before(function () {
        linter.configure({ requireSpaceAfterCodeOperator: true })
      })

      it('should report missing space after unbuffered operator', function () {
        assert.equal(linter.checkString('-This is code').length, 1)
      })

      it('should report missing space after buffered operator', function () {
        assert.equal(linter.checkString('p=\'This code is <escaped>\'').length, 1)
        assert.equal(linter.checkString('p#id=\'This code is <escaped>\'').length, 1)
        assert.equal(linter.checkString('p.class=\'This code is <escaped>\'').length, 1)
        assert.equal(linter.checkString('p.class#id=\'This code is <escaped>\'').length, 1)
        assert.equal(linter.checkString('p(attr="val")=\'This code is <escaped>\'').length, 1)
        assert.equal(linter.checkString('p#id(attr="val")=\'This code is <escaped>\'').length, 1)
        assert.equal(linter.checkString('p.class(attr="val")=\'This code is <escaped>\'').length, 1)
        assert.equal(linter.checkString('p.class#id(attr="val")=\'This code is <escaped>\'').length, 1)
        assert.equal(linter.checkString('dc:creator=authorName').length, 1)
        assert.equal(linter.checkString('guid(isPermaLink=\'true\')=pageUrl').length, 1)
        assert.equal(linter.checkString('tr: div=test').length, 1)
        assert.equal(linter.checkString('a(href=\'/#{year}/\', rel=\'directory\')=year').length, 1)
      })

      it('should report missing space after escaped buffered operator', function () {
        assert.equal(linter.checkString('p!=\'This code is not <escaped>\'').length, 1)
        assert.equal(linter.checkString('p#id!=\'This code is not <escaped>\'').length, 1)
        assert.equal(linter.checkString('p.class!=\'This code is not <escaped>\'').length, 1)
        assert.equal(linter.checkString('p.class#id!=\'This code is not <escaped>\'').length, 1)
        assert.equal(linter.checkString('p(attr="val")!=\'This code is not <escaped>\'').length, 1)
        assert.equal(linter.checkString('p#id(attr="val")!=\'This code is not <escaped>\'').length, 1)
        assert.equal(linter.checkString('p.class(attr="val")!=\'This code is not <escaped>\'').length, 1)
        assert.equal(linter.checkString('p.class#id(attr="val")!=\'This code is not <escaped>\'').length, 1)
        assert.equal(linter.checkString('dc:creator!=authorName').length, 1)
        assert.equal(linter.checkString('guid(isPermaLink=\'true\')!=pageUrl').length, 1)
        assert.equal(linter.checkString('tr: div!=test').length, 1)
        assert.equal(linter.checkString('a(href=\'/#{year}/\', rel=\'directory\')!=year').length, 1)
      })

      it('should not report space after unbuffered operator', function () {
        assert.equal(linter.checkString('- This is code').length, 0)
      })

      it('should not report space after buffered operator', function () {
        assert.equal(linter.checkString('p= \'This code is <escaped>\'').length, 0)
        assert.equal(linter.checkString('p#id= \'This code is <escaped>\'').length, 0)
        assert.equal(linter.checkString('p.class= \'This code is <escaped>\'').length, 0)
        assert.equal(linter.checkString('p.class#id= \'This code is <escaped>\'').length, 0)
        assert.equal(linter.checkString('p(attr="val")= \'This code is <escaped>\'').length, 0)
        assert.equal(linter.checkString('p#id(attr="val")= \'This code is <escaped>\'').length, 0)
        assert.equal(linter.checkString('p.class(attr="val")= \'This code is <escaped>\'').length, 0)
        assert.equal(linter.checkString('p.class#id(attr="val")= \'This code is <escaped>\'').length, 0)
        assert.equal(linter.checkString('dc:creator= authorName').length, 0)
        assert.equal(linter.checkString('guid(isPermaLink=\'true\')= pageUrl').length, 0)
        assert.equal(linter.checkString('tr: div= test').length, 0)
        assert.equal(linter.checkString('a(href=\'/#{year}/\', rel=\'directory\')= year').length, 0)
      })

      it('should not report space after unbuffered operator', function () {
        assert.equal(linter.checkString('p!= \'This code is not <escaped>\'').length, 0)
        assert.equal(linter.checkString('p#id!= \'This code is <escaped>\'').length, 0)
        assert.equal(linter.checkString('p.class!= \'This code is <escaped>\'').length, 0)
        assert.equal(linter.checkString('p.class#id!= \'This code is <escaped>\'').length, 0)
        assert.equal(linter.checkString('p(attr="val")!= \'This code is <escaped>\'').length, 0)
        assert.equal(linter.checkString('p#id(attr="val")!= \'This code is <escaped>\'').length, 0)
        assert.equal(linter.checkString('p.class(attr="val")!= \'This code is <escaped>\'').length, 0)
        assert.equal(linter.checkString('p.class#id(attr="val")!= \'This code is <escaped>\'').length, 0)
        assert.equal(linter.checkString('dc:creator!= authorName').length, 0)
        assert.equal(linter.checkString('guid(isPermaLink=\'true\')!= pageUrl').length, 0)
        assert.equal(linter.checkString('tr: div!= test').length, 0)
        assert.equal(linter.checkString('a(href=\'/#{year}/\', rel=\'directory\')!= year').length, 0)
      })

      it('should report multiple errors found in file', function () {
        var result = linter.checkFile(fixturesPath + 'require-space-after-code-operator.pug')

        assert.equal(result.length, 17)
        assert.equal(result[0].code, 'PUG:LINT_REQUIRESPACEAFTERCODEOPERATOR')
      })

    })

  })

}
