/**
 * Created by softclans

 */
Ext.define('Admin.view.importexportpermits.views.sharedinterfaces.panels.ImportExportLicenceValuationPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'importexportlicencevaluationpnl', 
     permitsdetails_panel: 'previewimportexportpermitdetails',
    itemId: 'main_processpanel',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'wizardpnl',
    layout: 'card',
    //bodyPadding: 3,
    flex: 1,
    autoScroll: true,
    cls: 'wizard three shadow',
    colorScheme: 'soft-green',
    controller: 'importexportpermitsvctr',
    viewModel: 'importexportpermitsvm',
    
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        ui: 'footer',
        height: 40,
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
                    'font-size': '12px',  'margin-top': '-2px'
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
                    'font-size': '12px',  'margin-top': '-2px'
                }
            }, {
                xtype: 'tbseparator',
                width: 20
            }, {
                xtype: 'displayfield',
                name: 'application_status',
                hidden: true,
                fieldLabel: 'App Status',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px',  'margin-top': '-2px'
                }
            }, {
                xtype: 'tbseparator',
                width: 20
            },{
                xtype: 'displayfield',
                name: 'tracking_no',
               
                fieldLabel: 'Tracking No',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px',  'margin-top': '-2px'
                }
            },  {
                xtype: 'displayfield',
                name: 'reference_no',
               
                fieldLabel: 'Ref No',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px',  'margin-top': '-2px'
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
            },{
                xtype: 'hiddenfield',
                name: 'active_application_code'
            }, {
                xtype: 'hiddenfield',
                name: 'application_status_id'
            },{
                xtype: 'hiddenfield',
                name: 'module_id'
            }, {
                xtype: 'hiddenfield',
                name: 'sub_module_id'
            }, {
                xtype: 'hiddenfield',
                name: 'section_id'
            }
            ]
        }
    ],
    items: [{
            xtype:'tabpanel',
            layout: 'fit',
            title: 'Application Details',
            items:[{
                xtype: 'panel',
                autoScroll: true, 
                itemId:'permitsdetails_panel', 
                viewModel: 'importexportpermitsvm',
                title: 'Application Details',
                items:[{
                    xtype: 'importexportapplicantdetailsfrm',
                    collapsible: true,
                    title: 'APPLICANT DETAILS'
                },{
                    xtype: 'importexportdetailsfrm',
                    autoScroll: true,
                    collapsible: true,
                    title: 'Application Details', 
                },  {
                    xtype: 'senderreceiverdetailsfrm',collapsible: true,
                    hidden: true,
                    title: 'Sender/Receiver Details',
                },
                {
                    xtype: 'importexportpremisesfrm',collapsible: true,
                    title: 'Business Details',
                }],
                bbar:[{
                    text: 'Update Permit Application Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
                    action_url: 'importexportpermits/onSavePermitinformation',
                    handler: 'savePermitInformation'
                }]

            },{
                xtype: 'panel',
                title: 'Uploaded Application Documents',
                xtype: 'previewpermitdocuploadsgrid'
            }]
        },
        {
            xtype: 'productscreeninggrid',
            title: 'Application Screening & Recommendation',
            listeners:{
                beforerender:function(grid){
                    btn = grid.down('button[name=raise_checklist_query]');
                    btn.setVisible(false);
                }
            }
        },{
            title: 'Other Details',
            region: 'east',
            width: 400,
            collapsed: true,
            collapsible: true,
            titleCollapse: true,
            items: [
                {
                    xtype: 'form',
                    bodyPadding: 5,
                    defaults: {
                        margin: 2,
                        labelAlign: 'top'
                    },
                    fieldDefaults: {
                        fieldStyle: {
                            'color': 'green',
                            'font-weight': 'bold'
                        }
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Applicant Details',
                            name: 'applicant_details'
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Premises Details',
                            name: 'premises_details'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'hiddenfield',
            name: 'active_application_id'
        }
    ],
    initComponent: function () {
        var me = this;
        this.tbar = {
            reference: 'progress',
            itemId: 'progress_tbar',
            defaultButtonUI: 'wizard-' + this.colorScheme,
            cls: 'wizardprogressbar',
            style: {
                "background-color": "#90c258"
            },
            bodyStyle: {
                "background-color": "#90c258"
            },
            layout: {
                pack: 'center'
            },
            items: [
                {
                    step: 0,
                    iconCls: 'fa fa-user',
                    enableToggle: true,
                    pressed: true,
                    text: 'Application Details',
                    iconAlign: 'top',
                    action: 'quickNav',max_step:1,
                    wizard: 'importexportlicencevaluationpnl',
                    handler: 'quickScreeningNavigation'
                },
                 {
                    step: 1,
                    iconCls: 'fa fa-university',
                    enableToggle: true,iconAlign: 'top',
                    text: 'Application Screening & Recommendation',
                    max_step:1,
                    action: 'quickNav', wizard: 'importexportlicencevaluationpnl',
                    handler: 'quickScreeningNavigation'
                }
            ]
        };
        this.bbar = {
            reference: 'navigation-toolbar',
            ui: 'footer',
            items: [
                {
                    xtype: 'transitionsbtn'
                },{
                    text: 'Preview & Edit Permit Details(Preview Option)',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-edit',
                    hidden: true,
                    isReadOnly: 0,
                    winTitle: 'Preview & Edit Permit Details',
                    winWidth: '60%',
                    name: 'more_app_details',
                    stores: '[]'
                },
                {
                    text: 'Documents/Reports(Preview Option)',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-upload',
                    hidden: true,
                    childXtype: 'importexportdocuploadsgrid',
                    winTitle: 'Screening Documents',
                    winWidth: '80%',
                    handler: 'showApplicationEvaluationUploads',
                    stores: '[]',
                    isWin: 1
                },
                '->',
                {
                    text: 'Previous',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-arrow-left',
                    bind: {
                        disabled: '{atBeginning}'
                    },max_step:1,
                    wizard:'importexportlicencevaluationpnl',
                    handler: 'onPrevScreeningCardClick'
                },{
                    xtype: 'button',
                    text: "Raise/View Query & Responses(Request for Information)",
                    tooltip: 'Raise Query/View Query(Request for Information) and query Responses',
                    ui: 'soft-green',
                    handler: 'showAddApplicationUnstrcuturedQueries',
                },
                
            //     {
                    
            //         //text: 'Review & Approval Recommendation',
            //         text: 'Approval Recommendation1',
            //         ui: 'soft-purple',
            //         iconCls: 'fa fa-check',
            //         ui: 'soft-purple',
            //         iconCls: 'fa fa-sliders',
            //         menu: {
            //             xtype: 'menu',
            //             items: [
            //                 {
            //                     text: 'Reject Application',
            //                     iconCls: 'x-fa fa-bars',
            //                     decision_id: 3,
            //                     winWidth: '90%', ui: 'soft-red',
            //                     name: 'reject_recommendation',
            //                     stores: '[]'
            //                 },{
            //                     text: 'Approve Application',
            //                     iconCls: 'x-fa fa-bars', decision_id: 1,
            //                     winWidth: '90%',ui: 'soft-green',
            //                     name: 'approve_recommendation',
            //                     stores: '[]'
            //                 }
            //             ]
            //         }
            // },
            // {
            //     text: 'Close & Release Application',
            //     ui: 'soft-purple',
            //     iconCls: 'fa fa-check',
            //     wizard: 'importexportpermitmanagerreviewwizard',
            //     name: 'process_submission_btn',
            //     table_name: 'tra_importexport_applications',
            //     winWidth: '50%',
                
            // },
            
                {
                    text: 'Next',
                    ui: 'soft-purple',
                    reference: 'nextbutton',
                    iconCls: 'fa fa-arrow-right',
                    iconAlign: 'right',max_step:1,
                    bind: {
                        disabled: '{atEnd}'
                    },wizard:'importexportlicencevaluationpnl',
                    handler: 'onNextScreeningCardClick'
                }, 
                {
                    text: 'Add Overrall Comments',
                    ui: 'soft-purple', 
                    iconCls: 'fa fa-weixin',
                    childXtype: 'applicationcommentspnl',
                    winTitle: 'Asssesment Process Comments',
                    winWidth: '60%',
                    name:'prev_comments',
                    comment_type_id: 2,
                    stores: '[]'
             }, 

                {
                    text: 'Recommend',
                    ui: 'soft-purple',
                    hidden: true,
                    iconCls: 'fa fa-check',
                    name: 'process_submission_btn',
                    table_name: 'tra_importexport_applications',
                    winWidth: '50%'
                },
            ]
        };
        me.callParent(arguments);
    }
});
