/* istanbul ignore all */
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
        // re-init local
        local = local.modeJs === 'browser'
            ? window.swgg.local
            : require('./index.js').local;
        // init jquery
        local.jQuery = local.global.jQuery;
        // init templateDtListPetstore
        local.swgg.templateDtListPetstore = JSON.stringify([{
            apiDict: {
                crudCreateOne: '_user crudCreateOrReplaceOne',
                'crudDeleteOneByKeyUnique.id': '_user crudDeleteOneByKeyUnique.id',
                crudGetManyByQuery: '_user crudGetManyByQuery',
                'crudUpdateOneByKeyUnique.id': '_user crudCreateOrUpdateOneByKeyUnique.id'
            },
            paginationCountTotal: 'paginationCountTotal',
            schemaName: '_User',
            title: 'swagger-lite user api',
            urlSwaggerJson: 'api/v0/swagger.json'
        }, {
            apiDict: {
                crudCreateOne: 'pet addPet',
                'crudDeleteOneByKeyUnique.petId.id': 'pet deletePet',
                crudGetManyByQuery: 'pet crudGetManyByQuery',
                'crudUpdateOneByKeyUnique.id': 'pet updatePet'
            },
            paginationCountTotal: 'paginationCountTotal',
            schemaName: 'Pet',
            title: 'petstore pet api',
            urlSwaggerJson: 'api/v0/swagger.json'
        }, {
            apiDict: {
                crudCreateOne: 'store placeOrder',
                'crudDeleteOneByKeyUnique.orderId.id': 'store deleteOrder',
                crudGetManyByQuery: 'store crudGetManyByQuery',
                'crudUpdateOneByKeyUnique.id': 'store crudCreateOrUpdateOneByKeyUnique.id'
            },
            paginationCountTotal: 'paginationCountTotal',
            schemaName: 'Order',
            title: 'petstore store api',
            urlSwaggerJson: 'api/v0/swagger.json'
        }, {
            apiDict: {
                crudCreateOne: 'user createUser',
                'crudDeleteOneByKeyUnique.username': 'user deleteUser',
                crudGetManyByQuery: 'user crudGetManyByQuery',
                'crudUpdateOneByKeyUnique.username': 'user updateUser'
            },
            paginationCountTotal: 'paginationCountTotal',
            schemaName: 'User',
            title: 'petstore user api',
            urlSwaggerJson: 'api/v0/swagger.json'
        }]);
    }());



    // run shared js-env code - function
    (function () {
        local.swgg.dtAlertErrorCreate = function (error) {
        /*
         * this function will create an error-alert
         */
            if (!(error && error.message)) {
                return;
            }
            local.utility2.taskUpsert({ key: 'dtAlertErrorCreate' }, function (onError) {
                // create alert
                document.getElementById('dtAlertContainer1').innerHTML +=
                    '<div class="alert alert-danger fade margin-0">' +
                    error.message +
                    '<button type="button" class="close" data-dismiss="alert">' +
                    '<span>&times;</span>' +
                    '</button>' +
                    '</div>';
                local.jQuery('.alert').addClass('in');
                setTimeout(onError, 1000);
            });
        };

        local.swgg.dtDatatableInit = function (event) {
        /*
         * this function will init the datatable-ui
         */
            var options, self, tmp;
            // save self
            local.swgg.dt = self = local.swgg.dtList[event.currentTarget.dataset.ii];
            // init crud-api
            Object.keys(self.apiDict).forEach(function (key) {
                if (typeof self.apiDict[key] === 'string') {
                    tmp = self.apiDict[key.split('.')[0]] = local.swgg.apiCreate(
                        local.swgg.apiDict[self.apiDict[key]]
                    );
                    tmp._operationId = key;
                }
            });
            // init self
            local.swgg.dt.schema = local.utility2.jsonCopy(
                local.swgg.swaggerJson.definitions[self.schemaName]
            );
            // init datatableOptions
            local.swgg.dt.datatableOptions = local.utility2.objectSetDefault(
                local.swgg.dt.datatableOptions || {},
                local.swgg.dtOptionsDefaultCreate()
            );
            // init datatableOptions.column
            local.swgg.dt.datatableOptions.columns = [{
                orderable: false,
                render:  function (data, type, row, meta) {
                /*
                 * this function will render the edit-cell
                 */
                    // jslint-hack
                    local.utility2.nop(data, type, row);
                    options = local.swgg.dt.datatableInstance.page.info();
                    options.ii = options.page * options.length + meta.row + 1;
                    return '<button class="btn btn-xs dtButtonRecordEdit">edit row ' +
                        options.ii + '</button>';
                },
                title: ''
            }].concat(Object.keys(local.swgg.dt.schema.properties)
                .sort(function (aa, bb) {
                    return aa === 'id'
                        ? -1
                        : bb === 'id'
                        ? 1
                        : aa < bb
                        ? -1
                        : 1;
                })
                .map(function (key) {
                    var property;
                    property = local.swgg.dt.schema.properties[key];
                    return {
                        data: key.replace((/\./g), '\\.'),
                        render: function (data) {
                        /*
                         * this function will render the data-cell
                         */
                            options = local.utility2.jsonCopy(property);
                            options.dataWrite = data;
                            local.swgg.dtFormInputDataWrite(null, options);
                            return local.utility2.stringHtmlSafe(options.dataRead);
                        },
                        title: local.utility2.stringHtmlSafe(property.title || key) + '<br>(' +
                            local.utility2.stringHtmlSafe(property.format ||
                                property.type ||
                                'object') + ')',
                        schemaPropertyName: key
                    };
                }));
            // show table-view
            local.jQuery('.tab-content').hide();
            local.jQuery('#dtNavTable1').tab('show');
            // init datatable
            document.getElementById('dtTableContainer1').innerHTML = self.html ||
                '<table class="display table table-responsive" ' +
                'id="dtTable1" width="100%"><tfoot><tr>' +
                local.swgg.dt.datatableOptions.columns.map(function (element) {
                    return '<th>' + element.title + '</th>';
                }).join('') + '</tr></tfoot></table>';
            local.swgg.dt.datatableInstance =
                local.jQuery('#dtTable1').DataTable(local.swgg.dt.datatableOptions);
            // init form-record-edit
            document.getElementById(
                'dtFormRecordEdit1'
            ).innerHTML = Object.keys(local.swgg.dt.schema.properties)
                .sort(function (aa, bb) {
                    return aa === 'id'
                        ? -1
                        : bb === 'id'
                        ? 1
                        : aa < bb
                        ? -1
                        : 1;
                })
                .map(function (key) {
                    options = local.utility2.jsonCopy(local.swgg.dt.schema.properties[key]);
                    options.name = key;
                    options.required = local.swgg.dt.schema.required &&
                        local.swgg.dt.schema.required.indexOf(key) >= 0;
                    return local.swgg.dtFormInputCreate(options);
                })
                .join('');
            // init form-table-query
            document.getElementById('dtFormTableQuery1').innerHTML = local.utility2.jsonCopy(
                local.swgg.dt.apiDict.crudGetManyByQuery.parameters
            )
                .filter(function (element) {
                    return element.name[0] !== '_' ||
                        element.name.indexOf('_queryRange.') === 0;
                })
                .sort(function (aa, bb) {
                    return aa.name < bb.name
                        ? -1
                        : 1;
                })
                .map(local.swgg.dtFormInputCreate)
                .join('');
            // init .dtFormInputDatetime
            local.jQuery('.dtFormInputDatetime').datetimepicker({
                format: 'YYYY-MM-DD HH:mm:ss'
            });
            // update .dtFormInputContainer
            Array.prototype.slice.call(
                document.getElementsByClassName('dtFormInputContainer')
            ).forEach(function (elementContainer) {
                local.swgg.dtFormInputDataWrite(elementContainer);
            });
            local.jQuery('.tab-content').fadeIn();
        };

        local.swgg.dtFormInputCreate = function (options) {
        /*
         * this function will create and return a form-input from options
         */
            var html,
                htmlInput,
                htmlInputDatetime,
                htmlInputText,
                htmlInputTextarea,
                readOnly;
            options.uuid = local.utility2.uuidTimeCreate();
            readOnly = options.readOnly
                ? 'disabled'
                : '';
            html = '<div class="dtFormInputContainer form-group" data-options="' +
                // init data-options
                encodeURIComponent(JSON.stringify(options)) +
                // init id
                '" id="' + options.uuid + '">';
            html += '<label class="col-sm-3 control-label">' +
                // init title
                ((options['x-title'] || options.title || options.name) + '<br>(' +
                (options.format || options.type || 'object') + ')') + '</label>';
            html += '<div class="col-sm-9">';
            htmlInputDatetime = '<div class="date dtFormInputDatetime input-group">' +
                '<input class="form-control" placeholder="" ' + readOnly + ' type="text">' +
                '<span class="input-group-addon">' +
                    '<span class="glyphicon glyphicon-calendar"></span>' +
                '</span>' +
                '</div>';
            htmlInputText = '<input class="form-control" placeholder="" ' +
                readOnly + ' type="text">';
            htmlInputTextarea = '<textarea class="form-control" placeholder="" ' +
                readOnly + '></textarea>';
            if (options['x-queryRange']) {
                // default
                htmlInput = '<div class="row">' +
                    '<div class="form-group col-sm-6">' + htmlInputText + '</div>' +
                    '<div class="form-group col-sm-6">' + htmlInputText + '</div>' +
                    '</div>';
                switch (options.type) {
                // type - boolean
                case 'boolean':
                    htmlInput = ['true', 'false'].map(function (key) {
                        return '<label class="checkbox-inline">' +
                            '<input name="' + options.uuid + '" ' + readOnly +
                            ' type="checkbox">' + key + '</label>';
                    }).join('');
                    break;
                // type - string
                case 'string':
                    switch (options.format) {
                    // format - date-time
                    case 'date':
                    case 'date-time':
                        htmlInput = '<div class="row">' +
                            '<div class="form-group col-sm-6">' + htmlInputDatetime + '</div>' +
                            '<div class="form-group col-sm-6">' + htmlInputDatetime + '</div>' +
                            '</div>';
                        break;
                    }
                    break;
                }
                htmlInput = htmlInput
                    .replace('placeholder=""', 'placeholder="from"')
                    .replace('placeholder=""', 'placeholder="to"');
            // dropdown - enum
            } else if (options.enum) {
                htmlInput = '<div class="btn-group">' +
                    '<button class="btn btn-default dropdown-toggle" data-toggle="dropdown" ' +
                    readOnly + '>' +
                    '<span>null</span> <span class="caret"></span>' +
                    '</button>' +
                    '<ul class="dropdown-menu">' +
                    options.enum.map(function (data) {
                        return '<li><a data-json="' +
                            encodeURIComponent(JSON.stringify(data)) +
                            '" href="#">' + data + '</a></li>';
                    }).join('') +
                    '<li class="divider"></li>' +
                    '<li><a data-json="null" href="#">null</a></li>' +
                    '</ul>' +
                    '</div>';
            } else {
                // default
                htmlInput = htmlInputText;
                switch (options.type) {
                // type - array
                case 'array':
                    htmlInput = htmlInputTextarea;
                    break;
                // type - boolean
                case 'boolean':
                    htmlInput = ['true', 'false', 'null'].map(function (key) {
                        return '<label class="radio-inline">' +
                            '<input name="' + options.uuid + '" ' + readOnly +
                            ' type="radio">' + key + '</label>';
                    }).join('');
                    break;
                // type - string
                case 'string':
                    switch (options.format) {
                    // format - date-time
                    case 'date':
                    case 'date-time':
                        htmlInput = htmlInputDatetime;
                        break;
                    case 'byte':
                    case 'json':
                        htmlInput = htmlInputTextarea;
                        break;
                    }
                    break;
                }
            }
            if (options.required) {
                htmlInput = htmlInput.replace('placeholder=""', 'placeholder="required"');
            }
            html += htmlInput;
            html += '</div>';
            html += '</div>';
            return html;
        };

        local.swgg.dtFormInputDataRead = function (elementContainer) {
        /*
         * this function will read and parse options.dataRead from the elementContainer
         */
            var data, elementInput, options;
            options = JSON.parse(decodeURIComponent(elementContainer.dataset.options));
            elementInput = elementContainer.getElementsByTagName('textarea');
            if (!elementInput.length) {
                elementInput = elementContainer.getElementsByTagName('input');
            }
            if (elementInput.length) {
                switch (options.type) {
                // type - boolean
                case 'boolean':
                    data = elementInput[0].checked
                        ? true
                        : elementInput[1].checked
                        ? false
                        : null;
                    break;
                default:
                    data = elementInput[0].value;
                }
            }
            if (options.enum) {
                data = JSON.parse(decodeURIComponent(elementContainer.dataset.json || 'null'));
            }
            options.dataRead = data;
            local.utility2.tryCatchOnError(function () {
                options.dataRead = options.type === 'string'
                    ? data || null
                    : local.utility2.isNullOrUndefined(data) ||
                        data === '' ||
                        data === 'undefined'
                    ? null
                    : JSON.parse(data);
            }, local.utility2.nop);
            // validate data
            local.utility2.tryCatchOnError(function () {
                local.jQuery(elementContainer).find('.form-control')
                    .removeClass('animated dtFormInputInvalid shake');
                local.swgg.validateByPropertyDef({
                    data: options.dataRead,
                    key: local.swgg.dt.schemaName,
                    propertyDef: options,
                    required: options.required,
                    'x-notRequired': options['x-notRequired']
                });
            }, function (error) {
                setTimeout(function () {
                    local.jQuery(elementContainer).find('.form-control')
                        .addClass('animated dtFormInputInvalid shake');
                });
                // validate no error occurred
                local.utility2.assert(!error, error);
            });
            return options;
        };

        local.swgg.dtFormInputDataWrite = function (elementContainer, options) {
        /*
         * this function will write options.dataWrite to the given elementContainer
         */
            var data, elementInput;
            options = options || elementContainer.dataset.options;
            if (typeof options === 'string') {
                options = JSON.parse(decodeURIComponent(options));
            }
            if (options['x-queryRange']) {
                return;
            }
            data = local.utility2.isNullOrUndefined(options.dataWrite)
                ? options.default || null
                : options.dataWrite;
            // dropdown - enum
            if (elementContainer && options.enum) {
                elementContainer.dataset.json = local.utility2.isNullOrUndefined(data)
                    ? ''
                    : encodeURIComponent(JSON.stringify(data));
                elementContainer.querySelector('span').textContent = String(data);
                elementContainer = null;
            }
            data = local.utility2.isNullOrUndefined(data)
                ? ''
                : typeof data === 'string' && options.type === 'string'
                ? data
                : JSON.stringify(data);
            switch (options.type) {
            // type - string
            case 'string':
                switch (options.format) {
                // format - date-time
                case 'date':
                case 'date-time':
                    if (data) {
                        data = new Date(data);
                        data = new Date(
                            data.getTime() - data.getTimezoneOffset() * 60 * 1000
                        ).toISOString().slice(0, 19).replace('T', ' ');
                    }
                    break;
                }
                break;
            }
            options.dataRead = data;
            // init elementInput.value
            if (!elementContainer) {
                return;
            }
            elementInput = elementContainer.getElementsByTagName('textarea');
            if (elementInput.length) {
                elementInput[0].value = options.dataRead;
                return;
            }
            elementInput = elementContainer.getElementsByTagName('input');
            if (elementInput.length) {
                switch (options.type) {
                // type - boolean
                case 'boolean':
                    elementInput[options.dataRead === 'true'
                        ? 0
                        : options.dataRead === 'false'
                        ? 1
                        : 2].checked = true;
                    return;
                default:
                    // bug workaround - wait for bootstrap-datetimepicker to init
                    setTimeout(function () {
                        elementInput[0].value = options.dataRead;
                    });
                }
            }
        };

        local.swgg.dtListInit = function () {
        /*
         * this function will init the admin-ui from local.swgg.dtList
         */
            // init event-handling
            // init click event-handling to login user
            local.jQuery('#userButtonLogin').on('click', function (event) {
            /*
             * this function will handle the click-event to login
             */
                window.event = event;
                event.preventDefault();
                event.stopPropagation();
                local.swgg.userLoginByPassword({
                    username: document.getElementById("userFormLoginInputUsername").value,
                    password: document.getElementById("userFormLoginInputPassword").value
                }, function (error) {
                    if (!error) {
                        local.jQuery('#userFormLogin').modal('hide');
                    }
                });
            });
            // init click event-handling to select table
            local.jQuery('#dtListContainer1').on('click', 'li', local.swgg.dtDatatableInit);
            local.jQuery('#dtTableContainer1')
                // init click event-handling to edit table-row
                .on('click', '.dtButtonRecordEdit', local.swgg.dtOnClickRecordEdit)
                // init click event-handling to toggle-select table-row
                .on('click', 'tr', function () {
                    local.jQuery(this).toggleClass('selected');
                });
            // init focusout event-handling to validate form-imputs
            local.jQuery('.dtFormContainer').on('blur', '.form-control', function (event) {
                event.preventDefault();
                event.stopPropagation();
                local.swgg.dtFormInputDataRead(
                    event.currentTarget.closest('.dtFormInputContainer')
                );
            });
            // http://stackoverflow.com/questions/13437446
            // /how-to-display-selected-item-in-bootstrap-button-dropdown-title
            // init click event-handling to select element in form-dropdown-list
            local.jQuery('.dtFormContainer').on('click', '.dropdown-menu a', function (event) {
                event.preventDefault();
                this.closest('.dtFormInputContainer').dataset.json = this.dataset.json;
                this.closest('div').querySelector('span').textContent = this.textContent;
            });
            //!! // show login form
            //!! if (!local.swgg.userJwtEncoded) {
                //!! local.jQuery('#userFormLogin').modal('show');
            //!! }
            // init dtList
            local.swgg.dtList = local.utility2.jsonCopy(local.swgg.swaggerJson['x-dtList'] ||
                JSON.parse(local.swgg.templateDtListPetstore));
            // init dom element #dtListContainer1
            document.getElementById('dtListContainer1').innerHTML =
                local.swgg.dtList.map(function (options, ii) {
                    return '<li class="' + (ii
                        ? ''
                        : 'active') + '" data-ii="' + ii +
                        '"><a data-toggle="tab" href="#dtViewTable1">' +
                        options.title + '</a></li>\n';
                }).join('');
            // init dtAlertErrorCreate-hook in local.utility2.ajax
            local.swgg.ajax = local.swgg.ajax || local.utility2.ajax;
            local.utility2.ajax = function (options, onError) {
                var onError2;
                onError2 = function (error, xhr) {
                    local.swgg.dtAlertErrorCreate(error);
                    onError(error, xhr);
                };
                local.swgg.ajax(options, onError2);
            };
            // init dtAlertErrorCreate-hook in local.utility2.assert
            local.swgg.assert = local.swgg.assert || local.utility2.assert;
            local.utility2.assert = function (passed, message) {
                local.swgg.dtAlertErrorCreate(!passed && message);
                local.swgg.assert(passed, message);
            };
            ['assert', 'onErrorDefault'].forEach(function (key) {
                // save old function
                local.utility2['_' + key] = local.utility2['_' + key] ||
                    local.utility2[key];
                // override old function
                local.utility2[key] = function (error, data) {
                    switch (key) {
                    case 'assert':
                        error = !error && (data || 'error');
                        break;
                    }
                    local.swgg.dtAlertErrorCreate(error);
                    local.utility2['_' + key].apply(null, arguments);
                };
            });
            // init first datatable
            local.jQuery('#dtListContainer1').find('li').first().click();
        };

        local.swgg.dtOnClickRecordEdit = function (event) {
        /*
         * this function will handle the click-event to edit the record
         */
            var options, rowData, saveType;
            rowData = {};
            if (event) {
                event.preventDefault();
                event.stopPropagation();
                if ((/\bdtButtonRecordEdit\b/).test(this.className)) {
                    // init rowData
                    rowData = local.swgg.dt.pageData.data[this.closest('tr').dataset.ii];
                    saveType = 'edit';
                }
            }
            // init saveType
            document.getElementById('dtButtonRecordSave1').dataset.saveType = saveType;
            // update .dtFormInputContainer
            Array.prototype.slice.call(
                document.querySelectorAll('#dtFormRecordEdit1 .dtFormInputContainer')
            ).forEach(function (elementContainer) {
                options = JSON.parse(decodeURIComponent(elementContainer.dataset.options));
                options.dataWrite = rowData[options.name];
                if (options.name === 'id' && saveType === 'edit') {
                    options.readOnly = true;
                }
                local.swgg.dtFormInputDataWrite(elementContainer, options);
            });
            // change to view-row-edit
            local.jQuery('#dtNavRecordEdit1').tab('show');
        };

        local.swgg.dtOnClickRecordSave = function () {
        /*
         * this function will handle the click-event to save the record
         */
            var crudUpdate, data, options;
            data = {};
            Array.prototype.slice.call(
                document.getElementsByClassName('dtFormInputContainer')
            ).forEach(function (element) {
                options = local.swgg.dtFormInputDataRead(element);
                data[options.name] = options.dataRead;
            });
            crudUpdate = local.swgg.dt.apiDict.crudCreateOne;
            options = { swggParamDict: {} };
            if (document.getElementById('dtButtonRecordSave1').dataset.saveType === 'edit') {
                crudUpdate = local.swgg.dt.apiDict.crudUpdateOneByKeyUnique;
                options.swggParamDict = local.swgg.keyUniqueInit({
                    data: data,
                    operationId: crudUpdate._operationId
                }).queryByKeyUnique;
            }
            crudUpdate.parameters.forEach(function (paramDef) {
                if (paramDef.in === 'body') {
                    options.swggParamDict[paramDef.name] = data;
                }
            });
            crudUpdate(options, function (error) {
                // validate no error occurred
                local.utility2.assert(!error, error);
                // show table-view
                local.jQuery('#dtNavTable1').tab('show');
                // redraw table
                local.swgg.dt.datatableInstance.draw();
            });
        };

        local.swgg.dtOptionsDefaultCreate = function () {
        /*
         * this function will return default-options for creating a datatable-instance
         */
            var options;
            options = {};
            options.ajax = function (options, callback) {
            /*
             * this function will send an ajax request for page-data
             */
                local.swgg.dt.apiDict.crudGetManyByQuery({ swggParamDict: {
                    _queryLimit: options.length,
                    _querySkip: options.start,
                    _querySort: options.order.length
                        ? '{"' + local.swgg.dt.datatableOptions.columns[
                            options.order[0].column
                        ].schemaPropertyName + '":' + (options.order[0].dir === 'asc'
                            ? 1
                            : -1) + '}'
                        : null
                } }, function (error, data) {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    local.swgg.dt.pageData = data.responseJSON;
                    callback({
                        recordsFiltered: local.swgg.dt.pageData.meta[
                            local.swgg.dt.paginationCountTotal
                        ],
                        recordsTotal: local.swgg.dt.pageData.meta[
                            local.swgg.dt.paginationCountTotal
                        ],
                        data: local.swgg.dt.pageData.data
                    });
                });
            };
            options.buttons = [local.swgg.dt.apiDict.crudCreateOne && {
                className: 'dtButtonRecordCreate',
                text: 'create new record',
                action: local.swgg.dtOnClickRecordEdit
            }, local.swgg.dt.apiDict.crudDeleteOneByKeyUnique && {
                className: 'dtButtonRecordDelete',
                text: 'delete selected records',
                action: function () {
                /*
                 * this function will delete the row
                 */
                    var crudDelete, onParallel;
                    crudDelete = local.swgg.dt.apiDict.crudDeleteOneByKeyUnique;
                    onParallel = local.utility2.onParallel(function (error) {
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        // reload datatable
                        local.swgg.dt.datatableInstance.ajax.reload(null, true);
                    });
                    // do nothing if no selected-rows
                    Array.prototype.slice.call(
                        document.querySelectorAll('#dtTable1 tbody tr.selected')
                    ).forEach(function (element) {
                        onParallel.counter += 1;
                        // delete row in parallel
                        crudDelete({
                            swggParamDict: local.swgg.keyUniqueInit({
                                data: local.swgg.dt.pageData.data[element.dataset.ii],
                                operationId: crudDelete._operationId
                            }).queryByKeyUnique
                        }, onParallel);
                    });
                }
            }, {
                extend: 'csvHtml5',
                fieldSeparator: '\t',
                text: 'export as csv'
            }, {
                extend: 'print',
                text: 'print'
            }]
                .filter(function (element) {
                    return element;
                });
            options.dom = 'Bpitr';
            options.lengthMenu = [20];
            options.order = [[1, 'asc']];
            options.pagingType = 'full_numbers';
            options.rowCallback = function (row, data, index) {
                // jslint-hack
                local.utility2.nop(data);
                // init pointer in row-element to real data
                row.dataset.ii = index;
            };
            options.scrollX = true;
            options.serverSide = true;
            return options;
        };
    }());
}());
