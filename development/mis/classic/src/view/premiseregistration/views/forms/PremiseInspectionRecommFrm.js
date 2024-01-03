
Ext.define('Admin.view.premiseregistration.views.forms.PremiseInspectionRecommFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'premiseinspectionrecommfrm',
    itemId:'premiseinspectionrecommfrm',
    controller: 'premiseregistrationvctr',
    frame: true,
    scrollable:true,
    //autoScroll:true,
    bodyPadding: 5,
    layout: 'column',
    defaults: {
        columnWidth: 0.5,
        labelAlign: 'top',
        margin: 4,
        allowBlank: false
    },
    items: [{
        xtype: 'hiddenfield',
        name:'isReadOnly'
    },{
        xtype: 'hiddenfield',
        name: 'id'
    },
     {
            xtype: 'hidden',
            name: '_token',
            value: token
        }, 
    {
        xtype: 'hiddenfield',
        name: 'record_id'
    },
    {
        xtype: 'hiddenfield',
        name: 'premise_id'
    },
   {
            xtype:'fieldset',
            columnWidth: 1,
            title: 'Premises Details',
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
                xtype: 'combo',
                name: 'business_type_id',
                fieldLabel: 'Premise Type',
                forceSelection: true,
                queryMode: 'local',
                allowBlank: true,
                readOnly:true,
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
                                table_name: 'par_business_types'
                            }
                        }
                    },
                    isLoad: true
                }
            }
           },
       

          {
                xtype: 'combo',
                name: 'applicant_type_id',
                fieldLabel: 'Application  made for?',
                forceSelection: true,
                queryMode: 'local',
                allowBlank: false,
                readOnly:true,
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
                        readOnly:true,
                        allowBlank: false,
                        fieldLabel: 'Name of the Premise'
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
                        readOnly:true,
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
                xtype: 'textfield',
                name: 'company_registration_no',
                fieldLabel: 'Company Registration',
                allowBlank: true
            }, 
            {
            xtype: 'datefield',
            name: 'registration_date',
            fieldLabel: 'Business Registration Date',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            hidden:true,
            readOnly:true,
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
                readOnly:true,
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
                    },
                        change: function(cmbo,newVal){
                            var form=cmbo.up('form'),
                            other_classification=form.down('textfield[name=other_classification]');
                            if(newVal==3||newVal===3){
                                var is_visible = true;
                            }else{
                                var is_visible = false;
                            }
                            other_classification.setVisible(is_visible);
                        }
                    }
                },
                 {
                    xtype: 'textarea',
                    name: 'other_classification',
                    columnWidth: 1,
                    readOnly:true,
                    fieldLabel: 'Other Classifications',
                    allowBlank:true,
                    hidden: true
                },
                {
                    xtype: 'textarea',
                    name: 'premise_reg_no',
                    columnWidth: 1,
                    fieldLabel: 'Permit Reg No',
                    allowBlank:true,
                    hidden: true
                },
                {
                    xtype: 'textarea',
                    name: 'permit_no',
                    columnWidth: 1,
                    fieldLabel: 'Permit No',
                    allowBlank:true,
                    hidden: true
                }
           

            ]
          },

        {
            xtype:'fieldset',
            columnWidth: 1,
            title: 'Recommendations',
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
            xtype: 'textarea',
            columnWidth: 1,
            name: 'premise_state',
            fieldLabel: 'State of finishing; walls, roof and floor',
            allowBlank: true
        },
          {
                xtype: 'fieldcontainer',
                name:'new_room',
                columnWidth: 1,
                fieldLabel: 'Size of premises in square meters (indicate dimensions)',
                layout: 'fit',
                items:[{
                    xtype:'grid',
                tbar: [
                    {
                    xtype: 'button',
                    text: 'Add Room Size',
                    iconCls: 'x-fa fa-plus',
                    name: 'new_room',
                    ui: 'soft-green',
                    childXtype: 'premiseroomsizeFrm',
                    winWidth: '30%',
                    winTitle:'Add New Room'
                     }
                    ],
                    bbar: [{
                        xtype: 'pagingtoolbar',
                        width: '70%',
                        displayInfo: true,
                        displayMsg: 'Showing {0} - {1} of {2} total records',
                        emptyMsg: 'No Records',
                        beforeLoad: function () {
                            var store = this.getStore(),
                            grid = this.up('grid'),
                            form= grid.up('form'),
                            premise_id = Ext.ComponentQuery.query("#premisedetailsfrm")[0].down('hiddenfield[name=premise_id]').getValue();
                            store.getProxy().extraParams = {
                                premise_id: premise_id
                            };
                        }
                    },// Add a textfield to display the sum
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Total Area Sum',
                        itemId: 'totalAreaSumField',
                        readOnly: true // Make it read-only
                    }],
                     listeners: {
                        beforerender: {
                            fn: 'setPremiseRegGridsStore',
                            config: {
                                pageSize: 1000,
                                storeId: 'roomsizesstr',
                                proxy: {
                                    url: 'premiseregistration/getPremiseRoomSizes'
                                }
                            },
                            isLoad: true,
                            // Listener to calculate and update the sum
                            afterrender: function () {
                                var sum = 0,
                                    store = Ext.getStore('roomsizesstr');

                                // Explicitly load the store
                                store.load({
                                    callback: function (records, operation, success) {
                                        if (success) {
                                            store.each(function (record) {
                                                // Calculate the total area by multiplying 'length' and 'width'
                                                var length = record.get('length');
                                                var width = record.get('width');
                                                var totalArea = length * width;

                                                // Accumulate the sum
                                                sum += totalArea;
                                            });

                                            console.log("Sum: " + sum); // Log the calculated sum

                                            // Update the textfield with the sum
                                            // Check if the sum has decimal places
                                            var decimalSum = parseFloat(sum.toFixed(2));
                                            var displaySum = sum === decimalSum ? sum.toString() : decimalSum.toFixed(2);

                                            console.log("Display Sum: " + displaySum); // Log the displayed sum

                                            // Update the textfield with the sum
                                            var totalAreaSumField = this.down('#totalAreaSumField');
                                            if (totalAreaSumField) {
                                                totalAreaSumField.setValue(displaySum);
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    },
                        columns:[{
                        xtype: 'gridcolumn',
                        dataIndex: 'name',
                        text: 'Room Name',
                        flex: 1
   
                    },{
                        xtype: 'gridcolumn',
                        dataIndex: 'length',
                        text: 'length(Meters)',
                        flex: 1
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'width',
                        text: 'width(Meters)',
                        flex: 1
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'totalArea',
                        text: 'Total Area(square meters)',
                        flex: 1,
                        renderer: function (value, metaData, record) {
                            // Calculate the total area by multiplying 'length' and 'width'
                            var length = record.get('length');
                            var width = record.get('width');
                            var totalArea = length * width;

                            // Display the calculated total area in the 'Total Area' column


                            // Check if the sum has decimal places
                            var decimalArea = parseFloat(totalArea.toFixed(2));
                            var totalArea = totalArea === decimalArea ? totalArea.toString() : decimalArea.toFixed(2);

                            return totalArea;
                        }
                    },
                    {
                        text: 'Options',
                        xtype: 'widgetcolumn',
                        width: 90,
                        widget: {
                            width: 75,
                            textAlign: 'left',
                            xtype: 'splitbutton',
                            iconCls: 'x-fa fa-th-list',
                            ui: 'gray',
                            menu: {
                                xtype: 'menu',
                                items: [{
                                   text: 'Edit',
                                    iconCls: 'x-fa fa-edit',
                                    winTitle: 'Update Room Size',
                                    childXtype: 'premiseroomsizeFrm',
                                    winWidth: '30%',
                                    handler: 'showEditPremiseRegParamWinFrm',
                                    storeID: 'roomsizesstr',
                                    stores: '[]'
                                }, {
                                    text: 'Delete',
                                    iconCls: 'x-fa fa-trash',
                                    table_name: 'tra_premise_room_sizes',
                                    storeID: 'roomsizesstr',
                                    action_url: 'premiseregistration/deletePremiseRegRecord',
                                    action: 'actual_delete',
                                    handler: 'doDeleteNonAppPremiseOtherDetailsWin'
                             }]
                          }
                     }
                },]
                }]
            },
             {
                xtype:'fieldcontainer',
                columnWidth: 1,
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
            }, 
         {
            xtype: 'textarea',
            name: 'premise_size',
            columnWidth: 1,
            hidden:true,
            fieldLabel: 'Size of premises in square meters (indicate dimensions)',
            allowBlank: true
        },
        {
            xtype: 'textarea',
            name: 'proposed_changes',
            columnWidth: 1,
            fieldLabel: 'Proposed changes/adjustments to premises if any',
            allowBlank: true
        },

        {
            xtype: 'htmleditor',
            fieldLabel: 'Storage Details',
            columnWidth: 1,
            hidden:true,
            name: 'storage_details',
            allowBlank: true
        },
        {
            xtype: 'htmleditor',
            fieldLabel: 'Type of Storage Available',
            columnWidth: 1,
            hidden:true,
            name: 'storage_available',
            allowBlank: true
        },
        {
            xtype: 'htmleditor',
            fieldLabel: 'Cold Storage Facilities(describe number and type)',
            columnWidth: 1,
            hidden:true,
            name: 'cold_storage_facilities',
            allowBlank: true
        },
        // {
        //     xtype: 'textarea',
        //     columnWidth: 1,
        //     name: 'remarks',
        //     fieldLabel: 'Any other comments',
        //     allowBlank: true
        // },
        {
            xtype: 'htmleditor',
            fieldLabel: 'Comment',
            columnWidth: 1,
            name: 'remarks',
            allowBlank: true
        },

        {
            xtype: 'datefield',
            name: 'actual_start_date',
            fieldLabel: 'Inspection Date',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
            listeners: {
                change: function (field, newVal, oldVal) {
                    var form = field.up('form'),
                        end_date = form.down('datefield[name=actual_end_date]');
                    end_date.setMinValue(newVal);
                }
            }
        },
        {
            xtype: 'datefield',
            name: 'actual_end_date',
            fieldLabel: 'Actual End Date',
            submitFormat: 'Y-m-d',
            hidden:true,
            allowBlank:true,
            format: 'd/m/Y',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        }, {
        xtype: 'combo',
        name: 'inspection_type_id',
        fieldLabel: 'Inspection Type',
        queryMode: 'local',
        readOnly: true,
        forceSelection: true,
        valueField: 'id',
        displayField: 'name',
        listeners: {
            beforerender: {
                fn: 'setParamCombosStore',
                config: {
                    pageSize: 100,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_inspection_types'
                        }
                    }
                },
                isLoad: true
            },
            afterrender: function (cmbo) {
                var grid = cmbo.up('form'),
                    store = cmbo.getStore(),
                    filterObj = { id: 2 },
                    filterStr = JSON.stringify(filterObj);
                store.removeAll();
                store.load({ params: { filters: filterStr },
                    callback: function(records, operation, success) {
                        if (success && records && records.length > 0) {
                            var selectedRecord = records[0];
                            cmbo.setValue(selectedRecord.get('id'));
                        }
                    }
                });
              },
            }
        },
        {
            xtype: 'combo',
            name: 'recommendation_id',
            fieldLabel: "Inspector's Recommendation",
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_premiseinspection_recommendations'
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
                        xtype: 'combo',
                        fieldLabel: 'Reason for Your Choice (Above)',
                        name: 'recomendation_reason_id',
                        forceSelection: true,
                        queryMode: 'local',
                        valueField: 'id',
                        columnWidth: 0.9,
                        allowBlank: false,
                        labelAlign: 'top',
                        displayField: 'name',
                        listeners: {
                            afterrender: {
                                fn: 'setParamCombosStore',
                                config: {
                                    pageSize: 100,
                                    proxy: {
                                        url: 'commonparam/getCommonParamFromTable',
                                        extraParams: {
                                            table_name: 'par_recommendation_reasons'
                                        }
                                    }
                                },
                                isLoad: true
                            }
                        }
                    },
                    {
                        xtype: 'button',
                        iconCls: 'x-fa fa-plus',
                        name: 'btn_addrecommendation',
                        childXtype: 'premiseaddrecommendataionfrm',
                        columnWidth: 0.1,
                        table_name: 'par_recommendation_reasons',
                        storeId: 'parrecommendationreasonstr',
                        margin: '30 0 0 0'
                    }
                ]
            }

        ]
     },
      {
            xtype:'fieldset',
            columnWidth: 1,
            hidden:true,
            name:'regional_inspector',
            title: 'Regional Inspector Recommendations',
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
            items:[ {
            xtype: 'combo',
            name: 'regional_inspector_recommendation_id',
            fieldLabel: "Regional Inspector's Recommendation",
            queryMode: 'local',
            forceSelection: true,
            allowBlank: true,
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_premiseinspection_recommendations'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        
         {
            xtype: 'htmleditor',
            fieldLabel: 'Comment',
            columnWidth: 1,
            name: 'regional_inspector_remarks',
            allowBlank: true
        }

        ]
      },
      {
            xtype:'fieldset',
            columnWidth: 1,
            hidden:true,
            name:'chiefregional_inspector',
            title: 'Chief Regional Inspector Recommendations',
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
            items:[ {
            xtype: 'combo',
            name: 'chiefregional_inspector_recommendation_id',
            fieldLabel: "Chief Regional Inspector's Recommendation",
            queryMode: 'local',
            forceSelection: true,
            allowBlank: true,
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_premiseinspection_recommendations'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        
         {
            xtype: 'htmleditor',
            fieldLabel: 'Comment',
            columnWidth: 1,
            name: 'chiefregional_inspector_remarks',
            allowBlank: true
        }

        ]
     }
        
    ],
    buttons: [
        {
            text: 'Save Recommendation',
            iconCls: 'x-fa fa-save',
            formBind: true,
            ui: 'soft-purple',
            name:'btn_preminsprecommendation',
            handler: 'doSaveInspectionRecommendationDetails',
            action_url: 'premiseregistration/savePremiseInspectionRecommendation',
            table_name: 'tra_premiseinspection_applications',
        }
    ]
});