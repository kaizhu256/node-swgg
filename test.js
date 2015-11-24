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
        switch (local.modeJs) {
        // re-init local from window.local
        case 'browser':
            local = window.local;
            break;
        // re-init local from example.js
        case 'node':
            require('fs').writeFileSync(
                __dirname + '/example.js',
                require('fs').readFileSync(__dirname + '/README.md', 'utf8')
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
                    )
            );
            local = require(__dirname + '/example.js');
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
            // test ajax error handling-behavior
            [{
                url: '/_test/undefined'
            }, {
                url: '/api/v0/_test/errormiddleware'
            }].forEach(function (options) {
                onParallel.counter += 1;
                local.utility2.ajax(options, function (error) {
                    local.utility2.testTryCatch(function () {
                        // validate error occurred
                        local.utility2.assert(error, error);
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
                        // validate error
                        local.utility2.assert(error && error.statusCode === 404, error);
                        // validate error occurred
                        local.utility2.assert(error, error);
                        onParallel();
                    }, onParallel);
                });
            });
            onParallel();
        };

        /* istanbul ignore next */
        local.testCase2_validateByParamDefList_default = function (options, onError) {
            /*
             * this function will test validateByParamDefList's default handling-behavior
             */
            var error;
            // jslint-hack
            local.utility2.nop(options);
            [{
                data: { body: { propRequired: true } },
                key: 'crudCreateOne',
                method: 'post'
            }, {
                data: { query: '{}' },
                key: 'crudCountByQueryOne',
                method: 'get'
            }].forEach(function (options) {
                options.paramDefList = local.swlt.swaggerJson
                    .paths['/_test/' + options.key][options.method]
                    .parameters;
                local.swlt.validateByParamDefList(options);
            });
            // test validateByParamDefList's error handling-behavior
            [{
                data: { body: { propRequired: null } },
                key: 'crudCreateOne',
                method: 'post'
            }, {
                data: { query: 'syntax error' },
                key: 'crudCountByQueryOne',
                method: 'get'
            }].forEach(function (options) {
                try {
                    error = null;
                    options.paramDefList = local.swlt.swaggerJson
                        .paths['/_test/' + options.key][options.method]
                        .parameters;
                    local.swlt.validateByParamDefList(options);
                } catch (errorCaught) {
                    error = errorCaught;
                }
                // validate error occurred
                local.utility2.assert(error, error);
            });
            // test validateByPropertyDef's circular-reference handling-behavior
            local.swlt.validateByPropertyDef({
                data: { propObject: {} },
                propertyDef: { propObject: { type: 'object' } }
            });
            onError();
        };

        local.testCase_validateBySchema_default = function (options, onError) {
            /*
             * this function will test validateBySchema's default handling-behavior
             */
            var optionsCopy;
            options = {
                data: { propRequired: true },
                schema: local.swlt.swaggerJson.definitions.TestCrudModel
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
                { key: 'propObjectSubdoc', value: {} },
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
                local.swlt.validateBySchema({ data: optionsCopy, schema: options.schema });
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
                schema: local.swlt.swaggerJson.definitions.TestCrudModel
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
                    local.swlt.validateBySchema({
                        data: element.data === null
                            ? null
                            : optionsCopy,
                        schema: options.schema
                    });
                } catch (errorCaught) {
                    error = errorCaught;
                }
                // validate error occurred
                local.utility2.assert(error, error);
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
                        local.swlt.validateBySwagger(element);
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
                local.swlt.swaggerJson = local.swlt.api.swaggerJson;
                local.utility2.onReady();
            },
            supportedSubmitMethods: ['delete', 'get', 'patch', 'post', 'put'],
            url: '/api/v0/swagger.json'
        });
        // init api
        window.swaggerUi.load();
        local.swlt.api = window.swaggerUi.api;
        // run test
        local.utility2.testRun(local);
        break;



    // run node js-env code
    case 'node':
        // test null apiUpdate handling-behavior
        local.swlt.apiUpdate({});
        // init test api
        local.swlt.apiUpdate({
            definitions: {
                // init TestCrudModel schema
                TestCrudModel: {
                    // drop collection on init
                    _collectionDrop: true,
                    _collectionName: 'SwltTestCrud',
                    // init default crud-api
                    _crudApi: '_test',
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
                        propStringJson:
                            { default: 'null', format: 'json', type: 'string' },
                        propUndefined: {}
                    },
                    required: ['propRequired'],
                    'x-inheritList': [{ $ref: '#/definitions/JsonapiResource' }]
                },
                // init TestNullModel schema
                TestNullModel: {}
            },
            paths: {
                // test midddleware-error handling-behavior
                '/_test/errorMiddleware': { get: {
                    operationId: 'errorMiddleware',
                    tags: ['_test']
                } }
            },
            _tagDict: { _test: { description: 'internal test-api' } }
        });
        // init test-middleware
        local.middleware.middlewareList.push(function (request, response, nextMiddleware) {
            // jslint-hack
            local.utility2.nop(response);
            switch (request.swltPathname) {
            case 'GET /_test/errorMiddleware':
                nextMiddleware(new Error('dummy error'));
                break;
            default:
                nextMiddleware();
            }
        });
        // run validation test
        //!! local.testCase_validateByParamDefList_default(null, local.utility2.onErrorDefault);
        local.testCase_validateBySchema_default(null, local.utility2.onErrorDefault);
        local.testCase_validateBySwagger_default(null, local.utility2.onErrorDefault);
        // debug dir
        [
            __dirname
        ].forEach(function (dir) {
            local.fs.readdirSync(dir).forEach(function (file) {
                file = dir + '/' + file;
                switch (file) {
                case __dirname + '/example.js':
                    break;
                // if the file is modified, then restart the process
                default:
                    local.utility2.onFileModifiedRestart(file);
                    break;
                }
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
