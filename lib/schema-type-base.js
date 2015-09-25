const XError = require('xerror');
const { Schema, SchemaType } = require('zs-common-schema');

module.exports = class SchemaTypeBase extends SchemaType {

	constructor(name) {
		super(name);
	}

	validate(value) {
		return value;
	}

	normalize(value, subschema) {
		subschema.documentSchema.normalize();
		return value;
	}

	normalizeSchema(subschema) {
		let type = this.getName();

		if (!_.isPlainObject(subschema)) throw new XError(XError.INVALID_ARGUMENT, `Subschema must be an object.`);
		if (subschema.type !== type) throw new XError(XError.INVALID_ARGUMENT, `Type must be '${type}'.`);
		if (!_.isString(subschema.modelName)) throw new XError(XError.INVALID_ARGUMENT, `Model name must be a string.`);
		if (!_.isString(subschema.modelType)) throw new XError(XError.INVALID_ARGUMENT, `Model type must be a string.`);

		if (!Schema.isSchema(subschema.documentSchema)) {
			subschema.documentSchema = createSchema(subschema.documentSchema);
		}

		return subschema;
	}

	normalizeShorthandSchema(subschema) {
		return {
			type: this.getName(),
			modelName: subschema.type.getName(),
			modelType: subschema.type.getModelType(),
			documentSchema: subschema.type.getSchema()
		};
	}

};
