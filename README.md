swagger-lite
============
this package will run a virtual swagger-ui server with persistent storage in the browser, that your webapp can use (in-place of a real backend)

[![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-swagger-lite.svg)](https://travis-ci.org/kaizhu256/node-swagger-lite)

[![NPM](https://nodei.co/npm/swagger-lite.png?downloads=true)](https://www.npmjs.com/package/swagger-lite)

[![package-listing](https://kaizhu256.github.io/node-swagger-lite/build/screen-capture.gitLsTree.svg)](https://github.com/kaizhu256/node-swagger-lite)



# cdn download
- [http://kaizhu256.github.io/node-swagger-lite/build..beta..travis-ci.org/app/assets.swagger-lite.js](http://kaizhu256.github.io/node-swagger-lite/build..beta..travis-ci.org/app/assets.swagger-lite.js)
- [http://kaizhu256.github.io/node-swagger-lite/build..beta..travis-ci.org/app/assets.swagger-lite.min.js](http://kaizhu256.github.io/node-swagger-lite/build..beta..travis-ci.org/app/assets.swagger-lite.min.js)



# live demo
- [https://kaizhu256.github.io/node-swagger-lite/build..beta..travis-ci.org/app/index.html](https://kaizhu256.github.io/node-swagger-lite/build..beta..travis-ci.org/app/index.html)

[![github.com test-server](https://kaizhu256.github.io/node-swagger-lite/build/screen-capture.githubDeploy.browser._2Fnode-swagger-lite_2Fbuild..alpha..travis-ci.org_2Fapp_2Findex.html.png)](https://kaizhu256.github.io/node-swagger-lite/build..beta..travis-ci.org/app/index.html)



# documentation
#### api-doc
- [https://kaizhu256.github.io/node-swagger-lite/build..beta..travis-ci.org/doc.api.html](https://kaizhu256.github.io/node-swagger-lite/build..beta..travis-ci.org/doc.api.html)

[![api-doc](https://kaizhu256.github.io/node-swagger-lite/build..beta..travis-ci.org/screen-capture.docApiCreate.browser._2Fhome_2Ftravis_2Fbuild_2Fkaizhu256_2Fnode-swagger-lite_2Ftmp_2Fbuild_2Fdoc.api.html.png)](https://kaizhu256.github.io/node-swagger-lite/build..beta..travis-ci.org/doc.api.html)

#### todo
- rename field _timeModified -> _timeUpdated
- allow secure remote db export / import / reset to backend
- add middlewareAcl
- datatable - add sort-by-field
- add notification system
- add post-crud-middleware for pet photoUrl
- add api userPasswordChange
- add message-param to assertions in swgg.validateByPropDef
- add logging feature
- add cached version crudGetManyByQueryCached
- none

#### change since 382dd07d
- npm publish 2016.10.2
- temporary fix for chrome render bug - https://bugs.chromium.org/p/chromium/issues/detail?id=660671
- rename api-suffix *KeyUnique -> *Id
- rename field createdAt -> _timeCreated
- rename field updatedAt -> _timeModified
- none

#### this package requires
- darwin or linux os
- chromium-based browser or firefox browser

#### differences from swagger-spec @ https://github.com/OAI/OpenAPI-Specification/blob/394ffd3ff3e2fe0029a821170937a8154b04e0ba/versions/2.0.md
- content-type "application/xml" is not currently supported
- array-parameters are serialized using JSON.stringify, and the "collectionFormat" field is ignored



# build-status [![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-swagger-lite.svg)](https://travis-ci.org/kaizhu256/node-swagger-lite)
[![build commit status](https://kaizhu256.github.io/node-swagger-lite/build/build.badge.svg)](https://travis-ci.org/kaizhu256/node-swagger-lite)

| git-branch : | [master](https://github.com/kaizhu256/node-swagger-lite/tree/master) | [beta](https://github.com/kaizhu256/node-swagger-lite/tree/beta) | [alpha](https://github.com/kaizhu256/node-swagger-lite/tree/alpha)|
|--:|:--|:--|:--|
| test-server-1 : | [![github.com test-server](https://kaizhu256.github.io/node-swagger-lite/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-swagger-lite/build..master..travis-ci.org/app/index.html) | [![github.com test-server](https://kaizhu256.github.io/node-swagger-lite/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-swagger-lite/build..beta..travis-ci.org/app/index.html) | [![github.com test-server](https://kaizhu256.github.io/node-swagger-lite/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-swagger-lite/build..alpha..travis-ci.org/app/index.html)|
| test-server-2 : | [![heroku.com test-server](https://kaizhu256.github.io/node-swagger-lite/heroku-logo.75x25.png)](https://hrku01-swagger-lite-master.herokuapp.com) | [![heroku.com test-server](https://kaizhu256.github.io/node-swagger-lite/heroku-logo.75x25.png)](https://hrku01-swagger-lite-beta.herokuapp.com) | [![heroku.com test-server](https://kaizhu256.github.io/node-swagger-lite/heroku-logo.75x25.png)](https://hrku01-swagger-lite-alpha.herokuapp.com)|
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
- [example.js](https://kaizhu256.github.io/node-swagger-lite/build/example.js)
```javascript
/*
example.js

this script will run a standalone swagger-ui server backed by db-lite

instruction
    1. save this script as example.js
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
        // re-init local
        local = local.modeJs === 'browser'
            ? window.swgg.local
            : module.isRollup
            ? module
            : require('swagger-lite').local;
        // export local
        local.global.local = local;
        // load db
        local.db.dbLoad(function () {
            console.log('db loaded from ' + local.storageDir);
        });
        local.middlewareCrudCustom = function (request, response, nextMiddleware) {
        /*
         * this function will run the middleware that will run custom-crud-operations
         */
            var crud, options, result;
            options = {};
            local.utility2.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    crud = request.swgg.crud;
                    switch (crud.operationId.split('.')[0]) {
                    // coverage-hack - test error handling-behavior
                    case 'crudErrorPre':
                        options.onNext(local.utility2.errorDefault);
                        return;
                    case 'getInventory':
                        crud.dbTable.crudGetManyByQuery({
                            query: {},
                            projection: ['status']
                        }, options.onNext);
                        break;
                    default:
                        options.modeNext = Infinity;
                        options.onNext();
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
                        options.onNext(null, result);
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
            options.modeNext = 0;
            options.onNext();
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
            local.swgg.middlewareJsonpStateInit,
            local.utility2.middlewareBodyRead,
            local.swgg.middlewareBodyParse,
            local.swgg.middlewareValidate,
            local.middlewareCrudCustom,
            local.swgg.middlewareCrudBuiltin,
            local.swgg.middlewareCrudEnd
        ]);
        // init error-middleware
        local.middlewareError = local.swgg.middlewareError;
        // run test-server
        local.utility2.testRunServer(local);
    }());
    switch (local.modeJs) {



    // run browser js-env code - post-init
    case 'browser':
        /* istanbul ignore next */
        local.testRun = function (event) {
            var reader, tmp;
            switch (event && event.currentTarget.id) {
            case 'dbExportButton1':
                tmp = window.URL.createObjectURL(new window.Blob([local.db.dbExport()]));
                document.querySelector('#dbExportA1').href = tmp;
                document.querySelector('#dbExportA1').click();
                setTimeout(function () {
                    window.URL.revokeObjectURL(tmp);
                }, 30000);
                break;
            case 'dbImportButton1':
                document.querySelector('#dbImportInput1').click();
                break;
            case 'dbImportInput1':
                local.utility2.ajaxProgressShow();
                reader = new window.FileReader();
                tmp = document.querySelector('#dbImportInput1').files[0];
                if (!tmp) {
                    return;
                }
                reader.addEventListener('load', function () {
                    local.db.dbImport(reader.result);
                    local.utility2.ajaxProgressUpdate();
                });
                reader.readAsText(tmp);
                break;
            case 'dbResetButton1':
                local.dbReset();
                break;
            case 'testRunButton1':
                // show tests
                if (document.querySelector('#testReportDiv1').style.display === 'none') {
                    document.querySelector('#testReportDiv1').style.display = 'block';
                    document.querySelector('#testRunButton1').innerText = 'hide internal test';
                    local.modeTest = true;
                    local.utility2.testRun(local);
                // hide tests
                } else {
                    document.querySelector('#testReportDiv1').style.display = 'none';
                    document.querySelector('#testRunButton1').innerText = 'run internal test';
                }
                break;
            }
        };
        // init event-handling
        ['change', 'click'].forEach(function (event) {
            Array.from(document.querySelectorAll('.on' + event)).forEach(function (element) {
                element.addEventListener(event, local.testRun);
            });
        });
        // init ui
        local.swgg.uiEventListenerDict['.onEventUiReload']();
        // run tests
        [local.utility2.modeTest].filter(local.utility2.echo).forEach(function () {
            document.querySelector('#testRunButton1').innerText = 'hide internal test';
        });
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
        local.templateIndexHtml = '\
<!doctype html>\n\
<html lang="en">\n\
<head>\n\
<meta charset="UTF-8">\n\
<meta name="viewport" content="width=device-width, initial-scale=1">\n\
<title>\n\
{{envDict.npm_package_name}} v{{envDict.npm_package_version}}\n\
</title>\n\
<link href="assets.swgg.css" rel="stylesheet">\n\
<style>\n\
/*csslint\n\
    box-sizing: false,\n\
    ids: false,\n\
    universal-selector: false\n\
*/\n\
* {\n\
    box-sizing: border-box;\n\
}\n\
body {\n\
    background: #fff;\n\
    font-family: Arial, Helvetica, sans-serif;\n\
    margin: 1rem;\n\
}\n\
body > * {\n\
    margin-bottom: 1rem;\n\
}\n\
body > button {\n\
    width: 15rem;\n\
}\n\
.zeroPixel {\n\
    border: 0;\n\
    height: 0;\n\
    margin: 0;\n\
    padding: 0;\n\
    width: 0;\n\
}\n\
</style>\n\
</head>\n\
<body>\n\
    <h1>\n\
<!-- utility2-comment\n\
        <div id="ajaxProgressDiv1" style="background: #d00; height: 2px; left: 0; margin: 0; padding: 0; position: fixed; top: 0; transition: background 0.5s, width 1.5s; width: 25%;"></div>\n\
        <a\n\
            {{#if envDict.npm_package_homepage}}\n\
            href="{{envDict.npm_package_homepage}}"\n\
            {{/if envDict.npm_package_homepage}}\n\
            target="_blank"\n\
        >\n\
utility2-comment -->\n\
            {{envDict.npm_package_name}} v{{envDict.npm_package_version}}\n\
<!-- utility2-comment\n\
        </a>\n\
utility2-comment -->\n\
    </h1>\n\
    <h3>{{envDict.npm_package_description}}</h3>\n\
<!-- utility2-comment\n\
    <h4><a download href="assets.app.js">download standalone app</a></h4>\n\
    <button class="onclick" id="testRunButton1">run internal test</button><br>\n\
utility2-comment -->\n\
    <div id="testReportDiv1" style="display: none;"></div>\n\
    <button class="onclick" id="dbResetButton1">reset db-database</button><br>\n\
    <button class="onclick" id="dbExportButton1">save db-database to file</button><br>\n\
    <a download="db.persistence.json" href="" id="dbExportA1"></a>\n\
    <button class="onclick" id="dbImportButton1">load db-database from file</button><br>\n\
    <input class="onchange zeroPixel" type="file" id="dbImportInput1">\n\
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
    {{#unless isRollup}}\n\
    <script src="assets.utility2.rollup.js"></script>\n\
    <script src="assets.swgg.js"></script>\n\
    <script src="assets.swgg.lib.swagger-ui.js"></script>\n\
    <script src="jsonp.swgg.stateInit?callback=window.swgg.stateInit"></script>\n\
    <script>window.utility2.onResetBefore.counter += 1;</script>\n\
    <script src="assets.example.js"></script>\n\
    <script src="assets.test.js"></script>\n\
    <script>window.utility2.onResetBefore();</script>\n\
    {{/if isRollup}}\n\
</body>\n\
</html>\n\
';
        /* jslint-ignore-end */
        local.utility2.assetsDict['/'] = local.utility2.templateRender(
            local.templateIndexHtml,
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
                        _timeCreated: { format: 'date-time', readOnly: true, type: 'string' },
                        _timeModified: { format: 'date-time', readOnly: true, type: 'string' },
                        id: { default: 1, minimum: 1 }
                    }
                },
                Order: {
                    properties: {
                        _id: { readOnly: true, type: 'string' },
                        _timeCreated: { format: 'date-time', readOnly: true, type: 'string' },
                        _timeModified: { format: 'date-time', readOnly: true, type: 'string' },
                        id: { default: 1, minimum: 1 }
                    }
                },
                User: {
                    allOf: [{ $ref: '#/definitions/BuiltinUser' }],
                    properties: {
                        _id: { readOnly: true, type: 'string' },
                        _timeCreated: { format: 'date-time', readOnly: true, type: 'string' },
                        _timeModified: { format: 'date-time', readOnly: true, type: 'string' },
                        email: { default: 'a@a.com', format: 'email' },
                        id: { default: 1, minimum: 1 }
                    }
                }
            },
            tags: [{ description: 'builtin-file model', name: 'file' }],
            'x-swgg-apiDict': {
                'file crudCountManyByQuery': {
                    _schemaName: 'File'
                },
                'file crudSetOneById.id.id': {
                    _schemaName: 'File'
                },
                'file crudGetManyByQuery': {
                    _schemaName: 'File'
                },
                'file crudRemoveOneById.id.id': {
                    _schemaName: 'File'
                },
                'file crudUpdateOneById.id.id': {
                    _schemaName: 'File'
                },
                'file fileGetOneById.id.id': {
                    _schemaName: 'File'
                },
                'file fileUploadManyByForm.1': {
                    _schemaName: 'File'
                },
                'pet addPet': {
                    _operationId: 'crudSetOneById.petId.id',
                    _schemaName: 'Pet'
                },
                'pet crudGetManyByQuery': {
                    _schemaName: 'Pet'
                },
                'pet deletePet': {
                    _operationId: 'crudRemoveOneById.petId.id',
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
                    _operationId: 'crudGetOneById.petId.id',
                    _schemaName: 'Pet'
                },
                'pet updatePet': {
                    _operationId: 'crudUpdateOneById.petId.id',
                    _schemaName: 'Pet'
                },
                'pet updatePetWithForm': {
                    _operationId: 'crudUpdateOneById.petId.id',
                    _schemaName: 'Pet'
                },
                'pet uploadFile': {
                    _operationId: 'fileUploadManyByForm',
                    _schemaName: 'User'
                },
                'store crudGetManyByQuery': {
                    _schemaName: 'Order'
                },
                'store crudUpdateOneById.id.id': {
                    _schemaName: 'Order'
                },
                'store deleteOrder': {
                    _operationId: 'crudRemoveOneById.orderId.id',
                    _schemaName: 'Order'
                },
                'store getInventory': {
                    _schemaName: 'Order'
                },
                'store getOrderById': {
                    _operationId: 'crudGetOneById.orderId.id',
                    _schemaName: 'Order'
                },
                'store placeOrder': {
                    _operationId: 'crudSetOneById.orderId.id',
                    _schemaName: 'Order'
                },
                'user createUser': {
                    _operationId: 'crudSetOneById.username.username',
                    _schemaName: 'User'
                },
                'user createUsersWithArrayInput': {
                    _operationId: 'crudSetManyById',
                    _schemaName: 'User'
                },
                'user createUsersWithListInput': {
                    _operationId: 'crudSetManyById',
                    _schemaName: 'User'
                },
                'user crudCountManyByQuery': {
                    _schemaName: 'User'
                },
                'user crudSetOneById.username.username': {
                    _schemaName: 'User'
                },
                'user crudRemoveOneById.username.username': {
                    _schemaName: 'User'
                },
                'user crudGetManyByQuery': {
                    _schemaName: 'User'
                },
                'user crudUpdateOneById.username.username': {
                    _schemaName: 'User'
                },
                'user deleteUser': {
                    _operationId: 'crudRemoveOneById.username.username',
                    _schemaName: 'User'
                },
                'user getUserByName': {
                    _operationId: 'crudGetOneById.username.username',
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
                    _operationId: 'crudUpdateOneById.username.username',
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
                    crudSetOneById:
                        'file crudSetOneById.id.id',
                    crudRemoveOneById:
                        'file crudRemoveOneById.id.id',
                    crudGetManyByQuery: 'file crudGetManyByQuery',
                    idField: 'id',
                    queryLimit: 20,
                    schema: { $ref: '#/definitions/File' }
                },
                pet: {
                    crudSetOneById: 'pet addPet',
                    crudRemoveOneById: 'pet deletePet',
                    crudGetManyByQuery: 'pet crudGetManyByQuery',
                    idField: 'id',
                    queryLimit: 20,
                    schema: { $ref: '#/definitions/Pet' }
                },
                store: {
                    crudSetOneById: 'store placeOrder',
                    crudRemoveOneById: 'store deleteOrder',
                    crudGetManyByQuery: 'store crudGetManyByQuery',
                    idField: 'id',
                    queryLimit: 20,
                    schema: { $ref: '#/definitions/Order' }
                },
                user: {
                    crudSetOneById: 'user createUser',
                    crudRemoveOneById: 'user deleteUser',
                    crudGetManyByQuery: 'user crudGetManyByQuery',
                    idField: 'username',
                    queryLimit: 20,
                    schema: { $ref: '#/definitions/User' }
                }
            }
        });
        // init db
        local.dbSeedList = [{
            dbRowList: [{
                id: 'testCase_swaggerUiLogoSmall',
                fileBlob: local.swgg.templateSwaggerUiLogoSmallBase64,
                fileContentType: 'image/png',
                fileDescription: 'swagger-ui logo',
                fileFilename: 'swaggerUiLogoSmall.png'
            }],
            idIndexCreateList: [{
                name: 'id'
            }],
            name: 'File'
        }, {
            dbRowList: local.swgg.dbRowListRandomCreate({
                dbRowList: [{
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
            idIndexCreateList: [{
                isInteger: true,
                name: 'id'
            }],
            name: 'Pet'
        }, {
            dbRowList: local.swgg.dbRowListRandomCreate({
                dbRowList: [{
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
            idIndexCreateList: [{
                isInteger: true,
                name: 'id'
            }],
            name: 'Order'
        }, {
            dbRowList: local.swgg.dbRowListRandomCreate({
                dbRowList: [{
                    email: 'admin@admin.com',
                    firstName: 'admin',
                    id: 0,
                    lastName: '',
                    password: local.utility2.sjclHashScryptCreate('secret'),
                    phone: '1234-5678',
                    username: 'admin'
                }, {
                    email: 'jane@doe.com',
                    firstName: 'jane',
                    id: 1,
                    lastName: 'doe',
                    password: local.utility2.sjclHashScryptCreate('secret'),
                    phone: '1234-5678',
                    username: 'jane.doe'
                }, {
                    email: 'john@doe.com',
                    firstName: 'john',
                    id: 2,
                    lastName: 'doe',
                    password: local.utility2.sjclHashScryptCreate('secret'),
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
                        password: local.utility2.sjclHashScryptCreate('secret'),
                        tags: [
                            { name: local.utility2.listGetElementRandom(['female', 'male']) },
                            { name: Math.random().toString(36).slice(2) }
                        ]
                    };
                },
                properties: local.swgg.swaggerJson.definitions.User.properties
            }),
            idIndexCreateList: [{
                name: 'email'
            }, {
                name: 'id',
                isInteger: true
            }, {
                name: 'username'
            }],
            name: 'User'
        }];
        local.dbReset = function () {
            local.utility2.onResetBefore.counter += 1;
            local.db.dbReset(local.utility2.onResetBefore);
            local.utility2.onResetAfter(function () {
                console.log('db seeding ...');
                local.utility2.onReadyBefore.counter += 1;
                local.db.dbTableCreateMany(local.dbSeedList, local.utility2.onReadyBefore);
                local.utility2.onReadyBefore.counter += 1;
                local.db.dbTableCreateMany(local.dbSeedTestList, local.utility2.onReadyBefore);
            });
        };
        local.utility2.testRunBefore = local.dbReset;
    }());
}());
```

#### output from electron
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
        "utility2": "2016.10.4"
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
        "build-ci": "utility2 shRun shReadmeBuild",
        "start": "\
export PORT=${PORT:-8080} && \
export npm_config_mode_auto_restart=1 && \
utility2 shRun shIstanbulCover test.js",
        "test": "export PORT=$(utility2 shServerPortRandom) && utility2 test test.js"
    },
    "version": "2016.10.2"
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
    # test example.js
    (export MODE_BUILD=testExampleJs &&
        shRunScreenCapture shReadmeTestJs example.js) || return $?
    # test published-package
    (export MODE_BUILD=npmTestPublished &&
        shRunScreenCapture shNpmTestPublished) || return $?
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
        export url="$TEST_URL?modeTest=1&timeExit={{timeExit}}" &&
        shBrowserTest) || return $?
    # deploy app to heroku
    export HEROKU_REPO="hrku01-$npm_package_name-$CI_BRANCH"
    export TEST_URL="https://$HEROKU_REPO.herokuapp.com"
    shGitRepoBranchUpdateLocal() {(set -e
    # this function will local-update git-repo-branch
        cp "$npm_config_dir_build/app/assets.app.js" .
        printf "web: npm_config_mode_backend=1 node assets.app.js" > Procfile
    )}
    (export MODE_BUILD=herokuDeploy &&
        shHerokuDeploy) || return $?
    # test deployed app to heroku
    (export MODE_BUILD=herokuTest &&
        export modeBrowserTest=test &&
        export url="$TEST_URL?modeTest=1&timeExit={{timeExit}}" &&
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
