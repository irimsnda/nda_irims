/**
 * Created by softclans.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.import.ImportReceivingLicence', {
    extend: 'Ext.panel.Panel',
    xtype: 'importreceivinglicence',
    controller: 'importexportpermitsvctr',
    viewModel: {
        type: 'importexportpermitsvm'
    },
    layout: 'fit',
    items: [
        {
            xtype: 'importexportreceivingpermitswizard'
        }
    ]
  });