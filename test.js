/*jslint
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
        // init modeJs
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
        switch (local.modeJs) {
        // re-init local from window.local
        case 'browser':
            local = window.local;
            break;
        // re-init local from example.js
        case 'node':
            local.script = require('fs').readFileSync(__dirname + '/README.md', 'utf8')
                // support syntax-highlighting
                .replace((/[\S\s]+?\n.*?example.js\s*?```\w*?\n/), function (match0) {
                    // preserve lineno
                    return match0.replace((/.+/g), '');
                })
                .replace((/\n```[\S\s]+/), '')
                // disable mock package.json env
                .replace(/(process.env.npm_package_\w+ = )/g, '// $1')
                // alias require('$npm_package_name') to require('index.js');
                .replace(
                    "require('" + process.env.npm_package_name + "')",
                    "require(__dirname + '/index.js')"
                );
            // require example.js
            local = require('utility2')
                .requireFromScript(__dirname + '/example.js', local.script
                    .replace(
                        "local.fs.readFileSync(__dirname + '/example.js', 'utf8')",
                        JSON.stringify(local.script)
                    ));
            break;
        }
    }());



    // run shared js-env code
    (function () {
        // init tests
        local.testCase_ajax_error = function (options, onError) {
            /*
             * this function will test ajax's error handling-behavior
             */
            var onParallel;
            // jslint-hack
            local.utility2.nop(options);
            onParallel = local.utility2.onParallel(onError);
            onParallel.counter += 1;
            [{
                url: '/_test/undefined'
            }, {
                method: 'POST',
                url: '/api/v0/_test/paramDefault/aa?paramJson=syntax%20error'
            }, {
                url: '/api/v0/_test/undefined'
            }].forEach(function (options) {
                onParallel.counter += 1;
                local.utility2.ajax(options, function (error, xhr) {
                    local.utility2.testTryCatch(function () {
                        // validate error occurred
                        local.utility2.assert(error, error);
                        // validate error is in jsonapi-format
                        error = JSON.parse(xhr.responseText);
                        local.utility2.assert(error.errors[0], error);
                        onParallel();
                    }, onParallel);
                });
            });
            onParallel();
        };

        local.testCase_onErrorJsonapi_default = function (options, onError) {
            /*
             * this function will test onErrorJsonapi's default handling-behavior
             */
            var onParallel;
            // jslint-hack
            local.utility2.nop(options);
            onParallel = local.utility2.onParallel(onError);
            onParallel.counter += 1;
            [
                'hello',
                ['hello'],
                [{ data: 'hello' }],
                { data: [{ data: 'hello' }], meta: { isJsonapiResponse: true } }
            ].forEach(function (data) {
                onParallel.counter += 1;
                local.swgg.api._test.onErrorJsonapi({ data: JSON.stringify(data) }, {
                    modeErrorData: true
                }, function (error, data) {
                    local.utility2.testTryCatch(function () {
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        // validate data
                        local.utility2.assert(data.obj.data[0].data === 'hello', data);
                        onParallel();
                    }, onParallel);
                });
            });
            onParallel();
        };

        local.testCase_onErrorJsonapi_emptyArray = function (options, onError) {
            /*
             * this function will test onErrorJsonapi's empty-array handling-behavior
             */
            var onParallel;
            // jslint-hack
            local.utility2.nop(options);
            onParallel = local.utility2.onParallel(onError);
            onParallel.counter += 1;
            onParallel.counter += 1;
            local.swgg.api._test.onErrorJsonapi({ data: '[]' }, {
                modeErrorData: true
            }, function (error, data) {
                local.utility2.testTryCatch(function () {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    // validate data
                    local.utility2.assert(data.obj.data[0].data === undefined, data);
                    onParallel();
                }, onParallel);
            });
            onParallel.counter += 1;
            local.swgg.api._test.onErrorJsonapi({ error: '[]' }, {
                modeErrorData: true
            }, function (error) {
                local.utility2.testTryCatch(function () {
                    // validate error occurred
                    local.utility2.assert(error, error);
                    // validate error
                    local.utility2.assert(error.errors[0].message === undefined, error);
                    onParallel();
                }, onParallel);
            });
            onParallel();
        };

        local.testCase_onErrorJsonapi_error = function (options, onError) {
            /*
             * this function will test onErrorJsonapi's error handling-behavior
             */
            var onParallel;
            // jslint-hack
            local.utility2.nop(options);
            onParallel = local.utility2.onParallel(onError);
            onParallel.counter += 1;
            [
                'hello',
                ['hello'],
                [{ message: 'hello' }],
                {
                    errors: [{ message: 'hello' }],
                    meta: { isJsonapiResponse: true },
                    statusCode: 500
                }
            ].forEach(function (data) {
                onParallel.counter += 1;
                local.swgg.api._test.onErrorJsonapi({ error: JSON.stringify(data) }, {
                    modeErrorData: true
                }, function (error) {
                    local.utility2.testTryCatch(function () {
                        // validate error occurred
                        local.utility2.assert(error, error);
                        // validate error
                        local.utility2.assert(error.errors[0].message === 'hello', error);
                        onParallel();
                    }, onParallel);
                });
            });
            onParallel();
        };

        local.testCase_ajax_validation = function (options, onError) {
            /*
             * this function will test ajax's error handling-behavior
             */
            var onParallel;
            // jslint-hack
            local.utility2.nop(options);
            onParallel = local.utility2.onParallel(onError);
            onParallel.counter += 1;
            // test ajax passed handling-behavior
            [{
                data: JSON.stringify({
                    "category": {"id": 0, "name": ""},
                    "id": 0,
                    "name": "doggie",
                    "photoUrls": ["string"],
                    "status": "available",
                    "tags": [{ "id": 0, "name": "string" }]
                }),
                method: 'POST',
                url: '/api/v0/pet'
            }].forEach(function (options) {
                onParallel.counter += 1;
                local.utility2.ajax(options, function (error) {
                    local.utility2.testTryCatch(function () {
                        // validate error occurred
                        local.utility2.assert(error, error);
                        // validate error
                        local.utility2.assert(error.statusCode === 404, error);
                        onParallel();
                    }, onParallel);
                });
            });
            onParallel();
        };

        local.testCase_validateByParamDefList_default = function (options, onError) {
            /*
             * this function will test validateByParamDefList's default handling-behavior
             */
            // jslint-hack
            local.utility2.nop(options);
            // test nop handling-behavior
            local.swgg.validateByParamDefList({ data: {} });
            local.swgg.api._test.paramDefault({
                id: 'test_' + local.utility2.uuidTimeCreate(),
                // test array-csv-param handling-behavior
                paramArrayCsv: 'aa,bb',
                // test array-pipes-param handling-behavior
                paramArrayPipes: 'aa|bb',
                // test array-ssv-param handling-behavior
                paramArraySsv: 'aa bb',
                // test array-tsv-param handling-behavior
                paramArrayTsv: 'aa\tbb',
                // test body-param handling-behavior
                paramBody: 'hello body',
                // test header-param handling-behavior
                paramHeader: 'hello header',
                // test json-param handling-behavior
                paramJson: '1',
                // test path-param handling-behavior
                paramPath: 'hello path',
                // test required-param handling-behavior
                paramRequired: 'hello required'
            }, { modeErrorData: true }, function (error, data) {
                local.utility2.testTryCatch(function () {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    // validate object
                    data = local.utility2.jsonStringifyOrdered(data.obj.data[0]);
                    local.utility2.assert(data === JSON.stringify({
                        paramArrayCsv: ['aa', 'bb'],
                        paramArrayPipes: ['aa', 'bb'],
                        paramArraySsv: ['aa', 'bb'],
                        paramArrayTsv: ['aa', 'bb'],
                        paramBody: 'hello body',
                        paramHeader: 'hello header',
                        paramJson: '1',
                        paramPath: 'hello path',
                        paramRequired: 'hello required'
                    }), data);
                    onError();
                }, onError);
            });
        };

        local.testCase_validateByParamDefList_formData = function (options, onError) {
            /*
             * this function will test validateByParamDefList's formData handling-behavior
             */
            // jslint-hack
            local.utility2.nop(options);
            local.swgg.api._test.paramFormData({
                id: 'test_' + local.utility2.uuidTimeCreate(),
                paramFormData1: 'aa',
                paramFormData2: 'bb'
            }, { modeErrorData: true }, function (error, data) {
                local.utility2.testTryCatch(function () {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    // validate object
                    data = local.utility2.jsonStringifyOrdered(data.obj.data[0]);
                    local.utility2.assert(data === JSON.stringify({
                        paramFormData1: 'aa',
                        paramFormData2: 'bb'
                    }), data);
                    onError();
                }, onError);
            });
        };

        local.testCase_validateBySchema_default = function (options, onError) {
            /*
             * this function will test validateBySchema's default handling-behavior
             */
            var optionsCopy;
            options = {
                data: { propRequired: true },
                schema: local.swgg.swaggerJson.definitions.TestCrudModel
            };
            [
                { key: 'propArray', value: [null] },
                { key: 'propArraySubdoc', value: [{ propRequired: true }] },
                { key: 'propBoolean', value: true },
                { key: 'propInteger', value: 0 },
                { key: 'propIntegerInt32', value: 0 },
                { key: 'propIntegerInt64', value: 0 },
                { key: 'propNumberFloat', value: 0.5 },
                { key: 'propNumberDouble', value: 0.5 },
                { key: 'propObject', value: {} },
                { key: 'propObjectSubdoc', value: { propRequired: true } },
                { key: 'propString', value: '' },
                { key: 'propStringByte', value: local.modeJs === 'browser'
                    ? local.global.btoa(local.utility2.stringAsciiCharset)
                    : new Buffer(local.utility2.stringAsciiCharset).toString('base64') },
                { key: 'propStringDate', value: '1971-01-01' },
                { key: 'propStringDatetime', value: '1971-01-01T00:00:00Z' },
                { key: 'propStringEmail', value: 'q@q.com' },
                { key: 'propStringJson', value: 'null' },
                { key: 'propUndefined', value: null },
                { key: 'propUndefined', value: undefined },
                { key: 'propUndefined', value: true }
            ].forEach(function (element) {
                optionsCopy = local.utility2.jsonCopy(options.data);
                optionsCopy[element.key] = element.value;
                // test circular-reference handling-behavior
                optionsCopy.propArraySubdoc = optionsCopy.propArraySubdoc || [optionsCopy];
                optionsCopy.propObject = optionsCopy.propObject || optionsCopy;
                optionsCopy.propObjectSubdoc = optionsCopy.propObjectSubdoc || optionsCopy;
                local.swgg.validateBySchema({ data: optionsCopy, schema: options.schema });
            });
            onError();
        };

        local.testCase_validateBySchema_error = function (options, onError) {
            /*
             * this function will test validateBySchema's error handling-behavior
             */
            var error, optionsCopy;
            options = {
                data: { propRequired: true },
                schema: local.swgg.swaggerJson.definitions.TestCrudModel
            };
            [
                { data: null },
                { key: 'propArray', value: true },
                { key: 'propArraySubdoc', value: [{ propRequired: null }] },
                { key: 'propBoolean', value: 0 },
                { key: 'propInteger', value: true },
                { key: 'propInteger', value: Infinity },
                { key: 'propInteger', value: NaN },
                { key: 'propIntegerInt32', value: 0.5 },
                { key: 'propIntegerInt64', value: 0.5 },
                { key: 'propNumber', value: true },
                { key: 'propNumber', value: Infinity },
                { key: 'propNumber', value: NaN },
                { key: 'propNumberFloat', value: true },
                { key: 'propNumberDouble', value: true },
                { key: 'propObject', value: true },
                { key: 'propObjectSubdoc', value: 'non-object' },
                { key: 'propRequired', value: null },
                { key: 'propRequired', value: undefined },
                { key: 'propString', value: true },
                { key: 'propStringByte', value: local.utility2.stringAsciiCharset },
                { key: 'propStringDate', value: 'null' },
                { key: 'propStringDatetime', value: 'null' },
                { key: 'propStringEmail', value: 'null' },
                { key: 'propStringJson', value: 'syntax error' }
            ].forEach(function (element) {
                try {
                    error = null;
                    optionsCopy = local.utility2.jsonCopy(options.data);
                    optionsCopy[element.key] = element.value;
                    local.swgg.validateBySchema({
                        data: element.data === null
                            ? null
                            : optionsCopy,
                        schema: options.schema
                    });
                } catch (errorCaught) {
                    error = errorCaught;
                }
                // validate error occurred
                local.utility2.assert(error, element);
            });
            onError();
        };

        local.testCase_validateBySwagger_default = function (options, onError) {
            /*
             * this function will test validateBySwagger's default handling-behavior
             */
            var error;
            // jslint-hack
            local.utility2.nop(options);
            local.utility2.testMock([
                // suppress console.error
                [console, { error: local.utility2.nop }]
            ], function (onError) {
                [null, {}].forEach(function (element) {
                    try {
                        local.swgg.validateBySwagger(element);
                    } catch (errorCaught) {
                        error = errorCaught;
                    }
                    // validate error occurred
                    local.utility2.assert(error, error);
                });
                onError();
            }, onError);
        };
    }());
    switch (local.modeJs) {



    // run node js-env code
    case 'node':
        local.testCase_testPage_default = function (options, onError) {
            /*
             * this function will test the test-page's default handling-behavior
             */
            // jslint-hack
            local.utility2.nop(options);
            local.utility2.browserTest({
                modeCoverageMerge: true,
                url: 'http://localhost:' + local.utility2.envDict.PORT +
                    '?modeTest=consoleLogResult'
            }, onError);
        };
        break;
    }
    switch (local.modeJs) {



    // run browser js-env code
    case 'browser':
        // init swaggerUi
        local.utility2.onReady.counter += 1;
        window.swaggerUi = new window.SwaggerUi({
            dom_id: "swagger-ui-container",
            onComplete: function () {
                local.swgg.swaggerJson = local.swgg.api.swaggerJson;
                local.utility2.onReady();
            },
            supportedSubmitMethods: ['delete', 'get', 'patch', 'post', 'put'],
            url: '/api/v0/swagger.json'
        });
        // init api
        window.swaggerUi.load();
        local.swgg.api = window.swaggerUi.api;
        // run test
        local.utility2.testRun(local);
        break;



    // run node js-env code
    case 'node':
        // test null apiUpdate handling-behavior
        local.swgg.apiUpdate({});
        // init test api
        local.swgg.apiUpdate({
            definitions: {
                // init onErrorJsonapi schema
                onErrorJsonapi: {
                    _pathPrefix: '_test',
                    properties: {
                        data: { type: 'object' },
                        error: { default: {}, type: 'object' }
                    }
                },
                // init TestCrudModel schema
                TestCrudModel: {
                    // init _pathObjectDefaultList
                    _pathObjectDefaultList: [
                        'crudCountManyByQuery',
                        'crudCreateOne',
                        'crudCreateOrReplaceOne',
                        'crudDeleteManyByQuery',
                        'crudDeleteOneByKeyUnique.id',
                        'crudExistsOneByKeyUnique.id',
                        'crudGetManyByQuery',
                        'crudGetOneByQuery',
                        'crudGetOneByKeyUnique.id',
                        'crudUpdateOneByKeyUnique.id',
                        'crudUpsertOneByKeyUnique.id'
                    ],
                    _pathPrefix: '_test',
                    properties: {
                        propArray: { items: {}, type: 'array' },
                        propArraySubdoc: {
                            default: [{ propRequired: true }],
                            items: { $ref: '#/definitions/TestCrudModel' },
                            type: 'array'
                        },
                        propBoolean: { type: 'boolean' },
                        propInteger: { type: 'integer' },
                        propIntegerInt32: { format: 'int32', type: 'integer' },
                        propIntegerInt64: { format: 'int64', type: 'integer' },
                        propNumber: { type: 'number' },
                        propNumberDouble: { format: 'double', type: 'number' },
                        propNumberFloat: { format: 'float', type: 'number' },
                        propObject: { type: 'object' },
                        propObjectSubdoc: { $ref: '#/definitions/TestNullModel' },
                        propRequired: { default: true },
                        propString: { type: 'string' },
                        propStringByte: { format: 'byte', type: 'string' },
                        propStringDate: { format: 'date', type: 'string' },
                        propStringDatetime: { format: 'date-time', type: 'string' },
                        propStringEmail:
                            { default: 'a@a.com', format: 'email', type: 'string' },
                        propStringJson: { default: 'null', format: 'json', type: 'string' },
                        propUndefined: {}
                    },
                    required: ['propRequired']
                },
                // init TestNullModel schema
                TestNullModel: {}
            },
            paths: {
                // test onErrorJsonapi handling-behavior
                '/_test/onErrorJsonapi': { get: {
                    operationId: 'onErrorJsonapi',
                    parameters: [{
                        description: 'data param',
                        format: 'json',
                        in: 'query',
                        name: 'data',
                        type: 'string'
                    }, {
                        description: 'error param',
                        format: 'json',
                        in: 'query',
                        name: 'error',
                        type: 'string'
                    }],
                    summary: 'test onErrorJsonapi handling-behavior',
                    tags: ['_test']
                } },
                // test default-param handling-behavior
                '/_test/paramDefault/{paramPath}': { post: {
                    operationId: 'paramDefault',
                    parameters: [{
                        // test array-csv-param handling-behavior
                        collectionFormat: 'csv',
                        description: 'csv-array param',
                        in: 'query',
                        items: { type: 'string' },
                        name: 'paramArrayCsv',
                        type: 'array'
                    }, {
                        // test array-pipes-param handling-behavior
                        collectionFormat: 'pipes',
                        description: 'pipes-array param',
                        in: 'query',
                        items: { type: 'string' },
                        name: 'paramArrayPipes',
                        type: 'array'
                    }, {
                        // test array-ssv-param handling-behavior
                        collectionFormat: 'ssv',
                        description: 'ssv-array param',
                        in: 'query',
                        items: { type: 'string' },
                        name: 'paramArraySsv',
                        type: 'array'
                    }, {
                        // test array-tsv-param handling-behavior
                        collectionFormat: 'tsv',
                        description: 'tsv-array param',
                        in: 'query',
                        items: { type: 'string' },
                        name: 'paramArrayTsv',
                        type: 'array'
                    }, {
                        // test body-param handling-behavior
                        description: 'body',
                        in: 'body',
                        name: 'paramBody',
                        schema: { format: 'binary', type: 'string' }
                    }, {
                        // test header-param handling-behavior
                        description: 'header param',
                        in: 'header',
                        name: 'paramHeader',
                        type: 'string'
                    }, {
                        // test json-param handling-behavior
                        description: 'json param',
                        format: 'json',
                        in: 'query',
                        name: 'paramJson',
                        type: 'string'
                    }, {
                        // test optional-param handling-behavior
                        description: 'optional param',
                        in: 'query',
                        name: 'paramOptional',
                        type: 'string'
                    }, {
                        // test path-param handling-behavior
                        description: 'path param',
                        in: 'path',
                        name: 'paramPath',
                        required: true,
                        type: 'string'
                    }, {
                        // test required-param handling-behavior
                        description: 'required param',
                        in: 'query',
                        name: 'paramRequired',
                        required: true,
                        type: 'string'
                    }],
                    summary: 'test default-param handling-behavior',
                    tags: ['_test']
                } },
                // test form-data-param handling-behavior
                '/_test/paramFormData': { post: {
                    operationId: 'paramFormData',
                    parameters: [{
                        description: 'form-data param 1',
                        in: 'formData',
                        name: 'paramFormData1',
                        required: true,
                        type: 'string'
                    }, {
                        description: 'form-data param 2',
                        in: 'formData',
                        name: 'paramFormData2',
                        required: true,
                        type: 'string'
                    }],
                    summary: 'test form-data-param handling-behavior',
                    tags: ['_test']
                } }
            },
            _tagDict: { _test: { description: 'internal test-api' } }
        });
        // test redundant http-body-parse-middleware handling-behavior
        local.middleware.middlewareList.push(local.swgg.middlewareBodyParse);
        // init test-middleware
        local.middleware.middlewareList.push(function (request, response, nextMiddleware) {
            local.request = request;
            local.response = response;
            switch (request.swggPathObject && request.swggPathObject.operationId) {
            case 'onErrorJsonapi':
                // test redundant onErrorJsonapi handling-behavior
                local.swgg.onErrorJsonapi(function (error, data) {
                    local.swgg.serverRespondJsonapi(request, response, error, data);
                })(
                    JSON.parse(request.swggParamDict.error || 'null'),
                    JSON.parse(request.swggParamDict.data || 'null')
                );
                break;
            case 'paramDefault':
            case 'paramFormData':
                // test redundant onErrorJsonapi handling-behavior
                local.swgg.serverRespondJsonapi(request, response, null, request.swggParamDict);
                break;
            default:
                nextMiddleware();
            }
        });
        // run validation test
        local.testCase_validateByParamDefList_default(null, local.utility2.onErrorDefault);
        local.testCase_validateBySchema_default(null, local.utility2.onErrorDefault);
        local.testCase_validateBySwagger_default(null, local.utility2.onErrorDefault);
        // debug dir
        [
            __dirname
        ].forEach(function (dir) {
            local.fs.readdirSync(dir).forEach(function (file) {
                file = dir + '/' + file;
                local.utility2.onFileModifiedRestart(file);
                switch (local.path.extname(file)) {
                case '.js':
                case '.json':
                    // jslint file
                    local.utility2.jslintAndPrint(local.fs.readFileSync(file, 'utf8'), file);
                    break;
                }
            });
        });
        // init repl debugger
        local.utility2.replStart();
        break;
    }
}());
