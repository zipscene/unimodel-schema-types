const expect = require('chai').expect;
const { defaultSchemaFactory, createSchema } = require('zs-common-schema');
const { registerTypes, documentUpdateType } = require('../lib');
const TestModel = require('./lib/test-model');

describe('SchemaTypeDocumentUpdate', function() {
	before(() => registerTypes(defaultSchemaFactory));

	it('should create SchemaTypeDocumentUpdate from shorthand function', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));

		expect(documentUpdateType(instance)).to.deep.equal({
			type: 'documentUpdate',
			modelName: 'Test',
			modelType: 'TestModel',
			documentSchema: createSchema({ foo: String }),
			options: {}
		});
	});

	it('should create SchemaTypeDocumentUpdate with options from shorthand function', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));

		expect(documentUpdateType(instance, { someOption: true })).to.deep.equal({
			type: 'documentUpdate',
			modelName: 'Test',
			modelType: 'TestModel',
			documentSchema: createSchema({ foo: String }),
			options: { someOption: true }
		});
	});

	it('should normalize values', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));
		let updateDoc = documentUpdateType(instance);
		let schema = createSchema({ updateDoc });

		expect(schema.normalize({
			updateDoc: { $set: { foo: 32 } }
		})).to.deep.equal({
			updateDoc: { $set: { foo: '32' } }
		});
	});
});
