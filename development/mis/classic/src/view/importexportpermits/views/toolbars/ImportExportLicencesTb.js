/**
 * Created by softclans
 */
Ext.define('Admin.view.importexportpermits.views.toolbars.ImportExportLicencesTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'importexportlicencestb',
    ui: 'footer',
    defaults: {
        //arrowAlign: 'bottom',
        ui: 'soft-green',
        iconAlign: 'top'
    },
    requires: [
        'Ext.ux.BoxReorderer'
    ],
    plugins: 'boxreorderer',
    overflowHandler: 'scroller',
    items: [
        {
            text: 'Home',
            iconCls: 'x-fa fa-home',
            sec_dashboard:'drugsimportexportpermitsappsWrapper',
            name: 'disposalpermitstbRegHomeBtn'
        },
        {
            text: 'Initiate Import/Export Applications',
            iconCls: 'x-fa fa-plus-square',
            menu:{
                xtype: 'menu',
                items:[{
                    text: 'Import/Export License Application',
                    iconCls: 'x-fa fa-sitemap',
                    menu: {
                            xtype: 'menu',
                            items: [
                            {
                                text: 'Licenced Applications',
                                iconCls: 'x-fa fa-check',
                                handler:'onInitiateImportExportApplication',
                                 app_type:81,
                                 is_licenced: 3
                            },
                            '-',
                            {
                                text: 'Non-Licenced Applications',
                                iconCls: 'x-fa fa-check',
                                handler:'onInitiateImportExportApplication',
                                app_type: 81,
                                is_licenced: 0
                            }
                            ]
                           
                    }
                },
                // {
                //     text: 'Import/Export VC Application',
                //     iconCls: 'x-fa fa-sitemap',
                //     menu: {
                //             xtype: 'menu',
                //              items: [{
                //                 text: 'VC Application',
                //                 iconCls: 'x-fa fa-check',
                //                 handler:'onInitiateImportExportApplication',
                //                  app_type: 12
                //             }
                //             // ,'-',{
                //             //     text: 'Special Import Visa(Registered & Non-Registered Products and Optional Premises Registration)',
                //             //     iconCls: 'x-fa fa-check',
                //             //     handler:'onInitiateImportExportApplication',
                //             //     app_type: 15
                //             // },{
                //             //     text: 'Donations Import Visa Applications',
                //             //     iconCls: 'x-fa fa-check',
                //             //     handler:'onInitiateImportExportApplication',
                //             //     app_type: 80
                //             // },{
                //             //     text: 'Raw Material Import Visa Applications',
                //             //     iconCls: 'x-fa fa-check',
                //             //     handler:'onInitiateImportExportApplication',
                //             //     app_type: 14
                //             // },'-',
                //             // {
                //             //     text: 'Export Permit Applications',
                //             //     iconCls: 'x-fa fa-check',
                //             //     handler:'onInitiateImportExportApplication',
                //             //     app_type: 16
                //             // },'-',
                //             // {
                //             //     text: 'Special Export Visa(Registered & Non-Registered Products and Optional Premises Registration)',
                //             //     iconCls: 'x-fa fa-check',
                //             //     handler:'onInitiateImportExportApplication',
                //             //     app_type: 16
                //             // }
                //             ]
                            
                //         }

                // }
                ]
            }
        },
        '->',
        {
            text: 'Documents',
            iconCls: 'x-fa fa-folder'
        },{
            text: 'Workflow',
            iconCls: 'x-fa fa-sitemap', 
            menu:{
                xtype: 'menu',
                items:[
                    {
                        text: 'VC Applications',
                        iconCls: 'x-fa fa-check',
                        handler:'showImportExportPermitRegWorkflow',
                         app_type: 12
                    },
                    '-',
                    {
                        text: 'Licence Applications',
                        iconCls: 'x-fa fa-check',
                        handler:'showImportExportPermitRegWorkflow',
                        app_type: 81
                    }
                    // '-',{
                    //     text: 'Special Import Permit Applications',
                    //     iconCls: 'x-fa fa-check',
                    //     handler:'showImportExportPermitRegWorkflow',
                    //     app_type: 15
                    // },{
                    //     text: 'Special Export Permit Applications',
                    //     iconCls: 'x-fa fa-check',
                    //     handler:'showImportExportPermitRegWorkflow',
                    //     app_type: 13

                    // },{
                    //     text: 'Raw Material Import Permit Applications',
                    //     iconCls: 'x-fa fa-check',
                    //     handler:'showImportExportPermitRegWorkflow',
                    //     app_type: 14
                    // },
                ]
            }
        }
    ]
});