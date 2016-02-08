module.exports = createTask

var changelog = require('changelog')
  , moment = require('moment')
  , packageDetails = require('../package.json')

function createTask (pliers) {

  pliers('buildChangelog', function (done) {

    var content = []
      , previousVersion = ''
      , changes = []

    changelog.generate(packageDetails.name, packageDetails.version).then(function (data) {
      data.versions.forEach(function (version) {
        var currentVersion = 'v' + version.version
          , versions = previousVersion + '...' + currentVersion

        if (previousVersion.length) {
          content.push('### Changes')
          content.push('[' + versions + '](' + data.project.repository + '/compare/' + versions + ')')
          content.push('')
        }

        content.push('## ' + currentVersion + ' / ' + moment(version.date).format('YYYY-MM-DD'))

        version.changes.forEach(function (change) {
          var message = change.message.split('\n')[0]

          if (message && message.match(/^[^>v]/gm)) {
            changes.push('* ' + message)
          }
        })

        if (changes.length) {
          content.push('')
          content.push('### Highlights')
          content.push.apply(content, changes)
        }

        content.push('')

        previousVersion = currentVersion
      })

      console.log(content.join('\n'))

      done()
    })

  })

}
