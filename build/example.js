/*
example.js

this script will run a web-demo of swgg

instruction
    1. save this script as example.js
    2. run shell-command:
        $ npm install swgg &&             PORT=8081 node example.js

    3. open a browser to http://127.0.0.1:8081 and play with web-demo
    4. edit this script to suit your needs
*/



/* istanbul instrument in package swgg */
/* istanbul ignore next */
/* jslint utility2:true */
(function (globalThis) {
    "use strict";
    let ArrayPrototypeFlat;
    let TextXxcoder;
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
    // polyfill
    ArrayPrototypeFlat = function (depth) {
    /*
     * this function will polyfill Array.prototype.flat
     * https://github.com/jonathantneal/array-flat-polyfill
     */
        depth = (
            globalThis.isNaN(depth)
            ? 1
            : Number(depth)
        );
        if (!depth) {
            return Array.prototype.slice.call(this);
        }
        return Array.prototype.reduce.call(this, function (acc, cur) {
            if (Array.isArray(cur)) {
                // recurse
                acc.push.apply(acc, ArrayPrototypeFlat.call(cur, depth - 1));
            } else {
                acc.push(cur);
            }
            return acc;
        }, []);
    };
    Array.prototype.flat = Array.prototype.flat || ArrayPrototypeFlat;
    Array.prototype.flatMap = Array.prototype.flatMap || function flatMap(
        ...argList
    ) {
    /*
     * this function will polyfill Array.prototype.flatMap
     * https://github.com/jonathantneal/array-flat-polyfill
     */
        return this.map(...argList).flat();
    };
    (function () {
        try {
            globalThis.TextDecoder = (
                globalThis.TextDecoder || require("util").TextDecoder
            );
            globalThis.TextEncoder = (
                globalThis.TextEncoder || require("util").TextEncoder
            );
        } catch (ignore) {}
    }());
    TextXxcoder = function () {
    /*
     * this function will polyfill TextDecoder/TextEncoder
     * https://gist.github.com/Yaffle/5458286
     */
        return;
    };
    TextXxcoder.prototype.decode = function (octets) {
    /*
     * this function will polyfill TextDecoder.prototype.decode
     * https://gist.github.com/Yaffle/5458286
     */
        let bytesNeeded;
        let codePoint;
        let ii;
        let kk;
        let octet;
        let string;
        string = "";
        ii = 0;
        while (ii < octets.length) {
            octet = octets[ii];
            bytesNeeded = 0;
            codePoint = 0;
            if (octet <= 0x7F) {
                bytesNeeded = 0;
                codePoint = octet & 0xFF;
            } else if (octet <= 0xDF) {
                bytesNeeded = 1;
                codePoint = octet & 0x1F;
            } else if (octet <= 0xEF) {
                bytesNeeded = 2;
                codePoint = octet & 0x0F;
            } else if (octet <= 0xF4) {
                bytesNeeded = 3;
                codePoint = octet & 0x07;
            }
            if (octets.length - ii - bytesNeeded > 0) {
                kk = 0;
                while (kk < bytesNeeded) {
                    octet = octets[ii + kk + 1];
                    codePoint = (codePoint << 6) | (octet & 0x3F);
                    kk += 1;
                }
            } else {
                codePoint = 0xFFFD;
                bytesNeeded = octets.length - ii;
            }
            string += String.fromCodePoint(codePoint);
            ii += bytesNeeded + 1;
        }
        return string;
    };
    TextXxcoder.prototype.encode = function (string) {
    /*
     * this function will polyfill TextEncoder.prototype.encode
     * https://gist.github.com/Yaffle/5458286
     */
        let bits;
        let cc;
        let codePoint;
        let ii;
        let length;
        let octets;
        octets = [];
        length = string.length;
        ii = 0;
        while (ii < length) {
            codePoint = string.codePointAt(ii);
            cc = 0;
            bits = 0;
            if (codePoint <= 0x0000007F) {
                cc = 0;
                bits = 0x00;
            } else if (codePoint <= 0x000007FF) {
                cc = 6;
                bits = 0xC0;
            } else if (codePoint <= 0x0000FFFF) {
                cc = 12;
                bits = 0xE0;
            } else if (codePoint <= 0x001FFFFF) {
                cc = 18;
                bits = 0xF0;
            }
            octets.push(bits | (codePoint >> cc));
            cc -= 6;
            while (cc >= 0) {
                octets.push(0x80 | ((codePoint >> cc) & 0x3F));
                cc -= 6;
            }
            ii += (
                codePoint >= 0x10000
                ? 2
                : 1
            );
        }
        return octets;
    };
    globalThis.TextDecoder = globalThis.TextDecoder || TextXxcoder;
    globalThis.TextEncoder = globalThis.TextEncoder || TextXxcoder;
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
local.middlewareCrudCustom = function (req, response, nextMiddleware) {
/*
 * this function will run the middleware to run custom-crud-operations
 */
    let crud;
    let opt;
    let result;
    opt = {};
    local.gotoNext(opt, function (err, data) {
        switch (opt.gotoState) {
        case 1:
            crud = req.swgg.crud;
            switch (crud.crudType[0]) {
            // hack-istanbul - test err handling-behavior
            case "crudErrorPre":
                opt.gotoNext(local.errDefault);
                return;
            case "getInventory":
                crud.dbTable.crudGetManyByQuery({
                    query: {},
                    projection: [
                        "status"
                    ]
                }, opt.gotoNext);
                break;
            default:
                opt.gotoState = Infinity;
                opt.gotoNext();
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
                opt.gotoNext(null, result);
                break;
            }
            break;
        case 3:
            local.swgg.serverRespondJsonapi(req, response, err, data);
            break;
        default:
            nextMiddleware(err, data);
        }
    });
    opt.gotoState = 0;
    opt.gotoNext();
};

local.middlewareInitCustom = function (req, response, nextMiddleware) {
/*
 * this function will run the middleware to custom-init <req> and <res>
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
    if (req.urlParsed.pathname.slice(-4) === ".map") {
        local.serverRespondDefault(req, response, 404);
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
    .replace((/\n<\/script>\n/), '\n</script>\n<h1>\n<!-- utility2-comment\n<a\n    {{#if env.npm_package_homepage}}\n    href="{{env.npm_package_homepage}}"\n    {{/if env.npm_package_homepage}}\n    target="_blank"\n>\nutility2-comment -->\n    {{env.npm_package_name}} ({{env.npm_package_version}})\n<!-- utility2-comment\n</a>\nutility2-comment -->\n</h1>\n<h3>{{env.npm_package_description}}</h3>\n<!-- utility2-comment\n<a class="button" download href="assets.app.js">download standalone app</a><br>\n<button class="button" data-onevent="testRunBrowser" id="buttonTestRun1">run internal test</button><br>\n<div class="uiAnimateSlide" id="htmlTestReport1" style="border-bottom: 0; border-top: 0; margin-bottom: 0; margin-top: 0; max-height: 0; padding-bottom: 0; padding-top: 0;"></div>\nutility2-comment -->\n\n\n\n<!-- custom-html-start -->\n<button class="button" data-onevent="onEventDomDb" data-onevent-db="dbReset">reset database</button><br>\n<button class="button" data-onevent="onEventDomDb" data-onevent-db="dbExport">export database -&gt; file</button><br>\n<button class="button" data-onevent="onEventDomDb" data-onevent-db="dbImport">import database &lt;- file</button><br>\n</button><br>\n<input class="onchange zeroPixel" type="file" id="dbImportInput1">\n')
































            .replace('assets.swgg.swagger.json', 'assets.swgg.swagger.server.json')
            .replace((/\n<script src=[\S\s]*\n<\/html>\n/), '\n<!-- custom-html-end -->\n\n\n\n<!-- utility2-comment\n{{#if isRollup}}\n<script src="assets.app.js"></script>\n{{#unless isRollup}}\n<script src="assets.utility2.rollup.js"></script>\n<script>window.utility2_onReadyBefore.counter += 1;</script>\n<script src="jsonp.utility2.stateInit?callback=window.utility2.stateInit"></script>\nutility2-comment -->\n<script src="assets.swgg.js"></script>\n<script src="assets.example.js"></script>\n<script src="assets.test.js"></script>\n<script>window.utility2_onReadyBefore();</script>\n<!-- utility2-comment\n{{/if isRollup}}\nutility2-comment -->\n<script>\n/* jslint utility2:true */\n(function () {\n"use strict";\nlet htmlTestReport1;\nlet local;\nhtmlTestReport1 = document.querySelector("#htmlTestReport1");\nlocal = window.utility2;\nif (!(htmlTestReport1 && local)) {\n    return;\n}\nlocal.on("utility2.testRunProgressUpdate", function (testReport) {\n    htmlTestReport1.innerHTML = local.testReportMerge(testReport, {});\n});\nlocal.on("utility2.testRunStart", function (testReport) {\n    local.uiAnimateSlideDown(htmlTestReport1);\n    htmlTestReport1.innerHTML = local.testReportMerge(testReport, {});\n});\n}());\n</script>\n</body>\n</html>\n');











































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
            allOf: [
                {
                    $ref: "#/definitions/BuiltinFile"
                }
            ]
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
            allOf: [
                {
                    $ref: "#/definitions/BuiltinUser"
                }
            ],
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
    tags: [
        {
            description: "builtin-file model",
            name: "file"
        }
    ],
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
            _crudType: [
                "crudSetOneById", "petId", "id"
            ],
            _schemaName: "Pet"
        },
        "operationId.pet.crudGetManyByQuery": {
            _schemaName: "Pet"
        },
        "operationId.deletePet": {
            _crudType: [
                "crudRemoveOneById", "petId", "id"
            ],
            _schemaName: "Pet"
        },
        "operationId.findPetsByStatus": {
            _crudType: [
                "crudGetManyByQuery"
            ],
            _queryWhere: "{\"status\":{\"$in\":{{status jsonStringify}}}}",
            _schemaName: "Pet"
        },
        "operationId.findPetsByTags": {
            _crudType: [
                "crudGetManyByQuery"
            ],
            _queryWhere: "{\"tags.name\":{\"$in\":{{tags jsonStringify}}}}",
            _schemaName: "Pet"
        },
        "operationId.getPetById": {
            _crudType: [
                "crudGetOneById", "petId", "id"
            ],
            _schemaName: "Pet"
        },
        "operationId.updatePet": {
            _crudType: [
                "crudUpdateOneById", "petId", "id"
            ],
            _schemaName: "Pet"
        },
        "operationId.updatePetWithForm": {
            _crudType: [
                "crudUpdateOneById", "petId", "id"
            ],
            _schemaName: "Pet"
        },
        "operationId.uploadFile": {
            _crudType: [
                "fileUploadManyByForm"
            ],
            _schemaName: "User"
        },
        "operationId.store.crudGetManyByQuery": {
            _schemaName: "Order"
        },
        "operationId.store.crudUpdateOneById.id.id": {
            _schemaName: "Order"
        },
        "operationId.deleteOrder": {
            _crudType: [
                "crudRemoveOneById", "orderId", "id"
            ],
            _schemaName: "Order"
        },
        "operationId.getInventory": {
            _schemaName: "Order"
        },
        "operationId.getOrderById": {
            _crudType: [
                "crudGetOneById", "orderId", "id"
            ],
            _schemaName: "Order"
        },
        "operationId.placeOrder": {
            _crudType: [
                "crudSetOneById", "orderId", "id"
            ],
            _schemaName: "Order"
        },
        "operationId.createUser": {
            _crudType: [
                "crudSetOneById", "username", "username"
            ],
            _schemaName: "User"
        },
        "operationId.createUsersWithArrayInput": {
            _crudType: [
                "crudSetManyById"
            ],
            _schemaName: "User"
        },
        "operationId.createUsersWithListInput": {
            _crudType: [
                "crudSetManyById"
            ],
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
            _crudType: [
                "crudRemoveOneById", "username", "username"
            ],
            _schemaName: "User"
        },
        "operationId.getUserByName": {
            _crudType: [
                "crudGetOneById", "username", "username"
            ],
            _schemaName: "User"
        },
        "operationId.loginUser": {
            _crudType: [
                "userLoginByPassword"
            ],
            _schemaName: "User"
        },
        "operationId.logoutUser": {
            _crudType: [
                "userLogout"
            ],
            _schemaName: "User"
        },
        "operationId.updateUser": {
            _crudType: [
                "crudUpdateOneById", "username", "username"
            ],
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
    dbRowList: [
        {
            id: "testCase_swaggerUiLogoSmall",
            fileBlob: local.swgg.templateSwaggerUiLogoSmallBase64,
            fileContentType: "image/png",
            fileDescription: "swagger-ui logo",
            fileFilename: "swaggerUiLogoSmall.png"
        }
    ],
    idIndexCreateList: [
        {
            name: "id"
        }
    ],
    name: "File"
}, {
    dbRowList: local.swgg.dbRowListRandomCreate({
        dbRowList: [
            {
                id: 0,
                name: "birdie",
                photoUrls: [],
                status: "available",
                tags: [
                    {
                        name: "bird"
                    }
                ]
            }, {
                id: 1,
                name: "doggie",
                status: "pending",
                photoUrls: [],
                tags: [
                    {
                        name: "dog"
                    }
                ]
            }, {
                id: 2,
                name: "fishie",
                photoUrls: [],
                status: "sold",
                tags: [
                    {
                        name: "fish"
                    }
                ]
            }
        ],
        // init 100 extra random pets
        length: 100,
        override: function (opt) {
            return {
                id: opt.ii + 100,
                name: local.listGetElementRandom([
                    "birdie", "doggie", "fishie"
                ]) + "-" + (opt.ii + 100),
                tags: [
                    {
                        name: local.listGetElementRandom([
                            "female", "male"
                        ])
                    }
                ]
            };
        },
        schema: local.swgg.swaggerJson.definitions.Pet
    }),
    idIndexCreateList: [
        {
            isInteger: true,
            name: "id"
        }
    ],
    name: "Pet"
}, {
    dbRowList: local.swgg.dbRowListRandomCreate({
        dbRowList: [
            {
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
            }
        ],
        // init 100 extra random orders
        length: 100,
        override: function (opt) {
            return {
                id: opt.ii + 100,
                petId: opt.ii + 100
            };
        },
        schema: local.swgg.swaggerJson.definitions.Order
    }),
    idIndexCreateList: [
        {
            isInteger: true,
            name: "id"
        }
    ],
    name: "Order"
}, {
    dbRowList: local.swgg.dbRowListRandomCreate({
        dbRowList: [
            {
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
            }
        ],
        // init 100 extra random users
        length: 100,
        override: function (opt) {
            return {
                firstName: local.listGetElementRandom([
                    "alice", "bob", "jane", "john"
                ]) + "-" + (opt.ii + 100),
                id: opt.ii + 100,
                lastName: local.listGetElementRandom([
                    "doe", "smith"
                ]) + "-" + (opt.ii + 100),
                password: local.sjclHashScryptCreate("secret"),
                tags: [
                    {
                        name: local.listGetElementRandom([
                            "female", "male"
                        ])
                    }, {
                        name: Math.random().toString(36).slice(2)
                    }
                ]
            };
        },
        schema: local.swgg.swaggerJson.definitions.User
    }),
    idIndexCreateList: [
        {
            name: "email"
        }, {
            name: "id",
            isInteger: true
        }, {
            name: "username"
        }
    ],
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
    let elem;
    let fnc;
    elem = document.querySelector(
        "#outputStdout1"
    );
    if (!elem) {
        return;
    }
    fnc = console[key];
    console[key] = function (...argList) {
        fnc.apply(console, argList);
        // append text to #outputStdout1
        elem.textContent += argList.map(function (arg) {
            return (
                typeof arg === "string"
                ? arg
                : JSON.stringify(arg, null, 4)
            );
        }).join(" ").replace((
            /\u001b\[\d*m/g
        ), "") + "\n";
        // scroll textarea to bottom
        elem.scrollTop = elem.scrollHeight;
    };
});
local.objectAssignDefault(local, globalThis.domOnEventDelegateDict);
globalThis.domOnEventDelegateDict = local;
local.onEventDomDb = local.db && local.db.onEventDomDb;
local.testRunBrowser = function (evt) {
/*
 * this function will run browser-tests
 */
    switch (
        !evt.ctrlKey
        && !evt.metaKey
        && (
            evt.modeInit
            || (evt.type + "." + (evt.target && evt.target.id))
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
            (evt.target && evt.target.id) !== "buttonTestRun1"
            && !(evt.modeInit && (
                /\bmodeTest=1\b/
            ).test(location.search))
        ) {
            return;
        }
        // show browser-tests
        if (document.querySelector(
            "#htmlTestReport1"
        ).style.maxHeight === "0px") {
            globalThis.domOnEventDelegateDict.domOnEventResetOutput();
            local.uiAnimateSlideDown(document.querySelector(
                "#htmlTestReport1"
            ));
            document.querySelector(
                "#buttonTestRun1"
            ).textContent = "hide internal test";
            local.modeTest = 1;
            local.testRunDefault(local);
            return;
        }
        // hide browser-tests
        local.uiAnimateSlideUp(document.querySelector(
            "#htmlTestReport1"
        ));
        document.querySelector(
            "#buttonTestRun1"
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
local.assetsDict["/"] = local.assetsDict[
    "/assets.index.template.html"
].replace((
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
local.http.createServer(function (req, res) {
    req.urlParsed = local.url.parse(req.url);
    if (local.assetsDict[req.urlParsed.pathname] !== undefined) {
        res.end(local.assetsDict[req.urlParsed.pathname]);
        return;
    }
    res.statusCode = 404;
    res.end();
}).listen(process.env.PORT);
}());
}());
