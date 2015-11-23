var glob = require('glob')
  , Linter = require('../lib/linter')

describe('reporters', function () {

  var linter = new Linter()
    , tests = []

  linter.configure({ disallowBlockExpansion: true })

  glob.sync(__dirname + '/reporters/*.test.js').forEach(function (file) {
    tests.push(require(file))
  })

  tests.forEach(function (test) {
    test(linter)
  })

})
