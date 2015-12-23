module.exports = createTask

var changelog = require('changelog')
  , packageDetails = require('../package.json')

function createTask (pliers) {

  pliers('buildChangelog', function (done) {

    var content = []
      , previousVersion = ''

    changelog.generate(packageDetails.name, packageDetails.version).then(function (data) {
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

        version.changes.forEach(function (change) {
          var message = change.message.split('\n')[0]

          if (message && message.match(/^[^>v]/gm)) {
            content.push('* ' + message)
          }
        })

        content.push('')

        previousVersion = currentVersion
      })

      console.log(content.join('\n'))

      done()
    })

  })

}
