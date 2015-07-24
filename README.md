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

### disallowIdLiterals: `true`

Jade must not contain any ID literals.

```jade
//- Invalid
#id

//- Valid
div(id='id')
```

### disallowSpaceAfterCodeOperator: `true`

No code operators (unbuffered/buffered/unescped buffered) should be followed by any spaces.

```jade
//- Invalid
p= 'This code is <escaped>'
p!=  'This code is <strong>not</strong> escaped'

//- Valid
p='This code is <escaped>'
p!='This code is <strong>not</strong> escaped'
```

### disallowTagInterpolation: `true`


Jade must not contain any tag interpolation operators.

```jade
//- Invalid
| #[strong html] text
p #[strong html] text
```

### literalsBeforeAttributes: `"require"` | `"disallow"`

#### "require"

All class or ID literals must be written before any attribute blocks.

```jade
//- Invalid
input(type='text')#id.class

//- Valid
input#id.class(type='text')
```

#### "disallow"

All attribute blocks must be written before any class or ID literals.

```jade
//- Invalid
input#id.class(type='text')

//- Valid
input(type='text')#id.class
```

### requireSpaceAfterCodeOperator: `true`

All code operators (unbuffered/buffered/unescaped buffered) must be immediately followed by a single space.

```jade
//- Invalid
p='This code is <escaped>'
p!=  'This code is <strong>not</strong> escaped'

//- Valid
p= 'This code is <escaped>'
p!= 'This code is <strong>not</strong> escaped'
```

### validateAttributeQuoteMarks: `"\""` | `"'"` | `true`

#### e.g.: "'"

All attribute values must be enclosed in single quotes.

```jade
//- Invalid
input(type="text" name="name" value="value")

//- Valid
input(type='text' name='name' value='value')
```

#### if (true)

All attribute values must be enclosed in quote marks match the first quote mark encountered in the source code.

### validateAttributeSeparator: `" "` | `","` | `", "` | `" ,"` | `" , "`

#### e.g.: ", "

All attributes must be immediately followed by a comma and then a space.

```jade
//- Invalid
input(type='text' name='name' value='value')

//- Valid
input(type='text', name='name', value='value')
```
