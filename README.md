# swgg
this zero-dependency package will run a virtual swagger-ui server with persistent-storage in the browser, that your webapp can use (in-place of a real backend), with a working web-demo

# live web demo
- [https://kaizhu256.github.io/node-swgg/build..beta..travis-ci.org/app](https://kaizhu256.github.io/node-swgg/build..beta..travis-ci.org/app)

[![screenshot](https://kaizhu256.github.io/node-swgg/build/screenshot.deployGithub.browser.%252Fnode-swgg%252Fbuild%252Fapp.png)](https://kaizhu256.github.io/node-swgg/build..beta..travis-ci.org/app)



[![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-swgg.svg)](https://travis-ci.org/kaizhu256/node-swgg) [![coverage](https://kaizhu256.github.io/node-swgg/build/coverage.badge.svg)](https://kaizhu256.github.io/node-swgg/build/coverage.html/index.html) [![snyk.io vulnerabilities](https://snyk.io/test/github/kaizhu256/node-swgg/badge.svg)](https://snyk.io/test/github/kaizhu256/node-swgg)

[![NPM](https://nodei.co/npm/swgg.png?downloads=true)](https://www.npmjs.com/package/swgg)

[![build commit status](https://kaizhu256.github.io/node-swgg/build/build.badge.svg)](https://travis-ci.org/kaizhu256/node-swgg)

| git-branch : | [master](https://github.com/kaizhu256/node-swgg/tree/master) | [beta](https://github.com/kaizhu256/node-swgg/tree/beta) | [alpha](https://github.com/kaizhu256/node-swgg/tree/alpha)|
|--:|:--|:--|:--|
| test-server-github : | [![github.com test-server](https://kaizhu256.github.io/node-swgg/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-swgg/build..master..travis-ci.org/app) | [![github.com test-server](https://kaizhu256.github.io/node-swgg/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-swgg/build..beta..travis-ci.org/app) | [![github.com test-server](https://kaizhu256.github.io/node-swgg/GitHub-Mark-32px.png)](https://kaizhu256.github.io/node-swgg/build..alpha..travis-ci.org/app)|
| test-server-heroku : | [![heroku.com test-server](https://kaizhu256.github.io/node-swgg/heroku-logo.75x25.png)](https://h1-swgg-master.herokuapp.com) | [![heroku.com test-server](https://kaizhu256.github.io/node-swgg/heroku-logo.75x25.png)](https://h1-swgg-beta.herokuapp.com) | [![heroku.com test-server](https://kaizhu256.github.io/node-swgg/heroku-logo.75x25.png)](https://h1-swgg-alpha.herokuapp.com)|
| test-report : | [![test-report](https://kaizhu256.github.io/node-swgg/build..master..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-swgg/build..master..travis-ci.org/test-report.html) | [![test-report](https://kaizhu256.github.io/node-swgg/build..beta..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-swgg/build..beta..travis-ci.org/test-report.html) | [![test-report](https://kaizhu256.github.io/node-swgg/build..alpha..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-swgg/build..alpha..travis-ci.org/test-report.html)|
| coverage : | [![coverage](https://kaizhu256.github.io/node-swgg/build..master..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-swgg/build..master..travis-ci.org/coverage.html/index.html) | [![coverage](https://kaizhu256.github.io/node-swgg/build..beta..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-swgg/build..beta..travis-ci.org/coverage.html/index.html) | [![coverage](https://kaizhu256.github.io/node-swgg/build..alpha..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-swgg/build..alpha..travis-ci.org/coverage.html/index.html)|
| build-artifacts : | [![build-artifacts](https://kaizhu256.github.io/node-swgg/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-swgg/tree/gh-pages/build..master..travis-ci.org) | [![build-artifacts](https://kaizhu256.github.io/node-swgg/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-swgg/tree/gh-pages/build..beta..travis-ci.org) | [![build-artifacts](https://kaizhu256.github.io/node-swgg/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-swgg/tree/gh-pages/build..alpha..travis-ci.org)|

[![npmPackageListing](https://kaizhu256.github.io/node-swgg/build/screenshot.npmPackageListing.svg)](https://github.com/kaizhu256/node-swgg)

![npmPackageDependencyTree](https://kaizhu256.github.io/node-swgg/build/screenshot.npmPackageDependencyTree.svg)



# table of contents
1. [cdn download](#cdn-download)
1. [documentation](#documentation)
1. [quickstart standalone app](#quickstart-standalone-app)
1. [quickstart example.js](#quickstart-examplejs)
1. [extra screenshots](#extra-screenshots)
1. [package.json](#packagejson)
1. [changelog of last 50 commits](#changelog-of-last-50-commits)
1. [internal build script](#internal-build-script)
1. [misc](#misc)



# cdn download
- [https://kaizhu256.github.io/node-swgg/build..beta..travis-ci.org/app/assets.swgg.html](https://kaizhu256.github.io/node-swgg/build..beta..travis-ci.org/app/assets.swgg.html)
- [https://kaizhu256.github.io/node-swgg/build..beta..travis-ci.org/app/assets.swgg.swagger.json](https://kaizhu256.github.io/node-swgg/build..beta..travis-ci.org/app/assets.swgg.swagger.json)
- [https://kaizhu256.github.io/node-swgg/build..beta..travis-ci.org/app/assets.utility2.rollup.js](https://kaizhu256.github.io/node-swgg/build..beta..travis-ci.org/app/assets.utility2.rollup.js)



# documentation
#### cli help
![screenshot](https://kaizhu256.github.io/node-swgg/build/screenshot.npmPackageCliHelp.svg)

#### api doc
- [https://kaizhu256.github.io/node-swgg/build..beta..travis-ci.org/apidoc.html](https://kaizhu256.github.io/node-swgg/build..beta..travis-ci.org/apidoc.html)

[![apidoc](https://kaizhu256.github.io/node-swgg/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png)](https://kaizhu256.github.io/node-swgg/build..beta..travis-ci.org/apidoc.html)

#### todo
- css - merge .resourceDescripton into .resource > .thead
- allow parsing of default path-argument, e.g. /aa/{bb=1}/{cc=2}
- add hmacSha256 support for wechat-pay
- add validators from https://github.com/swagger-api/swagger-editor/blob/v3.0.17/src/plugins/validation/semantic-validators/validators/items-required-for-array-objects.js
- add property parameters.x-swgg-persist to persist to localStorage
- revamp datatable with card-expansion ui
- datatable - allow optional sub-level input for swagger-models
- add authorization-header hook
- add middlewareAcl
- datatable - add sort-by-field
- add api userPasswordChange
- add cached version crudGetManyByQueryCached
- none

#### changelog for v2018.2.24
- npm publish v2018.2.24
- assets.utility2.rollup.js - add function shlintUtility2 and macro # jslint-utility2
- merge function uiRenderAll into onEventUiReload
- add ui-element swggAjaxErrorPre1, and uppdate function uiNotify to post errors there
- fix bug in function normalizeSwaggerJson where options.objectSetDescription is not applied to operation.parameters or operation.responses
- update function normalizeSwaggerJson with option x-swgg-fixErrorSemanticUniquePath
- add function operationIdFromAjax
- add function swaggerJsonFromAjax, swaggerJsonFromCurl, swaggerJsonFromPostBody
- add function urlParseWithBraket
- none

#### this package requires
- darwin or linux os

#### this swagger-implementation is compliant with json-schema-validation (draft-04)
- [http://json-schema.org/draft-04/json-schema-validation.html](http://json-schema.org/draft-04/json-schema-validation.html)

#### this swagger-implementation is compliant with OpenAPI Specification (2.0)
- [https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md](https://github.com/OAI/OpenAPI-Specification/blob/3.0.0/versions/2.0.md)



# quickstart standalone app
#### to run this example, follow the instruction in the script below
- [assets.app.js](https://kaizhu256.github.io/node-swgg/build..beta..travis-ci.org/app/assets.app.js)
```shell
# example.sh

# this shell script will download and run a web-demo of swgg as a standalone app

# 1. download standalone app
curl -O https://kaizhu256.github.io/node-swgg/build..beta..travis-ci.org/app/assets.app.js
# 2. run standalone app
PORT=8081 node ./assets.app.js
# 3. open a browser to http://127.0.0.1:8081 and play with the web-demo
# 4. edit file assets.app.js to suit your needs
```

#### output from browser
[![screenshot](https://kaizhu256.github.io/node-swgg/build/screenshot.testExampleSh.browser.%252F.png)](https://kaizhu256.github.io/node-swgg/build/app/assets.example.html)

#### output from shell
![screenshot](https://kaizhu256.github.io/node-swgg/build/screenshot.testExampleSh.svg)



# quickstart example.js
[![screenshot](https://kaizhu256.github.io/node-swgg/build/screenshot.testExampleJs.browser.%252F.png)](https://kaizhu256.github.io/node-swgg/build/app/assets.example.html)

#### to run this example, follow the instruction in the script below
- [example.js](https://kaizhu256.github.io/node-swgg/build..beta..travis-ci.org/example.js)
```javascript
/*
example.js

this script will run a web-demo of swgg

instruction
    1. save this script as example.js
    2. run the shell command:
        $ npm install swgg && PORT=8081 node example.js
    3. open a browser to http://127.0.0.1:8081 and play with the web-demo
    4. edit this script to suit your needs
*/



/* istanbul instrument in package swgg */
/* jslint-utility2 */
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
        // init utility2_rollup
        local = local.global.utility2_rollup || (local.modeJs === 'browser'
            ? local.global.utility2_swgg
            : require('swgg'));
        // init exports
        local.global.local = local;
        // init assets
        local.assetsDict['/assets.swgg.swagger.json'] =
            local.assetsDict['/assets.swgg.swagger.petstore.json'];
        // load db
        local.db.dbLoad(function () {
            console.log('db loaded from ' + local.storageDir);
        });
    }());



    // run shared js-env code - function
    (function () {
        local.middlewareCrudCustom = function (request, response, nextMiddleware) {
        /*
         * this function will run the middleware that will run custom-crud-operations
         */
            var crud, options, result;
            options = {};
            local.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    crud = request.swgg.crud;
                    switch (crud.crudType[0]) {
                    // coverage-hack - test error handling-behavior
                    case 'crudErrorPre':
                        options.onNext(local.errorDefault);
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
                    switch (crud.crudType[0]) {
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
                local.serverRespondDefault(request, response, 404);
                return;
            }
            nextMiddleware();
        };

        local.utility2.testRunBefore = function () {
            local.onResetBefore.counter += 1;
            // reset db
            local.db.dbDrop(local.onResetBefore);
            // seed db
            local.onResetAfter(function () {
                console.log('db seeding ...');
                local.onReadyBefore.counter += 1;
                local.db.dbTableCreateMany(local.dbSeedList, local.onReadyBefore);
                local.onReadyBefore.counter += 1;
                local.db.dbTableCreateMany(local.dbSeedTestList, local.onReadyBefore);
            });
        };
    }());



    // run shared js-env code - init-after
    (function () {
        // init assets
        /* jslint-ignore-begin */
        local.assetsDict['/assets.index.template.html'] = local.assetsDict['/assets.swgg.html']
            .replace((/\n<\/script>\n/), '\
\n\
</script>\n\
<h1>\n\
    <a href="{{env.npm_package_homepage}}" target="_blank">\n\
        {{env.npm_package_name}} (v{{env.npm_package_version}})\n\
    </a>\n\
</h1>\n\
<h3>{{env.npm_package_description}}</h3>\n\
<h4><a download href="assets.app.js">[download standalone app]</a></h4>\n\
<button class="onclick onreset" id="testRunButton1">run internal test</button><br>\n\
<div class="uiAnimateSlide" id="testReportDiv1" style="border-bottom: 0; border-top: 0; margin-bottom: 0; margin-top: 0; max-height: 0; padding-bottom: 0; padding-top: 0;"></div>\n\
\n\
\n\
\n\
<button class="onclick" id="dbResetButton1">reset database</button><br>\n\
<button class="onclick" id="dbExportButton1">export database -&gt; file</button><br>\n\
<a download="db.persistence.json" href="" id="dbExportA1"></a>\n\
<button class="onclick" id="dbImportButton1">import database &lt;- file</button><br>\n\
<input class="onchange zeroPixel" type="file" id="dbImportInput1">\n\
')
            .replace('assets.swgg.swagger.json', 'assets.swgg.swagger.server.json')
            .replace((/\n<script src=[\S\s]*\n<\/html>\n/), '\
\n\
<!-- utility2-comment\n\
{{#if isRollup}}\n\
<script src="assets.app.js"></script>\n\
{{#unless isRollup}}\n\
utility2-comment -->\n\
<script src="assets.utility2.rollup.js"></script>\n\
<script>window.utility2.onResetBefore.counter += 1;</script>\n\
<script src="jsonp.utility2.stateInit?callback=window.utility2.stateInit"></script>\n\
<script src="assets.swgg.js"></script>\n\
<script src="assets.example.js"></script>\n\
<script src="assets.test.js"></script>\n\
<script>window.utility2.onResetBefore();</script>\n\
<!-- utility2-comment\n\
{{/if isRollup}}\n\
utility2-comment -->\n\
</body>\n\
</html>\n\
');
        /* jslint-ignore-end */



        // init middleware
        local.middlewareList = local.utility2.middlewareList = [
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
        // run test-server
        local.testRunServer(local);
        // init petstore-api - frontend
        local.tmp = JSON.parse(local.assetsDict['/assets.swgg.swagger.petstore.json']);
        delete local.tmp.basePath;
        delete local.tmp.host;
        delete local.tmp.schemes;
        local.swgg.apiUpdate(local.tmp);
        // init petstore-api - backend
        local.swgg.apiUpdate({
            definitions: {
                File: {
                    allOf: [{ $ref: '#/definitions/BuiltinFile' }]
                },
                Pet: {
                    properties: {
                        _id: { readOnly: true, type: 'string' },
                        _timeCreated: { format: 'date-time', readOnly: true, type: 'string' },
                        _timeUpdated: { format: 'date-time', readOnly: true, type: 'string' },
                        id: { default: 1, minimum: 1 }
                    }
                },
                Order: {
                    properties: {
                        _id: { readOnly: true, type: 'string' },
                        _timeCreated: { format: 'date-time', readOnly: true, type: 'string' },
                        _timeUpdated: { format: 'date-time', readOnly: true, type: 'string' },
                        id: { default: 1, minimum: 1 }
                    }
                },
                User: {
                    allOf: [{ $ref: '#/definitions/BuiltinUser' }],
                    properties: {
                        _id: { readOnly: true, type: 'string' },
                        _timeCreated: { format: 'date-time', readOnly: true, type: 'string' },
                        _timeUpdated: { format: 'date-time', readOnly: true, type: 'string' },
                        email: { default: 'a@a.com', format: 'email' },
                        id: { default: 1, minimum: 1 }
                    }
                }
            },
            tags: [{ description: 'builtin-file model', name: 'file' }],
            'x-swgg-apiDict': {
                'operationId.file.crudCountManyByQuery': {
                    _schemaName: 'File'
                },
                'operationId.file.crudSetOneById.id.id': {
                    _schemaName: 'File'
                },
                'operationId.file.crudGetManyByQuery': {
                    _schemaName: 'File'
                },
                'operationId.file.crudRemoveOneById.id.id': {
                    _schemaName: 'File'
                },
                'operationId.file.crudUpdateOneById.id.id': {
                    _schemaName: 'File'
                },
                'operationId.file.fileGetOneById.id.id': {
                    _schemaName: 'File'
                },
                'operationId.file.fileUploadManyByForm.1': {
                    _schemaName: 'File'
                },
                'operationId.addPet': {
                    _crudType: ['crudSetOneById', 'petId', 'id'],
                    _schemaName: 'Pet'
                },
                'operationId.pet.crudGetManyByQuery': {
                    _schemaName: 'Pet'
                },
                'operationId.deletePet': {
                    _crudType: ['crudRemoveOneById', 'petId', 'id'],
                    _schemaName: 'Pet'
                },
                'operationId.findPetsByStatus': {
                    _crudType: ['crudGetManyByQuery'],
                    _queryWhere: '{"status":{"$in":{{status jsonStringify}}}}',
                    _schemaName: 'Pet'
                },
                'operationId.findPetsByTags': {
                    _crudType: ['crudGetManyByQuery'],
                    _queryWhere: '{"tags.name":{"$in":{{tags jsonStringify}}}}',
                    _schemaName: 'Pet'
                },
                'operationId.getPetById': {
                    _crudType: ['crudGetOneById', 'petId', 'id'],
                    _schemaName: 'Pet'
                },
                'operationId.updatePet': {
                    _crudType: ['crudUpdateOneById', 'petId', 'id'],
                    _schemaName: 'Pet'
                },
                'operationId.updatePetWithForm': {
                    _crudType: ['crudUpdateOneById', 'petId', 'id'],
                    _schemaName: 'Pet'
                },
                'operationId.uploadFile': {
                    _crudType: ['fileUploadManyByForm'],
                    _schemaName: 'User'
                },
                'operationId.store.crudGetManyByQuery': {
                    _schemaName: 'Order'
                },
                'operationId.store.crudUpdateOneById.id.id': {
                    _schemaName: 'Order'
                },
                'operationId.deleteOrder': {
                    _crudType: ['crudRemoveOneById', 'orderId', 'id'],
                    _schemaName: 'Order'
                },
                'operationId.getInventory': {
                    _schemaName: 'Order'
                },
                'operationId.getOrderById': {
                    _crudType: ['crudGetOneById', 'orderId', 'id'],
                    _schemaName: 'Order'
                },
                'operationId.placeOrder': {
                    _crudType: ['crudSetOneById', 'orderId', 'id'],
                    _schemaName: 'Order'
                },
                'operationId.createUser': {
                    _crudType: ['crudSetOneById', 'username', 'username'],
                    _schemaName: 'User'
                },
                'operationId.createUsersWithArrayInput': {
                    _crudType: ['crudSetManyById'],
                    _schemaName: 'User'
                },
                'operationId.createUsersWithListInput': {
                    _crudType: ['crudSetManyById'],
                    _schemaName: 'User'
                },
                'operationId.user.crudCountManyByQuery': {
                    _schemaName: 'User'
                },
                'operationId.user.crudSetOneById.username.username': {
                    _schemaName: 'User'
                },
                'operationId.user.crudRemoveOneById.username.username': {
                    _schemaName: 'User'
                },
                'operationId.user.crudGetManyByQuery': {
                    _schemaName: 'User'
                },
                'operationId.user.crudUpdateOneById.username.username': {
                    _schemaName: 'User'
                },
                'operationId.deleteUser': {
                    _crudType: ['crudRemoveOneById', 'username', 'username'],
                    _schemaName: 'User'
                },
                'operationId.getUserByName': {
                    _crudType: ['crudGetOneById', 'username', 'username'],
                    _schemaName: 'User'
                },
                'operationId.loginUser': {
                    _crudType: ['userLoginByPassword'],
                    _schemaName: 'User'
                },
                'operationId.logoutUser': {
                    _crudType: ['userLogout'],
                    _schemaName: 'User'
                },
                'operationId.updateUser': {
                    _crudType: ['crudUpdateOneById', 'username', 'username'],
                    _schemaName: 'User'
                },
                'operationId.user.userLoginByPassword': {
                    _schemaName: 'User'
                },
                'operationId.user.userLogout': {
                    _schemaName: 'User'
                }
            }
        });
/* validateLineSortedReset */
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
                        name: local.listGetElementRandom(
                            ['birdie', 'doggie', 'fishie']
                        ) + '-' + (options.ii + 100),
                        tags: [
                            { name: local.listGetElementRandom(['female', 'male']) }
                        ]
                    };
                },
                schema: { properties: local.swgg.swaggerJson.definitions.Pet.properties }
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
                schema: { properties: local.swgg.swaggerJson.definitions.Order.properties }
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
                    password: local.sjclHashScryptCreate('secret'),
                    phone: '1234-5678',
                    username: 'admin'
                }, {
                    email: 'jane@doe.com',
                    firstName: 'jane',
                    id: 1,
                    lastName: 'doe',
                    password: local.sjclHashScryptCreate('secret'),
                    phone: '1234-5678',
                    username: 'jane.doe'
                }, {
                    email: 'john@doe.com',
                    firstName: 'john',
                    id: 2,
                    lastName: 'doe',
                    password: local.sjclHashScryptCreate('secret'),
                    phone: '1234-5678',
                    username: 'john.doe'
                }],
                // init 100 extra random users
                length: 100,
                override: function (options) {
                    return {
                        firstName: local.listGetElementRandom(
                            ['alice', 'bob', 'jane', 'john']
                        ) + '-' + (options.ii + 100),
                        id: options.ii + 100,
                        lastName: local.listGetElementRandom(['doe', 'smith']) +
                            '-' + (options.ii + 100),
                        password: local.sjclHashScryptCreate('secret'),
                        tags: [
                            { name: local.listGetElementRandom(['female', 'male']) },
                            { name: Math.random().toString(36).slice(2) }
                        ]
                    };
                },
                schema: { properties: local.swgg.swaggerJson.definitions.User.properties }
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
    }());
    switch (local.modeJs) {



    // run browser js-env code - init-test
    /* istanbul ignore next */
    case 'browser':
        local.testRunBrowser = function (event) {
            var reader, tmp;
            if (!event || (event &&
                    event.currentTarget &&
                    event.currentTarget.className &&
                    event.currentTarget.className.includes &&
                    event.currentTarget.className.includes('onreset'))) {
                // reset output
                Array.from(
                    document.querySelectorAll('body > .resettable')
                ).forEach(function (element) {
                    switch (element.tagName) {
                    case 'INPUT':
                    case 'TEXTAREA':
                        element.value = '';
                        break;
                    default:
                        element.textContent = '';
                    }
                });
            }
            switch (event && event.currentTarget && event.currentTarget.id) {
            case 'testRunButton1':
                // show tests
                if (document.querySelector('#testReportDiv1').style.maxHeight === '0px') {
                    local.uiAnimateSlideDown(document.querySelector('#testReportDiv1'));
                    document.querySelector('#testRunButton1').textContent = 'hide internal test';
                    local.modeTest = true;
                    local.testRunDefault(local);
                // hide tests
                } else {
                    local.uiAnimateSlideUp(document.querySelector('#testReportDiv1'));
                    document.querySelector('#testRunButton1').textContent = 'run internal test';
                }
                break;
            // custom-case
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
                local.ajaxProgressShow();
                reader = new window.FileReader();
                tmp = document.querySelector('#dbImportInput1').files[0];
                if (!tmp) {
                    return;
                }
                reader.addEventListener('load', function () {
                    local.db.dbImport(reader.result);
                    local.ajaxProgressUpdate();
                });
                reader.readAsText(tmp);
                break;
            case 'dbResetButton1':
                local.utility2.testRunBefore();
                break;
            case undefined:
                // init ui
                local.onReadyBefore.counter += 1;
                local.swgg.uiEventListenerDict['.onEventUiReload'](null, local.onReadyBefore);
                // coverage-hack - ignore else-statement
                local.nop(local.modeTest && (function () {
                    document.querySelector('#testRunButton1').textContent =
                        'hide internal test';
                }()));
                break;
            }
            if (document.querySelector('#inputTextareaEval1') && (!event || (event &&
                    event.currentTarget &&
                    event.currentTarget.className &&
                    event.currentTarget.className.includes &&
                    event.currentTarget.className.includes('oneval')))) {
                // try to eval input-code
                try {
                    /*jslint evil: true*/
                    eval(document.querySelector('#inputTextareaEval1').value);
                } catch (errorCaught) {
                    console.error(errorCaught);
                }
            }
        };
        // log stderr and stdout to #outputTextareaStdout1
        ['error', 'log'].forEach(function (key) {
            console[key + '_original'] = console[key];
            console[key] = function () {
                var element;
                console[key + '_original'].apply(console, arguments);
                element = document.querySelector('#outputTextareaStdout1');
                if (!element) {
                    return;
                }
                // append text to #outputTextareaStdout1
                element.value += Array.from(arguments).map(function (arg) {
                    return typeof arg === 'string'
                        ? arg
                        : JSON.stringify(arg, null, 4);
                }).join(' ') + '\n';
                // scroll textarea to bottom
                element.scrollTop = element.scrollHeight;
            };
        });
        // init event-handling
        ['change', 'click', 'keyup'].forEach(function (event) {
            Array.from(document.querySelectorAll('.on' + event)).forEach(function (element) {
                element.addEventListener(event, local.testRunBrowser);
            });
        });
        // run tests
        local.testRunBrowser();
        break;



    // run node js-env code - init-test
    /* istanbul ignore next */
    case 'node':
        // init exports
        module.exports = local;
        // require builtins
        Object.keys(process.binding('natives')).forEach(function (key) {
            if (!local[key] && !(/\/|^_|^sys$/).test(key)) {
                local[key] = require(key);
            }
        });
        // init assets
        local.assetsDict = local.assetsDict || {};
        [
            'assets.index.css',
            'assets.index.template.html',
            'assets.swgg.swagger.json',
            'assets.swgg.swagger.server.json'
        ].forEach(function (file) {
            file = '/' + file;
            local.assetsDict[file] = local.assetsDict[file] || '';
            if (local.fs.existsSync(local.__dirname + file)) {
                local.assetsDict[file] = local.fs.readFileSync(
                    local.__dirname + file,
                    'utf8'
                );
            }
        });
        local.assetsDict['/'] =
            local.assetsDict['/assets.example.html'] =
            local.assetsDict['/assets.index.template.html']
            .replace((/\{\{env\.(\w+?)\}\}/g), function (match0, match1) {
                switch (match1) {
                case 'npm_package_description':
                    return 'the greatest app in the world!';
                case 'npm_package_name':
                    return 'swgg';
                case 'npm_package_nameLib':
                    return 'swgg';
                case 'npm_package_version':
                    return '0.0.1';
                default:
                    return match0;
                }
            });
        // init cli
        if (module !== require.main || local.global.utility2_rollup) {
            break;
        }
        local.assetsDict['/assets.example.js'] =
            local.assetsDict['/assets.example.js'] ||
            local.fs.readFileSync(__filename, 'utf8');
        // bug-workaround - long $npm_package_buildCustomOrg
        /* jslint-ignore-begin */
        local.assetsDict['/assets.swgg.js'] =
            local.assetsDict['/assets.swgg.js'] ||
            local.fs.readFileSync(
                local.__dirname + '/lib.swgg.js',
                'utf8'
            ).replace((/^#!/), '//');
        /* jslint-ignore-end */
        local.assetsDict['/favicon.ico'] = local.assetsDict['/favicon.ico'] || '';
        // if $npm_config_timeout_exit exists,
        // then exit this process after $npm_config_timeout_exit ms
        if (Number(process.env.npm_config_timeout_exit)) {
            setTimeout(process.exit, Number(process.env.npm_config_timeout_exit));
        }
        // start server
        if (local.global.utility2_serverHttp1) {
            break;
        }
        process.env.PORT = process.env.PORT || '8081';
        console.error('server starting on port ' + process.env.PORT);
        local.http.createServer(function (request, response) {
            request.urlParsed = local.url.parse(request.url);
            if (local.assetsDict[request.urlParsed.pathname] !== undefined) {
                response.end(local.assetsDict[request.urlParsed.pathname]);
                return;
            }
            response.statusCode = 404;
            response.end();
        }).listen(process.env.PORT);
        break;
    }
}());
```

#### output from browser
[![screenshot](https://kaizhu256.github.io/node-swgg/build/screenshot.testExampleJs.browser.%252F.png)](https://kaizhu256.github.io/node-swgg/build/app/assets.example.html)

#### output from shell
![screenshot](https://kaizhu256.github.io/node-swgg/build/screenshot.testExampleJs.svg)



# extra screenshots
1. [https://kaizhu256.github.io/node-swgg/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png](https://kaizhu256.github.io/node-swgg/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png)
[![screenshot](https://kaizhu256.github.io/node-swgg/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png)](https://kaizhu256.github.io/node-swgg/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png)

1. [https://kaizhu256.github.io/node-swgg/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fcoverage.lib.html.png](https://kaizhu256.github.io/node-swgg/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fcoverage.lib.html.png)
[![screenshot](https://kaizhu256.github.io/node-swgg/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fcoverage.lib.html.png)](https://kaizhu256.github.io/node-swgg/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fcoverage.lib.html.png)

1. [https://kaizhu256.github.io/node-swgg/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Ftest-report.html.png](https://kaizhu256.github.io/node-swgg/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Ftest-report.html.png)
[![screenshot](https://kaizhu256.github.io/node-swgg/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Ftest-report.html.png)](https://kaizhu256.github.io/node-swgg/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Ftest-report.html.png)

1. [https://kaizhu256.github.io/node-swgg/build/screenshot.deployGithub.browser.%252Fnode-swgg%252Fbuild%252Fapp%252Fassets.swgg.html.png](https://kaizhu256.github.io/node-swgg/build/screenshot.deployGithub.browser.%252Fnode-swgg%252Fbuild%252Fapp%252Fassets.swgg.html.png)
[![screenshot](https://kaizhu256.github.io/node-swgg/build/screenshot.deployGithub.browser.%252Fnode-swgg%252Fbuild%252Fapp%252Fassets.swgg.html.png)](https://kaizhu256.github.io/node-swgg/build/screenshot.deployGithub.browser.%252Fnode-swgg%252Fbuild%252Fapp%252Fassets.swgg.html.png)

1. [https://kaizhu256.github.io/node-swgg/build/screenshot.deployGithub.browser.%252Fnode-swgg%252Fbuild%252Fapp.png](https://kaizhu256.github.io/node-swgg/build/screenshot.deployGithub.browser.%252Fnode-swgg%252Fbuild%252Fapp.png)
[![screenshot](https://kaizhu256.github.io/node-swgg/build/screenshot.deployGithub.browser.%252Fnode-swgg%252Fbuild%252Fapp.png)](https://kaizhu256.github.io/node-swgg/build/screenshot.deployGithub.browser.%252Fnode-swgg%252Fbuild%252Fapp.png)

1. [https://kaizhu256.github.io/node-swgg/build/screenshot.deployGithubTest.browser.%252Fnode-swgg%252Fbuild%252Fapp.png](https://kaizhu256.github.io/node-swgg/build/screenshot.deployGithubTest.browser.%252Fnode-swgg%252Fbuild%252Fapp.png)
[![screenshot](https://kaizhu256.github.io/node-swgg/build/screenshot.deployGithubTest.browser.%252Fnode-swgg%252Fbuild%252Fapp.png)](https://kaizhu256.github.io/node-swgg/build/screenshot.deployGithubTest.browser.%252Fnode-swgg%252Fbuild%252Fapp.png)

1. [https://kaizhu256.github.io/node-swgg/build/screenshot.deployHeroku.browser.%252Fassets.swgg.html.png](https://kaizhu256.github.io/node-swgg/build/screenshot.deployHeroku.browser.%252Fassets.swgg.html.png)
[![screenshot](https://kaizhu256.github.io/node-swgg/build/screenshot.deployHeroku.browser.%252Fassets.swgg.html.png)](https://kaizhu256.github.io/node-swgg/build/screenshot.deployHeroku.browser.%252Fassets.swgg.html.png)

1. [https://kaizhu256.github.io/node-swgg/build/screenshot.deployHeroku.browser.%252F.png](https://kaizhu256.github.io/node-swgg/build/screenshot.deployHeroku.browser.%252F.png)
[![screenshot](https://kaizhu256.github.io/node-swgg/build/screenshot.deployHeroku.browser.%252F.png)](https://kaizhu256.github.io/node-swgg/build/screenshot.deployHeroku.browser.%252F.png)

1. [https://kaizhu256.github.io/node-swgg/build/screenshot.deployHerokuTest.browser.%252F.png](https://kaizhu256.github.io/node-swgg/build/screenshot.deployHerokuTest.browser.%252F.png)
[![screenshot](https://kaizhu256.github.io/node-swgg/build/screenshot.deployHerokuTest.browser.%252F.png)](https://kaizhu256.github.io/node-swgg/build/screenshot.deployHerokuTest.browser.%252F.png)

1. [https://kaizhu256.github.io/node-swgg/build/screenshot.npmTest.browser.%252F.png](https://kaizhu256.github.io/node-swgg/build/screenshot.npmTest.browser.%252F.png)
[![screenshot](https://kaizhu256.github.io/node-swgg/build/screenshot.npmTest.browser.%252F.png)](https://kaizhu256.github.io/node-swgg/build/screenshot.npmTest.browser.%252F.png)

1. [https://kaizhu256.github.io/node-swgg/build/screenshot.testExampleJs.browser.%252F.png](https://kaizhu256.github.io/node-swgg/build/screenshot.testExampleJs.browser.%252F.png)
[![screenshot](https://kaizhu256.github.io/node-swgg/build/screenshot.testExampleJs.browser.%252F.png)](https://kaizhu256.github.io/node-swgg/build/screenshot.testExampleJs.browser.%252F.png)

1. [https://kaizhu256.github.io/node-swgg/build/screenshot.testExampleSh.browser.%252F.png](https://kaizhu256.github.io/node-swgg/build/screenshot.testExampleSh.browser.%252F.png)
[![screenshot](https://kaizhu256.github.io/node-swgg/build/screenshot.testExampleSh.browser.%252F.png)](https://kaizhu256.github.io/node-swgg/build/screenshot.testExampleSh.browser.%252F.png)



# package.json
```json
{
    "author": "kai zhu <kaizhu256@gmail.com>",
    "description": "this zero-dependency package will run a virtual swagger-ui server with persistent-storage in the browser, that your webapp can use (in-place of a real backend), with a working web-demo",
    "devDependencies": {
        "electron-lite": "kaizhu256/node-electron-lite#alpha",
        "utility2": "kaizhu256/node-utility2#alpha"
    },
    "engines": {
        "node": ">=4.0"
    },
    "githubRepoAlias": "swgg-io/node-swgg",
    "homepage": "https://github.com/kaizhu256/node-swgg",
    "keywords": [
        "openapi",
        "swagger-client",
        "swagger-server"
    ],
    "license": "MIT",
    "main": "lib.swgg.js",
    "name": "swgg",
    "nameAliasPublish": "petstore swagger-lite swaggerdoc",
    "nameLib": "swgg",
    "nameOriginal": "swgg",
    "os": [
        "darwin",
        "linux"
    ],
    "repository": {
        "type": "git",
        "url": "https://github.com/kaizhu256/node-swgg.git"
    },
    "scripts": {
        "apidocRawCreate": "[ ! -f npm_scripts.sh ] || ./npm_scripts.sh shNpmScriptApidocRawCreate",
        "apidocRawFetch": "[ ! -f npm_scripts.sh ] || ./npm_scripts.sh shNpmScriptApidocRawFetch",
        "build-ci": "utility2 shReadmeTest build_ci.sh",
        "env": "env",
        "heroku-postbuild": "npm uninstall utility2 2>/dev/null; npm install kaizhu256/node-utility2#alpha && utility2 shDeployHeroku",
        "nameAliasPublish": "",
        "postinstall": "[ ! -f npm_scripts.sh ] || ./npm_scripts.sh shNpmScriptPostinstall",
        "start": "PORT=${PORT:-8080} utility2 start test.js",
        "test": "PORT=$(utility2 shServerPortRandom) utility2 test test.js"
    },
    "version": "2018.2.24"
}
```



# changelog of last 50 commits
[![screenshot](https://kaizhu256.github.io/node-swgg/build/screenshot.gitLog.svg)](https://github.com/kaizhu256/node-swgg/commits)



# internal build script
- build_ci.sh
```shell
# build_ci.sh

# this shell script will run the build for this package

shBuildCiAfter() {(set -e
    # shDeployCustom
    shDeployGithub
    shDeployHeroku
    shReadmeTest example.sh
)}

shBuildCiBefore() {(set -e
    shNpmTestPublished
    shReadmeTest example.js
)}

# run shBuildCi
eval $(utility2 source)
shBuildCi
```



# misc
- this package was created with [utility2](https://github.com/kaizhu256/node-utility2)
