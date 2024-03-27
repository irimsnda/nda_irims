
/**
 * Created by Kip on 1/16/2019.
 */
Ext.define('Admin.view.psur.views.forms.PsurDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'psurdetailsFrm',
    controller: 'psurVctr',
    layout: 'column',
    defaults: {
        columnWidth: 0.33,
        margin: 5,
        labelAlign: 'top',
        allowBlank: false
    },autoScroll: true,
    scrollable: true,
    bodyPadding: 5,
    listeners: {
        afterrender: function () {
            var form = this,
                isReadOnly = form.down('hiddenfield[name=isReadOnly]').getValue();
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                form.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
            }
        }
    },
    items: [ {
            xtype: 'hiddenfield',
            name: 'isReadOnly'
        },{
            xtype:'fieldset',
            columnWidth: 1,
            title: 'Report Details',
            collapsible: true,
            defaults: {
                labelAlign: 'top',
                allowBlank: true,
                labelAlign: 'top',
                margin: 5,
                columnWidth: 0.33,
            },
            layout: 'column',
            items:[{
                xtype: 'combo',
                queryMode: 'local',
                forceSelection: true,
                valueField: 'id',
                displayField: 'name',
                fieldLabel: 'Source of the Report',
                name: 'sourceofpsur_id',
                listeners: {
                    beforerender: {
                        fn: 'setCompStore',
                        config: {
                            pageSize: 100,
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_sourcesofsafety_alerts'
                                }
                            }
                        },
                        isLoad: true
                    }
                }
            },
            {
                xtype: 'combo',
                queryMode: 'local',
                forceSelection: true,
                valueField: 'id',
                displayField: 'name',
                fieldLabel: 'Report Type',
                name: 'psur_type_id',
                listeners: {
                    beforerender: {
                        fn: 'setCompStore',
                        config: {
                            pageSize: 100,
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_psur_type'
                                }
                            }
                        },
                         isLoad: true
                    },
                    change: function(combo, newVal, oldValue, eopts) {
                        if(newVal == 3){
                            var form = combo.up('form'),
                            from_date = form.down('datefield[name=from_date]');
                            from_date.setVisible(false);
                            from_date.allowBlank = true;

                            var to_date = form.down('datefield[name=to_date]');
                            to_date.setVisible(false);
                            to_date.allowBlank = true;

                            var version_no = form.down('textfield[name=version_no]');
                            version_no.setVisible(true);
                            version_no.allowBlank = false;
                            version_no.validate();


                        }else{
                            var form = combo.up('form'),
                            from_date = form.down('datefield[name=from_date]');
                            from_date.setVisible(true);
                            from_date.allowBlank = false;
                            from_date.validate();

                       
                            var to_date = form.down('datefield[name=to_date]');
                            to_date.setVisible(true);
                            to_date.allowBlank = false;
                            to_date.validate();


                            var version_no = form.down('textfield[name=version_no]');
                            version_no.setVisible(false);
                            version_no.allowBlank = true;
                        }
                        
                    }
                   
                }
            },

            {
                xtype: 'textfield',
                fieldLabel: 'Version No:',
                name: 'version_no',
                hidden:true,
                bind:{
                    readOnly: '{isReadOnly}'
                }
            },
            {
                xtype: 'datefield',
                fieldLabel: 'Reporting Period From',
                name: 'from_date',submitFormat: 'Y-m-d',
                format: 'd/m/Y',
                altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'

            },{
                xtype: 'datefield',
                fieldLabel: 'Reporting Period To',
                name: 'to_date',submitFormat: 'Y-m-d',
                format: 'd/m/Y',
                altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
            },{
                xtype: 'datefield',
                fieldLabel: 'International Birth Date',
                name: 'international_birth_date',submitFormat: 'Y-m-d',
                format: 'd/m/Y',
                allowBlank:true,
                altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
            },{
                xtype: 'htmleditor',
                fieldLabel: 'Remarks',
                name: 'remarks',
                columnWidth: 1
            }]
        },{
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
       
        }]

});