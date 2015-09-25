const expect = require('chai').expect;
const { defaultSchemaFactory } = require('zs-common-schema');
const { SchemaTypeDocument } = require('../lib');

defaultSchemaFactory.registerType('document', new SchemaTypeDocument());

describe('SchemaTypeDocument', function() {
});
