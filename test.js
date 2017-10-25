/* istanbul instrument in package swgg */
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 8,
    maxlen: 100,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
(function () {
    'use strict';
    var local;



    // run shared js-env code - init-before
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
        // re-init local
        local = local.global.local = (local.global.utility2 ||
            require('./assets.utility2.rollup.js')).requireReadme();
        // init test
        local.testRunInit(local);
    }());



    // run shared js-env code - function
    (function () {
        local.crudOptionsSetDefault = function (options, defaults) {
        /*
         * this function will set default-values for options
         */
            options = local.objectSetDefault(options, defaults);
            switch (options._tags0) {
            case 'pet':
                local.objectSetDefault(options, {
                    crudGetOneById: local.apiDict['GET /pet/'],
                    crudRemoveOneById: local.apiDict['DELETE /pet/'],
                    crudSetOneById: local.apiDict['POST /pet'],
                    crudUpdateOneById: local.apiDict['POST /pet/'],
                    operationId: 'undefined.petId.id'
                });
                break;
            case 'store':
                local.objectSetDefault(options, {
                    crudGetOneById: local.apiDict['GET /store/order/'],
                    crudRemoveOneById: local.apiDict['DELETE /store/order/'],
                    crudSetOneById: local.apiDict['POST /store/order'],
                    crudUpdateOneById: local.apiDict['PATCH /store/crudUpdateOneById.id.id'],
                    operationId: 'undefined.orderId.id'
                });
                break;
            case 'user':
                local.objectSetDefault(options, {
                    crudGetOneById: local.apiDict['GET /user/'],
                    crudRemoveOneById: local.apiDict['DELETE /user/'],
                    crudSetOneById: local.apiDict['POST /user'],
                    crudUpdateOneById: local.apiDict['PUT /user/'],
                    operationId: 'undefined.username.username'
                });
                break;
            default:
                Object.keys(local.apiDict).forEach(function (key) {
                    key.replace((/^x-test (\w+)/), function (match0, match1) {
                        match0 = match1;
                        options[match0] = options[match0] || local.apiDict[key];
                    });
                });
                local.objectSetDefault(options, { operationId: 'undefined.id.id' });
            }
            local.idFieldInit(options);
            // shallow-copy options
            return local.objectSetDefault({}, options);
        };

        local.testCase_ajax_error = function (options, onError) {
        /*
         * this function will test ajax's error handling-behavior
         */
            var onParallel;
            onParallel = local.onParallel(onError);
            onParallel.counter += 1;
            options = [{
                method: 'POST',
                // test 400 param-parse-error handling-behavior
                statusCode: 400,
                url: '/api/v0/x-test/paramDefault/aa?paramJson=syntax%20error'
            }, {
                // test 404 undefined-api-error-1 handling-behavior
                statusCode: 404,
                url: '/api/v0/x-test/errorUndefined'
            }, {
                // test 404 undefined-api-error-2 handling-behavior
                statusCode: 404,
                url: '/api/v0/x-test/errorUndefinedApi'
            }, {
                // test 404 x-swgg-operationIdFromPath handling-behavior
                statusCode: 404,
                url: '/api/v0/x-test/x-swgg-operationIdFromPath'
            }, {
                // test 404 undefined-map-file handling-behavior
                statusCode: 404,
                url: '/api/v0/x-test/undefined.map'
            }];
            options.forEach(function (options) {
                onParallel.counter += 1;
                local.ajax(options, function (error, xhr) {
                    // validate error occurred
                    local.assert(error, error);
                    // validate statusCode
                    local.assertJsonEqual(error.statusCode, options.statusCode);
                    // validate error is in jsonapi-format
                    if (options.url ===
                            '/api/v0/x-test/paramDefault/aa?paramJson=syntax%20error') {
                        error = JSON.parse(xhr.responseText);
                        local.assert(error.errors[0], error);
                    }
                    onParallel();
                });
            });
            onParallel();
        };

        local.testCase_crudCountManyByQuery_default = function (options, onError) {
        /*
         * this function will test crudCountManyByQuery's default handling-behavior
         */
            options = local.crudOptionsSetDefault(options, {
                idValue: 'testCase_crudCountManyByQuery_default'
            });
            local.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    // ajax - crudCountManyByQuery
                    options.crudCountManyByQuery.ajax({
                        paramDict: { _queryWhere: JSON.stringify(options.queryById) }
                    }, options.onNext);
                    break;
                case 2:
                    // validate data
                    local.assertJsonEqual(data.responseJson.data.length, 1);
                    local.assert(data.responseJson.data[0] === 1, data.responseJson);
                    options.onNext();
                    break;
                default:
                    onError(error, data);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.testCase_crudCreateReplaceUpdateRemoveMany_default = function (options, onError) {
        /*
         * this function will test crudCreateReplaceUpdateRemoveMany's default handling-behavior
         */
            var onParallel;
            onParallel = local.onParallel(onError);
            onParallel.counter += 1;
            [{
                _tags0: 'x-test',
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
                data: { username: 'testCase_crudCreateReplaceUpdateRemoveMany_default' },
                dataValidateReplace: { firstName: 'firstName', userStatus: 1 },
                dataValidateUpdate1: { firstName: 'firstName', userStatus: 1 },
                dataValidateUpdate2: { userStatus: 2 }
            }].forEach(function (_) {
                options = _;
                onParallel.counter += 1;
                // test crudCreateReplaceUpdateRemoveOne's default handling-behavior
                local.testCase_crudCreateReplaceUpdateRemoveOne_default(options, onParallel);
            });
            onParallel();
        };

        local.testCase_crudCreateReplaceUpdateRemoveOne_default = function (options, onError) {
        /*
         * this function will test crudCreateReplaceUpdateRemoveOne's default handling-behavior
         */
            options = local.crudOptionsSetDefault(options, {
                data: {}
            });
            local.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    // test crudSetOneById's create handling-behavior
                    local.testCase_crudSetOneById_default(
                        options,
                        options.onNext
                    );
                    break;
                case 2:
                    // test crudSetOneById's replace handling-behavior
                    local.testCase_crudSetOneById_default(
                        options,
                        options.onNext
                    );
                    break;
                case 3:
                    // test crudUpdateOneById's default handling-behavior
                    local.testCase_crudUpdateOneById_default(options, options.onNext);
                    break;
                case 4:
                    // test crudRemoveOneById's default handling-behavior
                    local.testCase_crudRemoveOneById_default(options, options.onNext);
                    break;
                default:
                    onError(error, data);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.testCase_crudErrorXxx_default = function (options, onError) {
        /*
         * this function will test crudErrorXxx's default handling-behavior
         */
            var onParallel;
            onParallel = local.onParallel(onError);
            onParallel.counter += 1;
            [
                'DELETE /x-test/crudErrorDelete',
                'GET /x-test/crudErrorGet',
                'GET /x-test/crudErrorLogin',
                'GET /x-test/crudErrorPre',
                'HEAD /x-test/crudErrorHead',
                'OPTIONS /x-test/crudErrorOptions',
                'PATCH /x-test/crudErrorPatch',
                'POST /x-test/crudErrorPost',
                'PUT /x-test/crudErrorPut'
            ].forEach(function (key) {
                onParallel.counter += 1;
                local.apiDict[key].ajax({}, function (error, data) {
                    // validate error occurred
                    local.assert(error, error);
                    // validate statusCode
                    local.assertJsonEqual(data.statusCode, 500);
                    onParallel(null, options);
                });
            });
            onParallel(null, options);
        };

        local.testCase_crudGetManyByQuery_default = function (options, onError) {
        /*
         * this function will test crudGetManyByQuery's default handling-behavior
         */
            options = local.crudOptionsSetDefault(options, {
                idValue: 'testCase_crudGetManyByQuery_default'
            });
            local.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    // ajax - crudGetManyByQuery
                    options.crudGetManyByQuery.ajax({
                        paramDict: { _queryWhere: JSON.stringify(options.queryById) }
                    }, options.onNext);
                    break;
                case 2:
                    // validate data
                    local.assertJsonEqual(data.responseJson.data.length, 1);
                    local.assert(
                        data.responseJson.data[0][options.idAlias] === options.idValue,
                        data.responseJson
                    );
                    options.onNext();
                    break;
                default:
                    onError(error, data);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.testCase_crudGetOneById_default = function (options, onError) {
        /*
         * this function will test crudGetOneById's default handling-behavior
         */
            options = local.crudOptionsSetDefault(options, {
                dataValidate: {},
                idValue: 'testCase_crudGetOneById_default'
            });
            local.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    // ajax - crudGetOneById
                    options.crudGetOneById.ajax({
                        paramDict: options.queryById
                    }, options.onNext);
                    break;
                case 2:
                    // validate data
                    local.assertJsonEqual(data.responseJson.data.length, 1);
                    local.assert(
                        data.responseJson.data[0][options.idAlias] === options.idValue,
                        data.responseJson
                    );
                    // validate dataValidate
                    Object.keys(options.dataValidate).forEach(function (key) {
                        local.assert(
                            data.responseJson.data[0][key] === options.dataValidate[key],
                            [key, data.responseJson.data[0][key], options.dataValidate[key]]
                        );
                    });
                    // cleanup dataValidate
                    options.dataValidate = {};
                    options.onNext(null, data);
                    break;
                default:
                    onError(error, data);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.testCase_crudGetOneByQuery_default = function (options, onError) {
        /*
         * this function will test crudGetOneByQuery's default handling-behavior
         */
            options = local.crudOptionsSetDefault(options, {
                idValue: 'testCase_crudGetOneByQuery_default'
            });
            local.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    // ajax - crudGetOneByQuery
                    options.crudGetOneByQuery.ajax({
                        paramDict: { _queryWhere: JSON.stringify(options.queryById) }
                    }, options.onNext);
                    break;
                case 2:
                    // validate data
                    local.assertJsonEqual(data.responseJson.data.length, 1);
                    local.assert(
                        data.responseJson.data[0][options.idAlias] === options.idValue,
                        data.responseJson
                    );
                    options.onNext();
                    break;
                default:
                    onError(error, data);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.testCase_crudNullXxx_default = function (options, onError) {
        /*
         * this function will test crudNullXxx's default handling-behavior
         */
            var onParallel;
            onParallel = local.onParallel(onError);
            onParallel.counter += 1;
            options = {};
            [
                'DELETE /x-test/crudNullDelete',
                'GET /x-test/crudNullGet',
                'HEAD /x-test/crudNullHead',
                'OPTIONS /x-test/crudNullOptions',
                'PATCH /x-test/crudNullPatch',
                'POST /x-test/crudNullPost',
                'PUT /x-test/crudNullPut'
            ].forEach(function (key) {
                onParallel.counter += 1;
                local.apiDict[key].ajax(options, onParallel);
            });
            onParallel();
        };

        local.testCase_crudRemoveManyByQuery_default = function (options, onError) {
        /*
         * this function will test crudRemoveManyByQuery's default handling-behavior
         */
            options = local.crudOptionsSetDefault(options, {
                idValue: 'testCase_crudRemoveManyByQuery_default'
            });
            local.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    // ajax - crudSetOneById
                    options.crudSetOneById.ajax({
                        paramDict: { body: {
                            id: 'testCase_crudRemoveManyByQuery_default',
                            propRequired: true
                        } }
                    }, options.onNext);
                    break;
                case 2:
                    // ajax - crudRemoveManyByQuery
                    options.crudRemoveManyByQuery.ajax({
                        paramDict: { _queryWhere: JSON.stringify(options.queryById) }
                    }, options.onNext);
                    break;
                case 3:
                    // ajax - crudGetOneById
                    options.crudGetOneById.ajax({
                        paramDict: options.queryById
                    }, options.onNext);
                    break;
                case 4:
                    // validate data was removed
                    local.assertJsonEqual(data.responseJson.data.length, 1);
                    local.assert(data.responseJson.data[0] === null, data.responseJson);
                    options.onNext();
                    break;
                default:
                    onError(error, data);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.testCase_crudRemoveOneById_default = function (options, onError) {
        /*
         * this function will test crudRemoveOneById's default handling-behavior
         */
            options = local.crudOptionsSetDefault(options, {
                idValue: 'testCase_crudRemoveOneById_default'
            });
            local.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    if (options.idValue === 'testCase_crudRemoveOneById_default') {
                        // ajax - crudSetOneById
                        options.crudSetOneById.ajax({
                            paramDict: { body: {
                                id: 'testCase_crudRemoveOneById_default',
                                propRequired: true
                            } }
                        }, options.onNext);
                        return;
                    }
                    options.onNext();
                    break;
                case 2:
                    // ajax - crudRemoveOneById
                    options.crudRemoveOneById.ajax({
                        paramDict: options.queryById
                    }, options.onNext);
                    break;
                case 3:
                    // ajax - crudGetOneById
                    options.crudGetOneById.ajax({
                        paramDict: options.queryById
                    }, options.onNext);
                    break;
                case 4:
                    // validate data was removed
                    local.assertJsonEqual(data.responseJson.data.length, 1);
                    local.assert(data.responseJson.data[0] === null, data.responseJson);
                    options.onNext();
                    break;
                default:
                    onError(error, data);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.testCase_crudSetManyById_default = function (options, onError) {
        /*
         * this function will test crudSetManyById's default handling-behavior
         */
            var onParallel;
            options = local.crudOptionsSetDefault(options, {
                data: [{
                    id: 'testCase_crudSetManyById_default_1',
                    propRequired: true
                }, {
                    id: 'testCase_crudSetManyById_default_2',
                    propRequired: true
                }]
            });
            local.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    // ajax - crudSetManyById
                    options.crudSetManyById.ajax({
                        paramDict: { body: options.data }
                    }, options.onNext);
                    break;
                case 2:
                    onParallel = local.onParallel(options.onNext);
                    onParallel.counter += 1;
                    options.data.forEach(function (element) {
                        onParallel.counter += 1;
                        // test crudGetOneById's default handling-behavior
                        local.testCase_crudGetOneById_default({
                            idValue: element.id
                        }, onParallel);
                    });
                    onParallel();
                    break;
                default:
                    onError(error, data);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.testCase_crudSetOneById_default = function (options, onError) {
        /*
         * this function will test crudSetOneById's default handling-behavior
         */
            var paramDict;
            options = local.crudOptionsSetDefault(options, {
                data: {
                    // test dataReadonlyRemove handling-behavior
                    _timeCreated: '1970-01-01T00:00:00.000Z',
                    _timeUpdated: '1970-01-01T00:00:00.000Z',
                    id: 'testCase_crudSetOneById_default'
                },
                dataValidateReplace: { propRequired: true }
            });
            local.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    // init paramDict
                    paramDict = {};
                    paramDict.body = local.objectSetOverride(
                        local.jsonCopy(options.data),
                        options.dataValidateReplace
                    );
                    // ajax - crudSetOneById
                    options.crudSetOneById.ajax({ paramDict: paramDict }, options.onNext);
                    break;
                case 2:
                    // init id
                    options.data.id = data.responseJson.data[0].id;
                    // validate time _timeCreated
                    local.assert(
                        data.responseJson.data[0]._timeCreated > '1970-01-01T00:00:00.000Z',
                        data.responseJson
                    );
                    local.assert(
                        data.responseJson.data[0]._timeCreated < new Date().toISOString(),
                        data.responseJson
                    );
                    // validate time _timeUpdated
                    local.assert(
                        data.responseJson.data[0]._timeUpdated > '1970-01-01T00:00:00.000Z',
                        data.responseJson
                    );
                    local.assert(
                        data.responseJson.data[0]._timeUpdated < new Date().toISOString(),
                        data.responseJson
                    );
                    // test crudGetOneById's default handling-behavior
                    options.dataValidate = options.dataValidateReplace;
                    local.testCase_crudGetOneById_default(options, options.onNext);
                    break;
                default:
                    onError(error, data);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.testCase_crudUpdateOneById_default = function (options, onError) {
        /*
         * this function will test crudUpdateOneById's default handling-behavior
         */
            var paramDict;
            options = local.crudOptionsSetDefault(options, {
                data: { id: 'testCase_crudUpdateOneById_default' },
                dataValidateUpdate1: { propRequired: true },
                dataValidateUpdate2: { propRequired: false }
            });
            local.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    // test crudGetOneById's default handling-behavior
                    options.dataValidate = options.dataValidateUpdate1;
                    if (options.data.id === 'testCase_crudUpdateOneById_default') {
                        // ajax - crudSetOneById
                        options.crudSetOneById.ajax({
                            paramDict: { body: {
                                id: 'testCase_crudUpdateOneById_default',
                                propRequired: true
                            } }
                        }, options.onNext);
                        return;
                    }
                    options.onNext();
                    break;
                case 2:
                    local.testCase_crudGetOneById_default(options, options.onNext);
                    break;
                case 3:
                    options._timeCreated = data.responseJson.data[0]._timeCreated;
                    options._timeUpdated = data.responseJson.data[0]._timeUpdated;
                    // init paramDict
                    paramDict = local.jsonCopy(options.queryById);
                    paramDict.body = local.objectSetOverride(
                        local.jsonCopy(options.data),
                        options.dataValidateUpdate2
                    );
                    // test application/x-www-form-urlencoded's handling-behavior
                    local.objectSetOverride(paramDict, paramDict.body);
                    // ajax - crudUpdateOneById
                    options.crudUpdateOneById.ajax({
                        paramDict: paramDict
                    }, options.onNext);
                    break;
                case 4:
                    // validate time _timeCreated
                    local.assert(
                        data.responseJson.data[0]._timeCreated === options._timeCreated,
                        data.responseJson
                    );
                    local.assert(
                        data.responseJson.data[0]._timeCreated < new Date().toISOString(),
                        data.responseJson
                    );
                    // validate time _timeUpdated
                    local.assert(
                        data.responseJson.data[0]._timeUpdated > options._timeUpdated,
                        data.responseJson
                    );
                    local.assert(
                        data.responseJson.data[0]._timeUpdated < new Date().toISOString(),
                        data.responseJson
                    );
                    // test crudGetOneById's default handling-behavior
                    options.dataValidate = local.objectSetOverride(
                        local.jsonCopy(options.dataValidateUpdate1),
                        options.dataValidateUpdate2
                    );
                    local.testCase_crudGetOneById_default(options, options.onNext);
                    break;
                default:
                    onError(error, data);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.testCase_fileGetOneById_default = function (options, onError) {
        /*
         * this function will test fileGetOneById's default handling-behavior
         */
            var modeNext, onNext;
            modeNext = 0;
            onNext = function (error, data) {
                modeNext += 1;
                switch (modeNext) {
                case 1:
                    options = local.crudOptionsSetDefault(options, {
                        idValue: 'testCase_fileGetOneById_default'
                    });
                    // ajax - fileGetOneById
                    local.apiDict['GET /file/fileGetOneById.id.id'].ajax({
                        paramDict: options.queryById
                    }, onNext);
                    break;
                case 2:
                    // validate no error occurred
                    local.assert(!error, error);
                    // validate Content-Type
                    options.data = data.getResponseHeader('content-type');
                    local.assertJsonEqual(options.data, 'image/png');
                    // validate response
                    options.data = local.base64FromBuffer(data.response);
                    local.assertJsonEqual(options.data, local.templateSwaggerUiLogoSmallBase64);
                    // test fileGetOneById's 404 handling-behavior
                    local.apiDict['GET /file/fileGetOneById.id.id'].ajax({
                        paramDict: { id: 'testCase_fileGetOneById_default_undefined' }
                    }, onNext);
                    break;
                case 3:
                    // validate error occurred
                    local.assert(error, error);
                    // validate statusCode
                    local.assertJsonEqual(data.statusCode, 404);
                    onNext();
                    break;
                default:
                    onError(error, data);
                }
            };
            onNext();
        };

        local.testCase_fileUploadManyByForm_default = function (options, onError) {
        /*
         * this function will test fileUploadManyByForm's default handling-behavior
         */
            options = {};
            local.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    options.blob = new local.Blob(
                        [local.bufferToNodeBuffer(
                            local.base64ToBuffer(local.templateSwaggerUiLogoSmallBase64)
                        )],
                        { type: 'image/png' }
                    );
                    options.blob.name = 'a00.png';
                    // ajax - fileUploadManyByForm
                    local.apiDict['POST /file/fileUploadManyByForm.2'].ajax({
                        paramDict: {
                            fileDescription: 'hello',
                            file1: options.blob,
                            file2: options.blob,
                            file3: options.blob
                        }
                    }, options.onNext);
                    break;
                case 2:
                    // validate data
                    local.assertJsonEqual(data.responseJson.data.length, 2);
                    local.assertJsonEqual(data.responseJson.data[0].fileDescription, 'hello');
                    local.crudOptionsSetDefault(options, {
                        idValue: data.responseJson.data[0].id
                    });
                    // test fileGetOneById's default handling-behavior
                    local.testCase_fileGetOneById_default(options, options.onNext);
                    break;
                case 3:
                    // test crudRemoveOneById's default handling-behavior
                    local.testCase_crudRemoveOneById_default(options, options.onNext);
                    break;
                default:
                    onError(error);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.testCase_fileUploadManyByForm_nullCase = function (options, onError) {
        /*
         * this function will test fileUploadManyByForm's null-case handling-behavior
         */
            options = {};
            local.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    // ajax - fileUploadManyByForm
                    local.apiDict['POST /file/fileUploadManyByForm.2'].ajax(
                        options,
                        options.onNext
                    );
                    break;
                case 2:
                    // validate data
                    local.assertJsonEqual(data.responseJson.data.length, 0);
                    options.onNext();
                    break;
                default:
                    onError(error);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.testCase_onErrorJsonapi_default = function (options, onError) {
        /*
         * this function will test onErrorJsonapi's default handling-behavior
         */
            var onParallel;
            onParallel = local.onParallel(onError);
            onParallel.counter += 1;
            [
                'hello',
                ['hello'],
                { data: ['hello'], meta: { isJsonapiResponse: true } }
            ].forEach(function (_) {
                options = _;
                onParallel.counter += 1;
                local.apiDict['GET /x-test/onErrorJsonapi'].ajax({
                    paramDict: { data: JSON.stringify(options) }
                }, function (error, data) {
                    // validate no error occurred
                    local.assert(!error, error);
                    // validate data
                    local.assertJsonEqual(data.responseJson.data[0], 'hello');
                    onParallel();
                });
            });
            onParallel();
        };

        local.testCase_onErrorJsonapi_emptyArray = function (options, onError) {
        /*
         * this function will test onErrorJsonapi's empty-array handling-behavior
         */
            var onParallel;
            onParallel = local.onParallel(onError);
            onParallel.counter += 1;
            options = { paramDict: { data: '[]' } };
            onParallel.counter += 1;
            local.apiDict['GET /x-test/onErrorJsonapi'].ajax(options, function (error, data) {
                // validate no error occurred
                local.assert(!error, error);
                // validate data
                local.assertJsonEqual(data.responseJson.data[0], undefined);
                onParallel();
            });
            options = { paramDict: { error: '[]' } };
            onParallel.counter += 1;
            local.apiDict['GET /x-test/onErrorJsonapi'].ajax(options, function (error, data) {
                // validate error occurred
                local.assert(error, error);
                // validate error
                local.assert(data.responseJson.errors[0].message === 'null', error);
                onParallel();
            });
            onParallel();
        };

        local.testCase_onErrorJsonapi_error = function (options, onError) {
        /*
         * this function will test onErrorJsonapi's error handling-behavior
         */
            var onParallel;
            onParallel = local.onParallel(onError);
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
                local.apiDict['GET /x-test/onErrorJsonapi'].ajax(options, function (error, data) {
                    // validate error occurred
                    local.assert(error, error);
                    // validate error
                    local.assert(data.responseJson.errors[0].message === 'hello', error);
                    onParallel();
                });
            });
            onParallel();
        };

        local.testCase_petstoreStoreGetInventory_default = function (options, onError) {
        /*
         * this function will test petstoreStoreGetInventory's default handling-behavior
         */
            options = {};
            local.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    local.apiDict['GET /store/inventory'].ajax(options, options.onNext);
                    break;
                case 2:
                    // validate data
                    local.assertJsonEqual(data.responseJson.data.length, 1);
                    local.assert(data.responseJson.data[0]);
                    options.onNext();
                    break;
                default:
                    onError(error);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.testCase_userLoginXxx_default = function (options, onError) {
        /*
         * this function will test userLoginXxx's default handling-behavior
         */
            var modeNext, onNext;
            modeNext = 0;
            onNext = function (error, data) {
                modeNext += 1;
                switch (modeNext) {
                case 1:
                    // cleanup userJwtEncrypted
                    delete local.userJwtEncrypted;
                    // test userLogout's default handling-behavior
                    options = {};
                    local.userLogout(options, onNext);
                    break;
                case 2:
                    // validate error occurred
                    local.assert(error, error);
                    // test userLoginByPassword's 401 handling-behavior
                    options = { password: 'undefined', username: 'undefined' };
                    local.userLoginByPassword(options, onNext);
                    break;
                case 3:
                    // validate error occurred
                    local.assert(error, error);
                    // validate statusCode
                    local.assertJsonEqual(data.statusCode, 401);
                    // validate userJwtEncrypted does not exist
                    local.assert(!local.userJwtEncrypted, local.userJwtEncrypted);
                    // test userLogout's 401 handling-behavior
                    options = {};
                    local.userLogout(options, onNext);
                    break;
                case 4:
                    // validate error occurred
                    local.assert(error, error);
                    // validate statusCode
                    local.assertJsonEqual(data.statusCode, 401);
                    // validate userJwtEncrypted does not exist
                    local.assert(!local.userJwtEncrypted, local.userJwtEncrypted);
                    // test userLoginByPassword's 200 handling-behavior
                    options = { password: 'secret', username: 'admin' };
                    local.userLoginByPassword(options, onNext);
                    break;
                case 5:
                    // validate no error occurred
                    local.assert(!error, error);
                    // validate statusCode
                    local.assertJsonEqual(data.statusCode, 200);
                    // validate userJwtEncrypted exists
                    local.assert(local.userJwtEncrypted, local.userJwtEncrypted);
                    // test persistent-session handling-behavior
                    local.apiDict['GET /x-test/crudNullGet'].ajax({}, onNext);
                    break;
                case 6:
                    // validate no error occurred
                    local.assert(!error, error);
                    // validate statusCode
                    local.assertJsonEqual(data.statusCode, 200);
                    // validate userJwtEncrypted exists
                    local.assert(local.userJwtEncrypted, local.userJwtEncrypted);
                    // test userLogout's 200 handling-behavior
                    // test jwtEncoded's update handling-behavior
                    options = { jwtEncrypted: local.jwtA256GcmEncrypt({ sub: 'admin' }) };
                    local.userLogout(options, onNext);
                    break;
                case 7:
                    // validate no error occurred
                    local.assert(!error, error);
                    // validate statusCode
                    local.assertJsonEqual(data.statusCode, 200);
                    // validate userJwtEncrypted exists
                    local.assert(local.userJwtEncrypted, local.userJwtEncrypted);
                    // test userLogout's 401 handling-behavior
                    options = {};
                    local.userLogout(options, onNext);
                    break;
                case 8:
                    // validate error occurred
                    local.assert(error, error);
                    // validate statusCode
                    local.assertJsonEqual(data.statusCode, 401);
                    // test userLoginByPassword's 400 handling-behavior
                    local.ajax({ url: '/api/v0/user/userLoginByPassword?password=1' }, onNext);
                    break;
                case 9:
                    // validate error occurred
                    local.assert(error, error);
                    // validate statusCode
                    local.assertJsonEqual(data.statusCode, 400);
                    // test userLogout's invalid-username handling-behavior
                    options = { jwtEncrypted: local.jwtA256GcmEncrypt({ sub: 'undefined' }) };
                    local.userLogout(options, onNext);
                    break;
                case 10:
                    // validate error occurred
                    local.assert(error, error);
                    // validate statusCode
                    local.assertJsonEqual(data.statusCode, 401);
                    onError(null, data);
                    break;
                }
            };
            onNext();
        };

        local.testCase_validateByParamDefList_default = function (options, onError) {
        /*
         * this function will test validateByParamDefList's default handling-behavior
         */
            var onParallel;
            onParallel = local.onParallel(onError);
            onParallel.counter += 1;
            // test nop handling-behavior
            local.validateByParamDefList({ data: {} });
            options = {
                paramDict: {
                    id: 'testCase_validateByParamDefList_default',
                    // test array-csv-param handling-behavior
                    paramArrayCsv: ['aa', 'bb'],
                    // test array-default-param handling-behavior
                    paramArrayDefault: 'aa,bb',
                    // test array-json-param handling-behavior
                    paramArrayJson: [0, 1],
                    // test array-multi-param handling-behavior
                    paramArrayMulti: ['aa', 'bb'],
                    // test array-pipes-param handling-behavior
                    paramArrayPipes: ['aa', 'bb'],
                    // test array-ssv-param handling-behavior
                    paramArraySsv: ['aa', 'bb'],
                    // test array-tsv-param handling-behavior
                    paramArrayTsv: ['aa', 'bb'],
                    // test body-param handling-behavior
                    paramBody: { aa: { bb: 'hello body' } },
                    // test boolean-param handling-behavior
                    paramBoolean: false,
                    // test enum-multiple-param handling-behavior
                    paramEnumMulti: [0, 1],
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
                }
            };
            onParallel.counter += 1;
            local.apiDict['POST /x-test/paramDefault/'].ajax(options, function (error, data) {
                // validate no error occurred
                local.assert(!error, error);
                // validate object
                local.assertJsonEqual(data.responseJson.data[0], {
                    paramArrayCsv: ['aa', 'bb'],
                    paramArrayDefault: ['aa', 'bb'],
                    paramArrayJson: [0, 1],
                    paramArrayMulti: ['aa', 'bb'],
                    paramArrayPipes: ['aa', 'bb'],
                    paramArraySsv: ['aa', 'bb'],
                    paramArrayTsv: ['aa', 'bb'],
                    paramBody: { aa: { bb: 'hello body' } },
                    paramBoolean: false,
                    paramEnumMulti: [0, 1],
                    paramEnumSingle: 0,
                    paramHeader: 'hello header',
                    paramInteger: 0,
                    paramJson: '"hello json"',
                    paramPath: 'hello path',
                    paramRequired: 'hello required'
                });
                onParallel();
            });
            // test body-array-param handling-behavior
            options = {
                paramDict: {
                    id: 'testCase_validateByParamDefList_default',
                    paramBodyArray: [{ aa: { bb: 'hello body' } }, null]
                }
            };
            onParallel.counter += 1;
            local.apiDict['POST /x-test/paramBodyArray'].ajax(options, function (error, data) {
                // validate no error occurred
                local.assert(!error, error);
                // validate object
                local.assertJsonEqual(data.responseJson.data[0], {
                    paramBodyArray: [{ aa: { bb: 'hello body' } }, null]
                });
                onParallel();
            });
            // test body-string-param handling-behavior
            options = {
                paramDict: {
                    id: 'testCase_validateByParamDefList_default',
                    paramBodyString: 'hello body'
                }
            };
            onParallel.counter += 1;
            local.apiDict['POST /x-test/paramBodyString'].ajax(options, function (error, data) {
                // validate no error occurred
                local.assert(!error, error);
                // validate object
                local.assertJsonEqual(data.responseJson.data[0], {
                    paramBodyString: 'hello body'
                });
                onParallel();
            });
            onParallel();
        };

        local.testCase_validateByParamDefList_error = function (options, onError) {
        /*
         * this function will test validateByParamDefList's error handling-behavior
         */
            var onParallel;
            onParallel = local.onParallel(onError);
            onParallel.counter += 1;
            options = { paramPath: 'hello path', paramRequired: 'hello required' };
            [
                { key: 'paramArrayCsv', value: true },
                { key: 'paramArrayDefault', value: true },
                { key: 'paramArrayJson', value: true },
                { key: 'paramArrayMulti', value: true },
                { key: 'paramArrayPipes', value: true },
                { key: 'paramArraySsv', value: true },
                { key: 'paramArrayTsv', value: true },
                { key: 'paramEnumSingle', value: true },
                { key: 'paramHeader', value: true },
                { key: 'paramInteger', value: true },
                { key: 'paramJson', value: true },
                { key: 'paramOptional', value: true },
                { key: 'paramPath', value: true },
                { key: 'paramRequired', value: true }
            ].forEach(function (element) {
                element.paramDict = local.jsonCopy(options);
                element.paramDict[element.key] = element.value;
                onParallel.counter += 1;
                local.apiDict['POST /x-test/paramDefault/'].ajax(element, function (error) {
                    // validate error occurred
                    local.assert(error, element);
                    onParallel();
                });
            });
            onParallel();
        };

        local.testCase_validateByParamDefList_formData = function (options, onError) {
        /*
         * this function will test validateByParamDefList's formData handling-behavior
         */
            options = {
                paramDict: {
                    paramArrayMulti: [0, 1],
                    paramFormData1: 'hello formData1',
                    paramFormData2: 'hello formData2'
                }
            };
            local.apiDict['POST /x-test/paramFormData'].ajax(options, function (error, data) {
                // validate no error occurred
                local.assert(!error, error);
                // validate object
                local.assertJsonEqual(data.responseJson.data[0], {
                    paramArrayMulti: [0, 1],
                    paramFormData1: 'hello formData1',
                    paramFormData2: 'hello formData2'
                });
                onError(null, options);
            });
        };

        local.testCase_validateBySchema_default = function (options, onError) {
        /*
         * this function will test validateBySchema's default handling-behavior
         */
            options = {
                data: { propRequired: true },
                schema: local.swaggerJson.definitions.TestCrud
            };
            [
                { key: 'propArray', value: [null] },
                { key: 'propArray2', value: [null] },
                { key: 'propArraySubdoc', value: [{ propRequired: true }] },
                { key: 'propBoolean', value: true },
                { key: 'propEnum', value: 0 },
                { key: 'propEnumMulti', value: [0, 1] },
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
                { key: 'propStringByte', value: local.base64FromString(local.stringAsciiCharset) },
                { key: 'propStringDate', value: '1971-01-01' },
                { key: 'propStringDatetime', value: '1971-01-01T00:00:00Z' },
                { key: 'propStringEmail', value: 'a@a.com' },
                { key: 'propStringJson', value: 'true' },
                { key: 'propStringPhone', value: '+123 (1234) 1234-1234' }
            ].forEach(function (element) {
                element.data = local.jsonCopy(options.data);
                element.data[element.key] = element.value;
                element.schema = options.schema;
                // test circular-reference handling-behavior
                element.data.propArraySubdoc = element.data.propArraySubdoc || [element.data];
                element.data.propObject = element.data.propObject || element.data;
                element.data.propObjectSubdoc = element.data.propObjectSubdoc || element.data;
                local.validateBySchema(element);
            });
            onError(null, options);
        };

        local.testCase_validateBySchema_error = function (options, onError) {
        /*
         * this function will test validateBySchema's error handling-behavior
         */
            options = {
                data: { propRequired: true },
                schema: local.swaggerJson.definitions.TestCrud
            };
            [
                { data: null },
                { key: 'propArray', value: true },
                { key: 'propArray2', value: [] },
                { key: 'propArray2', value: [null, null] },
                { key: 'propArraySubdoc', value: [ 'non-object' ] },
                { key: 'propArraySubdoc', value: [{ propRequired: null }] },
                { key: 'propBoolean', value: 0 },
                { key: 'propEnum', value: -1 },
                { key: 'propEnumMulti', value: 0 },
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
                { key: 'propString2', value: local.stringAsciiCharset },
                { key: 'propStringByte', value: local.stringAsciiCharset },
                { key: 'propStringDate', value: 'null' },
                { key: 'propStringDatetime', value: 'null' },
                { key: 'propStringEmail', value: 'null' },
                { key: 'propStringJson', value: 'syntax error' },
                { key: 'propStringPhone', value: 'null' }
            ].forEach(function (element) {
                local.tryCatchOnError(function () {
                    if (element.data === undefined) {
                        element.data = local.jsonCopy(options.data);
                        element.data[element.key] = element.value;
                    }
                    element.schema = options.schema;
                    local.validateBySchema(element);
                }, local.nop);
                // validate error occurred
                local.assert(
                    local.utility2._debugTryCatchErrorCaught,
                    JSON.stringify(element.data)
                );
            });
            onError(null, options);
        };

        local.testCase_validateBySwagger_default = function (options, onError) {
        /*
         * this function will test validateBySwagger's default handling-behavior
         */
            options = {};
            // test null-case handling-behavior
            [null, undefined, {}].forEach(function (element) {
                local.tryCatchOnError(function () {
                    local.validateBySwagger(element);
                }, local.nop);
                // validate error occurred
                local.assert(local.utility2._debugTryCatchErrorCaught, element);
            });
            local.validateBySwagger({
                info: { title: 'undefined', version: 'undefined' },
                paths: {},
                swagger: '2.0'
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
                        exclusiveMaximum: true,
                        exclusiveMinimum: true,
                        format: 'undefined',
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
            local.validateBySwagger(JSON.parse(options.templateData));
            [
                { definitions: { Test: { $ref: true } } },
                { definitions: { Test: { allOf: [] } } },
                { definitions: { Test: { description: true } } },
                { definitions: { Test: { exclusiveMaximum: 1 } } },
                { definitions: { Test: { exclusiveMinimum: 1 } } },
                { definitions: { Test: { format: true } } },
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
                { definitions: { Test: { uniqueItems: 'undefined' } } },
                { propUndefined: {} }
            ].forEach(function (element) {
                local.tryCatchOnError(function () {
                    local.validateBySwagger(local.objectSetOverride(
                        JSON.parse(options.templateData),
                        element
                    ), Infinity);
                }, local.nop);
                // validate error occurred
                local.assert(local.utility2._debugTryCatchErrorCaught, element);
            });
            onError(null, options);
        };

        local.utility2.serverLocalUrlTest = function (url) {
            url = local.urlParse(url).pathname;
            return local.modeJs === 'browser' &&
                !local.env.npm_config_mode_backend &&
                (/^\/test\.|\/api\/v0\//).test(url);
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
            local.uiAnimateShake(options.element);
            setTimeout(onError, 1500);
        };

        local.testCase_uiNotify_default = function (options, onError) {
        /*
         * this function will test uiNotify's default handling-behavior
         */
            options = {};
            // test error handling-behavior
            options.data = local.uiNotify(local.errorDefault, 'aa');
            // validate error occurred
            local.assert(options.data.classList.contains('error'));
            // test message handling-behavior
            options.data = local.uiNotify(null, 'bb');
            // validate no error occurred
            local.assert(!options.data.classList.contains('error'), options.data.classList);
            local.assertJsonEqual(options.data.textContent, 'bb');
            onError(null, options);
        };

        local.testCase_ui_default = function (options, onError) {
        /*
         * this function will test ui's default handling-behavior
         */
            var onParallel;
            onParallel = local.onParallel(function (error) {
                setTimeout(function () {
                    // reset location.hash
                    document.querySelector('#swgg_id_pet .td1').click();
                    onError(error);
                }, 1000);
            });
            onParallel.counter += 1;
            // init localStorage
            localStorage.setItem('testCase_ui_default', '');
            localStorage.setItem('utility2_swgg_apiKeyKey_', '');
            // test click handling-behavior
            options = Object.keys(local.uiEventListenerDict).sort();
            options.forEach(function (selector) {
                Array.from(
                    document.querySelectorAll(selector)
                ).forEach(function (element, ii, list) {
                    [null, null].forEach(function () {
                        onParallel.counter += 1;
                        setTimeout(function () {
                            element.click();
                            onParallel();
                        }, ii * 1000 / list.length);
                    });
                });
            });
            // test empty-input handling-behavior
            document.querySelector('#swgg_id_paramOptional .input').value = '';
            // test onEventOperationAjax's error handling-behavior
            document.querySelector('#swgg_id_paramInteger .input').value = 'syntax error';
            document.querySelector(
                '#swgg_id_POST_20_2Fx_test_2FparamDefault_2F .onEventOperationAjax'
            ).click();
            // test onEventUiReload's key handling-behavior
            onParallel.counter += 1;
            local.uiEventListenerDict['.onEventUiReload']({
                swggInit: true,
                target: { id: 'swggApiKeyInput1' },
                type: 'keyup'
            });
            onParallel();
            onParallel();
        };

        local.testCase_ui_fileMedia = function (options, onError) {
        /*
         * this function will test ui's fileMedia handling-behavior
         */
            [
                'testCase_ui_fileMedia_audioNull',
                'testCase_ui_fileMedia_imageNull',
                'testCase_ui_fileMedia_videoNull'
            ].forEach(function (id) {
                document.querySelector(
                    '#swgg_id_GET_20_2Ffile_2FfileGetOneById_id_id .input'
                ).value = id;
                document.querySelector(
                    '#swgg_id_GET_20_2Ffile_2FfileGetOneById_id_id .onEventOperationAjax'
                ).click();
            });
            onError(null, options);
        };
        break;
    }



    // run shared js-env code - init-after
    (function () {
        // test apiAjax's deferred handling-behavior
        local.apiAjax('GET /x-test/crudNullGet', {}, local.onErrorThrow);
        // test apiUpdate's null-case handling-behavior
        local.apiUpdate();
        // test apiUpdate's root-basePath handling-behavior
        local.apiUpdate({ basePath: '/' });
        local.assertJsonEqual(local.swaggerJsonBasePath, '');
        // test apiUpdate's $SWGG_TAGS0_FILTER handling-behavior
        local.testMock([
            [local.env, { SWGG_TAGS0_FILTER: 'x-test-tags0-filter' }]
        ], function (onError) {
            local.apiUpdate({
                definitions: { Aa: {}, Bb: { 'x-swgg-tags0': 'undefined' } },
                paths: {
                    '/x-test/tags0-filter': { get: { tags: ['x-test'] } },
                    '/x-test/tags0-filter-undefined': { get: { 'x-swgg-tags0': 'undefined' } }
                },
                tags: [{}, { 'x-swgg-tags0': 'undefined' }]
            });
            onError();
        }, local.onErrorThrow);
        // init test api
        local.apiUpdate({
            basePath: '/api/v0',
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
                        _timeCreated: { format: 'date-time', readOnly: true, type: 'string' },
                        _timeUpdated: { format: 'date-time', readOnly: true, type: 'string' },
                        id: { type: 'string' },
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
                        propEnumMulti: {
                            enum: [0, 1],
                            items: { type: 'integer' },
                            type: 'array'
                        },
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
                        propStringPhone: {
                            default: '+123 (1234) 1234-1234',
                            format: 'phone',
                            type: 'string'
                        },
                        propStringUnique: { type: 'string' }
                    },
                    required: ['propRequired']
                },
                // init TestNull schema
                TestNull: {}
            },
            paths: {
                // test undefined api handling-behavior
                '/x-test/errorUndefinedApi': { get: {
                    operationId: 'errorUndefinedApi',
                    summary: 'test undefined api handling-behavior',
                    tags: ['x-test']
                } },
                // test onErrorJsonapi handling-behavior
                '/x-test/onErrorJsonapi': { get: {
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
                    tags: ['x-test']
                } },
                // test x-swgg-operationIdFromPath handling-behavior
                '/x-test/x-swgg-operationIdFromPath': { get: {
                    summary: 'test x-swgg-operationIdFromPath handling-behavior',
                    tags: ['x-test'],
                    'x-swgg-operationIdFromPath': true
                } },
                // test default-param handling-behavior
                '/x-test/paramDefault/{paramPath}': { post: {
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
                        // test array-default-param handling-behavior
                        collectionFormat: undefined,
                        default: ['aa', 'bb'],
                        description: 'default-array param',
                        in: 'query',
                        items: { type: 'string' },
                        name: 'paramArrayDefault',
                        type: 'array'
                    }, {
                        // test array-json-param handling-behavior
                        collectionFormat: 'json',
                        default: [0, 1],
                        description: 'json-array param',
                        in: 'query',
                        items: { type: 'integer' },
                        name: 'paramArrayJson',
                        type: 'array',
                        'x-swgg-example': [0, 1]
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
                        description: 'body-param',
                        in: 'body',
                        name: 'paramBody',
                        schema: { type: 'object' }
                    }, {
                        // test boolean-param handling-behavior
                        default: false,
                        description: 'boolean-param',
                        in: 'query',
                        name: 'paramBoolean',
                        type: 'boolean'
                    }, {
                        // test enum-multiple-param handling-behavior
                        // coverage-hack - test default multi-select handling-behavio
                        default: [1, 3],
                        description: 'enum-multiple-param',
                        enum: [0, 1, 2, 3],
                        in: 'query',
                        items: { type: 'integer' },
                        name: 'paramEnumMulti',
                        required: true,
                        type: 'array'
                    }, {
                        // test enum-single-param handling-behavior
                        description: 'enum-single-param',
                        enum: [0, 1, 2, 3],
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
                        type: 'integer',
                        'x-swgg-example': 0
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
                        type: 'string',
                        'x-swgg-apiKey': true,
                        'x-swgg-ref': 'x-test-param'
                    }, {
                        // test path-param handling-behavior
                        description: 'path-param',
                        in: 'path',
                        name: 'paramPath',
                        required: true,
                        type: 'string'
                    }, {
                        // test required-param handling-behavior
                        description: 'required-param',
                        in: 'query',
                        name: 'paramRequired',
                        required: true,
                        type: 'string'
                    }],
                    summary: 'test default-param handling-behavior',
                    tags: ['x-test']
                } },
                // test body-array-param handling-behavior
                '/x-test/paramBodyArray': { post: {
                    operationId: 'paramBodyArray',
                    parameters: [{
                        // test body-array-param handling-behavior
                        description: 'body-array-param',
                        in: 'body',
                        name: 'paramBodyArray',
                        schema: { items: { type: 'object' }, type: 'array' }
                    }],
                    summary: 'test body-array-param handling-behavior',
                    tags: ['x-test']
                } },
                // test body-string-param handling-behavior
                '/x-test/paramBodyString': { post: {
                    operationId: 'paramBodyString',
                    parameters: [{
                        // test body-string-param handling-behavior
                        description: 'body-string-param',
                        in: 'body',
                        name: 'paramBodyString',
                        schema: { type: 'string' }
                    }],
                    summary: 'test body-string-param handling-behavior',
                    tags: ['x-test']
                } },
                // test form-data-param handling-behavior
                '/x-test/paramFormData': { post: {
                    consumes: ['application/x-www-form-urlencoded'],
                    operationId: 'paramFormData',
                    parameters: [{
                        // test array-multi-param handling-behavior
                        collectionFormat: 'multi',
                        description: 'multi-array param',
                        in: 'formData',
                        items: { type: 'integer' },
                        name: 'paramArrayMulti',
                        type: 'array'
                    }, {
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
                    tags: ['x-test']
                } }
            },
            tags: [{
                name: 'x-test',
                description: 'internal test-api'
            }],
            'x-swgg-apiDict': {
                'file fileUploadManyByForm.2': {
                    _schemaName: 'File'
                },
                'x-test crudCountManyByQuery': {
                    _schemaName: 'TestCrud'
                },
                'x-test crudErrorDelete': {
                    _schemaName: 'TestCrud'
                },
                'x-test crudErrorGet': {
                    _schemaName: 'TestCrud'
                },
                'x-test crudErrorHead': {
                    _schemaName: 'TestCrud'
                },
                'x-test crudErrorLogin': {
                    _schemaName: 'TestCrud'
                },
                'x-test crudErrorOptions': {
                    _schemaName: 'TestCrud'
                },
                'x-test crudErrorPatch': {
                    _schemaName: 'TestCrud'
                },
                'x-test crudErrorPost': {
                    _schemaName: 'TestCrud'
                },
                'x-test crudErrorPre': {
                    _schemaName: 'TestCrud'
                },
                'x-test crudErrorPut': {
                    _schemaName: 'TestCrud'
                },
                'x-test crudGetManyByQuery': {
                    _schemaName: 'TestCrud'
                },
                'x-test crudGetOneById.id.id': {
                    _schemaName: 'TestCrud'
                },
                'x-test crudGetOneByQuery': {
                    _schemaName: 'TestCrud'
                },
                'x-test crudNullDelete': {
                    _schemaName: 'TestCrud'
                },
                'x-test crudNullGet': {
                    _schemaName: 'TestCrud'
                },
                'x-test crudNullHead': {
                    _schemaName: 'TestCrud'
                },
                'x-test crudNullOptions': {
                    _schemaName: 'TestCrud'
                },
                'x-test crudNullPatch': {
                    _schemaName: 'TestCrud'
                },
                'x-test crudNullPost': {
                    _schemaName: 'TestCrud'
                },
                'x-test crudNullPut': {
                    _schemaName: 'TestCrud'
                },
                'x-test crudRemoveManyByQuery': {
                    _schemaName: 'TestCrud'
                },
                'x-test crudRemoveOneById.id.id': {
                    _schemaName: 'TestCrud'
                },
                'x-test crudSetManyById': {
                    _schemaName: 'TestCrud'
                },
                'x-test crudSetOneById.id.id': {
                    _schemaName: 'TestCrud'
                },
                'x-test crudSetOneById.propStringUnique.propStringUnique': {
                    _schemaName: 'TestCrud'
                },
                'x-test crudUpdateOneById.id.id': {
                    _schemaName: 'TestCrud'
                }
            },
            "x-swgg-definitionsParameters": {
                'x-test-param': {}
            }
        });
        // test redundant http-body-parse-middleware handling-behavior
        local.middlewareList.push(local.middlewareBodyParse);
        // init test-middleware
        local.middlewareList.push(function (request, response, nextMiddleware) {
            switch (request.swgg.pathObject && request.swgg.pathObject.operationId) {
            case 'onErrorJsonapi':
                // test redundant onErrorJsonapi handling-behavior
                local.onErrorJsonapi(function (error, data) {
                    local.serverRespondJsonapi(request, response, error, data);
                })(
                    JSON.parse(request.swgg.paramDict.error || 'null'),
                    JSON.parse(request.swgg.paramDict.data || 'null')
                );
                break;
            case 'paramBodyArray':
            case 'paramBodyString':
            case 'paramDefault':
            case 'paramFormData':
                // test redundant onErrorJsonapi handling-behavior
                local.serverRespondJsonapi(request, response, null, request.swgg.paramDict);
                break;
            default:
                // serve file
                local.middlewareFileServer(request, response, nextMiddleware);
            }
        });
        // init db
        local.dbSeedTestList = [{
            dbRowList: local.dbRowListRandomCreate({
                // init 100 extra random objects
                length: 100,
                dbRowList: [{
                    id: 'testCase_crudCountManyByQuery_default',
                    propRequired: true
                }, {
                    id: 'testCase_crudGetManyByQuery_default',
                    propRequired: true
                }, {
                    id: 'testCase_crudGetOneById_default',
                    propRequired: true
                }, {
                    id: 'testCase_crudGetOneByQuery_default',
                    propRequired: true
                }],
                override: function (options) {
                    return {
                        id: 'testCase_dbRowListRandomCreate_' + (options.ii + 100)
                    };
                },
                properties: local.swaggerJson.definitions.TestCrud.properties
            }),
            idIndexCreateList: [{
                name: 'id'
            }, {
                name: 'propStringUnique'
            }],
            name: 'TestCrud'
        }, {
            dbRowList: [{
                id: 'testCase_fileGetOneById_default',
                fileBlob: local.templateSwaggerUiLogoSmallBase64,
                fileContentType: 'image/png',
                propRequired: true
            }, {
                id: 'testCase_ui_fileMedia_audioNull',
                fileBlob: '',
                fileContentType: 'audio/wav',
                fileDescription: 'null audio file',
                fileFilename: 'testCase_ui_fileMedia_audioNull.wav'
            }, {
                id: 'testCase_ui_fileMedia_imageNull',
                fileBlob: '',
                fileContentType: 'image/bmp',
                fileDescription: 'null image file',
                fileFilename: 'testCase_ui_fileMedia_imageNull.wav'
            }, {
                id: 'testCase_ui_fileMedia_videoNull',
                fileBlob: '',
                fileContentType: 'video/mpeg',
                fileDescription: 'null video file',
                fileFilename: 'testCase_ui_fileMedia_videoNull.mpg'
            }],
            idIndexCreateList: [{
                name: 'id'
            }],
            name: 'File'
        }];
        // run validation test
        local.testCase_validateByParamDefList_default(null, local.onErrorDefault);
        local.testCase_validateByParamDefList_error(null, local.onErrorDefault);
        local.testCase_validateByParamDefList_formData(null, local.onErrorDefault);
        local.testCase_validateBySchema_default(null, local.onErrorDefault);
        local.testCase_validateBySchema_error(null, local.onErrorDefault);
        local.testCase_validateBySwagger_default(null, local.onErrorDefault);
    }());
}());
