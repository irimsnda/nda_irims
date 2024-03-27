Ext.define('Admin.view.importexportpermits.views.commoninterfaces.PoeInspectionDetailsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'poeinspectiondetailspnl',
    
    layout: {
        type: 'border'
    },
    defaults: {
        margin: 3
    },
    viewModel: {
        type: 'importexportpermitsvm'
    },
    items: [{
        xtype: 'poeinspectionpnlfrm',
        autoScroll: true,
        collapsible: true,
        height: 350,
        region: 'north',
        title: 'Import/Export Inspection Details',
        buttons: [{
            text: 'Save Inspection Details',
            iconCls: 'x-fa fa-save',
            ui: 'soft-purple',
            action_url: 'savePOEInspectionPermitDetails',
            handler: 'funcSavePOEInspectionPermitDetails'
        }]
    }, {
        xtype: 'poeinspectionpermitsproductsgrid',
        region: 'center',
        title: 'Permit Products Details',
    },  {
        xtype: 'previousinspectionsgrid',
        autoScroll: true,
        hidden: true,
        region: 'south',
        title: 'Previous Inspections',
    }, {
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});


