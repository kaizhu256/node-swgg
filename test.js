/* istanbul instrument in package swgg */
/* istanbul ignore next */
/* jslint utility2:true */
(function (globalThis) {
    "use strict";
    let consoleError;
    let local;
    // init globalThis
    globalThis.globalThis = globalThis.globalThis || globalThis;
    // init debug_inline
    if (!globalThis["debug\u0049nline"]) {
        consoleError = console.error;
        globalThis["debug\u0049nline"] = function (...argList) {
        /*
         * this function will both print <argList> to stderr
         * and return <argList>[0]
         */
            // debug argList
            globalThis["debug\u0049nlineArgList"] = argList;
            consoleError("\n\ndebug\u0049nline");
            consoleError.apply(console, argList);
            consoleError("\n");
            // return arg0 for inspection
            return argList[0];
        };
    }
    // init local
    local = {};
    local.local = local;
    globalThis.globalLocal = local;
    // init isBrowser
    local.isBrowser = (
        typeof globalThis.XMLHttpRequest === "function"
        && globalThis.navigator
        && typeof globalThis.navigator.userAgent === "string"
    );
    // init function
    local.assertOrThrow = function (passed, message) {
    /*
     * this function will throw err.<message> if <passed> is falsy
     */
        let err;
        if (passed) {
            return;
        }
        err = (
            (
                message
                && typeof message.message === "string"
                && typeof message.stack === "string"
            )
            // if message is errObj, then leave as is
            ? message
            : new Error(
                typeof message === "string"
                // if message is a string, then leave as is
                ? message
                // else JSON.stringify message
                : JSON.stringify(message, null, 4)
            )
        );
        throw err;
    };
    local.fsRmrfSync = function (dir) {
    /*
     * this function will sync "rm -rf" <dir>
     */
        let child_process;
        try {
            child_process = require("child_process");
        } catch (ignore) {
            return;
        }
        child_process.spawnSync("rm", [
            "-rf", dir
        ], {
            stdio: [
                "ignore", 1, 2
            ]
        });
    };
    local.fsWriteFileWithMkdirpSync = function (file, data) {
    /*
     * this function will sync write <data> to <file> with "mkdir -p"
     */
        let fs;
        try {
            fs = require("fs");
        } catch (ignore) {
            return;
        }
        // try to write file
        try {
            fs.writeFileSync(file, data);
        } catch (ignore) {
            // mkdir -p
            require("child_process").spawnSync(
                "mkdir",
                [
                    "-p", require("path").dirname(file)
                ],
                {
                    stdio: [
                        "ignore", 1, 2
                    ]
                }
            );
            // rewrite file
            fs.writeFileSync(file, data);
        }
    };
    local.functionOrNop = function (fnc) {
    /*
     * this function will if <fnc> exists,
     * return <fnc>,
     * else return <nop>
     */
        return fnc || local.nop;
    };
    local.nop = function () {
    /*
     * this function will do nothing
     */
        return;
    };
    local.objectAssignDefault = function (target, source) {
    /*
     * this function will if items from <target> are
     * null, undefined, or empty-string,
     * then overwrite them with items from <source>
     */
        target = target || {};
        Object.keys(source || {}).forEach(function (key) {
            if (
                target[key] === null
                || target[key] === undefined
                || target[key] === ""
            ) {
                target[key] = target[key] || source[key];
            }
        });
        return target;
    };
    local.value = function (val) {
    /*
     * this function will return <val>
     */
        return val;
    };
    local.valueOrEmptyList = function (val) {
    /*
     * this function will return <val> or []
     */
        return val || [];
    };
    local.valueOrEmptyObject = function (val) {
    /*
     * this function will return <val> or {}
     */
        return val || {};
    };
    local.valueOrEmptyString = function (val) {
    /*
     * this function will return <val> or ""
     */
        return val || "";
    };
    // require builtin
    if (!local.isBrowser) {
        local.assert = require("assert");
        local.buffer = require("buffer");
        local.child_process = require("child_process");
        local.cluster = require("cluster");
        local.crypto = require("crypto");
        local.dgram = require("dgram");
        local.dns = require("dns");
        local.domain = require("domain");
        local.events = require("events");
        local.fs = require("fs");
        local.http = require("http");
        local.https = require("https");
        local.net = require("net");
        local.os = require("os");
        local.path = require("path");
        local.querystring = require("querystring");
        local.readline = require("readline");
        local.repl = require("repl");
        local.stream = require("stream");
        local.string_decoder = require("string_decoder");
        local.timers = require("timers");
        local.tls = require("tls");
        local.tty = require("tty");
        local.url = require("url");
        local.util = require("util");
        local.vm = require("vm");
        local.zlib = require("zlib");
    }
}((typeof globalThis === "object" && globalThis) || (function () {
    return Function("return this")(); // jslint ignore:line
}())));



