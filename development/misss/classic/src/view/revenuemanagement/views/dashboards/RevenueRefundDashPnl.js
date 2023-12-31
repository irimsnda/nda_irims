Ext.define('Admin.view.pv.views.dashboards.RevenueRefundDashPnl', {
    extend: 'Ext.Container',
    xtype: 'revenueRefundDashPnl',
    layout: 'border',
    items: [
        {
            xtype: 'revenueRefundGrid',
            region: 'center',
            title: 'Active Tasks',
            margin: 2,
            bbar: [{
                xtype: 'pagingtoolbar',
                width: '100%',
                displayInfo: true,
                displayMsg: 'Showing {0} - {1} of {2} total records',
                emptyMsg: 'No Records',
                beforeLoad: function () {

                    this.up('grid').fireEvent('refresh', this);

                }
            }]
        }
    ]
});