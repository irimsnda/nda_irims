
/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.forms.drugs.DrugsProductPackagingFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'drugsProductPackagingFrm',
    
    layout: {
        type: 'vbox'
    },
    bodyPadding: 5,
    controller: 'productregistrationvctr',
    defaults: {
        margin: 5,
        labelAlign: 'top',
        width: '100%',
        allowBlank: false,
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'id',
        allowBlank: true
    },
    {
        xtype: 'hiddenfield',
        name: 'product_id'
    }, {
        xtype: 'hiddenfield',
        name: 'table_name',
        value: 'tra_product_packaging'
    },{
        xtype: 'combo',
        name: 'container_type_id',
        allowBlank: true,
        fieldLabel: 'Container Type',
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
                            table_name: 'par_containers_types'
                        }
                    }
                },
                isLoad: true
            }
        }
    }, {
        xtype: 'combo',
        name: 'container_id',
        allowBlank: true,
        fieldLabel: 'Container',
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
                            table_name: 'par_containers'
                        }
                    }
                },
                isLoad: true
            }
        }
    },
    {
        xtype: 'combo',
        name: 'container_material_id',
        allowBlank: true,
        queryMode: 'local',
        fieldLabel: 'Container Material',
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
                            table_name: 'par_containers_materials'
                        }
                    }
                },
                isLoad: true
            }
        }
    }, {
        xtype: 'combo',
        name: 'closure_material_id',
        allowBlank: true,
        queryMode: 'local',
        fieldLabel: 'Closure Material',
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
                            table_name: 'par_closure_materials'
                        }
                    }
                },
                isLoad: true
            }
        }
    },
    //  {
    //     xtype: 'textfield',
    //     name: 'retail_packaging_size',
    //     allowBlank:true,
    //     fieldLabel:'Retail Pack Size (No Of Units In a Pack)'  ,
    //     columnwidth: 0.05
    // }
    {
                xtype:'fieldcontainer',
                layout: {
                    type: 'column'
                },
                defaults:{
                    columnWidth: 0.33,
                    labelAlign: 'top'
                },
                items:[
                    {
                        xtype: 'textfield',
                        fieldLabel: 'No Of Units',
                        name: 'no_of_units',
                        allowBlank: false
                    },{
                        xtype: 'textfield',
                        fieldLabel: 'No of Packs',
                        name: 'no_of_packs',
                        allowBlank: false
                    },
                    {
                        xtype: 'combo',
                        name: 'si_unit_id',
                        fieldLabel: "SI Unit",
                        queryMode: 'local',
                        forceSelection: true,
                        allowBlank: true,
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
                                            table_name: 'si_units'
                                        }
                                    }
                                },
                                isLoad: true
                            }
                        }
                 }
                ]
            } 

    ],

    dockedItems: [{
        xtype: 'toolbar',
        ui: 'footer',
        dock: 'bottom',
        items: [
            '->', {
                text: 'Save Packaging Details',
                iconCls: 'x-fa fa-save',
                action: 'save',
                table_name: 'tra_product_packaging',
                storeID: 'drugproductPackagingdetailsstr',
                formBind: true,
                ui: 'soft-purple',
                action_url: 'productregistration/onSaveProductOtherDetails',
                handler: 'saveproductOtherdetails'
            }
        ]
    }
    ]
});