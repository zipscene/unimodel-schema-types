const SchemaTypeDocument = require('./schema-type-document');
const SchemaTypeDocumentUpdate = require('./schema-type-document-update');
const SchemaTypeDocumentQuery = require('./schema-type-document-query');
const SchemaTypeDocumentAggregate = require('./schema-type-document-aggregate');
const {
	documentShorthand,
	documentUpdateShorthand,
	documentQueryShorthand,
	documentAggregateShorthand
} = require('./shorthand');

exports.SchemaTypeDocument = SchemaTypeDocument;
exports.SchemaTypeDocumentUpdate = SchemaTypeDocumentUpdate;
exports.SchemaTypeDocumentQuery = SchemaTypeDocumentQuery;
exports.SchemaTypeDocumentAggregate = SchemaTypeDocumentAggregate;

exports.documentShorthand = documentShorthand;
exports.documentUpdateShorthand = documentUpdateShorthand;
exports.documentQueryShorthand = documentQueryShorthand;
exports.documentAggregateShorthand = documentAggregateShorthand;

// Register the schema types on a specified schema factory
exports.registerTypes = function(schemaFactory) {
	schemaFactory.registerType('document', new SchemaTypeDocument());
	schemaFactory.registerType('documentUpdate', new SchemaTypeDocumentUpdate());
	schemaFactory.registerType('documentQuery', new SchemaTypeDocumentQuery());
	schemaFactory.registerType('documentAggregate', new SchemaTypeDocumentAggregate());
};
