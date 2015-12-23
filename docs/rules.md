# disallowAttributeConcatenation: `true`

Pug must not contain any attribute concatenation.

```jade
//- Invalid
a(href='text ' + title) Link
```

# disallowAttributeInterpolation: `true`

Pug must not contain any attribute interpolation operators.

```jade
//- Invalid
a(href='text #{title}') Link
```

# disallowBlockExpansion: `true`

Pug must not contain any block expansion operators.

```jade
//- Invalid
p: strong text
table: tr: td text
```

# disallowClassAttributeWithStaticValue: `true`

Prefer class literals over `class` attributes with static values.

```jade
//- Invalid
span(class='foo')

//- Valid
span.foo
```

# disallowClassLiteralsBeforeAttributes: `true`

All attribute blocks must be written before any class literals.

```jade
//- Invalid
input.class(type='text')

//- Valid
input(type='text').class
```

# disallowClassLiteralsBeforeIdLiterals: `true`

All ID literals must be written before any class literals.

```jade
//- Invalid
input.class#id(type='text')

//- Valid
input#id.class(type='text')
```

# disallowClassLiterals: `true`

Pug must not contain any class literals.

```jade
//- Invalid
.class

//- Valid
div(class='class')
```

# disallowDuplicateAttributes: `true`

Attribute blocks must not contain any duplicates.
And if an ID literal is present an ID attribute must not be used. Ignores class attributes.

```jade
//- Invalid
div(a='a' a='b')
#id(id='id')

//- Valid
div(class='a', class='b')
.class(class='class')
```

# disallowHtmlText: `true`

Pug must not contain any HTML text.

```jade
//- Invalid
<strong>html text</strong>
p this is <strong>html</strong> text
```

# disallowIdAttributeWithStaticValue: `true`

Prefer ID literals over `id` attributes with static values.

```jade
//- Invalid
span(id='foo')

//- Valid
span#id
```

# disallowIdLiteralsBeforeAttributes: `true`

All attribute blocks must be written before any ID literals.

```jade
//- Invalid
input#id(type='text')

//- Valid
input(type='text')#id
```

# disallowIdLiterals: `true`

Pug must not contain any ID literals.

```jade
//- Invalid
#id

//- Valid
div(id='id')
```

# disallowMultipleLineBreaks: `true`

Pug must not contain multiple blank lines in a row.

```jade
//- Invalid
div


div

//- Valid
div

div
```

# disallowSpaceAfterCodeOperator: `true`

No code operators (unbuffered/buffered/unescped buffered) should be followed by any spaces.

```jade
//- Invalid
p= 'This code is <escaped>'
p!=  'This code is <strong>not</strong> escaped'

//- Valid
p='This code is <escaped>'
p!='This code is <strong>not</strong> escaped'
```

# disallowSpacesInsideAttributeBrackets: `true`

Disallows space after opening attribute bracket and before closing.

```jade
//- Invalid
input( type='text' name='name' value='value' )

//- Valid
input(type='text' name='name' value='value')
```

# disallowSpecificAttributes: `string` | `Array`

## e.g.: `"a"` OR `[ "A", "b" ]`

Pug must not contain any of the attributes specified.

```jade
//- Invalid
span(a='a')
div(B='b')
```

## e.g.: `[ { img: [ "title" ] } ]`

`img` tags must not contain any of the attributes specified.

```jade
//- Invalid
img(title='title')
```

# disallowSpecificTags: `string` | `Array`

Pug must not contain any of the tags specified.

## e.g.: `[ "b", "i" ]`

```jade
//- Invalid
b Bold text
i Italic text
```

# disallowStringConcatenation: `true`

Pug must not contain any string concatenation.

```jade
//- Invalid
h1= title + \'text\'
```

# disallowStringInterpolation: `true`

Pug must not contain any string interpolation operators.

```jade
//- Invalid
h1 #{title} text
```

# disallowTagInterpolation: `true`

Pug must not contain any tag interpolation operators.

```jade
//- Invalid
| #[strong html] text
p #[strong html] text
```

# maximumNumberOfLines: `int`

Pug files should be at most the number of lines specified.

# requireClassLiteralsBeforeAttributes: `true`

All class literals must be written before any attribute blocks.

