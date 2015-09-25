const expect = require('chai').expect;
const {
	documentShorthand,
	documentUpdateShorthand,
	documentQueryShorthand,
	documentAggregateShorthand
} = require('../lib');
const TestModel = require('./lib/test-model');

describe('shorthand', function() {
	it('should create SchemaTypeDocument with shorthand', function() {
		let instance = new TestModel();
		let shorthand = documentShorthand(instance);

		expect(shorthand).to.deep.equal({
			type: 'document',
			modelName: instance.getName(),
			modelType: instance.getModelType(),
			documentSchema: instance.getSchema(),
			options: {}
		});
	});

	it('should create SchemaTypeDocumentUpdate with shorthand', function() {
		let instance = new TestModel();
		let shorthand = documentUpdateShorthand(instance);

		expect(shorthand).to.deep.equal({
			type: 'document',
			modelName: instance.getName(),
			modelType: instance.getModelType(),
			documentSchema: instance.getSchema(),
			options: {}
		});
	});

	it('should create SchemaTypeDocumentQuery with shorthand', function() {
		let instance = new TestModel();
		let shorthand = documentQueryShorthand(instance);

		expect(shorthand).to.deep.equal({
			type: 'document',
			modelName: instance.getName(),
			modelType: instance.getModelType(),
			documentSchema: instance.getSchema(),
			options: {}
		});
	});

	it('should create SchemaTypeDocumentAggregate with shorthand', function() {
		let instance = new TestModel();
		let shorthand = documentAggregateShorthand(instance);

		expect(shorthand).to.deep.equal({
			type: 'document',
			modelName: instance.getName(),
			modelType: instance.getModelType(),
			documentSchema: instance.getSchema(),
			options: {}
		});
	});
});
