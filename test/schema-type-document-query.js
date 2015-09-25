const expect = require('chai').expect;
const XError = require('xerror');
const { createSchema } = require('zs-common-schema');
const { documentQueryShorthand } = require('../lib');
const TestModel = require('./lib/test-model');

describe('SchemaTypeDocumentQuery', function() {
	it('should create SchemaTypeDocumentQuery from shorthand function', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));

		expect(documentQueryShorthand(instance)).to.deep.equal({
			type: 'documentQuery',
			modelName: 'Test',
			modelType: 'TestModel',
			documentSchema: createSchema({ foo: String }),
			options: {}
		});
	});

	it('should create SchemaTypeDocumentQuery with options from shorthand function', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));

		expect(documentQueryShorthand(instance, { someOption: true })).to.deep.equal({
			type: 'documentQuery',
			modelName: 'Test',
			modelType: 'TestModel',
			documentSchema: createSchema({ foo: String }),
			options: { someOption: true }
		});
	});

	it('should normalize values', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));
		let doc = documentQueryShorthand(instance);
		let schema = createSchema({ doc });

		expect(schema.normalize({ doc: { foo: 32 } })).to.deep.equal({
			doc: { foo: '32' }
		});
	});

	it('should validate values', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));
		let doc = documentQueryShorthand(instance);
		let schema = createSchema({ doc });

		expect(() => schema.validate({ doc: { foo: '32' } })).to.not.throw(XError);
		expect(() => schema.validate({ doc: { foo: 32 } })).to.throw(XError);
	});
});
