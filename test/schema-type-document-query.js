const expect = require('chai').expect;
const { createSchema } = require('zs-common-schema');
const { documentQueryShorthand } = require('../lib');
const TestModel = require('./lib/test-model');

describe('SchemaTypeDocumentQuery', function() {
	it('should create SchemaTypeDocumentQuery from shorthand', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));
		let shorthand = documentQueryShorthand(instance);

		expect(shorthand).to.deep.equal({
			type: 'documentQuery',
			modelName: 'Test',
			modelType: 'TestModel',
			documentSchema: createSchema({ foo: String }),
			options: {}
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
});
