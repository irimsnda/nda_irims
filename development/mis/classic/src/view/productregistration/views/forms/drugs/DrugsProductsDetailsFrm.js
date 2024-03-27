
/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.forms.drugs.DrugsProductsDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'drugsProductsDetailsFrm',
    itemId: 'productsDetailsFrm',
    layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.33,
        margin: 5,
        labelAlign: 'top',
        allowBlank: false,
       
    }, autoScroll: true,
   
    items: [
        {
            xtype: 'hiddenfield',
            name: 'product_id'
        },{
            xtype: 'hiddenfield', 
            allowBlank: true,
            name: 'reg_product_id'
        },  {
            xtype: 'hiddenfield',
            value: 'tra_product_information',
            name: 'table_name'
        },
        // {
        //     xtype:'fieldset',
        //     columnWidth: 1,
        //     title: 'Variation Request Initialization',
        //     collapsible: true,
        //     defaults: {
        //         labelAlign: 'top',
        //         allowBlank: true,
        //         labelAlign: 'top',
        //         margin: 5,
        //         columnWidth: 0.33,
        // },
        // layout: 'column',
        // items:[{
        //     xtype: 'combo',
        //     fieldLabel: 'Variation Categories',
        //     columnWidth: 1,
        //     name: 'variation_category_id',
        //     valueField: 'id',
        //     labelAlign: 'top',
        //     displayField: 'name',
        //     forceSelection: true,
        //     allowBlank: true,
        //     queryMode: 'local',
        //     listeners: {
        //         beforerender: {
        //             fn: 'setConfigCombosStore',
        //             config: {
        //                 pageSize: 1000,
        //                 storeId:'variationcategoriesdetailsstr', 
        //                 proxy: {
        //                     url: 'commonparam/getCommonParamFromTable',
        //                     extraParams:{
        //                         table_name: 'par_variation_categories'
        //                     }
        //                 }
        //             },
        //             isLoad: true
        //         },  change: function (cmbo, newVal) {
        //             var form = cmbo.up('form'),
        //             variation_subcategorystr = form.down('combo[name=variation_subcategory_id]').getStore();
        //             variation_subcategorystr.removeAll();
        //             filters=JSON.stringify({variation_category_id: newVal});
    
        //             variation_subcategorystr.removeAll();
        //             variation_subcategorystr.load({ params: { filters: filters} });
                    
        //         }
        //     }
        //     },{
        //         xtype: 'combo',
        //         columnWidth: 1,
        //         fieldLabel: 'Variation Sub-Categories',
        //         name: 'variation_subcategory_id',
        //         valueField: 'id',
        //         displayField: 'name',
        //         forceSelection: true,
        //         allowBlank: true,
        //         labelAlign: 'top',
        //         queryMode: 'local',
        //         listeners: {
        //             beforerender: {
        //                 fn: 'setConfigCombosStore',
        //                 config: {
        //                     pageSize: 1000,
                            
        //                     storeId:'variationsubcategoriesstr', 
        //                     proxy: {
        //                         url: 'commonparam/getCommonParamFromTable',
        //                         extraParams:{
        //                             table_name: 'par_variation_subcategories'
        //                         }
        //                     }
        //                 },
        //                 isLoad: false
        //             }, change: function (cmbo, newVal) {
        //                 var form = cmbo.up('form'),
        //                 variation_descriptionstr = form.down('combo[name=variation_description_id]').getStore();
        //                 variation_descriptionstr.removeAll();
        
        //                 filters=JSON.stringify({variation_subcategory_id: newVal});
        
        //                 variation_descriptionstr.load({ params: { filters: filters} });
        
        //             }
        //         }
        //     }, {
        //         xtype: 'combo',
        //         columnWidth: 1,
        //         fieldLabel: 'Variation Description',
        //         name: 'variation_description_id',
        //         valueField: 'id',
        //         displayField: 'name',
        //         forceSelection: true,
        //         allowBlank: true,
        //         labelAlign: 'top',
        //         queryMode: 'local',
        //         listeners: {
        //             beforerender: {
        //                 fn: 'setConfigCombosStore',
        //                 config: {
        //                     pageSize: 1000,
        //                     storeId:'variationdescriptiondetailsstr', 
        //                     proxy: {
        //                         url: 'commonparam/getCommonParamFromTable',
        //                         extraParams:{
        //                             table_name: 'par_variation_description'
        //                         }
        //                     }
        //                 },
        //                 isLoad: false
        //             }, change: function (cmbo, newVal) {
        //                 var form = cmbo.up('form'),
        //                 variation_subdescriptionstr = form.down('combo[name=variation_subdescription_id]').getStore();
        //                 variation_subdescriptionstr.removeAll();
        
        //                 filters=JSON.stringify({variation_description_id: newVal});
        //                 variation_subdescriptionstr.load({ params: { filters: filters} });

        //                 var variation_description_id=form.down('combo[name=variation_description_id]').getValue(),
        //                 variation_subcategory_id=form.down('combo[name=variation_subcategory_id]').getValue(),
        //                 variation_category_id=form.down('combo[name=variation_category_id]').getValue(),
        //                 variation_reportingtypestr = form.down('combo[name=variation_reportingtype_id]').getStore();
        //                 variation_reportingtypestr.removeAll();
        
        //                 filters=JSON.stringify({variation_subcategory_id: variation_subcategory_id,
        //                     variation_category_id: variation_category_id,variation_description_id: newVal});
        
        //                 variation_reportingtypestr.load({ params: { filters: filters} });

        //             }
        //         }
        //     },

        //     {
        //         xtype: 'combo',
        //         columnWidth: 1,
        //         fieldLabel: 'Variation Sub-Description',
        //         name: 'variation_subdescription_id',
        //         valueField: 'id',
        //         displayField: 'name',
        //         forceSelection: true,
        //         allowBlank: true,
        //         labelAlign: 'top',
        //         queryMode: 'local',
        //         listeners: {
        //             beforerender: {
        //                 fn: 'setConfigCombosStore',
        //                 config: {
        //                     pageSize: 1000,
        //                     storeId:'variationsubdescriptiondetailsstr', 
        //                     proxy: {
        //                         url: 'commonparam/getCommonParamFromTable',
        //                         extraParams:{
        //                             table_name: 'par_variation_subdescription'
        //                         }
        //                     }
        //                 },
        //                 isLoad: false
        //             }, change: function (cmbo, newVal) {
        //                 var form = cmbo.up('form'),
        //                 variation_description_id=form.down('combo[name=variation_description_id]').getValue(),
        //                 variation_subcategory_id=form.down('combo[name=variation_subcategory_id]').getValue(),
        //                 variation_category_id=form.down('combo[name=variation_category_id]').getValue(),
        //                 variation_reportingtypestr = form.down('combo[name=variation_reportingtype_id]').getStore();
        //                 variation_reportingtypestr.removeAll();
        
        //                 filters=JSON.stringify({variation_subdescription_id: newVal,variation_subcategory_id: variation_subcategory_id,
        //                     variation_category_id: variation_category_id,variation_description_id: variation_description_id});
        
        //                 variation_reportingtypestr.load({ params: { filters: filters} });
        //              }
        //         }
        //     },{
        //     xtype: 'combo',
        //     columnWidth: 1,
        //     fieldLabel: 'Variation Category/Type',
        //     name: 'variation_reportingtype_id',
        //     valueField: 'id',
        //     displayField: 'name',
        //     forceSelection: true,
        //     allowBlank: true,
        //     queryMode: 'local',
        //     listeners: {
        //         beforerender: {
        //             fn: 'setConfigCombosStore',
        //             config: {
        //                 pageSize: 1000,
        //                 proxy: {
        //                     url: 'commonparam/getCommonParamFromTable',
        //                     extraParams:{
        //                         table_name: 'par_variation_reportingtypes'
        //                     }
        //                 }
        //             },
        //             isLoad: false
        //         }
        //     }
        //    }]
        //  },
         {
            xtype:'fieldset',
            columnWidth: 1,
            title: 'Product particulars',
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
            fieldLabel: 'Assessment Procedure',
            name: 'assessment_procedure_id',
            forceSelection: true,
            queryMode: 'local',
            allowBlank:true,
            valueField: 'id',labelWidth: 110,
            displayField: 'name',
            listeners: {
                 afterrender: {
                        fn: 'setConfigCombosStore',
                        config: {
                        pageSize: 10000,
                        proxy: {
                        url: 'configurations/getRegistrationApplicationParameters',
                        extraParams: {
                                table_name: 'par_assessment_procedures'
                         }
                    }
                },
                isLoad: true
                }
            }
                
            },{
            xtype: 'combo',
            fieldLabel: 'Product Class Category',
            name: 'prodclass_category_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosSectionfilterStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getproductApplicationParameters',
                            extraParams: {
                                table_name: 'par_prodclass_categories'
                            }
                        }
                    },
                    isLoad: true
                }
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
            }

        },{
            xtype: 'combo',
            fieldLabel: 'Product Origin',
            name: 'product_origin_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getRegistrationApplicationParameters',
                            extraParams: {
                                table_name: 'par_product_origins'
                            }
                        }
                    },
                    isLoad: true
                }
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
            }

        }, {
            xtype: 'textfield',
            name: 'brand_name',
            fieldLabel: 'Proprietary Name', bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },{
            xtype:'fieldcontainer',
            layout: {
                type: 'hbox'
            },
            items:[{
                xtype: 'combo',
                fieldLabel: 'Generic Names',
                name: 'common_name_id',
                forceSelection: true,
                queryMode: 'local',
                valueField: 'id',
                width: '80%',
                allowBlank: false,
                labelAlign: 'top',
                displayField: 'name'
                , bind: {
                    readOnly: '{isReadOnly}'  // negated
                },
                listeners: {
                    afterrender: {
                        fn: 'setConfigCombosSectionfilterStore',
                        config: {
                          
                            storeId: 'par_commonnamesstr',
                            proxy: {
                                url: 'configurations/getproductApplicationParameters',
                                extraParams: {
                                    table_name: 'par_common_names'
                                }
                            }
                        },
                        isLoad: true
                    }
                }
            },{
                xtype: 'button',
                iconCls:'x-fa fa-plus',
                name: 'btn_addcommonnames',
                childXtype:'productcommonNamefrm',
                width: '15%', margin:'28 0 0',
                table_name: 'par_common_names',
                storeId: 'par_commonnamesstr',
                bind: {
                    disabled: '{isReadOnly}'  // negated
                }
            }]
        }, {
            xtype: 'textfield',
            name: 'therapeutic_group',
            allowBlank:true,
            fieldLabel: 'Pharmacotherapeutic group', bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },
        // {
        //     xtype: 'textfield',
        //     name: 'therapeutic_code',
        //     allowBlank:true,
        //     fieldLabel: 'Pharmacotherapeutic Code', bind: {
        //         readOnly: '{isReadOnly}'  // negated
        //     }
        // },

         {
            xtype: 'combo',
            fieldLabel: '<br> ATC Code',
            name: 'atc_code_id',
            allowBlank:true,
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        storeId: 'par_atccodesstr',
                        proxy: {
                            url: 'configurations/getproductApplicationParameters',
                            extraParams: {
                                table_name: 'par_atc_codes'
                            }
                        }
                    },
                    isLoad: true
                }
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },
        {
            xtype:'combo',
            allowBlank: true,
            fieldLabel:'If no ATC code has been assigned, please indicate if an application for ATC code has been made',
            name:'has_atc_application',
            valueField:'id',
            hidden:true,
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        storeId: 'par_confirmationsStr',
                        proxy: {
                            url: 'configurations/getRegistrationApplicationParameters',
                            extraParams: {
                                table_name: 'par_confirmations'
                            }
                        }
                    },
                    isLoad: true
                }
             }, bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },
        {
            xtype:'textfield',
            name:'product_strength',
            fieldLabel:'<br> Product Strength',
            
            allowBlank: false, bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },

        {
            xtype: 'combo',
            fieldLabel: 'Classification',
            name: 'classification_id',
            forceSelection: true,
            allowBlank:true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        storeId: 'par_classificationsstr',
                        proxy: {
                            url: 'configurations/getproductApplicationParameters',
                            extraParams: {
                                table_name: 'par_classifications'
                            }
                        }
                    },
                    isLoad: false
                }
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        }, 
        {
            xtype: 'combo',
            fieldLabel: 'Distribution Category',
            name: 'distribution_category_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            allowBlank: false,
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getRegistrationApplicationParameters',
                            extraParams: {
                                table_name: 'par_distribution_categories'
                            }
                        }
                    },
                    isLoad: true
                }
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        }, {
            xtype: 'combo',
            fieldLabel: 'Product category',
            name: 'product_category_id',
            forceSelection: true,
            allowBlank:true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosSectionfilterStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getproductApplicationParameters',
                            extraParams: {
                                table_name: 'par_product_categories'
                            }
                        }
                    },
                    isLoad: true
                }
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },{
            xtype: 'textfield',
            fieldLabel: 'Proposed storage conditions',
            name: 'storage_condition',
            allowBlank: true,
            bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        }, 

        {
            xtype: 'textfield',
            fieldLabel: 'Proposed storage conditions after first opening',
            name: 'storage_conditionafter_opening',
            allowBlank: true,
            bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        }, 

        {
            xtype: 'combo',
            fieldLabel: 'Dosage Form',
            name: 'dosage_form_id',
            store: 'dosageformstr',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getRegistrationApplicationParameters',
                            extraParams: {
                                table_name: 'par_dosage_forms'
                            }
                        }
                    },
                    isLoad: true
                }
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        }, {
            xtype: 'tagfield',
            fieldLabel: '<br> Route of Administration',
            name: 'route_of_administration_id',
            allowBlank: true,
            forceSelection: true,
            filterPickList: true,
            encodeSubmitValue: true,
            emptyText: 'Select Administration',
            growMax: 100,
            multiSelect: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getRegistrationApplicationParameters',
                            extraParams: {
                                table_name: 'par_route_of_administration'
                            }
                        }
                    },
                    isLoad: true
                }
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },{
            xtype: 'tagfield',
            fieldLabel: 'Target Species(Vet)',
            name: 'target_species_id',
            allowBlank: true,
            forceSelection: true,
            filterPickList: true,
            hidden:true,
            encodeSubmitValue: true,
            emptyText: 'Select Species',
            growMax: 100,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getRegistrationApplicationParameters',
                            extraParams: {
                                table_name: 'par_target_species'
                            }
                        }
                    },
                    isLoad: true
                }
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },
        
        {
            xtype: 'numberfield',
            fieldLabel: '<br> Proposed Shelf Life(Months)',
            name: 'shelf_life', bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },

         {
            xtype: 'numberfield',
            fieldLabel: 'Proposed Shelf Life (after reconstitution or dilution) (if applicable)',
            allowBlank:true,
            name: 'shelf_lifeafter_dilution', bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },

         {
            xtype: 'numberfield',
            fieldLabel: '<br> Proposed Shelf Life(after first opening container)',
            allowBlank:true,
            name: 'shelf_lifeafter_opening', bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },

        {
            xtype: 'textarea',
            name: 'indication', columnWidth: 0.99,
            allowBlank: false,
            fieldLabel: 'Indication', bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },
        {
            xtype: 'textarea',
            name: 'physical_description',
            allowBlank: false,
            columnWidth: 0.99,
            fieldLabel: 'Visual description', bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        }, 
        {
            xtype: 'textfield',
            name: 'gtin_number', allowBlank: true,
            hidden:true,
            fieldLabel: 'Global Trade Item number', bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },{
            xtype: 'textfield',
            name: 'glocation_number', allowBlank: true,
            hidden:true,
            fieldLabel: 'Global Location Number', bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        }
        ]
      }
    ]
});