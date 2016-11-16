// Copyright 2016 Zipscene, LLC
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

const { createAggregate } = require('common-query');
const SchemaTypeBase = require('./schema-type-base');
const XError = require('xerror');
const { FieldError } = require('common-schema');

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
		let aggregate;

		try {
			aggregate = createAggregate(value, { schema: subschema.documentSchema });
		} catch (error) {
			if (error.code === XError.AGGREGATE_VALIDATION_ERROR) {
				throw new FieldError('invalid', error.message, { cause: error });
			}

			throw error;
		}

		return aggregate.getData();
	}

};
