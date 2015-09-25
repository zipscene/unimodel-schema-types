const expect = require('chai').expect;
const { createSchema } = require('zs-common-schema');
const { documentAggregateShorthand } = require('../lib');
const TestModel = require('./lib/test-model');

describe('SchemaTypeDocumentAggregate', function() {
	it('should create SchemaTypeDocumentAggregate from shorthand', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));
		let shorthand = documentAggregateShorthand(instance);

		expect(shorthand).to.deep.equal({
			type: 'documentAggregate',
			modelName: 'Test',
			modelType: 'TestModel',
			documentSchema: createSchema({ foo: String }),
			options: {}
		});
	});

	it('should normalize values', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));
		let doc = documentAggregateShorthand(instance);

		let schema = createSchema({ doc });

		expect(schema.normalize({ doc: { foo: 32 } })).to.deep.equal({
			doc: { foo: '32' }
		});
	});
});
