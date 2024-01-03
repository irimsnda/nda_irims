/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.importexportpermits.views.sharedinterfaces.panels.ImportExportNonLicenceManagerReviewPnl', {
    extend: 'Ext.panel.Panel',
    title: 'Import/Export Permit Permit Review',
    xtype: 'importexportnonlicencemanagerreviewpnl',
    layout: 'fit',
    permitsdetails_panel: 'previewimportexportpermitdetails',
    controller: 'importexportpermitsvctr',
    itemId: 'main_processpanel',
    layout: 'fit',
    defaults: {
        split: true,
    }, viewModel: {
        type: 'importexportpermitsvm'
    },
    
    items:[{
        xtype:'importexportnonlicencemanagerreviewwizard'
    }]
});