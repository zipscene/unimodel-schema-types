const expect = require('chai').expect;
const { createSchema } = require('zs-common-schema');
const { documentUpdateShorthand } = require('../lib');
const TestModel = require('./lib/test-model');

describe('SchemaTypeDocumentUpdate', function() {
	it('should create SchemaTypeDocumentUpdate from shorthand', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));
		let shorthand = documentUpdateShorthand(instance);

		expect(shorthand).to.deep.equal({
			type: 'documentUpdate',
			modelName: 'Test',
			modelType: 'TestModel',
			documentSchema: createSchema({ foo: String }),
			options: {}
		});
	});

	it('should normalize values', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));
		let doc = documentUpdateShorthand(instance);

		let schema = createSchema({ doc });

		expect(schema.normalize({ doc: { foo: 32 } })).to.deep.equal({
			doc: { foo: '32' }
		});
	});
});
