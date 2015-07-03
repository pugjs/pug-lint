var assert = require('assert')
  , jadelint = require('../lib/jadelint')

describe('reporting', function () {

  it('should lint Jade', function (done) {
    jadelint(function (err, result) {
      assert(!err, err)
      assert.equal(result, true, result)
      done()
    })
  })

})
