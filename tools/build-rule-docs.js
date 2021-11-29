const fs = require('fs');
const path = require('path');
const parseDocsFromRules = require('./parse-docs-from-rules');

const docs = parseDocsFromRules();
const concatenatedDocs = docs.map((doc) => doc.text).join('\n');
const docsDir = path.join(__dirname, '..', 'docs');

if (!fs.existsSync(docsDir)) {
	fs.mkdirSync(path.join(__dirname, '..', 'docs'));
}

fs.writeFileSync(path.join(__dirname, '../docs/rules.md'), concatenatedDocs);
