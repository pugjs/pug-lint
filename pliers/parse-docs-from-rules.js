module.exports = parseDocsFromRules;

var fs = require('fs');
var path = require('path');
var docco = require('docco');
var glob = require('glob');

function parseDocsFromRules(pliers) {
  var rulesPattern = path.join(__dirname, '../lib/rules/*.js');
  var docs = [];

  glob.sync(rulesPattern).forEach(function (file) {
    var source = fs.readFileSync(file, 'utf8');
    var hasDocs;

    docco.parse(file, source).map(function (section) {
      if (!hasDocs && section.docsText) {
        docs.push({
          file: file,
          text: section.docsText
        });
        hasDocs = true;
      }

      return true;
    });

    if (!hasDocs) {
      pliers.logger.error('Missing docs for rule:');
      throw file;
    }
  });

  return docs;
}
