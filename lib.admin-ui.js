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
    }());



    // run shared js-env code - function
    (function () {
        local.swgg.dtFncFormInputCreate = function (options) {
        /*
         * this function will create and return a form-input from options
         */
            var html, htmlInput, htmlInputText, htmlInputTextarea, readOnly;
            options.uuid = local.utility2.uuidTimeCreate();
            readOnly = options.readOnly
                ? 'disabled'
                : '';
            html = '<div class="dtFormInputContainer form-group" data-options="' +
                // init data-options
                encodeURIComponent(JSON.stringify(options)) +
                // init id
                '" id="' + options.uuid + '">';
            html += '<label class="col-sm-2 control-label">' +
                // init title
                (options.name + '<br>(' + (options.format || options.type || 'object') + ')') +
                '</label>';
            html += '<div class="col-sm-10">';
            htmlInputText = '<input class="form-control" ' + readOnly + ' type="text">';
            htmlInputTextarea = '<textarea class="form-control" ' + readOnly +
                ' rows="4"></textarea>';
            switch (options.type) {
            // type - array
            case 'array':
                htmlInput = htmlInputTextarea;
                break;
            // type - boolean
            case 'boolean':
                htmlInput = ['true', 'false', 'null'].map(function (key) {
                    return '<label class="radio-inline">' +
                        '<input name="' + options.uuid + '" ' + readOnly + ' type="radio">' +
                        key + '</label>';
                }).join('');
                break;
            // type - string
            case 'string':
                switch (options.format) {
                // format - date-time
                case 'date':
                case 'date-time':
                    htmlInput = '<div class="date dtFormInputDatetime input-group">' +
                            '<input class="form-control" ' + readOnly + ' type="text">' +
                            '<span class="input-group-addon">' +
                                '<span class="glyphicon glyphicon-calendar"></span>' +
                            '</span>' +
                        '</div>';
                    break;
                case 'byte':
                case 'json':
                    htmlInput = htmlInputTextarea;
                    break;
                default:
                    htmlInput = htmlInputText;
                }
                break;
            // type - default
            default:
                htmlInput = htmlInputText;
            }
            // dropdown - enum
            if (options.enum) {
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
            }
            html += htmlInput;
            html += '</div>';
            html += '</div>';
            return html;
        };

        local.swgg.dtFncFormInputDataRead = function (elementContainer) {
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
            options.dataRead = options.type === 'string'
                ? data || options.default || null
                : local.swgg.isNullOrUndefined(data) || data === '' || data === 'undefined'
                ? options.default
                : JSON.parse(data);
            return options;
        };

        local.swgg.dtFncFormInputDataWrite = function (elementContainer, options) {
        /*
         * this function will write options.dataWrite to the given elementContainer
         */
            var data, elementInput;
            options = options || elementContainer.dataset.options;
            if (typeof options === 'string') {
                options = JSON.parse(decodeURIComponent(options));
            }
            data = local.swgg.isNullOrUndefined(options.dataWrite)
                ? options.default || null
                : options.dataWrite;
            // dropdown - enum
            if (elementContainer && options.enum) {
                elementContainer.dataset.json = local.swgg.isNullOrUndefined(data)
                    ? ''
                    : encodeURIComponent(JSON.stringify(data));
                elementContainer.querySelector('span').textContent = String(data);
                elementContainer = null;
            }
            data = local.swgg.isNullOrUndefined(data)
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
                    // workaround bug - need to wait for bootstrap-datetimepicker to init
                    setTimeout(function () {
                        elementInput[0].value = options.dataRead;
                    });
                }
            }
        };

        local.swgg.dtFncDatatableInit = function (self) {
        /*
         * this function will init the datatable-ui
         */
            var options;
            // save self
            local.swgg.dtOptions = self;
            // reset swaggerJson
            local.swgg.swaggerJson = null;
            local.swgg.apiUpdate(local.swgg.dtSwaggerJson);
            // init crud-api
            Object.keys(self.crudDict).forEach(function (operationId) {
                options = local.swgg[operationId.split('.')[0]] = (local.swgg.api[self.tagName][
                    self.crudDict[operationId].replace((/\W/g), '_')
                ] || local.utility2.nop).bind(null);
                options.operationId = operationId;
            });
            // init self
            local.swgg.dtSchema = local.utility2.jsonCopy(
                local.swgg.swaggerJson.definitions[self.schemaName]
            );
            // init dtDatatableOptions
            local.swgg.dtDatatableOptions = local.utility2.objectSetDefault(
                local.utility2.jsonCopy(self),
                local.swgg.dtFncOptionsDefaultCreate()
            );
            // init dtDatatableOptions.column
            local.swgg.dtDatatableOptions.columns = [{
                orderable: false,
                render:  function (data, type, row, meta) {
                /*
                 * this function will render the edit-cell
                 */
                    // jslint-hack
                    local.utility2.nop(data, type, row);
                    options = local.swgg.dtDatatableInstance.page.info();
                    options.ii = options.page * options.length + meta.row + 1;
                    return '<button class="btn btn-xs dtButtonRecordEdit">edit row ' +
                        options.ii + '</button>';
                },
                title: ''
            }].concat(Object.keys(local.swgg.dtSchema.properties)
                .sort(function (aa, bb) {
                    return aa === 'id'
                        ? -1
                        : bb === 'id'
                        ? 1
                        : aa < bb
                        ? -1
                        : aa > bb
                        ? 1
                        : 0;
                })
                .map(function (key) {
                    var property;
                    property = local.swgg.dtSchema.properties[key];
                    return {
                        data: key.replace((/\./g), '\\.'),
                        render: function (data, type, row, meta) {
                        /*
                         * this function will render the data-cell
                         */
                            // jslint-hack
                            local.utility2.nop(type, row);
                            options = local.utility2.jsonCopy(local.swgg.dtSchema.properties[
                                local.swgg.dtDatatableOptions.columns[
                                    meta.col
                                ].schemaPropertyName
                            ]);
                            options.dataWrite = data;
                            local.swgg.dtFncFormInputDataWrite(null, options);
                            return local.utility2.stringHtmlSafe(options.dataRead);
                        },
                        title: local.utility2.stringHtmlSafe(key) + '<br>(' +
                            local.utility2.stringHtmlSafe(property.format ||
                                property.type ||
                                'object') + ')',
                        schemaPropertyName: key
                    };
                }));
            // init datatable
            document.getElementById('dtTableContainer1').innerHTML = self.html ||
                '<table class="display table table-responsive" ' +
                'id="dtTable1" width="100%"><tfoot><tr>' +
                local.swgg.dtDatatableOptions.columns.map(function (element) {
                    return '<th>' + element.title + '</th>';
                }).join('') + '</tr></tfoot></table>';
            local.swgg.dtDatatableInstance =
                local.jQuery('#dtTable1').DataTable(local.swgg.dtDatatableOptions);
            // init form-record-edit
            document.getElementById(
                'dtFormRecordEdit1'
            ).innerHTML = Object.keys(local.swgg.dtSchema.properties)
                .sort(function (aa, bb) {
                    return aa === 'id'
                        ? -1
                        : bb === 'id'
                        ? 1
                        : aa < bb
                        ? -1
                        : aa > bb
                        ? 1
                        : 0;
                })
                .map(function (key) {
                    options = local.utility2.jsonCopy(local.swgg.dtSchema.properties[key]);
                    options.name = key;
                    return local.swgg.dtFncFormInputCreate(options);
                })
                .join('');
            // init form-table-query
            document.getElementById('dtFormTableQuery1').innerHTML = JSON.parse(
                local.swgg.cacheDict.pathObject[local.swgg.dtOptions.tagName + ' ' +
                    local.swgg.dtOptions.crudDict.crudGetManyByQuery]
            ).parameters
                .filter(function (element) {
                    return element.name[0] !== '_';
                })
                .sort(function (aa, bb) {
                    return aa.name < bb.name
                        ? -1
                        : aa.name > bb.name
                        ? 1
                        : 0;
                })
                .map(local.swgg.dtFncFormInputCreate)
                .join('');
            // init .dtFormInputDatetime
            local.jQuery('.dtFormInputDatetime').datetimepicker({
                format: 'YYYY-MM-DD HH:mm:ss'
            });
            // update .dtFormInputContainer
            Array.prototype.slice.call(
                document.getElementsByClassName('dtFormInputContainer')
            ).forEach(function (elementContainer) {
                local.swgg.dtFncFormInputDataWrite(elementContainer);
            });
        };

        local.swgg.dtFncOnClickRecordEdit = function (event) {
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
                    rowData = local.swgg.dtPageData.data[this.closest('tr').dataset.ii];
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
                local.swgg.dtFncFormInputDataWrite(elementContainer, options);
            });
            // change to view-row-edit
            local.jQuery('#dtNavRecordEdit1').tab('show');
        };

        local.swgg.dtFncOnClickRecordSave = function () {
        /*
         * this function will handle the click-event to save the record
         */
            var data, options;
            data = {};
            Array.prototype.slice.call(
                document.getElementsByClassName('dtFormInputContainer')
            ).forEach(function (element) {
                options = local.swgg.dtFncFormInputDataRead(element);
                data[options.name] = options.dataRead;
            });
            (document.getElementById('dtButtonRecordSave1').dataset.saveType === 'edit'
                ? local.swgg.crudUpdateOneByKeyUnique
                : local.swgg.crudCreateOne)({ body: JSON.stringify(data), id: data.id }, {
                modeErrorData: true
            }, function (error) {
                // validate no error occurred
                local.utility2.assert(!error, error);
                local.jQuery('#dtNavTable1').tab('show');
                local.swgg.dtDatatableInstance.ajax.reload(function () {
                    setTimeout(local.swgg.dtDatatableInstance.draw, 100);
                }, true);
            });
        };

        local.swgg.dtFncListInit = function () {
        /*
         * this function will init the admin-ui from local.swgg.dtList
         */
            // init dom tab-view-list of tables
            document.getElementById('dtListContainer1').innerHTML =
                local.swgg.dtList.map(function (options, ii) {
                    return '<li class="' + (ii
                        ? ''
                        : 'active') + '" data-ii="' + ii +
                        '"><a data-toggle="tab" href="#dtViewTable1">' +
                        options.title + '</a></li>\n';
                }).join('');
            // init click event-handling for selecting different tables
            local.jQuery('#dtListContainer1').on('click', 'li', function () {
                var options;
                // show table-view
                local.jQuery('#dtNavTable1').tab('show');
                options = local.swgg.dtList[this.dataset.ii];
                local.utility2.ajax({
                    modeJsonParseResponseText: true,
                    url: options.urlSwaggerJson
                }, function (error, xhr) {
                    local.utility2.testTryCatch(function () {
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        local.swgg.dtSwaggerJson = xhr.responseJson;
                        // init the datatable-ui
                        local.swgg.dtFncDatatableInit(options);
                    }, local.utility2.onErrorDefault);
                });
            });
            local.jQuery('#dtTableContainer1')
                // init click event-handling to edit table-row
                .on('click', '.dtButtonRecordEdit', local.swgg.dtFncOnClickRecordEdit)
                // init click event-handling to toggle-select table-row
                .on('click', 'tr', function () {
                    local.jQuery(this).toggleClass('selected');
                });
            // http://stackoverflow.com/questions/13437446
            // /how-to-display-selected-item-in-bootstrap-button-dropdown-title
            // init click event-handling - select element in dropdown
            local.jQuery('.dtFormContainer').on('click', '.dropdown-menu a', function (event) {
                event.preventDefault();
                this.closest('.dtFormInputContainer').dataset.json = this.dataset.json;
                this.closest('div').querySelector('span').textContent = this.textContent;
            });
            // init uncaught-error alerts
            ['assert', 'onErrorDefault'].forEach(function (key) {
                // save old function
                local.utility2['_' + key] = local.utility2['_' + key] ||
                    local.utility2[key];
                // override old function
                local.utility2[key] = function (error, data) {
                    switch (key) {
                    case 'assert':
                        error = !error && data;
                        break;
                    }
                    if (error) {
                        // create alert
                        document.getElementById('dtAlertContainer1').innerHTML +=
                            '<div class="alert alert-danger fade in margin-0">' +
                            error.message +
                            '<button type="button" class="close" data-dismiss="alert">' +
                            '<span>&times;</span>' +
                            '</button>' +
                            '</div>';
                        // scroll to page-top to view alert
                        local.jQuery('html, body').animate({ scrollTop: 0 }, 'medium');
                    }
                    local.utility2['_' + key].apply(null, arguments);
                };
            });
            // init first datatable
            local.jQuery('#dtListContainer1').find('li').first().click();
        };

        local.swgg.dtFncOptionsDefaultCreate = function () {
        /*
         * this function will return default-options for creating a datatable-instance
         */
            var options;
            options = {};
            options.ajax = function (options, callback) {
            /*
             * this function will send an ajax request for page-data
             */
                options.data = {
                    _queryLimit: options.length,
                    _querySkip: options.start,
                    _querySort: options.order.length
                        ? '{"' +
                            local.swgg.dtDatatableOptions.columns[options.order[0].column].title
                            .split('<br>')[0] + '":' + (options.order[0].dir === 'asc'
                            ? 1
                            : -1) + '}'
                        : null
                };
                local.swgg.crudGetManyByQuery(options.data, {
                    modeErrorData: true
                }, function (error, data) {
                    // validate no error occured
                    local.utility2.assert(!error, error);
                    local.swgg.dtPageData = data.obj;
                    callback({
                        recordsFiltered: local.swgg.dtPageData.meta[
                            local.swgg.dtOptions.paginationCountTotal
                        ],
                        recordsTotal: local.swgg.dtPageData.meta[
                            local.swgg.dtOptions.paginationCountTotal
                        ],
                        data: local.swgg.dtPageData.data
                    });
                });
            };
            options.buttons = [{
                className: 'dtButtonRecordEdit',
                text: 'create new record',
                action: local.swgg.dtFncOnClickRecordEdit
            }, {
                className: 'dtButtonRecordCreate',
                text: 'delete selected records',
                action: function () {
                /*
                 * this function will delete the row
                 */
                    var onParallel;
                    onParallel = local.utility2.onParallel(function (error) {
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        // reload datatable
                        local.swgg.dtDatatableInstance.ajax.reload(null, true);
                    });
                    // do nothing if no selected-rows
                    Array.prototype.slice.call(
                        document.querySelectorAll('#dtTable1 tbody tr.selected')
                    ).forEach(function (element) {
                        onParallel.counter += 1;
                        // delete row in parallel
                        local.swgg.crudDeleteOneByKeyUnique(local.swgg.keyUniqueInit({
                            data: local.swgg.dtPageData.data[element.dataset.ii],
                            operationId: local.swgg.crudDeleteOneByKeyUnique.operationId
                        }).queryByKeyUnique, {
                            modeErrorData: true
                        }, onParallel);
                    });
                }
            }, {
                extend: 'excelHtml5',
                text: 'export as excel'
            }, {
                extend: 'csvHtml5',
                extension: '.tsv',
                fieldSeparator: '\t',
                text: 'export as tsv'
            }, {
                extend: 'print',
                text: 'print'
            }];
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
    switch (local.modeJs) {



    // run node js-env code - post-init
    case 'node':
        // init dtListPetstore
        local.swgg.dtListPetstore = [{
            crudDict: {
                crudCreateOne: 'addPet',
                'crudDeleteOneByKeyUnique.petId.id': 'deletePet',
                crudGetManyByQuery: 'crudGetManyByQuery',
                'crudUpdateOneByKeyUnique.id': 'updatePet'
            },
            paginationCountTotal: 'paginationCountTotal',
            schemaName: 'Pet',
            tagName: 'pet',
            title: 'pet api',
            urlSwaggerJson: 'api/v0/swagger.json'
        }, {
            crudDict: {
                crudCreateOne: 'placeOrder',
                'crudDeleteOneByKeyUnique.orderId.id': 'deleteOrder',
                crudGetManyByQuery: 'crudGetManyByQuery',
                'crudUpdateOneByKeyUnique.id': 'crudCreateOrUpdateOneByKeyUnique.id'
            },
            paginationCountTotal: 'paginationCountTotal',
            schemaName: 'Order',
            tagName: 'store',
            title: 'store api',
            urlSwaggerJson: 'api/v0/swagger.json'
        }, {
            crudDict: {
                crudCreateOne: 'createUser',
                'crudDeleteOneByKeyUnique.username': 'deleteUser',
                crudGetManyByQuery: 'crudGetManyByQuery',
                'crudUpdateOneByKeyUnique.username': 'updateUser'
            },
            paginationCountTotal: 'paginationCountTotal',
            schemaName: 'User',
            tagName: 'user',
            title: 'user api',
            urlSwaggerJson: 'api/v0/swagger.json'
        }];
        // init dtList
        local.swgg.dtList = local.utility2.jsonCopy(local.swgg.dtListPetstore);
        break;
    }
}());
