swagger-lite
============
lightweight standalone swagger-ui server backed by nedb

[![NPM](https://img.shields.io/npm/v/swagger-lite.svg?style=flat-square)](https://www.npmjs.com/package/swagger-lite) [![NPM](https://img.shields.io/npm/dm/swagger-lite.svg?style=flat-square)](https://www.npmjs.com/package/swagger-lite)



# live test-server
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



# documentation
#### this package is still work in progress
#### this package requires
- darwin or linux os

#### [api-doc](https://kaizhu256.github.io/node-swagger-lite/build/doc.api.html)
[![api-doc](https://kaizhu256.github.io/node-swagger-lite/build/screen-capture.docApiCreate.browser._2Fhome_2Ftravis_2Fbuild_2Fkaizhu256_2Fnode-swagger-lite_2Ftmp_2Fbuild_2Fdoc.api.html.png)](https://kaizhu256.github.io/node-swagger-lite/build/doc.api.html)



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
        $ npm install swagger-lite && PORT=1337 node example.js
    3. open a browser to http://localhost:1337
    4. interact with the swagger-ui crud-api
*/

/*jslint
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



    // run shared js-env code
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
            // init pre-middleware
            local.utility2.middlewareInit,
            // init cached-assets middleware
            local.utility2.middlewareAssetsCached,
            // init http-body-get middleware
            local.utility2.middlewareBodyRead,
            // init http-body-parse middleware
            local.swgg.middlewareBodyParse,
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
            // init swagger-validation middleware
            local.swgg.middlewareValidate
        ]);
        // init error-middleware
        local.middlewareError = local.swgg.middlewareError;
        // run server-test
        local.utility2.testRunServer(local);
    }());
    switch (local.modeJs) {



    // run node js-env code
    case 'node':
        // export local
        module.exports = local;
        local.path = require('path');
        // init assets
        // https://github.com/swagger-api/swagger-ui/blob/v2.1.2/dist/index.html
        /* jslint-ignore-begin */
        local.utility2.cacheDict.assets['/'] = '<!DOCTYPE html>\n\
<html>\n\
<head>\n\
    <meta charset="UTF-8">\n\
    <title>\n\
    {{envDict.npm_package_name}} [{{envDict.npm_package_version}}]\n\
    </title>\n\
    <link href="assets/utility2.css" rel="stylesheet">\n\
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
    <link href="assets/swagger-ui.favicon-32x32.png" rel="icon" sizes="32x32" type="image/png">\n\
    <link href="assets/swagger-ui.favicon-16x16.png" rel="icon" sizes="16x16" type="image/png">\n\
    <link href="assets/swagger-ui.rollup.css" media="screen" rel="stylesheet" type="text/css">\n\
</head>\n\
<body>\n\
    <div class="ajaxProgressDiv" style="display: block;">\n\
    <div class="ajaxProgressBarDiv ajaxProgressBarDivLoading">loading</div>\n\
    </div>\n\
    <h1>{{envDict.npm_package_name}} [{{envDict.npm_package_version}}]</h1>\n\
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
        <div class="input"><a id="explore" href="#" data-sw-translate>Explore</a></div>\n\
        </form>\n\
        </div>\n\
    </div>\n\
    <div id="message-bar" class="swagger-ui-wrap" data-sw-translate>&nbsp;</div>\n\
    <div id="swagger-ui-container" class="swagger-ui-wrap"></div>\n\
    </div>\n\
    <script src="assets/nedb.min.js"></script>\n\
    <script src="assets/swagger-tools-standalone-min.js"></script>\n\
    <script src="assets/utility2.js"></script>\n\
    <script src="assets/swagger-ui.rollup.js"></script>\n\
    <script src="assets/swagger-lite.js"></script>\n\
    <script src="assets/example.js"></script>\n\
    <script src="assets/test.js"></script>\n\
    <script>$(function () {\n\
    window.utility2.envDict = {\n\
        npm_package_description: "{{envDict.npm_package_description}}",\n\
        npm_package_name: "{{envDict.npm_package_name}}",\n\
        npm_package_version: "{{envDict.npm_package_version}}"\n\
    };\n\
    var url = window.location.search.match(/url=([^&]+)/);\n\
    if (url && url.length > 1) {\n\
        url = decodeURIComponent(url[1]);\n\
    } else {\n\
        url = location.pathname.replace((/\\/[^\/]*?$/), "") + "/api/v0/swagger.json";\n\
    }\n\
    // Pre load translate...\n\
    if(window.SwaggerTranslator) {\n\
        window.SwaggerTranslator.translate();\n\
    }\n\
    local.utility2.onReady.counter += 1;\n\
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
            if(window.SwaggerTranslator) {\n\
                window.SwaggerTranslator.translate();\n\
            }\n\
            addApiKeyAuthorization();\n\
            local.utility2.onReady();\n\
        },\n\
        onFailure: function(data) {\n\
            log("Unable to Load SwaggerUI");\n\
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
            log("added key " + key);\n\
        }\n\
    }\n\
    $("#input_apiKey").change(addApiKeyAuthorization);\n\
    window.swaggerUi.load();\n\
    local.swgg.api = window.swaggerUi.api;\n\
    });</script>\n\
</body>\n\
</html>';
        /* jslint-ignore-end */
        local.utility2.cacheDict.assets['/'] = local.utility2.stringFormat(
            local.utility2.cacheDict.assets['/'],
            { envDict: local.utility2.envDict },
            ''
        );
        local.utility2.cacheDict.assets['/assets/example.js'] =
            local.fs.readFileSync(__dirname + '/example.js', 'utf8');
        // init petstore-api
        (function () {
            var options;
            options = local.utility2.jsonCopy(require(local.swgg.local.swagger_ui.__dirname +
                '/swagger.json'));
            options = {
                definitions: options.definitions,
                paths: options.paths,
                securityDefinitions: options.securityDefinitions,
                tags: options.tags
            };
            local.swgg.apiUpdate(options);
        }());
        break;
    }
}());
```

#### output from shell
[![screen-capture](https://kaizhu256.github.io/node-swagger-lite/build/screen-capture.testExampleJs.svg)](https://travis-ci.org/kaizhu256/node-swagger-lite)

#### output from electron-lite
[![screen-capture](https://kaizhu256.github.io/node-swagger-lite/build/screen-capture.testExampleJs.browser..png)](https://hrku01-swagger-lite-beta.herokuapp.com)



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
        "swagger-ui-lite": "2015.11.7",
        "utility2": "2015.12.9"
    },
    "description": "lightweight standalone swagger-ui server backed by nedb",
    "devDependencies": {
        "electron-lite": "2015.11.2"
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
        "build-ci": "utility2 shRun shReadmeBuild",
        "build-doc": "MODE_LINENO=0 \
utility2 shRun shReadmeExportFile package.json package.json && \
utility2 shRun shDocApiCreate \"module.exports={\
exampleFileList:['README.md','test.js','index.js'],\
moduleDict:{\
'swagger-lite':{aliasList:['swgg'],exports:require('./index.js')},\
'swagger-lite.api':{aliasList:['api'],exports:require('./index.js').api}\
}\
}\"",
        "start": "export PORT=${PORT:-8080} && \
export npm_config_mode_auto_restart=1 && \
utility2 shRun shIstanbulCover node test.js",
        "test": "export MODE_LINENO=0 && \
utility2 shRun shReadmeExportFile package.json package.json && \
export PORT=$(utility2 shServerPortRandom) && \
utility2 test node test.js"
    },
    "version": "2015.12.4"
}
```



