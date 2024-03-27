
/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.importexportpermits.views.commoninterfaces.OnlineImportExportLicencePnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'onlineimportexportlicencePnl',
    layout: {//
        type: 'fit'
    },
    defaults:{
        margin: 3
    },viewModel: {
        type: 'importexportpermitsvm'
    },
    items: [{
        xtype: 'onlineimportexportnonlicencebusinessdetailsfrm',
        autoScroll: true,
        
        title: 'Import/Export Licence Information'
    }, {
        xtype: 'onlineimportexportpermitsproductsgrid',
        hidden: true,
        title: 'Import/Export Licence Products Details',
    },  
    {
        xtype: 'senderreceiverdetailsfrm',
        hidden: true,
        title: 'Sender/Receiver Details',
    },
     {
        xtype: 'importexportpremisesfrm',
        hidden: true,
        title: 'Premises Details',
    },{
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});