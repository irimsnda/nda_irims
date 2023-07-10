
Ext.define('Admin.view.clinicaltrial.views.forms.PreSubmissionEvaluationFrm', {
    extend: 'Ext.form.Panel',
    scrollable:true,
    xtype: 'presubmissionevaluationfrm',
    viewModel:'clinicaltrialvm',
    controller: 'clinicaltrialvctr',
    frame: true,
    bodyPadding: 5,
    layout: 'column',
    defaults: {
        columnWidth: 0.5,
        labelAlign: 'top',
        margin: 4,
        allowBlank: false
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'isReadOnly'
        },
        {
            xtype: 'hiddenfield',
            name: 'evaluation_record_id'
        },

        
        {
            xtype: 'textarea',
            fieldLabel: 'Study Title',
            name: 'study_title',
            readOnly:true,
            columnWidth: 1
        },
        {
            xtype: 'textarea',
            columnWidth: 1,
            allowBlank:true,
            readOnly:true,
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
                margin: 5,
                readOnly:true,
                allowBlank: false
            },
            items:[{
                xtype: 'datefield',
                fieldLabel: 'Proposed Meeting Date',labelAlign: 'top',
                name: 'meeting_date',
                submitFormat: 'Y-m-d',
                readOnly:true,
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
                allowBlank:true,
                readOnly:true,
                altFormats:'H:i',
                increment: 30,width: '40%',
                bind: {
                    readOnly: '{isReadOnly}'  // negated
                }
            }]
        },
        {
            xtype: 'combo',
            name: 'meeting_type_id',
            fieldLabel: 'Meeting Type',
            queryMode: 'local',
            forceSelection: true,
            allowBlank: true,
            readOnly:true,
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
            readOnly:true,
            name: 'meeting_venue', allowBlank: true,
            bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },{
            xtype: 'textfield',
            fieldLabel: 'Meeting Invitation Details(Copy & Paste the Meeting Invitation Details & link) ', columnWidth: 0.99,
            name: 'meeting_invitation_details',  hidden: true,
            allowBlank: true,
            readOnly:true,
            bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        }, 
         {
                xtype: 'combo',
                fieldLabel: 'Okay with Proposed Meeting Date?',
                name: 'meeting_date_okay',
                columnWidth: 1,
                allowBlank: true,
                valueField: 'id',
                displayField: 'name',
                forceSelection: true,
                queryMode: 'local',
                listeners: {
                    beforerender: {
                        fn: 'setConfigCombosStore',
                        config: {
                            pageSize: 1000,
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_confirmations'
                                }
                            }
                        },
                        isLoad: true
                    },
                    change: function(combo, newVal, oldValue, eopts) {
                        if(newVal == 1){

                            var form = combo.up('form'),
                            preferedDate = form.down('datefield[name=preferred_meeting_date]');
                            preferedDate.setVisible(false);
                            preferedDate.allowBlank = true;
                            preferedDate.validate();
                            preferedTime = form.down('timefield[name=preferred_meeting_time]');
                            preferedTime.setVisible(false);
                            preferedTime.allowBlank = true;
                            preferedTime.validate();
                            preferedMeetingType = form.down('combo[name=preferred_meeting_type_id]');
                            preferedMeetingType.setVisible(false);
                            preferedMeetingType.allowBlank = true;
                            preferedMeetingType.validate();
                        }else{

                            var form = combo.up('form'),
                            preferedDate = form.down('datefield[name=preferred_meeting_date]');
                            preferedDate.setVisible(true);
                            preferedDate.allowBlank = false;
                            preferedDate.validate();
                            preferedTime = form.down('timefield[name=preferred_meeting_time]');
                            preferedTime.setVisible(true);
                            preferedTime.allowBlank = false;
                            preferedTime.validate();
                            preferedMeetingType = form.down('combo[name=preferred_meeting_type_id]');
                            preferedMeetingType.setVisible(true);
                            preferedMeetingType.allowBlank = false;
                            preferedMeetingType.validate();
                            
                        }
                        
                    }
                   
                }
        },
         {
            xtype:'fieldcontainer',
            layout: {
                type: 'hbox'
            }, margin: 0,
            defaults: {
                labelAlign: 'top',
                margin: 5,
                allowBlank: false
            },
            items:[{
                xtype: 'datefield',
                fieldLabel: 'Preferred Meeting Date',
                labelAlign: 'top',
                name: 'preferred_meeting_date',
                hidden: true,
                submitFormat: 'Y-m-d',
                format: 'd/m/Y',width: '60%',
                altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
                bind: {
                    readOnly: '{isReadOnly}'  // negated
                }
            },{
                xtype: 'timefield',
                fieldLabel:'Preferred Meeting Time',
                labelAlign: 'top',
                hidden: true,
                name: 'preferred_meeting_time',
                format: 'H:i',
                altFormats:'H:i',
                increment: 30,width: '40%',
                bind: {
                    readOnly: '{isReadOnly}'  // negated
                }
            }]
        },{
            xtype: 'combo',
            name: 'preferred_meeting_type_id',
            fieldLabel: 'Preferred Meeting Type',
            queryMode: 'local',
            hidden: true,
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
                            form.down('textfield[name=preferred_meeting_venue]').setVisible(true);
                            form.down('textfield[name=preferred_meeting_invitation_details]').setVisible(false);
                        }else{
                            form.down('textfield[name=preferred_meeting_venue]').setVisible(false);
                            form.down('textfield[name=preferred_meeting_invitation_details]').setVisible(true);
                        }

                }
            }
        },{
            xtype: 'textfield',
            fieldLabel: 'Preferred Meeting Venue',
            columnWidth: 0.99,
            hidden: true,
            name: 'preferred_meeting_venue', 
            allowBlank: true,
            bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },{
            xtype: 'textfield',
            fieldLabel: 'Preferred Meeting Invitation Details(Copy & Paste the Meeting Invitation Details & link) ', columnWidth: 0.99,
            name: 'preferred_meeting_invitation_details', 
             hidden: true,
            allowBlank: true,
            bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },

        {
            xtype: 'textarea',
            name: 'remarks',
            columnWidth: 1,
            fieldLabel: 'Remarks',
            allowBlank: true
        }
        
    ],
    buttons: [
        {
            text: 'Save Assessment Details',
            iconCls: 'x-fa fa-save',
            formBind: true,
            ui: 'soft-purple',
            handler: 'doSaveEvaluationDetails',
            storeId: ' ',
            action_url: 'clinicaltrial/saveEvaluationDetails',
            table_name: 'tra_clinicaltrrial_assessment_report',
        }
    ]
});