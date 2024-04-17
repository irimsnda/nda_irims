

/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.forms.common_forms.PersonalUsePermitsProductsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'personalusepermitsproductsfrm',
    itemId: 'personalusepermitsproductsfrm',
    scrollable:true,
    autoscroll:true,
    layout: {
        type: 'column',
        columns: 1
    },
    bodyPadding: 5,
    controller: 'importexportpermitsvctr',
    defaults: {
        margin: 5,
        labelAlign: 'right',
        width: '100%',
        columnWidth: 1,
        labelAlign: 'top',
        allowBlank: false,
        bind: {
            readOnly: '{isReadOnly}'  // negated
        }
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'id',
        allowBlank: true
    },{
        xtype: 'hiddenfield',
        name: 'table_name',
        value: 'tra_permits_products'
    },{
        xtype: 'hidden',
        name: '_token',
        value: token
    },{
        xtype: 'combo',
        fieldLabel: 'Product Category',
        allowBlank: false,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'product_category_id',
        queryMode: 'local',bind: {
            readOnly: '{isReadOnly}'
        },
        listeners: {
            beforerender: {
                fn: 'setConfigCombosSectionfilterStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_importexport_product_category',
                            has_filter: 0
                        }
                    }
                },
                isLoad: false
            },
            afterrender: function (cmbo) {
                var store = cmbo.getStore(),
                filterObj = {is_personal_id: 1},
                filterStr = JSON.stringify(filterObj);
                store.removeAll();
                store.load({params: {filters: filterStr}});
            }
        }
    },{
        xtype: 'textfield',
        name: 'permitbrand_name',
        fieldLabel: 'Brand Name/Devices Name',
    },{
        xtype: 'textfield',
        name: 'permitcommon_name',
        hidden:true,
         allowBlank: true,
        fieldLabel: 'Common Name',
    },{
        xtype: 'combo',
        fieldLabel: 'Generic/Common Name',
        allowBlank: true,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'common_name_id',
        queryMode: 'local',bind: {
            readOnly: '{isReadOnly}'
        },
        listeners: {
            beforerender: {
                fn: 'setConfigCombosSectionfilterStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getNonrefParameter',
                        extraParams: {
                            table_name: 'par_common_names',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            }
        }
    }, {
        xtype: 'numberfield',
        name: 'quantity',bind: {
            readOnly: '{isReadOnly}'
        },
        allowBlank: true,
        fieldLabel: 'Quantity',
    },{
        xtype: 'numberfield',
        name: 'unit_price',bind: {
            readOnly: '{isReadOnly}'
        },
        allowBlank: true,
        fieldLabel: 'Unit Price',
    },{
        xtype: 'combo',
        fieldLabel: ' Currency',
        valueField: 'id',
        displayField: 'name',bind: {
            readOnly: '{isReadOnly}'
        },
        allowBlank: true,
        forceSelection: true,
        name: 'currency_id',
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosSectionfilterStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getNonrefParameter',
                        extraParams: {
                            table_name: 'par_currencies',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        xtype:'textarea',
        name:'batch_numbers',
        fieldLabel:'Batch Number',
        allowBlank: true,
        bind: {
            readOnly: '{isReadOnly}'
        }

    }],
    buttons:[{
        text:'Save Permit Product Details',
        iconCls: 'fa fa-save',
        margin: 5,
        store:'personalusepermitsproductsgridstr',
        action_url: 'importexportpermits/onSavePersonalUsePermitProductsDetails',
        action:'btn_savepermitproducts'
    },{
        text:'Close',
        iconCls: 'fa fa-window-close',
        handler:function(btn){
                var win = btn.up('window');

                    win.close();

        }
    }]
});