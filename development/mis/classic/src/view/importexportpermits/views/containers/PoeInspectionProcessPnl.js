
Ext.define('Admin.view.importexportpermits.views.containers.PoeInspectionProcessPnl', {
    extend: 'Ext.Container',
    xtype: 'poeinspectionprocesspnl',
    controller: 'importexportpermitsvctr',
    layout: 'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 4
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 2
        },
        {
            xtype: 'poeinspectionprocessdashwrapper',
            region: 'center'
        },
        {
            xtype: 'poeinspectionprocesstb',
            region: 'south'
        }
    ]
});

