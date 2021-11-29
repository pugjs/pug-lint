const fs = require('fs');
const path = require('path');

const parseDocsFromRules = require('./parse-docs-from-rules');

const fullSchema = require('../schemas/_template-schema.json');
const props = fullSchema.properties;
const docs = parseDocsFromRules();
const descriptionRegex = /\n\n(?:## .*?\n\n)?([\S\s]*?)\n(?:\n|$)/;

for (const doc of docs) {
	const rule = require(doc.file).prototype;
	props[rule.name] = {
		...rule.schema,
		description: doc.text.match(descriptionRegex)[1],
		documentation: doc.text
	};
}

fs.writeFileSync(
	path.join(__dirname, '../schemas/pug-lintrc-schema.json'),
	JSON.stringify(fullSchema, null, '\t')
);
