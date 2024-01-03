

/**
 * Created by Softclans
 */
Ext.define('Admin.view.importexportpermits.views.forms.common_forms.OnlineImportExportNonLicenceBusinessDetailsfrm', {
    extend: 'Ext.form.Panel',
    xtype: 'onlineimportexportnonlicencebusinessdetailsfrm',
    itemId: 'onlineimportexportnonlicencebusinessdetailsfrm',
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
        name: 'table_name',
        value: 'wb_importexport_applications'
    },
    {
                xtype: 'textfield',
                fieldLabel: 'TIN No.',
                labelWidth: 80,
                displayField: 'tpin_no',
                name: 'tpin_no'
                //columnWidth: 1
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
    });
        
