/**
 * Created by Softclans
 */
Ext.define('Admin.view.importexportpermits.views.dashboard.DrugsImportExportPermitsApps', {
    extend: 'Ext.Container',
    xtype: 'drugsimportexportpermitsapps', 
    itemId:'drugsimportexportpermitsapps',
    layout: 'border',
    items: [{
        xtype: 'hiddenfield',
        name: 'module_id',
        value: 4
    },
    {
            xtype: 'hiddenfield',
            name: 'sub_module_id',
            value: 81
        },
    {
        xtype: 'hiddenfield',
        name: 'section_id',
        value: 2
    },
        {
            xtype: 'drugsimportexportpermitsdashgrid',
            region: 'center',
            title: 'Active Tasks',
            margin: 2
        }, {
            xtype: 'dashboardguidelinesgrid',
            region: 'south',
            collapsible: true,
            collapsed: true,
            titleCollapse: true
        }
    ]
});