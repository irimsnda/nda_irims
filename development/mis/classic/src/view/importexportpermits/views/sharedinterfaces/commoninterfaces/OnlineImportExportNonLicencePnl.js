

/**
 * Created by Softclans.
 */
Ext.define('Admin.view.importexportpermits.views.commoninterfaces.OnlineImportExportNonLicencePnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'onlineimportexportnonlicencePnl',
   layout: {//
        type: 'fit'
    },
    defaults:{
        margin: 3
    },viewModel: {
        type: 'importexportpermitsvm'
    },
    listeners: {
        tabchange: 'funcActiveImportOtherInformationTab'
    },
    items: [{
       // xtype: 'onlineimportexportlicencedetailsfrm',
    	xtype: 'importexportlicencedetailsfrm',
        autoScroll: true,
        
        title: 'Import/Export Licence Information'
    },
    //  {
    //     xtype: 'onlineimportexportpermitsproductsgrid',
    //     hidden: true,
    //     title: 'Import/Export Licence Products Details',
    // },  
    {
        xtype: 'senderreceiverdetailsfrm',
        hidden: true,
        title: 'Sender/Receiver Details',
    },
     {
        xtype: 'importexportpremisesfrm',
        autoScroll: true,
        title: 'Premises Details',
    },{
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});

