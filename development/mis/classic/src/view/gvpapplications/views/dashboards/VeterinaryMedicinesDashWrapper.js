/**
 * Created by Kip on 1/6/2019.
 */
Ext.define('Admin.view.gvpapplications.views.dashboards.VeterinaryMedicinesDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'veterinarymedicinesdashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'drugsgvpdash'
        }
    ]
});