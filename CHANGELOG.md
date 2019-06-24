## v2.6.0 / 2019-06-24

### Highlights
* Update to pug-lexer@4 & co.
* Fix problem with scoped config packages
* Support Node.js versions 4 to 12

### Changes
[v2.5.0...v2.6.0](https://github.com/pugjs/pug-lint/compare/v2.5.0...v2.6.0)

## v2.5.0 / 2017-09-03

### Highlights
* Add disallowTrailingSpaces rule
* docs: version 2 is already out
* docs: link keywords to npmjs.com
* Add maximumLineLength rule

### Changes
[v2.4.0...v2.5.0](https://github.com/pugjs/pug-lint/compare/v2.4.0...v2.5.0)

## v2.4.0 / 2017-02-01

### Highlights
* Merge pull request #121 from cspotcode/feature/json-schema
* Merge pull request #117 from pandora2000/bug/my-fix-branch
* Merge pull request #122 from cspotcode/patch-1
* Merge pull request #113 from jackbrewer/patch-1
* Fixes documentation
* Adds build script to regenerate full schema from rule schemas and docs
* Adds options schema to each rule
* Adds JSON schema for .pug-lintrc configuration
* Escape asterisk and other regexp reserved characters for attribute match pattern for validate-attribute-separator
* Corrects message for requireLowerCaseAttributes
* Update outdated dependencies (#109)

### Changes
[v2.3.0...v2.4.0](https://github.com/pugjs/pug-lint/compare/v2.3.0...v2.4.0)

## v2.3.0 / 2016-07-18

### Highlights
* Optimize ignoring directories
* Add validateTemplateString rule
* Add disallow template string rules
* Add disallowLegacyMixinCall rule

### Changes
[v2.2.2...v2.3.0](https://github.com/pugjs/pug-lint/compare/v2.2.2...v2.3.0)

## v2.2.2 / 2016-06-06

## Highlights
* CLI hot-fix

### Changes
[v2.2.1...v2.2.2](https://github.com/pugjs/pug-lint/compare/v2.2.1...v2.2.2)

## v2.2.1 / 2016-06-06

### Highlights
* disallowAttributeInterpolation: More accurate handling
* disallowAttributeContatentation:  More accurate concatenation detection
* Adds requireStrictExtensions rule

### Changes
[v2.2.0...v2.2.1](https://github.com/pugjs/pug-lint/compare/v2.2.0...v2.2.1)

## v2.2.0 / 2016-06-02

### Highlights
* Added support to extend configuration files from external resources such as files and modules
* Deprecated `preset` configuration option in favour of `extends`
* Updated to pug-lexer@2

### Changes
[v2.1.10...v2.2.0](https://github.com/pugjs/pug-lint/compare/v2.1.10...v2.2.0)

## v2.1.10 / 2016-06-01

### Highlights
* Changes priority order, and fixes naming inconsistency, of supported config files

### Changes
[v2.1.9...v2.1.10](https://github.com/pugjs/pug-lint/compare/v2.1.9...v2.1.10)

## v2.1.9 / 2016-06-01

### Highlights
* Adds support to disallow/require space after individual code operator types

### Changes
[v2.1.8...v2.1.9](https://github.com/pugjs/pug-lint/compare/v2.1.8...v2.1.9)

## v2.1.8 / 2016-05-31

### Highlights
* Validating multi-line separator now handles outdents correctly
* All rules now report column numbers for errors where appropriate
* Adds missing portion of rule documentation for validateIndentation
* Add information about plugin for VS Code
* Remove duplicate rule requireSpecificAttributes from documentation

### Changes
[v2.1.7...v2.1.8](https://github.com/pugjs/pug-lint/compare/v2.1.7...v2.1.8)

## v2.1.7 / 2016-04-18

### Highlights
* Minor bug fixes

### Changes
[v2.1.6...v2.1.7](https://github.com/pugjs/pug-lint/compare/v2.1.6...v2.1.7)

## v2.1.6 / 2016-02-25

### Highlights
* Improves disallowAttributeConcatenation and disallowStringConcatenation to remove false positives

### Changes
[v2.1.5...v2.1.6](https://github.com/pugjs/pug-lint/compare/v2.1.5...v2.1.6)

## v2.1.5 / 2016-02-25

### Highlights
* Improves disallowAttributeConcatenation and disallowStringConcatenation to remove false positives

### Changes
[v2.1.4...v2.1.5](https://github.com/pugjs/pug-lint/compare/v2.1.4...v2.1.5)

## v2.1.4 / 2016-02-25

### Highlights
* Allows commenting in config files
* disallowMultipleLineBreaks now uses lines in source rather than tokens to allow for multi-line attribute and mixin blocks
* disallowAttributeConcatenation now handles `+` characters in quotes

### Changes
[v2.1.3...v2.1.4](https://github.com/pugjs/pug-lint/compare/v2.1.3...v2.1.4)

## v2.1.3 / 2016-01-20

### Highlights
* Remove shrinkwrap
* Update dependencies

### Changes
[v2.1.2...v2.1.3](https://github.com/pugjs/pug-lint/compare/v2.1.2...v2.1.3)

## v2.1.2 / 2016-01-02

### Highlights
* Removes unnecessary console.log

### Changes
[v2.1.1...v2.1.2](https://github.com/pugjs/pug-lint/compare/v2.1.1...v2.1.2)

## v2.1.1 / 2015-12-23

### Highlights
* Renamed to pug-lint

### Changes
[v2.1.0...v2.1.1](https://github.com/pugjs/pug-lint/compare/v2.1.0...v2.1.1)

## v2.1.0 / 2015-12-18

### Highlights
* Removed unused JSON.minify dependency

### Changes
[v2.0.7...v2.1.0](https://github.com/pugjs/pug-lint/compare/v2.0.7...v2.1.0)

## v2.0.7 / 2015-12-17

### Highlights
* Now requires newline characters in validateAttributeSeparator.multiLineSeparator

### Changes
[v2.0.6...v2.0.7](https://github.com/pugjs/pug-lint/compare/v2.0.6...v2.0.7)

## v2.0.6 / 2015-12-17

### Highlights
* validateAttributeSeparator now handles multi-line attribute blocks

### Changes
[v2.0.5...v2.0.6](https://github.com/pugjs/pug-lint/compare/v2.0.5...v2.0.6)

## v2.0.5 / 2015-11-23

### Highlights
* New rules:
  * disallowClassAttributeWithStaticValue
  * disallowIdAttributeWithStaticValue

### Changes
[v2.0.4...v2.0.5](https://github.com/pugjs/pug-lint/compare/v2.0.4...v2.0.5)

## v2.0.4 / 2015-11-23

### Highlights
* Now accounts for block expansion when using the following rules:
  * disallowDuplicateAttributes
  * validateDivTags

### Changes
[v2.0.3...v2.0.4](https://github.com/pugjs/pug-lint/compare/v2.0.3...v2.0.4)

## v2.0.3 / 2015-11-21

### Highlights
* Now accounts for block expansion when validating order of literals and attributes

### Changes
[v2.0.2...v2.0.3](https://github.com/pugjs/pug-lint/compare/v2.0.2...v2.0.3)

## v2.0.2 / 2015-11-14

### Highlights
* validateAttributeSeparator now handles unescaped attributes

### Changes
[v2.0.1...v2.0.2](https://github.com/pugjs/pug-lint/compare/v2.0.1...v2.0.2)

## v2.0.1 / 2015-11-13

### Highlights
* Disallow contradictory rules from being used
* Rename disallowImplicitDiv to validateDivTags

### Changes
[v2.0.0...v2.0.1](https://github.com/pugjs/pug-lint/compare/v2.0.0...v2.0.1)

## v2.0.0 / 2015-11-04

### Highlights
* Refactored to use the latest version of `pug-lint` for improved error reporting

### Changes
[v1.2.13...v2.0.0](https://github.com/pugjs/pug-lint/compare/v1.2.13...v2.0.0)

## v1.2.13 / 2015-10-08

### Highlights
* Add rules to disallow attribute interpolation and concatenation

### Changes
[v1.2.12...v1.2.13](https://github.com/pugjs/pug-lint/compare/v1.2.12...v1.2.13)

## v1.2.12 / 2015-09-30

### Highlights
* Fix shrinkwrap

### Changes
[v1.2.11...v1.2.12](https://github.com/pugjs/pug-lint/compare/v1.2.11...v1.2.12)

## v1.2.11 / 2015-09-30

### Highlights
* Add rule to require strict equality operators

### Changes
[v1.2.10...v1.2.11](https://github.com/pugjs/pug-lint/compare/v1.2.10...v1.2.11)

## v1.2.10 / 2015-09-03

### Highlights
* Improvement to requireSpaceAfterCodeOperator
* disallowStringConcatenation now ignores unbuffered code
* Updates to Clock preset

### Changes
[v1.2.9...v1.2.10](https://github.com/pugjs/pug-lint/compare/v1.2.9...v1.2.10)

## v1.2.9 / 2015-09-01

### Highlights
* Resolve paths to additional rules correctly
* requireSpaceAfterCodeOperator now handles more valid cases

### Changes
[v1.2.8...v1.2.9](https://github.com/pugjs/pug-lint/compare/v1.2.8...v1.2.9)

## v1.2.8 / 2015-08-11

### Highlights
* Files can now be excluded via `excludeFiles` option in config
* Users can now define their own rules via `additionalRules` option in config
* disallow/requireSpaceAfterCodeOperators how handles lines containing variable declarations
* disallow/requireSpacesInsideAttributeBrackets now handles nested/multiple brackets

### Changes
[v1.2.7...v1.2.8](https://github.com/pugjs/pug-lint/compare/v1.2.7...v1.2.8)

## v1.2.7 / 2015-08-10

### Highlights
* Major bug fixing drive on existing rules

### Changes
[v1.2.6...v1.2.7](https://github.com/pugjs/pug-lint/compare/v1.2.6...v1.2.7)

## v1.2.6 / 2015-08-09

### Highlights
* Further fix to validateAttributeSeparators

### Changes
[v1.2.5...v1.2.6](https://github.com/pugjs/pug-lint/compare/v1.2.5...v1.2.6)

## v1.2.5 / 2015-08-08

### Highlights
* Further fix to validateAttributeSeparators

### Changes
[v1.2.4...v1.2.5](https://github.com/pugjs/pug-lint/compare/v1.2.4...v1.2.5)

## v1.2.4 / 2015-08-08

### Highlights
* New rule to disallow spaces inside attribute brackets

### Changes
[v1.2.3...v1.2.4](https://github.com/pugjs/pug-lint/compare/v1.2.3...v1.2.4)

## v1.2.3 / 2015-08-08

### Highlights
* Fixed bug with validateAttributeSeparator parsing the whole line rather than just the attribute values

### Changes
[v1.2.2...v1.2.3](https://github.com/pugjs/pug-lint/compare/v1.2.2...v1.2.3)

## v1.2.2 / 2015-08-06

### Highlights
* Fixed bug with validateAttributeSeparator handling of Array and object values

### Changes
[v1.2.1...v1.2.2](https://github.com/pugjs/pug-lint/compare/v1.2.1...v1.2.2)

## v1.2.1 / 2015-08-05

### Highlights
* Simplified inline reporter

### Changes
[v1.2.0...v1.2.1](https://github.com/pugjs/pug-lint/compare/v1.2.0...v1.2.1)

## v1.2.0 / 2015-08-06

### Highlights
* Support for built-in and custom reporters

### Changes
[v1.1.0...v1.2.0](https://github.com/pugjs/pug-lint/compare/v1.1.0...v1.2.0)

## v1.1.0 / 2015-08-04

### Highlights
* Support for presets

### Changes
[v1.0.2...v1.1.0](https://github.com/pugjs/pug-lint/compare/v1.0.2...v1.1.0)

## v1.0.2 / 2015-08-04

### Highlights
* New rules: requireSpecificAttributes
* FIX: Attribute quote validation can now handle boolean attributes correctly

### Changes
[v1.0.1...v1.0.2](https://github.com/pugjs/pug-lint/compare/v1.0.1...v1.0.2)

## v1.0.1 / 2015-08-04

### Highlights
* New rules:
  * disallowSpecificAttributes
  * disallowSpecificTags

### Changes
[v1.0.0...v1.0.1](https://github.com/pugjs/pug-lint/compare/v1.0.0...v1.0.1)

## v1.0.0 / 2015-07-30

### Highlights
* CLI support
* Config file support
* Initial batch of rules
