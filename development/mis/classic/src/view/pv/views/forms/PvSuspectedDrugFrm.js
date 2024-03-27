Ext.define('Admin.view.pv.views.forms.PvSuspectedDrugFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'pvSuspectedDrugFrm',
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
                        dosage = form.down('textfield[name=dosage]'),
                        route_of_administration_id = form.down('combo[name=route_of_administration_id]');

                    if(newVal == 2){
                        model_no.setVisible(true);
                        udi_no.setVisible(true);
                        device_operator.setVisible(true);
                        dosage.setVisible(true);
                        route_of_administration_id.setVisible(false);
                    }else{
                        model_no.setVisible(false);
                        udi_no.setVisible(false);
                        device_operator.setVisible(false);
                        dosage.setVisible(false);
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
            xtype: 'textfield',
            fieldLabel: 'Drug Name (WHODrug)',
            name: 'who_drug_name',
            allowBlank: true,
        },
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
            xtype: 'textfield',
            fieldLabel: 'Strength',
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
                items:[{
                xtype: 'pvadditionalproblemsgrid'

             }]
         },

         {
               xtype: 'fieldcontainer',
                columnWidth: 1,
                fieldLabel: 'Indication',
                layout: 'fit',
                items:[{
                xtype: 'pvindicationgrid'

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
            fieldLabel: 'Dose'
        },{
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
        },{
            xtype: 'textfield',
            name: 'frequency',
            fieldLabel: 'Frequency'
        },
        {
            xtype: 'datefield',
            fieldLabel: 'When did you start taking/using the medicine/vaccine/device?',
            format: 'Y-m-d',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
            name: 'start_date',
            maxValue: new Date()
        },{
            xtype: 'datefield',
            fieldLabel: 'When did you stop taking/using the medicine/vaccine/device?',
            format: 'Y-m-d',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
            name: 'end_date'
        },{
            xtype: 'datefield',
            fieldLabel: 'Expiry date of the medicine/vaccine/device',
            format: 'Y-m-d',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
            name: 'expiry_date'
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Manufacturer(Name and Any Other details)',
            columnWidth: 1,
            name: 'manufacturer_name',
        },{
            xtype: 'htmleditor',
            fieldLabel: 'Reason for Use',
            columnWidth: 1,
            name: 'use_reasons',
        },{
            xtype: 'htmleditor',
            fieldLabel: 'Comments / Any other Additions',
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