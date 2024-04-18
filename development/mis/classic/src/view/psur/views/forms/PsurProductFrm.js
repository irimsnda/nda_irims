
Ext.define('Admin.view.pv.views.forms.PsurProductFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'psurformFrm',
    controller: 'psurVctr',
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
            value: 'tra_product_notification_details',
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
            name: 'psur_id'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        {
            xtype:'fieldset',
            columnWidth: 1,
            title: 'Report Products Details',
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
            items:[{
                xtype: 'combo',
                fieldLabel: 'Is Registered',
                name: 'is_registered_product',
                forceSelection: true,
                allowBlank: false,
                queryMode: 'local',
                valueField: 'id',
                displayField: 'name',
                listeners: {
                    beforerender: {
                        fn: 'setCompStore',
                        config: {
                            pageSize: 10000,
                            storeId: 'ctrclassificationsStr',
                            proxy: {
                                url: 'configurations/getConfigParamFromTable',
                                extraParams: {
                                    table_name: 'par_confirmations'
                                }
                            }
                        },
                        isLoad: true
                    },
                    change:function(combo,value){
                        link_registered_product_btn=combo.up('form').down('button[name=link_registered_product]');
                        if(value==1)
                        {
                            link_registered_product_btn.setDisabled(false);
                        }
                        else{

                            link_registered_product_btn.setDisabled(true);
                        }


                    }
                }
            },{
                xtype: 'fieldcontainer',
                layout: 'column', 
               
                defaults: {
                    labelAlign: 'top',
                   
                },
                items:[{
                        xtype: 'textfield',
                        fieldLabel: 'Registration No',
                        columnWidth: 0.9,
                        readOnly: true,
                        name: 'product_registration_no',allowBlank: true,
                        bind:{
                            readOnly: '{isReadOnly}'
                        }
                    },{
                        bind:{disabled:'readOnly'},
                        xtype: 'button',
                        iconCls: 'x-fa fa-link',
                        columnWidth: 0.1,
                        tooltip: 'Link Applicant',
                        name: 'link_registered_product',
                        disabled:true,
                        handler: 'showRegistererdProductSelectionList',
                        
                    }
                ]
            },{
                xtype: 'textfield',
                fieldLabel: 'Trade/Brand Name',
                name: 'brand_name',
                bind:{
                    readOnly: '{isReadOnly}'
                }
            },{
                xtype: 'textfield',
                fieldLabel: 'Generic Name',
                name: 'generic_name',
                bind:{
                    readOnly: '{isReadOnly}'
                }
            },{
                xtype: 'combo',
                queryMode: 'local',
                forceSelection: true,
                valueField: 'id',
                displayField: 'name',
                fieldLabel: 'Product Type',
                name: 'product_type_id',
                listeners: {
                    beforerender: {
                        fn: 'setCompStore',
                        config: {
                            pageSize: 100,
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_sections'
                                }
                            }
                        },
                        isLoad: true
                    }
                }
            },{
                xtype: 'combo',
                fieldLabel: 'Dosage Form',
                forceSelection: true,
                displayField: 'name',
                valueField: 'id',
                queryMode: 'local',allowBlank: true,
                name: 'dosage_form_id',
                listeners:{
                    beforerender: {
                        fn: 'setCompStore',
                        config: {
                            pageSize: 1000,
                            storeId: 'ctrdosageformstr',
                            proxy: {
                                url: 'configurations/getConfigParamFromTable',
                                extraParams: {
                                    table_name: 'par_dosage_forms'
                                }
                            }
                        },
                        isLoad: true
                    },
                }
            },{
                xtype: 'textfield',
                fieldLabel:'Product Strength',
                 allowBlank: true,
                name: 'product_strength',
                bind:{
                    readOnly: '{isReadOnly}',
                }
            },{
                xtype: 'textfield',
                fieldLabel:'Marketing Authorisation Holder',
                allowBlank: true,
                name: 'marketing_authorisation_holder',
                bind:{
                    readOnly: '{isReadOnly}',
                }
            }, {
                xtype: 'textfield',
                fieldLabel:'Marketing Authorisation Address',
                 allowBlank: true,
                name: 'marketing_authorisation_address',
                bind:{
                    readOnly: '{isReadOnly}',
                }
            }, {
                xtype: 'textfield',
                fieldLabel:'Local Technical Representative Address',
                 allowBlank: true,
                name: 'local_technical_representative',
                bind:{
                    readOnly: '{isReadOnly}',
                }
            }, {
                xtype: 'fieldcontainer',
                layout: 'column',
                defaults: {
                    labelAlign: 'top'
                },
                fieldLabel: 'Manufacturer',
                items: [
                    {
                        xtype: 'combo',
                        name: 'manufacturer_id',
                        forceSelection: true,
                        queryMode: 'local',
                        anyMatch: true,
                        valueField: 'manufacturer_id',
                        displayField: 'manufacturer_name',
                        columnWidth: 0.9,
                        listeners: {
                            beforerender: {
                                fn: 'setCompStore',
                                config: {
                                    pageSize: 1000,
                                    storeId: 'manufacturersConfigStr',
                                    proxy: {
                                        url: 'productregistration/onLoadManufacturersDetails'
                                    }
                                },
                                isLoad: true
                            }
                        }
                    },
                    {
                        xtype: 'button',
                        iconCls: 'x-fa fa-plus',
                        columnWidth: 0.1,
                        tooltip: 'add manufacturer',
                        childXtype: 'manufacturerConfigFrm',
                        stores: 'manufacturersConfigStr',
                        winTitle: 'Manufacturer Selection List',
                        winWidth: '70%',
                        handler: 'showAddConfigParamWinFrm'
                    }
                ]
            }]
       
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
                    table_name: 'tra_product_notification_details',
                    storeID: 'psurproductStr',
                    formBind: true,
                    ui: 'soft-green',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreatePsurWin'
                }
            ]
        }
    ]
});