module.exports = createTest

var assert = require('assert')

function createTest (linter) {

  /*eslint max-statements: [ 2, 1000 ]*/
  describe('jadelint', function () {

    before(function () {
      linter.configure({ preset: 'jadelint' })

      assert.equal(linter.getConfiguredRules().length > 0, true)
    })

    it.skip('AddDeferForAsyncScripts', function () {
      assert.equal(linter.checkString('script(async defer src=\'script.js\')').length, 0)
      assert.equal(linter.checkString('script(async src=\'script.js\')').length, 1)
    })

    it('AddMaxToProgress', function () {
      assert.equal(linter.checkString('progress(value=\'50\' max=\'100\')').length, 0)
      assert.equal(linter.checkString('progress(value=\'0.5\')').length, 1)
    })

    it('AddMinAndMaxToMeter', function () {
      assert.equal(linter.checkString('meter(value=\'50\' max=\'100\' min=\'0\')').length, 0)
      assert.equal(linter.checkString('meter(value=\'0.5\' max=\'100\')').length, 1)
      assert.equal(linter.checkString('meter(value=\'0.5\' min=\'0\')').length, 1)
      assert.equal(linter.checkString('meter(value=\'0.5\')').length, 2)
    })

    it.skip('AddTitleToAlternateStylesheets', function () {
      assert.equal(linter.checkString('link(href=\'my.css\' rel=\'alternate stylesheet\' title=\'Altsheet\')').length, 0)
      assert.equal(linter.checkString('link(href=\'my.css\' rel=\'alternate stylesheet\')').length, 1)
    })

    it.skip('AddTitleToInputWithPattern', function () {
      assert.equal(linter.checkString('input(pattern=\'[0-9]{3}\' title=\'PIN Number\')').length, 0)
      assert.equal(linter.checkString('input(pattern=\'[0-9]{3}\')').length, 1)
    })

    it.skip('AddValueToSubmit', function () {
      assert.equal(linter.checkString('input(type="submit" value="Search")').length, 0)
      assert.equal(linter.checkString('input(type="submit")').length, 1)
    })

    it.skip('DontLinkToFavicon', function () {
      assert.equal(linter.checkString('link(rel=\'icon\' href=\'favicon96x96.ico\')').length, 0)
      assert.equal(linter.checkString('link(rel=\'icon\' href=\'favicon.ico\')').length, 1)
    })

    it.skip('DontQuoteQTags', function () {
      assert.equal(linter.checkString('q This is a quote').length, 0)
      assert.equal(linter.checkString('q "This is a quote"').length, 1)
    })

    it('DontUseBTags', function () {
      assert.equal(linter.checkString('b Some text').length, 1)
    })

    it('DontUseHgroup', function () {
      assert.equal(linter.checkString('hgroup: h1 Some text').length, 1)
    })

    it('DontUseITags', function () {
      assert.equal(linter.checkString('i Some text').length, 1)
    })

    it.skip('DontUseLegacyEncoding', function () {
      assert.equal(linter.checkString('meta(charset="utf-8")').length, 0)
      assert.equal(linter.checkString('meta(http-equiv="Content-Type" content="text/html; charset=UTF-8")').length, 1)
    })

    it.skip('DontUsePlaintextInBlockquote', function () {
      assert.equal(linter.checkString('blockquote: p This is a quote').length, 0)
      assert.equal(linter.checkString('blockquote This is a quote').length, 1)
    })

    it('DontUseSTags', function () {
      assert.equal(linter.checkString('s Some text').length, 1)
    })

    it('DontUseUTags', function () {
      assert.equal(linter.checkString('u Some text').length, 1)
    })

    it.skip('FirstChildOfFieldsetIsLegend', function () {
      assert.equal(linter.checkString('fieldset\n  legend about\n  p Some text').length, 0)
      assert.equal(linter.checkString('fieldset\n  p Some text\n  legend about').length, 1)
    })

    it('HTMLRootRequiresLang', function () {
      assert.equal(linter.checkString('html(lang=\'en-US\')').length, 0)
      assert.equal(linter.checkString('html').length, 1)
    })

    it.skip('NoAttributeWhitespace', function () {
      assert.equal(linter.checkString('div(id=\'id\')').length, 0)
      assert.equal(linter.checkString('div(id=\'  id\')').length, 1)
      assert.equal(linter.checkString('div(id=\'id  \')').length, 1)
      assert.equal(linter.checkString('div(id=\'  id  \')').length, 1)
      assert.equal(linter.checkString('div(id=" id")').length, 1)
    })

    it.skip('NoXMLAttributeNamespace', function () {
      assert.equal(linter.checkString('p(bar=\'baz\')').length, 0)
      assert.equal(linter.checkString('p(foo:bar=\'baz\')').length, 1)
    })

    it('NoXMLTagNamespace', function () {
      assert.equal(linter.checkString('html(lang="en-US")').length, 0)
      assert.equal(linter.checkString('html(lang="en-US" xmlns="http://www.w3.org/1999/xhtml")').length, 1)
    })

    it.skip('OmitTypeForCSS', function () {
      assert.equal(linter.checkString('style').length, 0)
      assert.equal(linter.checkString('style(type=\'foo\')').length, 0)
      assert.equal(linter.checkString('style(type=\'text/css\')').length, 1)
    })

    it.skip('OmitTypeForJS', function () {
      assert.equal(linter.checkString('script').length, 0)
      assert.equal(linter.checkString('script(type=\'foo\')').length, 0)
      assert.equal(linter.checkString('script(type=\'text/javascript\')').length, 1)
    })

    it.skip('OnlyHTMLDoctype', function () {
      assert.equal(linter.checkString('doctype html').length, 0)
      assert.equal(linter.checkString('doctype xml').length, 1)
    })

    it('PreferStrongNativeSemantics', function () {
      assert.equal(linter.checkString('main(role="foo")').length, 0)
      assert.equal(linter.checkString('nav(role="foo")').length, 1)
      assert.equal(linter.checkString('hr(role="foo")').length, 1)
      assert.equal(linter.checkString('br(role="foo")').length, 1)
    })

    it.skip('RequireStatementInCodeBock', function () {
      assert.equal(linter.checkString('- var n = 0;\nwhile (n < 10)\n  - n++\n  li= n').length, 0)
      assert.equal(linter.checkString('- var n = 0;\n- while (n < 10)\n  - n++\n  li= n').length, 1)
    })

    it.skip('UseConsistentQuotes', function () {
      assert.equal(linter.checkString('p= \'hey there!\'\na(href=\'/api\')').length, 0)
      assert.equal(linter.checkString('a(href="/api")\na(href=\'/docs\')').length, 1)
      assert.equal(linter.checkString('p= \'whats up\'\na(href="/api")').length, 1)
    })

    it.skip('UseFigcaptionAtStartOrEnd', function () {
      /*eslint max-len: [ 2, 1000, 2 ]*/
      assert.equal(linter.checkString('figure\n  img(src=\'/img/figure1.png\' alt=\'Some Figure\')\n  figcaption Figure 1\n\nfigure\n    figcaption Figure 1\n    img(src=\'/img/figure1.png\' alt=\'Some Figure\')').length, 0)
      assert.equal(linter.checkString('figure\n    img(src=\'/img/figure1.png\' alt=\'Some Figure\')\n    figcaption Figure 1\n    img(src=\'/img/figure1.png\' alt=\'Some Figure\')').length, 1)
    })

    it('UseTitleForAbbr', function () {
      assert.equal(linter.checkString('abbr(title=\'War and Peace\') WaP').length, 0)
      assert.equal(linter.checkString('abbr WaP').length, 1)
    })

    it('UseTypeForOl', function () {
      assert.equal(linter.checkString('ol(type=\'I\'): li thing').length, 0)
      assert.equal(linter.checkString('ol: li thing').length, 1)
    })

    it.skip('UseUTF8', function () {
      assert.equal(linter.checkString('meta(charset=\'UTF-8\')').length, 0)
      assert.equal(linter.checkString('meta(charset=\'UFT8\')').length, 1)
      assert.equal(linter.checkString('meta(charset=\'OtherSet\')').length, 1)
    })

  })

}
