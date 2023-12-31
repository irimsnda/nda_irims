Ext.define('Admin.view.authentication.LockScreen', {
    extend: 'Admin.view.authentication.LockingWindow',
    xtype: 'lockscreen',
    autoShow: false,
    requires: [
        'Admin.view.authentication.Dialog',
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox'
    ],
    title: 'zamra RIMS [Session Expired]',

    defaultFocus : 'authdialog',  // Focus the Auth Form to force field focus as well

    items: [
        {
            xtype: 'authdialog',
            reference: 'authDialog',
            defaultButton : 'loginButton',
            autoComplete: false,
            width: 455,
            cls: 'auth-dialog-login',
            defaultFocus : 'textfield[inputType=password]',
            layout: {
                type  : 'vbox',
                align : 'stretch'
            },

            items: [
                {
                    xtype: 'container',
                    cls: 'auth-profile-wrap',
                    height : 120,
                    layout: {
                        type: 'hbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'image',
                            height: 80,
                            margin: 20,
                            width: 80,
                            alt: 'lockscreen-image',
                            cls: 'lockscreen-profile-img auth-profile-img',
                            src: profile_pic_url
                        },
                        {
                            xtype: 'box',
                            html: '<div class=\'user-name-text\'>'+ fullnames+' </div><div class=\'user-post-text\'>'+user_role_description+' </div>'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    padding: '0 20',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },

                    defaults: {
                        margin: '10 0'
                    },

                    items: [
                        {
                            xtype: 'hiddenfield',
                            name: '_token',
                            value: token
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'user_id',
                            value: user_id
                        },
                        {
                            xtype: 'textfield',
                            labelAlign: 'top',
                            name: 'password',
                            cls: 'lock-screen-password-textbox',
                            labelSeparator: '',
                            fieldLabel: 'It\'s been a while. please enter your password to resume',
                            emptyText: 'Password',
                            inputType: 'password',
                            allowBlank: false,
                            triggers: {
                                glyphed: {
                                    cls: 'trigger-glyph-noop password-trigger'
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            reference: 'loginButton',
                            scale: 'large',
                            ui: 'soft-blue',
                            iconAlign: 'right',
                            iconCls: 'x-fa fa-angle-right',
                            text: 'Login',
                            formBind: true,
                            handler: 'reValidateUser'
                        },
                        {
                            xtype: 'component',
                            html: '<div style="text-align:right">' +
                            '<a href="#login" class="link-forgot-password" onclick="event.preventDefault()">'+
                            'or, sign in using other credentials</a>' +
                            '</div>',
                            listeners: {
                                el: {
                                    delegate: 'a',
                                    click: 'onLogoutClick'
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
