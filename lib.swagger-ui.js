/*jslint
    bitwise: true,
    browser: true,
    maxerr: 8,
    maxlen: 256,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
(function () {
    'use strict';
    var local;



    // run browser js-env code - pre-init
    (function () {
        // init local
        local = window.swgg.local;
/* jslint-ignore-begin */
// https://github.com/swagger-api/swagger-ui/blob/v2.1.3/src/main/template/main.handlebars
local.swgg.templateUiMain = '\
<form class="header tr">\n\
    <a class="td1" href="http://swagger.io" target="_blank">swagger</a>\n\
    <input class="td2" placeholder="http://petstore.swagger.io/v2/swagger.json" readonly type="text" value="{{url}}"/>\n\
</form>\n\
<div class="info">\n\
    {{#if info}}\n\
    <div class="title">{{info.title htmlSafe}}</div>\n\
    {{#if info.description}}\n\
    <div>{{info.description htmlSafe}}</div>\n\
    {{/if info.description}}\n\
    <ul>\n\
        {{#if externalDocs}}\n\
        <li>\n\
            <p>{{externalDocs.description htmlSafe}}</p>\n\
            <a href="{{externalDocs.url}}" target="_blank">{{externalDocs.url}}</a>\n\
        </li>\n\
        {{/if externalDocs}}\n\
        {{#if info.termsOfService}}\n\
        <li><a target="_blank" href="{{info.termsOfService}}">Terms of service</a></li>\n\
        {{/if info.termsOfService}}\n\
        {{#if info.contact.name}}\n\
        <li>Created by {{info.contact.name htmlSafe}}</li>\n\
        {{/if info.contact.name}}\n\
        {{#if info.contact.url}}\n\
        <li>See more at <a href="{{info.contact.url}}">{{info.contact.url}}</a></li>\n\
        {{/if info.contact.url}}\n\
        {{#if info.contact.email}}\n\
        <li><a target="_parent" href="mailto:{{info.contact.email}}?subject={{info.title htmlSafe}}">Contact the developer</a></li>\n\
        {{/if info.contact.email}}\n\
        {{#if info.license}}\n\
        <li><a target="_blank" href="{{info.license.url}}">{{info.license.name}}</a></li>\n\
        {{/if info.license}}\n\
    </ul>\n\
    {{/if info}}\n\
</div>\n\
<div class="resourceList"></div>\n\
<div class="footer">\n\
    <div>[ <span>base url</span>: {{basePath}}, <span>api version</span>: {{info.version}} ]</div>\n\
</div>\n\
';



// https://github.com/swagger-api/swagger-ui/blob/v2.1.3/src/main/template/operation.handlebars
local.swgg.templateUiOperation = '\
<div\n\
    class="eventDelegateClick eventDelegateSubmit li operation {{_method}}"\n\
    data-_key-operation-id="{{_keyOperationId}}"\n\
    id="{{id}}"\n\
>\n\
    <div class="cursorPointer eventDelegateClick onEventOperationDisplayToggle header tr">\n\
        <span class="td1">{{_method}}</span>\n\
        <span class="td2 {{#if deprecated}}deprecated{{/if deprecated}}">{{_path}}</span>\n\
        <span class="td3">{{operationId}}</span>\n\
        <span class="td4">{{summary htmlSafe}}</span>\n\
    </div>\n\
    <form accept-charset="UTF-8" class="content" style="display: none;">\n\
        {{#if deprecated}}\n\
        <h4 class="deprecated label li">Warning: Deprecated</h4>\n\
        {{/if deprecated}}\n\
        {{#if description}}\n\
        <h4 class="label li">Description</h4>\n\
        <div>{{description htmlSafe}}</div>\n\
        {{/if description}}\n\
        {{#if parameters.length}}\n\
        <h4 class="label li">Parameters</h4>\n\
        <div class="borderNone paramDef tr">\n\
            <span class="td1 th">Name and Description</span>\n\
            <span class="td2 th">Data Type</span>\n\
            <span class="td3 th">Value</span>\n\
            <span class="td4 th">Schema</span>\n\
        </div>\n\
        {{#each parameters}}\n\
        <div class="paramDef tr _ii{{_ii}} {{#if required}}required{{/if required}}" id="{{id}}" name="{{name}}">\n\
        </div>\n\
        {{/each parameters}}\n\
        {{/if parameters.length}}\n\
        <h4 class="label li">Response Messages</h4>\n\
        <div class="borderNone responseList tr">\n\
            <span class="td1 th">HTTP Status Code</span>\n\
            <span class="td2 th">Reason</span>\n\
        </div>\n\
        {{#each responseList}}\n\
        <div class="responseList tr _ii{{_ii}}">\n\
            <span class="td1">{{key}}</span>\n\
            <span class="td2">{{value.description htmlSafe}}</span>\n\
        </div>\n\
        {{/each responseList}}\n\
        <h4 class="label li"></h4>\n\
        <input class="onEventOperationAjax operationSubmit" type="submit" value="Try it out!">\n\
        <div class="responseAjax li"></div>\n\
    </form>\n\
</div>\n\
';



