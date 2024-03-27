/**
 * Created by softclans
 */
Ext.define('Admin.view.importexportpermits.views.sharedinterfaces.panels.VcNonLicencedEvaluationPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'vcnonlicencedevaluationpnl', 
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
                fieldLabel: 'Application Status',
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
                    title: 'Permit Information'
                },  {
                    xtype: 'senderreceiverdetailsfrm',collapsible: true,
                    title: 'Sender/Receiver Details',
                },{
                    xtype: 'vcimportexportnonlicencebusinessdetailsfrm',collapsible: true,
                    title: 'Business Details',
                }],
                bbar:[{
                    text: 'Update VC Application Details',
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
            xtype: 'importexportpermitsproductsgrid',
            itemId: 'importexportpermitsproductsgrid',
            title: 'Recommendation on Import/Export VC Products Details',
            bind: {
                title:' Permit Products Details Recommendations'
            },
            selModel: {
                selType: 'checkboxmodel',
                mode: 'MULTI'
            },
            plugins: [{
                ptype: 'gridexporter'
            }, {
                ptype: 'cellediting',
                clicksToEdit: 1,
                editing: true
            },{
                ptype: 'filterfield'
            }],
            
            tbar:[{
                text:'Recommend Selected Application Products',
               // name:'btn_recommendallproducts',
               viewXtype: 'permitsproductsrecommendationfrm',
               winTitle: 'Permits Products Recommendation',
               winWidth: '40%',
                handler: 'funcPermitsProductRecommendationWin',
                iconCls: 'x-fa fa-plus',
                ui: 'soft-red',
            },'->',{
                text:'Recommend Selected Application Products',
                name:'btn_updatesprodrecommendtion',
                iconCls: 'x-fa fa-plus',
                ui: 'soft-green',

            }],
            columns: [{
                xtype:'rownumberer'  
              },{
          xtype: 'gridcolumn',
          dataIndex: 'brand_name',
          tdCls: 'wrap-text',
          text: 'Brand Name/Device Name',
          flex: 1
      }, {
          xtype: 'gridcolumn',
          dataIndex: 'certificate_no',
          hidden: true,
          tdCls: 'wrap-text',
          text: 'Certificate No',
          flex: 1,
      },{
          xtype: 'gridcolumn',
          dataIndex: 'common_name',
          tdCls: 'wrap-text',
          text: 'Common Name',
          flex: 1,
      },{
          xtype: 'gridcolumn',
          dataIndex: 'product_category',
          hidden: true,
          tdCls: 'wrap-text',
          text: 'Product Category',
          flex: 1,
      }, {
          xtype: 'gridcolumn',
          dataIndex: 'quantity',
          tdCls: 'wrap-text',
          text: 'Quantity',hidden: true,
          flex: 1,
      }, {
          xtype: 'gridcolumn',
          dataIndex: 'si_unit',
          tdCls: 'wrap-text',
          text: 'Packaging Units',
          flex: 1,
      }, {
          xtype: 'gridcolumn',
          dataIndex: 'pack_size',hidden: true,
          text: 'Unit Pack size',
  
          flex: 1,
      },{
          xtype: 'gridcolumn',
          dataIndex: 'pack_unit',hidden: true,
          text: 'Unit Pack',
  
          flex: 1,
      },{
          xtype: 'gridcolumn',
          dataIndex: 'no_of_packs_tertiary',
          tdCls: 'wrap-text',
          text: 'Tertiary',
          flex: 1,
      },{
          xtype: 'gridcolumn',
          dataIndex: 'no_of_packs_secondary',
          tdCls: 'wrap-text',
          text: 'Secondary',
          flex: 1,
      },{
          xtype: 'gridcolumn',
          dataIndex: 'no_of_packs',
          tdCls: 'wrap-text',
          text: 'Primary',
          flex: 1,
      },
      {
          xtype: 'gridcolumn',
          dataIndex: 'verification_fee_percent',
          tdCls: 'wrap-text',
          text: 'Verification Percentage',
          flex: 1,
      },{
          xtype: 'gridcolumn',
          dataIndex: 'total_units',
          text: 'Total Units',
          flex: 1,
      },{
          xtype: 'gridcolumn',
          dataIndex: 'currency_name',
          tdCls: 'wrap-text',
          text: 'Currency Name',
          flex: 1,
      },{
          
          xtype: 'gridcolumn',
          dataIndex: 'unit_price',
          tdCls: 'wrap-text',
          text: 'Unit Price',
          flex: 1,
        
      },{
                  xtype: 'gridcolumn',
                  dataIndex: 'total_value',
                  tdCls: 'wrap-text',
                  text: 'Total Value',
                  flex: 1,
                  summaryType: 'sum',
                  renderer: function (val, meta, record) {
                      return Ext.util.Format.number(val, '0,000.00');
                  },
                  summaryRenderer: function (val) {
                      val = Ext.util.Format.number(val, '0,000.00');
                      return 'Total Fob '+val
                  }
              },{
                xtype: 'gridcolumn',
                text: 'Registration Status', 
                tdCls: 'wrap-text',
                dataIndex: 'certificate_no',
                renderer: function (value, metaData) {
                    if (value !='') {
                        metaData.tdStyle = 'color:white;background-color:green';
                        return "Registered/Authorised";
                    }
        
                    metaData.tdStyle = 'color:white;background-color:red';
                    return "Not Registered";
                }
         },
               // {   
            //     xtype: 'gridcolumn',
            //     dataIndex: 'prodregistrationvalidation_recommendation_id',
            //     tdCls:'wrap-text',
            //     text: 'Product Registration Validation Recommendation',
            //     width: 80,
            //         renderer: function (val, meta, record, rowIndex, colIndex, store, view) {
            //             var textVal = '';
                       
            //             if (val == 2) {
            //                 textVal = "Accepted";
            //                 meta.tdStyle = 'color:white;background-color:green';
                            
            //             }else if(val == 3){
            //                 meta.tdStyle = 'color:white;background-color:red';
            //                 textVal = "Rejected";
            //             }else{
            //                // meta.tdStyle = 'color:white;background-color:blue';
            //             }
            //             return textVal;
            //         }
            //   },{   
            //     xtype: 'gridcolumn',
            //     dataIndex: 'prodregistrationvalidation_recommendation_remarks',
            //     tdCls:'wrap-text',
            //     text: 'Product Registration Validation Recommendation',
            //     width: 80,
            //     renderer: function (val) {
            //         if (val == '') {
                       
            //                  var val = 'Recommendation Remarks';
            //         }
            //         return val;
            //     }
            //   },
              {   
                xtype: 'gridcolumn',
                dataIndex: 'permitprod_recommendation_id',
                tdCls:'wrap-text',
                text: 'Permits Product Recommendation(Acceptance)',
                width: 80,
                    editor: {
                        xtype: 'combo',
                        store: 'permitprod_recommendationstr',
                        valueField: 'id',
                        displayField: 'name',
                        queryMode: 'local',
                        listeners: {
                           
                        }
                    },
                    renderer: function (val, meta, record, rowIndex, colIndex, store, view) {
                        var textVal = 'Select Recommendation';
                      /*  if (view.grid.columns[colIndex].getEditor().getStore().getById(val)) {
                           // textVal = view.grid.columns[colIndex].getEditor().getStore().getById(val).data.name;
                        }
                        */
                        if (val == 2) {
                            meta.tdStyle = 'color:white;background-color:green';
                            textVal = 'Accepted';
                            
                        }else if(val == 3){
                            meta.tdStyle = 'color:white;background-color:red';
                            textVal = 'Rejected';
                           
                        }else if(val == 3){
                            meta.tdStyle = 'color:white;background-color:yellow';
                            textVal = 'Queried';
                           
                        }else{
                            meta.tdStyle = 'color:white;background-color:blue';
                            textVal = 'Initial Request';
                        }
                        
                        return textVal;
                    }
              },{   
                xtype: 'gridcolumn',
                dataIndex: 'permitprod_recommendation_remarks',
                tdCls:'wrap-text',
                text: 'Recommendation Remarks',
                width: 100,
                editor: {
                    xtype:'textfield'
                },renderer: function (val) {
                    if (val == '') {
                       
                             var val = 'Recommendation Remarks';
                    }
                    return val;
                }
              },{
                xtype: 'widgetcolumn',
                width: 120,
                widget: {
                    width: 120,
                    textAlign: 'left',
                    xtype: 'button',
                    ui: 'soft-green',
                    text: 'Download Report',
                    iconCls: 'x-fa fa-eye',
                    handler: 'previewUploadedDocument',
                    download: 0
                }
            }]
        },{
            xtype: 'productscreeninggrid',
            title: 'Application Checklist Details',
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
                    action: 'quickNav',max_step:2,
                    wizard: 'vcnonlicencedevaluationpnl',
                    handler: 'quickScreeningNavigation'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-university',
                    enableToggle: true,iconAlign: 'top',
                    text: 'Recommendation on Import/Export VC Products Details',
                    max_step:2,
                    action: 'quickNav', wizard: 'vcnonlicencedevaluationpnl',
                    handler: 'quickScreeningNavigation'
                }, {
                    step: 2,
                    iconCls: 'fa fa-university',
                    enableToggle: true,iconAlign: 'top',
                    text: 'Application Checklist',
                    max_step:2,
                    action: 'quickNav', wizard: 'vcnonlicencedevaluationpnl',
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
                    text: 'Preview & Edit VC Details(Preview Option)',
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
                    },max_step:2,
                    wizard:'vcnonlicencedevaluationpnl',
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
                    text: 'Next',
                    ui: 'soft-purple',
                    reference: 'nextbutton',
                    iconCls: 'fa fa-arrow-right',
                    iconAlign: 'right',max_step:2,
                    bind: {
                        disabled: '{atEnd}'
                    },wizard:'vcnonlicencedevaluationpnl',
                    handler: 'onNextScreeningCardClick'
                }, 

                {
                    text: 'Submit Application',
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
