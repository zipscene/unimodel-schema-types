// Copyright 2016 Zipscene, LLC
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

const { expect } = require('chai');
const { defaultSchemaFactory, createSchema } = require('common-schema');
const { registerTypes } = require('../lib');

describe('SchemaTypeDocument.toJSON', function() {
	before(() => registerTypes(defaultSchemaFactory));

	it('should convert document types to definitions', function() {
		let Foo = createSchema({
			bar: {
				type: 'document',
				modelName: 'Bar'
			}
		});
		// defaultSchemaFactory.registerSchema('Foo', Foo);


		let Bar = createSchema({
			biz: Number,
			baz: String
		});
		defaultSchemaFactory.registerSchema('Bar', Bar);

		let fooJsonSchema = Foo.toJSONSchema();
		expect(fooJsonSchema).to.have.property('definitions').to.have.property('Bar');
		expect(fooJsonSchema.definitions.Bar).to.be.deep.equal(Bar.toJSONSchema());
	});

});