(function (local) {
"use strict";



// run shared js-env code - init-before
(function () {
// init local
local = globalThis.globalLocal.value(
    globalThis.utility2 || require("./assets.utility2.rollup.js")
).requireReadme();
globalThis.local = local;
// init test
local.testRunDefault(local);
}());



// run shared js-env code - function
(function () {
local.crudOptionsSetDefault = function (opt, defaults) {
/*
 * this function will set default-values for <opt>
 */
    opt = local.objectSetDefault(opt, defaults);
    switch (opt._tags0) {
    case "pet":
        local.objectSetDefault(opt, {
            crudGetOneById: local.apiDict["operationId.getPetById"],
            crudRemoveOneById: local.apiDict["operationId.deletePet"],
            crudSetOneById: local.apiDict["operationId.addPet"],
            crudType: [
                "undefined", "petId", "id"
            ],
            crudUpdateOneById: local.apiDict["operationId.updatePetWithForm"]
        });
        break;
    case "store":
        local.objectSetDefault(opt, {
            crudGetOneById: local.apiDict["operationId.getOrderById"],
            crudRemoveOneById: local.apiDict["operationId.deleteOrder"],
            crudSetOneById: local.apiDict["operationId.placeOrder"],
            crudType: [
                "undefined", "orderId", "id"
            ],
            crudUpdateOneById: local.apiDict[
                "operationId.store.crudUpdateOneById.id.id"
            ]
        });
        break;
    case "user":
        local.objectSetDefault(opt, {
            crudGetOneById: local.apiDict["operationId.getUserByName"],
            crudRemoveOneById: local.apiDict["operationId.deleteUser"],
            crudSetOneById: local.apiDict["operationId.createUser"],
            crudType: [
                "undefined", "username", "username"
            ],
            crudUpdateOneById: local.apiDict["operationId.updateUser"]
        });
        break;
    default:
        Object.keys(local.apiDict).forEach(function (key) {
            key.replace((
                /^operationId\.x-test\.(\w+)/
            ), function (ignore, match1) {
                opt[match1] = opt[match1] || local.apiDict[key];
            });
        });
        local.objectSetDefault(opt, {
            crudType: [
                "undefined", "id", "id"
            ]
        });
    }
    local.idNameInit(opt);
    // shallow-copy opt
    return local.objectSetDefault({}, opt);
};

local.testCase_ajax_err = function (opt, onError) {
/*
 * this function will test ajax's err handling-behavior
 */
    let onParallel;
    onParallel = local.onParallel(onError);
    onParallel.counter += 1;
    [
        {
            // test 404 undefined-api-error-1 handling-behavior
            statusCode: 404,
            url: "/api/v0/x-test/errorUndefined"
        }, {
            // test 404 undefined-api-error-2 handling-behavior
            statusCode: 404,
            url: "/api/v0/x-test/errorUndefinedApi"
        }, {
            method: "POST",
            // test 400 param-parse-error handling-behavior
            statusCode: 400,
            url: (
                "/api/v0/x-test/parametersDefault/aa"
                + "?typeStringFormatJson=syntax%20error"
            )
        }, {
            // test 404 undefined-map-file handling-behavior
            statusCode: 404,
            url: "/api/v0/x-test/undefined.map"
        }
    ].forEach(function (opt) {
        onParallel.counter += 1;
        local.ajax(opt, function (err, xhr) {
            // validate err occurred
            local.assertOrThrow(err, opt);
            // validate statusCode
            local.assertJsonEqual(err.statusCode, opt.statusCode);
            // validate err is in jsonapi-format
            if (
                opt.url === "/api/v0/x-test/parametersDefault/aa"
                + "?typeStringFormatJson=syntax%20error"
            ) {
                err = JSON.parse(xhr.responseText);
                local.assertOrThrow(err.errors[0], err);
            }
            onParallel();
        });
    });
    onParallel(null, opt);
};

local.testCase_buildApp_default = function (opt, onError) {
/*
 * this function will test buildApp's default handling-behavior
 */
    if (local.isBrowser) {
        onError(null, opt);
        return;
    }
    local.testCase_buildReadme_default(opt, local.onErrorThrow);
    local.testCase_buildLib_default(opt, local.onErrorThrow);
    local.testCase_buildTest_default(opt, local.onErrorThrow);
    local.buildApp({
        assetsList: [
            {
                file: "/assets.swagger-ui.logo.medium.png",
                url: "/assets.swagger-ui.logo.medium.png"
            }, {
                file: "/assets.swagger-ui.logo.small.png",
                url: "/assets.swagger-ui.logo.small.png"
            }
        ]
    }, onError);
};

local.testCase_crudCountManyByQuery_default = function (opt, onError) {
/*
 * this function will test crudCountManyByQuery's default handling-behavior
 */
    opt = local.crudOptionsSetDefault(opt, {
        idValue: "testCase_crudCountManyByQuery_default"
    });
    local.gotoNext(opt, function (err, data) {
        switch (opt.gotoState) {
        case 1:
            // ajax - crudCountManyByQuery
            opt.crudCountManyByQuery.ajax({
                paramDict: {
                    _queryWhere: JSON.stringify(opt.queryById)
                }
            }, opt.gotoNext);
            break;
        case 2:
            // validate data
            local.assertJsonEqual(data.responseJson.data.length, 1);
            local.assertOrThrow(
                data.responseJson.data[0] === 1,
                data.responseJson
            );
            opt.gotoNext();
            break;
        default:
            onError(err, data);
        }
    });
    opt.gotoState = 0;
    opt.gotoNext();
};

local.testCase_crudCreateReplaceUpdateRemoveMany_default = function (
    opt,
    onError
) {
/*
 * this function will test
 * crudCreateReplaceUpdateRemoveMany's default handling-behavior
 */
    let onParallel;
    onParallel = local.onParallel(onError);
    onParallel.counter += 1;
    [
        {
            _tags0: "x-test",
            data: {}
        }, {
            _tags0: "pet",
            data: {
                name: "name",
                photoUrls: [
                    "photoUrls"
                ]
            },
            dataValidateReplace: {
                name: "name",
                status: "available"
            },
            dataValidateUpdate1: {
                name: "name",
                status: "available"
            },
            dataValidateUpdate2: {
                status: "pending"
            }
        }, {
            _tags0: "store",
            data: {
                id: 10
            },
            dataValidateReplace: {
                petId: 10,
                status: "placed"
            },
            dataValidateUpdate1: {
                petId: 10,
                status: "placed"
            },
            dataValidateUpdate2: {
                status: "approved"
            }
        }, {
            _tags0: "user",
            data: {
                username: "testCase_crudCreateReplaceUpdateRemoveMany_default"
            },
            dataValidateReplace: {
                firstName: "firstName",
                userStatus: 1
            },
            dataValidateUpdate1: {
                firstName: "firstName",
                userStatus: 1
            },
            dataValidateUpdate2: {
                userStatus: 2
            }
        }
    ].forEach(function (opt) {
        onParallel.counter += 1;
        // test crudCreateReplaceUpdateRemoveOne's default handling-behavior
        local.testCase_crudCreateReplaceUpdateRemoveOne_default(
            opt,
            onParallel
        );
    });
    onParallel(null, opt);
};

local.testCase_crudCreateReplaceUpdateRemoveOne_default = function (
    opt,
    onError
) {
/*
 * this function will test
 * crudCreateReplaceUpdateRemoveOne's default handling-behavior
 */
    opt = local.crudOptionsSetDefault(opt, {
        data: {}
    });
    local.gotoNext(opt, function (err, data) {
        switch (opt.gotoState) {
        case 1:
            // test crudSetOneById's create handling-behavior
            local.testCase_crudSetOneById_default(opt, opt.gotoNext);
            break;
        case 2:
            // test crudSetOneById's replace handling-behavior
            local.testCase_crudSetOneById_default(opt, opt.gotoNext);
            break;
        case 3:
            // test crudUpdateOneById's default handling-behavior
            local.testCase_crudUpdateOneById_default(opt, opt.gotoNext);
            break;
        case 4:
            // test crudRemoveOneById's default handling-behavior
            local.testCase_crudRemoveOneById_default(opt, opt.gotoNext);
            break;
        default:
            onError(err, data);
        }
    });
    opt.gotoState = 0;
    opt.gotoNext();
};

local.testCase_crudErrorXxx_default = function (opt, onError) {
/*
 * this function will test crudErrorXxx's default handling-behavior
 */
    let onParallel;
    onParallel = local.onParallel(onError);
    onParallel.counter += 1;
    [
        "operationId.x-test.crudErrorDelete",
        "operationId.x-test.crudErrorGet",
        "operationId.x-test.crudErrorHead",
        "operationId.x-test.crudErrorLogin",
        "operationId.x-test.crudErrorOptions",
        "operationId.x-test.crudErrorPatch",
        "operationId.x-test.crudErrorPost",
        "operationId.x-test.crudErrorPre",
        "operationId.x-test.crudErrorPut"
    ].forEach(function (key) {
        onParallel.counter += 1;
        local.apiDict[key].ajax({}, function (err, data) {
            // validate err occurred
            local.assertOrThrow(err, err);
            // validate statusCode
            local.assertJsonEqual(data.statusCode, 500);
            onParallel();
        });
    });
    onParallel(null, opt);
};

local.testCase_crudGetManyByQuery_default = function (opt, onError) {
/*
 * this function will test crudGetManyByQuery's default handling-behavior
 */
    opt = local.crudOptionsSetDefault(opt, {
        idValue: "testCase_crudGetManyByQuery_default"
    });
    local.gotoNext(opt, function (err, data) {
        switch (opt.gotoState) {
        case 1:
            // ajax - crudGetManyByQuery
            opt.crudGetManyByQuery.ajax({
                paramDict: {
                    _queryWhere: JSON.stringify(opt.queryById)
                }
            }, opt.gotoNext);
            break;
        case 2:
            // validate data
            local.assertJsonEqual(data.responseJson.data.length, 1);
            local.assertOrThrow(
                data.responseJson.data[0][opt.idBackend] === opt.idValue,
                data.responseJson
            );
            opt.gotoNext();
            break;
        default:
            onError(err, data);
        }
    });
    opt.gotoState = 0;
    opt.gotoNext();
};

local.testCase_crudGetOneById_default = function (opt, onError) {
/*
 * this function will test crudGetOneById's default handling-behavior
 */
    opt = local.crudOptionsSetDefault(opt, {
        dataValidate: {},
        idValue: "testCase_crudGetOneById_default"
    });
    local.gotoNext(opt, function (err, data) {
        switch (opt.gotoState) {
        case 1:
            // ajax - crudGetOneById
            opt.crudGetOneById.ajax({
                paramDict: opt.queryById
            }, opt.gotoNext);
            break;
        case 2:
            // validate data
            local.assertJsonEqual(data.responseJson.data.length, 1);
            local.assertOrThrow(
                data.responseJson.data[0][opt.idBackend] === opt.idValue,
                data.responseJson
            );
            // validate dataValidate
            Object.keys(opt.dataValidate).forEach(function (key) {
                local.assertOrThrow(
                    data.responseJson.data[0][key] === opt.dataValidate[key],
                    [
                        key,
                        data.responseJson.data[0][key],
                        opt.dataValidate[key]
                    ]
                );
            });
            // cleanup dataValidate
            opt.dataValidate = {};
            opt.gotoNext(null, data);
            break;
        default:
            onError(err, data);
        }
    });
    opt.gotoState = 0;
    opt.gotoNext();
};

local.testCase_crudGetOneByQuery_default = function (opt, onError) {
/*
 * this function will test crudGetOneByQuery's default handling-behavior
 */
    opt = local.crudOptionsSetDefault(opt, {
        idValue: "testCase_crudGetOneByQuery_default"
    });
    local.gotoNext(opt, function (err, data) {
        switch (opt.gotoState) {
        case 1:
            // ajax - crudGetOneByQuery
            opt.crudGetOneByQuery.ajax({
                paramDict: {
                    _queryWhere: JSON.stringify(opt.queryById)
                }
            }, opt.gotoNext);
            break;
        case 2:
            // validate data
            local.assertJsonEqual(data.responseJson.data.length, 1);
            local.assertOrThrow(
                data.responseJson.data[0][opt.idBackend] === opt.idValue,
                data.responseJson
            );
            opt.gotoNext();
            break;
        default:
            onError(err, data);
        }
    });
    opt.gotoState = 0;
    opt.gotoNext();
};

local.testCase_crudNullXxx_default = function (opt, onError) {
/*
 * this function will test crudNullXxx's default handling-behavior
 */
    let onParallel;
    onParallel = local.onParallel(onError);
    onParallel.counter += 1;
    [
        "operationId.x-test.crudNullDelete",
        "operationId.x-test.crudNullGet",
        "operationId.x-test.crudNullHead",
        "operationId.x-test.crudNullOptions",
        "operationId.x-test.crudNullPatch",
        "operationId.x-test.crudNullPost",
        "operationId.x-test.crudNullPut"
    ].forEach(function (key) {
        onParallel.counter += 1;
        local.apiDict[key].ajax({}, onParallel);
    });
    onParallel(null, opt);
};

local.testCase_crudRemoveManyByQuery_default = function (opt, onError) {
/*
 * this function will test crudRemoveManyByQuery's default handling-behavior
 */
    opt = local.crudOptionsSetDefault(opt, {
        idValue: "testCase_crudRemoveManyByQuery_default"
    });
    local.gotoNext(opt, function (err, data) {
        switch (opt.gotoState) {
        case 1:
            // ajax - crudSetOneById
            opt.crudSetOneById.ajax({
                paramDict: {
                    body: {
                        id: "testCase_crudRemoveManyByQuery_default",
                        typeBooleanRequired: true
                    }
                }
            }, opt.gotoNext);
            break;
        case 2:
            // ajax - crudRemoveManyByQuery
            opt.crudRemoveManyByQuery.ajax({
                paramDict: {
                    _queryWhere: JSON.stringify(opt.queryById)
                }
            }, opt.gotoNext);
            break;
        case 3:
            // ajax - crudGetOneById
            opt.crudGetOneById.ajax({
                paramDict: opt.queryById
            }, opt.gotoNext);
            break;
        case 4:
            // validate data was removed
            local.assertJsonEqual(data.responseJson.data.length, 1);
            local.assertOrThrow(
                data.responseJson.data[0] === null,
                data.responseJson
            );
            opt.gotoNext();
            break;
        default:
            onError(err, data);
        }
    });
    opt.gotoState = 0;
    opt.gotoNext();
};

local.testCase_crudRemoveOneById_default = function (opt, onError) {
/*
 * this function will test crudRemoveOneById's default handling-behavior
 */
    opt = local.crudOptionsSetDefault(opt, {
        idValue: "testCase_crudRemoveOneById_default"
    });
    local.gotoNext(opt, function (err, data) {
        switch (opt.gotoState) {
        case 1:
            if (opt.idValue === "testCase_crudRemoveOneById_default") {
                // ajax - crudSetOneById
                opt.crudSetOneById.ajax({
                    paramDict: {
                        body: {
                            id: "testCase_crudRemoveOneById_default",
                            typeBooleanRequired: true
                        }
                    }
                }, opt.gotoNext);
                return;
            }
            opt.gotoNext();
            break;
        case 2:
            // ajax - crudRemoveOneById
            opt.crudRemoveOneById.ajax({
                paramDict: opt.queryById
            }, opt.gotoNext);
            break;
        case 3:
            // ajax - crudGetOneById
            opt.crudGetOneById.ajax({
                paramDict: opt.queryById
            }, opt.gotoNext);
            break;
        case 4:
            // validate data was removed
            local.assertJsonEqual(data.responseJson.data.length, 1);
            local.assertOrThrow(
                data.responseJson.data[0] === null,
                data.responseJson
            );
            opt.gotoNext();
            break;
        default:
            onError(err, data);
        }
    });
    opt.gotoState = 0;
    opt.gotoNext();
};

local.testCase_crudSetManyById_default = function (opt, onError) {
/*
 * this function will test crudSetManyById's default handling-behavior
 */
    let onParallel;
    opt = local.crudOptionsSetDefault(opt, {
        data: [
            {
                id: "testCase_crudSetManyById_default_1",
                typeBooleanRequired: true
            }, {
                id: "testCase_crudSetManyById_default_2",
                typeBooleanRequired: true
            }
        ]
    });
    local.gotoNext(opt, function (err, data) {
        switch (opt.gotoState) {
        case 1:
            // ajax - crudSetManyById
            opt.crudSetManyById.ajax({
                paramDict: {
                    body: opt.data
                }
            }, opt.gotoNext);
            break;
        case 2:
            onParallel = local.onParallel(opt.gotoNext);
            onParallel.counter += 1;
            opt.data.forEach(function (elem) {
                onParallel.counter += 1;
                // test crudGetOneById's default handling-behavior
                local.testCase_crudGetOneById_default({
                    idValue: elem.id
                }, onParallel);
            });
            onParallel();
            break;
        default:
            onError(err, data);
        }
    });
    opt.gotoState = 0;
    opt.gotoNext();
};

local.testCase_crudSetOneById_default = function (opt, onError) {
/*
 * this function will test crudSetOneById's default handling-behavior
 */
    let paramDict;
    opt = local.crudOptionsSetDefault(opt, {
        data: {
            // test dataReadonlyRemove handling-behavior
            _timeCreated: "1970-01-01T00:00:00.000Z",
            _timeUpdated: "1970-01-01T00:00:00.000Z",
            id: "testCase_crudSetOneById_default"
        },
        dataValidateReplace: {
            typeBooleanRequired: true
        }
    });
    local.gotoNext(opt, function (err, data) {
        switch (opt.gotoState) {
        case 1:
            // init paramDict
            paramDict = {};
            paramDict.body = local.objectSetOverride(
                local.jsonCopy(opt.data),
                opt.dataValidateReplace
            );
            // ajax - crudSetOneById
            opt.crudSetOneById.ajax({
                paramDict
            }, opt.gotoNext);
            break;
        case 2:
            // init id
            opt.data.id = data.responseJson.data[0].id;
            // validate time _timeCreated
            local.assertOrThrow(
                data.responseJson.data[0]._timeCreated
                > "1970-01-01T00:00:00.000Z",
                data.responseJson
            );
            local.assertOrThrow(
                data.responseJson.data[0]._timeCreated
                < new Date().toISOString(),
                data.responseJson
            );
            // validate time _timeUpdated
            local.assertOrThrow(
                data.responseJson.data[0]._timeUpdated
                > "1970-01-01T00:00:00.000Z",
                data.responseJson
            );
            local.assertOrThrow(
                data.responseJson.data[0]._timeUpdated
                < new Date().toISOString(),
                data.responseJson
            );
            // test crudGetOneById's default handling-behavior
            opt.dataValidate = opt.dataValidateReplace;
            local.testCase_crudGetOneById_default(opt, opt.gotoNext);
            break;
        default:
            onError(err, data);
        }
    });
    opt.gotoState = 0;
    opt.gotoNext();
};

local.testCase_crudUpdateOneById_default = function (opt, onError) {
/*
 * this function will test crudUpdateOneById's default handling-behavior
 */
    let paramDict;
    opt = local.crudOptionsSetDefault(opt, {
        data: {
            id: "testCase_crudUpdateOneById_default"
        },
        dataValidateUpdate1: {
            typeBooleanRequired: true
        },
        dataValidateUpdate2: {
            typeBooleanRequired: false
        }
    });
    local.gotoNext(opt, function (err, data) {
        switch (opt.gotoState) {
        case 1:
            // test crudGetOneById's default handling-behavior
            opt.dataValidate = opt.dataValidateUpdate1;
            if (opt.data.id === "testCase_crudUpdateOneById_default") {
                // ajax - crudSetOneById
                opt.crudSetOneById.ajax({
                    paramDict: {
                        body: {
                            id: "testCase_crudUpdateOneById_default",
                            typeBooleanRequired: true
                        }
                    }
                }, opt.gotoNext);
                return;
            }
            opt.gotoNext();
            break;
        case 2:
            local.testCase_crudGetOneById_default(opt, opt.gotoNext);
            break;
        case 3:
            opt._timeCreated = data.responseJson.data[0]._timeCreated;
            opt._timeUpdated = data.responseJson.data[0]._timeUpdated;
            // init paramDict
            paramDict = local.jsonCopy(opt.queryById);
            paramDict.body = local.objectSetOverride(
                local.jsonCopy(opt.data),
                opt.dataValidateUpdate2
            );
            // test application/x-www-form-urlencoded's handling-behavior
            local.objectSetOverride(paramDict, paramDict.body);
            // ajax - crudUpdateOneById
            opt.crudUpdateOneById.ajax({
                paramDict
            }, opt.gotoNext);
            break;
        case 4:
            // validate time _timeCreated
            local.assertOrThrow(
                data.responseJson.data[0]._timeCreated === opt._timeCreated,
                data.responseJson
            );
            local.assertOrThrow(
                data.responseJson.data[0]._timeCreated
                < new Date().toISOString(),
                data.responseJson
            );
            // validate time _timeUpdated
            local.assertOrThrow(
                data.responseJson.data[0]._timeUpdated > opt._timeUpdated,
                data.responseJson
            );
            local.assertOrThrow(
                data.responseJson.data[0]._timeUpdated
                < new Date().toISOString(),
                data.responseJson
            );
            // test crudGetOneById's default handling-behavior
            opt.dataValidate = local.objectSetOverride(
                local.jsonCopy(opt.dataValidateUpdate1),
                opt.dataValidateUpdate2
            );
            local.testCase_crudGetOneById_default(opt, opt.gotoNext);
            break;
        default:
            onError(err, data);
        }
    });
    opt.gotoState = 0;
    opt.gotoNext();
};

local.testCase_domAnimateShake_default = function (opt, onError) {
/*
 * this function will test domAnimateShake's default handling-behavior
 */
    if (!local.isBrowser) {
        onError(null, opt);
        return;
    }
    local.uiAnimateShake(document.querySelector(
        "div"
    ));
    setTimeout(onError, 1500);
};

local.testCase_fileGetOneById_default = function (opt, onError) {
/*
 * this function will test fileGetOneById's default handling-behavior
 */
    let gotoNext;
    let gotoState;
    gotoState = 0;
    gotoNext = function (err, data) {
        gotoState += 1;
        switch (gotoState) {
        case 1:
            opt = local.crudOptionsSetDefault(opt, {
                idValue: "testCase_fileGetOneById_default"
            });
            // ajax - fileGetOneById
            local.apiDict["operationId.file.fileGetOneById.id.id"].ajax({
                paramDict: opt.queryById
            }, gotoNext);
            break;
        case 2:
            // validate no err occurred
            local.assertOrThrow(!err, err);
            // validate Content-Type
            opt.data = data.resHeaders["content-type"];
            local.assertJsonEqual(opt.data, "image/png");
            // validate response
            opt.data = local.base64FromBuffer(data.responseBuffer);
            local.assertJsonEqual(
                opt.data,
                local.templateSwaggerUiLogoSmallBase64
            );
            // test fileGetOneById's 404 handling-behavior
            local.apiDict["operationId.file.fileGetOneById.id.id"].ajax({
                paramDict: {
                    id: "testCase_fileGetOneById_default_undefined"
                }
            }, gotoNext);
            break;
        case 3:
            // validate err occurred
            local.assertOrThrow(err, err);
            // validate statusCode
            local.assertJsonEqual(data.statusCode, 404);
            gotoNext();
            break;
        default:
            onError(err, data);
        }
    };
    gotoNext();
};

local.testCase_fileUploadManyByForm_default = function (opt, onError) {
/*
 * this function will test fileUploadManyByForm's default handling-behavior
 */
    opt = {};
    local.gotoNext(opt, function (err, data) {
        switch (opt.gotoState) {
        case 1:
            opt.blob = new local.Blob([
                local.base64ToBuffer(local.templateSwaggerUiLogoSmallBase64)
            ], {
                type: "image/png"
            });
            opt.blob.name = "a00.png";
            // ajax - fileUploadManyByForm
            local.apiDict["operationId.file.fileUploadManyByForm.2"].ajax({
                paramDict: {
                    fileDescription: "hello",
                    file1: opt.blob,
                    file2: opt.blob,
                    file3: opt.blob
                }
            }, opt.gotoNext);
            break;
        case 2:
            // validate data
            local.assertJsonEqual(data.responseJson.data.length, 2);
            local.assertJsonEqual(
                data.responseJson.data[0].fileDescription,
                "hello"
            );
            local.crudOptionsSetDefault(opt, {
                idValue: data.responseJson.data[0].id
            });
            // test fileGetOneById's default handling-behavior
            local.testCase_fileGetOneById_default(opt, opt.gotoNext);
            break;
        case 3:
            // test crudRemoveOneById's default handling-behavior
            local.testCase_crudRemoveOneById_default(opt, opt.gotoNext);
            break;
        default:
            onError(err);
        }
    });
    opt.gotoState = 0;
    opt.gotoNext();
};

local.testCase_fileUploadManyByForm_nullCase = function (opt, onError) {
/*
 * this function will test fileUploadManyByForm's null-case handling-behavior
 */
    opt = {};
    local.gotoNext(opt, function (err, data) {
        switch (opt.gotoState) {
        case 1:
            // ajax - fileUploadManyByForm
            local.apiDict["operationId.file.fileUploadManyByForm.2"].ajax(
                opt,
                opt.gotoNext
            );
            break;
        case 2:
            // validate data
            local.assertJsonEqual(data.responseJson.data.length, 0);
            opt.gotoNext();
            break;
        default:
            onError(err);
        }
    });
    opt.gotoState = 0;
    opt.gotoNext();
};

local.testCase_onErrorJsonapi_default = function (opt, onError) {
/*
 * this function will test onErrorJsonapi's default handling-behavior
 */
    let onParallel;
    onParallel = local.onParallel(onError);
    onParallel.counter += 1;
    [
        "hello", [
            "hello"
        ], {
            data: [
                "hello"
            ],
            meta: {
                isJsonapiResponse: true
            }
        }
    ].forEach(function (data) {
        onParallel.counter += 1;
        local.apiDict["operationId.x-test.onErrorJsonapi"].ajax({
            paramDict: {
                data: JSON.stringify(data)
            }
        }, function (err, data) {
            // validate no err occurred
            local.assertOrThrow(!err, err);
            // validate data
            local.assertJsonEqual(data.responseJson.data[0], "hello");
            onParallel();
        });
    });
    onParallel(null, opt);
};

local.testCase_onErrorJsonapi_emptyArray = function (opt, onError) {
/*
 * this function will test onErrorJsonapi's empty-array handling-behavior
 */
    let onParallel;
    onParallel = local.onParallel(onError);
    onParallel.counter += 1;
    onParallel.counter += 1;
    local.apiDict["operationId.x-test.onErrorJsonapi"].ajax({
        paramDict: {
            data: "[]"
        }
    }, function (
        err,
        data
    ) {
        // validate no err occurred
        local.assertOrThrow(!err, err);
        // validate data
        local.assertJsonEqual(data.responseJson.data[0], undefined);
        onParallel();
    });
    onParallel.counter += 1;
    local.apiDict["operationId.x-test.onErrorJsonapi"].ajax({
        paramDict: {
            error: "[]"
        }
    }, function (
        err,
        data
    ) {
        // validate err occurred
        local.assertOrThrow(err, err);
        // validate err
        local.assertOrThrow(
            data.responseJson.errors[0].message === "null",
            err
        );
        onParallel();
    });
    onParallel(null, opt);
};

local.testCase_onErrorJsonapi_err = function (opt, onError) {
/*
 * this function will test onErrorJsonapi's err handling-behavior
 */
    let onParallel;
    onParallel = local.onParallel(onError);
    onParallel.counter += 1;
    [
        "hello", [
            "hello"
        ], [
            {
                message: "hello"
            }
        ], {
            errors: [
                {
                    message: "hello"
                }
            ],
            meta: {
                isJsonapiResponse: true
            },
            statusCode: 500
        }
    ].forEach(function (data) {
        onParallel.counter += 1;
        local.apiDict["operationId.x-test.onErrorJsonapi"].ajax({
            paramDict: {
                error: JSON.stringify(data)
            }
        }, function (
            err,
            data
        ) {
            // validate err occurred
            local.assertOrThrow(err, err);
            // validate err
            local.assertOrThrow(
                data.responseJson.errors[0].message === "hello",
                err
            );
            onParallel();
        });
    });
    onParallel(null, opt);
};

local.testCase_petstoreStoreGetInventory_default = function (opt, onError) {
/*
 * this function will test petstoreStoreGetInventory's default handling-behavior
 */
    opt = {};
    local.gotoNext(opt, function (err, data) {
        switch (opt.gotoState) {
        case 1:
            local.apiDict["operationId.getInventory"].ajax(opt, opt.gotoNext);
            break;
        case 2:
            // validate data
            local.assertJsonEqual(data.responseJson.data.length, 1);
            local.assertOrThrow(data.responseJson.data[0]);
            opt.gotoNext();
            break;
        default:
            onError(err);
        }
    });
    opt.gotoState = 0;
    opt.gotoNext();
};

local.testCase_swaggerJsonFromCurl_default = function (opt, onError) {
/*
 * this function will test swaggerJsonFromCurl's default handling-behavior
 */
    opt = local.swaggerJsonFromCurl(
/* jslint ignore:start */
null,
'\
# test no-data handling-behavior\n\
curl https://example.com\n\
# test json-object-data handling-behavior\n\
curl --data {} https://example.com/json\n\
# test text-data handling-behavior\n\
curl --data undefined https://example.com/text\n\
# test json-array-data handling-behavior\n\
curl \\\n\
--data \'[{\n\
    "listEmpty": [],\n\
    "listObject": [{ "aa": "bb" }],\n\
    "object": { "aa": { "bb": { "cc": "dd" } } },\n\
    "quote": "\\\\\\"api\'"\'"\'s\\""\n\
}]\' \\\n\
--header \'Content-Type: application/json\' \\\n\
--request POST \\\n\
"https://example.com/{aa}/{bb}?aa=bb"\n\
# test no-url handling-behavior\n\
curl /undefined\n\
'
            );
            local.swaggerValidate(opt);
            local.assertJsonEqual(
                opt,
{
    "basePath": "/",
    "definitions": {
        "_2F_7Baa_7D_2F_7Bbb_7D_20POST.body": {
            "properties": {
                "listEmpty": {
                    "default": [],
                    "items": {
                        "type": "string"
                    },
                    "type": "array"
                },
                "listObject": {
                    "default": [
                        {
                            "aa": "bb"
                        }
                    ],
                    "items": {
                        "$ref": "#/definitions/_2F_7Baa_7D_2F_7Bbb_7D_20POST.body.listObject"
                    },
                    "type": "array"
                },
                "object": {
                    "$ref": "#/definitions/_2F_7Baa_7D_2F_7Bbb_7D_20POST.body.object"
                },
                "quote": {
                    "default": "\\\"api's\"",
                    "type": "string"
                }
            }
        },
        "_2F_7Baa_7D_2F_7Bbb_7D_20POST.body.listObject": {
            "properties": {
                "aa": {
                    "default": "bb",
                    "type": "string"
                }
            }
        },
        "_2F_7Baa_7D_2F_7Bbb_7D_20POST.body.object": {
            "properties": {
                "aa": {
                    "default": {
                        "bb": {
                            "cc": "dd"
                        }
                    },
                    "type": "object"
                }
            }
        },
        "_2Fjson_20GET.body": {
            "properties": {}
        }
    },
    "info": {
        "title": "",
        "version": ""
    },
    "paths": {
        "/": {
            "get": {
                "operationId": "_2F_20GET",
                "parameters": [],
                "responses": {
                    "default": {
                        "description": "default response"
                    }
                },
                "tags": [
                    "undefined"
                ],
                "x-swgg-host": "example.com",
                "x-swgg-schemes": [
                    "https"
                ]
            }
        },
        "/json": {
            "get": {
                "operationId": "_2Fjson_20GET",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "schema": {
                            "$ref": "#/definitions/_2Fjson_20GET.body"
                        }
                    }
                ],
                "responses": {
                    "default": {
                        "description": "default response"
                    }
                },
                "tags": [
                    "undefined"
                ],
                "x-swgg-host": "example.com",
                "x-swgg-schemes": [
                    "https"
                ]
            }
        },
        "/text": {
            "get": {
                "operationId": "_2Ftext_20GET",
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "default": {
                        "description": "default response"
                    }
                },
                "tags": [
                    "undefined"
                ],
                "x-swgg-host": "example.com",
                "x-swgg-schemes": [
                    "https"
                ]
            }
        },
        "/undefined": {
            "get": {
                "operationId": "_2Fundefined_20GET",
                "parameters": [],
                "responses": {
                    "default": {
                        "description": "default response"
                    }
                },
                "tags": [
                    "undefined"
                ]
            }
        },
        "/{aa}/{bb}": {
            "post": {
                "operationId": "_2F_7Baa_7D_2F_7Bbb_7D_20POST",
                "parameters": [
                    {
                        "default": "application/json",
                        "in": "header",
                        "name": "content-type",
                        "type": "string"
                    },
                    {
                        "default": "aa",
                        "in": "path",
                        "name": "aa",
                        "required": true,
                        "type": "string"
                    },
                    {
                        "default": "bb",
                        "in": "path",
                        "name": "bb",
                        "required": true,
                        "type": "string"
                    },
                    {
                        "default": "bb",
                        "in": "query",
                        "name": "aa",
                        "type": "string"
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "schema": {
                            "items": {
                                "$ref": "#/definitions/_2F_7Baa_7D_2F_7Bbb_7D_20POST.body"
                            },
                            "type": "array"
                        }
                    }
                ],
                "responses": {
                    "default": {
                        "description": "default response"
                    }
                },
                "tags": [
                    "undefined"
                ],
                "x-swgg-host": "example.com",
                "x-swgg-schemes": [
                    "https"
                ]
            }
        }
    },
    "swagger": "2.0"
}
/* jslint ignore:end */
    );
    onError(null, opt);
};

local.testCase_swaggerValidateDataParameters_default = function (opt, onError) {
/*
 * this function will test
 * swaggerValidateDataParameters's default handling-behavior
 */
    let onParallel;
    onParallel = local.onParallel(onError);
    onParallel.counter += 1;
    Object.keys(local.apiDict).forEach(function (key) {
        if (key.indexOf("operationId.x-test.parameters") < 0) {
            return;
        }
        // test null-case handling-behavior
        onParallel.counter += 1;
        local.apiDict[key].ajax({}, function (err, data) {
            // validate no err occurred
            local.assertOrThrow(!err, data);
            onParallel(null, opt);
        });
        onParallel.counter += 1;
        local.apiDict[key].ajax({
            modeDefault: true
        }, function (err, data) {
            // validate no err occurred
            local.assertOrThrow(!err, [
                err, key
            ]);
            // validate data
            data = data.paramDict;
            local.assertOrThrow(data, [
                data, key
            ]);
            onParallel(null, opt);
        });
    });
    onParallel(null, opt);
};

local.testCase_swaggerValidateDataParameters_err = function (opt, onError) {
/*
 * this function will test swaggerValidateDataParameters's err handling-behavior
 */
    let onParallel;
    onParallel = local.onParallel(onError);
    onParallel.counter += 1;
    [
        // 5.1. Validation keywords for numeric instances (number and integer)
        // 5.1.1. multipleOf
        {
            typeInteger1: 1,
            "x-errorType": "numberMultipleOf"
        },
        // 5.1.2. maximum and exclusiveMaximum - maximum
        {
            typeInteger1: 10,
            "x-errorType": "numberMaximum"
        },
        // 5.1.2. maximum and exclusiveMaximum - exclusiveMaximum
        {
            typeInteger2: 10,
            "x-errorType": "numberExclusiveMaximum"
        },
        // 5.1.3. minimum and exclusiveMinimum - minimum
        {
            typeInteger1: -10,
            "x-errorType": "numberMinimum"
        },
        // 5.1.3. minimum and exclusiveMinimum - exclusiveMinimum
        {
            typeInteger2: -10,
            "x-errorType": "numberExclusiveMinimum"
        },
        // 5.2. Validation keywords for strings
        // 5.2.1. maxLength
        {
            typeString1: "01234567890123456789",
            "x-errorType": "stringMaxLength"
        },
        // 5.2.2. minLength
        {
            typeString1: "",
            "x-errorType": "stringMinLength"
        },
        // 5.2.3. pattern
        {
            typeString1: "0123456789012345~",
            "x-errorType": "stringPattern"
        },
        // 5.3. Validation keywords for arrays
        // 5.3.2. maxItems
        {
            typeArrayItemsNumber2: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10
            ],
            "x-errorType": "arrayMaxItems"
        },
        // 5.3.2. minItems
        {
            typeArrayItemsNumber2: [],
            "x-errorType": "arrayMinItems"
        },
        // 5.3.4. uniqueItems
        {
            typeArrayItemsNumber2: [
                0, 0
            ],
            "x-errorType": "arrayUniqueItems"
        },
        // 5.5. Validation keywords for any instance type
        // 5.5.1. enum
        {
            typeNumberEnum: 0,
            "x-errorType": "itemEnum"
        },
        // 5.5.2. type - string
        {
            typeString0: true,
            "x-errorType": "itemType"
        },
        // 5.5.2. type - byte
        {
            typeStringFormatByte: "~",
            "x-errorType": "itemType"
        }
    // 5.5.3. allOf
    // 5.5.4. anyOf
    // 5.5.5. oneOf
    // testCase_swaggerValidate_default
    // 5.5.6. not
    // testCase_swaggerValidate_default
    // 5.5.7. definitions
    ].forEach(function (paramDict) {
        onParallel.counter += 1;
        local.apiDict["operationId.x-test.parametersDefault"].ajax({
            paramDict: local.jsonCopy(paramDict)
        }, function (err) {
            // validate err occurred
            local.assertOrThrow(err, JSON.stringify(paramDict));
            // validate statusCode
            local.assertJsonEqual(err.statusCode, 400);
            // validate x-errorType
            local.assertJsonEqual(paramDict["x-errorType"], err.opt.errorType);
            // debug err.message
            // console.error(
            //     "swaggerValidateDataParameters - " + ii + " - " + err.message
            // );
            onParallel(null, opt);
        });
    });
    [
        // 5.4. Validation keywords for objects
        // 5.4.1. maxProperties
        {
            typeObjectInBody: {
                typeBooleanRequired: true,
                typeObjectMisc: {
                    aa: 1,
                    bb: 2,
                    cc: 3,
                    dd: 4,
                    de: 5,
                    ff: 6
                }
            },
            "x-errorType": "objectMaxProperties"
        },
        // 5.4.2. minProperties
        {
            typeObjectInBody: {
                typeBooleanRequired: true,
                typeObjectMisc: {}
            },
            "x-errorType": "objectMinProperties"
        },
        // 5.4.3. required
        {
            typeObjectInBody: {},
            "x-errorType": "semanticItemsRequiredForArrayObjects2"
        }
    // 5.4.4. additionalProperties, properties and patternProperties
    // testCase_swaggerValidate_default
    // 5.4.5. dependencies
    // testCase_swaggerValidate_default
    ].forEach(function (paramDict, ii) {
        onParallel.counter += 1;
        local.apiDict["operationId.x-test.parametersObjectInBody"].ajax({
            paramDict: local.jsonCopy(paramDict)
        }, function (err) {
            // validate err occurred
            local.assertOrThrow(err, JSON.stringify(paramDict));
            // validate statusCode
            local.assertJsonEqual(err.statusCode, 400);
            // validate x-errorType
            local.assertJsonEqual(paramDict["x-errorType"], err.opt.errorType);
            // debug err.message
            console.error(ii, err.message);
            onParallel(null, opt);
        });
    });
    onParallel(null, opt);
};

