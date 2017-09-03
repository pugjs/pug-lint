# disallowAttributeConcatenation: `true`

Pug must not contain any attribute concatenation.

```pug
//- Invalid
a(href='text ' + title) Link
//- Invalid under `'aggressive'`
a(href=text + title) Link
a(href=num1 + num2) Link
```

# disallowAttributeInterpolation: `true`

Pug must not contain any attribute interpolation operators.

```pug
//- Invalid
a(href='text #{title}') Link
//- Valid
a(href='text \#{title}') Link
a(href='text \\#{title}') Link
```

## Compatibility note

Attribute interpolation has already been removed from Pug v2. This rule
helps transition from legacy "Jade" v1 code bases to Pug, but does not serve
any real purpose in real world if Pug v2 is used.

# disallowAttributeTemplateString: `true` | `'all'`

Pug must not contain template strings in attributes. `true` only fails when
the attribute is a template string; `'all'` fails when template strings are
used at all.

## e.g. `true`

```pug
//- Invalid
a(href=`https://${site}`) Link

//- Valid
a(href=getLink(`https://${site}`)) Link
```

## e.g. `'all'`

```pug
//- Invalid
a(href=getLink(`https://${site}`)) Link
```

# disallowBlockExpansion: `true`

Pug must not contain any block expansion operators.

```pug
//- Invalid
p: strong text
table: tr: td text
```

# disallowClassAttributeWithStaticValue: `true`

Prefer class literals over `class` attributes with static values.

```pug
//- Invalid
span(class='foo')

//- Valid
span.foo
```

# disallowClassLiteralsBeforeAttributes: `true`

All attribute blocks must be written before any class literals.

```pug
//- Invalid
input.class(type='text')

//- Valid
input(type='text').class
```

# disallowClassLiteralsBeforeIdLiterals: `true`

All ID literals must be written before any class literals.

```pug
//- Invalid
input.class#id(type='text')

//- Valid
input#id.class(type='text')
```

# disallowClassLiterals: `true`

Pug must not contain any class literals.

```pug
//- Invalid
.class

//- Valid
div(class='class')
```

# disallowDuplicateAttributes: `true`

Attribute blocks must not contain any duplicates.
And if an ID literal is present an ID attribute must not be used. Ignores class attributes.

```pug
//- Invalid
div(a='a' a='b')
#id(id='id')

//- Valid
div(class='a', class='b')
.class(class='class')
```

# disallowHtmlText: `true`

Pug must not contain any HTML text.

```pug
//- Invalid
<strong>html text</strong>
p this is <strong>html</strong> text
```

# disallowIdAttributeWithStaticValue: `true`

Prefer ID literals over `id` attributes with static values.

```pug
//- Invalid
span(id='foo')

//- Valid
span#id
```

# disallowIdLiteralsBeforeAttributes: `true`

All attribute blocks must be written before any ID literals.

```pug
//- Invalid
input#id(type='text')

//- Valid
input(type='text')#id
```

# disallowIdLiterals: `true`

Pug must not contain any ID literals.

```pug
//- Invalid
#id

//- Valid
div(id='id')
```

# disallowLegacyMixinCall: `true`

The Pug template must not contain legacy mixin call.

```pug
//- Invalid
mixin myMixin(arg)

//- Valid mixin call
+myMixin(arg)

//- Valid mixin call with block attached
+myMixin(arg)
  p Hey

//- Valid mixin definition
mixin myMixin(arg)
  p Hey
```

# disallowMultipleLineBreaks: `true`

Pug must not contain multiple blank lines in a row.

```pug
//- Invalid
div


div

//- Valid
div

div
```

# disallowSpaceAfterCodeOperator: `true` | `Array`

## e.g.: `true`

No code operators (`-`/`=`/`!=`) should be followed by any spaces.

```pug
//- Invalid
p= 'This code is <escaped>'
p!=  'This code is <strong>not</strong> escaped'

//- Valid
p='This code is <escaped>'
p!='This code is <strong>not</strong> escaped'
```

## e.g.: `[ "-" ]`

No unbuffered code operators (`-`) should be followed by any spaces.

```pug
//- Invalid
- var a = 'This is code'

//- Valid
-var a = 'This is code'
```

# disallowSpacesInsideAttributeBrackets: `true`

Disallows space after opening attribute bracket and before closing.

```pug
//- Invalid
input( type='text' name='name' value='value' )

//- Valid
input(type='text' name='name' value='value')
```

# disallowSpecificAttributes: `string` | `Array`

## e.g.: `"a"` OR `[ "A", "b" ]`

Pug must not contain any of the attributes specified.

```pug
//- Invalid
span(a='a')
div(B='b')
```

## e.g.: `[ { img: [ "title" ] } ]`

`img` tags must not contain any of the attributes specified.

```pug
//- Invalid
img(title='title')
```

# disallowSpecificTags: `string` | `Array`

Pug must not contain any of the tags specified.

## e.g.: `[ "b", "i" ]`

```pug
//- Invalid
b Bold text
i Italic text
```

# disallowStringConcatenation: `true` | `'aggressive'`

Pug must not contain any string concatenation.

```pug
//- Invalid
h1= title + 'text'
//- Invalid under `'aggressive'`
h1= title + text
```

# disallowStringInterpolation: `true`

Pug must not contain any string interpolation operators.

```pug
//- Invalid
h1 #{title} text
```

# disallowTagInterpolation: `true`

Pug must not contain any tag interpolation operators.

```pug
//- Invalid
| #[strong html] text
p #[strong html] text
```

# disallowTemplateString: `true` | `'all'`

Pug must not contain template strings. `true` only fails when a template
string is used directly; `'all'` fails when template strings are used at
all.

## e.g. `true`

```pug
//- Invalid
h1= `${title} text`

