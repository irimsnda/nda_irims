 
/**
 * Created by Softsclans
 */
Ext.define('Admin.view.importexportpermits.views.commoninterfaces.NonLicencedDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'nonlicenceddetailspnl',
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
            }, 
            //  {
            //     xtype: 'senderreceiverdetailsfrm',
            //     title: 'Sender/Receiver Details',
            // },
            // {
            //     xtype: 'importexportpremisesfrm',
            //     title: 'Licensed Outlet Details',
            // }
            ]
        },{
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});


