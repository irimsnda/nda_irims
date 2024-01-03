Ext.define('Admin.view.importexportpermits.views.maininterfaces.import.ImportExportNonLicencedDirectorApproval', {
  extend: 'Ext.panel.Panel',
  xtype: 'importexportnonlicencedirectorapproval', 
  controller: 'importexportpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items:[{
    xtype:'importexportdirectorapprovalpnl'
}]
});