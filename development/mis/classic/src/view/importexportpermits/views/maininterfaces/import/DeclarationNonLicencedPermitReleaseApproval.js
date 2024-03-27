/**
 * Created by Softclans
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.import.DeclarationNonLicencedPermitReleaseApproval', {
  extend: 'Ext.panel.Panel',
  xtype: 'declarationnonlicencedpermitreleaseapproval', 
  controller: 'importexportpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items: [
      {
          xtype: 'declarationnonlicencedpermitreleaseapprovalpnl'
      }
  ]
});