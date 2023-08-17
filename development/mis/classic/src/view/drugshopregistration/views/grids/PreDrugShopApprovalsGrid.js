/**
 * Created by Kip on 11/2/2018.
 */
Ext.define('Admin.view.drugshopregistration.views.grids.PreDrugShopApprovalsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'predrugshopapprovalsgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var recommendation_id = record.get('recommendation_id');
            if (recommendation_id > 0) {
                return 'valid-row';
            }else{
                return 'invalid-row';
            }
        },
        listeners: {
            refresh: function () {
                var gridView = this,
                    grid = gridView.grid;
                grid.fireEvent('moveRowTop', gridView);
            }
        }
    },
    selModel: {
        selType: 'checkboxmodel'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items: [
                {
                    xtype: 'pagingtoolbar',
                    displayInfo: true,
                    displayMsg: 'Showing {0} - {1} of {2} total records',
                    emptyMsg: 'No Records',
                    table_name: 'tra_premises_applications',
                    beforeLoad: function () {
                        this.up('grid').fireEvent('refresh', this);
                    }
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Submit Application(s)',
                    iconCls: 'x-fa fa-check',
                    ui: 'soft-purple',
                    name: 'submit_selected',
                    disabled: true,
                    storeID: 'foodpremiseregistrationstr',
                    table_name: 'tra_premises_applications',
                    action: 'process_submission_btn',
                    winWidth: '50%'
                }
            ]
        }
    ],
    features: [{
        ftype: 'searching',
        mode: 'local',
        minChars: 2
    }],
    margin: 3,
    tbar: [{
        xtype: 'tbspacer',
        width: 5
     },
    //   {
    //     xtype: 'combo',
    //     emptyText: 'COUNTRY',
    //     flex: 1,
    //     //labelWidth: 80,
    //     width: 160,
    //     valueField: 'id',
    //     displayField: 'name',
    //     forceSelection: true,
    //     name: 'country_id',
    //     queryMode: 'local', 
    //     fieldStyle: {
    //         'color': 'green',
    //         'font-weight': 'bold'
    //     },
    //      listeners: {
    //          beforerender: {
    //             fn: 'setParamCombosStore',
    //             config: {
    //                 pageSize: 10000,
    //                 proxy: {
    //                     url: 'parameters/country'
    //                 }
    //             },
    //             isLoad: true
    //          },
    //         change: function (cmbo, newVal) {
    //         var grid = cmbo.up('grid'),
    //         regionStore = grid.down('combo[name=region_id]').getStore(),
    //         filterObj = {country_id: newVal},
    //         filterStr = JSON.stringify(filterObj);
    //         regionStore.removeAll();
    //       regionStore.load({params: {filter: filterStr}});
    //         }
    //     },
    //     triggers: {
    //         clear: {
    //             type: 'clear',
    //             hideWhenEmpty: true,
    //             hideWhenMouseOut: false,
    //             clearOnEscape: true
    //         }
    //     }
    // }, 
    {
        xtype: 'combo',
        emptyText: 'REGION',
        flex: 1,
        //labelWidth: 80,
        width: 190,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'region_id',
        queryMode: 'local',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
                    beforerender: {
                        fn: 'setParamCombosStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'parameters/region'
                            }
                        },
                        isLoad: false
            },afterrender: function (cmbo) {
                 var grid = cmbo.up('grid'),
                 store = cmbo.getStore(),
                 filterObj = {country_id: 37},
                 filterStr = JSON.stringify(filterObj);
                 store.removeAll();
                 store.load({params: {filter: filterStr}});
              },
            change: function (cmbo, newVal) {
                var grid = cmbo.up('grid'),
                districtStore = grid.down('combo[name=district_id]').getStore(),
                filterObj = {region_id: newVal},
                filterStr = JSON.stringify(filterObj);
                districtStore.removeAll();
                districtStore.load({params: {filter: filterStr}});
                grid.getStore().load();
            }
        },
        triggers: {
            clear: {
                type: 'clear',
                hideWhenEmpty: true,
                hideWhenMouseOut: false,
                clearOnEscape: true
            }
        }
    },
    {
        xtype: 'combo',
        emptyText: 'DISTRICT',
        flex: 1,
        //labelWidth: 80,
        width: 190,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'district_id',
        queryMode: 'local',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
                    beforerender: {
                        fn: 'setParamCombosStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'parameters/district'
                            }
                        },
                         isLoad: false
            },
            change: function (cmbo, newVal) {
                var grid = cmbo.up('grid');
                grid.getStore().load();
            }
        },
        triggers: {
            clear: {
                type: 'clear',
                hideWhenEmpty: true,
                hideWhenMouseOut: false,
                clearOnEscape: true
            }
        }
    },{
        xtype: 'combo',
        emptyText: 'ZONE',
        flex: 1,
        width: 190,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'zone_id',
        queryMode: 'local',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
                    beforerender: {
                        fn: 'setParamCombosStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_zones'
                            }
                        }
                        },
                        isLoad: true
            },
            change: function (cmbo, newVal) {
                var grid = cmbo.up('grid');
                grid.getStore().load();
            }
        },
        triggers: {
            clear: {
                type: 'clear',
                hideWhenEmpty: true,
                hideWhenMouseOut: false,
                clearOnEscape: true
            }
        }
    }, {
        xtype: 'button',
        text: 'Filter',
        ui: 'soft-green',
        iconCls: 'x-fa fa-search',
        handler: function(btn) {
          var grid = btn.up('grid');
              grid.getStore().load();
        },
    },{
        xtype: 'button',
        text: 'Clear',
        ui: 'soft-red',
        iconCls: 'x-fa fa-times',
        handler: function(btn) {
          var grid = btn.up('grid'),
                gridStr = grid.getStore();
                grid.down('combo[name=region_id]').clearValue();
                grid.down('combo[name=district_id]').clearValue();
                grid.down('combo[name=zone_id]').clearValue();
                gridStr.load();
        },
    }],
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'approvalsstr',
                proxy: {
                    url: 'premiseregistration/getDrugShopApplicationsAtApproval'
                }
            },
            isLoad: true
        },
        select: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                grid.down('button[name=submit_selected]').setDisabled(false);
            }
        },
        beforeselect: function (sel, record, index, eOpts) {
            var recommendation_id = record.get('recommendation_id');
            if (recommendation_id > 0) {
                return true;
            }else{
                return false;
            }
        },
        deselect: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[name=submit_selected]').setDisabled(true);
            }
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking No',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Application No',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'premise_name',
        text: 'Premise Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'region_name',
        text: 'Region/Province Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'district_name',
        text: 'District Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'zone_name',
        text: 'Processing Zone',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'physical_address',
        text: 'Physical Address',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'date_received',
        hidden: true,
        text: 'Date Received',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'recommendation',
        text: 'Recommendation',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Status',
        flex: 1
    }, {
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 90,
        widget: {
            width: 75,
            textAlign: 'left',
            xtype: 'splitbutton',
            iconCls: 'x-fa fa-th-list',
            ui: 'gray',
            menu: {
                xtype: 'menu',
                items: [
                    {
                        text: 'Recommendation',
                        iconCls: 'x-fa fa-chevron-circle-up',
                        handler: 'getApplicationApprovalDetails',
                        stores: '["approvaldecisionsstr"]',
                        table_name: 'tra_premises_applications'
                    },  {
                        text: 'Inspection Report',
                        iconCls: 'x-fa fa-exchange',
                        menu: {
                            xtype: 'menu',
                            items: [
                                
                                {
                                    text: 'Inspection Report',
                                    iconCls: 'x-fa fa-bars',
                                    childXtype: 'drugshopinspectiondetailstabpnl',
                                    winTitle: 'Inspection Report',
                                    winWidth: '60%',
                                    name: 'inspection_details',
                                    stores: '[]',
                                    report_type_id:1,
                                    handler: 'showInspectionDetails'
                                },
                                {
                                    text: 'Inspection Report(RID)',
                                    iconCls: 'x-fa fa-bars',
                                    childXtype: 'drugshopinspectiondetailstabpnl',
                                    winTitle: 'Inspection Report(Regional Inspector)',
                                    winWidth: '60%',
                                    name: 'inspection_details',
                                    stores: '[]',
                                    report_type_id:2,
                                    handler: 'showInspectionDetails'
                                },
                                {
                                    text: 'Inspection Report(Chief Regional Inspector)',
                                    iconCls: 'x-fa fa-bars',
                                    childXtype: 'drugshopinspectiondetailstabpnl',
                                    winTitle: 'Inspection Report(Lead Inspector)',
                                    winWidth: '60%',
                                    name: 'inspection_details',
                                    stores: '[]',
                                    report_type_id:3,
                                    handler: 'showInspectionDetails'
                                },{
                                    text: 'Print Final Inspection Report',
                                    iconCls: 'x-fa fa-print',
                                    name:'btn_print_inspection_report',
                                    handler: 'doPrintInspectionReport'
                                }
                            ]
                        }
                    }, 
                    
                    {
                        text: 'Preview DrugShop Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 1,
                        handler: 'showPreDrugShopApplicationMoreDetails'
                    },
                    {
                        text: 'Print',
                        iconCls: 'x-fa fa-print',
                        name: 'prints',
                        menu: {
                            xtype: 'menu',
                            items: [
                                {
                                    text: 'Premise Certificate',
                                    iconCls: 'x-fa fa-certificate',
                                    backend_function: 'printPremiseRegistrationCertificate',
                                    handler: 'printPremiseCertificate'
                                }, {
                                    text: 'Premise Permit',
                                    iconCls: 'x-fa fa-certificate',
                                    backend_function: 'printPremiseBusinessPermit',
                                    handler: 'printPremisePermit'
                                }
                            ]
                        }
                    },
                    {
                        text: 'Application Details',
                        iconCls: 'x-fa fa-bars',
                        handler: 'onViewApprovalApplicationDetails',
                        interfaceXtype: 'newsinglepremiseapproval',
                        hidden: true
                    },
                    {
                        text: 'Dismiss/Cancel Application',
                        iconCls: 'x-fa fa-thumbs-down',
                        hidden: true,
                        handler: 'showApplicationDismissalForm'
                    }
                ]
            }
        },onWidgetAttach: function (col, widget, rec) {
            var decision_id = rec.get('decision_id');
            if (decision_id === 1 || decision_id == 1) {//Granted
                widget.down('menu menuitem[name=prints]').setVisible(true);
            }else{
                widget.down('menu menuitem[name=prints]').setVisible(false);
            }
        }
    }]
});