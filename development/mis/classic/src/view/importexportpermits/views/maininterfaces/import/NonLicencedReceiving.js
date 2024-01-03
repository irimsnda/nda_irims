/**
 * Created by softclans.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.import.NonLicencedReceiving', {
    extend: 'Ext.panel.Panel',
    xtype: 'nonlicencedreceiving',
    controller: 'importexportpermitsvctr',
    viewModel: {
        type: 'importexportpermitsvm'
    },
    layout: 'fit',
    items: [
        {
            xtype: 'nonlicencedreceivingwizard'
        }
    ]
  });