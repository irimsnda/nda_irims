 
/**
 * Created by softclans.
 */
Ext.define('Admin.view.importexportpermits.views.commoninterfaces.ImportExportDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'importexportdetailspnl',
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
            xtype: 'panel',
            autoScroll: true, 
            title: 'Application Details',
            items:[{
                xtype: 'onlineimportexportlicencedetailsfrm',
                autoScroll: true,
                title: 'Application Details', 
                title: 'Import/Export Licence Information'
            }, 
             {
                xtype: 'senderreceiverdetailsfrm',
                hidden: true,
                title: 'Sender/Receiver Details',
            },
            {
                xtype: 'importexportpremisesfrm',
                hidden: true,
                title: 'Licensed Outlet Details',
            }]
        },{
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});


