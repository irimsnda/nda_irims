

Ext.define('Admin.view.gmpapplications.views.forms.ProductLineAbstractFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'productlineabstractfrm',
    controller: 'gmpapplicationsvctr',
    frame: true,
    layout: {
        type: 'form'
    },
    bodyPadding: 5,
    defaults: {
        margin: 5,
        allowBlank: false
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'gmp_productline_details'
        },
        {
            xtype: 'hiddenfield',
            name: 'manufacturing_site_id'
        },
        {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Pharmaceutical Dosage Form',
            name: 'product_line_id',
            store: 'gmpproductlinesstr',
            forceSelection: true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id'
        },
        {
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Product Line Category',
            name: 'category_id',
            store: 'gmpproductlinecategoriesstr',
            forceSelection: true,
            allowBlank: true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id'
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Dosage Form Description',
            allowBlank: true,
            name: 'prodline_description',
          
        }, {
            xtype: 'combo',
            fieldLabel: 'Manufacturing Activities',
            name: 'manufacturing_activity_id',
            forceSelection: true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            listeners: {
                beforerender: {
                    fn: 'setGmpApplicationCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_manufacturing_activities'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype: 'combo', 
            anyMatch: true,
            fieldLabel: 'Inspection Recommendation',
            name: 'prodline_inspectionstatus_id',
            store: 'gmpproductlinestatusstr',
            forceSelection: true,
            allowBlank: true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id'
        }
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Save Details',
            ui: 'soft-blue',
            iconCls: 'x-fa fa-save',
            formBind: true,
            table_name: 'gmp_product_details',
            storeID: 'productlinedetailsstr',
            action_url: 'gmpapplications/saveGmpInspectionLineDetails',
            handler: 'doCreateGmpApplicationParamWin'
        },
        {
            xtype: 'button',
            text: 'Reset',
            ui: 'soft-blue',
            iconCls: 'x-fa fa-close',
            handler: function () {
                this.up('form').getForm().reset();
            }
        }
    ]

});
