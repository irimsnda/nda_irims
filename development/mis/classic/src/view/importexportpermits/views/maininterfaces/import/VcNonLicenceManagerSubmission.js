/**
 * Created softclans.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.import.VcNonLicenceManagerSubmission', {
  extend: 'Ext.panel.Panel',
  xtype: 'vcnonlicencemanagersubmission', 
  controller: 'importexportpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items:[{
    xtype:'vcnonlicencedmanagersubmissionpnl'
}]
});
