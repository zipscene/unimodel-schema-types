# zs-model-schema-types

`zs-model-schema-types` is a collection of schema types for [zs-common-schema](https://git.zipscene.com/zsapilibs/zs-common-schema).
They encapsulate model-related concepts found in [zs-unimodel](https://git.zipscene.com/zsapilibs/zs-unimodel).


## Overview

When creating schemas for API call parameter validation, sometimes those API call parameters can be full model instances.
For example, an API call to create a document will contain that document as a parameter, and that document itself would correspond to a schema.
Another example would be an API call to update a document---it would take a valid `Update` as a parameter.

This project lets us validate and normalize such parameters.
It contains common-schema `SchemaType` classes for `Document`, `DocumentUpdate`, `DocumentQuery`, and `DocumentAggregate`.

To use these schema types in projects, first register them with a schema factory.

```javascript
const { defaultSchemaFactory } = require('zs-common-schema');
const { registerTypes } = require('zs-model-schema-types');

registerTypes(defaultSchemaFactory);
```

After the schema types are registered, they may be used inside schemas.
The easiest way to do this is to use the provided shorthands, explained below.

Here is a small example, where `FooModel` is a `Unimodel.Model` instance, using a useful `SchemaTypeDocument` shorthand:

```javascript
let instance = new FooModel(createSchema({ foo: String }));
let schema = createSchema({ doc: instance });
```

In this example, a document instance is used as a shorthand inside a schema definition.
When normalizing against `schema`, `doc.foo` normalizes to a `String`.

```javascript
schema.normalize({ doc: { foo: 32 } });
// => { doc: { foo: '32' } }
```


## SchemaTypes


### SchemaTypeDocument

Schema type for `Document` instances.

```javascript
let schema = createSchema({
	foo: {
		type: 'document',
		modelName: 'Foo',
		modelType: 'FooModel',
		documentSchema: createSchema({ foo: String }),
		options: {}
	}
});
```


### SchemaTypeDocumentUpdate

Schema type for `DocumentUpdate` instances.

```javascript
let schema = createSchema({
	foo: {
		type: 'documentUpdate',
		modelName: 'Foo',
		modelType: 'FooModel',
		documentSchema: createSchema({ foo: String }),
		options: {}
	}
});
```


### SchemaTypeDocumentQuery

Schema type for `DocumentQuery` instances.

```javascript
let schema = createSchema({
	foo: {
		type: 'documentQuery',
		modelName: 'Foo',
		modelType: 'FooModel',
		documentSchema: createSchema({ foo: String }),
		options: {}
	}
});
```


### SchemaTypeDocumentAggregate.

Schema type for `DocumentAggregate` instances.

```javascript
let schema = createSchema({
	foo: {
		type: 'documentAggregate',
		modelName: 'Foo',
		modelType: 'FooModel',
		documentSchema: createSchema({ foo: String }),
		options: {}
	}
});
```


## Shorthand

Convenient shorthand methods are included as an alternative to the verbose syntax above.

```javascript
const {
	documentType,
	documentUpdateType,
	documentQueryType,
	documentAggregateType
} = require('zs-model-schema-types');

let instance = new FooModel(createSchema({ foo: String }));

let schema = createSchema({
	doc: documentType(instance),
	docUpdate: documentUpdateType(instance),
	docQuery: documentQueryType(instance),
	docAggregate: documentAggregateType(instance)
});
```

As mentioned in the overview, `SchemaTypeDocument` has an additional shorthand, where an instance may be used directly.

```javascript
let instance = new FooModel(createSchema({ foo: String }));
let schema = createSchema({
	doc: instance
});
```
