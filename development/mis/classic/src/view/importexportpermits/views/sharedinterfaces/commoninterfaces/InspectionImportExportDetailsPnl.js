
/**
 * Created by Kip Softclans
 */
Ext.define('Admin.view.importexportpermits.views.commoninterfaces.InspectionImportExportDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'inspectionimportexportdetailspnl',
    
    layout: {//
        type: 'fit'
    },
    defaults:{
        margin: 3
    },viewModel: {
        type: 'importexportpermitsvm'
    },
    items: [{
        xtype: 'panel',
        autoScroll: true, 
        itemId:'permitsdetails_panel', 
        viewModel: 'importexportpermitsvm',
        title: 'Application Details',
        items:[{
            xtype: 'importexportinspectionbookingdetailsfrm',
            autoScroll: true,
            title: 'Inspection Booking Information'
        }, {
            xtype: 'senderreceiverdetailsfrm',
            title: 'Supplier/Receiver Details',
        },{
            xtype: 'importexportpermitsproductsgrid', 
            autoScroll: true,
            height: 400,
            hidden: true,
            title: 'Permit Products Details',
        },{
            xtype: 'importexportpremisesfrm',
            title: 'Licensed Outlet Details',
        }] 
    },  {
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});


