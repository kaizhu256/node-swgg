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
        // init lib utility2
        local.utility2 = local.modeJs === 'browser'
            ? local.global.utility2
            : require('utility2');
        // init lib swagger-lite
        local.swgg = {
            apiDict: {},
            collectionDict: {},
            local: local,
            templatePathObjectDict: {},
            templatePathObjectDefaultDict: {}
        };
        // init lib nedb
        local.swgg.Nedb = local.modeJs === 'browser'
            ? local.global.Nedb
            : require('nedb-lite');
        local.utility2.tryCatchOnError(function () {
            // init lib swagger-tools
            local.swgg.tools = { v2: { validate: local.utility2.nop } };
            local.swgg.tools = local.modeJs === 'browser'
                ? local.global.SwaggerTools.specs
                : require('./external/assets.swgg.lib.swagger-tools.js');
        }, local.utility2.nop);
        // init templatePathObjectDefaultDict
        local.swgg.templatePathObjectDefaultDict.crudCountManyByQuery = {
            _method: 'get',
            _path: '/{{_pathPrefix}}/crudCountManyByQuery',
            _pathPrefix: '{{_pathPrefix}}',
            operationId: 'crudCountManyByQuery',
            parameters: [{
                default: '{}',
                description: 'query param',
                format: 'json',
                in: 'query',
                name: '_queryQuery',
                type: 'string'
            }],
            summary: '{{operationId}} - count many {{_schemaName}} objects by query',
            tags: ['{{_pathPrefix}}']
        };
        local.swgg.templatePathObjectDefaultDict.crudCreateOrReplaceMany = {
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
                    schema: { $ref: '#/definitions/_BuiltinJsonapiResponse{{_schemaName}}' }
                }
            },
            summary: '{{operationId}} - create or replace many {{_schemaName}} objects',
            tags: ['{{_pathPrefix}}']
        };
        local.swgg.templatePathObjectDefaultDict.crudCreateOrReplaceOne = {
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
                    schema: { $ref: '#/definitions/_BuiltinJsonapiResponse{{_schemaName}}' }
                }
            },
            summary: '{{operationId}} - create or replace one {{_schemaName}} object',
            tags: ['{{_pathPrefix}}']
        };
        local.swgg.templatePathObjectDefaultDict.crudCreateOrReplaceOneByKeyUnique = {
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
                    schema: { $ref: '#/definitions/_BuiltinJsonapiResponse{{_schemaName}}' }
                }
            },
            summary: '{{operationId}} - create or replace one {{_schemaName}} object',
            tags: ['{{_pathPrefix}}']
        };
        local.swgg.templatePathObjectDefaultDict.crudCreateOrUpdateOne = {
            _method: 'patch',
            _path: '/{{_pathPrefix}}/crudCreateOrUpdateOne',
            _pathPrefix: '{{_pathPrefix}}',
            operationId: 'crudCreateOrUpdateOne',
            parameters: [{
                description: '{{_schemaName}} object',
                in: 'body',
                name: 'body',
                schema: { $ref: '#/definitions/{{_schemaName}}' },
                'x-notRequired': true
            }],
            responses: {
                200: {
                    description:
                        '200 ok - http://jsonapi.org/format/#document-structure-top-level',
                    schema: { $ref: '#/definitions/_BuiltinJsonapiResponse{{_schemaName}}' }
                }
            },
            summary: '{{operationId}} - create or update one {{_schemaName}} object',
            tags: ['{{_pathPrefix}}']
        };
        local.swgg.templatePathObjectDefaultDict.crudCreateOrUpdateOneByKeyUnique = {
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
                schema: { $ref: '#/definitions/{{_schemaName}}' },
                'x-notRequired': true
            }],
            responses: {
                200: {
                    description:
                        '200 ok - http://jsonapi.org/format/#document-structure-top-level',
                    schema: { $ref: '#/definitions/_BuiltinJsonapiResponse{{_schemaName}}' }
                }
            },
            summary: '{{operationId}} - create or update one {{_schemaName}} object',
            tags: ['{{_pathPrefix}}']
        };
        local.swgg.templatePathObjectDefaultDict.crudDeleteManyByQuery = {
            _method: 'delete',
            _path: '/{{_pathPrefix}}/crudDeleteManyByQuery',
            _pathPrefix: '{{_pathPrefix}}',
            operationId: 'crudDeleteManyByQuery',
            parameters: [{
                default: '{"id":"undefined"}',
                description: 'query param',
                format: 'json',
                in: 'query',
                name: '_queryQuery',
                required: true,
                type: 'string'
            }],
            responses: {
                200: {
                    description:
                        '200 ok - http://jsonapi.org/format/#document-structure-top-level',
                    schema: { $ref: '#/definitions/_BuiltinJsonapiResponse' }
                }
            },
            summary: '{{operationId}} - delete many {{_schemaName}} objects by query',
            tags: ['{{_pathPrefix}}']
        };
        local.swgg.templatePathObjectDefaultDict.crudDeleteOneByKeyUnique = {
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
            summary: '{{operationId}} - delete one {{_schemaName}} object by {{_keyUnique}}',
            tags: ['{{_pathPrefix}}']
        };
        local.swgg.templatePathObjectDefaultDict.crudExistsOneByKeyUnique = {
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
            summary: '{{operationId}} - ' +
                'check if one {{_schemaName}} object exists by {{_keyUnique}}',
            tags: ['{{_pathPrefix}}']
        };
        local.swgg.templatePathObjectDefaultDict.crudGetManyByQuery = {
            _method: 'get',
            _path: '/{{_pathPrefix}}/crudGetManyByQuery',
            _pathPrefix: '{{_pathPrefix}}',
            operationId: 'crudGetManyByQuery',
            parameters: [{
                default: '{"_id":{"$exists":true}}',
                description: 'query param',
                format: 'json',
                in: 'query',
                name: '_queryQuery',
                required: true,
                type: 'string'
            }, {
                default: '{}',
                description: 'projection fields param',
                format: 'json',
                in: 'query',
                name: '_queryFields',
                type: 'string'
            }, {
                default: 20,
                description: 'cursor limit param',
                in: 'query',
                name: '_queryLimit',
                required: true,
                type: 'integer'
            }, {
                default: 0,
                description: 'cursor skip param',
                in: 'query',
                name: '_querySkip',
                type: 'integer'
            }, {
                default: '{"updatedAt":-1}',
                description: 'cursor sort param',
                format: 'json',
                in: 'query',
                name: '_querySort',
                type: 'string'
            }],
            responses: {
                200: {
                    description:
                        '200 ok - http://jsonapi.org/format/#document-structure-top-level',
                    schema: { $ref: '#/definitions/_BuiltinJsonapiResponse{{_schemaName}}' }
                }
            },
            summary: '{{operationId}} - get many {{_schemaName}} objects by query',
            tags: ['{{_pathPrefix}}']
        };
        local.swgg.templatePathObjectDefaultDict.crudGetOneByKeyUnique = {
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
                    schema: { $ref: '#/definitions/_BuiltinJsonapiResponse{{_schemaName}}' }
                }
            },
            summary: '{{operationId}} - get one {{_schemaName}} object by {{_keyUnique}}',
            tags: ['{{_pathPrefix}}']
        };
        local.swgg.templatePathObjectDefaultDict.crudGetOneByQuery = {
            _method: 'get',
            _path: '/{{_pathPrefix}}/crudGetOneByQuery',
            _pathPrefix: '{{_pathPrefix}}',
            operationId: 'crudGetOneByQuery',
            parameters: [{
                default: '{}',
                description: 'query param',
                format: 'json',
                in: 'query',
                name: '_queryQuery',
                required: true,
                type: 'string'
            }, {
                default: '{}',
                description: 'projection fields param',
                format: 'json',
                in: 'query',
                name: '_queryFields',
                type: 'string'
            }],
            responses: {
                200: {
                    description:
                        '200 ok - http://jsonapi.org/format/#document-structure-top-level',
                    schema: { $ref: '#/definitions/_BuiltinJsonapiResponse{{_schemaName}}' }
                }
            },
            summary: '{{operationId}} - get one {{_schemaName}} object by query',
            tags: ['{{_pathPrefix}}']
        };
        local.swgg.templatePathObjectDefaultDict.crudLoginByPassword = {
            _method: 'get',
            _path: '/{{_pathPrefix}}/crudLoginByPassword',
            _pathPrefix: '{{_pathPrefix}}',
            operationId: 'crudLoginByPassword',
            parameters: [
                {
                    default: 'loginByPassword',
                    description: 'login-mode',
                    in: 'query',
                    name: 'modeLogin',
                    required: true,
                    type: 'string'
                },
                {
                    description: 'The password for login in clear text',
                    in: 'query',
                    name: 'password',
                    required: true,
                    type: 'string'
                },
                {
                    description: 'The user name for login',
                    in: 'query',
                    name: 'username',
                    required: true,
                    type: 'string'
                }
            ],
            responses: {
                200: {
                    description:
                        '200 ok - http://jsonapi.org/format/#document-structure-top-level',
                    schema: { $ref: '#/definitions/_BuiltinJsonapiResponse' }
                }
            },
            summary: '{{operationId}} - login by password',
            tags: ['{{_pathPrefix}}']
        };
        local.swgg.templatePathObjectDefaultDict.crudUploadManyByForm = {
            _method: 'post',
            _path: '/{{_pathPrefix}}/crudUploadManyByForm',
            _pathPrefix: '{{_pathPrefix}}',
            operationId: 'crudUploadManyByForm',
            parameters: [{
                description: '{{_schemaName}} object to form-upload',
                in: 'formData',
                name: 'file1',
                required: true,
                type: 'file'
            }, {
                description: '{{_schemaName}} object to form-upload',
                in: 'formData',
                name: 'file2',
                required: true,
                type: 'file'
            }],
            responses: {
                200: {
                    description:
                        '200 ok - http://jsonapi.org/format/#document-structure-top-level',
                    schema: { $ref: '#/definitions/_BuiltinJsonapiResponse{{_schemaName}}' }
                }
            },
            summary: '{{operationId}} - form-upload many {{_schemaName}} objects',
            tags: ['{{_pathPrefix}}']
        };
        local.swgg.templatePathObjectDefaultDict.crudUploadOneByForm = {
            _method: 'post',
            _path: '/{{_pathPrefix}}/crudUploadOneByForm',
            _pathPrefix: '{{_pathPrefix}}',
            operationId: 'crudUploadOneByForm',
            parameters: [{
                description: '{{_schemaName}} object to form-upload',
                in: 'formData',
                name: 'file',
                required: true,
                type: 'file'
            }],
            responses: {
                200: {
                    description:
                        '200 ok - http://jsonapi.org/format/#document-structure-top-level',
                    schema: { $ref: '#/definitions/_BuiltinJsonapiResponse{{_schemaName}}' }
                }
            },
            summary: '{{operationId}} - form-upload one {{_schemaName}} object',
            tags: ['{{_pathPrefix}}']
        };
        // JSON.stringify templatePathObjectDefaultDict items to prevent side-effects
        Object.keys(local.swgg.templatePathObjectDefaultDict).forEach(function (key) {
            local.swgg.templatePathObjectDefaultDict[key] =
                JSON.stringify(local.swgg.templatePathObjectDefaultDict[key]);
        });
        // init templateSwaggerJson
        local.swgg.templateSwaggerJson = JSON.stringify({
            basePath: '/api/v0',
            definitions: {
                // http://jsonapi.org/format/#document-structure-top-level
                _BuiltinJsonapiResponse: {
                    properties: {
                        data: {
                            items: { type: 'object' },
                            type: 'array'
                        },
                        errors: {
                            items: { type: 'object' },
                            type: 'array'
                        },
                        meta: { type: 'object' }
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
            'x-validateUnusedDefinition': false,
            tags: []
        });
    }());



    // run shared js-env code - function
    (function () {
        local.swgg.apiAjax = function (self, options, onError) {
        /*
         * this function will send a swagger-api ajax-request with the pathObject self
         */
            var data;
            // validate data
            local.utility2.tryCatchOnError(function () {
                local.swgg.validateByParamDefList({
                    // normalize data for validation
                    data: local.swgg.normalizeParamDictSwagger(
                        local.utility2.jsonCopy(options.swggParamDict),
                        self
                    ),
                    dataReadonlyRemove: options.swggParamDict,
                    key: self.operationId,
                    paramDefList: self.parameters
                });
            }, onError);
            if (local.utility2.tryCatchErrorCaught) {
                return;
            }
            // init options-defaults
            local.utility2.objectSetDefault(options, {
                basePath: local.swgg.swaggerJson.basePath,
                inForm: '',
                inHeader: {},
                inPath: self._path,
                inQuery: '',
                headers: {},
                host: local.swgg.swaggerJson.host || local.utility2.urlParse('').host,
                method: self._method.toUpperCase(),
                modeJson: true,
                schemes: local.swgg.swaggerJson.schemes ||
                    local.utility2.urlParse('').protocol.slice(0, -1)
            });
            // init swggParamDict
            self.parameters.forEach(function (paramDef) {
                data = options.swggParamDict[paramDef.name];
                if (data === undefined) {
                    return;
                }
                if (!(paramDef.type === 'string' ||
                        (paramDef.type === 'array' && typeof data === 'string'))) {
                    data = JSON.stringify(data);
                }
                switch (paramDef.in) {
                case 'body':
                    options.inBody = data;
                    break;
                case 'formData':
                    options.inForm += '&' + encodeURIComponent(paramDef.name) + '=' +
                        encodeURIComponent(data);
                    break;
                case 'header':
                    options.inHeader[encodeURIComponent(paramDef.name.toLowerCase())] = data;
                    break;
                case 'query':
                    options.inQuery += '&' + encodeURIComponent(paramDef.name) + '=' +
                        encodeURIComponent(data);
                    break;
                case 'path':
                    options.inPath = options.inPath
                        .replace('{' + paramDef.name + '}', encodeURIComponent(data));
                    break;
                }
            });
            // init data
            options.data = options.inBody || options.inForm.slice(1);
            // init headers
            local.utility2.objectSetOverride(options.headers, options.inHeader);
            // init headers - Content-Type
            if (options.inForm) {
                options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            }
            // init headers - Authorization
            if (local.swgg.userJwtEncoded) {
                options.headers.Authorization = options.headers.Authorization ||
                    'Bearer ' + local.swgg.userJwtEncoded;
            }
            // init url
            options.url = options.schemes + '://' + options.host + options.basePath +
                options.inPath + '?' + options.inQuery.slice(1);
            // send ajax-request
            return local.utility2.ajax(options, onError);
        };

        local.swgg.apiCreate = function (pathObject) {
        /*
         * this function will create a swagger-api call bound to the given pathObject
         */
            var self;
            // create a swagger-api call and bind self to it
            self = function (options, onError) {
                return local.swgg.apiAjax(self, options, onError);
            };
            // init self
            local.utility2.objectSetOverride(self, pathObject);
            return self;
        };

        local.swgg.apiDictUpdate = function (options) {
        /*
         * this function will update the swagger-api dict of api-calls
         */
            var keyUnique, pathObject, schema, tmp;
            // init swaggerJson
            local.swgg.swaggerJson = local.swgg.swaggerJson ||
                JSON.parse(local.swgg.templateSwaggerJson);
            options.definitions = options.definitions || {};
            options.paths = options.paths || {};
            // init pathObjectDefaultList
            Object.keys(options.definitions).forEach(function (schemaName) {
                schema = options.definitions[schemaName];
                schema._schemaName = schemaName;
                local.utility2.objectSetDefault(options, JSON.parse(JSON.stringify({
                    definitions: {
                        // init _BuiltinJsonapiResponse{{_schemaName}}
                        '_BuiltinJsonapiResponse{{_schemaName}}': {
                            properties: { data: {
                                items: { $ref: '#/definitions/{{_schemaName}}' },
                                type: 'array'
                            } },
                            'x-inheritList': [{ $ref: '#/definitions/_BuiltinJsonapiResponse' }]
                        }
                    }
                }).replace((/\{\{_schemaName\}\}/g), schemaName)), 2);
                // init pathObject
                (schema._pathObjectDefaultList || []).forEach(function (operationId) {
                    // init keyUnique
                    keyUnique = (/ByKeyUnique\.(.*)/).exec(operationId);
                    keyUnique = keyUnique && keyUnique[1];
                    keyUnique = keyUnique && keyUnique.split('.')[0];
                    operationId = operationId.replace('.' + keyUnique, '');
                    // init pathObject
                    pathObject = local.swgg.templatePathObjectDefaultDict[operationId]
                        .replace((/\{\{_keyUnique\}\}/g), keyUnique)
                        .replace((/\{\{_pathPrefix\}\}/g), schema._pathPrefix)
                        .replace((/\{\{_schemaName\}\}/g), schema._schemaName)
                        .replace((/\{\{operationId\}\}/g), operationId);
                    pathObject = JSON.parse(pathObject);
                    // init keyUnique.format and keyUnique.type
                    pathObject.parameters.forEach(function (param) {
                        if (param.name === keyUnique) {
                            param.format = schema.properties[keyUnique].format;
                            param.type = schema.properties[keyUnique].type;
                        }
                    });
                    // add _schemaName to pathObject
                    pathObject._schemaName = schemaName;
                    options.paths[pathObject._path] = options.paths[pathObject._path] || {};
                    options.paths[pathObject._path][pathObject._method] = pathObject;
                    // add schema-properties as extra params to crudGetManyByQuery
                    switch (pathObject.operationId) {
                    case 'crudGetManyByQuery':
                        pathObject.parameters = pathObject.parameters.concat(Object.keys(
                            schema.properties
                        )
                            .filter(function (key) {
                                tmp = schema.properties[key];
                                switch (tmp.type) {
                                case 'boolean':
                                case 'integer':
                                case 'number':
                                case 'string':
                                    return true;
                                }
                            })
                            .sort()
                            .map(function (key) {
                                tmp = schema.properties[key];
                                return {
                                    description: tmp.description,
                                    enum: tmp.enum,
                                    format: tmp.format,
                                    in: 'query',
                                    name: key,
                                    'x-queryRange': true,
                                    'x-title': tmp.title,
                                    type: tmp.type
                                };
                            }));
                        break;
                    }
                });
                // init pathPrefix / schemaName
                schema = options.definitions[schemaName] = JSON.parse(JSON.stringify(schema)
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
                                schema: { $ref: '#/definitions/_BuiltinJsonapiResponse' }
                            }
                        },
                        tags: []
                    }, 2);
                    // update templatePathObjectDict
                    pathObject._keyOperationId = pathObject.tags[0] + ' ' +
                        pathObject.operationId;
                    pathObject._keyPath = method.toUpperCase() + ' ' + path.replace(
                        (/\{.*/),
                        function (match0) {
                            return match0.replace((/[^\/]/g), '');
                        }
                    );
                    local.swgg.templatePathObjectDict[pathObject._keyOperationId] =
                        local.swgg.templatePathObjectDict[pathObject._keyPath] =
                            JSON.stringify(local.utility2.objectSetDefault(
                            pathObject,
                            JSON.parse(local.swgg.templatePathObjectDict[pathObject._keyPath] ||
                                '{}')
                        ));
                });
            });
            // init tags
            tmp = {};
            // merge tags from swaggerJson.tags and options.tags
            [local.swgg.swaggerJson.tags, options.tags].forEach(function (tags) {
                (tags || []).forEach(function (element) {
                    tmp[element.name] = element;
                });
            });
            // merge tags from options._tagDict
            Object.keys(options._tagDict || {}).forEach(function (key) {
                tmp[key] = options._tagDict[key];
                tmp[key].name = key;
            });
            // save tags
            tmp = Object.keys(tmp).sort().map(function (key) {
                return tmp[key];
            });
            // merge options into swaggerJson
            local.utility2.objectSetOverride(
                local.swgg.swaggerJson,
                options,
                2
            );
            // restore tags
            local.swgg.swaggerJson.tags = tmp;
            tmp = function (options) {
                Object.keys(options).forEach(function (key) {
                    if (key[0] === '_') {
                        delete options[key];
                    }
                });
            };
            // remove top-level underscored keys from swaggerJson
            tmp(local.swgg.swaggerJson);
            // remove top-level underscored keys from swaggerJson.definitions
            Object.keys(local.swgg.swaggerJson.definitions).forEach(function (key) {
                tmp(local.swgg.swaggerJson.definitions[key]);
            });
            // remove top-underscored keys from swaggerJson.paths.<path>.<method>
            Object.keys(local.swgg.swaggerJson.paths).forEach(function (path) {
                Object.keys(local.swgg.swaggerJson.paths[path]).forEach(function (method) {
                    tmp(local.swgg.swaggerJson.paths[path][method]);
                });
            });
            // init properties from x-inheritList
            [0, 1, 2, 3].forEach(function () {
                Object.keys(local.swgg.swaggerJson.definitions).forEach(function (schema) {
                    schema = local.swgg.swaggerJson.definitions[schema];
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
            // normalize swaggerJson
            local.swgg.swaggerJson = JSON.parse(local.utility2.jsonStringifyOrdered(
                local.swgg.swaggerJson
            ));
            // validate swaggerJson
            local.utility2.tryCatchOnError(function () {
                local.swgg.validateBySwagger(local.swgg.swaggerJson);
            }, local.utility2.onErrorDefault);
            // init apiDict
            Object.keys(local.swgg.templatePathObjectDict).forEach(function (key) {
                local.swgg.apiDict[key] = local.swgg.apiCreate(
                    JSON.parse(local.swgg.templatePathObjectDict[key])
                );
            });
            local.utility2.tryCatchOnError(function () {
                // init SwaggerClient
                local.SwaggerClient = local.modeJs === 'browser'
                    ? local.global.SwaggerClient
                    : require('./lib.swagger-ui.js');
                // init swagger-api
                local.swgg.api = new local.SwaggerClient({
                    url: local.utility2.serverLocalHost
                });
                local.swgg.api.buildFromSpec(local.utility2.jsonCopy(local.swgg.swaggerJson));
            }, local.utility2.nop);
        };

        local.swgg.collectionCreate = function (schemaName) {
        /*
         * this function will create a persistent nedb-collection from schemaName
         */
            var dir;
            dir = 'tmp/nedb.collection.' + local.utility2.envDict.NODE_ENV;
            if (!local.swgg.collectionDict[schemaName]) {
                // https://github.com/louischatriot/nedb/issues/134
                // bug workaround - Error creating index when db does not exist #134
                if (local.modeJs === 'node' && !local.swgg.modeNedbInitialized) {
                    // init nedb dir
                    local.utility2.tryCatchOnError(function () {
                        local.fs.mkdirSync('tmp');
                    }, local.utility2.nop);
                    local.utility2.tryCatchOnError(function () {
                        local.fs.mkdirSync(dir);
                    }, local.utility2.nop);
                }
                local.swgg.modeNedbInitialized = true;
                local.swgg.collectionDict[schemaName] = new local.swgg.Nedb({
                    autoload: true,
                    filename: dir + '/' + schemaName,
                    timestampData: true
                });
            }
            return local.swgg.collectionDict[schemaName];
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
                        collection.loadDatabase(function () {
                            onParallel.counter += 1;
                            collection.remove({}, { multi: true }, onParallel);
                            Object.keys(collection.indexes).forEach(function (key) {
                                if (key !== '_id') {
                                    onParallel.counter += 1;
                                    collection.removeIndex(key, onParallel);
                                }
                            });
                            onParallel();
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
            // coverage-hack - test error handling-behavior
            onNext(options.error);
        };

        local.swgg.collectionListInit = function (optionsList, onError) {
        /*
         * this function will serially init a list of persistent nedb-collections
         */
            var modeNext, onNext;
            modeNext = -1;
            onNext = function (error) {
                modeNext = error
                    ? Infinity
                    : modeNext + 1;
                // recursively run each sub-middleware in middlewareList
                if (modeNext < optionsList.length) {
                    local.swgg.collectionInit(optionsList[modeNext], onNext);
                    return;
                }
                onError(error);
            };
            onNext();
        };

        local.swgg.idInt52Create = function () {
        /*
         * this function will return an epoch-based-52-bit integer,
         * that can be used as an integer id
         */
            return parseInt(Date.now().toString(16).slice(0, 8) +
                Math.random().toString(16).slice(-5), 16);
        };

        local.swgg.keyUniqueInit = function (options) {
        /*
         * this function will init options.keyAlias, options.keyUnique,
         * and options.queryByKeyUnique
         */
            var keyAlias, keyUnique;
            // init keyUnique
            options.keyAlias = options.operationId.split('.');
            keyUnique = options.keyUnique = options.keyAlias[1] || 'id';
            // init keyAlias
            keyAlias = options.keyAlias = options.keyAlias[2] || options.keyUnique;
            // invert queryByKeyUnique
            if (options.modeQueryByKeyUniqueInvert) {
                keyAlias = options.keyUnique;
                keyUnique = options.keyAlias;
            }
            // init queryByKeyUnique
            options.keyValue = options.keyValue || (options.data && options.data[keyAlias]);
            options.queryByKeyUnique = {};
            options.queryByKeyUnique[keyUnique] = options.keyValue;
            return options;
        };

        local.swgg.middlewareBodyParse = function (request, response, nextMiddleware) {
        /*
         * this function will run the middleware that will parse the request-body
         */
            var ii, jj, options;
            // jslint-hack
            local.utility2.nop(response);
            // if request is already parsed, then goto nextMiddleware
            if (request.swggBodyParsed) {
                nextMiddleware();
                return;
            }
            switch ((request.headers['content-type'] || '').split(';')[0]) {
            // parse application/x-www-form-urlencoded, e.g.
            // aa=hello%20world&bb=bye%20world
            case 'application/x-www-form-urlencoded':
                request.swggBodyParsed = String(request.bodyRaw);
                request.swggBodyParsed =
                    local.utility2.urlParse('?' + request.swggBodyParsed, true).query;
                break;
            // https://tools.ietf.org/html/rfc7578
            // parse multipart/form-data, e.g.
            /*
            ------Boundary\r\n
            Content-Disposition: form-data; name="input1"; filename="file1.png"\r\n
            Content-Type: image/jpeg\r\n
            \r\n
            <data1>\r\n
            ------Boundary\r\n
            Content-Disposition: form-data; name="input2"; filename="file2.png"\r\n
            Content-Type: image/jpeg\r\n
            \r\n
            <data2>\r\n
            ------Boundary--\r\n
            */
            case 'multipart/form-data':
                request.swggBodyParsed = {};
                request.swggBodyMeta = {};
                options = {};
                options.crlf = [0x0d, 0x0a];
                // init boundary
                ii = 0;
                jj = local.swgg.bufferIndexOfSubBuffer(request.bodyRaw, options.crlf, ii);
                if (jj <= 0) {
                    return;
                }
                options.boundary = new local.global.Uint8Array(options.crlf.concat(
                    Array.prototype.slice.call(request.bodyRaw.slice(ii, jj))
                ));
                ii = jj + 2;
                while (true) {
                    jj = local.swgg.bufferIndexOfSubBuffer(
                        request.bodyRaw,
                        options.boundary,
                        ii
                    );
                    if (jj < 0) {
                        break;
                    }
                    options.header = new local.utility2.StringView(
                        request.bodyRaw.slice(ii, ii + 1024)
                    ).toString().split('\r\n').slice(0, 2).join('\r\n');
                    options.contentType = (/^content-type:(.*)/im).exec(options.header);
                    options.contentType = options.contentType && options.contentType[1].trim();
                    options.filename = (/^content-disposition:.*?\bfilename="([^"]+)/im)
                        .exec(options.header);
                    options.filename = options.filename && options.filename[1];
                    options.name = (/^content-disposition:.*?\bname="([^"]+)/im)
                        .exec(options.header);
                    options.name = options.name && options.name[1];
                    ii = local.swgg.bufferIndexOfSubBuffer(
                        request.bodyRaw,
                        [0x0d, 0x0a, 0x0d, 0x0a],
                        ii + 2
                    ) + 4;
                    options.data = request.bodyRaw.slice(ii, jj);
                    request.swggBodyParsed[options.name] = options.data;
                    request.swggBodyMeta[options.name] = {
                        contentType: options.contentType,
                        filename: options.filename,
                        name: options.name
                    };
                    ii = jj + options.boundary.length + 2;
                }
                break;
            default:
                request.swggBodyParsed = String(request.bodyRaw);
                local.utility2.tryCatchOnError(function () {
                    request.swggBodyParsed = JSON.parse(request.swggBodyParsed);
                }, local.utility2.nop);
            }
            nextMiddleware();
        };

        local.swgg.bufferIndexOfSubBuffer = function (buffer, subBuffer, fromIndex) {
        /*
         * this function will search the buffer for the indexOf position of the subBuffer
         */
            var ii, jj;
            for (ii = fromIndex || 0; ii < buffer.length; ii += 1) {
                for (jj = 0; jj < subBuffer.length; ii += 1, jj += 1) {
                    if (buffer[ii] !== subBuffer[jj]) {
                        break;
                    }
                }
                if (jj === subBuffer.length) {
                    return ii - jj;
                }
            }
            return -1;
        };

        local.swgg.middlewareCrud = function (request, response, nextMiddleware) {
        /*
         * this function will run the middleware that will implement the backend db using nedb
         */
            var crud, modeNext, onNext, onParallel;
            modeNext = 0;
            onNext = function (error, data, meta) {
                modeNext = error
                    ? Infinity
                    : modeNext + 1;
                switch (modeNext) {
                case 1:
                    // init crud
                    crud = request.crud = {};
                    // init crud.collection
                    crud.collection = request.swggPathObject &&
                        request.swggPathObject._schemaName &&
                        local.swgg.collectionCreate(request.swggPathObject._schemaName);
                    if (!crud.collection) {
                        modeNext = Infinity;
                        onNext();
                        return;
                    }
                    // init crud.body
                    crud.body = local.utility2.jsonCopy(request.swggBody);
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
                    // init crud.query*
                    [{
                        key: 'queryFields',
                        value: {}
                    }, {
                        key: 'queryLimit',
                        value: 100
                    }, {
                        key: 'queryQuery',
                        value: {}
                    }, {
                        key: 'querySkip',
                        value: 0
                    }, {
                        key: 'querySort',
                        value: { updatedAt: -1 }
                    }].forEach(function (element) {
                        crud[element.key] = crud.data['_' + element.key] || JSON.parse(
                            local.utility2.templateRender(
                                request.swggPathObject['_' + element.key] || 'null',
                                request.swggParamDict
                            )
                        ) || element.value;
                    });
                    // init crud.data.id
                    switch (crud.operationId) {
                    case 'crudCreateOrReplaceOne':
                    case 'crudCreateOrUpdateOne':
                        crud.data.id = crud.data.id || (crud.body && crud.body.id);
                        if (!crud.data.id) {
                            crud.data.id = local.utility2.uuidTimeCreate();
                            request.swggPathObject.parameters.forEach(function (param) {
                                local.utility2.tryCatchOnError(function () {
                                    switch (param.in === 'body' &&
                                        local.swgg.schemaDereference(param.schema.$ref)
                                        .properties.id.type) {
                                    // use integer id
                                    case 'integer':
                                    case 'number':
                                        crud.data.id = local.swgg.idInt52Create();
                                        break;
                                    }
                                }, local.utility2.nop);
                            });
                        }
                        break;
                    }
                    // init crud.keyUnique
                    crud.modeQueryByKeyUniqueInvert = true;
                    local.swgg.keyUniqueInit(crud);
                    switch (crud.operationId.split('.')[0]) {
                    case 'crudCountManyByQuery':
                        crud.collection.count(crud.queryQuery, onNext);
                        break;
                    case 'crudCreateOrReplaceMany':
                        crud.collection.remove({ id: { $in: crud.body.map(function (doc) {
                            return doc.id;
                        }) } }, { multi: true }, onNext);
                        break;
                    case 'crudCreateOrReplaceOne':
                    case 'crudCreateOrReplaceOneByKeyUnique':
                    case 'crudCreateOrUpdateOne':
                    case 'crudCreateOrUpdateOneByKeyUnique':
                        crud.body = crud.body || local.utility2.jsonCopy(crud.data);
                        // replace keyUnique with keyAlias in body
                        delete crud.body.id;
                        delete crud.body[crud.keyUnique];
                        crud.body[crud.keyAlias] = crud.data[crud.keyUnique];
                        // replace doc
                        if (crud.operationId.indexOf('Replace') >= 0) {
                            crud.collection.update(
                                crud.queryByKeyUnique,
                                crud.body,
                                { returnUpdatedDocs: true, upsert: true },
                                onNext
                            );
                        // update doc
                        } else {
                            crud.collection.update(
                                crud.queryByKeyUnique,
                                { $set: crud.body },
                                { returnUpdatedDocs: true, upsert: true },
                                onNext
                            );
                        }
                        break;
                    case 'crudDeleteManyByQuery':
                        crud.collection.remove(crud.queryQuery, { multi: true }, onNext);
                        break;
                    case 'crudDeleteOneByKeyUnique':
                        crud.collection.remove(crud.queryByKeyUnique, onNext);
                        break;
                    case 'crudExistsOneByKeyUnique':
                        crud.collection.findOne(crud.queryByKeyUnique, { $: 1 }, onNext);
                        break;
                    case 'crudGetManyByQuery':
                        onParallel = local.utility2.onParallel(onNext);
                        onParallel.counter += 1;
                        crud.collection.find(crud.queryQuery, crud.queryFields)
                            .sort(crud.querySort)
                            .skip(crud.querySkip)
                            .limit(crud.queryLimit)
                            .exec(function (error, data) {
                                crud.queryData = data;
                                onParallel(error);
                            });
                        onParallel.counter += 1;
                        crud.collection.count({}, function (error, data) {
                            crud.paginationCountTotal = data;
                            onParallel(error);
                        });
                        break;
                    case 'crudGetOneByKeyUnique':
                        crud.collection.findOne(crud.queryByKeyUnique, onNext);
                        break;
                    case 'crudGetOneByQuery':
                        crud.collection.findOne(crud.queryQuery, crud.queryFields, onNext);
                        break;
                    default:
                        modeNext = Infinity;
                        onNext();
                    }
                    break;
                case 2:
                    switch (crud.operationId.split('.')[0]) {
                    case 'crudCreateOrReplaceMany':
                        crud.collection.insert(crud.body, onNext);
                        break;
                    case 'crudCreateOrReplaceOne':
                    case 'crudCreateOrReplaceOneByKeyUnique':
                    case 'crudCreateOrUpdateOne':
                    case 'crudCreateOrUpdateOneByKeyUnique':
                        onNext(null, meta, data);
                        break;
                    case 'crudGetManyByQuery':
                        onNext(null, crud.queryData, {
                            paginationCountTotal: crud.paginationCountTotal
                        });
                        break;
                    case 'crudExistsOneByKeyUnique':
                        onNext(null, !!data);
                        break;
                    default:
                        onNext(null, data);
                    }
                    break;
                case 3:
                    local.swgg.serverRespondJsonapi(request, response, null, data, meta);
                    break;
                default:
                    nextMiddleware(error, data, meta);
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

        local.swgg.middlewareFileUpload = function (request, response, nextMiddleware) {
        /*
         * this function will handle file upload / delete
         */
            // jslint-hack
            local.utility2.nop(request, response);
            nextMiddleware();
        };

        local.swgg.middlewareJsonpStateInit = function (request, response, nextMiddleware) {
        /*
         * this function will jsonp-init the browser-state
         */
            if (request.urlParsed.pathname === '/jsonp.swgg.stateInit.js') {
                response.end('window.swgg.stateInit(' + JSON.stringify({
                    swaggerJson: local.swgg.swaggerJson
                }) + ');');
                return;
            }
            nextMiddleware();
        };

        local.swgg.middlewareLogin = function (request, response, nextMiddleware) {
        /*
         * this function will handle login / logout
         */
            var modeNext, onNext;
            modeNext = 0;
            onNext = function (error, data) {
                modeNext = error
                    ? Infinity
                    : modeNext + 1;
                switch (modeNext) {
                case 1:
                    request.swggLogin = request.swggLogin ||
                        local.utility2.jsonCopy(request.urlParsed.query) ||
                        {};
                    if (!request.swggLogin.jwtEncoded && request.headers.authorization) {
                        request.userJwt = local.utility2.jwtHs256Decode(
                            request.headers.authorization.replace('Bearer ', ''),
                            local.utility2.envDict.JWT_SECRET || ''
                        );
                    }
                    switch (request.swggLogin.modeLogin) {
                    case 'loginByPassword':
                        if (request.swggLogin.password && request.swggLogin.username) {
                            local.swgg.collectionCreate('_BuiltinUser').findOne({
                                username: request.swggLogin.username
                            }, onNext);
                            return;
                        }
                        break;
                    }
                    modeNext = Infinity;
                    onNext();
                    break;
                case 2:
                    switch (request.swggLogin.modeLogin) {
                    case 'loginByPassword':
                        if (local.utility2.bcryptPasswordValidate(
                                request.swggLogin.password,
                                data && data.password
                            )) {
                            request.userJwt = {
                                exp: Math.floor(Date.now() / 1000) + 3600,
                                jti: local.utility2.uuidTimeCreate(),
                                roleList: data.roleList,
                                sub: data.username
                            };
                            local.swgg.serverRespondJsonapi(request, response, null, {
                                jwtEncoded: local.utility2.jwtHs256Encode(
                                    request.userJwt,
                                    local.utility2.envDict.JWT_SECRET || ''
                                )
                            });
                            return;
                        }
                        break;
                    }
                    onNext();
                    break;
                default:
                    nextMiddleware(error, data);
                }
            };
            onNext();
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
                        request.swggPathObject =
                            local.swgg.templatePathObjectDict[request.swggPathname];
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
                            request.swggBody = request.swggParamDict[paramDef.name] =
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
                        if (local.utility2.isNullOrUndefined(
                                request.swggParamDict[paramDef.name]
                            )) {
                            request.swggParamDict[paramDef.name] =
                                local.utility2.jsonCopy(paramDef.default);
                        }
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
                if (local.utility2.isNullOrUndefined(tmp)) {
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
                    case 'multi':
                        tmp = [tmp];
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
                    local.utility2.tryCatchOnError(function () {
                        tmp = JSON.parse(tmp);
                    }, local.utility2.nop);
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
            return function (error, data, meta) {
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
                    // normalize error-list to contain non-null objects
                    if (ii === 0) {
                        // normalize error-list to be non-empty
                        if (!data.length) {
                            data.push(null);
                        }
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
                        return error;
                    }
                    return { data: data };
                });
                // init data.meta
                data.forEach(function (data, ii) {
                    if (!data) {
                        return;
                    }
                    data.meta = local.utility2.jsonCopy(meta || {});
                    // normalize meta-object
                    if (typeof data.meta !== 'object') {
                        data.meta = { metaData: meta };
                    }
                    data.meta.isJsonapiResponse = true;
                    if (ii === 0) {
                        data.meta.errorsLength = (data.errors && data.errors.length) | 0;
                    } else {
                        data.meta.dataLength = (data.data && data.data.length) | 0;
                    }
                    data.meta.statusCode = data.meta.statusCode || data.statusCode || 0;
                });
                onError(data[0], data[1]);
            };
        };

        local.swgg.schemaDereference = function ($ref) {
        /*
         * this function will try to dereference the schema from $ref
         */
            var result;
            local.utility2.tryCatchOnError(function () {
                result = local.utility2.jsonCopy(local.swgg.swaggerJson.definitions[
                    (/^\#\/definitions\/([^\/]+)$/).exec($ref)[1]
                ]);
            }, local.utility2.nop);
            return result;
        };

        local.swgg.serverRespondJsonapi = function (request, response, error, data, meta) {
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
                response.end(JSON.stringify(data));
            })(error, data, meta);
        };

        local.swgg.stateInit = function (state) {
        /*
         * this function will init the swgg-state
         */
            Object.keys(state).forEach(function (key) {
                local.swgg[key] = state[key];
            });
            // init api
            local.swgg.apiDictUpdate(local.swgg.swaggerJson);
        };

        local.swgg.userLoginByPassword = function (options, onError) {
        /*
         * this function will send a user-login-request by password,
         * and if succesful, will receive a jwt token
         */
            var self;
            self = local.swgg.apiDict["GET /_builtin-user/crudLoginByPassword"];
            self({ swggParamDict: {
                modeLogin: 'loginByPassword',
                password: options.password,
                username: options.username
            } }, function (error, xhr) {
                if (!error && xhr) {
                    local.swgg.userJwtEncoded = xhr.responseJSON.data[0].jwtEncoded;
                }
                onError(error, xhr);
            });
        };

        local.swgg.validateByParamDefList = function (options) {
        /*
         * this function will validate options.data against options.paramDefList
         */
            var data, key;
            local.utility2.tryCatchOnError(function () {
                data = options.data;
                // validate data
                local.utility2.assert(data && typeof data === 'object', data);
                (options.paramDefList || []).forEach(function (paramDef) {
                    key = paramDef.name;
                    // recurse - validateByPropertyDef
                    local.swgg.validateByPropertyDef({
                        data: data[key],
                        dataReadonlyRemove: options.dataReadonlyRemove &&
                            options.dataReadonlyRemove[key],
                        key: key,
                        propertyDef: paramDef,
                        required: paramDef.required,
                        'x-notRequired': paramDef['x-notRequired']
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
            if (local.utility2.isNullOrUndefined(data)) {
                if (options.required && !options['x-notRequired']) {
                    throw new Error('required property ' + options.key + ':' +
                        (propertyDef.format || propertyDef.type) +
                        ' cannot be null or undefined');
                }
                return;
            }
            // validate schema
            tmp = propertyDef.$ref || (propertyDef.schema && propertyDef.schema.$ref);
            if (tmp) {
                // recurse - validateBySchema
                local.swgg.validateBySchema({
                    circularList: options.circularList,
                    data: data,
                    dataReadonlyRemove: options.dataReadonlyRemove,
                    key: tmp,
                    schema: local.swgg.schemaDereference(tmp),
                    'x-notRequired': options['x-notRequired']
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
            local.utility2.tryCatchOnError(function () {
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
                    if (propertyDef.pattern) {
                        local.utility2.assert(new RegExp(propertyDef.pattern).test(data));
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
                    data.forEach(function (element, ii) {
                        // recurse - validateByPropertyDef
                        local.swgg.validateByPropertyDef({
                            circularList: options.circularList,
                            data: element,
                            dataReadonlyRemove: options.dataReadonlyRemove &&
                                options.dataReadonlyRemove[ii],
                            key: options.key,
                            propertyDef: propertyDef.items,
                            'x-notRequired': options['x-notRequired']
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
                    // Clarify 'byte' format #50
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
                error.message = error.message || 'invalid property ' + options.key + ' (' +
                    (propertyDef.format || propertyDef.type) + ') - ' + JSON.stringify(data) +
                    ' - ' + JSON.stringify(propertyDef);
                throw error;
            });
        };

        local.swgg.validateBySchema = function (options) {
        /*
         * this function will validate options.data against options.schema
         */
            var data, key, schema;
            local.utility2.tryCatchOnError(function () {
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
                    // delete options.dataReadonlyRemove[key]
                    if (schema.properties[key].readOnly &&
                            options.dataReadonlyRemove &&
                            options.dataReadonlyRemove.hasOwnProperty(key)) {
                        delete options.dataReadonlyRemove[key];
                    }
                    // recurse - validateByPropertyDef
                    local.swgg.validateByPropertyDef({
                        circularList: options.circularList,
                        data: data[key],
                        dataReadonlyRemove: options.dataReadonlyRemove &&
                            options.dataReadonlyRemove[key],
                        depth: options.depth - 1,
                        key: key,
                        propertyDef: schema.properties[key],
                        required: schema.required && schema.required.indexOf(key) >= 0,
                        'x-notRequired': options['x-notRequired']
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
                options,
                function (error, result) {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    ['errors', 'undefined', 'warnings'].forEach(function (errorType) {
                        ((result && result[errorType]) || [
                        ]).slice(0, 8).forEach(function (element) {
                            if (options['x-validateUnusedDefinition'] === false &&
                                    errorType === 'warnings' &&
                                    (element && element.code) === 'UNUSED_DEFINITION') {
                                return;
                            }
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
        require('./lib.admin-ui.js');
        local.fs = require('fs');
        local.path = require('path');
        local.url = require('url');
        // init petstore-api
        local.swgg.templateSwaggerJsonPetstore = JSON.parse(local.fs.readFileSync(
            local.swgg.__dirname + '/lib.swagger.petstore.json',
            'utf8'
        ));
        delete local.swgg.templateSwaggerJsonPetstore.basePath;
        delete local.swgg.templateSwaggerJsonPetstore.host;
        delete local.swgg.templateSwaggerJsonPetstore.schemes;
        local.swgg.templateSwaggerJsonPetstore =
            JSON.stringify(local.swgg.templateSwaggerJsonPetstore);
        // init templateAssetsSwggAdminUiHtml
        local.swgg.templateAssetsSwggAdminUiHtml =
            local.fs.readFileSync(__dirname + '/assets.swgg.admin-ui.html', 'utf8');
        // init assets
        local.utility2.assetsDict['/assets.swgg.admin-ui.html'] = local.utility2.templateRender(
            local.swgg.templateAssetsSwggAdminUiHtml,
            { envDict: local.utility2.envDict },
            ''
        );
        local.utility2.assetsDict['/assets.swgg.css'] =
            local.fs.readFileSync(__dirname + '/index.css', 'utf8');
        local.utility2.assetsDict['/assets.swgg.js'] =
            local.utility2.istanbulInstrumentInPackage(
                local.fs.readFileSync(__filename, 'utf8'),
                __filename,
                'swagger-lite'
            );
        local.utility2.assetsDict['/assets.swgg.lib.admin-ui.js'] =
            local.fs.readFileSync(__dirname + '/lib.admin-ui.js', 'utf8');
        local.utility2.assetsDict['/assets.swgg.lib.nedb.js'] =
            local.fs.readFileSync(local.swgg.Nedb.__dirname + '/nedb-lite.js', 'utf8');
        local.utility2.assetsDict['/assets.swgg.lib.swagger-ui.js'] =
            local.utility2.istanbulInstrumentInPackage(
                local.fs.readFileSync(__dirname + '/lib.swagger-ui.js', 'utf8'),
                __dirname + '/lib.swagger-ui.js',
                'swagger-lite'
            );
        local.utility2.tryCatchOnError(function () {
            local.fs.readdirSync(__dirname + '/external').forEach(function (file) {
                local.utility2.assetsDict['/' + file] =
                    local.fs.readFileSync(__dirname + '/external/' + file);
            });
        }, local.utility2.nop);
        local.utility2.assetsDict['/swagger-ui.html'] = local.utility2.templateRender(
            local.fs.readFileSync(__dirname + '/README.md', 'utf8')
                .replace((/[\S\s]*?<!doctype html>/), '<!doctype html>')
                .replace((/<\/html>[\S\s]*/), '</html>')
                .replace((/\\n\\$/gm), '')
                .replace((/\\\\/g), '\\'),
            { envDict: local.utility2.envDict },
            ''
        );
        /* istanbul ignore next */
        // run the cli
        local.cliRun = function () {
        /*
         * this function will run the cli
         */
            var onParallel;
            if (module !== require.main) {
                return;
            }
            switch (process.argv[2]) {
            case 'postinstall':
                onParallel = local.utility2.onParallel(function (error) {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    console.log('fetching done');
                });
                onParallel.counter += 1;
                local.fs.mkdir('external', local.utility2.nop);
                [{
                    file: 'external/assets.swgg.animate.css',
                    url: 'https://raw.githubusercontent.com' +
                        '/daneden/animate.css/v3.1.0/animate.css'
                // init lib bootstrap
                }, {
                    file: 'external/assets.swgg.bootstrap.css',
                    transform: function (data) {
                        return data.toString().replace(
                            (/\.\.\/fonts\//g),
                            'assets.swgg.bootstrap.'
                        );
                    },
                    url: 'https://raw.githubusercontent.com' +
                        '/twbs/bootstrap/v3.3.6/dist/css/bootstrap.min.css'
                }, {
                    file: 'external/assets.swgg.bootstrap.glyphicons-halflings-regular.eot',
                    url: 'https://raw.githubusercontent.com' +
                        '/twbs/bootstrap/v3.3.6/dist/fonts/glyphicons-halflings-regular.eot'
                }, {
                    file: 'external/assets.swgg.bootstrap.glyphicons-halflings-regular.svg',
                    url: 'https://raw.githubusercontent.com' +
                        '/twbs/bootstrap/v3.3.6/dist/fonts/glyphicons-halflings-regular.svg'
                }, {
                    file: 'external/assets.swgg.bootstrap.glyphicons-halflings-regular.ttf',
                    url: 'https://raw.githubusercontent.com' +
                        '/twbs/bootstrap/v3.3.6/dist/fonts/glyphicons-halflings-regular.ttf'
                }, {
                    file: 'external/assets.swgg.bootstrap.glyphicons-halflings-regular.woff',
                    url: 'https://raw.githubusercontent.com' +
                        '/twbs/bootstrap/v3.3.6/dist/fonts/glyphicons-halflings-regular.woff'
                }, {
                    file: 'external/assets.swgg.bootstrap.glyphicons-halflings-regular.woff2',
                    url: 'https://raw.githubusercontent.com' +
                        '/twbs/bootstrap/v3.3.6/dist/fonts/glyphicons-halflings-regular.woff2'
                }, {
                    file: 'external/assets.swgg.lib.bootstrap.js',
                    url: 'https://raw.githubusercontent.com' +
                        '/twbs/bootstrap/v3.3.6/dist/js/bootstrap.min.js'
                // init lib bootstrap-datetimepicker
                }, {
                    file: 'external/assets.swgg.bootstrap-datetimepicker.css',
                    url: 'https://raw.githubusercontent.com' +
                        '/Eonasdan/bootstrap-datetimepicker/4.17.37/build/css' +
                        '/bootstrap-datetimepicker.css'
                }, {
                    file: 'external/assets.swgg.lib.bootstrap-datetimepicker.js',
                    url: 'https://raw.githubusercontent.com' +
                        '/Eonasdan/bootstrap-datetimepicker/4.17.37/build/js' +
                        '/bootstrap-datetimepicker.min.js'
                // init lib bootstrap-fileinput
                }, {
                    file: 'external/assets.swgg.bootstrap-fileinput.img.loading-sm.gif',
                    url: 'https://raw.githubusercontent.com' +
                        '/kartik-v/bootstrap-fileinput/v4.3.1/img/loading-sm.gif'
                }, {
                    file: 'external/assets.swgg.bootstrap-fileinput.img.loading.gif',
                    url: 'https://raw.githubusercontent.com' +
                        '/kartik-v/bootstrap-fileinput/v4.3.1/img/loading.gif'
                }, {
                    file: 'external/assets.swgg.bootstrap-fileinput.css',
                    url: 'https://raw.githubusercontent.com' +
                        '/kartik-v/bootstrap-fileinput/v4.3.1/css/fileinput.css'
                }, {
                    file: 'external/assets.swgg.lib.bootstrap-fileinput.js',
                    url: 'https://raw.githubusercontent.com' +
                        '/kartik-v/bootstrap-fileinput/v4.3.1/js/fileinput.min.js'
                // init lib datatables
                }, {
                    file: 'external/assets.swgg.datatables.css',
                    transform: function (data) {
                        return data.toString().replace(
                            (/DataTables-1.10.11\/images\//g),
                            'assets.swgg.datatables.images.'
                        );
                    },
                    // https://www.datatables.net/download/
                    url: 'https://cdn.datatables.net/t/dt/' +
                        'dt-1.10.11,af-2.1.1,' +
                        'b-1.1.2,b-colvis-1.1.2,b-html5-1.1.2,b-print-1.1.2,cr-1.3.1,' +
                        'fc-3.2.1,fh-3.1.1,kt-2.1.1,r-2.0.2,rr-1.1.1,sc-1.4.1,se-1.1.2' +
                        '/datatables.css'
                }, {
                    file: 'external/assets.swgg.datatables.images.sort_asc.png',
                    url: 'https://cdnjs.cloudflare.com' +
                        '/ajax/libs/datatables/1.10.11/images/sort_asc.png'
                }, {
                    file: 'external/assets.swgg.datatables.images.sort_asc_disabled.png',
                    url: 'https://cdnjs.cloudflare.com' +
                        '/ajax/libs/datatables/1.10.11/images/sort_asc_disabled.png'
                }, {
                    file: 'external/assets.swgg.datatables.images.sort_both.png',
                    url: 'https://cdnjs.cloudflare.com' +
                        '/ajax/libs/datatables/1.10.11/images/sort_both.png'
                }, {
                    file: 'external/assets.swgg.datatables.images.sort_desc.png',
                    url: 'https://cdnjs.cloudflare.com' +
                        '/ajax/libs/datatables/1.10.11/images/sort_desc.png'
                }, {
                    file: 'external/assets.swgg.datatables.images.sort_desc_disabled.png',
                    url: 'https://cdnjs.cloudflare.com' +
                        '/ajax/libs/datatables/1.10.11/images/sort_desc_disabled.png'
                }, {
                    file: 'external/assets.swgg.lib.datatables.js',
                    // https://www.datatables.net/download/
                    url: 'https://cdn.datatables.net/t/dt/' +
                        'dt-1.10.11,af-2.1.1,' +
                        'b-1.1.2,b-colvis-1.1.2,b-html5-1.1.2,b-print-1.1.2,cr-1.3.1,' +
                        'fc-3.2.1,fh-3.1.1,kt-2.1.1,r-2.0.2,rr-1.1.1,sc-1.4.1,se-1.1.2' +
                        '/datatables.js'
                // init lib jquery
                }, {
                    file: 'external/assets.swgg.lib.jquery.js',
                    url: 'https://raw.githubusercontent.com' +
                        '/jquery/jquery/2.1.4/dist/jquery.min.js'
                // init lib moment
                }, {
                    file: 'external/assets.swgg.lib.moment.js',
                    url: 'https://raw.githubusercontent.com' +
                        '/moment/moment/2.11.2/min/moment.min.js'
                // init lib swagger-tools
                }, {
                    file: 'external/assets.swgg.lib.swagger-tools.js',
                    url: 'https://raw.githubusercontent.com/apigee-127' +
                        '/swagger-tools/v0.9.14/browser/swagger-tools-standalone-min.js'
                // init lib swagger-ui
                }, {
                    file: 'external/assets.swgg.swagger-ui.explorer_icons.png',
                    url: 'https://raw.githubusercontent.com' +
                        '/swagger-api/swagger-ui/v2.1.4/dist/images/explorer_icons.png'
                }, {
                    file: 'external/assets.swgg.swagger-ui.favicon-16x16.png',
                    url: 'https://raw.githubusercontent.com' +
                        '/swagger-api/swagger-ui/v2.1.4/dist/images/favicon-16x16.png'
                }, {
                    file: 'external/assets.swgg.swagger-ui.favicon-32x32.png',
                    url: 'https://raw.githubusercontent.com' +
                        '/swagger-api/swagger-ui/v2.1.4/dist/images/favicon-32x32.png'
                }, {
                    file: 'external/assets.swgg.swagger-ui.logo_small.png',
                    url: 'https://raw.githubusercontent.com' +
                        '/swagger-api/swagger-ui/v2.1.4/dist/images/logo_small.png'
                }, {
                    file: 'external/assets.swgg.swagger-ui.throbber.gif',
                    url: 'https://raw.githubusercontent.com' +
                        '/swagger-api/swagger-ui/v2.1.4/dist/images/throbber.gif'
                }].forEach(function (options) {
                    console.log('fetching ' + options.url);
                    onParallel.counter += 1;
                    local.utility2.ajax(options, function (error, xhr) {
                        onParallel.counter += 1;
                        onParallel(error);
                        if (options.url.slice(-3) === '.js') {
                            xhr.response = xhr.responseText + '\n/* istanbul ignore all */';
                        }
                        local.fs.writeFile(
                            options.file,
                            (options.transform || local.utility2.echo)(xhr.response),
                            onParallel
                        );
                    });
                });
                onParallel();
                break;
            }
        };
        local.cliRun();
        break;
    }



    // run shared js-env code - post-init
    (function () {
        // init api
        local.swgg.apiDictUpdate({
            _tagDict: {
                '_builtin-file': { description: 'builtin File model' },
                '_builtin-user': { description: 'builtin User model' }
            },
            definitions: {
                _BuiltinFile: {
                    _pathObjectDefaultList: [
                        'crudDeleteOneByKeyUnique.id',
                        'crudGetOneByKeyUnique.id',
                        'crudGetManyByQuery',
                        'crudUploadOneByForm'
                    ],
                    _pathPrefix: '_builtin-file',
                    properties: {
                        blob: { format: 'byte', type: 'string' },
                        contentType: { type: 'string' },
                        createdAt: { format: 'date-time', readOnly: true, type: 'string' },
                        filename: { type: 'string' },
                        id: { type: 'string' },
                        updatedAt: { format: 'date-time', readOnly: true, type: 'string' },
                        url: { format: 'url-image', type: 'string' }
                    },
                    required: ['url']
                },
                _BuiltinUser: {
                    _pathObjectDefaultList: [
                        'crudCreateOrReplaceOne',
                        'crudCreateOrUpdateOneByKeyUnique.id',
                        'crudDeleteOneByKeyUnique.id',
                        'crudGetManyByQuery',
                        'crudLoginByPassword'
                    ],
                    _pathPrefix: '_builtin-user',
                    properties: {
                        createdAt: { format: 'date-time', readOnly: true, type: 'string' },
                        id: { type: 'string' },
                        jwtEncoded: { type: 'string' },
                        password: { format: 'password', type: 'string' },
                        roleList: { items: { type: 'string' }, type: 'array' },
                        updatedAt: { format: 'date-time', readOnly: true, type: 'string' },
                        username: { type: 'string' }
                    }
                }
            }
        });
        // init collection-list
        local.utility2.onReady.counter += 1;
        local.swgg.collectionListInit([{
            ensureIndexList: [{
                fieldName: 'id',
                unique: true
            }, {
                fieldName: 'url',
                unique: true
            }],
            name: '_BuiltinFile'
        }, {
            ensureIndexList: [{
                fieldName: 'id',
                unique: true
            }, {
                fieldName: 'username',
                unique: true
            }],
            name: '_BuiltinUser'
        }], local.utility2.onReady);
    }());
}());
