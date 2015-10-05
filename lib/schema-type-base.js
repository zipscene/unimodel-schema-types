const _ = require('lodash');
const XError = require('xerror');
const { Schema, SchemaType, createSchema } = require('zs-common-schema');

module.exports = class SchemaTypeBase extends SchemaType {

	constructor(name) {
		super(name);
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

		// Make the documentSchema non-enumerable
		Object.defineProperty(subschema, 'documentSchema', { enumerable: false });

		return subschema;
	}

	normalizeShorthandSchema(subschema) {
		return {
			type: this.getName(),
			modelName: subschema.type.getName(),
			modelType: subschema.type.getType(),
			documentSchema: subschema.type.getSchema(),
			options: {}
		};
	}

};