local.testCase_swaggerValidateFile_default = function (opt, onError) {
/*
 * this function will test swaggerValidate's file handling-behavior
 */
    if (local.isBrowser) {
        onError(null, opt);
        return;
    }
    local.onParallelList({
        list: [
            {
                // test data handling-behavior
                data: local.assetsDict["/assets.swgg.swagger.petstore.json"],
                file: "assets.swgg.swagger.petstore.json"
            }, {
                // test err handling-behavior
                data: "{}",
                file: "error.json"
            }, {
                // test file handling-behavior
                file: "assets.swgg.swagger.petstore.json"
            }, {
                // test url handling-behavior
                file: local.serverLocalHost
                + "/assets.swgg.swagger.petstore.json"
            }
        ]
    }, function (opt2, onParallel) {
        onParallel.counter += 1;
        local.swgg.swaggerValidateFile(opt2.elem, function (err) {
            // validate no err occurred
            local.assertOrThrow(!err || opt2.elem.file === "error.json", err);
            onParallel(null, opt);
        });
    }, onError);
};

local.testCase_swaggerValidate_default = function (opt, onError) {
/*
 * this function will test swaggerValidate's default handling-behavior
 */
    let err;
    // test default handling-behavior
    local.swaggerValidate({
        info: {
            title: "",
            version: ""
        },
        paths: {
            "/aa": {
                get: {
                    responses: {
                        "200": {
                            description: ""
                        }
                    }
                }
            }
        },
        swagger: "2.0"
    });
    // test path handling-behavior
    local.swaggerValidate({
        info: {
            title: "",
            version: ""
        },
        parameters: {
            aa: {
                in: "path",
                name: "aa",
                required: true,
                type: "string"
            }
        },
        paths: {
            "/{aa}": {
                get: {
                    parameters: [
                        {
                            $ref: "#/parameters/aa"
                        }
                    ],
                    responses: {
                        "200": {
                            description: ""
                        }
                    }
                }
            }
        },
        swagger: "2.0"
    });
    // test err handling-behavior
    // 5.4. Validation keywords for objects
    // 5.5. Validation keywords for any instance type
    [null, undefined, {}, {
        // 5.4.4. additionalProperties, properties and patternProperties
        aa: true,
        info: {
            title: "",
            version: ""
        },
        paths: {
            "/aa": {
                get: {
                    responses: {
                        "200": {
                            description: ""
                        }
                    }
                }
            }
        },
        swagger: "2.0",
        "x-errorType": "objectAdditionalProperties"
    }, {
        // 5.4.5. dependencies
        exclusiveMaximum: true,
        info: {
            title: "",
            version: ""
        },
        paths: {
            "/aa": {
                get: {
                    responses: {
                        "200": {
                            description: ""
                        }
                    }
                }
            }
        },
        swagger: "2.0",
        "x-errorType": "objectDependencies"
    }, {
        // 5.5.5. oneOf
        info: {
            title: "",
            version: ""
        },
        paths: {
            "/aa": {
                get: {
                    responses: {
                        "200": {
                            description: ""
                        }
                    }
                }
            }
        },
        securityDefinitions: {
            aa: true
        },
        swagger: "2.0",
        "x-errorType": "itemOneOf"
    }, {
        // 5.5.6. not
        info: {
            title: "",
            version: ""
        },
        paths: {
            "/aa": {
                get: {
                    responses: {
                        "x-": true
                    }
                }
            }
        },
        swagger: "2.0",
        "x-errorType": "itemNot"
    }, {
        // validate schemaDereference
        info: {
            title: "",
            version: ""
        },
        paths: {
            "/aa": {
                get: {
                    responses: {
                        "200": {
                            $ref: "#/undefined"
                        }
                    }
                }
            }
        },
        swagger: "2.0",
        "x-errorType": "schemaDereference"
    }, {
        // validate schemaDereferenceCircular
        info: {
            title: "",
            version: ""
        },
        paths: {
            "/aa": {
                get: {
                    responses: {
                        "200": {
                            $ref: "#/x-test/aa"
                        }
                    }
                }
            }
        },
        "x-test": {
            aa: {
                $ref: "#/x-test/aa"
            }
        },
        swagger: "2.0",
        "x-errorType": "schemaDereferenceCircular"
    }, {
        // validate semanticFormData1
        info: {
            title: "",
            version: ""
        },
        paths: {
            "/aa": {
                get: {
                    parameters: [
                        {
                            in: "formdata"
                        }
                    ],
                    responses: {
                        "200": {
                            description: ""
                        }
                    }
                }
            }
        },
        swagger: "2.0",
        "x-errorType": "semanticFormData1"
    }, {
        // validate semanticFormData2
        info: {
            title: "",
            version: ""
        },
        paths: {
            "/aa": {
                get: {
                    parameters: [
                        {
                            in: "body",
                            name: "aa",
                            schema: {
                                type: "string"
                            }
                        }, {
                            in: "formData",
                            type: "string"
                        }
                    ],
                    responses: {
                        "200": {
                            description: ""
                        }
                    }
                }
            }
        },
        swagger: "2.0",
        // 'x-errorType': 'semanticFormData2'
        "x-errorType": "semanticOperations1"
    }, {
        // validate semanticFormData3
        info: {
            title: "",
            version: ""
        },
        paths: {
            "/aa": {
                get: {
                    parameters: [
                        {
                            in: "query",
                            type: "file"
                        }
                    ],
                    responses: {
                        "200": {
                            description: ""
                        }
                    }
                }
            }
        },
        swagger: "2.0",
        "x-errorType": "semanticFormData3"
    }, {
        // validate semanticFormData4
        info: {
            title: "",
            version: ""
        },
        paths: {
            "/aa": {
                get: {
                    parameters: [
                        {
                            in: "formData",
                            type: "file"
                        }
                    ],
                    responses: {
                        "200": {
                            description: ""
                        }
                    }
                }
            }
        },
        swagger: "2.0",
        "x-errorType": "semanticFormData4"
    }, {
        // validate semanticFormData5
        info: {
            title: "",
            version: ""
        },
        paths: {
            "/aa": {
                get: {
                    parameters: [
                        {
                            in: "formData",
                            type: "string"
                        }
                    ],
                    responses: {
                        "200": {
                            description: ""
                        }
                    }
                }
            }
        },
        swagger: "2.0",
        "x-errorType": "semanticFormData5"
    }, {
        // validate semanticItemsRequiredForArrayObjects1
        info: {
            title: "",
            version: ""
        },
        paths: {
            "/aa": {
                get: {
                    parameters: [
                        {
                            type: "array"
                        }
                    ],
                    responses: {
                        "200": {
                            description: ""
                        }
                    }
                }
            }
        },
        swagger: "2.0",
        "x-errorType": "semanticItemsRequiredForArrayObjects1"
    }, {
        // validate semanticItemsRequiredForArrayObjects2
        "x-errorType": "semanticItemsRequiredForArrayObjects2"
    }, {
        // validate semanticItemsRequiredForArrayObjects3
        info: {
            title: "",
            version: ""
        },
        paths: {
            "/aa": {
                get: {
                    parameters: [
                        {
                            in: "body",
                            name: "aa",
                            schema: {
                                type: "array"
                            }
                        }
                    ],
                    responses: {
                        "200": {
                            description: ""
                        }
                    }
                }
            }
        },
        swagger: "2.0",
        // 'x-errorType': 'semanticItemsRequiredForArrayObjects3'
        "x-errorType": "semanticItemsRequiredForArrayObjects1"
    }, {
        // validate semanticItemsRequiredForArrayObjects4
        info: {
            title: "",
            version: ""
        },
        paths: {
            "/aa": {
                get: {
                    parameters: [
                        {
                            in: "header",
                            type: "array"
                        }
                    ],
                    responses: {
                        "200": {
                            description: ""
                        }
                    }
                }
            }
        },
        swagger: "2.0",
        // 'x-errorType': 'semanticItemsRequiredForArrayObjects4'
        "x-errorType": "semanticItemsRequiredForArrayObjects1"
    }, {
        // validate semanticOperationIds1
        info: {
            title: "",
            version: ""
        },
        paths: {
            "/aa": {
                get: {
                    operationId: "aa",
                    responses: {
                        "200": {
                            description: ""
                        }
                    }
                }
            },
            "/bb": {
                get: {
                    operationId: "aa",
                    responses: {
                        "200": {
                            description: ""
                        }
                    }
                }
            }
        },
        swagger: "2.0",
        "x-errorType": "semanticOperationIds1"
    }, {
        // validate semanticOperations1
        info: {
            title: "",
            version: ""
        },
        paths: {
            "/aa": {
                get: {
                    parameters: [
                        {
                            in: "body",
                            name: "aa",
                            schema: {
                                type: "string"
                            }
                        }, {
                            in: "formData",
                            type: "string"
                        }
                    ],
                    responses: {
                        "200": {
                            description: ""
                        }
                    }
                }
            }
        },
        swagger: "2.0",
        "x-errorType": "semanticOperations1"
    }, {
        // validate semanticOperations2
        info: {
            title: "",
            version: ""
        },
        paths: {
            "/aa": {
                get: {
                    parameters: [
                        {
                            in: "body",
                            name: "aa",
                            schema: {
                                type: "string"
                            }
                        }, {
                            in: "body",
                            name: "bb",
                            schema: {
                                type: "string"
                            }
                        }
                    ],
                    responses: {
                        "200": {
                            description: ""
                        }
                    }
                }
            }
        },
        swagger: "2.0",
        "x-errorType": "semanticOperations2"
    }, {
        // validate semanticOperations3
        info: {
            title: "",
            version: ""
        },
        paths: {
            "/aa": {
                get: {
                    parameters: [
                        {
                            in: "query",
                            name: "aa",
                            type: "string"
                        }, {
                            in: "query",
                            name: "aa",
                            type: "string"
                        }
                    ],
                    responses: {
                        "200": {
                            description: ""
                        }
                    }
                }
            }
        },
        swagger: "2.0",
        "x-errorType": "semanticOperations3"
    }, {
        // validate semanticParameters1
        info: {
            title: "",
            version: ""
        },
        paths: {
            "/aa": {
                get: {
                    parameters: [
                        {
                            type: "array"
                        }
                    ],
                    responses: {
                        "200": {
                            description: ""
                        }
                    }
                }
            }
        },
        swagger: "2.0",
        // 'x-errorType': 'semanticParameters1'
        "x-errorType": "semanticItemsRequiredForArrayObjects1"
    }, {
        // validate semanticParameters2
        info: {
            title: "",
            version: ""
        },
        paths: {
            "/aa": {
                get: {
                    parameters: [
                        {
                            in: "query"
                        }
                    ],
                    responses: {
                        "200": {
                            description: ""
                        }
                    }
                }
            }
        },
        swagger: "2.0",
        "x-errorType": "semanticParameters2"
    }, {
        // validate semanticPaths1
        info: {
            title: "",
            version: ""
        },
        paths: {
            "/aa?": {
                get: {
                    responses: {
                        "200": {
                            description: ""
                        }
                    }
                }
            }
        },
        swagger: "2.0",
        "x-errorType": "semanticPaths1"
    }, {
        // validate semanticPaths2
        info: {
            title: "",
            version: ""
        },
        paths: {
            "/{aa}": {
                get: {
                    responses: {
                        "200": {
                            description: ""
                        }
                    }
                }
            },
            "/{bb}": {
                get: {
                    responses: {
                        "200": {
                            description: ""
                        }
                    }
                }
            }
        },
        swagger: "2.0",
        "x-errorType": "semanticPaths2"
    }, {
        // validate semanticPaths3
        info: {
            title: "",
            version: ""
        },
        paths: {
            "/{aa}/{aa}": {
                get: {
                    parameters: [
                        {
                            in: "path",
                            name: "aa",
                            required: true,
                            type: "string"
                        }
                    ],
                    responses: {
                        "200": {
                            description: ""
                        }
                    }
                }
            }
        },
        swagger: "2.0",
        "x-errorType": "semanticPaths3"
    // }, {
    // validate semanticPaths4
    // 'x-errorType': 'semanticPaths4'
    }, {
        // validate semanticPaths5
        info: {
            title: "",
            version: ""
        },
        paths: {
            "/{}": {
                get: {
                    responses: {
                        "200": {
                            description: ""
                        }
                    }
                }
            }
        },
        swagger: "2.0",
        "x-errorType": "semanticPaths5"
    }, {
        // validate semanticPaths6
        info: {
            title: "",
            version: ""
        },
        paths: {
            "/{aa}": {
                get: {
                    responses: {
                        "200": {
                            description: ""
                        }
                    }
                }
            }
        },
        swagger: "2.0",
        "x-errorType": "semanticPaths6"
    }, {
        // validate semanticPaths7
        info: {
            title: "",
            version: ""
        },
        paths: {
            "/": {
                get: {
                    parameters: [
                        {
                            in: "path",
                            name: "aa",
                            required: true,
                            type: "string"
                        }
                    ],
                    responses: {
                        "200": {
                            description: ""
                        }
                    }
                }
            }
        },
        swagger: "2.0",
        "x-errorType": "semanticPaths7"
    // }, {
    // validate semanticRefs1
    // 'x-errorType': 'semanticRefs1'
    }, {
        // validate semanticSchema1
        info: {
            title: "",
            version: ""
        },
        paths: {
            "/aa": {
                get: {
                    parameters: [
                        {
                            in: "body",
                            name: "aa",
                            schema: {
                                required: [
                                    "aa"
                                ],
                                properties: {
                                    aa: {
                                        readOnly: true
                                    }
                                }
                            }
                        }
                    ],
                    responses: {
                        "200": {
                            description: ""
                        }
                    }
                }
            }
        },
        swagger: "2.0",
        "x-errorType": "semanticSchema1"
    // }, {
    // validate semanticSecurityDefinitions1
    // 'x-errorType': 'semanticSecurityDefinitions1'
    // }, {
    // validate semanticSecurityDefinitions2
    // 'x-errorType': 'semanticSecurityDefinitions2'
    // }, {
    // validate semanticSecurityDefinitions3
    // 'x-errorType': 'semanticSecurityDefinitions3'
    // }, {
    // validate semanticSecurityDefinitions4
    // 'x-errorType': 'semanticSecurityDefinitions4'
    // }, {
    // validate semanticSecurityDefinitions5
    // 'x-errorType': 'semanticSecurityDefinitions5'
    // }, {
    // validate semanticSecurityDefinitions6
    // 'x-errorType': 'semanticSecurityDefinitions6'
    // }, {
    // validate semanticSecurityDefinitions7
    // 'x-errorType': 'semanticSecurityDefinitions7'
    // }, {
    // validate semanticSecurityDefinitions8
    // 'x-errorType': 'semanticSecurityDefinitions8'
    // }, {
    // validate semanticSecurityDefinitions9
    // 'x-errorType': 'semanticSecurityDefinitions9'
    // }, {
    // validate semanticSecurity1
    // 'x-errorType': 'semanticSecurity1'
    // }, {
    // validate semanticSecurity2
    // 'x-errorType': 'semanticSecurity2'
    }, {
        // validate semanticWalker1
        info: {
            title: "",
            version: ""
        },
        paths: {
            "/aa": {
                get: {
                    parameters: [
                        {
                            in: "body",
                            name: "aa",
                            schema: {
                                type: 1
                            }
                        }
                    ],
                    responses: {
                        "200": {
                            description: ""
                        }
                    }
                }
            }
        },
        swagger: "2.0",
        "x-errorType": "semanticWalker1"
    }, {
        // validate semanticWalker2
        info: {
            title: "",
            version: ""
        },
        paths: {
            "/aa": {
                get: {
                    parameters: [
                        {
                            in: "body",
                            name: "aa",
                            schema: {
                                maximum: 0,
                                minimum: 1,
                                type: "number"
                            }
                        }
                    ],
                    responses: {
                        "200": {
                            description: ""
                        }
                    }
                }
            }
        },
        swagger: "2.0",
        "x-errorType": "semanticWalker2"
    }, {
        // validate semanticWalker3
        info: {
            title: "",
            version: ""
        },
        paths: {
            "/aa": {
                get: {
                    parameters: [
                        {
                            in: "body",
                            name: "aa",
                            schema: {
                                maxProperties: 0,
                                minProperties: 1,
                                type: "object"
                            }
                        }
                    ],
                    responses: {
                        "200": {
                            description: ""
                        }
                    }
                }
            }
        },
        swagger: "2.0",
        "x-errorType": "semanticWalker3"
    }, {
        // validate semanticWalker4
        info: {
            title: "",
            version: ""
        },
        paths: {
            "/aa": {
                get: {
                    parameters: [
                        {
                            in: "body",
                            name: "aa",
                            schema: {
                                maxLength: 0,
                                minLength: 1,
                                type: "object"
                            }
                        }
                    ],
                    responses: {
                        "200": {
                            description: ""
                        }
                    }
                }
            }
        },
        swagger: "2.0",
        "x-errorType": "semanticWalker4"
    // }, {
    // validate semanticWalker5
    // 'x-errorType': 'semanticWalker5'
    }, {
        // validate semanticWalker6
        info: {
            title: "",
            version: ""
        },
        paths: {
            "/aa": {
                get: {
                    responses: {
                        "200": {
                            $ref: "aa"
                        }
                    }
                }
            }
        },
        swagger: "2.0",
        "x-errorType": "semanticWalker6"
    }, {
        // validate semanticWalker7
        info: {
            title: "",
            version: ""
        },
        paths: {
            "/aa": {
                get: {
                    responses: {
                        "200": {
                            $ref: "#/aa",
                            aa: true
                        }
                    }
                }
            }
        },
        swagger: "2.0",
        // 'x-errorType': 'semanticWalker7'
        "x-errorType": "objectAdditionalProperties"
    }].forEach(function (elem, ii) {
        local.tryCatchOnError(function () {
            local.swaggerValidate(elem);
        }, local.nop);
        err = local.utility2._debugTryCatchError;
        // validate err occurred
        local.assertOrThrow(err, elem);
        // validate x-errorType
        if (elem && elem["x-errorType"]) {
            local.assertJsonEqual(elem["x-errorType"], err.opt.errorType, err);
        }
        console.error("swaggerValidate - " + ii + " - " + err.message);
    });
    onError(null, opt);
};

