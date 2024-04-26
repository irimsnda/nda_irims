

/**
 * Created by Softclans
 */
Ext.define('Admin.view.importexportpermits.views.forms.common_forms.OnlineImportExportNonLicenceBusinessDetailsfrm', {
    extend: 'Ext.form.Panel',
    xtype: 'onlineimportexportnonlicencebusinessdetailsfrm',
    itemId: 'onlineimportexportnonlicencebusinessdetailsfrm',
    layout: {
        type: 'column',
        columns: 3
    },
    bodyPadding: 5,
    controller: 'importexportpermitsvctr',
    defaults: {
        margin: 5,
        labelAlign: 'right',
        width: '100%',
        columnWidth: 0.33,
        labelAlign: 'top',
        allowBlank: false,
        
    },
    
    items: [

        {
        xtype: 'hiddenfield',
        name: 'id',
        allowBlank: true
    }, {
            xtype: 'hiddenfield',
            name: 'premise_id'
        },{
        xtype: 'hiddenfield',
        name: 'table_name',
        value: 'tra_importexport_applications'
    },
  {
        xtype:'fieldset',
        columnWidth: 1,
        title: "APPLICATION DETAILS",
        collapsible: true,
        defaults: {
            labelAlign: 'top',
            allowBlank: false,
            labelAlign: 'top',
            margin: 5,
            xtype: 'textfield',
            allowBlank: false,
            columnWidth: 0.33,
        },
        layout: 'column',
          items:[
 
    {
        xtype: 'combo',
        fieldLabel: 'NDA Application Type',
        value:2,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        readOnly: true,
        allowBlank:true,
        name: 'has_registered_premises',
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getNonrefParameter',
                        extraParams: {
                            table_name: 'par_importexport_application_type',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            },
        }
    },
    {
        xtype: 'combo',
        fieldLabel: 'Licence Type',
        name: 'licence_type_id',
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosSectionfilterStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getNonrefParameter',
                        extraParams: {
                            table_name: 'par_licence_type'
                        }
                    }
                },
                isLoad: true
            }
        },bind: {
            readOnly: '{isReadOnly}'
        },
    },

    {
        xtype: 'combo',
        fieldLabel: 'Product Classification',
        name: 'product_classification_id',
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosSectionfilterStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                       
                        url: 'configurations/getNonrefParameter',
                        extraParams: {
                            table_name: 'par_premise_class'
                        }
                    }
                },
                isLoad: true
            }
        },bind: {
            readOnly: '{isReadOnly}'
        },
    },
   
    {
        xtype: 'combo',
        fieldLabel: 'Business Type',
        name: 'business_type_id',
        forceSelection: true,
        columnWidth: 1,
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosSectionfilterStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                   
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_business_types'
                        }
                    }
                },
                isLoad: false
            },afterrender: function (cmbo) {
                         var store = cmbo.getStore(),
                         filterObj = {is_non_licenced: 1},
                         filterStr = JSON.stringify(filterObj);
                         store.removeAll();
                         store.load({params: {filters: filterStr}});
          }
        },bind: {
            readOnly: '{isReadOnly}'
        },
    } ,
    {
        xtype: 'tagfield',
        fieldLabel: 'Product Range',
        columnWidth: 0.33,
        name: 'importexport_product_range_id',
        allowBlank: false,
        columnWidth: 1,
        forceSelection: true,
        filterPickList: true,
        encodeSubmitValue: true,
        emptyText: 'Product Range',
        growMax: 100,
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        listeners: {
            beforerender: {
                fn: 'setParamCombosStore',
                config: {
                    pageSize: 100,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                  
                        extraParams: {
                            table_name: 'par_importexport_product_range'
                        }
                    }
                },
                isLoad: true
            }
        }
    }
    
]
},

{
    xtype:'fieldset',
    columnWidth: 1,
    title: "BUSINESS DETAILS ",
    collapsible: true,
    defaults: {
        labelAlign: 'top',
        allowBlank: false,
        labelAlign: 'top',
        margin: 5,
        xtype: 'textfield',
        allowBlank: false,
        columnWidth: 0.33,
    },
    layout: 'column',
      items:[

        {
            xtype: 'fieldcontainer',
            layout: 'column',
            defaults: {
                labelAlign: 'top'
            },
            items: [
                {
                    xtype: 'textfield',
                    name: 'premise_tpin_no',
                    columnWidth: 0.9,
                    allowBlank: false,
                    readOnly:true,
                    fieldLabel: 'TIN No.',
                    bind: {
                        readOnly: '{isReadOnly}'
                    }
                },
            
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-search',
                    columnWidth: 0.1,
                    tooltip: 'Search',
                    action: 'search_premise',
                    childXtype: 'importbusinessselectiongrid',
                    winTitle: 'Premises Selection List',
                    winWidth: '90%',
                    margin: '30 0 0 0',
                    bind: {
                        disabled: '{isReadOnly}'
                    }
                }
            ]
        },
    

            {
                xtype: 'textfield',
                fieldLabel: 'Name of Business',
                allowBlank:true,
                readOnly:true,
                name: 'premise_name',
            },

            {
                xtype: 'textfield',
                fieldLabel: 'Physical address of the Business or Institution',
                allowBlank:true,
                readOnly:true,
                name: 'premise_physical_address',
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Email',
                allowBlank:true,
                readOnly:true,
                name: 'premise_email',
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Company Registration Number',
                allowBlank:true,
                readOnly:true,
                name: 'premise_company_registration_no',
            }
        ]
    },
        
   ],
   
});