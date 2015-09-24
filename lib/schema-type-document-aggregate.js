const { SchemaType } = require('zs-common-schema');

module.exports = class SchemaTypeDocumentAggregate extends SchemaType {

	constructor(name) {
		super(name || 'documentAggregate');
	}

	normalizeSchema(subschema) {
		subschema.documentSchema.normalize();
		return subschema;
	}

};
