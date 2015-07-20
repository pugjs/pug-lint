# Jadelint

A linter for Jade

> Under active development. Watch this space as the rules roll in :rainbow::rabbit:

[![build](https://img.shields.io/travis/benedfit/jadelint.svg)](https://travis-ci.org/benedfit/jadelint)

## Rules

You can specifically disable any rule by omitting it from your config or by assigning it to null.

### attributeSeparator: `" " | "," | ", " | " ," | " , "`

#### e.g.: ", "

All attributes must be immediately followed by a comma and then a space.

```jade
//- Valid
input(type='text', name='name', value='value')

//- Invalid
input(type='text' name='name' value='value')
```

### idLiterals: `"require" | "disallow"`

#### "require"

All IDs must be written as literals.

```jade
//- Valid
#id

//- Invalid
div(id='id')
```

#### "disallow"

All IDs must be written as attributes.

```jade
//- Valid
div(id='id')

//- Invalid
#id
```

### spaceAfterCodeBuffer: `"require" | "disallow"`

#### "require"

All code buffer operators must be immediately followed by a space.

```jade
//- Valid
p= 'This code is <escaped>'
p!= 'This code is <strong>not</strong> escaped'

//- Invalid
p='This code is <escaped>'
p!='This code is <strong>not</strong> escaped'
```

#### "disallow"

No code buffer operators should be followed by a space.

```jade
//- Valid
p='This code is <escaped>'
p!='This code is <strong>not</strong> escaped'

//- Invalid
p= 'This code is <escaped>'
p!= 'This code is <strong>not</strong> escaped'
```
