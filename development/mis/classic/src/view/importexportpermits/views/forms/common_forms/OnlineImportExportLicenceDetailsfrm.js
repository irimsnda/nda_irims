

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
            name: 'tpin_id'
        },{
        xtype: 'hiddenfield',
        name: 'table_name',
        value: 'wb_importexport_applications'
    },{
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
    },{
        xtype: 'combo',
        fieldLabel: 'Type Of Application',
        labelWidth: 80,
   
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
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

            
            // change: function(cbo, value){
            //         var form = cbo.up('form'),
            //         eligible_importerscategory_id = form.down('combo[name=eligible_importerscategory_id]');
            //         if(value != 1){
            //             eligible_importerscategory_id.setVisible(false);
            //         }
            //         else{
            //             eligible_importerscategory_id.setVisible(true);
            //         }


            // }
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
    // {
    //     xtype: 'combo',
    //     fieldLabel: 'Application Category/Reason',
    //     name: 'permit_category_id',
    //     forceSelection: true,
    //     queryMode: 'local',
    //     valueField: 'id',
    //     displayField: 'name',
    //     listeners: {
    //         beforerender: {
    //             fn: 'setWorkflowCombosStore',
    //             config: {
    //                 pageSize: 10000,
    //                 proxy: {
    //                     url: 'configurations/getNonrefParameter',
    //                     extraParams: {
    //                         table_name: 'par_permit_category'
    //                     }
    //                 }
    //             },
    //             isLoad: true
    //         },
    //         change:'funcOnChangePermitCategory'
    //     },bind: {
    //         readOnly: '{isReadOnly}'
    //     },
    // },

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
    // {
    //     xtype: 'combo',
    //     fieldLabel: 'Permit Product Categories',
    //     name: 'product_type_id',
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
    //                     url: 'configurations/getNonrefParameter',
    //                     extraParams: {
    //                         table_name: 'par_premises_products'
    //                     }
    //                 }
    //             },
    //             isLoad: true
    //         }
    //     },bind: {
    //         readOnly: '{isReadOnly}'
    //     },
    // },
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
    },
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
    },

    {
        xtype: 'combo',
        fieldLabel: 'Port Of Entry/Exit',
        labelWidth: 80,
        allowBlank: true,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        hidden: false,
        name: 'port_id',
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getNonrefParameter',
                        extraParams: {
                            table_name: 'par_ports_information',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            }
        },bind: {
            readOnly: '{isReadOnly}'
        },
    },{
        xtype: 'combo',
        fieldLabel: 'VC Application Type',
        labelWidth: 80,
        allowBlank: true,
        valueField: 'id',
        displayField: 'name',
        hidden: false,
        forceSelection: true,
        name: 'vc_application_type_id',
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getNonrefParameter',
                        extraParams: {
                            table_name: 'par_vc_application_type',
                            has_filter: 0
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
        fieldLabel: 'Mode of Transport',
        labelWidth: 80,
        allowBlank: true,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        hidden: false,
        name: 'mode_oftransport_id',
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getNonrefParameter',
                        extraParams: {
                            table_name: 'par_modesof_transport'
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
        xtype: 'textfield',
        hidden: false,
        name: 'proforma_invoice_no',
        bind: {
            readOnly: '{isReadOnly}'
        },
        fieldLabel: 'Invoice No',
    }, {
        xtype: 'datefield',
        hidden: false,
        name: 'proforma_invoice_date',
        bind: {
            readOnly: '{isReadOnly}'
        },
        format:'Y-m-d',
        altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
        fieldLabel: 'Invoice Date',
    }, 
    // {
    //     xtype: 'combo',
    //     fieldLabel: 'Paying Currency',
    //     labelWidth: 80,
    //     allowBlank: true,
    //     hidden: true,
    //     valueField: 'id',
    //     displayField: 'name',bind: {
    //         readOnly: '{isReadOnly}',
    //         hidden: 'isVisaApplication'
    //     },
    //     forceSelection: true,
    //     name: 'paying_currency_id',
    //     queryMode: 'local',
    //     listeners: {
    //         beforerender: {
    //             fn: 'setConfigCombosSectionfilterStore',
    //             config: {
    //                 pageSize: 10000,
    //                 proxy: {
    //                     url: 'configurations/getPayingCurrency',
    //                     extraParams: {
    //                         table_name: 'par_currencies',
    //                         has_filter: 0
    //                     }
    //                 }
    //             },
    //             isLoad: true
    //         }
    //     }
    // }, 
    {
        xtype: 'combo',
        fieldLabel: 'Consignee Options',
        labelWidth: 80,
         allowBlank: true,
        valueField: 'id',
        displayField: 'name',
        hidden: false,
        forceSelection: true,
        name: 'applicant_as_consignee',
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
                            table_name: 'par_consignee_options',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            },
            change: function(cbo, value){
                    var form = cbo.up('form'),
                    consignee_name = form.down('textfield[name=consignee_name]'),
                    link_consignee = form.down('button[name=link_consignee]');
                    if(value == 1){
                        consignee_name.setVisible(false);
                        link_consignee.setVisible(false)

                    }
                    else{
                        consignee_name.setVisible(true);
                        link_consignee.setVisible(true);
                    }


            }
        }
    }, {
        xtype: 'fieldcontainer',
        hidden: false,
        layout: 'column',
        defaults: {
            labelAlign: 'top'
        },
        hidden: true,
        fieldLabel: 'Consignee Name',
        items: [
            {
                xtype: 'textfield',
                name: 'consignee_name',
                hidden: false,
                readOnly: true,bind: {
                    readOnly: '{isReadOnly}'
                },allowBlank: true,
                columnWidth: 0.9
            },
            {
                xtype: 'button',
                iconCls: 'x-fa fa-link',
                columnWidth: 0.1,
                tooltip: 'Link Consignee',
                name: 'link_consignee',  
                hidden: false,
                bind: 
                {
                    disabled: '{isReadOnly}'
                },
                handler: 'showConsigneeDetails'
            },{
                xtype: 'hiddenfield',allowBlank: true,
                name:'consignee_id'
            }
        ]
    },
    // {
    //     xtype: 'combo',
    //     fieldLabel: 'Select Importer Category(Eligible Importers)',
    //     labelWidth: 80,
    //     valueField: 'id',
    //     displayField: 'name',
    //     forceSelection: true,
    //     name: 'eligible_importerscategory_id',
    //     queryMode: 'local',bind: {
    //         readOnly: '{isReadOnly}'
    //     },
    //     listeners: {
    //         beforerender: {
    //             fn: 'setProductRegCombosStore',
    //             config: {
    //                 pageSize: 10000,
    //                 proxy: {
    //                     url: 'configurations/getNonrefParameter',
    //                     extraParams: {
    //                         table_name: 'par_eligible_importerscategories',
    //                         has_filter: 0
    //                     }
    //                 }
    //             },
    //             isLoad: true
    //         }
    //     }
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
            xtype: 'fieldcontainer',
            layout: 'column',
            defaults: {
                labelAlign: 'top'
            },
            items: [
                {
                    xtype: 'textfield',
                    name: 'tpin_no',
                    columnWidth: 0.9,
                    allowBlank: false,
                    fieldLabel: 'TIN No.',
                    bind: {
                        readOnly: '{isReadOnly}'
                    }
                },
            //     {
            //     xtype: 'textfield',
            //     fieldLabel: 'TIN No.',
            //     labelWidth: 80,
            //     displayField: 'tpin_no',
            //     name: 'tpin_no'
            //     //columnWidth: 1
            // },
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