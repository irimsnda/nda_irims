/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.premiseregistration.views.sharedinterfaces.panels.NewPremiseInspectionPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'newpremiseinspectionpanel',
    layout: {
        type: 'border'
    },
    defaults: {
        split: true
    },
    
    items: [
        {

           
            region: 'center',
            layout: 'fit',
            xtype:'tabpanel',
            listeners: {
                tabchange: function(tabPanel, newCard, oldCard) {
                  const selectedIndex = tabPanel.items.indexOf(newCard);
                  if (selectedIndex ===1) {
                    var panel=tabPanel.up('panel');
                    panel.down('button[name=save_screening_btn]').setHidden(false);

                  }
                  if (selectedIndex ===2) {
                    var panel=tabPanel.up('panel');
                    panel.down('button[name=save_screening_btn]').setHidden(true);

                  }
                  if (selectedIndex ===0) {
                    var panel=tabPanel.up('panel');
                    panel.down('button[name=save_screening_btn]').setHidden(true);

                  }
                }
              
            },
            items: [{
                     title: 'Application Details & Documents Uploads',
                    xtype:'premiseappmoredetailswizard'
                },{
                   xtype: 'premiseinspectionscreeninggrid',
                   title: 'Inspection Checklist'
               },{
                    xtype: 'premiseinspectionrecommfrm',
                    itemId: 'premiseinspectionrecommfrm',
                    title:'Inspection Report'
               }]
        },

        
        {
            xtype: 'toolbar',
            ui: 'footer',
            region: 'south',
            height: 45,
            split: false,
            items: [
                {
                    xtype: 'transitionsbtn',
                    hidden:true,
                },
                {
                    xtype: 'button',
                    text: "Raise/View CAPA/ Query & Responses",
                    tooltip: 'Raise Query/View Query(Request for Information) and query Responses',
                    ui: 'soft-red',
                    handler: 'showAddApplicationUnstrcuturedQueries',
                },
                ,{
                    text: 'Preview/Add CAPA Request',
                    iconCls: 'x-fa fa-cubes',
                    ui: 'soft-blue',
                    hidden:true,
                    handler: 'showPremisesInspectionCAPApplicationQueries'
                },
                {
                    text: 'Comments',
                    iconCls: 'x-fa fa-weixin',
                    childXtype: 'applicationprevcommentsgrid',
                    name: 'prev_comments',
                    winTitle: 'Inspection Comments',
                    winWidth: '60%',
                    stores: '[]',
                    hidden:true,
                    comment_type_id: 1,
                    target_stage: 'inspection',
                    isWin: 1
                 },
                  {
                    text: 'Print Inspection Report',
                    iconCls: 'x-fa fa-print',
                    hidden:true,
                    ui: 'soft-green',
                    name:'btn_print_inspection_report',
                    handler: 'doPrintInspectionReport'
                },

                {
                    text: 'View IOD Report',
                    ui: 'soft-green',
                    iconCls: 'fa fa-eye',
                    childXtype: 'premiseinspectiondetailstabpnl',
                    winTitle: 'IOD Report',
                    winWidth: '60%',
                    name: 'preview_report_btn',
                    stores: '[]',
                    report_type_id:1,
                    handler: 'showInspectionReportDetails',
                    hidden: true
                },
                {
                    text: 'View RID Recommendation',
                    ui: 'soft-red',
                    iconCls: 'fa fa-eye',
                    childXtype: 'premiseinspectiondetailstabpnl',
                    winTitle: 'RID Recommendation',
                    winWidth: '60%',
                    name: 'regional_inspector_report_btn',
                    stores: '[]',
                    report_type_id:2,
                    handler: 'showInspectionReportDetails',
                    hidden: true
                },
               
                '->',

                  {
                    text: 'Save Inspection Checklist',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_screening_btn',
                    hidden: true
                },
                {
                    text: 'Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    isInspectionSubmit:1,
                    name: 'process_submission_btn',
                    storeID: 'foodpremiseregistrationstr',
                    table_name: 'tra_premises_applications',
                    winWidth: '50%'
                }
            ]
        }
    ],
});
