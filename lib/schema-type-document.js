// Copyright 2016 Zipscene, LLC
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

const { Model } = require('unimodel-core');
const SchemaTypeBase = require('./schema-type-base');

module.exports = class SchemaTypeDocument extends SchemaTypeBase {

	constructor() {
		super('document');
	}

	validate(value, subschema) {
		if (!subschema.documentSchema) return true;
		return subschema.documentSchema.validate(value);
	}

	normalize(value, subschema) {
		if (!subschema.documentSchema) return value;
		return subschema.documentSchema.normalize(value);
	}

	matchShorthandType(subschema) {
		return Model.isModel(subschema);
	}

	toJSONSchema(subschema) {
		if (!subschema.documentSchema) return null;
		return subschema.documentSchema.toJSONSchema();
	}

};
