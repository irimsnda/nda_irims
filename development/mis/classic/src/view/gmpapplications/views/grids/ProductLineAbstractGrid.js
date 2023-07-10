/**
 * Created by Kip on 1/5/2019.
 */
Ext.define('Admin.view.gmpapplications.views.grids.ProductLineAbstractGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'productlineabstractgrid',
    plugins: [{
            ptype: 'gridexporter'
    }],
    export_title: 'Product line Details',
 
    
    initComponent: function () {
        // These are the default columns that will show for every extended grid
        var defaultColumns = [{
                xtype: 'gridcolumn',
                dataIndex: 'product_line_category',
                tdCls:'wrap-text', tdCls: 'wrap-text',   
                text: 'Product Line Category',
                flex: 1
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'product_line_name', tdCls: 'wrap-text',   
                text: 'Dosage Form',
                flex: 1
            },{
                xtype: 'gridcolumn',
                dataIndex: 'product_line_namecheck',
                text: 'Product Line Name',
                align: 'center',     tdCls: 'wrap-text',   
                tdcls: 'editor-text',
                width: 120,
                editor: {
                    xtype: 'combo',
                    store: 'confirmationstr',
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local',
                    listeners: {
                       
                    }
                },
                
                renderer: function (val, meta, record, rowIndex, colIndex, store, view) {
                    var textVal = 'Select true or False';
                    if (view.grid.columns[colIndex].getEditor().getStore().getById(val)) {
                        textVal = view.grid.columns[colIndex].getEditor().getStore().getById(val).data.name;
                    }
                    return textVal;
                }
                
            },  {
                xtype: 'gridcolumn',
                dataIndex: 'manufacturingsite_block_no',
                tdCls:'wrap-text',
                text: 'Building Block name/Number',
                flex: 1,
                 editor: {
                    xtype: 'combo',
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local',
                    listeners: {
                        beforerender: {
                        fn: 'setParamCombosStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'gmpapplications/getSiteBlockDetails'
                            }
                        },
                        isLoad: false
                    },
                    afterrender: function(){
                        var store=this.getStore();
                            //form=this.up('form'),
                            //site_id=form.down('hiddenfield[name=manufacturing_site_id]').getValue();
                        store.load({params:{manufacturing_site_id: 48}})
                    }
                       
                }
                },
                
                renderer: function (val, meta, record, rowIndex, colIndex, store, view) {
                   // var store = record.store, // Get the store associated with the record
                    // filterValue = store.getFilters().get('id'); // Get the filter value for the column

                    // // Custom rendering logic
                    // if (filterValue && value === filterValue) {
                    //     return '<span style="color: red;">' + value + '</span>'; // Apply custom style if the value matches the filter
                    // } else {
                    var textVal = 'Select Block';
                    if (view.grid.columns[colIndex].getEditor().getStore().getById(val)) {
                        textVal = view.grid.columns[colIndex].getEditor().getStore().getById(val).data.name;
                    }
                    return textVal;
                //}
               }
                
            },
            // {
            //     xtype: 'gridcolumn',
            //     dataIndex: 'no_ofproduction_lines',tdCls:'wrap-text',
            //     text: 'Number of production lines',
            //     flex: 1,
            //     editor: {
            //         xtype:'textfield'
            //     }
            // },

            {
                xtype: 'gridcolumn',
                dataIndex: 'non_betalactam',tdCls:'wrap-text',
                text: 'Non β-lactam',
                flex: 1,
                editor: {
                    xtype: 'combo',
                    store: 'confirmationstr',
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local',
                    listeners: {
                       
                    }
                },
                
                renderer: function (val, meta, record, rowIndex, colIndex, store, view) {
                    var textVal = 'Select true or False';
                    if (view.grid.columns[colIndex].getEditor().getStore().getById(val)) {
                        textVal = view.grid.columns[colIndex].getEditor().getStore().getById(val).data.name;
                    }
                    return textVal;
                }
                
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'beta_lactam_id',tdCls:'wrap-text',
                text: 'β-lactam',
                flex: 1,
                editor: {
                    xtype: 'combo',
                    store: 'betalactamsstr',
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local',
                    listeners: {
                       
                    }
                },
                
                renderer: function (val, meta, record, rowIndex, colIndex, store, view) {
                    var textVal = 'Select β-lactam(s)';
                    if (view.grid.columns[colIndex].getEditor().getStore().getById(val)) {
                        textVal = view.grid.columns[colIndex].getEditor().getStore().getById(val).data.name;
                    }
                    return textVal;
                }
            },{
                xtype: 'gridcolumn',
                dataIndex: 'gmpproduct_type_id',
                tdCls:'wrap-text',
                text: 'Product Type',
                flex: 1,
                flex: 1,
                editor: {
                    xtype: 'combo',
                    store: 'gmpproducttypestr',
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local',
                    listeners: {
                       
                    }
                },
                
                renderer: function (val, meta, record, rowIndex, colIndex, store, view) {
                    var textVal = 'Select Product Type';
                    if (view.grid.columns[colIndex].getEditor().getStore().getById(val)) {
                        textVal = view.grid.columns[colIndex].getEditor().getStore().getById(val).data.name;
                    }
                    return textVal;
                }
            } ,{
                xtype: 'gridcolumn',
                dateaIndex: 'product_line_description',
                tdCls:'wrap-text',
                text: 'Product Line Description',
                flex: 1,
                editor: {
                    xtype:'textfield'
                },renderer: function (val) {
                    if (val == '') {
                       
                             var val = 'Product Line Description';
                    }
                    return val;
                }
            }];
            this.columns = defaultColumns.concat(this.columns);
            this.callParent(arguments);
    }
});