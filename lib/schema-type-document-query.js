// Copyright 2016 Zipscene, LLC
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

const { createQuery } = require('common-query');
const SchemaTypeBase = require('./schema-type-base');
const XError = require('xerror');
const { FieldError } = require('common-schema');

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
		if (typeof value === 'string' && value[0] === '{') {
			try {
				value = JSON.parse(value);
			} catch (error) {
				throw new FieldError('invalid', 'Invalid JSON string', { cause: error });
			}
		}
		let query;
		try {
			query = createQuery(value, { schema: subschema.documentSchema });
		} catch (error) {
			if (error.code === XError.QUERY_VALIDATION_ERROR) {
				throw new FieldError('invalid', error.message, { cause: error });
			}

			throw error;
		}

		return query.getData();
	}

	toJSONSchema() {
		return { type: 'string' };
	}

};
