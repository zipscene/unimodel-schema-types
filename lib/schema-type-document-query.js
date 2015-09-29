const { createQuery } = require('zs-common-query');
const SchemaTypeBase = require('./schema-type-base');

module.exports = class SchemaTypeDocumentQuery extends SchemaTypeBase {

	constructor() {
		super('documentQuery');
	}

	validate(value, subschema) {
		let query = createQuery(value, {
			schema: subschema.documentSchema,
			skipValidate: true
		});

		return query.validate();
	}

	normalize(value, subschema) {
		let query = createQuery(value, { schema: subschema.documentSchema });
		return query.getData();
	}

};
