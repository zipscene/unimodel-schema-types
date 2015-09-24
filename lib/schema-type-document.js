const { SchemaType } = require('zs-common-schema');
const { Model } = require('zs-unimodel');

module.exports = class SchemaTypeDocument extends SchemaType {

	constructor(name) {
		super(name || 'document');
	}

	matchShorthandType(subschema) {
		// TODO: duck type?
		return subschema instanceof Model;
	}

	normalizeSchema(subschema) {
		subschema.documentSchema.normalize();
		return subschema;
	}

	normalizeShorthandSchema(subschema) {
		return {
			type: 'document',
			modelName: subschema.type.getName(),
			modelType: subschema.type.getModelType(),
			documentSchema: subschema.type.getSchema()
		};
	}

};
