
Ext.define('Admin.view.pv.views.grids.CasualityEvaluationGrid', {
    extend: 'Admin.view.pv.views.grids.CausalityReportAbstractGrid',
    controller: 'pvvctr',
    xtype: 'casualityevaluationgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
        }
    },
    tbar: [ {
        xtype: 'button',
        text: 'Update/Save',
        iconCls: 'x-fa fa-plus',
        name:'update_report',
        handler:'saveCausalityAssessmentReport',
        ui: 'soft-green',
        winWidth: '35%',
        stores: '[]'
    },{
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    },
    {
        xtype:'hiddenfield',
        name: 'reaction_id'

    },
    {
        xtype:'hiddenfield',
        name: 'question_id'

    },{
        xtype:'hiddenfield',
        name: 'application_code'

    },'->'],
    
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local',
        position: 'bottom',
    },{
        ftype: 'summary',
        dock: 'bottom'
    }],
    export_title: 'causality Assessment Report',

    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function(){
         //     var store = this.getStore(),
         //     grid = this.up('grid'),
         //     reaction_id = grid.down('hiddenfield[name=reaction_id]').getValue();
         //     store.getProxy().extraParams = {
         //     reaction_id: reaction_id,
         // };
         this.up('grid').fireEvent('refresh', this, 'tra_pv_drug_history');
        }
    }],

    selType: 'cellmodel',
    plugins: [{
        ptype: 'cellediting',
        clicksToEdit: 1,
        editing: true
    },{
        ptype: 'filterfield'
    }
    // ,
    // {
    //     ptype: 'rowexpander',
    //     rowBodyTpl: new Ext.XTemplate(
    //         '<p>' +
    //         '<b>Guidelines(s):</b> {quidelines} ' +
    //         '</p>'
    //     )
    // }
    
    ],
    listeners: {
        beforerender: {
            fn: 'setGridStore',
            config: {
                pageSize: 1000,
                storeId: 'causalityevaluationgridstr',
                proxy: {
                   url: 'pv/getCasaultyAssessment',
                }
            },
            isLoad: true
        },
        afterrender: function () {
            var grid = this,
                isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue(),
                add_btn = grid.down('button[name=update_report]'),
                widgetCol = grid.columns[grid.columns.length - 1];
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                add_btn.setVisible(false);
                widgetCol.setHidden(true);
                widgetCol.widget.menu.items = [z];
            } else {
                add_btn.setVisible(true);
                widgetCol.setHidden(false);
               
            }
        }
    },
    columns: [
    ]
});


