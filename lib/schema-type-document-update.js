const SchemaTypeBase = require('./schema-type-base');

module.exports = class SchemaTypeDocument extends SchemaTypeBase {

	constructor() {
		super('documentUpdate');
	}

};
