
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.ImportExportNonLicenceDirectorApprovalGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'importexportnonlicencedirectorapprovalgrid',
    listeners: {
        
    },
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'importexportpermitmanagersubstr',
                proxy: {
                    url: 'importexportpermits/getImportExportNonLicencedManagerReviewApplications'
                }
            },
            isLoad: false
        },
        
        select: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                grid.down('button[name=submit_selected]').setDisabled(false);
            }
        },
        deselect: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[name=submit_selected]').setDisabled(true);
            }
        }
    }, selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer'
    },'->',{
        xtype: 'combo',
        fieldLabel: 'Zones',
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',
        hidden: true,
        labelAlign : 'top',
        displayField: 'name',
        name: 'zone_id',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
             beforerender: {
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 100,
                    proxy: {
                    url: 'configurations/getConfigParamFromTable',
                    extraParams: {
                        table_name: 'par_zones'
                    }
                   }
                },
                isLoad: true
            },
           beforequery: function() {
                var store=this.getStore();
                
                var all={name: 'All',id:0};
                  store.insert(0, all);
                },
            afterrender: function(combo) {
                        combo.select(combo.getStore().getAt(0));	
                    }
        }
    }],
    
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking No',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'id',
        text: 'Application ID',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'date_added',
        text: 'Date of Application',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Import Permit Number',
        flex: 1
    },{
        xtype: 'gridcolumn',
        text: 'Business Name',
        dataIndex: 'name',
        flex: 1,
        tdCls: 'wrap'
        
    },{
        xtype: 'gridcolumn',
        text: 'Business Type',
        dataIndex: 'business_type',
        flex: 1,
        tdCls: 'wrap'
        
    },{
        xtype: 'gridcolumn',
        text: 'Company Number',
        dataIndex: 'company_registration_no',
        flex: 1,
        tdCls: 'wrap'
        
    },{
        xtype: 'gridcolumn',
        text: 'Business Physical Address',
        dataIndex: 'physical_address',
        flex: 1,
        tdCls: 'wrap'
        
    },{
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant Name',
        flex: 1
    }, 
    {
        xtype: 'gridcolumn',
        text: 'Type of Licence', 
        dataIndex: 'has_registered_premises',
        renderer: function (value, metaData) {
            if (value == 1) {
                metaData.tdStyle = 'color:white;background-color:green';
                return "NDA Licensed";
            }

            metaData.tdStyle = 'color:white;background-color:red';
            return "NDA Non-Licensed";
        }

    }, {
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Status',
        flex: 1
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'premises_validation_recommendation',
        text: 'Validation Recommendation',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'products_validation_recommendation',
        hidden: true,
        text: 'Products Validation Recommendation',
        flex: 1
    },
    {
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 90,
        widget: {
            width: 75,
            textAlign: 'left',
            xtype: 'splitbutton',
            iconCls: 'x-fa fa-th-list',
            iconCls: 'x-fa fa-th-list',
            ui: 'gray',
            menu: {
                xtype: 'menu',
                items: [{
                        text: 'Preview Import/Export Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 0,
                        handler: 'editnonlicencedpreviewPermitinformation'
                    },{
                        text: 'All Application Documents',
                        iconCls: 'x-fa fa-file',
                        tooltip: 'Application Documents',
                        action: 'edit',
                        childXtype: '',
                        winTitle: 'Application Documents',
                        winWidth: '40%',
                        isReadOnly: 1,
                        document_type_id: '',
                        hidden: true,
                        handler: 'showPreviousUploadedDocs'
                    },{
                        text: 'View Screening Checklists & Recommendation',
                        iconCls: 'x-fa fa-check-square',
                        hidden: true,
                        handler: 'showApplicationChecklists'
                    }
                ]
            }
        }
    }]
});

