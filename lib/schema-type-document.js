const { Model } = require('zs-unimodel');
const SchemaTypeBase = require('./schema-type-base');

module.exports = class SchemaTypeDocument extends SchemaTypeBase {

	constructor() {
		super('document');
	}

	matchShorthandType(subschema) {
		// TODO: duck type?
		return subschema instanceof Model;
	}

};
