
Ext.define('Admin.view.personnelmanagement.viewcontrollers.PersonnelManagementVctr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.personelmanagementvctr',

   
    init: function () {

    }, 

    setUserGridsStore: function (obj, options) {
        this.fireEvent('setUserGridsStore', obj, options);
    },

    setUserCombosStore: function (obj, options) {
        this.fireEvent('setUserCombosStore', obj, options);
    },
     setConfigGridsStore: function (obj, options) {
        this.fireEvent('setConfigGridsStore', obj, options);
    },
    setParamCombosStore: function (obj, options) {
        this.fireEvent('setParamCombosStore', obj, options);
    },
    setConfigCombosStore: function (obj, options) {
        this.fireEvent('setConfigCombosStore', obj, options);
    },

    setOrgConfigCombosStore: function (obj, options) {
        this.fireEvent('setOrgConfigCombosStore', obj, options);
    },
  
   showSimplePersonnelModuleGridForm: function (btn) {
            var me = this,
                formWidget = btn.form,
                grid = btn.up('grid'),
                parentPanel = grid.up('panel'),
                form = Ext.widget(formWidget),
                document_type_id=33,
                reference_table_name='tra_premise_incharge_personnel',
                table_name='personnel_management_uploaddocuments',
                childXtype = Ext.ComponentQuery.query("#unstructureddocumentuploadsgrid")[0],
                storeArray = eval(btn.stores),
                arrayLength = storeArray.length;
                childXtype.down('hiddenfield[name=document_type_id]').setValue(document_type_id);
                childXtype.down('hiddenfield[name=table_name]').setValue(table_name);
                childXtype.down('hiddenfield[name=reference_table_name]').setValue(reference_table_name);
            if (arrayLength > 0) {
                me.fireEvent('refreshStores', storeArray);
            }
            grid.hide();
            parentPanel.add(form);
       
    },


    personnelBackToDashboardFromActive: function (btn) {
        var currentPnlXtype = btn.currentPnlXtype,
        currentPnl = btn.up(currentPnlXtype),
        containerPnlXtype = btn.containerPnlXtype,
        hiddenCompXtype = btn.hiddenCompXtype,
        containerPnl = btn.up(containerPnlXtype),
        grid = containerPnl.down(hiddenCompXtype);
        containerPnl.remove(currentPnl);
        grid.store.removeAll();
        grid.store.load();
        grid.show();
    },


    onPrevCardClick: function (btn) {
        var wizardPnl = btn.up('inchargewizardfrm'),
            motherPnl = wizardPnl.up('inchargepnl');
        motherPnl.getViewModel().set('atEnd', false);
        this.navigate(btn, wizardPnl, 'prev');
    },

    onNextCardClick: function (btn) {
        var wizardPnl = btn.up('inchargewizardfrm'),
            motherPnl = wizardPnl.up('inchargepnl'),
            basicFrm = wizardPnl.down('inchargebasicinfofrm'),
            childXtype = wizardPnl.down('unstructureddocumentuploadsgrid'),
            record_id = basicFrm.down('hiddenfield[name=id]').getValue();
         if(record_id != ''){
                childXtype.down('hiddenfield[name=reference_record_id]').setValue(record_id);
                store = childXtype.getStore();
                store.removeAll();
                store.load(); 
            }
            else{
                toastr.warning('Please save Personnel Details first!!', 'Warning Response');
                return false;
            }
        motherPnl.getViewModel().set('atBeginning', false);
        this.navigate(btn, wizardPnl, 'next');
    },

    navigate: function (button, panel, direction) {
        var layout = panel.getLayout(),
            progress = this.lookupReference('progress'),
            model = panel.up('inchargepnl').getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex;

        layout[direction]();

        activeItem = layout.getActiveItem();
        activeIndex = panel.items.indexOf(activeItem);

        for (i = 0; i < progressItems.length; i++) {
            item = progressItems[i];

            if (activeIndex === item.step) {
                item.setPressed(true);
            } else {
                item.setPressed(false);
            }

            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }

        activeItem.focus();

        // beginning disables previous
        if (activeIndex === 0) {
            model.set('atBeginning', true);
        }

        // wizard is 4 steps. Disable next at end.
        if (activeIndex === 1) {
            model.set('atEnd', true);
        }
    },

    quickNavigation: function (btn) {
        var step = btn.step,
            formPnl = btn.up('inchargewizardfrm'),
            motherPnl = formPnl.up('inchargepnl'),  
            basicFrm = formPnl.down('inchargebasicinfofrm'),
            childXtype = formPnl.down('unstructureddocumentuploadsgrid'),
            record_id = basicFrm.down('hiddenfield[name=id]').getValue(),
            progress = formPnl.down('#progress_tbar'),
            progressItems = progress.items.items;
            

        if (step > 0) {
            var thisItem = progressItems[step];
            if(record_id != ''){
                childXtype.down('hiddenfield[name=reference_record_id]').setValue(record_id);
                store = childXtype.getStore();
                store.removeAll();
                store.load();  
            }
            else{
                toastr.warning('Please save Personnel Details first!!', 'Warning Response');
                return false;
            }

        }

        if (step == 1) {
            motherPnl.getViewModel().set('atEnd', true);
        } else {
            motherPnl.getViewModel().set('atEnd', false);
        }
        if (step == 0) {
            motherPnl.getViewModel().set('atBeginning', true);
        } else {
            motherPnl.getViewModel().set('atBeginning', false);
        }

        formPnl.getLayout().setActiveItem(step);
        var layout = formPnl.getLayout(),
            model = motherPnl.getViewModel(),
            item = null,
            i = 0,
            activeItem = layout.getActiveItem(),
            activeIndex = formPnl.items.indexOf(activeItem);

        for (i = 0; i < progressItems.length; i++) {
            item = progressItems[i];

            if (step === item.step) {
                item.setPressed(true);
            } else {
                item.setPressed(false);
            }

            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();
    },

    saveInchargeInformation: function (btn) {
        if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
            var me = this,
                progressPanel = btn.up('inchargewizardfrm'),
                containerPanel = progressPanel.up('drugshopinchargespnl'),
                inchargepnl = progressPanel.up('inchargepnl'),
                dashboardContainer = containerPanel.up('#drugshopincharges'),
                grid = containerPanel.down('grid'),
                form = progressPanel.down('inchargebasicinfofrm'),
                saved_name = form.down('hiddenfield[name=saved_name]').getValue(),
                frm = form.getForm();
               
            if (frm.isValid()) {
                if (saved_name == '' || saved_name === '') {
                        toastr.warning('Please upload Passport Photo!!', 'Warning Response');
                        return;
                    }
                frm.submit({
                    url: 'personnelmanagement/savePersonnelInformation',
                    params: {
                        _token: token
                    },
                    waitMsg: 'Please wait...',
                    success: function (fm, action) {
                        var response = Ext.decode(action.response.responseText),
                            message = response.message,
                            success = response.success;
                        if (success == true || success === true) {
                            /*dashboardContainer*/
                            containerPanel.remove(inchargepnl, true);
                            grid.store.load();
                            grid.show();
                            toastr.success(message, 'Success Response');
                        } else {
                            toastr.error(message, 'Failure Response');
                        }
                    },
                    failure: function (form, action) {
                        var response = Ext.decode(action.response.responseText),
                            message = response.message,
                            success = response.success;
                        toastr.error(message, 'Failure Response');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        toastr.error('Error: ' + errorThrown, 'Error Response');
                    }
                });
            } else {
                toastr.warning('Invalid form submission, please fill all the required details!!', 'Warning Response');
                return false;
            }
        } else {
            toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
            return false;
        }
    },


    uploadPersonnelImage: function (btn) {
        var me = this,
            form = btn.up('form'),
            frm = form.getForm();
        frm.submit({
            clientValidation: false,
            url: 'personnelmanagement/savePersonnelImage',
            params: {
                _token: token
            },
            waitMsg: 'Uploading...',
            success: function (fm, action) {
                var response = Ext.decode(action.response.responseText),
                    message = response.message,
                    success = response.success;
                if (success == true || success === true) {
                    var savedName = response.image_name;
                    toastr.success(message, 'Success Response');
                    form.down('image[name=user_photo]').setSrc(base_url + '/resources/images/personnel-profile/' + savedName);
                    form.down('hiddenfield[name=saved_name]').setValue(savedName);
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (fm, action) {
                var response = Ext.decode(action.response.responseText),
                    message = response.message;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    },

    showEditSystemPersonnel: function (view, record, item, index, e, eOpts) {
        var me = this,
            grid = view.grid,
            profile_url = record.get('saved_name'),
            personnel_id = record.get('id'),
            is_active = record.get('is_active'),
            panel = grid.up('panel'),
            userContainerPnl = Ext.widget('inchargepnl'),
            userWizardPnl = userContainerPnl.down('inchargewizardfrm'),
            basicFrm = userWizardPnl.down('inchargebasicinfofrm'),
            document_type_id=33,
            reference_table_name='tra_premise_incharge_personnel',
            table_name='personnel_management_uploaddocuments',
            childXtype = userContainerPnl.down('unstructureddocumentuploadsgrid');
            childXtype.down('hiddenfield[name=document_type_id]').setValue(document_type_id);
            childXtype.down('hiddenfield[name=table_name]').setValue(table_name);
            childXtype.down('hiddenfield[name=reference_table_name]').setValue(reference_table_name);
            userWizardPnl.down('hiddenfield[name=active_personnel_id]').setValue(personnel_id);
            userWizardPnl.down('button[action=delete]').setVisible(true);
            if(is_active==1 || is_active===1){
            userWizardPnl.down('button[action=block]').setVisible(true);
            }else{
             userWizardPnl.down('button[action=activate]').setVisible(true);
            }
            basicFrm.loadRecord(record);
       
       
        if (profile_url) {
            basicFrm.down('image[name=user_photo]').setSrc(base_url + '/resources/images/personnel-profile/' + profile_url);
        }
        grid.hide();
        panel.add(userContainerPnl);
    },


        showUserEditSystemPersonnel: function (item) {
        var btn = item.up('button'),
            grid=btn.up('grid'),
            record = btn.getWidgetRecord(),
            profile_url = record.get('saved_name'),
            personnel_id = record.get('id'),
            is_active = record.get('is_active'),
            panel = grid.up('panel'),
            userContainerPnl = Ext.widget('inchargepnl'),
            userWizardPnl = userContainerPnl.down('inchargewizardfrm'),
            basicFrm = userWizardPnl.down('inchargebasicinfofrm'),
            document_type_id=33,
            reference_table_name='tra_premise_incharge_personnel',
            table_name='personnel_management_uploaddocuments',
            childXtype = userContainerPnl.down('unstructureddocumentuploadsgrid');
            childXtype.down('hiddenfield[name=document_type_id]').setValue(document_type_id);
            childXtype.down('hiddenfield[name=table_name]').setValue(table_name);
            childXtype.down('hiddenfield[name=reference_table_name]').setValue(reference_table_name);
            userWizardPnl.down('hiddenfield[name=active_personnel_id]').setValue(personnel_id);
            userWizardPnl.down('button[action=delete]').setVisible(true);
            if(is_active==1 || is_active===1){
            userWizardPnl.down('button[action=block]').setVisible(true);
            }else{
             userWizardPnl.down('button[action=activate]').setVisible(true);
            }
            basicFrm.loadRecord(record);
    
       
        if (profile_url) {
            basicFrm.down('image[name=user_photo]').setSrc(base_url + '/resources/images/personnel-profile/' + profile_url);
        }
        grid.hide();
        panel.add(userContainerPnl);
    },




    updateModelUserNameOnChange: function (textfield, newVal, oldVal) {
        var form = textfield.up('form'),
            containerPnl = form.up('inchargepnl'),
            vm = containerPnl.getViewModel();
        vm.set('name', newVal);
    },

    updateModelUserEmailOnChange: function (textfield, newVal, oldVal) {
        var form = textfield.up('form'),
            containerPnl = form.up('inchargepnl'),
            vm = containerPnl.getViewModel();
        vm.set('email', newVal);
    },



    deactivateSystemPersonnel: function (button) {
        var me = this,
            wizardFrmPnl = button.up('inchargewizardfrm'),
            containerPanel1 = wizardFrmPnl.up('inchargepnl'),
            containerPanel2 = containerPanel1.up('panel'),
            basicFrm = wizardFrmPnl.down('inchargebasicinfofrm'),
            grid = containerPanel2.down('grid'),
            id = basicFrm.down('hiddenfield[name=id]').getValue(),
            email = basicFrm.down('textfield[name=email]').getValue(),
            table_name = 'tra_premise_incharge_personnel',
            storeID = 'premiseinchargeStr',
            action_url = 'personnelmanagement/deactivatePersonnel',
            store = Ext.getStore(storeID);
        Ext.MessageBox.show({
            title: 'Reason',
            msg: 'Please enter the reason for deactivating this Personnel:',
            width: 320,
            buttons: Ext.MessageBox.OKCANCEL,
            multiline: true,
            scope: this,
            animateTarget: button,
            fn: function (btn, text) {
                var reason = text;
                if (btn === 'ok') {
                    if (reason == '' || reason === '') {
                        toastr.warning('Please Enter Reason!!', 'Warning Response');
                        return;
                    }
                    Ext.getBody().mask('Deactivating Personnel...');
                    Ext.Ajax.request({
                        url: action_url,
                        params: {
                            table_name: table_name,
                            reason: reason,
                            email: email,
                            id: id,
                            _token: token
                        },
                        success: function (response) {
                            Ext.getBody().unmask();
                            var resp = Ext.JSON.decode(response.responseText);
                            toastr.success(resp.message, 'Success Response');
                            store.removeAll();
                            store.load();
                            containerPanel2.remove(containerPanel1, true);
                            grid.show();
                        },
                        failure: function (response) {
                            Ext.getBody().unmask();
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            Ext.getBody().unmask();
                            toastr.error('Error deleting data: ' + errorThrown, 'Error Response');
                        }
                    });
                }
            }
        });
    },

    deleteSystemPersonnel: function (button) {
        var me = this,
            wizardFrmPnl = button.up('inchargewizardfrm'),
            containerPanel1 = wizardFrmPnl.up('inchargepnl'),
            containerPanel2 = containerPanel1.up('panel'),
            basicFrm = wizardFrmPnl.down('inchargebasicinfofrm'),
            grid = containerPanel2.down('grid'),
            id = basicFrm.down('hiddenfield[name=id]').getValue(),
            table_name = 'tra_premise_incharge_personnel',
            storeID = 'premiseinchargeStr',
            action_url = 'personnelmanagement/deletePersonelRecord',
            store = Ext.getStore(storeID);

        Ext.MessageBox.confirm('Confirm', 'Are you sure to delete this Personnel ?', function (btn) {
            if (btn === 'yes') {
                Ext.getBody().mask('Deleting user...');
                Ext.Ajax.request({
                    url: action_url,
                    params: {
                        table_name: table_name,
                        id: id,
                        _token: token
                    },
                    success: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText);
                        toastr.success(resp.message, 'Success Response');
                        store.removeAll();
                        store.load();
                        containerPanel2.remove(containerPanel1, true);
                        grid.show();
                    },
                    failure: function (response) {
                        Ext.getBody().unmask();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        Ext.getBody().unmask();
                        toastr.error('Error deleting data: ' + errorThrown, 'Error Response');
                    }
                });
            } else {
                //
            }
        });
    },



     activateSystemPersonnel: function (button) {
        var me = this,
            wizardFrmPnl = button.up('inchargewizardfrm'),
            containerPanel1 = wizardFrmPnl.up('inchargepnl'),
            containerPanel2 = containerPanel1.up('panel'),
            basicFrm = wizardFrmPnl.down('inchargebasicinfofrm'),
            grid = containerPanel2.down('grid'),
            id = basicFrm.down('hiddenfield[name=id]').getValue(),
            table_name = 'tra_premise_incharge_personnel',
            storeID = 'premiseinchargeStr',
            action_url = 'personnelmanagement/activatePersonelRecord',
            store = Ext.getStore(storeID);

        Ext.MessageBox.confirm('Confirm', 'Are you sure to activate this Personnel ?', function (btn) {
            if (btn === 'yes') {
                Ext.getBody().mask('Activating user...');
                Ext.Ajax.request({
                    url: action_url,
                    params: {
                        table_name: table_name,
                        id: id,
                        _token: token
                    },
                    success: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText);
                        toastr.success(resp.message, 'Success Response');
                        store.removeAll();
                        store.load();
                        containerPanel2.remove(containerPanel1, true);
                        grid.show();
                    },
                    failure: function (response) {
                        Ext.getBody().unmask();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        Ext.getBody().unmask();
                        toastr.error('Error updating data: ' + errorThrown, 'Error Response');
                    }
                });
            } else {
                //
            }
        });
    },



});