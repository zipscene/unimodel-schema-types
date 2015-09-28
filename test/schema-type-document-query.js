const expect = require('chai').expect;
const XError = require('xerror');
const { defaultSchemaFactory, createSchema } = require('zs-common-schema');
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
		let doc = documentQueryType(instance);
		let schema = createSchema({ doc });

		expect(schema.normalize({ doc: { foo: 32 } })).to.deep.equal({
			doc: { foo: '32' }
		});
	});

	it('should validate values', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));
		let doc = documentQueryType(instance);
		let schema = createSchema({ doc });

		expect(() => schema.validate({ doc: { foo: '32' } })).to.not.throw(XError);
		expect(() => schema.validate({ doc: { foo: 32 } })).to.throw(XError);
	});
});
