const { createAggregate } = require('zs-common-query');
const SchemaTypeBase = require('./schema-type-base');

module.exports = class SchemaTypeDocumentAggregate extends SchemaTypeBase {

	constructor() {
		super('documentAggregate');
	}

	validate(value, subschema) {
		let aggregate = createAggregate(value, {
			schema: subschema.documentSchema,
			skipValidate: true
		});

		return aggregate.validate();
	}

	normalize(value, subschema) {
		let aggregate = createAggregate(value, { schema: subschema.documentSchema });
		return aggregate.getData();
	}

};
