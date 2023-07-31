/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.drugshopregistration.views.sharedinterfaces.panels.NewDrugShopInspectionPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'newdrugshopinspectionpanel',
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
                    xtype:'drugshopappmoredetailswizard'
                },{
                   xtype: 'drugshopinspectiongrid',
                   title: 'Inspection Checklist'
               },{
                    xtype: 'drugshopinspectionfrm',
                    itemId: 'drugshopinspectionfrm',
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
                    xtype: 'transitionsbtn'
                },

                {
                    text: 'View Inspectors Report',
                    ui: 'soft-green',
                    iconCls: 'fa fa-print',
                    childXtype: 'drugshopinspectiondetailstabpnl',
                    winTitle: 'Inspection Report',
                    winWidth: '60%',
                    name: 'preview_report_btn',
                    stores: '[]',
                    report_type_id:1,
                    handler: 'showInspectionReportDetails',
                    hidden: true
                },
                {
                    text: 'View Regional Inspectors Report',
                    ui: 'soft-red',
                    iconCls: 'fa fa-print',
                    childXtype: 'drugshopinspectiondetailstabpnl',
                    winTitle: 'Inspection Report',
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
                    name: 'process_submission_btn',
                    storeID: 'foodpremiseregistrationstr',
                    table_name: 'tra_premises_applications',
                    winWidth: '50%'
                }
            ]
        }
    ],
});