// https://github.com/swagger-api/swagger-ui/blob/v2.1.3/src/main/template/param.handlebars
local.swgg.templateUiParam = '\
<span class="td1">\n\
    {{name}}<br>\n\
    <span class="description">{{description}}</span>\n\
</span>\n\
<span class="td2">{{#if type2}}{{type2}}{{#if format2}} ({{format2}}){{/if format2}}{{/if type2}}</span>\n\
<span class="td3">\n\
    {{#if isTextarea}}\n\
    <textarea class="input" placeholder="{{placeholder}}"></textarea>\n\
    {{/if isTextarea}}\n\
    {{#if isFile}}\n\
    <input class="input" type="file">\n\
    {{/if isFile}}\n\
    {{#if isSelect}}\n\
    <select class="input" {{#if isSelectMultiple}}multiple{{/if isSelectMultiple}}>\n\
        {{#each selectOptionList}}\n\
        <option id={{id}} {{selected}}>{{valueEncoded htmlSafe}}</option>\n\
        {{/each selectOptionList}}\n\
    </select>\n\
    {{/if isSelect}}\n\
    {{#if isInputText}}\n\
    <input class="input" placeholder="{{placeholder}}" type="text">\n\
    {{/if isInputText}}\n\
</span>\n\
<span class="td4">{{#if schemaText}}<pre>{{schemaText}}</pre>{{/if schemaText}}</span>\n\
';



// https://github.com/swagger-api/swagger-ui/blob/v2.1.3/src/main/template/resource.handlebars
local.swgg.templateUiResource = '\
<div class="resource eventDelegateClick" id="{{id}}">\n\
    <div class="header tr">\n\
        <a class="onEventResourceDisplayAction td1" href="#">{{name}} : {{description htmlSafe}}</a>\n\
        <a class="onEventResourceDisplayAction td2" href="#">Show / Hide</a>\n\
        <a class="onEventResourceDisplayAction td3" href="#">List Operations</a>\n\
        <a class="onEventResourceDisplayAction td4" href="#">Expand Operations</a>\n\
    </div>\n\
    <div class="operationList" style="display: none;"></div>\n\
</div>\n\
';



