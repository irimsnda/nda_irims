/**
 * Created softclans.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.import.ImportExportDeclarationManagerSubmission', {
  extend: 'Ext.panel.Panel',
  xtype: 'importexportdeclarationmanagersubmission', 
  controller: 'importexportpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items:[{
    xtype:'importexportdeclarationmanagersubmissionpnl'
}]
});
