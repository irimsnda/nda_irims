
Ext.define('Admin.view.pv.views.forms.PvPersonnelFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'pvpersonnelFrm',
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
            value: 'tra_pv_personnel',
            allowBlank: true
        },{
            xtype: 'hiddenfield',
            name: 'id'
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
            title: 'Report information',
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
                    xtype: 'combo', anyMatch: true,
                    fieldLabel: 'Reporter As',
                    name: 'adr_reporter_type_id',
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
                                        table_name: 'par_adr_reporter_types'
                                    }
                                }
                            },
                            isLoad: true
                        }
                    }
         },
         {
                    xtype: 'combo', anyMatch: true,
                    fieldLabel: 'Reporter Professional Qualification',
                    name: 'qualification_id',
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
                                        table_name: 'par_pv_reporter_qualifications'
                                    }
                                }
                            },
                            isLoad: true
                        }
                    }
         },
          {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Title',
            name: 'title_id',
            forceSelection: true,
            allowBlank: true,
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
                                table_name: 'par_titles'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Is Primary Reporter',
            name: 'is_primary_id',
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
                                        table_name: 'par_confirmations'
                                    }
                                }
                            },
                            isLoad: true
                        }
                    }
        }, 
        {
            xtype: 'textfield',
            fieldLabel: 'Given/First Name',
            name: 'first_name',
            allowBlank: true,
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Family/Last Name',
            name: 'last_name',
            allowBlank: true,
        },{
            xtype: 'textfield',
            fieldLabel: 'Department',
            name: 'department',
            allowBlank: true,
        },{
            xtype: 'textfield',
            fieldLabel: 'Organisation ',
            name: 'organisation',
            allowBlank: true,
        },{
            xtype: 'textfield',
            fieldLabel: 'Street address',
            name: 'physical_address',
            allowBlank: true,
        },

         {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'City',
            name: 'city_id',
            forceSelection: true,
            allowBlank: true,
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
                                table_name: 'par_cities'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
            {
            xtype: 'combo',
            fieldLabel: 'Country',
            name: 'country_id',
            forceSelection: true,
            value:37,
            readOnly:true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setCompStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'parameters/country'
                        }
                    },
                    isLoad: true
                }
                //,

                // change: function (cmbo, newVal) {
                //     var form = cmbo.up('form'),
                //         regionStore = form.down('combo[name=region_id]').getStore(),
                //         filterObj = {country_id: newVal},
                //         filterStr = JSON.stringify(filterObj);
                //     regionStore.removeAll();
                //     regionStore.load({params: {filter: filterStr}});
                // }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'Region',
            name: 'region_id',
            forceSelection: true,
            allowBlank:true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setCompStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'parameters/region'
                        }
                    },
                    isLoad: false
                },
                afterrender: function (cmbo) {
                         var form = cmbo.up('form'),
                         store = cmbo.getStore(),
                         filterObj = {country_id: 37},
                         filterStr = JSON.stringify(filterObj);
                         store.removeAll();
                         store.load({params: {filters: filterStr}});
                      },
                change: function (cmbo, newVal) {
                    var form = cmbo.up('form'),
                        districtStore = form.down('combo[name=district_id]').getStore(),
                        filterObj = {region_id: newVal},
                        filterStr = JSON.stringify(filterObj);
                    districtStore.removeAll();
                    districtStore.load({params: {filter: filterStr}});
                }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'District',
            name: 'district_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            allowBlank:true,
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setCompStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'parameters/district'
                        }
                    },
                    isLoad: false
                }
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Postcode',
            name: 'postal_address',
            allowBlank: true,
        }, {
            xtype: 'textfield',
            fieldLabel: 'Telephone',
            name: 'telephone_no',
            allowBlank: true,
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Email address',
            name: 'email_address',
            allowBlank: true,
          }
        
         ]
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
                    table_name: 'tra_pv_personnel',
                    storeID: 'pvreceiverStr',
                    formBind: true,
                    ui: 'soft-green',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreatePvWin'
                }
            ]
        }
    ]
});