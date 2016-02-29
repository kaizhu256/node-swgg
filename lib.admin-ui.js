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



    // run browser js-env code - pre-init
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
            var dataOptions, html, readOnly, title;
            readOnly = options.readOnly
                ? 'readonly'
                : '';
            title = options.name + '<br>(' + (options.format || options.type || 'object') + ')';
            dataOptions = 'data-options="' + encodeURIComponent(JSON.stringify(options)) + '"';
            html = '';
            html += '<div class="form-group">';
            html += '<label class="col-sm-2 control-label">' + title + '</label>';
            html += '<div class="col-sm-10">';
            html += '<input class="form-control swggDatatableFormInput" ' + dataOptions + ' ' +
                readOnly + ' type="text">';
            html += '</div>';
            html += '</div>';
            return html;
        };

        local.swgg.dtFncFormInputDataRead = function (options) {
        /*
         * this function will render the data with the given options
         */
            return options.type === 'string'
                ? options.inputValue || options.default
                : options.inputValue === ''
                ? options.default
                : JSON.parse(options.inputValue);
        };

        local.swgg.dtFncFormInputDataWrite = function (options) {
        /*
         * this function will render the data with the given options
         */
            var data;
            data = options.data === undefined
                ? options.default
                : options.data;
            return data === undefined
                ? ''
                : typeof data === 'string' && options.type === 'string'
                ? data
                : JSON.stringify(data);
        };

        local.swgg.dtFncInit = function (self) {
        /*
         * this function will init the ui-dom datatable-list
         */
            // save self
            local.swgg.dtOptions = self;
            // reset swaggerJson
            local.swgg.swaggerJson = local.swgg.swaggerJson$$Dummy = null;
            local.swgg.apiUpdate(local.swgg.dtSwaggerJson);
            // init crud-api
            Object.keys(self.crudDict).forEach(function (key) {
                local.swgg[key] =
                    local.swgg.api[self.tagName][self.crudDict[key].replace((/\W/g), '_')];
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
                    var options;
                    // jslint-hack
                    local.utility2.nop(data, type, row);
                    options = local.swgg.dtDatatableInstance.page.info();
                    options.ii = options.page * options.length + meta.row + 1;
                    return '<button class="btn btn-xs swggButtonRowEdit">edit row ' +
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
                            var options;
                            options = local.utility2.jsonCopy(local.swgg.dtSchema.properties[
                                local.swgg.dtDatatableOptions.columns[
                                    meta.col
                                ].schemaPropertyName
                            ]);
                            options.data = data;
                            // jslint-hack
                            local.utility2.nop(type, row);
                            return local.utility2.stringHtmlSafe(
                                local.swgg.dtFncFormInputDataWrite(options)
                            );
                        },
                        title: local.utility2.stringHtmlSafe(key) + '<br>(' +
                            local.utility2.stringHtmlSafe(property.format ||
                                property.type ||
                                'object') + ')',
                        schemaPropertyName: key
                    };
                }));
            // init datatable
            document.getElementById('swggDatatableContainer1').innerHTML = self.html ||
                '<table class="display table table-responsive" ' +
                'id="swggDatatable1" width="100%"><tfoot><tr>' +
                local.swgg.dtDatatableOptions.columns.map(function (element) {
                    return '<th>' + element.title + '</th>';
                }).join('') + '</tr></tfoot></table>';
            local.swgg.dtDatatableInstance =
                local.jQuery('#swggDatatable1').DataTable(local.swgg.dtDatatableOptions);
            // init event-handling
            if (!local.swgg.dtInitialized) {
                local.swgg.dtInitialized = true;
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
                            document.getElementById('swggDatatableAlertContainer1').innerHTML +=
                                '<div class="alert alert-danger fade in margin-0">' +
                                error.message +
                                '<button type="button" class="close" data-dismiss="alert">' +
                                '<span>&times;</span>' +
                                '</button>' +
                                '</div>';
                            // scroll to page-top to view alert
                            local.jQuery('html, body').animate({ scrollTop: 0 }, 'fast');
                        }
                        local.utility2['_' + key].apply(null, arguments);
                    };
                });
            }
        };

        local.swgg.dtFncOnClickRecordEdit = function (event) {
        /*
         * this function will handle the click-event to edit the record
         */
            var rowData;
            rowData = {};
            if (event) {
                event.preventDefault();
                event.stopPropagation();
                if ((/\bswggButtonRowEdit\b/).test(event.currentTarget.className)) {
                    // init rowData
                    rowData = local.swgg.dtPageData.data[
                        local.jQuery(event.currentTarget).parents('tr')[0].dataset.ii
                    ];
                }
            }
            // init row-edit-form
            document.getElementById(
                'swggDatatableFormRowCreateOrUpdate1'
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
                    var options;
                    options = local.utility2.jsonCopy(local.swgg.dtSchema.properties[key]);
                    options.data = rowData[key];
                    options.name = key;
                    if (key === 'id' && options.data !== undefined) {
                        options.readOnly = true;
                    }
                    return local.swgg.dtFncFormInputCreate(options);
                })
                .join('');
            Array.prototype.slice.call(document.querySelectorAll(
                '#swggDatatableFormRowCreateOrUpdate1 .swggDatatableFormInput'
            )).forEach(function (element) {
                element.value = local.swgg.dtFncFormInputDataWrite(
                    JSON.parse(decodeURIComponent(element.dataset.options))
                );
            });
            // change to row-edit-view
            local.jQuery('#swggDatatableNavRowCreateOrUpdate1').tab('show');
        };

        local.swgg.dtFncOnClickRecordSave = function () {
        /*
         * this function will handle the click-event to save the record
         */
            var data, options;
            data = {};
            Array.prototype.slice.call(
                document.querySelectorAll('.swggDatatableFormInput')
            ).forEach(function (element) {
                options = JSON.parse(decodeURIComponent(element.dataset.options));
                options.inputValue = element.value;
                data[options.name] = local.swgg.dtFncFormInputDataRead(options);
            });
            local.swgg.crudUpdateOneById({ body: JSON.stringify(data), id: data.id }, {
                modeErrorData: true
            }, function (error) {
                // validate no error occurred
                local.utility2.assert(!error, error);
                local.jQuery('#swggDatatableNavTable1').tab('show');
                local.swgg.dtDatatableInstance.ajax.reload(function () {
                    setTimeout(local.swgg.dtDatatableInstance.draw, 100);
                }, true);
            });
        };

        local.swgg.dtFncListInit = function (optionsList) {
        /*
         * this function will init the ui-dom datatable-list
         */
            // save optionsList
            local.swgg.dtList = optionsList || [{
                crudDict: {
                    crudCreateOne: 'crudCreateOrReplaceOne',
                    crudDeleteOneById: 'crudDeleteOneByKeyUnique.id',
                    crudGetManyByQuery: 'crudGetManyByQuery',
                    crudUpdateOneById: 'crudCreateOrUpdateOneByKeyUnique.id'
                },
                paginationCountTotal: 'paginationCountTotal',
                schemaName: 'Pet',
                tagName: 'pet',
                urlSwaggerJson: 'api/v0/swagger.json'
            }, {
                crudDict: {
                    crudCreateOne: 'crudCreateOrReplaceOne',
                    crudDeleteOneById: 'crudDeleteOneByKeyUnique.id',
                    crudGetManyByQuery: 'crudGetManyByQuery',
                    crudUpdateOneById: 'crudCreateOrUpdateOneByKeyUnique.id'
                },
                paginationCountTotal: 'paginationCountTotal',
                schemaName: 'Order',
                tagName: 'store',
                urlSwaggerJson: 'api/v0/swagger.json'
            }, {
                crudDict: {
                    crudCreateOne: 'crudCreateOrReplaceOne',
                    crudDeleteOneById: 'crudDeleteOneByKeyUnique.id',
                    crudGetManyByQuery: 'crudGetManyByQuery',
                    crudUpdateOneById: 'crudCreateOrUpdateOneByKeyUnique.id'
                },
                paginationCountTotal: 'paginationCountTotal',
                schemaName: 'User',
                tagName: 'user',
                urlSwaggerJson: 'api/v0/swagger.json'
            }];
            document.getElementById('swggDatatableListContainer1').innerHTML =
                local.swgg.dtList.map(function (options, ii) {
                    return '<li class="' + (ii
                        ? ''
                        : 'active') + '" data-ii="' + ii +
                        '"><a data-toggle="tab" href="#swggDatatableViewTable1">' +
                        options.tagName + ' api</a></li>\n';
                }).join('');
            // init event-handling
            if (!local.swgg.dtListInitialized) {
                local.swgg.dtListInitialized = true;
                local.jQuery('#swggDatatableListContainer1').on('click', 'li', function () {
                    var options;
                    // show table-view
                    local.jQuery('#swggDatatableNavTable1').tab('show');
                    options = local.swgg.dtList[this.dataset.ii];
                    local.utility2.ajax({
                        modeJsonParseResponseText: true,
                        url: options.urlSwaggerJson
                    }, function (error, xhr) {
                        local.utility2.testTryCatch(function () {
                            // validate no error occurred
                            local.utility2.assert(!error, error);
                            local.swgg.dtSwaggerJson = xhr.responseJson;
                            // init the ui-dom datatable
                            local.swgg.dtFncInit(options);
                        }, local.utility2.onErrorDefault);
                    });
                });
            }
            // init datatable
            local.jQuery('#swggDatatableListContainer1').find('li').first().click();
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
                        : undefined
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
                text: 'create new record',
                action: local.swgg.dtFncOnClickRecordEdit
            }, {
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
                        document.querySelectorAll('#swggDatatable1 tbody tr.selected')
                    ).forEach(function (element) {
                        onParallel.counter += 1;
                        // delete row in parallel
                        local.swgg.crudDeleteOneById({
                            id: local.swgg.dtPageData.data[element.dataset.ii].id
                        }, {
                            modeErrorData: true
                        }, onParallel);
                    });
                }
            }, {
                extend: 'excelHtml5',
                text: 'export as excel'
            }, {
                extend: 'csvHtml5',
                fieldSeparator: '\t',
                extension: '.tsv',
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
}());
