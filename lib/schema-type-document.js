const _ = require('lodash');

// Copyright 2016 Zipscene, LLC
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

const SchemaTypeBase = require('./schema-type-base');

module.exports = class SchemaTypeDocument extends SchemaTypeBase {

	constructor() {
		super('document');
	}

	validate(value, subschema) {
		if (!subschema.documentSchema) return true;
		return subschema.documentSchema.validate(value, subschema.options);
	}

	normalize(value, subschema) {
		if (!subschema.documentSchema) return value;
		return subschema.documentSchema.normalize(value, subschema.options);
	}

	matchShorthandType(subschema) {
		return (typeof subschema.find === 'function');
	}

	toJSONSchema(subschema, schema) {
		// Retrun the locally defined schema, if avaiable.
		if (subschema.documentSchema) {
			return subschema.documentSchema.toJSONSchema();
		} else if (subschema.modelName) {
			// Try and find any referenced model in the schema registry and add it to the definitions.
			let model = schema._schemaFactory.getRegisteredSchema(subschema.modelName);

			if (model) {
				if (!schema.jsonSchemaDefinitions[subschema.modelName]) {
					let modelJsonSchema = model.toJSONSchema();

					// Include definitions from referenced model schema
					if (modelJsonSchema.definitions) {
						_.assignIn(schema.jsonSchemaDefinitions, modelJsonSchema.definitions);
						delete modelJsonSchema.definitions;
					}

					schema.jsonSchemaDefinitions[subschema.modelName] = modelJsonSchema;
				}

				return {
					description: subschema.description || subschema.modelName,
					$ref: `#/definitions/${subschema.modelName}`
				};
			}
		}

		// Type mixed
		return {
			description: subschema.description || subschema.modelName
		};
	}

};
