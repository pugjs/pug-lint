# pug-lint

An unopinionated and configurable linter and style checker for Pug (formerly Jade)

[![build status](https://img.shields.io/travis/pugjs/pug-lint/master.svg)](https://travis-ci.org/pugjs/pug-lint)
[![coverage status](https://img.shields.io/codecov/c/github/pugjs/pug-lint/master.svg)](https://codecov.io/gh/pugjs/pug-lint)
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

If you use Atom, you can install the [linter-pug](https://atom.io/packages/linter-pug) package.

### VS Code

If you use VS Code, you can install the [vscode-puglint](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-puglint) extension.

### Vim

pug-lint is part of [syntastic](https://github.com/scrooloose/syntastic).

If you are using [vim-plug](https://github.com/junegunn/vim-plug) to manage your
Vim plugins (recommended), you can do:

```
" In your ~/.vimrc
Plug 'scrooloose/syntastic'
" Then run these commands
:source %
:PlugInstall
```

Then to turn the pug linter on, you will need this line in your `.vimrc`.

```
let g:syntastic_pug_checkers = ['pug_lint']
```

## Build system integration

### Gulp

If you're using Gulp as your build system, you can use [gulp-pug-linter](https://github.com/ilyakam/gulp-pug-linter) for easier integration.

### Grunt

If you're using Grunt as your build system, you can use [grunt-puglint](https://github.com/mrmlnc/grunt-puglint) for easier integration.

## Configuration file

Options and rules can be specified in a `.pug-lintrc`, `.pug-lintrc.js`, or `.pug-lintrc.json` file, or via adding a `"pugLintConfig"` option to `package.json`.

### Options

#### preset `deprecated`

Presets have been deprecated in favour of [extending configuration files](#extends).

> Instructions for those wishing to continue to use the rules defined in the deprecated `clock` preset can be found at https://github.com/pugjs/pug-lint/issues/80#issuecomment-223283681

#### extends

Type: `string`

If you want to extend a specific configuration file, you can use the `extends` property and specify the path to the file. The path can be either relative or absolute

Configurations can be extended by using:

1. JSON file
2. JS file
3. [Shareable configuration package](#shareable-configuration-packages)

The extended configuration provides base rules, which can be overridden by the configuration that references it. For example:

```json
{
  "extends": "./node_modules/coding-standard/.pug-lintrc",
  "disallowIdLiterals": null
}
```

You can also extend configurations using [shareable configuration packages](#shareable-configuration-packages). To do so, be sure to install the configuration package you want from npm and then use the package name, such as:

```shell
$ npm install --save-dev pug-lint-config-clock
```

```json
{
  "extends": "pug-lint-config-myrules",
  "disallowIdLiterals": null
}
```

In this example, the `pug-lint-config-myrules` package will be loaded as an object and used as the parent of this configuration. You can override settings from the shareable configuration package by adding them directly into your `.pug-lintrc` file.

You can find config to extend on NPM using [`"pug-lint-config"` query](https://www.npmjs.com/search?q=pug-lint-config).

> **Note**: You can omit `pug-lint-config-` and pug-lint will automatically insert it for you

#### excludeFiles

Type: `Array`

Default: `["node_modules/**"]`

Disables style checking for specified paths declared with glob patterns.

#### additionalRules

Type: `Array`

Array of file path matching patterns to load additional rules from, e.g.:

```json
{
  "additionalRules": ["project-rules/*.js"]
}
```

### Rules

[List of available rules](docs/rules.md)

You can specifically disable any rule by omitting it from your `.pug-lintrc` config file or by assigning it to null, like so:

```json
{
  "disallowBlockExpansion": null
}
```

Some rules, if enabled at the same time, would be contradictory to one another, such as:

```json
{
  "disallowSpaceAfterCodeOperator": true,
  "requireSpaceAfterCodeOperator": true
}
```

In this case `requireSpaceAfterCodeOperator` is treated as null, and ignored.

### Shareable configuration packages

Shareable configs are simply npm packages that export a configuration object. To start, [create a Node.js module](https://docs.npmjs.com/getting-started/creating-node-modules) like you normally would. Make sure the module name begins with `pug-lint-config-`, such as `pug-lint-config-myconfig`. Create a new index.js file and export an object containing your settings:

```js
module.exports = {
  disallowBlockExpansion: true
};
```

Once your shareable config is ready, you can [publish to npm](https://docs.npmjs.com/getting-started/publishing-npm-packages) to share with others. We recommend using the [`puglint`](https://www.npmjs.com/browse/keyword/puglint) and [`puglintconfig`](https://www.npmjs.com/browse/keyword/puglintconfig) keywords so others can easily find your module.
