/**
 * Created softclans.
 */
Ext.define('Admin.view.importexportpermits.views.maininterfaces.import.DeclarationNonLicenceManagerSubmission', {
  extend: 'Ext.panel.Panel',
  xtype: 'declarationnonlicencemanagersubmission', 
  controller: 'importexportpermitsvctr',
  viewModel: {
      type: 'importexportpermitsvm'
  },
  layout: 'fit',
  items:[{
    xtype:'declarationnonlicencedmanagersubmissionpnl'
}]
});
