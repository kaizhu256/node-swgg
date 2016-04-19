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
        switch (local.modeJs) {
        // re-init local from window.local
        case 'browser':
            local = window.local;
            break;
        // re-init local from example.js
        case 'node':
            local = require('utility2').local;
            local._script = local.fs.readFileSync(__dirname + '/README.md', 'utf8')
                // support syntax-highlighting
                .replace((/[\S\s]+?\n.*?example.js\s*?```\w*?\n/), function (match0) {
                    // preserve lineno
                    return match0.replace((/.+/g), '');
                })
                .replace((/\n```[\S\s]+/), '')
                // alias require('$npm_package_name') to require('index.js');
                .replace(
                    "require('" + process.env.npm_package_name + "')",
                    "require('./index.js')"
                );
            // jslint example.js
            local.utility2.jslintAndPrint(local._script, __dirname + '/example.js');
            // cover example.js
            local._script = local.utility2.istanbulInstrumentInPackage(
                local._script,
                __dirname + '/example.js',
                'swagger-lite'
            );
            local.global.assetsExampleJs = local._script;
            // require example.js
            local = local.utility2.requireFromScript(__dirname + '/example.js', local._script);
            break;
        }
    }());



    // run shared js-env code - function
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
                method: 'POST',
                // test 400 param-parse-error handling-behavior
                statusCode: 400,
                url: '/api/v0/_test/paramDefault/aa?paramJson=syntax%20error'
            }, {
                // test 404 general-error handling-behavior
                statusCode: 404,
                url: '/undefined'
            }, {
                // test 404 undefined-api-error-1 handling-behavior
                statusCode: 404,
                url: '/api/v0/_test/errorUndefined'
            }, {
                // test 404 undefined-api-error-2 handling-behavior
                statusCode: 404,
                url: '/api/v0/_test/errorUndefinedApi'
            }, {
                // test 404 undefined-crud-api-error handling-behavior
                statusCode: 404,
                url: '/api/v0/_test/errorUndefinedCrud'
            }].forEach(function (options) {
                onParallel.counter += 1;
                local.utility2.ajax(options, function (error, xhr) {
                    local.utility2.tryCatchOnError(function () {
                        // validate error occurred
                        local.utility2.assert(error, error);
                        // validate statusCode
                        local.utility2.assert(error.statusCode === options.statusCode, error);
                        // validate error is in jsonapi-format
                        if (options.url !== '/undefined') {
                            error = JSON.parse(xhr.responseText);
                            local.utility2.assert(error.errors[0], error);
                        }
                        onParallel();
                    }, onError);
                });
            });
            onParallel();
        };

        local.testCase_crudCountManyByQuery_default = function (options, onError) {
        /*
         * this function will test crudCountManyByQuery's default handling-behavior
         */
            var modeNext, onNext;
            modeNext = 0;
            onNext = function (error, data) {
                local.utility2.tryCatchOnError(function () {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    modeNext += 1;
                    switch (modeNext) {
                    case 1:
                        options = local.utility2.objectSetDefault(options || {}, {
                            crudCountManyByQuery:
                                local.swgg.apiDict['_test crudCountManyByQuery'],
                            operationId: 'undefined.id',
                            keyValue: '00_test_crudCountManyByQuery'
                        });
                        local.swgg.keyUniqueInit(options);
                        // ajax - crudCountManyByQuery
                        options.crudCountManyByQuery({
                            paramDict: { _queryQuery: JSON.stringify(options.queryByKeyUnique) }
                        }, onNext);
                        break;
                    case 2:
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        // validate data
                        local.utility2.assert(data.responseJson.data.length === 1 &&
                            data.responseJson.data[0] === 1, data.responseJson);
                        onNext();
                        break;
                    default:
                        onError(error, data);
                    }
                }, onError);
            };
            onNext();
        };

        local.testCase_crudCreateGetDeleteMany_default = function (options, onError) {
        /*
         * this function will test crudCreateGetDeleteMany's default handling-behavior
         */
            var onParallel;
            onParallel = local.utility2.onParallel(onError);
            onParallel.counter += 1;
            [{
                crudCreateOrReplaceOne: local.swgg.apiDict['pet addPet'],
                crudDeleteOneByKeyUnique: local.swgg.apiDict['pet deletePet'],
                crudGetOneByKeyUnique: local.swgg.apiDict['pet getPetById'],
                data: { id: 10, name: 'name', photoUrls: ['photoUrls'] },
                operationId: 'undefined.petId.id'
            }, {
                crudCreateOrReplaceOne: local.swgg.apiDict['store placeOrder'],
                crudDeleteOneByKeyUnique: local.swgg.apiDict['store deleteOrder'],
                crudGetOneByKeyUnique: local.swgg.apiDict['store getOrderById'],
                data: { id: 10 },
                operationId: 'undefined.orderId.id'
            }, {
                crudCreateOrReplaceOne: local.swgg.apiDict['user createUser'],
                crudDeleteOneByKeyUnique: local.swgg.apiDict['user deleteUser'],
                crudGetOneByKeyUnique: local.swgg.apiDict['user getUserByName'],
                data: { username: '00_test_crudCreateGetDeleteMany' },
                operationId: 'undefined.username'
            }].forEach(function (_) {
                options = _;
                onParallel.counter += 1;
                // test crudCreateGetDeleteOne's default handling-behavior
                local.testCase_crudCreateGetDeleteOne_default(options, onParallel);
            });
            onParallel();
        };

        local.testCase_crudCreateGetDeleteOne_default = function (options, onError) {
        /*
         * this function will test crudCreateGetDeleteOne's default handling-behavior
         */
            var modeNext, onNext;
            modeNext = 0;
            onNext = function (error, data) {
                local.utility2.tryCatchOnError(function () {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    modeNext += 1;
                    switch (modeNext) {
                    case 1:
                        options = local.utility2.objectSetDefault(options || {}, {
                            data: { id: '00_test_crudCreateGetDeleteOne', propRequired: true },
                            operationId: 'undefined.id'
                        });
                        // test crudCreateOrReplaceOne's default handling-behavior
                        local.testCase_crudCreateOrReplaceOne_default(options, onNext);
                        break;
                    case 2:
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        // test crudGetDeleteOneByKeyUnique's default handling-behavior
                        local.testCase_crudGetDeleteOneByKeyUnique_default(options, onNext);
                        break;
                    default:
                        onError(error, data);
                    }
                }, onError);
            };
            onNext();
        };

        local.testCase_crudCreateOrReplaceOne_default = function (options, onError) {
        /*
         * this function will test crudCreateOrReplaceOne's default handling-behavior
         */
            var modeNext, onNext;
            modeNext = 0;
            onNext = function (error, data) {
                local.utility2.tryCatchOnError(function () {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    modeNext += 1;
                    switch (modeNext) {
                    case 1:
                        options = local.utility2.objectSetDefault(options || {}, {
                            crudCreateOrReplaceOne:
                                local.swgg.apiDict['_test crudCreateOrReplaceOne'],
                            data: {
                                // test dataReadonlyRemove handling-behavior
                                createdAt: '1970-01-01T00:00:00.000Z',
                                id: '00_test_crudCreateOrReplaceOne',
                                propRequired: true
                            },
                            operationId: 'undefined.id'
                        });
                        local.swgg.keyUniqueInit(options);
                        // ajax - crudCreateOrReplaceOne
                        options.crudCreateOrReplaceOne({ paramDict: {
                            body: options.data
                        } }, onNext);
                        break;
                    case 2:
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        // validate dataReadonlyRemove
                        local.utility2.assert(data.responseJson.data[0].createdAt >
                            '1970-01-01T00:00:00.000Z', data.responseJson);
                        // test crudGetOneByKeyUnique's default handling-behavior
                        local.testCase_crudGetOneByKeyUnique_default(options, onNext);
                        break;
                    default:
                        onError(error, data);
                    }
                }, onError);
            };
            onNext();
        };

        local.testCase_crudDeleteManyByQuery_default = function (options, onError) {
        /*
         * this function will test crudDeleteManyByQuery's default handling-behavior
         */
            var modeNext, onNext;
            modeNext = 0;
            onNext = function (error, data) {
                local.utility2.tryCatchOnError(function () {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    modeNext += 1;
                    switch (modeNext) {
                    case 1:
                        options = local.utility2.objectSetDefault(options || {}, {
                            crudDeleteManyByQuery:
                                local.swgg.apiDict['_test crudDeleteManyByQuery'],
                            operationId: 'undefined.id',
                            keyValue: '00_test_crudDeleteManyByQuery'
                        });
                        local.swgg.keyUniqueInit(options);
                        // ajax - crudDeleteManyByQuery
                        options.crudDeleteManyByQuery({
                            paramDict: { _queryQuery: JSON.stringify(options.queryByKeyUnique) }
                        }, onNext);
                        break;
                    case 2:
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        // validate data was removed
                        local.utility2.assert(data.responseJson.data.length === 1 &&
                            data.responseJson.data[0] === 1, data.responseJson);
                        onNext();
                        break;
                    default:
                        onError(error, data);
                    }
                }, onError);
            };
            onNext();
        };

        local.testCase_crudDeleteOneByKeyUnique_default = function (options, onError) {
        /*
         * this function will test crudDeleteOneByKeyUnique's default handling-behavior
         */
            var modeNext, onNext;
            modeNext = 0;
            onNext = function (error, data) {
                local.utility2.tryCatchOnError(function () {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    modeNext += 1;
                    switch (modeNext) {
                    case 1:
                        options = local.utility2.objectSetDefault(options || {}, {
                            crudDeleteOneByKeyUnique:
                                local.swgg.apiDict['_test crudDeleteOneByKeyUnique.id'],
                            crudGetOneByKeyUnique:
                                local.swgg.apiDict['_test crudGetOneByKeyUnique.id'],
                            operationId: 'undefined.id',
                            keyValue: '00_test_crudDeleteOneByKeyUnique'
                        });
                        local.swgg.keyUniqueInit(options);
                        // ajax - crudDeleteOneByKeyUnique
                        options.crudDeleteOneByKeyUnique({
                            paramDict: options.queryByKeyUnique
                        }, onNext);
                        break;
                    case 2:
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        // ajax - crudGetOneByKeyUnique
                        options.crudGetOneByKeyUnique({
                            paramDict: options.queryByKeyUnique
                        }, onNext);
                        break;
                    case 3:
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        // validate data was removed
                        local.utility2.assert(data.responseJson.data.length === 1 &&
                            data.responseJson.data[0] === null, data.responseJson);
                        onNext();
                        break;
                    default:
                        onError(error, data);
                    }
                }, onError);
            };
            onNext();
        };

        local.testCase_crudErrorXxx_default = function (options, onError) {
        /*
         * this function will test crudErrorXxx's default handling-behavior
         */
            var onParallel;
            onParallel = local.utility2.onParallel(onError);
            onParallel.counter += 1;
            options = {};
            [
                '_test crudErrorDelete',
                '_test crudErrorGet',
                '_test crudErrorPatch',
                '_test crudErrorPost',
                '_test crudErrorPut'
            ].forEach(function (key) {
                onParallel.counter += 1;
                local.swgg.apiDict[key](options, function (error) {
                    local.utility2.tryCatchOnError(function () {
                        // validate error occurred
                        local.utility2.assert(error, error);
                        onParallel();
                    }, onError);
                });
            });
            onParallel();
        };

        local.testCase_crudExistsOneByKeyUnique_default = function (options, onError) {
        /*
         * this function will test crudExistsOneByKeyUnique's default handling-behavior
         */
            var modeNext, onNext;
            modeNext = 0;
            onNext = function (error, data) {
                local.utility2.tryCatchOnError(function () {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    modeNext += 1;
                    switch (modeNext) {
                    case 1:
                        options = {
                            crudExistsOneByKeyUnique:
                                local.swgg.apiDict['_test crudExistsOneByKeyUnique.id'],
                            operationId: 'undefined.id',
                            keyValue: '00_test_crudExistsOneByKeyUnique'
                        };
                        local.swgg.keyUniqueInit(options);
                        // ajax - crudExistsOneByKeyUnique
                        options.crudExistsOneByKeyUnique({
                            paramDict: options.queryByKeyUnique
                        }, onNext);
                        break;
                    case 2:
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        // validate data exists
                        local.utility2.assert(data.responseJson.data.length === 1 &&
                            data.responseJson.data[0] === true, data);
                        onNext();
                        break;
                    default:
                        onError(error, data);
                    }
                }, onError);
            };
            onNext();
        };

        local.testCase_crudFileGetOneByKeyUnique_default = function (options, onError) {
        /*
         * this function will test crudFileGetOneByKeyUnique's default handling-behavior
         */
            var modeNext, onNext;
            modeNext = 0;
            onNext = function (error, data) {
                local.utility2.tryCatchOnError(function () {
                    modeNext += 1;
                    switch (modeNext) {
                    case 1:
                        options = local.utility2.objectSetDefault(options || {}, {
                            crudFileGetOneByKeyUnique:
                                local.swgg.apiDict['_test crudFileGetOneByKeyUnique.id'],
                            operationId: 'undefined.id',
                            keyValue: '00_test_crudFileGetOneByKeyUnique'
                        });
                        local.swgg.keyUniqueInit(options);
                        // ajax - crudFileGetOneByKeyUnique
                        options.crudFileGetOneByKeyUnique({
                            paramDict: options.queryByKeyUnique
                        }, onNext);
                        break;
                    case 2:
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        // validate Content-Type
                        options.data = data.getResponseHeader('content-type');
                        local.utility2.assert(options.data === 'image/png', options.data);
                        // validate response
                        options.data = local.utility2.bufferToString(data.response, 'base64');
                        local.utility2.assert(options.data ===
                            local.swgg.templateSwaggerLogoSmallBase64, options.data);
                        // test crudFileGetOneByKeyUnique's 404 handling-behavior
                        local.swgg.apiDict['_test crudFileGetOneByKeyUnique.id']({ paramDict: {
                            id: local.utility2.uuidTimeCreate()
                        } }, onNext);
                        break;
                    case 3:
                        // validate error occurred
                        local.utility2.assert(error, error);
                        // validate statusCode
                        local.utility2.assert(data.statusCode === 404, data.statusCode);
                        onNext();
                        break;
                    default:
                        onError(error, data);
                    }
                }, onError);
            };
            onNext();
        };

        local.testCase_crudFileUploadManyByForm_default = function (options, onError) {
        /*
         * this function will test crudFileUploadManyByForm's default handling-behavior
         */
            var modeNext, onNext;
            modeNext = 0;
            onNext = function (error, data) {
                local.utility2.tryCatchOnError(function () {
                    modeNext += 1;
                    switch (modeNext) {
                    case 1:
                        options = {};
                        options.blob = new local.utility2.Blob([local.utility2.bufferCreate(
                            local.swgg.templateSwaggerLogoSmallBase64,
                            'base64'
                        )], { type: 'image/png' });
                        options.blob.name = 'a00.png';
                        // ajax - crudFileUploadManyByForm
                        local.swgg.apiDict['_test crudFileUploadManyByForm.2']({ paramDict: {
                            file1: options.blob,
                            file2: options.blob,
                            file3: options.blob
                        } }, onNext);
                        break;
                    case 2:
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        options.data = data.responseJson.data;
                        // init queryByKeyUnique
                        options.keyValue = options.data[0].id;
                        options.operationId = 'undefined.id';
                        local.swgg.keyUniqueInit(options);
                        // validate data
                        local.utility2.assert(options.data.length === 2, options.data);
                        // test crudFileGetOneByKeyUnique's default handling-behavior
                        local.testCase_crudFileGetOneByKeyUnique_default(options, onNext);
                        break;
                    case 3:
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        // test crudGetDeleteOneByKeyUnique's default handling-behavior
                        local.testCase_crudGetDeleteOneByKeyUnique_default(options, onNext);
                        break;
                    default:
                        onError(error);
                    }
                }, onError);
            };
            onNext();
        };

        local.testCase_crudFileUploadManyByForm_nullCase = function (options, onError) {
        /*
         * this function will test crudFileUploadManyByForm's null-case handling-behavior
         */
            var modeNext, onNext;
            modeNext = 0;
            onNext = function (error, data) {
                local.utility2.tryCatchOnError(function () {
                    modeNext += 1;
                    switch (modeNext) {
                    case 1:
                        options = {};
                        // ajax - crudFileUploadManyByForm
                        local.swgg.apiDict['_test crudFileUploadManyByForm.2'](options, onNext);
                        break;
                    case 2:
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        options.data = data.responseJson.data;
                        // validate data
                        local.utility2.assert(options.data.length === 0, options.data);
                        onNext();
                        break;
                    default:
                        onError(error);
                    }
                }, onError);
            };
            onNext();
        };

        local.testCase_crudGetDeleteOneByKeyUnique_default = function (options, onError) {
        /*
         * this function will test crudGetDeleteOneByKeyUnique's default handling-behavior
         */
            var modeNext, onNext;
            modeNext = 0;
            onNext = function (error, data) {
                local.utility2.tryCatchOnError(function () {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    modeNext += 1;
                    switch (modeNext) {
                    case 1:
                        options = local.utility2.objectSetDefault(options || {}, {
                            keyValue: '00_test_crudGetDeleteOneByKeyUnique'
                        });
                        // test crudGetOneByKeyUnique's default handling-behavior
                        local.testCase_crudGetOneByKeyUnique_default(options, onNext);
                        break;
                    case 2:
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        // test crudDeleteOneByKeyUnique's default handling-behavior
                        local.testCase_crudDeleteOneByKeyUnique_default(options, onNext);
                        break;
                    default:
                        onError(error, data);
                    }
                }, onError);
            };
            onNext();
        };

        local.testCase_crudGetManyByQuery_default = function (options, onError) {
        /*
         * this function will test crudGetManyByQuery's default handling-behavior
         */
            var modeNext, onNext;
            modeNext = 0;
            onNext = function (error, data) {
                local.utility2.tryCatchOnError(function () {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    modeNext += 1;
                    switch (modeNext) {
                    case 1:
                        options = local.utility2.objectSetDefault(options || {}, {
                            crudGetManyByQuery: local.swgg.apiDict['_test crudGetManyByQuery'],
                            operationId: 'undefined.id',
                            keyValue: '00_test_crudGetManyByQuery'
                        });
                        local.swgg.keyUniqueInit(options);
                        // ajax - crudGetManyByQuery
                        options.crudGetManyByQuery({
                            paramDict: { _queryQuery: JSON.stringify(options.queryByKeyUnique) }
                        }, onNext);
                        break;
                    case 2:
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        // validate data
                        local.utility2.assert(data.responseJson.data.length === 1 &&
                            data.responseJson.data[0][options.keyAlias] ===
                            options.keyValue, data.responseJson);
                        onNext();
                        break;
                    default:
                        onError(error, data);
                    }
                }, onError);
            };
            onNext();
        };

        local.testCase_crudGetOneByKeyUnique_default = function (options, onError) {
        /*
         * this function will test crudGetOneByKeyUnique's default handling-behavior
         */
            var modeNext, onNext;
            modeNext = 0;
            onNext = function (error, data) {
                local.utility2.tryCatchOnError(function () {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    modeNext += 1;
                    switch (modeNext) {
                    case 1:
                        options = local.utility2.objectSetDefault(options || {}, {
                            crudGetOneByKeyUnique:
                                local.swgg.apiDict['_test crudGetOneByKeyUnique.id'],
                            operationId: 'undefined.id',
                            keyValue: '00_test_crudGetOneByKeyUnique'
                        });
                        local.swgg.keyUniqueInit(options);
                        // ajax - crudGetOneByKeyUnique
                        options.crudGetOneByKeyUnique({
                            paramDict: options.queryByKeyUnique
                        }, onNext);
                        break;
                    case 2:
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        // validate data
                        local.utility2.assert(data.responseJson.data.length === 1 &&
                            data.responseJson.data[0][options.keyAlias] ===
                            options.keyValue, data.responseJson);
                        onNext();
                        break;
                    default:
                        onError(error, data);
                    }
                }, onError);
            };
            onNext();
        };

        local.testCase_crudGetOneByQuery_default = function (options, onError) {
        /*
         * this function will test crudGetOneByQuery's default handling-behavior
         */
            var modeNext, onNext;
            modeNext = 0;
            onNext = function (error, data) {
                local.utility2.tryCatchOnError(function () {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    modeNext += 1;
                    switch (modeNext) {
                    case 1:
                        options = local.utility2.objectSetDefault(options || {}, {
                            crudGetOneByQuery: local.swgg.apiDict['_test crudGetOneByQuery'],
                            operationId: 'undefined.id',
                            keyValue: '00_test_crudGetOneByQuery'
                        });
                        local.swgg.keyUniqueInit(options);
                        // ajax - crudGetOneByQuery
                        options.crudGetOneByQuery({
                            paramDict: { _queryQuery: JSON.stringify(options.queryByKeyUnique) }
                        }, onNext);
                        break;
                    case 2:
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        // validate data
                        local.utility2.assert(data.responseJson.data.length === 1 &&
                            data.responseJson.data[0][options.keyAlias] ===
                            options.keyValue, data.responseJson);
                        onNext();
                        break;
                    default:
                        onError(error, data);
                    }
                }, onError);
            };
            onNext();
        };

        local.testCase_crudNullXxx_default = function (options, onError) {
        /*
         * this function will test crudNullXxx's default handling-behavior
         */
            var onParallel;
            onParallel = local.utility2.onParallel(onError);
            onParallel.counter += 1;
            options = {};
            [
                '_test crudNullDelete',
                '_test crudNullGet',
                '_test crudNullPatch',
                '_test crudNullPost',
                '_test crudNullPut'
            ].forEach(function (key) {
                onParallel.counter += 1;
                local.swgg.apiDict[key](options, onParallel);
            });
            onParallel();
        };

        local.testCase_nedbReset_default = function (options, onError) {
        /*
         * this function will test nedbReset's default handling-behavior
         */
            options = [
                [local.swgg, {
                    collectionDict: { aa: { loadDatabase : function (onError) {
                        onError();
                    } } },
                    Nedb: { fileReset: function (onError) {
                        onError();
                    } }
                }]
            ];
            local.utility2.testMock(options, function (onError) {
                local.swgg.nedbReset(onError);
            }, onError);
        };

        local.testCase_onErrorJsonapi_default = function (options, onError) {
        /*
         * this function will test onErrorJsonapi's default handling-behavior
         */
            var onParallel;
            onParallel = local.utility2.onParallel(onError);
            onParallel.counter += 1;
            [
                'hello',
                ['hello'],
                { data: ['hello'], meta: { isJsonapiResponse: true } }
            ].forEach(function (_) {
                options = _;
                onParallel.counter += 1;
                local.swgg.apiDict['_test onErrorJsonapi']({ paramDict: {
                    data: JSON.stringify(options)
                } }, function (error, data) {
                    local.utility2.tryCatchOnError(function () {
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        // validate data
                        local.utility2.assert(data.responseJson.data[0] === 'hello', data);
                        onParallel();
                    }, onError);
                });
            });
            onParallel();
        };

        local.testCase_onErrorJsonapi_emptyArray = function (options, onError) {
        /*
         * this function will test onErrorJsonapi's empty-array handling-behavior
         */
            var onParallel;
            onParallel = local.utility2.onParallel(onError);
            onParallel.counter += 1;
            options = { paramDict: { data: '[]' } };
            onParallel.counter += 1;
            local.swgg.apiDict['_test onErrorJsonapi'](options, function (error, data) {
                local.utility2.tryCatchOnError(function () {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    // validate data
                    local.utility2.assert(data.responseJson.data[0] === undefined, data);
                    onParallel();
                }, onError);
            });
            options = { paramDict: { error: '[]' } };
            onParallel.counter += 1;
            local.swgg.apiDict['_test onErrorJsonapi'](options, function (error, data) {
                local.utility2.tryCatchOnError(function () {
                    // validate error occurred
                    local.utility2.assert(error, error);
                    // validate error
                    local.utility2.assert(data.responseJson.errors[0].message ===
                        'null', error);
                    onParallel();
                }, onError);
            });
            onParallel();
        };

        local.testCase_onErrorJsonapi_error = function (options, onError) {
        /*
         * this function will test onErrorJsonapi's error handling-behavior
         */
            var onParallel;
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
                options = { paramDict: { error: JSON.stringify(data) } };
                onParallel.counter += 1;
                local.swgg.apiDict['_test onErrorJsonapi'](options, function (error, data) {
                    local.utility2.tryCatchOnError(function () {
                        // validate error occurred
                        local.utility2.assert(error, error);
                        // validate error
                        local.utility2.assert(data.responseJson.errors[0].message ===
                            'hello', error);
                        onParallel();
                    }, onError);
                });
            });
            onParallel();
        };

        //!! local.testCase_userLoginByPassword_default = function (options, onError) {
        //!! /*
         //!! * this function will test validateByParamDefList's default handling-behavior
         //!! */
            //!! onError();
        //!! };

        local.testCase_validateByParamDefList_default = function (options, onError) {
        /*
         * this function will test validateByParamDefList's default handling-behavior
         */
            // test nop handling-behavior
            local.swgg.validateByParamDefList({ data: {} });
            options = { paramDict: {
                id: '00_test_' + local.utility2.uuidTimeCreate(),
                // test array-csv-param handling-behavior
                paramArrayCsv: 'aa,bb',
                // test array-multi-param handling-behavior
                paramArrayMulti: 'aa',
                // test array-pipes-param handling-behavior
                paramArrayPipes: 'aa|bb',
                // test array-ssv-param handling-behavior
                paramArraySsv: 'aa bb',
                // test array-tsv-param handling-behavior
                paramArrayTsv: 'aa\tbb',
                // test body-param handling-behavior
                paramBody: 'hello body',
                // test enum-param handling-behavior
                paramEnum: 0,
                // test header-param handling-behavior
                paramHeader: 'hello header',
                // test json-param handling-behavior
                paramJson: '"hello json"',
                // test path-param handling-behavior
                paramPath: 'hello path',
                // test required-param handling-behavior
                paramRequired: 'hello required'
            } };
            local.swgg.apiDict['_test paramDefault'](options, function (error, data) {
                local.utility2.tryCatchOnError(function () {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    // validate object
                    options.data =
                        local.utility2.jsonStringifyOrdered(data.responseJson.data[0]);
                    local.utility2.assert(options.data === JSON.stringify({
                        paramArrayCsv: ['aa', 'bb'],
                        paramArrayMulti: ['aa'],
                        paramArrayPipes: ['aa', 'bb'],
                        paramArraySsv: ['aa', 'bb'],
                        paramArrayTsv: ['aa', 'bb'],
                        paramBody: 'hello body',
                        paramEnum: 0,
                        paramHeader: 'hello header',
                        paramJson: '"hello json"',
                        paramPath: 'hello path',
                        paramRequired: 'hello required'
                    }), options);
                    onError();
                }, onError);
            });
        };

        local.testCase_validateByParamDefList_error = function (options, onError) {
        /*
         * this function will test validateByParamDefList's error handling-behavior
         */
            var onParallel;
            onParallel = local.utility2.onParallel(onError);
            onParallel.counter += 1;
            options = { paramPath: 'hello path', paramRequired: 'hello required' };
            [
                { key: 'paramArrayCsv', value: true },
                { key: 'paramArrayMulti', value: true },
                { key: 'paramArrayPipes', value: true },
                { key: 'paramArraySsv', value: true },
                { key: 'paramArrayTsv', value: true },
                { key: 'paramEnum', value: true },
                { key: 'paramHeader', value: true },
                { key: 'paramJson', value: true },
                { key: 'paramOptional', value: true },
                { key: 'paramPath', value: true },
                { key: 'paramRequired', value: true }
            ].forEach(function (element) {
                element.paramDict = local.utility2.jsonCopy(options);
                element.paramDict[element.key] = element.value;
                onParallel.counter += 1;
                local.swgg.apiDict['_test paramDefault'](element, function (error) {
                    local.utility2.tryCatchOnError(function () {
                        // validate error occurred
                        local.utility2.assert(error, element);
                        onParallel();
                    }, onError);
                });
            });
            onParallel();
        };

        local.testCase_validateByParamDefList_formData = function (options, onError) {
        /*
         * this function will test validateByParamDefList's formData handling-behavior
         */
            options = { paramDict: {
                id: '00_test_' + local.utility2.uuidTimeCreate(),
                paramFormData1: 'aa',
                paramFormData2: 'bb'
            } };
            local.swgg.apiDict['_test paramFormData'](options, function (error, data) {
                local.utility2.tryCatchOnError(function () {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    // validate object
                    data = local.utility2.jsonStringifyOrdered(data.responseJson.data[0]);
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
            options = {
                data: { propRequired: true },
                schema: local.swgg.swaggerJson.definitions.TestModelCrud
            };
            [
                { key: 'propArray', value: [null] },
                { key: 'propArray2', value: [null] },
                { key: 'propArraySubdoc', value: [{ propRequired: true }] },
                { key: 'propBoolean', value: true },
                { key: 'propEnum', value: 0 },
                { key: 'propInteger', value: 0 },
                { key: 'propInteger2', value: 0 },
                { key: 'propIntegerInt32', value: 0 },
                { key: 'propIntegerInt64', value: 0 },
                { key: 'propNumber', value: 0.5 },
                { key: 'propNumber2', value: -0.5 },
                { key: 'propNumber3', value: 0.5 },
                { key: 'propNumberDouble', value: 0.5 },
                { key: 'propNumberFloat', value: 0.5 },
                { key: 'propObject', value: { aa: true } },
                { key: 'propObject2', value: { aa: true } },
                { key: 'propObjectSubdoc', value: {} },
                { key: 'propRequired', value: true },
                { key: 'propString', value: 'hello' },
                { key: 'propString2', value: 'hello' },
                { key: 'propStringBinary', value: '\u1234' },
                { key: 'propStringByte', value:
                    local.utility2.stringToBase64(local.utility2.stringAsciiCharset) },
                { key: 'propStringDate', value: '1971-01-01' },
                { key: 'propStringDatetime', value: '1971-01-01T00:00:00Z' },
                { key: 'propStringEmail', value: 'q@q.com' },
                { key: 'propStringJson', value: 'true' },
                { key: 'propUndefined', value: '' },
                { key: 'propUndefined', value: 0 },
                { key: 'propUndefined', value: false },
                { key: 'propUndefined', value: null },
                { key: 'propUndefined', value: true },
                { key: 'propUndefined', value: undefined },
                { key: 'propUndefined', value: {} }
            ].forEach(function (element) {
                element.data = local.utility2.jsonCopy(options.data);
                element.data[element.key] = element.value;
                element.schema = options.schema;
                // test circular-reference handling-behavior
                element.data.propArraySubdoc = element.data.propArraySubdoc || [element.data];
                element.data.propObject = element.data.propObject || element.data;
                element.data.propObjectSubdoc = element.data.propObjectSubdoc || element.data;
                local.swgg.validateBySchema(element);
            });
            onError();
        };

        local.testCase_validateBySchema_error = function (options, onError) {
        /*
         * this function will test validateBySchema's error handling-behavior
         */
            var onParallel;
            onParallel = local.utility2.onParallel(onError);
            onParallel.counter += 1;
            options = {
                data: { propRequired: true },
                schema: local.swgg.swaggerJson.definitions.TestModelCrud
            };
            [
                { data: null },
                { key: 'propArray', value: true },
                { key: 'propArray2', value: [] },
                { key: 'propArray2', value: [null, null] },
                { key: 'propArraySubdoc', value: [{ propRequired: null }] },
                { key: 'propArraySubdoc', value: [ 'non-object' ] },
                { key: 'propArraySubdoc', value: [{ propRequired: null }] },
                { key: 'propBoolean', value: 0 },
                { key: 'propEnum', value: -1 },
                { key: 'propInteger', value: 0.5 },
                { key: 'propInteger', value: Infinity },
                { key: 'propInteger', value: NaN },
                { key: 'propInteger', value: true },
                { key: 'propInteger2', value: -2 },
                { key: 'propInteger2', value: -1 },
                { key: 'propInteger2', value: 1 },
                { key: 'propInteger2', value: 2 },
                { key: 'propIntegerInt32', value: 0.5 },
                { key: 'propIntegerInt64', value: 0.5 },
                { key: 'propNumber', value: Infinity },
                { key: 'propNumber', value: NaN },
                { key: 'propNumber', value: true },
                { key: 'propNumber2', value: -1 },
                { key: 'propNumber3', value: -0.25 },
                { key: 'propNumber2', value: 0 },
                { key: 'propNumber3', value: 0 },
                { key: 'propNumber3', value: 0.25 },
                { key: 'propNumber3', value: 1 },
                { key: 'propNumberDouble', value: true },
                { key: 'propNumberFloat', value: true },
                { key: 'propObject', value: true },
                { key: 'propObject2', value: {} },
                { key: 'propObject2', value: { aa: 1, bb: 2 } },
                { key: 'propObjectSubdoc', value: 'non-object' },
                { key: 'propRequired', value: null },
                { key: 'propRequired', value: undefined },
                { key: 'propString', value: true },
                { key: 'propString2', value: '' },
                { key: 'propString2', value: '!' },
                { key: 'propString2', value: '01234567890123456789' },
                { key: 'propStringByte', value: local.utility2.stringAsciiCharset },
                { key: 'propStringDate', value: 'null' },
                { key: 'propStringDatetime', value: 'null' },
                { key: 'propStringEmail', value: 'null' },
                { key: 'propStringJson', value: 'syntax error' }
            ].forEach(function (element) {
                onParallel.counter += 1;
                local.utility2.tryCatchOnError(function () {
                    if (element.data === undefined) {
                        element.data = local.utility2.jsonCopy(options.data);
                        element.data[element.key] = element.value;
                    }
                    element.schema = options.schema;
                    local.swgg.validateBySchema(element);
                    /* istanbul ignore next */
                    onParallel(new Error(JSON.stringify(element.data)));
                }, function (error) {
                    // validate error occurred
                    local.utility2.assert(error, element);
                    onParallel();
                });
            });
            onParallel();
        };

        local.testCase_validateBySwagger_default = function (options, onError) {
        /*
         * this function will test validateBySwagger's default handling-behavior
         */
            options = {};
            local.utility2.testMock([
                // suppress console.error
                [console, { error: local.utility2.nop }]
            ], function (onError) {
                [null, {}].forEach(function (element) {
                    local.utility2.tryCatchOnError(function () {
                        local.swgg.validateBySwagger(element);
                    }, function (error) {
                        options.data = error;
                    });
                    // validate error occurred
                    local.utility2.assert(options.data, options.data);
                });
                onError();
            }, onError);
        };
    }());
    switch (local.modeJs) {



    // run browser js-env code - function
    case 'browser':
        local.testCase_domElementWiggle_default = function (options, onError) {
        /*
         * this function will test domElementWiggle's default handling-behavior
         */
            options = {};
            options.element = document.querySelector('div');
            local.swgg.domElementWiggle(options.element);
            setTimeout(onError, 1500);
        };

        /* istanbul ignore next */
        local._testCase_ui_default = function (options, onError) {
        /*
         * this function will test the ui's default handling-behavior
         */
            options = {};
            options.onParallel = local.utility2.onParallel(function () {
                setTimeout(function () {
                    local.jQuery('[data-id="_test"].expandResource').click();
                    setTimeout(onError);
                });
            });
            options.onParallel.counter += 1;
            [1, -1].forEach(function (ii) {
                Object.keys(local.global.SwaggerUi.Views).sort(function () {
                    // coverage-hack
                    return Math.random() - 0.5;
                }).sort(function (aa, bb) {
                    return (aa < bb
                        ? -1
                        : 1) * ii;
                }).forEach(function (view) {
                    view = local.global.SwaggerUi.Views[view];
                    Object.keys(view.prototype.events || {}).sort(function (aa, bb) {
                        return (aa < bb
                            ? -1
                            : 1) * ii;
                    }).forEach(function (event) {
                        event = {
                            query: event.split(' ').slice(1).join(' '),
                            key: event,
                            name: event.split(' ')[0],
                            value: view.prototype.events[event]
                        };
                        switch (event.name) {
                        case 'click':
                        case 'mousedown':
                        case 'mouseenter':
                            event.type = 'MouseEvent';
                            break;
                        case 'keyup':
                            event.type = 'KeyboardEvent';
                            break;
                        }
                        if (event.type) {
                            options.onParallel.counter += 1;
                            setTimeout(function () {
                                Array.prototype.slice.call(document.querySelectorAll(
                                    '.swagger-section ' + event.query
                                )).forEach(function (element) {
                                    event.event = document.createEvent(event.type);
                                    event.event.initEvent(event.name, true, true);
                                    element.dispatchEvent(event.event);
                                });
                                options.onParallel();
                            }, options.onParallel.counter * 100);
                        }
                    });
                });
            });
            options.onParallel();
        };
        break;



    // run node js-env code - function
    case 'node':
        local.testCase_build_assets = function (options, onError) {
        /*
         * this function will test build's asset handling-behavior
         */
            var onParallel;
            // jslint-hack
            local.utility2.nop(options);
            onParallel = local.utility2.onParallel(onError);
            onParallel.counter += 1;
            [{
                file: '/index.html',
                url: '/'
            }, {
                file: '/api/v0/swagger.json',
                url: '/api/v0/swagger.json'
            }, {
                file: '/assets.example.js',
                url: '/assets.example.js'
            }, {
                file: '/assets.swgg.admin-ui.html',
                url: '/assets.swgg.admin-ui.html'
            }, {
                file: '/assets.swgg.css',
                url: '/assets.swgg.css'
            }, {
                file: '/assets.swgg.js',
                url: '/assets.swgg.js'
            }, {
                file: '/assets.swgg.lib.admin-ui.js',
                url: '/assets.swgg.lib.admin-ui.js'
            }, {
                file: '/assets.swgg.lib.nedb.js',
                url: '/assets.swgg.lib.nedb.js'
            }, {
                file: '/assets.swgg.lib.swagger-ui.js',
                url: '/assets.swgg.lib.swagger-ui.js'
            }, {
                file: '/assets.test.js',
                url: '/assets.test.js'
            }, {
                file: '/assets.utility2.css',
                url: '/assets.utility2.css'
            }, {
                file: '/assets.utility2.rollup.js',
                url: '/assets.utility2.rollup.js'
            }, {
                file: '/jsonp.swgg.stateInit.js',
                url: '/jsonp.swgg.stateInit.js'
            }, {
                file: '/swagger-ui.html',
                url: '/swagger-ui.html'
            }].forEach(function (options) {
                onParallel.counter += 1;
                local.utility2.ajax(options, function (error, xhr) {
                    // validate no error occurred
                    onParallel.counter += 1;
                    onParallel(error);
                    local.utility2.fsWriteFileWithMkdirp(
                        local.utility2.envDict.npm_config_dir_build + '/app' + options.file,
                        xhr.response,
                        onParallel
                    );
                });
            });
            // copy external dir
            local.fs.readdirSync('external').forEach(function (file) {
                onParallel.counter += 1;
                local.utility2.fsWriteFileWithMkdirp(
                    local.utility2.envDict.npm_config_dir_build + '/app/' + file,
                    local.fs.readFileSync('external/' + file),
                    onParallel
                );
            });
            onParallel();
        };

        local.testCase_testPage_default = function (options, onError) {
        /*
         * this function will test the test-page's default handling-behavior
         */
            options = {
                modeCoverageMerge: true,
                url: local.utility2.serverLocalHost +
                    '/?modeTest=consoleLogResult#!/_test/paramDefault'
            };
            local.utility2.browserTest(options, onError);
        };
        break;
    }



    // run shared js-env code - post-init
    (function () {
        // test null apiDictUpdate update handling-behavior
        local.swgg.apiDictUpdate({});
        // init test api
        local.swgg.apiDictUpdate({
            _tagDict: { _test: { description: 'internal test-api' } },
            definitions: {
                // init onErrorJsonapi schema
                onErrorJsonapi: {
                    _pathPrefix: '_test',
                    properties: {
                        data: { type: 'object' },
                        error: { default: {}, type: 'object' }
                    }
                },
                // init TestModelCrud schema
                TestModelCrud: {
                    // init _pathObjectDefaultList
                    _pathObjectDefaultList: [
                        'crudCountManyByQuery',
                        'crudCreateOrReplaceMany',
                        'crudCreateOrReplaceOne',
                        'crudCreateOrReplaceOneByKeyUnique.id',
                        'crudCreateOrUpdateOne',
                        'crudCreateOrUpdateOneByKeyUnique.id',
                        'crudDeleteManyByQuery',
                        'crudDeleteOneByKeyUnique.id',
                        'crudErrorDelete',
                        'crudErrorGet',
                        'crudErrorPatch',
                        'crudErrorPost',
                        'crudErrorPut',
                        'crudExistsOneByKeyUnique.id',
                        'crudFileGetOneByKeyUnique.id',
                        'crudFileUploadManyByForm.2',
                        'crudGetManyByQuery',
                        'crudGetOneByQuery',
                        'crudGetOneByKeyUnique.id',
                        'crudNullDelete',
                        'crudNullGet',
                        'crudNullPatch',
                        'crudNullPost',
                        'crudNullPut'
                    ],
                    _pathPrefix: '_test',
                    properties: {
                        _id: { readOnly: true, type: 'string' },
                        id: { type: 'string' },
                        createdAt: { format: 'date-time', readOnly: true, type: 'string' },
                        propArray: { items: {}, type: 'array' },
                        propArray2: {
                            items: {},
                            maxItems: 1,
                            minItems: 1,
                            type: 'array',
                            uniqueItems: true
                        },
                        propArraySubdoc: {
                            default: [{ propRequired: true }],
                            items: { $ref: '#/definitions/TestModelCrud' },
                            type: 'array'
                        },
                        propArraySubdocFile: {
                            items: { $ref: '#/definitions/BuiltinFile' },
                            type: 'array',
                            'x-swgg-fileUpload': true
                        },
                        propBoolean: { type: 'boolean' },
                        propEnum: { enum: [0, 1], type: 'integer' },
                        propInteger: { type: 'integer' },
                        propInteger2: {
                            exclusiveMaximum: true,
                            exclusiveMinimum: true,
                            maximum: 2,
                            minimum: -2,
                            multipleOf: 2,
                            type: 'integer'
                        },
                        propIntegerInt32: { format: 'int32', type: 'integer' },
                        propIntegerInt64: { format: 'int64', type: 'integer' },
                        propNumber: { type: 'number' },
                        propNumber2: {
                            exclusiveMaximum: true,
                            exclusiveMinimum: true,
                            maximum: 0,
                            minimum: -1,
                            multipleOf: 0.5,
                            type: 'number'
                        },
                        propNumber3: {
                            exclusiveMaximum: true,
                            exclusiveMinimum: true,
                            maximum: 1,
                            minimum: 0,
                            multipleOf: 0.5,
                            type: 'number'
                        },
                        propNumberDouble: { format: 'double', type: 'number' },
                        propNumberFloat: { format: 'float', type: 'number' },
                        propObject: { default: { aa: true }, type: 'object' },
                        propObject2: { maxProperties: 1, minProperties: 1, type: 'object' },
                        // test null-schema-validation handling-behavior
                        propObjectSubdoc: { $ref: '#/definitions/TestModelNull' },
                        propRequired: { default: true },
                        propString: { type: 'string' },
                        propString2: {
                            maxLength: 10,
                            minLength: 1,
                            pattern: '^\\w*$',
                            type: 'string'
                        },
                        propStringBinary: { format: 'binary', type: 'string' },
                        propStringByte: { format: 'byte', type: 'string' },
                        propStringDate: { format: 'date', type: 'string' },
                        propStringDatetime: { format: 'date-time', type: 'string' },
                        propStringEmail:
                            { default: 'a@a.com', format: 'email', type: 'string' },
                        propStringJson: { default: 'null', format: 'json', type: 'string' },
                        propUndefined: {},
                        propObjectSubdocFile: {
                            $ref: '#/definitions/BuiltinFile',
                            'x-swgg-fileUpload': true
                        },
                        updatedAt: { format: 'date-time', readOnly: true, type: 'string' }
                    },
                    required: ['propRequired'],
                    'x-swgg-inherit': { $ref: '#/definitions/BuiltinFile' }
                },
                // init TestModelNull schema
                TestModelNull: {}
            },
            paths: {
                // test undefined api handling-behavior
                '/_test/errorUndefinedApi': { get: {
                    operationId: 'errorUndefinedApi',
                    tags: ['_test']
                } },
                // test undefined crud-api handling-behavior
                '/_test/errorUndefinedCrud': { get: {
                    _schemaName: 'TestModelCrud',
                    operationId: 'errorUndefinedCrud',
                    summary: 'test undefined crud-api handling-behavior',
                    tags: ['_test']
                } },
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
                        // test array-multi-param handling-behavior
                        collectionFormat: 'multi',
                        description: 'multi-array param',
                        in: 'query',
                        items: { type: 'string' },
                        name: 'paramArrayMulti',
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
                        // test enum-param handling-behavior
                        description: 'enum param',
                        enum: [0, 1],
                        in: 'query',
                        name: 'paramEnum',
                        type: 'integer'
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
            }
        });
        // test redundant http-body-parse-middleware handling-behavior
        local.middleware.middlewareList.push(local.swgg.middlewareBodyParse);
        // init test-middleware
        local.middleware.middlewareList.push(function (request, response, nextMiddleware) {
            switch (request.swgg.pathObject && request.swgg.pathObject.operationId) {
            case 'onErrorJsonapi':
                // test redundant onErrorJsonapi handling-behavior
                local.swgg.onErrorJsonapi(function (error, data) {
                    local.swgg.serverRespondJsonapi(request, response, error, data);
                })(
                    JSON.parse(request.swgg.paramDict.error || 'null'),
                    JSON.parse(request.swgg.paramDict.data || 'null')
                );
                break;
            case 'paramDefault':
            case 'paramFormData':
                // test redundant onErrorJsonapi handling-behavior
                local.swgg.serverRespondJsonapi(
                    request,
                    response,
                    null,
                    request.swgg.paramDict
                );
                break;
            default:
                // serve file
                local.utility2.middlewareFileServer(request, response, nextMiddleware);
            }
        });
        // init serverLocal
        local.utility2.serverLocalUrlTest = function (url) {
            url = local.utility2.urlParse(url).pathname;
            return local.modeJs === 'browser' &&
                url.indexOf('/api/v0/swagger.json') < 0 &&
                (/\/api\/v0\/|\/test\./).test(url);
        };
        // init collectionList-fixtures
        local.utility2.onReady.counter += 1;
        local.swgg.collectionListInit([{
            // test no-drop handling-behavior
            drop: null,
            // test no-id-drop-index handling-behavior
            ensureIndexList: [{ fieldName: 'propInteger' }],
            name: 'TestModelCrud'
        }, {
            collectDocList: local.swgg.collectDocListRandomCreate({
                collectDocList: [{
                    id: '00_test_crudCountManyByQuery',
                    propRequired: true
                }, {
                    id: '00_test_crudDeleteOneByKeyUnique',
                    propRequired: true
                }, {
                    id: '00_test_crudDeleteManyByQuery',
                    propRequired: true
                }, {
                    id: '00_test_crudExistsOneByKeyUnique',
                    propRequired: true
                }, {
                    id: '00_test_crudFileGetOneByKeyUnique',
                    fileBlob: local.swgg.templateSwaggerLogoSmallBase64,
                    fileContentType: 'image/png',
                    propRequired: true
                }, {
                    id: '00_test_crudGetDeleteOneByKeyUnique',
                    propRequired: true
                }, {
                    id: '00_test_crudGetManyByQuery',
                    propRequired: true
                }, {
                    id: '00_test_crudGetOneByKeyUnique',
                    propRequired: true
                }, {
                    id: '00_test_crudGetOneByQuery',
                    propRequired: true
                }],
                // init 100 extra random objects
                length: 100,
                override: function (options) {
                    return {
                        id: '00_test_collectDocListRandomCreate_' + (options.ii + 100)
                    };
                },
                properties: local.swgg.swaggerJson.definitions.TestModelCrud.properties
            }),
            drop: true,
            ensureIndexList: [{ fieldName: 'id', unique: true }],
            name: 'TestModelCrud',
            // test removeIndexList handling-behavior
            removeIndexList: ['undefined']
        }], local.utility2.onReady);
        local.swgg.collectionListInit([{
            // test error handling-behavior
            error: local.utility2.errorDefault
        }], local.utility2.nop);
    }());
    switch (local.modeJs) {



    // run node js-env code - post-init
    case 'node':
        // init dtList
        local.swgg.apiDictUpdate({ 'x-swgg-dtList': [{
            apiDict: {
                crudCreateOne: '_test crudCreateOrReplaceOne',
                'crudDeleteOneByKeyUnique.id': '_test crudDeleteOneByKeyUnique.id',
                crudGetManyByQuery: '_test crudGetManyByQuery',
                'crudUpdateOneByKeyUnique.id': '_test crudCreateOrUpdateOneByKeyUnique.id'
            },
            paginationCountTotal: 'paginationCountTotal',
            schemaName: 'TestModelCrud',
            title: 'test api',
            urlSwaggerJson: 'api/v0/swagger.json'
        }].concat(JSON.parse(local.swgg.templateDtListPetstore)) });
        // init assets
        local.utility2.assetsDict['/'] = local.utility2.templateRender(
            local.utility2.templateIndexHtml,
            {
                envDict: local.utility2.envDict,
                // add extra scripts
                scriptExtra: '<script src="assets.example.js"></script>' +
                    '<script src="assets.test.js"></script>'
            },
            ''
        );
        local.utility2.assetsDict['/assets.swgg.admin-ui.html'] = local.utility2.templateRender(
            local.swgg.templateAssetsSwggAdminUiHtml,
            {
                envDict: local.utility2.envDict,
                // add extra scripts
                scriptExtra: '<script src="assets.example.js"></script>' +
                    '<script src="assets.test.js"></script>'
            },
            ''
        );
        local.utility2.assetsDict['/assets.test.js'] =
            local.utility2.istanbulInstrumentInPackage(
                local.fs.readFileSync(__filename, 'utf8'),
                local.swgg.__dirname + '/test.js',
                'swagger-lite'
            );
        // run validation test
        local.testCase_validateByParamDefList_default(null, local.utility2.onErrorDefault);
        local.testCase_validateByParamDefList_error(null, local.utility2.onErrorDefault);
        local.testCase_validateBySchema_default(null, local.utility2.onErrorDefault);
        local.testCase_validateBySchema_error(null, local.utility2.onErrorDefault);
        local.testCase_validateBySwagger_default(null, local.utility2.onErrorDefault);
        // debug dir
        [
            local.utility2.__dirname,
            local.swgg.Nedb.__dirname,
            __dirname
        ].forEach(function (dir) {
            local.fs.readdirSync(dir).forEach(function (file) {
                file = dir + '/' + file;
                local.utility2.onFileModifiedRestart(file);
                switch (local.path.extname(file)) {
                case '.css':
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
