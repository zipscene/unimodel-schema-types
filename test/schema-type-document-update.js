const expect = require('chai').expect;
const XError = require('xerror');
const { defaultSchemaFactory, createSchema } = require('zs-common-schema');
const { registerTypes, documentUpdateShorthand } = require('../lib');
const TestModel = require('./lib/test-model');

describe('SchemaTypeDocumentUpdate', function() {
	before(() => registerTypes(defaultSchemaFactory));

	it('should create SchemaTypeDocumentUpdate from shorthand function', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));

		expect(documentUpdateShorthand(instance)).to.deep.equal({
			type: 'documentUpdate',
			modelName: 'Test',
			modelType: 'TestModel',
			documentSchema: createSchema({ foo: String }),
			options: {}
		});
	});

	it('should create SchemaTypeDocumentUpdate with options from shorthand function', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));

		expect(documentUpdateShorthand(instance, { someOption: true })).to.deep.equal({
			type: 'documentUpdate',
			modelName: 'Test',
			modelType: 'TestModel',
			documentSchema: createSchema({ foo: String }),
			options: { someOption: true }
		});
	});

	it('should normalize values', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));
		let schema = createSchema({ doc: documentUpdateShorthand(instance) });

		expect(schema.normalize({ doc: { foo: 32 } })).to.deep.equal({
			doc: { foo: '32' }
		});
	});

	it('should validate values', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));
		let schema = createSchema({ doc: documentUpdateShorthand(instance) });

		expect(() => schema.validate({ doc: { foo: '32' } })).to.not.throw(XError);
		expect(() => schema.validate({ doc: { foo: 32 } })).to.throw(XError);
	});
});
