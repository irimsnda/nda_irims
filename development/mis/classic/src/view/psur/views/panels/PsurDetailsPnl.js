Ext.define('Admin.view.mir.views.panels.PsurDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'psurDetailsPnl',
    // layout: {//
    //     type: 'fit'
    // },
    controller: 'psurVctr',
    autoScroll: true,
    defaults:{
        margin: 3
    },
    viewModel: {
        type: 'psurVm'
    },
    // listeners: {
    //     tabchange: 'funcActiveOtherInformationTab'
    // },
    items: [
        {
        xtype: 'panel',
        itemId:'detailspanel',
        title: 'Product Details',
        autoScroll: true,
        items:[{
           xtype: 'drugsProductsDetailsFrm',
            autoScroll: true,
        }]
    },
     {
        xtype: 'drugsProductsDetailsPnl',
        title: 'Product Other Details',
    },
    {
        xtype: 'psurdetailsFrm',
        title: 'PSUR/PBRER Details',
    },{
        xtype: 'hiddenfield',
        name: 'section_id'
    },{
        xtype: 'hiddenfield',
        name: 'prodclass_category_id'
    }, {
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});