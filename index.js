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
        local.swlt = { cacheDict: { collection: {}, methodPath: {} }, local: local };
    }());



    // run shared js-env code
    (function () {
        local.swlt.normalizeParamDictSwagger = function (data, methodPath) {
            /*
             * this function will parse the data according to methodPath.parameters
             */
            var tmp;
            methodPath.parameters.forEach(function (paramDef) {
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
                // JSON.parse swltParamDict
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

        local.swlt.onErrorJsonapi = function (options, onError) {
            /*
             * this function will convert the error and data to jsonapi format,
             * http://jsonapi.org/format/#errors
             * and pass them to onError
             */
            return function (error, data) {
                if (typeof options === 'function') {
                    options = options();
                }
                options = options || {};
                options.id = options.id || local.utility2.uuidTime();
                // handle error
                if (error) {
                    if (error.errors && Array.isArray(error.errors) && error.errors[0]) {
                        onError(error);
                        return;
                    }
                    // prepend mongodb-errmsg
                    if (error.errmsg) {
                        local.utility2.errorMessagePrepend(error, error.errmsg + '\n');
                    }
                    options.message = error.message;
                    options.stack = error.stack;
                    options.statusCode = Number(error.statusCode) || 500;
                    options.errors = local.utility2.jsonCopy(error);
                    local.utility2.objectSetDefault(options.errors, {
                        code: options.statusCode,
                        detail: options.stack,
                        id: options.id,
                        message: options.message
                    });
                    options.errors.code = String(options.errors.code);
                    options.errors.detail = String(options.errors.detail);
                    options.errors.id = String(options.errors.id);
                    options.errors.message = String(options.errors.message);
                    options.errors = [options.errors];
                    onError(options);
                    return;
                }
                // handle data
                options.data = data;
                if (!Array.isArray(options.data)) {
                    options.data = [options.data];
                }
                onError(null, options);
            };
        };

        local.swlt.schemaDereference = function ($ref) {
            /*
             * this function will try to dereference the schema from $ref
             */
            try {
                return ((local.global.swaggerUi &&
                    local.global.swaggerUi.api &&
                    local.global.swaggerUi.api.swaggerJson) ||
                    local.swlt.swaggerJson)
                    .definitions[(/^\#\/definitions\/(\w+)$/).exec($ref)[1]];
            } catch (ignore) {
            }
        };

        local.swlt.validateByParamDefList = function (options) {
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
                    local.swlt.validateByPropertyDef({
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

        local.swlt.validateByPropertyDef = function (options) {
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
                local.swlt.validateBySchema({
                    circularList: options.circularList,
                    data: data,
                    key: tmp,
                    schema: local.swlt.schemaDereference(tmp)
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
                    local.swlt.validateByPropertyDef({
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
                assert(typeof data === 'string');
                switch (propertyDef.format) {
                // https://github.com/swagger-api/swagger-spec/issues/50
                case 'byte':
                    assert(!(/[^\n\r\+\/0-9\=A-Za-z]/).test(data));
                    break;
                case 'date':
                    tmp = new Date(data);
                    assert(tmp.getTime() && data === tmp.toISOString().slice(0, 10));
                    break;
                case 'date-time':
                    tmp = new Date(data);
                    assert(tmp.getTime() &&
                        data.slice(0, 19) === tmp.toISOString().slice(0, 19));
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

        local.swlt.validateBySchema = function (options) {
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
                // validate data
                switch (options.key) {
                // ignore undefined schema
                case '#/definitions/Undefined':
                    return;
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
                    local.swlt.validateByPropertyDef({
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

        local.swlt.validateBySwagger = function (options) {
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
        local.swlt.apiUpdate = function (options) {
            /*
             * this function will update the api
             */
            var methodPath, tmp;
            options.definitions = options.definitions || {};
            options.paths = options.paths || {};
            // update paths
            Object.keys(options.paths).forEach(function (path) {
                Object.keys(options.paths[path]).forEach(function (method) {
                    methodPath = options.paths[path][method];
                    methodPath._method = method;
                    methodPath._path = path;
                    // init methodPath
                    local.utility2.objectSetDefault(methodPath, {
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
                    // update cacheDict.methodPath
                    local.swlt.cacheDict.methodPath[method.toUpperCase() + ' ' + path.replace(
                        (/\{.*/),
                        function (match0) {
                            return match0.replace((/[^\/]/g), '');
                        }
                    )] = JSON.stringify(methodPath);
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
            [local.swlt.swaggerJson.tags, options.tags].forEach(function (tags) {
                (tags || []).forEach(function (element) {
                    tmp[element.name] = element;
                });
            });
            tmp = local.swlt.swaggerJson.tags = Object.keys(tmp).sort().map(function (key) {
                return tmp[key];
            });
            // update swaggerJson with options, with underscore keys removed
            local.utility2.objectSetOverride(
                local.swlt.swaggerJson,
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
            local.swlt.swaggerJson.tags = tmp;
            // init properties from x-inheritList
            [0, 1, 2, 3].forEach(function () {
                Object.keys(local.swlt.swaggerJson.definitions).forEach(function (schema) {
                    schema = local.swlt.swaggerJson.definitions[schema];
                    // jsonCopy object to prevent side-effects
                    local.utility2.jsonCopy(schema['x-inheritList'] || [])
                        .reverse()
                        .forEach(function (element) {
                            local.utility2.objectSetDefault(schema, {
                                properties:
                                    local.swlt.schemaDereference(element.$ref).properties
                            }, 2);
                        });
                });
            });
            // jsonCopy object to prevent side-effects
            local.swlt.swaggerJson = JSON.parse(local.utility2
                .jsonStringifyOrdered(local.utility2.jsonCopy(local.swlt.swaggerJson)));
            // validate swaggerJson
            local.swlt.validateBySwagger(local.utility2.objectSetDefault(
                local.utility2.jsonCopy(local.swlt.swaggerJson),
                local.swlt.swaggerJson$$Dummy,
                2
            ));
            //!! // init crud-api
            //!! local.swlt.api = new local.swlt.SwaggerClient({
                //!! url: 'http://localhost:' + local.utility2.serverPortInit()
            //!! });
            //!! local.swlt.api.buildFromSpec(local.utility2.jsonCopy(local.swlt.swaggerJson));
        };

        local.swlt.middlewareError = function (error, request, response) {
            /*
             * this function will handle errors according to http://jsonapi.org/format/#errors
             */
            if (!error) {
                error = new Error('404 Not Found');
                error.statusCode = 404;
            }
            local.swlt.onErrorJsonapi(null, function (error) {
                local.utility2.serverRespondHeadSet(request, response, error.statusCode, {});
                // debug statusCode / method / url
                local.utility2.errorMessagePrepend(error, response.statusCode + ' ' +
                    request.method + ' ' + request.url + '\n');
                // print error.stack to stderr
                local.utility2.onErrorDefault(error);
                response.end(JSON.stringify(error));
            })(error);
        };

        local.swlt.middlewareBodyParse = function (request, response, nextMiddleware) {
            /*
             * this function will parse the request-body
             */
            // jslint-hack
            local.utility2.nop(response);
            local.utility2.testTryCatch(function () {
                if (request.swltBodyParsed) {
                    nextMiddleware();
                    return;
                }
                request.swltBodyParsed = String(request.bodyRaw);
                switch ((/[^;]*/).exec(request.headers['content-type'] || '')[0]) {
                case 'application/x-www-form-urlencoded':
                    request.swltBodyParsed =
                        local.url.parse('?' + request.swltBodyParsed, true).query;
                    break;
                default:
                    try {
                        request.swltBodyParsed = JSON.parse(request.swltBodyParsed);
                    } catch (ignore) {
                    }
                }
                nextMiddleware();
            }, nextMiddleware);
        };

        local.swlt.middlewareSwagger = function (request, response, nextMiddleware) {
            /*
             * this function will run the main swagger-lite middleware
             */
            var modeNext, onNext, tmp;
            modeNext = 0;
            onNext = function (error) {
                local.utility2.testTryCatch(function () {
                    modeNext = error
                        ? Infinity
                        : modeNext + 1;
                    switch (modeNext) {
                    case 1:
                        // if request.url is not prefixed with swaggerJson.basePath,
                        // then default to nextMiddleware
                        if (request.urlParsed.pathnameNormalized
                                .indexOf(local.swlt.swaggerJson.basePath) !== 0) {
                            modeNext = Infinity;
                            onNext();
                            return;
                        }
                        // init swltPathname
                        request.swltPathname = request.method + ' ' +
                            request.urlParsed.pathnameNormalized
                            .replace(local.swlt.swaggerJson.basePath, '');
                        switch (request.swltPathname) {
                        // serve swagger.json
                        case 'GET /swagger.json':
                            response.end(JSON.stringify(local.swlt.swaggerJson));
                            return;
                        }
                        // init swltMethodPath
                        while (true) {
                            request.swltMethodPath =
                                local.swlt.cacheDict.methodPath[request.swltPathname];
                            // if swltMethodPath exists, then break and continue
                            if (request.swltMethodPath) {
                                request.swltMethodPath = JSON.parse(request.swltMethodPath);
                                onNext();
                                break;
                            }
                            // if cannot init swltMethodPath, then default to nextMiddleware
                            if (request.swltPathname === request.swltPathnameOld) {
                                modeNext = Infinity;
                                onNext();
                                break;
                            }
                            request.swltPathnameOld = request.swltPathname;
                            request.swltPathname =
                                request.swltPathname.replace((/\/[^\/]+?(\/*?)$/), '/$1');
                        }
                        break;
                    case 2:
                        // init swltParamDict
                        request.swltParamDict = {};
                        // parse path param
                        tmp = request.urlParsed.pathname
                            .replace(local.swlt.swaggerJson.basePath, '').split('/');
                        request.swltMethodPath._path.split('/').forEach(function (key, ii) {
                            if ((/^\{\S*?\}$/).test(key)) {
                                request.swltParamDict[key.slice(1, -1)] =
                                    decodeURIComponent(tmp[ii]);
                            }
                        });
                        request.swltMethodPath.parameters.forEach(function (paramDef) {
                            switch (paramDef.in) {
                            // parse body param
                            case 'body':
                                request.swltParamDict[paramDef.name] =
                                    request.swltParamDict[paramDef.name] ||
                                    request.swltBodyParsed;
                                break;
                            // parse formData param
                            case 'formData':
                                request.swltParamDict[paramDef.name] =
                                    request.swltParamDict[paramDef.name] ||
                                    request.swltBodyParsed[paramDef.name];
                                break;
                            // parse header param
                            case 'header':
                                request.swltParamDict[paramDef.name] =
                                    request.headers[paramDef.name.toLowerCase()];
                                break;
                            // parse query param
                            case 'query':
                                request.swltParamDict[paramDef.name] =
                                    request.urlParsed.query[paramDef.name];
                                break;
                            }
                            // init default param
                            request.swltParamDict[paramDef.name] =
                                request.swltParamDict[paramDef.name] || paramDef.default;
                        });
                        onNext();
                        break;
                    case 3:
                        // normalize params
                        local.swlt.normalizeParamDictSwagger(request
                            .swltParamDict, request.swltMethodPath);
                        // validate params
                        local.swlt.validateByParamDefList({
                            data: request.swltParamDict,
                            key: request.swltPathname,
                            paramDefList: request.swltMethodPath.parameters
                        });
                        onNext();
                        break;
                    default:
                        nextMiddleware(error);
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
        window.swlt = local.swlt;
        break;



    // run node js-env code
    case 'node':
        // export swagger-lite
        module.exports = local.swlt;
        module.exports.__dirname = __dirname;
        // require modules
        local.fs = require('fs');
        local.path = require('path');
        local.swagger_tools = require('swagger-ui-lite/swagger-tools-standalone-min.js');
        local.swagger_ui = require('swagger-ui-lite');
        local.url = require('url');
        local.vm = require('vm');
        // init swaggerJson
        local.swlt.swaggerJson = {
            basePath: local.utility2.envDict.npm_config_mode_api_prefix || '/api/v0',
            definitions: {
                Array: { items: {}, type: 'array' },
                // http://jsonapi.org/format/#errors
                JsonapiError: {
                    properties: {
                        code: { type: 'string' },
                        detail: { type: 'string' },
                        id: { type: 'string' },
                        message: { type: 'string' }
                    }
                },
                // http://jsonapi.org/format/#document-structure-resource-objects
                JsonapiResource: {
                    properties: {
                        id: { type: 'string' }
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
        local.swlt.swaggerJson$$Dummy = {
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
                'http://petstore.swagger.io/v2/swagger.json',
                local.swlt.swaggerJson.basePath + '/swagger.json'
            );
        local.utility2.cacheDict.assets['/assets/swagger-ui.rollup.css'] = local.fs
            .readFileSync(local.swagger_ui.__dirname +
                '/swagger-ui.rollup.css', 'utf8');
        local.utility2.cacheDict.assets['/assets/swagger-ui.rollup.js'] = local.fs
            .readFileSync(local.swagger_ui.__dirname + '/swagger-ui.rollup.js', 'utf8')
            // swagger-hack - disable underscore-min.map
            .replace('//# sourceMappingURL=underscore-min.map', '')
            // swagger-hack - save swaggerJson
            .replace(
                'this.apis = {};',
                'this.apis = {}; this.swaggerJson = JSON.parse(JSON.stringify(response));'
            );
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
        // init api
        local.swlt.apiUpdate({});
        break;
    }
}());
