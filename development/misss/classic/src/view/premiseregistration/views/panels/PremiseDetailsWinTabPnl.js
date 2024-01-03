/**
 * Created by Kip on 11/10/2018.
 */
Ext.define('Admin.view.premiseregistration.views.panels.PremiseDetailsWinTabPnl', {
    extend: 'Admin.view.premiseregistration.views.panels.PremiseDetailsTabPnl',
    xtype: 'premisedetailswintabpnl',
    itemId: 'premisedetailstabpnl',
    layout:'fit',
    items: [
        {
            title: 'Main Details',
            xtype: 'premisedetailsfrm'
        },{
            title: 'Directors Details',
            xtype: 'premisedirectorsdetailsgrid'
        },
        {
            title: 'Staff Details',
            xtype: 'premisepersonneldetailsgrid'
        },
         {
            title: 'Particulars of Nearest Pharmancy',
            xtype: 'premisenearestpremisegrid'
        },
        {
            title: 'Premises Main Activities/Product Types',
            hidden: true,
            xtype: 'premiseotherdetailswingrid'
        },{
            xtype:'previewproductDocUploadsGrid',
            title: 'Application Uploaded Documents (All)'
        },
        {
            title: 'Manufacturing Site Product Lines(for Manufacturers Only)',
            hidden: true,
            xtype: 'premisesproductlinedetailsgrid'
        }
    ]
});