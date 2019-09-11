/*
example.js

this script will run a web-demo of swgg

instruction
    1. save this script as example.js
    2. run shell-command:
        $ npm install swgg && PORT=8081 node example.js
    3. open a browser to http://127.0.0.1:8081 and play with web-demo
    4. edit this script to suit your needs
*/



/* istanbul instrument in package swgg */
/* istanbul ignore next */
/* jslint utility2:true */
(function (globalThis) {
    "use strict";
    var consoleError;
    var local;
    // init globalThis
    (function () {
        try {
            globalThis = Function("return this")(); // jslint ignore:line
        } catch (ignore) {}
    }());
    globalThis.globalThis = globalThis;
    // init debug_inline
    if (!globalThis["debug\u0049nline"]) {
        consoleError = console.error;
        globalThis["debug\u0049nline"] = function () {
        /*
         * this function will both print <arguments> to stderr
         * and return <arguments>[0]
         */
            var argList;
            argList = Array.from(arguments); // jslint ignore:line
            // debug arguments
            globalThis["debug\u0049nlineArguments"] = argList;
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
        typeof window === "object"
        && window === globalThis
        && typeof window.XMLHttpRequest === "function"
        && window.document
        && typeof window.document.querySelector === "function"
    );
    // init function
    local.assertThrow = function (passed, message) {
    /*
     * this function will throw error <message> if <passed> is falsy
     */
        var error;
        if (passed) {
            return;
        }
        error = (
            // ternary-condition
            (
                message
                && typeof message.message === "string"
                && typeof message.stack === "string"
            )
            // if message is an error-object, then leave it as is
            ? message
            : new Error(
                typeof message === "string"
                // if message is a string, then leave it as is
                ? message
                // else JSON.stringify message
                : JSON.stringify(message, null, 4)
            )
        );
        throw error;
    };
    local.functionOrNop = function (fnc) {
    /*
     * this function will if <fnc> exists,
     * them return <fnc>,
     * else return <nop>
     */
        return fnc || local.nop;
    };
    local.identity = function (value) {
    /*
     * this function will return <value>
     */
        return value;
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
}(this));



(function (local) {
"use strict";



// run shared js-env code - init-before
(function () {
// init local
local = (
    globalThis.utility2_rollup
    || globalThis.utility2_swgg
    || require("swgg")
);
// init exports
globalThis.local = local;
// init assets
local.assetsDict["/assets.swgg.swagger.json"] = (
    local.assetsDict["/assets.swgg.swagger.petstore.json"]
);
// load db
local.db.dbLoad(function () {
    console.error("db loaded from " + local.storageDir);
});
}());



// run shared js-env code - function
(function () {
local.middlewareCrudCustom = function (request, response, nextMiddleware) {
/*
 * this function will run the middleware that will run custom-crud-operations
 */
    var crud;
    var option;
    var result;
    option = {};
    local.onNext(option, function (error, data) {
        switch (option.modeNext) {
        case 1:
            crud = request.swgg.crud;
            switch (crud.crudType[0]) {
            // coverage-hack - test error handling-behavior
            case "crudErrorPre":
                option.onNext(local.errorDefault);
                return;
            case "getInventory":
                crud.dbTable.crudGetManyByQuery({
                    query: {},
                    projection: ["status"]
                }, option.onNext);
                break;
            default:
                option.modeNext = Infinity;
                option.onNext();
            }
            break;
        case 2:
            switch (crud.crudType[0]) {
            case "getInventory":
                result = {};
                data.forEach(function (element) {
                    result[element.status] = result[element.status] || 0;
                    result[element.status] += 1;
                });
                option.onNext(null, result);
                break;
            }
            break;
        case 3:
            local.swgg.serverRespondJsonapi(request, response, error, data);
            break;
        default:
            nextMiddleware(error, data);
        }
    });
    option.modeNext = 0;
    option.onNext();
};

local.middlewareInitCustom = function (request, response, nextMiddleware) {
/*
 * this function will run the middleware that will custom-init the request and response
 */
    // enable cors
    // https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
    response.setHeader(
        "Access-Control-Allow-Methods",
        "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT"
    );
    response.setHeader("Access-Control-Allow-Origin", "*");
    // init content-type
    response.setHeader("Content-Type", "application/json; charset=UTF-8");
    // ignore .map files
    if (request.urlParsed.pathname.slice(-4) === ".map") {
        local.serverRespondDefault(request, response, 404);
        return;
    }
    nextMiddleware();
};
}());



// run shared js-env code - init-after
(function () {
// init assets
/* jslint ignore:start */
local.assetsDict['/assets.index.template.html'] = local.assetsDict['/assets.swgg.html']
    .replace((/\n<\/script>\n/), '\n</script>\n<h1>\n    <a href="{{env.npm_package_homepage}}" target="_blank">\n        {{env.npm_package_name}} (v{{env.npm_package_version}})\n    </a>\n</h1>\n<h3>{{env.npm_package_description}}</h3>\n<a class="button" download href="assets.app.js">download standalone app</a><br>\n<button class="button" data-onevent="testRunBrowser" data-onevent-reset-output="1" id="testRunButton1">run internal test</button><br>\n<div class="uiAnimateSlide" id="testReportDiv1" style="border-bottom: 0; border-top: 0; margin-bottom: 0; margin-top: 0; max-height: 0; padding-bottom: 0; padding-top: 0;"></div>\n\n\n\n<button class="button" data-onevent="onEventDomDb" data-onevent-db="dbReset">reset database</button><br>\n<button class="button" data-onevent="onEventDomDb" data-onevent-db="dbExport">export database -&gt; file</button><br>\n<button class="button" data-onevent="onEventDomDb" data-onevent-db="dbImport">import database &lt;- file</button><br>\n</button><br>\n<input class="onchange zeroPixel" type="file" id="dbImportInput1">\n')




















            .replace('assets.swgg.swagger.json', 'assets.swgg.swagger.server.json')
            .replace((/\n<script src=[\S\s]*\n<\/html>\n/), '\n<!-- utility2-comment\n{{#if isRollup}}\n<script src="assets.app.js"></script>\n{{#unless isRollup}}\nutility2-comment -->\n<script src="assets.utility2.rollup.js"></script>\n<script>window.utility2_onReadyBefore.counter += 1;</script>\n<script src="jsonp.utility2.stateInit?callback=window.utility2.stateInit"></script>\n<script src="assets.swgg.js"></script>\n<script src="assets.example.js"></script>\n<script src="assets.test.js"></script>\n<script>window.utility2_onReadyBefore();</script>\n<!-- utility2-comment\n{{/if isRollup}}\nutility2-comment -->\n</body>\n</html>\n');



















/* jslint ignore:end */



// init middleware
local.middlewareList = [
    local.middlewareInit,
    local.middlewareForwardProxy,
    local.middlewareAssetsCached,
    local.swgg.middlewareRouter,
    local.swgg.middlewareUserLogin,
    local.middlewareInitCustom,
    local.middlewareJsonpStateInit,
    local.middlewareBodyRead,
    local.swgg.middlewareBodyParse,
    local.swgg.middlewareValidate,
    local.middlewareCrudCustom,
    local.swgg.middlewareCrudBuiltin,
    local.swgg.middlewareCrudEnd
];
local.utility2.middlewareList = local.middlewareList;
// run test-server
local.testRunServer(local);
/* validateLineSortedReset */
// init petstore-api - frontend
local.tmp = JSON.parse(local.assetsDict["/assets.swgg.swagger.petstore.json"]);
delete local.tmp.basePath;
delete local.tmp.host;
delete local.tmp.schemes;
local.swgg.apiUpdate(local.tmp);
// init petstore-api - backend
local.swgg.apiUpdate({
    definitions: {
        File: {
            allOf: [{
                $ref: "#/definitions/BuiltinFile"
            }]
        },
        Pet: {
            properties: {
                _id: {
                    readOnly: true,
                    type: "string"
                },
                _timeCreated: {
                    format: "date-time",
                    readOnly: true,
                    type: "string"
                },
                _timeUpdated: {
                    format: "date-time",
                    readOnly: true,
                    type: "string"
                },
                id: {
                    default: 1,
                    minimum: 1
                }
            }
        },
        Order: {
            properties: {
                _id: {
                    readOnly: true,
                    type: "string"
                },
                _timeCreated: {
                    format: "date-time",
                    readOnly: true,
                    type: "string"
                },
                _timeUpdated: {
                    format: "date-time",
                    readOnly: true,
                    type: "string"
                },
                id: {
                    default: 1,
                    minimum: 1
                }
            }
        },
        User: {
            allOf: [{
                $ref: "#/definitions/BuiltinUser"
            }],
            properties: {
                _id: {
                    readOnly: true,
                    type: "string"
                },
                _timeCreated: {
                    format: "date-time",
                    readOnly: true,
                    type: "string"
                },
                _timeUpdated: {
                    format: "date-time",
                    readOnly: true,
                    type: "string"
                },
                email: {
                    default: "a@a.com",
                    format: "email"
                },
                id: {
                    default: 1,
                    minimum: 1
                }
            }
        }
    },
    tags: [{
        description: "builtin-file model",
        name: "file"
    }],
    "x-swgg-apiDict": {
        "operationId.file.crudCountManyByQuery": {
            _schemaName: "File"
        },
        "operationId.file.crudSetOneById.id.id": {
            _schemaName: "File"
        },
        "operationId.file.crudGetManyByQuery": {
            _schemaName: "File"
        },
        "operationId.file.crudRemoveOneById.id.id": {
            _schemaName: "File"
        },
        "operationId.file.crudUpdateOneById.id.id": {
            _schemaName: "File"
        },
        "operationId.file.fileGetOneById.id.id": {
            _schemaName: "File"
        },
        "operationId.file.fileUploadManyByForm.1": {
            _schemaName: "File"
        },
        "operationId.addPet": {
            _crudType: ["crudSetOneById", "petId", "id"],
            _schemaName: "Pet"
        },
        "operationId.pet.crudGetManyByQuery": {
            _schemaName: "Pet"
        },
        "operationId.deletePet": {
            _crudType: ["crudRemoveOneById", "petId", "id"],
            _schemaName: "Pet"
        },
        "operationId.findPetsByStatus": {
            _crudType: ["crudGetManyByQuery"],
            _queryWhere: "{\"status\":{\"$in\":{{status jsonStringify}}}}",
            _schemaName: "Pet"
        },
        "operationId.findPetsByTags": {
            _crudType: ["crudGetManyByQuery"],
            _queryWhere: "{\"tags.name\":{\"$in\":{{tags jsonStringify}}}}",
            _schemaName: "Pet"
        },
        "operationId.getPetById": {
            _crudType: ["crudGetOneById", "petId", "id"],
            _schemaName: "Pet"
        },
        "operationId.updatePet": {
            _crudType: ["crudUpdateOneById", "petId", "id"],
            _schemaName: "Pet"
        },
        "operationId.updatePetWithForm": {
            _crudType: ["crudUpdateOneById", "petId", "id"],
            _schemaName: "Pet"
        },
        "operationId.uploadFile": {
            _crudType: ["fileUploadManyByForm"],
            _schemaName: "User"
        },
        "operationId.store.crudGetManyByQuery": {
            _schemaName: "Order"
        },
        "operationId.store.crudUpdateOneById.id.id": {
            _schemaName: "Order"
        },
        "operationId.deleteOrder": {
            _crudType: ["crudRemoveOneById", "orderId", "id"],
            _schemaName: "Order"
        },
        "operationId.getInventory": {
            _schemaName: "Order"
        },
        "operationId.getOrderById": {
            _crudType: ["crudGetOneById", "orderId", "id"],
            _schemaName: "Order"
        },
        "operationId.placeOrder": {
            _crudType: ["crudSetOneById", "orderId", "id"],
            _schemaName: "Order"
        },
        "operationId.createUser": {
            _crudType: ["crudSetOneById", "username", "username"],
            _schemaName: "User"
        },
        "operationId.createUsersWithArrayInput": {
            _crudType: ["crudSetManyById"],
            _schemaName: "User"
        },
        "operationId.createUsersWithListInput": {
            _crudType: ["crudSetManyById"],
            _schemaName: "User"
        },
        "operationId.user.crudCountManyByQuery": {
            _schemaName: "User"
        },
        "operationId.user.crudSetOneById.username.username": {
            _schemaName: "User"
        },
        "operationId.user.crudRemoveOneById.username.username": {
            _schemaName: "User"
        },
        "operationId.user.crudGetManyByQuery": {
            _schemaName: "User"
        },
        "operationId.user.crudUpdateOneById.username.username": {
            _schemaName: "User"
        },
        "operationId.deleteUser": {
            _crudType: ["crudRemoveOneById", "username", "username"],
            _schemaName: "User"
        },
        "operationId.getUserByName": {
            _crudType: ["crudGetOneById", "username", "username"],
            _schemaName: "User"
        },
        "operationId.loginUser": {
            _crudType: ["userLoginByPassword"],
            _schemaName: "User"
        },
        "operationId.logoutUser": {
            _crudType: ["userLogout"],
            _schemaName: "User"
        },
        "operationId.updateUser": {
            _crudType: ["crudUpdateOneById", "username", "username"],
            _schemaName: "User"
        },
        "operationId.user.userLoginByPassword": {
            _schemaName: "User"
        },
        "operationId.user.userLogout": {
            _schemaName: "User"
        }
    }
});
/* validateLineSortedReset */
// init db
globalThis.utility2_dbSeedList = [{
    dbRowList: [{
        id: "testCase_swaggerUiLogoSmall",
        fileBlob: local.swgg.templateSwaggerUiLogoSmallBase64,
        fileContentType: "image/png",
        fileDescription: "swagger-ui logo",
        fileFilename: "swaggerUiLogoSmall.png"
    }],
    idIndexCreateList: [{
        name: "id"
    }],
    name: "File"
}, {
    dbRowList: local.swgg.dbRowListRandomCreate({
        dbRowList: [{
            id: 0,
            name: "birdie",
            photoUrls: [],
            status: "available",
            tags: [{
                name: "bird"
            }]
        }, {
            id: 1,
            name: "doggie",
            status: "pending",
            photoUrls: [],
            tags: [{
                name: "dog"
            }]
        }, {
            id: 2,
            name: "fishie",
            photoUrls: [],
            status: "sold",
            tags: [{
                name: "fish"
            }]
        }],
        // init 100 extra random pets
        length: 100,
        override: function (option) {
            return {
                id: option.ii + 100,
                name: local.listGetElementRandom(
                    ["birdie", "doggie", "fishie"]
                ) + "-" + (option.ii + 100),
                tags: [{
                    name: local.listGetElementRandom(["female", "male"])
                }]
            };
        },
        schema: local.swgg.swaggerJson.definitions.Pet
    }),
    idIndexCreateList: [{
        isInteger: true,
        name: "id"
    }],
    name: "Pet"
}, {
    dbRowList: local.swgg.dbRowListRandomCreate({
        dbRowList: [{
            id: 0,
            petId: 0,
            status: "available"
        }, {
            id: 1,
            petId: 1,
            status: "pending"
        }, {
            id: 2,
            petId: 2,
            status: "sold"
        }],
        // init 100 extra random orders
        length: 100,
        override: function (option) {
            return {
                id: option.ii + 100,
                petId: option.ii + 100
            };
        },
        schema: local.swgg.swaggerJson.definitions.Order
    }),
    idIndexCreateList: [{
        isInteger: true,
        name: "id"
    }],
    name: "Order"
}, {
    dbRowList: local.swgg.dbRowListRandomCreate({
        dbRowList: [{
            email: "admin@admin.com",
            firstName: "admin",
            id: 0,
            lastName: "",
            password: local.sjclHashScryptCreate("secret"),
            phone: "1234-5678",
            username: "admin"
        }, {
            email: "jane@doe.com",
            firstName: "jane",
            id: 1,
            lastName: "doe",
            password: local.sjclHashScryptCreate("secret"),
            phone: "1234-5678",
            username: "jane.doe"
        }, {
            email: "john@doe.com",
            firstName: "john",
            id: 2,
            lastName: "doe",
            password: local.sjclHashScryptCreate("secret"),
            phone: "1234-5678",
            username: "john.doe"
        }],
        // init 100 extra random users
        length: 100,
        override: function (option) {
            return {
                firstName: local.listGetElementRandom(
                    ["alice", "bob", "jane", "john"]
                ) + "-" + (option.ii + 100),
                id: option.ii + 100,
                lastName: local.listGetElementRandom(["doe", "smith"]) + "-" + (option.ii + 100),
                password: local.sjclHashScryptCreate("secret"),
                tags: [{
                    name: local.listGetElementRandom(["female", "male"])
                }, {
                    name: Math.random().toString(36).slice(2)
                }]
            };
        },
        schema: local.swgg.swaggerJson.definitions.User
    }),
    idIndexCreateList: [{
        name: "email"
    }, {
        name: "id",
        isInteger: true
    }, {
        name: "username"
    }],
    name: "User"
}];
// seed db
local.db.dbSeed(globalThis.utility2_dbSeedList, local.onErrorThrow);
// init serverLocal
local.utility2.serverLocalUrlTest = function (url) {
    url = local.urlParse(url).pathname;
    return (
        local.isBrowser
        && !local.env.npm_config_mode_backend
        && (
            /^\/test\.|\/api\/v0\//
        ).test(url)
    );
};
}());



/* istanbul ignore next */
// run browser js-env code - init-test
(function () {
if (!local.isBrowser) {
    return;
}
// log stderr and stdout to #outputStdout1
["error", "log"].forEach(function (key) {
    var argList;
    var element;
    var fnc;
    element = document.querySelector(
        "#outputStdout1"
    );
    if (!element) {
        return;
    }
    fnc = console[key];
    console[key] = function () {
        argList = Array.from(arguments); // jslint ignore:line
        fnc.apply(console, argList);
        // append text to #outputStdout1
        element.textContent += argList.map(function (arg) {
            return (
                typeof arg === "string"
                ? arg
                : JSON.stringify(arg, null, 4)
            );
        }).join(" ").replace((
            /\u001b\[\d*m/g
        ), "") + "\n";
        // scroll textarea to bottom
        element.scrollTop = element.scrollHeight;
    };
});
Object.assign(local, globalThis.domOnEventDelegateDict);
globalThis.domOnEventDelegateDict = local;
local.onEventDomDb = (
    local.db && local.db.onEventDomDb
);
local.testRunBrowser = function (event) {
/*
 * this function will run browser-tests
 */
    switch (
        !event.ctrlKey
        && !event.metaKey
        && (
            event.modeInit
            || (event.type + "." + (event.target && event.target.id))
        )
    ) {
    // custom-case
    case true:
        // init ui
        globalThis.utility2_onReadyBefore.counter += 1;
        local.swgg.uiEventListenerDict.onEventUiReload(
            null,
            globalThis.utility2_onReadyBefore
        );
        return;
    // run browser-tests
    default:
        if (
            (event.target && event.target.id) !== "testRunButton1"
            && !(event.modeInit && (
                /\bmodeTest=1\b/
            ).test(location.search))
        ) {
            return;
        }
        // show browser-tests
        if (document.querySelector(
            "#testReportDiv1"
        ).style.maxHeight === "0px") {
            globalThis.domOnEventDelegateDict.domOnEventResetOutput();
            local.uiAnimateSlideDown(document.querySelector(
                "#testReportDiv1"
            ));
            document.querySelector(
                "#testRunButton1"
            ).textContent = "hide internal test";
            local.modeTest = 1;
            local.testRunDefault(local);
            return;
        }
        // hide browser-tests
        local.uiAnimateSlideUp(document.querySelector(
            "#testReportDiv1"
        ));
        document.querySelector(
            "#testRunButton1"
        ).textContent = "run internal test";
    }
};

local.testRunBrowser({
    modeInit: true
});
}());



/* istanbul ignore next */
// run node js-env code - init-test
(function () {
if (local.isBrowser) {
    return;
}
// init exports
module.exports = local;
/* validateLineSortedReset */
// init assets
local.assetsDict = local.assetsDict || {};
[
    "assets.index.template.html",
    "assets.swgg.swagger.json",
    "assets.swgg.swagger.server.json"
].forEach(function (file) {
    file = "/" + file;
    local.assetsDict[file] = local.assetsDict[file] || "";
    if (local.fs.existsSync(local.__dirname + file)) {
        local.assetsDict[file] = local.fs.readFileSync(
            local.__dirname + file,
            "utf8"
        );
    }
});
/* validateLineSortedReset */
/* jslint ignore:start */
local.assetsDict["/assets.swgg.js"] =
    local.assetsDict["/assets.swgg.js"] ||
    local.fs.readFileSync(local.__dirname + "/lib.swgg.js", "utf8"
).replace((/^#!\//), "// ");
/* jslint ignore:end */
/* validateLineSortedReset */
local.assetsDict["/"] = local.assetsDict["/assets.index.template.html"]
.replace((
    /\{\{env\.(\w+?)\}\}/g
), function (match0, match1) {
    switch (match1) {
    case "npm_package_description":
        return "the greatest app in the world!";
    case "npm_package_name":
        return "swgg";
    case "npm_package_nameLib":
        return "swgg";
    case "npm_package_version":
        return "0.0.1";
    default:
        return match0;
    }
});
local.assetsDict["/assets.example.html"] = local.assetsDict["/"];
local.assetsDict["/index.html"] = local.assetsDict["/"];
// init cli
if (module !== require.main || globalThis.utility2_rollup) {
    return;
}
/* validateLineSortedReset */
local.assetsDict["/assets.example.js"] = (
    local.assetsDict["/assets.example.js"]
    || local.fs.readFileSync(__filename, "utf8")
);
local.assetsDict["/favicon.ico"] = local.assetsDict["/favicon.ico"] || "";
// if $npm_config_timeout_exit exists,
// then exit this process after $npm_config_timeout_exit ms
if (Number(process.env.npm_config_timeout_exit)) {
    setTimeout(process.exit, Number(process.env.npm_config_timeout_exit));
}
// start server
if (globalThis.utility2_serverHttp1) {
    return;
}
process.env.PORT = process.env.PORT || "8081";
console.error("http-server listening on port " + process.env.PORT);
local.http.createServer(function (request, response) {
    request.urlParsed = local.url.parse(request.url);
    if (local.assetsDict[request.urlParsed.pathname] !== undefined) {
        response.end(local.assetsDict[request.urlParsed.pathname]);
        return;
    }
    response.statusCode = 404;
    response.end();
}).listen(process.env.PORT);
}());



}());
