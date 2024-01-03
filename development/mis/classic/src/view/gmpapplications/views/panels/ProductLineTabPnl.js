
Ext.define('Admin.view.gmpapplications.views.panels.ProductLineTabPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'productlinetabpnl',
    listeners: {
        beforetabchange: function(tabPanel, newCard, oldCard) {
            const selectedIndex = tabPanel.items.indexOf(newCard);
            if (selectedIndex === 1) {
                var grid = tabPanel.down('productLineDetailsaddgrid'),
                    block_id = grid.down('hiddenfield[name=block_id]').getValue();
                if (block_id ==='' || block_id=='') {
                    toastr.warning('Please add Block first!!', 'Warning Response');
                    return false; // Prevent tab change
                }
            }
        }
    },
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