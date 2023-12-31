

/**
 * Created by Softclans
 */
Ext.define('Admin.view.importexportpermits.views.forms.common_forms.OnlineImportExportLicenceDetailsfrm', {
    extend: 'Ext.form.Panel',
    xtype: 'onlineimportexportlicencedetailsfrm',
    itemId: 'importexportdetailsfrm',
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
    
    //title: 'APPLICANTION DETAILS',
    items: [

        {
        xtype: 'hiddenfield',
        name: 'id',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        name: 'table_name',
        value: 'wb_importexport_applications'
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
        fieldLabel: 'Application Type',
        labelWidth: 80,
        width: 320,
        readOnly: true,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'sub_module_id',
         hidden: true,
        queryMode: 'local',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        }, bind: {
            readOnly: '{isReadOnly}'
        },
        readOnly: true,
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'workflow/getSystemSubModules',
                        extraParams: {
                            model_name: 'SubModule',
                            module_id: 4
                        }
                    }
                },
                isLoad: true
            }
        }
     },
  
    {
        xtype: 'combo',
        fieldLabel: 'NDA Application Type',
        labelWidth: 80,
   
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        readOnly: true,
        name: 'has_registered_premises',
        queryMode: 'local',bind: {
            readOnly: '{isReadOnly}'
        },
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
                       // url: 'configurations/getRegistrationApplicationParameters',
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
        fieldLabel: 'Permit Product Classification',
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
                       // url: 'configurations/getRegistrationApplicationParameters',
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
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosSectionfilterStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                       // url: 'configurations/getRegistrationApplicationParameters',
                        url: 'configurations/getNonrefParameter',
                        extraParams: {
                            table_name: 'par_business_types'
                        }
                    }
                },
                isLoad: true
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
        allowBlank: true,
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
                      // url: 'configurations/getImportExportProductRange',
                        extraParams: {
                            table_name: 'par_importexport_product_range'
                        }
                    }
                },
                isLoad: true
            }
        }
    }
    

    // {
    //     xtype: 'combo',
    //     fieldLabel: 'Product Range',
    //     name: 'importexport_product_range_id',
    //     forceSelection: true,
    //     queryMode: 'local',
    //     valueField: 'id',
    //     displayField: 'name',
    //     listeners: {
    //         beforerender: {
    //             fn: 'setConfigCombosSectionfilterStore',
    //             config: {
    //                 pageSize: 10000,
    //                 proxy: {
    //                    // url: 'configurations/getRegistrationApplicationParameters',
    //                     url: 'configurations/getImportExportProductRange',
    //                     extraParams: {
    //                         table_name: 'par_importexport_product_range'
    //                     }
    //                 }
    //             },
    //             isLoad: true
    //         }
    //     },bind: {
    //         readOnly: '{isReadOnly}'
    //     },
    // } 
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
                xtype: 'textfield',
                fieldLabel: 'TIN No.',
                labelWidth: 80,
                displayField: 'tpin_no',
                name: 'tpin_no'
                //columnWidth: 1
            },

            {
                xtype: 'textfield',
                fieldLabel: 'Name of Business',
                labelWidth: 80,
                displayField: 'name',
                name: 'name',
            },

            {
                xtype: 'textfield',
                fieldLabel: 'Physical address of the Business or Institution',
                labelWidth: 80,
                displayField: 'physical_address',
                name: 'physical_address',
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Email',
                labelWidth: 80,
                displayField: 'email',
                name: 'email',
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Company Registration Number',
                labelWidth: 80,
                displayField: 'company_registration_no',
                name: 'company_registration_no',
            }
        ]
    },
        
   ],
   
});