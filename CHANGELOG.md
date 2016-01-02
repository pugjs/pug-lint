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
