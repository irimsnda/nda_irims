

/**
 * Created by Softclans
 */
Ext.define('Admin.view.importexportpermits.views.forms.common_forms.ImportExportInspectionBookingDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'importexportinspectionbookingdetailsfrm',
    itemId: 'importexportdetailsfrm',
    layout: {
        type: 'column',
        columns: 3
    },
    bodyPadding: 5,
    controller: 'importexportpermitsvctr',
    defaults: {
        margin: 5,
        labelAlign: 'right',
        width: '100%',
        columnWidth: 0.33,
        labelAlign: 'top',
        allowBlank: false,
       
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'id',
        allowBlank: true
    }, {
                xtype: 'hiddenfield',
                name: 'section_id'
            },{
        xtype: 'hiddenfield',
        name: 'table_name',
        value: 'wb_importexport_applications'
    }, {
        xtype: 'combo',
        fieldLabel: 'Application Type',
        labelWidth: 80,
        readOnly: true,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'sub_module_id',
        hidden: true,
        queryMode: 'local',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        readOnly: true,
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'workflow/getSystemSubModules',
                        extraParams: {
                            model_name: 'SubModule',
                            module_id: 4
                        }
                    }
                },
                isLoad: true
            }

        }
    },{
        xtype: 'combo',
        fieldLabel: 'Application Reason',
        name: 'importation_reason_id',
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getNonrefParameter',
                        extraParams: {
                            table_name: 'par_importexport_reasons'
                        }
                    }
                },
                isLoad: true
            },
            change:'funcOnChangePermitCategory'
        },bind: {
            readOnly: '{isReadOnly}'
        },
    }, {
        xtype: 'combo',
        fieldLabel: 'Product Category',
        name: 'product_category_id',
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        //url: 'configurations/getRegistrationApplicationParameters',
                        url: 'configurations/getNonrefParameter',
                        extraParams: {
                            table_name: 'par_importexport_product_category'
                        }
                    }
                },
                isLoad: false
            }
        },bind: {
            readOnly: '{isReadOnly}'
        },
    },{
        xtype: 'combo',
        fieldLabel: 'Port Of Entry/Exit',
        labelWidth: 80,
        allowBlank: true,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'port_id',
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getNonrefParameter',
                        extraParams: {
                            table_name: 'par_ports_information',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            }
        },bind: {
            readOnly: '{isReadOnly}'
        },
    },{
        xtype: 'combo',
        fieldLabel: 'Mode of Transport',
        labelWidth: 80,
        allowBlank: true,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'mode_oftransport_id',
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getNonrefParameter',
                        extraParams: {
                            table_name: 'par_modesof_transport'
                        }
                    }
                },
                isLoad: true
            }
        },bind: {
            readOnly: '{isReadOnly}'
        },
    },{
        xtype: 'textfield',
        name: 'proforma_invoice_no',bind: {
            readOnly: '{isReadOnly}'
        },
        fieldLabel: 'Invoice No',
    },{
        xtype: 'textfield',
        name: 'clearing_agent',bind: {
            readOnly: '{isReadOnly}'
        },
        fieldLabel: 'Agent Name',
    }, {
        xtype: 'textfield',
        name: 'clearing_agent_no',bind: {
            readOnly: '{isReadOnly}'
        },
        fieldLabel: 'Agent Contact',
    },{
        xtype: 'textfield',
        name: 'clearing_agent_email',bind: {
            readOnly: '{isReadOnly}'
        },
        fieldLabel: 'Agent Email',
    },{
        xtype: 'textfield',
        name: 'clearing_agent_firm',bind: {
            readOnly: '{isReadOnly}'
        },
        fieldLabel: 'Agent Firm',
    },{
        xtype: 'textfield',
        name: 'package_no',bind: {
            readOnly: '{isReadOnly}'
        },
        fieldLabel: 'Number of Packages to be Inspected',
    },{
        xtype: 'datefield',
        name: 'proforma_invoice_date',bind: {
            readOnly: '{isReadOnly}'
        },
        format:'Y-m-d',
        altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
        fieldLabel: 'Invoice Date',
    },{
        xtype: 'textfield',
        fieldLabel: 'Custom Clearance/Declaration Number',
        name:'custom_declaration_no',bind: {
            readOnly: '{isReadOnly}'
        }
    },
    // {
    //     xtype: 'textfield',
    //     fieldLabel: 'Clearing Agent',
    //     name:'clearing_agent',bind: {
    //         readOnly: '{isReadOnly}'
    //     }
    // }, 
    {
        xtype: 'datefield',
        name: 'shipment_date',bind: {
            readOnly: '{isReadOnly}'
        },
        format:'Y-m-d',
        altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
        fieldLabel: 'Consignment Shipment Date',
    },
     {
        xtype: 'datefield',
        name: 'proposed_inspection_date',bind: {
            readOnly: '{isReadOnly}'
        },
        format:'Y-m-d',
        altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
        fieldLabel: 'Proposed Inspection Date',
    }]  
});