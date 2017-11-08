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
                    crudGetOneById: local.apiDict['operationId.getPetById'],
                    crudRemoveOneById: local.apiDict['operationId.deletePet'],
                    crudSetOneById: local.apiDict['operationId.addPet'],
                    crudType: ['undefined', 'petId', 'id'],
                    crudUpdateOneById: local.apiDict['operationId.updatePetWithForm']
                });
                break;
            case 'store':
                local.objectSetDefault(options, {
                    crudGetOneById: local.apiDict['operationId.getOrderById'],
                    crudRemoveOneById: local.apiDict['operationId.deleteOrder'],
                    crudSetOneById: local.apiDict['operationId.placeOrder'],
                    crudType: ['undefined', 'orderId', 'id'],
                    crudUpdateOneById: local.apiDict['operationId.store.crudUpdateOneById.id.id']
                });
                break;
            case 'user':
                local.objectSetDefault(options, {
                    crudGetOneById: local.apiDict['operationId.getUserByName'],
                    crudRemoveOneById: local.apiDict['operationId.deleteUser'],
                    crudSetOneById: local.apiDict['operationId.createUser'],
                    crudType: ['undefined', 'username', 'username'],
                    crudUpdateOneById: local.apiDict['operationId.updateUser']
                });
                break;
            default:
                Object.keys(local.apiDict).forEach(function (key) {
                    key.replace((/^operationId\.x-test\.(\w+)/), function (match0, match1) {
                        match0 = match1;
                        options[match0] = options[match0] || local.apiDict[key];
                    });
                });
                local.objectSetDefault(options, { crudType: ['undefined', 'id', 'id'] });
            }
            local.idNameInit(options);
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
            [{
                // test 404 undefined-api-error-1 handling-behavior
                statusCode: 404,
                url: '/api/v0/x-test/errorUndefined'
            }, {
                // test 404 undefined-api-error-2 handling-behavior
                statusCode: 404,
                url: '/api/v0/x-test/errorUndefinedApi'
            }, {
                method: 'POST',
                // test 400 param-parse-error handling-behavior
                statusCode: 400,
                url: '/api/v0/x-test/parametersDefault/aa?typeStringFormatJson=syntax%20error'
            }, {
                // test 404 undefined-map-file handling-behavior
                statusCode: 404,
                url: '/api/v0/x-test/undefined.map'
            }].forEach(function (options) {
                onParallel.counter += 1;
                local.ajax(options, function (error, xhr) {
                    // validate error occurred
                    local.assert(error, options);
                    // validate statusCode
                    local.assertJsonEqual(error.statusCode, options.statusCode);
                    // validate error is in jsonapi-format
                    if (options.url === '/api/v0/x-test/parametersDefault/aa' +
                            '?typeStringFormatJson=syntax%20error') {
                        error = JSON.parse(xhr.responseText);
                        local.assert(error.errors[0], error);
                    }
                    onParallel();
                });
            });
            onParallel(null, options);
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
            }].forEach(function (options) {
                onParallel.counter += 1;
                // test crudCreateReplaceUpdateRemoveOne's default handling-behavior
                local.testCase_crudCreateReplaceUpdateRemoveOne_default(options, onParallel);
            });
            onParallel(null, options);
        };

        local.testCase_crudCreateReplaceUpdateRemoveOne_default = function (options, onError) {
        /*
         * this function will test crudCreateReplaceUpdateRemoveOne's default handling-behavior
         */
            options = local.crudOptionsSetDefault(options, { data: {} });
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
                'operationId.x-test.crudErrorDelete',
                'operationId.x-test.crudErrorGet',
                'operationId.x-test.crudErrorHead',
                'operationId.x-test.crudErrorLogin',
                'operationId.x-test.crudErrorOptions',
                'operationId.x-test.crudErrorPatch',
                'operationId.x-test.crudErrorPost',
                'operationId.x-test.crudErrorPre',
                'operationId.x-test.crudErrorPut'
            ].forEach(function (key) {
                onParallel.counter += 1;
                options = {};
                local.apiDict[key].ajax(options, function (error, data) {
                    // validate error occurred
                    local.assert(error, error);
                    // validate statusCode
                    local.assertJsonEqual(data.statusCode, 500);
                    onParallel();
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
                        data.responseJson.data[0][options.idBackend] === options.idValue,
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
                        data.responseJson.data[0][options.idBackend] === options.idValue,
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
                        data.responseJson.data[0][options.idBackend] === options.idValue,
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
                'operationId.x-test.crudNullDelete',
                'operationId.x-test.crudNullGet',
                'operationId.x-test.crudNullHead',
                'operationId.x-test.crudNullOptions',
                'operationId.x-test.crudNullPatch',
                'operationId.x-test.crudNullPost',
                'operationId.x-test.crudNullPut'
            ].forEach(function (key) {
                onParallel.counter += 1;
                local.apiDict[key].ajax(options, onParallel);
            });
            onParallel(null, options);
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
                            typeBooleanRequired: true
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
                                typeBooleanRequired: true
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
                    typeBooleanRequired: true
                }, {
                    id: 'testCase_crudSetManyById_default_2',
                    typeBooleanRequired: true
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
                dataValidateReplace: { typeBooleanRequired: true }
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
                dataValidateUpdate1: { typeBooleanRequired: true },
                dataValidateUpdate2: { typeBooleanRequired: false }
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
                                typeBooleanRequired: true
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
                    local.apiDict['operationId.file.fileGetOneById.id.id'].ajax({
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
                    local.apiDict['operationId.file.fileGetOneById.id.id'].ajax({
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
                    local.apiDict['operationId.file.fileUploadManyByForm.2'].ajax({
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
                    local.apiDict['operationId.file.fileUploadManyByForm.2'].ajax(
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
                local.apiDict['operationId.x-test.onErrorJsonapi'].ajax({
                    paramDict: { data: JSON.stringify(options) }
                }, function (error, data) {
                    // validate no error occurred
                    local.assert(!error, error);
                    // validate data
                    local.assertJsonEqual(data.responseJson.data[0], 'hello');
                    onParallel();
                });
            });
            onParallel(null, options);
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
            local.apiDict['operationId.x-test.onErrorJsonapi'].ajax(options, function (
                error,
                data
            ) {
                // validate no error occurred
                local.assert(!error, error);
                // validate data
                local.assertJsonEqual(data.responseJson.data[0], undefined);
                onParallel();
            });
            options = { paramDict: { error: '[]' } };
            onParallel.counter += 1;
            local.apiDict['operationId.x-test.onErrorJsonapi'].ajax(options, function (
                error,
                data
            ) {
                // validate error occurred
                local.assert(error, error);
                // validate error
                local.assert(data.responseJson.errors[0].message === 'null', error);
                onParallel();
            });
            onParallel(null, options);
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
                local.apiDict['operationId.x-test.onErrorJsonapi'].ajax(options, function (
                    error,
                    data
                ) {
                    // validate error occurred
                    local.assert(error, error);
                    // validate error
                    local.assert(data.responseJson.errors[0].message === 'hello', error);
                    onParallel();
                });
            });
            onParallel(null, options);
        };

        local.testCase_petstoreStoreGetInventory_default = function (options, onError) {
        /*
         * this function will test petstoreStoreGetInventory's default handling-behavior
         */
            options = {};
            local.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    local.apiDict['operationId.getInventory'].ajax(options, options.onNext);
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
                    local.apiDict['operationId.x-test.crudNullGet'].ajax({}, onNext);
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

        local.testCase_validateBySwaggerJson_default = function (options, onError) {
        /*
         * this function will test validateBySwaggerJson's default handling-behavior
         */
            // test default handling-behavior
            local.validateBySwaggerJson({ swaggerJson: {
                info: { title: '', version: '' },
                paths: { '/aa': { get: { responses: { 200: { description: '' } } } } },
                swagger: '2.0'
            } });
            // test error handling-behavior
            // 5.4. Validation keywords for objects
            // 5.5. Validation keywords for any instance type
            [null, undefined, {}, {
                // swagger-validate items-required-for-array-objects
                info: { title: '', version: '' },
                paths: { '/aa': { get: { responses: { 200: { description: '' } } } } },
                swagger: '2.0',
                type: 'array'
            }, {
                // test circularList-error handling-behavior
                info: { title: '', version: '' },
                paths: { '/aa': { get: { responses: { 200: { $ref: '#/x-test/aa' } } } } },
                'x-test': { aa: { $ref: '#/x-test/aa' } },
                swagger: '2.0'
            }, {
                // test $ref-error handling-behavior
                info: { title: '', version: '' },
                paths: { '/aa': { get: { responses: { 200: { $ref: 'undefined' } } } } },
                swagger: '2.0'
            }, {
                // 5.4.4. additionalProperties, properties and patternProperties
                aa: true,
                info: { title: '', version: '' },
                paths: { '/aa': { get: { responses: { 200: { description: '' } } } } },
                swagger: '2.0'
            }, {
                // 5.4.5. dependencies
                exclusiveMaximum: true,
                info: { title: '', version: '' },
                paths: { '/aa': { get: { responses: { 200: { description: '' } } } } },
                swagger: '2.0'
            }, {
                // 5.5.5. oneOf
                info: { title: '', version: '' },
                paths: { '/aa': { get: { responses: { 200: { description: '' } } } } },
                securityDefinitions: { aa: true },
                swagger: '2.0'
            }, {
                // 5.5.6. not
                info: { title: '', version: '' },
                paths: { '/aa': { get: { responses: { 'x-': true } } } },
                swagger: '2.0'
            }].forEach(function (element) {
                local.tryCatchOnError(function () {
                    local.validateBySwaggerJson({ swaggerJson: element });
                }, local.nop);
                // validate error occurred
                local.assert(local.utility2._debugTryCatchErrorCaught, element);
            });
            onError(null, options);
        };

        local.testCase_validateBySwaggerParameters_default = function (options, onError) {
        /*
         * this function will test validateBySwaggerParameters's default handling-behavior
         */
            var onParallel;
            onParallel = local.onParallel(onError);
            onParallel.counter += 1;
            Object.keys(local.apiDict).forEach(function (key) {
                if (key.indexOf('x-test.parameters') < 0) {
                    return;
                }
                onParallel.counter += 1;
                local.apiDict[key].ajax({}, function (error, data) {
                    // validate no error occurred
                    local.assert(!error, error);
                    // validate data
                    data = data.paramDict;
                    local.assert(data, data);
                    onParallel(null, options);
                });
            });
            onParallel(null, options);
        };

        local.testCase_validateBySwaggerParameters_error = function (options, onError) {
        /*
         * this function will test validateBySwaggerParameters's error handling-behavior
         */
            var onParallel;
            onParallel = local.onParallel(onError);
            onParallel.counter += 1;
            [
                // 5.1. Validation keywords for numeric instances (number and integer)
                // 5.1.1. multipleOf
                { typeInteger1: 1 },
                // 5.1.2. maximum and exclusiveMaximum - maximum
                { typeInteger1: 10 },
                // 5.1.2. maximum and exclusiveMaximum - exclusiveMaximum
                { typeInteger2: 10 },
                // 5.1.3. minimum and exclusiveMinimum - minimum
                { typeInteger1: -10 },
                // 5.1.3. minimum and exclusiveMinimum - exclusiveMinimum
                { typeInteger2: -10 },
                // 5.2. Validation keywords for strings
                // 5.2.1. maxLength
                { typeString1: '01234567890123456789' },
                // 5.2.2. minLength
                { typeString1: '' },
                // 5.2.3. pattern
                { typeString1: '0123456789012345~' },
                // 5.3. Validation keywords for arrays
                // 5.3.2. maxItems
                { typeArrayItemsNumber2: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
                // 5.3.2. minItems
                { typeArrayItemsNumber2: [] },
                // 5.3.4. uniqueItems
                { typeArrayItemsNumber2: [0, 0] },
                // 5.5. Validation keywords for any instance type
                // 5.5.1. enum
                { typeNumberEnum: 0 },
                // 5.5.2. type - type
                { typeString0: true },
                // 5.5.2. type - byte
                { typeStringFormatByte: '~' }
                // 5.5.3. allOf
                // 5.5.4. anyOf
                // 5.5.5. oneOf
                // testCase_validateBySwaggerJson_default
                // 5.5.6. not
                // testCase_validateBySwaggerJson_default
                // 5.5.7. definitions
            ].forEach(function (paramDict) {
                onParallel.counter += 1;
                local.apiDict['operationId.x-test.parametersDefault'].ajax({
                    paramDict: local.jsonCopy(paramDict)
                }, function (error) {
                    // validate error occurred
                    local.assert(error, JSON.stringify(paramDict));
                    // validate statusCode
                    local.assertJsonEqual(error.statusCode, 400);
                    onParallel(null, options);
                });
            });
            [
                // 5.4. Validation keywords for objects
                // 5.4.1. maxProperties
                { body: {
                    typeBooleanRequired: true,
                    typeObjectMisc: { aa: 1, bb: 2, cc: 3, dd: 4, de: 5, ff: 6 }
                } },
                // 5.4.2. minProperties
                { body: {
                    typeBooleanRequired: true,
                    typeObjectMisc: {}
                } },
                // 5.4.3. required
                { body: {} }
                // 5.4.4. additionalProperties, properties and patternProperties
                // testCase_validateBySwaggerJson_default
                // 5.4.5. dependencies
                // testCase_validateBySwaggerJson_default
            ].forEach(function (paramDict) {
                onParallel.counter += 1;
                local.apiDict['operationId.x-test.parametersObjectInBody'].ajax({
                    paramDict: local.jsonCopy(paramDict)
                }, function (error) {
                    // validate error occurred
                    local.assert(error, JSON.stringify(paramDict));
                    // validate statusCode
                    local.assertJsonEqual(error.statusCode, 400);
                    onParallel(null, options);
                });
            });
            onParallel(null, options);
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
            // test null-case handling-behavior
            options.data = local.uiNotify();
            // validate no error occurred
            local.assert(!options.data.classList.contains('error'), options.data.classList);
            // test error handling-behavior
            options.data = local.uiNotify(local.errorDefault);
            // validate error occurred
            local.assert(options.data.classList.contains('error'), options.data.classList);
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
            document.querySelector('#swgg_id_typeString0 .input').value = '';
            // test onEventOperationAjax's error handling-behavior
            document.querySelector('#swgg_id_typeNumber0 .input').value = 'syntax error';
            document.querySelector('#swgg_id_x_test_parametersDefault .onEventOperationAjax')
                .click();
            // test onEventUiReload's key handling-behavior
            onParallel.counter += 1;
            local.uiEventListenerDict['.onEventUiReload']({
                swggInit: true,
                target: { id: 'swggApiKeyInput1' },
                type: 'keyup'
            });
            onParallel();
            onParallel(null, options);
        };

        local.testCase_ui_fileMedia = function (options, onError) {
        /*
         * this function will test ui's fileMedia handling-behavior
         */
            options = [
                'testCase_ui_fileMedia_audioNull',
                'testCase_ui_fileMedia_imageNull',
                'testCase_ui_fileMedia_videoNull'
            ];
            options.forEach(function (id) {
                document.querySelector('#swgg_id_file_fileGetOneById_id_id .input').value = id;
                document.querySelector('#swgg_id_file_fileGetOneById_id_id .onEventOperationAjax')
                    .click();
            });
            onError(null, options);
        };
        break;
    }



    // run shared js-env code - init-after
    (function () {
        // test apiUpdate's root-basePath handling-behavior
        local.apiUpdate({ basePath: '/' });
        local.assertJsonEqual(local.swaggerJsonBasePath, '');
        // test apiUpdate's $npm_package_swggTags0 handling-behavior
        local.testMock([
            [local.env, { npm_package_swggTags0: 'x-test-tags0-filter' }]
        ], function (onError) {
            local.apiUpdate({
                definitions: { Aa: {}, Bb: { 'x-swgg-tags0': 'undefined' } },
                // test operationId's auto-create handling-behavior
                paths: {
                    '/x-test/tags0Filter': { get: { tags: ['x-test'] } },
                    '/x-test/tags0FilterUndefined': { get: { 'x-swgg-tags0': 'undefined' } }
                },
                tags: [{}, { 'x-swgg-tags0': 'undefined' }],
                'x-swgg-tags0-override': {}
            });
            onError();
        }, local.onErrorThrow);
        // init assets
/* jslint-ignore-begin */
local.assetsDict['/assets.swgg.swagger.test.json'] =
{
    "basePath": "/api/v0",
    "definitions": {
        "TestCrud": {
            "properties": {
                "_id": {
                    "readOnly": true,
                    "type": "string"
                },
                "_timeCreated": {
                    "format": "date-time",
                    "readOnly": true,
                    "type": "string"
                },
                "_timeUpdated": {
                    "format": "date-time",
                    "readOnly": true,
                    "type": "string"
                },
                "id": {
                    "type": "string"
                }
            },
            "required": [
                "typeBooleanRequired"
            ],
            "type": "object"
        },
        "TestMisc": {
            "properties": {
                "typeBooleanRequired": {
                    "$ref": "#/parameters/typeBooleanRequired"
                },
                "typeObjectMisc": {
                    "maxProperties": 5,
                    "minProperties": 1,
                    "type": "object"
                }
            },
            "required": [
                "typeBooleanRequired"
            ],
            "type": "object"
        },
        "onErrorJsonapi": {
            "properties": {
                "data": {
                    "type": "object"
                },
                "error": {
                    "default": {},
                    "type": "object"
                }
            }
        }
    },
    "info": {
        "x-swgg-downloadStandaloneApp": "http://kaizhu256.github.io/node-swgg/build..beta..travis-ci.org/app/assets.app.js"
    },
    "parameters": {
        "typeArrayItemsBoolean1": {
            "default": [
                false,
                true
            ],
            "in": "query",
            "items": {
                "type": "boolean"
            },
            "name": "typeArrayItemsBoolean1",
            "required": true,
            "type": "array"
        },
        "typeArrayItemsInteger1": {
            "default": [
                0,
                1
            ],
            "in": "query",
            "items": {
                "type": "integer"
            },
            "name": "typeArrayItemsInteger1",
            "required": true,
            "type": "array"
        },
        "typeArrayItemsNumber0": {
            "in": "query",
            "items": {
                "type": "number"
            },
            "name": "typeArrayItemsNumber0",
            "type": "array"
        },
        "typeArrayItemsNumber1": {
            "default": [
                0.5,
                1.5
            ],
            "in": "query",
            "items": {
                "type": "number"
            },
            "name": "typeArrayItemsNumber1",
            "required": true,
            "type": "array"
        },
        "typeArrayItemsNumber2": {
            "default": [
                0.5,
                1.5
            ],
            "in": "query",
            "items": {
                "type": "number"
            },
            "maxItems": 5,
            "minItems": 1,
            "name": "typeArrayItemsNumber2",
            "required": true,
            "type": "array",
            "uniqueItems": true
        },
        "typeArrayItemsNumberCollectionFormatCsv": {
            "collectionFormat": "csv",
            "default": [
                0.5,
                1.5
            ],
            "in": "query",
            "items": {
                "type": "number"
            },
            "name": "typeArrayItemsNumberCollectionFormatCsv",
            "required": true,
            "type": "array"
        },
        "typeArrayItemsNumberCollectionFormatJson": {
            "default": [
                0.5,
                1.5
            ],
            "in": "query",
            "items": {
                "type": "number"
            },
            "name": "typeArrayItemsNumberCollectionFormatJson",
            "required": true,
            "type": "array",
            "x-swgg-collectionFormat": "json"
        },
        "typeArrayItemsNumberCollectionFormatMultiInFormData": {
            "collectionFormat": "multi",
            "default": [
                0.5,
                1.5
            ],
            "in": "formData",
            "items": {
                "type": "number"
            },
            "name": "typeArrayItemsNumberCollectionFormatMultiInFormData",
            "required": true,
            "type": "array"
        },
        "typeArrayItemsNumberCollectionFormatPipes": {
            "collectionFormat": "pipes",
            "default": [
                0.5,
                1.5
            ],
            "in": "query",
            "items": {
                "type": "number"
            },
            "name": "typeArrayItemsNumberCollectionFormatPipes",
            "required": true,
            "type": "array"
        },
        "typeArrayItemsNumberCollectionFormatSsv": {
            "collectionFormat": "ssv",
            "default": [
                0.5,
                1.5
            ],
            "in": "query",
            "items": {
                "type": "number"
            },
            "name": "typeArrayItemsNumberCollectionFormatSsv",
            "required": true,
            "type": "array"
        },
        "typeArrayItemsNumberCollectionFormatTsv": {
            "collectionFormat": "tsv",
            "default": [
                0.5,
                1.5
            ],
            "in": "query",
            "items": {
                "type": "number"
            },
            "name": "typeArrayItemsNumberCollectionFormatTsv",
            "required": true,
            "type": "array"
        },
        "typeArrayItemsNumberEnum": {
            "default": [
                0.5,
                1.5
            ],
            "enum": [
                0.5,
                1.5
            ],
            "in": "query",
            "items": {
                "type": "number"
            },
            "name": "typeArrayItemsNumberEnum",
            "required": true,
            "type": "array"
        },
        "typeArrayItemsString1": {
            "default": [
                "aa",
                "bb"
            ],
            "in": "query",
            "items": {
                "type": "string"
            },
            "name": "typeArrayItemsString1",
            "required": true,
            "type": "array"
        },
        "typeArrayItemsStringCollectionFormatMulti": {
            "collectionFormat": "multi",
            "default": [
                "aa",
                "bb"
            ],
            "in": "query",
            "items": {
                "type": "string"
            },
            "name": "typeArrayItemsStringCollectionFormatMulti",
            "required": true,
            "type": "array"
        },
        "typeBoolean0": {
            "in": "query",
            "name": "typeBoolean0",
            "type": "boolean"
        },
        "typeBooleanRequired": {
            "default": true,
            "in": "query",
            "name": "typeBooleanRequired",
            "required": true,
            "type": "boolean"
        },
        "typeInteger0": {
            "in": "query",
            "name": "typeInteger0",
            "type": "integer"
        },
        "typeInteger1": {
            "default": 2,
            "in": "query",
            "maximum": 3,
            "minimum": 1,
            "multipleOf": 2,
            "name": "typeInteger1",
            "type": "integer"
        },
        "typeInteger2": {
            "default": 2,
            "exclusiveMaximum": true,
            "exclusiveMinimum": true,
            "in": "query",
            "maximum": 3,
            "minimum": 1,
            "multipleOf": 2,
            "name": "typeInteger2",
            "type": "integer"
        },
        "typeNumber0": {
            "in": "query",
            "name": "typeNumber0",
            "type": "number"
        },
        "typeNumber1": {
            "default": -1.5,
            "exclusiveMaximum": true,
            "in": "query",
            "maximum": -1,
            "multipleOf": 0.5,
            "name": "typeNumber1",
            "type": "number"
        },
        "typeNumber2": {
            "default": 1.5,
            "exclusiveMinimum": true,
            "in": "query",
            "minimum": 1,
            "multipleOf": 0.5,
            "name": "typeNumber2",
            "type": "number"
        },
        "typeNumberEnum": {
            "enum": [
                0.5,
                1.5
            ],
            "in": "query",
            "name": "typeNumberEnum",
            "type": "number"
        },
        "typeNumberFormatDouble": {
            "default": 0.5,
            "format": "double",
            "in": "query",
            "name": "typeNumberFormatDouble",
            "type": "number"
        },
        "typeNumberFormatFloat": {
            "default": 0.5,
            "format": "float",
            "in": "query",
            "name": "typeNumberFormatFloat",
            "type": "number"
        },
        "typeString0": {
            "in": "query",
            "name": "typeString0",
            "type": "string"
        },
        "typeString1": {
            "default": "0123456789012345",
            "in": "query",
            "maxLength": 19,
            "minLength": 15,
            "name": "typeString1",
            "pattern": "^\\w*?$",
            "required": true,
            "type": "string"
        },
        "typeStringApiKey": {
            "in": "query",
            "name": "typeStringApiKey",
            "type": "string",
            "x-swgg-apiKey": true
        },
        "typeStringFormatBinary": {
            "default": [
                0
            ],
            "format": "binary",
            "in": "query",
            "name": "typeStringFormatBinary",
            "type": "string"
        },
        "typeStringFormatByte": {
            "default": "AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn8=",
            "format": "byte",
            "in": "query",
            "name": "typeStringFormatByte",
            "type": "string"
        },
        "typeStringFormatDate": {
            "default": "1970.01.01",
            "format": "date",
            "in": "query",
            "name": "typeStringFormatDate",
            "type": "string"
        },
        "typeStringFormatEmail": {
            "default": "q@q.com",
            "format": "email",
            "in": "query",
            "name": "typeStringFormatEmail",
            "type": "string"
        },
        "typeStringFormatJson": {
            "default": "{}",
            "format": "json",
            "in": "query",
            "name": "typeStringFormatJson",
            "type": "string"
        },
        "typeStringFormatPhone": {
            "default": "+123 (1234) 1234-1234",
            "format": "phone",
            "in": "query",
            "name": "typeStringFormatPhone",
            "type": "string"
        },
        "typeStringInHeader": {
            "default": "aa",
            "in": "header",
            "name": "typeStringInHeader",
            "required": true,
            "type": "string"
        },
        "typeStringInPath": {
            "default": "aa",
            "in": "path",
            "name": "typeStringInPath",
            "required": true,
            "type": "string"
        }
    },
    "paths": {
        "/x-test/errorUndefinedApi": {
            "get": {
                "operationId": "x-test.errorUndefinedApi",
                "summary": "test undefined-api handling-behavior",
                "tags": [
                    "x-test"
                ]
            }
        },
        "/x-test/onErrorJsonapi": {
            "get": {
                "operationId": "x-test.onErrorJsonapi",
                "parameters": [
                    {
                        "description": "data param",
                        "format": "json",
                        "in": "query",
                        "name": "data",
                        "type": "string"
                    },
                    {
                        "description": "error param",
                        "format": "json",
                        "in": "query",
                        "name": "error",
                        "type": "string"
                    }
                ],
                "summary": "test onErrorJsonapi handling-behavior",
                "tags": [
                    "x-test"
                ]
            }
        },
        "/x-test/parametersDefault/{typeStringInPath}": {
            "post": {
                "consumes": [
                    "application/x-www-form-urlencoded"
                ],
                "operationId": "x-test.parametersDefault",
                "parameters": [],
                "summary": "test parameters' default handling-behavior",
                "tags": [
                    "x-test"
                ]
            }
        },
        "/x-test/parametersObjectInBody": {
            "post": {
                "operationId": "x-test.parametersObjectInBody",
                "parameters": [
                    {
                        "description": "TestMisc object",
                        "in": "body",
                        "name": "body",
                        "schema": {
                            "$ref": "#/definitions/TestMisc"
                        }
                    }
                ],
                "summary": "test parameters' array-in-body handling-behavior",
                "tags": [
                    "x-test"
                ]
            }
        },
        "/x-test/parametersStringInBody": {
            "post": {
                "consumes": [
                    "application/x-www-form-urlencoded"
                ],
                "operationId": "x-test.parametersStringInBody",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "summary": "test parameters' string-in-body handling-behavior",
                "tags": [
                    "x-test"
                ]
            }
        }
    },
    "swagger": "2.0",
    "tags": [
        {
            "description": "internal test-api",
            "name": "x-test"
        }
    ],
    "x-swgg-apiDict": {
        "operationId.file.fileUploadManyByForm.2": {
            "_schemaName": "File"
        },
        "operationId.x-test.crudCountManyByQuery": {
            "_schemaName": "TestCrud"
        },
        "operationId.x-test.crudErrorDelete": {
            "_schemaName": "TestCrud"
        },
        "operationId.x-test.crudErrorGet": {
            "_schemaName": "TestCrud"
        },
        "operationId.x-test.crudErrorHead": {
            "_schemaName": "TestCrud"
        },
        "operationId.x-test.crudErrorLogin": {
            "_schemaName": "TestCrud"
        },
        "operationId.x-test.crudErrorOptions": {
            "_schemaName": "TestCrud"
        },
        "operationId.x-test.crudErrorPatch": {
            "_schemaName": "TestCrud"
        },
        "operationId.x-test.crudErrorPost": {
            "_schemaName": "TestCrud"
        },
        "operationId.x-test.crudErrorPre": {
            "_schemaName": "TestCrud"
        },
        "operationId.x-test.crudErrorPut": {
            "_schemaName": "TestCrud"
        },
        "operationId.x-test.crudGetManyByQuery": {
            "_schemaName": "TestCrud"
        },
        "operationId.x-test.crudGetOneById.id.id": {
            "_schemaName": "TestCrud"
        },
        "operationId.x-test.crudGetOneByQuery": {
            "_schemaName": "TestCrud"
        },
        "operationId.x-test.crudNullDelete": {
            "_schemaName": "TestCrud"
        },
        "operationId.x-test.crudNullGet": {
            "_schemaName": "TestCrud"
        },
        "operationId.x-test.crudNullHead": {
            "_schemaName": "TestCrud"
        },
        "operationId.x-test.crudNullOptions": {
            "_schemaName": "TestCrud"
        },
        "operationId.x-test.crudNullPatch": {
            "_schemaName": "TestCrud"
        },
        "operationId.x-test.crudNullPost": {
            "_schemaName": "TestCrud"
        },
        "operationId.x-test.crudNullPut": {
            "_schemaName": "TestCrud"
        },
        "operationId.x-test.crudRemoveManyByQuery": {
            "_schemaName": "TestCrud"
        },
        "operationId.x-test.crudRemoveOneById.id.id": {
            "_schemaName": "TestCrud"
        },
        "operationId.x-test.crudSetManyById": {
            "_schemaName": "TestCrud"
        },
        "operationId.x-test.crudSetOneById.id.id": {
            "_schemaName": "TestCrud"
        },
        "operationId.x-test.crudUpdateOneById.id.id": {
            "_schemaName": "TestCrud"
        }
    }
}
;
/* jslint-ignore-end */
        Object.keys(
            local.assetsDict['/assets.swgg.swagger.test.json'].parameters
        ).forEach(function (key) {
            local.assertJsonEqual(
                key,
                local.assetsDict['/assets.swgg.swagger.test.json'].parameters[key].name
            );
            local.assetsDict['/assets.swgg.swagger.test.json']
                .paths['/x-test/parametersDefault/{typeStringInPath}']
                .post
                .parameters
                .push({ $ref: '#/parameters/' + key });
            local.assetsDict['/assets.swgg.swagger.test.json']
                .definitions
                .TestCrud
                .properties[key] = { $ref: '#/parameters/' + key };
        });
        local.assetsDict['/assets.swgg.swagger.test.json'] = JSON.stringify(
            local.assetsDict['/assets.swgg.swagger.test.json']
        );
        // init test-api
        local.apiUpdate(JSON.parse(local.assetsDict['/assets.swgg.swagger.test.json']));
        // test redundant http-body-parse-middleware handling-behavior
        local.middlewareList.push(local.middlewareBodyParse);
        // init test-middleware
        local.middlewareList.push(function (request, response, nextMiddleware) {
            switch (request.swgg.operation && request.swgg.operation.operationId) {
            case 'x-test.onErrorJsonapi':
                // test redundant onErrorJsonapi handling-behavior
                local.onErrorJsonapi(function (error, data) {
                    local.serverRespondJsonapi(request, response, error, data);
                })(
                    JSON.parse(request.swgg.paramDict.error || 'null'),
                    JSON.parse(request.swgg.paramDict.data || 'null')
                );
                break;
            case 'x-test.parametersDefault':
            case 'x-test.parametersObjectInBody':
            case 'x-test.parametersStringInBody':
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
            // test dbRowListRandomCreate's default handling-behavior
            dbRowList: local.dbRowListRandomCreate({
                // init 100 extra random objects
                length: 100,
                dbRowList: [{
                    id: 'testCase_crudCountManyByQuery_default',
                    typeBooleanRequired: true
                }, {
                    id: 'testCase_crudGetManyByQuery_default',
                    typeBooleanRequired: true
                }, {
                    id: 'testCase_crudGetOneById_default',
                    typeBooleanRequired: true
                }, {
                    id: 'testCase_crudGetOneByQuery_default',
                    typeBooleanRequired: true
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
            }],
            name: 'TestCrud'
        }, {
            dbRowList: [{
                id: 'testCase_fileGetOneById_default',
                fileBlob: local.templateSwaggerUiLogoSmallBase64,
                fileContentType: 'image/png',
                typeBooleanRequired: true
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
        local.tryCatchOnError(function () {
            local.testCase_validateBySwaggerJson_default(null, local.onErrorDefault);
            local.testCase_validateBySwaggerParameters_default(null, local.onErrorDefault);
            local.testCase_validateBySwaggerParameters_error(null, local.onErrorDefault);
        }, console.error);
    }());
}());
