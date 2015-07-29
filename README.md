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

### disallowClassLiterals: `true`

Jade must not contain any class literals.

```jade
//- Invalid
.class

//- Valid
div(class='class')
```

### disallowClassLiteralsBeforeAttributes: `true`

All attribute blocks must be written before any class literals.

```jade
//- Invalid
input.class(type='text')

//- Valid
input(type='text').class
```

### disallowClassLiteralsBeforeIdLiterals: `true`

All ID literals must be written before any class literals.

```jade
//- Invalid
input.class#id(type='text')

//- Valid
input#id.class(type='text')
```

### disallowDuplicateAttributes: `true`

Attribute blocks must not contain any duplicates. And if an ID literal is present an ID attribute must not be used. Ignores class attributes

```jade
//- Invalid
div(a='a' a='b')
#id(id='id')

//- Valid
div(class='a', class='b')
.class(class='class')
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

### disallowIdLiteralsBeforeAttributes: `true`

All attribute blocks must be written before any ID literals.

```jade
//- Invalid
input#id(type='text')

//- Valid
input(type='text')#id
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

### disallowStringConcatenation: `true`

Jade must not contain any string concatenation.

```jade
//- Invalid
h1= title + \'text\'
a(href='text ' + title) Link
```

### disallowStringInterpolation: `true`

Jade must not contain any string interpolation operators.

```jade
//- Invalid
h1 #{title} text
a(href='text #{title}') Link
```

### disallowTagInterpolation: `true`

Jade must not contain any tag interpolation operators.

```jade
//- Invalid
| #[strong html] text
p #[strong html] text
```

### requireClassLiteralsBeforeAttributes: `true`

All class literals must be written before any attribute blocks.

```jade
//- Invalid
input(type='text').class

//- Valid
input.class(type='text')
```

### requireClassLiteralsBeforeIdLiterals: `true`

All class literals must be written before any ID literals.

```jade
//- Invalid
input#id.class(type='text')

//- Valid
input.class#id(type='text')
```

### requireIdLiteralsBeforeAttributes: `true`

All ID literals must be written before any attribute blocks.

```jade
//- Invalid
input(type='text')#id

//- Valid
input#id(type='text')
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

### validateSelfClosingTags: `true`

Checks that Jade does not contain any [unnecessary self closing tags](http://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements). Files with `doctype xml` are ignored.

```jade
//- Invalid
area/
link/

//- Valid
area
link
foo/

doctype xml
area/
```