local.swgg.templateUiResponseAjax = '\
<h4 class="label li">Curl Request</h4>\n\
{{#if errorValidate}}\n\
<pre>n/a</pre>\n\
{{#unless errorValidate}}\n\
<pre>{{curl htmlSafe}}</pre>\n\
{{/if errorValidate}}\n\
<h4 class="label li">Response Code</h4>\n\
<pre>{{statusCode}}</pre>\n\
<h4 class="label li">Response Headers</h4>\n\
{{#if errorValidate}}\n\
<pre>n/a</pre>\n\
{{#unless errorValidate}}\n\
<pre>{{responseHeaders htmlSafe}}</pre>\n\
{{/if errorValidate}}\n\
<h4 class="label li">Response Body</h4>\n\
{{responseBody}}\n\
';
/* jslint-ignore-end */
    }());



    // run browser js-env code - function
    (function () {
        local.swgg.domAnimateScrollTo = function (element) {
        /*
         * this function will scrollTo the element
         */
            var ii, timerInterval;
            ii = 0;
            timerInterval = setInterval(function () {
                ii += 0.025;
                local.global.scrollTo(0, document.body.scrollTop +
                    Math.min(ii, 1) * (element.offsetTop - document.body.scrollTop) +
                    -5);
            }, 25);
            setTimeout(function () {
                clearInterval(timerInterval);
            }, 1000);
        };

        local.swgg.domAnimateSlideAccordian = function (element, elementList) {
        /*
         * this function will slideDown the element,
         * but slideUp all other elements in elementList
         */
            // hide elements in elementList
            elementList.forEach(function (element2) {
                if (element2 !== element) {
                    local.swgg.domAnimateSlideUp(element2);
                }
            });
            // show element
            local.swgg.domAnimateSlideDown(element);
        };

        local.swgg.domAnimateSlideDown = function (element) {
        /*
         * this function will slideDown the dom-element
         */
            if (element.style.display !== 'none') {
                return;
            }
            element.style.maxHeight = 0;
            element.classList.add('swggAnimateSlide');
            element.style.display = '';
            setTimeout(function () {
                element.style.maxHeight = 2 * local.global.innerHeight + 'px';
            }, 20);
            setTimeout(function () {
                element.style.maxHeight = '';
                element.classList.remove('swggAnimateSlide');
            }, 500);
        };

        local.swgg.domAnimateSlideUp = function (element) {
        /*
         * this function will slideUp the dom-element
         */
            if (element.style.display === 'none') {
                return;
            }
            element.style.maxHeight = 2 * local.global.innerHeight + 'px';
            element.classList.add('swggAnimateSlide');
            setTimeout(function () {
                element.style.maxHeight = '0px';
            }, 20);
            setTimeout(function () {
                element.style.display = 'none';
                element.style.maxHeight = '';
                element.classList.remove('swggAnimateSlide');
            }, 500);
        };

        local.swgg.eventDelegate = function (event) {
            Object.keys(local.swgg.eventListenerDict).sort().some(function (key) {
                if (!(event.currentTarget.matches(key) || event.target.matches(key))) {
                    return;
                }
                event.preventDefault();
                event.stopPropagation();
                local.swgg.eventListenerDict[key](event);
                return true;
            });
        };

        local.swgg.eventListenerDict['.onEventOperationAjax'] = function (event) {
            var modeNext, onNext, options, tmp;
            modeNext = 0;
            onNext = function (error, data) {
                modeNext += 1;
                switch (modeNext) {
                case 1:
                    // init options
                    options = {};
                    options.api = local.swgg.apiDict[
                        event.currentTarget.dataset._keyOperationId
                    ];
                    options.domOperationContent = event.target.closest('.operation > .content');
                    options.headers = {};
                    options.paramDefList = options.api.parameters;
                    options.paramDict = {};
                    options.paramDefList.forEach(function (paramDef) {
                        local.utility2.tryCatchOnError(function () {
                            tmp = options.domOperationContent.querySelector(
                                '.paramDef[name=' + paramDef.name + '] > .td3'
                            ).children[0];
                            switch (tmp.tagName) {
                            case 'INPUT':
                                tmp = tmp.type === 'file'
                                    ? tmp.files && tmp.files[0]
                                    : local.swgg.paramValueDecode(tmp, {
                                        type: paramDef.type,
                                        valueEncoded: tmp.value
                                    }).valueDecoded;
                                break;
                            case 'SELECT':
                                tmp = Array.prototype.slice.call(tmp.options)
                                    .filter(function (element) {
                                        return element.selected;
                                    })
                                    .map(function (element) {
                                        return local.swgg.paramValueDecode(element, {
                                            type: paramDef.type || paramDef.items.type,
                                            valueEncoded: element.value
                                        }).valueDecoded;
                                    });
                                if (!tmp.length || tmp[0] === undefined) {
                                    return;
                                }
                                if (paramDef.type !== 'array') {
                                    tmp = tmp[0];
                                }
                                break;
                            case 'TEXTAREA':
                                tmp = paramDef.in === 'body'
                                    ? local.swgg.paramValueDecode(tmp, {
                                        type: paramDef.type,
                                        valueEncoded: tmp.value
                                    }).valueDecoded
                                    : !tmp.value
                                    ? undefined
                                    : tmp.value.split('\n').map(function (element) {
                                        return local.swgg.paramValueDecode(null, {
                                            type: paramDef.items.type,
                                            valueEncoded: element
                                        }).valueDecoded;
                                    });
                                break;
                            }
                            options.paramDict[paramDef.name] = tmp;
                        }, function (error) {
                            options.errorValidate = error;
                            options.errorValidate.options = { key: paramDef.name };
                            onNext(error);
                        });
                    });
                    options.api(options, onNext);
                    break;
                default:
                    if (options.done) {
                        return;
                    }
                    options.done = true;
                    // remove previous error
                    local.utility2.domQuerySelectorAll(
                        options.domOperationContent,
                        '.paramDef .input'
                    ).forEach(function (element) {
                        element.classList.remove('error');
                    });
                    if (options.errorValidate) {
                        // shake input on Error
                        local.utility2.domQuerySelectorAll(
                            options.domOperationContent,
                            '.paramDef[name=' + options.errorValidate.options.key + '] .input'
                        ).forEach(function (element) {
                            element.classList.add('error');
                            local.swgg.domAnimateShake(element);
                        });
                        data = {
                            errorValidate: options.errorValidate,
                            responseText: error.message,
                            statusCode: 400
                        };
                    }
                    // init responseHeaders
                    data.responseHeaders = {};
                    (
                        (data.getAllResponseHeaders && data.getAllResponseHeaders()) || ''
                    ).replace(
                        (/.+/g),
                        function (item) {
                            item = item.split(':');
                            data.responseHeaders[item[0].trim().toLowerCase()] =
                                item.slice(1).join(':').trim();
                        }
                    );
                    // init contentType
                    data.contentType =
                        String(data.responseHeaders['content-type']).split(';')[0];
                    // init responseBody
                    switch (data.contentType.split('/')[0]) {
                    case 'audio':
                    case 'video':
                        data.responseBody = '<' + data.contentType.split('/')[0] +
                            ' controls><source src="data:' + data.contentType + ';base64,' +
                            local.utility2.bufferToString(data.response, 'base64') +
                            '" type="' + data.contentType + '"></' +
                            data.contentType.split('/')[0] + '>';
                        break;
                    case 'image':
                        data.responseBody = '<img src="data:' + data.contentType + ';base64,' +
                            local.utility2.bufferToString(data.response, 'base64') + '">';
                        break;
                    default:
                        data.responseBody = '<pre>' + local.utility2.stringHtmlSafe(
                            data.responseJson
                                ? JSON.stringify(data.responseJson, null, 4)
                                : data.responseText
                        ) + '</pre>';
                    }
                    // init curl
                    local.utility2.tryCatchOnError(function () {
                        options.data = JSON.stringify(JSON.parse(options.data), null, 4);
                    }, local.utility2.nop);
                    data.curl = 'curl \\\n' +
                        '--request ' + options.api._method.toUpperCase() + ' \\\n' +
                        Object.keys(options.headers).map(function (key) {
                            return "--header '" + key + ': ' + options.headers[key] + "' \\\n";
                        }).join('') + '--data-binary ' + (typeof options.data === 'string'
                            ? "'" + options.data.replace(/'/g, "'\"'\"'") + "'"
                            : '<blob>') + ' \\\n"' + options.url + '"';
                    data.responseHeaders = data.getAllResponseHeaders &&
                        data.getAllResponseHeaders().trim();
                    // templateRender response
                    options.domOperationContent.querySelector(
                        '.responseAjax'
                    ).innerHTML =
                        local.utility2.templateRender(local.swgg.templateUiResponseAjax, data);
                    break;
                }
            };
            onNext();
        };

        local.swgg.eventListenerDict['.onEventOperationDisplayToggle'] = function (event) {
            var tmp;
            location.hash = '!/' + event.target.closest('.resource').id + '/' +
                event.target.closest('.operation').id;
            tmp = event.target.closest('.operation').querySelector('.operation > .content');
            // show the operation, but hide all other operations
            if (tmp.style.display === 'none') {
                local.swgg.domAnimateSlideAccordian(
                    tmp,
                    local.utility2.domQuerySelectorAll(
                        tmp.closest('.operationList'),
                        '.operation > .content'
                    )
                );
            // hide the operation
            } else {
                local.swgg.domAnimateSlideUp(tmp);
            }
        };

        local.swgg.eventListenerDict['.onEventResourceDisplayAction'] = function (event) {
            var tmp;
            location.hash = '!/' + event.target.closest('.resource').id;
            tmp = event.currentTarget.querySelector('.operationList');
            event.target.className.split(' ').some(function (className) {
                switch (className) {
                // hide the resource
                case 'td1':
                case 'td2':
                    if (tmp.style.display !== 'none') {
                        local.swgg.domAnimateSlideUp(tmp);
                        return true;
                    }
                    break;
                }
                switch (className) {
                // show the resource, but hide all other resources
                case 'td1':
                case 'td2':
                case 'td3':
                case 'td4':
                    local.swgg.domAnimateSlideAccordian(
                        tmp,
                        local.utility2.domQuerySelectorAll(
                            document,
                            '.swggUiContainer .operationList'
                        )
                    );
                    break;
                }
                switch (className) {
                case 'td1':
                case 'td2':
                    return true;
                // collapse all operations in the resource
                case 'td3':
                    local.utility2.domQuerySelectorAll(
                        tmp,
                        '.operation > .content'
                    ).forEach(function (element) {
                        local.swgg.domAnimateSlideUp(element);
                    });
                    return true;
                // expand all operations in the resource
                case 'td4':
                    local.utility2.domQuerySelectorAll(
                        tmp,
                        '.operation > .content'
                    ).forEach(function (element) {
                        local.swgg.domAnimateSlideDown(element);
                    });
                    return true;
                }
            });
        };

        local.swgg.uiReload = function () {
            // init url
            local.swgg.uiSwaggerJsonUrl =
                local.utility2.urlParse(document.querySelector(
                    '.swggUiContainer > .header > .td2'
                ).value).href;
            // build
            local.utility2.onReady.counter += 1;
            local.utility2.ajax({ url: local.swgg.uiSwaggerJsonUrl }, function (error, xhr) {
                // validate no error occurred
                local.utility2.assert(!error, error);
                // render ui
                local.swgg.uiRender(JSON.parse(xhr.responseText));
                local.utility2.onReady();
            });

        };

        local.swgg.uiRender = function (options) {
            /*
             * this function will render swagger-ui
             */
            var resource, self, tmp;
            // reset state
            local.swgg.idDomElementDict = {};
            local.swgg.apiDictUpdate(options);
            self = local.swgg.uiState = local.utility2.jsonCopy(options);
            // init url
            self.url = local.utility2.urlParse(document.querySelector(
                '.swggUiContainer > .header > .td2'
            ).value).href;
            // templateRender main
            local.swgg.uiFragment =
                local.utility2.domFragmentRender(local.swgg.templateUiMain, self);
            local.utility2.objectSetDefault(self, {
                resourceDict: {},
                operationDict: {},
                paramDefDict: {},
                tagDict: {}
            });
            // init tagDict
            self.tags.forEach(function (tag) {
                self.tagDict[tag.name] = tag;
            });
            // init operationDict
            Object.keys(local.swgg.templatePathObjectDict).sort().forEach(function (operation) {
                // init operation
                operation = JSON.parse(local.swgg.templatePathObjectDict[operation]);
                if (!operation.tags[0] || self.operationDict[operation._keyOperationId]) {
                    return;
                }
                self.operationDict[operation._keyOperationId] = operation;
                // init resource
                resource = self.resourceDict[operation.tags[0]];
                if (!resource && self.tagDict[operation.tags[0]]) {
                    resource = self.resourceDict[operation.tags[0]] =
                        self.tagDict[operation.tags[0]];
                    local.utility2.objectSetDefault(resource, {
                        description: 'no description available',
                        id: local.swgg.idDomElementCreate('swgg_id_' + operation.tags[0]),
                        name: operation.tags[0],
                        operationListInnerHtml: ''
                    });
                }
            });
            // init resourceDict
            Object.keys(self.resourceDict).sort().forEach(function (key) {
                // templateRender resource
                local.swgg.uiFragment.querySelector('.resourceList').appendChild(
                    local.utility2.domFragmentRender(
                        local.swgg.templateUiResource,
                        self.resourceDict[key]
                    )
                );
            });
            Object.keys(self.operationDict).sort(function (aa, bb) {
                aa = self.operationDict[aa];
                aa = aa._path + ' ' + aa._method;
                bb = self.operationDict[bb];
                bb = bb._path + ' ' + bb._method;
                return aa < bb
                    ? -1
                    : 1;
            }).forEach(function (operation) {
                operation = self.operationDict[operation];
                operation.id =
                    local.swgg.idDomElementCreate('swgg_id_' + operation.operationId);
                resource = self.resourceDict[operation.tags[0]];
                local.utility2.objectSetDefault(operation, {
                    description: '',
                    responseList: Object.keys(operation.responses).sort().map(function (key) {
                        return { key: key, value: operation.responses[key] };
                    }),
                    summary: 'no summary available'
                });
                operation.parameters.forEach(function (element) {
                    // init element.id
                    element.id = local.swgg.idDomElementCreate('swgg_id_' + element.name);
                    self.paramDefDict[element.id] = element;
                });
                local.utility2.objectTraverse(operation, function (element) {
                    if (Array.isArray(element)) {
                        element.forEach(function (element, ii) {
                            // if element is inside a list, then init element._ii
                            if (element && typeof element === 'object') {
                                element._ii = ii;
                            }
                        });
                    }
                });
                // templateRender operation
                local.swgg.uiFragment.querySelector(
                    '#' + resource.id + ' .operationList'
                ).appendChild(
                    local.utility2.domFragmentRender(local.swgg.templateUiOperation, operation)
                );
            });
            Object.keys(self.paramDefDict).forEach(function (paramDef) {
                paramDef = self.paramDefDict[paramDef];
                local.utility2.objectSetDefault(paramDef, {
                    placeholder: paramDef.required
                        ? '(required)'
                        : ''
                });
                // init input - file
                if (paramDef.type === 'file') {
                    paramDef.isFile = true;
                // init input - textarea
                } else if (paramDef.in === 'body') {
                    paramDef.isTextarea = true;
                // init input - select
                } else if (paramDef.enum || paramDef.type === 'boolean') {
                    paramDef.isSelect = true;
                    paramDef.isSelectMultiple = paramDef.type === 'array';
                    paramDef.selectOptionList = (paramDef.type === 'boolean'
                        ? [true, false]
                        : paramDef.enum).map(function (element) {
                        paramDef.hasDefault |= element === paramDef.default;
                        return {
                            id: local.swgg.idDomElementCreate('swgg_id_' + paramDef.name),
                            selected: element === paramDef.default
                                ? 'selected'
                                : '',
                            type: paramDef.type || paramDef.items.type,
                            valueDecoded: element
                        };
                    });
                    // init 'undefined' value
                    if (!(paramDef.hasDefault ||
                            paramDef.isSelectMultiple ||
                            paramDef.required)) {
                        paramDef.selectOptionList.unshift({
                            id: local.swgg.idDomElementCreate('swgg_id_' + paramDef.name),
                            selected: 'selected',
                            type: paramDef.type || paramDef.items.type
                        });
                    }
                    paramDef.selectOptionList.forEach(function (element) {
                        local.swgg.paramValueEncode({ dataset: {} }, element);
                    });
                // init input - textarea
                } else if (paramDef.type === 'array') {
                    paramDef.isTextarea = true;
                    paramDef.placeholder = 'provide multiple values in new lines' +
                        (paramDef.required
                            ? ' (at least one required)'
                            : '');
                // init input - text
                } else {
                    paramDef.isInputText = true;
                }
                // init format2 / type2
                [
                    paramDef,
                    paramDef.schema
                ].some(function (element) {
                    local.utility2.tryCatchOnError(function () {
                        paramDef.format2 = paramDef.format2 || element.format;
                    }, local.utility2.nop);
                    local.utility2.tryCatchOnError(function () {
                        paramDef.type2 = paramDef.type2 || element.type;
                    }, local.utility2.nop);
                    return paramDef.type2;
                });
                // init schema2
                [
                    paramDef.items,
                    paramDef.schema,
                    paramDef.schema && paramDef.schema.items
                ].some(function (element) {
                    local.utility2.tryCatchOnError(function () {
                        paramDef.schema2 = paramDef.schema2 ||
                            local.swgg.schemaNormalize(element).properties;
                    }, local.utility2.nop);
                    return paramDef.schema2;
                });
                if (paramDef.schema2) {
                    paramDef.schemaText = JSON.stringify(paramDef.type2 === 'array'
                        ? [paramDef.schema2]
                        : paramDef.schema2, null, 4);
                }
                // templateRender paramDef
                local.swgg.uiFragment.querySelector('#' + paramDef.id).innerHTML =
                    local.utility2.templateRender(local.swgg.templateUiParam, paramDef);
                // init valueDecoded
                paramDef.valueDecoded = paramDef.default;
                if (paramDef.valueDecoded === undefined && paramDef.in === 'body') {
                    if (paramDef.schema2) {
                        paramDef.valueDecoded = local.swgg.collectDocRandomCreate({
                            override: function () {
                                var override = {};
                                // preserve default value
                                Object.keys(paramDef.schema2).forEach(function (key) {
                                    if (paramDef.schema2[key].default !== undefined) {
                                        override[key] = paramDef.schema2[key].default;
                                    }
                                });
                                return override;
                            },
                            properties: paramDef.schema2
                        });
                        if (paramDef.type2 === 'array') {
                            paramDef.valueDecoded = [paramDef.valueDecoded];
                        }
                        paramDef.valueEncodeSpace = 4;
                    } else {
                        paramDef.valueDecoded = paramDef.type2 === 'array'
                            ? []
                            : {};
                    }
                }
                // init valueEncoded
                paramDef.paramInput = local.swgg.uiFragment.querySelector('#' + paramDef.id +
                    ' > .td3').children[0];
                local.swgg.paramValueEncode(paramDef.paramInput, paramDef);
                // init input.value
                if (paramDef.isSelect) {
                    paramDef.selectOptionList.forEach(function (element) {
                        element.paramInput =
                            local.swgg.uiFragment.querySelector('#' + element.id);
                        local.swgg.paramValueEncode(element.paramInput, element);
                        element.paramInput.value = element.valueEncoded;
                    });
                } else if (paramDef.isInputText) {
                    paramDef.paramInput.value = paramDef.valueEncoded;
                } else if (paramDef.isTextarea) {
                    paramDef.paramInput.value = paramDef.valueEncoded;
                }
            });
            // overwrite swggUiContainer with uiFragment
            document.querySelector('.swggUiContainer').innerHTML = '';
            document.querySelector('.swggUiContainer').appendChild(local.swgg.uiFragment);
            // init event-handling
            ['Click', 'Submit'].forEach(function (eventType) {
                local.utility2.domQuerySelectorAll(
                    document,
                    '.eventDelegate' + eventType
                ).forEach(function (element) {
                    element.addEventListener(eventType.toLowerCase(), local.swgg.eventDelegate);
                });
            });
            // restore state from hash
            local.utility2.tryCatchOnError(function () {
                location.hash.split('/').slice(1).forEach(function (element, ii) {
                    switch (ii) {
                    case 0:
                        // Expand all operations for the resource and scroll to it
                        element = document.querySelector('.swggUiContainer #' + element +
                            ' .operationList');
                        local.swgg.domAnimateSlideDown(element);
                        clearTimeout(tmp);
                        tmp = setTimeout(function () {
                            local.swgg.domAnimateScrollTo(element.closest('.resource'));
                        });
                        break;
                    case 1:
                        // Expand operation
                        element = document.querySelector('.swggUiContainer #' + element +
                            ' .content');
                        local.swgg.domAnimateSlideDown(element);
                        clearTimeout(tmp);
                        tmp = setTimeout(function () {
                            local.swgg.domAnimateScrollTo(element.closest('.operation'));
                        });
                        break;
                    }
                });
            }, local.utility2.onErrorDefault);
        };
    }());



    // run browser js-env code - post-init
    (function () {
        local.swgg.paramValueDecode = function (input, options) {
        /*
         * this function will decode options.valueEncoded
         * according to input.dataset.swgg_param_value_options
         */
            var aa, bb;
            // restore options
            if (input) {
                aa = JSON.parse(decodeURIComponent(input.dataset.swgg_param_value_options));
                options.type = aa.type;
                options.valueDecodedDefault = aa.valueDecodedDefault;
            }
            aa = options.valueEncoded;
            if (!aa) {
                // use valueDecodedDefault
                bb = options.valueDecodedDefault;
            } else {
                // validate valueEncoded is a string
                local.utility2.assertJsonEqual(typeof aa, 'string');
                if (options.type === 'string') {
                    bb = aa;
                } else {
                    bb = JSON.parse(aa);
                    // validate valueDecoded is not a string
                    local.utility2.assertJsonNotEqual(typeof bb, 'string');
                }
            }
            options.valueDecoded = bb;
            return options;
        };

        local.swgg.paramValueEncode = function (input, options) {
        /*
         * this function will encode options.valueDecoded according to options.type
         */
            var aa, bb;
            aa = options.valueDecoded;
            // save options
            input.dataset.swgg_param_value_options = encodeURIComponent(JSON.stringify({
                type: options.type,
                valueDecodedDefault: aa === null || aa === ''
                    ? aa
                    : undefined
            }));
            if (local.utility2.isNullOrUndefined(aa)) {
                bb = aa === null && options.type !== 'string'
                    ? 'null'
                    : '';
            } else if (options.type === 'string') {
                // validate valueEncoded is a string
                local.utility2.assertJsonEqual(typeof aa, 'string');
                bb = aa;
            } else {
                // validate valueEncoded is not a string
                local.utility2.assertJsonNotEqual(typeof aa, 'string');
                bb = JSON.stringify(aa, options.valueEncodeReplacer, options.valueEncodeSpace);
            }
            options.valueEncoded = bb;
            return options;
        };
    }());
}());
