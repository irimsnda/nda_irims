/**
 * Created softclans.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.import.ImportExportPoeManagerSubmission', {
  extend: 'Ext.panel.Panel',
  xtype: 'importexportpoemanagersubmission', 
  controller: 'importexportpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items:[{
    xtype:'importexportpoemanagersubmissionpnl'
}]
});