local.testCase_ui_apiKey = function (opt, onError) {
/*
 * this function will test ui's apiKey handling-behavior
 */
    if (!local.isBrowser) {
        onError(null, opt);
        return;
    }
    localStorage.setItem("utility2_swgg_apiKeyKey_", "");
    local.uiEventListenerDict.onEventUiReload({
        swggInit: true,
        targetOnEvent: {
            id: "swggApiKeyInput1"
        },
        type: "keyup"
    });
    onError(null, opt);
};

local.testCase_ui_fileMedia = function (opt, onError) {
/*
 * this function will test ui's fileMedia handling-behavior
 */
    if (!local.isBrowser) {
        onError(null, opt);
        return;
    }
    [
        "testCase_ui_fileMedia_audioNull",
        "testCase_ui_fileMedia_imageNull",
        "testCase_ui_fileMedia_videoNull"
    ].forEach(function (id) {
        document.querySelector(
            "#swgg_id_file_fileGetOneById_id_id_1 .input"
        ).value = id;
        document.querySelector(
            "#swgg_id_file_fileGetOneById_id_id_1"
            + " [data-onevent=onEventOperationAjax]"
        ).click();
    });
    onError(null, opt);
};

local.testCase_userLoginXxx_default = function (opt, onError) {
/*
 * this function will test userLoginXxx's default handling-behavior
 */
    let gotoNext;
    let gotoState;
    gotoState = 0;
    gotoNext = function (err, data) {
        gotoState += 1;
        switch (gotoState) {
        case 1:
            // cleanup userJwtEncrypted
            delete local.userJwtEncrypted;
            // test userLogout's default handling-behavior
            local.userLogout({}, gotoNext);
            break;
        case 2:
            // validate err occurred
            local.assertOrThrow(err, err);
            // test userLoginByPassword's 401 handling-behavior
            local.userLoginByPassword({
                password: "undefined",
                username: "undefined"
            }, gotoNext);
            break;
        case 3:
            // validate err occurred
            local.assertOrThrow(err, err);
            // validate statusCode
            local.assertJsonEqual(data.statusCode, 401);
            // validate userJwtEncrypted does not exist
            local.assertOrThrow(
                !local.userJwtEncrypted,
                local.userJwtEncrypted
            );
            // test userLogout's 401 handling-behavior
            local.userLogout({}, gotoNext);
            break;
        case 4:
            // validate err occurred
            local.assertOrThrow(err, err);
            // validate statusCode
            local.assertJsonEqual(data.statusCode, 401);
            // validate userJwtEncrypted does not exist
            local.assertOrThrow(
                !local.userJwtEncrypted,
                local.userJwtEncrypted
            );
            // test userLoginByPassword's 200 handling-behavior
            local.userLoginByPassword({
                password: "secret",
                username: "admin"
            }, gotoNext);
            break;
        case 5:
            // validate no err occurred
            local.assertOrThrow(!err, err);
            // validate statusCode
            local.assertJsonEqual(data.statusCode, 200);
            // validate userJwtEncrypted exists
            local.assertOrThrow(local.userJwtEncrypted, local.userJwtEncrypted);
            // test persistent-session handling-behavior
            local.apiDict["operationId.x-test.crudNullGet"].ajax({}, gotoNext);
            break;
        case 6:
            // validate no err occurred
            local.assertOrThrow(!err, err);
            // validate statusCode
            local.assertJsonEqual(data.statusCode, 200);
            // validate userJwtEncrypted exists
            local.assertOrThrow(local.userJwtEncrypted, local.userJwtEncrypted);
            // test userLogout's 200 handling-behavior
            // test jwtEncoded's update handling-behavior
            local.userLogout({
                jwtEncrypted: local.jwtAes256GcmEncrypt({
                    sub: "admin"
                })
            }, gotoNext);
            break;
        case 7:
            // validate no err occurred
            local.assertOrThrow(!err, err);
            // validate statusCode
            local.assertJsonEqual(data.statusCode, 200);
            // validate userJwtEncrypted exists
            local.assertOrThrow(local.userJwtEncrypted, local.userJwtEncrypted);
            // test userLogout's 401 handling-behavior
            local.userLogout({}, gotoNext);
            break;
        case 8:
            // validate err occurred
            local.assertOrThrow(err, err);
            // validate statusCode
            local.assertJsonEqual(data.statusCode, 401);
            // test userLoginByPassword's 400 handling-behavior
            local.ajax({
                url: "/api/v0/user/userLoginByPassword?password=1"
            }, gotoNext);
            break;
        case 9:
            // validate err occurred
            local.assertOrThrow(err, err);
            // validate statusCode
            local.assertJsonEqual(data.statusCode, 400);
            // test userLogout's invalid-username handling-behavior
            local.userLogout({
                jwtEncrypted: local.jwtAes256GcmEncrypt({
                    sub: "undefined"
                })
            }, gotoNext);
            break;
        case 10:
            // validate err occurred
            local.assertOrThrow(err, err);
            // validate statusCode
            local.assertJsonEqual(data.statusCode, 401);
            onError(null, opt);
            break;
        }
    };
    gotoNext();
};
}());



