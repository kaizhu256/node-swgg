swagger-lite
============
this package will run a virtual swagger-ui server with persistent storage in the browser (in-place of a real backend), that your webapp can talk to

[![NPM](https://img.shields.io/npm/v/swagger-lite.svg?style=flat-square)](https://www.npmjs.com/package/swagger-lite) [![NPM](https://img.shields.io/npm/dm/swagger-lite.svg?style=flat-square)](https://www.npmjs.com/package/swagger-lite) [![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-swagger-lite.svg)](https://travis-ci.org/kaizhu256/node-swagger-lite)



# documentation
#### todo
- merge admin-ui into swagger-ui
- rename collectDoc to something better
- change api crudCreateOrReplaceMany to crudCreateOrReplaceManyByKeyUnique
- fix missing param error-message in 400 validation-error
- add api crudUserPasswordChange
- add message-param to assertions in swgg.validateByPropertyDef
- ui - display operationId for endpoints
- add logging feature
- add cached version crudGetManyByQueryCached
- none

#### change since 93be1493
- npm publish 2016.4.1
- fix bug when a document's id is zero
- streamline ui
- remove Backbone, Handlebars, and jQuery dependencies from lib.swagger-ui.js
- enable multiple api endpoints with same operationId, but unique keyUnique
- add hooks middlewareCrudPre and middlewareCrudPost
- merge api crudCreateOrReplaceOne into crudCreateOrReplaceOneByKeyUnique
- merge api crudCreateOrUpdateOne and crudCreateOrUpdateOneByKeyUnique into crudUpdateOneByKeyUnique
- none

#### this package requires
- darwin or linux os
- chromium-based browser or firefox browser

#### differences from swagger-spec @ https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md
- content-type "application/xml" is not currently supported
- array-parameters are serialized using JSON.stringify, and the "collectionFormat" field is ignored

#### api-doc
- [https://kaizhu256.github.io/node-swagger-lite/build/doc.api.html](https://kaizhu256.github.io/node-swagger-lite/build/doc.api.html)

[![api-doc](https://kaizhu256.github.io/node-swagger-lite/build/screen-capture.docApiCreate.browser._2Fhome_2Ftravis_2Fbuild_2Fkaizhu256_2Fnode-swagger-lite_2Ftmp_2Fbuild_2Fdoc.api.html.png)](https://kaizhu256.github.io/node-swagger-lite/build/doc.api.html)



# live test-server
- [https://kaizhu256.github.io/node-swagger-lite/build..beta..travis-ci.org/app/index.html](https://kaizhu256.github.io/node-swagger-lite/build..beta..travis-ci.org/app/index.html)

[![github.com test-server](https://kaizhu256.github.io/node-swagger-lite/build/screen-capture.githubDeploy.browser._2Fnode-swagger-lite_2Fbuild..alpha..travis-ci.org_2Fapp_2Findex.html.png)](https://kaizhu256.github.io/node-swagger-lite/build..beta..travis-ci.org/app/index.html)



# build-status [![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-swagger-lite.svg)](https://travis-ci.org/kaizhu256/node-swagger-lite)
[![build commit status](https://kaizhu256.github.io/node-swagger-lite/build/build.badge.svg)](https://travis-ci.org/kaizhu256/node-swagger-lite)

| git-branch : | [master](https://github.com/kaizhu256/node-swagger-lite/tree/master) | [beta](https://github.com/kaizhu256/node-swagger-lite/tree/beta) | [alpha](https://github.com/kaizhu256/node-swagger-lite/tree/alpha)|
|--:|:--|:--|:--|
| test-server : | [![github.com test-server](https://kaizhu256.github.io/node-swagger-lite/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-swagger-lite/build..master..travis-ci.org/app/index.html) | [![github.com test-server](https://kaizhu256.github.io/node-swagger-lite/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-swagger-lite/build..beta..travis-ci.org/app/index.html) | [![github.com test-server](https://kaizhu256.github.io/node-swagger-lite/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-swagger-lite/build..alpha..travis-ci.org/app/index.html)|
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
        $ npm install "kaizhu256/node-swagger-lite#alpha" && export PORT=1337 && node example.js
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
        // init crud-middleware-pre
        local.middlewareCrudPre = function (request, response, nextMiddleware) {
        /*
         * this function will run the middleware for petstore-specific crud-operations
         */
            var crud, modeNext, onNext, result;
            modeNext = 0;
            onNext = function (error, data) {
                modeNext = error
                    ? Infinity
                    : modeNext + 1;
                switch (modeNext) {
                case 1:
                    crud = request.swgg.crud;
                    switch (crud.operationId.split('.')[0]) {
                    // coverage-hack - test error handling-behavior
                    case 'crudErrorPre':
                        onNext(local.utility2.errorDefault);
                        return;
                    case 'getInventory':
                        crud.collection.find({}, { status: 1 }, onNext);
                        break;
                    default:
                        modeNext = Infinity;
                        onNext();
                    }
                    break;
                case 2:
                    switch (crud.operationId.split('.')[0]) {
                    case 'getInventory':
                        result = {};
                        data.forEach(function (element) {
                            result[element.status] = result[element.status] || 0;
                            result[element.status] += 1;
                        });
                        onNext(null, result);
                        break;
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
        };
        // init middleware
        local.middleware = local.utility2.middlewareGroupCreate([
            // init init-middleware
            local.utility2.middlewareInit,
            // init cached-assets-middleware
            local.utility2.middlewareAssetsCached,
            // init router-middleware
            local.swgg.middlewareRouter,
            // init user-login-middleware
            local.swgg.middlewareUserLogin,
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
            // init swagger-validate-middleware
            local.swgg.middlewareValidate,
            // init crud-middleware-pre
            local.middlewareCrudPre,
            // init crud-middleware-builtin
            local.swgg.middlewareCrudBuiltin,
            // init crud-middleware-end
            local.swgg.middlewareCrudEnd
        ]);
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
        /* istanbul ignore next */
        local.utility2.assetsDict['/assets.example.js'] = local.global.assetsExampleJs ||
            local.fs.readFileSync(__filename, 'utf8');
        /* jslint-ignore-begin */
        // https://github.com/swagger-api/swagger-ui/blob/v2.1.3/dist/index.html
        local.utility2.templateIndexHtml = '\
<!doctype html>\n\
<html lang="en">\n\
<head>\n\
<meta charset="UTF-8">\n\
<title>\n\
{{envDict.npm_package_name}} @ {{envDict.npm_package_version}}\n\
</title>\n\
<link href="assets.swgg.swagger-ui.favicon-32x32.png" rel="icon" sizes="32x32" type="image/png">\n\
<link href="assets.swgg.swagger-ui.favicon-16x16.png" rel="icon" sizes="16x16" type="image/png">\n\
<link href="assets.swgg.css" rel="stylesheet">\n\
<link href="assets.utility2.css" rel="stylesheet">\n\
<style>\n\
* {\n\
    box-sizing: border-box;\n\
}\n\
body {\n\
    background-color: #fff;\n\
    font-family: Helvetica Neue,Helvetica,Arial,sans-serif;\n\
    padding: 10px;\n\
}\n\
body > div {\n\
    margin-top: 20px;\n\
}\n\
.testReportDiv {\n\
    display: none;\n\
}\n\
</style>\n\
</head>\n\
<body>\n\
    <div class="ajaxProgressDiv" style="display: block;">\n\
        <div class="ajaxProgressBarDiv ajaxProgressBarDivLoading">loading</div>\n\
    </div>\n\
    <h1>{{envDict.npm_package_name}} @ {{envDict.npm_package_version}}</h1>\n\
    <h3>{{envDict.npm_package_description}}</h3>\n\
    <div class="testReportDiv"></div>\n\
\n\
    <div class="swggUiContainer">\n\
    <form action="" class="eventDelegateSubmit header onEventReload tr">\n\
        <a class="td1" href="http://swagger.io" target="_blank">swagger</a>\n\
        <input class="td2" placeholder="http://petstore.swagger.io/v2/swagger.json" type="text" value="api/v0/swagger.json"/>\n\
        <input class="td3" type="submit" value="Explore">\n\
    </form>\n\
    </div>\n\
<script src="assets.swgg.lib.nedb.js"></script>\n\
<script src="assets.swgg.lib.swagger-tools.js"></script>\n\
<script src="assets.utility2.rollup.js"></script>\n\
<script src="assets.swgg.js"></script>\n\
<script src="assets.swgg.lib.swagger-ui.js"></script>\n\
<script src="jsonp.swgg.stateInit.js"></script>\n\
{{scriptExtra}}\n\
<script>(function () {\n\
window.utility2.envDict.npm_package_description = "{{envDict.npm_package_description}}";\n\
window.utility2.envDict.npm_package_name = "{{envDict.npm_package_name}}";\n\
window.utility2.envDict.npm_package_version = "{{envDict.npm_package_version}};"\n\
window.swgg.uiReload();\n\
}());</script>\n\
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
            }
        );
        break;
    }



    // run shared js-env code - post-init
    (function () {
        // init petstore-api
        local.swgg.apiDictUpdate(local.utility2.objectSetOverride(local.swgg.swaggerJson, {
            definitions: {
                File: {
                    _pathObjectDefaultList: [
                        'crudCountManyByQuery',
                        'crudCreateOrReplaceOneByKeyUnique.id',
                        'crudDeleteOneByKeyUnique.id',
                        'crudGetManyByQuery',
                        'crudFileGetOneByKeyUnique.id',
                        'crudFileUploadManyByForm.1',
                        'crudUpdateOneByKeyUnique.id'
                    ],
                    _pathPrefix: 'file',
                    'x-swgg-inherit': { $ref: '#/definitions/BuiltinFile' }
                },
                Pet: {
                    _pathObjectDefaultList: ['crudGetManyByQuery'],
                    _pathPrefix: 'pet',
                    properties: {
                        _id: { readOnly: true, type: 'string' },
                        createdAt: { format: 'date-time', readOnly: true, type: 'string' },
                        id: { default: 1, minimum: 1 },
                        quantity: { minimum: 0 },
                        updatedAt: { format: 'date-time', readOnly: true, type: 'string' }
                    }
                },
                Order: {
                    _pathObjectDefaultList: [
                        'crudGetManyByQuery',
                        'crudUpdateOneByKeyUnique.id'
                    ],
                    _pathPrefix: 'store',
                    properties: {
                        _id: { readOnly: true, type: 'string' },
                        createdAt: { format: 'date-time', readOnly: true, type: 'string' },
                        id: { default: 1, minimum: 1 },
                        updatedAt: { format: 'date-time', readOnly: true, type: 'string' }
                    }
                },
                User: {
                    _pathObjectDefaultList: [
                        'crudCountManyByQuery',
                        'crudCreateOrReplaceOneByKeyUnique.username',
                        'crudDeleteOneByKeyUnique.username',
                        'crudGetManyByQuery',
                        'crudUpdateOneByKeyUnique.username',
                        'crudUserLoginByPassword',
                        'crudUserLogout'
                    ],
                    _pathPrefix: 'user',
                    properties: {
                        _id: { readOnly: true, type: 'string' },
                        createdAt: { format: 'date-time', readOnly: true, type: 'string' },
                        email: { default: 'a@a.com', format: 'email' },
                        id: { default: 1, minimum: 1 },
                        updatedAt: { format: 'date-time', readOnly: true, type: 'string' }
                    },
                    'x-swgg-inherit': { $ref: '#/definitions/BuiltinUser' }
                }
            },
            paths: {
                '/pet': {
                    post: {
                        _operationId: 'crudCreateOrReplaceOneByKeyUnique.id',
                        _schemaName: 'Pet'
                    },
                    put: {
                        _operationId: 'crudUpdateOneByKeyUnique.id',
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
                        _operationId: 'crudUpdateOneByKeyUnique.petId.id',
                        _schemaName: 'Pet'
                    }
                },
                '/pet/{petId}/uploadImage': {
                    post: {
                        _operationId: 'crudFileUploadManyByForm',
                        _schemaName: 'User'
                    }
                },
                '/store/inventory': {
                    get: {
                        _schemaName: 'Order'
                    }
                },
                '/store/order': {
                    post: {
                        _operationId: 'crudCreateOrReplaceOneByKeyUnique.id',
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
                        _operationId: 'crudCreateOrReplaceOneByKeyUnique.id',
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
                        _operationId: 'crudUpdateOneByKeyUnique.username',
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
                },
                '/user/login': {
                    get: {
                        _operationId: 'crudUserLoginByPassword',
                        _schemaName: 'User'
                    }
                },
                '/user/logout': {
                    get: {
                        _operationId: 'crudUserLogout',
                        _schemaName: 'User'
                    }
                }
            },
            'x-swgg-tagDict': {
                file: { description: 'builtin-file model', name: 'file' }
            }
        }, 10));
        // init collectionList-fixtures
        local.utility2.onReady.counter += 1;
        local.swgg.collectionListInit([{
            collectDocList: [{
                id: '00_test_swaggerLogoSmall',
                fileBlob: local.swgg.templateSwaggerLogoSmallBase64,
                fileContentType: 'image/png',
                fileFilename: 'swaggerLogoSmall.png',
                propRequired: true
            }],
            drop: true,
            ensureIndexList: [{
                fieldName: 'id',
                unique: true
            }],
            name: 'File'
        }, {
            collectDocList: local.swgg.collectDocListRandomCreate({
                collectDocList: [{
                    id: 0,
                    name: 'birdie',
                    photoUrls: [],
                    status: 'available',
                    tags: [{ name: 'bird'}]
                }, {
                    id: 1,
                    name: 'doggie',
                    status: 'pending',
                    photoUrls: [],
                    tags: [{ name: 'dog'}]
                }, {
                    id: 2,
                    name: 'fishie',
                    photoUrls: [],
                    status: 'sold',
                    tags: [{ name: 'fish'}]
                }],
                // init 100 extra random pets
                length: 100,
                override: function (options) {
                    return {
                        id: options.ii + 100,
                        name: local.utility2.listGetElementRandom(
                            ['birdie', 'doggie', 'fishie']
                        ) + '-' + (options.ii + 100),
                        tags: [
                            { name: local.utility2.listGetElementRandom(['female', 'male']) },
                            { name: Math.random().toString(36).slice(2) }
                        ]
                    };
                },
                properties: local.swgg.swaggerJson.definitions.Pet.properties
            }),
            drop: true,
            ensureIndexList: [{
                fieldName: 'id',
                unique: true
            }],
            name: 'Pet'
        }, {
            collectDocList: local.swgg.collectDocListRandomCreate({
                collectDocList: [{
                    id: 0,
                    petId: 0,
                    status: 'available'
                }, {
                    id: 1,
                    petId: 1,
                    status: 'pending'
                }, {
                    id: 2,
                    petId: 2,
                    status: 'sold'
                }],
                // init 100 extra random users
                length: 100,
                override: function (options) {
                    return {
                        id: options.ii + 100,
                        petId: options.ii + 100
                    };
                },
                properties: local.swgg.swaggerJson.definitions.Order.properties
            }),
            drop: true,
            ensureIndexList: [{
                fieldName: 'id',
                unique: true
            }],
            name: 'Order'
        }, {
            collectDocList: local.swgg.collectDocListRandomCreate({
                collectDocList: [{
                    email: 'admin@admin.com',
                    firstName: 'admin',
                    id: 0,
                    lastName: '',
                    password: local.utility2.bcryptHashCreate('secret', 1),
                    phone: '1234-5678',
                    username: 'admin'
                }, {
                    email: 'jane@doe.com',
                    firstName: 'jane',
                    id: 1,
                    lastName: 'doe',
                    password: local.utility2.bcryptHashCreate('secret', 1),
                    phone: '1234-5678',
                    username: 'jane.doe'
                }, {
                    email: 'john@doe.com',
                    firstName: 'john',
                    id: 2,
                    lastName: 'doe',
                    password: local.utility2.bcryptHashCreate('secret', 1),
                    phone: '1234-5678',
                    username: 'john.doe'
                }],
                // init 100 extra random users
                length: 100,
                override: function (options) {
                    return {
                        firstName: local.utility2.listGetElementRandom(
                            ['alice', 'bob', 'jane', 'john']
                        ) + '-' + (options.ii + 100),
                        id: options.ii + 100,
                        lastName: local.utility2.listGetElementRandom(['doe', 'smith']) +
                            '-' + (options.ii + 100),
                        password: local.utility2.bcryptHashCreate('secret', 1),
                        tags: [
                            { name: local.utility2.listGetElementRandom(['female', 'male']) },
                            { name: Math.random().toString(36).slice(2) }
                        ]
                    };
                },
                properties: local.swgg.swaggerJson.definitions.User.properties
            }),
            drop: true,
            ensureIndexList: [{
                fieldName: 'email',
                unique: true
            }, {
                fieldName: 'id',
                unique: true
            }, {
                fieldName: 'username',
                unique: true
            }],
            name: 'User'
        }], local.utility2.onReady);
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
    "package.json": true,
    "author": "kai zhu <kaizhu256@gmail.com>",
    "bin": { "swagger-lite": "index.js" },
    "dependencies": {
        "nedb-lite": "2016.4.2",
        "utility2": "2016.3.5"
    },
    "description": "this package will run a virtual swagger-ui server with persistent storage \
in the browser (in-place of a real backend), that your webapp can talk to",
    "devDependencies": {
        "electron-lite": "2016.3.3"
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
        "build-doc": ". node_modules/.bin/utility2 && \
shReadmeExportScripts && \
cp $(shFileTrimLeft tmp/README.package.json) package.json && \
utility2 shRun shDocApiCreate \"module.exports={ \
exampleFileList:['README.md','test.js','index.js'], \
moduleDict:{ \
'swagger-lite':{aliasList:['swgg'],exports:require('./index.js')}, \
'swagger-lite.Nedb':{aliasList:['Nedb','collection'],exports:require('./index.js').Nedb}, \
'swagger-lite.Nedb.prototype':{aliasList:['collection'], \
exports:require('./index.js').Nedb.prototype}, \
'swagger-lite.Nedb.storage':{aliasList:['storage'], \
exports:require('./index.js').Nedb.storage}, \
'swagger-lite.tools.v2':{aliasList:['tools.v2'], \
exports:require('./index.js').tools.v2.__proto__} \
} \
}\"",
        "postinstall": "node index.js postinstall",
        "start": "export PORT=${PORT:-8080} && \
export npm_config_mode_auto_restart=1 && \
utility2 shRun shIstanbulCover node test.js",
        "test": ". node_modules/.bin/utility2 && \
shReadmeExportScripts && \
cp $(shFileTrimLeft tmp/README.package.json) package.json && \
export PORT=$(utility2 shServerPortRandom) && \
utility2 test node test.js",
        "test-published": "utility2 shRun shNpmTestPublished"
    },
    "version": "2016.4.1"
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
    # test example js script
    (export MODE_BUILD=testExampleJs &&
        export npm_config_timeout_exit=10000 &&
        shRunScreenCapture shReadmeTestJs example.js)
)}

shBuildCiTestPost() {(set -e
# this function will run the post-test build
    # if running legacy-node, then exit
    [ "$(node --version)" \< "v5.0" ] && exit || true
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

shBuild() {(set -e
# this function will run the main build
    # init env
    . node_modules/.bin/utility2 && shInit
    # cleanup github-gh-pages dir
    # export BUILD_GITHUB_UPLOAD_PRE_SH="rm -fr build"
    # init github-gh-pages commit-limit
    export COMMIT_LIMIT=16
    # if branch is alpha, beta, or master, then run default build
    if [ "$CI_BRANCH" = alpha ] ||
        [ "$CI_BRANCH" = beta ] ||
        [ "$CI_BRANCH" = master ]
    then
        shBuildCiDefault
    fi
)}
shBuild
```
