
Ext.define('Admin.view.drugshopregistration.views.panels.PreDrugShopAppMoreDetailsWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.predrugshopappmoredetailswizard',
    controller: 'premiseregistrationvctr',
    viewModel: 'premiseregistrationvm',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'wizardpnl',
    layout:'fit',
    flex: 1,autoScroll: true, 
    autoScroll: true,
    cls: 'wizardthree shadow',
    colorScheme: 'soft-green',
    tbar:[{
        xtype: 'hiddenfield',
        name: 'process_id'
    },
    {
        xtype: 'hiddenfield',
        name: 'workflow_stage_id'
    },
    {
        xtype: 'hiddenfield',
        name: 'application_id'
    },
    {
        xtype: 'hiddenfield',
        name: 'module_id'
    },{
        xtype: 'hiddenfield',
        name: 'premise_id'
    },
    {
        xtype: 'hiddenfield',
        name: 'sub_module_id'
    },
    {
        xtype: 'hiddenfield',
        name: 'section_id'
    }],
    items: [{
            xtype: 'preinspectiondrugshopdetailstabpnl',
            //title:'Premises, Personnel and Activities Details',
            layout:'fit'
        },
        {
           xtype: 'applicationapplicantpnl',
           collapsible: true, 
           collapsed: true,
           hidden: true,
          title:'Drug Shop Applicant Details'
        }
    ],
    bbar:[{
        text: 'Update Application Details',
        ui: 'soft-purple',
        hidden:true,
        iconCls: 'fa fa-save',
        name: 'updatedrugshopapplications',
        toaster: 1
    }]

});