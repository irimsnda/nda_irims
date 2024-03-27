/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.licenseapps.NonLicenceApplicationReceivingPermits', {
  extend: 'Ext.panel.Panel',
  xtype: 'nonlicenceapplicationreceivingpermits',
  controller: 'importexportpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items: [
      {
          xtype: 'nonlicencedapplicationreceivingpermitswizard'
      }
  ]
});