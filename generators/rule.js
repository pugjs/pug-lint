var path = require('path');
var noCase = require('no-case');
var camelCase = require('camel-case');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.destinationRoot(path.resolve(__dirname, '..'));
    this.sourceRoot(path.join(__dirname, 'rule-templates'));
  },

  prompting: function () {
    return this.prompt([
      {
        type: 'list',
        name: 'verb',
        message: 'The verb describing your rule',
        choices: [
          'disallow',
          'require',
          'validate'
        ]
      }, {
        type: 'input',
        name: 'thing',
        message: function (answers) {
          return {
            disallow: 'What your rule disallows (e.g. string interpolation)',
            require: 'What your rule requires (e.g. strict equality operators)',
            validate: 'What your rule validates (e.g. attribute separators)'
          }[answers.verb];
        }
      }, {
        type: 'input',
        name: 'negative',
        message: 'What your rule tries to prevent (e.g. non-strict equality operators)',
        when: function (answers) {
          return answers.verb === 'require';
        }
      }, {
        type: 'list',
        name: 'options',
        message: 'What option your rule supports',
        choices: [
          'true',
          {
            name: 'true or array of code separators ("-", "=", or "!=")',
            value: 'true|codeSep',
            short: 'true|Array<code sep>'
          },
          'other'
        ]
      }, {
        type: 'input',
        name: 'optionsExpanded',
        message: 'The list of possible options (use JavaScript syntax, separated with a pipe "|"; e.g. true|\'aggresive\')',
        when: function (answers) {
          return answers.options === 'other';
        }
      }
    ]).then(function (answers) {
      var purpose = answers.verb + ' ' + answers.thing;
      this.filename = noCase(purpose, null, '-');
      this.optionName = camelCase(purpose);

      this.requirement = {
        disallow: 'not contain ',
        require: 'use ',
        validate: 'have valid '
      }[answers.verb] + answers.thing;

      this.thing = answers.thing;
      this.negative = answers.negative || {
        disallow: answers.thing,
        validate: 'invalid ' + answers.thing
      }[answers.verb];

      this.optionsType = answers.options;
      this.options = {
        'true': ['true'],
        'true|codeSep': ['true', 'code separator'],
        'other': (answers.optionsExpanded || '').split('|')
      }[answers.options];
    }.bind(this));
  },

  writing: function () {
    this.template('rule.js', 'lib/rules/' + this.filename + '.js');
    this.template('test.js', 'test/rules/' + this.filename + '.test.js');
    this.fs.write(path.resolve(this.destinationRoot(), 'test', 'fixtures', 'rules', this.filename + '.pug'), '//- ...');
  }
});
