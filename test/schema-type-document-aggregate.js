const expect = require('chai').expect;
const XError = require('xerror');
const { createSchema } = require('zs-common-schema');
const { documentAggregateShorthand } = require('../lib');
const TestModel = require('./lib/test-model');

describe('SchemaTypeDocumentAggregate', function() {
	it('should create SchemaTypeDocumentAggregate from shorthand function', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));

		expect(documentAggregateShorthand(instance)).to.deep.equal({
			type: 'documentAggregate',
			modelName: 'Test',
			modelType: 'TestModel',
			documentSchema: createSchema({ foo: String }),
			options: {}
		});
	});

	it('should create SchemaTypeDocumentAggregate with options from shorthand function', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));

		expect(documentAggregateShorthand(instance, { someOption: true })).to.deep.equal({
			type: 'documentAggregate',
			modelName: 'Test',
			modelType: 'TestModel',
			documentSchema: createSchema({ foo: String }),
			options: { someOption: true }
		});
	});

	it('should normalize values', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));
		let schema = createSchema({ doc: documentAggregateShorthand(instance) });

		expect(schema.normalize({ doc: { foo: 32 } })).to.deep.equal({
			doc: { foo: '32' }
		});
	});

	it('should validate values', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));
		let schema = createSchema({ doc: documentAggregateShorthand(instance) });

		expect(() => schema.validate({ doc: { foo: '32' } })).to.not.throw(XError);
		expect(() => schema.validate({ doc: { foo: 32 } })).to.throw(XError);
	});
});
