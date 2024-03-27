/**
 * Created by Softclans
 */
Ext.define('Admin.view.importexportpermits.views.dashboard.InspectedPoePermitsDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'inspectedpoepermitsdashwrapper',
	itemId:'inspectedpoepermitsdashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'inspectedpoepermitsdash'
        }
    ]
});