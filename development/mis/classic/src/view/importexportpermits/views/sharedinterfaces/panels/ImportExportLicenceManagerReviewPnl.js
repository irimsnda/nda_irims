/**
 * Created by softclans */
Ext.define('Admin.view.importexportpermits.views.sharedinterfaces.panels.ImportExportLicenceManagerReviewPnl', {
    extend: 'Ext.panel.Panel',
    title: 'Import/Export Permit Permit Review',
    xtype: 'importexportlicencemanagerreviewpnl',
    controller: 'importexportpermitsvctr',
    layout: 'fit',
    permitsdetails_panel: 'previewimportexportpermitdetails',
    itemId: 'main_processpanel',
    layout: 'fit',
    defaults: {
        split: true,
    }, viewModel: {
        type: 'importexportpermitsvm'
    },
    
    items:[{
        xtype:'importexportlicencemanagerreviewwizard'
    }]
});