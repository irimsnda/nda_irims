
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.ImportExportLicenceDirectorApprovalGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'importexportlicencedirectorapprovalgrid',
    listeners: {
        
    },
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'importexportpermitmanagersubstr',
                proxy: {
                    url: 'importexportpermits/getImportExportManagerReviewApplications'
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
    features: [{
        ftype: 'searching',
        mode: 'local',
        minChars: 2
    }],
     margin: 3,
    tbar: [ {
            xtype: 'tbspacer',
            width: 20
        },{
        xtype: 'exportbtn'
    },'->',{
        xtype: 'combo',
        fieldLabel: 'Zones',
        forceSelection: true,
        queryMode: 'local',
        hidden: true,
        valueField: 'id',
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
        tdCls: 'wrap-text',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'date_added',
        text: 'Application Date',
        tdCls: 'wrap-text',
        flex: 1
    },{
        xtype: 'gridcolumn',
        text: 'Business Name',
        dataIndex: 'premises_name',
        flex: 1,
        tdCls: 'wrap-text',
        tdCls: 'wrap'
        
    },{
        xtype: 'gridcolumn',
        dataIndex: 'business_type',
        text: 'Business Type',
        tdCls: 'wrap-text',
        flex: 1
    }, 
   {
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Status',
        flex: 1
    },
    {
        header: '(MIE) Recommendation',
        dataIndex: 'manager_recommendation',
        flex: 1,
        renderer: function (value, metaData,record) {
            var manager_recommendation_id = record.get('manager_recommendation_id')
            if (manager_recommendation_id==1 || manager_recommendation_id===1) {
                metaData.tdStyle = 'color:white;background-color:green';
                return record.get('manager_recommendation');
            }else if(manager_recommendation_id==2 || manager_recommendation_id===2){
              metaData.tdStyle = 'color:white;background-color:red';
              return record.get('manager_recommendation');
          }else{
            return record.get('manager_recommendation');
           }
        }
    },
     {
        xtype: 'widgetcolumn',
        width: 150,
        widget: {
            width: 150,
            textAlign: 'left',
            xtype: 'button',
            ui: 'soft-red',
            text: 'Recommendation',
            iconCls: 'x-fa fa-chevron-circle-up',
            childXtype: 'applicationcommentspnl',
            winTitle: 'Assessment Comments',
            winWidth: '60%',
            handler: 'showCommentDetails',
            comment_type_id: 3,
            stores: '[]'
        }
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
                        handler: 'editpreviewPermitinformation'
                    },{
                        text: 'All Application Documents',
                        iconCls: 'x-fa fa-file',
                        tooltip: 'Application Documents',
                        action: 'edit',
                        childXtype: '',
                        winTitle: 'Application Documents',
                        winWidth: '70%',
                        isReadOnly: 1,
                        document_type_id: '',
                       // hidden: true,
                        handler: 'showPreviousUploadedDocs'
                    },{
                        text: 'View Screening Checklists & Recommendation',
                        iconCls: 'x-fa fa-check-square',
                       // hidden: true,
                        handler: 'showApplicationChecklists'
                    },{
                        text: 'Request for Additional Information',
                        iconCls: 'x-fa fa-file-pdf-o',
                        handler: 'showApplicationQueries'
                    },
                ]
            }
        }
    }]
});