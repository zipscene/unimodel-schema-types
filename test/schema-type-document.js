const { expect } = require('chai');
const { createSchema } = require('zs-common-schema');
const { documentShorthand } = require('../lib');
const TestModel = require('./lib/test-model');

describe('SchemaTypeDocument', function() {
	it('should create SchemaTypeDocument from shorthand', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));
		let shorthand = documentShorthand(instance);

		expect(shorthand).to.deep.equal({
			type: 'document',
			modelName: 'Test',
			modelType: 'TestModel',
			documentSchema: createSchema({ foo: String }),
			options: {}
		});
	});

	it('should normalize values', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));
		let doc = documentShorthand(instance);

		let schema = createSchema({ doc });

		expect(schema.normalize({ doc: { foo: 32 } })).to.deep.equal({
			doc: { foo: '32' }
		});
	});
});