//- Valid
h1= translate(`${title} text`)
```

## e.g. `'all'`

```pug
//- Invalid
h1= translate(`${title} text`)
```

# disallowTrailingSpaces: `true`

Lines in Pug file must not contain useless spaces at the end.

# maximumLineLength: `int`

## e.g.: `80`

Lines in Pug file must not exceed the specified length.

# maximumNumberOfLines: `int`

Pug files should be at most the number of lines specified.

# requireClassLiteralsBeforeAttributes: `true`

All class literals must be written before any attribute blocks.

```pug
//- Invalid
input(type='text').class

//- Valid
input.class(type='text')
```

# requireClassLiteralsBeforeIdLiterals: `true`

All class literals must be written before any ID literals.

```pug
//- Invalid
input#id.class(type='text')

//- Valid
input.class#id(type='text')
```

# requireIdLiteralsBeforeAttributes: `true`

All ID literals must be written before any attribute blocks.

```pug
//- Invalid
input(type='text')#id

//- Valid
input#id(type='text')
```

# requireLineFeedAtFileEnd: `true`

All files must end with a line feed.

# requireLowerCaseAttributes: `true`

All attributes must be written in lower case. Files with `doctype xml` are ignored.

```pug
//- Invalid
div(Class='class')

//- Valid
div(class='class')
```

# requireLowerCaseTags: `true`

All tags must be written in lower case. Files with `doctype xml` are ignored.

```pug
//- Invalid
Div(class='class')

//- Valid
div(class='class')
```

# requireSpaceAfterCodeOperator: `true` | `Array`

## e.g.: `true`

All code operators (`-`/`=`/`!=`) must be immediately followed by a single space.

```pug
//- Invalid
p='This code is <escaped>'
p!=  'This code is <strong>not</strong> escaped'

//- Valid
p= 'This code is <escaped>'
p!= 'This code is <strong>not</strong> escaped'
```

## e.g.: `[ "-" ]`

All unbuffered code operators (`-`) must be immediately followed by a single space.

```pug
//- Invalid
-var a = 'This is code'

//- Valid
- var a = 'This is code'
```

# requireSpacesInsideAttributeBrackets: `true`

Requires space after opening attribute bracket and before closing.

```pug
//- Invalid
input(type='text' name='name' value='value')

//- Valid
input( type='text' name='name' value='value' )
```

# requireSpecificAttributes: `Array`

## e.g.: `[ { img: [ "alt" ] } ]`

`img` tags must contain all of the attributes specified.

```pug
//- Invalid
img(src='src')

//- Valid
img(src='src' alt='alt')
```

# requireStrictEqualityOperators: `true`

Requires the use of `===` and `!==` instead of `==` and `!=`.

```pug
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

```pug
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

```pug
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

## e.g.: `{ "separator": " ", "multiLineSeparator": "\n  " }`

* All attributes that are on the same line must be immediately followed by a space.
* All attributes that are on different lines must be preceded by two spaces.

```pug
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

```pug
//- Invalid
div.class
div#id
div.class(class='class')

//- Valid
.class
#id
.class(class='class')
```

# validateExtensions: `true`

Pug template must use proper file extensions with inclusion and inheritance
(`.pug`).

```pug
//- Invalid
include a
include a.jade
extends a
extends a.txt
extends a.jade

//- Valid
include a.txt
include a.pug
extends a.pug
```

# validateIndentation: `int` | `"\t"`

## e.g.: `2`

Indentation must be consistently two spaces.

```pug
//- Invalid
div
<TAB>div

//- Valid
div
<SPACE><SPACE>div
```

## e.g.: `"\t"`

Indentation must be consistently tabs.

```pug
//- Invalid
div
<SPACE><SPACE>div

//- Valid
div
<TAB>div
```

# validateLineBreaks: `"CR"` | `"LF"` | `"CRLF"`

## e.g.: `"LF"`

All line break characters must match.

```pug
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

```pug
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

# validateTemplateString: `true` | Array

Validate the use of template string in Pug templates.

The option can either be an array or `true`. If it is an array, it can
contain the following strings. If it is `true` signifies all of the
following subrules are enabled.

## `'variable'`

```pug
//- Invalid
h1= `${title}`

//- Valid
h1= title
```

## `'string'`

```pug
//- Invalid
h1= `title`

//- Valid
h1= 'title'
```

## `'concatenation'`

```pug
//- Invalid
h1= `title` + `text`
h1= `title` + variable

//- Valid
h1= `titletext`
h1= `title${variable}`
```
