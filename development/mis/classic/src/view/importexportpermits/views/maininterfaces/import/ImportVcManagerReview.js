/**
 * Created by Softclans
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.import.ImportVcManagerReview', {
    extend: 'Ext.panel.Panel',
    xtype: 'importvcmanagerreview', 
    controller: 'importexportpermitsvctr',
    viewModel: {
        type: 'importexportpermitsvm'
    },
    layout: 'fit',
    items: [
        {
            xtype: 'importexportvcmanagerreviewpnl'
        }
    ]
  });
