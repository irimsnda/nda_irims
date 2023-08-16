
Ext.define('Admin.view.drugshopregistration.views.panels.PreDrugShopOtherDetailsTabPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'predrugshopotherdetailstabPnl',
    margin: 3,
    items: [
       
        // {
        //     title: 'Director(s)',
        //     itemId:'drugshopdirectorsdetailsgrid',
        //     hidden:true,
        //     xtype: 'drugshopdirectorsdetailsgrid'
        // },
        {
            title: 'Nearest Pharmacies',
            xtype: 'nearestpremisegrid'
        },
        {
            title: 'Nearest DrugShop',
            xtype: 'nearestdrugshopgrid'
        },
         {
            title: 'Other License(S)',
            hidden:true,
            xtype: 'drugshopotherlicensesdetailsgrid'
        }

    ]
});

