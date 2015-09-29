const expect = require('chai').expect;
const XError = require('xerror');
const { defaultSchemaFactory, createSchema } = require('zs-common-schema');
const { registerTypes, documentAggregateType } = require('../lib');
const TestModel = require('./lib/test-model');

describe('SchemaTypeDocumentAggregate', function() {
	before(() => registerTypes(defaultSchemaFactory));

	it('should create SchemaTypeDocumentAggregate from shorthand function', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));

		expect(documentAggregateType(instance)).to.deep.equal({
			type: 'documentAggregate',
			modelName: 'Test',
			modelType: 'TestModel',
			documentSchema: createSchema({ foo: String }),
			options: {}
		});
	});

	it('should create SchemaTypeDocumentAggregate with options from shorthand function', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));

		expect(documentAggregateType(instance, { someOption: true })).to.deep.equal({
			type: 'documentAggregate',
			modelName: 'Test',
			modelType: 'TestModel',
			documentSchema: createSchema({ foo: String }),
			options: { someOption: true }
		});
	});

	it('should normalize values', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));
		let aggregateDoc = documentAggregateType(instance);
		let schema = createSchema({ aggregateDoc });

		expect(schema.normalize({
			aggregateDoc: { stats: 'foo', total: true }
		})).to.deep.equal({
			aggregateDoc: {
				stats: { foo: { count: true } },
				total: true
			}
		});
	});

	it('should validate values', function() {
		let instance = new TestModel('Test', createSchema({ foo: String }));
		let aggregateDoc = documentAggregateType(instance);
		let schema = createSchema({ aggregateDoc }, { skipValidate: true });

		const goodFn = () => {
			schema.validate({
				aggregateDoc: {
					stats: { foo: { count: true } },
					total: true
				}
			});
		};

		const badFn = () => {
			schema.validate({
				aggregateDoc: { stats: 'foo', total: true }
			});
		};

		expect(goodFn).to.not.throw(XError);
		expect(badFn).to.throw(XError);
	});
});
