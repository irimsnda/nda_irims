/**
 * Created by Softclans
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.import.PoeReleaseApproval', {
  extend: 'Ext.panel.Panel',
  xtype: 'poereleaseapproval', 
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