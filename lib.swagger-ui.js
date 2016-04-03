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
    var local, nop;



    // run shared js-env code
    (function () {
        // init nop
        nop = function () {
            return;
        };
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
        // init jQuery
        local.jQuery = local.global.jQuery;
        // init utility2
        local.utility2 = local.modeJs === 'browser'
            ? local.global.utility2
            : require('utility2');
        // init functions
        local.forEach = function (list, onEach) {
            list = list || [];
            if (Array.isArray(list)) {
                list.forEach(onEach);
                return;
            }
            Object.keys(list).forEach(function (key) {
                onEach(list[key], key);
            });
        };
        local.getInputMap = function (endpoint, paramDefList) {
            var map, paramDef, result;
            map = {};
            local.utility2.domElementQuerySelectorAll(
                endpoint.querySelector('.sandbox'),
                'input,select,textarea'
            ).forEach(function (element) {
                switch (element.tagName) {
                case 'INPUT':
                    if (element.type === 'file') {
                        map[element.name] = element.files[0];
                        return;
                    }
                    if ((element.value || '').trim()) {
                        map[element.name] = element.value;
                    }
                    break;
                case 'SELECT':
                    if (!element.multiple && element.value) {
                        map[element.name] = element.value;
                        return;
                    }
                    result = Array.prototype.slice.call(
                        element.options
                    ).filter(function (element) {
                        return element.selected;
                    });
                    if (result.length) {
                        map[element.name] = result;
                    }
                    break;
                case 'TEXTAREA':
                    result = (element.value || '').trim();
                    if (!result) {
                        return;
                    }
                    (paramDefList || []).some(function (element2) {
                        if (element2.name === element.name) {
                            paramDef = element2;
                            return true;
                        }
                    });
                    if (paramDef && paramDef.type && paramDef.type === 'array') {
                        switch (paramDef.collectionFormat) {
                        case 'multi':
                            result = result.split('\n');
                            break;
                        case 'pipes':
                            result = result.replace((/\n/g), '|');
                            break;
                        case 'ssv':
                            result = result.replace((/\n/g), ' ');
                            break;
                        case 'tsv':
                            result = result.replace((/\n/g), '\t');
                            break;
                        // default to csv
                        default:
                            result = result.replace((/\n/g), ',');
                        }
                    }
                    map[element.name] = result;
                    break;
                }
            });
            return map;
        };
        local.isObject = function (value) {
            return value && (typeof value === 'function' || typeof value === 'object');
        };
        local.onClickSubmitOperation = function (event) {
            var elementEndpoint, onErrorData, options, paramDict, results, self;
            self = this;
            window.self = self; // debugPrint
            event.preventDefault();
            event.stopPropagation();
            elementEndpoint = event.currentTarget.closest('.endpoint');
            paramDict = local.getInputMap(elementEndpoint, self.model.parameters);
            options = { parent: self };
            // file-upload
            if (local.utility2.domElementQuerySelectorAll(
                    elementEndpoint.querySelector('.sandbox'),
                    'input'
                ).some(function (element) {
                    return element.type === 'file';
                })) {
                paramDict.parameterContentType = 'multipart/form-data';
            }

            // init options
            options.headers = local.utility2.objectSetDefault(
                self.model.setContentTypes(paramDict, options),
                self.model.getHeaderParams(paramDict)
            );
            options.data = self.model.getBody(options.headers, paramDict, options);
            options.method = self.model.method.toUpperCase();
            options.url = self.model.urlify(paramDict);
            self.model.clientAuthorizations.apply(options, self.model.operation.security);

            //adds curl output
            results = [];
            results.push('-X ' + self.model.method.toUpperCase());
            if (options.headers) {
                Object.keys(options.headers).forEach(function (key) {
                    results.push('--header "' + key + ': ' + options.headers[key] + '"');
                });
            }
            if (options.data) {
                results.push('-d "' + (typeof options.data === 'object'
                    ? JSON.stringify(options.data)
                    : options.data).replace(/"/g, '\\"') + '"');
            }
            self.el.querySelector('.curl').innerHTML = '<pre>curl ' +
                (results.join(' ') + ' "' + options.url + '"')
                .replace('!', '&#33;') + '</pre>';

            paramDict = paramDict || {};
            // init onErrorData
            onErrorData = function (error, xhr) {
                var data;
                // jslint-hack
                nop(error);
                xhr = xhr || {};
                data = {};
                data.data = data.statusText = xhr.responseText;
                data.headers = {
                    'content-type': 'application/json'
                };
                ((xhr.getAllResponseHeaders && xhr.getAllResponseHeaders()) || '').replace(
                    (/.+/g),
                    function (item) {
                        item = item.split(':');
                        data.headers[item[0].trim().toLowerCase()] =
                            item.slice(1).join(':').trim();
                    }
                );
                data.method = xhr.method;
                data.obj = {};
                try {
                    data.obj = JSON.parse(xhr.responseText);
                } catch (ignore) {}
                data.status = xhr.statusCode;
                data.url = xhr.url;
                self.showStatus(data);
            };
            // validate data
            try {
                local.swgg.validateByParamDefList({
                    data: local.swgg.normalizeParamDictSwagger(
                        local.utility2.jsonCopy(paramDict),
                        self.model
                    ),
                    key: self.model.operation.operationId,
                    paramDefList: self.model.parameters
                });
            } catch (errorCaught) {
                local.swgg.onErrorJsonapi(function (error) {
                    onErrorData(error, {
                        responseText: JSON.stringify(error),
                        method: options.method,
                        obj: error,
                        statusCode: 400,
                        url: options.url
                    });
                })(errorCaught);
                // wiggle input on Error
                if (self && local.jQuery) {
                    local.jQuery(".sandbox", self.el)
                        .find("input[type='text'],select.parameter,textarea.body-textarea")
                        .each(function () {
                            local.jQuery(this).addClass("error");
                            local.swgg.domElementWiggle(this);
                        });
                }
                return;
            }
            local.utility2.ajax(options, onErrorData);
        };



        // init lib swagger-client
        // https://github.com/swagger-api/swagger-js/blob/v2.1.3/browser/swagger-client.js
        /**
         * swagger-client - swagger-client is a javascript client for use with swaggering APIs.
         * @version v2.1.3
         * @link http://swagger.io
         * @license Apache-2.0
         */
        (function () {
            var ApiKeyAuthorization,
                Model,
                Operation,
                Resolver,
                SchemaMarkup,
                SwaggerClient,
                SwaggerAuthorizations,
                auth,
                getStringSignature,
                helpers,
                optionHtml,
                reservedApiTags,
                reservedClientTags,
                schemaToHTML,
                schemaToJSON,
                typeFromJsonSchema;
            // We have to keep track of the function/property names to avoid collisions for tag names which are used to allow the
            // following usage: 'client.{tagName}'
            reservedClientTags = [
                'apis',
                'authorizationScheme',
                'authorizations',
                'basePath',
                'build',
                'buildFrom1_1Spec',
                'buildFrom1_2Spec',
                'buildFromSpec',
                'clientAuthorizations',
                'convertInfo',
                'debug',
                'defaultErrorCallback',
                'defaultSuccessCallback',
                'fail',
                'failure',
                'finish',
                'info',
                'initialize',
                'isBuilt',
                'isValid',
                'modelPropertyMacro',
                'models',
                'modelsArray',
                'options',
                'progress',
                'resourceCount',
                'sampleModels',
                'selfReflect',
                'setConsolidatedModels',
                'spec',
                'supportedSubmitMethods',
                'swaggerRequestHeaders',
                'url'
            ];
            // We have to keep track of the function/property names to avoid collisions for tag names which are used to allow the
            // following usage: 'client.apis.{tagName}'
            reservedApiTags = [
                'apis',
                'description',
                'externalDocs',
                'label',
                'name',
                'operation',
                'operations',
                'operationsArray',
                'path',
                'tag'
            ];
            helpers = {};
            optionHtml = helpers.optionHtml = function (label, value) {
                return '<tr><td class="optionName">' + label + ':</td><td>' + value + '</td></tr>';
            };
            helpers.resolveSchema = function (schema) {
                return schema.schema || schema;
            };
            helpers.simpleRef = function (name) {
                if (name === undefined) {
                    return null;
                }
                if (name.indexOf('#/definitions/') === 0) {
                    return name.substring('#/definitions/'.length);
                }
                return name;
            };
            auth = {};
            /**
             * SwaggerAuthorizations applys the correct authorization to an operation being executed
             */
            SwaggerAuthorizations = auth.SwaggerAuthorizations = function (authz) {
                this.authz = authz || {};
            };
            /**
             * Add auths to the hash
             * Will overwrite any existing
             *
             */
            SwaggerAuthorizations.prototype.add = function (name, auth) {
                var self;
                self = this;
                if (local.isObject(name)) {
                    Object.keys(name).forEach(function (key) {
                        self.authz[key] = name[key];
                    });
                } else if (typeof name === 'string') {
                    self.authz[name] = auth;
                }
                return auth;
            };
            SwaggerAuthorizations.prototype.apply = function (obj, securities) {
                var status, applyAll, flattenedSecurities;
                status = true;
                applyAll = !securities;
                flattenedSecurities = [];
                // Securities could be [ {} ]
                local.forEach(securities, function (obj, key) {
                    // Make sure we account for securities being [ str ]
                    if (typeof key === 'string') {
                        flattenedSecurities.push(key);
                    }
                    // Flatten keys in to our array
                    Object.keys(obj).forEach(function (key) {
                        flattenedSecurities.push(key);
                    });
                });
                local.forEach(this.authz, function (auth, authName) {
                    if (applyAll || flattenedSecurities.indexOf(authName) >= 0) {
                        var newStatus = auth.apply(obj);
                        status = status && !!newStatus; // logical ORs regarding status
                    }
                });
                return status;
            };
            /**
             * ApiKeyAuthorization allows a query param or header to be injected
             */
            ApiKeyAuthorization = auth.ApiKeyAuthorization = function (name, value, type) {
                this.name = name;
                this.value = value;
                this.type = type;
            };
            ApiKeyAuthorization.prototype.apply = function (obj) {
                if (this.type === 'query') {
                    if (obj.url.indexOf('?') > 0) {
                        obj.url = obj.url + '&' + this.name + '=' + this.value;
                    } else {
                        obj.url = obj.url + '?' + this.name + '=' + this.value;
                    }
                    return true;
                }
                if (this.type === 'header') {
                    if (obj.headers[this.name] === undefined) {
                        obj.headers[this.name] = this.value;
                    }
                    return true;
                }
            };
            schemaToJSON = function (schema, models, modelsToIgnore, modelPropertyMacro) {
                // Resolve the schema (Handle nested schemas)
                schema = helpers.resolveSchema(schema);
                if (typeof modelPropertyMacro !== 'function') {
                    modelPropertyMacro = function (prop) {
                        return (prop || {}).default;
                    };
                }
                modelsToIgnore = modelsToIgnore || {};
                var type, format, model, output;
                type = schema.type || 'object';
                format = schema.format;
                if (schema.example) {
                    output = schema.example;
                } else if (local.utility2.isNullOrUndefined(schema.items) && Array.isArray(schema.enum)) {
                    output = schema.enum[0];
                }
                if (local.utility2.isNullOrUndefined(output)) {
                    if (schema.$ref) {
                        model = models[helpers.simpleRef(schema.$ref)];
                        if (!local.utility2.isNullOrUndefined(model)) {
                            if (local.utility2.isNullOrUndefined(modelsToIgnore[model.name])) {
                                modelsToIgnore[model.name] = model;
                                output = schemaToJSON(model.definition, models, modelsToIgnore, modelPropertyMacro);
                                delete modelsToIgnore[model.name];
                            } else {
                                if (model.type === 'array') {
                                    output = [];
                                } else {
                                    output = {};
                                }
                            }
                        }
                    } else if (!local.utility2.isNullOrUndefined(schema.default)) {
                        output = schema.default;
                    } else if (type === 'string') {
                        if (format === 'date-time') {
                            output = new Date().toISOString();
                        } else if (format === 'date') {
                            output = new Date().toISOString().split('T')[0];
                        } else {
                            output = 'string';
                        }
                    } else if (type === 'integer') {
                        output = 0;
                    } else if (type === 'number') {
                        output = 0.0;
                    } else if (type === 'boolean') {
                        output = true;
                    } else if (type === 'object') {
                        output = {};
                        local.forEach(schema.properties, function (property, name) {
                            var cProperty = local.utility2.jsonCopy(property);
                            // Allow macro to set the default value
                            cProperty.default = modelPropertyMacro(property);
                            output[name] = schemaToJSON(cProperty, models, modelsToIgnore, modelPropertyMacro);
                        });
                    } else if (type === 'array') {
                        output = [];
                        if (Array.isArray(schema.items)) {
                            local.forEach(schema.items, function (item) {
                                output.push(schemaToJSON(item, models, modelsToIgnore, modelPropertyMacro));
                            });
                        } else if (schema.items) {
                            output.push(schemaToJSON(schema.items, models, modelsToIgnore, modelPropertyMacro));
                        } else if (local.utility2.isNullOrUndefined(schema.items)) {
                            output.push({});
                        } else {
                            console.log('Array type\'s \'items\' property is not an array or an object, cannot process');
                        }
                    }
                }
                return output;
            };
            getStringSignature = function (obj, baseComponent) {
                var str = '';
                if (obj.$ref) {
                    str += helpers.simpleRef(obj.$ref);
                } else if (obj.type === undefined) {
                    str += 'object';
                } else if (obj.type === 'array') {
                    if (baseComponent) {
                        str += getStringSignature((obj.items || obj.$ref || {}));
                    } else {
                        str += 'Array[';
                        str += getStringSignature((obj.items || obj.$ref || {}));
                        str += ']';
                    }
                } else if (obj.type === 'integer' && obj.format === 'int32') {
                    str += 'integer';
                } else if (obj.type === 'integer' && obj.format === 'int64') {
                    str += 'long';
                } else if (obj.type === 'integer' && obj.format === undefined) {
                    str += 'long';
                } else if (obj.type === 'string' && obj.format === 'date-time') {
                    str += 'date-time';
                } else if (obj.type === 'string' && obj.format === 'date') {
                    str += 'date';
                } else if (obj.type === 'string' && obj.format === undefined) {
                    str += 'string';
                } else if (obj.type === 'number' && obj.format === 'float') {
                    str += 'float';
                } else if (obj.type === 'number' && obj.format === 'double') {
                    str += 'double';
                } else if (obj.type === 'number' && obj.format === undefined) {
                    str += 'double';
                } else if (obj.type === 'boolean') {
                    str += 'boolean';
                } else if (obj.$ref) {
                    str += helpers.simpleRef(obj.$ref);
                } else {
                    str += obj.type;
                }
                return str;
            };
            schemaToHTML = function (name, schema, models, modelPropertyMacro) {
                var addReference,
                    html2,
                    inlineModels,
                    primitiveToHTML,
                    primitiveToOptionsHTML,
                    processModel,
                    references,
                    seenModels,
                    strongOpen,
                    strongClose;
                /////////////////////////////////
                addReference = function (schema, name, skipRef) {
                    var model, modelName;
                    modelName = name;
                    if (schema.$ref) {
                        modelName = schema.title || helpers.simpleRef(schema.$ref);
                        model = models[modelName];
                    } else if (local.utility2.isNullOrUndefined(name)) {
                        inlineModels += 1;
                        modelName = schema.title || 'Inline Model ' + inlineModels;
                        model = {
                            definition: schema
                        };
                    }
                    if (skipRef !== true) {
                        references[modelName] = local.utility2.isNullOrUndefined(model) ? {} : model.definition;
                    }
                    return modelName;
                };
                primitiveToHTML = function (schema) {
                    var html, type;
                    html = '<span class="propType">';
                    type = schema.type || 'object';
                    if (schema.$ref) {
                        html += addReference(schema, helpers.simpleRef(schema.$ref));
                    } else if (type === 'object') {
                        if (!local.utility2.isNullOrUndefined(schema.properties)) {
                            html += addReference(schema);
                        } else {
                            html += 'object';
                        }
                    } else if (type === 'array') {
                        html += 'Array[';
                        if (Array.isArray(schema.items)) {
                            html += schema.items.map(addReference).join(',');
                        } else if (schema.items) {
                            if (local.utility2.isNullOrUndefined(schema.items.$ref)) {
                                if (!local.utility2.isNullOrUndefined(schema.items.type) && ['array', 'object'].indexOf(schema.items.type) === -1) {
                                    html += schema.items.type;
                                } else {
                                    html += addReference(schema.items);
                                }
                            } else {
                                html += addReference(schema.items, helpers.simpleRef(schema.items.$ref));
                            }
                        } else {
                            console.log('Array type\'s \'items\' schema is not an array or an object, cannot process');
                            html += 'object';
                        }
                        html += ']';
                    } else {
                        html += schema.type;
                    }
                    html += '</span>';
                    return html;
                };

                primitiveToOptionsHTML = function (schema, html) {
                    var isArray, options, type, enumString;
                    options = '';
                    type = schema.type || 'object';
                    isArray = type === 'array';
                    if (isArray) {
                        if (schema.items && !local.utility2.isNullOrUndefined(schema.items.type)) {
                            type = schema.items.type;
                        } else {
                            type = 'object';
                        }
                    }
                    if (!local.utility2.isNullOrUndefined(schema.default)) {
                        options += optionHtml('Default', schema.default);
                    }
                    switch (type) {
                    case 'string':
                        if (schema.minLength) {
                            options += optionHtml('Min. Length', schema.minLength);
                        }
                        if (schema.maxLength) {
                            options += optionHtml('Max. Length', schema.maxLength);
                        }
                        if (schema.pattern) {
                            options += optionHtml('Reg. Exp.', schema.pattern);
                        }
                        break;
                    case 'integer':
                    case 'number':
                        if (schema.minimum) {
                            options += optionHtml('Min. Value', schema.minimum);
                        }
                        if (schema.exclusiveMinimum) {
                            options += optionHtml('Exclusive Min.', 'true');
                        }
                        if (schema.maximum) {
                            options += optionHtml('Max. Value', schema.maximum);
                        }
                        if (schema.exclusiveMaximum) {
                            options += optionHtml('Exclusive Max.', 'true');
                        }
                        if (schema.multipleOf) {
                            options += optionHtml('Multiple Of', schema.multipleOf);
                        }
                        break;
                    }
                    if (isArray) {
                        if (schema.minItems) {
                            options += optionHtml('Min. Items', schema.minItems);
                        }
                        if (schema.maxItems) {
                            options += optionHtml('Max. Items', schema.maxItems);
                        }
                        if (schema.uniqueItems) {
                            options += optionHtml('Unique Items', 'true');
                        }
                        if (schema.collectionFormat) {
                            options += optionHtml('Coll. Format', schema.collectionFormat);
                        }
                    }
                    if (local.utility2.isNullOrUndefined(schema.items)) {
                        if (Array.isArray(schema.enum)) {
                            if (type === 'number' || type === 'integer') {
                                enumString = schema.enum.join(', ');
                            } else {
                                enumString = '"' + schema.enum.join('", "') + '"';
                            }
                            options += optionHtml('Enum', enumString);
                        }
                    }
                    if (options.length > 0) {
                        html = '<span class="propWrap">' + html + '<table class="optionsWrapper"><tr><th colspan="2">' + type + '</th></tr>' + options + '</table></span>';
                    }
                    return html;
                };

                processModel = function (schema, name) {
                    var type, isArray, html;
                    type = schema.type || 'object';
                    isArray = schema.type === 'array';
                    html = strongOpen + name + ' ' + (isArray ? '[' : '{') + strongClose;
                    if (name) {
                        seenModels.push(name);
                    }
                    if (isArray) {
                        if (Array.isArray(schema.items)) {
                            html += '<div>' + schema.items.map(function (item) {
                                var type2 = item.type || 'object';
                                if (local.utility2.isNullOrUndefined(item.$ref)) {
                                    if (['array', 'object'].indexOf(type2) > -1) {
                                        if (type2 === 'object' && local.utility2.isNullOrUndefined(item.properties)) {
                                            return 'object';
                                        }
                                        return addReference(item);
                                    }
                                    return primitiveToOptionsHTML(item, type2);
                                }
                                return addReference(item, helpers.simpleRef(item.$ref));
                            }).join(',</div><div>');
                        } else if (schema.items) {
                            if (local.utility2.isNullOrUndefined(schema.items.$ref)) {
                                if (['array', 'object'].indexOf(schema.items.type || 'object') > -1) {
                                    if ((local.utility2.isNullOrUndefined(schema.items.type) || schema.items.type === 'object') && local.utility2.isNullOrUndefined(schema.items.properties)) {
                                        html += '<div>object</div>';
                                    } else {
                                        html += '<div>' + addReference(schema.items) + '</div>';
                                    }
                                } else {
                                    html += '<div>' + primitiveToOptionsHTML(schema.items, schema.items.type) + '</div>';
                                }
                            } else {
                                html += '<div>' + addReference(schema.items, helpers.simpleRef(schema.items.$ref)) + '</div>';
                            }
                        } else {
                            console.log('Array type\'s \'items\' property is not an array or an object, cannot process');
                            html += '<div>object</div>';
                        }
                    } else {
                        if (schema.$ref) {
                            html += '<div>' + addReference(schema, name) + '</div>';
                        } else if (type === 'object') {
                            html += '<div>';
                            html += Object.keys(schema.properties || {}).map(function (name) {
                                var cProperty,
                                    html3,
                                    model,
                                    property,
                                    propertyIsRequired,
                                    requiredClass;
                                property = schema.properties[name];
                                propertyIsRequired = ((schema.required || []).indexOf(name) >= 0);
                                cProperty = local.utility2.jsonCopy(property);
                                requiredClass = propertyIsRequired ? 'required' : '';
                                html3 = '<span class="propName ' + requiredClass + '">' + name + '</span> (';
                                // Allow macro to set the default value
                                cProperty.default = modelPropertyMacro(cProperty);
                                // Resolve the schema (Handle nested schemas)
                                cProperty = helpers.resolveSchema(cProperty);
                                // We need to handle property references to primitives (Issue 339)
                                if (cProperty.$ref) {
                                    model = models[helpers.simpleRef(cProperty.$ref)];
                                    if (!local.utility2.isNullOrUndefined(model) && [undefined, 'array', 'object'].indexOf(model.definition.type) === -1) {
                                        // Use referenced schema
                                        cProperty = helpers.resolveSchema(model.definition);
                                    }
                                }
                                html3 += primitiveToHTML(cProperty);
                                if (!propertyIsRequired) {
                                    html3 += ', <span class="propOptKey">optional</span>';
                                }
                                html3 += ')';
                                if (!local.utility2.isNullOrUndefined(cProperty.description)) {
                                    html3 += ': ' + '<span class="propDesc">' + cProperty.description + '</span>';
                                }
                                if (cProperty.enum) {
                                    html3 += ' = <span class="propVals">[\'' + cProperty.enum.join('\', \'') + '\']</span>';
                                }
                                return primitiveToOptionsHTML(cProperty, html3);
                            }).join(',</div><div>');
                            html += '</div>';
                        } else {
                            html += '<div>' + primitiveToOptionsHTML(schema, type) + '</div>';
                        }
                    }
                    return html + strongOpen + (isArray ? ']' : '}') + strongClose;
                };
                strongOpen = '<span class="strong">';
                strongClose = '</span>';
                // Allow for ignoring the 'name' argument.... shifting the rest
                if (local.isObject(name)) {
                    name = undefined;
                    schema = name;
                    models = schema;
                    modelPropertyMacro = models;
                }
                models = models || {};
                // Resolve the schema (Handle nested schemas)
                schema = helpers.resolveSchema(schema);
                // Return for empty object
                if (!schema) {
                    return strongOpen + 'Empty' + strongClose;
                }
                // Dereference $ref from 'models'
                if (schema.$ref) {
                    name = helpers.simpleRef(schema.$ref);
                    schema = models[name];
                    if (schema === undefined) {
                        return strongOpen + name + ' is not defined!' + strongClose;
                    }
                }
                if (typeof name !== 'string') {
                    name = schema.title || 'Inline Model';
                }
                // If we are a Model object... adjust accordingly
                if (schema.definition) {
                    schema = schema.definition;
                }
                if (typeof modelPropertyMacro !== 'function') {
                    modelPropertyMacro = function (prop) {
                        return (prop || {}).default;
                    };
                }
                references = {};
                seenModels = [];
                inlineModels = 0;
                // Generate current HTML
                html2 = processModel(schema, name);
                // Generate references HTML
                Object.keys(references).forEach(function (name) {
                    var seenModel;
                    seenModel = seenModels.indexOf(name) > -1;
                    if (!seenModel) {
                        seenModels.push(name);
                        html2 += '<br />' + processModel(references[name], name);
                    }
                    delete references[name];
                });
                return html2;
            };



            SchemaMarkup = {};
            SchemaMarkup.optionHtml = optionHtml;
            SchemaMarkup.typeFromJsonSchema = typeFromJsonSchema;
            SchemaMarkup.getStringSignature = getStringSignature;
            SchemaMarkup.schemaToHTML = schemaToHTML;
            SchemaMarkup.schemaToJSON = schemaToJSON;

            optionHtml = function (label, value) {
                return '<tr><td class="optionName">' + label + ':</td><td>' + value + '</td></tr>';
            };

            typeFromJsonSchema = function (type, format) {
                var str;
                if (type === 'integer' && format === 'int32') {
                    str = 'integer';
                } else if (type === 'integer' && format === 'int64') {
                    str = 'long';
                } else if (type === 'integer' && format === undefined) {
                    str = 'long';
                } else if (type === 'string' && format === 'date-time') {
                    str = 'date-time';
                } else if (type === 'string' && format === 'date') {
                    str = 'date';
                } else if (type === 'number' && format === 'float') {
                    str = 'float';
                } else if (type === 'number' && format === 'double') {
                    str = 'double';
                } else if (type === 'number' && format === undefined) {
                    str = 'double';
                } else if (type === 'boolean') {
                    str = 'boolean';
                } else if (type === 'string') {
                    str = 'string';
                }
                return str;
            };






            /**
             * Resolves a spec's remote references
             */
            Resolver = nop;

            Resolver.prototype.resolve = function (spec, root, callback, scope) {
                var _root,
                    a,
                    all,
                    allOf,
                    definition,
                    expectedCalls,
                    i,
                    j,
                    joined,
                    k,
                    location,
                    normalized,
                    operation,
                    part,
                    parts,
                    path,
                    processedCalls,
                    property,
                    r,
                    resolutionTable,
                    resolvedRefs,
                    s,
                    self,
                    toResolve,
                    unresolvedRefs,
                    url;
                _root = root;
                self = this;
                self.scope = (scope || self);
                self.iteration = self.iteration || 0;
                processedCalls = 0;
                resolvedRefs = {};
                unresolvedRefs = {};
                resolutionTable = []; // store objects for dereferencing
                // definitions
                Object.keys(spec.definitions).forEach(function (name) {
                    definition = spec.definitions[name];
                    Object.keys(definition.properties || {}).forEach(function (propertyName) {
                        property = definition.properties[propertyName];
                        self.resolveTo(root, property, resolutionTable, '/definitions');
                    });
                    if (definition.allOf) {
                        definition['x-resolved-from'] = ['#/definitions/' + name];
                        allOf = definition.allOf;
                        // the refs go first
                        allOf.sort(function (a, b) {
                            if (a.$ref && b.$ref) {
                                return 0;
                            }
                            if (a.$ref) {
                                return -1;
                            }
                            return 1;
                        });
                        for (i = 0; i < allOf.length; i += 1) {
                            property = allOf[i];
                            location = '/definitions/' + name + '/allOf';
                            self.resolveInline(null, spec, property, resolutionTable, unresolvedRefs, location);
                        }
                    }
                });
                // operations
                Object.keys(spec.paths).forEach(function (name) {
                    path = spec.paths[name];
                    Object.keys(path).forEach(function (method) {
                        // operation reference
                        if (method === '$ref') {
                            // location = path[method];
                            location = '/paths' + name;
                            self.resolveInline(root, spec, path, resolutionTable, unresolvedRefs, location);
                        } else {
                            operation = path[method];
                            operation.parameters.forEach(function (parameter) {
                                location = '/paths' + name + '/' + method + '/parameters';
                                if (parameter.in === 'body' && parameter.schema) {
                                    self.resolveTo(root, parameter.schema, resolutionTable, location);
                                }
                                if (parameter.$ref) {
                                    // parameter reference
                                    self.resolveInline(root, spec, parameter, resolutionTable, unresolvedRefs, parameter.$ref);
                                }
                            });
                            Object.keys(operation.responses).forEach(function (responseCode) {
                                var response = operation.responses[responseCode];
                                location = '/paths' + name + '/' + method + '/responses/' + responseCode;
                                if (local.isObject(response)) {
                                    if (response.$ref) {
                                        // response reference
                                        self.resolveInline(root, spec, response, resolutionTable, unresolvedRefs, location);
                                    }
                                    if (response.schema) {
                                        self.resolveTo(root, response.schema, resolutionTable, location);
                                    }
                                }
                            });
                        }
                    });
                });
                expectedCalls = 0;
                toResolve = [];
                // if the root is same as obj[i].root we can resolve locally
                all = resolutionTable;
                for (i = 0; i < all.length; i += 1) {
                    a = all[i];
                    if (root === a.root) {
                        if (a.resolveAs === 'ref') {
                            // resolve any path walking
                            joined = ((a.root || '') + '/' + a.key).split('/');
                            normalized = [];
                            url = '';
                            if (a.key.indexOf('../') >= 0) {
                                for (j = 0; j < joined.length; j += 1) {
                                    if (joined[j] === '..') {
                                        normalized = normalized.slice(0, normalized.length - 1);
                                    } else {
                                        normalized.push(joined[j]);
                                    }
                                }
                                for (k = 0; k < normalized.length; k += 1) {
                                    if (k > 0) {
                                        url += '/';
                                    }
                                    url += normalized[k];
                                }
                                // we now have to remote resolve this because the path has changed
                                a.root = url;
                                toResolve.push(a);
                            } else {
                                parts = a.key.split('#');
                                if (parts.length === 2) {
                                    if (parts[0].indexOf('http://') === 0 || parts[0].indexOf('https://') === 0) {
                                        a.root = parts[0];
                                    }
                                    location = parts[1].split('/');
                                    s = spec;
                                    for (k = 0; k < location.length; k += 1) {
                                        part = location[k];
                                        if (part !== '') {
                                            s = s[part];
                                            if (s !== undefined) {
                                                r = s;
                                            } else {
                                                r = null;
                                                break;
                                            }
                                        }
                                    }
                                    if (r === null) {
                                        // must resolve this too
                                        toResolve.push(a);
                                    }
                                }
                            }
                        } else {
                            if (a.resolveAs === 'inline') {
                                toResolve.push(a);
                            }
                        }
                    } else {
                        toResolve.push(a);
                    }
                }
                expectedCalls = toResolve.length;
                // resolve anything that is local
                toResolve.forEach(function (item) {
                    // local resolve
                    self.resolveItem(spec, resolutionTable, resolvedRefs, unresolvedRefs, item);
                    processedCalls += 1;
                    if (processedCalls === expectedCalls) {
                        self.finish(spec, root, resolvedRefs, unresolvedRefs, callback);
                    }
                });
                if (Object.keys(toResolve).length === 0) {
                    self.finish(spec, _root, resolutionTable, resolvedRefs, unresolvedRefs, callback);
                }
            };

            Resolver.prototype.resolveItem = function (spec, resolvedRefs, unresolvedRefs, item) {
                var j,
                    location,
                    parts,
                    path,
                    resolved,
                    resolvedName,
                    segment;
                path = item.location;
                location = spec;
                parts = path.split('/');
                for (j = 0; j < parts.length; j += 1) {
                    segment = parts[j];
                    if (segment.indexOf('~1') !== -1) {
                        segment = parts[j].replace(/~0/g, '~').replace(/~1/g, '/');
                        if (segment.charAt(0) !== '/') {
                            segment = '/' + segment;
                        }
                    }
                    if (location === undefined || location === null) {
                        break;
                    }
                    if (segment === '' && j === (parts.length - 1) && parts.length > 1) {
                        location = null;
                        break;
                    }
                    if (segment.length > 0) {
                        location = location[segment];
                    }
                }
                resolved = item.key;
                parts = item.key.split('/');
                resolvedName = parts[parts.length - 1];
                if (resolvedName.indexOf('#') >= 0) {
                    resolvedName = resolvedName.split('#')[1];
                }
                if (location !== null && location !== undefined) {
                    resolvedRefs[resolved] = {
                        name: resolvedName,
                        obj: location,
                        key: item.key,
                        root: item.root
                    };
                } else {
                    unresolvedRefs[resolved] = {
                        root: item.root,
                        location: item.location
                    };
                }
            };

            Resolver.prototype.finish = function (spec, root, resolutionTable, resolvedRefs, unresolvedRefs, callback) {
                // walk resolution table and replace with resolved refs
                var item, key, resolvedTo, self, targetObj, abs, existingUnresolved;
                self = this;
                Object.keys(resolutionTable).forEach(function (ref) {
                    item = resolutionTable[ref];
                    key = item.key;
                    resolvedTo = resolvedRefs[key];
                    if (resolvedTo) {
                        spec.definitions = spec.definitions || {};
                        if (item.resolveAs === 'ref') {
                            spec.definitions[resolvedTo.name] = resolvedTo.obj;
                            item.obj.$ref = '#/definitions/' + resolvedTo.name;
                        } else if (item.resolveAs === 'inline') {
                            targetObj = item.obj;
                            targetObj['x-resolved-from'] = [item.key];
                            delete targetObj.$ref;
                            Object.keys(resolvedTo.obj).forEach(function (key) {
                                abs = self.retainRoot(resolvedTo.obj[key], item.root);
                                targetObj[key] = abs;
                            });
                        }
                    }
                });
                existingUnresolved = self.countUnresolvedRefs(spec);
                if (existingUnresolved.length === 0 || self.iteration > 5) {
                    self.resolveAllOf(spec.definitions);
                    callback.call(self.scope, spec, unresolvedRefs);
                } else {
                    self.iteration += 1;
                    self.resolve(spec, root, callback, self.scope);
                }
            };

            Resolver.prototype.countUnresolvedRefs = function (spec) {
                var getRefs,
                    k,
                    key,
                    keys,
                    refs,
                    obj,
                    parts,
                    unresolvedKeys;
                getRefs = function (spec, obj) {
                    var item, output;
                    obj = obj || spec;
                    output = {};
                    Object.keys(obj).forEach(function (key) {
                        item = obj[key];
                        if (key === '$ref' && typeof item === 'string') {
                            output[item] = null;
                        } else if (local.isObject(item)) {
                            Object.keys(getRefs(item)).forEach(function (k) {
                                output[k] = null;
                            });
                        }
                    });
                    return output;
                };
                refs = getRefs(spec);
                keys = [];
                unresolvedKeys = [];
                Object.keys(refs).forEach(function (i) {
                    if (i.indexOf('#') === 0) {
                        keys.push(i.substring(1));
                    } else {
                        unresolvedKeys.push(i);
                    }
                });
                // verify possible keys
                keys.forEach(function (part) {
                    parts = part.split('/');
                    obj = spec;
                    for (k = 0; k < parts.length; k += 1) {
                        key = parts[k];
                        if (key !== '') {
                            obj = obj[key];
                            if (obj === undefined) {
                                unresolvedKeys.push(part);
                                break;
                            }
                        }
                    }
                });
                return unresolvedKeys.length;
            };
/* jslint-ignore-begin */

            Resolver.prototype.retainRoot = function (obj, root) {
                // walk object and look for relative $refs
                for (var key in obj) {
                    var item = obj[key];
                    if (key === '$ref' && typeof item === 'string') {
                        // stop and inspect
                        if (item.indexOf('http://') !== 0 && item.indexOf('https://') !== 0) {
                            if (item.indexOf('#') !== 0) {
                                item = '#' + item;
                            }
                            item = (root || '') + item;
                            obj[key] = item;
                        }
                    } else if (local.isObject(item)) {
                        this.retainRoot(item, root);
                    }
                }
                return obj;
            };

            /**
             * immediately in-lines local refs, queues remote refs
             * for inline resolution
             */
            Resolver.prototype.resolveInline = function (root, spec, property, resolutionTable, unresolvedRefs, location) {
                var key = property.$ref,
                    ref = property.$ref,
                    i, p, p2, rs;
                var rootTrimmed = false;
                if (ref) {
                    if (ref.indexOf('../') === 0) {
                        // reset root
                        p = ref.split('../');
                        p2 = root.split('/');
                        ref = '';
                        for (i = 0; i < p.length; i += 1) {
                            if (p[i] === '') {
                                p2 = p2.slice(0, p2.length - 1);
                            } else {
                                ref += p[i];
                            }
                        }
                        root = '';
                        for (i = 0; i < p2.length - 1; i += 1) {
                            if (i > 0) {
                                root += '/';
                            }
                            root += p2[i];
                        }
                        rootTrimmed = true;
                    }
                    if (ref.indexOf('#') >= 0) {
                        if (ref.indexOf('/') === 0) {
                            rs = ref.split('#');
                            p = root.split('//');
                            p2 = p[1].split('/');
                            root = p[0] + '//' + p2[0] + rs[0];
                            location = rs[1];
                        } else {
                            rs = ref.split('#');
                            if (rs[0] !== '') {
                                p2 = root.split('/');
                                p2 = p2.slice(0, p2.length - 1);
                                if (!rootTrimmed) {
                                    root = '';
                                    for (var k = 0; k < p2.length; k += 1) {
                                        if (k > 0) {
                                            root += '/';
                                        }
                                        root += p2[k];
                                    }
                                }
                                root += '/' + ref.split('#')[0];
                            }
                            location = rs[1];
                        }
                    }
                    if (ref.indexOf('http') === 0) {
                        if (ref.indexOf('#') >= 0) {
                            root = ref.split('#')[0];
                            location = ref.split('#')[1];
                        } else {
                            root = ref;
                            location = '';
                        }
                        resolutionTable.push({
                            obj: property,
                            resolveAs: 'inline',
                            root: root,
                            key: key,
                            location: location
                        });
                    } else if (ref.indexOf('#') === 0) {
                        location = ref.split('#')[1];
                        resolutionTable.push({
                            obj: property,
                            resolveAs: 'inline',
                            root: root,
                            key: key,
                            location: location
                        });
                    } else {
                        resolutionTable.push({
                            obj: property,
                            resolveAs: 'inline',
                            root: root,
                            key: key,
                            location: location
                        });
                    }
                } else if (property.type === 'array') {
                    this.resolveTo(root, property.items, resolutionTable, location);
                }
            };

            Resolver.prototype.resolveTo = function (root, property, resolutionTable, location) {
                var ref = property.$ref;
                if (ref) {
                    if (ref.indexOf('#') >= 0) {
                        location = ref.split('#')[1];
                    }
                    resolutionTable.push({
                        obj: property,
                        resolveAs: 'ref',
                        root: root,
                        key: ref,
                        location: location
                    });
                } else if (property.type === 'array') {
                    var items = property.items;
                    this.resolveTo(root, items, resolutionTable, location);
                }
            };

            Resolver.prototype.resolveAllOf = function (spec, obj, depth) {
                depth = depth || 0;
                obj = obj || spec;
                var name;
                for (var key in obj) {
                    var item = obj[key];
                    if (item === null) {
                        throw new TypeError("Swagger 2.0 does not support null types (" + obj + ").  See https://github.com/swagger-api/swagger-spec/issues/229.")
                    }
                    if (typeof item === 'object') {
                        this.resolveAllOf(spec, item, depth + 1);
                    }
                    if (item && item.allOf !== undefined) {
                        var allOf = item.allOf;
                        if (Array.isArray(allOf)) {
                            var output = {};
                            output['x-composed'] = true;
                            if (item['x-resolved-from'] !== undefined) {
                                output['x-resolved-from'] = item['x-resolved-from'];
                            }
                            output.properties = {};
                            for (var i = 0; i < allOf.length; i += 1) {
                                var component = allOf[i];
                                var source = 'self';
                                if (component['x-resolved-from'] !== undefined) {
                                    source = component['x-resolved-from'][0];
                                }
                                for (var part in component) {
                                    if (!output.hasOwnProperty(part)) {
                                        output[part] = JSON.parse(JSON.stringify(component[part]));
                                        if (part === 'properties') {
                                            for (name in output[part]) {
                                                output[part][name]['x-resolved-from'] = source;
                                            }
                                        }
                                    } else {
                                        if (part === 'properties') {
                                            var properties = component[part];
                                            for (name in properties) {
                                                output.properties[name] = JSON.parse(JSON.stringify(properties[name]));
                                                var resolvedFrom = properties[name]['x-resolved-from'];
                                                if (resolvedFrom === undefined || resolvedFrom === 'self') {
                                                    resolvedFrom = source;
                                                }
                                                output.properties[name]['x-resolved-from'] = resolvedFrom;
                                            }
                                        } else if (part === 'required') {
                                            // merge & dedup the required array
                                            var a = output.required.concat(component[part]);
                                            for (var k = 0; k < a.length; k += 1) {
                                                for (var j = k + 1; j < a.length; j += 1) {
                                                    if (a[k] === a[j]) {
                                                        a.splice(j--, 1);
                                                    }
                                                }
                                            }
                                            output.required = a;
                                        } else if (part === 'x-resolved-from') {
                                            output['x-resolved-from'].push(source);
                                        } else {
                                            // TODO: need to merge this property
                                            // console.log('what to do with ' + part)
                                        }
                                    }
                                }
                            }
                            obj[key] = output;
                        }
                    }
                    if (local.isObject(item)) {
                        this.resolveAllOf(spec, item, depth + 1);
                    }
                }
            };
/* jslint-ignore-end */





            Model = function (name, definition, models, modelPropertyMacro) {
                this.definition = definition || {};
                this.isArray = definition.type === 'array';
                this.models = models || {};
                this.name = definition.title || name || 'Inline Model';
                this.modelPropertyMacro = modelPropertyMacro || function (property) {
                    return property.default;
                };
                return this;
            };

            Model.prototype.createJSONSample = Model.prototype.getSampleValue = function (modelsToIgnore) {
                modelsToIgnore = modelsToIgnore || {};
                modelsToIgnore[this.name] = this;
                // Response support
                if (this.examples && this.examples['application/json']) {
                    this.definition.example = this.examples['application/json'];
                } else if (!this.definition.example) {
                    this.definition.example = this.examples;
                }
                return SchemaMarkup.schemaToJSON(this.definition, this.models, modelsToIgnore, this.modelPropertyMacro);
            };

            Model.prototype.getMockSignature = function () {
                return SchemaMarkup.schemaToHTML(this.name, this.definition, this.models, this.modelPropertyMacro);
            };




            Operation = function (parent, operationId, httpMethod, path, pathObject, definitions, models, clientAuthorizations) {
                var defaultResponseCode,
                    errors,
                    id,
                    innerType,
                    isDefault,
                    model,
                    resolvedModel,
                    response,
                    responses,
                    successResponse,
                    value,
                    self;
                self = this;
                errors = [];
                parent = parent || {};
                pathObject = pathObject || {};
                if (parent && parent.options) {
                    self.client = parent.options.client || null;
                    self.responseInterceptor = parent.options.responseInterceptor || null;
                }
                self.authorizations = pathObject.security;
                self.clientAuthorizations = clientAuthorizations;
                self.consumes = pathObject.consumes || parent.consumes || ['application/json'];
                self.produces = pathObject.produces || parent.produces || ['application/json'];
                self.deprecated = pathObject.deprecated;
                self.description = pathObject.description;
                self.method = (httpMethod || errors.push('Operation ' + operationId + ' is missing method.'));
                self.models = models || {};
                self.nickname = operationId;
                self.operation = pathObject;
                self.operations = {};
                self.parameters = pathObject !== null ? (pathObject.parameters || []) : {};
                self.parent = parent;
                self.path = (path || errors.push('Operation ' + self.nickname + ' is missing path.'));
                self.responses = (pathObject.responses || {});
                self.security = pathObject.security;
                self.summary = pathObject.summary || '';
                self.type = null;
                self.inlineModels = [];
                // add to global models
                Object.keys(definitions || {}).forEach(function (key) {
                    model = new Model(key, definitions[key], self.models, parent.modelPropertyMacro);
                    if (model) {
                        self.models[key] = model;
                    }
                });
                self.parameters.forEach(function (param) {
                    if (param.type === 'array') {
                        param.isList = true;
                        param.allowMultiple = true;
                    }
                    innerType = self.getType(param);
                    if (innerType && innerType.toString().toLowerCase() === 'boolean') {
                        param.allowableValues = {};
                        param.isList = true;
                        param.enum = [true, false]; // use actual primitives
                    }
                    if (param.enum !== undefined) {
                        param.allowableValues = {};
                        param.allowableValues.values = [];
                        param.allowableValues.descriptiveValues = [];
                        for (id = 0; id < param.enum.length; id += 1) {
                            value = param.enum[id];
                            isDefault = (value === param.default || String(value) === param.default);
                            param.allowableValues.values.push(value);
                            // Always have string for descriptive values....
                            param.allowableValues.descriptiveValues.push({
                                value: String(value),
                                isDefault: isDefault
                            });
                        }
                    }
                    if (param.type === 'array') {
                        innerType = [innerType];
                        if (param.allowableValues === undefined) {
                            // can't show as a list if no values to select from
                            delete param.isList;
                            delete param.allowMultiple;
                        }
                    }
                    param.signature = self.getModelSignature(innerType, self.models).toString();
                    param.sampleJSON = self.getModelSampleJSON(innerType, self.models);
                    param.responseClassSignature = param.signature;
                });
                responses = self.responses;
                if (responses['200']) {
                    response = responses['200'];
                    defaultResponseCode = '200';
                } else if (responses['201']) {
                    response = responses['201'];
                    defaultResponseCode = '201';
                } else if (responses['202']) {
                    response = responses['202'];
                    defaultResponseCode = '202';
                } else if (responses['203']) {
                    response = responses['203'];
                    defaultResponseCode = '203';
                } else if (responses['204']) {
                    response = responses['204'];
                    defaultResponseCode = '204';
                } else if (responses['205']) {
                    response = responses['205'];
                    defaultResponseCode = '205';
                } else if (responses['206']) {
                    response = responses['206'];
                    defaultResponseCode = '206';
                } else if (responses.default) {
                    response = responses.default;
                    defaultResponseCode = 'default';
                }
                if (response && response.schema) {
                    resolvedModel = self.resolveModel(response.schema, definitions);
                    delete responses[defaultResponseCode];
                    if (resolvedModel) {
                        self.successResponse = {};
                        successResponse = self.successResponse[defaultResponseCode] = resolvedModel;
                    } else if (!response.schema.type || response.schema.type === 'object' || response.schema.type === 'array') {
                        // Inline model
                        self.successResponse = {};
                        successResponse = self.successResponse[defaultResponseCode] = new Model(undefined, response.schema || {}, self.models, parent.modelPropertyMacro);
                    } else {
                        // Primitive
                        self.successResponse = {};
                        successResponse = self.successResponse[defaultResponseCode] = response.schema;
                    }
                    if (successResponse) {
                        // Attach response properties
                        if (response.description) {
                            successResponse.description = response.description;
                        }
                        if (response.examples) {
                            successResponse.examples = response.examples;
                        }
                        if (response.headers) {
                            successResponse.headers = response.headers;
                        }
                    }
                    self.type = response;
                }
                if (errors.length > 0) {
                    if (self.resource && self.resource.api && self.resource.api.fail) {
                        self.resource.api.fail(errors);
                    }
                }
            };
/* jslint-ignore-begin */

            Operation.prototype.getType = function (param) {
                var type = param.type;
                var format = param.format;
                var isArray = false;
                var str;
                if (type === 'integer' && format === 'int32') {
                    str = 'integer';
                } else if (type === 'integer' && format === 'int64') {
                    str = 'long';
                } else if (type === 'integer') {
                    str = 'integer';
                } else if (type === 'string') {
                    if (format === 'date-time') {
                        str = 'date-time';
                    } else if (format === 'date') {
                        str = 'date';
                    } else {
                        str = 'string';
                    }
                } else if (type === 'number' && format === 'float') {
                    str = 'float';
                } else if (type === 'number' && format === 'double') {
                    str = 'double';
                } else if (type === 'number') {
                    str = 'double';
                } else if (type === 'boolean') {
                    str = 'boolean';
                } else if (type === 'array') {
                    isArray = true;
                    if (param.items) {
                        str = this.getType(param.items);
                    }
                }
                if (param.$ref) {
                    str = helpers.simpleRef(param.$ref);
                }
                var schema = param.schema;
                if (schema) {
                    var ref = schema.$ref;
                    if (ref) {
                        ref = helpers.simpleRef(ref);
                        if (isArray) {
                            return [ref];
                        } else {
                            return ref;
                        }
                    } else {
                        // If inline schema, we add it our interal hash -> which gives us it's ID (int)
                        if (schema.type === 'object') {
                            return this.addInlineModel(schema);
                        }
                        return this.getType(schema);
                    }
                }
                if (isArray) {
                    return [str];
                } else {
                    return str;
                }
            };

            /**
             * adds an inline schema (model) to a hash, where we can ref it later
             * @param {object} schema a schema
             * @return {number} the ID of the schema being added, or null
             **/
            Operation.prototype.addInlineModel = function (schema) {
                var len = this.inlineModels.length;
                var model = this.resolveModel(schema, {});
                if (model) {
                    this.inlineModels.push(model);
                    return 'Inline Model ' + len; // return string ref of the inline model (used with #getInlineModel)
                }
                return null; // report errors?
            };

            /**
             * gets the internal ref to an inline model
             * @param {string} inline_str a string reference to an inline model
             * @return {Model} the model being referenced. Or null
             **/
            Operation.prototype.getInlineModel = function (inlineStr) {
                if (/^Inline Model \d+$/.test(inlineStr)) {
                    var id = parseInt(inlineStr.substr('Inline Model'.length).trim(), 10); //
                    var model = this.inlineModels[id];
                    return model;
                }
                // I'm returning null here, should I rather throw an error?
                return null;
            };

            Operation.prototype.resolveModel = function (schema, definitions) {
                if (schema.$ref !== undefined) {
                    var ref = schema.$ref;
                    if (ref.indexOf('#/definitions/') === 0) {
                        ref = ref.substring('#/definitions/'.length);
                    }
                    if (definitions[ref]) {
                        return new Model(ref, definitions[ref], this.models, this.parent.modelPropertyMacro);
                    }
                    // schema must at least be an object to get resolved to an inline Model
                } else if (schema && typeof schema === 'object' &&
                    (schema.type === 'object' || local.utility2.isNullOrUndefined(schema.type))) {
                    return new Model(undefined, schema, this.models, this.parent.modelPropertyMacro);
                }
                return null;
            };

            Operation.prototype.getModelSignature = function (type, definitions) {
                var isPrimitive, listType;
                if (type instanceof Array) {
                    listType = true;
                    type = type[0];
                }
                // Convert undefined to string of 'undefined'
                if (type === undefined) {
                    type = 'undefined';
                    isPrimitive = true;
                } else if (definitions[type]) {
                    // a model def exists?
                    type = definitions[type]; /* Model */
                    isPrimitive = false;
                } else if (this.getInlineModel(type)) {
                    type = this.getInlineModel(type); /* Model */
                    isPrimitive = false;
                } else {
                    // We default to primitive
                    isPrimitive = true;
                }
                if (isPrimitive) {
                    if (listType) {
                        return 'Array[' + type + ']';
                    } else {
                        return type.toString();
                    }
                } else {
                    if (listType) {
                        return 'Array[' + type.getMockSignature() + ']';
                    } else {
                        return type.getMockSignature();
                    }
                }
            };

            Operation.prototype.supportHeaderParams = function () {
                return true;
            };

            Operation.prototype.supportedSubmitMethods = function () {
                return this.parent.supportedSubmitMethods;
            };

            Operation.prototype.getHeaderParams = function (args) {
                var headers = this.setContentTypes(args, {});
                for (var i = 0; i < this.parameters.length; i += 1) {
                    var param = this.parameters[i];
                    if (args[param.name] !== undefined) {
                        if (param.in === 'header') {
                            var value = args[param.name];
                            if (Array.isArray(value)) {
                                value = value.toString();
                            }
                            headers[param.name] = value;
                        }
                    }
                }
                return headers;
            };

            Operation.prototype.urlify = function (args) {
                var formParams = {};
                var requestUrl = this.path;
                var querystring = ''; // grab params from the args, build the querystring along the way
                for (var i = 0; i < this.parameters.length; i += 1) {
                    var param = this.parameters[i];
                    if (args[param.name] !== undefined) {
                        if (param.in === 'path') {
                            var reg = new RegExp('\{' + param.name + '\}', 'gi');
                            var value = args[param.name];
                            if (Array.isArray(value)) {
                                value = this.encodePathCollection(param.collectionFormat, param.name, value);
                            } else {
                                value = this.encodePathParam(value);
                            }
                            requestUrl = requestUrl.replace(reg, value);
                        } else if (param.in === 'query' && args[param.name] !== undefined) {
                            if (querystring === '') {
                                querystring += '?';
                            } else {
                                querystring += '&';
                            }
                            if (param.collectionFormat !== undefined) {
                                var qp = args[param.name];
                                if (Array.isArray(qp)) {
                                    querystring += this.encodeQueryCollection(param.collectionFormat, param.name, qp);
                                } else {
                                    querystring += this.encodeQueryParam(param.name) + '=' + this.encodeQueryParam(args[param.name]);
                                }
                            } else {
                                querystring += this.encodeQueryParam(param.name) + '=' + this.encodeQueryParam(args[param.name]);
                            }
                        } else if (param.in === 'formData') {
                            formParams[param.name] = args[param.name];
                        }
                    }
                }
                return local.swgg.urlBaseGet() + requestUrl + querystring;
            };

            Operation.prototype.getMissingParams = function (args) {
                var missingParams = []; // check required params, track the ones that are missing
                var i;
                for (i = 0; i < this.parameters.length; i += 1) {
                    var param = this.parameters[i];
                    if (param.required === true) {
                        if (args[param.name] === undefined) {
                            missingParams = param.name;
                        }
                    }
                }
                return missingParams;
            };

            Operation.prototype.getBody = function (headers, args, opts) {
                var formParams = {},
                    body, key, value, hasBody = false;
                for (var i = 0; i < this.parameters.length; i += 1) {
                    var param = this.parameters[i];
                    if (args[param.name] !== undefined) {
                        if (param.in === 'body') {
                            body = args[param.name];
                        } else if (param.in === 'formData') {
                            formParams[param.name] = args[param.name];
                        }
                    } else {
                        if (param.in === 'body') {
                            hasBody = true;
                        }
                    }
                }
                // if body is null and hasBody is true, AND a JSON body is requested, send empty {}
                if (hasBody && body === undefined) {
                    var contentType = headers['Content-Type'];
                    if (contentType && contentType.indexOf('application/json') === 0) {
                        body = '{}';
                    }
                }
                // handle form params
                if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
                    var encoded = '';
                    for (key in formParams) {
                        value = formParams[key];
                        if (value !== undefined) {
                            if (encoded !== '') {
                                encoded += '&';
                            }
                            encoded += encodeURIComponent(key) + '=' + encodeURIComponent(value);
                        }
                    }
                    body = encoded;
                } else if (headers['Content-Type'] && headers['Content-Type'].indexOf('multipart/form-data') >= 0) {
                    // hack - use custom FormData for serverLocal
                    body = new local.utility2.FormData();
                    body.type = 'formData';
                    window.formParams = formParams; // debugPrint
                    Object.keys(formParams).forEach(function (key) {
                        value = args[key];
                        if (value !== undefined) {
                            // required for jquery file upload
                            if (value.type === 'file' && value.value) {
                                delete headers['Content-Type'];
                                body.append(key, value.value);
                            } else {
                                body.append(key, value);
                            }
                        }
                    });
                }
                return body;
            };

            /**
             * gets sample response for a single operation
             **/
            Operation.prototype.getModelSampleJSON = function (type, models) {
                var listType, sampleJson, innerType;
                models = models || {};
                listType = (type instanceof Array);
                innerType = listType ? type[0] : type;
                if (models[innerType]) {
                    sampleJson = models[innerType].createJSONSample();
                } else if (this.getInlineModel(innerType)) {
                    sampleJson = this.getInlineModel(innerType).createJSONSample(); // may return null, if type isn't correct
                }
                if (sampleJson) {
                    sampleJson = listType ? [sampleJson] : sampleJson;
                    if (typeof sampleJson === 'string') {
                        return sampleJson;
                    } else if (local.isObject(sampleJson)) {
                        var t = sampleJson;
                        if (sampleJson instanceof Array && sampleJson.length > 0) {
                            t = sampleJson[0];
                        }
                        if (t.nodeName) {
                            var xmlString = new XMLSerializer().serializeToString(t);
                            return xmlString;
                        } else {
                            return JSON.stringify(sampleJson, null, 2);
                        }
                    } else {
                        return sampleJson;
                    }
                }
            };

            Operation.prototype.setContentTypes = function (args, opts) {
                // default type
                var allDefinedParams = this.parameters;
                var body;
                var consumes = args.parameterContentType || 'application/json';
                var accepts = 'application/json';
                var definedFileParams = [];
                var definedFormParams = [];
                var headers = {};
                var i;
                // get params from the operation and set them in definedFileParams, definedFormParams, headers
                for (i = 0; i < allDefinedParams.length; i += 1) {
                    var param = allDefinedParams[i];
                    if (param.in === 'formData') {
                        if (param.type === 'file') {
                            definedFileParams.push(param);
                        } else {
                            definedFormParams.push(param);
                        }
                    } else if (param.in === 'header' && opts) {
                        var key = param.name;
                        var headerValue = opts[param.name];
                        if (opts[param.name] !== undefined) {
                            headers[key] = headerValue;
                        }
                    } else if (param.in === 'body' && args[param.name] !== undefined) {
                        body = args[param.name];
                    }
                }
                // if there's a body, need to set the consumes header
                if (this.method === 'post' || this.method === 'put' || this.method === 'patch' ||
                    (this.method === 'delete' && body)) {
                    // if any form params, content type must be set
                    if (definedFormParams.length > 0) {
                        if (definedFileParams.length > 0) { // if a file, must be multipart/form-data
                            consumes = 'multipart/form-data';
                        } else { // default to x-www-from-urlencoded
                            consumes = 'application/x-www-form-urlencoded';
                        }
                    }
                } else {
                    consumes = null;
                }
                if (consumes && this.consumes) {
                    if (this.consumes.indexOf(consumes) === -1) {
                        console.log('server doesn\'t consume ' + consumes + ', try ' + JSON.stringify(this.consumes));
                    }
                }
                if (!this.matchesAccept(accepts)) {
                    console.log('server can\'t produce ' + accepts);
                }
                if ((consumes && body !== '') || (consumes === 'application/x-www-form-urlencoded')) {
                    headers['Content-Type'] = consumes;
                }
                if (accepts) {
                    headers.Accept = accepts;
                }
                return headers;
            };

            /**
             * Returns true if the request accepts header matches anything in this.produces.
             *  If this.produces contains * / *, ignore the accept header.
             * @param {string=} accepts The client request accept header.
             * @return {boolean}
             */
            Operation.prototype.matchesAccept = function (accepts) {
                // no accepts or produces, no problem!
                if (!accepts || !this.produces) {
                    return true;
                }
                return this.produces.indexOf(accepts) !== -1 || this.produces.indexOf('*/*') !== -1;
            };

            Operation.prototype.encodePathCollection = function (type, name, value) {
                var encoded = '';
                var i;
                var separator = '';
                if (type === 'ssv') {
                    separator = '%20';
                } else if (type === 'tsv') {
                    separator = '\\t';
                } else if (type === 'pipes') {
                    separator = '|';
                } else {
                    separator = ',';
                }
                for (i = 0; i < value.length; i += 1) {
                    if (i === 0) {
                        encoded = this.encodeQueryParam(value[i]);
                    } else {
                        encoded += separator + this.encodeQueryParam(value[i]);
                    }
                }
                return encoded;
            };

            Operation.prototype.encodeQueryCollection = function (type, name, value) {
                var encoded = '';
                var i;
                if (type === 'default' || type === 'multi') {
                    for (i = 0; i < value.length; i += 1) {
                        if (i > 0) {
                            encoded += '&';
                        }
                        encoded += this.encodeQueryParam(name) + '=' + this.encodeQueryParam(value[i]);
                    }
                } else {
                    var separator = '';
                    if (type === 'csv') {
                        separator = ',';
                    } else if (type === 'ssv') {
                        separator = '%20';
                    } else if (type === 'tsv') {
                        separator = '\\t';
                    } else if (type === 'pipes') {
                        separator = '|';
                    } else if (type === 'brackets') {
                        for (i = 0; i < value.length; i += 1) {
                            if (i !== 0) {
                                encoded += '&';
                            }
                            encoded += this.encodeQueryParam(name) + '[]=' + this.encodeQueryParam(value[i]);
                        }
                    }
                    if (separator !== '') {
                        for (i = 0; i < value.length; i += 1) {
                            if (i === 0) {
                                encoded = this.encodeQueryParam(name) + '=' + this.encodeQueryParam(value[i]);
                            } else {
                                encoded += separator + this.encodeQueryParam(value[i]);
                            }
                        }
                    }
                }
                return encoded;
            };

            Operation.prototype.encodeQueryParam = function (arg) {
                return encodeURIComponent(arg);
            };

            /**
             * TODO revisit, might not want to leave '/'
             **/
            Operation.prototype.encodePathParam = function (pathParam) {
                return encodeURIComponent(pathParam);
            };






/* jslint-ignore-end */
            SwaggerClient = function (options) {
                var obj, self;
                self = this;
                self.authorizations = null;
                self.authorizationScheme = null;
                self.debug = false;
                self.isValid = false;
                self.modelsArray = [];
                self.resourceCount = 0;
                self.swaggerObject = {};
                self.clientAuthorizations = new auth.SwaggerAuthorizations();
                // initialize
                self.models = {};
                self.sampleModels = {};
                self.url = options.url;
                options = options || {};
                self.clientAuthorizations.add(options.authorizations);
                self.swaggerRequestHeaders = options.swaggerRequestHeaders || 'application/json;charset=utf-8,*/*';
                self.defaultSuccessCallback = options.defaultSuccessCallback || null;
                self.defaultErrorCallback = options.defaultErrorCallback || null;
                self.modelPropertyMacro = options.modelPropertyMacro || null;
                if (typeof options.success === 'function') {
                    self.success = options.success;
                }
                self.options = options || {};
                self.supportedSubmitMethods = options.supportedSubmitMethods || [];
                self.failure = options.failure || nop;
                self.progress = options.progress || nop;
                self.spec = local.utility2.jsonCopy(options.spec); // Clone so we do not alter the provided document
                if (typeof options.success !== 'function') {
                    return;
                }
                self.ready = true;
                // build
                self.progress('fetching resource list: ' + self.url);
                obj = {
                    url: self.url,
                    method: 'get',
                    headers: {
                        accept: self.swaggerRequestHeaders
                    },
                    on: {
                        error: function (response) {
                            if (self.url.substring(0, 4) !== 'http') {
                                return self.fail('Please specify the protocol for ' + self.url);
                            }
                            if (response.status === 0) {
                                return self.fail('Can\'t read from server.  It may not have the appropriate access-control-origin settings.');
                            }
                            if (response.status === 404) {
                                return self.fail('Can\'t read swagger JSON from ' + self.url);
                            }
                            return self.fail(response.status + ' : ' + response.statusText + ' ' + self.url);
                        },
                        response: function (resp) {
                            var responseObj = resp.obj;
                            if (!responseObj) {
                                return self.fail('failed to parse JSON response');
                            }
                            self.swaggerObject = responseObj;
                            new Resolver().resolve(responseObj, self.url, function (response) {
                                local.swgg.apiDictUpdate(response);
                                return self.buildFromSpec(response);
                            }, self);
                            self.isValid = true;
                        }
                    }
                };
                self.clientAuthorizations.apply(obj);
                local.utility2.ajax({
                    headers: obj.headers,
                    url: obj.url
                }, function (error, xhr) {
                    var response;
                    response = {};
                    response.data = response.statusText = xhr.responseText;
                    response.obj = {};
                    try {
                        response.obj = JSON.parse(xhr.responseText);
                    } catch (ignore) {}
                    response.status = xhr.statusCode;
                    response.statusText = xhr.responseText;
                    if (error) {
                        obj.on.error(response);
                        return;
                    }
                    obj.on.response(response);
                });
            };

            SwaggerClient.prototype.buildFromSpec = function (response) {
                var definedTags,
                    self;
                self = this;
                self.apis = {};
                // init swagger-lite
                local.swgg = local.swgg || (local.modeJs === 'browser'
                    ? local.global.swgg
                    : require('./index.js'));
                self.apisArray = [];
                self.consumes = response.consumes;
                self.produces = response.produces;
                self.title = response.title || '';
                if (response.externalDocs) {
                    self.externalDocs = response.externalDocs;
                }
                definedTags = {};
                (response.tags || []).forEach(function (element) {
                    definedTags[element.name] = element;
                });
                self.definitions = response.definitions;
                Object.keys(self.definitions).forEach(function (key) {
                    var model = new Model(key, self.definitions[key], self.models, self.modelPropertyMacro);
                    if (model) {
                        self.models[key] = model;
                    }
                });
                // get paths, create functions for each operationId
                Object.keys(response.paths).forEach(function (path) {
                    var pathObj;
                    pathObj = response.paths[path];
                    Object.keys(pathObj).forEach(function (method) {
                        var operation,
                            operationId,
                            operationObject,
                            tags;
                        operation = pathObj[method];
                        if (local.utility2.isNullOrUndefined(operation)) {
                            // Operation does not exist
                            return;
                        }
                        tags = operation.tags;
                        operationId = operation.operationId.replace(/[\s!@#$%\^&*()_+=\[{\]};:<>|.\/?,\\'""\-]/g, '_') || (path.substring(1) + '_' + method);
                        operationId = operationId.replace(/((_){2,})/g, '_');
                        operationId = operationId.replace(/^(_)*/g, '');
                        operationId = operationId.replace(/([_])*$/g, '');
                        operationObject = new Operation(self,
                            operationId,
                            method,
                            path,
                            operation,
                            self.definitions,
                            self.models,
                            self.clientAuthorizations);
                        // bind self operation's execute command to the api
                        local.forEach(tags, function (tag) {
                            var apiProperty,
                                clientProperty,
                                operationGroup,
                                tagDef;
                            clientProperty = reservedClientTags.indexOf(tag) > -1
                                ? '_' + tag
                                : tag;
                            apiProperty = reservedApiTags.indexOf(tag) > -1 ? '_' + tag : tag;
                            operationGroup = self[clientProperty];
                            if (clientProperty !== tag) {
                                console.log('The \'' + tag + '\' tag conflicts with a SwaggerClient function/property name.  Use \'client.' +
                                    clientProperty + '\' or \'client.apis.' + tag + '\' instead of \'client.' + tag + '\'.');
                            }
                            if (apiProperty !== tag) {
                                console.log('The \'' + tag + '\' tag conflicts with a SwaggerClient operation function/property name.  Use ' +
                                    '\'client.apis.' + apiProperty + '\' instead of \'client.apis.' + tag + '\'.');
                            }
                            if (reservedApiTags.indexOf(operationId) > -1) {
                                console.log('The \'' + operationId + '\' operationId conflicts with a SwaggerClient operation ' +
                                    'function/property name.  Use \'client.apis.' + apiProperty + '._' + operationId +
                                    '\' instead of \'client.apis.' + apiProperty + '.' + operationId + '\'.');
                                operationId = '_' + operationId;
                                operationObject.nickname = operationId; // So 'client.apis.[tag].operationId.help() works properly
                            }
                            if (local.utility2.isNullOrUndefined(operationGroup)) {
                                operationGroup = self[clientProperty] = self.apis[apiProperty] = {};
                                operationGroup.operations = {};
                                operationGroup.label = apiProperty;
                                operationGroup.apis = {};
                                tagDef = definedTags[tag];
                                if (!local.utility2.isNullOrUndefined(tagDef)) {
                                    operationGroup.description = tagDef.description;
                                    operationGroup.externalDocs = tagDef.externalDocs;
                                }
                                self.apisArray.push({
                                    description: operationGroup.description,
                                    externalDocs: operationGroup.externalDocs,
                                    name: tag,
                                    operation: operationObject,
                                    operationsArray: [],
                                    path: tag,
                                    tag: tag
                                });
                            }
                            // legacy UI feature
                            (self.apisArray || []).some(function (element) {
                                if (element.tag === tag) {
                                    element.operationsArray.push(operationObject);
                                    return true;
                                }
                            });
                        });
                    });
                });
                if (self.success) {
                    self.isValid = true;
                    self.success();
                }
                return self;
            };

            SwaggerClient.prototype.fail = function (message) {
                this.failure(message);
                throw message;
            };





            SwaggerClient.ApiKeyAuthorization = auth.ApiKeyAuthorization;
            SwaggerClient.SchemaMarkup = SchemaMarkup;
            if (local.modeJs === 'browser') {
                window.SwaggerClient = SwaggerClient;
            } else {
                module.exports = SwaggerClient;
            }
        }());
    }());
    switch (local.modeJs) {



    // run browser js-env code
    case 'browser':
        // init lib backbone
        // https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone.js
        // Backbone.js 1.1.2
        // (c) 2010-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
        // Backbone may be freely distributed under the MIT license.
        // For all details and documentation:
        // http://backbonejs.org
        local.Backbone = {};
        local.Backbone.View = local.Backbone._View = function (options) {
        // Backbone.View
        // -------------
        // Backbone Views are almost more convention than they are actual code. A View
        // is simply a JavaScript object that represents a logical chunk of UI in the
        // DOM. This might be a single item, an entire list, a sidebar or panel, or
        // even the surrounding frame which wraps your whole app. Defining a chunk of
        // UI as a **View** allows you to define your DOM events declaratively, without
        // having to worry about render order ... and makes it easy for the view to
        // react to specific changes in the state of your models.
        // Creating a Backbone.View creates its initial element outside of the DOM,
        // if an existing element is not provided...
            var self;
            self = this;
            self.cid = local.utility2.uuidTimeCreate();
            local.utility2.objectSetOverride(self, options);
            self._ensureElement();
            if (self.initialize) {
                self.initialize.apply(self, arguments);
            }
            if (!self.events) {
                return;
            }
            // delegateEventa
            Object.keys(self.events).forEach(function (key) {
                var match = key.match(/^(\S+)\s*(.*)$/);
                self.$el.on(
                    match[1] + '.delegateEvents' + self.cid,
                    match[2],
                    self[self.events[key]].bind(self)
                );
            });
        };
        local.Backbone.View.prototype._ensureElement = function () {
        // Ensure that the View has a DOM element to render into.
        // If `this.el` is a string, pass it through `$()`, take the first
        // matching element, and re-assign it to `el`. Otherwise, create
        // an element from the `id`, `className` and `tagName` properties.
            if (this.el) {
                this.setElement(this.el, false);
                return;
            }
            var attrs = local.utility2.objectSetOverride({}, this.attributes || {});
            if (this.id) {
                attrs.id = this.id;
            }
            if (this.className) {
                attrs.class = this.className;
            }
            this.setElement(
                local.jQuery('<' + this.tagName + '>').attr(attrs),
                false
            );
        };
        local.Backbone.View.prototype.on = function (name, callback, context) {
        // Bind an event to a `callback` function. Passing `"all"` will bind
        // the callback to all events fired.
            this._events = this._events || {};
            this._events[name] =  this._events[name] || [];
            this._events[name].push({
                callback: callback,
                context: context,
                ctx: context || this
            });
            return this;
        };
        local.Backbone.View.prototype.setElement = function (element) {
        // Change the view's element (`this.el` property), including event
        // re-delegation.
            this.$el = local.jQuery(element);
            this.el = this.$el[0];
            return this;
        };
        // The default `tagName` of a View's element is `"div"`.
        local.Backbone.View.prototype.tagName = 'div';
        local.Backbone.View.prototype.trigger = function (name, options) {
        // Trigger one or many events, firing all bound callbacks. Callbacks are
        // passed the same arguments as `trigger` is, apart from the event name
        // (unless you're listening on `"all"`, which will cause your callback to
        // receive the true name of the event as the first argument).
            this._events[name].forEach(function (event) {
                event.callback.call(event.ctx, options);
            });
            return this;
        };
        local.Backbone.View.extend = function (protoProps) {
        // Helper function to correctly set up the prototype chain, for subclasses.
        // Similar to `goog.inherits`, but uses a hash of prototype properties and
        // class properties to be extended.
            var Surrogate, child, parent;
            parent = this;
            // The constructor function for the new subclass is either defined by you
            // (the "constructor" property in your `extend` definition), or defaulted
            // by us to simply call the parent's constructor.
            if (protoProps && protoProps.hasOwnProperty('constructor')) {
                child = protoProps.constructor;
            } else {
                child = function () {
                    return parent.apply(this, arguments);
                };
            }
            // Add static properties to the constructor function, if supplied.
            local.utility2.objectSetOverride(child, parent);
            // Set the prototype chain to inherit from `parent`, without calling
            // `parent`'s constructor function.
            Surrogate = function () {
                this.constructor = child;
            };
            Surrogate.prototype = parent.prototype;
            child.prototype = new Surrogate();
            // Add prototype properties (instance properties) to the subclass,
            // if supplied.
            local.utility2.objectSetOverride(child.prototype, protoProps);
            return child;
        };
        local.Backbone.View = local.Backbone._View.extend({
            constructor: function (options) {
                this.options = options;
                local.Backbone._View.apply(this, arguments);
            }
        });



        // init lib handlebars
        // https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/2.0.0/handlebars.js
        local.Handlebars = {};
        local.Handlebars.helpers = {};
        local.Handlebars.partials = {};
        local.Handlebars.registerHelper = function (name, fn) {
            local.Handlebars.helpers[name] = fn;
        };
        local.Handlebars.registerHelper('blockHelperMissing', function (context, options) {
            return options.fn(context, options);
        });
        local.Handlebars.registerHelper('each', function (context, options) {
            var i = 0, j, ret = '', data;
            data = local.utility2.objectSetOverride({}, options.data);
            if (context && typeof context === 'object') {
                for (j = context.length; i < j; i += 1) {
                    ret = ret + options.fn(context[i], { data: data });
                }
            }
            if (i === 0) {
                ret = (options.inverse || nop)(this);
            }
            return ret;
        });
        local.Handlebars.registerHelper('if', function (conditional, options) {
            if (!conditional ||
                    (Array.isArray(conditional) && conditional.length === 0)) {
                return (options.inverse || nop)(this);
            }
            return options.fn(this);
        });
        local.Handlebars.registerHelper('unless', function (conditional, options) {
            return local.Handlebars.helpers['if'].call(this, conditional, {
                fn: options.inverse || nop,
                inverse: options.fn,
                hash: options.hash
            });
        });
        local.Handlebars.template = function (templateSpec) {
            var container;
            container = {
                lambda: function (current) {
                    return current;
                },
                fn: function (i) {
                    return templateSpec[i];
                },
                programs: [],
                program: function (i, data, depths) {
                    var self = this;
                    return function (context, options) {
                        options = options || {};
                        return self.fn(i).call(
                            self,
                            context,
                            self.helpers,
                            self.partials,
                            options.data || data,
                            depths
                        );
                    };
                }
            };
            return function (context) {
                var data;
                container.helpers = local.Handlebars.helpers;
                data = { root: context };
                return templateSpec.main.call(
                    container,
                    context,
                    container.helpers,
                    container.partials,
                    data
                );
            };
        };



        // init lib swagger-ui
        (function () {
            // https://github.com/swagger-api/swagger-ui/blob/v2.1.2/dist/swagger-ui.js
            /**
             * swagger-ui - Swagger UI is a dependency-free collection of HTML, JavaScript, and CSS assets that dynamically generate beautiful documentation from a Swagger-compliant API
             * @version v2.1.2
             * @link http://swagger.io
             * @license Apache-2.0
             */
            var SwaggerUi;
            SwaggerUi = window.SwaggerUi = function (options) {
                options = options || {};
                // Allow dom_id to be overridden
                if (options.dom_id) {
                    this.dom_id = options.dom_id;
                    delete options.dom_id;
                }
                if (!options.supportedSubmitMethods) {
                    options.supportedSubmitMethods = [
                        'get',
                        'put',
                        'post',
                        'delete',
                        'head',
                        'options',
                        'patch'
                    ];
                }
                if (typeof options.oauth2RedirectUrl === 'string') {
                    window.oAuthRedirectUrl = options.redirectUrl;
                }
                // Create an empty div which contains the dom_id
                if (!local.jQuery('#' + this.dom_id).length) {
                    local.jQuery('body').append('<div id="' + this.dom_id + '"></div>');
                }
                this.options = options;
                // Set the callbacks
                var that = this;
                this.options.success = function () {
                    return that.render();
                };
                this.options.progress = function (d) {
                    return that.showMessage(d);
                };
                // shows message in red
                this.options.failure = function (data) {
                    if (data === undefined) {
                        data = '';
                    }
                    local.jQuery('#message-bar').removeClass('message-success');
                    local.jQuery('#message-bar').addClass('message-fail');
                    var val = local.jQuery('#message-bar').text(data);
                    if (that.options.onFailure) {
                        that.options.onFailure(data);
                    }
                    return val;
                };
                // Create view to handle the header inputs
                this.headerView = new SwaggerUi.Views.HeaderView({
                    el: local.jQuery('#header')
                });
                // Event handler for when the baseUrl/apiKey is entered by user
                this.headerView.on('update-swagger-ui', function (data) {
                    return that.updateSwaggerUi(data);
                });
            };
/* jslint-ignore-begin */
            window.SwaggerUi.prototype = {
                dom_id: 'swagger_ui',
                // Attributes
                options: null,
                api: null,
                headerView: null,
                mainView: null,
                // SwaggerUi accepts all the same options as SwaggerApi
                initialize: function (options) {
                },
                // Set an option after initializing
                setOption: function (option, value) {
                    this.options[option] = value;
                },
                // Get the value of a previously set option
                getOption: function (option) {
                    return this.options[option];
                },
                // Event handler for when url/key is received from user
                updateSwaggerUi: function (data) {
                    this.options.url = data.url;
                    this.load();
                },
                // Create an api and render
                load: function () {
                    // Initialize the API object
                    if (this.mainView) {
                        this.mainView.clear();
                    }
                    var url = this.options.url;
                    if (url && url.indexOf('http') !== 0) {
                        url = this.buildUrl(window.location.href.toString(), url);
                    }
                    if (this.api) {
                        this.options.authorizations = this.api.clientAuthorizations.authz;
                    }
                    this.options.url = url;
                    this.headerView.update(url);
                    this.api = new SwaggerClient(this.options);
                },
                // collapse all sections
                collapseAll: function () {
                    Docs.collapseEndpointListForResource('');
                },
                // list operations for all sections
                listAll: function () {
                    Docs.collapseOperationsForResource('');
                },
                // expand operations for all sections
                expandAll: function () {
                    Docs.expandOperationsForResource('');
                },
                // This is bound to success handler for SwaggerApi
                //  so it gets called when SwaggerApi completes loading
                render: function () {
                    this.showMessage('Finished Loading Resource Information. Rendering Swagger UI...');
                    this.mainView = new SwaggerUi.Views.MainView({
                        model: this.api,
                        el: local.jQuery('#' + this.dom_id),
                        swaggerOptions: this.options,
                    }).render();
                    this.showMessage();
                    switch (this.options.docExpansion) {
                    case 'full':
                        this.expandAll();
                        break;
                    case 'list':
                        this.listAll();
                        break;
                    default:
                        break;
                    }
                    if (this.options.onComplete) {
                        this.options.onComplete(this.api, this);
                    }
                    setTimeout(Docs.shebang.bind(this), 100);
                },
                buildUrl: function (base, url) {
                    if (url.indexOf('/') === 0) {
                        var parts = base.split('/');
                        base = parts[0] + '//' + parts[2];
                        return base + url;
                    } else {
                        var endOfPath = base.length;
                        if (base.indexOf('?') > -1) {
                            endOfPath = Math.min(endOfPath, base.indexOf('?'));
                        }
                        if (base.indexOf('#') > -1) {
                            endOfPath = Math.min(endOfPath, base.indexOf('#'));
                        }
                        base = base.substring(0, endOfPath);
                        if (base.indexOf('/', base.length - 1) !== -1) {
                            return base + url;
                        }
                        return base + '/' + url;
                    }
                },
                // Shows message on topbar of the ui
                showMessage: function (data) {
                    if (data === undefined) {
                        data = '';
                    }
                    var $msgbar = local.jQuery('#message-bar');
                    $msgbar.removeClass('message-fail');
                    $msgbar.addClass('message-success');
                    $msgbar.html(data);
                }
            };
            window.SwaggerUi.Views = {};
            local.Handlebars.templates = local.Handlebars.templates || {};
            local.Handlebars.templates.content_type = local.Handlebars.template({
                "1": function (depth0, helpers, partials, data) {
                    var stack1, buffer = "";
                    stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.produces : depth0), {
                        "name": "each",
                        "hash": {},
                        "fn": this.program(2, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    return buffer;
                },
                "2": function (depth0, helpers, partials, data) {
                    var stack1, lambda = this.lambda,
                        buffer = "	<option value=\"";
                    stack1 = lambda(depth0, depth0);
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    buffer += "\">";
                    stack1 = lambda(depth0, depth0);
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    return buffer + "</option>\n";
                },
                "4": function (depth0, helpers, partials, data) {
                    return "  <option value=\"application/json\">application/json</option>\n";
                },
                "main": function (depth0, helpers, partials, data) {
                    var stack1, helper, functionType = "function",
                        buffer = "<label for=\"" + local.utility2.stringHtmlSafe(((helper = helpers.contentTypeId || (depth0 != null ? depth0.contentTypeId : depth0)), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "contentTypeId",
                            "hash": {},
                            "data": data
                        }) : helper))) + "\">Response Content Type</label>\n<select name=\"contentType\" id=\"" + local.utility2.stringHtmlSafe(((helper = helpers.contentTypeId || (depth0 != null ? depth0.contentTypeId : depth0)), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "contentTypeId",
                            "hash": {},
                            "data": data
                        }) : helper))) + "\">\n";
                    stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.produces : depth0), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(1, data),
                        "inverse": this.program(4, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    return buffer + "</select>\n";
                },
                "useData": true
            });
            local.jQuery(function () {
                // Helper function for vertically aligning DOM elements
                // http://www.seodenver.com/simple-vertical-align-plugin-for-jquery/
                local.jQuery.fn.vAlign = function () {
                    return this.each(function () {
                        var ah = local.jQuery(this).height();
                        var ph = local.jQuery(this).parent().height();
                        var mh = (ph - ah) / 2;
                        local.jQuery(this).css('margin-top', mh);
                    });
                };
                local.jQuery.fn.stretchFormtasticInputWidthToParent = function () {
                    return this.each(function () {
                        var p_width = local.jQuery(this).closest("form").innerWidth();
                        var p_padding = parseInt(local.jQuery(this).closest("form").css('padding-left'), 10) + parseInt(local.jQuery(this).closest('form').css('padding-right'), 10);
                        var this_padding = parseInt(local.jQuery(this).css('padding-left'), 10) + parseInt(local.jQuery(this).css('padding-right'), 10);
                        local.jQuery(this).css('width', p_width - p_padding - this_padding);
                    });
                };
                local.jQuery('form.formtastic li.string input, form.formtastic textarea').stretchFormtasticInputWidthToParent();
                // Vertically center these paragraphs
                // Parent may need a min-height for this to work..
                local.jQuery('ul.downplayed li div.content p').vAlign();
            });
            function clippyCopiedCallback() {
                local.jQuery('#api_key_copied').fadeIn().delay(1000).fadeOut();
                // var b = local.jQuery("#clippy_tooltip_" + a);
                // b.length != 0 && (b.attr("title", "copied!").trigger("tipsy.reload"), setTimeout(function () {
                //   b.attr("title", "copy to clipboard")
                // },
                // 500))
            }
            window.Docs = {
                shebang: function () {
                    // If shebang has an operation nickname in it..
                    // e.g. /docs/#!/words/get_search
                    var fragments = location.hash.slice(1).split('/').map(function (element) {
                        return element.replace((/%2F/g), '\\/');
                    });
                    fragments.shift(); // get rid of the bang
                    function slideTo (self) {
                        self.each(function () {
                            local.jQuery('body').animate({
                                scrollTop: local.jQuery(this).offset().top
                            }, 'slow', function () {
                            })
                        })
                    }
                    switch (fragments.length) {
                    case 1:
                        if (fragments[0].length > 0) { // prevent matching "#/"
                            // Expand all operations for the resource and scroll to it
                            var dom_id = 'resource_' + fragments[0];
                            Docs.expandEndpointListForResource(fragments[0]);
                            slideTo(local.jQuery("#" + dom_id));
                        }
                        break;
                    case 2:
                        // Refer to the endpoint DOM element, e.g. #words_get_search
                        // Expand Resource
                        Docs.expandEndpointListForResource(fragments[0]);
                        slideTo(local.jQuery("#" + dom_id));
                        // Expand operation
                        var li_dom_id = fragments.join('_');
                        var li_content_dom_id = li_dom_id + "_content";
                        Docs.expandOperation(local.jQuery('#' + li_content_dom_id));
                        slideTo(local.jQuery('#' + li_dom_id))
                        break;
                    }
                },
                toggleEndpointListForResource: function (resource) {
                    var elem = local.jQuery('li#resource_' + Docs.escapeResourceName(resource) + ' ul.endpoints');
                    if (elem.is(':visible')) {
                        Docs.collapseEndpointListForResource(resource);
                    } else {
                        Docs.expandEndpointListForResource(resource);
                    }
                },
                // Expand resource
                expandEndpointListForResource: function (resource) {
                    var resource = Docs.escapeResourceName(resource.replace((/\\\//g), '/'));
                    if (resource == '') {
                        local.jQuery('.resource ul.endpoints').slideDown();
                        return;
                    }
                    local.jQuery('li#resource_' + resource).addClass('active');
                    var elem = local.jQuery('li#resource_' + resource + ' ul.endpoints');
                    elem.slideDown();
                },
                // Collapse resource and mark as explicitly closed
                collapseEndpointListForResource: function (resource) {
                    var resource = Docs.escapeResourceName(resource);
                    if (resource == '') {
                        local.jQuery('.resource ul.endpoints').slideUp();
                        return;
                    }
                    local.jQuery('li#resource_' + resource).removeClass('active');
                    var elem = local.jQuery('li#resource_' + resource + ' ul.endpoints');
                    elem.slideUp();
                },
                expandOperationsForResource: function (resource) {
                    // Make sure the resource container is open..
                    Docs.expandEndpointListForResource(resource);
                    if (resource == '') {
                        local.jQuery('.resource ul.endpoints li.operation div.content').slideDown();
                        return;
                    }
                    local.jQuery('li#resource_' + Docs.escapeResourceName(resource) + ' li.operation div.content').each(function () {
                        Docs.expandOperation(local.jQuery(this));
                    });
                },
                collapseOperationsForResource: function (resource) {
                    // Make sure the resource container is open..
                    Docs.expandEndpointListForResource(resource);
                    if (resource == '') {
                        local.jQuery('.resource ul.endpoints li.operation div.content').slideUp();
                        return;
                    }
                    local.jQuery('li#resource_' + Docs.escapeResourceName(resource) + ' li.operation div.content').each(function () {
                        Docs.collapseOperation(local.jQuery(this));
                    });
                },
                escapeResourceName: function (resource) {
                    return resource.replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]\^`{|}~]/g, "\\$&");
                },
                expandOperation: function (elem) {
                    elem.slideDown();
                },
                collapseOperation: function (elem) {
                    elem.slideUp();
                }
            };
            local.Handlebars.registerHelper('sanitize', function (html) {
                // Strip the script tags from the html, and return it as a string
                html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
                return String(html);
            });
            local.Handlebars.registerHelper('renderTextParam', function (param) {
                var result, type = 'text',
                    idAtt = '';
                var isArray = param.type.toLowerCase() === 'array' || param.allowMultiple;
                var defaultValue = isArray && Array.isArray(param.default) ? param.default.join('\n') : param.default;
                var dataVendorExtensions = Object.keys(param).filter(function (property) {
                    // filter X-data- properties
                    return property.match(/^X-data-/i) !== null;
                }).reduce(function (result, property) {
                    // remove X- from property name, so it results in html attributes like data-foo='bar'
                    return result += ' ' + property.substring(2, property.length) + '=\'' + param[property] + '\'';
                }, '');
                if (defaultValue === undefined) {
                    defaultValue = '';
                }
                if (param.format && param.format === 'password') {
                    type = 'password';
                }
                if (param.valueId) {
                    idAtt = ' id=\'' + param.valueId + '\'';
                }
                if (isArray) {
                    result = '<textarea class=\'body-textarea' + (param.required ? ' required' : '') + '\' name=\'' + param.name + '\'' + idAtt + dataVendorExtensions;
                    result += ' placeholder=\'Provide multiple values in new lines' + (param.required ? ' (at least one required).' : '.') + '\'>';
                    result += defaultValue + '</textarea>';
                } else {
                    var parameterClass = 'parameter';
                    if (param.required) {
                        parameterClass += ' required';
                    }
                    result = '<input class=\'' + parameterClass + '\' minlength=\'' + (param.required ? 1 : 0) + '\'';
                    result += ' name=\'' + param.name + '\' placeholder=\'' + (param.required ? '(required)' : '') + '\'' + idAtt + dataVendorExtensions;
                    result += ' type=\'' + type + '\' value=\'' + defaultValue + '\'/>';
                }
                return String(result);
            });
            local.Handlebars.templates.main = local.Handlebars.template({
                "1": function (depth0, helpers, partials, data) {
                    var stack1, lambda = this.lambda,
                        buffer = "  <div class=\"info_title\">" + local.utility2.stringHtmlSafe(lambda(((stack1 = local.swgg.swaggerJson.info) != null ? stack1.title : stack1), depth0)) + "</div>\n  <div class=\"info_description markdown\">";
                    stack1 = lambda(((stack1 = local.swgg.swaggerJson.info) != null ? stack1.description : stack1), depth0);
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    buffer += "</div>\n";
                    stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.externalDocs : depth0), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(2, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    buffer += "  ";
                    stack1 = helpers.if.call(depth0, ((stack1 = local.swgg.swaggerJson.info) != null ? stack1.termsOfServiceUrl : stack1), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(4, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    buffer += "\n  ";
                    stack1 = helpers.if.call(depth0, ((stack1 = ((stack1 = local.swgg.swaggerJson.info) != null ? stack1.contact : stack1)) != null ? stack1.name : stack1), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(6, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    buffer += "\n  ";
                    stack1 = helpers.if.call(depth0, ((stack1 = ((stack1 = local.swgg.swaggerJson.info) != null ? stack1.contact : stack1)) != null ? stack1.url : stack1), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(8, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    buffer += "\n  ";
                    stack1 = helpers.if.call(depth0, ((stack1 = ((stack1 = local.swgg.swaggerJson.info) != null ? stack1.contact : stack1)) != null ? stack1.email : stack1), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(10, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    buffer += "\n  ";
                    stack1 = helpers.if.call(depth0, ((stack1 = local.swgg.swaggerJson.info) != null ? stack1.license : stack1), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(12, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    return buffer + "\n";
                },
                "2": function (depth0, helpers, partials, data) {
                    var stack1, lambda = this.lambda;
                    return "  <p>" + local.utility2.stringHtmlSafe(lambda(((stack1 = (depth0 != null ? depth0.externalDocs : depth0)) != null ? stack1.description : stack1), depth0)) + "</p>\n  <a href=\"" + local.utility2.stringHtmlSafe(lambda(((stack1 = (depth0 != null ? depth0.externalDocs : depth0)) != null ? stack1.url : stack1), depth0)) + "\" target=\"_blank\">" + local.utility2.stringHtmlSafe(lambda(((stack1 = (depth0 != null ? depth0.externalDocs : depth0)) != null ? stack1.url : stack1), depth0)) + "</a>\n";
                },
                "4": function (depth0, helpers, partials, data) {
                    var stack1, lambda = this.lambda;
                    return "<div class=\"info_tos\"><a href=\"" + local.utility2.stringHtmlSafe(lambda(((stack1 = local.swgg.swaggerJson.info) != null ? stack1.termsOfServiceUrl : stack1), depth0)) + "\">Terms of service</a></div>";
                },
                "6": function (depth0, helpers, partials, data) {
                    var stack1, lambda = this.lambda;
                    return "<div class='info_name'>Created by " + local.utility2.stringHtmlSafe(lambda(((stack1 = ((stack1 = local.swgg.swaggerJson.info) != null ? stack1.contact : stack1)) != null ? stack1.name : stack1), depth0)) + "</div>";
                },
                "8": function (depth0, helpers, partials, data) {
                    var stack1, lambda = this.lambda;
                    return "<div class='info_url'>See more at <a href=\"" + local.utility2.stringHtmlSafe(lambda(((stack1 = ((stack1 = local.swgg.swaggerJson.info) != null ? stack1.contact : stack1)) != null ? stack1.url : stack1), depth0)) + "\">" + local.utility2.stringHtmlSafe(lambda(((stack1 = ((stack1 = local.swgg.swaggerJson.info) != null ? stack1.contact : stack1)) != null ? stack1.url : stack1), depth0)) + "</a></div>";
                },
                "10": function (depth0, helpers, partials, data) {
                    var stack1, lambda = this.lambda;
                    return "<div class='info_email'><a href=\"mailto:" + local.utility2.stringHtmlSafe(lambda(((stack1 = ((stack1 = local.swgg.swaggerJson.info) != null ? stack1.contact : stack1)) != null ? stack1.email : stack1), depth0)) + "?subject=" + local.utility2.stringHtmlSafe(lambda(((stack1 = local.swgg.swaggerJson.info) != null ? stack1.title : stack1), depth0)) + "\">Contact the developer</a></div>";
                },
                "12": function (depth0, helpers, partials, data) {
                    var stack1, lambda = this.lambda;
                    return "<div class='info_license'><a href='" + local.utility2.stringHtmlSafe(lambda(((stack1 = ((stack1 = local.swgg.swaggerJson.info) != null ? stack1.license : stack1)) != null ? stack1.url : stack1), depth0)) + "'>" + local.utility2.stringHtmlSafe(lambda(((stack1 = ((stack1 = local.swgg.swaggerJson.info) != null ? stack1.license : stack1)) != null ? stack1.name : stack1), depth0)) + "</a></div>";
                },
                "14": function (depth0, helpers, partials, data) {
                    var stack1, lambda = this.lambda;
                    return "  , <span style=\"font-variant: small-caps\">api version</span>: " + local.utility2.stringHtmlSafe(lambda(((stack1 = local.swgg.swaggerJson.info) != null ? stack1.version : stack1), depth0)) + "\n    ";
                },
                "main": function (depth0, helpers, partials, data) {
                    var stack1, helper, functionType = "function",
                        buffer = "<div class='info' id='api_info'>\n";
                    stack1 = helpers.if.call(depth0, local.swgg.swaggerJson.info, {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(1, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    buffer += "</div>\n<div class='container' id='resources_container'>\n  <ul id='resources'></ul>\n\n  <div class=\"footer\">\n    <h4 style=\"color: #999\">[ <span style=\"font-variant: small-caps\">base url</span>: " + local.utility2.stringHtmlSafe(local.swgg.swaggerJson.basePath) + "\n";
                    stack1 = helpers.if.call(depth0, ((stack1 = local.swgg.swaggerJson.info) != null ? stack1.version : stack1), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(14, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    buffer += "]\n";
                    return buffer + "    </h4>\n    </div>\n</div>\n";
                },
                "useData": true
            });
            local.Handlebars.templates.operation = local.Handlebars.template({
                "1": function (depth0, helpers, partials, data) {
                    return "deprecated";
                },
                "3": function (depth0, helpers, partials, data) {
                    return "            <h4>Warning: Deprecated</h4>\n";
                },
                "5": function (depth0, helpers, partials, data) {
                    var stack1, helper, functionType = "function",
                        buffer = "        <h4>Implementation Notes</h4>\n        <div class=\"markdown\">";
                    stack1 = ((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "description",
                        "hash": {},
                        "data": data
                    }) : helper));
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    return buffer + "</div>\n";
                },
                "16": function (depth0, helpers, partials, data) {
                    var helper, functionType = "function";
                    return "          <h4><span>Response Class</span> (<span>Status</span> " + local.utility2.stringHtmlSafe(((helper = (helper = helpers.successCode || (depth0 != null ? depth0.successCode : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "successCode",
                        "hash": {},
                        "data": data
                    }) : helper))) + ")</h4>\n          <p><span class=\"model-signature\" /></p>\n          <br/>\n          <div class=\"response-content-type\" />\n";
                },
                "18": function (depth0, helpers, partials, data) {
                    return "          <h4>Parameters</h4>\n          <table class='fullwidth'>\n          <thead>\n            <tr>\n            <th style=\"width: 100px; max-width: 100px\">Parameter</th>\n            <th style=\"width: 310px; max-width: 310px\">Value</th>\n            <th style=\"width: 200px; max-width: 200px\">Description</th>\n            <th style=\"width: 100px; max-width: 100px\">Parameter Type</th>\n            <th style=\"width: 220px; max-width: 230px\">Data Type</th>\n            </tr>\n          </thead>\n          <tbody class=\"operation-params\">\n\n          </tbody>\n          </table>\n";
                },
                "20": function (depth0, helpers, partials, data) {
                    return "          <div style='margin:0;padding:0;display:inline'></div>\n          <h4>Response Messages</h4>\n          <table class='fullwidth'>\n            <thead>\n            <tr>\n              <th>HTTP Status Code</th>\n              <th>Reason</th>\n              <th>Response Model</th>\n              <th>Headers</th>\n            </tr>\n            </thead>\n            <tbody class=\"operation-status\">\n\n            </tbody>\n          </table>\n";
                },
                "22": function (depth0, helpers, partials, data) {
                    return "";
                },
                "24": function (depth0, helpers, partials, data) {
                    return "          <div class='sandbox_header'>\n            <input class='submit' type='button' value='Try it out!'/>\n            <a href='#' class='response_hider' style='display:none'>Hide Response</a>\n          </div>\n";
                },
                "26": function (depth0, helpers, partials, data) {
                    return "          <h4>Request Headers</h4>\n          <div class='block request_headers'></div>\n";
                },
                "main": function (depth0, helpers, partials, data) {
                    var stack1, helper, options, functionType = "function",
                        blockHelperMissing = helpers.blockHelperMissing,
                        buffer = "\n  <ul class='operations' >\n    <li class='" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.method || (depth0 != null ? depth0.method : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "method",
                            "hash": {},
                            "data": data
                        }) : helper))) + " operation' id='" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.parentId || (depth0 != null ? depth0.parentId : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "parentId",
                            "hash": {},
                            "data": data
                        }) : helper))) + "_" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.nickname || (depth0 != null ? depth0.nickname : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "nickname",
                            "hash": {},
                            "data": data
                        }) : helper))) + "'>\n      <div class='heading'>\n        <h3>\n          <span class='http_method'>\n          <a href='#!/" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.encodedParentId || (depth0 != null ? depth0.encodedParentId : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "encodedParentId",
                            "hash": {},
                            "data": data
                        }) : helper))) + "/" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.nickname || (depth0 != null ? depth0.nickname : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "nickname",
                            "hash": {},
                            "data": data
                        }) : helper))) + "' class=\"toggleOperation\">" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.method || (depth0 != null ? depth0.method : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "method",
                            "hash": {},
                            "data": data
                        }) : helper))) + "</a>\n          </span>\n          <span class='path'>\n          <a href='#!/" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.encodedParentId || (depth0 != null ? depth0.encodedParentId : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "encodedParentId",
                            "hash": {},
                            "data": data
                        }) : helper))) + "/" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.nickname || (depth0 != null ? depth0.nickname : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "nickname",
                            "hash": {},
                            "data": data
                        }) : helper))) + "' class=\"toggleOperation ";
                    stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.deprecated : depth0), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(1, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    buffer += "\">" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "path",
                        "hash": {},
                        "data": data
                    }) : helper))) + "</a>\n          </span>\n        </h3>\n        <ul class='options'>\n          <li>\n          <a href='#!/" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.encodedParentId || (depth0 != null ? depth0.encodedParentId : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "encodedParentId",
                        "hash": {},
                        "data": data
                    }) : helper))) + "/" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.nickname || (depth0 != null ? depth0.nickname : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "nickname",
                        "hash": {},
                        "data": data
                    }) : helper))) + "' class=\"toggleOperation\">";
                    stack1 = ((helper = (helper = helpers.summary || (depth0 != null ? depth0.summary : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "summary",
                        "hash": {},
                        "data": data
                    }) : helper));
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    buffer += "</a>\n          </li>\n        </ul>\n      </div>\n      <div class='content' id='" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.parentId || (depth0 != null ? depth0.parentId : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "parentId",
                        "hash": {},
                        "data": data
                    }) : helper))) + "_" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.nickname || (depth0 != null ? depth0.nickname : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "nickname",
                        "hash": {},
                        "data": data
                    }) : helper))) + "_content' style='display:none'>\n";
                    stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.deprecated : depth0), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(3, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.description : depth0), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(5, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.type : depth0), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(16, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    buffer += "        <form accept-charset='UTF-8' class='sandbox'>\n          <div style='margin:0;padding:0;display:inline'></div>\n";
                    stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.parameters : depth0), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(18, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.responseMessages : depth0), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(20, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.isReadOnly : depth0), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(22, data),
                        "inverse": this.program(24, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    buffer += "        </form>\n        <div class='response' style='display:none'>\n          <h4>Curl</h4>\n          <div class='block curl'></div>\n          <h4>Request URL</h4>\n          <div class='block request_url'></div>\n";
                    stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.showRequestHeaders : depth0), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(26, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    return buffer + "          <h4>Response Body</h4>\n          <div class='block response_body'></div>\n          <h4>Response Code</h4>\n          <div class='block response_code'></div>\n          <h4>Response Headers</h4>\n          <div class='block response_headers'></div>\n        </div>\n      </div>\n    </li>\n  </ul>\n";
                },
                "useData": true
            });
            local.Handlebars.templates.param = local.Handlebars.template({
                "1": function (depth0, helpers, partials, data) {
                    var stack1, buffer = "";
                    stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.isFile : depth0), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(2, data),
                        "inverse": this.program(4, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    return buffer;
                },
                "2": function (depth0, helpers, partials, data) {
                    var helper, functionType = "function";
                    return "			<input type=\"file\" name='" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "name",
                        "hash": {},
                        "data": data
                    }) : helper))) + "' id='" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.valueId || (depth0 != null ? depth0.valueId : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "valueId",
                        "hash": {},
                        "data": data
                    }) : helper))) + "'/>\n			<div class=\"parameter-content-type\" />\n";
                },
                "4": function (depth0, helpers, partials, data) {
                    var stack1, buffer = "";
                    stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.default : depth0), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(5, data),
                        "inverse": this.program(7, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    return buffer;
                },
                "5": function (depth0, helpers, partials, data) {
                    var helper, functionType = "function";
                    return "				<textarea class='body-textarea' name='" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "name",
                        "hash": {},
                        "data": data
                    }) : helper))) + "' id='" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.valueId || (depth0 != null ? depth0.valueId : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "valueId",
                        "hash": {},
                        "data": data
                    }) : helper))) + "'>" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.default || (depth0 != null ? depth0.default : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "default",
                        "hash": {},
                        "data": data
                    }) : helper))) + "</textarea>\n        <br />\n        <div class=\"parameter-content-type\" />\n";
                },
                "7": function (depth0, helpers, partials, data) {
                    var helper, functionType = "function";
                    return "				<textarea class='body-textarea' name='" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "name",
                        "hash": {},
                        "data": data
                    }) : helper))) + "' id='" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.valueId || (depth0 != null ? depth0.valueId : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "valueId",
                        "hash": {},
                        "data": data
                    }) : helper))) + "'></textarea>\n				<br />\n				<div class=\"parameter-content-type\" />\n";
                },
                "9": function (depth0, helpers, partials, data) {
                    var stack1, buffer = "";
                    stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.isFile : depth0), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(2, data),
                        "inverse": this.program(10, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    return buffer;
                },
                "10": function (depth0, helpers, partials, data) {
                    var stack1, buffer = "";
                    stack1 = ((helpers.renderTextParam || (depth0 && depth0.renderTextParam) || nop).call(depth0, depth0, {
                        "name": "renderTextParam",
                        "hash": {},
                        "fn": this.program(11, data),
                        "data": data
                    }));
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    return buffer;
                },
                "11": function (depth0, helpers, partials, data) {
                    return "";
                },
                "main": function (depth0, helpers, partials, data) {
                    var stack1, helper, functionType = "function",
                        buffer = "<td class='code'><label for='" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.valueId || (depth0 != null ? depth0.valueId : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "valueId",
                            "hash": {},
                            "data": data
                        }) : helper))) + "'>" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "name",
                            "hash": {},
                            "data": data
                        }) : helper))) + "</label></td>\n<td>\n\n";
                    stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.isBody : depth0), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(1, data),
                        "inverse": this.program(9, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    buffer += "\n</td>\n<td class=\"markdown\">";
                    stack1 = ((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "description",
                        "hash": {},
                        "data": data
                    }) : helper));
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    buffer += "</td>\n<td>";
                    stack1 = ((helper = (helper = helpers.paramType || (depth0 != null ? depth0.paramType : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "paramType",
                        "hash": {},
                        "data": data
                    }) : helper));
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    return buffer + "</td>\n<td>\n	<span class=\"model-signature\"></span>\n</td>\n";
                },
                "useData": true
            });
            local.Handlebars.templates.param_list = local.Handlebars.template({
                "1": function (depth0, helpers, partials, data) {
                    return " required";
                },
                "3": function (depth0, helpers, partials, data) {
                    return " multiple=\"multiple\"";
                },
                "5": function (depth0, helpers, partials, data) {
                    return " required ";
                },
                "7": function (depth0, helpers, partials, data) {
                    var stack1, buffer = "      <option ";
                    stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.hasDefault : depth0), {
                        "name": "unless",
                        "hash": {},
                        "fn": this.program(8, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    return buffer + " value=''></option>\n";
                },
                "8": function (depth0, helpers, partials, data) {
                    return "  selected=\"\" ";
                },
                "10": function (depth0, helpers, partials, data) {
                    var stack1, helper, functionType = "function",
                        buffer = "\n      <option ";
                    stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.isDefault : depth0), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(11, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    buffer += "  value='" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "value",
                        "hash": {},
                        "data": data
                    }) : helper))) + "'> " + local.utility2.stringHtmlSafe(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "value",
                        "hash": {},
                        "data": data
                    }) : helper))) + " ";
                    stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.isDefault : depth0), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(13, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    return buffer + " </option>\n\n";
                },
                "11": function (depth0, helpers, partials, data) {
                    return " selected=\"\"  ";
                },
                "13": function (depth0, helpers, partials, data) {
                    return " (default) ";
                },
                "15": function (depth0, helpers, partials, data) {
                    return "<strong>";
                },
                "17": function (depth0, helpers, partials, data) {
                    return "</strong>";
                },
                "main": function (depth0, helpers, partials, data) {
                    var stack1, helper, functionType = "function",
                        buffer = "<td class='code";
                    stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.required : depth0), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(1, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    buffer += "'><label for='" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.valueId || (depth0 != null ? depth0.valueId : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "valueId",
                        "hash": {},
                        "data": data
                    }) : helper))) + "'>" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "name",
                        "hash": {},
                        "data": data
                    }) : helper))) + "</label></td>\n<td>\n  <select ";
                    stack1 = ((helpers.isArray || (depth0 && depth0.isArray) || nop).call(depth0, depth0, {
                        "name": "isArray",
                        "hash": {},
                        "fn": this.program(3, data),
                        "data": data
                    }));
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    buffer += " class=\"parameter ";
                    stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.required : depth0), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(5, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    buffer += "\" name=\"" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "name",
                        "hash": {},
                        "data": data
                    }) : helper))) + "\" id=\"" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.valueId || (depth0 != null ? depth0.valueId : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "valueId",
                        "hash": {},
                        "data": data
                    }) : helper))) + "\">\n\n";
                    stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.required : depth0), {
                        "name": "unless",
                        "hash": {},
                        "fn": this.program(7, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    buffer += "\n";
                    stack1 = helpers.each.call(depth0, ((stack1 = (depth0 != null ? depth0.allowableValues : depth0)) != null ? stack1.descriptiveValues : stack1), {
                        "name": "each",
                        "hash": {},
                        "fn": this.program(10, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    buffer += "\n  </select>\n</td>\n<td class=\"markdown\">";
                    stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.required : depth0), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(15, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    stack1 = ((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "description",
                        "hash": {},
                        "data": data
                    }) : helper));
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.required : depth0), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(17, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    buffer += "</td>\n<td>";
                    stack1 = ((helper = (helper = helpers.paramType || (depth0 != null ? depth0.paramType : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "paramType",
                        "hash": {},
                        "data": data
                    }) : helper));
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    return buffer + "</td>\n<td><span class=\"model-signature\"></span></td>\n";
                },
                "useData": true
            });
            local.Handlebars.templates.param_readonly = local.Handlebars.template({
                "1": function (depth0, helpers, partials, data) {
                    var helper, functionType = "function";
                    return "        <textarea class='body-textarea' readonly='readonly' name='" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "name",
                        "hash": {},
                        "data": data
                    }) : helper))) + "' id='" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.valueId || (depth0 != null ? depth0.valueId : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "valueId",
                        "hash": {},
                        "data": data
                    }) : helper))) + "'>" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.default || (depth0 != null ? depth0.default : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "default",
                        "hash": {},
                        "data": data
                    }) : helper))) + "</textarea>\n";
                },
                "3": function (depth0, helpers, partials, data) {
                    var stack1, buffer = "";
                    stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.default : depth0), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(4, data),
                        "inverse": this.program(6, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    return buffer;
                },
                "4": function (depth0, helpers, partials, data) {
                    var helper, functionType = "function";
                    return "            " + local.utility2.stringHtmlSafe(((helper = (helper = helpers.default || (depth0 != null ? depth0.default : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "default",
                        "hash": {},
                        "data": data
                    }) : helper))) + "\n";
                },
                "6": function (depth0, helpers, partials, data) {
                    return "            (empty)\n";
                },
                "main": function (depth0, helpers, partials, data) {
                    var stack1, helper, functionType = "function",
                        buffer = "<td class='code'><label for='" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.valueId || (depth0 != null ? depth0.valueId : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "valueId",
                            "hash": {},
                            "data": data
                        }) : helper))) + "'>" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "name",
                            "hash": {},
                            "data": data
                        }) : helper))) + "</label></td>\n<td>\n";
                    stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.isBody : depth0), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(1, data),
                        "inverse": this.program(3, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    buffer += "</td>\n<td class=\"markdown\">";
                    stack1 = ((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "description",
                        "hash": {},
                        "data": data
                    }) : helper));
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    buffer += "</td>\n<td>";
                    stack1 = ((helper = (helper = helpers.paramType || (depth0 != null ? depth0.paramType : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "paramType",
                        "hash": {},
                        "data": data
                    }) : helper));
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    return buffer + "</td>\n<td><span class=\"model-signature\"></span></td>\n";
                },
                "useData": true
            });
            local.Handlebars.templates.param_readonly_required = local.Handlebars.template({
                "1": function (depth0, helpers, partials, data) {
                    var helper, functionType = "function";
                    return "        <textarea class='body-textarea' readonly='readonly' placeholder='(required)' name='" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "name",
                        "hash": {},
                        "data": data
                    }) : helper))) + "' id='" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.valueId || (depth0 != null ? depth0.valueId : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "valueId",
                        "hash": {},
                        "data": data
                    }) : helper))) + "'>" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.default || (depth0 != null ? depth0.default : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "default",
                        "hash": {},
                        "data": data
                    }) : helper))) + "</textarea>\n";
                },
                "3": function (depth0, helpers, partials, data) {
                    var stack1, buffer = "";
                    stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.default : depth0), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(4, data),
                        "inverse": this.program(6, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    return buffer;
                },
                "4": function (depth0, helpers, partials, data) {
                    var helper, functionType = "function";
                    return "            " + local.utility2.stringHtmlSafe(((helper = (helper = helpers.default || (depth0 != null ? depth0.default : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "default",
                        "hash": {},
                        "data": data
                    }) : helper))) + "\n";
                },
                "6": function (depth0, helpers, partials, data) {
                    return "            (empty)\n";
                },
                "main": function (depth0, helpers, partials, data) {
                    var stack1, helper, functionType = "function",
                        buffer = "<td class='code required'><label for='" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.valueId || (depth0 != null ? depth0.valueId : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "valueId",
                            "hash": {},
                            "data": data
                        }) : helper))) + "'>" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "name",
                            "hash": {},
                            "data": data
                        }) : helper))) + "</label></td>\n<td>\n";
                    stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.isBody : depth0), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(1, data),
                        "inverse": this.program(3, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    buffer += "</td>\n<td class=\"markdown\">";
                    stack1 = ((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "description",
                        "hash": {},
                        "data": data
                    }) : helper));
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    buffer += "</td>\n<td>";
                    stack1 = ((helper = (helper = helpers.paramType || (depth0 != null ? depth0.paramType : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "paramType",
                        "hash": {},
                        "data": data
                    }) : helper));
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    return buffer + "</td>\n<td><span class=\"model-signature\"></span></td>\n";
                },
                "useData": true
            });
            local.Handlebars.templates.param_required = local.Handlebars.template({
                "1": function (depth0, helpers, partials, data) {
                    var stack1, buffer = "";
                    stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.isFile : depth0), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(2, data),
                        "inverse": this.program(4, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    return buffer;
                },
                "2": function (depth0, helpers, partials, data) {
                    var helper, functionType = "function";
                    return "			<input type=\"file\" name='" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "name",
                        "hash": {},
                        "data": data
                    }) : helper))) + "' id='" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.valueId || (depth0 != null ? depth0.valueId : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "valueId",
                        "hash": {},
                        "data": data
                    }) : helper))) + "'/>\n";
                },
                "4": function (depth0, helpers, partials, data) {
                    var stack1, buffer = "";
                    stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.default : depth0), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(5, data),
                        "inverse": this.program(7, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    return buffer;
                },
                "5": function (depth0, helpers, partials, data) {
                    var helper, functionType = "function";
                    return "				<textarea class='body-textarea required' placeholder='(required)' name='" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "name",
                        "hash": {},
                        "data": data
                    }) : helper))) + "' id=\"" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.valueId || (depth0 != null ? depth0.valueId : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "valueId",
                        "hash": {},
                        "data": data
                    }) : helper))) + "\">" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.default || (depth0 != null ? depth0.default : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "default",
                        "hash": {},
                        "data": data
                    }) : helper))) + "</textarea>\n        <br />\n        <div class=\"parameter-content-type\" />\n";
                },
                "7": function (depth0, helpers, partials, data) {
                    var helper, functionType = "function";
                    return "				<textarea class='body-textarea required' placeholder='(required)' name='" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "name",
                        "hash": {},
                        "data": data
                    }) : helper))) + "' id='" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.valueId || (depth0 != null ? depth0.valueId : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "valueId",
                        "hash": {},
                        "data": data
                    }) : helper))) + "'></textarea>\n				<br />\n				<div class=\"parameter-content-type\" />\n";
                },
                "9": function (depth0, helpers, partials, data) {
                    var stack1, buffer = "";
                    stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.isFile : depth0), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(10, data),
                        "inverse": this.program(12, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    return buffer;
                },
                "10": function (depth0, helpers, partials, data) {
                    var helper, functionType = "function";
                    return "			<input class='parameter' class='required' type='file' name='" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "name",
                        "hash": {},
                        "data": data
                    }) : helper))) + "' id='" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.valueId || (depth0 != null ? depth0.valueId : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "valueId",
                        "hash": {},
                        "data": data
                    }) : helper))) + "'/>\n";
                },
                "12": function (depth0, helpers, partials, data) {
                    var stack1, buffer = "";
                    stack1 = ((helpers.renderTextParam || (depth0 && depth0.renderTextParam) || nop).call(depth0, depth0, {
                        "name": "renderTextParam",
                        "hash": {},
                        "fn": this.program(13, data),
                        "data": data
                    }));
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    return buffer;
                },
                "13": function (depth0, helpers, partials, data) {
                    return "";
                },
                "main": function (depth0, helpers, partials, data) {
                    var stack1, helper, functionType = "function",
                        buffer = "<td class='code required'><label for='" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.valueId || (depth0 != null ? depth0.valueId : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "valueId",
                            "hash": {},
                            "data": data
                        }) : helper))) + "'>" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "name",
                            "hash": {},
                            "data": data
                        }) : helper))) + "</label></td>\n<td>\n";
                    stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.isBody : depth0), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(1, data),
                        "inverse": this.program(9, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    buffer += "</td>\n<td>\n	<strong><span class=\"markdown\">";
                    stack1 = ((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "description",
                        "hash": {},
                        "data": data
                    }) : helper));
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    buffer += "</span></strong>\n</td>\n<td>";
                    stack1 = ((helper = (helper = helpers.paramType || (depth0 != null ? depth0.paramType : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "paramType",
                        "hash": {},
                        "data": data
                    }) : helper));
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    return buffer + "</td>\n<td><span class=\"model-signature\"></span></td>\n";
                },
                "useData": true
            });
            local.Handlebars.templates.parameter_content_type = local.Handlebars.template({
                "1": function (depth0, helpers, partials, data) {
                    var stack1, buffer = "";
                    stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.consumes : depth0), {
                        "name": "each",
                        "hash": {},
                        "fn": this.program(2, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    return buffer;
                },
                "2": function (depth0, helpers, partials, data) {
                    var stack1, lambda = this.lambda,
                        buffer = "  <option value=\"";
                    stack1 = lambda(depth0, depth0);
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    buffer += "\">";
                    stack1 = lambda(depth0, depth0);
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    return buffer + "</option>\n";
                },
                "4": function (depth0, helpers, partials, data) {
                    return "  <option value=\"application/json\">application/json</option>\n";
                },
                "main": function (depth0, helpers, partials, data) {
                    var stack1, helper, functionType = "function",
                        buffer = "<label>Parameter content type:</label>\n<select name=\"parameterContentType\">\n";
                    stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.consumes : depth0), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(1, data),
                        "inverse": this.program(4, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    return buffer + "</select>\n";
                },
                "useData": true
            });
            local.Handlebars.templates.resource = local.Handlebars.template({
                "1": function (depth0, helpers, partials, data) {
                    return " : ";
                },
                "3": function (depth0, helpers, partials, data) {
                    var helper, functionType = "function";
                    return "    <li>\n      <a href='" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "url",
                        "hash": {},
                        "data": data
                    }) : helper))) + "'>Raw</a>\n    </li>\n";
                },
                "main": function (depth0, helpers, partials, data) {
                    var stack1, helper, options, functionType = "function",
                        blockHelperMissing = helpers.blockHelperMissing,
                        buffer = "<div class='heading'>\n  <h2>\n    <a href='#!/" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "id",
                            "hash": {},
                            "data": data
                        }) : helper))) + "' class=\"toggleEndpointList\" data-id=\"" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "id",
                            "hash": {},
                            "data": data
                        }) : helper))) + "\">" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "name",
                            "hash": {},
                            "data": data
                        }) : helper))) + "</a> ";
                    stack1 = ((helper = (helper = helpers.summary || (depth0 != null ? depth0.summary : depth0)) != null ? helper : nop), (options = {
                        "name": "summary",
                        "hash": {},
                        "fn": this.program(1, data),
                        "data": data
                    }), (typeof helper === functionType ? helper.call(depth0, options) : helper));
                    if (!helpers.summary) {
                        stack1 = blockHelperMissing.call(depth0, stack1, options);
                    }
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    stack1 = ((helper = (helper = helpers.summary || (depth0 != null ? depth0.summary : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "summary",
                        "hash": {},
                        "data": data
                    }) : helper));
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    buffer += "\n  </h2>\n  <ul class='options'>\n    <li>\n      <a href='#!/" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "id",
                        "hash": {},
                        "data": data
                    }) : helper))) + "' id='endpointListTogger_" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "id",
                        "hash": {},
                        "data": data
                    }) : helper))) + "' class=\"toggleEndpointList\" data-id=\"" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "id",
                        "hash": {},
                        "data": data
                    }) : helper))) + "\">Show/Hide</a>\n    </li>\n    <li>\n      <a href='#' class=\"collapseResource\" data-id=\"" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "id",
                        "hash": {},
                        "data": data
                    }) : helper))) + "\">\n        List Operations\n      </a>\n    </li>\n    <li>\n      <a href='#' class=\"expandResource\" data-id=\"" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "id",
                        "hash": {},
                        "data": data
                    }) : helper))) + "\">\n        Expand Operations\n      </a>\n    </li>\n";
                    stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.url : depth0), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(3, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    return buffer + "  </ul>\n</div>\n<ul class='endpoints' id='" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "id",
                        "hash": {},
                        "data": data
                    }) : helper))) + "_endpoint_list' style='display:none'>\n\n</ul>\n";
                },
                "useData": true
            });
            local.Handlebars.templates.response_content_type = local.Handlebars.template({
                "1": function (depth0, helpers, partials, data) {
                    var stack1, buffer = "";
                    stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.produces : depth0), {
                        "name": "each",
                        "hash": {},
                        "fn": this.program(2, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    return buffer;
                },
                "2": function (depth0, helpers, partials, data) {
                    var stack1, lambda = this.lambda,
                        buffer = "  <option value=\"";
                    stack1 = lambda(depth0, depth0);
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    buffer += "\">";
                    stack1 = lambda(depth0, depth0);
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    return buffer + "</option>\n";
                },
                "4": function (depth0, helpers, partials, data) {
                    return "  <option value=\"application/json\">application/json</option>\n";
                },
                "main": function (depth0, helpers, partials, data) {
                    var stack1, helper, functionType = "function",
                        buffer = "<label>Response Content Type</label>\n<select name=\"responseContentType\">\n";
                    stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.produces : depth0), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(1, data),
                        "inverse": this.program(4, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    return buffer + "</select>\n";
                },
                "useData": true
            });
            local.Handlebars.templates.signature = local.Handlebars.template({
                "main": function (depth0, helpers, partials, data) {
                    var stack1, helper, functionType = "function",
                        buffer = "<div>\n<ul class=\"signature-nav\">\n  <li><a class=\"description-link\" href=\"#\">Model</a></li>\n  <li><a class=\"snippet-link\" href=\"#\">Model Schema</a></li>\n</ul>\n<div>\n\n<div class=\"signature-container\">\n  <div class=\"description\">\n    ";
                    stack1 = ((helper = (helper = helpers.signature || (depth0 != null ? depth0.signature : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "signature",
                        "hash": {},
                        "data": data
                    }) : helper));
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    return buffer + "\n  </div>\n\n  <div class=\"snippet\">\n    <pre><code>" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.sampleJSON || (depth0 != null ? depth0.sampleJSON : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "sampleJSON",
                        "hash": {},
                        "data": data
                    }) : helper))) + "</code></pre>\n    <small class=\"notice\"></small>\n  </div>\n</div>\n\n";
                },
                "useData": true
            });
            local.Handlebars.templates.status_code = local.Handlebars.template({
                "1": function (depth0, helpers, partials, data) {
                    var lambda = this.lambda;
                    return "      <tr>\n        <td>" + local.utility2.stringHtmlSafe(lambda((data && data.key), depth0)) + "</td>\n        <td>" + local.utility2.stringHtmlSafe(lambda((depth0 != null ? depth0.description : depth0), depth0)) + "</td>\n        <td>" + local.utility2.stringHtmlSafe(lambda((depth0 != null ? depth0.type : depth0), depth0)) + "</td>\n      </tr>\n";
                },
                "main": function (depth0, helpers, partials, data) {
                    var stack1, helper, functionType = "function",
                        buffer = "<td width='15%' class='code'>" + local.utility2.stringHtmlSafe(((helper = (helper = helpers.code || (depth0 != null ? depth0.code : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "code",
                            "hash": {},
                            "data": data
                        }) : helper))) + "</td>\n<td class=\"markdown\">";
                    stack1 = ((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : nop), (typeof helper === functionType ? helper.call(depth0, {
                        "name": "message",
                        "hash": {},
                        "data": data
                    }) : helper));
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    buffer += "</td>\n<td width='50%'><span class=\"model-signature\" /></td>\n<td class=\"headers\">\n  <table>\n    <tbody>\n";
                    stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.headers : depth0), {
                        "name": "each",
                        "hash": {},
                        "fn": this.program(1, data),
                        "data": data
                    });
                    if (stack1 != null) {
                        buffer += stack1;
                    }
                    return buffer + "    </tbody>\n  </table>\n</td>";
                },
                "useData": true
            });
            SwaggerUi.Views.HeaderView = local.Backbone.View.extend({
                events: {
                    'click #show-pet-store-icon': 'showPetStore',
                    'click #explore': 'showCustom',
                    'keyup #input_baseUrl': 'showCustomOnKeyup',
                    'keyup #input_apiKey': 'showCustomOnKeyup'
                },
                showPetStore: function () {
                    this.trigger('update-swagger-ui', {
                        url: 'http://petstore.swagger.io/v2/swagger.json'
                    });
                },
                showCustomOnKeyup: function (e) {
                    if (e.keyCode === 13) {
                        this.showCustom();
                    }
                },
                showCustom: function (e) {
                    if (e) {
                        e.preventDefault();
                    }
                    this.trigger('update-swagger-ui', {
                        url: local.jQuery('#input_baseUrl').val(),
                        apiKey: local.jQuery('#input_apiKey').val()
                    });
                },
                update: function (url, apiKey, trigger) {
                    if (trigger === undefined) {
                        trigger = false;
                    }
                    local.jQuery('#input_baseUrl').val(url);
                    //local.jQuery('#input_apiKey').val(apiKey);
                    if (trigger) {
                        this.trigger('update-swagger-ui', {
                            url: url
                        });
                    }
                }
            });
/* jslint-ignore-end */
            SwaggerUi.Views.MainView = local.Backbone.View.extend({
                apisSorter: {
                    alpha: function (a, b) {
                        return a.name.localeCompare(b.name);
                    }
                },
                operationsSorters: {
                    alpha: function (a, b) {
                        return a.path.localeCompare(b.path);
                    },
                    method: function (a, b) {
                        return a.method.localeCompare(b.method);
                    }
                },
                initialize: function (opts) {
                    var self, sorterOption, sorterFn, value;
                    self = this;
                    opts = opts || {};
                    // Sort APIs
                    if (opts.swaggerOptions.apisSorter) {
                        sorterOption = opts.swaggerOptions.apisSorter;
                        if (typeof sorterOption === 'function') {
                            sorterFn = sorterOption;
                        } else {
                            sorterFn = self.apisSorter[sorterOption];
                        }
                        if (typeof sorterFn === 'function') {
                            self.model.apisArray.sort(sorterFn);
                        }
                    }
                    // set up the UI for input
                    self.model.auths = [];
                    Object.keys(
                        local.swgg.swaggerJson.securityDefinitions
                    ).forEach(function (key) {
                        value = local.swgg.swaggerJson.securityDefinitions[key];
                        self.model.auths.push({
                            name: key,
                            type: value.type,
                            value: value
                        });
                    });
                },
                render: function () {
                    var counter,
                        i,
                        id,
                        resource,
                        resources;
                    // Render the outer container for resources
                    this.$el.html(local.Handlebars.templates.main(this.model));
                    // Render each resource
                    resources = {};
                    counter = 0;
                    for (i = 0; i < this.model.apisArray.length; i += 1) {
                        resource = this.model.apisArray[i];
                        id = resource.name;
                        while (resources[id] !== undefined) {
                            id = id + '_' + counter;
                            counter += 1;
                        }
                        resource.id = id;
                        resources[id] = resource;
                        this.addResource(resource, this.model.auths);
                    }
                    local.jQuery('.propWrap').hover(function onHover() {
                        local.jQuery('.optionsWrapper', local.jQuery(this)).show();
                    }, function offhover() {
                        local.jQuery('.optionsWrapper', local.jQuery(this)).hide();
                    });
                    return this;
                },
                addResource: function (resource, auths) {
                    // Render a resource and add it to resources li
                    resource.id = resource.id.replace(/\s/g, '_');
                    var resourceView = new SwaggerUi.Views.ResourceView({
                        model: resource,
                        tagName: 'li',
                        id: 'resource_' + resource.id,
                        className: 'resource',
                        auths: auths,
                        swaggerOptions: this.options.swaggerOptions
                    });
                    local.jQuery('#resources', this.el).append(resourceView.render().el);
                },
                clear: function () {
                    this.$el.html('');
                }
            });
/* jslint-ignore-begin */
            SwaggerUi.Views.OperationView = local.Backbone.View.extend({
                events: {
                    'submit .sandbox': 'onClickSubmitOperation',
                    'click .submit': 'onClickSubmitOperation',
                    'click .response_hider': 'hideResponse',
                    'click .toggleOperation': 'toggleOperationContent',
                    'dblclick .curl': 'selectText',
                },
                initialize: function (opts) {
                    opts = opts || {};
                    this.auths = opts.auths;
                    this.nickname = this.model.nickname;
                    this.parentId = this.model.parentId;
                    this.model.encodedParentId = encodeURIComponent(this.parentId);
                    return this;
                },
                selectText: function (event) {
                    var doc = document,
                        text = event.target.firstChild,
                        range,
                        selection;
                    if (doc.body.createTextRange) {
                        range = document.body.createTextRange();
                        range.moveToElementText(text);
                        range.select();
                    } else if (window.getSelection) {
                        selection = window.getSelection();
                        range = document.createRange();
                        range.selectNodeContents(text);
                        selection.removeAllRanges();
                        selection.addRange(range);
                    }
                },
                // Note: copied from CoffeeScript compiled file
                // TODO: redactor
                render: function () {
                    var a, auth, auths, code, contentTypeModel, isMethodSubmissionSupported, k, key, l, len, len1, len2, len3, len4, m, modelAuths, n, o, p, param, q, ref, ref1, ref2, ref3, ref4, ref5, responseContentTypeView, responseSignatureView, schema, schemaObj, scopeIndex, signatureModel, statusCode, successResponse, type, v, value;
                    isMethodSubmissionSupported = local.jQuery.inArray(this.model.method, this.model.supportedSubmitMethods()) >= 0;
                    if (!isMethodSubmissionSupported) {
                        this.model.isReadOnly = true;
                    }
                    this.model.description = this.model.description || this.model.notes;
                    this.model.oauth = null;
                    modelAuths = this.model.authorizations || this.model.security;
                    if (modelAuths) {
                        if (Array.isArray(modelAuths)) {
                            for (l = 0, len = modelAuths.length; l < len; l += 1) {
                                auths = modelAuths[l];
                                for (key in auths) {
                                    for (a in this.auths) {
                                        auth = this.auths[a];
                                        if (key === auth.name) {
                                            if (auth.type === 'oauth2') {
                                                this.model.oauth = {};
                                                this.model.oauth.scopes = [];
                                                ref1 = auth.value.scopes;
                                                for (k in ref1) {
                                                    v = ref1[k];
                                                    scopeIndex = auths[key].indexOf(k);
                                                    if (scopeIndex >= 0) {
                                                        o = {
                                                            scope: k,
                                                            description: v
                                                        };
                                                        this.model.oauth.scopes.push(o);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            for (k in modelAuths) {
                                v = modelAuths[k];
                                if (k === 'oauth2') {
                                    if (this.model.oauth === null) {
                                        this.model.oauth = {};
                                    }
                                    if (this.model.oauth.scopes === void 0) {
                                        this.model.oauth.scopes = [];
                                    }
                                    for (m = 0, len1 = v.length; m < len1; m += 1) {
                                        o = v[m];
                                        this.model.oauth.scopes.push(o);
                                    }
                                }
                            }
                        }
                    }
                    if (this.model.responses !== undefined) {
                        this.model.responseMessages = [];
                        ref2 = this.model.responses;
                        for (code in ref2) {
                            value = ref2[code];
                            schema = null;
                            schemaObj = this.model.responses[code].schema;
                            if (schemaObj && schemaObj.$ref) {
                                schema = schemaObj.$ref;
                                if (schema.indexOf('#/definitions/') !== -1) {
                                    schema = schema.replace(/^.*#\/definitions\//, '');
                                }
                            }
                            this.model.responseMessages.push({
                                code: code,
                                message: value.description,
                                responseModel: schema
                            });
                        }
                    }
                    if (this.model.responseMessages === undefined) {
                        this.model.responseMessages = [];
                    }
                    signatureModel = null;
                    if (this.model.successResponse) {
                        successResponse = this.model.successResponse;
                        for (key in successResponse) {
                            value = successResponse[key];
                            this.model.successCode = key;
                            if (typeof value === 'object' && typeof value.createJSONSample === 'function') {
                                signatureModel = {
                                    sampleJSON: JSON.stringify(value.createJSONSample(), void 0, 2),
                                    isParam: false,
                                    signature: value.getMockSignature()
                                };
                            }
                        }
                    } else if (this.model.responseClassSignature && this.model.responseClassSignature !== 'string') {
                        signatureModel = {
                            sampleJSON: this.model.responseSampleJSON,
                            isParam: false,
                            signature: this.model.responseClassSignature
                        };
                    }
                    var opts = this.options.swaggerOptions;
                    if (opts.showRequestHeaders) {
                        this.model.showRequestHeaders = true;
                    }
                    this.$el.html(local.Handlebars.templates.operation(this.model));
                    if (signatureModel) {
                        responseSignatureView = new SwaggerUi.Views.SignatureView({
                            model: signatureModel,
                            tagName: 'div'
                        });
                        local.jQuery('.model-signature', this.$el).append(responseSignatureView.render().el);
                    } else {
                        this.model.responseClassSignature = 'string';
                        local.jQuery('.model-signature', this.$el).html(this.model.type);
                    }
                    contentTypeModel = {
                        isParam: false
                    };
                    contentTypeModel.consumes = this.model.consumes;
                    contentTypeModel.produces = this.model.produces;
                    ref3 = this.model.parameters;
                    for (n = 0, len2 = ref3.length; n < len2; n += 1) {
                        param = ref3[n];
                        type = param.type || param.dataType || '';
                        if (type === undefined) {
                            schema = param.schema;
                            if (schema && schema.$ref) {
                                ref = schema.$ref;
                                if (ref.indexOf('#/definitions/') === 0) {
                                    type = ref.substring('#/definitions/'.length);
                                } else {
                                    type = ref;
                                }
                            }
                        }
                        if (type && type.toLowerCase() === 'file') {
                            if (!contentTypeModel.consumes) {
                                contentTypeModel.consumes = 'multipart/form-data';
                            }
                        }
                        param.type = type;
                    }
                    responseContentTypeView = new SwaggerUi.Views.ResponseContentTypeView({
                        model: contentTypeModel,
                    });
                    local.jQuery('.response-content-type', this.$el).append(responseContentTypeView.render().el);
                    ref4 = this.model.parameters;
                    for (p = 0, len3 = ref4.length; p < len3; p += 1) {
                        param = ref4[p];
                        this.addParameter(param, contentTypeModel.consumes);
                    }
                    ref5 = this.model.responseMessages;
                    for (q = 0, len4 = ref5.length; q < len4; q += 1) {
                        statusCode = ref5[q];
                        this.addStatusCode(statusCode);
                    }
                    return this;
                },
                addParameter: function (param, consumes) {
                    // Render a parameter
                    param.consumes = consumes;
                    var paramView = new SwaggerUi.Views.ParameterView({
                        model: param,
                        tagName: 'tr',
                        readOnly: this.model.isReadOnly
                    });
                    local.jQuery('.operation-params', this.$el).append(paramView.render().el);
                },
                addStatusCode: function (statusCode) {
                    // Render status codes
                    var statusCodeView = new SwaggerUi.Views.StatusCodeView({
                        model: statusCode,
                        tagName: 'tr',
                    });
                    local.jQuery('.operation-status', this.$el).append(statusCodeView.render().el);
                },
                // Note: copied from CoffeeScript compiled file
                // TODO: redactor
                onClickSubmitOperation: local.onClickSubmitOperation,
                // handler for hide response link
                hideResponse: function (e) {
                    if (e) {
                        e.preventDefault();
                    }
                    local.jQuery('.response', this.$el).slideUp();
                    local.jQuery('.response_hider', this.$el).fadeOut();
                },
                // Show response from server
                showResponse: function (response) {
                    var prettyJson = JSON.stringify(response, null, '\t').replace(/\n/g, '<br>');
                    this.el.querySelector('.response_body').innerHTML = local.utility2.stringHtmlSafe(prettyJson);
                },
                // puts the response data in UI
                showStatus: function (response) {
                    var url, content;
                    if (response.content === undefined) {
                        content = response.data;
                        url = response.url;
                    } else {
                        content = response.content.data;
                        url = response.request.url;
                    }
                    var headers = response.headers;
                    content = local.jQuery.trim(content);
                    // if server is nice, and sends content-type back, we can use it
                    var contentType = null;
                    if (headers) {
                        contentType = headers['Content-Type'] || headers['content-type'];
                        if (contentType) {
                            contentType = contentType.split(';')[0].trim();
                        }
                    }
                    local.jQuery('.response_body', this.$el).removeClass('json');
                    local.jQuery('.response_body', this.$el).removeClass('xml');
                    var supportsAudioPlayback = function (contentType) {
                        var audioElement = document.createElement('audio');
                        return !!(audioElement.canPlayType && audioElement.canPlayType(contentType).replace(/no/, ''));
                    };
                    var pre;
                    var code;
                    if (!content) {
                        code = local.jQuery('<code />').text('no content');
                        pre = local.jQuery('<pre class="json" />').append(code);
                        // JSON
                    } else if (contentType === 'application/json' || /\+json$/.test(contentType)) {
                        var json = null;
                        try {
                            json = JSON.stringify(JSON.parse(content), null, '  ');
                        } catch (_error) {
                            json = 'can\'t parse JSON.  Raw result:\n\n' + content;
                        }
                        code = local.jQuery('<code />').text(json);
                        pre = local.jQuery('<pre class="json" />').append(code);
                        // XML
                    } else if (contentType === 'application/xml' || /\+xml$/.test(contentType)) {
                        code = local.jQuery('<code />').text(content);
                        pre = local.jQuery('<pre class="xml" />').append(code);
                        // HTML
                    } else if (contentType === 'text/html') {
                        code = local.jQuery('<code />').html(local.utility2.stringHtmlSafe(content));
                        pre = local.jQuery('<pre class="xml" />').append(code);
                        // Plain Text
                    } else if (/text\/plain/.test(contentType)) {
                        code = local.jQuery('<code />').text(content);
                        pre = local.jQuery('<pre class="plain" />').append(code);
                        // Image
                    } else if (/^image\//.test(contentType)) {
                        pre = local.jQuery('<img>').attr('src', url);
                        // Audio
                    } else if (/^audio\//.test(contentType) && supportsAudioPlayback(contentType)) {
                        pre = local.jQuery('<audio controls>').append(local.jQuery('<source>').attr('src', url).attr('type', contentType));
                        // Download
                    } else if (headers['Content-Disposition'] && (/attachment/).test(headers['Content-Disposition']) ||
                        headers['content-disposition'] && (/attachment/).test(headers['content-disposition']) ||
                        headers['Content-Description'] && (/File Transfer/).test(headers['Content-Description']) ||
                        headers['content-description'] && (/File Transfer/).test(headers['content-description'])) {
                        if ('Blob' in window) {
                            var type = contentType || 'text/html';
                            var blob = new Blob([content], {
                                type: type
                            });
                            var a = document.createElement('a');
                            var href = window.URL.createObjectURL(blob);
                            var fileName = response.url.substr(response.url.lastIndexOf('/') + 1);
                            var download = [type, fileName, href].join(':');
                            a.setAttribute('href', href);
                            a.setAttribute('download', download);
                            a.innerText = 'Download ' + fileName;
                            pre = local.jQuery('<div/>').append(a);
                        } else {
                            pre = local.jQuery('<pre class="json" />').append('Download headers detected but your browser does not support downloading binary via XHR (Blob).');
                        }
                        // Location header based redirect download
                    } else if (headers.location || headers.Location) {
                        window.location = response.url;
                        // Anything else (CORS)
                    } else {
                        code = local.jQuery('<code />').text(content);
                        pre = local.jQuery('<pre class="json" />').append(code);
                    }
                    var response_body = pre;
                    local.jQuery('.request_url', this.$el).html('<pre></pre>');
                    local.jQuery('.request_url pre', this.$el).text(url);
                    local.jQuery('.response_code', this.$el).html('<pre>' + response.status + '</pre>');
                    local.jQuery('.response_body', this.$el).html(response_body);
                    local.jQuery('.response_headers', this.$el).html('<pre>' + local.utility2.stringHtmlSafe(JSON.stringify(response.headers, null, '  ')).replace(/\n/g, '<br>') + '</pre>');
                    local.jQuery('.response', this.$el).slideDown();
                    local.jQuery('.response_hider', this.$el).show();
                    // only highlight the response if response is less than threshold, default state is highlight response
                    var opts = this.options.swaggerOptions;
                    if (opts.showRequestHeaders) {
                        var map = local.getInputMap(this.el, this.model.parameters),
                            requestHeaders = this.model.getHeaderParams(map);
                        delete requestHeaders['Content-Type'];
                        local.jQuery('.request_headers', this.$el).html('<pre>' + local.utility2.stringHtmlSafe(JSON.stringify(requestHeaders, null, '  ')).replace(/\n/g, '<br>') + '</pre>');
                    }
                    return local.jQuery('.response_body', this.$el)[0];
                },
                toggleOperationContent: function (event) {
                    var elem = local.jQuery('#' + Docs.escapeResourceName(this.parentId + '_' + this.nickname + '_content'));
                    if (elem.is(':visible')) {
                        event.preventDefault();
                        Docs.collapseOperation(elem);
                    } else {
                        Docs.expandOperation(elem);
                    }
                }
            });
            SwaggerUi.Views.ParameterContentTypeView = local.Backbone.View.extend({
                render: function () {
                    this.$el.html(local.Handlebars.templates.parameter_content_type(this.model));
                    return this;
                }
            });
            SwaggerUi.Views.ParameterView = local.Backbone.View.extend({
                initialize: function () {
                    local.Handlebars.registerHelper('isArray', function (param, opts) {
                        if (param.type.toLowerCase() === 'array' || param.allowMultiple) {
                            return opts.fn(this);
                        } else {
                            return (opts.inverse || nop)(this);
                        }
                    });
                },
                render: function () {
                    var type = this.model.type || this.model.dataType;
                    if (type === undefined) {
                        var schema = this.model.schema;
                        if (schema && schema.$ref) {
                            var ref = schema.$ref;
                            if (ref.indexOf('#/definitions/') === 0) {
                                type = ref.substring('#/definitions/'.length);
                            } else {
                                type = ref;
                            }
                        }
                    }
                    this.model.type = type;
                    this.model.paramType = this.model.in || this.model.paramType;
                    this.model.isBody = this.model.paramType === 'body' || this.model.in === 'body';
                    this.model.isFile = type && type.toLowerCase() === 'file';
                    // Allow for default === false
                    if (this.model.default === undefined) {
                        this.model.default = this.model.defaultValue;
                    }
                    this.model.hasDefault = (this.model.default !== undefined);
                    this.model.valueId = 'm' + this.model.name + local.utility2.uuidTimeCreate();
                    if (this.model.allowableValues) {
                        this.model.isList = true;
                    }
                    var template = this.template();
                    this.$el.html(template(this.model));
                    var signatureModel = {
                        sampleJSON: this.model.sampleJSON,
                        isParam: true,
                        signature: this.model.signature
                    };
                    if (this.model.sampleJSON) {
                        var signatureView = new SwaggerUi.Views.SignatureView({
                            model: signatureModel,
                            tagName: 'div'
                        });
                        local.jQuery('.model-signature', this.$el).append(signatureView.render().el);
                    } else {
                        local.jQuery('.model-signature', this.$el).html(this.model.signature);
                    }
                    var isParam = false;
                    if (this.model.isBody) {
                        isParam = true;
                    }
                    var contentTypeModel = {
                        isParam: isParam
                    };
                    contentTypeModel.consumes = this.model.consumes;
                    if (isParam) {
                        var parameterContentTypeView = new SwaggerUi.Views.ParameterContentTypeView({
                            model: contentTypeModel
                        });
                        local.jQuery('.parameter-content-type', this.$el).append(parameterContentTypeView.render().el);
                    } else {
                        var responseContentTypeView = new SwaggerUi.Views.ResponseContentTypeView({
                            model: contentTypeModel
                        });
                        local.jQuery('.response-content-type', this.$el).append(responseContentTypeView.render().el);
                    }
                    return this;
                },
                // Return an appropriate template based on if the parameter is a list, readonly, required
                template: function () {
                    if (this.model.isList) {
                        return local.Handlebars.templates.param_list;
                    } else {
                        if (this.options.readOnly) {
                            if (this.model.required) {
                                return local.Handlebars.templates.param_readonly_required;
                            } else {
                                return local.Handlebars.templates.param_readonly;
                            }
                        } else {
                            if (this.model.required) {
                                return local.Handlebars.templates.param_required;
                            } else {
                                return local.Handlebars.templates.param;
                            }
                        }
                    }
                }
            });
            SwaggerUi.Views.ResourceView = local.Backbone.View.extend({
                initialize: function (opts) {
                    opts = opts || {};
                    this.auths = opts.auths;
                    if ('' === this.model.description) {
                        this.model.description = null;
                    }
                    if (this.model.description) {
                        this.model.summary = this.model.description;
                    }
                },
                render: function () {
                    var methods = {};
                    var self = this;
                    self.$el.html(local.Handlebars.templates.resource(self.model));
                    // Render each operation
                    self.model.operationsArray.forEach(function (operation) {
                        var counter = 0;
                        var id = operation.nickname;
                        while (methods[id] !== undefined) {
                            id = id + '_' + counter;
                            counter += 1;
                        }
                        methods[id] = operation;
                        operation.nickname = id;
                        operation.parentId = self.model.id;
                        self.addOperation(operation);
                    });
                    local.jQuery('.toggleEndpointList', self.el).click(self.callDocs.bind(self, 'toggleEndpointListForResource'));
                    local.jQuery('.collapseResource', self.el).click(self.callDocs.bind(self, 'collapseOperationsForResource'));
                    local.jQuery('.expandResource', self.el).click(self.callDocs.bind(self, 'expandOperationsForResource'));
                    return self;
                },
                addOperation: function (operation) {
                    operation.number = this.number;
                    // Render an operation and add it to operations li
                    var operationView = new SwaggerUi.Views.OperationView({
                        model: operation,
                        tagName: 'li',
                        className: 'endpoint',
                        swaggerOptions: this.options.swaggerOptions,
                        auths: this.auths
                    });
                    local.jQuery('.endpoints', this.$el).append(operationView.render().el);
                    this.number += 1;
                },
                // Generic Event handler (`Docs` is global)
                callDocs: function (fnName, e) {
                    e.preventDefault();
                    Docs[fnName](e.currentTarget.getAttribute('data-id'));
                }
            });
            SwaggerUi.Views.ResponseContentTypeView = local.Backbone.View.extend({
                render: function () {
                    this.$el.html(local.Handlebars.templates.response_content_type(this.model));
                    return this;
                }
            });
            SwaggerUi.Views.SignatureView = local.Backbone.View.extend({
                events: {
                    'click a.description-link': 'switchToDescription',
                    'click a.snippet-link': 'switchToSnippet',
                    'mousedown .snippet': 'snippetToTextArea'
                },
                initialize: function () {
                },
                render: function () {
                    this.$el.html(local.Handlebars.templates.signature(this.model));
                    this.switchToSnippet();
                    this.isParam = this.model.isParam;
                    if (this.isParam) {
                        local.jQuery('.notice', this.$el).text('Click to set as parameter value');
                    }
                    return this;
                },
                // handler for show signature
                switchToDescription: function (e) {
                    if (e) {
                        e.preventDefault();
                    }
                    local.jQuery('.snippet', this.$el).hide();
                    local.jQuery('.description', this.$el).show();
                    local.jQuery('.description-link', this.$el).addClass('selected');
                    local.jQuery('.snippet-link', this.$el).removeClass('selected');
                },
                // handler for show sample
                switchToSnippet: function (e) {
                    if (e) {
                        e.preventDefault();
                    }
                    local.jQuery('.description', this.$el).hide();
                    local.jQuery('.snippet', this.$el).show();
                    local.jQuery('.snippet-link', this.$el).addClass('selected');
                    local.jQuery('.description-link', this.$el).removeClass('selected');
                },
                // handler for snippet to text area
                snippetToTextArea: function (e) {
                    if (this.isParam) {
                        if (e) {
                            e.preventDefault();
                        }
                        var textArea = local.jQuery('textarea', local.jQuery(this.el.parentNode.parentNode.parentNode));
                        // Fix for bug in IE 10/11 which causes placeholder text to be copied to "value"
                        if (local.jQuery.trim(textArea.val()) === '' || textArea.prop('placeholder') === textArea.val()) {
                            textArea.val(this.model.sampleJSON);
                        }
                    }
                }
            });
            SwaggerUi.Views.StatusCodeView = local.Backbone.View.extend({
                initialize: function (opts) {
                    this.options = opts || {};
                },
                render: function () {
                    this.$el.html(local.Handlebars.templates.status_code(this.model));
                    local.jQuery('.model-signature', this.$el).html('');
                    return this;
                }
            });
/* jslint-ignore-end */
        }());
        break;
    }
    return;
}());
