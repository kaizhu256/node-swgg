swagger-lite
===============
lightweight standalone swagger-ui server backed by nedb

[![NPM](https://img.shields.io/npm/v/swagger-lite.svg?style=flat-square)](https://www.npmjs.com/package/swagger-lite) [![NPM](https://img.shields.io/npm/dm/swagger-lite.svg?style=flat-square)](https://www.npmjs.com/package/swagger-lite)



# build-status [![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-swagger-lite.svg)](https://travis-ci.org/kaizhu256/node-swagger-lite)
[![build commit status](https://kaizhu256.github.io/node-swagger-lite/build/build.badge.svg)](https://travis-ci.org/kaizhu256/node-swagger-lite)

| git-branch : | [master](https://github.com/kaizhu256/node-swagger-lite/tree/master) | [beta](https://github.com/kaizhu256/node-swagger-lite/tree/beta) | [alpha](https://github.com/kaizhu256/node-swagger-lite/tree/alpha)|
|--:|:--|:--|:--|
| test-report : | [![test-report](https://kaizhu256.github.io/node-swagger-lite/build..master..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-swagger-lite/build..master..travis-ci.org/test-report.html) | [![test-report](https://kaizhu256.github.io/node-swagger-lite/build..beta..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-swagger-lite/build..beta..travis-ci.org/test-report.html) | [![test-report](https://kaizhu256.github.io/node-swagger-lite/build..alpha..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-swagger-lite/build..alpha..travis-ci.org/test-report.html)|
| coverage : | [![istanbul-lite coverage](https://kaizhu256.github.io/node-swagger-lite/build..master..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-swagger-lite/build..master..travis-ci.org/coverage.html/index.html) | [![istanbul-lite coverage](https://kaizhu256.github.io/node-swagger-lite/build..beta..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-swagger-lite/build..beta..travis-ci.org/coverage.html/index.html) | [![istanbul-lite coverage](https://kaizhu256.github.io/node-swagger-lite/build..alpha..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-swagger-lite/build..alpha..travis-ci.org/coverage.html/index.html)|
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
#### this package is still work in progress
#### this package requires
- darwin or linux os

#### [api-doc](https://kaizhu256.github.io/node-swagger-lite/build/doc.api.html)
[![api-doc](https://kaizhu256.github.io/node-swagger-lite/build/screen-capture.docApiCreate.slimerjs._2Fhome_2Ftravis_2Fbuild_2Fkaizhu256_2Fnode-swagger-lite_2Ftmp_2Fbuild_2Fdoc.api.html.png)](https://kaizhu256.github.io/node-swagger-lite/build/doc.api.html)



# quickstart web example
#### to run this example, follow the instruction in the script below
- example.js

```javascript
/*
example.js

this node script will serve a lightweight standalone swagger-ui server backed by nedb

instruction
    1. save this script as example.js
    2. run the shell command:
          $ npm install swagger-lite && npm_config_server_port=1337 node example.js
    3. open a browser to http://localhost:1337
    4. interact with the swagger-ui crud-api
*/

/*jslint
    browser: true,
    maxerr: 8,
    maxlen: 196,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/

(function () {
    'use strict';
    var local;



    // run shared js-env code
    (function () {
        // init local
        local = {};
        // init js-env
        local.modeJs = (function () {
            try {
                return module.exports &&
                    typeof process.versions.node === 'string' &&
                    typeof require('http').createServer === 'function' &&
                    'node';
            } catch (errorCaughtNode) {
                return typeof navigator.userAgent === 'string' &&
                    typeof document.querySelector('body') === 'object' &&
                    'browser';
            }
        }());
        // init global
        local.global = local.modeJs === 'browser'
            ? window
            : global;
        // export local
        local.global.local = local;
        // init swagger-lite
        local.swlt = local.modeJs === 'browser'
            ? window.swlt
            : require('swagger-lite');
        // import swlt.local
        Object.keys(local.swlt.local).forEach(function (key) {
            local[key] = local[key] || local.swlt.local[key];
        });
        // init utility2
        local.utility2 = local.swlt.local.utility2;
        // init onReady
        local.utility2.onReadyInit();
    }());
    switch (local.modeJs) {



    // run node js-env code
    case 'node':
        // export local
        module.exports = local;
        local.path = require('path');
        // init assets
        local.utility2.cacheDict.assets['/'] = '<!DOCTYPE html>\n' +
/* jslint-ignore-begin */
'<html>\n' +
'<head>\n' +
'    <meta charset="UTF-8">\n' +
'    <title>\n' +
'    {{envDict.npm_package_name}} [{{envDict.npm_package_version}}]\n' +
'    </title>\n' +
'    <link rel="stylesheet" href="/assets/utility2.css">\n' +
'    <style>\n' +
'    * {\n' +
'        box-sizing: border-box;\n' +
'    }\n' +
'    body {\n' +
'        background-color: #fff;\n' +
'        font-family: Helvetical Neue, Helvetica, Arial, sans-serif;\n' +
'    }\n' +
'    body > div {\n' +
'        margin: 20px 0 20px 0;\n' +
'    }\n' +
'    .testReportDiv {\n' +
'        display: none;\n' +
'    }\n' +
'    </style>\n' +
'    {{envDict.npm_config_html_head_extra}}\n' +
'</head>\n' +
'<body>\n' +
'    <div class="ajaxProgressDiv" style="display: none;">\n' +
'    <div class="ajaxProgressBarDiv ajaxProgressBarDivLoading">loading</div>\n' +
'    </div>\n' +
'    <h1>{{envDict.npm_package_name}} [{{envDict.npm_package_version}}]</h1>\n' +
'    <h3>{{envDict.npm_package_description}}</h3>\n' +
'    <div class="testReportDiv"></div>\n' +
'    <div id="swagger-ui-container" style="display: none;"></div>\n' +
'    <iframe height="512" src="/assets/swagger-ui.html" width="100%"></iframe>\n' +
'    <script src="/assets/utility2.js"></script>\n' +
'    <script src="/assets/swagger-ui.rollup.js"></script>\n' +
'    <script src="/assets/swagger-lite.js"></script>\n' +
'    <script src="/assets/example.js"></script>\n' +
'    <script src="/test/test.js"></script>\n' +
'    <script>\n' +
'    window.utility2 = window.utility2 || {};\n' +
'    window.utility2.envDict = {\n' +
'        npm_package_description: "{{envDict.npm_package_description}}",\n' +
'        npm_package_name: "{{envDict.npm_package_name}}",\n' +
'        npm_package_version: "{{envDict.npm_package_version}}"\n' +
'    };\n' +
'    document.querySelector("iframe").onload = function () {\n' +
'        var self;\n' +
'        self = this;\n' +
'        self.height = innerHeight - self.offsetTop - 20;\n' +
'        self.contentWindow.location.hash = location.hash;\n' +
'        self.contentWindow.onclick = function () {\n' +
'            setTimeout(function () {\n' +
'                location.hash = self.contentWindow.location.hash;\n' +
'            });\n' +
'        };\n' +
'    };\n' +
'    </script>\n' +
'    {{envDict.npm_config_html_body_extra}}\n' +
'</body>\n' +
/* jslint-ignore-end */
            '</html>\n';
        local.utility2.cacheDict.assets['/'] = local.utility2.stringFormat(
            local.utility2.cacheDict.assets['/'],
            { envDict: local.utility2.envDict },
            ''
        );
        local.utility2.cacheDict.assets['/assets/example.js'] =
            local.utility2.istanbulInstrumentInPackage(
                local.fs.readFileSync(__dirname + '/example.js', 'utf8'),
                __dirname + '/example.js',
                'swagger-lite'
            );
        local.utility2.cacheDict.assets['/test/test.js'] =
            local.utility2.istanbulInstrumentInPackage(
                local.fs.readFileSync(local.swlt.__dirname + '/test.js', 'utf8'),
                local.swlt.__dirname + '/test.js',
                'swagger-lite'
            );
        // init middleware
        local.middleware = local.utility2.middlewareGroupCreate([
            // init pre-middleware
            local.utility2.middlewareInit,
            // init cached-assets middleware
            local.utility2.middlewareAssetsCached,
            // init http-body-get middleware
            local.utility2.middlewareBodyGet,
            // init http-body-parse middleware
            local.swlt.middlewareBodyParse,
            // init swagger pre-middleware
            function (request, response, nextMiddleware) {
                // jslint-hack
                local.utility2.nop(request);
                // enable cors
                // http://en.wikipedia.org/wiki/Cross-origin_resource_sharing
                response.setHeader(
                    'Access-Control-Allow-Methods',
                    'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT'
                );
                response.setHeader('Access-Control-Allow-Origin', '*');
                // init content-type
                response.setHeader('Content-Type', 'application/json; charset=UTF-8');
                nextMiddleware();
            },
            // init swagger middleware
            local.swlt.middlewareSwagger
        ]);
        // init error-middleware
        local.middlewareError = local.swlt.middlewareError;
        // init petstore-api
        (function () {
            var options;
            options = local.utility2.jsonCopy(require(local.swlt.local
                .swagger_ui.__dirname + '/swagger.json'));
            options = {
                definitions: options.definitions,
                paths: options.paths,
                securityDefinitions: options.securityDefinitions,
                tags: options.tags
            };
            local.swlt.apiUpdate(options);
        }());
        // run server-test
        local.utility2.testRunServer(local);
        break;
    }
}());
```

#### output from shell
[![screen-capture](https://kaizhu256.github.io/node-swagger-lite/build/screen-capture.testExampleJs.svg)](https://travis-ci.org/kaizhu256/node-swagger-lite)

#### output from electron-lite
[![screen-capture](https://kaizhu256.github.io/node-swagger-lite/build/screen-capture.testExampleJs.slimerjs..png)](https://hrku01-swagger-lite-beta.herokuapp.com)



# npm-dependencies
- [swagger-ui-lite](https://www.npmjs.com/package/swagger-ui-lite)
- [utility2](https://www.npmjs.com/package/utility2)



# package-listing
[![screen-capture](https://kaizhu256.github.io/node-swagger-lite/build/screen-capture.gitLsTree.svg)](https://github.com/kaizhu256/node-swagger-lite)



# package.json
```json
{
    "author": "kai zhu <kaizhu256@gmail.com>",
    "bin": { "swagger-lite": "index.js" },
    "dependencies": {
        "swagger-ui-lite": "2015.11.1",
        "utility2": "2015.11.7"
    },
    "description": "lightweight standalone swagger-ui server backed by nedb",
    "devDependencies": {
        "electron-lite": "2015.10.5"
    },
    "engines": { "node": ">=4.2" },
    "keywords": [
        "api",
        "browser",
        "cms", "crud",
        "mongo", "mongodb",
        "nedb",
        "swagger", "swagger-ui",
        "web"
    ],
    "license": "MIT",
    "name": "swagger-lite",
    "os": ["darwin", "linux"],
    "repository" : {
        "type" : "git",
        "url" : "https://github.com/kaizhu256/node-swagger-lite.git"
    },
    "scripts": {
        "build-ci": "node_modules/.bin/utility2 shRun shReadmeBuild",
        "build-doc": "node_modules/.bin/utility2 shRun shReadmeExportPackageJson && \
node_modules/.bin/utility2 shRun shDocApiCreate \"{ \
exampleFileList:['example.js','test.js','index.js'], \
moduleDict:{'swagger-lite':{aliasList:['swlt'],exports:require('./index.js')}} \
}\"",
        "start": "npm_config_mode_auto_restart=1 node_modules/.bin/utility2 shRun shIstanbulCover node test.js",
        "test": "node_modules/.bin/utility2 shRun shReadmeExportPackageJson && \
node_modules/.bin/utility2 test node test.js"
    },
    "version": "2015.11.2"
}
```



# todo
- add logging feature
- rename delete to remove for naming consistency
- migrate to travis-ci docker container build
- add cached param for crudGetByQueryMany
- add SwltUserLoginTokenCapped
- re-enable user login/logout
- test /user/login and /user/logout
- add max / min validation
- none



# change since bae6e032
- npm publish 2015.11.2
- working swagger validation tests
- remove mongodb dependency
- none



# changelog of last 50 commits
[![screen-capture](https://kaizhu256.github.io/node-swagger-lite/build/screen-capture.gitLog.svg)](https://github.com/kaizhu256/node-swagger-lite/commits)



# internal build-script
- build.sh

```shell
# build.sh

# this shell script will run the build for this package

shBuild() {
    # this function will run the main build
    local TEST_URL || return $?

    # init env
    . node_modules/.bin/utility2 && shInit || return $?

    # run npm-test on published package
    shRun shNpmTestPublished || return $?

    # test example js script
    export npm_config_timeout_exit=10000 || return $?
    MODE_BUILD=testExampleJs shRunScreenCapture shReadmeTestJs example.js || return $?
    unset npm_config_timeout_exit || return $?

    # run npm-test
    MODE_BUILD=npmTest shRunScreenCapture npm test --mode-coverage || return $?

    # create api-doc
    npm run-script build-doc || return $?

    # if running legacy-node, then do not continue
    [ "$(node --version)" \< "v5.0" ] && exit

    true
}
shBuild

# save exit-code
EXIT_CODE=$?
# create package-listing
MODE_BUILD=gitLsTree shRunScreenCapture shGitLsTree || exit $?
# create recent changelog of last 50 commits
MODE_BUILD=gitLog shRunScreenCapture git log -50 --pretty="%ai\u000a%B" || exit $?
# upload build-artifacts to github, and if number of commits > 16, then squash older commits
COMMIT_LIMIT=16 shBuildGithubUpload || exit $?
exit $EXIT_CODE
```