```jade
//- Invalid
input(type='text').class

//- Valid
input.class(type='text')
```

# requireClassLiteralsBeforeIdLiterals: `true`

All class literals must be written before any ID literals.

```jade
//- Invalid
input#id.class(type='text')

//- Valid
input.class#id(type='text')
```

# requireIdLiteralsBeforeAttributes: `true`

All ID literals must be written before any attribute blocks.

```jade
//- Invalid
input(type='text')#id

//- Valid
input#id(type='text')
```

# requireLineFeedAtFileEnd: `true`

All files must end with a line feed.

# requireLowerCaseAttributes: `true`

All attributes must be written in lower case. Files with `doctype xml` are ignored.

```jade
//- Invalid
div(Class='class')

//- Valid
div(class='class')
```

# requireLowerCaseTags: `true`

All tags must be written in lower case. Files with `doctype xml` are ignored.

```jade
//- Invalid
Div(class='class')

//- Valid
div(class='class')
```

# requireSpaceAfterCodeOperator: `true`

All code operators (unbuffered/buffered/unescaped buffered) must be immediately followed by a single space.

```jade
//- Invalid
p='This code is <escaped>'
p!=  'This code is <strong>not</strong> escaped'

//- Valid
p= 'This code is <escaped>'
p!= 'This code is <strong>not</strong> escaped'
```

# requireSpacesInsideAttributeBrackets: `true`

Requires space after opening attribute bracket and before closing.

```jade
//- Invalid
input(type='text' name='name' value='value')

//- Valid
input( type='text' name='name' value='value' )
```

# requireSpecificAttributes: `Array`

## e.g.: `[ { img: [ "alt" ] } ]`

`img` tags must contain all of the attributes specified.

```jade
//- Invalid
img(src='src')

//- Valid
img(src='src' alt='alt')
```

# requireSpecificAttributes: `Array`

## e.g.: `[ { img: [ "alt" ] } ]`

`img` tags must contain all of the attributes specified.

```jade
//- Invalid
img(src='src')

//- Valid
img(src='src' alt='alt')
```

# requireStrictEqualityOperators: `true`

Requires the use of `===` and `!==` instead of `==` and `!=`.

```jade
//- Invalid
if true == false
if true != false

//- Valid
if true === false
if true !== false
```

# validateAttributeQuoteMarks: `"\""` | `"'"` | `true`

## e.g.: `"'"`

All attribute values must be enclosed in single quotes.

```jade
//- Invalid
input(type="text" name="name" value="value")

//- Valid
input(type='text' name='name' value='value')
```

## if (true)

All attribute values must be enclosed in quote marks match the first quote mark encountered in the source code.

# validateAttributeSeparator: `string` | `object`

## e.g.: `", "`

* All attributes must be immediately followed by a comma and then a space.
* All attributes must be on the same line.

```jade
//- Invalid
input(type='text' name='name' value='value')
div
  input(type='text'
  , name='name'
  , value='value'
  )

//- Valid
input(type='text', name='name', value='value')
```

## e.g.: `{ "separator": " ", multiLineSeparator: "\n  " }`

* All attributes that are on the same line must be immediately followed by a space.
* All attributes that are on different lines must be preceded by two spaces.

```jade
//- Invalid
input(type='text', name='name', value='value')
div
  input(type='text'
  , name='name'
  , value='value'
  )

//- Valid
input(type='text' name='name' value='value')
div
  input(type='text'
    name='name'
    value='value'
)
```

# validateDivTags: `true`

Checks that Pug does not contain any unnecessary `div` tags.

```jade
//- Invalid
div.class
div#id
div.class(class='class')

//- Valid
.class
#id
.class(class='class')
```

# validateIndentation: `int` | `"\t"`

## e.g.: `2`

Indentation must be consistently two spaces.

```jade
//- Invalid
div
<TAB>div

# validateLineBreaks: `"CR"` | `"LF"` | `"CRLF"`

## e.g.: `"LF"`

All line break characters must match.

```jade
//- Invalid
div(class='class')<CRLF>
.button

//- Valid
div(class='class')<LF>
.button
```

# validateSelfClosingTags: `true`

Checks that Pug does not contain any
[unnecessary self closing tags](http://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements).
Files with `doctype xml` are ignored.

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
