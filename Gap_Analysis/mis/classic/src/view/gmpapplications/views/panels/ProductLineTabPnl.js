
Ext.define('Admin.view.gmpapplications.views.panels.ProductLineTabPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'productlinetabpnl',
    items: [
        {
            title: 'Manufacturing Site Blocks',
            autoScroll:true,
            xtype: 'mansiteblockdetailsfrm'
        },
        {
            title: 'Product Lines',
            autoScroll:true,
            xtype: 'productLineDetailsaddgrid'
        }
    ]
});