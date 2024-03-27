 
/**
 * Created by Softsclans
 */
Ext.define('Admin.view.importexportpermits.views.commoninterfaces.DeclarationPreviewDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'declarationpreviewdetailspnl',
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
                xtype: 'importexportdetailsfrm',
                autoScroll: true,
                title: 'Application Details', 
                title: 'Import/Export Declaration Information'
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


