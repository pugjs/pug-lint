# Jadelint

A linter for Jade

> Under active development. Watch this space as the rules roll in :rainbow::rabbit:

[![build](https://img.shields.io/travis/benedfit/jadelint.svg)](https://travis-ci.org/benedfit/jadelint)

## Rules

You can specifically disable any rule by omitting it from your config or by assigning it to null

### commaSeparatedAttributes: `boolean`

#### if (true)

All attributes must be comma separated

```jade
//- Valid
input(type='text', name='name', value='value')

//- Invalid
input(type='text' name='name' value='value')
```

#### if (false)

No attributes should be comma separated

```jade
//- Valid
input(type='text' name='name' value='value')

//- Invalid
input(type='text', name='name', value='value')
```
