Ext.define('Admin.view.pv.views.forms.PvSuspectedDrugFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'pvSuspectedDrugFrm',
    itemId: 'pvsuspectedgrugfrm',
    controller: 'pvvctr',
    height: Ext.Element.getViewportHeight() - 118,
    layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.33,
        margin: 5,
        allowBlank: true,
        labelAlign: 'top'
    },
    scrollable: true,
    autoScroll: true,
    items: [{
            xtype: 'hiddenfield',
            margin: '0 20 20 0',
            name: 'table_name',
            value: 'tra_pv_suspected_drugs',
            allowBlank: true
        },{
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'is_other_drugs_used'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_code'
        },
        {
            xtype: 'hiddenfield',
            name: 'pv_id'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        {
            xtype:'fieldset',
            columnWidth: 1,
            itemId: 'main_fieldset',
            title: 'Drug Details',
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
            items:[ {
            xtype: 'combo', 
            anyMatch: true,
            fieldLabel: 'Report Category',
            name: 'report_category_id',
            forceSelection: true,
            readOnly: true,
            allowBlank:true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setCompStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            extraParams: {
                                table_name: 'par_adr_categories'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Report Type',
            name: 'adr_type_id',
            forceSelection: true,
            readOnly: true,
            allowBlank:true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setCompStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            extraParams: {
                                table_name: 'par_adr_types'
                            }
                        }
                    },
                    isLoad: true
                },
                change: function(combo, newVal, oldVal, eopts){
                    var form = combo.up('form'),
                        model_no = form.down('textfield[name=model_no]'),
                        udi_no = form.down('textfield[name=udi_no]'),
                        device_operator = form.down('textfield[name=device_operator]'),
                       // dosage = form.down('textfield[name=dosage]'),
                        route_of_administration_id = form.down('combo[name=route_of_administration_id]');

                    if(newVal == 2){
                        model_no.setVisible(true);
                        udi_no.setVisible(true);
                        device_operator.setVisible(true);
                        //dosage.setVisible(true);
                        route_of_administration_id.setVisible(false);
                    }else{
                        model_no.setVisible(false);
                        udi_no.setVisible(false);
                        device_operator.setVisible(false);
                       // dosage.setVisible(false);
                        route_of_administration_id.setVisible(true);
                    }
                }
            }
        },
        {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Drug Role',
            name: 'drug_role_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setCompStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            extraParams: {
                                table_name: 'par_adr_drugrole'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
                xtype:'fieldcontainer',
                fieldLabel: 'Drug Name (WHODrug)',
                columnWidth: 1,
                layout: {
                    type: 'column'
                },
                defaults:{
                    columnWidth: 0.5,
                    labelAlign: 'top'
                },
                items:[
                     {
                            xtype: 'combo', anyMatch: true,
                            fieldLabel: 'Who Drug Level',
                            name: 'whodrug_level_id',
                            columnWidth: 0.5,
                            allowBlank:false,
                            forceSelection: true,
                            queryMode: 'local',
                            valueField: 'id',
                            displayField: 'name',
                            listeners: {
                                beforerender: {
                                    fn: 'setCompStore',
                                    config: {
                                        pageSize: 1000,
                                        proxy: {
                                            extraParams: {
                                                table_name: 'par_pv_whodrug_levels'
                                            }
                                        }
                                    },
                                    isLoad: true
                                }
                            }
                },
                 {
                    xtype: 'fieldcontainer',
                    layout: 'column',
                    columnWidth: 0.5,
                    defaults: {
                        labelAlign: 'top'
                    },
                    fieldLabel: 'Name',
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'who_drug_name',
                            readOnly: true,
                            allowBlank:false,
                            columnWidth: 0.9
                        },
                    
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-search',
                            columnWidth: 0.1,
                            tooltip: 'Search WHODrug',
                            handler: 'showWHODugSelectionList',
                            winTitle: 'LTR Selection List',
                            winWidth: '90%'
                        }
                    ]
                }
                ]
            } ,
        
        {
            xtype: 'textfield',
            fieldLabel: 'Drug Name as Reported',
            name: 'brand_name',
            allowBlank: false,
        }, {
            xtype: 'textfield',
            fieldLabel: 'MAH',
            name: 'mah_holder',
            allowBlank: true,
        },
       
        {
                xtype:'fieldcontainer',
                fieldLabel: 'Strength',
                columnWidth: 1,
                //hideLabel: true,
                layout: {
                    type: 'column'
                },
                defaults:{
                    columnWidth: 0.5,
                    labelAlign: 'top'
                },
                items:[{
                        xtype: 'textfield',
                        fieldLabel: 'Strength',
                        //hideLabel: true,
                        name: 'strength',
                        emptyText: 'e.g., 125mg/250mg | 30%/70%',
                        allowBlank: false,
                        listeners: {
                            render: function (field) {
                                Ext.create('Ext.tip.ToolTip', {
                                    target: field.getEl(),
                                    html: 'e.g., 125mg/250mg |30%/70%',
                                    trackMouse: true
                                });
                            }
                        }
                    },

                 {
                    xtype: 'combo', anyMatch: true,
                    fieldLabel: 'SI Units',
                    name: 'si_unit_id',
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'name',
                    listeners: {
                        beforerender: {
                            fn: 'setCompStore',
                            config: {
                                pageSize: 1000,
                                proxy: {
                                    extraParams: {
                                        table_name: 'par_si_units'
                                    }
                                }
                            },
                            isLoad: true
                        }
                    }
                }]
                },

         

        {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Suspected Ingredient',
            name: 'suspected_ingredient_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setCompStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            extraParams: {
                                table_name: 'par_adr_suspected_ingredients'
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
               xtype: 'fieldcontainer',
                columnWidth: 1,
                fieldLabel: 'Additional drug-related problems',
                layout: 'fit',
                items:[ {
                            xtype: 'tagfield',
                            anyMatch: true,
                            fieldLabel: 'Related Problem',
                            hideLabel: true,
                            columnWidth: 1,
                            name: 'adr_related_problems_id',
                            forceSelection: true,
                            filterPickList: true,
                            encodeSubmitValue: true,
                            queryMode: 'local',
                            valueField: 'id',
                            growMax: 100,
                            multiSelect: true,
                            allowBlank: false,
                            labelAlign: 'top',
                            displayField: 'name',
                            listeners: {
                                    beforerender: {
                                        fn: 'setCompStore',
                                        config: {
                                            pageSize: 1000,
                                            proxy: {
                                                extraParams: {
                                                    table_name: 'par_adr_related_problems'
                                                }
                                            }
                                        },
                                        isLoad: true
                                    }
                                }
            }]
         },

         {
               xtype: 'fieldcontainer',
                columnWidth: 1,
                fieldLabel: 'Indication',
                layout: 'fit',
                items:[
           {
                xtype:'fieldcontainer',
                fieldLabel: 'Indication (MedDRA)',
                columnWidth: 1,
                layout: {
                    type: 'column'
                },
                defaults:{
                    columnWidth: 0.5,
                    labelAlign: 'top'
                },
                items:[
                      {
                            xtype: 'combo',
                            anyMatch: true,
                            fieldLabel: 'MedDRA Level',
                            name: 'indication_meddra_level_id',
                            forceSelection: true,
                            columnWidth: 0.5,
                            allowBlank:false,
                            queryMode: 'local',
                            valueField: 'id',
                            displayField: 'name',
                            listeners: {
                                beforerender: {
                                    fn: 'setCompStore',
                                    config: {
                                        pageSize: 10000,
                                        proxy: {
                                            extraParams: {
                                                table_name: 'par_pv_medra_levels'
                                            }
                                        }
                                    },
                                    isLoad: true
                                },
                             change: function (cmbo, newVal) {
                                var form = cmbo.up('form'),
                                    indicationMedraStore = form.down('combo[name=indication_medra]').getStore(),
                                    filterObj = {meddra_level_id: newVal},
                                    filterStr = JSON.stringify(filterObj);
                                indicationMedraStore.removeAll();
                                indicationMedraStore.load({params: {filter: filterStr}});
                            }
                          
                        }
                     },
                  {
                            xtype: 'combo',
                            anyMatch: true,
                            fieldLabel: 'Indication',
                            name: 'indication_medra',
                            forceSelection: true,
                            columnWidth: 0.5,
                            allowBlank:false,
                            queryMode: 'local',
                            valueField: 'name',
                            displayField: 'name',
                             listeners: {
                                beforerender: {
                                    fn: 'setOrgConfigCombosStore',
                                    config: {
                                        pageSize: 100,
                                        proxy: {
                                        url: 'configurations/getMedDRAtearm'
                                       }
                                    },
                                    isLoad: false
                                }
                         }
                       }
                    ]
                }]
         },


        //medical devices 
        {
            xtype: 'textfield',
            name: 'model_no',
            fieldLabel: 'Model Number',
            hidden: true
        },
        {
            xtype: 'textfield',
            name: 'udi_no',
            fieldLabel: 'Unique Identifier(UDI) Number',
            hidden: true
        },
        {
            xtype: 'textfield',
            name: 'device_operator',
            fieldLabel: 'Operator of Device(Healthcare Professional/Patient/Consumer)',
            hidden: true
        },
        {
            xtype: 'textfield',
            name: 'dosage',
            fieldLabel: 'Dosage'
        },
         {
            xtype: 'textfield',
            name: 'batch_no',
            fieldLabel: 'Batch number'
        },
        {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Route of Administration',
            name: 'route_of_administration_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setCompStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            extraParams: {
                                table_name: 'par_route_of_administration'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },

        {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Route of administration (EDQM Standard Terms)',
            name: 'edqm_route_of_administration_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setCompStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            extraParams: {
                                table_name: 'par_edqm_routes_of_administration'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },

        {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Action taken',
            name: 'action_taken_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setCompStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            extraParams: {
                                table_name: 'par_pv_action_taken'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },

        {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Was a rechallenge performed?',
            name: 'rechallenge_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setCompStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            extraParams: {
                                table_name: 'par_pv_assessment_confirmation'
                            }
                        }
                    },
                    isLoad: true
                },
                change: function(combo, newVal, oldVal, eopts){
                    var form = combo.up('form'),
                        rechallenge_reaction_id = form.down('combo[name=rechallenge_reaction_id]');

                    if(newVal == 1){
                        rechallenge_reaction_id.setVisible(true);
                    }else{
                        rechallenge_reaction_id.setVisible(false);
                    }
                }
            }
        },

        {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Did reaction recur on re-administration?',
            name: 'rechallenge_reaction_id',
            forceSelection: true,
            hidden:true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setCompStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            extraParams: {
                                table_name: 'par_pv_challenge_ractions'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },


        {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Was a Dechallenge performed?',
            name: 'dechallenge_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setCompStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            extraParams: {
                                table_name: 'par_pv_assessment_confirmation'
                            }
                        }
                    },
                    isLoad: true
                },
                change: function(combo, newVal, oldVal, eopts){
                    var form = combo.up('form'),
                        dechallenge_reaction_id = form.down('combo[name=dechallenge_reaction_id]');

                    if(newVal == 1){
                        dechallenge_reaction_id.setVisible(true);
                    }else{
                        dechallenge_reaction_id.setVisible(false);
                    }
                }
            }
        },
        {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Did reaction recur on re-administration?',
            name: 'dechallenge_reaction_id',
            forceSelection: true,
            queryMode: 'local',
            hidden:true,
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setCompStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            extraParams: {
                                table_name: 'par_pv_challenge_ractions'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },

       {
            xtype: 'htmleditor',
            fieldLabel: 'Additional information on drug',
            columnWidth: 1,
            name: 'remarks',
        }
    ],
    dockedItems:[
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items:[
                '->',{
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'tra_pv_suspected_drugs',
                    storeID: 'pvSuspectedDrugStr',
                    formBind: true,
                    ui: 'soft-green',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreatePvWin'
                }
            ]
        }
    ]
});