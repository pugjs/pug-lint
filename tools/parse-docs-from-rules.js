const fs = require('fs');
const path = require('path');
const glob = require('glob');

const commentRe = /^\/\/( )?/;

module.exports = function parseDocsFromRules() {
	const rulesPattern = path.join(__dirname, '../lib/rules/*.js');
	const docs = [];

	for (const file of glob.sync(rulesPattern)) {
		const source = fs.readFileSync(file, 'utf8');
		const lines = source.split('\n');
		let text = '';

		for (const line of lines) {
			if (!commentRe.test(line)) {
				break;
			}
			text += line.replace(commentRe, '') + '\n';
		}

		if (!text.length) {
			throw new Error(`Rule does not have documentation: ${file}`);
		}

		docs.push({ file, text });
	}

	return docs;
};
