/**
 * Created by Softclans
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.import.VcNonLicencedPermitReleaseApproval', {
  extend: 'Ext.panel.Panel',
  xtype: 'vcnonlicencedpermitreleaseapproval', 
  controller: 'importexportpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items: [
      {
          xtype: 'vcnonlicencedpermitreleaseapprovalpnl'
      }
  ]
});