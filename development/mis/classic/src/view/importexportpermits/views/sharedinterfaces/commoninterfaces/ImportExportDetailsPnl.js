 
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
            items:[
            {
            xtype: 'importexportapplicantdetailsfrm',
            autoScroll: true,
            title: 'APPLICANT DETAILS'
            },{
               // xtype: 'onlineimportexportlicencedetailsfrm',
               // xtype: 'importexportdetailsfrm',
                xtype: 'importexportlicencedetailsfrm',
                autoScroll: true,
                title: 'Licence Details'
            }, 
             {
                xtype: 'senderreceiverdetailsfrm',
                hidden: true,
                title: 'Sender/Receiver Details',
            },
            {
                xtype: 'importexportpremisesfrm',
                autoScroll: true,
                title: 'Pharmacist in Charge Details',
            }]
        },{
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});


