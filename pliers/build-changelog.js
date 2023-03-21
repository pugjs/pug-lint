module.exports = createTask;

var fs = require('fs');
var path = require('path');
var changelog = require('changelog');
var moment = require('moment');
var packageDetails = require('../package.json');

function createTask(pliers) {
  pliers('buildChangelog', function (done) {
    var content = [];
    var changes = [];
    var currentVersion = 'v' + packageDetails.version;
    var previousVersion = '';
    var versions;
    var filePath = path.join(__dirname, '../CHANGELOG.md');
    var fileContent = fs.readFileSync(filePath, 'utf8');
    var complete = false;

    if (fileContent.indexOf(currentVersion) !== -1) {
      pliers.logger.error('CHANGELOG already exists for ' + currentVersion);
      return done();
    }

    changelog.generate(packageDetails.homepage).then(function (data) {
      data.versions.forEach(function (version) {
        if (complete) {
          return;
        }

        version.changes.forEach(function (change) {
          if (complete) {
            return;
          }

          var message = change.message.split('\n')[0];

          if (message) {
            if (/^(.*\s)?v?[0-9]+\.[0-9]+\.[0-9]+(\s.*)?$/.test(message)) {
              previousVersion = message;

              if (previousVersion.length) {
                complete = true;
                return;
              }
            } else if (message.match(/^[^>]/)) {
              changes.push('* ' + message);
            }
          }
        });
      });

      if (previousVersion.length && previousVersion !== currentVersion) {
        versions = previousVersion + '...' + currentVersion;

        content.push('## ' + currentVersion + ' / ' + moment().format('YYYY-MM-DD'));
        content.push('');

        if (changes.length) {
          content.push('### Highlights');
          content.push.apply(content, changes);
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

      fs.writeFile(filePath, content.join('\n'), function (err) {
        if (err) {
          pliers.logger.error('Failed to build CHANGELOG');
          return done(err);
        }

        return done();
      });
    });
  });
}
