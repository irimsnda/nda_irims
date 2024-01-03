/**
 * Created by Softclans
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.import.ImportLicenceManagerReview', {
    extend: 'Ext.panel.Panel',
    xtype: 'importlicencemanagerreview', 
    controller: 'importexportpermitsvctr',
    viewModel: {
        type: 'importexportpermitsvm'
    },
    layout: 'fit',
    items: [
        {
            xtype: 'importexportlicencemanagerreviewpnl'
        }
    ]
  });
