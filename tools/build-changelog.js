const fs = require('fs');
const path = require('path');

const changelog = require('changelog');
const moment = require('moment');
const semverRegex = require('semver-regex');

const packageDetails = require('../package.json');

const currentVersion = 'v' + packageDetails.version;
const filePath = path.join(__dirname, '../CHANGELOG.md');
const fileContent = fs.readFileSync(filePath, 'utf8');

if (fileContent.includes(currentVersion)) {
	console.log('CHANGELOG: already exists for ' + currentVersion);
	return process.exit(0);
}

changelog.generate(packageDetails.homepage).then((data) => {
	const changes = [];
	let previousVersion = '';
	let complete = false;

	for (const version of data.versions) {
		if (complete) {
			break;
		}

		for (const change of version.changes) {
			if (complete) {
				break;
			}

			const message = change.message.split('\n')[0];

			if (!message) {
				continue;
			}

			if (semverRegex().test(message)) {
				previousVersion = message;

				if (previousVersion.length) {
					complete = true;
				}
			} else if (/^[^>]/.test(message)) {
				changes.push(message);
			}
		}
	}

	if (!previousVersion.length || previousVersion === currentVersion) {
		console.log('CHANGELOG: Nothing to add');
		return process.exit(0);
	}

	console.log('CHANGELOG: Building for ' + currentVersion);
	const versions = previousVersion + '...' + currentVersion;

	fs.writeFileSync(
		filePath,
		thing({
			currentVersion,
			versions,
			changes,
			repository: data.project.repository
		}) + fileContent
	);
});

const thing = ({
	currentVersion,
	versions,
	changes,
	repository
}) => `## ${currentVersion} / ${moment().format('YYYY-MM-DD')}
${
	changes.length
		? `
### Highlights
${changes.map((ln) => '* ' + ln).join('\n')}
`
		: ''
}
### Changes
[${versions}](${repository}/compare/${versions})

`;
