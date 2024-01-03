 
/**
 * Created by Softsclans
 */
Ext.define('Admin.view.importexportpermits.views.commoninterfaces.VcNonLicencedDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'vcnonlicenceddetailspnl',
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
                xtype: 'importexportdetailsfrm',
                autoScroll: true,
                title: 'Application Details', 
                title: 'Import/Export VC Information'
            }, 
             {
                xtype: 'senderreceiverdetailsfrm',
                title: 'Sender/Receiver Details',
            },
            {
                xtype: 'onlineimportexportnonlicencebusinessdetailsfrm',
                title: 'Non-Licensed Outlet Details',
            }]
        },{
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});


