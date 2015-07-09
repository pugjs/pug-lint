# Jadelint

A linter for Jade

> Under active development. Watch this space as the rules roll in :rainbow::rabbit:

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
