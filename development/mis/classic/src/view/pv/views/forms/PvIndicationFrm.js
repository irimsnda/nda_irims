Ext.define('Admin.view.pv.views.forms.PvIndicationFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'pvindicationFrm',
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
            value: 'tra_pv_indication',
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
            title: 'Indication',
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
           items:[  {
                            xtype: 'textfield',
                            columnWidth: 1,
                            fieldLabel: 'Indication (MedDRA)',
                            name: 'indication_medra',
                            allowBlank: true,
                        },
                     {
                            xtype: 'textfield',
                            columnWidth: 1,
                            fieldLabel: 'Indication as reported by initial reporter',
                            name: 'indication',
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
                    table_name: 'tra_pv_indication',
                    storeID: 'pvIndicationgridstr',
                    formBind: true,
                    ui: 'soft-green',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreatePvWin'
                }
            ]
        }
    ]
});