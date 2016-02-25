module.exports = createTask

var changelog = require('changelog')
  , fs = require('fs')
  , moment = require('moment')
  , packageDetails = require('../package.json')
  , semverRegex = require('semver-regex')

function createTask (pliers) {

  pliers('buildChangelog', function (done) {

    var content = []
      , changes = []
      , currentVersion = 'v' + packageDetails.version
      , previousVersion = ''
      , versions
      , filePath = __dirname + '/../CHANGELOG.md'
      , fileContent = fs.readFileSync(filePath, 'utf8')
      , complete = false

    changelog.generate(packageDetails.homepage).then(function (data) {
      var version = data.versions[0]

      version.changes.forEach(function (change) {
        if (complete) return

        var message = change.message.split('\n')[0]

        if (message) {
          if (semverRegex().test(message)) {
            if (previousVersion.length) {
              complete = true
              return
            }

            previousVersion = message
          } else if (message.match(/^[^>]/)) {
            changes.push('* ' + message)
          }
        }
      })

      if (previousVersion.length && previousVersion !== currentVersion) {
        versions = previousVersion + '...' + currentVersion

        content.push('## ' + currentVersion + ' / ' + moment().format('YYYY-MM-DD'))
        content.push('')

        if (changes.length) {
          content.push('### Highlights')
          content.push.apply(content, changes)
          content.push('')
        }

        content.push('### Changes')
        content.push('[' + versions + '](' + data.project.repository + '/compare/' + versions + ')')
        content.push('')
      }

      if (!content.length) return done()

      content.push(fileContent)

      fs.writeFile(filePath, content.join('\n'), function (err) {
        if (err) return done(err)

        return done()
      })
    })

  })

}
