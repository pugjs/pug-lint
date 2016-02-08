# pug-lint

An unopinionated and configurable linter and style checker for Pug (formerly Jade)

> v2 under active development. Watch this space as issues are fixed, and the [rules roll in](https://github.com/pugjs/pug-lint/issues/3) :rainbow::rabbit:

[![build status](https://img.shields.io/travis/pugjs/pug-lint/master.svg)](https://travis-ci.org/pugjs/pug-lint)
[![coverage status](https://img.shields.io/coveralls/pugjs/pug-lint/master.svg)](https://coveralls.io/github/pugjs/pug-lint)
[![dependency status](https://img.shields.io/david/pugjs/pug-lint.svg)](https://david-dm.org/pugjs/pug-lint)
[![npm](https://img.shields.io/npm/v/pug-lint.svg)](https://www.npmjs.com/package/pug-lint)

## CLI

### Installation

```shell
$ npm install -g pug-lint
```

### Usage

```shell
$ pug-lint [options] <file ...>
```

#### Options

* `-h, --help`: output usage information
* `-V, --version`: output the version number
* `-c, --config <path>`: [configuration file](#configuration-file) path
* `-r, --reporter <reporter>`: error reporter; console - default, inline

## Editor integration

### Sublime Text 3

If you use SublimeLinter 3 with Sublime Text 3, you can install the
[SublimeLinter-pug-lint](https://github.com/benedfit/SublimeLinter-contrib-pug-lint)
plugin using [Package Control](https://packagecontrol.io/).

### Atom

If you use Atom, you can install the [linter-jade](https://atom.io/packages/linter-jade) package.

### Vim

jade-lint is part of [syntastic](https://github.com/scrooloose/syntastic).

If you are using [vim-plug](https://github.com/junegunn/vim-plug) to manage your
Vim plugins (recommended), you can do:

```
" In your ~/.vimrc
Plug 'scrooloose/syntastic'
" Then run these commands
:source %
:PlugInstall
```

Then to turn the jade-linter on, you will need this line in your .vimrc.

```
let g:syntastic_jade_checkers = ['jade_lint']
```

## Build system integration

### Gulp

If you're using Gulp as your build system, you can use [gulp-pug-lint](https://github.com/emartech/gulp-pug-lint) for easier integration.

### Grunt

If you're using Grunt as your build system, you can use [grunt-puglint](https://github.com/mrmlnc/grunt-puglint) for easier integration.

## Configuration file

Options and rules can be specified in a `.pug-lintrc` or `.pug-lint.json` file, or via adding a `"pugLintConfig"` option to `package.json`.

### Options

#### preset

Type: `string`

Values: `"clock"`

Presets are pre-defined sets of rules. You can specifically disable any preset rule by assigning it to null, like so:

```json
{ "preset": "clock"
, "disallowIdLiterals": null
}
```

#### excludeFiles

Type: `Array`

Default: `[ "node_modules/**" ]`

Disables style checking for specified paths declared with glob patterns.

#### additionalRules

Type: `Array`

Array of file path matching patterns to load additional rules from, e.g.:

```json
{ "additionalRules": [ "project-rules/*.js" ]
}
```

### Rules

[List of available rules](docs/rules.md)

You can specifically disable any rule by omitting it from your `.pug-lintrc` config file or by assigning it to null, like so:

```json
{ "disallowBlockExpansion": null
}
```

Some rules, if enabled at the same time, would be contradictory to one another, such as:

```json
{ "disallowSpaceAfterCodeOperator": true
, "requireSpaceAfterCodeOperator": true
}
```

In this case `requireSpaceAfterCodeOperator` is treated as null, and ignored.
