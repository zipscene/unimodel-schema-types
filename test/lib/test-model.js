// Copyright 2016 Zipscene, LLC
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

const { SchemaModel } = require('unimodel-core');

module.exports = class TestModel extends SchemaModel {

	constructor(modelName, schema, options) {
		super(schema, options);

		this.modelName = modelName;
	}

	getName() {
		return this.modelName;
	}

};
