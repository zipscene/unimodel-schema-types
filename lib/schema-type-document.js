// Copyright 2016 Zipscene, LLC
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

const SchemaTypeBase = require('./schema-type-base');
const objtools = require('objtools');

module.exports = class SchemaTypeDocument extends SchemaTypeBase {

	constructor() {
		super('document');
	}

	validate(value, subschema, field, options) {
		if (!subschema.documentSchema) return true;
		options = objtools.merge({}, subschema.options || {}, options || {});
		return subschema.documentSchema.validate(value, options);
	}

	normalize(value, subschema, field, options) {
		if (!subschema.documentSchema) return value;
		options = objtools.merge({}, subschema.options || {}, options || {});
		return subschema.documentSchema.normalize(value, options);
	}

	matchShorthandType(subschema) {
		return (typeof subschema.find === 'function');
	}

	toJSONSchema(subschema) {
		if (!subschema.documentSchema) return null;
		return subschema.documentSchema.toJSONSchema();
	}

};
