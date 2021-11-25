// # requireSpecificAttributes: `Array`
//
// ## e.g.: `[ { img: [ "alt" ] } ]`
//
// `img` tags must contain all of the attributes specified.
//
// ```pug
// //- Invalid
// img(src='src')
//
// //- Valid
// img(src='src' alt='alt')
// ```

const assert = require('assert');
const CssParser = require('css-selector-parser').CssSelectorParser;
const utils = require('../utils');

module.exports = function () {};

module.exports.prototype = {
	name: 'requireSpecificAttributes',

	schema: {
		type: ['null', 'array'],
		items: {
			type: 'object',
			additionalProperties: {
				type: 'array',
				items: {
					type: 'string'
				}
			}
		}
	},

	configure(options) {
		assert(
			Array.isArray(options),
			this.name + ' option requires array value or should be removed'
		);

		this._requiredAttributes = options;
	},

	lint(file, errors) {
		for (const attribute of this._requiredAttributes) {
			for (const selector in attribute) {
				/* istanbul ignore else */
				if (Object.prototype.hasOwnProperty.call(attribute, selector)) {
					validateAttribute(attribute, selector);
				}
			}
		}

		function validateAttribute(attribute, selector) {
			const cssParser = new CssParser();
			const cssRule = cssParser.parse(selector).rule;
			const tag = cssRule.tagName;
			const { attrs } = cssRule;

			file.iterateTokensByFilter(
				(token) =>
					token.type === 'tag' &&
					token.val.toLowerCase() === tag.toLowerCase() &&
					compareAttributes(attrs),
				(token) => {
					const lineNumber = token.line;
					const columnNumber = token.col;
					let requiredAttributes = utils.ownProperty(
						attribute,
						selector
					);
					const start = file.getNextTokenByType(token, [
						'newline',
						'start-attributes'
					]);
					const startIndex = (start || token)._index;
					const end = file.getNextTokenByType(token, [
						'newline',
						'end-attributes'
					]);
					const endIndex = (end || token)._index;
					const attributeNames = [];
					let hasAttributes;

					if (typeof requiredAttributes === 'string') {
						requiredAttributes = [requiredAttributes];
					}

					file.iterateTokensByFilter(
						(token) => {
							if (
								token.type === 'attribute' &&
								token._index > startIndex &&
								token._index < endIndex
							) {
								hasAttributes = true;
								return true;
							}
						},
						(token) => {
							attributeNames.push(token.name.toLowerCase());
						}
					);

					if (hasAttributes) {
						for (const attribute of requiredAttributes) {
							if (
								!attributeNames.includes(
									attribute.toLowerCase()
								)
							) {
								errors.add(
									'Tag "' +
										tag +
										'" must have attribute "' +
										attribute +
										'"',
									lineNumber,
									columnNumber
								);
							}
						}
					} else {
						errors.add(
							'Tag "' +
								tag +
								'" must have attributes "' +
								requiredAttributes.join('", "') +
								'"',
							lineNumber,
							columnNumber
						);
					}
				}
			);
		}
	}
};

function compareAttributes(attrs) {
	return attrs === undefined;
}
