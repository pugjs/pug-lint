# Jadelint

A linter for Jade

> Under active development. Watch this space as the rules roll in :rainbow::rabbit:

[![build](https://img.shields.io/travis/benedfit/jadelint.svg)](https://travis-ci.org/benedfit/jadelint)

## Rules

You can specifically disable any rule by omitting it from your config or by assigning it to null.

### commaSeparatedAttributes: `"require" | "disallow"`

#### if ("require")

All attributes must be comma separated.

```jade
//- Valid
input(type='text', name='name', value='value')

//- Invalid
input(type='text' name='name' value='value')
```

#### if ("disallow")

No attributes should be comma separated.

```jade
//- Valid
input(type='text' name='name' value='value')

//- Invalid
input(type='text', name='name', value='value')
```

### idLiterals: `"require" | "disallow"`

#### if ("require")

All IDs must be written as literals.

```jade
//- Valid
#id-literal

//- Invalid
div(id='id-attribute')
```

#### if ("disallow")

All IDs must be written as attributes.

```jade
//- Valid
div(id='id-attribute')

//- Invalid
#id-literal
```

### spaceAfterCodeBuffer: `"require" | "disallow"`

#### if ("require")

All code buffers must have a space after them.

```jade
//- Valid
p= 'This code is <escaped>'
p!= 'This code is <strong>not</strong> escaped'

//- Invalid
p='This code is <escaped>'
p!='This code is <strong>not</strong> escaped'
```

#### if ("disallow")

No code buffers should have a space after them.

```jade
//- Valid
p='This code is <escaped>'
p!='This code is <strong>not</strong> escaped'

//- Invalid
p= 'This code is <escaped>'
p!= 'This code is <strong>not</strong> escaped'
```
