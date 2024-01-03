/**
 * Created by Softclans
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.import.ImportVcReleaseApproval', {
  extend: 'Ext.panel.Panel',
  xtype: 'importvcreleaseapproval', 
  controller: 'importexportpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items: [
      {
          xtype: 'importexportvcapprovalpnl'
      }
  ]
});