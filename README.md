swagger-lite
============
standalone swagger-ui server backed by nedb

[![NPM](https://img.shields.io/npm/v/swagger-lite.svg?style=flat-square)](https://www.npmjs.com/package/swagger-lite) [![NPM](https://img.shields.io/npm/dm/swagger-lite.svg?style=flat-square)](https://www.npmjs.com/package/swagger-lite)



# todo
- add ability to reset db
- admin-ui - add property-option x-sortName
- admin-ui - fix datatables crashing when rows are empty
- do not send readonly properties in swagger-client-request
- implement api POST /pet/{petId}/uploadImage
- implement api GET /user/login
- implement api GET /user/logout
- add logging feature
- add cached version crudGetManyByQueryCached
- add swggUserLoginTokenCapped
- none



# change since ecef9960
- npm publish 2016.1.5
- admin-ui - fix input validation bugs
- replace swgg.api with swgg.apiDict
- none



# live test-server
- [https://kaizhu256.github.io/node-swagger-lite/build..beta..travis-ci.org/app/index.html](https://kaizhu256.github.io/node-swagger-lite/build..beta..travis-ci.org/app/index.html)

[![github.com test-server](https://kaizhu256.github.io/node-swagger-lite/build/screen-capture.githubDeploy.browser._2Fnode-swagger-lite_2Fbuild..alpha..travis-ci.org_2Fapp_2Findex.html.png)](https://kaizhu256.github.io/node-swagger-lite/build..beta..travis-ci.org/app/index.html)



# build-status [![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-swagger-lite.svg)](https://travis-ci.org/kaizhu256/node-swagger-lite)
[![build commit status](https://kaizhu256.github.io/node-swagger-lite/build/build.badge.svg)](https://travis-ci.org/kaizhu256/node-swagger-lite)

| git-branch : | [master](https://github.com/kaizhu256/node-swagger-lite/tree/master) | [beta](https://github.com/kaizhu256/node-swagger-lite/tree/beta) | [alpha](https://github.com/kaizhu256/node-swagger-lite/tree/alpha)|
|--:|:--|:--|:--|
| test-server : | [![github.com test-server](https://kaizhu256.github.io/node-swagger-lite/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-swagger-lite/build..master..travis-ci.org/app/index.html) | [![github.com test-server](https://kaizhu256.github.io/node-swagger-lite/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-swagger-lite/build..beta..travis-ci.org/app/index.html) | [![github.com test-server](https://kaizhu256.github.io/node-swagger-lite/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-swagger-lite/build..alpha..travis-ci.org/app/index.html)|
| test-admin-ui-server : | [![github.com test-admin-ui-server](https://kaizhu256.github.io/node-swagger-lite/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-swagger-lite/build..master..travis-ci.org/app/assets.swgg.admin-ui.html) | [![github.com test-admin-ui-server](https://kaizhu256.github.io/node-swagger-lite/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-swagger-lite/build..beta..travis-ci.org/app/assets.swgg.admin-ui.html) | [![github.com test-admin-ui-server](https://kaizhu256.github.io/node-swagger-lite/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-swagger-lite/build..alpha..travis-ci.org/app/assets.swgg.admin-ui.html)|
| test-report : | [![test-report](https://kaizhu256.github.io/node-swagger-lite/build..master..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-swagger-lite/build..master..travis-ci.org/test-report.html) | [![test-report](https://kaizhu256.github.io/node-swagger-lite/build..beta..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-swagger-lite/build..beta..travis-ci.org/test-report.html) | [![test-report](https://kaizhu256.github.io/node-swagger-lite/build..alpha..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-swagger-lite/build..alpha..travis-ci.org/test-report.html)|
| coverage : | [![istanbul coverage](https://kaizhu256.github.io/node-swagger-lite/build..master..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-swagger-lite/build..master..travis-ci.org/coverage.html/index.html) | [![istanbul coverage](https://kaizhu256.github.io/node-swagger-lite/build..beta..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-swagger-lite/build..beta..travis-ci.org/coverage.html/index.html) | [![istanbul coverage](https://kaizhu256.github.io/node-swagger-lite/build..alpha..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-swagger-lite/build..alpha..travis-ci.org/coverage.html/index.html)|
| build-artifacts : | [![build-artifacts](https://kaizhu256.github.io/node-swagger-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-swagger-lite/tree/gh-pages/build..master..travis-ci.org) | [![build-artifacts](https://kaizhu256.github.io/node-swagger-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-swagger-lite/tree/gh-pages/build..beta..travis-ci.org) | [![build-artifacts](https://kaizhu256.github.io/node-swagger-lite/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-swagger-lite/tree/gh-pages/build..alpha..travis-ci.org)|

#### master branch
- stable branch
- HEAD should be tagged, npm-published package

#### beta branch
- semi-stable branch
- HEAD should be latest, npm-published package

#### alpha branch
- unstable branch
- HEAD is arbitrary
- commit history may be rewritten



# documentation
#### this package requires
- darwin or linux os

#### api-doc
- [https://kaizhu256.github.io/node-swagger-lite/build/doc.api.html](https://kaizhu256.github.io/node-swagger-lite/build/doc.api.html)

[![api-doc](https://kaizhu256.github.io/node-swagger-lite/build/screen-capture.docApiCreate.browser._2Fhome_2Ftravis_2Fbuild_2Fkaizhu256_2Fnode-swagger-lite_2Ftmp_2Fbuild_2Fdoc.api.html.png)](https://kaizhu256.github.io/node-swagger-lite/build/doc.api.html)



# quickstart web example
![screen-capture](https://kaizhu256.github.io/node-swagger-lite/build/screen-capture.testExampleJs.browser..png)

#### to run this example, follow the instruction in the script below
- example.js

```javascript
/*
example.js

this node script will run a standalone swagger-ui server backed by nedb

instruction
    1. save this script as example.js
    2. run the shell command:
        $ npm install swagger-lite && export PORT=1337 && node example.js
    3. open a browser to http://localhost:1337
    4. interact with the swagger-ui crud-api
*/

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
        // export local
        local.global.local = local;
        // init swagger-lite
        local.swgg = local.modeJs === 'browser'
            ? window.swgg
            : require('swagger-lite');
        // import swgg.local
        Object.keys(local.swgg.local).forEach(function (key) {
            local[key] = local[key] || local.swgg.local[key];
        });
        // init utility2
        local.utility2 = local.swgg.local.utility2;
        // init middleware
        local.middleware = local.utility2.middlewareGroupCreate([
            // init init-middleware
            local.utility2.middlewareInit,
            // init cached-assets-middleware
            local.utility2.middlewareAssetsCached,
            // init login-middleware
            local.swgg.middlewareLogin,
            // init http-body-read-middleware
            local.utility2.middlewareBodyRead,
            // init http-body-parse-middleware
            local.swgg.middlewareBodyParse,
            // init jsonp-state-init-middleware
            local.swgg.middlewareJsonpStateInit,
            // init swagger-init-middleware
            function (request, response, nextMiddleware) {
                // enable cors
                // http://en.wikipedia.org/wiki/Cross-origin_resource_sharing
                response.setHeader(
                    'Access-Control-Allow-Methods',
                    'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT'
                );
                response.setHeader('Access-Control-Allow-Origin', '*');
                // init content-type
                response.setHeader('Content-Type', 'application/json; charset=UTF-8');
                // ignore .map files
                if (request.urlParsed.pathname.slice(-4) === '.map') {
                    local.utility2.serverRespondDefault(request, response, 404);
                    return;
                }
                nextMiddleware();
            },
            // init swagger-validation-middleware
            local.swgg.middlewareValidate,
            // init crud-middleware
            local.swgg.middlewareCrud
        ]);
        // init petstore-middleware
        local.middleware.middlewareList.push(function (request, response, nextMiddleware) {
            var modeNext, onNext, result;
            modeNext = 0;
            onNext = function (error, data) {
                modeNext = error
                    ? Infinity
                    : modeNext + 1;
                switch (modeNext) {
                case 1:
                    switch (request.swggPathname) {
                    case 'GET /store/inventory':
                        local.swgg.collectionCreate('Order').find({}, { status: 1 }, onNext);
                        break;
                    default:
                        modeNext = Infinity;
                        onNext();
                    }
                    break;
                case 2:
                    switch (request.swggPathname) {
                    case 'GET /store/inventory':
                        result = {};
                        data.forEach(function (element) {
                            result[element.status] = result[element.status] || 0;
                            result[element.status] += 1;
                        });
                        onNext(null, result);
                        break;
                    default:
                        onNext(null, data);
                    }
                    break;
                case 3:
                    local.swgg.serverRespondJsonapi(request, response, error, data);
                    break;
                default:
                    nextMiddleware(error, data);
                }
            };
            onNext();
        });
        // init error-middleware
        local.middlewareError = local.swgg.middlewareError;
        // run server-test
        local.utility2.testRunServer(local);
    }());
    switch (local.modeJs) {



    // run node js-env code - post-init
    case 'node':
        // export local
        module.exports = local;
        // init petstore-api
        local.swgg.apiDictUpdate(JSON.parse(local.swgg.templateSwaggerJsonPetstore));
        // init assets
        local.utility2.assetsDict['/assets.example.js'] =
            local.fs.readFileSync(__dirname + '/example.js', 'utf8');
        // https://github.com/swagger-api/swagger-ui/blob/v2.1.2/dist/index.html
        /* jslint-ignore-begin */
        local.utility2.templateIndexHtml = '\
<!doctype html>\n\
<html lang="en">\n\
<head>\n\
<meta charset="UTF-8">\n\
<title>\n\
{{envDict.npm_package_name}} @ {{envDict.npm_package_version}}\n\
</title>\n\
<link href="assets.utility2.css" rel="stylesheet">\n\
<style>\n\
* {\n\
    box-sizing: border-box;\n\
}\n\
body {\n\
    background-color: #fff;\n\
    font-family: Helvetical Neue, Helvetica, Arial, sans-serif;\n\
}\n\
body > div {\n\
    margin-top: 20px;\n\
}\n\
.testReportDiv {\n\
    display: none;\n\
}\n\
</style>\n\
\n\
<link href="assets.swgg.swagger-ui.favicon-32x32.png" rel="icon" sizes="32x32" type="image/png">\n\
<link href="assets.swgg.swagger-ui.favicon-16x16.png" rel="icon" sizes="16x16" type="image/png">\n\
<link href="assets.swgg.css" media="screen" rel="stylesheet" type="text/css">\n\
</head>\n\
<body>\n\
    <div class="ajaxProgressDiv" style="display: block;">\n\
        <div class="ajaxProgressBarDiv ajaxProgressBarDivLoading">loading</div>\n\
    </div>\n\
    <h1>{{envDict.npm_package_name}} @ {{envDict.npm_package_version}}</h1>\n\
    <h3>{{envDict.npm_package_description}}</h3>\n\
    <div class="testReportDiv"></div>\n\
\n\
    <div class="swagger-section">\n\
    <div id="header">\n\
        <div class="swagger-ui-wrap">\n\
        <a id="logo" href="http://swagger.io">swagger</a>\n\
        <form id="api_selector">\n\
        <div class="input">\n\
        <input placeholder="http://example.com/api" id="input_baseUrl" name="baseUrl" type="text"/>\n\
        </div>\n\
        <div class="input">\n\
        <input placeholder="api_key" id="input_apiKey" name="apiKey" type="text"/>\n\
        </div>\n\
        <div class="input"><a id="explore" href="#">Explore</a></div>\n\
        </form>\n\
        </div>\n\
    </div>\n\
    <div id="message-bar" class="swagger-ui-wrap">&nbsp;</div>\n\
    <div id="swagger-ui-container" class="swagger-ui-wrap"></div>\n\
    </div>\n\
<script src="assets.swgg.lib.jquery.js"></script>\n\
<script src="assets.swgg.lib.nedb.js"></script>\n\
<script src="assets.swgg.lib.swagger-tools.js"></script>\n\
<script src="assets.utility2.lib.bcrypt.js"></script>\n\
<script src="assets.utility2.lib.cryptojs.js"></script>\n\
<script src="assets.utility2.js"></script>\n\
<script src="assets.swgg.lib.swagger-ui.js"></script>\n\
<script src="assets.swgg.js"></script>\n\
<script src="jsonp.swgg.stateInit.js"></script>\n\
{{scriptExtra}}\n\
<script>$(function () {\n\
window.utility2.envDict.npm_package_description = "{{envDict.npm_package_description}}";\n\
window.utility2.envDict.npm_package_name = "{{envDict.npm_package_name}}";\n\
window.utility2.envDict.npm_package_version = "{{envDict.npm_package_version}};"\n\
var url = window.location.search.match(/url=([^&]+)/);\n\
if (url && url.length > 1) {\n\
    url = decodeURIComponent(url[1]);\n\
} else {\n\
    url = location.pathname.replace((/\\/[^\\/]*?$/), "") + "/api/v0/swagger.json";\n\
}\n\
window.utility2.onReady.counter += 1;\n\
window.swaggerUi = new SwaggerUi({\n\
    url: url,\n\
    dom_id: "swagger-ui-container",\n\
    supportedSubmitMethods: ["get", "post", "put", "delete", "patch"],\n\
    onComplete: function(swaggerApi, swaggerUi){\n\
        if(typeof initOAuth == "function") {\n\
            initOAuth({\n\
                clientId: "your-client-id",\n\
                clientSecret: "your-client-secret",\n\
                realm: "your-realms",\n\
                appName: "your-app-name",\n\
                scopeSeparator: ","\n\
            });\n\
        }\n\
        addApiKeyAuthorization();\n\
        window.utility2.onReady();\n\
    },\n\
    onFailure: function(data) {\n\
        console.log("Unable to Load SwaggerUI");\n\
    },\n\
    docExpansion: "none",\n\
    apisSorter: "alpha",\n\
    showRequestHeaders: false\n\
});\n\
function addApiKeyAuthorization(){\n\
    var key = encodeURIComponent($("#input_apiKey")[0].value);\n\
    if(key && key.trim() != "") {\n\
        var apiKeyAuth = new SwaggerClient.ApiKeyAuthorization("api_key", key, "query");\n\
        window.swaggerUi.api.clientAuthorizations.add("api_key", apiKeyAuth);\n\
        console.log("added key " + key);\n\
    }\n\
}\n\
$("#input_apiKey").change(addApiKeyAuthorization);\n\
window.swaggerUi.load();\n\
window.swgg.api = window.swaggerUi.api;\n\
});</script>\n\
</body>\n\
</html>\n\
';
        /* jslint-ignore-end */
        local.utility2.assetsDict['/'] = local.utility2.templateRender(
            local.utility2.templateIndexHtml,
            {
                envDict: local.utility2.envDict,
                // add extra scripts
                scriptExtra: '<script src="assets.example.js"></script>'
            },
            ''
        );
        break;
    }



    // run shared js-env code - post-init
    (function () {
        // init petstore-api
        local.swgg.apiDictUpdate(local.utility2.objectSetOverride(local.swgg.swaggerJson, {
            definitions: {
                Pet: {
                    _pathObjectDefaultList: ['crudGetManyByQuery'],
                    _pathPrefix: 'pet',
                    properties: {
                        createdAt: { format: 'date-time', readOnly: true, type: 'string' },
                        id: { default: 1, minimum: 1 },
                        updatedAt: { format: 'date-time', readOnly: true, type: 'string' }
                    }
                },
                Order: {
                    _pathObjectDefaultList: [
                        'crudGetManyByQuery',
                        'crudCreateOrUpdateOneByKeyUnique.id'
                    ],
                    _pathPrefix: 'store',
                    properties: {
                        createdAt: { format: 'date-time', readOnly: true, type: 'string' },
                        id: { default: 1, minimum: 1 },
                        updatedAt: { format: 'date-time', readOnly: true, type: 'string' }
                    }
                },
                User: {
                    _pathObjectDefaultList: ['crudGetManyByQuery'],
                    _pathPrefix: 'user',
                    properties: {
                        createdAt: { format: 'date-time', readOnly: true, type: 'string' },
                        email: { format: 'email' },
                        id: { default: 1, minimum: 1 },
                        updatedAt: { format: 'date-time', readOnly: true, type: 'string' }
                    }
                }
            },
            paths: {
                '/pet': {
                    post: {
                        _operationId: 'crudCreateOrReplaceOne',
                        _schemaName: 'Pet'
                    },
                    put: {
                        _operationId: 'crudCreateOrUpdateOne',
                        _schemaName: 'Pet'
                    }
                },
                '/pet/findByStatus': {
                    get: {
                        _operationId: 'crudGetManyByQuery',
                        _queryQuery: '{"status":{"$in":{{status json}}}}',
                        _schemaName: 'Pet'
                    }
                },
                '/pet/findByTags': {
                    get: {
                        _operationId: 'crudGetManyByQuery',
                        _queryQuery: '{"tags.name":{"$in":{{tags json}}}}',
                        _schemaName: 'Pet'
                    }
                },
                '/pet/{petId}': {
                    delete: {
                        _operationId: 'crudDeleteOneByKeyUnique.petId.id',
                        _schemaName: 'Pet'
                    },
                    get: {
                        _operationId: 'crudGetOneByKeyUnique.petId.id',
                        _schemaName: 'Pet'
                    },
                    post: {
                        _operationId: 'crudCreateOrUpdateOneByKeyUnique.petId.id',
                        _schemaName: 'Pet'
                    }
                },
                '/store/order': {
                    post: {
                        _operationId: 'crudCreateOrReplaceOne',
                        _schemaName: 'Order'
                    }
                },
                '/store/order/{orderId}': {
                    delete: {
                        _operationId: 'crudDeleteOneByKeyUnique.orderId.id',
                        _schemaName: 'Order'
                    },
                    get: {
                        _operationId: 'crudGetOneByKeyUnique.orderId.id',
                        _schemaName: 'Order'
                    }
                },
                '/user': {
                    post: {
                        _operationId: 'crudCreateOrReplaceOne',
                        _schemaName: 'User'
                    }
                },
                '/user/{username}': {
                    delete: {
                        _operationId: 'crudDeleteOneByKeyUnique.username',
                        _schemaName: 'User'
                    },
                    get: {
                        _operationId: 'crudGetOneByKeyUnique.username',
                        _schemaName: 'User'
                    },
                    put: {
                        _operationId: 'crudCreateOrUpdateOneByKeyUnique.username',
                        _schemaName: 'User'
                    }
                },
                '/user/createWithArray': {
                    post: {
                        _operationId: 'crudCreateOrReplaceMany',
                        _schemaName: 'User'
                    }
                },
                '/user/createWithList': {
                    post: {
                        _operationId: 'crudCreateOrReplaceMany',
                        _schemaName: 'User'
                    }
                }
            }
        }, 10));
        // init collectionList
        local.collectionList = [{
            docList: [{
                id: 'jane.doe',
                password: local.utility2.bcryptHashCreate('hello'),
                username: 'jane.doe'
            }, {
                id: 'john.doe',
                password: local.utility2.bcryptHashCreate('bye'),
                username: 'john.doe'
            }],
            drop: true,
            ensureIndexList: [{
                fieldName: 'id',
                unique: true
            }, {
                fieldName: 'username',
                unique: true
            }],
            name: '_User'
        }, {
            docList: [{
                id: 1,
                name: 'birdie',
                photoUrls: [],
                status: 'available',
                tags: [{ name: 'bird'}]
            }, {
                id: 2,
                name: 'doggie',
                status: 'pending',
                photoUrls: [],
                tags: [{ name: 'dog'}]
            }, {
                id: 3,
                name: 'fishie',
                photoUrls: [],
                status: 'sold',
                tags: [{ name: 'fish'}]
            }],
            drop: true,
            ensureIndexList: [{
                fieldName: 'id',
                unique: true
            }],
            name: 'Pet'
        }, {
            docList: [{
                id: 1,
                status: 'available'
            }, {
                id: 2,
                status: 'pending'
            }, {
                id: 3,
                status: 'sold'
            }],
            drop: true,
            ensureIndexList: [{
                fieldName: 'id',
                unique: true
            }],
            name: 'Order'
        }, {
            docList: [{
                email: 'jane@doe.com',
                firstName: 'jane',
                id: 1,
                lastName: 'doe',
                password: 'hello',
                phone: '1234-5678',
                username: 'jane.doe'
            }, {
                email: 'john@doe.com',
                firstName: 'john',
                id: 2,
                lastName: 'doe',
                password: 'bye',
                phone: '8765-4321',
                username: 'john.doe'
            }],
            drop: true,
            ensureIndexList: [{
                fieldName: 'email',
                unique: true
            }, {
                fieldName: 'id',
                unique: true
            }, {
                fieldName: 'phone',
                unique: true
            }, {
                fieldName: 'username',
                unique: true
            }],
            name: 'User'
        }];
        // init 100 extra random pets
        local.ii = 0;
        local.options = { docList: [], name: 'Pet' };
        local.collectionList.push(local.options);
        for (local.ii = 100; local.ii < 200; local.ii += 1) {
            local.options.docList.push({
                id: local.ii,
                name: local.utility2.listGetElementRandom(['birdie', 'doggie', 'fishie']) +
                    '-' + local.ii,
                photoUrls: [],
                status: local.utility2.listGetElementRandom(['available', 'pending', 'sold']),
                tags: [
                    { name: local.utility2.listGetElementRandom(['female', 'male']) },
                    { name: Math.random().toString(36).slice(2) }
                ]
            });
        }
        local.utility2.onReady.counter += 1;
        local.swgg.collectionListInit(local.collectionList, local.utility2.onReady);
    }());
}());
```

#### output from electron-lite
![screen-capture](https://kaizhu256.github.io/node-swagger-lite/build/screen-capture.testExampleJs.browser..png)

#### output from shell
![screen-capture](https://kaizhu256.github.io/node-swagger-lite/build/screen-capture.testExampleJs.svg)



# npm-dependencies
- [nedb-lite](https://www.npmjs.com/package/nedb-lite)
- [utility2](https://www.npmjs.com/package/utility2)



# package-listing
[![screen-capture](https://kaizhu256.github.io/node-swagger-lite/build/screen-capture.gitLsTree.svg)](https://github.com/kaizhu256/node-swagger-lite)



# package.json
```json
{
    "author": "kai zhu <kaizhu256@gmail.com>",
    "bin": { "swagger-lite": "index.js" },
    "dependencies": {
        "nedb-lite": "2016.1.2",
        "utility2": "2016.1.6"
    },
    "description": "standalone swagger-ui server backed by nedb",
    "devDependencies": {
        "electron-lite": "2015.12.4"
    },
    "engines": { "node": ">=4.0" },
    "keywords": [
        "api", "admin", "admin-ui",
        "browser",
        "cms", "crud",
        "db",
        "light", "lightweight", "lite",
        "mongo", "mongodb",
        "nedb",
        "standalone", "swagger", "swagger-ui",
        "web"
    ],
    "license": "MIT",
    "name": "swagger-lite",
    "os": ["darwin", "linux"],
    "repository": {
        "type": "git",
        "url": "https://github.com/kaizhu256/node-swagger-lite.git"
    },
    "scripts": {
        "build-ci": "utility2 shRun shReadmeBuild",
        "build-doc": "MODE_LINENO=0 \
utility2 shRun shReadmeExportFile package.json package.json && \
utility2 shRun shDocApiCreate \"module.exports={ \
exampleFileList:['README.md','test.js','index.js'], \
moduleDict:{ \
'swagger-lite':{aliasList:['swgg'],exports:require('./index.js')}, \
'swagger-lite.Nedb':{aliasList:['collection'],exports:require('./index.js').Nedb}, \
'swagger-lite.Nedb.prototype':{aliasList:['collection'], \
exports:require('./index.js').Nedb.prototype}, \
'swagger-lite.api':{aliasList:['api'],exports:require('./index.js').api}, \
'swagger-lite.tools.v2':{aliasList:['tools.v2'], \
exports:require('./index.js').tools.v2.__proto__} \
} \
}\"",
        "postinstall": "node index.js postinstall",
        "start": "export PORT=${PORT:-8080} && \
export npm_config_mode_auto_restart=1 && \
utility2 shRun shIstanbulCover node test.js",
        "test": "export MODE_LINENO=0 && \
utility2 shRun shReadmeExportFile package.json package.json && \
export PORT=$(utility2 shServerPortRandom) && \
utility2 test node test.js",
        "test-published": "utility2 shRun shNpmTestPublished"
    },
    "version": "2016.1.5"
}
```



# changelog of last 50 commits
[![screen-capture](https://kaizhu256.github.io/node-swagger-lite/build/screen-capture.gitLog.svg)](https://github.com/kaizhu256/node-swagger-lite/commits)



# internal build-script
- build.sh

```shell
# build.sh

# this shell script will run the build for this package

shBuildCiTestPre() {(set -e
# this function will run the pre-test build
    exit
    # test example js script
    (export MODE_BUILD=testExampleJs &&
        export npm_config_timeout_exit=10000 &&
        shRunScreenCapture shReadmeTestJs example.js)
)}

shBuildCiTestPost() {(set -e
# this function will run the post-test build
    # if running legacy-node, then exit
    [ "$(node --version)" \< "v5.0" ] && exit || true
    # if branch is not alpha, beta, or master, then exit
    if !([ "$CI_BRANCH" = alpha ] ||
        [ "$CI_BRANCH" = beta ] ||
        [ "$CI_BRANCH" = master ])
    then
        exit
    fi
    TEST_URL="https://$(printf "$GITHUB_REPO" | \
        sed 's/\//.github.io\//')/build..$CI_BRANCH..travis-ci.org/app/index.html"
    # deploy app to gh-pages
    (export npm_config_file_test_report_merge="$npm_config_dir_build/test-report.json" &&
        shGithubDeploy)
    # test deployed app to gh-pages
    (export MODE_BUILD=githubTest &&
        export modeBrowserTest=test &&
        export npm_config_file_test_report_merge="$npm_config_dir_build/test-report.json" &&
        export url="$TEST_URL?modeTest=consoleLogResult&timeExit={{timeExit}}" &&
        shBrowserTest)
)}

shBuild() {
# this function will run the main build
    set -e
    # init env
    . node_modules/.bin/utility2 && shInit
    # cleanup github-gh-pages dir
    # export BUILD_GITHUB_UPLOAD_PRE_SH="rm -fr build"
    # init github-gh-pages commit-limit
    export COMMIT_LIMIT=16
    # run default build
    shBuildCiDefault
}
shBuild
```