# todo
- add nedb backend
- add logging feature
- add cached version crudGetManyByQueryCached
- add swggUserLoginTokenCapped
- re-enable user login/logout
- test /user/login and /user/logout
- add enum validation
- add max / min validation
- none



# change since 621b87a9
- npm publish 2015.12.4
- shrink file swagger-ui.rollup.js
- add file swagger-ui.rollup.js
- add asset /swagger-lite.html
- none



# changelog of last 50 commits
[![screen-capture](https://kaizhu256.github.io/node-swagger-lite/build/screen-capture.gitLog.svg)](https://github.com/kaizhu256/node-swagger-lite/commits)



# internal build-script
- build.sh

```shell
# build.sh

# this shell script will run the build for this package

shBuild() {(set -e
# this function will run the main build

    # init env
    . node_modules/.bin/utility2 && shInit

    (set -e
    # run npm-test on published package
    (export npm_config_mode_coverage=1 &&
        shNpmTestPublished)

    # test example js script
    (export MODE_BUILD=testExampleJs &&
        export npm_config_timeout_exit=10000 &&
        shRunScreenCapture shReadmeTestJs example.js)

    # run npm-test
    (export MODE_BUILD=npmTest &&
        shRunScreenCapture npm test --mode-coverage)

    # create api-doc
    npm run-script build-doc

    # if running legacy-node, then do not continue
    [ "$(node --version)" \< "v5.0" ] && exit || true

    if [ "$CI_BRANCH" = alpha ] ||
        [ "$CI_BRANCH" = beta ] ||
        [ "$CI_BRANCH" = master ]
    then
        TEST_URL="https://$(printf "$GITHUB_REPO" | \
            perl -pe 's/\//.github.io\//')/build..$CI_BRANCH..travis-ci.org/app/index.html"
        # deploy app to gh-pages
        (export npm_config_file_test_report_merge="$npm_config_dir_build/test-report.json" &&
            shGithubDeploy)
        # test deployed app to gh-pages
        (export MODE_BUILD=githubTest &&
            export modeBrowserTest=test &&
            export npm_config_file_test_report_merge="$npm_config_dir_build/test-report.json" &&
            export url="$TEST_URL?modeTest=consoleLogResult&timeExit={{timeExit}}" &&
            shBrowserTest)
    fi
    )

    # save exit-code
    EXIT_CODE=$?

    # create package-listing
    (export MODE_BUILD=gitLsTree &&
        shRunScreenCapture shGitLsTree)

    # create recent changelog of last 50 commits
    (export MODE_BUILD=gitLog &&
        shRunScreenCapture git log -50 --pretty="%ai\u000a%B")

    # cleanup remote build dir
    # export BUILD_GITHUB_UPLOAD_PRE_SH="rm -fr build"

    # upload build-artifacts to github, and if number of commits > 16, then squash older commits
    (export COMMIT_LIMIT=16 &&
        export MODE_BUILD=githubUpload &&
        shBuildGithubUpload)

    # exit exit-code
    exit "$EXIT_CODE"
)}
shBuild
