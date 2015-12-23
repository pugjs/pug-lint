module.exports = createTask

var changelog = require('changelog')
  // , packageDetails = require('../package.json')

function createTask (pliers) {

  pliers('buildChangelog', function (done) {

    var content = []
      , previousVersion = ''

    changelog.generate('gulp').then(function (data) {
      data.versions.forEach(function (version) {
        var currentVersion = 'v' + version.version
          , versions = previousVersion + '...' + currentVersion

        if (previousVersion.length) {
          content.push('### Changes')
          content.push('[' + versions + '](' + data.project.repository + '/compare/' + versions + ')')
          content.push('')
        }

        content.push('## ' + currentVersion + ' / ' + version.date)
        content.push('')
        content.push('### Highlights')

        data.versions.forEach(function (version) {
          content.push('* ' + version.message)
        })

        content.push('')

        previousVersion = currentVersion
      })

      console.log(content.join('\n'))

      done()
    })

  })

}
