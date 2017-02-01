module.exports = createTask;

var fs = require('fs');
var path = require('path');
var parseDocsFromRules = require('./parse-docs-from-rules');

function createTask(pliers) {
  pliers('buildRuleDocs', function (done) {
    var docs = parseDocsFromRules(pliers);

    var concatenatedDocs = docs.map(function (doc) {
      return doc.text;
    }).join('\n');

    fs.writeFile(path.join(__dirname, '../docs/rules.md'), concatenatedDocs, 'utf8', function (error) {
      if (error) {
        pliers.logger.error('Failed to build rule docs');
        return done(error);
      }

      done();
    });
  });
}
