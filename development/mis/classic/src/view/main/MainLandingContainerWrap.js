Ext.define('Admin.view.main.MainLandingContainerWrap', {
    extend: 'Ext.container.Container',
    xtype: 'mainlandingcontainerwrap',

    requires : [
        'Ext.layout.container.HBox'
    ],

    scrollable: 'y',

    layout: {
        type: 'hbox',
        align: 'stretchmax',

        // Tell the layout to animate the x/width of the child items.
        animate: true,
        animatePolicy: {
            x: true,
            width: true
        }
    },

    beforeLayout : function() {
        // We setup some minHeights dynamically to ensure we stretch to fill the height
        // of the viewport minus the top toolbar

        var me = this,
            height = Ext.Element.getViewportHeight() - 64,  // offset by topmost toolbar height
            // We use itemId/getComponent instead of "reference" because the initial
            // layout occurs too early for the reference to be resolved
            //navTree = me.getComponent('navigationTreeList');//change this to reflect the changes made in Main.js as below
            navTree = me.getComponent('treelistContainer'),
            contenPanel=me.getComponent('contentPanel');

        me.maxHeight = height;
        me.minHeight = height;

        contenPanel.setStyle({
            'min-height': height + 'px'
        });

        me.callParent(arguments);
    }
});
