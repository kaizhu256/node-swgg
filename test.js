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
        // init Error.stackTraceLimit
        Error.stackTraceLimit = Infinity;
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
        switch (local.modeJs) {
        // re-init local from window.local
        case 'browser':
            local = window.local;
            break;
        // re-init local from example.js
        case 'node':
            /* istanbul ignore next */
            if (module.isRollup) {
                local = module;
                break;
            }
            local = require('utility2').requireExampleJsFromReadme({
                __dirname: __dirname
            }).exports;
            local.swgg = require('./index.js');
            break;
        }
        // init templates
/* jslint-ignore-begin */
local.utility2.assetsDict['/assets.app.begin.js'] = '\
/*\n\
app.js\n\
\n\
this standalone script will run a virtual swagger-ui server with persistent storage\n\
in the browser, that your webapp can use (in-place of a real backend)\n\
\n\
instruction\n\
    1. save this script as app.js\n\
    2. run the shell command:\n\
        $ PORT=8081 node app.js\n\
    3. open a browser to http://localhost:8081\n\
    4. interact with the swagger-ui server\n\
*/\n\
';
/* jslint-ignore-end */
    }());



    // run shared js-env code - function
    (function () {
        local.crudOptionsSetDefault = function (options, defaults) {
        /*
         * this function will set default-values for options
         */
            options = local.utility2.objectSetDefault(options || {}, defaults);
            switch (options._tags0) {
            case 'pet':
                local.utility2.objectSetDefault(options, {
                    crudCreateOrReplaceOneByKeyUnique: local.swgg.apiDict['pet addPet'],
                    crudDeleteOneByKeyUnique: local.swgg.apiDict['pet deletePet'],
                    crudGetOneByKeyUnique: local.swgg.apiDict['pet getPetById'],
                    crudUpdateOneByKeyUnique: local.swgg.apiDict['pet updatePetWithForm'],
                    operationId: 'undefined.petId.id'
                });
                break;
            case 'store':
                local.utility2.objectSetDefault(options, {
                    crudCreateOrReplaceOneByKeyUnique: local.swgg.apiDict['store placeOrder'],
                    crudDeleteOneByKeyUnique: local.swgg.apiDict['store deleteOrder'],
                    crudGetOneByKeyUnique: local.swgg.apiDict['store getOrderById'],
                    crudUpdateOneByKeyUnique: local.swgg.apiDict[
                        'store crudUpdateOneByKeyUnique.id.id'
                    ],
                    operationId: 'undefined.orderId.id'
                });
                break;
            case 'user':
                local.utility2.objectSetDefault(options, {
                    crudCreateOrReplaceOneByKeyUnique: local.swgg.apiDict['user createUser'],
                    crudDeleteOneByKeyUnique: local.swgg.apiDict['user deleteUser'],
                    crudGetOneByKeyUnique: local.swgg.apiDict['user getUserByName'],
                    crudUpdateOneByKeyUnique: local.swgg.apiDict['user updateUser'],
                    operationId: 'undefined.username.username'
                });
                break;
            default:
                Object.keys(local.swgg.apiDict).forEach(function (key) {
                    key.replace((/^_test (\w+)/), function (match0, match1) {
                        // jslint-hack - nop
                        local.utility2.nop(match0);
                        options[match1] = options[match1] || local.swgg.apiDict[key];
                    });
                });
                local.utility2.objectSetDefault(options, {
                    operationId: 'undefined.id.id'
                });
            }
            local.swgg.keyUniqueInit(options);
            return options;
        };

        // init tests
        local.testCase_ajax_error = function (options, onError) {
        /*
         * this function will test ajax's error handling-behavior
         */
            var onParallel;
            onParallel = local.utility2.onParallel(onError);
            onParallel.counter += 1;
            options = [{
                method: 'POST',
                // test 400 param-parse-error handling-behavior
                statusCode: 400,
                url: '/api/v0/_test/paramDefault/aa?paramJson=syntax%20error'
            }, {
                // test 404 undefined-api-error-1 handling-behavior
                statusCode: 404,
                url: '/api/v0/_test/errorUndefined'
            }, {
                // test 404 undefined-api-error-2 handling-behavior
                statusCode: 404,
                url: '/api/v0/_test/errorUndefinedApi'
            }, {
                // test 404 undefined-map-file handling-behavior
                statusCode: 404,
                url: '/api/v0/_test/undefined.map'
            }];
            options.forEach(function (options) {
                onParallel.counter += 1;
                local.utility2.ajax(options, function (error, xhr) {
                    local.utility2.tryCatchOnError(function () {
                        // validate error occurred
                        local.utility2.assert(error, error);
                        // validate statusCode
                        local.utility2.assertJsonEqual(
                            error.statusCode,
                            options.statusCode
                        );
                        // validate error is in jsonapi-format
                        if (options.url !== '/api/v0/_test/undefined.map') {
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
                        options = local.crudOptionsSetDefault(options, {
                            keyValue: '00_test_crudCountManyByQuery'
                        });
                        // ajax - crudCountManyByQuery
                        options.crudCountManyByQuery._ajax({
                            paramDict: { _queryWhere: JSON.stringify(options.queryByKeyUnique) }
                        }, onNext);
                        break;
                    case 2:
                        // validate data
                        local.utility2.assertJsonEqual(data.responseJson.data.length, 1);
                        local.utility2.assert(data.responseJson.data[0] ===
                            1, data.responseJson);
                        onNext();
                        break;
                    default:
                        onError(error, data);
                    }
                }, onError);
            };
            onNext();
        };

        local.testCase_crudCreateReplaceUpdateDeleteMany_default = function (options, onError) {
        /*
         * this function will test crudCreateReplaceUpdateDeleteMany's default handling-behavior
         */
            var onParallel;
            onParallel = local.utility2.onParallel(onError);
            onParallel.counter += 1;
            [{
                _tags0: '_test',
                data: {}
            }, {
                _tags0: 'pet',
                data: { name: 'name', photoUrls: ['photoUrls'] },
                dataValidateReplace: { name: 'name', status: 'available' },
                dataValidateUpdate1: { name: 'name', status: 'available' },
                dataValidateUpdate2: { status: 'pending' }
            }, {
                _tags0: 'store',
                data: { id: 10 },
                dataValidateReplace: { petId: 10, status: 'placed' },
                dataValidateUpdate1: { petId: 10, status: 'placed' },
                dataValidateUpdate2: { status: 'approved' }
            }, {
                _tags0: 'user',
                data: { username: '00_test_crudCreateReplaceUpdateDeleteMany' },
                dataValidateReplace: { firstName: 'firstName', userStatus: 1 },
                dataValidateUpdate1: { firstName: 'firstName', userStatus: 1 },
                dataValidateUpdate2: { userStatus: 2 }
            }].forEach(function (_) {
                options = _;
                onParallel.counter += 1;
                // test crudCreateReplaceUpdateDeleteOne's default handling-behavior
                local.testCase_crudCreateReplaceUpdateDeleteOne_default(options, onParallel);
            });
            onParallel();
        };

        local.testCase_crudCreateReplaceUpdateDeleteOne_default = function (options, onError) {
        /*
         * this function will test crudCreateReplaceUpdateDeleteOne's default handling-behavior
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
                        options = local.crudOptionsSetDefault(options, {
                            data: {}
                        });
                        // test crudCreateOrReplaceOneByKeyUnique's create handling-behavior
                        local.testCase_crudCreateOrReplaceOneByKeyUnique_default(
                            options,
                            onNext
                        );
                        break;
                    case 2:
                        // test crudCreateOrReplaceOneByKeyUnique's replace handling-behavior
                        local.testCase_crudCreateOrReplaceOneByKeyUnique_default(
                            options,
                            onNext
                        );
                        break;
                    case 3:
                        // test crudUpdateOneByKeyUnique's default handling-behavior
                        local.testCase_crudUpdateOneByKeyUnique_default(
                            options,
                            onNext
                        );
                        break;
                    case 4:
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

        local.testCase_crudCreateOrReplaceMany_default = function (options, onError) {
        /*
         * this function will test crudCreateOrReplaceMany's default handling-behavior
         */
            var modeNext, onNext, onParallel;
            modeNext = 0;
            onNext = function (error, data) {
                local.utility2.tryCatchOnError(function () {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    modeNext += 1;
                    switch (modeNext) {
                    case 1:
                        options = local.crudOptionsSetDefault(options, {
                            data: [{
                                id: '00_test_crudCreateOrReplaceMany_01',
                                propRequired: true
                            }, {
                                id: '00_test_crudCreateOrReplaceMany_02',
                                propRequired: true
                            }]
                        });
                        // ajax - crudCreateOrReplaceMany
                        options.crudCreateOrReplaceMany._ajax({ paramDict: {
                            body: options.data
                        } }, onNext);
                        break;
                    case 2:
                        onParallel = local.utility2.onParallel(onNext);
                        onParallel.counter += 1;
                        options.data.forEach(function (element) {
                            onParallel.counter += 1;
                            // test crudGetOneByKeyUnique's default handling-behavior
                            local.testCase_crudGetOneByKeyUnique_default({
                                keyValue: element.id
                            }, onParallel);
                        });
                        onParallel();
                        break;
                    default:
                        onError(error, data);
                    }
                }, onError);
            };
            onNext();
        };

        local.testCase_crudCreateOrReplaceOneByKeyUnique_default = function (options, onError) {
        /*
         * this function will test crudCreateOrReplaceOneByKeyUnique's default handling-behavior
         */
            var modeNext, onNext, paramDict;
            modeNext = 0;
            onNext = function (error, data) {
                local.utility2.tryCatchOnError(function () {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    modeNext += 1;
                    switch (modeNext) {
                    case 1:
                        options = local.crudOptionsSetDefault(options, {
                            data: {
                                // test dataReadonlyRemove handling-behavior
                                createdAt: '1970-01-01T00:00:00.000Z',
                                updatedAt: '1970-01-01T00:00:00.000Z',
                                id: '00_test_crudCreateOrReplaceOneByKeyUnique'
                            },
                            dataValidateReplace: { propRequired: true }
                        });
                        // init paramDict
                        paramDict = {};
                        paramDict.body = local.utility2.objectSetOverride(
                            local.utility2.jsonCopy(options.data),
                            options.dataValidateReplace
                        );
                        // ajax - crudCreateOrReplaceOneByKeyUnique
                        options.crudCreateOrReplaceOneByKeyUnique._ajax({
                            paramDict: paramDict
                        }, onNext);
                        break;
                    case 2:
                        // init id
                        options.data.id = data.responseJson.data[0].id;
                        // validate time createdAt
                        local.utility2.assert(data.responseJson.data[0].createdAt >
                            '1970-01-01T00:00:00.000Z', data.responseJson);
                        local.utility2.assert(data.responseJson.data[0].createdAt <
                            new Date().toISOString(), data.responseJson);
                        // validate time updatedAt
                        local.utility2.assert(data.responseJson.data[0].updatedAt >
                            '1970-01-01T00:00:00.000Z', data.responseJson);
                        local.utility2.assert(data.responseJson.data[0].updatedAt <
                            new Date().toISOString(), data.responseJson);
                        // test crudGetOneByKeyUnique's default handling-behavior
                        options.dataValidate = options.dataValidateReplace;
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
                        options = local.crudOptionsSetDefault(options, {
                            keyValue: '00_test_crudDeleteManyByQuery'
                        });
                        // ajax - crudDeleteManyByQuery
                        options.crudDeleteManyByQuery._ajax({
                            paramDict: { _queryWhere: JSON.stringify(options.queryByKeyUnique) }
                        }, onNext);
                        break;
                    case 2:
                        // validate data was removed
                        local.utility2.assertJsonEqual(data.responseJson.data.length, 1);
                        local.utility2.assertJsonEqual(data.responseJson.data[0], 1);
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
                        options = local.crudOptionsSetDefault(options, {
                            keyValue: '00_test_crudDeleteOneByKeyUnique'
                        });
                        // ajax - crudDeleteOneByKeyUnique
                        options.crudDeleteOneByKeyUnique._ajax({
                            paramDict: options.queryByKeyUnique
                        }, onNext);
                        break;
                    case 2:
                        // ajax - crudGetOneByKeyUnique
                        options.crudGetOneByKeyUnique._ajax({
                            paramDict: options.queryByKeyUnique
                        }, onNext);
                        break;
                    case 3:
                        // validate data was removed
                        local.utility2.assertJsonEqual(data.responseJson.data.length, 1);
                        local.utility2.assert(data.responseJson.data[0] ===
                            null, data.responseJson);
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
            [
                '_test crudErrorDelete',
                '_test crudErrorGet',
                '_test crudErrorHead',
                '_test crudErrorLogin',
                '_test crudErrorOptions',
                '_test crudErrorPatch',
                '_test crudErrorPre',
                '_test crudErrorPost',
                '_test crudErrorPut'
            ].forEach(function (key) {
                onParallel.counter += 1;
                options = {};
                local.swgg.apiDict[key]._ajax(options, function (error, data) {
                    local.utility2.tryCatchOnError(function () {
                        // validate error occurred
                        local.utility2.assert(error, error);
                        // validate statusCode
                        local.utility2.assertJsonEqual(data.statusCode, 500);
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
                        options = local.crudOptionsSetDefault(options, {
                            keyValue: '00_test_crudExistsOneByKeyUnique'
                        });
                        // ajax - crudExistsOneByKeyUnique
                        options.crudExistsOneByKeyUnique._ajax({
                            paramDict: options.queryByKeyUnique
                        }, onNext);
                        break;
                    case 2:
                        // validate data exists
                        local.utility2.assertJsonEqual(data.responseJson.data.length, 1);
                        local.utility2.assertJsonEqual(
                            data.responseJson.data[0],
                            true
                        );
                        onNext();
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
                        options = local.crudOptionsSetDefault(options, {
                            keyValue: '00_test_crudGetManyByQuery'
                        });
                        // ajax - crudGetManyByQuery
                        options.crudGetManyByQuery._ajax({
                            paramDict: { _queryWhere: JSON.stringify(options.queryByKeyUnique) }
                        }, onNext);
                        break;
                    case 2:
                        // validate data
                        local.utility2.assertJsonEqual(data.responseJson.data.length, 1);
                        local.utility2.assert(data.responseJson.data[0][options.keyAlias] ===
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
                        options = local.crudOptionsSetDefault(options, {
                            dataValidate: {},
                            keyValue: '00_test_crudGetOneByKeyUnique'
                        });
                        // ajax - crudGetOneByKeyUnique
                        options.crudGetOneByKeyUnique._ajax({
                            paramDict: options.queryByKeyUnique
                        }, onNext);
                        break;
                    case 2:
                        // validate data
                        local.utility2.assertJsonEqual(data.responseJson.data.length, 1);
                        local.utility2.assert(data.responseJson.data[0][options.keyAlias] ===
                            options.keyValue, data.responseJson);
                        // validate dataValidate
                        Object.keys(options.dataValidate).forEach(function (key) {
                            local.utility2.assert(
                                data.responseJson.data[0][key] === options.dataValidate[key],
                                [key, data.responseJson.data[0][key], options.dataValidate[key]]
                            );
                        });
                        // cleanup dataValidate
                        options.dataValidate = {};
                        onNext(null, data);
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
                        options = local.crudOptionsSetDefault(options, {
                            keyValue: '00_test_crudGetOneByQuery'
                        });
                        // ajax - crudGetOneByQuery
                        options.crudGetOneByQuery._ajax({
                            paramDict: { _queryWhere: JSON.stringify(options.queryByKeyUnique) }
                        }, onNext);
                        break;
                    case 2:
                        // validate data
                        local.utility2.assertJsonEqual(data.responseJson.data.length, 1);
                        local.utility2.assert(data.responseJson.data[0][options.keyAlias] ===
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
                '_test crudNullHead',
                '_test crudNullOptions',
                '_test crudNullPatch',
                '_test crudNullPost',
                '_test crudNullPut'
            ].forEach(function (key) {
                onParallel.counter += 1;
                local.swgg.apiDict[key]._ajax(options, onParallel);
            });
            onParallel();
        };

        local.testCase_crudUpdateOneByKeyUnique_default = function (options, onError) {
        /*
         * this function will test crudUpdateOneByKeyUnique's default handling-behavior
         */
            var modeNext, onNext, paramDict;
            modeNext = 0;
            onNext = function (error, data) {
                local.utility2.tryCatchOnError(function () {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    modeNext += 1;
                    switch (modeNext) {
                    case 1:
                        options = local.crudOptionsSetDefault(options, {
                            data: { id: '00_test_crudUpdateOneByKeyUnique' },
                            dataValidateUpdate1: { propRequired: true },
                            dataValidateUpdate2: { propRequired: false }
                        });
                        // test crudGetOneByKeyUnique's default handling-behavior
                        options.dataValidate = options.dataValidateUpdate1;
                        local.testCase_crudGetOneByKeyUnique_default(options, onNext);
                        break;
                    case 2:
                        options.createdAt = data.responseJson.data[0].createdAt;
                        options.updatedAt = data.responseJson.data[0].updatedAt;
                        // init paramDict
                        paramDict = local.utility2.jsonCopy(options.queryByKeyUnique);
                        paramDict.body = local.utility2.objectSetOverride(
                            local.utility2.jsonCopy(options.data),
                            options.dataValidateUpdate2
                        );
                        // test application/x-www-form-urlencoded's handling-behavior
                        local.utility2.objectSetOverride(paramDict, paramDict.body);
                        // ajax - crudUpdateOneByKeyUnique
                        options.crudUpdateOneByKeyUnique._ajax({
                            paramDict: paramDict
                        }, onNext);
                        break;
                    case 3:
                        // validate time createdAt
                        local.utility2.assert(data.responseJson.data[0].createdAt ===
                            options.createdAt, data.responseJson);
                        local.utility2.assert(data.responseJson.data[0].createdAt <
                            new Date().toISOString(), data.responseJson);
                        // validate time updatedAt
                        local.utility2.assert(data.responseJson.data[0].updatedAt >
                            options.updatedAt, data.responseJson);
                        local.utility2.assert(data.responseJson.data[0].updatedAt <
                            new Date().toISOString(), data.responseJson);
                        // test crudGetOneByKeyUnique's default handling-behavior
                        options.dataValidate = local.utility2.objectSetOverride(
                            local.utility2.jsonCopy(options.dataValidateUpdate1),
                            options.dataValidateUpdate2
                        );
                        local.testCase_crudGetOneByKeyUnique_default(options, onNext);
                        break;
                    default:
                        onError(error, data);
                    }
                }, onError);
            };
            onNext();
        };

        local.testCase_fileGetOneByKeyUnique_default = function (options, onError) {
        /*
         * this function will test fileGetOneByKeyUnique's default handling-behavior
         */
            var modeNext, onNext;
            modeNext = 0;
            onNext = function (error, data) {
                local.utility2.tryCatchOnError(function () {
                    modeNext += 1;
                    switch (modeNext) {
                    case 1:
                        options = local.crudOptionsSetDefault(options, {
                            keyValue: '00_test_fileGetOneByKeyUnique'
                        });
                        // ajax - fileGetOneByKeyUnique
                        local.swgg.apiDict['file fileGetOneByKeyUnique.id.id']._ajax({
                            paramDict: options.queryByKeyUnique
                        }, onNext);
                        break;
                    case 2:
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        // validate Content-Type
                        options.data = data.getResponseHeader('content-type');
                        local.utility2.assertJsonEqual(options.data, 'image/png');
                        // validate response
                        options.data = local.utility2.bufferToString(data.response, 'base64');
                        local.utility2.assert(options.data ===
                            local.swgg.templateSwaggerUiLogoSmallBase64, options.data);
                        // test fileGetOneByKeyUnique's 404 handling-behavior
                        local.swgg.apiDict['file fileGetOneByKeyUnique.id.id']._ajax({
                            paramDict: { id: '00_test_undefined' }
                        }, onNext);
                        break;
                    case 3:
                        // validate error occurred
                        local.utility2.assert(error, error);
                        // validate statusCode
                        local.utility2.assertJsonEqual(data.statusCode, 404);
                        onNext();
                        break;
                    default:
                        onError(error, data);
                    }
                }, onError);
            };
            onNext();
        };

        local.testCase_fileUploadManyByForm_default = function (options, onError) {
        /*
         * this function will test fileUploadManyByForm's default handling-behavior
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
                        options = {};
                        options.blob = new local.utility2.Blob([
                            local.utility2.assetsDict[
                                '/assets.swgg.swagger-ui.logo_small.png'
                            ]
                        ], { type: 'image/png' });
                        options.blob.name = 'a00.png';
                        // ajax - fileUploadManyByForm
                        local.swgg.apiDict['file fileUploadManyByForm.2']._ajax({ paramDict: {
                            fileDescription: 'hello',
                            file1: options.blob,
                            file2: options.blob,
                            file3: options.blob
                        } }, onNext);
                        break;
                    case 2:
                        // validate data
                        local.utility2.assertJsonEqual(data.responseJson.data.length, 2);
                        local.utility2.assertJsonEqual(
                            data.responseJson.data[0].fileDescription,
                            'hello'
                        );
                        options = local.crudOptionsSetDefault(options, {
                            keyValue: data.responseJson.data[0].id
                        });
                        // test fileGetOneByKeyUnique's default handling-behavior
                        local.testCase_fileGetOneByKeyUnique_default(options, onNext);
                        break;
                    case 3:
                        // test crudDeleteOneByKeyUnique's default handling-behavior
                        local.testCase_crudDeleteOneByKeyUnique_default(options, onNext);
                        break;
                    default:
                        onError(error);
                    }
                }, onError);
            };
            onNext();
        };

        local.testCase_fileUploadManyByForm_nullCase = function (options, onError) {
        /*
         * this function will test fileUploadManyByForm's null-case handling-behavior
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
                        options = {};
                        // ajax - fileUploadManyByForm
                        local.swgg.apiDict[
                            'file fileUploadManyByForm.2'
                        ]._ajax(options, onNext);
                        break;
                    case 2:
                        // validate data
                        local.utility2.assertJsonEqual(data.responseJson.data.length, 0);
                        onNext();
                        break;
                    default:
                        onError(error);
                    }
                }, onError);
            };
            onNext();
        };

        local.testCase_idIntTimeCreate_default = function (options, onError) {
        /*
         * this function will test idIntTimeCreate's default handling-behavior
         */
            options = {};
            // init data1
            options.data1 = local.swgg.idIntTimeCreate();
            for (options.ii = 0; options.ii < 100; options.ii += 1) {
                options.data2 = local.swgg.idIntTimeCreate();
                // validate data2 > data1
                local.utility2.assert(options.data2 > options.data1, options);
                options.data1 = options.data2;
            }
            onError();
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
                local.swgg.apiDict['_test onErrorJsonapi']._ajax({ paramDict: {
                    data: JSON.stringify(options)
                } }, function (error, data) {
                    local.utility2.tryCatchOnError(function () {
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        // validate data
                        local.utility2.assertJsonEqual(
                            data.responseJson.data[0],
                            'hello'
                        );
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
            local.swgg.apiDict['_test onErrorJsonapi']._ajax(options, function (error, data) {
                local.utility2.tryCatchOnError(function () {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    // validate data
                    local.utility2.assertJsonEqual(
                        data.responseJson.data[0],
                        undefined
                    );
                    onParallel();
                }, onError);
            });
            options = { paramDict: { error: '[]' } };
            onParallel.counter += 1;
            local.swgg.apiDict['_test onErrorJsonapi']._ajax(options, function (error, data) {
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
                local.swgg.apiDict[
                    '_test onErrorJsonapi'
                ]._ajax(options, function (error, data) {
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

        local.testCase_petstoreStoreGetInventory_default = function (options, onError) {
        /*
         * this function will test petstoreStoreGetInventory's default handling-behavior
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
                        options = {};
                        local.swgg.apiDict['store getInventory']._ajax(options, onNext);
                        break;
                    default:
                        // validate data
                        local.utility2.assertJsonEqual(data.responseJson.data.length, 1);
                        local.utility2.assert(data.responseJson.data[0]);
                        onError();
                    }
                }, onError);
            };
            onNext();
        };

        local.testCase_userLoginXxx_default = function (options, onError) {
        /*
         * this function will test userLoginXxx's default handling-behavior
         */
            var modeNext, onNext;
            modeNext = 0;
            onNext = function (error, data) {
                local.utility2.tryCatchOnError(function () {
                    modeNext += 1;
                    switch (modeNext) {
                    case 1:
                        // cleanup userJwtEncoded
                        delete local.swgg.userJwtEncoded;
                        // test userLogout's default handling-behavior
                        options = {};
                        local.swgg.userLogout(options, onNext);
                        break;
                    case 2:
                        // validate error occurred
                        local.utility2.assert(error, error);
                        // test userLoginByPassword's 401 handling-behavior
                        options = { password: 'undefined', username: 'undefined' };
                        local.swgg.userLoginByPassword(options, onNext);
                        break;
                    case 3:
                        // validate error occurred
                        local.utility2.assert(error, error);
                        // validate statusCode
                        local.utility2.assertJsonEqual(data.statusCode, 401);
                        // validate userJwtEncoded does not exist
                        local.utility2.assert(
                            !local.swgg.userJwtEncoded,
                            local.swgg.userJwtEncoded
                        );
                        // test userLogout's 401 handling-behavior
                        options = {};
                        local.swgg.userLogout(options, onNext);
                        break;
                    case 4:
                        // validate error occurred
                        local.utility2.assert(error, error);
                        // validate statusCode
                        local.utility2.assertJsonEqual(data.statusCode, 401);
                        // validate userJwtEncoded does not exist
                        local.utility2.assert(
                            !local.swgg.userJwtEncoded,
                            local.swgg.userJwtEncoded
                        );
                        // test userLoginByPassword's 200 handling-behavior
                        options = { password: 'secret', username: 'admin' };
                        local.swgg.userLoginByPassword(options, onNext);
                        break;
                    case 5:
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        // validate statusCode
                        local.utility2.assertJsonEqual(data.statusCode, 200);
                        // validate userJwtEncoded exists
                        local.utility2.assert(
                            local.swgg.userJwtEncoded,
                            local.swgg.userJwtEncoded
                        );
                        // test userLogout's 200 handling-behavior
                        // test jwtEncoded's update handling-behavior
                        options = { jwtDecrypted: { sub: 'admin' } };
                        local.swgg.jwtDecodedEncryptAndEncode(options);
                        local.swgg.userLogout(options, onNext);
                        break;
                    case 6:
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        // validate statusCode
                        local.utility2.assertJsonEqual(data.statusCode, 200);
                        // validate userJwtEncoded exists
                        local.utility2.assert(
                            local.swgg.userJwtEncoded,
                            local.swgg.userJwtEncoded
                        );
                        // test userLogout's 401 handling-behavior
                        options = {};
                        local.swgg.userLogout(options, onNext);
                        break;
                    case 7:
                        // validate error occurred
                        local.utility2.assert(error, error);
                        // validate statusCode
                        local.utility2.assertJsonEqual(data.statusCode, 401);
                        // test userLoginByPassword's 400 handling-behavior
                        local.utility2.ajax({
                            url: '/api/v0/user/userLoginByPassword?password=1'
                        }, onNext);
                        break;
                    case 8:
                        // validate error occurred
                        local.utility2.assert(error, error);
                        // validate statusCode
                        local.utility2.assertJsonEqual(data.statusCode, 400);
                        // test userLogout's invalid-username handling-behavior
                        options = { jwtDecrypted: { sub: 'undefined' } };
                        local.swgg.jwtDecodedEncryptAndEncode(options);
                        local.swgg.userLogout(options, onNext);
                        break;
                    case 9:
                        // validate error occurred
                        local.utility2.assert(error, error);
                        // validate statusCode
                        local.utility2.assertJsonEqual(data.statusCode, 401);
                        onError(null, data);
                        break;
                    }
                }, onError);
            };
            onNext();
        };

        local.testCase_validateByParamDefList_default = function (options, onError) {
        /*
         * this function will test validateByParamDefList's default handling-behavior
         */
            var onParallel;
            onParallel = local.utility2.onParallel(onError);
            onParallel.counter += 1;
            // test nop handling-behavior
            local.swgg.validateByParamDefList({ data: {} });
            options = { paramDict: {
                id: '00_test_testCase_validateByParamDefList_default',
                // test array-param handling-behavior
                paramArray: ['aa', 'bb'],
                // test body-param handling-behavior
                paramBody: { aa: { bb: 'hello body' } },
                // test boolean-param handling-behavior
                paramBoolean: true,
                // test enum-multiple-param handling-behavior
                paramEnumMultiple: [0, 1],
                // test enum-single-param handling-behavior
                paramEnumSingle: 0,
                // test header-param handling-behavior
                paramHeader: 'hello header',
                // test integer-param handling-behavior
                paramInteger: 0,
                // test json-param handling-behavior
                paramJson: '"hello json"',
                // test path-param handling-behavior
                paramPath: 'hello path',
                // test required-param handling-behavior
                paramRequired: 'hello required'
            } };
            onParallel.counter += 1;
            local.swgg.apiDict['_test paramDefault']._ajax(options, function (error, data) {
                local.utility2.tryCatchOnError(function () {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    // validate object
                    local.utility2.assertJsonEqual(data.responseJson.data[0], {
                        paramArray: ['aa', 'bb'],
                        paramBody: { aa: { bb: 'hello body' } },
                        paramBoolean: true,
                        paramEnumMultiple: [0, 1],
                        paramEnumSingle: 0,
                        paramHeader: 'hello header',
                        paramInteger: 0,
                        paramJson: '"hello json"',
                        paramPath: 'hello path',
                        paramRequired: 'hello required'
                    });
                    onParallel();
                }, onError);
            });
            options = { paramDict: {
                id: '00_test_testCase_validateByParamDefList_default',
                // test body-array-param handling-behavior
                paramBodyArray: [{ aa: { bb: 'hello body' } }, null]
            } };
            onParallel.counter += 1;
            local.swgg.apiDict['_test paramBodyArray']._ajax(options, function (error, data) {
                local.utility2.tryCatchOnError(function () {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    // validate object
                    local.utility2.assertJsonEqual(data.responseJson.data[0], {
                        paramBodyArray: [{ aa: { bb: 'hello body' } }, null]
                    });
                    onParallel();
                }, onError);
            });
            onParallel();
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
                { key: 'paramArray', value: true },
                { key: 'paramEnumSingle', value: true },
                { key: 'paramHeader', value: true },
                { key: 'paramInteger', value: true },
                { key: 'paramJson', value: true },
                { key: 'paramOptional', value: true },
                { key: 'paramPath', value: true },
                { key: 'paramRequired', value: true }
            ].forEach(function (element) {
                element.paramDict = local.utility2.jsonCopy(options);
                element.paramDict[element.key] = element.value;
                onParallel.counter += 1;
                local.swgg.apiDict['_test paramDefault']._ajax(element, function (error) {
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
                paramFormData1: 'hello formData1',
                paramFormData2: 'hello formData2'
            } };
            local.swgg.apiDict['_test paramFormData']._ajax(options, function (error, data) {
                local.utility2.tryCatchOnError(function () {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    // validate object
                    local.utility2.assertJsonEqual(data.responseJson.data[0], {
                        paramFormData1: 'hello formData1',
                        paramFormData2: 'hello formData2'
                    });
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
                schema: local.swgg.swaggerJson.definitions.TestCrud
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
                { key: 'propString2', value: 'hello_0123456789_0123456789' },
                { key: 'propStringBinary', value: '\u1234' },
                { key: 'propStringByte', value:
                    local.utility2.stringToBase64(local.utility2.stringAsciiCharset) },
                { key: 'propStringDate', value: '1971-01-01' },
                { key: 'propStringDatetime', value: '1971-01-01T00:00:00Z' },
                { key: 'propStringEmail', value: 'a@a.com' },
                { key: 'propStringJson', value: 'true' }
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
            options = {
                data: { propRequired: true },
                schema: local.swgg.swaggerJson.definitions.TestCrud
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
                { key: 'propNumber2', value: -0.25 },
                { key: 'propNumber2', value: 0 },
                { key: 'propNumber3', value: 0 },
                { key: 'propNumber3', value: 0.25 },
                { key: 'propNumber3', value: 1 },
                { key: 'propNumberDouble', value: true },
                { key: 'propNumberFloat', value: true },
                { key: 'propObject', value: true },
                { key: 'propObject2', value: {} },
                { key: 'propObject2', value: { aa: 1, bb: 2 } },
                { key: 'propRequired', value: null },
                { key: 'propRequired', value: undefined },
                { key: 'propString', value: true },
                { key: 'propString2', value: '' },
                { key: 'propString2', value: '!' },
                { key: 'propString2', value: local.utility2.stringAsciiCharset },
                { key: 'propStringByte', value: local.utility2.stringAsciiCharset },
                { key: 'propStringDate', value: 'null' },
                { key: 'propStringDatetime', value: 'null' },
                { key: 'propStringEmail', value: 'null' },
                { key: 'propStringJson', value: 'syntax error' }
            ].forEach(function (element) {
                local.utility2.tryCatchOnError(function () {
                    if (element.data === undefined) {
                        element.data = local.utility2.jsonCopy(options.data);
                        element.data[element.key] = element.value;
                    }
                    element.schema = options.schema;
                    local.swgg.validateBySchema(element);
                }, local.utility2.nop);
                // validate error occurred
                local.utility2.assert(local.utility2.tryCatchErrorCaught, element.data);
            });
            onError();
        };
        local.testCase_validateBySwagger_default = function (options, onError) {
        /*
         * this function will test validateBySwagger's default handling-behavior
         */
            options = {};
            // test null-case handling-behavior
            [null, undefined, {}].forEach(function (element) {
                local.utility2.tryCatchOnError(function () {
                    local.swgg.validateBySwagger(element);
                }, local.utility2.nop);
                // validate error occurred
                local.utility2.assert(local.utility2.tryCatchErrorCaught, element);
            });
            options.templateData = JSON.stringify({
                definitions: {
                    Test: {
                        // https://github.com/OAI/OpenAPI-Specification/blob/master/versions
                        // /2.0.md#schema-object
                        $ref: '#/definitions/definitions',
                        additionalProperties: true,
                        allOf: [null],
                        default: {},
                        description: 'hello',
                        format: 'undefined',
                        exclusiveMaximum: true,
                        exclusiveMinimum: true,
                        items: {},
                        maxItems: 100,
                        maxProperties: 100,
                        maximum: 100,
                        minItems: 0,
                        minProperties: 0,
                        minimum: -100,
                        multipleOf: 1,
                        pattern: 'undefined',
                        properties: {},
                        required: [null],
                        title: 'hello',
                        type: 'object',
                        uniqueItems: true
                    }
                },
                info: { title: '', version: '' },
                paths: {},
                swagger: '2.0'
            });
            // validate templateData
            // test error handling-behavior
            local.swgg.validateBySwagger(JSON.parse(options.templateData));
            [
                { propUndefined: {} },
                { definitions: { Test: { $ref: true } } },
                { definitions: { Test: { allOf: [] } } },
                { definitions: { Test: { description: true } } },
                { definitions: { Test: { format: true } } },
                { definitions: { Test: { exclusiveMaximum: 1 } } },
                { definitions: { Test: { exclusiveMinimum: 1 } } },
                { definitions: { Test: { items: true } } },
                { definitions: { Test: { maxItems: true } } },
                { definitions: { Test: { maxProperties: true } } },
                { definitions: { Test: { maximum: true } } },
                { definitions: { Test: { minItems: -1 } } },
                { definitions: { Test: { minProperties: -1 } } },
                { definitions: { Test: { minimum: true } } },
                { definitions: { Test: { multipleOf: true } } },
                { definitions: { Test: { pattern: true } } },
                { definitions: { Test: { properties: true } } },
                { definitions: { Test: { required: [] } } },
                { definitions: { Test: { title: true } } },
                { definitions: { Test: { type: true } } },
                { definitions: { Test: { uniqueItems: 'undefined' } } }
            ].forEach(function (element) {
                local.utility2.tryCatchOnError(function () {
                    local.swgg.validateBySwagger(local.utility2.objectSetOverride(
                        JSON.parse(options.templateData),
                        element
                    ), 10);
                }, local.utility2.nop);
                // validate error occurred
                local.utility2.assert(local.utility2.tryCatchErrorCaught, element);
            });
            onError();
        };
    }());
    switch (local.modeJs) {



    // run browser js-env code - function
    case 'browser':
        local.testCase_domAnimateShake_default = function (options, onError) {
        /*
         * this function will test domAnimateShake's default handling-behavior
         */
            options = {};
            options.element = document.querySelector('div');
            local.swgg.uiAnimateShake(options.element);
            setTimeout(onError, 1500);
        };

        local.testCase_ui_default = function (options, onError) {
        /*
         * this function will test the ui's default handling-behavior
         */
            var onParallel;
            options = {};
            onParallel = local.utility2.onParallel(function (error) {
                setTimeout(function () {
                    // hide onEventModalHide's default handling-behavior
                    local.swgg.uiElementClick({
                        target: document.querySelector('.onEventModalHide')
                    });
                }, 500);
                onError(error);
            });
            onParallel.counter += 1;
            Object.keys(local.swgg.uiEventListenerDict).sort().forEach(function (selector) {
                local.utility2.domQuerySelectorAll(
                    document,
                    selector
                ).forEach(function (element, ii, list) {
                    [null, null].forEach(function () {
                        onParallel.counter += 1;
                        setTimeout(function () {
                            local.swgg.uiElementClick({ target: element });
                            onParallel();
                        }, ii * 1000 / list.length);
                    });
                });
            });
            // test onEventModalHide's null-case handling-behavior
            options = {
                target: document.querySelector('.onEventModalHide').children[0]
            };
            local.swgg.uiElementClick(options);
            // test onEventOperationAjax's error handling-behavior
            document.querySelector('#swgg_id_paramInteger .input').value = 'syntax error';
            options = {
                target: document.querySelector('#swgg_id_paramDefault .onEventOperationAjax')
            };
            local.swgg.uiElementClick(options);
            onParallel();
        };

        local.testCase_ui_fileMedia = function (options, onError) {
        /*
         * this function will test the ui's file-media handling-behavior
         */
            options = [
                '00_test_fileMediaAudioNull',
                '00_test_fileMediaImageNull',
                '00_test_fileMediaVideoNull'
            ];
            options.forEach(function (id) {
                document.querySelector('#swgg_id_fileGetOneByKeyUnique_id_id .input').value =
                    id;
                local.swgg.uiElementClick({
                    target: document.querySelector(
                        '#swgg_id_fileGetOneByKeyUnique_id_id .onEventOperationAjax'
                    )
                });
            });
            onError();
        };

        local.testCase_uiScrollTo = function (options, onError) {
        /*
         * this function will test the uiScrollTo's default handling-behavior
         */
            options = [
                '',
                '#!/swgg_id_pet',
                '#!/swgg_id_pet/undefined',
                '#!/swgg_id_pet/undefined/undefined',
                '#!/swgg_id_pet/swgg_datatable',
                '#!/swgg_id_pet/swgg_id_addPet'
            ];
            options.forEach(function (element) {
                local.swgg.uiScrollTo(element);
            });
            onError();
        };
        break;



    // run node js-env code - function
    case 'node':
        local.testCase_build_app = function (options, onError) {
        /*
         * this function will test build's app handling-behavior
         */
            var onParallel;
            onParallel = local.utility2.onParallel(onError);
            onParallel.counter += 1;
            options = {};
            options = [{
                file: '/api/v0/swagger.json',
                url: '/api/v0/swagger.json'
            }, {
                file: '/assets.app.js',
                url: '/assets.app.js'
            }, {
                file: '/assets.app.min.js',
                url: '/assets.app.min.js'
            }, {
                file: '/assets.example.js',
                url: '/assets.example.js'
            }, {
                file: '/assets.swgg.css',
                url: '/assets.swgg.css'
            }, {
                file: '/assets.swgg.js',
                url: '/assets.swgg.js'
            }, {
                file: '/assets.swgg.lib.swagger-ui.js',
                url: '/assets.swgg.lib.swagger-ui.js'
            }, {
                file: '/assets.swgg.swagger-ui.logo_small.png',
                url: '/assets.swgg.swagger-ui.logo_small.png'
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
                file: '/index.html',
                url: '/index.html'
            }, {
                file: '/jsonp.swgg.stateGet',
                url: '/jsonp.swgg.stateGet?callback=window.swgg.stateInit'
            }];
            options.forEach(function (options) {
                onParallel.counter += 1;
                local.utility2.ajax(options, function (error, xhr) {
                    onParallel.counter += 1;
                    // validate no error occurred
                    onParallel(error);
                    local.utility2.fsWriteFileWithMkdirp(
                        local.utility2.envDict.npm_config_dir_build + '/app' + options.file,
                        xhr.response,
                        onParallel
                    );
                });
            });
            onParallel();
        };

        local.testCase_build_doc = function (options, onError) {
        /*
         * this function will test build's doc handling-behavior
         */
            var modeNext, onNext;
            modeNext = 0;
            onNext = function (error) {
                local.utility2.tryCatchOnError(function () {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    modeNext += 1;
                    switch (modeNext) {
                    case 1:
                        options = {};
                        options.moduleDict = {
                            'swgg': {
                                exampleList: [],
                                exports: local.swgg
                            },
                            'swgg.Nedb': {
                                exampleList: [],
                                exports: local.swgg.Nedb
                            },
                            'swgg.Nedb.prototype': {
                                exampleList: [],
                                exports: local.swgg.Nedb.prototype
                            },
                            'swgg.Nedb.storage': {
                                exampleList: [],
                                exports: local.swgg.Nedb.storage
                            }
                        };
                        Object.keys(options.moduleDict).forEach(function (key) {
                            options.moduleDict[key].example =
                                options.moduleDict[key].exampleList
                                .concat([
                                    'README.md',
                                    'test.js',
                                    'index.js',
                                    'lib.swagger-ui.js'
                                ])
                                .map(function (file) {
                                    return '\n\n\n\n\n\n\n\n' +
                                        local.fs.readFileSync(file, 'utf8') +
                                        '\n\n\n\n\n\n\n\n';
                                }).join('');
                        });
                        // create doc.api.html
                        local.utility2.fsWriteFileWithMkdirp(
                            local.utility2.envDict.npm_config_dir_build + '/doc.api.html',
                            local.utility2.docApiCreate(options),
                            onNext
                        );
                        break;
                    case 2:
                        local.utility2.browserTest({
                            modeBrowserTest: 'screenCapture',
                            url: 'file://' + local.utility2.envDict.npm_config_dir_build +
                                '/doc.api.html'
                        }, onNext);
                        break;
                    default:
                        onError(error);
                    }
                }, onError);
            };
            onNext();
        };

        local.testCase_webpage_default = function (options, onError) {
        /*
         * this function will test the webpage's default handling-behavior
         */
            options = {
                modeCoverageMerge: true,
                url: local.utility2.serverLocalHost +
                    '/?modeTest=consoleLogResult#!/swgg_id_pet/swgg_id_addPet'
            };
            local.utility2.browserTest(options, onError);
        };
        break;
    }



    // run shared js-env code - post-init
    (function () {
        // init test api
        local.swgg.apiDictUpdate({
            definitions: {
                // init onErrorJsonapi schema
                onErrorJsonapi: {
                    properties: {
                        data: { type: 'object' },
                        error: { default: {}, type: 'object' }
                    }
                },
                // init TestCrud schema
                TestCrud: {
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
                            items: { $ref: '#/definitions/TestCrud' },
                            type: 'array'
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
                            default: -0.5,
                            exclusiveMaximum: true,
                            exclusiveMinimum: true,
                            maximum: 0,
                            minimum: -1,
                            multipleOf: 0.5,
                            type: 'number'
                        },
                        propNumber3: {
                            default: 0.5,
                            exclusiveMaximum: true,
                            exclusiveMinimum: true,
                            maximum: 1,
                            minimum: 0,
                            multipleOf: 0.5,
                            type: 'number'
                        },
                        propNumberDouble: { format: 'double', type: 'number' },
                        propNumberFloat: { format: 'float', type: 'number' },
                        propObject: { type: 'object' },
                        propObject2: {
                            default: { aa: true },
                            maxProperties: 1,
                            minProperties: 1,
                            type: 'object'
                        },
                        // test null-schema-validation handling-behavior
                        propObjectSubdoc: { $ref: '#/definitions/TestNull' },
                        propRequired: { default: true, type: 'boolean' },
                        propString: { type: 'string' },
                        propString2: {
                            maxLength: 50,
                            minLength: 25,
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
                        propStringUnique: { type: 'string' },
                        updatedAt: { format: 'date-time', readOnly: true, type: 'string' }
                    },
                    required: ['propRequired']
                },
                // init TestNull schema
                TestNull: {}
            },
            paths: {
                // test undefined api handling-behavior
                '/_test/errorUndefinedApi': { get: {
                    operationId: 'errorUndefinedApi',
                    summary: 'test undefined api handling-behavior',
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
                        // test array-param handling-behavior
                        default: ['aa', 'bb'],
                        description: 'array-param',
                        in: 'query',
                        items: { type: 'string' },
                        name: 'paramArray',
                        type: 'array'
                    }, {
                        // test body-param handling-behavior
                        description: 'body-param',
                        in: 'body',
                        name: 'paramBody',
                        schema: { type: 'object' }
                    }, {
                        // test boolean-param handling-behavior
                        default: true,
                        description: 'boolean-param',
                        in: 'query',
                        name: 'paramBoolean',
                        type: 'boolean'
                    }, {
                        // test enum-multiple-param handling-behavior
                        // coverage-hack - test default multi-select handling-behavio
                        default: [0],
                        description: 'enum-multiple-param',
                        enum: [null, 0, 1, 2, 3, 4],
                        in: 'query',
                        items: { type: 'integer' },
                        name: 'paramEnumMultiple',
                        type: 'array'
                    }, {
                        // test enum-single-param handling-behavior
                        description: 'enum-single-param',
                        enum: [null, 0, 1, 2, 3, 4],
                        in: 'query',
                        name: 'paramEnumSingle',
                        type: 'integer'
                    }, {
                        // test header-param handling-behavior
                        description: 'header-param',
                        in: 'header',
                        name: 'paramHeader',
                        type: 'string'
                    }, {
                        // test integer-param handling-behavior
                        description: 'integer-param',
                        in: 'query',
                        name: 'paramInteger',
                        type: 'integer'
                    }, {
                        // test json-param handling-behavior
                        description: 'json-param',
                        format: 'json',
                        in: 'query',
                        name: 'paramJson',
                        type: 'string'
                    }, {
                        // test optional-param handling-behavior
                        description: 'optional-param',
                        in: 'query',
                        name: 'paramOptional',
                        type: 'string'
                    }, {
                        // test path-param handling-behavior
                        default: 'hello path',
                        description: 'path-param',
                        in: 'path',
                        name: 'paramPath',
                        required: true,
                        type: 'string'
                    }, {
                        // test required-param handling-behavior
                        default: 'hello required',
                        description: 'required-param',
                        in: 'query',
                        name: 'paramRequired',
                        required: true,
                        type: 'string'
                    }],
                    summary: 'test default-param handling-behavior',
                    tags: ['_test']
                } },
                // test body-array-param handling-behavior
                '/_test/paramBodyArray': { post: {
                    operationId: 'paramBodyArray',
                    parameters: [{
                        // test body-array-param handling-behavior
                        description: 'body-array-param',
                        in: 'body',
                        name: 'paramBodyArray',
                        schema: { items: { type: 'object' }, type: 'array' }
                    }],
                    summary: 'test body-array-param handling-behavior',
                    tags: ['_test']
                } },
                // test form-data-param handling-behavior
                '/_test/paramFormData': { post: {
                    operationId: 'paramFormData',
                    parameters: [{
                        description: 'form-data-param 1',
                        in: 'formData',
                        name: 'paramFormData1',
                        type: 'string'
                    }, {
                        description: 'form-data-param 2',
                        in: 'formData',
                        name: 'paramFormData2',
                        type: 'string'
                    }],
                    summary: 'test form-data-param handling-behavior',
                    tags: ['_test']
                } }
            },
            tags: [{
                name: '_test',
                description: 'internal test-api'
            }],
            'x-swgg-apiDict': {
                '_test crudCountManyByQuery': {
                    _schemaName: 'TestCrud'
                },
                '_test crudCreateOrReplaceMany': {
                    _schemaName: 'TestCrud'
                },
                '_test crudCreateOrReplaceOneByKeyUnique.id.id': {
                    _schemaName: 'TestCrud'
                },
                '_test crudCreateOrReplaceOneByKeyUnique.propStringUnique.propStringUnique': {
                    _schemaName: 'TestCrud'
                },
                '_test crudDeleteManyByQuery': {
                    _schemaName: 'TestCrud'
                },
                '_test crudDeleteOneByKeyUnique.id.id': {
                    _schemaName: 'TestCrud'
                },
                '_test crudErrorDelete': {
                    _schemaName: 'TestCrud'
                },
                '_test crudErrorGet': {
                    _schemaName: 'TestCrud'
                },
                '_test crudErrorHead': {
                    _schemaName: 'TestCrud'
                },
                '_test crudErrorLogin': {
                    _schemaName: 'TestCrud'
                },
                '_test crudErrorOptions': {
                    _schemaName: 'TestCrud'
                },
                '_test crudErrorPatch': {
                    _schemaName: 'TestCrud'
                },
                '_test crudErrorPre': {
                    _schemaName: 'TestCrud'
                },
                '_test crudErrorPost': {
                    _schemaName: 'TestCrud'
                },
                '_test crudErrorPut': {
                    _schemaName: 'TestCrud'
                },
                '_test crudExistsOneByKeyUnique.id.id': {
                    _schemaName: 'TestCrud'
                },
                '_test crudGetManyByQuery': {
                    _schemaName: 'TestCrud'
                },
                '_test crudGetOneByQuery': {
                    _schemaName: 'TestCrud'
                },
                '_test crudGetOneByKeyUnique.id.id': {
                    _schemaName: 'TestCrud'
                },
                '_test crudNullDelete': {
                    _schemaName: 'TestCrud'
                },
                '_test crudNullGet': {
                    _schemaName: 'TestCrud'
                },
                '_test crudNullHead': {
                    _schemaName: 'TestCrud'
                },
                '_test crudNullOptions': {
                    _schemaName: 'TestCrud'
                },
                '_test crudNullPatch': {
                    _schemaName: 'TestCrud'
                },
                '_test crudNullPost': {
                    _schemaName: 'TestCrud'
                },
                '_test crudNullPut': {
                    _schemaName: 'TestCrud'
                },
                '_test crudUpdateOneByKeyUnique.id.id': {
                    _schemaName: 'TestCrud'
                },
                'file fileUploadManyByForm.2': {
                    _schemaName: 'File'
                }
            },
            'x-swgg-datatableDict': {
                _test: {
                    crudCreateOrReplaceOneByKeyUnique:
                        '_test crudCreateOrReplaceOneByKeyUnique.id.id',
                    crudDeleteOneByKeyUnique:
                        '_test crudDeleteOneByKeyUnique.id.id',
                    crudGetManyByQuery: '_test crudGetManyByQuery',
                    keyUnique: 'id',
                    queryLimit: 20,
                    schema: { $ref: '#/definitions/TestCrud' }
                }
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
            case 'paramBodyArray':
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
        // init collectionList-fixtures
        local.utility2.onReadyBefore.counter += 1;
        local.swgg.collectionListInit([{
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
                    id: '00_test_crudGetManyByQuery',
                    propRequired: true
                }, {
                    id: '00_test_crudGetOneByKeyUnique',
                    propRequired: true
                }, {
                    id: '00_test_crudGetOneByQuery',
                    propRequired: true
                }, {
                    id: '00_test_crudUpdateOneByKeyUnique',
                    propRequired: true
                }],
                // init 100 extra random objects
                length: 100,
                override: function (options) {
                    return {
                        id: '00_test_collectDocListRandomCreate_' + (options.ii + 100)
                    };
                },
                properties: local.swgg.swaggerJson.definitions.TestCrud.properties
            }),
            drop: true,
            ensureIndexList: [{
                fieldName: 'id',
                unique: true
            }, {
                fieldName: 'propStringUnique',
                sparse: true,
                unique: true
            }],
            name: 'TestCrud',
            // test removeIndexList handling-behavior
            removeIndexList: ['undefined']
        }, {
            collectDocList: [{
                id: '00_test_fileGetOneByKeyUnique',
                fileBlob: local.swgg.templateSwaggerUiLogoSmallBase64,
                fileContentType: 'image/png',
                propRequired: true
            }, {
                id: '00_test_fileMediaAudioNull',
                fileBlob: '',
                fileContentType: 'audio/wav',
                fileDescription: 'null audio file',
                fileFilename: '00_test_fileMediaAudioNull.wav'
            }, {
                id: '00_test_fileMediaImageNull',
                fileBlob: '',
                fileContentType: 'image/bmp',
                fileDescription: 'null image file',
                fileFilename: '00_test_fileMediaImageNull.wav'
            }, {
                id: '00_test_fileMediaVideoNull',
                fileBlob: '',
                fileContentType: 'video/mpeg',
                fileDescription: 'null video file',
                fileFilename: '00_test_fileMediaVideoNull.mpg'
            }],
            name: 'File'
        }], local.utility2.onReadyBefore);
        local.swgg.collectionListInit([{
            // test error handling-behavior
            error: local.utility2.errorDefault
        }], local.utility2.nop);
        // init serverLocal
        local.utility2.serverLocalUrlTest = function (url) {
            url = local.utility2.urlParse(url).pathname;
            return local.modeJs === 'browser' &&
                url.indexOf('/api/v0/swagger.json') < 0 &&
                (/\/api\/v0\/|\/test\./).test(url);
        };
    }());
    switch (local.modeJs) {



    // run node js-env code - post-init
    case 'node':
        // init repl debugger
        local.utility2.replStart();
        // init assets
        local.utility2.assetsDict['/'] = local.utility2.assetsDict['/index.html'] =
            local.utility2.templateRender(local.utility2.templateIndexHtml, {
                envDict: local.utility2.envDict,
                isRollup: module.isRollup || local.utility2.envDict.NODE_ENV === 'production'
            });
        /* istanbul ignore next */
        if (module.isRollup) {
            local.utility2.assetsDict['/assets.app.js'] =
                local.utility2.assetsDict['/assets.app.min.js'] =
                local.fs.readFileSync(__filename, 'utf8');
            break;
        }
        local.utility2.assetsDict['/assets.test.js'] =
            local.utility2.istanbulInstrumentInPackage(
                local.fs.readFileSync(__filename, 'utf8'),
                local.swgg.__dirname + '/test.js',
                'swagger-lite'
            );
        local.utility2.assetsDict['/assets.app.js'] = [
            '/assets.app.begin.js',
            '/assets.swgg.rollup.js',
            'local.swgg.stateInit',
            '/assets.example.js',
            '/assets.test.js'
        ].map(function (key) {
            switch (key) {
            case '/assets.app.begin.js':
                return local.utility2.assetsDict[key];
            case 'local.swgg.stateInit':
                return '// ' + key + '\n' +
                    local.utility2.assetsDict['/assets.utility2.rollup.content.js']
                    .replace(
                        '/* utility2.rollup.js content */',
                        key + '(' + JSON.stringify(
                            local.swgg.middlewareJsonpStateGet({ stateGet: true })
                        ) + ');'
                    );
            default:
                return '// ' + key + '\n' + local.utility2.assetsDict[key];
            }
        }).join('\n\n\n\n');
        local.utility2.assetsDict['/assets.app.min.js'] =
            local.utility2.uglifyIfProduction(local.utility2.assetsDict['/assets.app.js']);
        // run validation test
        local.utility2.tryCatchOnError(function () {
            local.testCase_validateByParamDefList_default(null, local.utility2.onErrorDefault);
            local.testCase_validateByParamDefList_error(null, local.utility2.onErrorDefault);
            local.testCase_validateBySchema_default(null, local.utility2.onErrorDefault);
            local.testCase_validateBySchema_error(null, local.utility2.onErrorDefault);
            local.testCase_validateBySwagger_default(null, local.utility2.onErrorDefault);
        }, local.utility2.onErrorDefault);
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
        break;
    }
}());
