/**
 * Created by Softclans
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.import.DeclarationReleaseApproval', {
  extend: 'Ext.panel.Panel',
  xtype: 'declarationreleaseapproval', 
  controller: 'importexportpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items: [
      {
          xtype: 'importexportpoeapprovalpnl'
      }
  ]
});