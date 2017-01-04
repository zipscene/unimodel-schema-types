// Copyright 2016 Zipscene, LLC
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

const { expect } = require('chai');
const XError = require('xerror');
const { defaultSchemaFactory, createSchema } = require('common-schema');
const { registerTypes, documentType } = require('../lib');
const TestModel = require('./lib/test-model');

describe('SchemaTypeDocument', function() {
	before(() => registerTypes(defaultSchemaFactory));

	it('should create SchemaTypeDocument from schema shorthand', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));
		let schema = createSchema({ doc: instance });
		let expectedSchema = createSchema({ doc: documentType(instance) });

		expect(schema.getData()).to.deep.equal(expectedSchema.getData());
	});

	it('should create SchemaTypeDocument from shorthand function', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));

		expect(documentType(instance)).to.deep.equal({
			type: 'document',
			modelName: 'Test',
			modelType: 'TestModel',
			documentSchema: createSchema({ foo: String }),
			options: {}
		});
	});

	it('should create SchemaTypeDocument with options from shorthand function', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));

		expect(documentType(instance, { someOption: true })).to.deep.equal({
			type: 'document',
			modelName: 'Test',
			modelType: 'TestModel',
			documentSchema: createSchema({ foo: String }),
			options: { someOption: true }
		});
	});

	it('should normalize values', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));
		let schema = createSchema({ doc: documentType(instance) });

		expect(schema.normalize({
			doc: { foo: 32 }
		})).to.deep.equal({
			doc: { foo: '32' }
		});
	});

	it('should validate values', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));
		let schema = createSchema({ doc: documentType(instance) });

		const goodFn = () => {
			schema.validate({
				doc: { foo: '32' }
			});
		};

		const badFn = () => {
			schema.validate({
				doc: { foo: 32 }
			});
		};

		expect(goodFn).to.not.throw(XError);
		expect(badFn).to.throw(XError);
	});

	it('should allow schemas without a modelType', function() {
		createSchema({
			type: 'document',
			modelName: 'Foo'
		});
	});
});
