module.exports = createTask;

const fs = require('fs');
const path = require('path');
const parseDocsFromRules = require('./parse-docs-from-rules');

function createTask(pliers) {
  pliers('buildRuleDocs', done => {
    const docs = parseDocsFromRules(pliers);

    const concatenatedDocs = docs.map(doc => doc.text).join('\n');

    fs.writeFile(path.join(__dirname, '../docs/rules.md'), concatenatedDocs, 'utf8', error => {
      if (error) {
        pliers.logger.error('Failed to build rule docs');
        return done(error);
      }

      done();
    });
  });
}
