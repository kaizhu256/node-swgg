swagger-lite
============
this package will run a virtual swagger-ui server with persistent storage in the browser, that your webapp can use (in-place of a real backend)

[![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-swagger-lite.svg)](https://travis-ci.org/kaizhu256/node-swagger-lite)

[![NPM](https://nodei.co/npm/swagger-lite.png?downloads=true)](https://www.npmjs.com/package/swagger-lite)

[![package-listing](https://kaizhu256.github.io/node-swagger-lite/build/screen-capture.gitLsTree.svg)](https://github.com/kaizhu256/node-swagger-lite)



# documentation
#### todo
- add middlewareAcl
- datatable - add sort-by-field
- add notification system
- add post-crud-middleware for pet photoUrl
- rename collectDoc to something better
- change api crudCreateOrReplaceMany to crudCreateOrReplaceManyByKeyUnique
- add api userPasswordChange
- add message-param to assertions in swgg.validateByPropDef
- add logging feature
- add cached version crudGetManyByQueryCached
- none

#### change since ddb48891
- npm publish 2016.5.4
- fix internal tests for heroku backend
- none

#### this package requires
- darwin or linux os
- chromium-based browser or firefox browser

#### differences from swagger-spec @ https://github.com/OAI/OpenAPI-Specification/blob/394ffd3ff3e2fe0029a821170937a8154b04e0ba/versions/2.0.md
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
| test-server 1 : | [![github.com test-server](https://kaizhu256.github.io/node-swagger-lite/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-swagger-lite/build..master..travis-ci.org/app/index.html) | [![github.com test-server](https://kaizhu256.github.io/node-swagger-lite/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-swagger-lite/build..beta..travis-ci.org/app/index.html) | [![github.com test-server](https://kaizhu256.github.io/node-swagger-lite/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-swagger-lite/build..alpha..travis-ci.org/app/index.html)|
| test-server 2 : | [![heroku.com test-server](https://kaizhu256.github.io/node-swagger-lite/heroku-logo.75x25.png)](https://hrku01-swagger-lite-master.herokuapp.com) | [![heroku.com test-server](https://kaizhu256.github.io/node-swagger-lite/heroku-logo.75x25.png)](https://hrku01-swagger-lite-beta.herokuapp.com) | [![heroku.com test-server](https://kaizhu256.github.io/node-swagger-lite/heroku-logo.75x25.png)](https://hrku01-swagger-lite-alpha.herokuapp.com)|
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
- [example.js](https://kaizhu256.github.io/node-utility2/build/example.js)
```javascript
/*
example.js

this node script will run a standalone swagger-ui server backed by nedb

instruction
    1. save this js script as example.js
    2. run the shell command:
        $ npm install swagger-lite && export PORT=8081 && node example.js
    3. open a browser to http://localhost:8081
    4. interact with the swagger-ui server
*/

/* istanbul instrument in package swagger-lite */
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
        /* istanbul ignore next */
        // init local
        local = local.modeJs === 'browser'
            ? window.swgg.local
            : module.isRollup
            ? module
            : require('swagger-lite').local;
        // export local
        local.global.local = local;
        local.middlewareCrudCustom = function (request, response, nextMiddleware) {
        /*
         * this function will run the middleware that will run custom-crud-operations
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
        local.middlewareInitCustom = function (request, response, nextMiddleware) {
        /*
         * this function will run the middleware that will custom-init the request and response
         */
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
        };
        // init middleware
        local.middleware = local.utility2.middlewareGroupCreate([
            local.utility2.middlewareInit,
            local.utility2.middlewareAssetsCached,
            local.swgg.middlewareRouter,
            local.swgg.middlewareUserLogin,
            local.middlewareInitCustom,
            local.swgg.middlewareJsonpStateGet,
            local.utility2.middlewareBodyRead,
            local.swgg.middlewareBodyParse,
            local.swgg.middlewareValidate,
            local.middlewareCrudCustom,
            local.swgg.middlewareCrudBuiltin,
            local.swgg.middlewareCrudEnd
        ]);
        // init error-middleware
        local.middlewareError = local.swgg.middlewareError;
        // run server-test
        local.utility2.testRunServer(local);
    }());
    switch (local.modeJs) {



    // run browser js-env code - post-init
    case 'browser':
        /* istanbul ignore next */
        local.testRun = function (event) {
            if (local.utility2.modeTest) {
                return;
            }
            switch (event && event.currentTarget.id) {
            case 'testRunButton1':
                local.modeTest = true;
                local.utility2.testRun(local);
                break;
            case 'swggButtonNedbReset1':
                window.swgg.nedbReset(function () {
                    location.reload();
                });
                break;
            }
        };
        // init event-handling
        document.querySelector('#swggButtonNedbReset1')
            .addEventListener('click', local.testRun);
        document.querySelector('#testRunButton1').addEventListener('click', local.testRun);
        // init ui
        local.swgg.uiEventListenerDict['.onEventUiReload']();
        break;



    // run node js-env code - post-init
    case 'node':
        // export local
        module.exports = local;
        // init assets
        local.utility2.tryCatchOnError(function () {
            local.utility2.assetsDict['/assets.example.js'] =
                local.fs.readFileSync(__filename, 'utf8');
        }, local.utility2.nop);
        /* jslint-ignore-begin */
        // https://github.com/swagger-api/swagger-ui/blob/v2.1.3/dist/index.html
        local.utility2.templateIndexHtml = '\
<!doctype html>\n\
<html lang="en">\n\
<head>\n\
<meta charset="UTF-8">\n\
<title>\n\
{{envDict.npm_package_name}} v{{envDict.npm_package_version}}\n\
</title>\n\
<link href="assets.swgg.css" rel="stylesheet">\n\
<link href="assets.utility2.css" rel="stylesheet">\n\
<style>\n\
/*csslint\n\
    box-sizing: false,\n\
    universal-selector: false\n\
*/\n\
* {\n\
    box-sizing: border-box;\n\
}\n\
body {\n\
    background-color: #fff;\n\
    font-family: Helvetica Neue,Helvetica,Arial,sans-serif;\n\
}\n\
body > button {\n\
    width: 10rem;\n\
}\n\
body > * {\n\
    margin-bottom: 1rem;\n\
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
    <h1>\n\
        <a\n\
            {{#if envDict.npm_package_homepage}}\n\
            href="{{envDict.npm_package_homepage}}"\n\
            {{/if envDict.npm_package_homepage}}\n\
            target="_blank"\n\
        >{{envDict.npm_package_name}} v{{envDict.npm_package_version}}</a>\n\
        {{#if envDict.NODE_ENV}}\n\
        (NODE_ENV={{envDict.NODE_ENV}})\n\
        {{/if envDict.NODE_ENV}}\n\
    </h1>\n\
    <h3>{{envDict.npm_package_description}}</h3>\n\
    <h4><a download href="assets.app.js">download standalone app</a></h4>\n\
    <button id="testRunButton1">run internal test</button><br>\n\
    <button id="swggButtonNedbReset1">reset nedb database</button><br>\n\
    <div class="testReportDiv" style="display: none;"></div>\n\
\n\
    <div class="swggUiContainer">\n\
    <form class="header tr">\n\
        <a class="td1" href="http://swagger.io" target="_blank">swagger</a>\n\
        <input\n\
            class="flex1 td2"\n\
            placeholder="http://petstore.swagger.io/v2/swagger.json"\n\
            type="text"\n\
            value="api/v0/swagger.json"\n\
        >\n\
    </form>\n\
    <div class="reset"></div>\n\
    </div>\n\
    {{#if isRollup}}\n\
    <script src="assets.app.min.js"></script>\n\
    <script src="jsonp.swgg.stateGet?callback=window.swgg.stateInit"></script>\n\
    {{#unless isRollup}}\n\
    <script src="assets.utility2.rollup.js"></script>\n\
    <script src="assets.swgg.js"></script>\n\
    <script src="assets.swgg.lib.swagger-ui.js"></script>\n\
    <script src="jsonp.swgg.stateGet?callback=window.swgg.stateInit"></script>\n\
<script>\n\
/*jslint browser: true*/\n\
window.utility2.onReadyBefore.counter += 1;\n\
</script>\n\
    <script src="assets.example.js"></script>\n\
    <script src="assets.test.js"></script>\n\
<script>\n\
/*jslint browser: true*/\n\
window.utility2.onReadyBefore();\n\
</script>\n\
    {{/if isRollup}}\n\
</body>\n\
</html>\n\
';
        /* jslint-ignore-end */
        local.utility2.assetsDict['/'] = local.utility2.templateRender(
            local.utility2.templateIndexHtml,
            { envDict: local.utility2.envDict }
        );
        break;
    }



    // run shared js-env code - post-init
    (function () {
        // init petstore-api - frontend
        local.tmp =
            JSON.parse(local.utility2.assetsDict['/assets.swgg.lib.swagger.petstore.json']);
        delete local.tmp.basePath;
        delete local.tmp.host;
        delete local.tmp.schemes;
        local.swgg.apiDictUpdate(local.tmp);
        // init petstore-api - backend
        local.swgg.apiDictUpdate({
            definitions: {
                File: {
                    allOf: [{ $ref: '#/definitions/BuiltinFile' }]
                },
                Pet: {
                    properties: {
                        _id: { readOnly: true, type: 'string' },
                        createdAt: { format: 'date-time', readOnly: true, type: 'string' },
                        id: { default: 1, minimum: 1 },
                        updatedAt: { format: 'date-time', readOnly: true, type: 'string' }
                    }
                },
                Order: {
                    properties: {
                        _id: { readOnly: true, type: 'string' },
                        createdAt: { format: 'date-time', readOnly: true, type: 'string' },
                        id: { default: 1, minimum: 1 },
                        updatedAt: { format: 'date-time', readOnly: true, type: 'string' }
                    }
                },
                User: {
                    allOf: [{ $ref: '#/definitions/BuiltinUser' }],
                    properties: {
                        _id: { readOnly: true, type: 'string' },
                        createdAt: { format: 'date-time', readOnly: true, type: 'string' },
                        email: { default: 'a@a.com', format: 'email' },
                        id: { default: 1, minimum: 1 },
                        updatedAt: { format: 'date-time', readOnly: true, type: 'string' }
                    }
                }
            },
            tags: [{ description: 'builtin-file model', name: 'file' }],
            'x-swgg-apiDict': {
                'file crudCountManyByQuery': {
                    _schemaName: 'File'
                },
                'file crudCreateOrReplaceOneByKeyUnique.id.id': {
                    _schemaName: 'File'
                },
                'file crudDeleteOneByKeyUnique.id.id': {
                    _schemaName: 'File'
                },
                'file crudGetManyByQuery': {
                    _schemaName: 'File'
                },
                'file crudUpdateOneByKeyUnique.id.id': {
                    _schemaName: 'File'
                },
                'file fileGetOneByKeyUnique.id.id': {
                    _schemaName: 'File'
                },
                'file fileUploadManyByForm.1': {
                    _schemaName: 'File'
                },
                'pet addPet': {
                    _operationId: 'crudCreateOrReplaceOneByKeyUnique.petId.id',
                    _schemaName: 'Pet'
                },
                'pet crudGetManyByQuery': {
                    _schemaName: 'Pet'
                },
                'pet deletePet': {
                    _operationId: 'crudDeleteOneByKeyUnique.petId.id',
                    _schemaName: 'Pet'
                },
                'pet findPetsByStatus': {
                    _operationId: 'crudGetManyByQuery',
                    _queryWhere: '{"status":{"$in":{{status jsonStringify}}}}',
                    _schemaName: 'Pet'
                },
                'pet findPetsByTags': {
                    _operationId: 'crudGetManyByQuery',
                    _queryWhere: '{"tags.name":{"$in":{{tags jsonStringify}}}}',
                    _schemaName: 'Pet'
                },
                'pet getPetById': {
                    _operationId: 'crudGetOneByKeyUnique.petId.id',
                    _schemaName: 'Pet'
                },
                'pet updatePet': {
                    _operationId: 'crudUpdateOneByKeyUnique.petId.id',
                    _schemaName: 'Pet'
                },
                'pet updatePetWithForm': {
                    _operationId: 'crudUpdateOneByKeyUnique.petId.id',
                    _schemaName: 'Pet'
                },
                'pet uploadFile': {
                    _operationId: 'fileUploadManyByForm',
                    _schemaName: 'User'
                },
                'store crudGetManyByQuery': {
                    _schemaName: 'Order'
                },
                'store crudUpdateOneByKeyUnique.id.id': {
                    _schemaName: 'Order'
                },
                'store deleteOrder': {
                    _operationId: 'crudDeleteOneByKeyUnique.orderId.id',
                    _schemaName: 'Order'
                },
                'store getInventory': {
                    _schemaName: 'Order'
                },
                'store getOrderById': {
                    _operationId: 'crudGetOneByKeyUnique.orderId.id',
                    _schemaName: 'Order'
                },
                'store placeOrder': {
                    _operationId: 'crudCreateOrReplaceOneByKeyUnique.orderId.id',
                    _schemaName: 'Order'
                },
                'user createUser': {
                    _operationId: 'crudCreateOrReplaceOneByKeyUnique.username.username',
                    _schemaName: 'User'
                },
                'user createUsersWithArrayInput': {
                    _operationId: 'crudCreateOrReplaceMany',
                    _schemaName: 'User'
                },
                'user createUsersWithListInput': {
                    _operationId: 'crudCreateOrReplaceMany',
                    _schemaName: 'User'
                },
                'user crudCountManyByQuery': {
                    _schemaName: 'User'
                },
                'user crudCreateOrReplaceOneByKeyUnique.username.username': {
                    _schemaName: 'User'
                },
                'user crudDeleteOneByKeyUnique.username.username': {
                    _schemaName: 'User'
                },
                'user crudGetManyByQuery': {
                    _schemaName: 'User'
                },
                'user crudUpdateOneByKeyUnique.username.username': {
                    _schemaName: 'User'
                },
                'user deleteUser': {
                    _operationId: 'crudDeleteOneByKeyUnique.username.username',
                    _schemaName: 'User'
                },
                'user getUserByName': {
                    _operationId: 'crudGetOneByKeyUnique.username.username',
                    _schemaName: 'User'
                },
                'user loginUser': {
                    _operationId: 'userLoginByPassword',
                    _schemaName: 'User'
                },
                'user logoutUser': {
                    _operationId: 'userLogout',
                    _schemaName: 'User'
                },
                'user updateUser': {
                    _operationId: 'crudUpdateOneByKeyUnique.username.username',
                    _schemaName: 'User'
                },
                'user userLoginByPassword': {
                    _schemaName: 'User'
                },
                'user userLogout': {
                    _schemaName: 'User'
                }
            },
            'x-swgg-datatableDict': {
                file: {
                    crudCreateOrReplaceOneByKeyUnique:
                        'file crudCreateOrReplaceOneByKeyUnique.id.id',
                    crudDeleteOneByKeyUnique:
                        'file crudDeleteOneByKeyUnique.id.id',
                    crudGetManyByQuery: 'file crudGetManyByQuery',
                    keyUnique: 'id',
                    queryLimit: 20,
                    schema: { $ref: '#/definitions/File' }
                },
                pet: {
                    crudCreateOrReplaceOneByKeyUnique: 'pet addPet',
                    crudDeleteOneByKeyUnique: 'pet deletePet',
                    crudGetManyByQuery: 'pet crudGetManyByQuery',
                    keyUnique: 'id',
                    queryLimit: 20,
                    schema: { $ref: '#/definitions/Pet' }
                },
                store: {
                    crudCreateOrReplaceOneByKeyUnique: 'store placeOrder',
                    crudDeleteOneByKeyUnique: 'store deleteOrder',
                    crudGetManyByQuery: 'store crudGetManyByQuery',
                    keyUnique: 'id',
                    queryLimit: 20,
                    schema: { $ref: '#/definitions/Order' }
                },
                user: {
                    crudCreateOrReplaceOneByKeyUnique: 'user createUser',
                    crudDeleteOneByKeyUnique: 'user deleteUser',
                    crudGetManyByQuery: 'user crudGetManyByQuery',
                    keyUnique: 'username',
                    queryLimit: 20,
                    schema: { $ref: '#/definitions/User' }
                }
            }
        });
        // init collectionList-fixtures
        local.utility2.onReadyBefore.counter += 1;
        local.swgg.collectionListInit([{
            collectDocList: [{
                id: '00_test_swaggerUiLogoSmall',
                fileBlob: local.swgg.templateSwaggerUiLogoSmallBase64,
                fileContentType: 'image/png',
                fileDescription: 'swagger-ui logo',
                fileFilename: 'swaggerUiLogoSmall.png'
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
                // init 100 extra random orders
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
        }], local.utility2.onReadyBefore);
    }());
}());
```

#### output from electron-lite
![screen-capture](https://kaizhu256.github.io/node-swagger-lite/build/screen-capture.testExampleJs.browser..png)

#### output from shell
![screen-capture](https://kaizhu256.github.io/node-swagger-lite/build/screen-capture.testExampleJs.svg)



# package.json
```json
{
    "package.json": true,
    "author": "kai zhu <kaizhu256@gmail.com>",
    "bin": { "swagger-lite": "index.js" },
    "dependencies": {
        "utility2": "2016.5.5"
    },
    "description": "{{packageJson.description}}",
    "devDependencies": {
        "electron-lite": "kaizhu256/node-electron-lite#alpha"
    },
    "engines": { "node": ">=4.0" },
    "homepage": "https://github.com/kaizhu256/node-swagger-lite",
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
        "build-app": "npm test --mode-test-case=testCase_build_app && \
utility2-jslint tmp/build/app/assets.app.js",
        "build-ci": "utility2 shRun shReadmeBuild",
        "build-doc": "npm test --mode-test-case=testCase_build_doc",
        "example.js": "utility2 shRunScreenCapture shReadmeTestJs example.js",
        "start": "\
export PORT=${PORT:-8080} && \
export npm_config_mode_auto_restart=1 && \
utility2 shRun shIstanbulCover node test.js",
        "start-heroku": "\
export npm_config_mode_backend=1 && \
npm start \
",
        "test": "\
export PORT=$(utility2 shServerPortRandom) && \
utility2 test node test.js",
        "test-published": "utility2 shRun shNpmTestPublished"
    },
    "version": "2016.5.4"
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
        npm run example.js) || return $?
)}

shBuildCiTestPost() {(set -e
# this function will run the post-test build
    # if running legacy-node, then return
    [ "$(node --version)" \< "v5.0" ] && return || true
    export NODE_ENV=production
    # deploy app to gh-pages
    export TEST_URL="https://$(printf "$GITHUB_REPO" | \
        sed 's/\//.github.io\//')/build..$CI_BRANCH..travis-ci.org/app/index.html"
    (export MODE_BUILD=githubDeploy &&
        shGithubDeploy) || return $?
    # test deployed app to gh-pages
    (export MODE_BUILD=githubTest &&
        export modeBrowserTest=test &&
        export url="$TEST_URL?modeTest=consoleLogResult&timeExit={{timeExit}}" &&
        shBrowserTest) || return $?
    # deploy app to heroku
    export HEROKU_REPO="hrku01-$npm_package_name-$CI_BRANCH"
    export TEST_URL="https://$HEROKU_REPO.herokuapp.com"
    shGitRepoBranchUpdateLocal() {(set -e
    # this function will local-update git-repo-branch
        cp "$npm_config_dir_build/app/assets.app.js" .
    )}
    (export MODE_BUILD=herokuDeploy &&
        shHerokuDeploy) || return $?
    # test deployed app to heroku
    (export MODE_BUILD=herokuTest &&
        export modeBrowserTest=test &&
        export url="$TEST_URL?modeTest=consoleLogResult&timeExit={{timeExit}}" &&
        shBrowserTest) || return $?
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
