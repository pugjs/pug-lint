module.exports = createTask;

const fs = require('fs');
const path = require('path');
const changelog = require('changelog');
const moment = require('moment');
const semverRegex = require('semver-regex');
const packageDetails = require('../package.json');

function createTask(pliers) {
  pliers('buildChangelog', done => {
    const content = [];
    const changes = [];
    const currentVersion = 'v' + packageDetails.version;
    let previousVersion = '';
    let versions;
    const filePath = path.join(__dirname, '../CHANGELOG.md');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let complete = false;

    if (fileContent.includes(currentVersion)) {
      pliers.logger.error('CHANGELOG already exists for ' + currentVersion);
      return done();
    }

    changelog.generate(packageDetails.homepage).then(data => {
      for (const version of data.versions) {
        if (complete) {
          continue;
        }

        for (const change of version.changes) {
          if (complete) {
            continue;
          }

          const message = change.message.split('\n')[0];

          if (message) {
            if (semverRegex().test(message)) {
              previousVersion = message;

              if (previousVersion.length) {
                complete = true;
              }
            } else if (/^[^>]/.test(message)) {
              changes.push('* ' + message);
            }
          }
        }
      }

      if (previousVersion.length && previousVersion !== currentVersion) {
        versions = previousVersion + '...' + currentVersion;

        content.push('## ' + currentVersion + ' / ' + moment().format('YYYY-MM-DD'));
        content.push('');

        if (changes.length) {
          content.push('### Highlights');
          content.push(...changes);
          content.push('');
        }

        content.push('### Changes');
        content.push('[' + versions + '](' + data.project.repository + '/compare/' + versions + ')');
        content.push('');
      }

      if (!content.length) {
        return done();
      }

      content.push(fileContent);

      pliers.logger.debug('Building CHANGELOG for ' + currentVersion);

      fs.writeFile(filePath, content.join('\n'), error => {
        if (error) {
          pliers.logger.error('Failed to build CHANGELOG');
          return done(error);
        }

        return done();
      });
    });
  });
}
