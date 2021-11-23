module.exports = parseDocsFromRules;

const fs = require('fs');
const path = require('path');
const docco = require('docco');
const glob = require('glob');

function parseDocsFromRules(pliers) {
  const rulesPattern = path.join(__dirname, '../lib/rules/*.js');
  const docs = [];

  for (const file of glob.sync(rulesPattern)) {
    const source = fs.readFileSync(file, 'utf8');
    let hasDocs;

    docco.parse(file, source).map(section => {
      if (!hasDocs && section.docsText) {
        docs.push({
          file,
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
  }

  return docs;
}
