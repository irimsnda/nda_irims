/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.import.ImportNonLicenceManagerReview', {
    extend: 'Ext.panel.Panel',
    xtype: 'importnonlicencemanagerreview', 
    controller: 'importexportpermitsvctr',
    viewModel: {
        type: 'importexportpermitsvm'
    },
    layout: 'fit',
    items: [
        {
            xtype: 'importexportnonlicencemanagerreviewpnl'
        }
    ]
  });