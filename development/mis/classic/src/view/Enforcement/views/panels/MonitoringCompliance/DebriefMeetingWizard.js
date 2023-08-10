Ext.define('Admin.view.Enforcement.views.panels.MonitoringCompliance.DebriefMeetingWizard', {
    extend: 'Ext.panel.Panel',
    xtype: 'debriefMeetingWizard',
    controller: 'enforcementvctr',
    height: Ext.Element.getViewportHeight() - 118,
    layout: {
        // layout-specific configs go here
        type: 'accordion',
        titleCollapse: true,
        animate: true,
        activeOnTop: false
    },
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        ui: 'footer',
        height: 35,
        height: 60,
        defaults: {
            labelAlign: 'top',
            margin: '-12 5 0 5',
            labelStyle: "color:#595959;font-size:13px"
        },
        items: ['->', {
            xtype: 'displayfield',
            name: 'process_name',
            fieldLabel: 'Process',
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold',
                'font-size': '12px'
            }
        }, {
                xtype: 'tbseparator',
                width: 20
            }, {
                xtype: 'displayfield',
                name: 'workflow_stage',
                fieldLabel: 'Workflow Stage',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px'
                }
            }, {
                xtype: 'tbseparator',
                width: 20
            }, {
                xtype: 'displayfield',
                name: 'application_status',
                fieldLabel: 'App Status',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px'
                }
            }, {
                xtype: 'tbseparator',
                width: 20
            }, {
                xtype: 'displayfield',
                name: 'tracking_no',
                fieldLabel: 'Tracking No',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px'
                }
            }, {
                xtype: 'displayfield',
                name: 'reference_no',
                fieldLabel: 'Ref No',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px'
                }
            }, {
                xtype: 'hiddenfield',
                name: 'process_id'
            }, {
                xtype: 'hiddenfield',
                name: 'workflow_stage_id'
            }, {
                xtype: 'hiddenfield',
                name: 'active_application_id'
            }, {
                xtype: 'hiddenfield',
                name: 'active_application_code'
            }, {
                xtype: 'hiddenfield',
                name: 'application_status_id'
            }, {
                xtype: 'hiddenfield',
                name: 'module_id'
            }, {
                xtype: 'hiddenfield',
                name: 'sub_module_id'
            }, {
                xtype: 'hiddenfield',
                name: 'section_id'
            }, {
                xtype: 'hiddenfield',
                name: 'applicant_id'
            }, {
                xtype: 'hiddenfield',
                name: 'application_code'
            }, {
                xtype: 'hiddenfield',
                name: 'prodclass_category_id'
            }, {
                xtype: 'hiddenfield',
                name: 'product_id'
            },{
                name: 'premise_id',
                xtype: 'hiddenfield'
            },{
                name: 'manufacturing_site_id',
                xtype: 'hiddenfield'
            },{
                name: 'gmp_type_id',
                xtype: 'hiddenfield'
            },{
                name: 'meeting_id',
                xtype: 'hiddenfield'
            }
        ]
    }
    ],
    items: [{
        xtype: 'meetingdetailsfrm',
        title: 'Meeting Details',
        is_meeting: 1,//on all tcmeetingparticipantsgrid to differentiate when called from meeting/schedule
        header: {
            style: {
                backgroundColor: '#2eadf5'
            }
        },
    },{
        xtype: 'debriefApplicationGrid',
        itemId: 'application_list',//included to identifly the specific grid globaly
        is_meeting: 1,//on all tcmeetingparticipantsgrid to differentiate when called from meeting/schedule
        reference: 'application_list',
        title: 'Cases Ready For the Meeting',
        header: {
            style: {
                backgroundColor: '#2eadf5'
            }
        },
    },{
        xtype: 'tcdebriefmeetingparticipantsgrid',
        is_meeting: 1,//on all tcmeetingparticipantsgrid to differentiate when called from meeting/schedule
        title: 'Participants Details',
        header: {
            style: {
                backgroundColor: '#2eadf5'
            }
        },
    }],
    initComponent: function () {
        var me = this;
        this.bbar = {
            reference: 'navigation-toolbar',
            ui: 'footer',
            items: ['->',{
                        xtype: 'button',
                        text: 'Meeting Documents',
                        iconCls: 'x-fa fa-upload',
                        ui: 'soft-blue',
                        name: 'save_btn',
                        reference_table_name: 'tc_meeting_details',
                        table_name: 'tc_meeting_uploaddocuments',
                        handler: 'funcUploadTCMeetingtechnicalDocuments',
                        document_type_id: 4,
                        childXtype:'unstructureddocumentuploadsgrid',
                        winTitle: 'Technical Meeting Documents Upload',
                        winWidth: '80%',
                        toaster: 0
                    },
                {
                    text: 'Submit Application',
                    ui: 'soft-blue',
                    iconCls: 'fa fa-check',
                    disabled: true,
                    name: 'process_submission_btn',
                    storeID: 'caseListGridStr',
                    table_name: '',
                    winWidth: '50%'
                }
            ]
        };
        me.callParent(arguments);
    }
});