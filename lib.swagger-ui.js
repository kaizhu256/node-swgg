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
    var $, jQuery, local, nop;
    nop = function () {
    /*
     * this function will do nothing
     */
        return;
    };
    // jslint-hack
    nop($, jQuery);



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
        // init utility2
        local.utility2 = local.modeJs === 'browser'
            ? local.global.utility2
            : require('utility2');
        // init functions
        local.escape = function (text) {
            return text
                .replace((/\&/g), '&amp;')
                .replace((/</g), '&lt;')
                .replace((/>/g), '&gt;')
                .replace((/"/g), '&quot;')
                .replace((/'/g), '&#39;')
                .replace((/`/g), '&#96;');
        };
        local.extend = function (object, source1, source2) {
            local.utility2.objectSetOverride(object, source1 || {});
            local.utility2.objectSetOverride(object, source2 || {});
            return object;
        };
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
        local.isFunction = function (value) {
            return typeof value === 'function';
        };
        local.isObject = function (value) {
            return value && (typeof value === 'function' || typeof value === 'object');
        };
        local.isPlainObject = function (value) {
            return value && typeof value === 'object';
        };
        local.isUndefined = function (value) {
            return value === undefined;
        };
        local.pick = function (dict, list) {
            var result;
            result = {};
            list.forEach(function (key) {
                if (dict.hasOwnProperty(key)) {
                    result[key] = dict[key];
                }
            });
            return result;
        };
        local.result = function (dict, key) {
            return dict[key];
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
            var SwaggerClient;
            SwaggerClient = null;
/* jslint-ignore-begin */
            var helpers;
            helpers = {};
            var optionHtml = helpers.optionHtml = function (label, value) {
                return '<tr><td class="optionName">' + label + ':</td><td>' + value + '</td></tr>';
            };
            helpers.resolveSchema = function (schema) {
                return schema.schema || schema;
            };
            var simpleRef = helpers.simpleRef = function (name) {
                if (typeof name === 'undefined') {
                    return null;
                }
                if (name.indexOf('#/definitions/') === 0) {
                    return name.substring('#/definitions/'.length);
                } else {
                    return name;
                }
            };



            var auth = {};
            /**
             * SwaggerAuthorizations applys the correct authorization to an operation being executed
             */
            var SwaggerAuthorizations = auth.SwaggerAuthorizations = function (authz) {
                this.authz = authz || {};
            };

            /**
             * Add auths to the hash
             * Will overwrite any existing
             *
             */
            SwaggerAuthorizations.prototype.add = function (name, auth) {
                if (local.isObject(name)) {
                    for (var key in name) {
                        this.authz[key] = name[key];
                    }
                } else if (typeof name === 'string') {
                    this.authz[name] = auth;
                }

                return auth;
            };

            SwaggerAuthorizations.prototype.apply = function (obj, securities) {
                var status = true;
                var applyAll = !securities;
                var flattenedSecurities = [];

                // Securities could be [ {} ]
                local.forEach(securities, function (obj, key) {

                    // Make sure we account for securities being [ str ]
                    if (typeof key === 'string') {
                        flattenedSecurities.push(key);
                    }

                    // Flatten keys in to our array
                    local.forEach(obj, function (val, key) {
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
            var ApiKeyAuthorization = auth.ApiKeyAuthorization = function (name, value, type) {
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
                } else if (this.type === 'header') {
                    if (typeof obj.headers[this.name] === 'undefined') {
                        obj.headers[this.name] = this.value;
                    }

                    return true;
                }
            };





            var SchemaMarkup = {};
            SchemaMarkup.optionHtml = optionHtml;
            SchemaMarkup.typeFromJsonSchema = typeFromJsonSchema;
            SchemaMarkup.getStringSignature = getStringSignature;
            SchemaMarkup.schemaToHTML = schemaToHTML;
            SchemaMarkup.schemaToJSON = schemaToJSON;

            function optionHtml(label, value) {
                return '<tr><td class="optionName">' + label + ':</td><td>' + value + '</td></tr>';
            };

            function typeFromJsonSchema(type, format) {
                var str;

                if (type === 'integer' && format === 'int32') {
                    str = 'integer';
                } else if (type === 'integer' && format === 'int64') {
                    str = 'long';
                } else if (type === 'integer' && typeof format === 'undefined') {
                    str = 'long';
                } else if (type === 'string' && format === 'date-time') {
                    str = 'date-time';
                } else if (type === 'string' && format === 'date') {
                    str = 'date';
                } else if (type === 'number' && format === 'float') {
                    str = 'float';
                } else if (type === 'number' && format === 'double') {
                    str = 'double';
                } else if (type === 'number' && typeof format === 'undefined') {
                    str = 'double';
                } else if (type === 'boolean') {
                    str = 'boolean';
                } else if (type === 'string') {
                    str = 'string';
                }

                return str;
            };

            function getStringSignature(obj, baseComponent) {
                var str = '';

                if (obj.$ref) {
                    str += helpers.simpleRef(obj.$ref);
                } else if (typeof obj.type === 'undefined') {
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
                } else if (obj.type === 'integer' && typeof obj.format === 'undefined') {
                    str += 'long';
                } else if (obj.type === 'string' && obj.format === 'date-time') {
                    str += 'date-time';
                } else if (obj.type === 'string' && obj.format === 'date') {
                    str += 'date';
                } else if (obj.type === 'string' && typeof obj.format === 'undefined') {
                    str += 'string';
                } else if (obj.type === 'number' && obj.format === 'float') {
                    str += 'float';
                } else if (obj.type === 'number' && obj.format === 'double') {
                    str += 'double';
                } else if (obj.type === 'number' && typeof obj.format === 'undefined') {
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

            function schemaToJSON(schema, models, modelsToIgnore, modelPropertyMacro) {
                // Resolve the schema (Handle nested schemas)
                schema = helpers.resolveSchema(schema);

                if (typeof modelPropertyMacro !== 'function') {
                    modelPropertyMacro = function (prop) {
                        return (prop || {}).default;
                    }
                }

                modelsToIgnore = modelsToIgnore || {};

                var type = schema.type || 'object';
                var format = schema.format;
                var model;
                var output;

                if (schema.example) {
                    output = schema.example;
                } else if (local.isUndefined(schema.items) && Array.isArray(schema.enum)) {
                    output = schema.enum[0];
                }

                if (local.isUndefined(output)) {
                    if (schema.$ref) {
                        model = models[helpers.simpleRef(schema.$ref)];

                        if (!local.isUndefined(model)) {
                            if (local.isUndefined(modelsToIgnore[model.name])) {
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
                    } else if (!local.isUndefined(schema.default)) {
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
                        } else if (local.isPlainObject(schema.items)) {
                            output.push(schemaToJSON(schema.items, models, modelsToIgnore, modelPropertyMacro));
                        } else if (local.isUndefined(schema.items)) {
                            output.push({});
                        } else {
                            console.log('Array type\'s \'items\' property is not an array or an object, cannot process');
                        }
                    }
                }

                return output;
            };

            function schemaToHTML(name, schema, models, modelPropertyMacro) {

                var strongOpen = '<span class="strong">';
                var strongClose = '</span>';

                // Allow for ignoring the 'name' argument.... shifting the rest
                if (local.isObject(arguments[0])) {
                    name = void 0;
                    schema = arguments[0];
                    models = arguments[1];
                    modelPropertyMacro = arguments[2];
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
                    if (typeof schema === 'undefined') {
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
                    }
                }

                var references = {};
                var seenModels = [];
                var inlineModels = 0;



                // Generate current HTML
                var html = processModel(schema, name);

                // Generate references HTML
                while (Object.keys(references).length > 0) {
                    /* jshint ignore:start */
                    local.forEach(references, function (schema, name) {
                        var seenModel = seenModels.indexOf(name) > -1;

                        delete references[name];

                        if (!seenModel) {
                            seenModels.push(name);

                            html += '<br />' + processModel(schema, name);
                        }
                    });
                    /* jshint ignore:end */
                }

                return html;

                /////////////////////////////////

                function addReference(schema, name, skipRef) {
                    var modelName = name;
                    var model;

                    if (schema.$ref) {
                        modelName = schema.title || helpers.simpleRef(schema.$ref);
                        model = models[modelName];
                    } else if (local.isUndefined(name)) {
                        modelName = schema.title || 'Inline Model ' + (++inlineModels);
                        model = {
                            definition: schema
                        };
                    }

                    if (skipRef !== true) {
                        references[modelName] = local.isUndefined(model) ? {} : model.definition;
                    }

                    return modelName;
                };

                function primitiveToHTML(schema) {
                    var html = '<span class="propType">';
                    var type = schema.type || 'object';

                    if (schema.$ref) {
                        html += addReference(schema, helpers.simpleRef(schema.$ref));
                    } else if (type === 'object') {
                        if (!local.isUndefined(schema.properties)) {
                            html += addReference(schema);
                        } else {
                            html += 'object';
                        }
                    } else if (type === 'array') {
                        html += 'Array[';

                        if (Array.isArray(schema.items)) {
                            html += schema.items.map(addReference).join(',');
                        } else if (local.isPlainObject(schema.items)) {
                            if (local.isUndefined(schema.items.$ref)) {
                                if (!local.isUndefined(schema.items.type) && ['array', 'object'].indexOf(schema.items.type) === -1) {
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

                function primitiveToOptionsHTML(schema, html) {
                    var options = '';
                    var type = schema.type || 'object';
                    var isArray = type === 'array';

                    if (isArray) {
                        if (local.isPlainObject(schema.items) && !local.isUndefined(schema.items.type)) {
                            type = schema.items.type;
                        } else {
                            type = 'object';
                        }
                    }

                    if (!local.isUndefined(schema.default)) {
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

                    if (local.isUndefined(schema.items)) {
                        if (Array.isArray(schema.enum)) {
                            var enumString;

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

                function processModel(schema, name) {
                    var type = schema.type || 'object';
                    var isArray = schema.type === 'array';
                    var html = strongOpen + name + ' ' + (isArray ? '[' : '{') + strongClose;

                    if (name) {
                        seenModels.push(name);
                    }

                    if (isArray) {
                        if (Array.isArray(schema.items)) {
                            html += '<div>' + schema.items.map(function (item) {
                                var type = item.type || 'object';

                                if (local.isUndefined(item.$ref)) {
                                    if (['array', 'object'].indexOf(type) > -1) {
                                        if (type === 'object' && local.isUndefined(item.properties)) {
                                            return 'object';
                                        } else {
                                            return addReference(item);
                                        }
                                    } else {
                                        return primitiveToOptionsHTML(item, type);
                                    }
                                } else {
                                    return addReference(item, helpers.simpleRef(item.$ref));
                                }
                            }).join(',</div><div>');
                        } else if (local.isPlainObject(schema.items)) {
                            if (local.isUndefined(schema.items.$ref)) {
                                if (['array', 'object'].indexOf(schema.items.type || 'object') > -1) {
                                    if ((local.isUndefined(schema.items.type) || schema.items.type === 'object') && local.isUndefined(schema.items.properties)) {
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
                                var property = schema.properties[name];
                                var propertyIsRequired = ((schema.required || []).indexOf(name) >= 0);
                                var cProperty = local.utility2.jsonCopy(property);

                                var requiredClass = propertyIsRequired ? 'required' : '';
                                var html = '<span class="propName ' + requiredClass + '">' + name + '</span> (';
                                var model;

                                // Allow macro to set the default value
                                cProperty.default = modelPropertyMacro(cProperty);

                                // Resolve the schema (Handle nested schemas)
                                cProperty = helpers.resolveSchema(cProperty);

                                // We need to handle property references to primitives (Issue 339)
                                if (cProperty.$ref) {
                                    model = models[helpers.simpleRef(cProperty.$ref)];

                                    if (!local.isUndefined(model) && [undefined, 'array', 'object'].indexOf(model.definition.type) === -1) {
                                        // Use referenced schema
                                        cProperty = helpers.resolveSchema(model.definition);
                                    }
                                }

                                html += primitiveToHTML(cProperty);

                                if (!propertyIsRequired) {
                                    html += ', <span class="propOptKey">optional</span>';
                                }

                                html += ')';

                                if (!local.isUndefined(cProperty.description)) {
                                    html += ': ' + '<span class="propDesc">' + cProperty.description + '</span>';
                                }

                                if (cProperty.enum) {
                                    html += ' = <span class="propVals">[\'' + cProperty.enum.join('\', \'') + '\']</span>';
                                }

                                return primitiveToOptionsHTML(cProperty, html);
                            }).join(',</div><div>');

                            html += '</div>';
                        } else {
                            html += '<div>' + primitiveToOptionsHTML(schema, type) + '</div>';
                        }
                    }

                    return html + strongOpen + (isArray ? ']' : '}') + strongClose;
                };

            };





            /**
             * Resolves a spec's remote references
             */
            var Resolver = function () {};

            Resolver.prototype.resolve = function (spec, root, callback, scope) {
                var location, i;
                var _root = root;
                this.scope = (scope || this);
                this.iteration = this.iteration || 0;

                var name, path, property, propertyName;
                var processedCalls = 0,
                    resolvedRefs = {},
                    unresolvedRefs = {};
                var resolutionTable = []; // store objects for dereferencing

                // definitions
                for (name in spec.definitions) {
                    var definition = spec.definitions[name];
                    for (propertyName in definition.properties) {
                        property = definition.properties[propertyName];
                        this.resolveTo(root, property, resolutionTable, '/definitions');
                    }

                    if (definition.allOf) {
                        definition['x-resolved-from'] = ['#/definitions/' + name];
                        var allOf = definition.allOf;
                        // the refs go first
                        allOf.sort(function (a, b) {
                            if (a.$ref && b.$ref) {
                                return 0;
                            } else if (a.$ref) {
                                return -1;
                            } else {
                                return 1;
                            }
                        });
                        for (i = 0; i < allOf.length; i++) {
                            property = allOf[i];
                            location = '/definitions/' + name + '/allOf';
                            this.resolveInline(null, spec, property, resolutionTable, unresolvedRefs, location);
                        }
                    }
                }

                // operations
                for (name in spec.paths) {
                    var method, operation, responseCode;
                    path = spec.paths[name];

                    for (method in path) {
                        // operation reference
                        if (method === '$ref') {
                            // location = path[method];
                            location = '/paths' + name;
                            this.resolveInline(root, spec, path, resolutionTable, unresolvedRefs, location);
                        } else {
                            operation = path[method];

                            var parameters = operation.parameters;
                            for (i in parameters) {
                                var parameter = parameters[i];
                                location = '/paths' + name + '/' + method + '/parameters';

                                if (parameter.in === 'body' && parameter.schema) {
                                    this.resolveTo(root, parameter.schema, resolutionTable, location);
                                }

                                if (parameter.$ref) {
                                    // parameter reference
                                    this.resolveInline(root, spec, parameter, resolutionTable, unresolvedRefs, parameter.$ref);
                                }
                            }

                            for (responseCode in operation.responses) {
                                var response = operation.responses[responseCode];
                                location = '/paths' + name + '/' + method + '/responses/' + responseCode;

                                if (local.isObject(response)) {
                                    if (response.$ref) {
                                        // response reference
                                        this.resolveInline(root, spec, response, resolutionTable, unresolvedRefs, location);
                                    }
                                    if (response.schema) {
                                        this.resolveTo(root, response.schema, resolutionTable, location);
                                    }
                                }
                            }
                        }
                    }
                }

                var expectedCalls = 0,
                    toResolve = [];
                // if the root is same as obj[i].root we can resolve locally
                var all = resolutionTable;

                for (i = 0; i < all.length; i++) {
                    var a = all[i];
                    if (root === a.root) {
                        if (a.resolveAs === 'ref') {
                            // resolve any path walking
                            var joined = ((a.root || '') + '/' + a.key).split('/');
                            var normalized = [];
                            var url = '';
                            var k;

                            if (a.key.indexOf('../') >= 0) {
                                for (var j = 0; j < joined.length; j++) {
                                    if (joined[j] === '..') {
                                        normalized = normalized.slice(0, normalized.length - 1);
                                    } else {
                                        normalized.push(joined[j]);
                                    }
                                }
                                for (k = 0; k < normalized.length; k++) {
                                    if (k > 0) {
                                        url += '/';
                                    }
                                    url += normalized[k];
                                }
                                // we now have to remote resolve this because the path has changed
                                a.root = url;
                                toResolve.push(a);
                            } else {
                                var parts = a.key.split('#');
                                if (parts.length === 2) {
                                    if (parts[0].indexOf('http://') === 0 || parts[0].indexOf('https://') === 0) {
                                        a.root = parts[0];
                                    }
                                    location = parts[1].split('/');
                                    var r;
                                    var s = spec;
                                    for (k = 0; k < location.length; k++) {
                                        var part = location[k];
                                        if (part !== '') {
                                            s = s[part];
                                            if (typeof s !== 'undefined') {
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
                for (var ii = 0; ii < toResolve.length; ii++) {
                    (function (item, self) {
                        // local resolve
                        self.resolveItem(spec, _root, resolutionTable, resolvedRefs, unresolvedRefs, item);
                        processedCalls += 1;

                        if (processedCalls === expectedCalls) {
                            self.finish(spec, root, resolutionTable, resolvedRefs, unresolvedRefs, callback);
                        }
                    }(toResolve[ii], this));
                }

                if (Object.keys(toResolve).length === 0) {
                    this.finish(spec, _root, resolutionTable, resolvedRefs, unresolvedRefs, callback);
                }
            };

            Resolver.prototype.resolveItem = function (spec, root, resolutionTable, resolvedRefs, unresolvedRefs, item) {
                var path = item.location;
                var location = spec,
                    parts = path.split('/');
                for (var j = 0; j < parts.length; j++) {
                    var segment = parts[j];
                    if (segment.indexOf('~1') !== -1) {
                        segment = parts[j].replace(/~0/g, '~').replace(/~1/g, '/');
                        if (segment.charAt(0) !== '/') {
                            segment = '/' + segment;
                        }
                    }
                    if (typeof location === 'undefined' || location === null) {
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
                var resolved = item.key;
                parts = item.key.split('/');
                var resolvedName = parts[parts.length - 1];

                if (resolvedName.indexOf('#') >= 0) {
                    resolvedName = resolvedName.split('#')[1];
                }

                if (location !== null && typeof location !== 'undefined') {
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
                var ref;
                for (ref in resolutionTable) {
                    var item = resolutionTable[ref];

                    var key = item.key;
                    var resolvedTo = resolvedRefs[key];
                    if (resolvedTo) {
                        spec.definitions = spec.definitions || {};
                        if (item.resolveAs === 'ref') {
                            spec.definitions[resolvedTo.name] = resolvedTo.obj;
                            item.obj.$ref = '#/definitions/' + resolvedTo.name;
                        } else if (item.resolveAs === 'inline') {
                            var targetObj = item.obj;
                            targetObj['x-resolved-from'] = [item.key];
                            delete targetObj.$ref;

                            for (key in resolvedTo.obj) {
                                var abs = this.retainRoot(resolvedTo.obj[key], item.root);
                                targetObj[key] = abs;
                            }
                        }
                    }
                }
                var existingUnresolved = this.countUnresolvedRefs(spec);

                if (existingUnresolved.length === 0 || this.iteration > 5) {
                    this.resolveAllOf(spec.definitions);
                    callback.call(this.scope, spec, unresolvedRefs);
                } else {
                    this.iteration += 1;
                    this.resolve(spec, root, callback, this.scope);
                }
            };

            Resolver.prototype.countUnresolvedRefs = function (spec) {
                var i;
                var refs = this.getRefs(spec);
                var keys = [];
                var unresolvedKeys = [];
                for (i in refs) {
                    if (i.indexOf('#') === 0) {
                        keys.push(i.substring(1));
                    } else {
                        unresolvedKeys.push(i);
                    }
                }

                // verify possible keys
                for (i = 0; i < keys.length; i++) {
                    var part = keys[i];
                    var parts = part.split('/');
                    var obj = spec;

                    for (var k = 0; k < parts.length; k++) {
                        var key = parts[k];
                        if (key !== '') {
                            obj = obj[key];
                            if (typeof obj === 'undefined') {
                                unresolvedKeys.push(part);
                                break;
                            }
                        }
                    }
                }
                return unresolvedKeys.length;
            };

            Resolver.prototype.getRefs = function (spec, obj) {
                obj = obj || spec;
                var output = {};
                for (var key in obj) {
                    var item = obj[key];
                    if (key === '$ref' && typeof item === 'string') {
                        output[item] = null;
                    } else if (local.isObject(item)) {
                        var o = this.getRefs(item);
                        for (var k in o) {
                            output[k] = null;
                        }
                    }
                }
                return output;
            };

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
                        for (i = 0; i < p.length; i++) {
                            if (p[i] === '') {
                                p2 = p2.slice(0, p2.length - 1);
                            } else {
                                ref += p[i];
                            }
                        }
                        root = '';
                        for (i = 0; i < p2.length - 1; i++) {
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
                                    for (var k = 0; k < p2.length; k++) {
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
                    if (item && typeof item.allOf !== 'undefined') {
                        var allOf = item.allOf;
                        if (Array.isArray(allOf)) {
                            var output = {};
                            output['x-composed'] = true;
                            if (typeof item['x-resolved-from'] !== 'undefined') {
                                output['x-resolved-from'] = item['x-resolved-from'];
                            }
                            output.properties = {};
                            for (var i = 0; i < allOf.length; i++) {
                                var component = allOf[i];
                                var source = 'self';
                                if (typeof component['x-resolved-from'] !== 'undefined') {
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
                                                if (typeof resolvedFrom === 'undefined' || resolvedFrom === 'self') {
                                                    resolvedFrom = source;
                                                }
                                                output.properties[name]['x-resolved-from'] = resolvedFrom;
                                            }
                                        } else if (part === 'required') {
                                            // merge & dedup the required array
                                            var a = output.required.concat(component[part]);
                                            for (var k = 0; k < a.length; ++k) {
                                                for (var j = k + 1; j < a.length; ++j) {
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





            var Model = function (name, definition, models, modelPropertyMacro) {
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
                if (this.examples && local.isPlainObject(this.examples) && this.examples['application/json']) {
                    this.definition.example = this.examples['application/json'];

                    if (typeof this.definition.example === 'string') {
                        this.definition.example = jsyaml.safeLoad(this.definition.example);
                    }
                } else if (!this.definition.example) {
                    this.definition.example = this.examples;
                }

                return SchemaMarkup.schemaToJSON(this.definition, this.models, modelsToIgnore, this.modelPropertyMacro);
            };

            Model.prototype.getMockSignature = function () {
                return SchemaMarkup.schemaToHTML(this.name, this.definition, this.models, this.modelPropertyMacro);
            };




            var Operation = function (parent, scheme, operationId, httpMethod, path, args, definitions, models, clientAuthorizations) {
                var errors = [];

                parent = parent || {};
                args = args || {};

                if (parent && parent.options) {
                    this.client = parent.options.client || null;
                    this.responseInterceptor = parent.options.responseInterceptor || null;
                }
                this.authorizations = args.security;
                this.basePath = parent.basePath || '/';
                this.clientAuthorizations = clientAuthorizations;
                this.consumes = args.consumes || parent.consumes || ['application/json'];
                this.produces = args.produces || parent.produces || ['application/json'];
                this.deprecated = args.deprecated;
                this.description = args.description;
                this.host = parent.host || 'localhost';
                this.method = (httpMethod || errors.push('Operation ' + operationId + ' is missing method.'));
                this.models = models || {};
                this.nickname = (operationId || errors.push('Operations must have a nickname.'));
                this.operation = args;
                this.operations = {};
                this.parameters = args !== null ? (args.parameters || []) : {};
                this.parent = parent;
                this.path = (path || errors.push('Operation ' + this.nickname + ' is missing path.'));
                this.responses = (args.responses || {});
                this.scheme = scheme || parent.scheme || 'http';
                this.schemes = args.schemes || parent.schemes;
                this.security = args.security;
                this.summary = args.summary || '';
                this.type = null;
                this.parameterMacro = parent.parameterMacro || function (operation, parameter) {
                    return parameter.default;
                };

                this.inlineModels = [];

                if (typeof this.deprecated === 'string') {
                    switch (this.deprecated.toLowerCase()) {
                        case 'true':
                        case 'yes':
                        case '1':
                            {
                                this.deprecated = true;
                                break;
                            }

                        case 'false':
                        case 'no':
                        case '0':
                        case null:
                            {
                                this.deprecated = false;
                                break;
                            }

                        default:
                            this.deprecated = Boolean(this.deprecated);
                    }
                }

                var i, model;

                if (definitions) {
                    // add to global models
                    var key;

                    for (key in definitions) {
                        model = new Model(key, definitions[key], this.models, parent.modelPropertyMacro);

                        if (model) {
                            this.models[key] = model;
                        }
                    }
                }

                for (i = 0; i < this.parameters.length; i++) {
                    var param = this.parameters[i];

                    // Allow macro to set the default value
                    param.default = this.parameterMacro(this, param);

                    if (param.type === 'array') {
                        param.isList = true;
                        param.allowMultiple = true;
                    }

                    var innerType = this.getType(param);

                    if (innerType && innerType.toString().toLowerCase() === 'boolean') {
                        param.allowableValues = {};
                        param.isList = true;
                        param.enum = [true, false]; // use actual primitives
                    }

                    if (typeof param.enum !== 'undefined') {
                        var id;

                        param.allowableValues = {};
                        param.allowableValues.values = [];
                        param.allowableValues.descriptiveValues = [];

                        for (id = 0; id < param.enum.length; id++) {
                            var value = param.enum[id];
                            var isDefault = (value === param.default || value + '' === param.default);

                            param.allowableValues.values.push(value);
                            // Always have string for descriptive values....
                            param.allowableValues.descriptiveValues.push({
                                value: value + '',
                                isDefault: isDefault
                            });
                        }
                    }

                    if (param.type === 'array') {
                        innerType = [innerType];

                        if (typeof param.allowableValues === 'undefined') {
                            // can't show as a list if no values to select from
                            delete param.isList;
                            delete param.allowMultiple;
                        }
                    }

                    param.signature = this.getModelSignature(innerType, this.models).toString();
                    param.sampleJSON = this.getModelSampleJSON(innerType, this.models);
                    param.responseClassSignature = param.signature;
                }

                var defaultResponseCode, response, responses = this.responses;

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
                    var resolvedModel = this.resolveModel(response.schema, definitions);
                    var successResponse;

                    delete responses[defaultResponseCode];

                    if (resolvedModel) {
                        this.successResponse = {};
                        successResponse = this.successResponse[defaultResponseCode] = resolvedModel;
                    } else if (!response.schema.type || response.schema.type === 'object' || response.schema.type === 'array') {
                        // Inline model
                        this.successResponse = {};
                        successResponse = this.successResponse[defaultResponseCode] = new Model(undefined, response.schema || {}, this.models, parent.modelPropertyMacro);
                    } else {
                        // Primitive
                        this.successResponse = {};
                        successResponse = this.successResponse[defaultResponseCode] = response.schema;
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

                    this.type = response;
                }

                if (errors.length > 0) {
                    if (this.resource && this.resource.api && this.resource.api.fail) {
                        this.resource.api.fail(errors);
                    }
                }

                return this;
            };

            Operation.prototype.isDefaultArrayItemValue = function (value, param) {
                if (param.default && Array.isArray(param.default)) {
                    return param.default.indexOf(value) !== -1;
                }
                return value === param.default;
            };

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
                if (typeof schema.$ref !== 'undefined') {
                    var ref = schema.$ref;

                    if (ref.indexOf('#/definitions/') === 0) {
                        ref = ref.substring('#/definitions/'.length);
                    }

                    if (definitions[ref]) {
                        return new Model(ref, definitions[ref], this.models, this.parent.modelPropertyMacro);
                    }
                    // schema must at least be an object to get resolved to an inline Model
                } else if (schema && typeof schema === 'object' &&
                    (schema.type === 'object' || local.isUndefined(schema.type))) {
                    return new Model(undefined, schema, this.models, this.parent.modelPropertyMacro);
                }

                return null;
            };

            Operation.prototype.help = function (dontPrint) {
                var out = this.nickname + ': ' + this.summary + '\n';

                for (var i = 0; i < this.parameters.length; i++) {
                    var param = this.parameters[i];
                    var typeInfo = param.signature;

                    out += '\n  * ' + param.name + ' (' + typeInfo + '): ' + param.description;
                }

                if (typeof dontPrint === 'undefined') {
                    console.log(out);
                }

                return out;
            };

            Operation.prototype.getModelSignature = function (type, definitions) {
                var isPrimitive, listType;

                if (type instanceof Array) {
                    listType = true;
                    type = type[0];
                }

                // Convert undefined to string of 'undefined'
                if (typeof type === 'undefined') {
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

                for (var i = 0; i < this.parameters.length; i++) {
                    var param = this.parameters[i];

                    if (typeof args[param.name] !== 'undefined') {
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

                for (var i = 0; i < this.parameters.length; i++) {
                    var param = this.parameters[i];

                    if (typeof args[param.name] !== 'undefined') {
                        if (param.in === 'path') {
                            var reg = new RegExp('\{' + param.name + '\}', 'gi');
                            var value = args[param.name];

                            if (Array.isArray(value)) {
                                value = this.encodePathCollection(param.collectionFormat, param.name, value);
                            } else {
                                value = this.encodePathParam(value);
                            }

                            requestUrl = requestUrl.replace(reg, value);
                        } else if (param.in === 'query' && typeof args[param.name] !== 'undefined') {
                            if (querystring === '') {
                                querystring += '?';
                            } else {
                                querystring += '&';
                            }

                            if (typeof param.collectionFormat !== 'undefined') {
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
                var url = this.scheme + '://' + this.host;

                if (this.basePath !== '/') {
                    url += this.basePath;
                }
                return url + requestUrl + querystring;
            };

            Operation.prototype.getMissingParams = function (args) {
                var missingParams = []; // check required params, track the ones that are missing
                var i;

                for (i = 0; i < this.parameters.length; i++) {
                    var param = this.parameters[i];

                    if (param.required === true) {
                        if (typeof args[param.name] === 'undefined') {
                            missingParams = param.name;
                        }
                    }
                }

                return missingParams;
            };

            Operation.prototype.getBody = function (headers, args, opts) {
                var formParams = {},
                    body, key, value, hasBody = false;

                for (var i = 0; i < this.parameters.length; i++) {
                    var param = this.parameters[i];

                    if (typeof args[param.name] !== 'undefined') {
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
                if (hasBody && typeof body === 'undefined') {
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

                        if (typeof value !== 'undefined') {
                            if (encoded !== '') {
                                encoded += '&';
                            }

                            encoded += encodeURIComponent(key) + '=' + encodeURIComponent(value);
                        }
                    }

                    body = encoded;
                } else if (headers['Content-Type'] && headers['Content-Type'].indexOf('multipart/form-data') >= 0) {
                    var bodyParam = new FormData();

                    bodyParam.type = 'formData';

                    for (key in formParams) {
                        value = args[key];

                        if (typeof value !== 'undefined') {
                            // required for jquery file upload
                            if (value.type === 'file' && value.value) {
                                delete headers['Content-Type'];

                                bodyParam.append(key, value.value);
                            } else {
                                bodyParam.append(key, value);
                            }
                        }
                    }

                    body = bodyParam;
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

                            return this.formatXml(xmlString);
                        } else {
                            return JSON.stringify(sampleJson, null, 2);
                        }
                    } else {
                        return sampleJson;
                    }
                }
            };

            /**
             * executes an operation
             **/
            Operation.prototype.execute = function (
                data,
                options,
                onData,
                onError,
                parent
            ) {
                var onErrorData, self;
                self = this;
                if (typeof options === 'function') {
                    onError = onData;
                    onData = options;
                    options = {};
                }
                data = data || {};
                // init options
                options.headers = local.utility2.objectSetDefault(
                    self.setContentTypes(data, options),
                    self.getHeaderParams(data)
                );
                options.data = self.getBody(options.headers, data, options);
                options.method = self.method.toUpperCase();
                options.url = self.urlify(data);
                self.clientAuthorizations.apply(options, self.operation.security);
                if (options.mock) {
                    return options;
                }
                // init onErrorData
                onErrorData = function (error, xhr) {
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
                    if (options.modeErrorData) {
                        onData(error && data.obj, data);
                        return;
                    }
                    if (error) {
                        (onError || local.utility2.nop).call(options, data, parent);
                        return;
                    }
                    (onData || local.utility2.nop).call(options, data, parent);
                };
                // validate data
                try {
                    local.swgg.validateByParamDefList({
                        data: local.swgg.normalizeParamDictSwagger(
                            local.utility2.jsonCopy(data),
                            self
                        ),
                        key: self.operation.operationId,
                        paramDefList: self.parameters
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
                    if (parent && local.global.jQuery) {
                        local.global.jQuery(".sandbox", local.global.jQuery(parent.el))
                            .find("input[type='text'],select.parameter," +
                                "textarea.body-textarea")
                            .each(function () {
                                local.global.jQuery(this).addClass("error");
                                local.global.jQuery(this).wiggle();
                            });
                    }
                    return;
                }
                local.utility2.ajax(options, onErrorData);
            };

            function itemByPriority(col, itemPriority) {

                for (var i = 0, len = (itemPriority || []).length; i < len; i++) {
                    if (col.indexOf(itemPriority[i]) > -1) {
                        return itemPriority[i];
                    }
                }

                // Otherwise return first
                return col[0];
            }

            Operation.prototype.setContentTypes = function (args, opts) {
                // default type
                var allDefinedParams = this.parameters;
                var body;
                var consumes = args.parameterContentType || itemByPriority(this.consumes, ['application/json', 'application/yaml']);
                var accepts = opts.responseContentType || itemByPriority(this.produces, ['application/json', 'application/yaml']);
                var definedFileParams = [];
                var definedFormParams = [];
                var headers = {};
                var i;

                // get params from the operation and set them in definedFileParams, definedFormParams, headers
                for (i = 0; i < allDefinedParams.length; i++) {
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

                        if (typeof opts[param.name] !== 'undefined') {
                            headers[key] = headerValue;
                        }
                    } else if (param.in === 'body' && typeof args[param.name] !== 'undefined') {
                        body = args[param.name];
                    }
                }

                // if there's a body, need to set the consumes header via requestContentType
                if (this.method === 'post' || this.method === 'put' || this.method === 'patch' ||
                    (this.method === 'delete' && body)) {
                    if (opts.requestContentType) {
                        consumes = opts.requestContentType;
                    }
                    // if any form params, content type must be set
                    if (definedFormParams.length > 0) {
                        if (opts.requestContentType) { // override if set
                            consumes = opts.requestContentType;
                        } else if (definedFileParams.length > 0) { // if a file, must be multipart/form-data
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

            Operation.prototype.asCurl = function (args1) {
                var obj = this.execute(args1, { mock: true });
                var results = [];
                results.push('-X ' + this.method.toUpperCase());
                if (obj.headers) {
                    var key;

                    for (key in obj.headers) {
                        results.push('--header "' + key + ': ' + obj.headers[key] + '"');
                    }
                }
                if (obj.body) {
                    var body;

                    if (local.isObject(obj.body)) {
                        body = JSON.stringify(obj.body);
                    } else {
                        body = obj.body;
                    }
                    results.push('-d "' + body.replace(/"/g, '\\"') + '"');
                }
                return 'curl ' + (results.join(' ')) + ' "' + obj.url + '"';
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

                for (i = 0; i < value.length; i++) {
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
                    for (i = 0; i < value.length; i++) {
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
                        for (i = 0; i < value.length; i++) {
                            if (i !== 0) {
                                encoded += '&';
                            }

                            encoded += this.encodeQueryParam(name) + '[]=' + this.encodeQueryParam(value[i]);
                        }
                    }

                    if (separator !== '') {
                        for (i = 0; i < value.length; i++) {
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






            var OperationGroup = function (tag, description, externalDocs, operation) {
                this.description = description;
                this.externalDocs = externalDocs;
                this.name = tag;
                this.operation = operation;
                this.operationsArray = [];
                this.path = tag;
                this.tag = tag;
            };
            OperationGroup.prototype.sort = function () {
            };
            // We have to keep track of the function/property names to avoid collisions for tag names which are used to allow the
            // following usage: 'client.{tagName}'
            var reservedClientTags = [
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
                'help',
                'idFromOp',
                'info',
                'initialize',
                'isBuilt',
                'isValid',
                'modelPropertyMacro',
                'models',
                'modelsArray',
                'options',
                'parameterMacro',
                'parseUri',
                'progress',
                'resourceCount',
                'sampleModels',
                'selfReflect',
                'setConsolidatedModels',
                'spec',
                'supportedSubmitMethods',
                'swaggerRequestHeaders',
                'tagFromLabel',
                'url'
            ];
            // We have to keep track of the function/property names to avoid collisions for tag names which are used to allow the
            // following usage: 'client.apis.{tagName}'
            var reservedApiTags = [
                'apis',
                'asCurl',
                'description',
                'externalDocs',
                'help',
                'label',
                'name',
                'operation',
                'operations',
                'operationsArray',
                'path',
                'tag'
            ];
            var supportedOperationMethods = ['delete', 'get', 'head', 'options', 'patch', 'post', 'put'];
            var SwaggerClient = function (url, options) {
                this.authorizations = null;
                this.authorizationScheme = null;
                this.basePath = null;
                this.debug = false;
                this.info = null;
                this.isValid = false;
                this.modelsArray = [];
                this.resourceCount = 0;
                this.url = null;
                this.swaggerObject = {}
                this.clientAuthorizations = new auth.SwaggerAuthorizations();
                return this.initialize(url, options);
            };

            SwaggerClient.prototype.initialize = function (options) {
                this.models = {};
                this.sampleModels = {};
                this.url = options.url;
                options = options || {};
                this.clientAuthorizations.add(options.authorizations);
                this.swaggerRequestHeaders = options.swaggerRequestHeaders || 'application/json;charset=utf-8,*/*';
                this.defaultSuccessCallback = options.defaultSuccessCallback || null;
                this.defaultErrorCallback = options.defaultErrorCallback || null;
                this.modelPropertyMacro = options.modelPropertyMacro || null;
                this.parameterMacro = options.parameterMacro || null;

                if (typeof options.success === 'function') {
                    this.success = options.success;
                }

                this.options = options || {};

                this.supportedSubmitMethods = options.supportedSubmitMethods || [];
                this.failure = options.failure || function () {};
                this.progress = options.progress || function () {};
                this.spec = local.utility2.jsonCopy(options.spec); // Clone so we do not alter the provided document

                if (typeof options.success === 'function') {
                    this.ready = true;
                    this.build();
                }
            };

            SwaggerClient.prototype.build = function () {
                var self = this;

                this.progress('fetching resource list: ' + this.url);

                var obj = {
                    url: this.url,
                    method: 'get',
                    headers: {
                        accept: this.swaggerRequestHeaders
                    },
                    on: {
                        error: function (response) {
                            if (self.url.substring(0, 4) !== 'http') {
                                return self.fail('Please specify the protocol for ' + self.url);
                            } else if (response.status === 0) {
                                return self.fail('Can\'t read from server.  It may not have the appropriate access-control-origin settings.');
                            } else if (response.status === 404) {
                                return self.fail('Can\'t read swagger JSON from ' + self.url);
                            } else {
                                return self.fail(response.status + ' : ' + response.statusText + ' ' + self.url);
                            }
                        },
                        response: function (resp) {

                            var responseObj = resp.obj;
                            if (!responseObj) {
                                return self.fail('failed to parse JSON/YAML response');
                            }

                            self.swaggerVersion = responseObj.swaggerVersion;
                            self.swaggerObject = responseObj

                            self.swaggerVersion = responseObj.swagger;

                            new Resolver().resolve(responseObj, self.url, function (response) {
                                local.swgg.apiUpdate(response);
                                return self.buildFromSpec(response);
                            }, self);

                            self.isValid = true;
                        }
                    }
                };

                this.clientAuthorizations.apply(obj);
                local.utility2.ajax({
                    headers: obj.headers,
                    url: obj.url
                }, function (error, xhr) {
                    var response
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
                return this;
            };

            SwaggerClient.prototype.buildFromSpec = function (response) {
                this.apis = {};
                // init swagger-lite
                local.swgg = local.swgg || (local.modeJs === 'browser'
                    ? local.global.swgg
                    : require('./index.js'));
                this.apisArray = [];
                this.basePath = response.basePath || '';
                this.consumes = response.consumes;
                this.host = response.host || '';
                this.info = response.info || {};
                this.produces = response.produces;
                this.schemes = response.schemes || [];
                this.securityDefinitions = response.securityDefinitions;
                this.title = response.title || '';

                if (response.externalDocs) {
                    this.externalDocs = response.externalDocs;
                }

                var definedTags = {};
                var k;

                if (Array.isArray(response.tags)) {
                    definedTags = {};

                    for (k = 0; k < response.tags.length; k++) {
                        var t = response.tags[k];
                        definedTags[t.name] = t;
                    }
                }

                var location;

                if (typeof this.url === 'string') {
                    location = this.parseUri(this.url);
                    if (typeof this.schemes === 'undefined' || this.schemes.length === 0) {
                        this.scheme = location.scheme || 'http';
                    } else {
                        this.scheme = this.schemes[0];
                    }

                    if (typeof this.host === 'undefined' || this.host === '') {
                        this.host = location.host;

                        if (location.port) {
                            this.host = this.host + ':' + location.port;
                        }
                    }
                } else {
                    if (typeof this.schemes === 'undefined' || this.schemes.length === 0) {
                        this.scheme = 'http';
                    } else {
                        this.scheme = this.schemes[0];
                    }
                }

                this.definitions = response.definitions;

                var key;

                for (key in this.definitions) {
                    var model = new Model(key, this.definitions[key], this.models, this.modelPropertyMacro);

                    if (model) {
                        this.models[key] = model;
                    }
                }

                // get paths, create functions for each operationId
                var self = this;

                // Bind help to 'client.apis'
                self.apis.help = self.help.bind(self);

                local.forEach(response.paths, function (pathObj, path) {
                    // Only process a path if it's an object
                    if (!local.isPlainObject(pathObj)) {
                        return;
                    }

                    local.forEach(supportedOperationMethods, function (method) {
                        var operation = pathObj[method];

                        if (local.isUndefined(operation)) {
                            // Operation does not exist
                            return;
                        } else if (!local.isPlainObject(operation)) {
                            // Operation exists but it is not an Operation Object.  Since this is invalid, log it.
                            console.log('The \'' + method + '\' operation for \'' + path + '\' path is not an Operation Object');

                            return;
                        }

                        var tags = operation.tags;

                        if (local.isUndefined(tags) || !Array.isArray(tags) || tags.length === 0) {
                            tags = operation.tags = ['default'];
                        }

                        var operationId = self.idFromOp(path, method, operation);
                        var operationObject = new Operation(self,
                            operation.scheme,
                            operationId,
                            method,
                            path,
                            operation,
                            self.definitions,
                            self.models,
                            self.clientAuthorizations);

                        // bind self operation's execute command to the api
                        local.forEach(tags, function (tag) {
                            var clientProperty = reservedClientTags.indexOf(tag) > -1 ? '_' + tag : tag;
                            var apiProperty = reservedApiTags.indexOf(tag) > -1 ? '_' + tag : tag;
                            var operationGroup = self[clientProperty];

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

                            if (local.isUndefined(operationGroup)) {
                                operationGroup = self[clientProperty] = self.apis[apiProperty] = {};

                                operationGroup.operations = {};
                                operationGroup.label = apiProperty;
                                operationGroup.apis = {};

                                var tagDef = definedTags[tag];

                                if (!local.isUndefined(tagDef)) {
                                    operationGroup.description = tagDef.description;
                                    operationGroup.externalDocs = tagDef.externalDocs;
                                }

                                self[clientProperty].help = self.help.bind(operationGroup);
                                self.apisArray.push(new OperationGroup(tag, operationGroup.description, operationGroup.externalDocs, operationObject));
                            }

                            // Bind tag help
                            if (!typeof operationGroup.help === 'function') {
                                operationGroup.help = self.help.bind(operationGroup);
                            }

                            // bind to the apis object
                            self.apis[apiProperty][operationId] = operationGroup[operationId] = operationObject.execute.bind(operationObject);
                            self.apis[apiProperty][operationId].help = operationGroup[operationId].help = operationObject.help.bind(operationObject);
                            self.apis[apiProperty][operationId].asCurl = operationGroup[operationId].asCurl = operationObject.asCurl.bind(operationObject);

                            operationGroup.apis[operationId] = operationGroup.operations[operationId] = operationObject;

                            // legacy UI feature
                            var api;
                            (self.apisArray || []).forEach(function (element) {
                                if (element.tag === tag) {
                                    api = element;
                                }
                            });
                            if (api) {
                                api.operationsArray.push(operationObject);
                            }
                        });
                    });
                });
                if (this.success) {
                    this.isValid = true;
                    this.success();
                }
                return this;
            };

            SwaggerClient.prototype.parseUri = function (uri) {
                var urlParseRE = /^(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/;
                var parts = urlParseRE.exec(uri);

                return {
                    scheme: parts[4].replace(':', ''),
                    host: parts[11],
                    port: parts[12],
                    path: parts[15]
                };
            };

            SwaggerClient.prototype.help = function (dontPrint) {
                var output = '';

                if (this instanceof SwaggerClient) {
                    local.forEach(this.apis, function (api, name) {
                        if (local.isPlainObject(api)) {
                            output += 'operations for the \'' + name + '\' tag\n';

                            local.forEach(api.operations, function (operation, name) {
                                output += '  * ' + name + ': ' + operation.summary + '\n';
                            });
                        }
                    });
                } else if (this instanceof OperationGroup || local.isPlainObject(this)) {
                    output += 'operations for the \'' + this.label + '\' tag\n';

                    local.forEach(this.apis, function (operation, name) {
                        output += '  * ' + name + ': ' + operation.summary + '\n';
                    });
                }

                if (dontPrint) {
                    return output;
                } else {
                    console.log(output);

                    return output;
                }
            };

            SwaggerClient.prototype.tagFromLabel = function (label) {
                return label;
            };

            SwaggerClient.prototype.idFromOp = function (path, httpMethod, op) {
                if (!op || !op.operationId) {
                    op = op || {};
                    op.operationId = httpMethod + '_' + path;
                }
                var opId = op.operationId.replace(/[\s!@#$%^&*()_+=\[{\]};:<>|.\/?,\\'""-]/g, '_') || (path.substring(1) + '_' + httpMethod);

                opId = opId.replace(/((_){2,})/g, '_');
                opId = opId.replace(/^(_)*/g, '');
                opId = opId.replace(/([_])*$/g, '');
                return opId;
            };

            SwaggerClient.prototype.setHost = function (host) {
                this.host = host;

                if (this.apis) {
                    local.forEach(this.apis, function (api) {
                        if (api.operations) {
                            local.forEach(api.operations, function (operation) {
                                operation.host = host;
                            });
                        }
                    });
                }
            };

            SwaggerClient.prototype.setBasePath = function (basePath) {
                this.basePath = basePath;

                if (this.apis) {
                    local.forEach(this.apis, function (api) {
                        if (api.operations) {
                            local.forEach(api.operations, function (operation) {
                                operation.basePath = basePath;
                            });
                        }
                    });
                }
            };

            SwaggerClient.prototype.fail = function (message) {
                this.failure(message);

                throw message;
            };





            SwaggerClient.ApiKeyAuthorization = auth.ApiKeyAuthorization;
            SwaggerClient.SchemaMarkup = SchemaMarkup;
/* jslint-ignore-end */
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
        /* istanbul ignore next */
        // init lib jquery
        (function () {
/* jslint-ignore-begin */
// https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js
/*! jQuery v2.1.4 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l=a.document,m="2.1.4",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return n.each(this,a,b)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(n.isPlainObject(d)||(e=n.isArray(d)))?(e?(e=!1,f=c&&n.isArray(c)?c:[]):f=c&&n.isPlainObject(c)?c:{},g[b]=n.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return!n.isArray(a)&&a-parseFloat(a)+1>=0},isPlainObject:function(a){return"object"!==n.type(a)||a.nodeType||n.isWindow(a)?!1:a.constructor&&!j.call(a.constructor.prototype,"isPrototypeOf")?!1:!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=n.trim(a),a&&(1===a.indexOf("use strict")?(b=l.createElement("script"),b.text=a,l.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:g.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(c=a[b],b=a,a=c),n.isFunction(a)?(e=d.call(arguments,2),f=function(){return a.apply(b||this,e.concat(d.call(arguments)))},f.guid=a.guid=a.guid||n.guid++,f):void 0},now:Date.now,support:k}),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b="length"in a&&a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ha(),z=ha(),A=ha(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N=M.replace("w","w#"),O="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+N+"))|)"+L+"*\\]",P=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+O+")*)|.*)\\)|)",Q=new RegExp(L+"+","g"),R=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),S=new RegExp("^"+L+"*,"+L+"*"),T=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),U=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),V=new RegExp(P),W=new RegExp("^"+N+"$"),X={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+O),PSEUDO:new RegExp("^"+P),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,aa=/[+~]/,ba=/'|\\/g,ca=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),da=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},ea=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(fa){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function ga(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],k=b.nodeType,"string"!=typeof a||!a||1!==k&&9!==k&&11!==k)return d;if(!e&&p){if(11!==k&&(f=_.exec(a)))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return H.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName)return H.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=1!==k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(ba,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+ra(o[l]);w=aa.test(a)&&pa(b.parentNode)||b,x=o.join(",")}if(x)try{return H.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function ha(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ia(a){return a[u]=!0,a}function ja(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ka(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function la(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function na(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function oa(a){return ia(function(b){return b=+b,ia(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function pa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=ga.support={},f=ga.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=ga.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=g.documentElement,e=g.defaultView,e&&e!==e.top&&(e.addEventListener?e.addEventListener("unload",ea,!1):e.attachEvent&&e.attachEvent("onunload",ea)),p=!f(g),c.attributes=ja(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ja(function(a){return a.appendChild(g.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(g.getElementsByClassName),c.getById=ja(function(a){return o.appendChild(a).id=u,!g.getElementsByName||!g.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(g.querySelectorAll))&&(ja(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\f]' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ja(function(a){var b=g.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ja(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",P)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===g||a.ownerDocument===v&&t(v,a)?-1:b===g||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,h=[a],i=[b];if(!e||!f)return a===g?-1:b===g?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return la(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?la(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},g):n},ga.matches=function(a,b){return ga(a,null,null,b)},ga.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return ga(b,n,null,[a]).length>0},ga.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},ga.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},ga.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},ga.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=ga.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=ga.selectors={cacheLength:50,createPseudo:ia,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ca,da),a[3]=(a[3]||a[4]||a[5]||"").replace(ca,da),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||ga.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&ga.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ca,da).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=ga.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(Q," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||ga.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ia(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ia(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?ia(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ia(function(a){return function(b){return ga(a,b).length>0}}),contains:ia(function(a){return a=a.replace(ca,da),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ia(function(a){return W.test(a||"")||ga.error("unsupported lang: "+a),a=a.replace(ca,da).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:oa(function(){return[0]}),last:oa(function(a,b){return[b-1]}),eq:oa(function(a,b,c){return[0>c?c+b:c]}),even:oa(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:oa(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:oa(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:oa(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=ma(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=na(b);function qa(){}qa.prototype=d.filters=d.pseudos,d.setFilters=new qa,g=ga.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?ga.error(a):z(a,i).slice(0)};function ra(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function sa(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function ta(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ua(a,b,c){for(var d=0,e=b.length;e>d;d++)ga(a,b[d],c);return c}function va(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function wa(a,b,c,d,e,f){return d&&!d[u]&&(d=wa(d)),e&&!e[u]&&(e=wa(e,f)),ia(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ua(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:va(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=va(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=va(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function xa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=sa(function(a){return a===b},h,!0),l=sa(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[sa(ta(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return wa(i>1&&ta(m),i>1&&ra(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&xa(a.slice(i,e)),f>e&&xa(a=a.slice(e)),f>e&&ra(a))}m.push(c)}return ta(m)}function ya(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=F.call(i));s=va(s)}H.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&ga.uniqueSort(i)}return k&&(w=v,j=t),r};return c?ia(f):f}return h=ga.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=xa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,ya(e,d)),f.selector=a}return f},i=ga.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ca,da),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ca,da),aa.test(j[0].type)&&pa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&ra(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,aa.test(a)&&pa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ja(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ja(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ka("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ja(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ka("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ja(function(a){return null==a.getAttribute("disabled")})||ka(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),ga}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=n.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return g.call(b,a)>=0!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;c>b;b++)if(n.contains(e[b],this))return!0}));for(b=0;c>b;b++)n.find(a,e[b],d);return d=this.pushStack(c>1?n.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?n(a):a||[],!1).length}});var y,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=n.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:l,!0)),v.test(c[1])&&n.isPlainObject(b))for(c in b)n.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=l.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=l,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};A.prototype=n.fn,y=n(l);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};n.extend({dir:function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),n.fn.extend({has:function(a){var b=n(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(n.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.unique(f):f)},index:function(a){return a?"string"==typeof a?g.call(n(a),this[0]):g.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.unique(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){while((a=a[b])&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return n.dir(a,"parentNode")},parentsUntil:function(a,b,c){return n.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return n.dir(a,"nextSibling")},prevAll:function(a){return n.dir(a,"previousSibling")},nextUntil:function(a,b,c){return n.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return n.dir(a,"previousSibling",c)},siblings:function(a){return n.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return n.sibling(a.firstChild)},contents:function(a){return a.contentDocument||n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(C[a]||n.unique(e),B.test(a)&&e.reverse()),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return n.each(a.match(E)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):n.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(b=a.memory&&l,c=!0,g=e||0,e=0,f=h.length,d=!0;h&&f>g;g++)if(h[g].apply(l[0],l[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,h&&(i?i.length&&j(i.shift()):b?h=[]:k.disable())},k={add:function(){if(h){var c=h.length;!function g(b){n.each(b,function(b,c){var d=n.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&g(c)})}(arguments),d?f=h.length:b&&(e=c,j(b))}return this},remove:function(){return h&&n.each(arguments,function(a,b){var c;while((c=n.inArray(b,h,c))>-1)h.splice(c,1),d&&(f>=c&&f--,g>=c&&g--)}),this},has:function(a){return a?n.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],f=0,this},disable:function(){return h=i=b=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,b||k.disable(),this},locked:function(){return!i},fireWith:function(a,b){return!h||c&&!i||(b=b||[],b=[a,b.slice?b.slice():b],d?i.push(b):j(b)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!c}};return k},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&n.isFunction(a.promise)?e:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(H.resolveWith(l,[n]),n.fn.triggerHandler&&(n(l).triggerHandler("ready"),n(l).off("ready"))))}});function I(){l.removeEventListener("DOMContentLoaded",I,!1),a.removeEventListener("load",I,!1),n.ready()}n.ready.promise=function(b){return H||(H=n.Deferred(),"complete"===l.readyState?setTimeout(n.ready):(l.addEventListener("DOMContentLoaded",I,!1),a.addEventListener("load",I,!1))),H.promise(b)},n.ready.promise();var J=n.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)n.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};n.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function K(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=n.expando+K.uid++}K.uid=1,K.accepts=n.acceptData,K.prototype={key:function(a){if(!K.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=K.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,n.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(n.isEmptyObject(f))n.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,n.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{n.isArray(b)?d=b.concat(b.map(n.camelCase)):(e=n.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(E)||[])),c=d.length;while(c--)delete g[d[c]]}},hasData:function(a){return!n.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var L=new K,M=new K,N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(O,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c}catch(e){}M.set(a,b,c)}else c=void 0;return c}n.extend({hasData:function(a){return M.hasData(a)||L.hasData(a)},data:function(a,b,c){
return M.access(a,b,c)},removeData:function(a,b){M.remove(a,b)},_data:function(a,b,c){return L.access(a,b,c)},_removeData:function(a,b){L.remove(a,b)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=M.get(f),1===f.nodeType&&!L.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d])));L.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){M.set(this,a)}):J(this,function(b){var c,d=n.camelCase(a);if(f&&void 0===b){if(c=M.get(f,a),void 0!==c)return c;if(c=M.get(f,d),void 0!==c)return c;if(c=P(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=M.get(this,d);M.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&M.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){M.remove(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=L.get(a,b),c&&(!d||n.isArray(c)?d=L.access(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return L.get(a,c)||L.access(a,c,{empty:n.Callbacks("once memory").add(function(){L.remove(a,[b+"queue",c])})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=L.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var Q=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,R=["Top","Right","Bottom","Left"],S=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)},T=/^(?:checkbox|radio)$/i;!function(){var a=l.createDocumentFragment(),b=a.appendChild(l.createElement("div")),c=l.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var U="undefined";k.focusinBubbles="onfocusin"in a;var V=/^key/,W=/^(?:mouse|pointer|contextmenu)|click/,X=/^(?:focusinfocus|focusoutblur)$/,Y=/^([^.]*)(?:\.(.+)|)$/;function Z(){return!0}function $(){return!1}function _(){try{return l.activeElement}catch(a){}}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=n.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return typeof n!==U&&n.event.triggered!==b.type?n.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(E)||[""],j=b.length;while(j--)h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o&&(l=n.event.special[o]||{},o=(e?l.delegateType:l.bindType)||o,l=n.event.special[o]||{},k=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[o])||(m=i[o]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(o,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),n.event.global[o]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.hasData(a)&&L.get(a);if(r&&(i=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=i[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete i[o])}else for(o in i)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(i)&&(delete r.handle,L.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,m,o,p=[d||l],q=j.call(b,"type")?b.type:b,r=j.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||l,3!==d.nodeType&&8!==d.nodeType&&!X.test(q+n.event.triggered)&&(q.indexOf(".")>=0&&(r=q.split("."),q=r.shift(),r.sort()),k=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=r.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:n.makeArray(c,[b]),o=n.event.special[q]||{},e||!o.trigger||o.trigger.apply(d,c)!==!1)){if(!e&&!o.noBubble&&!n.isWindow(d)){for(i=o.delegateType||q,X.test(i+q)||(g=g.parentNode);g;g=g.parentNode)p.push(g),h=g;h===(d.ownerDocument||l)&&p.push(h.defaultView||h.parentWindow||a)}f=0;while((g=p[f++])&&!b.isPropagationStopped())b.type=f>1?i:o.bindType||q,m=(L.get(g,"events")||{})[b.type]&&L.get(g,"handle"),m&&m.apply(g,c),m=k&&g[k],m&&m.apply&&n.acceptData(g)&&(b.result=m.apply(g,c),b.result===!1&&b.preventDefault());return b.type=q,e||b.isDefaultPrevented()||o._default&&o._default.apply(p.pop(),c)!==!1||!n.acceptData(d)||k&&n.isFunction(d[q])&&!n.isWindow(d)&&(h=d[k],h&&(d[k]=null),n.event.triggered=q,d[q](),n.event.triggered=void 0,h&&(d[k]=h)),b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(L.get(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(g.namespace))&&(a.handleObj=g,a.data=g.data,e=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(a.result=e)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>=0:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||l,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[n.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=W.test(e)?this.mouseHooks:V.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new n.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=l),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==_()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===_()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&n.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=n.extend(new n.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?n.event.trigger(e,null,b):n.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},n.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?Z:$):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={isDefaultPrevented:$,isPropagationStopped:$,isImmediatePropagationStopped:$,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=Z,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=Z,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=Z,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!n.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.focusinBubbles||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a),!0)};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=L.access(d,b);e||d.addEventListener(a,c,!0),L.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=L.access(d,b)-1;e?L.access(d,b,e):(d.removeEventListener(a,c,!0),L.remove(d,b))}}}),n.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=$;else if(!d)return this;return 1===e&&(f=d,d=function(a){return n().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=n.guid++)),this.each(function(){n.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=$),this.each(function(){n.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}});var aa=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,ba=/<([\w:]+)/,ca=/<|&#?\w+;/,da=/<(?:script|style|link)/i,ea=/checked\s*(?:[^=]|=\s*.checked.)/i,fa=/^$|\/(?:java|ecma)script/i,ga=/^true\/(.*)/,ha=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ia={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ia.optgroup=ia.option,ia.tbody=ia.tfoot=ia.colgroup=ia.caption=ia.thead,ia.th=ia.td;function ja(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function ka(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function la(a){var b=ga.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function ma(a,b){for(var c=0,d=a.length;d>c;c++)L.set(a[c],"globalEval",!b||L.get(b[c],"globalEval"))}function na(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(L.hasData(a)&&(f=L.access(a),g=L.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)n.event.add(b,e,j[e][c])}M.hasData(a)&&(h=M.access(a),i=n.extend({},h),M.set(b,i))}}function oa(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&n.nodeName(a,b)?n.merge([a],c):c}function pa(a,b){var c=b.nodeName.toLowerCase();"input"===c&&T.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}n.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=n.contains(a.ownerDocument,a);if(!(k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(g=oa(h),f=oa(a),d=0,e=f.length;e>d;d++)pa(f[d],g[d]);if(b)if(c)for(f=f||oa(a),g=g||oa(h),d=0,e=f.length;e>d;d++)na(f[d],g[d]);else na(a,h);return g=oa(h,"script"),g.length>0&&ma(g,!i&&oa(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,o=a.length;o>m;m++)if(e=a[m],e||0===e)if("object"===n.type(e))n.merge(l,e.nodeType?[e]:e);else if(ca.test(e)){f=f||k.appendChild(b.createElement("div")),g=(ba.exec(e)||["",""])[1].toLowerCase(),h=ia[g]||ia._default,f.innerHTML=h[1]+e.replace(aa,"<$1></$2>")+h[2],j=h[0];while(j--)f=f.lastChild;n.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));k.textContent="",m=0;while(e=l[m++])if((!d||-1===n.inArray(e,d))&&(i=n.contains(e.ownerDocument,e),f=oa(k.appendChild(e),"script"),i&&ma(f),c)){j=0;while(e=f[j++])fa.test(e.type||"")&&c.push(e)}return k},cleanData:function(a){for(var b,c,d,e,f=n.event.special,g=0;void 0!==(c=a[g]);g++){if(n.acceptData(c)&&(e=c[L.expando],e&&(b=L.cache[e]))){if(b.events)for(d in b.events)f[d]?n.event.remove(c,d):n.removeEvent(c,d,b.handle);L.cache[e]&&delete L.cache[e]}delete M.cache[c[M.expando]]}}}),n.fn.extend({text:function(a){return J(this,function(a){return void 0===a?n.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=ja(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=ja(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?n.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||n.cleanData(oa(c)),c.parentNode&&(b&&n.contains(c.ownerDocument,c)&&ma(oa(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(n.cleanData(oa(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return J(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!da.test(a)&&!ia[(ba.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(aa,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(oa(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,n.cleanData(oa(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,m=this,o=l-1,p=a[0],q=n.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&ea.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(c=n.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(f=n.map(oa(c,"script"),ka),g=f.length;l>j;j++)h=c,j!==o&&(h=n.clone(h,!0,!0),g&&n.merge(f,oa(h,"script"))),b.call(this[j],h,j);if(g)for(i=f[f.length-1].ownerDocument,n.map(f,la),j=0;g>j;j++)h=f[j],fa.test(h.type||"")&&!L.access(h,"globalEval")&&n.contains(i,h)&&(h.src?n._evalUrl&&n._evalUrl(h.src):n.globalEval(h.textContent.replace(ha,"")))}return this}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=[],e=n(a),g=e.length-1,h=0;g>=h;h++)c=h===g?this:this.clone(!0),n(e[h])[b](c),f.apply(d,c.get());return this.pushStack(d)}});var qa,ra={};function sa(b,c){var d,e=n(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:n.css(e[0],"display");return e.detach(),f}function ta(a){var b=l,c=ra[a];return c||(c=sa(a,b),"none"!==c&&c||(qa=(qa||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=qa[0].contentDocument,b.write(),b.close(),c=sa(a,b),qa.detach()),ra[a]=c),c}var ua=/^margin/,va=new RegExp("^("+Q+")(?!px)[a-z%]+$","i"),wa=function(b){return b.ownerDocument.defaultView.opener?b.ownerDocument.defaultView.getComputedStyle(b,null):a.getComputedStyle(b,null)};function xa(a,b,c){var d,e,f,g,h=a.style;return c=c||wa(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),va.test(g)&&ua.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function ya(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d=l.documentElement,e=l.createElement("div"),f=l.createElement("div");if(f.style){f.style.backgroundClip="content-box",f.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===f.style.backgroundClip,e.style.cssText="border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",e.appendChild(f);function g(){f.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",f.innerHTML="",d.appendChild(e);var g=a.getComputedStyle(f,null);b="1%"!==g.top,c="4px"===g.width,d.removeChild(e)}a.getComputedStyle&&n.extend(k,{pixelPosition:function(){return g(),b},boxSizingReliable:function(){return null==c&&g(),c},reliableMarginRight:function(){var b,c=f.appendChild(l.createElement("div"));return c.style.cssText=f.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",c.style.marginRight=c.style.width="0",f.style.width="1px",d.appendChild(e),b=!parseFloat(a.getComputedStyle(c,null).marginRight),d.removeChild(e),f.removeChild(c),b}})}}(),n.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var za=/^(none|table(?!-c[ea]).+)/,Aa=new RegExp("^("+Q+")(.*)$","i"),Ba=new RegExp("^([+-])=("+Q+")","i"),Ca={position:"absolute",visibility:"hidden",display:"block"},Da={letterSpacing:"0",fontWeight:"400"},Ea=["Webkit","O","Moz","ms"];function Fa(a,b){if(b in a)return b;var c=b[0].toUpperCase()+b.slice(1),d=b,e=Ea.length;while(e--)if(b=Ea[e]+c,b in a)return b;return d}function Ga(a,b,c){var d=Aa.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Ha(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+R[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+R[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+R[f]+"Width",!0,e))):(g+=n.css(a,"padding"+R[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+R[f]+"Width",!0,e)));return g}function Ia(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=wa(a),g="border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=xa(a,b,f),(0>e||null==e)&&(e=a.style[b]),va.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Ha(a,b,c||(g?"border":"content"),d,f)+"px"}function Ja(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=L.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&S(d)&&(f[g]=L.access(d,"olddisplay",ta(d.nodeName)))):(e=S(d),"none"===c&&e||L.set(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=xa(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;return b=n.cssProps[h]||(n.cssProps[h]=Fa(i,h)),g=n.cssHooks[b]||n.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Ba.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(n.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||n.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Fa(a.style,h)),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=xa(a,b,d)),"normal"===e&&b in Da&&(e=Da[b]),""===c||c?(f=parseFloat(e),c===!0||n.isNumeric(f)?f||0:e):e}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?za.test(n.css(a,"display"))&&0===a.offsetWidth?n.swap(a,Ca,function(){return Ia(a,b,d)}):Ia(a,b,d):void 0},set:function(a,c,d){var e=d&&wa(a);return Ga(a,c,d?Ha(a,b,d,"border-box"===n.css(a,"boxSizing",!1,e),e):0)}}}),n.cssHooks.marginRight=ya(k.reliableMarginRight,function(a,b){return b?n.swap(a,{display:"inline-block"},xa,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+R[d]+b]=f[d]||f[d-2]||f[0];return e}},ua.test(a)||(n.cssHooks[a+b].set=Ga)}),n.fn.extend({css:function(a,b){return J(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=wa(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return Ja(this,!0)},hide:function(){return Ja(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){S(this)?n(this).show():n(this).hide()})}});function Ka(a,b,c,d,e){return new Ka.prototype.init(a,b,c,d,e)}n.Tween=Ka,Ka.prototype={constructor:Ka,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=Ka.propHooks[this.prop];return a&&a.get?a.get(this):Ka.propHooks._default.get(this)},run:function(a){var b,c=Ka.propHooks[this.prop];return this.options.duration?this.pos=b=n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Ka.propHooks._default.set(this),this}},Ka.prototype.init.prototype=Ka.prototype,Ka.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[n.cssProps[a.prop]]||n.cssHooks[a.prop])?n.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Ka.propHooks.scrollTop=Ka.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},n.fx=Ka.prototype.init,n.fx.step={};var La,Ma,Na=/^(?:toggle|show|hide)$/,Oa=new RegExp("^(?:([+-])=|)("+Q+")([a-z%]*)$","i"),Pa=/queueHooks$/,Qa=[Va],Ra={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=Oa.exec(b),f=e&&e[3]||(n.cssNumber[a]?"":"px"),g=(n.cssNumber[a]||"px"!==f&&+d)&&Oa.exec(n.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,n.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function Sa(){return setTimeout(function(){La=void 0}),La=n.now()}function Ta(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=R[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ua(a,b,c){for(var d,e=(Ra[b]||[]).concat(Ra["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Va(a,b,c){var d,e,f,g,h,i,j,k,l=this,m={},o=a.style,p=a.nodeType&&S(a),q=L.get(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){l.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=n.css(a,"display"),k="none"===j?L.get(a,"olddisplay")||ta(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(o.display="inline-block")),c.overflow&&(o.overflow="hidden",l.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Na.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}m[d]=q&&q[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(m))"inline"===("none"===j?ta(a.nodeName):j)&&(o.display=j);else{q?"hidden"in q&&(p=q.hidden):q=L.access(a,"fxshow",{}),f&&(q.hidden=!p),p?n(a).show():l.done(function(){n(a).hide()}),l.done(function(){var b;L.remove(a,"fxshow");for(b in m)n.style(a,b,m[b])});for(d in m)g=Ua(p?q[d]:0,d,l),d in q||(q[d]=g.start,p&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function Wa(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function Xa(a,b,c){var d,e,f=0,g=Qa.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=La||Sa(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:La||Sa(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(Wa(k,j.opts.specialEasing);g>f;f++)if(d=Qa[f].call(j,a,k,j.opts))return d;return n.map(k,Ua,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(Xa,{tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],Ra[c]=Ra[c]||[],Ra[c].unshift(b)},prefilter:function(a,b){b?Qa.unshift(a):Qa.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(S).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=Xa(this,n.extend({},a),f);(e||L.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=L.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Pa.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=L.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Ta(b,!0),a,d,e)}}),n.each({slideDown:Ta("show"),slideUp:Ta("hide"),slideToggle:Ta("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=0,c=n.timers;for(La=n.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||n.fx.stop(),La=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){Ma||(Ma=setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){clearInterval(Ma),Ma=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(a,b){return a=n.fx?n.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=l.createElement("input"),b=l.createElement("select"),c=b.appendChild(l.createElement("option"));a.type="checkbox",k.checkOn=""!==a.value,k.optSelected=c.selected,b.disabled=!0,k.optDisabled=!c.disabled,a=l.createElement("input"),a.value="t",a.type="radio",k.radioValue="t"===a.value}();var Ya,Za,$a=n.expr.attrHandle;n.fn.extend({attr:function(a,b){return J(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===U?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),d=n.attrHooks[b]||(n.expr.match.bool.test(b)?Za:Ya)),
void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=n.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void n.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),Za={set:function(a,b,c){return b===!1?n.removeAttr(a,c):a.setAttribute(c,c),c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=$a[b]||n.find.attr;$a[b]=function(a,b,d){var e,f;return d||(f=$a[b],$a[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,$a[b]=f),e}});var _a=/^(?:input|select|textarea|button)$/i;n.fn.extend({prop:function(a,b){return J(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[n.propFix[a]||a]})}}),n.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!n.isXMLDoc(a),f&&(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||_a.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),k.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this});var ab=/[\t\r\n\f]/g;n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ab," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=n.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ab," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?n.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(n.isFunction(a)?function(c){n(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=n(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===U||"boolean"===c)&&(this.className&&L.set(this,"__className__",this.className),this.className=this.className||a===!1?"":L.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ab," ").indexOf(b)>=0)return!0;return!1}});var bb=/\r/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(bb,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=n.inArray(d.value,f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>=0:void 0}},k.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var cb=n.now(),db=/\?/;n.parseJSON=function(a){return JSON.parse(a+"")},n.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&n.error("Invalid XML: "+a),b};var eb=/#.*$/,fb=/([?&])_=[^&]*/,gb=/^(.*?):[ \t]*([^\r\n]*)$/gm,hb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,ib=/^(?:GET|HEAD)$/,jb=/^\/\//,kb=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,lb={},mb={},nb="*/".concat("*"),ob=a.location.href,pb=kb.exec(ob.toLowerCase())||[];function qb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(n.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function rb(a,b,c,d){var e={},f=a===mb;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function sb(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&n.extend(!0,a,d),a}function tb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function ub(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:ob,type:"GET",isLocal:hb.test(pb[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":nb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?sb(sb(a,n.ajaxSettings),b):sb(n.ajaxSettings,a)},ajaxPrefilter:qb(lb),ajaxTransport:qb(mb),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=n.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?n(l):n.event,o=n.Deferred(),p=n.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!f){f={};while(b=gb.exec(e))f[b[1].toLowerCase()]=b[2]}b=f[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?e:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return c&&c.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||ob)+"").replace(eb,"").replace(jb,pb[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=n.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(h=kb.exec(k.url.toLowerCase()),k.crossDomain=!(!h||h[1]===pb[1]&&h[2]===pb[2]&&(h[3]||("http:"===h[1]?"80":"443"))===(pb[3]||("http:"===pb[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=n.param(k.data,k.traditional)),rb(lb,k,b,v),2===t)return v;i=n.event&&k.global,i&&0===n.active++&&n.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!ib.test(k.type),d=k.url,k.hasContent||(k.data&&(d=k.url+=(db.test(d)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=fb.test(d)?d.replace(fb,"$1_="+cb++):d+(db.test(d)?"&":"?")+"_="+cb++)),k.ifModified&&(n.lastModified[d]&&v.setRequestHeader("If-Modified-Since",n.lastModified[d]),n.etag[d]&&v.setRequestHeader("If-None-Match",n.etag[d])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+nb+"; q=0.01":""):k.accepts["*"]);for(j in k.headers)v.setRequestHeader(j,k.headers[j]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(j in{success:1,error:1,complete:1})v[j](k[j]);if(c=rb(mb,k,b,v)){v.readyState=1,i&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,c.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,f,h){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),c=void 0,e=h||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,f&&(u=tb(k,v,f)),u=ub(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(n.lastModified[d]=w),w=v.getResponseHeader("etag"),w&&(n.etag[d]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,i&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),i&&(m.trigger("ajaxComplete",[v,k]),--n.active||n.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){var b;return n.isFunction(a)?this.each(function(b){n(this).wrapAll(a.call(this,b))}):(this[0]&&(b=n(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(n.isFunction(a)?function(b){n(this).wrapInner(a.call(this,b))}:function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},n.expr.filters.visible=function(a){return!n.expr.filters.hidden(a)};var vb=/%20/g,wb=/\[\]$/,xb=/\r?\n/g,yb=/^(?:submit|button|image|reset|file)$/i,zb=/^(?:input|select|textarea|keygen)/i;function Ab(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||wb.test(a)?d(a,e):Ab(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Ab(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Ab(c,a[c],b,e);return d.join("&").replace(vb,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&zb.test(this.nodeName)&&!yb.test(a)&&(this.checked||!T.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(xb,"\r\n")}}):{name:b.name,value:c.replace(xb,"\r\n")}}).get()}}),n.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Bb=0,Cb={},Db={0:200,1223:204},Eb=n.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in Cb)Cb[a]()}),k.cors=!!Eb&&"withCredentials"in Eb,k.ajax=Eb=!!Eb,n.ajaxTransport(function(a){var b;return k.cors||Eb&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Bb;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Cb[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Db[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Cb[g]=b("abort");try{f.send(a.hasContent&&a.data||null)}catch(h){if(b)throw h}},abort:function(){b&&b()}}:void 0}),n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=n("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),l.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Fb=[],Gb=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Fb.pop()||n.expando+"_"+cb++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Gb.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Gb.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Gb,"$1"+e):b.jsonp!==!1&&(b.url+=(db.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Fb.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||l;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=n.buildFragment([a],b,e),e&&e.length&&n(e).remove(),n.merge([],d.childNodes))};var Hb=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&Hb)return Hb.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=n.trim(a.slice(h)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};var Ib=a.document.documentElement;function Jb(a){return n.isWindow(a)?a:9===a.nodeType&&a.defaultView}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,n.contains(b,d)?(typeof d.getBoundingClientRect!==U&&(e=d.getBoundingClientRect()),c=Jb(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===n.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(d=a.offset()),d.top+=n.css(a[0],"borderTopWidth",!0),d.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-n.css(c,"marginTop",!0),left:b.left-d.left-n.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||Ib;while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Ib})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;n.fn[b]=function(e){return J(this,function(b,e,f){var g=Jb(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=ya(k.pixelPosition,function(a,c){return c?(c=xa(a,b),va.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return J(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.size=function(){return this.length},n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var Kb=a.jQuery,Lb=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=Lb),b&&a.jQuery===n&&(a.jQuery=Kb),n},typeof b===U&&(a.jQuery=a.$=n),n});
/* jslint-ignore-end */
            $ = jQuery = local.global.jQuery;
        }());

/* jslint-ignore-begin */



            // init lib jquery.wiggle
            // https://github.com/swagger-api/swagger-ui/blob/v2.1.2/lib/jquery.wiggle.min.js
            /*
            jQuery Wiggle
            Author: WonderGroup, Jordan Thomas
            URL: http://labs.wondergroup.com/demos/mini-ui/index.html
            License: MIT (http://en.wikipedia.org/wiki/MIT_License)
            */
            jQuery.fn.wiggle = function (o) {
                var d = {
                    speed: 50,
                    wiggles: 3,
                    travel: 5,
                    callback: null
                };
                var o = jQuery.extend(d, o);
                return this.each(function () {
                    var cache = this;
                    var wrap = jQuery(this).wrap('<div class="wiggle-wrap"></div>').css("position", "relative");
                    var calls = 0;
                    for (var i = 1; i <= o.wiggles; i++) {
                        jQuery(this).animate({
                            left: "-=" + o.travel
                        }, o.speed).animate({
                            left: "+=" + o.travel * 2
                        }, o.speed * 2).animate({
                            left: "-=" + o.travel
                        }, o.speed, function () {
                            calls++;
                            if (jQuery(cache).parent().hasClass('wiggle-wrap')) {
                                jQuery(cache).parent().replaceWith(cache);
                            }
                            if (calls == o.wiggles && jQuery.isFunction(o.callback)) {
                                o.callback();
                            }
                        });
                    }
                });
            };



            // init lib jquery.ba-bbq
            // https://github.com/swagger-api/swagger-ui/blob/v2.1.2/lib/jquery.ba-bbq.min.js
            /*
             * jQuery BBQ: Back Button & Query Library - v1.2.1 - 2/17/2010
             * http://benalman.com/projects/jquery-bbq-plugin/
             *
             * Copyright (c) 2010 "Cowboy" Ben Alman
             * Dual licensed under the MIT and GPL licenses.
             * http://benalman.com/about/license/
             */
            (function ($, p) {
                $ = jQuery; p = window;
                var i, m = Array.prototype.slice,
                    r = decodeURIComponent,
                    a = $.param,
                    c, l, v, b = $.bbq = $.bbq || {},
                    q, u, j, e = $.event.special,
                    d = "hashchange",
                    A = "querystring",
                    D = "fragment",
                    y = "elemUrlAttr",
                    g = "location",
                    k = "href",
                    t = "src",
                    x = /^.*\?|#.*$/g,
                    w = /^.*\#/,
                    h, C = {};

                function E(F) {
                    return typeof F === "string"
                }

                function B(G) {
                    var F = m.call(arguments, 1);
                    return function () {
                        return G.apply(this, F.concat(m.call(arguments)))
                    }
                }

                function n(F) {
                    return F.replace(/^[^#]*#?(.*)$/, "$1")
                }

                function o(F) {
                    return F.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/, "$1")
                }

                function f(H, M, F, I, G) {
                    var O, L, K, N, J;
                    if (I !== i) {
                        K = F.match(H ? /^([^#]*)\#?(.*)$/ : /^([^#?]*)\??([^#]*)(#?.*)/);
                        J = K[3] || "";
                        if (G === 2 && E(I)) {
                            L = I.replace(H ? w : x, "")
                        } else {
                            N = l(K[2]);
                            I = E(I) ? l[H ? D : A](I) : I;
                            L = G === 2 ? I : G === 1 ? $.extend({}, I, N) : $.extend({}, N, I);
                            L = a(L);
                            if (H) {
                                L = L.replace(h, r)
                            }
                        }
                        O = K[1] + (H ? "#" : L || !K[1] ? "?" : "") + L + J
                    } else {
                        O = M(F !== i ? F : p[g][k])
                    }
                    return O
                }
                a[A] = B(f, 0, o);
                a[D] = c = B(f, 1, n);
                c.noEscape = function (G) {
                    G = G || "";
                    var F = $.map(G.split(""), encodeURIComponent);
                    h = new RegExp(F.join("|"), "g")
                };
                c.noEscape(",/");
                $.deparam = l = function (I, F) {
                    var H = {},
                        G = {
                            "true": !0,
                            "false": !1,
                            "null": null
                        };
                    $.each(I.replace(/\+/g, " ").split("&"), function (L, Q) {
                        var K = Q.split("="),
                            P = r(K[0]),
                            J, O = H,
                            M = 0,
                            R = P.split("]["),
                            N = R.length - 1;
                        if (/\[/.test(R[0]) && /\]$/.test(R[N])) {
                            R[N] = R[N].replace(/\]$/, "");
                            R = R.shift().split("[").concat(R);
                            N = R.length - 1
                        } else {
                            N = 0
                        }
                        if (K.length === 2) {
                            J = r(K[1]);
                            if (F) {
                                J = J && !isNaN(J) ? +J : J === "undefined" ? i : G[J] !== i ? G[J] : J
                            }
                            if (N) {
                                for (; M <= N; M++) {
                                    P = R[M] === "" ? O.length : R[M];
                                    O = O[P] = M < N ? O[P] || (R[M + 1] && isNaN(R[M + 1]) ? {} : []) : J
                                }
                            } else {
                                if ($.isArray(H[P])) {
                                    H[P].push(J)
                                } else {
                                    if (H[P] !== i) {
                                        H[P] = [H[P], J]
                                    } else {
                                        H[P] = J
                                    }
                                }
                            }
                        } else {
                            if (P) {
                                H[P] = F ? i : ""
                            }
                        }
                    });
                    return H
                };

                function z(H, F, G) {
                    if (F === i || typeof F === "boolean") {
                        G = F;
                        F = a[H ? D : A]()
                    } else {
                        F = E(F) ? F.replace(H ? w : x, "") : F
                    }
                    return l(F, G)
                }
                l[A] = B(z, 0);
                l[D] = v = B(z, 1);
                $[y] || ($[y] = function (F) {
                    return $.extend(C, F)
                })({
                    a: k,
                    base: k,
                    iframe: t,
                    img: t,
                    input: t,
                    form: "action",
                    link: k,
                    script: t
                });
                j = $[y];

                function s(I, G, H, F) {
                    if (!E(H) && typeof H !== "object") {
                        F = H;
                        H = G;
                        G = i
                    }
                    return this.each(function () {
                        var L = $(this),
                            J = G || j()[(this.nodeName || "").toLowerCase()] || "",
                            K = J && L.attr(J) || "";
                        L.attr(J, a[I](K, H, F))
                    })
                }
                $.fn[A] = B(s, A);
                $.fn[D] = B(s, D);
                b.pushState = q = function (I, F) {
                    if (E(I) && /^#/.test(I) && F === i) {
                        F = 2
                    }
                    var H = I !== i,
                        G = c(p[g][k], H ? I : {}, H ? F : 2);
                    p[g][k] = G + (/#/.test(G) ? "" : "#")
                };
                b.getState = u = function (F, G) {
                    return F === i || typeof F === "boolean" ? v(F) : v(G)[F]
                };
                b.removeState = function (F) {
                    var G = {};
                    if (F !== i) {
                        G = u();
                        $.each($.isArray(F) ? F : arguments, function (I, H) {
                            delete G[H]
                        })
                    }
                    q(G, 2)
                };
                e[d] = $.extend(e[d], {
                    add: function (F) {
                        var H;

                        function G(J) {
                            var I = J[D] = c();
                            J.getState = function (K, L) {
                                return K === i || typeof K === "boolean" ? l(I, K) : l(I, L)[K]
                            };
                            H.apply(this, arguments)
                        }
                        if ($.isFunction(F)) {
                            H = F;
                            return G
                        } else {
                            H = F.handler;
                            F.handler = G
                        }
                    }
                })
            })(jQuery, this);
            /*
             * jQuery hashchange event - v1.2 - 2/11/2010
             * http://benalman.com/projects/jquery-hashchange-plugin/
             *
             * Copyright (c) 2010 "Cowboy" Ben Alman
             * Dual licensed under the MIT and GPL licenses.
             * http://benalman.com/about/license/
             */
            (function ($, i, b) {
                var j, k = $.event.special,
                    c = "location",
                    d = "hashchange",
                    l = "href",
                    f = $.browser,
                    g = document.documentMode,
                    e = (i || {})["on" + d];

                function a(m) {
                    m = m || i[c][l];
                    return m.replace(/^[^#]*#?(.*)$/, "$1")
                }
                $[d + "Delay"] = 100;
                k[d] = $.extend(k[d], {
                    setup: function () {
                        if (e) {
                            return false
                        }
                        $(j.start)
                    },
                    teardown: function () {
                        if (e) {
                            return false
                        }
                        $(j.stop)
                    }
                });
                j = (function () {
                    var m = {},
                        r, n, o, q;

                    function p() {
                        o = q = function (s) {
                            return s
                        };
                        if (h) {
                            n = $('<iframe src="javascript:0"/>').hide().insertAfter("body")[0].contentWindow;
                            q = function () {
                                return a(n.document[c][l])
                            };
                            o = function (u, s) {
                                if (u !== s) {
                                    var t = n.document;
                                    t.open().close();
                                    t[c].hash = "#" + u
                                }
                            };
                            o(a())
                        }
                    }
                    m.start = function () {
                        if (r) {
                            return
                        }
                        var t = a();
                        o || p();
                        (function s() {
                            var v = a(),
                                u = q(t);
                            if (v !== t) {
                                o(t = v, u);
                                $(i).trigger(d)
                            } else {
                                if (u !== t) {
                                    i[c][l] = i[c][l].replace(/#.*/, "") + "#" + u
                                }
                            }
                            r = setTimeout(s, $[d + "Delay"])
                        })()
                    };
                    m.stop = function () {
                        if (!n) {
                            r && clearTimeout(r);
                            r = 0
                        }
                    };
                    return m
                })()
            })(jQuery, this);



            // init lib handlebars
            // https://github.com/swagger-api/swagger-ui/blob/v2.1.2/lib/handlebars-2.0.0.js
            /*!

             handlebars v2.0.0

            Copyright (C) 2011-2014 by Yehuda Katz

            Permission is hereby granted, free of charge, to any person obtaining a copy
            of this software and associated documentation files (the "Software"), to deal
            in the Software without restriction, including without limitation the rights
            to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
            copies of the Software, and to permit persons to whom the Software is
            furnished to do so, subject to the following conditions:

            The above copyright notice and this permission notice shall be included in
            all copies or substantial portions of the Software.

            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
            IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
            AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
            LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
            OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
            THE SOFTWARE.

            @license
            */
            (function () {
                var a = function () {
                        "use strict";

                        function a(a) {
                            this.string = a
                        }
                        var b;
                        return a.prototype.toString = function () {
                            return "" + this.string
                        }, b = a
                    }(),
                    b = function (a) {
                        "use strict";

                        function b(a) {
                            return i[a]
                        }

                        function c(a) {
                            for (var b = 1; b < arguments.length; b++)
                                for (var c in arguments[b]) Object.prototype.hasOwnProperty.call(arguments[b], c) && (a[c] = arguments[b][c]);
                            return a
                        }

                        function d(a) {
                            return a instanceof h ? a.toString() : null == a ? "" : a ? (a = "" + a, k.test(a) ? a.replace(j, b) : a) : a + ""
                        }

                        function e(a) {
                            return a || 0 === a ? Array.isArray(a) && 0 === a.length ? !0 : !1 : !0
                        }

                        var g = {},
                            h = a,
                            i = {
                                "&": "&amp;",
                                "<": "&lt;",
                                ">": "&gt;",
                                '"': "&quot;",
                                "'": "&#x27;",
                                "`": "&#x60;"
                            },
                            j = /[&<>"'`]/g,
                            k = /[&<>"'`]/;
                        g.extend = c;
                        var l = Object.prototype.toString;
                        g.toString = l;
                        return g.escapeExpression = d, g.isEmpty = e, g.appendContextPath = f, g
                    }(a),
                    d = function (a, b) {
                        "use strict";

                        function c(a, b) {
                            this.helpers = a || {}, this.partials = b || {}, d(this)
                        }

                        function d(a) {
                            a.registerHelper("blockHelperMissing", function (b, c) {
                                var d = c.inverse,
                                    e = c.fn;
                                if (b === !0) return e(this);
                                if (b === !1 || null == b) return d(this);
                                if (Array.isArray(b)) return b.length > 0 ? (c.ids && (c.ids = [c.name]), a.helpers.each(b, c)) : d(this);
                                if (c.data && c.ids) {
                                    var g = q(c.data);
                                    g.contextPath = f.appendContextPath(c.data.contextPath, c.name), c = {
                                        data: g
                                    }
                                }
                                return e(b, c)
                            }), a.registerHelper("each", function (a, b) {
                                var c, d, e = b.fn,
                                    h = b.inverse,
                                    i = 0,
                                    j = "";
                                if (b.data && b.ids && (d = f.appendContextPath(b.data.contextPath, b.ids[0]) + "."), typeof a === 'function' && (a = a.call(this)), b.data && (c = q(b.data)), a && "object" == typeof a)
                                    if (Array.isArray(a))
                                        for (var m = a.length; m > i; i++) c && (c.index = i, c.first = 0 === i, c.last = i === a.length - 1, d && (c.contextPath = d + i)), j += e(a[i], {
                                            data: c
                                        });
                                    else
                                        for (var n in a) a.hasOwnProperty(n) && (c && (c.key = n, c.index = i, c.first = 0 === i, d && (c.contextPath = d + n)), j += e(a[n], {
                                            data: c
                                        }), i++);
                                return 0 === i && (j = h(this)), j
                            }), a.registerHelper("if", function (a, b) {
                                return typeof a === 'function' && (a = a.call(this)), !b.hash.includeZero && !a || f.isEmpty(a) ? b.inverse(this) : b.fn(this)
                            }), a.registerHelper("unless", function (b, c) {
                                return a.helpers.if.call(this, b, {
                                    fn: c.inverse,
                                    inverse: c.fn,
                                    hash: c.hash
                                })
                            })
                        }
                        var e = {},
                            f = a,
                            g = b,
                            h = "2.0.0";
                        e.VERSION = h;
                        var i = 6;
                        e.COMPILER_REVISION = i;
                        var j = {
                            1: "<= 1.0.rc.2",
                            2: "== 1.0.0-rc.3",
                            3: "== 1.0.0-rc.4",
                            4: "== 1.x.x",
                            5: "== 2.0.0-alpha.x",
                            6: ">= 2.0.0-beta.1"
                        };
                        e.REVISION_CHANGES = j;
                        var k = f.isArray,
                            m = f.toString,
                            n = "[object Object]";
                        e.HandlebarsEnvironment = c, c.prototype = {
                            constructor: c,
                            logger: o,
                            log: p,
                            registerHelper: function (a, b) {
                                this.helpers[a] = b
                            }
                        };
                        var o = {
                            methodMap: {
                                0: "debug",
                                1: "info",
                                2: "warn",
                                3: "error"
                            },
                            DEBUG: 0,
                            INFO: 1,
                            WARN: 2,
                            ERROR: 3,
                            level: 3,
                        };
                        e.logger = o;
                        var p = o.log;
                        e.log = p;
                        var q = function (a) {
                            var b = f.extend({}, a);
                            return b._parent = a, b
                        };
                        return e.createFrame = q, e
                    }(b),
                    e = function (a, c) {
                        "use strict";

                        function e(a, b) {
                                var d = {
                                    lambda: function (a, b) {
                                        return "function" == typeof a ? a.call(b) : a
                                    },
                                    escapeExpression: k.escapeExpression,
                                    invokePartial: c,
                                    fn: function (b) {
                                        return a[b]
                                    },
                                    programs: [],
                                    program: function (a, b, c) {
                                        var d = this.programs[a],
                                            e = this.fn(a);
                                        return b || c ? d = f(this, a, e, b, c) : d || (d = this.programs[a] = f(this, a, e)), d
                                    },
                                    merge: function (a, b) {
                                        var c = a || b;
                                        return a && b && a !== b && (c = k.extend({}, b, a)), c
                                    },
                                    noop: b.VM.noop,
                                    compilerInfo: a.compiler
                                },
                                e = function (b, c) {
                                    c = c || {};
                                    var f = c.data;
                                    e._setup(c), !c.partial && a.useData && (f = i(b, f));
                                    var g;
                                    return a.useDepths && (g = c.depths ? [b].concat(c.depths) : [b]), a.main.call(d, b, d.helpers, d.partials, f, g)
                                };
                            return e.isTop = !0, e._setup = function (c) {
                                c.partial ? (d.helpers = c.helpers, d.partials = c.partials) : (d.helpers = d.merge(c.helpers, b.helpers), a.usePartial && (d.partials = d.merge(c.partials, b.partials)))
                            }, e
                        }

                        function f(a, b, c, d, e) {
                            var f = function (b, f) {
                                return f = f || {}, c.call(a, b, a.helpers, a.partials, f.data || d, e && [b].concat(e))
                            };
                            return f.program = b, f.depth = e ? e.length : 0, f
                        }

                        function h() {
                            return ""
                        }

                        function i(a, b) {
                            return b && "root" in b || (b = b ? o(b) : {}, b.root = a), b
                        }
                        var j = {},
                            k = a,
                            l = b,
                            m = c.COMPILER_REVISION,
                            n = c.REVISION_CHANGES,
                            o = c.createFrame;
                        return j.template = e, j.program = f, j.noop = h, j
                    }(b, d),
                    f = function (a, b, d, e) {
                        "use strict";
                        var f, g = a,
                            h = b,
                            j = d,
                            k = e,
                            l = function () {
                                var a = new g.HandlebarsEnvironment;
                                return j.extend(a, g), a.SafeString = h, a.Utils = j, a.escapeExpression = j.escapeExpression, a.VM = k, a.template = function (b) {
                                    return k.template(b, a)
                                }, a
                            },
                            m = l();
                        return m.create = l, m.default = m, f = m
                    }(d, a, b, e),
                    h = function () {
                        "use strict";
                        return function () {
                            function a() {
                                this.yy = {}
                            }
                            return new a
                        }();
                    }(),
                    j = {},
                    m = f.create();
                local.global.Handlebars = m;
            }());



            // init lib backbone
            (function () {
                // https://github.com/swagger-api/swagger-ui/blob/v2.1.2/lib/backbone-min.js
                // Backbone.js 1.1.2

                (function (t, e) {
                    t.Backbone = e(t, {}, {
                        each: local.forEach,
                        extend: local.extend,
                        pick: local.pick,
                        uniqueId: local.utility2.uuidTimeCreate,
                        result: local.result,
                        isFunction: local.isFunction,
                    }, jQuery)
                })(this, function (t, e, i, r) {
                    var s = t.Backbone;
                    var n = [];
                    var a = n.push;
                    var o = n.slice;
                    var h = n.splice;
                    e.VERSION = "1.1.2";
                    e.$ = r;
                    e.noConflict = function () {
                        t.Backbone = s;
                        return this
                    };
                    e.emulateHTTP = false;
                    e.emulateJSON = false;
                    var u = e.Events = {
                        on: function (t, e, i) {
                            if (!c(this, "on", t, [e, i]) || !e) return this;
                            this._events || (this._events = {});
                            var r = this._events[t] || (this._events[t] = []);
                            r.push({
                                callback: e,
                                context: i,
                                ctx: i || this
                            });
                            return this
                        },
                        trigger: function (t) {
                            if (!this._events) return this;
                            var e = o.call(arguments, 1);
                            if (!c(this, "trigger", t, e)) return this;
                            var i = this._events[t];
                            var r = this._events.all;
                            if (i) f(i, e);
                            if (r) f(r, arguments);
                            return this
                        }
                    };
                    var l = /\s+/;
                    var c = function (t, e, i, r) {
                        if (!i) return true;
                        if (typeof i === "object") {
                            for (var s in i) {
                                t[e].apply(t, [s, i[s]].concat(r))
                            }
                            return false
                        }
                        if (l.test(i)) {
                            var n = i.split(l);
                            for (var a = 0, o = n.length; a < o; a++) {
                                t[e].apply(t, [n[a]].concat(r))
                            }
                            return false
                        }
                        return true
                    };
                    var f = function (t, e) {
                        var i, r = -1,
                            s = t.length,
                            n = e[0],
                            a = e[1],
                            o = e[2];
                        switch (e.length) {
                            case 0:
                                while (++r < s)(i = t[r]).callback.call(i.ctx);
                                return;
                            case 1:
                                while (++r < s)(i = t[r]).callback.call(i.ctx, n);
                                return;
                            case 2:
                                while (++r < s)(i = t[r]).callback.call(i.ctx, n, a);
                                return;
                            case 3:
                                while (++r < s)(i = t[r]).callback.call(i.ctx, n, a, o);
                                return;
                            default:
                                while (++r < s)(i = t[r]).callback.apply(i.ctx, e);
                                return
                        }
                    };
                    var d = {
                        listenTo: "on",
                        listenToOnce: "once"
                    };
                    i.each(d, function (t, e) {
                        u[e] = function (e, r, s) {
                            var n = this._listeningTo || (this._listeningTo = {});
                            var a = e._listenId || (e._listenId = i.uniqueId("l"));
                            n[a] = e;
                            if (!s && typeof r === "object") s = this;
                            e[t](r, s, this);
                            return this
                        }
                    });
                    u.bind = u.on;
                    u.unbind = u.off;
                    i.extend(e, u);
                    var p = e.Model = function (t, e) {
                        var r = t || {};
                        e || (e = {});
                        this.cid = i.uniqueId("c");
                        this.attributes = {};
                        if (e.collection) this.collection = e.collection;
                        if (e.parse) r = this.parse(r, e) || {};
                        r = i.defaults({}, r, i.result(this, "defaults"));
                        this.set(r, e);
                        this.changed = {};
                        this.initialize.apply(this, arguments)
                    };
                    var v = ["keys", "values", "pairs", "invert", "pick", "omit"];
                    i.each(v, function (t) {
                        p.prototype[t] = function () {
                            var e = o.call(arguments);
                            e.unshift(this.attributes);
                            return i[t].apply(i, e)
                        }
                    });
                    var g = e.Collection = function (t, e) {
                        e || (e = {});
                        if (e.model) this.model = e.model;
                        if (e.comparator !== void 0) this.comparator = e.comparator;
                        this._reset();
                        this.initialize.apply(this, arguments);
                        if (t) this.reset(t, i.extend({ silent: true }, e))
                    };
                    var m = {
                        add: true,
                        remove: true,
                        merge: true
                    };
                    var y = {
                        add: true,
                        remove: false
                    };
                    var _ = ["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "difference", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain", "sample"];
                    i.each(_, function (t) {
                        g.prototype[t] = function () {
                            var e = o.call(arguments);
                            e.unshift(this.models);
                            return i[t].apply(i, e)
                        }
                    });
                    var b = ["groupBy", "countBy", "sortBy", "indexBy"];
                    i.each(b, function (t) {
                        g.prototype[t] = function (e, r) {
                            var s = i.isFunction(e) ? e : function (t) {
                                return t.get(e)
                            };
                            return i[t](this.models, s, r)
                        }
                    });
                    var w = e.View = function (t) {
                        this.cid = i.uniqueId("view");
                        t || (t = {});
                        i.extend(this, i.pick(t, E));
                        this._ensureElement();
                        this.initialize.apply(this, arguments);
                        this.delegateEvents()
                    };
                    var x = /^(\S+)\s*(.*)$/;
                    var E = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
                    i.extend(w.prototype, u, {
                        tagName: "div",
                        $: function (t) {
                            return this.$el.find(t)
                        },
                        initialize: function () {},
                        render: function () {
                            return this
                        },
                        remove: function () {
                            this.$el.remove();
                            this.stopListening();
                            return this
                        },
                        setElement: function (t, i) {
                            if (this.$el) this.undelegateEvents();
                            this.$el = t instanceof e.$ ? t : e.$(t);
                            this.el = this.$el[0];
                            if (i !== false) this.delegateEvents();
                            return this
                        },
                        delegateEvents: function (t) {
                            if (!(t || (t = i.result(this, "events")))) return this;
                            this.undelegateEvents();
                            for (var e in t) {
                                var r = t[e];
                                if (!i.isFunction(r)) r = this[t[e]];
                                if (!r) continue;
                                var s = e.match(x);
                                var n = s[1],
                                    a = s[2];
                                r = r.bind(this);
                                n += ".delegateEvents" + this.cid;
                                if (a === "") {
                                    this.$el.on(n, r)
                                } else {
                                    this.$el.on(n, a, r)
                                }
                            }
                            return this
                        },
                        undelegateEvents: function () {
                            this.$el.off(".delegateEvents" + this.cid);
                            return this
                        },
                        _ensureElement: function () {
                            if (!this.el) {
                                var t = i.extend({}, i.result(this, "attributes"));
                                if (this.id) t.id = i.result(this, "id");
                                if (this.className) t.class = i.result(this, "className");
                                var r = e.$("<" + i.result(this, "tagName") + ">").attr(t);
                                this.setElement(r, false)
                            } else {
                                this.setElement(i.result(this, "el"), false)
                            }
                        }
                    });
                    e.sync = function (t, r, s) {
                        var n = T[t];
                        i.defaults(s || (s = {}), {
                            emulateHTTP: e.emulateHTTP,
                            emulateJSON: e.emulateJSON
                        });
                        var a = {
                            type: n,
                            dataType: "json"
                        };
                        if (!s.url) {
                            a.url = i.result(r, "url") || M()
                        }
                        if (s.data == null && r && (t === "create" || t === "update" || t === "patch")) {
                            a.contentType = "application/json";
                            a.data = JSON.stringify(s.attrs || r.toJSON(s))
                        }
                        if (s.emulateJSON) {
                            a.contentType = "application/x-www-form-urlencoded";
                            a.data = a.data ? {
                                model: a.data
                            } : {}
                        }
                        if (s.emulateHTTP && (n === "PUT" || n === "DELETE" || n === "PATCH")) {
                            a.type = "POST";
                            if (s.emulateJSON) a.data._method = n;
                            var o = s.beforeSend;
                            s.beforeSend = function (t) {
                                t.setRequestHeader("X-HTTP-Method-Override", n);
                                if (o) return o.apply(this, arguments)
                            }
                        }
                        if (a.type !== "GET" && !s.emulateJSON) {
                            a.processData = false
                        }
                        if (a.type === "PATCH" && k) {
                            a.xhr = function () {
                                return new ActiveXObject("Microsoft.XMLHTTP")
                            }
                        }
                        var h = s.xhr = e.ajax(i.extend(a, s));
                        r.trigger("request", r, h, s);
                        return h
                    };
                    var k = typeof window !== "undefined" && !!window.ActiveXObject && !(window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent);
                    var T = {
                        create: "POST",
                        update: "PUT",
                        patch: "PATCH",
                        "delete": "DELETE",
                        read: "GET"
                    };
                    e.ajax = function () {
                        return e.$.ajax.apply(e.$, arguments)
                    };
                    var $ = e.Router = function (t) {
                        t || (t = {});
                        if (t.routes) this.routes = t.routes;
                        this._bindRoutes();
                        this.initialize.apply(this, arguments)
                    };
                    var S = /\((.*?)\)/g;
                    var H = /(\(\?)?:\w+/g;
                    var A = /\*\w+/g;
                    var I = /[\-{}\[\]+?.,\\\^$|#\s]/g;
                    i.extend($.prototype, u, {
                        initialize: function () {},
                        route: function (t, r, s) {
                            if (!i.isRegExp(t)) t = this._routeToRegExp(t);
                            if (i.isFunction(r)) {
                                s = r;
                                r = ""
                            }
                            if (!s) s = this[r];
                            var n = this;
                            e.history.route(t, function (i) {
                                var a = n._extractParameters(t, i);
                                n.execute(s, a);
                                n.trigger.apply(n, ["route:" + r].concat(a));
                                n.trigger("route", r, a);
                                e.history.trigger("route", n, r, a)
                            });
                            return this
                        },
                        execute: function (t, e) {
                            if (t) t.apply(this, e)
                        },
                        navigate: function (t, i) {
                            e.history.navigate(t, i);
                            return this
                        },
                        _bindRoutes: function () {
                            if (!this.routes) return;
                            this.routes = i.result(this, "routes");
                            var t, e = i.keys(this.routes);
                            while ((t = e.pop()) != null) {
                                this.route(t, this.routes[t])
                            }
                        },
                        _routeToRegExp: function (t) {
                            t = t.replace(I, "\\$&").replace(S, "(?:$1)?").replace(H, function (t, e) {
                                return e ? t : "([^/?]+)"
                            }).replace(A, "([^?]*?)");
                            return new RegExp("^" + t + "(?:\\?([\\s\\S]*))?$")
                        },
                        _extractParameters: function (t, e) {
                            var r = t.exec(e).slice(1);
                            return i.map(r, function (t, e) {
                                if (e === r.length - 1) return t || null;
                                return t ? decodeURIComponent(t) : null
                            })
                        }
                    });
                    var N = e.History = function () {
                        this.handlers = [];
                        if (typeof window !== "undefined") {
                            this.location = window.location;
                            this.history = window.history
                        }
                    };
                    var R = /^[#\/]|\s+$/g;
                    var O = /^\/+|\/+$/g;
                    var P = /msie [\w.]+/;
                    var C = /\/$/;
                    var j = /#.*$/;
                    N.started = false;
                    e.history = new N;
                    var U = function (t, e) {
                        var r = this;
                        var s;
                        if (t && t.hasOwnProperty("constructor")) {
                            s = t.constructor
                        } else {
                            s = function () {
                                return r.apply(this, arguments)
                            }
                        }
                        i.extend(s, r, e);
                        var n = function () {
                            this.constructor = s
                        };
                        n.prototype = r.prototype;
                        s.prototype = new n;
                        if (t) i.extend(s.prototype, t);
                        s.__super__ = r.prototype;
                        return s
                    };
                    p.extend = g.extend = $.extend = w.extend = N.extend = U;
                    var M = function () {
                        throw new Error('A "url" property or function must be specified')
                    };
                    var q = function (t, e) {
                        var i = e.error;
                        e.error = function (r) {
                            if (i) i(t, r, e);
                            t.trigger("error", t, r, e)
                        }
                    };
                    return e
                });

                // From http://stackoverflow.com/a/19431552
                // Compatibility override - Backbone 1.1 got rid of the 'options' binding
                // automatically to views in the constructor - we need to keep that.
                Backbone.View = (function (View) {
                    return View.extend({
                        constructor: function (options) {
                            this.options = options || {};
                            View.apply(this, arguments);
                        }
                    });
                })(Backbone.View);
            }).call(window);



            // init lib swagger-ui
            (function () {
            // https://github.com/swagger-api/swagger-ui/blob/v2.1.2/dist/swagger-ui.js
            /**
             * swagger-ui - Swagger UI is a dependency-free collection of HTML, JavaScript, and CSS assets that dynamically generate beautiful documentation from a Swagger-compliant API
             * @version v2.1.2
             * @link http://swagger.io
             * @license Apache-2.0
             */
            (function () {
                'use strict';

                window.SwaggerUi = Backbone.Router.extend({

                    dom_id: 'swagger_ui',

                    // Attributes
                    options: null,
                    api: null,
                    headerView: null,
                    mainView: null,

                    // SwaggerUi accepts all the same options as SwaggerApi
                    initialize: function (options) {
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
                        if (!$('#' + this.dom_id).length) {
                            $('body').append('<div id="' + this.dom_id + '"></div>');
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
                        this.options.failure = function (d) {
                            return that.onLoadFailure(d);
                        };

                        // Create view to handle the header inputs
                        this.headerView = new SwaggerUi.Views.HeaderView({
                            el: $('#header')
                        });

                        // Event handler for when the baseUrl/apiKey is entered by user
                        this.headerView.on('update-swagger-ui', function (data) {
                            return that.updateSwaggerUi(data);
                        });
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
                            el: $('#' + this.dom_id),
                            swaggerOptions: this.options,
                            router: this
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
                        var $msgbar = $('#message-bar');
                        $msgbar.removeClass('message-fail');
                        $msgbar.addClass('message-success');
                        $msgbar.html(data);
                        if (window.SwaggerTranslator) {
                            window.SwaggerTranslator.translate($msgbar);
                        }
                    },

                    // shows message in red
                    onLoadFailure: function (data) {
                        if (data === undefined) {
                            data = '';
                        }
                        $('#message-bar').removeClass('message-success');
                        $('#message-bar').addClass('message-fail');

                        var val = $('#message-bar').text(data);

                        if (this.options.onFailure) {
                            this.options.onFailure(data);
                        }

                        return val;
                    }
                });

                window.SwaggerUi.Views = {};

                // UMD
                (function (root, factory) {
                    if (typeof define === 'function' && define.amd) {
                        // AMD. Register as an anonymous module.
                        define(['b'], function (b) {
                            return (root.SwaggerUi = factory(b));
                        });
                    } else if (typeof exports === 'object') {
                        // Node. Does not work with strict CommonJS, but
                        // only CommonJS-like environments that support module.exports,
                        // like Node.
                        module.exports = factory(require('b'));
                    } else {
                        // Browser globals
                        root.SwaggerUi = factory(root.b);
                    }
                }(this, function () {
                    return SwaggerUi;
                }));

                this.Handlebars = this.Handlebars || {};
                this.Handlebars.templates = this.Handlebars.templates || {};
                this.Handlebars.templates.content_type = Handlebars.template({
                    "1": function (depth0, helpers, partials, data) {
                        var stack1, buffer = "";
                        stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.produces : depth0), {
                            "name": "each",
                            "hash": {},
                            "fn": this.program(2, data),
                            "inverse": this.noop,
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
                    "compiler": [6, ">= 2.0.0-beta.1"],
                    "main": function (depth0, helpers, partials, data) {
                        var stack1, helper, functionType = "function",
                            escapeExpression = this.escapeExpression,
                            buffer = "<label data-sw-translate for=\"" + escapeExpression(((helper = helpers.contentTypeId || (depth0 != null ? depth0.contentTypeId : depth0)), (typeof helper === functionType ? helper.call(depth0, {
                                "name": "contentTypeId",
                                "hash": {},
                                "data": data
                            }) : helper))) + "\">Response Content Type</label>\n<select name=\"contentType\" id=\"" + escapeExpression(((helper = helpers.contentTypeId || (depth0 != null ? depth0.contentTypeId : depth0)), (typeof helper === functionType ? helper.call(depth0, {
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
                'use strict';


                $(function () {

                    // Helper function for vertically aligning DOM elements
                    // http://www.seodenver.com/simple-vertical-align-plugin-for-jquery/
                    $.fn.vAlign = function () {
                        return this.each(function () {
                            var ah = $(this).height();
                            var ph = $(this).parent().height();
                            var mh = (ph - ah) / 2;
                            $(this).css('margin-top', mh);
                        });
                    };

                    $.fn.stretchFormtasticInputWidthToParent = function () {
                        return this.each(function () {
                            var p_width = $(this).closest("form").innerWidth();
                            var p_padding = parseInt($(this).closest("form").css('padding-left'), 10) + parseInt($(this).closest('form').css('padding-right'), 10);
                            var this_padding = parseInt($(this).css('padding-left'), 10) + parseInt($(this).css('padding-right'), 10);
                            $(this).css('width', p_width - p_padding - this_padding);
                        });
                    };

                    $('form.formtastic li.string input, form.formtastic textarea').stretchFormtasticInputWidthToParent();

                    // Vertically center these paragraphs
                    // Parent may need a min-height for this to work..
                    $('ul.downplayed li div.content p').vAlign();

                    // When a sandbox form is submitted..
                    $("form.sandbox").submit(function () {

                        var error_free = true;

                        // Cycle through the forms required inputs
                        $(this).find("input.required").each(function () {

                            // Remove any existing error styles from the input
                            $(this).removeClass('error');

                            // Tack the error style on if the input is empty..
                            if ($(this).val() === '') {
                                $(this).addClass('error');
                                $(this).wiggle();
                                error_free = false;
                            }

                        });

                        return error_free;
                    });

                });

                function clippyCopiedCallback() {
                    $('#api_key_copied').fadeIn().delay(1000).fadeOut();

                    // var b = $("#clippy_tooltip_" + a);
                    // b.length != 0 && (b.attr("title", "copied!").trigger("tipsy.reload"), setTimeout(function () {
                    //   b.attr("title", "copy to clipboard")
                    // },
                    // 500))
                }

                window.Docs = {

                    shebang: function () {

                        // If shebang has an operation nickname in it..
                        // e.g. /docs/#!/words/get_search
                        var fragments = $.param.fragment().split('/').map(function (element) {
                            return element.replace((/%2F/g), '\\/');
                        });
                        fragments.shift(); // get rid of the bang
                        function slideTo (self) {
                            self.each(function () {
                                $('body').animate({
                                    scrollTop: $(this).offset().top
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
                                    slideTo($("#" + dom_id));
                                }
                                break;
                            case 2:
                                // Refer to the endpoint DOM element, e.g. #words_get_search

                                // Expand Resource
                                Docs.expandEndpointListForResource(fragments[0]);
                                slideTo($("#" + dom_id));

                                // Expand operation
                                var li_dom_id = fragments.join('_');
                                var li_content_dom_id = li_dom_id + "_content";


                                Docs.expandOperation($('#' + li_content_dom_id));
                                slideTo($('#' + li_dom_id))
                                break;
                        }

                    },

                    toggleEndpointListForResource: function (resource) {
                        var elem = $('li#resource_' + Docs.escapeResourceName(resource) + ' ul.endpoints');
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
                            $('.resource ul.endpoints').slideDown();
                            return;
                        }

                        $('li#resource_' + resource).addClass('active');

                        var elem = $('li#resource_' + resource + ' ul.endpoints');
                        elem.slideDown();
                    },

                    // Collapse resource and mark as explicitly closed
                    collapseEndpointListForResource: function (resource) {
                        var resource = Docs.escapeResourceName(resource);
                        if (resource == '') {
                            $('.resource ul.endpoints').slideUp();
                            return;
                        }

                        $('li#resource_' + resource).removeClass('active');

                        var elem = $('li#resource_' + resource + ' ul.endpoints');
                        elem.slideUp();
                    },

                    expandOperationsForResource: function (resource) {
                        // Make sure the resource container is open..
                        Docs.expandEndpointListForResource(resource);

                        if (resource == '') {
                            $('.resource ul.endpoints li.operation div.content').slideDown();
                            return;
                        }

                        $('li#resource_' + Docs.escapeResourceName(resource) + ' li.operation div.content').each(function () {
                            Docs.expandOperation($(this));
                        });
                    },

                    collapseOperationsForResource: function (resource) {
                        // Make sure the resource container is open..
                        Docs.expandEndpointListForResource(resource);

                        if (resource == '') {
                            $('.resource ul.endpoints li.operation div.content').slideUp();
                            return;
                        }

                        $('li#resource_' + Docs.escapeResourceName(resource) + ' li.operation div.content').each(function () {
                            Docs.collapseOperation($(this));
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

                'use strict';

                Handlebars.registerHelper('sanitize', function (html) {
                    // Strip the script tags from the html, and return it as a Handlebars.SafeString
                    html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
                    return new Handlebars.SafeString(html);
                });

                Handlebars.registerHelper('renderTextParam', function (param) {
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

                    if (typeof defaultValue === 'undefined') {
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
                    return new Handlebars.SafeString(result);
                });

                this.Handlebars.templates.main = Handlebars.template({
                    "1": function (depth0, helpers, partials, data) {
                        var stack1, lambda = this.lambda,
                            escapeExpression = this.escapeExpression,
                            buffer = "  <div class=\"info_title\">" + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.title : stack1), depth0)) + "</div>\n  <div class=\"info_description markdown\">";
                        stack1 = lambda(((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.description : stack1), depth0);
                        if (stack1 != null) {
                            buffer += stack1;
                        }
                        buffer += "</div>\n";
                        stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.externalDocs : depth0), {
                            "name": "if",
                            "hash": {},
                            "fn": this.program(2, data),
                            "inverse": this.noop,
                            "data": data
                        });
                        if (stack1 != null) {
                            buffer += stack1;
                        }
                        buffer += "  ";
                        stack1 = helpers.if.call(depth0, ((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.termsOfServiceUrl : stack1), {
                            "name": "if",
                            "hash": {},
                            "fn": this.program(4, data),
                            "inverse": this.noop,
                            "data": data
                        });
                        if (stack1 != null) {
                            buffer += stack1;
                        }
                        buffer += "\n  ";
                        stack1 = helpers.if.call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.contact : stack1)) != null ? stack1.name : stack1), {
                            "name": "if",
                            "hash": {},
                            "fn": this.program(6, data),
                            "inverse": this.noop,
                            "data": data
                        });
                        if (stack1 != null) {
                            buffer += stack1;
                        }
                        buffer += "\n  ";
                        stack1 = helpers.if.call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.contact : stack1)) != null ? stack1.url : stack1), {
                            "name": "if",
                            "hash": {},
                            "fn": this.program(8, data),
                            "inverse": this.noop,
                            "data": data
                        });
                        if (stack1 != null) {
                            buffer += stack1;
                        }
                        buffer += "\n  ";
                        stack1 = helpers.if.call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.contact : stack1)) != null ? stack1.email : stack1), {
                            "name": "if",
                            "hash": {},
                            "fn": this.program(10, data),
                            "inverse": this.noop,
                            "data": data
                        });
                        if (stack1 != null) {
                            buffer += stack1;
                        }
                        buffer += "\n  ";
                        stack1 = helpers.if.call(depth0, ((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.license : stack1), {
                            "name": "if",
                            "hash": {},
                            "fn": this.program(12, data),
                            "inverse": this.noop,
                            "data": data
                        });
                        if (stack1 != null) {
                            buffer += stack1;
                        }
                        return buffer + "\n";
                    },
                    "2": function (depth0, helpers, partials, data) {
                        var stack1, lambda = this.lambda,
                            escapeExpression = this.escapeExpression;
                        return "  <p>" + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.externalDocs : depth0)) != null ? stack1.description : stack1), depth0)) + "</p>\n  <a href=\"" + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.externalDocs : depth0)) != null ? stack1.url : stack1), depth0)) + "\" target=\"_blank\">" + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.externalDocs : depth0)) != null ? stack1.url : stack1), depth0)) + "</a>\n";
                    },
                    "4": function (depth0, helpers, partials, data) {
                        var stack1, lambda = this.lambda,
                            escapeExpression = this.escapeExpression;
                        return "<div class=\"info_tos\"><a href=\"" + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.termsOfServiceUrl : stack1), depth0)) + "\" data-sw-translate>Terms of service</a></div>";
                    },
                    "6": function (depth0, helpers, partials, data) {
                        var stack1, lambda = this.lambda,
                            escapeExpression = this.escapeExpression;
                        return "<div class='info_name' data-sw-translate>Created by " + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.contact : stack1)) != null ? stack1.name : stack1), depth0)) + "</div>";
                    },
                    "8": function (depth0, helpers, partials, data) {
                        var stack1, lambda = this.lambda,
                            escapeExpression = this.escapeExpression;
                        return "<div class='info_url' data-sw-translate>See more at <a href=\"" + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.contact : stack1)) != null ? stack1.url : stack1), depth0)) + "\">" + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.contact : stack1)) != null ? stack1.url : stack1), depth0)) + "</a></div>";
                    },
                    "10": function (depth0, helpers, partials, data) {
                        var stack1, lambda = this.lambda,
                            escapeExpression = this.escapeExpression;
                        return "<div class='info_email'><a href=\"mailto:" + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.contact : stack1)) != null ? stack1.email : stack1), depth0)) + "?subject=" + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.title : stack1), depth0)) + "\" data-sw-translate>Contact the developer</a></div>";
                    },
                    "12": function (depth0, helpers, partials, data) {
                        var stack1, lambda = this.lambda,
                            escapeExpression = this.escapeExpression;
                        return "<div class='info_license'><a href='" + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.license : stack1)) != null ? stack1.url : stack1), depth0)) + "'>" + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.license : stack1)) != null ? stack1.name : stack1), depth0)) + "</a></div>";
                    },
                    "14": function (depth0, helpers, partials, data) {
                        var stack1, lambda = this.lambda,
                            escapeExpression = this.escapeExpression;
                        return "  , <span style=\"font-variant: small-caps\" data-sw-translate>api version</span>: " + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.version : stack1), depth0)) + "\n    ";
                    },
                    "16": function (depth0, helpers, partials, data) {
                        var helper, functionType = "function",
                            escapeExpression = this.escapeExpression;
                        return "    <span style=\"float:right\"><a href=\"" + escapeExpression(((helper = helpers.validatorUrl || (depth0 != null ? depth0.validatorUrl : depth0)), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "validatorUrl",
                            "hash": {},
                            "data": data
                        }) : helper))) + "/debug?url=" + escapeExpression(((helper = helpers.url || (depth0 != null ? depth0.url : depth0)), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "url",
                            "hash": {},
                            "data": data
                        }) : helper))) + "\"><img id=\"validator\" src=\"" + escapeExpression(((helper = helpers.validatorUrl || (depth0 != null ? depth0.validatorUrl : depth0)), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "validatorUrl",
                            "hash": {},
                            "data": data
                        }) : helper))) + "?url=" + escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "url",
                            "hash": {},
                            "data": data
                        }) : helper))) + "\"></a>\n    </span>\n";
                    },
                    "compiler": [6, ">= 2.0.0-beta.1"],
                    "main": function (depth0, helpers, partials, data) {
                        var stack1, helper, functionType = "function",
                            helperMissing = helpers.helperMissing,
                            escapeExpression = this.escapeExpression,
                            buffer = "<div class='info' id='api_info'>\n";
                        stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.info : depth0), {
                            "name": "if",
                            "hash": {},
                            "fn": this.program(1, data),
                            "inverse": this.noop,
                            "data": data
                        });
                        if (stack1 != null) {
                            buffer += stack1;
                        }
                        buffer += "</div>\n<div class='container' id='resources_container'>\n  <ul id='resources'></ul>\n\n  <div class=\"footer\">\n    <h4 style=\"color: #999\">[ <span style=\"font-variant: small-caps\">base url</span>: " + escapeExpression(((helper = (helper = helpers.basePath || (depth0 != null ? depth0.basePath : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "basePath",
                            "hash": {},
                            "data": data
                        }) : helper))) + "\n";
                        stack1 = helpers.if.call(depth0, ((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.version : stack1), {
                            "name": "if",
                            "hash": {},
                            "fn": this.program(14, data),
                            "inverse": this.noop,
                            "data": data
                        });
                        if (stack1 != null) {
                            buffer += stack1;
                        }
                        buffer += "]\n";
                        stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.validatorUrl : depth0), {
                            "name": "if",
                            "hash": {},
                            "fn": this.program(16, data),
                            "inverse": this.noop,
                            "data": data
                        });
                        if (stack1 != null) {
                            buffer += stack1;
                        }
                        return buffer + "    </h4>\n    </div>\n</div>\n";
                    },
                    "useData": true
                });
                this.Handlebars.templates.operation = Handlebars.template({
                    "1": function (depth0, helpers, partials, data) {
                        return "deprecated";
                    },
                    "3": function (depth0, helpers, partials, data) {
                        return "            <h4>Warning: Deprecated</h4>\n";
                    },
                    "5": function (depth0, helpers, partials, data) {
                        var stack1, helper, functionType = "function",
                            helperMissing = helpers.helperMissing,
                            buffer = "        <h4>Implementation Notes</h4>\n        <div class=\"markdown\">";
                        stack1 = ((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
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
                        var helper, functionType = "function",
                            helperMissing = helpers.helperMissing,
                            escapeExpression = this.escapeExpression;
                        return "          <h4><span data-sw-translate>Response Class</span> (<span data-sw-translate>Status</span> " + escapeExpression(((helper = (helper = helpers.successCode || (depth0 != null ? depth0.successCode : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "successCode",
                            "hash": {},
                            "data": data
                        }) : helper))) + ")</h4>\n          <p><span class=\"model-signature\" /></p>\n          <br/>\n          <div class=\"response-content-type\" />\n";
                    },
                    "18": function (depth0, helpers, partials, data) {
                        return "          <h4 data-sw-translate>Parameters</h4>\n          <table class='fullwidth'>\n          <thead>\n            <tr>\n            <th style=\"width: 100px; max-width: 100px\" data-sw-translate>Parameter</th>\n            <th style=\"width: 310px; max-width: 310px\" data-sw-translate>Value</th>\n            <th style=\"width: 200px; max-width: 200px\" data-sw-translate>Description</th>\n            <th style=\"width: 100px; max-width: 100px\" data-sw-translate>Parameter Type</th>\n            <th style=\"width: 220px; max-width: 230px\" data-sw-translate>Data Type</th>\n            </tr>\n          </thead>\n          <tbody class=\"operation-params\">\n\n          </tbody>\n          </table>\n";
                    },
                    "20": function (depth0, helpers, partials, data) {
                        return "          <div style='margin:0;padding:0;display:inline'></div>\n          <h4 data-sw-translate>Response Messages</h4>\n          <table class='fullwidth'>\n            <thead>\n            <tr>\n              <th data-sw-translate>HTTP Status Code</th>\n              <th data-sw-translate>Reason</th>\n              <th data-sw-translate>Response Model</th>\n              <th data-sw-translate>Headers</th>\n            </tr>\n            </thead>\n            <tbody class=\"operation-status\">\n\n            </tbody>\n          </table>\n";
                    },
                    "22": function (depth0, helpers, partials, data) {
                        return "";
                    },
                    "24": function (depth0, helpers, partials, data) {
                        return "          <div class='sandbox_header'>\n            <input class='submit' type='button' value='Try it out!' data-sw-translate/>\n            <a href='#' class='response_hider' style='display:none' data-sw-translate>Hide Response</a>\n            <span class='response_throbber' style='display:none'></span>\n          </div>\n";
                    },
                    "26": function (depth0, helpers, partials, data) {
                        return "          <h4 data-sw-translate>Request Headers</h4>\n          <div class='block request_headers'></div>\n";
                    },
                    "compiler": [6, ">= 2.0.0-beta.1"],
                    "main": function (depth0, helpers, partials, data) {
                        var stack1, helper, options, functionType = "function",
                            helperMissing = helpers.helperMissing,
                            escapeExpression = this.escapeExpression,
                            blockHelperMissing = helpers.blockHelperMissing,
                            buffer = "\n  <ul class='operations' >\n    <li class='" + escapeExpression(((helper = (helper = helpers.method || (depth0 != null ? depth0.method : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                                "name": "method",
                                "hash": {},
                                "data": data
                            }) : helper))) + " operation' id='" + escapeExpression(((helper = (helper = helpers.parentId || (depth0 != null ? depth0.parentId : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                                "name": "parentId",
                                "hash": {},
                                "data": data
                            }) : helper))) + "_" + escapeExpression(((helper = (helper = helpers.nickname || (depth0 != null ? depth0.nickname : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                                "name": "nickname",
                                "hash": {},
                                "data": data
                            }) : helper))) + "'>\n      <div class='heading'>\n        <h3>\n          <span class='http_method'>\n          <a href='#!/" + escapeExpression(((helper = (helper = helpers.encodedParentId || (depth0 != null ? depth0.encodedParentId : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                                "name": "encodedParentId",
                                "hash": {},
                                "data": data
                            }) : helper))) + "/" + escapeExpression(((helper = (helper = helpers.nickname || (depth0 != null ? depth0.nickname : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                                "name": "nickname",
                                "hash": {},
                                "data": data
                            }) : helper))) + "' class=\"toggleOperation\">" + escapeExpression(((helper = (helper = helpers.method || (depth0 != null ? depth0.method : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                                "name": "method",
                                "hash": {},
                                "data": data
                            }) : helper))) + "</a>\n          </span>\n          <span class='path'>\n          <a href='#!/" + escapeExpression(((helper = (helper = helpers.encodedParentId || (depth0 != null ? depth0.encodedParentId : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                                "name": "encodedParentId",
                                "hash": {},
                                "data": data
                            }) : helper))) + "/" + escapeExpression(((helper = (helper = helpers.nickname || (depth0 != null ? depth0.nickname : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                                "name": "nickname",
                                "hash": {},
                                "data": data
                            }) : helper))) + "' class=\"toggleOperation ";
                        stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.deprecated : depth0), {
                            "name": "if",
                            "hash": {},
                            "fn": this.program(1, data),
                            "inverse": this.noop,
                            "data": data
                        });
                        if (stack1 != null) {
                            buffer += stack1;
                        }
                        buffer += "\">" + escapeExpression(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "path",
                            "hash": {},
                            "data": data
                        }) : helper))) + "</a>\n          </span>\n        </h3>\n        <ul class='options'>\n          <li>\n          <a href='#!/" + escapeExpression(((helper = (helper = helpers.encodedParentId || (depth0 != null ? depth0.encodedParentId : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "encodedParentId",
                            "hash": {},
                            "data": data
                        }) : helper))) + "/" + escapeExpression(((helper = (helper = helpers.nickname || (depth0 != null ? depth0.nickname : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "nickname",
                            "hash": {},
                            "data": data
                        }) : helper))) + "' class=\"toggleOperation\">";
                        stack1 = ((helper = (helper = helpers.summary || (depth0 != null ? depth0.summary : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "summary",
                            "hash": {},
                            "data": data
                        }) : helper));
                        if (stack1 != null) {
                            buffer += stack1;
                        }
                        buffer += "</a>\n          </li>\n        </ul>\n      </div>\n      <div class='content' id='" + escapeExpression(((helper = (helper = helpers.parentId || (depth0 != null ? depth0.parentId : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "parentId",
                            "hash": {},
                            "data": data
                        }) : helper))) + "_" + escapeExpression(((helper = (helper = helpers.nickname || (depth0 != null ? depth0.nickname : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "nickname",
                            "hash": {},
                            "data": data
                        }) : helper))) + "_content' style='display:none'>\n";
                        stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.deprecated : depth0), {
                            "name": "if",
                            "hash": {},
                            "fn": this.program(3, data),
                            "inverse": this.noop,
                            "data": data
                        });
                        if (stack1 != null) {
                            buffer += stack1;
                        }
                        stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.description : depth0), {
                            "name": "if",
                            "hash": {},
                            "fn": this.program(5, data),
                            "inverse": this.noop,
                            "data": data
                        });
                        if (stack1 != null) {
                            buffer += stack1;
                        }
                        stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.type : depth0), {
                            "name": "if",
                            "hash": {},
                            "fn": this.program(16, data),
                            "inverse": this.noop,
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
                            "inverse": this.noop,
                            "data": data
                        });
                        if (stack1 != null) {
                            buffer += stack1;
                        }
                        stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.responseMessages : depth0), {
                            "name": "if",
                            "hash": {},
                            "fn": this.program(20, data),
                            "inverse": this.noop,
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
                        buffer += "        </form>\n        <div class='response' style='display:none'>\n          <h4>Curl</h4>\n          <div class='block curl'></div>\n          <h4 data-sw-translate>Request URL</h4>\n          <div class='block request_url'></div>\n";
                        stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.showRequestHeaders : depth0), {
                            "name": "if",
                            "hash": {},
                            "fn": this.program(26, data),
                            "inverse": this.noop,
                            "data": data
                        });
                        if (stack1 != null) {
                            buffer += stack1;
                        }
                        return buffer + "          <h4 data-sw-translate>Response Body</h4>\n          <div class='block response_body'></div>\n          <h4 data-sw-translate>Response Code</h4>\n          <div class='block response_code'></div>\n          <h4 data-sw-translate>Response Headers</h4>\n          <div class='block response_headers'></div>\n        </div>\n      </div>\n    </li>\n  </ul>\n";
                    },
                    "useData": true
                });
                this.Handlebars.templates.param = Handlebars.template({
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
                        var helper, functionType = "function",
                            helperMissing = helpers.helperMissing,
                            escapeExpression = this.escapeExpression;
                        return "			<input type=\"file\" name='" + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "name",
                            "hash": {},
                            "data": data
                        }) : helper))) + "' id='" + escapeExpression(((helper = (helper = helpers.valueId || (depth0 != null ? depth0.valueId : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
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
                        var helper, functionType = "function",
                            helperMissing = helpers.helperMissing,
                            escapeExpression = this.escapeExpression;
                        return "				<textarea class='body-textarea' name='" + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "name",
                            "hash": {},
                            "data": data
                        }) : helper))) + "' id='" + escapeExpression(((helper = (helper = helpers.valueId || (depth0 != null ? depth0.valueId : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "valueId",
                            "hash": {},
                            "data": data
                        }) : helper))) + "'>" + escapeExpression(((helper = (helper = helpers.default || (depth0 != null ? depth0.default : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "default",
                            "hash": {},
                            "data": data
                        }) : helper))) + "</textarea>\n        <br />\n        <div class=\"parameter-content-type\" />\n";
                    },
                    "7": function (depth0, helpers, partials, data) {
                        var helper, functionType = "function",
                            helperMissing = helpers.helperMissing,
                            escapeExpression = this.escapeExpression;
                        return "				<textarea class='body-textarea' name='" + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "name",
                            "hash": {},
                            "data": data
                        }) : helper))) + "' id='" + escapeExpression(((helper = (helper = helpers.valueId || (depth0 != null ? depth0.valueId : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
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
                        var stack1, helperMissing = helpers.helperMissing,
                            buffer = "";
                        stack1 = ((helpers.renderTextParam || (depth0 && depth0.renderTextParam) || helperMissing).call(depth0, depth0, {
                            "name": "renderTextParam",
                            "hash": {},
                            "fn": this.program(11, data),
                            "inverse": this.noop,
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
                    "compiler": [6, ">= 2.0.0-beta.1"],
                    "main": function (depth0, helpers, partials, data) {
                        var stack1, helper, functionType = "function",
                            helperMissing = helpers.helperMissing,
                            escapeExpression = this.escapeExpression,
                            buffer = "<td class='code'><label for='" + escapeExpression(((helper = (helper = helpers.valueId || (depth0 != null ? depth0.valueId : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                                "name": "valueId",
                                "hash": {},
                                "data": data
                            }) : helper))) + "'>" + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
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
                        stack1 = ((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "description",
                            "hash": {},
                            "data": data
                        }) : helper));
                        if (stack1 != null) {
                            buffer += stack1;
                        }
                        buffer += "</td>\n<td>";
                        stack1 = ((helper = (helper = helpers.paramType || (depth0 != null ? depth0.paramType : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
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
                this.Handlebars.templates.param_list = Handlebars.template({
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
                            "inverse": this.noop,
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
                            helperMissing = helpers.helperMissing,
                            escapeExpression = this.escapeExpression,
                            buffer = "\n      <option ";
                        stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.isDefault : depth0), {
                            "name": "if",
                            "hash": {},
                            "fn": this.program(11, data),
                            "inverse": this.noop,
                            "data": data
                        });
                        if (stack1 != null) {
                            buffer += stack1;
                        }
                        buffer += "  value='" + escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "value",
                            "hash": {},
                            "data": data
                        }) : helper))) + "'> " + escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "value",
                            "hash": {},
                            "data": data
                        }) : helper))) + " ";
                        stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.isDefault : depth0), {
                            "name": "if",
                            "hash": {},
                            "fn": this.program(13, data),
                            "inverse": this.noop,
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
                    "compiler": [6, ">= 2.0.0-beta.1"],
                    "main": function (depth0, helpers, partials, data) {
                        var stack1, helper, functionType = "function",
                            helperMissing = helpers.helperMissing,
                            escapeExpression = this.escapeExpression,
                            buffer = "<td class='code";
                        stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.required : depth0), {
                            "name": "if",
                            "hash": {},
                            "fn": this.program(1, data),
                            "inverse": this.noop,
                            "data": data
                        });
                        if (stack1 != null) {
                            buffer += stack1;
                        }
                        buffer += "'><label for='" + escapeExpression(((helper = (helper = helpers.valueId || (depth0 != null ? depth0.valueId : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "valueId",
                            "hash": {},
                            "data": data
                        }) : helper))) + "'>" + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "name",
                            "hash": {},
                            "data": data
                        }) : helper))) + "</label></td>\n<td>\n  <select ";
                        stack1 = ((helpers.isArray || (depth0 && depth0.isArray) || helperMissing).call(depth0, depth0, {
                            "name": "isArray",
                            "hash": {},
                            "fn": this.program(3, data),
                            "inverse": this.noop,
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
                            "inverse": this.noop,
                            "data": data
                        });
                        if (stack1 != null) {
                            buffer += stack1;
                        }
                        buffer += "\" name=\"" + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "name",
                            "hash": {},
                            "data": data
                        }) : helper))) + "\" id=\"" + escapeExpression(((helper = (helper = helpers.valueId || (depth0 != null ? depth0.valueId : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "valueId",
                            "hash": {},
                            "data": data
                        }) : helper))) + "\">\n\n";
                        stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.required : depth0), {
                            "name": "unless",
                            "hash": {},
                            "fn": this.program(7, data),
                            "inverse": this.noop,
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
                            "inverse": this.noop,
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
                            "inverse": this.noop,
                            "data": data
                        });
                        if (stack1 != null) {
                            buffer += stack1;
                        }
                        stack1 = ((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
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
                            "inverse": this.noop,
                            "data": data
                        });
                        if (stack1 != null) {
                            buffer += stack1;
                        }
                        buffer += "</td>\n<td>";
                        stack1 = ((helper = (helper = helpers.paramType || (depth0 != null ? depth0.paramType : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
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
                this.Handlebars.templates.param_readonly = Handlebars.template({
                    "1": function (depth0, helpers, partials, data) {
                        var helper, functionType = "function",
                            helperMissing = helpers.helperMissing,
                            escapeExpression = this.escapeExpression;
                        return "        <textarea class='body-textarea' readonly='readonly' name='" + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "name",
                            "hash": {},
                            "data": data
                        }) : helper))) + "' id='" + escapeExpression(((helper = (helper = helpers.valueId || (depth0 != null ? depth0.valueId : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "valueId",
                            "hash": {},
                            "data": data
                        }) : helper))) + "'>" + escapeExpression(((helper = (helper = helpers.default || (depth0 != null ? depth0.default : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
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
                        var helper, functionType = "function",
                            helperMissing = helpers.helperMissing,
                            escapeExpression = this.escapeExpression;
                        return "            " + escapeExpression(((helper = (helper = helpers.default || (depth0 != null ? depth0.default : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "default",
                            "hash": {},
                            "data": data
                        }) : helper))) + "\n";
                    },
                    "6": function (depth0, helpers, partials, data) {
                        return "            (empty)\n";
                    },
                    "compiler": [6, ">= 2.0.0-beta.1"],
                    "main": function (depth0, helpers, partials, data) {
                        var stack1, helper, functionType = "function",
                            helperMissing = helpers.helperMissing,
                            escapeExpression = this.escapeExpression,
                            buffer = "<td class='code'><label for='" + escapeExpression(((helper = (helper = helpers.valueId || (depth0 != null ? depth0.valueId : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                                "name": "valueId",
                                "hash": {},
                                "data": data
                            }) : helper))) + "'>" + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
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
                        stack1 = ((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "description",
                            "hash": {},
                            "data": data
                        }) : helper));
                        if (stack1 != null) {
                            buffer += stack1;
                        }
                        buffer += "</td>\n<td>";
                        stack1 = ((helper = (helper = helpers.paramType || (depth0 != null ? depth0.paramType : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
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
                this.Handlebars.templates.param_readonly_required = Handlebars.template({
                    "1": function (depth0, helpers, partials, data) {
                        var helper, functionType = "function",
                            helperMissing = helpers.helperMissing,
                            escapeExpression = this.escapeExpression;
                        return "        <textarea class='body-textarea' readonly='readonly' placeholder='(required)' name='" + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "name",
                            "hash": {},
                            "data": data
                        }) : helper))) + "' id='" + escapeExpression(((helper = (helper = helpers.valueId || (depth0 != null ? depth0.valueId : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "valueId",
                            "hash": {},
                            "data": data
                        }) : helper))) + "'>" + escapeExpression(((helper = (helper = helpers.default || (depth0 != null ? depth0.default : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
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
                        var helper, functionType = "function",
                            helperMissing = helpers.helperMissing,
                            escapeExpression = this.escapeExpression;
                        return "            " + escapeExpression(((helper = (helper = helpers.default || (depth0 != null ? depth0.default : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "default",
                            "hash": {},
                            "data": data
                        }) : helper))) + "\n";
                    },
                    "6": function (depth0, helpers, partials, data) {
                        return "            (empty)\n";
                    },
                    "compiler": [6, ">= 2.0.0-beta.1"],
                    "main": function (depth0, helpers, partials, data) {
                        var stack1, helper, functionType = "function",
                            helperMissing = helpers.helperMissing,
                            escapeExpression = this.escapeExpression,
                            buffer = "<td class='code required'><label for='" + escapeExpression(((helper = (helper = helpers.valueId || (depth0 != null ? depth0.valueId : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                                "name": "valueId",
                                "hash": {},
                                "data": data
                            }) : helper))) + "'>" + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
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
                        stack1 = ((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "description",
                            "hash": {},
                            "data": data
                        }) : helper));
                        if (stack1 != null) {
                            buffer += stack1;
                        }
                        buffer += "</td>\n<td>";
                        stack1 = ((helper = (helper = helpers.paramType || (depth0 != null ? depth0.paramType : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
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
                this.Handlebars.templates.param_required = Handlebars.template({
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
                        var helper, functionType = "function",
                            helperMissing = helpers.helperMissing,
                            escapeExpression = this.escapeExpression;
                        return "			<input type=\"file\" name='" + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "name",
                            "hash": {},
                            "data": data
                        }) : helper))) + "' id='" + escapeExpression(((helper = (helper = helpers.valueId || (depth0 != null ? depth0.valueId : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
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
                        var helper, functionType = "function",
                            helperMissing = helpers.helperMissing,
                            escapeExpression = this.escapeExpression;
                        return "				<textarea class='body-textarea required' placeholder='(required)' name='" + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "name",
                            "hash": {},
                            "data": data
                        }) : helper))) + "' id=\"" + escapeExpression(((helper = (helper = helpers.valueId || (depth0 != null ? depth0.valueId : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "valueId",
                            "hash": {},
                            "data": data
                        }) : helper))) + "\">" + escapeExpression(((helper = (helper = helpers.default || (depth0 != null ? depth0.default : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "default",
                            "hash": {},
                            "data": data
                        }) : helper))) + "</textarea>\n        <br />\n        <div class=\"parameter-content-type\" />\n";
                    },
                    "7": function (depth0, helpers, partials, data) {
                        var helper, functionType = "function",
                            helperMissing = helpers.helperMissing,
                            escapeExpression = this.escapeExpression;
                        return "				<textarea class='body-textarea required' placeholder='(required)' name='" + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "name",
                            "hash": {},
                            "data": data
                        }) : helper))) + "' id='" + escapeExpression(((helper = (helper = helpers.valueId || (depth0 != null ? depth0.valueId : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
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
                        var helper, functionType = "function",
                            helperMissing = helpers.helperMissing,
                            escapeExpression = this.escapeExpression;
                        return "			<input class='parameter' class='required' type='file' name='" + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "name",
                            "hash": {},
                            "data": data
                        }) : helper))) + "' id='" + escapeExpression(((helper = (helper = helpers.valueId || (depth0 != null ? depth0.valueId : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "valueId",
                            "hash": {},
                            "data": data
                        }) : helper))) + "'/>\n";
                    },
                    "12": function (depth0, helpers, partials, data) {
                        var stack1, helperMissing = helpers.helperMissing,
                            buffer = "";
                        stack1 = ((helpers.renderTextParam || (depth0 && depth0.renderTextParam) || helperMissing).call(depth0, depth0, {
                            "name": "renderTextParam",
                            "hash": {},
                            "fn": this.program(13, data),
                            "inverse": this.noop,
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
                    "compiler": [6, ">= 2.0.0-beta.1"],
                    "main": function (depth0, helpers, partials, data) {
                        var stack1, helper, functionType = "function",
                            helperMissing = helpers.helperMissing,
                            escapeExpression = this.escapeExpression,
                            buffer = "<td class='code required'><label for='" + escapeExpression(((helper = (helper = helpers.valueId || (depth0 != null ? depth0.valueId : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                                "name": "valueId",
                                "hash": {},
                                "data": data
                            }) : helper))) + "'>" + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
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
                        stack1 = ((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "description",
                            "hash": {},
                            "data": data
                        }) : helper));
                        if (stack1 != null) {
                            buffer += stack1;
                        }
                        buffer += "</span></strong>\n</td>\n<td>";
                        stack1 = ((helper = (helper = helpers.paramType || (depth0 != null ? depth0.paramType : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
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
                this.Handlebars.templates.parameter_content_type = Handlebars.template({
                    "1": function (depth0, helpers, partials, data) {
                        var stack1, buffer = "";
                        stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.consumes : depth0), {
                            "name": "each",
                            "hash": {},
                            "fn": this.program(2, data),
                            "inverse": this.noop,
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
                    "compiler": [6, ">= 2.0.0-beta.1"],
                    "main": function (depth0, helpers, partials, data) {
                        var stack1, helper, functionType = "function",
                            helperMissing = helpers.helperMissing,
                            escapeExpression = this.escapeExpression,
                            buffer = "<label for=\"" + escapeExpression(((helper = (helper = helpers.parameterContentTypeId || (depth0 != null ? depth0.parameterContentTypeId : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                                "name": "parameterContentTypeId",
                                "hash": {},
                                "data": data
                            }) : helper))) + "\">Parameter content type:</label>\n<select name=\"parameterContentType\" id=\"" + escapeExpression(((helper = (helper = helpers.parameterContentTypeId || (depth0 != null ? depth0.parameterContentTypeId : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                                "name": "parameterContentTypeId",
                                "hash": {},
                                "data": data
                            }) : helper))) + "\">\n";
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
                this.Handlebars.templates.resource = Handlebars.template({
                    "1": function (depth0, helpers, partials, data) {
                        return " : ";
                    },
                    "3": function (depth0, helpers, partials, data) {
                        var helper, functionType = "function",
                            helperMissing = helpers.helperMissing,
                            escapeExpression = this.escapeExpression;
                        return "    <li>\n      <a href='" + escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "url",
                            "hash": {},
                            "data": data
                        }) : helper))) + "' data-sw-translate>Raw</a>\n    </li>\n";
                    },
                    "compiler": [6, ">= 2.0.0-beta.1"],
                    "main": function (depth0, helpers, partials, data) {
                        var stack1, helper, options, functionType = "function",
                            helperMissing = helpers.helperMissing,
                            escapeExpression = this.escapeExpression,
                            blockHelperMissing = helpers.blockHelperMissing,
                            buffer = "<div class='heading'>\n  <h2>\n    <a href='#!/" + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                                "name": "id",
                                "hash": {},
                                "data": data
                            }) : helper))) + "' class=\"toggleEndpointList\" data-id=\"" + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                                "name": "id",
                                "hash": {},
                                "data": data
                            }) : helper))) + "\">" + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                                "name": "name",
                                "hash": {},
                                "data": data
                            }) : helper))) + "</a> ";
                        stack1 = ((helper = (helper = helpers.summary || (depth0 != null ? depth0.summary : depth0)) != null ? helper : helperMissing), (options = {
                            "name": "summary",
                            "hash": {},
                            "fn": this.program(1, data),
                            "inverse": this.noop,
                            "data": data
                        }), (typeof helper === functionType ? helper.call(depth0, options) : helper));
                        if (!helpers.summary) {
                            stack1 = blockHelperMissing.call(depth0, stack1, options);
                        }
                        if (stack1 != null) {
                            buffer += stack1;
                        }
                        stack1 = ((helper = (helper = helpers.summary || (depth0 != null ? depth0.summary : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "summary",
                            "hash": {},
                            "data": data
                        }) : helper));
                        if (stack1 != null) {
                            buffer += stack1;
                        }
                        buffer += "\n  </h2>\n  <ul class='options'>\n    <li>\n      <a href='#!/" + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "id",
                            "hash": {},
                            "data": data
                        }) : helper))) + "' id='endpointListTogger_" + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "id",
                            "hash": {},
                            "data": data
                        }) : helper))) + "' class=\"toggleEndpointList\" data-id=\"" + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "id",
                            "hash": {},
                            "data": data
                        }) : helper))) + "\" data-sw-translate>Show/Hide</a>\n    </li>\n    <li>\n      <a href='#' class=\"collapseResource\" data-id=\"" + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "id",
                            "hash": {},
                            "data": data
                        }) : helper))) + "\" data-sw-translate>\n        List Operations\n      </a>\n    </li>\n    <li>\n      <a href='#' class=\"expandResource\" data-id=\"" + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "id",
                            "hash": {},
                            "data": data
                        }) : helper))) + "\" data-sw-translate>\n        Expand Operations\n      </a>\n    </li>\n";
                        stack1 = helpers.if.call(depth0, (depth0 != null ? depth0.url : depth0), {
                            "name": "if",
                            "hash": {},
                            "fn": this.program(3, data),
                            "inverse": this.noop,
                            "data": data
                        });
                        if (stack1 != null) {
                            buffer += stack1;
                        }
                        return buffer + "  </ul>\n</div>\n<ul class='endpoints' id='" + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "id",
                            "hash": {},
                            "data": data
                        }) : helper))) + "_endpoint_list' style='display:none'>\n\n</ul>\n";
                    },
                    "useData": true
                });
                this.Handlebars.templates.response_content_type = Handlebars.template({
                    "1": function (depth0, helpers, partials, data) {
                        var stack1, buffer = "";
                        stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.produces : depth0), {
                            "name": "each",
                            "hash": {},
                            "fn": this.program(2, data),
                            "inverse": this.noop,
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
                    "compiler": [6, ">= 2.0.0-beta.1"],
                    "main": function (depth0, helpers, partials, data) {
                        var stack1, helper, functionType = "function",
                            helperMissing = helpers.helperMissing,
                            escapeExpression = this.escapeExpression,
                            buffer = "<label data-sw-translate for=\"" + escapeExpression(((helper = (helper = helpers.responseContentTypeId || (depth0 != null ? depth0.responseContentTypeId : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                                "name": "responseContentTypeId",
                                "hash": {},
                                "data": data
                            }) : helper))) + "\">Response Content Type</label>\n<select name=\"responseContentType\" id=\"" + escapeExpression(((helper = (helper = helpers.responseContentTypeId || (depth0 != null ? depth0.responseContentTypeId : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                                "name": "responseContentTypeId",
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
                this.Handlebars.templates.signature = Handlebars.template({
                    "compiler": [6, ">= 2.0.0-beta.1"],
                    "main": function (depth0, helpers, partials, data) {
                        var stack1, helper, functionType = "function",
                            helperMissing = helpers.helperMissing,
                            escapeExpression = this.escapeExpression,
                            buffer = "<div>\n<ul class=\"signature-nav\">\n  <li><a class=\"description-link\" href=\"#\" data-sw-translate>Model</a></li>\n  <li><a class=\"snippet-link\" href=\"#\" data-sw-translate>Model Schema</a></li>\n</ul>\n<div>\n\n<div class=\"signature-container\">\n  <div class=\"description\">\n    ";
                        stack1 = ((helper = (helper = helpers.signature || (depth0 != null ? depth0.signature : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "signature",
                            "hash": {},
                            "data": data
                        }) : helper));
                        if (stack1 != null) {
                            buffer += stack1;
                        }
                        return buffer + "\n  </div>\n\n  <div class=\"snippet\">\n    <pre><code>" + escapeExpression(((helper = (helper = helpers.sampleJSON || (depth0 != null ? depth0.sampleJSON : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                            "name": "sampleJSON",
                            "hash": {},
                            "data": data
                        }) : helper))) + "</code></pre>\n    <small class=\"notice\"></small>\n  </div>\n</div>\n\n";
                    },
                    "useData": true
                });
                this.Handlebars.templates.status_code = Handlebars.template({
                    "1": function (depth0, helpers, partials, data) {
                        var lambda = this.lambda,
                            escapeExpression = this.escapeExpression;
                        return "      <tr>\n        <td>" + escapeExpression(lambda((data && data.key), depth0)) + "</td>\n        <td>" + escapeExpression(lambda((depth0 != null ? depth0.description : depth0), depth0)) + "</td>\n        <td>" + escapeExpression(lambda((depth0 != null ? depth0.type : depth0), depth0)) + "</td>\n      </tr>\n";
                    },
                    "compiler": [6, ">= 2.0.0-beta.1"],
                    "main": function (depth0, helpers, partials, data) {
                        var stack1, helper, functionType = "function",
                            helperMissing = helpers.helperMissing,
                            escapeExpression = this.escapeExpression,
                            buffer = "<td width='15%' class='code'>" + escapeExpression(((helper = (helper = helpers.code || (depth0 != null ? depth0.code : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                                "name": "code",
                                "hash": {},
                                "data": data
                            }) : helper))) + "</td>\n<td class=\"markdown\">";
                        stack1 = ((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
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
                            "inverse": this.noop,
                            "data": data
                        });
                        if (stack1 != null) {
                            buffer += stack1;
                        }
                        return buffer + "    </tbody>\n  </table>\n</td>";
                    },
                    "useData": true
                });

                'use strict';

                SwaggerUi.Views.ContentTypeView = Backbone.View.extend({
                    initialize: function () {},

                    render: function () {
                        this.model.contentTypeId = 'ct' + Math.random();
                        $(this.el).html(Handlebars.templates.content_type(this.model));
                        return this;
                    }
                });
                'use strict';

                SwaggerUi.Views.HeaderView = Backbone.View.extend({
                    events: {
                        'click #show-pet-store-icon': 'showPetStore',
                        'click #explore': 'showCustom',
                        'keyup #input_baseUrl': 'showCustomOnKeyup',
                        'keyup #input_apiKey': 'showCustomOnKeyup'
                    },

                    initialize: function () {},

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
                            url: $('#input_baseUrl').val(),
                            apiKey: $('#input_apiKey').val()
                        });
                    },

                    update: function (url, apiKey, trigger) {
                        if (trigger === undefined) {
                            trigger = false;
                        }

                        $('#input_baseUrl').val(url);

                        //$('#input_apiKey').val(apiKey);
                        if (trigger) {
                            this.trigger('update-swagger-ui', {
                                url: url
                            });
                        }
                    }
                });

                'use strict';

                SwaggerUi.Views.MainView = Backbone.View.extend({
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
                        var sorterOption, sorterFn, key, value;
                        opts = opts || {};

                        this.router = opts.router;

                        // Sort APIs
                        if (opts.swaggerOptions.apisSorter) {
                            sorterOption = opts.swaggerOptions.apisSorter;
                            if (typeof sorterOption === 'function') {
                                sorterFn = sorterOption;
                            } else {
                                sorterFn = this.apisSorter[sorterOption];
                            }
                            if (typeof sorterFn === 'function') {
                                this.model.apisArray.sort(sorterFn);
                            }
                        }
                        // Sort operations of each API
                        if (opts.swaggerOptions.operationsSorter) {
                            sorterOption = opts.swaggerOptions.operationsSorter;
                            if (typeof sorterOption === 'function') {
                                sorterFn = sorterOption;
                            } else {
                                sorterFn = this.operationsSorters[sorterOption];
                            }
                            if (typeof sorterFn === 'function') {
                                for (key in this.model.apisArray) {
                                    this.model.apisArray[key].operationsArray.sort(sorterFn);
                                }
                            }
                        }

                        // set up the UI for input
                        this.model.auths = [];

                        for (key in this.model.securityDefinitions) {
                            value = this.model.securityDefinitions[key];

                            this.model.auths.push({
                                name: key,
                                type: value.type,
                                value: value
                            });
                        }

                        // Validator URL specified explicitly
                        this.model.validatorUrl = opts.swaggerOptions.validatorUrl;
                    },

                    render: function () {
                        if (this.model.securityDefinitions) {
                            for (var name in this.model.securityDefinitions) {
                                var auth = this.model.securityDefinitions[name];
                                var button;
                            }
                        }

                        // Render the outer container for resources
                        $(this.el).html(Handlebars.templates.main(this.model));

                        // Render each resource

                        var resources = {};
                        var counter = 0;
                        for (var i = 0; i < this.model.apisArray.length; i++) {
                            var resource = this.model.apisArray[i];
                            var id = resource.name;
                            while (typeof resources[id] !== 'undefined') {
                                id = id + '_' + counter;
                                counter += 1;
                            }
                            resource.id = id;
                            resources[id] = resource;
                            this.addResource(resource, this.model.auths);
                        }

                        $('.propWrap').hover(function onHover() {
                            $('.optionsWrapper', $(this)).show();
                        }, function offhover() {
                            $('.optionsWrapper', $(this)).hide();
                        });
                        return this;
                    },

                    addResource: function (resource, auths) {
                        // Render a resource and add it to resources li
                        resource.id = resource.id.replace(/\s/g, '_');
                        var resourceView = new SwaggerUi.Views.ResourceView({
                            model: resource,
                            router: this.router,
                            tagName: 'li',
                            id: 'resource_' + resource.id,
                            className: 'resource',
                            auths: auths,
                            swaggerOptions: this.options.swaggerOptions
                        });
                        $('#resources', this.el).append(resourceView.render().el);
                    },

                    clear: function () {
                        $(this.el).html('');
                    }
                });

                'use strict';

                SwaggerUi.Views.OperationView = Backbone.View.extend({
                    invocationUrl: null,

                    events: {
                        'submit .sandbox': 'submitOperation',
                        'click .submit': 'submitOperation',
                        'click .response_hider': 'hideResponse',
                        'click .toggleOperation': 'toggleOperationContent',
                        'dblclick .curl': 'selectText',
                    },

                    initialize: function (opts) {
                        opts = opts || {};
                        this.router = opts.router;
                        this.auths = opts.auths;
                        this.parentId = this.model.parentId;
                        this.nickname = this.model.nickname;
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
                        isMethodSubmissionSupported = jQuery.inArray(this.model.method, this.model.supportedSubmitMethods()) >= 0;
                        if (!isMethodSubmissionSupported) {
                            this.model.isReadOnly = true;
                        }
                        this.model.description = this.model.description || this.model.notes;
                        this.model.oauth = null;
                        modelAuths = this.model.authorizations || this.model.security;
                        if (modelAuths) {
                            if (Array.isArray(modelAuths)) {
                                for (l = 0, len = modelAuths.length; l < len; l++) {
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
                                        for (m = 0, len1 = v.length; m < len1; m++) {
                                            o = v[m];
                                            this.model.oauth.scopes.push(o);
                                        }
                                    }
                                }
                            }
                        }
                        if (typeof this.model.responses !== 'undefined') {
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
                        if (typeof this.model.responseMessages === 'undefined') {
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
                        $(this.el).html(Handlebars.templates.operation(this.model));
                        if (signatureModel) {
                            responseSignatureView = new SwaggerUi.Views.SignatureView({
                                model: signatureModel,
                                router: this.router,
                                tagName: 'div'
                            });
                            $('.model-signature', $(this.el)).append(responseSignatureView.render().el);
                        } else {
                            this.model.responseClassSignature = 'string';
                            $('.model-signature', $(this.el)).html(this.model.type);
                        }
                        contentTypeModel = {
                            isParam: false
                        };
                        contentTypeModel.consumes = this.model.consumes;
                        contentTypeModel.produces = this.model.produces;
                        ref3 = this.model.parameters;
                        for (n = 0, len2 = ref3.length; n < len2; n++) {
                            param = ref3[n];
                            type = param.type || param.dataType || '';
                            if (typeof type === 'undefined') {
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
                            router: this.router
                        });
                        $('.response-content-type', $(this.el)).append(responseContentTypeView.render().el);
                        ref4 = this.model.parameters;
                        for (p = 0, len3 = ref4.length; p < len3; p++) {
                            param = ref4[p];
                            this.addParameter(param, contentTypeModel.consumes);
                        }
                        ref5 = this.model.responseMessages;
                        for (q = 0, len4 = ref5.length; q < len4; q++) {
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
                        $('.operation-params', $(this.el)).append(paramView.render().el);
                    },

                    addStatusCode: function (statusCode) {
                        // Render status codes
                        var statusCodeView = new SwaggerUi.Views.StatusCodeView({
                            model: statusCode,
                            tagName: 'tr',
                            router: this.router
                        });
                        $('.operation-status', $(this.el)).append(statusCodeView.render().el);
                    },

                    // Note: copied from CoffeeScript compiled file
                    // TODO: redactor
                    submitOperation: function (e) {
                        var error_free, form, isFileUpload, map, opts;
                        if (e !== null) {
                            e.preventDefault();
                        }
                        form = $('.sandbox', $(this.el));
                        error_free = true;
                        form.find('input.required').each(function () {
                            $(this).removeClass('error');
                            if (jQuery.trim($(this).val()) === '') {
                                $(this).addClass('error');
                                $(this).wiggle({
                                    callback: (function (_this) {
                                        return function () {
                                            $(_this).focus();
                                        };
                                    })(this)
                                });
                                error_free = false;
                            }
                        });
                        form.find('textarea.required').each(function () {
                            $(this).removeClass('error');
                            if (jQuery.trim($(this).val()) === '') {
                                $(this).addClass('error');
                                $(this).wiggle({
                                    callback: (function (_this) {
                                        return function () {
                                            return $(_this).focus();
                                        };
                                    })(this)
                                });
                                error_free = false;
                            }
                        });
                        form.find('select.required').each(function () {
                            $(this).removeClass('error');
                            if (this.selectedIndex === -1) {
                                $(this).addClass('error');
                                $(this).wiggle({
                                    callback: (function (_this) {
                                        return function () {
                                            $(_this).focus();
                                        };
                                    })(this)
                                });
                                error_free = false;
                            }
                        });
                        if (error_free) {
                            map = this.getInputMap(form);
                            isFileUpload = this.isFileUpload(form);
                            opts = {
                                parent: this
                            };
                            if (this.options.swaggerOptions) {
                                for (var key in this.options.swaggerOptions) {
                                    opts[key] = this.options.swaggerOptions[key];
                                }
                            }
                            opts.responseContentType = $('div select[name=responseContentType]', $(this.el)).val();
                            opts.requestContentType = $('div select[name=parameterContentType]', $(this.el)).val();
                            $('.response_throbber', $(this.el)).show();
                            if (isFileUpload) {
                                $('.request_url', $(this.el)).html('<pre></pre>');
                                $('.request_url pre', $(this.el)).text(this.invocationUrl);

                                map.parameterContentType = 'multipart/form-data';
                                this.map = map;
                                return this.model.execute(map, opts, this.showCompleteStatus, this.showErrorStatus, this);
                            } else {
                                this.map = map;
                                return this.model.execute(map, opts, this.showCompleteStatus, this.showErrorStatus, this);
                            }
                        }
                    },

                    getInputMap: function (form) {
                        var map, ref1, l, len, o, ref2, m, len1, val, ref3, n, len2;
                        map = {};
                        ref1 = form.find('input');
                        for (l = 0, len = ref1.length; l < len; l++) {
                            o = ref1[l];
                            if ((o.value !== null) && jQuery.trim(o.value).length > 0) {
                                map[o.name] = o.value;
                            }
                            if (o.type === 'file') {
                                map[o.name] = o.files[0];
                            }
                        }
                        ref2 = form.find('textarea');
                        for (m = 0, len1 = ref2.length; m < len1; m++) {
                            o = ref2[m];
                            val = this.getTextAreaValue(o);
                            if ((val !== null) && jQuery.trim(val).length > 0) {
                                map[o.name] = val;
                            }
                        }
                        ref3 = form.find('select');
                        for (n = 0, len2 = ref3.length; n < len2; n++) {
                            o = ref3[n];
                            val = this.getSelectedValue(o);
                            if ((val !== null) && jQuery.trim(val).length > 0) {
                                map[o.name] = val;
                            }
                        }
                        return map;
                    },

                    isFileUpload: function (form) {
                        var ref1, l, len, o;
                        var isFileUpload = false;
                        ref1 = form.find('input');
                        for (l = 0, len = ref1.length; l < len; l++) {
                            o = ref1[l];
                            if (o.type === 'file') {
                                isFileUpload = true;
                            }
                        }
                        return isFileUpload;
                    },

                    success: function (response, parent) {
                        parent.showCompleteStatus(response);
                    },

                    // wraps a jquery response as a shred response
                    wrap: function (data) {
                        var h, headerArray, headers, i, l, len, o;
                        headers = {};
                        headerArray = data.getAllResponseHeaders().split('\r');
                        for (l = 0, len = headerArray.length; l < len; l++) {
                            i = headerArray[l];
                            h = i.match(/^([^:]*?):(.*)$/);
                            if (!h) {
                                h = [];
                            }
                            h.shift();
                            if (h[0] !== void 0 && h[1] !== void 0) {
                                headers[h[0].trim()] = h[1].trim();
                            }
                        }
                        o = {};
                        o.content = {};
                        o.content.data = data.responseText;
                        o.headers = headers;
                        o.request = {};
                        o.request.url = this.invocationUrl;
                        o.status = data.status;
                        return o;
                    },

                    getSelectedValue: function (select) {
                        if (!select.multiple) {
                            return select.value;
                        } else {
                            var options = [];
                            for (var l = 0, len = select.options.length; l < len; l++) {
                                var opt = select.options[l];
                                if (opt.selected) {
                                    options.push(opt.value);
                                }
                            }
                            if (options.length > 0) {
                                return options;
                            } else {
                                return null;
                            }
                        }
                    },

                    // handler for hide response link
                    hideResponse: function (e) {
                        if (e) {
                            e.preventDefault();
                        }
                        $('.response', $(this.el)).slideUp();
                        $('.response_hider', $(this.el)).fadeOut();
                    },

                    // Show response from server
                    showResponse: function (response) {
                        var prettyJson = JSON.stringify(response, null, '\t').replace(/\n/g, '<br>');
                        $('.response_body', $(this.el)).html(local.escape(prettyJson));
                    },

                    // Show error from server
                    showErrorStatus: function (data, parent) {
                        parent.showStatus(data);
                    },

                    // show the status codes
                    showCompleteStatus: function (data, parent) {
                        parent.showStatus(data);
                    },

                    // Adapted from http://stackoverflow.com/a/2893259/454004
                    // Note: directly ported from CoffeeScript
                    // TODO: Cleanup CoffeeScript artifacts
                    formatXml: function (xml) {
                        var contexp, fn, formatted, indent, l, lastType, len, lines, ln, pad, reg, transitions, wsexp;
                        reg = /(>)(<)(\/*)/g;
                        wsexp = /[ ]*(.*)[ ]+\n/g;
                        contexp = /(<.+>)(.+\n)/g;
                        xml = xml.replace(reg, '$1\n$2$3').replace(wsexp, '$1\n').replace(contexp, '$1\n$2');
                        pad = 0;
                        formatted = '';
                        lines = xml.split('\n');
                        indent = 0;
                        lastType = 'other';
                        transitions = {
                            'single->single': 0,
                            'single->closing': -1,
                            'single->opening': 0,
                            'single->other': 0,
                            'closing->single': 0,
                            'closing->closing': -1,
                            'closing->opening': 0,
                            'closing->other': 0,
                            'opening->single': 1,
                            'opening->closing': 0,
                            'opening->opening': 1,
                            'opening->other': 1,
                            'other->single': 0,
                            'other->closing': -1,
                            'other->opening': 0,
                            'other->other': 0
                        };
                        fn = function (ln) {
                            var fromTo, j, key, padding, type, types, value;
                            types = {
                                single: Boolean(ln.match(/<.+\/>/)),
                                closing: Boolean(ln.match(/<\/.+>/)),
                                opening: Boolean(ln.match(/<[^!?].*>/))
                            };
                            type = ((function () {
                                var results;
                                results = [];
                                for (key in types) {
                                    value = types[key];
                                    if (value) {
                                        results.push(key);
                                    }
                                }
                                return results;
                            })())[0];
                            type = type === void 0 ? 'other' : type;
                            fromTo = lastType + '->' + type;
                            lastType = type;
                            padding = '';
                            indent += transitions[fromTo];
                            padding = ((function () {
                                var m, ref1, results;
                                results = [];
                                for (j = m = 0, ref1 = indent; 0 <= ref1 ? m < ref1 : m > ref1; j = 0 <= ref1 ? ++m : --m) {
                                    results.push('  ');
                                }
                                return results;
                            })()).join('');
                            if (fromTo === 'opening->closing') {
                                formatted = formatted.substr(0, formatted.length - 1) + ln + '\n';
                            } else {
                                formatted += padding + ln + '\n';
                            }
                        };
                        for (l = 0, len = lines.length; l < len; l++) {
                            ln = lines[l];
                            fn(ln);
                        }
                        return formatted;
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
                        content = jQuery.trim(content);

                        // if server is nice, and sends content-type back, we can use it
                        var contentType = null;
                        if (headers) {
                            contentType = headers['Content-Type'] || headers['content-type'];
                            if (contentType) {
                                contentType = contentType.split(';')[0].trim();
                            }
                        }
                        $('.response_body', $(this.el)).removeClass('json');
                        $('.response_body', $(this.el)).removeClass('xml');

                        var supportsAudioPlayback = function (contentType) {
                            var audioElement = document.createElement('audio');
                            return !!(audioElement.canPlayType && audioElement.canPlayType(contentType).replace(/no/, ''));
                        };

                        var pre;
                        var code;
                        if (!content) {
                            code = $('<code />').text('no content');
                            pre = $('<pre class="json" />').append(code);

                            // JSON
                        } else if (contentType === 'application/json' || /\+json$/.test(contentType)) {
                            var json = null;
                            try {
                                json = JSON.stringify(JSON.parse(content), null, '  ');
                            } catch (_error) {
                                json = 'can\'t parse JSON.  Raw result:\n\n' + content;
                            }
                            code = $('<code />').text(json);
                            pre = $('<pre class="json" />').append(code);

                            // XML
                        } else if (contentType === 'application/xml' || /\+xml$/.test(contentType)) {
                            code = $('<code />').text(this.formatXml(content));
                            pre = $('<pre class="xml" />').append(code);

                            // HTML
                        } else if (contentType === 'text/html') {
                            code = $('<code />').html(local.escape(content));
                            pre = $('<pre class="xml" />').append(code);

                            // Plain Text
                        } else if (/text\/plain/.test(contentType)) {
                            code = $('<code />').text(content);
                            pre = $('<pre class="plain" />').append(code);


                            // Image
                        } else if (/^image\//.test(contentType)) {
                            pre = $('<img>').attr('src', url);

                            // Audio
                        } else if (/^audio\//.test(contentType) && supportsAudioPlayback(contentType)) {
                            pre = $('<audio controls>').append($('<source>').attr('src', url).attr('type', contentType));

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

                                pre = $('<div/>').append(a);
                            } else {
                                pre = $('<pre class="json" />').append('Download headers detected but your browser does not support downloading binary via XHR (Blob).');
                            }

                            // Location header based redirect download
                        } else if (headers.location || headers.Location) {
                            window.location = response.url;

                            // Anything else (CORS)
                        } else {
                            code = $('<code />').text(content);
                            pre = $('<pre class="json" />').append(code);
                        }
                        var response_body = pre;
                        $('.request_url', $(this.el)).html('<pre></pre>');
                        $('.request_url pre', $(this.el)).text(url);
                        $('.response_code', $(this.el)).html('<pre>' + response.status + '</pre>');
                        $('.response_body', $(this.el)).html(response_body);
                        $('.response_headers', $(this.el)).html('<pre>' + local.escape(JSON.stringify(response.headers, null, '  ')).replace(/\n/g, '<br>') + '</pre>');
                        $('.response', $(this.el)).slideDown();
                        $('.response_hider', $(this.el)).show();
                        $('.response_throbber', $(this.el)).hide();


                        //adds curl output
                        var curlCommand = this.model.asCurl(this.map);
                        curlCommand = curlCommand.replace('!', '&#33;');
                        $('.curl', $(this.el)).html('<pre>' + curlCommand + '</pre>');

                        // only highlight the response if response is less than threshold, default state is highlight response
                        var opts = this.options.swaggerOptions;

                        if (opts.showRequestHeaders) {
                            var form = $('.sandbox', $(this.el)),
                                map = this.getInputMap(form),
                                requestHeaders = this.model.getHeaderParams(map);
                            delete requestHeaders['Content-Type'];
                            $('.request_headers', $(this.el)).html('<pre>' + local.escape(JSON.stringify(requestHeaders, null, '  ')).replace(/\n/g, '<br>') + '</pre>');
                        }

                        return $('.response_body', $(this.el))[0];
                    },

                    toggleOperationContent: function (event) {
                        var elem = $('#' + Docs.escapeResourceName(this.parentId + '_' + this.nickname + '_content'));
                        if (elem.is(':visible')) {
                            event.preventDefault();
                            $.bbq.pushState('#/', 2);
                            Docs.collapseOperation(elem);
                        } else {
                            Docs.expandOperation(elem);
                        }
                    },

                    getTextAreaValue: function (textArea) {
                        var param, parsed, result, i;
                        if (textArea.value === null || jQuery.trim(textArea.value).length === 0) {
                            return null;
                        }
                        param = this.getParamByName(textArea.name);
                        if (param && param.type && param.type.toLowerCase() === 'array') {
                            parsed = textArea.value.split('\n');
                            result = [];
                            for (i = 0; i < parsed.length; i++) {
                                if (parsed[i] !== null && jQuery.trim(parsed[i]).length > 0) {
                                    result.push(parsed[i]);
                                }
                            }
                            return result.length > 0 ? result : null;
                        } else {
                            return textArea.value;
                        }
                    },

                    getParamByName: function (name) {
                        var i;
                        if (this.model.parameters) {
                            for (i = 0; i < this.model.parameters.length; i++) {
                                if (this.model.parameters[i].name === name) {
                                    return this.model.parameters[i];
                                }
                            }
                        }
                        return null;
                    }

                });

                'use strict';

                SwaggerUi.Views.ParameterContentTypeView = Backbone.View.extend({
                    initialize: function () {},

                    render: function () {
                        this.model.parameterContentTypeId = 'pct' + Math.random();
                        $(this.el).html(Handlebars.templates.parameter_content_type(this.model));
                        return this;
                    }

                });
                'use strict';

                SwaggerUi.Views.ParameterView = Backbone.View.extend({
                    initialize: function () {
                        Handlebars.registerHelper('isArray', function (param, opts) {
                            if (param.type.toLowerCase() === 'array' || param.allowMultiple) {
                                return opts.fn(this);
                            } else {
                                return opts.inverse(this);
                            }
                        });
                    },

                    render: function () {
                        var type = this.model.type || this.model.dataType;

                        if (typeof type === 'undefined') {
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
                        if (typeof this.model.default === 'undefined') {
                            this.model.default = this.model.defaultValue;
                        }

                        this.model.hasDefault = (typeof this.model.default !== 'undefined');
                        this.model.valueId = 'm' + this.model.name + Math.random();

                        if (this.model.allowableValues) {
                            this.model.isList = true;
                        }

                        var template = this.template();
                        $(this.el).html(template(this.model));

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
                            $('.model-signature', $(this.el)).append(signatureView.render().el);
                        } else {
                            $('.model-signature', $(this.el)).html(this.model.signature);
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
                            $('.parameter-content-type', $(this.el)).append(parameterContentTypeView.render().el);
                        } else {
                            var responseContentTypeView = new SwaggerUi.Views.ResponseContentTypeView({
                                model: contentTypeModel
                            });
                            $('.response-content-type', $(this.el)).append(responseContentTypeView.render().el);
                        }

                        return this;
                    },

                    // Return an appropriate template based on if the parameter is a list, readonly, required
                    template: function () {
                        if (this.model.isList) {
                            return Handlebars.templates.param_list;
                        } else {
                            if (this.options.readOnly) {
                                if (this.model.required) {
                                    return Handlebars.templates.param_readonly_required;
                                } else {
                                    return Handlebars.templates.param_readonly;
                                }
                            } else {
                                if (this.model.required) {
                                    return Handlebars.templates.param_required;
                                } else {
                                    return Handlebars.templates.param;
                                }
                            }
                        }
                    }
                });

                'use strict';

                SwaggerUi.Views.ResourceView = Backbone.View.extend({
                    initialize: function (opts) {
                        opts = opts || {};
                        this.router = opts.router;
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


                        $(this.el).html(Handlebars.templates.resource(this.model));

                        // Render each operation
                        for (var i = 0; i < this.model.operationsArray.length; i++) {
                            var operation = this.model.operationsArray[i];
                            var counter = 0;
                            var id = operation.nickname;

                            while (typeof methods[id] !== 'undefined') {
                                id = id + '_' + counter;
                                counter += 1;
                            }

                            methods[id] = operation;

                            operation.nickname = id;
                            operation.parentId = this.model.id;
                            this.addOperation(operation);
                        }

                        $('.toggleEndpointList', this.el).click(this.callDocs.bind(this, 'toggleEndpointListForResource'));
                        $('.collapseResource', this.el).click(this.callDocs.bind(this, 'collapseOperationsForResource'));
                        $('.expandResource', this.el).click(this.callDocs.bind(this, 'expandOperationsForResource'));

                        return this;
                    },

                    addOperation: function (operation) {

                        operation.number = this.number;

                        // Render an operation and add it to operations li
                        var operationView = new SwaggerUi.Views.OperationView({
                            model: operation,
                            router: this.router,
                            tagName: 'li',
                            className: 'endpoint',
                            swaggerOptions: this.options.swaggerOptions,
                            auths: this.auths
                        });

                        $('.endpoints', $(this.el)).append(operationView.render().el);

                        this.number++;

                    },
                    // Generic Event handler (`Docs` is global)


                    callDocs: function (fnName, e) {
                        e.preventDefault();
                        Docs[fnName](e.currentTarget.getAttribute('data-id'));
                    }
                });
                'use strict';

                SwaggerUi.Views.ResponseContentTypeView = Backbone.View.extend({
                    initialize: function () {},

                    render: function () {
                        this.model.responseContentTypeId = 'rct' + Math.random();
                        $(this.el).html(Handlebars.templates.response_content_type(this.model));
                        return this;
                    }
                });
                'use strict';

                SwaggerUi.Views.SignatureView = Backbone.View.extend({
                    events: {
                        'click a.description-link': 'switchToDescription',
                        'click a.snippet-link': 'switchToSnippet',
                        'mousedown .snippet': 'snippetToTextArea'
                    },

                    initialize: function () {

                    },

                    render: function () {

                        $(this.el).html(Handlebars.templates.signature(this.model));

                        this.switchToSnippet();

                        this.isParam = this.model.isParam;

                        if (this.isParam) {
                            $('.notice', $(this.el)).text('Click to set as parameter value');
                        }

                        return this;
                    },

                    // handler for show signature
                    switchToDescription: function (e) {
                        if (e) {
                            e.preventDefault();
                        }

                        $('.snippet', $(this.el)).hide();
                        $('.description', $(this.el)).show();
                        $('.description-link', $(this.el)).addClass('selected');
                        $('.snippet-link', $(this.el)).removeClass('selected');
                    },

                    // handler for show sample
                    switchToSnippet: function (e) {
                        if (e) {
                            e.preventDefault();
                        }

                        $('.description', $(this.el)).hide();
                        $('.snippet', $(this.el)).show();
                        $('.snippet-link', $(this.el)).addClass('selected');
                        $('.description-link', $(this.el)).removeClass('selected');
                    },

                    // handler for snippet to text area
                    snippetToTextArea: function (e) {
                        if (this.isParam) {
                            if (e) {
                                e.preventDefault();
                            }

                            var textArea = $('textarea', $(this.el.parentNode.parentNode.parentNode));

                            // Fix for bug in IE 10/11 which causes placeholder text to be copied to "value"
                            if ($.trim(textArea.val()) === '' || textArea.prop('placeholder') === textArea.val()) {
                                textArea.val(this.model.sampleJSON);
                            }
                        }
                    }
                });
                'use strict';

                SwaggerUi.Views.StatusCodeView = Backbone.View.extend({
                    initialize: function (opts) {
                        this.options = opts || {};
                        this.router = this.options.router;
                    },

                    render: function () {
                        $(this.el).html(Handlebars.templates.status_code(this.model));
                        $('.model-signature', this.$el).html('');
                        return this;
                    }
                });
            }).call(this);



            }).call(window);
/* jslint-ignore-end */
        break;
    }
    return;
}());
