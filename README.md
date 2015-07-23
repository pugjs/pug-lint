# Jadelint

A linter for Jade

> Under active development. Watch this space as the [rules roll in](https://github.com/benedfit/jadelint/issues/3) :rainbow::rabbit:

[![build](https://img.shields.io/travis/benedfit/jadelint.svg)](https://travis-ci.org/benedfit/jadelint)

## Rules

You can specifically disable any rule by omitting it from your config or by assigning it to null.

### disallowBlockExpansion: `true`

Jade must not contain any block expansion operators.

```jade
//- Invalid
p: strong text
table: tr: td text
```

### disallowHtmlText: `true`

Jade must not contain any HTML text.

```jade
//- Invalid
<strong>html text</strong>
p this is <strong>html</strong> text
```

### disallowTagInterpolation: `true`

Jade must not contain any tag interpolation operators.

```jade
//- Invalid
| #[strong html] text
p #[strong html] text
```

### idLiterals: `"require"` | `"disallow"`

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

### literalsBeforeAttributes: `"require"` | `"disallow"`

#### "require"

All class or ID literals must be written before any attribute blocks.

```jade
//- Valid
input#id.class(type='text')

//- Invalid
input(type='text')#id.class
```

#### "disallow"

All attribute blocks must be written before any class or ID literals.

```jade
//- Valid
input(type='text')#id.class

//- Invalid
input#id.class(type='text')
```

### spaceAfterCodeBuffer: `"require"` | `"disallow"`

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

### validateAttributeQuoteMarks: `"\""` | `"'"` | true

#### e.g.: "'"

All attribute values must be enclosed in single quotes.

```jade
//- Valid
input(type='text' name='name' value='value')

//- Invalid
input(type="text" name="name" value="value")
```

#### if (true)

All attribute values must be enclosed in quote marks match the first quote mark encountered in the source code.

### validateAttributeSeparator: `" "` | `","` | `", "` | `" ,"` | `" , "`

#### e.g.: ", "

All attributes must be immediately followed by a comma and then a space.

```jade
//- Valid
input(type='text', name='name', value='value')

//- Invalid
input(type='text' name='name' value='value')
```
