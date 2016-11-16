// Copyright 2016 Zipscene, LLC
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

const { expect } = require('chai');
const { defaultSchemaFactory, SchemaType } = require('common-schema');
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
