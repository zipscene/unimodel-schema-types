const { createUpdate } = require('zs-common-query');
const SchemaTypeBase = require('./schema-type-base');

module.exports = class SchemaTypeDocumentUpdate extends SchemaTypeBase {

	constructor() {
		super('documentUpdate');
	}

	validate(value, subschema) {
		let update = createUpdate(value, {
			schema: subschema.documentSchema,
			skipValidate: true
		});

		return update.validate();
	}

	normalize(value, subschema) {
		let update = createUpdate(value, { schema: subschema.documentSchema });
		return update.getData();
	}

};