// run shared js-env code - init-after
(function () {
// test apiUpdate's null-case handling-behavior
local.apiUpdate();
// test apiUpdate's root-basePath handling-behavior
local.apiUpdate({
    basePath: "/"
});
local.assertJsonEqual(local.swaggerJsonBasePath, "");
// test apiUpdate's $npm_package_swggTags0 handling-behavior
local.testMock([[
    local.env, {
        npm_package_swggTags0: "x-test-tags0-filter"
    }
]], function (onError) {
    local.apiUpdate({
        definitions: {
            Aa: {},
            Bb: {
                "x-swgg-tags0": "undefined"
            }
        },
        // test operationId's auto-create handling-behavior
        paths: {
            "/x-test/tags0Filter": {
                get: {
                    tags: [
                        "x-test"
                    ]
                }
            },
            "/x-test/tags0FilterUndefined": {
                get: {
                    "x-swgg-tags0": "undefined"
                }
            }
        },
        tags: [
            {
                "x-swgg-tags0": "undefined"
            }
        ],
        "x-swgg-tags0-override": {}
    });
    onError();
}, local.onErrorThrow);
// init assets
local.assetsDict["/assets.swgg.swagger.test.json"] = (function () {
    return local.normalizeSwaggerJson(
/* jslint ignore:start */
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
                "typeArrayCircularReference": {
                    "items": {
                        "$ref": "#/definitions/TestMisc"
                    },
                    "type": "array"
                },
                "typeBooleanRequired": {
                    "$ref": "#/parameters/typeBooleanRequired"
                },
                "typeObjectCircularReference": {
                    "$ref": "#/definitions/TestMisc"
                },
                "typeObjectMisc": {
                    "maxProperties": 5,
                    "minProperties": 1,
                    "type": "object"
                },
                "typeStringCharsetAscii": {
                    "$ref": "#/parameters/typeStringCharsetAscii"
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
        "typeArrayItemsString0": {
            "in": "query",
            "items": {
                "type": "string"
            },
            "name": "typeArrayItemsString0",
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
        "typeArrayItemsStringCollectionFormatCsv": {
            "collectionFormat": "csv",
            "default": [
                "aa",
                "bb"
            ],
            "in": "query",
            "items": {
                "type": "string"
            },
            "name": "typeArrayItemsStringCollectionFormatCsv",
            "required": true,
            "type": "array"
        },
        "typeArrayItemsStringCollectionFormatJson": {
            "default": [
                "aa",
                "bb"
            ],
            "in": "query",
            "items": {
                "type": "string"
            },
            "name": "typeArrayItemsStringCollectionFormatJson",
            "required": true,
            "type": "array",
            "x-swgg-collectionFormat": "json"
        },
        "typeArrayItemsStringCollectionFormatMultiInFormData": {
            "collectionFormat": "multi",
            "default": [
                "aa",
                "bb"
            ],
            "in": "formData",
            "items": {
                "type": "string"
            },
            "name": "typeArrayItemsStringCollectionFormatMultiInFormData",
            "required": true,
            "type": "array"
        },
        "typeArrayItemsStringCollectionFormatPipes": {
            "collectionFormat": "pipes",
            "default": [
                "aa",
                "bb"
            ],
            "in": "query",
            "items": {
                "type": "string"
            },
            "name": "typeArrayItemsStringCollectionFormatPipes",
            "required": true,
            "type": "array"
        },
        "typeArrayItemsStringCollectionFormatSsv": {
            "collectionFormat": "ssv",
            "default": [
                "aa",
                "bb"
            ],
            "in": "query",
            "items": {
                "type": "string"
            },
            "name": "typeArrayItemsStringCollectionFormatSsv",
            "required": true,
            "type": "array"
        },
        "typeArrayItemsStringCollectionFormatTsv": {
            "collectionFormat": "tsv",
            "default": [
                "aa",
                "bb"
            ],
            "in": "query",
            "items": {
                "type": "string"
            },
            "name": "typeArrayItemsStringCollectionFormatTsv",
            "required": true,
            "type": "array"
        },
        "typeArrayItemsStringEnum": {
            "default": [
                "aa",
                "bb"
            ],
            "enum": [
                "aa",
                "bb"
            ],
            "in": "query",
            "items": {
                "type": "string"
            },
            "name": "typeArrayItemsStringEnum",
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
            "exclusiveMaximum": true,
            "in": "query",
            "maximum": -0.25,
            "multipleOf": 0.5,
            "name": "typeNumber1",
            "type": "number"
        },
        "typeNumber2": {
            "exclusiveMinimum": true,
            "in": "query",
            "minimum": 0.25,
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
        "typeStringCharsetAscii": {
            "default": "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",
            "description": "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",
            "in": "query",
            "name": "typeStringCharsetAscii",
            "required": true,
            "type": "string"
        },
        "typeStringFormatBinary": {
            "default": [
                0,
                1
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
        "typeStringFormatDateTime": {
            "default": "1970-01-01T00:00:00.000Z",
            "format": "date-time",
            "in": "query",
            "name": "typeStringFormatDateTime",
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
        "/file/fileGetOneById.id.id": {
            "get": {
                "operationId": "file.fileGetOneById.id.id",
                "parameters": [
                    {
                        "default": "testVideo1",
                        "description": "File id",
                        "in": "query",
                        "name": "id",
                        "required": true,
                        "type": "string"
                    }
                ],
                "tags": [
                    "file"
                ]
            }
        },
        "/x-test-markdown/description": {
            "get": {
                "operationId": "x-test-markdown.description",
                "tags": [
                    "x-test-markdown"
                ]
            }
        },
        "/x-test/errorUndefinedApi": {
            "get": {
                "operationId": "x-test.errorUndefinedApi",
                "summary": "test undefined-api handling-behavior",
                "tags": [
                    "x-test"
                ]
            }
        },
        "/x-test/fixErrorSemanticUniquePath/{aa}": {
            "get": {
                "operationId": "x-test.fixErrorSemanticUniquePathAa",
                "parameters": [
                    {
                        "in": "path",
                        "name": "aa",
                        "required": true,
                        "type": "string"
                    }
                ],
                "summary": "test x-swgg-fixErrorSemanticUniquePath's handling-behavior",
                "tags": [
                    "x-test"
                ]
            }
        },
        "/x-test/fixErrorSemanticUniquePath/{bb}": {
            "get": {
                "operationId": "x-test.fixErrorSemanticUniquePathBb",
                "parameters": [
                    {
                        "in": "path",
                        "name": "bb",
                        "required": true,
                        "type": "string"
                    }
                ],
                "summary": "test x-swgg-fixErrorSemanticUniquePath's handling-behavior",
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
                "consumes": ["application/x-www-form-urlencoded"],
                "operationId": "x-test.parametersDefault",
                "parameters": [],
                "summary": "test parameters' default handling-behavior",
                "tags": [
                    "x-test"
                ],
                "x-swgg-required": [
                    "typeBooleanRequired"
                ]
            }
        },
        "/x-test/parametersDefaultInFormDataXml": {
            "post": {
                "consumes": [
                    "application/x-www-form-urlencoded"
                ],
                "operationId": "x-test.parametersDefaultInFormDataXml",
                "parameters": [
                    {
                        "default": false,
                        "in": "formData",
                        "name": "typeBoolean0",
                        "type": "boolean"
                    },
                    {
                        "default": 0,
                        "in": "formData",
                        "name": "typeInteger0",
                        "type": "integer"
                    },
                    {
                        "default": 0,
                        "in": "formData",
                        "name": "typeNumber0",
                        "type": "number"
                    },
                    {
                        "default": "aa",
                        "in": "formData",
                        "name": "typeString0",
                        "type": "string"
                    }
                ],
                "summary": "test parameters' string-in-body-required handling-behavior",
                "tags": [
                    "x-test"
                ],
                "x-swgg-consumes0": "application/xml"
            }
        },
        "/x-test/parametersObjectInBody": {
            "post": {
                "operationId": "x-test.parametersObjectInBody",
                "parameters": [
                    {
                        "description": "TestMisc object",
                        "in": "body",
                        "name": "typeObjectInBody",
                        "schema": {
                            "$ref": "#/definitions/TestMisc"
                        }
                    }
                ],
                "summary": "test parameters' object-in-body handling-behavior",
                "tags": [
                    "x-test"
                ]
            }
        },
        "/x-test/parametersStringInBody": {
            "post": {
                "operationId": "x-test.parametersStringInBody",
                "parameters": [
                    {
                        "in": "body",
                        "name": "typeStringInBody",
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
        },
        "/x-test/parametersStringInBodyRequired": {
            "post": {
                "operationId": "x-test.parametersStringInBodyRequired",
                "parameters": [
                    {
                        "in": "body",
                        "name": "typeStringInBodyRequired",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "summary": "test parameters' string-in-body-required handling-behavior",
                "tags": [
                    "x-test"
                ]
            }
        }
    },
    "swagger": "2.0",
    "tags": [
        {
            "name": "x-test"
        },
        {
            "name": "x-test-markdown"
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
    },
    "x-swgg-downloadStandaloneApp": "http://kaizhu256.github.io/node-swgg/build..beta..travis-ci.org/app/assets.app.js",
    "x-swgg-fixErrorSemanticUniquePath": true,
    "x-swgg-onEventDomDb": true,
    "x-swgg-tags0-override": {
        "x-test": {
            "description": "internal test-api",
            "x-swgg-descriptionLineList": [
                "internal test-api"
            ]
        }
    }
}
/* jslint ignore:end */
    );
}());



Object.keys(
    local.assetsDict["/assets.swgg.swagger.test.json"].parameters
).forEach(function (key) {
    local.assertJsonEqual(
        key,
        local.assetsDict["/assets.swgg.swagger.test.json"].parameters[key].name
    );
    local.assetsDict["/assets.swgg.swagger.test.json"].paths[
        "/x-test/parametersDefault/{typeStringInPath}"
    ].post.parameters.push({
        $ref: "#/parameters/" + key
    });
    local.assetsDict[
        "/assets.swgg.swagger.test.json"
    ].definitions.TestCrud.properties[key] = {
        $ref: "#/parameters/" + key
    };
});
local.assetsDict["/assets.swgg.swagger.test.json"].tags[1].description = (
    local.fsReadFileOrEmptyStringSync("README.md", "utf8")
);
local.assetsDict["/assets.swgg.swagger.test.json"].paths[
    "/x-test-markdown/description"
].get.description = (
    local.assetsDict["/assets.swgg.swagger.test.json"].tags[1].description
);
/* validateLineSortedReset */
local.assetsDict["/assets.swgg.swagger.test.json"] = JSON.stringify(
    local.assetsDict["/assets.swgg.swagger.test.json"]
);
// init test-api
local.apiUpdate(JSON.parse(local.assetsDict["/assets.swgg.swagger.test.json"]));
// test redundant http-body-parse-middleware handling-behavior
local.middlewareList.push(local.middlewareBodyParse);
// init test-middleware
local.middlewareList.push(function (req, response, nextMiddleware) {
    switch (req.swgg.operation && req.swgg.operation.operationId) {
    case "x-test.onErrorJsonapi":
        // test redundant onErrorJsonapi handling-behavior
        local.onErrorJsonapi(function (err, data) {
            local.serverRespondJsonapi(req, response, err, data);
        })(
            JSON.parse(req.swgg.paramDict.error || "null"),
            JSON.parse(req.swgg.paramDict.data || "null")
        );
        break;
    case "x-test.parametersDefault":
    case "x-test.parametersDefaultInFormDataXml":
    case "x-test.parametersObjectInBody":
    case "x-test.parametersStringInBody":
    case "x-test.parametersStringInBodyRequired":
        // test redundant onErrorJsonapi handling-behavior
        local.serverRespondJsonapi(req, response, null, req.swgg.paramDict);
        break;
    default:
        // serve file
        local.middlewareFileServer(req, response, nextMiddleware);
    }
});
// init db
// test dbRowRandomCreate's null-case handling-behavior
local.dbRowRandomCreate();
globalThis.utility2_dbSeedList = globalThis.utility2_dbSeedList.concat([{
    // test dbRowListRandomCreate's default handling-behavior
    dbRowList: local.dbRowListRandomCreate({
        // init 100 extra random objects
        length: 100,
        dbRowList: [
            {
                id: "testCase_crudCountManyByQuery_default",
                typeBooleanRequired: true
            }, {
                id: "testCase_crudGetManyByQuery_default",
                typeBooleanRequired: true
            }, {
                id: "testCase_crudGetOneById_default",
                typeBooleanRequired: true
            }, {
                id: "testCase_crudGetOneByQuery_default",
                typeBooleanRequired: true
            }
        ],
        override: function (opt) {
            return {
                id: "testCase_dbRowListRandomCreate_" + (opt.ii + 100)
            };
        },
        schema: local.swaggerJson.definitions.TestCrud
    }),
    idIndexCreateList: [
        {
            name: "id"
        }
    ],
    name: "TestCrud"
}, {
    dbRowList: [
        {
            id: "testCase_fileGetOneById_default",
            fileBlob: local.templateSwaggerUiLogoSmallBase64,
            fileContentType: "image/png",
            typeBooleanRequired: true
        }, {
            id: "testCase_ui_fileMedia_audioNull",
            fileBlob: "",
            fileContentType: "audio/wav",
            fileDescription: "null audio file",
            fileFilename: "testCase_ui_fileMedia_audioNull.wav"
        }, {
            id: "testCase_ui_fileMedia_imageNull",
            fileBlob: "",
            fileContentType: "image/bmp",
            fileDescription: "null image file",
            fileFilename: "testCase_ui_fileMedia_imageNull.wav"
        }, {
            id: "testCase_ui_fileMedia_videoNull",
            fileBlob: "",
            fileContentType: "video/mpeg",
            fileDescription: "null video file",
            fileFilename: "testCase_ui_fileMedia_videoNull.mpg"
        }, {
            id: "testAudio1",
/* jslint ignore:start */
        fileBlob: '\
T2dnUwACAAAAAAAAAACjCeQLAAAAADx3X4QBHgF2b3JiaXMAAAAAASJWAAAAAAAAHp0AAAAAAACpAU9n\
Z1MAAAAAAAAAAAAAownkCwEAAADaEOOYDkD////////////////FA3ZvcmJpcw0AAABMYXZmNTYuNDAu\
MTAxAQAAAB8AAABlbmNvZGVyPUxhdmM1Ni42MC4xMDAgbGlidm9yYmlzAQV2b3JiaXMiQkNWAQBAAAAY\
QhAqBa1jjjrIFSGMGaKgQsopxx1C0CGjJEOIOsY1xxhjR7lkikLJgdCQVQAAQAAApBxXUHJJLeecc6MY\
V8xx6CDnnHPlIGfMcQkl55xzjjnnknKOMeecc6MYVw5yKS3nnHOBFEeKcacY55xzpBxHinGoGOecc20x\
t5JyzjnnnHPmIIdScq4155xzpBhnDnILJeecc8YgZ8xx6yDnnHOMNbfUcs4555xzzjnnnHPOOeecc4wx\
55xzzjnnnHNuMecWc64555xzzjnnHHPOOeeccyA0ZBUAkAAAoKEoiuIoDhAasgoAyAAAEEBxFEeRFEux\
HMvRJA0IDVkFAAABAAgAAKBIhqRIiqVYjmZpniZ6oiiaoiqrsmnKsizLsuu6LhAasgoASAAAUFEUxXAU\
BwgNWQUAZAAACGAoiqM4juRYkqVZngeEhqwCAIAAAAQAAFAMR7EUTfEkz/I8z/M8z/M8z/M8z/M8z/M8\
z/M8DQgNWQUAIAAAAIIoZBgDQkNWAQBAAAAIIRoZQ51SElwKFkIcEUMdQs5DqaWD4CmFJWPSU6xBCCF8\
7z333nvvgdCQVQAAEAAAYRQ4iIHHJAghhGIUJ0RxpiAIIYTlJFjKeegkCN2DEEK4nHvLuffeeyA0ZBUA\
AAgAwCCEEEIIIYQQQggppJRSSCmmmGKKKcccc8wxxyCDDDLooJNOOsmkkk46yiSjjlJrKbUUU0yx5RZj\
rbXWnHOvQSljjDHGGGOMMcYYY4wxxhgjCA1ZBQCAAAAQBhlkkEEIIYQUUkgppphyzDHHHANCQ1YBAIAA\
AAIAAAAcRVIkR3IkR5IkyZIsSZM8y7M8y7M8TdRETRVV1VVt1/ZtX/Zt39Vl3/Zl29VlXZZl3bVtXdZd\
Xdd1Xdd1Xdd1Xdd1Xdd1XdeB0JBVAIAEAICO5DiO5DiO5EiOpEgKEBqyCgCQAQAQAICjOIrjSI7kWI4l\
WZImaZZneZaneZqoiR4QGrIKAAAEABAAAAAAAICiKIqjOI4kWZamaZ6neqIomqqqiqapqqpqmqZpmqZp\
mqZpmqZpmqZpmqZpmqZpmqZpmqZpmqZpmqZpAqEhqwAACQAAHcdxHEdxHMdxJEeSJCA0ZBUAIAMAIAAA\
Q1EcRXIsx5I0S7M8y9NEz/RcUTZ1U1dtIDRkFQAACAAgAAAAAAAAx3M8x3M8yZM8y3M8x5M8SdM0TdM0\
TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TdM0TQNCQ1YCAGQAABCTkEpOsVdGKcYktF4q\
pBST1HuomGJMOu2pQgYpB7mHSiGloNPeMqWQUgx7p5hCyBjqoYOQMYWw19pzz733HggNWREARAEAAMYg\
xhBjyDEmJYMSMcckZFIi55yUTkompaRWWsykhJhKi5FzTkonJZNSWgupZZJKayWmAgAAAhwAAAIshEJD\
VgQAUQAAiDFIKaQUUkoxp5hDSinHlGNIKeWcck45x5h0ECrnGHQOSqSUco45p5xzEjIHlXMOQiadAACA\
AAcAgAALodCQFQFAnAAAgJBzijEIEWMQQgkphVBSqpyT0kFJqYOSUkmpxZJSjJVzUjoJKXUSUiopxVhS\
ii2kVGNpLdfSUo0txpxbjL2GlGItqdVaWqu5xVhzizX3yDlKnZTWOimtpdZqTa3V2klpLaTWYmktxtZi\
zSnGnDMprYWWYiupxdhiyzW1mHNpLdcUY88pxp5rrLnHnIMwrdWcWss5xZh7zLHnmHMPknOUOimtdVJa\
S63VmlqrNZPSWmmtxpBaiy3GnFuLMWdSWiypxVhaijHFmHOLLdfQWq4pxpxTiznHWoOSsfZeWqs5xZh7\
iq3nmHMwNseeO0q5ltZ6Lq31XnMuQtbci2gt59RqDyrGnnPOwdjcgxCt5Zxq7D3F2HvuORjbc/Ct1uBb\
zUXInIPQufimezBG1dqDzLUImXMQOugidPDJeJRqLq3lXFrrPdYafM05CNFa7inG3lOLvdeem7C9ByFa\
yz3F2IOKMfiaczA652JUrcHHnIOQtRahey9K5yCUqrUHmWtQMtcidPDF6KCLLwAAYMABACDAhDJQaMiK\
ACBOAIBByDmlGIRKKQihhJRCKClVjEnImIOSMSellFJaCCW1ijEImWNSMsekhBJaKiW0EkppqZTSWiil\
tZZajCm1FkMpqYVSWiultJZaqjG1VmPEmJTMOSmZY1JKKa2VUlqrHJOSMSipg5BKKSnFUlKLlXNSMuio\
dBBKKqnEVFJpraTSUimlxZJSbCnFVFuLtYZSWiypxFZSajG1VFuLMdeIMSkZc1Iy56SUUlIrpbSWOSel\
g45K5qCkklJrpaQUM+akdA5KyiCjUlKKLaUSUyiltZJSbKWk1lqMtabUWi0ltVZSarGUEluLMdcWS02d\
lNZKKjGGUlprMeaaWosxlBJbKSnGkkpsrcWaW2w5hlJaLKnEVkpqsdWWY2ux5tRSjSm1mltsucaUU4+1\
9pxaqzW1VGNrseZYW2+11pw7Ka2FUlorJcWYWouxxVhzKCW2klJspaQYW2y5thZjD6G0WEpqsaQSY2sx\
5hhbjqm1WltsuabUYq219hxbbj2lFmuLsebSUo01195jTTkVAAAw4AAAEGBCGSg0ZCUAEAUAABjDGGMQ\
GqWcc05Kg5RzzknJnIMQQkqZcxBCSClzTkJKLWXOQUiptVBKSq3FFkpJqbUWCwAAKHAAAAiwQVNicYBC\
Q1YCAFEAAIgxSjEGoTFGKecgNMYoxRiESinGnJNQKcWYc1Ayx5yDUErmnHMQSgkhlFJKSiGEUkpJqQAA\
gAIHAIAAGzQlFgcoNGRFABAFAAAYY5wzziEKnaXOUiSpo9ZRayilGkuMncZWe+u50xp7bbk3lEqNqdaO\
a8u51d5pTT23HAsAADtwAAA7sBAKDVkJAOQBABDGKMWYc84ZhRhzzjnnDFKMOeecc4ox55yDEELFmHPO\
QQghc845CKGEkjnnHIQQSuicg1BKKaV0zkEIoZRSOucghFJKKZ1zEEoppZQCAIAKHAAAAmwU2ZxgJKjQ\
kJUAQB4AAGAMQs5Jaa1hzDkILdXYMMYclJRii5yDkFKLuUbMQUgpxqA7KCm1GGzwnYSUWos5B5NSizXn\
3oNIqbWag8491VZzz733nGKsNefecy8AAHfBAQDswEaRzQlGggoNWQkA5AEAEAgpxZhzzhmlGHPMOeeM\
Uowx5pxzijHGnHPOQcUYY845ByFjzDnnIISQMeaccxBC6JxzDkIIIXTOOQchhBA656CDEEIInXMQQggh\
hAIAgAocAAACbBTZnGAkqNCQlQBAOAAAACGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEII\
IYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEII\
IYQQQgghhBBCCCGEEEIIIYQQQgghhBBC6JxzzjnnnHPOOeecc84555xzzjknAMi3wgHA/8HGGVaSzgpH\
gwsNWQkAhAMAAApBKKViEEopJZJOOimdk1BKKZGDUkrppJRSSgmllFJKCKWUUkoIHZRSQimllFJKKaWU\
UkoppZRSOimllFJKKaWUyjkppZNSSimlRM5JKSGUUkoppYRSSimllFJKKaWUUkoppZRSSimlhBBCCCGE\
EEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEAgC4GxwAIBJsnGEl6axwNLjQkJUAQEgAAKAUc45K\
CCmUkFKomKKOQikppFJKChFjzknqHIVQUiipg8o5CKWklEIqIXXOQQclhZBSCSGVjjroKJRQUiollNI5\
KKWEFEpKKZWQQkipdJRSKCWVlEIqIZVSSkgllRBKCp2kVEoKqaRUUgiddJBCJyWkkkoKqZOUUiolpZRK\
SiV0UkIqKaUQQkqplBBKSCmlTlJJqaQUQighhZRSSiWlkkpKIZVUQgmlpJRSKKGkVFJKKaWSUikAAODA\
AQAgwAg6yaiyCBtNuPAAFBqyEgAgAwBAlHTWaadJIggxRZknDSnGILWkLMMQU5KJ8RRjjDkoRkMOMeSU\
GBdKCKGDYjwmlUPKUFG5t9Q5BcUWY3zvsRcBAAAIAgAEhAQAGCAomAEABgcIIwcCHQEEDm0AgIEImQkM\
CqHBQSYAPEBESAUAiQmK0oUuCCGCdBFk8cCFEzeeuOGEDm0QAAAAAAAQAPABAJBQABER0cxVWFxgZGhs\
cHR4fICEBAAAAAAACAB8AAAkIkBERDRzFRYXGBkaGxwdHh8gIQEAAAAAAAAAAEBAQAAAAAAAIAAAAEBA\
T2dnUwAEdUwAAAAAAACjCeQLAgAAAGfg57QxCGVmeF9de3hrUGFaUXdua2FhbGtSVFdTentxdG9nX2BP\
WltbW10LAQEBAQEBAQEBAfyc8mb0AQAA9C5wjQrHdiyA4T4BgMYlwEgzMWz+rrvYWPY5JjS+YzQNOvLR\
VnQgctv50pFBKBAQzeE7qy6oGdKQBuUXz/72TaJvi6AJIDOe05LzLF69KlwPQnmfXXFRwt9qQvUPLami\
av38eAHsNLPAsT+aAcjaBLIgqDZw1bnXz43+f2CpcRa2RmooK40pl8LnTLT+3KTFkmLgVN3X0FCC7bFT\
HSyntiWq+LHFixGPTxtKv0XLi+MOJ0rRYFv83Q6r1pdc8eSIemr3q+BGxWe0mwHy58uVggOY8Gi1G1oC\
DhLKYGapNBKI352q7WOTzLetcNetZjEemJ0V++OWlDystSwWqytZShGv7GJ7lm+fqhciYKPapcAwTYy6\
c8zVldaqKZKkFn7Y2m+Dowzey22D2x82qoeepz/PHFk3gQ8/OTAsxQ0BmvSHAgBcN4GV5tAMHbAAjZvP\
mSOfLe1bTzqdoV6a/LlNFVDz6viIEIfhyPxSM2mnntpOzwdhX23/i7IIIOzRwvQol4Cu0lYinFnH+rZ5\
foqySPNEhg8RiAYikG2GbNkACv5CDmyrWWHtYNCe25rQXwbAQsuuW/FdfisMvxba4gHk2RxLv5Ac+rJd\
AO3Dd9crhASYrV5lGgD6f9oWF2zHdrruXA1kbefN/3fNDTQYpdBgC4gF+PcLSPHxsqjrMSatAfoac17I\
VycN0iqd3w1r7MzZcUjg/guguWASRoDWv6aAEFfv6mfiKqz93S6V3ITDFDUAgAr8qdfx7dEPAQAACA2/\
SLet/RmhAAAAgICn8uHs9fS9r7+XVkZVAACZ1X3jeSU3+tjn+Hu4nMB5ewAKTO7JMADAGgPO/aWROl4q\
Y5Ea0YgPwu2RuAE2nMxuF+CubAISzmyNMrr3hWmbd+qDVcPL+o+zRwEAIL11bt9fE+1iGAAAAGTR41qe\
yDkbA3Dv8+61ClpiCuhwRmQCOG3aW2QzXhwBQA95+/j8S/H5onTxLAIj+4vPwlbR0cEBxMEmQMkdARaq\
SiekfPlffkj3b52bIR0d1vtTSwK0rjkJHQCCBLgR0ex59u7ipc5gPWgAAGgGbeNuQ4H6xcHf4fcl+9R9\
m+pOAAAAvbcjUTnuopZQx6eoNL61JXKvxD1ZBY1TtApAe9KXBgAAHbB1WtgDZLlJ4YLnY9qnAXoL+O6y\
R368TOSiwQCsdjQvs204lWCpfVy1FAAAqMXLD0bt1/s7tclvA65u/cPmprD+ebPtPikFgC3E7I5jDujw\
MQk3fWd0sym8dlCfod5mYHvA7fI926txtX/RYOtAQdDNs/5y4F0MQOO5uGMAAMDgv0t3fty0/h7u7iT+\
t6n/Pu0b2jGfjEx8uzAIAIBkmqhfK772NMqOZ5vQhG9mrTEvDpdHsVAGfLUW34kPIiPB1iY4erclWowG\
Cajps+s51Ha/8z4I2TJZ76NVAKDPP/98NL1Y/uvyi92uCS8lhEaTxYOnlnV3dtqZEkUBy8faK/zTq+Ga\
BpRzEQCycDWKcTJMdK8eXebRrt3GNMIuaF1nEg3aBah+/NqknP/9+DZE5Dfh43kXADFuTa9WAPJb4tiq\
MRweO862baGf/jOPrXnMgAgA1w4aDpIzSDf0RT94uxwAWhrjAA4rLtDP780wNv1SnZom8L4JsHEJaoTW\
qIOE3brrPtr3iQfoxIi+3ldyGoCacx5bGdyV9jQAAK76PenC2ovbd0cBAKLZf+z255eaP830RnKE1ZPm\
pCkGQLerVYWqcgwJymAASgc4n9V/6QAsgLcFaJ/W2gJeusICdMkJ2z33700SftJXSkAsC8AkXFtwGOoc\
3984dfXNm7OVfgDAd0LcEft9cTfPKTKSrBEAoConAHwY8jL6ay5A+Pvm7RV1VYLWyxgAZtwwDsABKIsC\
P9b8e+lRtlq32W26hgAWUN/98y2nDx7KoglYOg1ad7eem67pOdfZAGZBAaCFRxUcXLU/o8HnA63wAjSL\
L00fa/PCFfykq/bqAhQAAF8Y+Xh/V+VYACRs7farZBwqAAAk5iun0QDPOqqCB8B4+k9uY+tz9v0lIlHI\
bioAOPCrYvQAXnoyHePBi8GySzZuo/0gUQxMXiz58CrofuHcbR+fx0UohN7u/kr3Apxx5qunkjfYCwD4\
+FELAHxJnUpAACah3l+AG8qWi6fjJ0DbFp3eLy4+nU6nKgBeoLwGcM1X41KzBF6augpw57pAy17zHmyZ\
E6ReTIucA9PMrSgp3Avt+Y+cL6rRqf3ZQEWeyoe7a6EApWNwAACOjufhYi0AUB+PfiH2gIY8judogB0N\
AMhft6/12238dpwTpgDw6sC8AszdpQA+qioZiW/1xaAafgbfILZJWwEAiadprkUBnxQm8736tb3j72tn\
XBwN55v62ySgAADr9drW321P93IUEAAJAKTsU+tXEikTAOz29/c5jwZA13M4f47zNgD4FE0LsF4CAMbr\
E04dcN4DdEsQawB2umIJ4WZHAdtzw9qW76QEADnAJDXXAOLYWL5qag/Ll5w3/4q7HI359uZfJwgCAILB\
xcHW8+ZPLgDotyT9Mz9tmog7gId9uPBU1wBd1xfb/807eHwzYR2AytlKACx9/gPVAIgACfiAGarWBGSp\
Xt3Rx95IrFhA0erDlih9H0BJV+es7PyuK/rDiwvvtQAAXmufpFsAs3nbuzVUfcL+L0xqD+TOu74cfzkK\
AAB5knkA9r4s0C5oq2rSAZFSqgtsqUnxgPNDr1SwbUAzrU925QDttBMANT1j7c+TNEKS7pv7t3MDACDh\
szFTFBh+uvjgJr/+9Wd3gAIAAKAxdV33ntXUDEA5wAoUwPn++tBmELKEOQBksR7YuB9eVED2QPto/bJr\
OxxwexsDUKrxhYCnR0uRADaFd5OfWBGAzcru33MBaE/4yb77zb8jq6IAAAAYU9+88Of2oQlaEhEHEGjC\
5neUmVmnSD88oxxsKRZeO5wfVk1Aawu4FuDPNe4FB9gLAFnJzeUPus0+DhAG39tzHwD45nvybOcAYvOF\
9Z/wwfD/VqsCAADgu7tLL58b2TUbBVS1CgCfqT5BN/81ALrKUhXl33ZICKjcNDdpyO3wbSTAfAKsrT1o\
ghxwm8wCghG1ulkday6Il9f/U786igMUDdH48Hq8qGOQFgAAoPet6W1iWdfKJgAAAOAaxzdP48sd459t\
/ZrRSgQA3aqKr6Ee5KWKLddAAkBcF32jmADcZTYNyOYKBZEAPtqilmpd0Qn8S7EPazz39Ovgdx2AXb4N\
JkEOsK0OEIyrlTWvmHqPxcqX5YBzhb+u3noHAAAknJxiv+fq1lW7AgAAQEVOzWFXjWlnrRq9iQi4JwAA\
AJKu5f//J2CIr/Gu0CMKjngeOcICWNFQ+b5uc9cAgAWQAe06MDUBPopCFj5JXaBNbf6+CWmNg+jnAKx/\
AFOQgqwtSCC169nR5L6j2r5KKzc6MwCAswgOtB+wXIW3AAAApBlv85uu5ZbRKADOJ565u4XdejitPMnB\
AgB2z5d7Eq37s+yzBZeikIxM3Tx+PzpiDkCIZxr9NwBeOgMKqvVlMDsveBNLDq3tsIDqLVPkgF8fgBDT\
spNaRl8P+1+6B6pzQgCgmkGCHzx9oRsAqlGCy2Pn9O3SXzJ534+GWhEAne+GBABU6eqJv8l4l7ODAYDs\
z1GZl7Fm8SVLtwkACjNe8SJ1wNIpuQpG4hyVDp4as4RJOaxF4Nerbyw5evEMcDCTIgfeagIIxzz4SFNo\
3UYfer2g+0EuAHjC4o+fW7OSBYBCwjet9q7bQxd33cEiIV2lAABwPgOs/SrN669HDYWWfp/bwKhEm5Zu\
iwE4BnMbCB4vxoBaAOMPn/WdBz66wpKFZx9vwMEvN9agu1cCwIfIAVajESCEG3wqN9qy1tiZ09ZpAprA\
SP44f71IFAAAoESam+GfdPvxv49n064cowIFoHewuXOExshlLNhZZ1VfHrBrv3fYcBAAHQCtsDSzoVMd\
Lx1eWlKaDr/dPhF2XvCC1eIGRK2TA6xmJCDEibGjqzXhw9JK+k9yCwAAAl2dJ+x0X9QxPmqZu4IwAMAt\
GZV/GRkAAACgO2Rb+yUCtId6bjZAx+d4nW+3G4ADwKIBli9NFRY6Yhry29s1hH0nvAFx9bMHCyAqDXJA\
rU4KoOI6PqmfO8u/qpLAaqBa892ymQMEAAAABLT6wO6nc0/73cdbpG4hCgDgmm7jjkEfg/O3rx2As9lR\
fo3IBQCkBzhv8jyvAUQfJzJPaJ9sA7hrDzvJXhPgAAeA5I7PmzzUsnz1rxCaDC3r/eJGbl78rLUkUZ+M\
f9z6ciIAAAAAAgCVt/+f+OTFNgcAAFokAPuX4KC9OAn8mhIJei1AdY5yWejItPPTg/2Bp0ODia3nzYuL\
ZT9ukVgenOfSbRkMx63bSVo7cd1lypzOr12qSOpOKixz2vbrk5J2xshMNKcz2oxI9LiKlvdnvycbuP71\
GSksP+6lyrsPQeO8wy+6PxwQrbqxD3ubbUKfr18d5yI5808Fp3mPEZyJyf4ugSAGHuB8LWzrpkg463FU\
xsaBbqozVEXc+re4ETXi+S+0q1mtX2sGJp+2W4yOQ70EDMMOgbMbAMD5qvueb9+ctZSKZ/+0TS2Matna\
5yaO9lrqx+Xld8RQoYcvExYN0I/i788aHKl5rNHiY3n49L1+rCXUKGDL7aVzMPE3i3YUl0KPJZtvoHcL\
xY6IACy9VRncFgqwDQwgNfXn5OzjuKnQFvpb4mgauNSsYDRpiUT3auWlDIKmk1KQYi6u+T3qK1BGRERx\
wJb6bHA5a3ueknJyrVckK38sf16V9s0RwVNLE4oW19muEgwsrchr05w9wA6QBXDFLevXL9d4jHFUp0tL\
EpGX7548lVElzgfTdapZmC4tPXvR0IyWXOgqXJ6IpfkuoCK0kwN89lfB5S+kI8qKMsO9n5+EWaTunKWr\
kDf707k/nwYa6Pkl/gDgAAAAAA4ODg4ODg4ODg4=\
' ,
/* jslint ignore:end */
            fileContentType: "audio/ogg",
            fileDescription: "test audio",
            fileFilename: "Hello_world_said_by_eSpeakNG.ogg"
        }, {
            id: "testImage1",
/* jslint ignore:start */
        fileBlob: '\
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\
hbGOyJmqz7GqfSc2QQhScsFnpDUjQK1Uj//Z\
' ,
/* jslint ignore:end */
            fileContentType: "image/jpeg",
            fileDescription: "test image",
            fileFilename: "330px-Lenna_(test_image).jpg"
        }, {
            id: "testVideo1",
/* jslint ignore:start */
        fileBlob: '\
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\
VVVVVVVVVVVVVVVN0zRNEwgNWQkAkAEAkBBTLS3GmgmLJGLSaqugYwxS7KWxSCpntbfKMYUYtV4ah5RR\
EHupJGOKQcwtpNApJq3WVEKFFKSYYyoVUg5SIDRkhQAQmgHgcBxAsixAsiwAAAAAAAAAkDQN0DwPsDQP\
AAAAAAAAACRNAyxPAzTPAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAABA0jRA8zxA8zwAAAAAAAAA0DwP8DwR8EQRAAAAAAAAACzPAzTR\
AzxRBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAABA0jRA8zxA8zwAAAAAAAAAsDwP8EQR0DwRAAAAAAAAACzPAzxRBDzRAwAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
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\
' ,
/* jslint ignore:end */
            fileContentType: "video/webm",
            fileDescription: "test video",
            fileFilename: "big_buck_bunny_trailer.2008.160p.webm"
        }
    ],
    idIndexCreateList: [
        {
            name: "id"
        }
    ],
    name: "File"
}]);
// seed db
local.db.dbSeed(globalThis.utility2_dbSeedList, local.onErrorThrow);
// run validation test
// local.tryCatchOnError(function () {
// local.testCase_swaggerJsonFromCurl_default(null, local.onErrorDefault);
// local.testCase_swaggerValidate_default(null, local.onErrorDefault);
// local.testCase_swaggerValidateDataParameters_default(
// null,
// local.onErrorDefault
// );
// local.testCase_swaggerValidateDataParameters_err(null, local.onErrorDefault);
// }, local.onErrorDefault);
}());
}());
