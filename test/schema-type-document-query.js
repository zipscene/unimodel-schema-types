// Copyright 2016 Zipscene, LLC
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

const expect = require('chai').expect;
const { defaultSchemaFactory, createSchema } = require('common-schema');
const { registerTypes, documentQueryType } = require('../lib');
const TestModel = require('./lib/test-model');

describe('SchemaTypeDocumentQuery', function() {
	before(() => registerTypes(defaultSchemaFactory));

	it('should create SchemaTypeDocumentQuery from shorthand function', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));

		expect(documentQueryType(instance)).to.deep.equal({
			type: 'documentQuery',
			modelName: 'Test',
			modelType: 'TestModel',
			documentSchema: createSchema({ foo: String }),
			options: {}
		});
	});

	it('should create SchemaTypeDocumentQuery with options from shorthand function', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));

		expect(documentQueryType(instance, { someOption: true })).to.deep.equal({
			type: 'documentQuery',
			modelName: 'Test',
			modelType: 'TestModel',
			documentSchema: createSchema({ foo: String }),
			options: { someOption: true }
		});
	});

	it('should normalize values', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));
		let schema = createSchema({ queryDoc: documentQueryType(instance) });

		expect(schema.normalize({
			queryDoc: { foo: 32 }
		})).to.deep.equal({
			queryDoc: { foo: '32' }
		});
	});
});
