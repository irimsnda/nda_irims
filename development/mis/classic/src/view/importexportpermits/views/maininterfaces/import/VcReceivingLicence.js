/**
 * Created by softclans.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.import.VcReceivingLicence', {
    extend: 'Ext.panel.Panel',
    xtype: 'vcreceivinglicence',
    controller: 'importexportpermitsvctr',
    viewModel: {
        type: 'importexportpermitsvm'
    },
    layout: 'fit',
    items: [
        {
            xtype: 'vcreceivingpermitswizard'
        }
    ]
  });