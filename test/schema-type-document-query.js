const expect = require('chai').expect;
const { defaultSchemaFactory } = require('zs-common-schema');
const XError = require('xerror');
const { SchemaTypeDocument } = require('../lib');

describe('blah', function() {
	it('should do stuff', function() {
		const fn = () => {
			defaultSchemaFactory.registerType('document', new SchemaTypeDocument());
		};

		expect(fn).to.not.throw(XError);
		expect(fn).to.not.throw(Error);
	});
});
