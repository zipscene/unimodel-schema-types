const { expect } = require('chai');
const { createSchema } = require('zs-common-schema');
const {
	documentShorthand,
	documentUpdateShorthand,
	documentQueryShorthand,
	documentAggregateShorthand
} = require('../lib');
const TestModel = require('./lib/test-model');

describe('shorthand', function() {
	it('should create SchemaTypeDocument with shorthand', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));
		let shorthand = documentShorthand(instance);

		expect(shorthand).to.deep.equal({
			type: 'document',
			modelName: instance.getName(),
			modelType: instance.getType(),
			documentSchema: instance.getSchema(),
			options: {}
		});
	});

	it('should create SchemaTypeDocumentUpdate with shorthand', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));
		let shorthand = documentUpdateShorthand(instance);

		expect(shorthand).to.deep.equal({
			type: 'documentUpdate',
			modelName: instance.getName(),
			modelType: instance.getType(),
			documentSchema: instance.getSchema(),
			options: {}
		});
	});

	it('should create SchemaTypeDocumentQuery with shorthand', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));
		let shorthand = documentQueryShorthand(instance);

		expect(shorthand).to.deep.equal({
			type: 'documentQuery',
			modelName: instance.getName(),
			modelType: instance.getType(),
			documentSchema: instance.getSchema(),
			options: {}
		});
	});

	it('should create SchemaTypeDocumentAggregate with shorthand', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));
		let shorthand = documentAggregateShorthand(instance);

		expect(shorthand).to.deep.equal({
			type: 'documentAggregate',
			modelName: instance.getName(),
			modelType: instance.getType(),
			documentSchema: instance.getSchema(),
			options: {}
		});
	});
});
