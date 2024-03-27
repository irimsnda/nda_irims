/**
 * created by softclans
 */
Ext.define('Admin.view.importexportpermits.views.containers.ImportExportLicence', {
    extend: 'Ext.Container',
    xtype: 'importExportLicence',
    itemId: 'importExportLicence',
    controller: 'importexportpermitsvctr',
    layout: 'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 4
        },{
            xtype: 'hiddenfield',
            name: 'sub_module_id',
            value: 81
        },
        {
            xtype: 'drugsimportexportpermitsappsWrapper',
            region: 'center'
        },
        {
            xtype: 'importexportlicencestb',
            region: 'south'
        }
    ]
});

