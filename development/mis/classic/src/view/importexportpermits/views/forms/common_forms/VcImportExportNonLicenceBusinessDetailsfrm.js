

/**
 * Created by Softclans
 */
Ext.define('Admin.view.importexportpermits.views.forms.common_forms.VcImportExportNonLicenceBusinessDetailsfrm', {
    extend: 'Ext.form.Panel',
    xtype: 'vcimportexportnonlicencebusinessdetailsfrm',
    itemId: 'vcimportexportnonlicencebusinessdetailsfrm',
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
    
    //title: 'APPLICANTION DETAILS',
    items: [

        {
        xtype: 'hiddenfield',
        name: 'id',
        allowBlank: true
    }, {
            xtype: 'hiddenfield',
            name: 'tpin_id'
        },{
        xtype: 'hiddenfield',
        name: 'table_name',
        value: 'wb_importexport_applications'
    },
{
    xtype:'fieldset',
    columnWidth: 1,
    title: "BUSINESS DETAILS ",
    collapsible: true,
    defaults: {
        labelAlign: 'top',
        allowBlank: false,
        labelAlign: 'top',
        margin: 5,
        xtype: 'textfield',
        allowBlank: false,
        columnWidth: 0.33,
    },
    layout: 'column',
      items:[

        {
            xtype: 'fieldcontainer',
            layout: 'column',
            defaults: {
                labelAlign: 'top'
            },
            items: [
                {
                    xtype: 'textfield',
                    name: 'tpin_no',
                    columnWidth: 0.9,
                    allowBlank: false,
                    fieldLabel: 'TIN No.',
                    bind: {
                        readOnly: '{isReadOnly}'
                    }
                },
            //     {
            //     xtype: 'textfield',
            //     fieldLabel: 'TIN No.',
            //     labelWidth: 80,
            //     displayField: 'tpin_no',
            //     name: 'tpin_no'
            //     //columnWidth: 1
            // },
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-search',
                    columnWidth: 0.1,
                    tooltip: 'Search',
                    action: 'search_premise',
                    childXtype: 'importbusinessselectiongrid',
                    winTitle: 'Premises Selection List',
                    winWidth: '90%',
                    margin: '30 0 0 0',
                    bind: {
                        disabled: '{isReadOnly}'
                    }
                }
            ]
        },
    

            {
                xtype: 'textfield',
                fieldLabel: 'Name of Business',
                labelWidth: 80,
                displayField: 'name',
                name: 'name',
            },

            {
                xtype: 'textfield',
                fieldLabel: 'Physical address of the Business or Institution',
                labelWidth: 80,
                displayField: 'physical_address',
                name: 'physical_address',
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Email',
                labelWidth: 80,
                displayField: 'email',
                name: 'email',
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Company Registration Number',
                labelWidth: 80,
                displayField: 'company_registration_no',
                name: 'company_registration_no',
            }
        ]
    },
        
   ],
   
});