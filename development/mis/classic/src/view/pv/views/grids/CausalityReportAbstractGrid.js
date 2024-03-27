
Ext.define('Admin.view.pv.views.grids.CausalityReportAbstractGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'causalityreportabstractgrid',
    features: [
    {
        ftype: 'summary',
        dock: 'bottom'
    }],
    export_title: 'Causality Evaluation Report',
 
    
    initComponent: function () {
        var defaultColumns = [
            {
                xtype: 'gridcolumn',
                dataIndex: 'question', tdCls: 'wrap-text',   
                text: 'Question',
                flex: 1,
                tdCls: 'wrap-text'
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'score_id',
                tdCls:'wrap-text',
                text: ' ',
                width: 160,
                editor: {
                    xtype: 'combo',
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'name',
                    listeners: {
                        beforerender: {
                            fn: 'setCompStore',
                            config: {
                                pageSize: 1000,
                                proxy: {
                                    extraParams: {
                                        table_name: 'par_pv_assessment_confirmation'
                                    }
                                }
                            },
                            isLoad: true
                        }
                    }
                },
                
                renderer: function (val, meta, record, rowIndex, colIndex, store, view) {
                    var textVal = 'Select true or False or Do Not Know';
                    if (view.grid.columns[colIndex].getEditor().getStore().getById(val)) {
                        textVal = view.grid.columns[colIndex].getEditor().getStore().getById(val).data.name;
                    }
                    return textVal;
                }
                
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'score', 
                tdCls: 'wrap-text',   
                text: 'Score',
                readOnly: true,
                flex: 1,
                tdCls: 'wrap-text',
                summaryType: 'sum',
                renderer: function (val, meta, record) {
                    return val;
                },
                summaryRenderer: function (val) {
                    val = Ext.util.Format.number(val, '0,000.00');
                    var message = 'Total Score: ' + val;
                    if (val > 9) {
                        message = 'Definite ' + message;
                    } else if (val >= 5 && val <= 8) {
                        message = 'Probable ' + message;
                    } else if (val >= 1 && val <= 4) {
                        message = 'Possible ' + message;
                    } else if (val <= 0) {
                        message = 'Doubtful ' + message;
                    }

                    return message;
                }
            }
        ];
            this.columns = defaultColumns.concat(this.columns);
            this.callParent(arguments);
    }
});