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



    // run shared js-env code
    (function () {
        // init local
        local = {};
        // init js-env
        local.modeJs = (function () {
            try {
                return module.exports &&
                    typeof process.versions.node === 'string' &&
                    typeof require('http').createServer === 'function' &&
                    'node';
            } catch (errorCaughtNode) {
                return typeof navigator.userAgent === 'string' &&
                    typeof document.querySelector('body') === 'object' &&
                    'browser';
            }
        }());
        // init global
        local.global = local.modeJs === 'browser'
            ? window
            : global;
        // init utility2
        local.utility2 = local.modeJs === 'browser'
            ? window.utility2
            : require('utility2');
        // init swagger-lite
        local.swgg = { cacheDict: { collection: {}, pathObject: {} }, local: local };
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
            crudCreateOne: {
                _method: 'post',
                _path: '/{{_pathPrefix}}/crudCreateOne',
                _pathPrefix: '{{_pathPrefix}}',
                operationId: 'crudCreateOne',
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
                summary: 'create one {{_schemaName}} object',
                tags: ['{{_pathPrefix}}']
            },
            crudDeleteManyByQuery: {
                _method: 'delete',
                _path: '/{{_pathPrefix}}/crudDeleteManyByQuery',
                _pathPrefix: '{{_pathPrefix}}',
                operationId: 'crudDeleteManyByQuery',
                parameters: [{
                    default: '{"{{_keyUnique}}":{"$in":["{{_keyUnique}}0","{{_keyUnique}}1"]}}',
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
                    default: 10,
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
                    default: '{"_timeModified":-1}',
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
            crudUpdateOneByKeyUnique: {
                _keyUnique: '{{_keyUnique}}',
                _method: 'patch',
                _path: '/{{_pathPrefix}}/crudUpdateOneByKeyUnique/{{{_keyUnique}}}',
                _pathPrefix: '{{_pathPrefix}}',
                operationId: 'crudUpdateOneByKeyUnique.{{_keyUnique}}',
                parameters: [{
                    description: '{{_schemaName}} {{_keyUnique}}',
                    in: 'path',
                    name: '{{_keyUnique}}',
                    required: true,
                    type: 'string'
                }, {
                    description: '{{_schemaName}} object with no validation check',
                    in: 'body',
                    name: 'body',
                    required: true,
                    schema: { type: 'object' }
                }],
                responses: {
                    200: {
                        description:
                            '200 ok - http://jsonapi.org/format/#document-structure-top-level',
                        schema: { $ref: '#/definitions/JsonapiResponse{{_schemaName}}' }
                    }
                },
                summary: 'update one {{_schemaName}} object by {{_keyUnique}}',
                tags: ['{{_pathPrefix}}']
            },
            crudUpsertOne: {
                _method: 'put',
                _path: '/{{_pathPrefix}}/crudUpsertOne',
                _pathPrefix: '{{_pathPrefix}}',
                operationId: 'crudReplaceOneBy',
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
                summary: 'upsert one {{_schemaName}} object',
                tags: ['{{_pathPrefix}}']
            }
        };
        // JSON.stringify pathObject to prevent side-effects
        Object.keys(local.swgg.cacheDict.pathObjectDefault).forEach(function (key) {
            local.swgg.cacheDict.pathObjectDefault[key] =
                JSON.stringify(local.swgg.cacheDict.pathObjectDefault[key]);
        });
    }());



    // run shared js-env code
    (function () {
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
                    data[paramDef.name] = local.utility2.jsonCopy(paramDef.default);
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

        local._onErrorJsonapiData = function (data) {
            /*
             * this function will normalize the data to jsonapi format,
             * http://jsonapi.org/format/#document-structure-resource-objects
             */
            if (data && data.meta && data.meta.isJsonapiResponse) {
                return data;
            }
            if (!Array.isArray(data)) {
                data = [data];
            }
            if (!data.length) {
                data.push({});
            }
            data = data.map(function (element) {
                if (!(element && typeof element === 'object')) {
                    element = { data: String(element) };
                }
                return element;
            });
            return { data: data, meta: { isJsonapiResponse: true } };
        };

        local._onErrorJsonapiError = function (error) {
            /*
             * this function will normalize the error to jsonapi format,
             * http://jsonapi.org/format/#errors
             */
            var data;
            data = error;
            if (!data || (data && data.meta && data.meta.isJsonapiResponse)) {
                return data;
            }
            if (!Array.isArray(data)) {
                data = [data];
            }
            if (!data.length) {
                data.push({});
            }
            data = data.map(function (element) {
                if (!(element && typeof element === 'object')) {
                    element = { message: String(element) };
                }
                error = local.utility2.jsonCopy(element);
                // copy error fields over from error object
                [
                    // jsonapi error fields
                    // http://jsonapi.org/format/#error-objects
                    'code',
                    'detail',
                    'id',
                    'links',
                    'meta',
                    'source',
                    'status',
                    'title',
                    // custom error fields
                    'message',
                    'name',
                    'stack',
                    'statusCode'
                ].forEach(function (key) {
                    error[key] = element[key];
                });
                error.message = error.title = error.message || error.title;
                error.status = error.statusCode =
                    Number(error.status) || Number(error.statusCode) || 500;
                error = local.utility2.objectSetOverride(error, {
                    status: String(error.status),
                    code: String(error.code || error.status),
                    detail: String(error.detail || error.stack),
                    title: String(error.title || error.message)
                });
                return error;
            });
            error = local.utility2.jsonCopy(data[0]);
            error.errors = data;
            error.meta = { isJsonapiResponse: true };
            return error;
        };

        local.swgg.onErrorJsonapi = function (onError) {
            /*
             * this function will normalize the error and data to jsonapi format,
             * http://jsonapi.org/format/#errors
             * http://jsonapi.org/format/#document-structure-resource-objects
             * and pass them to onError
             */
            return function (error, data) {
                onError(local._onErrorJsonapiError(error), local._onErrorJsonapiData(data));
            };
        };

        local.swgg.serverRespondJsonapi = function (request, response, error, data) {
            /*
             * this function will respond in jsonapi format
             * http://jsonapi.org/format/#errors
             * http://jsonapi.org/format/#document-structure-resource-objects
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
                response.end(JSON.stringify(error || data));
            })(error, data);
        };

        local.swgg.schemaDereference = function ($ref) {
            /*
             * this function will try to dereference the schema from $ref
             */
            try {
                return ((local.global.swaggerUi &&
                    local.global.swaggerUi.api &&
                    local.global.swaggerUi.api.swaggerJson) ||
                    local.swgg.swaggerJson)
                    .definitions[(/^\#\/definitions\/(\w+)$/).exec($ref)[1]];
            } catch (ignore) {
            }
        };

        local.swgg.validateByParamDefList = function (options) {
            /*
             * this function will validate options.data against options.paramDefList
             */
            var data, key;
            try {
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
            } catch (errorCaught) {
                local.utility2.errorMessagePrepend(errorCaught, '"' + options.key + '.' + key +
                    '" - ');
                throw errorCaught;
            }
        };

        local.swgg.validateByPropertyDef = function (options) {
            /*
             * this function will validate options.data against options.propertyDef
             */
            var assert, data, propertyDef, tmp;
            assert = function (valid) {
                if (!valid) {
                    throw new Error('invalid "' + options.key + ':' + (propertyDef.format ||
                        propertyDef.type) + '" property - ' + JSON.stringify(data));
                }
            };
            data = options.data;
            propertyDef = options.propertyDef;
            // validate undefined data
            if (data === null || data === undefined) {
                if (options.required) {
                    throw new Error('required "' + options.key + ':' + (propertyDef.format ||
                        propertyDef.type) + '" property cannot be null or undefined');
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
            // validate propertyDef.type
            // https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
            // #data-types
            switch (propertyDef.type) {
            case 'array':
                assert(Array.isArray(data) && propertyDef.items);
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
                assert(typeof data === 'boolean');
                break;
            case 'integer':
                assert(typeof data === 'number' && isFinite(data) && (data | 0) === data);
                switch (propertyDef.format) {
                case 'int32':
                case 'int64':
                    break;
                }
                break;
            case 'number':
                assert(typeof data === 'number' && isFinite(data));
                switch (propertyDef.format) {
                case 'double':
                case 'float':
                    break;
                }
                break;
            case 'object':
                assert(typeof data === 'object');
                break;
            case 'string':
                assert(typeof data === 'string' || propertyDef.format === 'binary');
                switch (propertyDef.format) {
                // https://github.com/swagger-api/swagger-spec/issues/50
                case 'byte':
                    assert(!(/[^\n\r\+\/0-9\=A-Za-z]/).test(data));
                    break;
                case 'date':
                case 'date-time':
                    assert(isFinite(new Date(data).getTime()));
                    break;
                case 'email':
                    assert(local.utility2.regexpEmailValidate.test(data));
                    break;
                case 'json':
                    try {
                        JSON.parse(data);
                    } catch (errorCaught) {
                        assert(null);
                    }
                    break;
                }
                break;
            }
        };

        local.swgg.validateBySchema = function (options) {
            /*
             * this function will validate options.data against options.schema
             */
            var data, key, schema;
            try {
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
            } catch (errorCaught) {
                local.utility2.errorMessagePrepend(errorCaught, '"' + options.key + '.' + key +
                    '" - ');
                throw errorCaught;
            }
        };

        local.swgg.validateBySwagger = function (options) {
            /*
             * this function will validate the entire swagger json object
             */
            local.swagger_tools.v2.validate(
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
    }());
    switch (local.modeJs) {



    // run node js-env code
    case 'node':
        local.swgg.apiUpdate = function (options) {
            /*
             * this function will update the swagger-api
             */
            var keyUnique, pathObject, tmp;
            options.definitions = options.definitions || {};
            options.paths = options.paths || {};
            // init pathObjectDefaultList
            Object.keys(options.definitions).forEach(function (schemaName) {
                var schema;
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
                    pathObject = JSON.parse(local.swgg.cacheDict
                        .pathObjectDefault[pathObject]
                        .replace((/\{\{_keyUnique\}\}/g), keyUnique)
                        .replace((/\{\{_pathPrefix\}\}/g), schema._pathPrefix)
                        .replace((/\{\{_schemaName\}\}/g), schema._schemaName));
                    // add _schemaName to pathObject
                    pathObject._schemaName = schemaName;
                    options.paths[pathObject._path] = options.paths[pathObject._path] || {};
                    options.paths[pathObject._path][pathObject._method] = pathObject;
                });
                // init keyUnique / pathObject / schemaName
                schema = options.definitions[schemaName] = JSON.parse(
                    JSON.stringify(schema)
                        .replace((/\{\{_keyUnique\}\}/g), keyUnique)
                        .replace((/\{\{_pathPrefix\}\}/g), schema._pathPrefix)
                        .replace((/\{\{_schemaName\}\}/g), schema._schemaName)
                );
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
                    local.swgg.cacheDict.pathObject[method.toUpperCase() + ' ' + path.replace(
                        (/\{.*/),
                        function (match0) {
                            return match0.replace((/[^\/]/g), '');
                        }
                    )] = JSON.stringify(pathObject);
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
            local.swgg.swaggerJson = JSON.parse(local.utility2
                .jsonStringifyOrdered(local.utility2.jsonCopy(local.swgg.swaggerJson)));
            // validate swaggerJson
            local.swgg.validateBySwagger(local.utility2.objectSetDefault(
                local.utility2.jsonCopy(local.swgg.swaggerJson),
                local.swgg.swaggerJson$$Dummy,
                2
            ));
            // init SwaggerClient
            local.swgg.api = new local.swgg.SwaggerClient({
                url: 'http://localhost:' + local.utility2.envDict.PORT
            });
            local.swgg.api.buildFromSpec(local.utility2.jsonCopy(local.swgg.swaggerJson));
        };

        local.swgg.middlewareError = function (error, request, response) {
            /*
             * this function will handle errors according to http://jsonapi.org/format/#errors
             */
            if (!error) {
                error = new Error('404 Not Found');
                error.statusCode = 404;
            }
            local.swgg.serverRespondJsonapi(request, response, error);
        };

        local.swgg.middlewareBodyParse = function (request, response, nextMiddleware) {
            /*
             * this function will parse the request-body
             */
            // jslint-hack
            local.utility2.nop(response);
            local.utility2.testTryCatch(function () {
                if (request.swggBodyParsed) {
                    nextMiddleware();
                    return;
                }
                request.swggBodyParsed = String(request.bodyRaw);
                switch ((/[^;]*/).exec(request.headers['content-type'] || '')[0]) {
                case 'application/x-www-form-urlencoded':
                    request.swggBodyParsed =
                        local.url.parse('?' + request.swggBodyParsed, true).query;
                    break;
                default:
                    try {
                        request.swggBodyParsed = JSON.parse(request.swggBodyParsed);
                    } catch (ignore) {
                    }
                }
                nextMiddleware();
            }, nextMiddleware);
        };

        local.swgg.middlewareValidate = function (request, response, nextMiddleware) {
            /*
             * this function will run the swagger-validation middleware
             */
            var modeNext, onNext, tmp;
            modeNext = 0;
            onNext = function () {
                local.utility2.testTryCatch(function () {
                    modeNext += 1;
                    switch (modeNext) {
                    case 1:
                        // if request.url is not prefixed with swaggerJson.basePath,
                        // then default to nextMiddleware
                        if (request.urlParsed.pathnameNormalized
                                .indexOf(local.swgg.swaggerJson.basePath) !== 0) {
                            modeNext = Infinity;
                            onNext();
                            return;
                        }
                        // init swggPathname
                        request.swggPathname = request.method + ' ' +
                            request.urlParsed.pathnameNormalized
                            .replace(local.swgg.swaggerJson.basePath, '');
                        switch (request.swggPathname) {
                        // serve swagger.json
                        case 'GET /swagger.json':
                            response.end(JSON.stringify(local.swgg.swaggerJson));
                            return;
                        }
                        // init swggPathObject
                        while (true) {
                            request.swggPathObject =
                                local.swgg.cacheDict.pathObject[request.swggPathname];
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
                            request.swggPathname =
                                request.swggPathname.replace((/\/[^\/]+?(\/*?)$/), '/$1');
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
                                    request.swggParamDict[paramDef.name] ||
                                    request.swggBodyParsed;
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
                        local.swgg.normalizeParamDictSwagger(request
                            .swggParamDict, request.swggPathObject);
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
                }, nextMiddleware);
            };
            onNext();
        };
        break;
    }
    switch (local.modeJs) {



    // run browser js-env code
    case 'browser':
        // export swagger-lite
        window.swgg = local.swgg;
        break;



    // run node js-env code
    case 'node':
        // export swagger-lite
        module.exports = local.swgg;
        module.exports.__dirname = __dirname;
        // require modules
        local.fs = require('fs');
        local.path = require('path');
        local.swagger_tools = require('swagger-ui-lite/swagger-tools-standalone-min.js');
        local.swagger_ui = require('swagger-ui-lite');
        local.url = require('url');
        local.vm = require('vm');
        // init swaggerJson
        local.swgg.swaggerJson = {
            basePath: local.utility2.envDict.npm_config_mode_api_prefix || '/api/v0',
            definitions: {
                Array: { items: {}, type: 'array' },
                // http://jsonapi.org/format/#errors
                JsonapiError: {
                },
                // http://jsonapi.org/format/#document-structure-resource-objects
                JsonapiResource: {
                    properties: {
                        id: { type: 'string' },
                        type: { type: 'string' }
                    }
                },
                // http://jsonapi.org/format/#document-structure-top-level
                JsonapiResponse: {
                    properties: {
                        data: {
                            items: { $ref: '#/definitions/JsonapiResource' },
                            type: 'array'
                        },
                        errors: {
                            items: { $ref: '#/definitions/JsonapiError' },
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
        // init assets
        local.utility2.cacheDict.assets['/assets/swagger-lite.js'] = local.utility2
            .istanbulInstrumentInPackage(
                local.fs.readFileSync(__filename, 'utf8'),
                __filename,
                'swagger-lite'
            );
        local.utility2.cacheDict.assets['/assets/swagger-ui.html'] = local.fs
            .readFileSync(
                local.swagger_ui.__dirname + '/swagger-ui.html',
                'utf8'
            )
            // swagger-hack - add extra assets
            .replace(
                "<script src='swagger-ui.rollup.js' type='text/javascript'></script>",
                "<script src='swagger-ui.rollup.js' type='text/javascript'></script>" +
                    '<script src="/assets/utility2.js"></script>' +
                    '<script src="/assets/swagger-lite.js"></script>'
            )
            // swagger-hack - update swagger.json url
            .replace(
                'https://kaizhu256.github.io/node-swagger-ui-lite/build/swagger.json',
                local.swgg.swaggerJson.basePath + '/swagger.json'
            );
        local.utility2.cacheDict.assets['/assets/swagger-ui.rollup.css'] = local.fs
            .readFileSync(local.swagger_ui.__dirname +
                '/swagger-ui.rollup.css', 'utf8');
        local.utility2.cacheDict.assets['/assets/swagger-ui.rollup.js'] = local.fs
            .readFileSync(local.swagger_ui.__dirname + '/swagger-ui.rollup.js', 'utf8')
            // swagger-hack - disable underscore-min.map
            .replace((/^\/\/# sourceMappingURL=.*/gm), '')
            // swagger-hack - save swaggerJson
            .replace(
                'this.apis = {};',
                'this.apis = {}; this.swaggerJson = JSON.parse(JSON.stringify(response));'
            )
            // swagger-hack - disable missingParams validation handling
            .replace(
                'var missingParams = this.getMissingParams(args);',
                'var missingParams = [];'
            )
            // swagger-hack - add modeErroData and validation handling
            .replace('new SwaggerHttp().execute(obj, opts);', 'if (opts.modeErrorData) {' +
                    'var onError = success;' +
                    'error = function (error) {' +
                        'error = error.obj || error;' +
                        'error = error.data || error;' +
                        'try { error = JSON.parse(error); } catch (ignore) {}' +
                        'if (typeof error === "string") {' +
                            'error = { message: error };' +
                        '}' +
                        'onError(error);' +
                    '};' +
                    'success = function (data) { onError(null, data); };' +
                '}' +
                'try {' +
                    'if (window.swgg) {' +
                        'window.swgg.validateByParamDefList({' +
                            'data: window.swgg.normalizeParamDictSwagger(' +
                                'JSON.parse(JSON.stringify(args)),' +
                                'this' +
                            '),' +
                            'key: this.operation.operationId,' +
                            'paramDefList: this.parameters' +
                        '});' +
                    '}' +
                '} catch (errorCaught) {' +
                    'window.swgg.onErrorJsonapi(function (error) {' +
                        'obj.on.error({' +
                            'data: JSON.stringify(error),' +
                            'headers: { "Content-Type": "application/json" }' +
                        '});' +
                    '})(errorCaught);' +
                    'return;' +
                '}' +
                'new SwaggerHttp().execute(obj, opts);')
            // swagger-hack - handle json error
            .replace('new_err.status = res.status;', 'new_err.status = res.status;' +
                'if (res.body && res.body.message && res.body.stack) { err = res.body; }')
            // swagger-hack - disable online validation
            .replace("if ('validatorUrl' in opts.swaggerOptions) {", "if (true) {");
        local.utility2.cacheDict.assets['/assets/swagger-ui.favicon-16x16.png'] = local.fs
            .readFileSync(local.swagger_ui.__dirname +
                '/swagger-ui.favicon-16x16.png');
        local.utility2.cacheDict.assets['/assets/swagger-ui.favicon-32x32.png'] = local.fs
            .readFileSync(local.swagger_ui.__dirname +
                '/swagger-ui.favicon-32x32.png');
        local.utility2.cacheDict.assets['/assets/swagger-ui.explorer_icons.png'] = local.fs
            .readFileSync(local.swagger_ui.__dirname +
                '/swagger-ui.explorer_icons.png');
        local.utility2.cacheDict.assets['/assets/swagger-ui.logo_small.png'] = local.fs
            .readFileSync(local.swagger_ui.__dirname +
                '/swagger-ui.logo_small.png');
        local.utility2.cacheDict.assets['/assets/swagger-ui.throbber.gif'] = local.fs
            .readFileSync(local.swagger_ui.__dirname +
                '/swagger-ui.throbber.gif');
        // init SwaggerClient
        (function () {
            local.XMLHttpRequest = function () {
                var self;
                self = this;
                self.headers = {};
            };
            local.XMLHttpRequest.prototype.onreadystatechange = local.utility2.nop;
            local.XMLHttpRequest.prototype.open = function (method, url) {
                this.method = method;
                this.url = url;
            };
            local.XMLHttpRequest.prototype.send = function (data) {
                var self;
                self = this;
                self.data = data;
                self.xhr = self;
                local.utility2.ajax(self, local.utility2.nop);
            };
            local.XMLHttpRequest.prototype.setRequestHeader = function (key, value) {
                this.headers[key.toLowerCase()] = value;
            };
            local.clearInterval = clearInterval;
            local.clearTimeout = clearTimeout;
            local.console = console;
            local.setInterval = setInterval;
            local.setTimeout = setTimeout;
            local.window = local;

            local.utility2.cacheDict.assets['/assets/swagger-ui.rollup.js'].replace(
                // swagger-hack - remove browser js-env code
                (/([\S\s]+?) swagger-client ([\S\s]+?\n\},\{\}\]\},\{\},\[1\]\)\(1\)\n\}\);)/),
                function (match0, match1, match2) {
                    // jslint-hack
                    local.utility2.nop(match0);
                    local.vm.runInNewContext(
                        match1.replace((/\S+/g), '') + '/*' + match2,
                        local,
                        __dirname + '/swagger-ui.rollup.js'
                    );
                }
            );
            local.swgg.SwaggerClient = local.SwaggerClient;
            local.swgg.SwaggerUi = local.SwaggerUi;
        }());
        // init api
        local.swgg.apiUpdate({});
        break;
    }
}());
