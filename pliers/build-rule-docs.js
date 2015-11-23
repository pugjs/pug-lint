/* istanbul ignore next */
module.exports = createTask

var docco = require('docco')
  , fs = require('fs')
  , glob = require('glob')

/* istanbul ignore next */
function createTask (pliers) {

    pliers('buildRuleDocs', function (done) {

      var rulesPattern = __dirname + '/../lib/rules/*.js'
        , docs = []

      glob.sync(rulesPattern).forEach(function (file) {
        var source = fs.readFileSync(file, 'utf8')
          , hasDocs

        docco.parse(file, source).map(function (section) {
          if (!hasDocs && section.docsText) {
            docs.push(section.docsText)
            hasDocs = true
          }
        })

        if (!hasDocs) {
          pliers.logger.error('Missing docs for rule:')
          throw file
        }
      })

      fs.writeFile(__dirname + '/../docs/rules.md', docs.join('\n'), 'utf8', function (error) {
        if (error) {
          pliers.logger.error('Failed to build rule docs')
          return done(error)
        }

        done()
      })

    })

}
