Ext.define('Admin.view.pv.views.forms.PvDrugHistoryFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'pvdrughistoryFrm',
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
            value: 'tra_pv_drug_history',
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
            title: 'Drug History',
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
                    xtype: 'htmleditor',
                    fieldLabel:'Previous Medication',
                    name: 'previous_medication',
                    grow: true, 
                    columnWidth: 1,
                    growMax: 200, 
                    allowBlank: false,
         },
        {
            xtype:'fieldset',
            columnWidth: 1,
            itemId: 'main_fieldset',
            title: 'WHODrug',
            collapsible: true,
            defaults: {
                labelAlign: 'top',
                allowBlank: true,
                labelAlign: 'top',
                margin: 5,
                xtype: 'textfield'
            },
            layout: 'column',
            items:[
              {
                    xtype: 'htmleditor',
                    fieldLabel:'Previous Medication(WHODrug)',
                    name: 'previous_medication_whodrug',
                    grow: true, 
                    columnWidth: 1,
                    growMax: 200, 
                    allowBlank: false,
                }
                ]
            },
        {
            xtype: 'textfield',
            columnWidth: 0.5,
            fieldLabel: 'Indication MedDRA',
            name: 'indication_meddra',
            allowBlank: true,
        },
          {
            xtype: 'textfield',
            columnWidth: 0.5,
            fieldLabel: 'Reaction MedDRA',
            name: 'reaction_meddra',
            allowBlank: true,
        },{
            xtype: 'datefield',
            fieldLabel: 'Start date',
            format: 'Y-m-d',
            columnWidth: 0.5,
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
            name: 'start_date',
            maxValue: new Date()
        },{
            xtype: 'datefield',
            fieldLabel: 'End date',
            format: 'Y-m-d',
            columnWidth: 0.5,
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
            name: 'end_date'
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
                    table_name: 'tra_pv_drug_history',
                    storeID: 'pvDrugHistoryStr',
                    formBind: true,
                    ui: 'soft-green',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreatePvWin'
                }
            ]
        }
    ]
});