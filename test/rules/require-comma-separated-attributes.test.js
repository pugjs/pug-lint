var assert = require('assert')
  , jadelint = require('../../lib/jadelint')

describe('requireCommaSeparatedAttributes', function () {

  it('should lint Jade', function (done) {
    var files = [ __dirname + '/../fixtures/test.jade' ]

    jadelint(files, function (err, errors) {
      assert(!err, err)
      assert.equal(errors.length, 0, errors.length)
      done()
    })
  })

})
