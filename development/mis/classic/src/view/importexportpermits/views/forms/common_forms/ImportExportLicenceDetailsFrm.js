

/**
 * Created by Softclans
 *
 */
Ext.define('Admin.view.importexportpermits.views.forms.common_forms.ImportExportLicenceDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'importexportlicencedetailsfrm',
    itemId: 'importexportlicencedetailsfrm',
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
    items: [{
        xtype: 'hiddenfield',
        name: 'id',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        name: 'table_name',
        value: 'wb_importexport_applications'
    }, {
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
        fieldLabel: 'Permit Business Type',
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
    }
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
});