// Copyright 2016 Zipscene, LLC
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

const shorthand = (type, instance, options = {}) => {
	return {
		type,
		modelName: instance.getName(),
		modelType: instance.getType(),
		documentSchema: instance.getSchema(),
		options
	};
};

exports.documentType = (instance, options) => shorthand('document', instance, options);
exports.documentUpdateType = (instance, options) => shorthand('documentUpdate', instance, options);
exports.documentQueryType = (instance, options) => shorthand('documentQuery', instance, options);
exports.documentAggregateType = (instance, options) => shorthand('documentAggregate', instance, options);
