/**
 * Created by Kip on 12/17/2018.
 */
Ext.define('Admin.view.gmpapplications.views.panels.ManSiteDetailsTabPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'mansitedetailstabpnl',
    items: [
        {
            title: 'Manufacturing Site Details',
            autoScroll:true,
            xtype: 'mansitedetailsfrm'
        },
        {
            title: 'Local Technical Representative',
            autoScroll:true,
            xtype: 'ltrfrm'
        },
         {
            title: 'Contract Manufacturing Activity Details',
            autoScroll:true,
            xtype: 'contractmanufacturingtabPnl'//'mansitepersonneldetailsgrid'
        },
        {
            title: 'Personnel Details',
            autoScroll:true,
            xtype: 'mansitepersonneltabpnl'//'mansitepersonneldetailsgrid'
        },
        {
            title: 'Manufacturing Site Blocks',
            autoScroll:true,
            hidden:true,
            xtype: 'mansiteblockdetailsgrid'
        },
        {
            title: 'MANUFACTURING OPERATIONS',
            autoScroll:true,
            hidden:true,
            xtype: 'mansiteotherdetailsgrid'
        }
    ]
});