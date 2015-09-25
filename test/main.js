const expect = require('chai').expect;
const { defaultSchemaFactory } = require('zs-common-schema');
const {
	SchemaTypeDocument,
	SchemaTypeDocumentUpdate,
	SchemaTypeDocumentQuery,
	SchemaTypeDocumentAggregate
} = require('../lib');

describe('General', function() {
	it('should add types to the global registry', function() {
		const fn = () => {
			defaultSchemaFactory.registerType('document', new SchemaTypeDocument());
			defaultSchemaFactory.registerType('documentUpdate', new SchemaTypeDocumentUpdate());
			defaultSchemaFactory.registerType('documentQuery', new SchemaTypeDocumentQuery());
			defaultSchemaFactory.registerType('documentAggregate', new SchemaTypeDocumentAggregate());
		};

		expect(fn).to.not.throw(XError);
		expect(fn).to.not.throw(Error);
	});
});
