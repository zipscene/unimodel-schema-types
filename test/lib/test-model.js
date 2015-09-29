const { SchemaModel } = require('zs-unimodel');

module.exports = class TestModel extends SchemaModel {

	constructor(modelName, schema, options) {
		super(schema, options);

		this.modelName = modelName;
	}

	getName() {
		return this.modelName;
	}

};
