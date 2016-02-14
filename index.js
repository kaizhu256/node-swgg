/*jslint
    bitwise: true,
    browser: true,
    maxerr: 8,
    maxlen: 96,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
(function () {
    'use strict';
    var local;



    // run shared js-env code - pre-init
    (function () {
        // init local
        local = {};
        // init modeJs
        local.modeJs = (function () {
            try {
                return typeof navigator.userAgent === 'string' &&
                    typeof document.querySelector('body') === 'object' &&
                    typeof XMLHttpRequest.prototype.open === 'function' &&
                    'browser';
            } catch (errorCaughtBrowser) {
                return module.exports &&
                    typeof process.versions.node === 'string' &&
                    typeof require('http').createServer === 'function' &&
                    'node';
            }
        }());
        // init global
        local.global = local.modeJs === 'browser'
            ? window
            : global;
        // init utility2
        local.utility2 = local.modeJs === 'browser'
            ? local.global.utility2
            : require('utility2');
        // init swagger-lite
        local.swgg = { cacheDict: { collection: {}, pathObject: {} }, local: local };
        // init nedb
        local.swgg.Nedb = local.modeJs === 'browser'
            ? local.global.Nedb || local.utility2.nop
            : require('./lib.nedb.js');
        // init swagger-tools
        local.swgg.tools = local.modeJs === 'browser'
            ? local.global.SwaggerTools.specs
            : require('./lib.swagger-tools.js');
        // init pathObjectDefault
        local.swgg.cacheDict.pathObjectDefault = {
            crudCountManyByQuery: {
                _method: 'get',
                _path: '/{{_pathPrefix}}/crudCountManyByQuery',
                _pathPrefix: '{{_pathPrefix}}',
                operationId: 'crudCountManyByQuery',
                parameters: [{
                    default: '{}',
                    description: 'query param',
                    format: 'json',
                    in: 'query',
                    name: 'query',
                    type: 'string'
                }],
                summary: 'count many {{_schemaName}} objects by query',
                tags: ['{{_pathPrefix}}']
            },
            crudCreateOrReplaceMany: {
                _method: 'put',
                _path: '/{{_pathPrefix}}/crudCreateOrReplaceMany',
                _pathPrefix: '{{_pathPrefix}}',
                operationId: 'crudCreateOrReplaceMany',
                parameters: [{
                    description: '{{_schemaName}} object',
                    in: 'body',
                    name: 'body',
                    required: true,
                    schema: { items: { $ref: '#/definitions/{{_schemaName}}' }, type: 'array' }
                }],
                responses: {
                    200: {
                        description:
                            '200 ok - http://jsonapi.org/format/#document-structure-top-level',
                        schema: { $ref: '#/definitions/JsonapiResponse{{_schemaName}}' }
                    }
                },
                summary: 'create or replace many {{_schemaName}} objects',
                tags: ['{{_pathPrefix}}']
            },
            crudCreateOrReplaceOne: {
                _method: 'put',
                _path: '/{{_pathPrefix}}/crudCreateOrReplaceOne',
                _pathPrefix: '{{_pathPrefix}}',
                operationId: 'crudCreateOrReplaceOne',
                parameters: [{
                    description: '{{_schemaName}} object',
                    in: 'body',
                    name: 'body',
                    required: true,
                    schema: { $ref: '#/definitions/{{_schemaName}}' }
                }],
                responses: {
                    200: {
                        description:
                            '200 ok - http://jsonapi.org/format/#document-structure-top-level',
                        schema: { $ref: '#/definitions/JsonapiResponse{{_schemaName}}' }
                    }
                },
                summary: 'create or replace one {{_schemaName}} object',
                tags: ['{{_pathPrefix}}']
            },
            crudCreateOrReplaceOneByKeyUnique: {
                _keyUnique: '{{_keyUnique}}',
                _method: 'put',
                _path: '/{{_pathPrefix}}/crudCreateOrReplaceOneByKeyUnique/{{{_keyUnique}}}',
                _pathPrefix: '{{_pathPrefix}}',
                operationId: 'crudCreateOrReplaceOneByKeyUnique.{{_keyUnique}}',
                parameters: [{
                    description: '{{_schemaName}} {{_keyUnique}}',
                    in: 'path',
                    name: '{{_keyUnique}}',
                    required: true,
                    type: 'string'
                }, {
                    description: '{{_schemaName}} object',
                    in: 'body',
                    name: 'body',
                    required: true,
                    schema: { $ref: '#/definitions/{{_schemaName}}' }
                }],
                responses: {
                    200: {
                        description:
                            '200 ok - http://jsonapi.org/format/#document-structure-top-level',
                        schema: { $ref: '#/definitions/JsonapiResponse{{_schemaName}}' }
                    }
                },
                summary: 'create or replace one {{_schemaName}} object',
                tags: ['{{_pathPrefix}}']
            },
            crudCreateOrUpdateOne: {
                _method: 'patch',
                _path: '/{{_pathPrefix}}/crudCreateOrUpdateOne',
                _pathPrefix: '{{_pathPrefix}}',
                operationId: 'crudCreateOrUpdateOne',
                parameters: [{
                    description: '{{_schemaName}} object',
                    in: 'body',
                    name: 'body',
                    required: true,
                    schema: { $ref: '#/definitions/{{_schemaName}}' }
                }],
                responses: {
                    200: {
                        description:
                            '200 ok - http://jsonapi.org/format/#document-structure-top-level',
                        schema: { $ref: '#/definitions/JsonapiResponse{{_schemaName}}' }
                    }
                },
                summary: 'create or update one {{_schemaName}} object',
                tags: ['{{_pathPrefix}}']
            },
            crudCreateOrUpdateOneByKeyUnique: {
                _keyUnique: '{{_keyUnique}}',
                _method: 'patch',
                _path: '/{{_pathPrefix}}/crudCreateOrUpdateOneByKeyUnique/{{{_keyUnique}}}',
                _pathPrefix: '{{_pathPrefix}}',
                operationId: 'crudCreateOrUpdateOneByKeyUnique.{{_keyUnique}}',
                parameters: [{
                    description: '{{_schemaName}} {{_keyUnique}}',
                    in: 'path',
                    name: '{{_keyUnique}}',
                    required: true,
                    type: 'string'
                }, {
                    description: '{{_schemaName}} object',
                    in: 'body',
                    name: 'body',
                    required: true,
                    schema: { $ref: '#/definitions/{{_schemaName}}' }
                }],
                responses: {
                    200: {
                        description:
                            '200 ok - http://jsonapi.org/format/#document-structure-top-level',
                        schema: { $ref: '#/definitions/JsonapiResponse{{_schemaName}}' }
                    }
                },
                summary: 'create or update one {{_schemaName}} object',
                tags: ['{{_pathPrefix}}']
            },
            crudDeleteManyByQuery: {
                _method: 'delete',
                _path: '/{{_pathPrefix}}/crudDeleteManyByQuery',
                _pathPrefix: '{{_pathPrefix}}',
                operationId: 'crudDeleteManyByQuery',
                parameters: [{
                    default: '{"id":"undefined"}',
                    description: 'query param',
                    format: 'json',
                    in: 'query',
                    name: 'query',
                    required: true,
                    type: 'string'
                }],
                responses: {
                    200: {
                        description:
                            '200 ok - http://jsonapi.org/format/#document-structure-top-level',
                        schema: { $ref: '#/definitions/JsonapiResponse{{_schemaName}}' }
                    }
                },
                summary: 'delete many {{_schemaName}} objects by query',
                tags: ['{{_pathPrefix}}']
            },
            crudDeleteOneByKeyUnique: {
                _keyUnique: '{{_keyUnique}}',
                _method: 'delete',
                _path: '/{{_pathPrefix}}/crudDeleteOneByKeyUnique/{{{_keyUnique}}}',
                _pathPrefix: '{{_pathPrefix}}',
                operationId: 'crudDeleteOneByKeyUnique.{{_keyUnique}}',
                parameters: [{
                    description: '{{_schemaName}} {{_keyUnique}}',
                    in: 'path',
                    name: '{{_keyUnique}}',
                    required: true,
                    type: 'string'
                }],
                summary: 'delete one {{_schemaName}} object by {{_keyUnique}}',
                tags: ['{{_pathPrefix}}']
            },
            crudExistsOneByKeyUnique: {
                _keyUnique: '{{_keyUnique}}',
                _method: 'get',
                _path: '/{{_pathPrefix}}/crudExistsOneByKeyUnique/{{{_keyUnique}}}',
                _pathPrefix: '{{_pathPrefix}}',
                operationId: 'crudExistsOneByKeyUnique.{{_keyUnique}}',
                parameters: [{
                    description: '{{_schemaName}} {{_keyUnique}}',
                    in: 'path',
                    name: '{{_keyUnique}}',
                    required: true,
                    type: 'string'
                }],
                summary: 'check if one {{_schemaName}} object exists by {{_keyUnique}}',
                tags: ['{{_pathPrefix}}']
            },
            crudGetManyByQuery: {
                _method: 'get',
                _path: '/{{_pathPrefix}}/crudGetManyByQuery',
                _pathPrefix: '{{_pathPrefix}}',
                operationId: 'crudGetManyByQuery',
                parameters: [{
                    default: '{}',
                    description: 'query param',
                    format: 'json',
                    in: 'query',
                    name: 'query',
                    required: true,
                    type: 'string'
                }, {
                    default: '{}',
                    description: 'fields param',
                    format: 'json',
                    in: 'query',
                    name: 'fields',
                    type: 'string'
                }, {
                    default: 20,
                    description: 'cursor limit param',
                    in: 'query',
                    name: 'limit',
                    required: true,
                    type: 'integer'
                }, {
                    default: 0,
                    description: 'cursor skip param',
                    in: 'query',
                    name: 'skip',
                    type: 'integer'
                }, {
                    default: '{"updatedAt":-1}',
                    description: 'cursor sort param',
                    format: 'json',
                    in: 'query',
                    name: 'sort',
                    type: 'string'
                }],
                responses: {
                    200: {
                        description:
                            '200 ok - http://jsonapi.org/format/#document-structure-top-level',
                        schema: { $ref: '#/definitions/JsonapiResponse{{_schemaName}}' }
                    }
                },
                summary: 'get many {{_schemaName}} objects by query',
                tags: ['{{_pathPrefix}}']
            },
            crudGetOneByKeyUnique: {
                _keyUnique: '{{_keyUnique}}',
                _method: 'get',
                _path: '/{{_pathPrefix}}/crudGetOneByKeyUnique/{{{_keyUnique}}}',
                _pathPrefix: '{{_pathPrefix}}',
                operationId: 'crudGetOneByKeyUnique.{{_keyUnique}}',
                parameters: [{
                    description: '{{_schemaName}} {{_keyUnique}}',
                    in: 'path',
                    name: '{{_keyUnique}}',
                    required: true,
                    type: 'string'
                }],
                responses: {
                    200: {
                        description:
                            '200 ok - http://jsonapi.org/format/#document-structure-top-level',
                        schema: { $ref: '#/definitions/JsonapiResponse{{_schemaName}}' }
                    }
                },
                summary: 'get one {{_schemaName}} object by {{_keyUnique}}',
                tags: ['{{_pathPrefix}}']
            },
            crudGetOneByQuery: {
                _method: 'get',
                _path: '/{{_pathPrefix}}/crudGetOneByQuery',
                _pathPrefix: '{{_pathPrefix}}',
                operationId: 'crudGetOneByQuery',
                parameters: [{
                    default: '{}',
                    description: 'query param',
                    format: 'json',
                    in: 'query',
                    name: 'query',
                    required: true,
                    type: 'string'
                }, {
                    default: '{}',
                    description: 'fields param',
                    format: 'json',
                    in: 'query',
                    name: 'fields',
                    type: 'string'
                }],
                responses: {
                    200: {
                        description:
                            '200 ok - http://jsonapi.org/format/#document-structure-top-level',
                        schema: { $ref: '#/definitions/JsonapiResponse{{_schemaName}}' }
                    }
                },
                summary: 'get one {{_schemaName}} object by query',
                tags: ['{{_pathPrefix}}']
            }
        };
        // stringify pathObjectDefault items to prevent side-effects
        Object.keys(local.swgg.cacheDict.pathObjectDefault).forEach(function (key) {
            local.swgg.cacheDict.pathObjectDefault[key] =
                JSON.stringify(local.swgg.cacheDict.pathObjectDefault[key]);
        });
        // init swaggerJson
        local.swgg.swaggerJson = {
            basePath: '/api/v0',
            definitions: {
                Array: { items: {}, type: 'array' },
                // http://jsonapi.org/format/#document-structure-top-level
                JsonapiResponse: {
                    properties: {
                        data: {
                            items: { type: 'object' },
                            type: 'array'
                        },
                        errors: {
                            items: { type: 'object' },
                            type: 'array'
                        },
                        meta: { type: 'object' },
                        statusCode: { type: 'integer' }
                    }
                }
            },
            info: {
                description: 'demo of swagger-lite crud-api',
                title: 'swagger-lite api',
                version: '0'
            },
            paths: {},
            swagger: '2.0',
            tags: []
        };
        // hack - init swaggerJson$$Dummy to pass validation warnings for auto-created schemas
        local.swgg.swaggerJson$$Dummy = {
            definitions: {
                $$Dummy: {
                    properties: {
                        propArray: {
                            items: { $ref: '#/definitions/Array' },
                            type: 'array'
                        }
                    }
                },
                JsonapiResponse$$Dummy: {
                    properties: { data: {
                        items: { $ref: '#/definitions/$$Dummy' },
                        type: 'array'
                    } },
                    'x-inheritList': [{ $ref: '#/definitions/JsonapiResponse' }]
                }
            },
            paths: { '/$$Dummy': { get: {
                responses: {
                    200: {
                        description: '',
                        schema: { $ref: '#/definitions/JsonapiResponse$$Dummy' }
                    }
                }
            } } }
        };
    }());



    // run shared js-env code - function
    (function () {
        local.swgg.apiUpdate = function (options) {
        /*
         * this function will update the swagger-api
         */
            var keyUnique, pathObject, schema, tmp;
            options.definitions = options.definitions || {};
            options.paths = options.paths || {};
            // init pathObjectDefaultList
            Object.keys(options.definitions).forEach(function (schemaName) {
                schema = options.definitions[schemaName];
                schema._schemaName = schemaName;
                local.utility2.objectSetDefault(options, JSON.parse(JSON.stringify({
                    definitions: {
                        // init JsonapiResponse{{_schemaName}}
                        'JsonapiResponse{{_schemaName}}': {
                            properties: { data: {
                                items: { $ref: '#/definitions/{{_schemaName}}' },
                                type: 'array'
                            } },
                            'x-inheritList': [{ $ref: '#/definitions/JsonapiResponse' }]
                        }
                    }
                }).replace((/\{\{_schemaName\}\}/g), schemaName)), 2);
                // hack - init swaggerJson$$Dummy,
                // to pass validation warnings for auto-created schemas
                tmp = local.swgg.swaggerJson$$Dummy;
                local.utility2.objectSetOverride(tmp, JSON.parse(JSON.stringify({
                    paths: { '/$$Dummy/{{_schemaName}}': { get: {
                        responses: {
                            200: {
                                description: '',
                                schema: { $ref:
                                    '#/definitions/JsonapiResponse{{_schemaName}}' }
                            }
                        }
                    } } }
                }).replace((/\{\{_schemaName\}\}/g), schemaName)), 2);
                // init pathObject
                (schema._pathObjectDefaultList || []).forEach(function (pathObject) {
                    keyUnique = (/ByKeyUnique\.(.*)/).exec(pathObject);
                    keyUnique = keyUnique && keyUnique[1];
                    pathObject = pathObject.replace('.' + keyUnique, '');
                    pathObject = JSON.parse(local.swgg.cacheDict.pathObjectDefault[pathObject]
                        .replace((/\{\{_keyUnique\}\}/g), keyUnique)
                        .replace((/\{\{_pathPrefix\}\}/g), schema._pathPrefix)
                        .replace((/\{\{_schemaName\}\}/g), schema._schemaName));
                    // add _schemaName to pathObject
                    pathObject._schemaName = schemaName;
                    options.paths[pathObject._path] = options.paths[pathObject._path] || {};
                    options.paths[pathObject._path][pathObject._method] = pathObject;
                });
                // init keyUnique / pathObject / schemaName
                schema = options.definitions[schemaName] = JSON.parse(JSON.stringify(schema)
                    .replace((/\{\{_keyUnique\}\}/g), keyUnique)
                    .replace((/\{\{_pathPrefix\}\}/g), schema._pathPrefix)
                    .replace((/\{\{_schemaName\}\}/g), schema._schemaName));
            });
            // update paths
            Object.keys(options.paths).forEach(function (path) {
                Object.keys(options.paths[path]).forEach(function (method) {
                    pathObject = options.paths[path][method];
                    pathObject._method = method;
                    pathObject._path = path;
                    // init pathObject
                    local.utility2.objectSetDefault(pathObject, {
                        parameters: [],
                        responses: {
                            200: {
                                description: 'ok - ' +
                                    'http://jsonapi.org/format/#document-top-level',
                                schema: { $ref: '#/definitions/JsonapiResponse' }
                            }
                        },
                        tags: []
                    }, 2);
                    // update cacheDict.pathObject
                    tmp = method.toUpperCase() + ' ' + path.replace(
                        (/\{.*/),
                        function (match0) {
                            return match0.replace((/[^\/]/g), '');
                        }
                    );
                    local.swgg.cacheDict.pathObject[tmp] = JSON.stringify(
                        local.utility2.objectSetDefault(
                            pathObject,
                            JSON.parse(local.swgg.cacheDict.pathObject[tmp] || '{}')
                        )
                    );
                });
            });
            // merge tags
            tmp = {};
            // update tags from options._tagDict
            Object.keys(options._tagDict || {}).forEach(function (key) {
                tmp[key] = options._tagDict[key];
                tmp[key].name = key;
            });
            // update tags from options.tags
            [local.swgg.swaggerJson.tags, options.tags].forEach(function (tags) {
                (tags || []).forEach(function (element) {
                    tmp[element.name] = element;
                });
            });
            tmp = local.swgg.swaggerJson.tags = Object.keys(tmp).sort().map(function (key) {
                return tmp[key];
            });
            // update swaggerJson with options, with underscore keys removed
            local.utility2.objectSetOverride(
                local.swgg.swaggerJson,
                local.utility2.objectTraverse(
                    // jsonCopy object to prevent side-effects
                    local.utility2.jsonCopy(options),
                    function (element) {
                        if (element && typeof element === 'object') {
                            Object.keys(element).forEach(function (key) {
                                // security - remove underscore key
                                if (key[0] === '_') {
                                    delete element[key];
                                }
                            });
                        }
                    }
                ),
                2
            );
            // restore tags
            local.swgg.swaggerJson.tags = tmp;
            // init properties from x-inheritList
            [0, 1, 2, 3].forEach(function () {
                Object.keys(local.swgg.swaggerJson.definitions).forEach(function (schema) {
                    schema = local.swgg.swaggerJson.definitions[schema];
                    // jsonCopy object to prevent side-effects
                    local.utility2.jsonCopy(schema['x-inheritList'] || [])
                        .reverse()
                        .forEach(function (element) {
                            local.utility2.objectSetDefault(schema, {
                                properties:
                                    local.swgg.schemaDereference(element.$ref).properties
                            }, 2);
                        });
                });
            });
            // jsonCopy object to prevent side-effects
            local.swgg.swaggerJson = JSON.parse(local.utility2.jsonStringifyOrdered(
                local.utility2.jsonCopy(local.swgg.swaggerJson)
            ));
            // validate swaggerJson
            local.swgg.validateBySwagger(local.utility2.objectSetDefault(
                local.utility2.jsonCopy(local.swgg.swaggerJson),
                local.swgg.swaggerJson$$Dummy,
                2
            ));
            // init SwaggerClient
            local.SwaggerClient = local.modeJs === 'browser'
                ? local.global.SwaggerClient
                : require('./lib.swagger-ui.js');
            local.swgg.api = new local.SwaggerClient({
                url: local.utility2.serverLocalHost
            });
            local.swgg.api.buildFromSpec(local.utility2.jsonCopy(local.swgg.swaggerJson));
        };

        local.swgg.collectionCreate = function (schemaName) {
        /*
         * this function will create a persistent nedb-collection from schemaName
         */
            if (!local.swgg.cacheDict.collection[schemaName]) {
                if (local.modeJs === 'node' && !local.swgg.modeNedbInitialized) {
                    // init nedb dir
                    local.fs.mkdir('tmp', local.utility2.nop);
                    local.fs.mkdir('tmp/nedb.collection', local.utility2.nop);
                }
                local.swgg.modeNedbInitialized = true;
                local.swgg.cacheDict.collection[schemaName] = new local.swgg.Nedb({
                    autoload: true,
                    filename: 'tmp/nedb.collection/' + schemaName,
                    timestampData: true
                });
            }
            return local.swgg.cacheDict.collection[schemaName];
        };

        local.swgg.collectionInit = function (options, onError) {
        /*
         * this function will init a persistent nedb-collection
         */
            var collection, modeNext, onNext, onParallel;
            modeNext = 0;
            onNext = function (error) {
                modeNext = error
                    ? Infinity
                    : modeNext + 1;
                switch (modeNext) {
                case 1:
                    onParallel = local.utility2.onParallel(onNext);
                    onParallel.counter += 1;
                    local.utility2.objectSetDefault(options, {
                        docList: [],
                        ensureIndexList: [],
                        removeIndexList: []
                    });
                    collection = local.swgg.collectionCreate(options.name);
                    // drop collection
                    if (options.drop) {
                        onParallel.counter += 1;
                        collection.remove({}, { multi: true }, onParallel);
                        Object.keys(collection.indexes).forEach(function (key) {
                            if (key !== '_id') {
                                onParallel.counter += 1;
                                collection.removeIndex(key, onParallel);
                            }
                        });
                    }
                    onParallel();
                    break;
                case 2:
                    onParallel.counter += 1;
                    // removeIndex
                    options.removeIndexList.forEach(function (index) {
                        onParallel.counter += 1;
                        collection.removeIndex(index, onParallel);
                    });
                    onParallel();
                    break;
                case 3:
                    onParallel.counter += 1;
                    // ensureIndex
                    options.ensureIndexList.forEach(function (index) {
                        onParallel.counter += 1;
                        collection.ensureIndex(index, onParallel);
                    });
                    onParallel();
                    break;
                case 4:
                    onParallel.counter += 1;
                    // upsert documents
                    options.docList.forEach(function (doc) {
                        onParallel.counter += 1;
                        collection.update({ id: doc.id }, doc, {
                            upsert: true
                        }, onParallel);
                    });
                    onParallel();
                    break;
                default:
                    onError(error);
                }
            };
            onNext();
        };

        local.swgg.collectionListInit = function (optionsList, onError) {
        /*
         * this function will init a list of persistent nedb-collections
         */
            var onParallel;
            onParallel = local.utility2.onParallel(onError);
            onParallel.counter += 1;
            optionsList.forEach(function (options) {
                onParallel.counter += 1;
                local.swgg.collectionInit(options, onParallel);
            });
            onParallel();
        };

        local.swgg.idInt52Create = function () {
        /*
         * this function will return an epoch-based-52-bit integer,
         * that can be used as an integer id
         */
            return parseInt(Date.now().toString(16).slice(0, 8) +
                Math.random().toString(16).slice(-5), 16);
        };

        local.swgg.middlewareBodyParse = function (request, response, nextMiddleware) {
        /*
         * this function will run the middleware that will parse the request-body
         */
            // jslint-hack
            local.utility2.nop(response);
            // if request is already parsed, then goto nextMiddleware
            if (request.swggBodyParsed) {
                nextMiddleware();
                return;
            }
            request.swggBodyParsed = String(request.bodyRaw);
            switch ((/[^;]*/).exec(request.headers['content-type'] || '')[0]) {
            case 'application/x-www-form-urlencoded':
                request.swggBodyParsed =
                    local.utility2.urlParse('?' + request.swggBodyParsed, true).query;
                break;
            default:
                try {
                    request.swggBodyParsed = JSON.parse(request.swggBodyParsed);
                } catch (ignore) {
                }
            }
            nextMiddleware();
        };

        local.swgg.middlewareCrud = function (request, response, nextMiddleware) {
        /*
         * this function will run the middleware that will implement the backend db using nedb
         */
            var crud, modeNext, onNext;
            modeNext = 0;
            onNext = function (error, data, data2) {
                modeNext = error
                    ? Infinity
                    : modeNext + 1;
                switch (modeNext) {
                case 1:
                    crud = request.crud = {};
                    crud.collection = request.swggPathObject &&
                        request.swggPathObject._schemaName &&
                        local.swgg.collectionCreate(request.swggPathObject._schemaName);
                    if (!crud.collection) {
                        modeNext = Infinity;
                        onNext();
                        return;
                    }
                    // init crud.data
                    crud.data = local.utility2.jsonCopy(request.swggParamDict);
                    // init crud.operationId
                    crud.operationId = request.swggPathObject._operationId ||
                        request.swggPathObject.operationId;
                    request.swggPathObject.parameters.forEach(function (param) {
                        // JSON.parse json-string
                        if (param.format === 'json' &&
                                param.type === 'string' &&
                                crud.data[param.name]) {
                            crud.data[param.name] = JSON.parse(crud.data[param.name]);
                        }
                    });
                    // init crud.keyUnique
                    crud.keyUnique = crud.operationId.split('.')[1] || 'id';
                    crud.keyAlias = request.swggPathObject._keyAlias || crud.keyUnique;
                    switch (crud.operationId) {
                    case 'crudCreateOrReplaceOne':
                    case 'crudCreateOrUpdateOne':
                        crud.data.id = crud.data.id || (crud.data.body && crud.data.body.id);
                        if (!crud.data.id) {
                            crud.data.id = local.utility2.uuidTimeCreate();
                            request.swggPathObject.parameters.forEach(function (param) {
                                try {
                                    switch (param.in === 'body' &&
                                        local.swgg.schemaDereference(param.schema.$ref)
                                        .properties.id.type) {
                                    // use integer id
                                    case 'integer':
                                    case 'number':
                                        crud.data.id = local.swgg.idInt52Create();
                                        break;
                                    }
                                } catch (ignore) {
                                }
                            });
                        }
                        break;
                    }
                    // init crud.queryByKeyUnique
                    crud.queryByKeyUnique = {};
                    crud.queryByKeyUnique[crud.keyAlias] = crud.data[crud.keyUnique];
                    switch (crud.operationId.split('.')[0]) {
                    case 'crudCountManyByQuery':
                        crud.collection.count(crud.data.query, onNext);
                        break;
                    case 'crudCreateOrReplaceMany':
                        crud.collection.remove({ id: { $in: crud.data.body.map(function (doc) {
                            return doc.id;
                        }) } }, { multi: true }, onNext);
                        break;
                    case 'crudCreateOrReplaceOne':
                    case 'crudCreateOrReplaceOneByKeyUnique':
                    case 'crudCreateOrUpdateOne':
                    case 'crudCreateOrUpdateOneByKeyUnique':
                        crud.data.body = crud.data.body || local.utility2.jsonCopy(crud.data);
                        delete crud.data.body.id;
                        delete crud.data.body[crud.keyUnique];
                        crud.data.body[crud.keyAlias] = crud.data[crud.keyUnique];
                        // replace doc
                        if (crud.operationId.indexOf('Replace') >= 0) {
                            crud.data.body.createdAt = new Date().toISOString();
                            crud.collection.update(
                                crud.queryByKeyUnique,
                                crud.data.body,
                                { returnUpdatedDocs: true, upsert: true },
                                onNext
                            );
                        // update doc
                        } else {
                            crud.collection.update(
                                crud.queryByKeyUnique,
                                { $set: crud.data.body },
                                { returnUpdatedDocs: true, upsert: true },
                                onNext
                            );
                        }
                        break;
                    case 'crudDeleteManyByQuery':
                        crud.collection.remove(crud.data.query, { multi: true }, onNext);
                        break;
                    case 'crudDeleteOneByKeyUnique':
                        crud.collection.remove(crud.queryByKeyUnique, onNext);
                        break;
                    case 'crudExistsOneByKeyUnique':
                        crud.collection.findOne(crud.queryByKeyUnique, { $: 1 }, onNext);
                        break;
                    case 'crudGetManyByQuery':
                        crud.collection.find(crud.data.query, crud.data.fields)
                            .sort(crud.data.sort)
                            .skip(crud.data.skip)
                            .limit(crud.data.limit)
                            .exec(onNext);
                        break;
                    case 'crudGetOneByKeyUnique':
                        crud.collection.findOne(crud.queryByKeyUnique, onNext);
                        break;
                    case 'crudGetOneByQuery':
                        crud.collection.findOne(crud.data.query, crud.data.fields, onNext);
                        break;
                    default:
                        modeNext = Infinity;
                        onNext();
                    }
                    break;
                case 2:
                    switch (crud.operationId.split('.')[0]) {
                    case 'crudCreateOrReplaceMany':
                        crud.collection.insert(crud.data.body, onNext);
                        break;
                    case 'crudCreateOrReplaceOne':
                    case 'crudCreateOrReplaceOneByKeyUnique':
                    case 'crudCreateOrUpdateOne':
                    case 'crudCreateOrUpdateOneByKeyUnique':
                        onNext(null, data2);
                        break;
                    case 'crudExistsOneByKeyUnique':
                        onNext(null, !!data);
                        break;
                    default:
                        onNext(null, data);
                    }
                    break;
                case 3:
                    local.swgg.serverRespondJsonapi(request, response, error, data);
                    break;
                default:
                    nextMiddleware(error, data);
                }
            };
            onNext();
        };

        local.swgg.middlewareError = function (error, request, response) {
        /*
         * this function will run the middleware that will handle errors according to
         * http://jsonapi.org/format/#errors
         */
            if (!error) {
                error = new Error('404 Not Found');
                error.statusCode = 404;
            }
            local.swgg.serverRespondJsonapi(request, response, error);
        };

        local.swgg.middlewareValidate = function (request, response, nextMiddleware) {
        /*
         * this function will run the middleware that will validate the swagger-request
         */
            var modeNext, onNext, tmp;
            modeNext = 0;
            onNext = function () {
                modeNext += 1;
                switch (modeNext) {
                case 1:
                    // if request.url is not prefixed with swaggerJson.basePath,
                    // then default to nextMiddleware
                    if (request.urlParsed.pathname
                            .indexOf(local.swgg.swaggerJson.basePath) !== 0) {
                        modeNext = Infinity;
                        onNext();
                        return;
                    }
                    // init swggPathname
                    request.swggPathname = request.method + ' ' + request.urlParsed.pathname
                        .replace(local.swgg.swaggerJson.basePath, '');
                    switch (request.swggPathname) {
                    // serve swagger.json
                    case 'GET /swagger.json':
                        response.end(JSON.stringify(local.swgg.swaggerJson));
                        return;
                    }
                    // init swggPathObject
                    while (true) {
                        request.swggPathObject = local.swgg.cacheDict.pathObject[
                            request.swggPathname
                        ];
                        // if swggPathObject exists, then break and continue
                        if (request.swggPathObject) {
                            request.swggPathObject = JSON.parse(request.swggPathObject);
                            onNext();
                            break;
                        }
                        // if cannot init swggPathObject, then default to nextMiddleware
                        if (request.swggPathname === request.swggPathnameOld) {
                            modeNext = Infinity;
                            onNext();
                            break;
                        }
                        request.swggPathnameOld = request.swggPathname;
                        request.swggPathname = request.swggPathname
                            .replace((/\/[^\/]+?(\/*?)$/), '/$1');
                    }
                    break;
                case 2:
                    // init swggParamDict
                    request.swggParamDict = {};
                    // parse path param
                    tmp = request.urlParsed.pathname
                        .replace(local.swgg.swaggerJson.basePath, '').split('/');
                    request.swggPathObject._path.split('/').forEach(function (key, ii) {
                        if ((/^\{\S*?\}$/).test(key)) {
                            request.swggParamDict[key.slice(1, -1)] =
                                decodeURIComponent(tmp[ii]);
                        }
                    });
                    request.swggPathObject.parameters.forEach(function (paramDef) {
                        switch (paramDef.in) {
                        // parse body param
                        case 'body':
                            request.swggParamDict[paramDef.name] =
                                request.swggParamDict[paramDef.name] || request.swggBodyParsed;
                            break;
                        // parse formData param
                        case 'formData':
                            request.swggParamDict[paramDef.name] =
                                request.swggParamDict[paramDef.name] ||
                                request.swggBodyParsed[paramDef.name];
                            break;
                        // parse header param
                        case 'header':
                            request.swggParamDict[paramDef.name] =
                                request.headers[paramDef.name.toLowerCase()];
                            break;
                        // parse query param
                        case 'query':
                            request.swggParamDict[paramDef.name] =
                                request.urlParsed.query[paramDef.name];
                            break;
                        }
                        // init default param
                        request.swggParamDict[paramDef.name] =
                            request.swggParamDict[paramDef.name] || paramDef.default;
                    });
                    // normalize params
                    local.swgg.normalizeParamDictSwagger(
                        request.swggParamDict,
                        request.swggPathObject
                    );
                    // validate params
                    local.swgg.validateByParamDefList({
                        data: request.swggParamDict,
                        key: request.swggPathname,
                        paramDefList: request.swggPathObject.parameters
                    });
                    onNext();
                    break;
                default:
                    nextMiddleware();
                }
            };
            onNext();
        };

        local.swgg.normalizeParamDictSwagger = function (data, pathObject) {
        /*
         * this function will parse the data according to pathObject.parameters
         */
            var tmp;
            pathObject.parameters.forEach(function (paramDef) {
                tmp = data[paramDef.name];
                // init default value
                if (tmp === undefined) {
                    // jsonCopy object to prevent side-effects
                    tmp = local.utility2.jsonCopy(paramDef.default);
                }
                // parse csv array
                if (paramDef.type === 'array' &&
                        paramDef.collectionFormat &&
                        typeof tmp === 'string') {
                    switch (paramDef.collectionFormat) {
                    case 'csv':
                        tmp = tmp.split(',');
                        break;
                    case 'pipes':
                        tmp = tmp.split('|');
                        break;
                    case 'ssv':
                        tmp = tmp.split(' ');
                        break;
                    case 'tsv':
                        tmp = tmp.split('\t');
                        break;
                    }
                }
                // JSON.parse swggParamDict
                if (paramDef.type !== 'string' &&
                        (typeof tmp === 'string' ||
                        (local.modeJs === 'node' && Buffer.isBuffer(tmp)))) {
                    try {
                        tmp = JSON.parse(tmp);
                    } catch (ignore) {
                    }
                }
                data[paramDef.name] = tmp;
            });
            return data;
        };

        local.swgg.onErrorJsonapi = function (onError) {
        /*
         * http://jsonapi.org/format/#errors
         * http://jsonapi.org/format/#document-structure-resource-objects
         * this function will normalize the error and data to jsonapi format,
         * and pass them to onError
         */
            return function (error, data) {
                data = [error, data].map(function (data, ii) {
                    // if no error occurred, then return
                    if ((ii === 0 && !data) ||
                            // if data is already normalized, then return it
                            (data && data.meta && data.meta.isJsonapiResponse)) {
                        return data;
                    }
                    // normalize data-list
                    if (!Array.isArray(data)) {
                        data = [data];
                    }
                    // normalize data-list to be non-empty
                    if (!data.length) {
                        data.push(null);
                    }
                    // normalize error-list to contain non-null objects
                    if (ii === 0) {
                        data = data.map(function (element) {
                            if (!(element && typeof element === 'object')) {
                                element = { message: String(element) };
                            }
                            // normalize error-object to plain json-object
                            error = local.utility2.jsonCopy(element);
                            error.message = element.message;
                            error.stack = element.stack;
                            error.statusCode = Number(error.statusCode) || 500;
                            return error;
                        });
                        error = local.utility2.jsonCopy(data[0]);
                        error.errors = data;
                        error.meta = { isJsonapiResponse: true };
                        error.statusCode = error.statusCode || 500;
                        return error;
                    }
                    return {
                        data: data,
                        meta: { isJsonapiResponse: true }
                    };
                });
                data.forEach(function (data, ii) {
                    var dataList;
                    dataList = data && (ii === 0
                        ? data.errors
                        : data.data);
                    // init meta.dataLength
                    if (dataList) {
                        data.meta.dataLength = dataList.length;
                    }
                });
                onError(data[0], data[1]);
            };
        };

        local.swgg.schemaDereference = function ($ref) {
        /*
         * this function will try to dereference the schema from $ref
         */
            try {
                return local.swgg.swaggerJson.definitions[
                    (/^\#\/definitions\/(\w+)$/).exec($ref)[1]
                ];
            } catch (ignore) {
            }
        };

        local.swgg.serverRespondJsonapi = function (request, response, error, data) {
        /*
         * http://jsonapi.org/format/#errors
         * http://jsonapi.org/format/#document-structure-resource-objects
         * this function will respond in jsonapi format
         */
            local.swgg.onErrorJsonapi(function (error, data) {
                local.utility2.serverRespondHeadSet(
                    request,
                    response,
                    error && error.statusCode,
                    { 'Content-Type': 'application/json; charset=UTF-8' }
                );
                if (error) {
                    // debug statusCode / method / url
                    local.utility2.errorMessagePrepend(error, response.statusCode + ' ' +
                        request.method + ' ' + request.url + '\n');
                    // print error.stack to stderr
                    local.utility2.onErrorDefault(error);
                }
                data = error || data;
                response.end(JSON.stringify(local.utility2.objectSetDefault(data, { meta: {
                    statusCode: data.statusCode
                } }, 2)));
            })(error, data);
        };

        local.swgg.validateByParamDefList = function (options) {
        /*
         * this function will validate options.data against options.paramDefList
         */
            var data, key;
            local.utility2.testTryCatch(function () {
                data = options.data;
                // validate data
                local.utility2.assert(data && typeof data === 'object', data);
                (options.paramDefList || []).forEach(function (paramDef) {
                    key = paramDef.name;
                    local.swgg.validateByPropertyDef({
                        data: data[key],
                        key: key,
                        propertyDef: paramDef,
                        required: paramDef.required
                    });
                });
            }, function (error) {
                error.statusCode = error.statusCode || 400;
                local.utility2.errorMessagePrepend(error, options.key + '.' + key +
                    ' - ');
                throw error;
            });
        };

        local.swgg.validateByPropertyDef = function (options) {
        /*
         * this function will validate options.data against options.propertyDef
         */
            var data, propertyDef, tmp;
            data = options.data;
            propertyDef = options.propertyDef;
            // validate undefined data
            if (data === null || data === undefined) {
                if (options.required) {
                    throw new Error('required property ' + options.key + ':' +
                        (propertyDef.format || propertyDef.type) +
                        ' cannot be null or undefined');
                }
                return;
            }
            // validate schema
            tmp = propertyDef.$ref || (propertyDef.schema && propertyDef.schema.$ref);
            if (tmp) {
                local.swgg.validateBySchema({
                    circularList: options.circularList,
                    data: data,
                    key: tmp,
                    schema: local.swgg.schemaDereference(tmp)
                });
                return;
            }
            // init circularList
            if (data && typeof data === 'object') {
                options.circularList = options.circularList || [];
                if (options.circularList.indexOf(data) >= 0) {
                    return;
                }
                options.circularList.push(data);
            }
            // validate propertyDef embedded in propertyDef.schema.type
            if (!propertyDef.type && propertyDef.schema && propertyDef.schema.type) {
                propertyDef = propertyDef.schema;
            }
            local.utility2.testTryCatch(function () {
                // http://json-schema.org/latest/json-schema-validation.html#anchor13
                // 5.1.  Validation keywords for numeric instances (number and integer)
                if (typeof data === 'number') {
                    if (propertyDef.multipleOf) {
                        local.utility2.assert(data % propertyDef.multipleOf === 0);
                    }
                    if (propertyDef.maximum) {
                        local.utility2.assert(propertyDef.exclusiveMaximum
                            ? data < propertyDef.maximum
                            : data <= propertyDef.maximum);
                    }
                    if (propertyDef.minimum) {
                        local.utility2.assert(propertyDef.exclusiveMinimum
                            ? data > propertyDef.minimum
                            : data >= propertyDef.minimum);
                    }
                // http://json-schema.org/latest/json-schema-validation.html#anchor25
                // 5.2.  Validation keywords for strings
                } else if (typeof data === 'string') {
                    if (propertyDef.maxLength) {
                        local.utility2.assert(data.length <= propertyDef.maxLength);
                    }
                    if (propertyDef.minLength) {
                        local.utility2.assert(data.length >= propertyDef.minLength);
                    }
                // http://json-schema.org/latest/json-schema-validation.html#anchor36
                // 5.3.  Validation keywords for arrays
                } else if (Array.isArray(data)) {
                    if (propertyDef.maxItems) {
                        local.utility2.assert(data.length <= propertyDef.maxItems);
                    }
                    if (propertyDef.minItems) {
                        local.utility2.assert(data.length >= propertyDef.minItems);
                    }
                    if (propertyDef.uniqueItems) {
                        tmp = {};
                        data.forEach(function (element) {
                            element = JSON.stringify(element);
                            local.utility2.assert(!tmp[element]);
                            tmp[element] = true;
                        });
                    }
                // http://json-schema.org/latest/json-schema-validation.html#anchor53
                // 5.4.  Validation keywords for objects
                } else if (typeof data === 'object') {
                    if (propertyDef.maxProperties) {
                        local.utility2.assert(Object.keys(data).length <=
                            propertyDef.maxProperties);
                    }
                    if (propertyDef.minProperties) {
                        local.utility2.assert(Object.keys(data).length >=
                            propertyDef.minProperties);
                    }
                }
                // http://json-schema.org/latest/json-schema-validation.html#anchor75
                // 5.5.  Validation keywords for any instance type
                if (propertyDef.enum) {
                    local.utility2.assert(propertyDef.enum.indexOf(data) >= 0);
                }
                // https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
                // #data-types
                // validate propertyDef.type
                switch (propertyDef.type) {
                case 'array':
                    local.utility2.assert(Array.isArray(data) && propertyDef.items);
                    // recurse - validate elements in list
                    data.forEach(function (element) {
                        local.swgg.validateByPropertyDef({
                            circularList: options.circularList,
                            data: element,
                            key: options.key,
                            propertyDef: propertyDef.items
                        });
                    });
                    break;
                case 'boolean':
                    local.utility2.assert(typeof data === 'boolean');
                    break;
                case 'integer':
                    local.utility2.assert(typeof data === 'number' && isFinite(data) &&
                        (data | 0) === data);
                    switch (propertyDef.format) {
                    case 'int32':
                    case 'int64':
                        break;
                    }
                    break;
                case 'number':
                    local.utility2.assert(typeof data === 'number' && isFinite(data));
                    switch (propertyDef.format) {
                    case 'double':
                    case 'float':
                        break;
                    }
                    break;
                case 'object':
                    local.utility2.assert(typeof data === 'object');
                    break;
                case 'string':
                    local.utility2.assert(typeof data === 'string' ||
                        propertyDef.format === 'binary');
                    switch (propertyDef.format) {
                    // https://github.com/swagger-api/swagger-spec/issues/50
                    case 'byte':
                        local.utility2.assert(!(/[^\n\r\+\/0-9\=A-Za-z]/).test(data));
                        break;
                    case 'date':
                    case 'date-time':
                        local.utility2.assert(isFinite(new Date(data).getTime()));
                        break;
                    case 'email':
                        local.utility2.assert(local.utility2.regexpEmailValidate.test(data));
                        break;
                    case 'json':
                        JSON.parse(data);
                        break;
                    }
                    break;
                }
            }, function (error) {
                error.message = error.message ||
                    'invalid property ' + options.key + ':' +
                    (propertyDef.format || propertyDef.type) + ' - ' + JSON.stringify(data) +
                    ' - ' + JSON.stringify(propertyDef);
                throw error;
            });
        };

        local.swgg.validateBySchema = function (options) {
        /*
         * this function will validate options.data against options.schema
         */
            var data, key, schema;
            local.utility2.testTryCatch(function () {
                data = options.data;
                // init circularList
                if (data && typeof data === 'object') {
                    options.circularList = options.circularList || [];
                    if (options.circularList.indexOf(data) >= 0) {
                        return;
                    }
                    options.circularList.push(data);
                }
                local.utility2.assert(data && typeof data === 'object', 'invalid data ' + data);
                schema = options.schema;
                // validate schema
                local.utility2.assert(
                    schema && typeof schema === 'object',
                    'invalid schema ' + schema
                );
                Object.keys(schema.properties || {}).forEach(function (_) {
                    key = _;
                    local.swgg.validateByPropertyDef({
                        circularList: options.circularList,
                        data: data[key],
                        depth: options.depth - 1,
                        key: key,
                        propertyDef: schema.properties[key],
                        required: schema.required && schema.required.indexOf(key) >= 0
                    });
                });
            }, function (error) {
                local.utility2.errorMessagePrepend(error, options.key + '.' + key +
                    ' - ');
                throw error;
            });
        };

        local.swgg.validateBySwagger = function (options) {
        /*
         * this function will validate the entire swagger json object
         */
            local.swgg.tools.v2.validate(
                // jsonCopy object to prevent side-effects
                local.utility2.jsonCopy(options),
                function (error, result) {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    ['errors', 'undefined', 'warnings'].forEach(function (errorType) {
                        ((result && result[errorType]) || [
                        ]).slice(0, 8).forEach(function (element) {
                            console.error('swagger schema - ' + errorType.slice(0, -1) + ' - ' +
                                element.code + ' - ' + element.message + ' - ' +
                                JSON.stringify(element.path));
                        });
                    });
                    error = result && result.errors && result.errors[0];
                    // validate no error occurred
                    local.utility2.assert(!error, new Error(error && error.message));
                }
            );
        };

        local.utility2.middlewareGroupCreate = function (middlewareList) {
        /*
         * this function will return a middleware-group,
         * that will sequentially run the middlewares in middlewareList
         */
            var self;
            self = function (request, response, nextMiddleware) {
                var modeNext, onNext;
                modeNext = -1;
                onNext = function (error) {
                    modeNext = error
                        ? Infinity
                        : modeNext + 1;
                    // recursively run each sub-middleware in middlewareList
                    if (modeNext < self.middlewareList.length) {
                        // call sub-middleware in a try-catch block
                        local.utility2.testTryCatch(function () {
                            self.middlewareList[modeNext](request, response, onNext);
                        }, onNext);
                        return;
                    }
                    // default to nextMiddleware
                    nextMiddleware(error);
                };
                onNext();
            };
            self.middlewareList = middlewareList;
            return self;
        };

        local.utility2.urlParse = function (url) {
        /*
         * this function will parse the url according to
         * https://developer.mozilla.org/en/docs/Web/API
         */
            var urlParsed;
            urlParsed = {};
            local.utility2.testTryCatch(function () {
                // resolve host-less url
                switch (local.modeJs) {
                case 'browser':
                    local.utility2.serverLocalHost = local.utility2.serverLocalHost ||
                        location.protocol + '//' + location.host;
                    // resolve absolute path
                    if (url[0] === '/') {
                        url = local.utility2.serverLocalHost + url;
                    // resolve relative path
                    } else if (!(/^\w+?:\/\//).test(url)) {
                        url = local.utility2.serverLocalHost +
                            location.pathname.replace((/\/[^\/]*?$/), '') + '/' + url;
                    }
                    urlParsed = new local.global.URL(url);
                    break;
                case 'node':
                    local.utility2.serverLocalHost = local.utility2.serverLocalHost ||
                        'http://localhost:' + (local.utility2.envDict.PORT || '80');
                    // resolve absolute path
                    if (url[0] === '/') {
                        url = local.utility2.serverLocalHost + url;
                    // resolve relative path
                    } else if (!(/^\w+?:\/\//).test(url)) {
                        url = local.utility2.serverLocalHost + '/' + url;
                    }
                    urlParsed = local.url.parse(url);
                    break;
                }
                // init query
                urlParsed.query = {};
                urlParsed.search.slice(1).replace((/[^&]+/g), function (item) {
                    item = item.split('=');
                    item[0] = decodeURIComponent(item[0]);
                    item[1] = decodeURIComponent(item.slice(1).join('='));
                    // parse repeating query-param as an array
                    if (urlParsed.query[item[0]]) {
                        if (!Array.isArray(urlParsed.query[item[0]])) {
                            urlParsed.query[item[0]] = [urlParsed.query[item[0]]];
                        }
                        urlParsed.query[item[0]].push(item[1]);
                    } else {
                        urlParsed.query[item[0]] = item[1];
                    }
                });
            }, local.utility2.nop);
            // https://developer.mozilla.org/en/docs/Web/API/URL#Properties
            return {
                hash: urlParsed.hash || '',
                host: urlParsed.host || '',
                hostname: urlParsed.hostname || '',
                href: urlParsed.href || '',
                pathname: urlParsed.pathname || '',
                port: urlParsed.port || '',
                protocol: urlParsed.protocol || '',
                query: urlParsed.query || {},
                search: urlParsed.search || ''
            };
        };
    }());
    switch (local.modeJs) {



    // run browser js-env code - post-init
    case 'browser':
        // init exports
        local.global.swgg = local.swgg;
        break;



    // run node js-env code - post-init
    case 'node':
        // init exports
        module.exports = local.swgg;
        module.exports.__dirname = __dirname;
        // require modules
        local.fs = require('fs');
        local.path = require('path');
        local.url = require('url');
        // init assets
        local.utility2.cacheDict.assets['/assets.swgg.css'] =
            local.fs.readFileSync(__dirname + '/index.css', 'utf8');
        local.utility2.cacheDict.assets['/assets.swgg.js'] =
            local.utility2.istanbulInstrumentInPackage(
                local.fs.readFileSync(__filename, 'utf8'),
                __filename,
                'swagger-lite'
            );
        local.utility2.cacheDict.assets['/assets.swgg.lib.nedb.js'] =
            local.fs.readFileSync(__dirname + '/lib.nedb.js', 'utf8');
        local.utility2.cacheDict.assets['/assets.swgg.lib.swagger-tools.js'] =
            local.fs.readFileSync(__dirname + '/lib.swagger-tools.js', 'utf8');
        local.utility2.cacheDict.assets['/assets.swgg.lib.swagger-ui.js'] =
            local.utility2.istanbulInstrumentInPackage(
                local.fs.readFileSync(__dirname + '/lib.swagger-ui.js', 'utf8'),
                __dirname + '/lib.swagger-ui.js',
                'swagger-lite'
            );
        local.utility2.cacheDict.assets['/assets.swagger-ui.explorer_icons.png'] =
            local.fs.readFileSync(__dirname + '/assets.swagger-ui.explorer_icons.png');
        local.utility2.cacheDict.assets['/assets.swagger-ui.favicon-16x16.png'] =
            local.fs.readFileSync(__dirname + '/assets.swagger-ui.favicon-16x16.png');
        local.utility2.cacheDict.assets['/assets.swagger-ui.favicon-32x32.png'] =
            local.fs.readFileSync(__dirname + '/assets.swagger-ui.favicon-32x32.png');
        local.utility2.cacheDict.assets['/assets.swagger-ui.logo_small.png'] =
            local.fs.readFileSync(__dirname + '/assets.swagger-ui.logo_small.png');
        local.utility2.cacheDict.assets['/assets.swagger-ui.throbber.gif'] =
            local.fs.readFileSync(__dirname + '/assets.swagger-ui.throbber.gif');
        local.utility2.cacheDict.assets['/swagger-ui.html'] = local.utility2.stringFormat(
            local.fs.readFileSync(__dirname + '/README.md', 'utf8')
                .replace((/[\S\s]*?<html>/), '<!DOCTYPE html><html>')
                .replace((/<\/html>[\S\s]*/), '</html>')
                .replace((/\\n\\$/gm), '')
                .replace((/\\\\/g), '\\'),
            { envDict: local.utility2.envDict },
            ''
        );
        // init XMLHttpRequest
        local.XMLHttpRequest = local.utility2.local._http.XMLHttpRequest;
        break;
    }



    // run shared js-env code - post-init
    (function () {
        // init api
        local.swgg.apiUpdate({});
    }());
}());
