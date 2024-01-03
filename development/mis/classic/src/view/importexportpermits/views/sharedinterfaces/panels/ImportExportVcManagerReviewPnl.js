/**
 * Created by softclans */
Ext.define('Admin.view.importexportpermits.views.sharedinterfaces.panels.ImportExportVcManagerReviewPnl', {
    extend: 'Ext.panel.Panel',
    title: 'Import/Export Permit Permit Review',
    xtype: 'importexportvcmanagerreviewpnl',
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
        xtype:'importexportvcmanagerreviewwizard'
    }]
});