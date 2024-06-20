/**
 * Created by Kip on 1/6/2019.
 */
Ext.define('Admin.view.gvpapplications.views.toolbars.VeterinaryMedicinesGvpTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'veterinarymedicinesgvptb',
    ui: 'footer',
    defaults: {
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
            name: 'drugsGvpHomeBtn',
            dash_wrapper: 'drugsgvpdashwrapper',
            dashboard: 'drugsgvpdash'
        },
        {
            text: 'GVP Application',
            iconCls: 'x-fa fa-plus-square',
            menu:{
                xtype: 'menu',
                items:[
                    {
                        text: 'New GVP',
                        iconCls: 'x-fa fa-check',
                        handler:'showNewGvpApplication',
                        wrapper_xtype: 'drugsgvpdashwrapper',
                        app_type: 127
                    },
                    '-',
                    {
                        text: ' GVP Renewal',
                        iconCls: 'x-fa fa-check',
                        handler:'showNewGvpApplication',
                        wrapper_xtype: 'drugsgvpdashwrapper',
                        app_type: 128
                    },
                ]
            }
        },
        '->',
        {
            text: 'Documents',
            iconCls: 'x-fa fa-folder'
        },
        {
            text: 'Workflow',
            iconCls: 'x-fa fa-sitemap',
            menu:{
                xtype: 'menu',
                items:[
                    {
                        text: 'New GVP',
                        iconCls: 'x-fa fa-check',
                        handler:'showGvpApplicationWorkflow',
                        wrapper_xtype: 'drugsgvpdashwrapper',
                        app_type: 127
                    },
                    {
                        text: 'Drugs Renewal',
                        iconCls: 'x-fa fa-check',
                        handler:'showGvpApplicationWorkflow',
                        wrapper_xtype: 'drugsgvpdashwrapper',
                        app_type: 128
                    },
                    {
                        text: 'Drugs  Widthrawal',
                        iconCls: 'x-fa fa-check',
                        handler:'showGvpApplicationWorkflow',
                        wrapper_xtype: 'drugsgvpdashwrapper',
                        app_type: 129
                    },
                    {
                        text: 'Drugs  Variation',
                        iconCls: 'x-fa fa-check',
                        handler:'showGvpApplicationWorkflow',
                        wrapper_xtype: 'drugsgvpdashwrapper',
                        app_type: 130
                    }
                ]
            }
        }
    ]
});