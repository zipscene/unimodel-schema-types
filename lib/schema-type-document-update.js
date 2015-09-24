const { SchemaType } = require('zs-common-schema');

module.exports = class SchemaTypeDocument extends SchemaType {

	constructor(name) {
		super(name || 'documentUpdate');
	}

	normalizeSchema(subschema) {
		subschema.documentSchema.normalize();
		return subschema;
	}

};
