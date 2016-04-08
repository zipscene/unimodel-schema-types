const { createUpdate } = require('zs-common-query');
const SchemaTypeBase = require('./schema-type-base');
const XError = require('xerror');
const { FieldError } = require('zs-common-schema');

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
		let update;
		try {
			update = createUpdate(value, { schema: subschema.documentSchema });
		} catch (error) {
			if (error.code === XError.UPDATE_VALIDATION_ERROR) {
				throw new FieldError('invalid', error.message, { cause: error });
			}

			throw error;
		}

		return update.getData();
	}

};
