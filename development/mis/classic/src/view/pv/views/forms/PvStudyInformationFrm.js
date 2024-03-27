Ext.define('Admin.view.pv.views.forms.PvStudyInformationFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'pvstudyinformationFrm',
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
            value: 'tra_pv_study_information',
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
            title: 'Study Information',
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
            xtype: 'combo', anyMatch: true,
            fieldLabel: 'Study type',
            name: 'study_type_id',
            columnWidth: 1,
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
                                table_name: 'par_adr_study_types'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'textfield',
            columnWidth: 0.5,
            fieldLabel: 'Study name',
            name: 'study_name',
            allowBlank: true,
        },
        {
            xtype: 'textfield',
            columnWidth: 0.5,
            fieldLabel: 'Study sponsor number',
            name: 'sponsor_number',
            allowBlank: true,
        },
        {
               xtype: 'fieldcontainer',
                columnWidth: 1,
                fieldLabel: ' ',
                hideLabel: true,
                layout: 'fit',
                items:[{
                xtype: 'pvstudydetailsGrid'

             }
          ]
        },{
            xtype: 'htmleditor',
            fieldLabel: 'Comments',
            columnWidth: 1,
            name: 'remarks',
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
                    table_name: 'tra_pv_study_information',
                    storeID: 'pvStudyInformationStr',
                    formBind: true,
                    ui: 'soft-green',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreatePvWin'
                }
            ]
        }
    ]
});