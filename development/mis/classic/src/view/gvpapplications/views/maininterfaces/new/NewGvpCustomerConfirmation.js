Ext.define('Admin.view.gvpapplications.views.maininterfaces.new.NewGvpCustomerConfirmation', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpReceiving',
    xtype: 'newgvpcustomerconfirmation',
    items: [
        {
            xtype: 'newgvpreceivingwizard'
        }
    ]
});