const { expect } = require('chai');
const { defaultSchemaFactory, SchemaType } = require('zs-common-schema');
const { registerTypes } = require('../lib');

describe('index', function() {
	it('registerTypes should register types on schema factories', function() {
		registerTypes(defaultSchemaFactory);

		let types = [ 'document', 'documentUpdate', 'documentQuery', 'documentAggregate' ];

		expect(defaultSchemaFactory._schemaTypes).to.contain.all.keys(types);

		types.forEach((type) => {
			expect(defaultSchemaFactory._schemaTypes[type]).to.be.instanceof(SchemaType);
		});
	});
});
