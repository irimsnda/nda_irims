Ext.define('Admin.Application', {
    extend: 'Ext.app.Application',
    
    name: 'Admin',

    requires: ['Admin.view.plugins.Badge','Admin.view.plugins.CKeditor'],
    stores: [
        'ConfirmationStr'
    ],
    
    controllers:[
        'SharedUtilitiesCtr',
        'AdministrationCtr',
        'DashboardCtr',
        'UserManagementCtr',
        'ParametersCtr',
        'OrganisationConfigCtr',
        'WorkflowManagementCtr',
        'PremiseRegistrationCtr',
        'ProductRegistrationCtr',
        'ProductRecallAlertCtr',
        'ConfigurationsCtr',
        'GmpApplicationsCtr',
        'ClinicalTrialCtr',
        'ReportsCtr',
        'SurveillanceCtr',
        'ImportExportpermitsCtr',
        'ProductNotificationsCtr',
		'PromoAndAdvertMaterialsController',
        'ProfileCtr',
        'OpenOfficeCtr',
        'OnlineServicesCtr',
        'RevenueManagementCtr',
        'SystemAdministrationProcessCtr',
        'DocumentContolManCtr',
        'PvCtr',
        'EnforcementCtr'
    ],
    defaultToken : 'dashboard',

    launch: function () {
    if (is_logged_in) {
        // var confirmationWindow = Ext.create('Ext.window.Window', {
        //     //title: 'Terms and Conditions',
        //     bodyPadding: 3,
        //     width: '90%',
        //     height: '90%',
        //     autoScroll: true,
        //     closable: false,
        //     modal: true,
        //     draggable: false,
        //     resizable: false,
        //     style: {
        //         border: 'none'
        //     },
        //     layout: 'fit',
        //     items: [{
        //             xtype: 'panel',
        //             layout: 'fit',
        //             id: 'dashboardPnl',
        //             width: '100%',
        //             listeners: {
        //                 afterrender: function () {
        //                     var mainTabPanel = Ext.getCmp('dashboardPnl');
        //                     if (mainTabPanel) {
        //                        Ext.getBody().mask('Loading Dashboard...'); 
        //                         Ext.Ajax.request({
        //                             url: 'administration/getSystemNavigationMenuItems',
        //                             method: 'GET',
        //                             headers: {
        //                                 'Authorization': 'Bearer ' + access_token,
        //                                 'X-CSRF-Token': token
        //                             },
        //                             success: function (response) {
        //                                 var jsonData = Ext.decode(response.responseText);
        //                                 console.log(jsonData);

        //                                 // Create an array to hold button configurations
        //                                 var buttons = [];

        //                                 Ext.each(jsonData, function (dataItem) {
        //                                     var buttonConfig = {
        //                                         text: '<span style="font-size: 12px;color:white;">' + dataItem.name + '</span>',
        //                                         iconCls: dataItem.iconCls,
        //                                         height: 50,
        //                                         menu_id: dataItem.menu_id,
        //                                         module_id: 1,
        //                                         style: {
        //                                             margin: '10px',
        //                                             backgroundColor: dataItem.background
        //                                         },
        //                                         handler: function () {
        //                                             console.log(this.module_id);
        //                                             confirmationWindow.close();
        //                                             // User accepted, open 'main-app'
                                                    // Ext.create({
                                                    //     xtype: 'main-app'
                                                    // });
        //                                             checkUserSessionValidity(800000);
        //                                             setupTimers();

        //                                             var usersstr = Ext.getStore('usersstr'),
        //                                             intraygrid = Ext.getCmp('intraygrid'),
        //                                             //outtraygrid = Ext.getCmp('outtraygrid'),
        //                                             summaryintraygrid = Ext.getCmp('summaryintraygrid'),
        //                                             gmpproductlinestatusstr = Ext.getStore('gmpproductlinestatusstr'),
        //                                             confirmationstr = Ext.getStore('confirmationstr'),
        //                                             navigationstr = Ext.getStore('navigationstr');
        //                                             navigationstr.load();
        //                                             //intraygrid.down('combo[name=module_id]').setValue(this.module_id);
        //                                             //outtraygrid.down('combo[name=module_id]').setValue(this.module_id);
        //                                             summaryintraygrid.down('combo[name=module_id]').setValue(this.module_id);
        //                                             usersstr.load();
        //                                             gmpproductlinestatusstr.load();
        //                                             confirmationstr.load();
        //                                         }
        //                                     };

        //                                     // Push the button configuration into the buttons array
        //                                     buttons.push(buttonConfig);
        //                                 });

        //                                 // Create a button group containing the buttons
        //                                 var buttonGroup = Ext.create('Ext.container.ButtonGroup', {
        //                                     layout: 'column',
        //                                     width: '100%',
        //                                     defaults: {
        //                                         columnWidth: 0.25,
        //                                         padding: 10
        //                                     },
        //                                     style: {
        //                                         margin: '0 auto',
        //                                         border: 'none'
        //                                     },
        //                                      //columns: 5,
        //                                     items: buttons, 
        //                                     //width: '100%',
        //                                 });

        //                                 // Add the button group to mainTabPanel
        //                                 mainTabPanel.add(buttonGroup);
        //                                 mainTabPanel.updateLayout();
        //                                 Ext.getBody().unmask();
        //                             },
        //                             failure: function (response) {
        //                                 var resp = Ext.JSON.decode(response.responseText),
        //                                     message = resp.message;
        //                                 toastr.error(message, 'Failure Response');
        //                                 Ext.getBody().unmask();
        //                             },
        //                             error: function (jqXHR, textStatus, errorThrown) {
        //                                 Ext.getBody().unmask();
        //                                 toastr.error('Error fetching data: ' + errorThrown, 'Error Response');
        //                                 Ext.getBody().unmask();
        //                          },
        //                     });
        //                 }
        //             },
        //         },
        //     }],
        // });
        // confirmationWindow.show();

     Ext.create({
            xtype: 'main-app'
    });
       checkUserSessionValidity(800000);
        setupTimers();
         var usersstr = Ext.getStore('usersstr'),
        gmpproductlinestatusstr  = Ext.getStore('gmpproductlinestatusstr'),
         confirmationstr = Ext.getStore('confirmationstr'),
         navigationstr = Ext.getStore('navigationstr');

        usersstr.load();
        gmpproductlinestatusstr.load();
         navigationstr.load();
        confirmationstr.load();
        
    } else if (is_reset_pwd) {
        Ext.create({
            xtype: 'resetpwdscreen'
        });
    } else {
        Ext.create({
            xtype: 'login'
        });
    }
},

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
