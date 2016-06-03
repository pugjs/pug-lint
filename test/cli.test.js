var assert = require('assert');
var bin = require.resolve('../bin/pug-lint');
var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;
var fixturesPath = path.join(__dirname, 'fixtures/');
var fixturesRelativePath = './test/fixtures/';
var packageDetails = require('../package.json');

describe('cli', function () {
  function run(args, cb) {
    var command = [bin].concat(args);
    var stdout = '';
    var stderr = '';
    var node = process.execPath;
    var child = spawn(node, command);

    if (child.stderr) {
      child.stderr.on('data', function (chunk) {
        stderr += chunk;
      });
    }

    if (child.stdout) {
      child.stdout.on('data', function (chunk) {
        stdout += chunk;
      });
    }

    child.on('error', cb);

    child.on('close', function (code) {
      cb(null, code, stdout, stderr);
    });

    return child;
  }

  it('should output the current version number', function (done) {
    var args = ['-V'];

    run(args, function (err, code, stdout, stderr) {
      assert(!err, err);
      assert.equal(code, 0, code);
      assert.equal(stderr, '', stderr);
      assert.equal(stdout.indexOf(packageDetails.version) !== -1, true, stdout);
      done();
    });
  });

  it('should output help', function (done) {
    var args = ['-h'];
    var message = 'Usage: pug-lint [options] <file ...>';

    run(args, function (err, code, stdout, stderr) {
      assert(!err, err);
      assert.equal(code, 0, code);
      assert.equal(stderr, '', stderr);
      assert.equal(stdout.indexOf(message) !== -1, true, stdout);
      assert.equal(stdout.indexOf(packageDetails.description) !== -1, true, stdout);
      done();
    });
  });

  it('should output help if no file specified', function (done) {
    var args = [];
    var message = 'Usage: pug-lint [options] <file ...>';

    run(args, function (err, code, stdout, stderr) {
      assert(!err, err);
      assert.equal(code, 0, code);
      assert.equal(stderr, '', stderr);
      assert.equal(stdout.indexOf(message) !== -1, true, stdout);
      assert.equal(stdout.indexOf(packageDetails.description) !== -1, true, stdout);
      done();
    });
  });

  it('should report errors for file path', function (done) {
    var args = [fixturesRelativePath + 'invalid.pug'];
    var expectedReport = fs.readFileSync(fixturesPath + 'reporters/expected-invalid.txt', 'utf-8');

    run(args, function (err, code, stdout, stderr) {
      assert(!err, err);
      assert.equal(code, 2, code);
      assert.equal(stdout, '', stdout);
      assert.equal(stderr.trim(), expectedReport.replace(/%dirname%/g, fixturesRelativePath).trim(), stderr);
      done();
    });
  });

  it('should report errors for directory path', function (done) {
    var dirname = fixturesRelativePath + 'rules/';
    var args = [dirname];
    var expectedReport = fs.readFileSync(fixturesPath + 'reporters/expected-invalid.txt', 'utf-8');

    run(args, function (err, code, stdout, stderr) {
      assert(!err, err);
      assert.equal(code, 2, code);
      assert.equal(stdout, '', stdout);
      assert.equal(stderr.trim(), expectedReport.replace(/%dirname%/g, dirname).trim(), stderr);
      done();
    });
  });

  it('should use config when it is supplied', function (done) {
    var dirname = fixturesRelativePath + 'rules/';
    var args = ['-c', fixturesPath + 'config-file/dotfile/.pug-lintrc', dirname + 'disallow-block-expansion.pug'];
    var expectedReport = fs.readFileSync(fixturesPath + 'reporters/expected-disallow-block-expansion--console.txt', 'utf-8');

    run(args, function (err, code, stdout, stderr) {
      assert(!err, err);
      assert.equal(code, 2, code);
      assert.equal(stdout, '', stdout);
      assert.equal(stderr.trim(), expectedReport.replace(/%dirname%/g, dirname).trim(), stderr);
      done();
    });
  });

  it('should error on invalid reporter', function (done) {
    var args = ['-r', 'nonexistent', fixturesRelativePath];

    run(args, function (err, code, stdout, stderr) {
      assert(!err, err);
      assert.equal(code, 1, code);
      assert.equal(stdout, '', stdout);
      assert.equal(stderr.trim(), 'Reporter "nonexistent" does not exist', stderr);
      done();
    });
  });

  it('should report errors using reporter', function (done) {
    var dirname = fixturesRelativePath + 'rules/';
    var args = [
      '-r',
      'inline',
      '-c',
      fixturesPath + 'config-file/dotfile/.pug-lintrc',
      dirname + 'disallow-block-expansion.pug'
    ];
    var expectedReport = fs.readFileSync(fixturesPath + 'reporters/expected-disallow-block-expansion--inline.txt', 'utf-8');

    run(args, function (err, code, stdout, stderr) {
      assert(!err, err);
      assert.equal(code, 2, code);
      assert.equal(stdout, '', stdout);
      assert.equal(stderr.trim(), expectedReport.replace(/%dirname%/g, dirname).trim(), stderr);
      done();
    });
  });
});
