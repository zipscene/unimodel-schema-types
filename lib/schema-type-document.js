const { Model } = require('zs-unimodel');
const SchemaTypeBase = require('./schema-type-base');

module.exports = class SchemaTypeDocument extends SchemaTypeBase {

	constructor() {
		super('document');
	}

	validate(value, subschema) {
		return subschema.documentSchema.validate(value);
	}

	normalize(value, subschema) {
		return subschema.documentSchema.normalize(value);
	}

	matchShorthandType(subschema) {
		return Model.isModel(subschema);
	}

};
