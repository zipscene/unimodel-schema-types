const shorthand = (type, instance, options = {}) => {
	return {
		type,
		modelName: instance.getName(),
		modelType: instance.getModelType(),
		documentSchema: instance.getSchema(),
		options
	};
};

exports.documentShorthand = (instance, options) => shorthand('document', instance, options);
exports.documentUpdateShorthand = (instance, options) => shorthand('documentUpdate', instance, options);
exports.documentQueryShorthand = (instance, options) => shorthand('documentQuery', instance, options);
exports.documentAggregateShorthand = (instance, options) => shorthand('documentAggregate', instance, options);
