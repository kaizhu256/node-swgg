# swgg
this zero-dependency package will run a virtual swagger-ui server with persistent-storage in the browser, that your webapp can use (in-place of a real backend)

[![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-swgg.svg)](https://travis-ci.org/kaizhu256/node-swgg) [![coverage](https://kaizhu256.github.io/node-swgg/build/coverage.badge.svg)](https://kaizhu256.github.io/node-swgg/build/coverage.html/index.html)

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
1. [live demo](#live-demo)
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



# live demo
- [https://kaizhu256.github.io/node-swgg/build..beta..travis-ci.org/app](https://kaizhu256.github.io/node-swgg/build..beta..travis-ci.org/app)

[![github.com test-server](https://kaizhu256.github.io/node-swgg/build/screenshot.deployGithub.browser.%252Fnode-swgg%252Fbuild%252Fapp.png)](https://kaizhu256.github.io/node-swgg/build..beta..travis-ci.org/app)



# documentation
#### apidoc
- [https://kaizhu256.github.io/node-swgg/build..beta..travis-ci.org/apidoc.html](https://kaizhu256.github.io/node-swgg/build..beta..travis-ci.org/apidoc.html)

[![apidoc](https://kaizhu256.github.io/node-swgg/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png)](https://kaizhu256.github.io/node-swgg/build..beta..travis-ci.org/apidoc.html)

#### swaggerdoc
- [https://kaizhu256.github.io/node-swgg/build..beta..travis-ci.org/app/assets.swgg.html](https://kaizhu256.github.io/node-swgg/build..beta..travis-ci.org/app/assets.swgg.html)

[![swaggerdoc](https://kaizhu256.github.io/node-swgg/build/screenshot.deployGithub.browser.%252Fnode-swgg%252Fbuild%252Fapp%252Fassets.swgg.html.png)](https://kaizhu256.github.io/node-swgg/build..beta..travis-ci.org/app/assets.swgg.html)

#### todo
- revamp datatable with card-expansion ui
- add forward-proxy ui-checkbox
- allow optional sub-level input for swagger-models
- add authorization-header hook
- allow secure remote db export / import / reset to backend
- add middlewareAcl
- datatable - add sort-by-field
- add notification system
- add api userPasswordChange
- add logging feature
- add cached version crudGetManyByQueryCached
- none

#### changelog for v2017.7.1
- npm publish 2017.7.1
- auto-build README section 'table of contents'
- enhance github-cors with function githubCorsUrlOverride
- move functions uiAnimateSlideXxx from file lib.swgg.js to file assets.utility2.rollup.js
- none

#### this package requires
- darwin or linux os



# quickstart standalone app
#### to run this example, follow the instruction in the script below
- [assets.app.js](https://kaizhu256.github.io/node-swgg/build..beta..travis-ci.org/app/assets.app.js)
```shell
# example.sh

# this shell script will download and run a web demo of swgg as a standalone app

# 1. download standalone app
curl -O https://kaizhu256.github.io/node-swgg/build..beta..travis-ci.org/app/assets.app.js
# 2. run standalone app
node ./assets.app.js
# 3. open a browser to http://127.0.0.1:8081 and play with the web demo
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

this script will run a web demo of swgg

instruction
    1. save this script as example.js
    2. run the shell command:
        $ npm install swgg && PORT=8081 node example.js
    3. open a browser to http://127.0.0.1:8081 and play with the web demo
    4. edit this script to suit your needs
*/



/* istanbul instrument in package swgg */
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
                    switch (crud.operationId.split('.')[0]) {
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
                    crudSetOneById: 'file crudSetOneById.id.id',
                    crudRemoveOneById: 'file crudRemoveOneById.id.id',
                    crudGetManyByQuery: 'file crudGetManyByQuery',
                    schema: { $ref: '#/definitions/File' }
                },
                pet: {
                    crudSetOneById: 'pet addPet',
                    crudRemoveOneById: 'pet deletePet',
                    crudGetManyByQuery: 'pet crudGetManyByQuery',
                    schema: { $ref: '#/definitions/Pet' }
                },
                store: {
                    crudSetOneById: 'store placeOrder',
                    crudRemoveOneById: 'store deleteOrder',
                    crudGetManyByQuery: 'store crudGetManyByQuery',
                    schema: { $ref: '#/definitions/Order' }
                },
                user: {
                    crudSetOneById: 'user createUser',
                    crudRemoveOneById: 'user deleteUser',
                    crudGetManyByQuery: 'user crudGetManyByQuery',
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
                        name: local.listGetElementRandom(
                            ['birdie', 'doggie', 'fishie']
                        ) + '-' + (options.ii + 100),
                        tags: [
                            { name: local.listGetElementRandom(['female', 'male']) }
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
    }());
    switch (local.modeJs) {



    // init-after
    // run browser js-env code - init-after
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
                    document.querySelector('#testRunButton1').textContent =
                        'hide internal test';
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
                local.swgg.uiEventListenerDict['.onEventUiReload']();
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



    // run node js-env code - init-after
    /* istanbul ignore next */
    case 'node':
        // init exports
        module.exports = local;
        // require modules
        local.fs = require('fs');
        local.http = require('http');
        local.url = require('url');
        // init assets
        local.assetsDict = local.assetsDict || {};
        /* jslint-ignore-begin */
        local.assetsDict['/assets.index.template.html'] = '\
<!doctype html>\n\
<html lang="en">\n\
<head>\n\
<meta charset="UTF-8">\n\
<meta name="viewport" content="width=device-width, initial-scale=1">\n\
<title>{{env.npm_package_name}} (v{{env.npm_package_version}})</title>\n\
<style>\n\
/*csslint\n\
    box-sizing: false,\n\
    universal-selector: false\n\
*/\n\
* {\n\
    box-sizing: border-box;\n\
}\n\
body {\n\
    background: #dde;\n\
    font-family: Arial, Helvetica, sans-serif;\n\
    margin: 2rem;\n\
}\n\
body > * {\n\
    margin-bottom: 1rem;\n\
}\n\
body > button {\n\
    width: 20rem;\n\
}\n\
button {\n\
    cursor: pointer;\n\
}\n\
.uiAnimateSlide {\n\
    overflow-y: hidden;\n\
    transition: border-bottom 250ms, border-top 250ms, margin-bottom 250ms, margin-top 250ms, max-height 250ms, min-height 250ms, padding-bottom 250ms, padding-top 250ms;\n\
}\n\
.utility2FooterDiv {\n\
    margin-top: 20px;\n\
    text-align: center;\n\
}\n\
.zeroPixel {\n\
    border: 0;\n\
    height: 0;\n\
    margin: 0;\n\
    padding: 0;\n\
    width: 0;\n\
}\n\
</style>\n\
<style>\n\
/*csslint\n\
    adjoining-classes: false,\n\
    box-model: false,\n\
    box-sizing: false,\n\
    outline-none: false,\n\
    universal-selector: false\n\
*/\n\
/* animate */\n\
.uiAnimateFade {\n\
    transition: opacity 250ms;\n\
}\n\
@keyframes uiAnimateShake {\n\
    100% {\n\
        transform: translateX(0);\n\
    }\n\
    0%, 20%, 60% {\n\
        transform: translateX(1rem);\n\
    }\n\
    40%, 80% {\n\
        transform: translateX(-1rem);\n\
    }\n\
}\n\
.uiAnimateShake {\n\
    animation-duration: 500ms;\n\
    animation-name: uiAnimateShake;\n\
}\n\
\n\
\n\
\n\
/* general */\n\
.swggUiContainer,\n\
.swggUiContainer * {\n\
    box-sizing: border-box;\n\
    margin: 0;\n\
    padding: 0;\n\
}\n\
.swggUiContainer {\n\
    font-family: Arial, Helvetica, sans-serif;\n\
    margin-left: auto;\n\
    margin-right: auto;\n\
    max-width: 1024px;\n\
}\n\
.swggUiContainer > * {\n\
    margin-top: 1rem;\n\
}\n\
.swggUiContainer a {\n\
    text-decoration: none;\n\
}\n\
.swggUiContainer a:hover {\n\
    color: black;\n\
}\n\
.swggUiContainer a,\n\
.swggUiContainer input,\n\
.swggUiContainer span {\n\
    min-height: 1.5rem;\n\
}\n\
.swggUiContainer button {\n\
    padding: 0.5rem;\n\
}\n\
.swggUiContainer .color777 {\n\
    color: #777;\n\
}\n\
.swggUiContainer button,\n\
.swggUiContainer .cursorPointer,\n\
.swggUiContainer .cursorPointer input {\n\
    cursor: pointer;\n\
}\n\
.swggUiContainer .flex1 {\n\
    flex: 1;\n\
}\n\
.swggUiContainer .fontLineThrough {\n\
    text-decoration: line-through;\n\
}\n\
.swggUiContainer .fontWeightBold {\n\
    font-weight: bold;\n\
}\n\
.swggUiContainer input {\n\
    height: 1.5rem;\n\
    padding-left: 0.25rem;\n\
    padding-right: 0.25rem;\n\
}\n\
.swggUiContainer .marginTop05 {\n\
    margin-top: 0.5rem;\n\
}\n\
.swggUiContainer .marginTop10 {\n\
    margin-top: 1rem;\n\
}\n\
.swggUiContainer pre,\n\
.swggUiContainer textarea {\n\
    font-family: Menlo, Monaco, Consolas, Courier New, monospace;\n\
    font-size: small;\n\
    line-height: 1.25rem;\n\
    max-height: 20rem;\n\
    overflow: auto;\n\
    padding: 0.25rem;\n\
    white-space: pre;\n\
}\n\
.swggUiContainer .tr {\n\
    display: flex;\n\
}\n\
.swggUiContainer .tr > * {\n\
    margin-left: 1rem;\n\
    overflow: auto;\n\
    padding-top: 0.1rem;\n\
    word-wrap: break-word;\n\
}\n\
.swggUiContainer .tr > *:first-child {\n\
    margin-left: 0;\n\
}\n\
.swggUiContainer .tr > * > * {\n\
    width: 100%;\n\
}\n\
\n\
\n\
\n\
/* border */\n\
/* border-bottom-bold */\n\
.swggUiContainer .borderBottom {\n\
    border-bottom: 1px solid #bbb;\n\
    margin-bottom: 0.5rem;\n\
    padding-bottom: 0.5rem;\n\
}\n\
.swggUiContainer .borderBottomBold {\n\
    border-bottom: 1px solid #777;\n\
    margin-bottom: 0.5rem;\n\
    padding-bottom: 0.5rem;\n\
}\n\
/* border-top */\n\
.swggUiContainer .borderTop {\n\
    border-top: 1px solid #bbb;\n\
    margin-top: 0.5rem;\n\
    padding-top: 0.5rem;\n\
}\n\
/* border-top-bold */\n\
.swggUiContainer .borderTopBold,\n\
.swggUiContainer .resource:first-child {\n\
    border-top: 1px solid #777;\n\
    margin-top: 0.5rem;\n\
    padding-top: 0.5rem;\n\
}\n\
/* border-error*/\n\
.swggUiContainer .error {\n\
    border: 5px solid #b00;\n\
}\n\
\n\
\n\
\n\
/* datatable color */\n\
.swggUiContainer .datatable tbody > tr > td {\n\
    background: #efe;\n\
}\n\
.swggUiContainer .datatable tbody > tr > td:nth-child(odd) {\n\
    background: #dfd;\n\
}\n\
.swggUiContainer .datatable tbody > tr:nth-child(odd) > td {\n\
    background: #cfc;\n\
}\n\
.swggUiContainer .datatable tbody > tr:nth-child(odd) > td:nth-child(odd) {\n\
    background: #beb;\n\
}\n\
.swggUiContainer .datatable tbody > tr:hover > td {\n\
    background: #aea;\n\
}\n\
.swggUiContainer .datatable tbody > tr:hover > td:nth-child(odd) {\n\
    background: #9e9;\n\
}\n\
.swggUiContainer .datatable tbody > tr > td:hover,\n\
.swggUiContainer .datatable tbody > tr > td:hover:nth-child(odd),\n\
.swggUiContainer .datatable tbody > tr:nth-child(odd) > td:hover,\n\
.swggUiContainer .datatable tbody > tr:nth-child(odd) > td:hover:nth-child(odd),\n\
.swggUiContainer .datatable th:hover {\n\
    background: #7d7;\n\
}\n\
.swggUiContainer .datatable tbody > tr.selected > td {\n\
    background: #fee;\n\
}\n\
.swggUiContainer .datatable tbody > tr.selected > td:nth-child(odd) {\n\
    background: #fdd;\n\
}\n\
.swggUiContainer .datatable tbody > tr.selected:nth-child(odd) > td {\n\
    background: #ecc;\n\
}\n\
.swggUiContainer .datatable tbody > tr.selected:nth-child(odd) > td:nth-child(odd) {\n\
    background: #ebb;\n\
}\n\
.swggUiContainer .datatable th {\n\
    background: #9e9;\n\
}\n\
\n\
\n\
\n\
/* section */\n\
.swggUiContainer .datatable {\n\
    background: #fff;\n\
    background: rgba(255,255,255,0.875);\n\
    margin: 2rem;\n\
    overflow: auto;\n\
    padding: 1rem;\n\
}\n\
.swggUiContainer .datatable input[type=checkbox] {\n\
    width: 1.5rem;\n\
}\n\
.swggUiContainer .datatable .sortAsc,\n\
.swggUiContainer .datatable .sortDsc {\n\
    display: none;\n\
}\n\
.swggUiContainer .datatable td,\n\
.swggUiContainer .datatable th {\n\
    max-width: 10rem;\n\
    overflow: auto;\n\
    padding: 0.5rem;\n\
}\n\
.swggUiContainer .datatable th:first-child {\n\
    padding-right: 2rem;\n\
}\n\
.swggUiContainer > .header {\n\
    background: #8c0;\n\
    padding: 0.5rem;\n\
}\n\
.swggUiContainer > .header > .td1 {\n\
    font-size: x-large;\n\
    background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAqRJREFUeNrEVz1s00AUfnGXii5maMXoEUEHVwIpEkPNgkBdMnQoU5ytiKHJwpp2Q2JIO8DCUDOxIJFIVOoWZyJSh3pp1Q2PVVlcCVBH3ufeVZZ9Zye1Ay86nXV+ue/9fO/lheg/Se02X1rvksmbnTiKvuxQMBNgBnN4a/LCbmnUAP6JV58NCUsBC8CuAJxGPF47OgNqBaA93tolUhnx6jC4NxGwyOEwlccyAs+3kwdzKq0HDn2vEBTi8J2XpyMaywNDE157BhXUE3zJhlq8GKq+Zd2zaWHepPA8oN9XkfLmRdOiJV4XUUg/IyWncLjCYY/SHndV2u7zHr3bPKZtdxgboJOnthvrfGj/oMf3G0r7JVmNlLfKklmrt2MvvcNO7LFOhoFHfuAJI5o6ta10jpt5CQLgwXhXG2YIwvu+34qf78ybOjWTnWwkgR36d7JqJOrW0hHmNrKg9xhiS4+1jFmrxymh03B0w+6kURIAu3yHtOD5oaUNojMnGgbcctNvwdAnyxvxRR+/vaJnjzbpzcZX+nN1SdGv85i9eH8w3qPO+mdm/y4dnQ1iI8Fq6Nf4cxL6GWSjiFDSs0VRnxC5g0xSB2cgHpaseTxfqOv5uoHkNQ6Ha/N1Yz9mNMppEkEkYKj79q6uCq4bCHcSX3fJ0Vk/k9siASjCm1N6gZH6Ec9IXt2WkFES2K/ixoIyktJPAu/ptOA1SgO5zqtr6KASJPF0nMV8dgMsRhRPOcMwqQAOoi0VAIMLAEWJ6YYC1c8ibj1GP51RqwzYwZVMHQuvOzMCBUtb2tGHx5NAdLKqp5AX7Ng4d+Zi8AGDI9z1ijx9yaCH04y3GCP2S+QcvaGl+pcxyUBvinFlawoDQjHSelX8hQEoIrAq8p/mgC88HOS1YCl/BRgAmiD/1gn6Nu8AAAAASUVORK5CYII=) no-repeat left center;\n\
    padding-left: 2.5rem;\n\
    color: white;\n\
}\n\
.swggUiContainer > .header > .td2 {\n\
    font-size: medium;\n\
    height: 2rem;\n\
}\n\
.swggUiContainer > .header > .td3 {\n\
border: 0;\n\
    color: #fff;\n\
    padding: 6px 8px;\n\
    background: #580;\n\
}\n\
.swggUiContainer > .info > * {\n\
    margin-top: 1rem;\n\
}\n\
.swggUiContainer > .info a {\n\
    color: #370;\n\
    text-decoration: underline;\n\
}\n\
.swggUiContainer > .info > .fontWeightBold {\n\
    font-size: x-large;\n\
}\n\
.swggUiContainer > .info > ul {\n\
    margin-left: 2rem;\n\
}\n\
.swggUiContainer > .modal {\n\
    background: black;\n\
    background: rgba(0,0,0,0.5);\n\
    display: flex;\n\
    height: 100%;\n\
    left: 0;\n\
    margin: 0;\n\
    margin-top: 4px;\n\
    padding: 0;\n\
    position: fixed;\n\
    top: 0;\n\
    width: 100%;\n\
    z-index: 1;\n\
}\n\
.swggUiContainer .modal button {\n\
    padding: 0.5rem;\n\
}\n\
.swggUiContainer .operation {\n\
    background: #dfd;\n\
    font-size: smaller;\n\
    outline: none;\n\
}\n\
.swggUiContainer .operation > .content {\n\
    padding: 1rem;\n\
}\n\
.swggUiContainer .operation > .content .label {\n\
    color: #0b0;\n\
}\n\
.swggUiContainer .operation > .content pre {\n\
    border: 1px solid #bbb;\n\
    background: #ffd;\n\
}\n\
.swggUiContainer .operation > .content .tr {\n\
    margin-left: 0.5rem;\n\
}\n\
.swggUiContainer .operation > .header:hover {\n\
    background: #bfb;\n\
}\n\
.swggUiContainer .operation > .header > span {\n\
    padding: 2px 0 2px 0;\n\
}\n\
.swggUiContainer .operation > .header > span:first-child {\n\
    margin-left: 0;\n\
}\n\
.swggUiContainer .operation > .header > .td1 {\n\
    background: #777;\n\
    color: white;\n\
    padding-top: 5px;\n\
    height: 1.5rem;\n\
    text-align: center;\n\
    width: 5rem;\n\
}\n\
.swggUiContainer .operation > .header > .td2 {\n\
    flex: 3;\n\
}\n\
.swggUiContainer .operation > .header > .td3 {\n\
    color: #777;\n\
    flex: 2;\n\
    text-decoration: none;\n\
}\n\
.swggUiContainer .operation > .header > .td4 {\n\
    flex: 2;\n\
    padding-right: 1rem;\n\
}\n\
.swggUiContainer .operation .paramDef pre,\n\
.swggUiContainer .operation .paramDef textarea {\n\
    height: 10rem;\n\
}\n\
.swggUiContainer .operation .paramDef > .td1 {\n\
    flex: 2;\n\
}\n\
.swggUiContainer .operation .paramDef > .td2 {\n\
    flex: 1;\n\
}\n\
.swggUiContainer .operation .paramDef > .td3 {\n\
    flex: 4;\n\
}\n\
.swggUiContainer .operation .paramDef > .td4 {\n\
    flex: 3;\n\
}\n\
.swggUiContainer .operation .responseList > .td1 {\n\
    flex: 1;\n\
}\n\
.swggUiContainer .operation .responseList > .td2 {\n\
    flex: 4;\n\
}\n\
.swggUiContainer .resource {\n\
    outline: none;\n\
}\n\
.swggUiContainer .resource > .header > .td1 {\n\
    font-size: large;\n\
}\n\
.swggUiContainer .resource > .header > .td2,\n\
.swggUiContainer .resource > .header > .td3 {\n\
    border-right: 1px solid #777;\n\
    padding-right: 1rem;\n\
}\n\
\n\
\n\
\n\
/* method */\n\
.swggUiContainer .operation.DELETE > .header > .td1 {\n\
    background: #b00;\n\
}\n\
.swggUiContainer .operation.GET > .header > .td1 {\n\
    background: #093;\n\
}\n\
.swggUiContainer .operation.HEAD > .header > .td1 {\n\
    background: #f30;\n\
}\n\
.swggUiContainer .operation.PATCH > .header > .td1 {\n\
    background: #b0b;\n\
}\n\
.swggUiContainer .operation.POST > .header > .td1 {\n\
    background: #07b;\n\
}\n\
.swggUiContainer .operation.PUT > .header > .td1 {\n\
    background: #70b;\n\
}\n\
</style>\n\
</head>\n\
<body>\n\
<!-- utility2-comment\n\
<div id="ajaxProgressDiv1" style="background: #d00; height: 2px; left: 0; margin: 0; padding: 0; position: fixed; top: 0; transition: background 500ms, width 1500ms; width: 25%;"></div>\n\
utility2-comment -->\n\
<h1>\n\
<!-- utility2-comment\n\
    <a\n\
        {{#if env.npm_package_homepage}}\n\
        href="{{env.npm_package_homepage}}"\n\
        {{/if env.npm_package_homepage}}\n\
        target="_blank"\n\
    >\n\
utility2-comment -->\n\
        {{env.npm_package_name}} (v{{env.npm_package_version}})\n\
<!-- utility2-comment\n\
    </a>\n\
utility2-comment -->\n\
</h1>\n\
<h3>{{env.npm_package_description}}</h3>\n\
<!-- utility2-comment\n\
<h4><a download href="assets.app.js">download standalone app</a></h4>\n\
<button class="onclick onreset" id="testRunButton1">run internal test</button><br>\n\
<div class="uiAnimateSlide" id="testReportDiv1" style="border-bottom: 0; border-top: 0; margin-bottom: 0; margin-top: 0; max-height: 0; padding-bottom: 0; padding-top: 0;"></div>\n\
utility2-comment -->\n\
\n\
\n\
\n\
<button class="onclick" id="dbResetButton1">reset database</button><br>\n\
<button class="onclick" id="dbExportButton1">export database -&gt; file</button><br>\n\
<a download="db.persistence.json" href="" id="dbExportA1"></a>\n\
<button class="onclick" id="dbImportButton1">import database &lt;- file</button><br>\n\
<input class="onchange zeroPixel" type="file" id="dbImportInput1">\n\
<div class="swggUiContainer">\n\
<form2 class="header tr">\n\
    <a class="td1" href="https://github.com/kaizhu256/node-swgg" target="_blank">swgg</a>\n\
    <input class="flex1 td2" type="text">\n\
    <button class="td3">Explore</button>\n\
</form2>\n\
</div>\n\
<div class="swggAjaxProgressDiv" style="margin-top: 1rem; text-align: center;">fetching resource list; Please wait.</div>\n\
<script>\n\
/*jslint\n\
    bitwise: true,\n\
    browser: true,\n\
    maxerr: 8,\n\
    maxlen: 96,\n\
    node: true,\n\
    nomen: true,\n\
    regexp: true,\n\
    stupid: true\n\
*/\n\
"use strict";\n\
document.querySelector(".swggUiContainer > .header > .td2").value =\n\
    ((/\\bmodeSwaggerJsonUrl=([^&]+)/g).exec(location.search) &&\n\
        (/\\bmodeSwaggerJsonUrl=([^&]+)/g).exec(location.search)[1]) ||\n\
        "assets.swgg.swagger.server.json";\n\
</script>\n\
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
<div class="utility2FooterDiv">\n\
    [ this app was created with\n\
    <a href="https://github.com/kaizhu256/node-utility2" target="_blank">utility2</a>\n\
    ]\n\
</div>\n\
</body>\n\
</html>\n\
';
        /* jslint-ignore-end */
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
                // jslint-hack
                String(match0);
                switch (match1) {
                case 'npm_package_description':
                    return 'the greatest app in the world!';
                case 'npm_package_name':
                    return 'swgg';
                case 'npm_package_nameAlias':
                    return 'swgg';
                case 'npm_package_version':
                    return '0.0.1';
                default:
                    return match0;
                }
            });
        // run the cli
        if (local.global.utility2_rollup || module !== require.main) {
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
                local.swgg.__dirname + '/lib.swgg.js',
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

1. [https://kaizhu256.github.io/node-swgg/build/screenshot.npmTestPublished.browser.%252F.png](https://kaizhu256.github.io/node-swgg/build/screenshot.npmTestPublished.browser.%252F.png)
[![screenshot](https://kaizhu256.github.io/node-swgg/build/screenshot.npmTestPublished.browser.%252F.png)](https://kaizhu256.github.io/node-swgg/build/screenshot.npmTestPublished.browser.%252F.png)

1. [https://kaizhu256.github.io/node-swgg/build/screenshot.testExampleJs.browser.%252F.png](https://kaizhu256.github.io/node-swgg/build/screenshot.testExampleJs.browser.%252F.png)
[![screenshot](https://kaizhu256.github.io/node-swgg/build/screenshot.testExampleJs.browser.%252F.png)](https://kaizhu256.github.io/node-swgg/build/screenshot.testExampleJs.browser.%252F.png)

1. [https://kaizhu256.github.io/node-swgg/build/screenshot.testExampleSh.browser.%252F.png](https://kaizhu256.github.io/node-swgg/build/screenshot.testExampleSh.browser.%252F.png)
[![screenshot](https://kaizhu256.github.io/node-swgg/build/screenshot.testExampleSh.browser.%252F.png)](https://kaizhu256.github.io/node-swgg/build/screenshot.testExampleSh.browser.%252F.png)



# package.json
```json
{
    "author": "kai zhu <kaizhu256@gmail.com>",
    "description": "this zero-dependency package will run a virtual swagger-ui server with persistent-storage in the browser, that your webapp can use (in-place of a real backend)",
    "devDependencies": {
        "electron-lite": "kaizhu256/node-electron-lite#alpha",
        "utility2": "kaizhu256/node-utility2#alpha"
    },
    "engines": {
        "node": ">=4.0"
    },
    "homepage": "https://github.com/kaizhu256/node-swgg",
    "keywords": [
        "api",
        "oai",
        "open-api",
        "openapi",
        "swagger",
        "swagger-ui",
        "swgg"
    ],
    "license": "MIT",
    "main": "lib.swgg.js",
    "name": "swgg",
    "nameAlias": "swgg",
    "nameAliasPublish": "swagger-lite",
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
        "build-ci": "utility2 shReadmeTest build_ci.sh",
        "env": "env",
        "heroku-postbuild": "(set -e; npm install \"kaizhu256/node-utility2#alpha\"; utility2 shDeployHeroku)",
        "postinstall": "if [ -f npm_scripts.sh ]; then ./npm_scripts.sh postinstall; fi",
        "start": "(set -e; export PORT=${PORT:-8080}; utility2 start test.js)",
        "test": "(set -e; export PORT=$(utility2 shServerPortRandom); utility2 test test.js)"
    },
    "version": "2017.7.1"
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
