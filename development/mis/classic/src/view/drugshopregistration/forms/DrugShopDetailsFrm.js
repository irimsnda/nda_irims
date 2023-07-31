
Ext.define('Admin.view.drugshopregistration.views.forms.DrugShopDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'drugshopdetailsfrm',
    alias: "widget.drugshopdetailsfrm",
    itemId: 'drugshopdetailsfrm',
    scrollable: true,
    layout: {
        type: 'column'
    },
    autoScroll: true,
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.33,
        margin: 5,
        labelAlign: 'top',
        allowBlank: false
    },
    listeners: {
        afterrender: function () {
            var form = this,
                isReadOnly = form.down('hiddenfield[name=isReadOnly]').getValue();
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                form.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
            }
        }
    },
    items: [ {
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    },
    {
        xtype: 'hiddenfield',
        name: 'is_local',
        value: 1
    },
    {
        xtype: 'hiddenfield',
        name: 'premise_id'
    },
    {
        xtype: 'hiddenfield',
        name: 'manufacturing_site_id'
    },
    {
        xtype: 'hiddenfield',
        name: 'main_registered_id'
    },
    {
        xtype: 'hiddenfield',
        name: 'temporal_premise_id'
    },
    {
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    },{
            xtype:'fieldset',
            columnWidth: 1,
            title: 'Drug Shop Details',
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
            items:[  {
                xtype: 'combo',
                name: 'applicant_type_id',
                fieldLabel: 'Application  made for?',
                forceSelection: true,
                queryMode: 'local',
                allowBlank: false,
                valueField: 'id',
                displayField: 'name',
                listeners: {
                 beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_premiseapplications_types'
                            }
                        }
                    },
                    isLoad: true
                }
            }
           },

            {
                xtype: 'fieldcontainer',
                layout: 'column',
                defaults: {
                    labelAlign: 'top'
                },
                items: [
                    {
                        xtype: 'textfield',
                        name: 'name',
                        columnWidth: 0.9,
                        allowBlank: false,
                        fieldLabel: 'Name of the Business'
                    },
                    {
                        xtype: 'button',
                        iconCls: 'x-fa fa-search',
                        disabled: true,
                        columnWidth: 0.1,
                        tooltip: 'Search',
                        action: 'search_premise',
                        childXtype: 'premiseselectiongrid',
                        winTitle: 'Premises Selection List',
                        winWidth: '90%',
                        margin: '30 0 0 0'
                    }
                ]
            },
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
                        fieldLabel: 'Tin No'
                    },
                    {
                        xtype: 'button',
                        iconCls: 'x-fa fa-search',
                        disabled: true,
                        columnWidth: 0.1,
                        tooltip: 'Search',
                        disabled:true,
                        action: 'search_tinno',
                        childXtype: 'tinnoeselectiongrid',
                        winTitle: 'Tin No Selection List',
                        winWidth: '90%',
                        margin: '30 0 0 0'
                    }
                ]
            },  
            {
            xtype: 'datefield',
            name: 'registration_date',
            fieldLabel: 'Business Registration Date',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            allowBlank: true,
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
           },
           
            
               {
                xtype: 'combo',
                fieldLabel: 'Product Classification',
                name: 'product_classification_id',
                valueField: 'id',
                displayField: 'name',
                queryMode: 'local',
                allowBlank: true,
                forceSelection: true,
                listeners: {
                    beforerender: {
                        fn: 'setParamCombosStore',
                        config: {
                            pageSize: 100,
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_premise_class'
                                }
                            }
                        },
                        isLoad: true
                    }
                }
            }
            
           

            ]
        },
        {
                xtype:'fieldset',
                columnWidth: 1,
                itemId: 'director_fieldset',
                title: "Director's Information and Declarations",
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
                items:[{
                    xtype: 'textfield',
                    fieldLabel: 'Name of Managing Director',
                    name: 'managing_director',
                    allowBlank: false
                },{
                    xtype: 'textfield',
                    fieldLabel: "Managing Director's Email",
                    name: 'managing_director_email',
                },{
                    xtype: 'textfield',
                    fieldLabel: "Managing Director's Telephone No",
                    name: 'managing_director_telepone',
                }, {
                    xtype: 'combo',
                    name: 'applicant_contact_person',
                    fieldLabel: 'Director as Contact Person',
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local',
                    forceSelection: true,
                    value: 1,
                    listeners: { 
                        beforerender: {
                            fn: 'setParamCombosStore',
                            config: {
                                pageSize: 100,
                                proxy: {
                                    url: 'commonparam/getCommonParamFromTable',
                                    extraParams: {
                                        table_name: 'par_confirmations'
                                    }
                                }
                            },
                            isLoad: true
                        },
                        change: function(cmbo,newVal){
                            var form=cmbo.up('form'),
                            contact_person=form.down('textfield[name=contact_person]'),
                            contact_telephone_no=form.down('textfield[name=contact_person_telephone]'),
                            contact_email_address=form.down('textfield[name=contact_person_email]');
                            if(newVal==1||newVal===1){
                                var is_visible = false;
                            }else{
                                var is_visible = true;
                            }
                            contact_person.setVisible(is_visible);
                            contact_telephone_no.setVisible(is_visible);
                            contact_email_address.setVisible(is_visible);
                        }
                    }
                }, {
                    xtype: 'textfield',
                    name: 'contact_person',
                    fieldLabel: 'Contact Person',
                    allowBlank: true,
                    hidden: true
                },{
                    xtype: 'textfield',
                    name: 'contact_person_telephone',
                    allowBlank: true,
                    fieldLabel: 'Contact Person Telephone No',
                    hidden: true
                },
                {
                    xtype: 'textfield',
                    name: 'contact_person_email',
                    allowBlank: true,
                    fieldLabel: ' Contact Person Email Address',
                    hidden: true
                },
                 {
                xtype: 'combo',
                fieldLabel: 'Has the applicant,any partner or director been convicted within the past three years, within or outside Uganda, of any offence involving drug?',
                name: 'had_offence',
                columnWidth: 1,
                allowBlank: false,
                valueField: 'id',
                displayField: 'name',
                forceSelection: true,
                queryMode: 'local',
                emptyText: 'Select',
                listeners: {
                    beforerender: {
                        fn: 'setConfigCombosStore',
                        config: {
                            pageSize: 1000,
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_confirmations'
                                }
                            }
                        },
                        isLoad: true
                    },
                    change: function(combo, newVal, oldValue, eopts) {
                        if(newVal == 1){
                            var form = combo.up('form'),
                                offence = form.down('htmleditor[name=offence]');
                            offence.setVisible(true);
                            offence.allowBlank = false;
                            offence.validate();
                        }else{
                            var form = combo.up('form'),
                                offence = form.down('htmleditor[name=offence]');
                            offence.setVisible(false);
                            offence.allowBlank = true;
                            offence.validate();
                        }
                        
                    }
                   
                }
            },{
                xtype: 'htmleditor',
                fieldLabel: 'Details',
                // margin: '0 20 20 20',
                columnWidth: 1,
                name: 'offence',
                hidden: true,
                allowBlank: true
            },
             {
                xtype: 'combo',
                fieldLabel: 'Has any previous application by the applicants any partner or director,for a license to operate any type of pharmaceutical business been refused or cancelled?',
                name: 'had_cancelled_application',
                columnWidth: 1,
                allowBlank: false,
                valueField: 'id',
                displayField: 'name',
                forceSelection: true,
                queryMode: 'local',
                emptyText: 'Select',
                listeners: {
                    beforerender: {
                        fn: 'setConfigCombosStore',
                        config: {
                            pageSize: 1000,
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_confirmations'
                                }
                            }
                        },
                        isLoad: true
                    },
                    change: function(combo, newVal, oldValue, eopts) {
                        if(newVal == 1){
                            var form = combo.up('form'),
                                offence = form.down('htmleditor[name=cancelling_reason]');
                            offence.setVisible(true);
                            offence.allowBlank = false;
                            offence.validate();
                        }else{
                            var form = combo.up('form'),
                                offence = form.down('htmleditor[name=cancelling_reason]');
                            offence.setVisible(false);
                            offence.allowBlank = true;
                            offence.validate();
                        }
                        
                    }
                   
                }
            },{
                xtype: 'htmleditor',
                fieldLabel: 'Details',
                // margin: '0 20 20 20',
                columnWidth: 1,
                name: 'cancelling_reason',
                hidden: true,
                allowBlank: true
            },

             {
                xtype: 'combo',
                fieldLabel: 'Does the applicant work in any other health institution (Private or Public) ?',
                name: 'is_workinotherinstitutions',
                columnWidth: 1,
                allowBlank: false,
                valueField: 'id',
                displayField: 'name',
                forceSelection: true,
                queryMode: 'local',
                emptyText: 'Select',
                listeners: {
                    beforerender: {
                        fn: 'setConfigCombosStore',
                        config: {
                            pageSize: 1000,
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_confirmations'
                                }
                            }
                        },
                        isLoad: true
                    },
                    change: function(combo, newVal, oldValue, eopts) {
                        if(newVal == 1){
                            var form = combo.up('form'),
                                offence = form.down('htmleditor[name=working_inotherinstitutions]');
                            offence.setVisible(true);
                            offence.allowBlank = false;
                            offence.validate();
                        }else{
                            var form = combo.up('form'),
                                offence = form.down('htmleditor[name=working_inotherinstitutions]');
                            offence.setVisible(false);
                            offence.allowBlank = true;
                            offence.validate();
                        }
                        
                    }
                   
                }
            },{
                xtype: 'htmleditor',
                fieldLabel: 'Details',
                // margin: '0 20 20 20',
                columnWidth: 2,
                name: 'working_inotherinstitutions',
                hidden: true,
                allowBlank: true
            }]
        },
        {
                xtype:'fieldset',
                columnWidth: 1,
                title: "Details of the Applicant (Full time in Charge)",
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

            //    {
            //     xtype: 'combo',
            //     fieldLabel: 'NIN',
            //     name: 'incharge_nin_no',
            //     triggerAction:'all',
            //     typeAhead:true,
            //     mode:'remote',
            //     minChars:4,
            //     forceSelection:true,
            //     hideTrigger:true,
            //     listeners: {
            //         beforerender: {
            //             fn: 'setParamCombosStore',
            //             config: {
            //                 pageSize: 100,
            //                 proxy: {
            //                     url: 'premiseregistration/getPremiseIncharge'
            //                 }
            //             },
            //             isLoad: true
            //         },
            //         select: function(combo, record) {
            //             console.log(record);
            //           const form = combo.up('form'); // Assuming the TextField is part of a form
            //           form.getForm().setValues({
            //             'incharge_nin_no': record.get('incharge_nin_no'),
            //             'incharge_name': record.get('incharge_name')
            //             // Add more fields as needed based on your database record structure
            //           });
            //         }
            //     }
            // }, 


            {
                xtype: 'fieldcontainer',
                layout: 'column',
                defaults: {
                    labelAlign: 'top'
                },
                items: [
                    {
                        xtype: 'textfield',
                        name: 'incharge_nin_no',
                        columnWidth: 0.9,
                        allowBlank: false,
                        fieldLabel: 'NIN'
                    },
                    {
                        xtype: 'button',
                        iconCls: 'x-fa fa-search',
                        // disabled: true,
                        columnWidth: 0.1,
                        tooltip: 'Search',
                        childXtype: 'premiseinchargeselectiongrid',
                        winTitle: 'Premise Incharge',
                        winWidth: '90%',
                        handlerFn: 'loadSelectedPremiseIncharge',
                        handler: 'showPremiseInchargeSelectionGrid',
                        margin: '30 0 0 0'
                    }
                ]
            }, 

             {
                xtype: 'textfield',
                name: 'incharge_name',
                allowBlank:false,
                fieldLabel: 'Full Names',
                readOnly: true
            },

             {
                xtype: 'combo',
                name: 'incharge_qualification_id',
                fieldLabel: 'Qualification',
                forceSelection: true,
                queryMode: 'local',
                allowBlank: true,
                readOnly: true,
                valueField: 'id',
                displayField: 'name',
                listeners: {
                    beforerender: {
                        fn: 'setParamCombosStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_personnel_qualifications'
                                }
                            }
                        },
                        isLoad: true
                    }
                }
               },

            {
                xtype: 'textfield',
                name: 'incharge_telephone_no',
                allowBlank:true,
                fieldLabel: 'Telephone No',
                readOnly: true
            },
             {
                xtype: 'textfield',
                name: 'incharge_telephone_no2',
                allowBlank:true,
                hidden:true,
                fieldLabel: 'Telephone No 2',
                readOnly: true,
                listeners: {
                  afterrender: function (textfield) {
                        // Check if the textfield has a value
                        var value = textfield.getValue();

                        // If the value is not empty or null, set hidden to false
                        if (value) {
                            textfield.setHidden(false);
                         }
                    }
                }

            },
           {
                xtype: 'textfield',
                name: 'incharge_telephone_no3',
                allowBlank:true,
                hidden:true,
                fieldLabel: 'Telephone No 3',
                readOnly: true,
                listeners: {
                  afterrender: function (textfield) {
                        // Check if the textfield has a value
                        var value = textfield.getValue();

                        // If the value is not empty or null, set hidden to false
                        if (value) {
                            textfield.setHidden(false);
                         }
                    }
                }

            },

             {
                xtype: 'textfield',
                name: 'incharge_email_address',
                allowBlank:true,
                fieldLabel: 'Email Address',
                readOnly: true
              },
              {
                xtype: 'textfield',
                name: 'incharge_email_address2',
                allowBlank:true,
                hidden:true,
                fieldLabel: 'Email Address 2',
                readOnly: true,
                listeners: {
                  afterrender: function (textfield) {
                        // Check if the textfield has a value
                        var value = textfield.getValue();

                        // If the value is not empty or null, set hidden to false
                        if (value) {
                            textfield.setHidden(false);
                         }
                    }
                }

            },
              {
                xtype: 'textfield',
                name: 'incharge_email_address3',
                allowBlank:true,
                hidden:true,
                fieldLabel: 'Email Address 3',
                readOnly: true,
                listeners: {
                  afterrender: function (textfield) {
                        // Check if the textfield has a value
                        var value = textfield.getValue();

                        // If the value is not empty or null, set hidden to false
                        if (value) {
                            textfield.setHidden(false);
                         }
                    }
                }

              },
        
               {
                xtype: 'combo',
                fieldLabel: 'Country',
                name: 'incharge_country_id',
                allowBlank:true,
                forceSelection: true,
                queryMode: 'local',
                valueField: 'id',
                displayField: 'name',
                listeners: {
                    beforerender: {
                        fn: 'setParamCombosStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'parameters/country'
                            }
                        },
                        isLoad: true
                    },
                    change: function (cmbo, newVal) {
                        var form = cmbo.up('form'),
                            regionStore = form.down('combo[name=incharge_region_id]').getStore(),
                            filterObj = {country_id: newVal},
                            filterStr = JSON.stringify(filterObj);
                        regionStore.removeAll();
                        regionStore.load({params: {filter: filterStr}});
                    }
                }
            },
            {
                xtype: 'combo',
                fieldLabel: 'Region',
                name: 'incharge_region_id',
                //store: 'regionsstr',
                allowBlank:true,
                forceSelection: true,
                queryMode: 'local',
                valueField: 'id',
                displayField: 'name',
                listeners: {
                    beforerender: {
                        fn: 'setParamCombosStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'parameters/region'
                            }
                        },
                        isLoad: false
                    },
                    change: function (cmbo, newVal) {
                        var form = cmbo.up('form'),
                            districtStore = form.down('combo[name=incharge_district_id]').getStore(),
                            filterObj = {region_id: newVal},
                            filterStr = JSON.stringify(filterObj);
                        districtStore.removeAll();
                        districtStore.load({params: {filter: filterStr}});
                    }
                }
            },
            {
                xtype: 'combo',
                fieldLabel: 'District',
                name: 'incharge_district_id',
                allowBlank:true,
                forceSelection: true,
                queryMode: 'local',
                valueField: 'id',
                displayField: 'name',
                listeners: {
                    beforerender: {
                        fn: 'setParamCombosStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'parameters/district'
                            }
                        },
                        isLoad: false
                    }
                  
                }
              }
            ]
            },{
            xtype:'fieldset',
            columnWidth: 1,
            title: 'Location Details',
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
            items:[{
                xtype: 'combo',
                fieldLabel: 'Country',
                name: 'country_id',
                //store: 'countriesstr',
                forceSelection: true,
                queryMode: 'local',
                valueField: 'id',
                displayField: 'name',
                listeners: {
                    beforerender: {
                        fn: 'setParamCombosStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'parameters/country'
                            }
                        },
                        isLoad: false
                    },
                    change: function (cmbo, newVal) {
                        var form = cmbo.up('form'),
                            regionStore = form.down('combo[name=region_id]').getStore(),
                            filterObj = {country_id: newVal},
                            filterStr = JSON.stringify(filterObj);
                        regionStore.removeAll();
                        regionStore.load({params: {filter: filterStr}});
                    }
                }
            },
            {
                xtype: 'combo',
                fieldLabel: 'Region',
                name: 'region_id',
                //store: 'regionsstr',
                forceSelection: true,
                queryMode: 'local',
                valueField: 'id',
                displayField: 'name',
                listeners: {
                    beforerender: {
                        fn: 'setParamCombosStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'parameters/region'
                            }
                        },
                        isLoad: false
                    },
                    change: function (cmbo, newVal) {
                        var form = cmbo.up('form'),
                            districtStore = form.down('combo[name=district_id]').getStore(),
                            filterObj = {region_id: newVal},
                            filterStr = JSON.stringify(filterObj);
                        districtStore.removeAll();
                        districtStore.load({params: {filter: filterStr}});
                    }
                }
            },
            {
                xtype: 'combo',
                fieldLabel: 'District',
                name: 'district_id',
                //store: 'districtsstr',
                forceSelection: true,
                queryMode: 'local',
                valueField: 'id',
                displayField: 'name',
                listeners: {
                    beforerender: {
                        fn: 'setParamCombosStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'parameters/district'
                            }
                        },
                        isLoad: false
                    },
                    change: function (cmbo, newVal) {
                        var form = cmbo.up('form'),
                            districtStore = form.down('combo[name=county_id]').getStore(),
                            filterObj = {region_id: newVal},
                            filterStr = JSON.stringify(filterObj);
                        districtStore.removeAll();
                        districtStore.load({params: {filter: filterStr}});
                    }
                }
            }, 

            {
                xtype: 'combo',
                fieldLabel: 'County/Division',
                name: 'county_id',
                allowBlank: true,
                forceSelection: true,
                queryMode: 'local',
                valueField: 'id',
                displayField: 'name',
                listeners: {
                    beforerender: {
                        fn: 'setParamCombosStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'parameters/county'
                            }
                        },
                        isLoad: false
                    },
                    change: function (cmbo, newVal) {
                        var form = cmbo.up('form'),
                            districtStore = form.down('combo[name=sub_county_id]').getStore(),
                            filterObj = {region_id: newVal},
                            filterStr = JSON.stringify(filterObj);
                        districtStore.removeAll();
                        districtStore.load({params: {filter: filterStr}});
                    }
                }
            },
            {
                xtype: 'combo',
                fieldLabel: 'Sub County',
                name: 'sub_county_id',
                allowBlank: true,
                forceSelection: true,
                queryMode: 'local',
                valueField: 'id',
                displayField: 'name',
                listeners: {
                    beforerender: {
                        fn: 'setParamCombosStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'parameters/subcounty'
                            }
                        },
                        isLoad: true
                    }
                  
                }
            }, 
           {
                xtype: 'textfield',
                fieldLabel: 'village',
                name: 'village'
            },{
                xtype: 'textfield',
                name: 'street',
                allowBlank:true,
                fieldLabel: 'Street/Road'
            },
             {
                xtype: 'textfield',
                name: 'email',
                fieldLabel: 'Email Address'
            },
            {
                xtype: 'textfield',
                name: 'telephone',
                fieldLabel: 'Telephone No'
                
            },

            {
                xtype: 'textarea',
                fieldLabel: 'Physical Address',
                columnWidth: 1,
                name: 'physical_address'
            },
            {
                xtype:'fieldcontainer',
                layout: {
                    type: 'column'
                },
                defaults:{
                    columnWidth: 0.49,
                    labelAlign: 'top'
                },
                items:[
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Latitude',
                        name: 'latitude',
                        allowBlank: true
                    },{
                        xtype: 'textfield',
                        fieldLabel: 'Longitude',
                        name: 'longitude',
                        allowBlank: true
                    }
                ]
            } 
           ]

     }
    ]
});