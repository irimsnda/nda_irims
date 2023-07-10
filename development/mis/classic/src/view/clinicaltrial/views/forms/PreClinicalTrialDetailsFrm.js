
Ext.define('Admin.view.clinicaltrial.views.forms.PreClinicalTrialDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'preclinicaltrialdetailsfrm',
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
    items: [
        {
            xtype: 'hiddenfield',
            name: 'isReadOnly'
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Study Title',
            name: 'study_title',
            columnWidth: 1
        },
        {
            xtype: 'textarea',
            columnWidth: 1,
            fieldLabel: 'Brief summary describing the background and objectives of trial',
            name: 'clinicaltrial_description'
        },
        {
            xtype:'fieldcontainer',
            layout: {
                type: 'hbox'
            }, margin: 0,
            defaults: {
                labelAlign: 'top',
                margin: 5
                //,allowBlank: false
            },
            items:[{
                xtype: 'datefield',
                fieldLabel: 'Proposed Meeting Date',labelAlign: 'top',
                name: 'meeting_date',
                submitFormat: 'Y-m-d',
                format: 'd/m/Y',width: '60%',
                altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
                bind: {
                    readOnly: '{isReadOnly}'  // negated
                }
            },{
                xtype: 'timefield',
                fieldLabel:'Meeting Time',
                labelAlign: 'top',
                name: 'meeting_time',
                format: 'H:i',
                // allowBlank:true,
                altFormats:'H:i',
                increment: 30,width: '40%',
                bind: {
                    readOnly: '{isReadOnly}'  // negated
                }
            }]
        },{
            xtype: 'combo',
            name: 'meeting_type_id',
            fieldLabel: 'Meeting Type',
            queryMode: 'local',
            forceSelection: true,
            // allowBlank: true,
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
                                table_name: 'par_meeting_types'
                            }
                        }
                    },
                    isLoad: true
                },
                change:function(cbo, newValue){
                        var form = cbo.up('form');

                        if(newValue ==1){
                            form.down('textfield[name=meeting_venue]').setVisible(true);
                            form.down('textfield[name=meeting_invitation_details]').setVisible(false);
                        }else{
                            form.down('textfield[name=meeting_venue]').setVisible(false);
                            form.down('textfield[name=meeting_invitation_details]').setVisible(true);
                        }

                }
            }
        },{
            xtype: 'textfield',
            fieldLabel: 'Meeting Venue',
            columnWidth: 0.99,
            name: 'meeting_venue', 
            allowBlank: true,
            bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },{
            xtype: 'textfield',
            fieldLabel: 'Meeting Invitation Details(Copy & Paste the Meeting Invitation Details & link) ', columnWidth: 0.99,
            name: 'meeting_invitation_details', 
             hidden: true,
             allowBlank: true,
            bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },
    ]
});