module.exports = createTask;

var fs = require('fs');
var path = require('path');
var parseDocsFromRules = require('./parse-docs-from-rules');

function createTask(pliers) {
  pliers('buildJsonSchema', function (done) {
    var fullSchema = require('../schemas/_template-schema.json');
    var props = fullSchema.properties;
    var docs = parseDocsFromRules(pliers);

    docs.forEach(function (doc) {
      var rule = require(doc.file).prototype;
      var schema = rule.schema || {};
      schema.description = doc.text.match(/\n\n(?:## .*?\n\n)?([\s\S]*?)\n(?:\n|$)/)[1];
      schema.documentation = doc.text;
      props[rule.name] = schema;
    });

    fs.writeFile(path.join(__dirname, '../schemas/pug-lintrc-schema.json'), JSON.stringify(fullSchema, null, '    '), 'utf8', function (error) {
      if (error) {
        pliers.logger.error('Failed to build JSON schema');
        return done(error);
      }

      done();
    });
  });
}
