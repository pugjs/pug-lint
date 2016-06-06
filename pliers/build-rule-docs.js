module.exports = createTask;

var fs = require('fs');
var path = require('path');
var docco = require('docco');
var glob = require('glob');

function createTask(pliers) {
  pliers('buildRuleDocs', function (done) {
    var rulesPattern = path.join(__dirname, '../lib/rules/*.js');
    var docs = [];

    glob.sync(rulesPattern).forEach(function (file) {
      var source = fs.readFileSync(file, 'utf8');
      var hasDocs;

      docco.parse(file, source).map(function (section) {
        if (!hasDocs && section.docsText) {
          docs.push(section.docsText);
          hasDocs = true;
        }

        return true;
      });

      if (!hasDocs) {
        pliers.logger.error('Missing docs for rule:');
        throw file;
      }
    });

    fs.writeFile(path.join(__dirname, '../docs/rules.md'), docs.join('\n'), 'utf8', function (error) {
      if (error) {
        pliers.logger.error('Failed to build rule docs');
        return done(error);
      }

      done();
    });
  });
}
