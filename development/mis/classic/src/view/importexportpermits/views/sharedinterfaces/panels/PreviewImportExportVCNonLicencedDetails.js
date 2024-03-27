/**
 * Created by softclans
 */
Ext.define('Admin.view.importexportpermits.views.sharedinterfaces.panels.PreviewImportExportVCNonLicencedDetails', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.previewimportexportvcnonlicenceddetails',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    viewModel: {
        type: 'importexportpermitsvm'
    },
    controller: 'importexportpermitsvctr',
    reference: 'wizardpnl',
    layout: 'card',
    //bodyPadding: 3,
    flex: 1,
    autoScroll: true,
    cls: 'wizard three shadow',
    colorScheme: 'soft-green',
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        ui: 'footer',
        height: 40,
        defaults: {
            labelAlign: 'top',
            margin: '-12 5 0 5',
            labelStyle: "color:#595959;font-size:11px"
        },
        items: ['->', {
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
                name: 'module_id'
            }, {
                xtype: 'hiddenfield',
                name: 'sub_module_id'
            }, {
                xtype: 'hiddenfield',
                name: 'section_id'
            }, {
                xtype: 'hiddenfield',
                name: 'active_application_code'
            }, {
                xtype: 'hiddenfield',
                name: 'application_status_id'
            }, {
                xtype: 'hiddenfield',
                name: 'status_type_id'
            }, {
                xtype: 'hiddenfield',
                name: 'is_manager_query'
            }]
    }
],
    items: [
        {
            xtype: 'vcnonlicenceddetailspnl',//onlinefoodproductsdetailspnl
            dockedItems: [
                {
                    xtype: 'toolbar',
                    ui: 'footer',
                    dock: 'top',
                    margin: 3,
                    items: [
                        {
                            xtype: 'tbseparator',
                            width: 2
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Zone',
                            labelWidth: 50,
                            width: 400,
                            name: 'zone_id',
                            valueField: 'id',
                            displayField: 'name',
                            queryMode: 'local',
                            hidden: true,
                            readOnly: true,
                            forceSelection: true,
                            listeners: {
                                beforerender: {
                                    fn: 'setOrgConfigCombosStore',
                                    config: {
                                        pageSize: 1000,
                                        proxy: {
                                            extraParams: {
                                                model_name: 'Zone'
                                            }
                                        }
                                    },
                                    isLoad: true
                                }
                            },
                            labelStyle: 'font-weight:bold'
                        }
                    ]
                }
            ],
        },{
            xtype: 'importexportpermitsproductsgrid',
            title: 'Import/Export VC Products Details',
        },
        
        {
            xtype: 'importexportapplicantdetailsfrm',
            title: 'APPLICANT DETAILS'
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
            items: [{
                    step: 0,
                    iconCls: 'fa fa-university',
                    enableToggle: true,
                    text: 'Import/Export VC Details',
                    action: 'quickNav', 
                    wizard: 'previewimportexportvcnonlicenceddetails',
                    handler: 'prevquickNavigation'
                },{
                    step: 1,
                    iconCls: 'fa fa-user',
                    enableToggle: true,
                    pressed: true,
                    text: 'VC Products Details',
                    action: 'quickNav',
                    wizard: 'previewimportexportvcnonlicenceddetails',
                    handler: 'prevquickNavigation'
                },
                // {
                //     step: 2,
                //     iconCls: 'fa fa-user',
                //     enableToggle: true,
                //     pressed: true,
                //     text: 'Applicant',
                //     action: 'quickNav',
                //     wizard: 'previewimportexportvcnonlicenceddetails',
                //     handler: 'prevquickNavigation'
                // }
            ]
        };
        this.bbar = {
            reference: 'navigation-toolbar',
            ui: 'footer',
            items: [
                {
                    text: 'Back to List',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-bars',
                    name: 'back_to_list',
                    hidden: true
                },
                '->',
                {
                    text: 'Previous',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-arrow-left',
                    hidden: true,
                    bind: {
                        disabled: '{atBeginning}'
                    },
                    max_step: 1,
                    wizard:'previewimportexportvcnonlicenceddetails',
                    handler: 'prevonPrevCardClick'
                },
                {
                    text: 'Save/Update Application Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
                    hidden:true,
                    action_url: 'onSavePermitinformation',
                    wizard: 'previewimportexportvcnonlicenceddetails',
                    handler: 'savePermitInformation'
                },{
                    text: 'Save Screening Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_screening_btn',
                    disabled:true,
                    hidden: true
                },
                {
                    text: 'Next',
                    ui: 'soft-purple',
                    reference: 'nextbutton',
                    iconCls: 'fa fa-arrow-right',
                    hidden: true,
                    iconAlign: 'right', max_step: 1,
                    bind: {
                        disabled: '{atEnd}'
                    },wizard:'previewimportexportvcnonlicenceddetails',
                    handler: 'prevonNextCardClick'
                }
            ]
        };
        me.callParent(arguments);
    }
});