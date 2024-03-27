Ext.define('Admin.view.psur.viewController.PsurVctr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.psurVctr',

    /**
     * Called when the view is created
     */
   
	// 
    setGridStore: function (obj, options) {
        this.fireEvent('setGridStore', obj, options);
    },
    setDynamicTreeGridStore: function (obj, options) {
        this.fireEvent('setDynamicTreeGridStore', obj, options);
    },

    setCompStore: function (obj, options) {
        this.fireEvent('setCompStore', obj, options);
    },

    showAddConfigParamWinFrm: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle=btn.winTitle,
            winWidth=btn.winWidth,
            child = Ext.widget(childXtype);

        funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
       
    }, 

    showRegistererdProductSelectionList: function (btn) {
    
        var grid = Ext.widget('psurregisteredproductsdetailsgrid'),
                    form=btn.up('form');
        
        funcShowCustomizableWindowWithObject('Registered Product Selection List', '90%', grid, 'customizablewindow',form);
    }, 


     showNewPsur: function (btn) {
        var application_type = btn.app_type,
            me = this;
            me.fireEvent('onNewPsurApplication', application_type, btn, 0);
    },

     setConfigCombosSectionfilterStore: function (obj, options) {

        this.fireEvent('setConfigCombosStoreWithSectionFilter', obj, options);
    },
    setConfigCombosStore: function (obj, options) {

        this.fireEvent('setConfigCombosStore', obj, options);
    },

    setConfigCombosProductfilterStore: function (obj, options) {

        this.fireEvent('setConfigCombosProductfilterStore', obj, options);
    },
    filterWorkflowStages: function (cmb, newVal) {
        var grid = cmb.up('grid'),
            stagesField = grid.down('combo[name=workflow_stage_id]'),
            store = stagesField.store,
            containerPnl = grid.up('drugproductregctn'),
            module_id = containerPnl.down('hiddenfield[name=module_id]').getValue(),
            section_id = containerPnl.down('hiddenfield[name=section_id]').getValue(),
            app_type = newVal;
        store.removeAll();
        store.load({ params: { module_id: module_id, section_id: section_id, sub_module_id: app_type } });
    },

    loadPsurWizardFromRecord: function(view, record) {
        this.fireEvent('loadPsurWizardFromRecord',view, record);
        
    },

    setWorkflowCombosStore: function (obj, options) {
        this.fireEvent('setWorkflowCombosStore', obj, options);
    },
     setConfigCombosStore: function (obj, options) {

        this.fireEvent('setConfigCombosStore', obj, options);
    },
    setOrgConfigCombosStore: function (obj, options) {
        this.fireEvent('setOrgConfigCombosStore', obj, options);
    },
    onViewPsurProductApplication: function (grid, record) {
        this.fireEvent('viewApplicationDetails', record);
    },
    // savePsurReceivingBaseDetails: function (btn) {
    //     console.log( btn.action_url);
    //     var wizard = btn.wizardpnl,
    //         wizardPnl = btn.up(wizard),
    //         action_url = btn.action_url,
    //         mainTabPnl = btn.up('#contentPanel'),
    //         containerPnl = mainTabPnl.getActiveTab();
    //         console.log(containerPnl);
    //         process_id = containerPnl.down('hiddenfield[name=process_id]').getValue(),
    //         module_id = containerPnl.down('hiddenfield[name=module_id]').getValue(),
    //         sub_module_id = containerPnl.down('hiddenfield[name=sub_module_id]').getValue(),
    //         section_id = containerPnl.down('hiddenfield[name=section_id]').getValue(),
    //         workflow_stage_id = containerPnl.down('hiddenfield[name=workflow_stage_id]').getValue(),
    //         active_application_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue(),
    //         active_application_code = containerPnl.down('hiddenfield[name=active_application_code]').getValue(),
    //        // product_id= containerPnl.down('hiddenfield[name=product_id]').getValue(),
    //         applicantDetailsForm = containerPnl.down('productapplicantdetailsfrm'),
    //         applicant_id = applicantDetailsForm.down('hiddenfield[name=applicant_id]').getValue(),
    //         localApplicantDetailsForm = containerPnl.down('productlocalapplicantdetailsfrm'),
    //         local_applicant_id = localApplicantDetailsForm.down('hiddenfield[name=applicant_id]').getValue(),
    //         psurDetailsForm = containerPnl.down('psurdetailsFrm'),
    //         psur_type_id = psurDetailsForm.down('combo[name=psur_type_id]').getValue(),
    //         remarks = psurDetailsForm.down('htmleditor[name=remarks]').getValue(),
    //         from_date = psurDetailsForm.down('datefield[name=from_date]').getValue(),
    //         to_date = psurDetailsForm.down('datefield[name=to_date]').getValue(),
    //         productDetailsForm = containerPnl.down('#productsDetailsFrm'),
    //         productDetailsFrm = productDetailsForm.getForm();

    //     if (!applicant_id) {
    //         toastr.warning('Please select applicant!!', 'Warning Response');
    //         return false;
    //     }
    //     if (!local_applicant_id) {
    //         toastr.warning('Please select Local Agent!!', 'Warning Response');
    //         return false;
    //     }
    //     if (!psur_type_id) {
    //         toastr.warning('Please select the report type!!', 'Warning Response');
    //         return false;
    //     }
    //    if (productDetailsFrm.isValid()) {
    //         productDetailsFrm.submit({
    //             url: 'psur/saveNewPsurReceivingBaseDetails',
    //             waitMsg: 'Please wait...',
    //             params: {
    //                 process_id: process_id,
    //                 workflow_stage_id: workflow_stage_id,
    //                 active_application_id: active_application_id,
    //                 applicant_id: applicant_id,
    //                 local_applicant_id: local_applicant_id,
    //                 module_id: module_id,
    //                 sub_module_id: sub_module_id,
    //                 section_id: section_id,
    //                 psur_type_id:psur_type_id,
    //                 remarks:remarks,
    //                 from_date:from_date,
    //                 to_date:to_date,
    //                 '_token': token
    //             },
    //             headers: {
    //                 'Authorization': 'Bearer ' + access_token
    //             },
    //             success: function (frm, action) {
    //                 var resp = action.result,
    //                     message = resp.message,
    //                     success = resp.success,
    //                     active_application_id = resp.active_application_id,
    //                     active_application_code = resp.application_code,
    //                     ref_no = resp.ref_no;
    //                     tracking_no = resp.tracking_no;
    //                 if (success == true || success === true) {
    //                     toastr.success(message, "Success Response");
    //                     containerPnl.down('hiddenfield[name=active_application_id]').setValue(active_application_id);
    //                     containerPnl.down('hiddenfield[name=active_application_code]').setValue(active_application_code);
    //                     containerPnl.down('displayfield[name=reference_no]').setValue(ref_no);
    //                     containerPnl.down('displayfield[name=tracking_no]').setValue(tracking_no);
                        
    
    //                 } else {
    //                     toastr.error(message, "Failure Response");
    //                 }
    //             },
    //             failure: function (frm, action) {
    //                 var resp = action.result;
                   
    //                     message = resp.message;
    //                     console.log(message);
    //                 toastr.error(message, "Failure Response");
    //             }
    //         });
    //    } 
    //     else {
    //         toastr.warning('Please fill all the required fields!!', 'Warning Response');
    //     }
    // },

 savePsurReceivingBaseDetails: function (btn) {
    var me = this,
            mainTabPnl = btn.up('#contentPanel'),
            activeTab = mainTabPnl.getActiveTab(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            detailsForm = activeTab.down('psurdetailsFrm'),
            detailsFrm = detailsForm.getForm(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();

        Ext.getBody().mask('Please wait...');
        
        if (detailsFrm.isValid()) {
                    
                    detailsFrm.submit({
                        url: 'psur/saveNewPsurReceivingBaseDetails',
                        headers: {
                            'Authorization': 'Bearer ' + access_token,
                            'X-CSRF-Token': token
                        },
                        params: {
                            process_id: process_id,
                            workflow_stage_id: workflow_stage_id,
                            application_id: application_id,
                            application_code: application_code,
                            module_id: module_id,
                            sub_module_id: sub_module_id,
                            section_id: section_id
                        },
                        waitMsg: 'Please wait...',
                        success: function (fm, action) {
                            var response = Ext.decode(action.response.responseText),
                                success = response.success,
                                message = response.message,
                                record_id = response.record_id,
                                ref_no = response.ref_no,
                                tracking_no = response.tracking_no,
                                application_code = response.application_code;
                            if (success == true || success === true) {
                               // if(application_id >0){
                                    activeTab.down('hiddenfield[name=active_application_id]').setValue(record_id);
                                    activeTab.down('hiddenfield[name=active_application_code]').setValue(application_code);
                                    activeTab.down('displayfield[name=reference_no]').setValue(ref_no);
                                    activeTab.down('displayfield[name=tracking_no]').setValue(tracking_no);

                              //  }
                                
                                toastr.success(message, 'Response');
                                
                            } else {
                                toastr.error(message, 'Failure Response');
                            }
                            Ext.getBody().unmask();
                        },
                        failure: function (fm, action) {
                            var resp = action.result;
                            toastr.error(resp.message, 'Failure Response');
                            Ext.getBody().unmask();
                        }
                    });
                } else {
                    Ext.getBody().unmask();
                    toastr.warning('Fill all required fields!!', 'Warning Response');
                    return;
                }

    },
    savepsurAssessmentdetails: function (btn) {
        var me = this,
            mainTabPnl = btn.up('#contentPanel'),
            containerPnl = mainTabPnl.getActiveTab();
            console.log(containerPnl);
            process_id = containerPnl.down('hiddenfield[name=process_id]').getValue(),
            module_id = containerPnl.down('hiddenfield[name=module_id]').getValue(),
            active_application_code = containerPnl.down('hiddenfield[name=active_application_code]').getValue(),
            active_application_id = containerPnl.down('hiddenfield[name=active_application_id]').getValue(),
            url = btn.action_url,
            table = btn.table_name,
            form = btn.up('form'),
            product_id = containerPnl.down('hiddenfield[name=product_id]').getValue(),
            win = form.up('window'),
            storeID = btn.storeID,
            store = Ext.getStore(storeID),
            frm = form.getForm();
            assessment_id = form.down('hiddenfield[name=assessment_id]');

        if (frm.isValid()) {
            frm.submit({
                url: url,
                waitMsg: 'Please wait...',
                params: {
                    active_application_code: active_application_code,
                    active_application_id: active_application_id,
                    product_id:product_id,
                    '_token': token
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (form, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                        record_id = response.record_id;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        assessment_id.setValue(record_id);
                        store.removeAll();
                        store.load({ params: { product_id: product_id } });
                        win.close();
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (form, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        }
    },
    showPreviousNonGridPanelUploadedDocs: function (item) {
        this.fireEvent('showPreviousNonGridPanelUploadedDocs', item);
    },
    onNextCardClick: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard),
            motherPnl = wizardPnl.up('panel');
        motherPnl.getViewModel().set('atBeginning', false);
        this.navigate(btn, wizardPnl, 'next');
    },
    onPrevCardClick: function (btn) {
        var wizard = btn.wizard,
            wizardPnl = btn.up(wizard),
            motherPnl = wizardPnl.up('panel');
            
        motherPnl.getViewModel().set('atEnd', false);
        this.navigate(btn, wizardPnl, 'prev');

    },

    navigate: function (button, wizardPanel, direction) {
        var layout = wizardPanel.getLayout(),
            progress = this.lookupReference('progress'),
            motherPnl = wizardPanel.up('panel'),
            application_id = motherPnl.down('hiddenfield[name=active_application_id]').getValue(),
            model = motherPnl.getViewModel(),
            progressItems = progress.items.items,
            item, i, activeItem, activeIndex,
            nextStep = wizardPanel.items.indexOf(layout.getNext());
            activeItem = layout.getActiveItem();
            activeIndex = wizardPanel.items.indexOf(activeItem);
            if(direction == 'next'){
                activeIndex++;
            }else{
                activeIndex--;
            }
            
            if(activeIndex > 1 && direction == 'next'){
                if(application_id){
                    //fgdg
                }else{
                    toastr.warning('Please save patient details first!!', 'Warning Response');
                    return false;
                }
            }
            layout[direction]();
            for (i = 0; i < progressItems.length; i++) {
                item = progressItems[i];

                if (activeIndex === item.step) {
                    item.setPressed(true);
                }
                else {
                    item.setPressed(false);
                }

                if (Ext.isIE8) {
                    item.btnIconEl.syncRepaint();
                }
            }
            activeItem.focus();
            // beginning disables previous
            if (activeIndex === 0) {
                wizardPanel.down('button[name=save_btn]').setDisabled(false);
                model.set('atBeginning', true);
            } else {
                wizardPanel.down('button[name=save_btn]').setDisabled(true);
                model.set('atBeginning', false);
            }

            // wizardPanel.down('button[name=save_btn]').setVisible(true);

            if (activeIndex === 4) {
                model.set('atEnd', true);
                wizardPanel.down('button[name=save_btn]').setDisabled(true);
                
            }else{
                model.set('atEnd', false);
            }
       
    },
    quickNavigation: function (btn) {
        var step = btn.step,
            wizard = btn.wizard,
            wizardPnl = btn.up(wizard),
            motherPnl = wizardPnl.up('panel'),
            application_id = motherPnl.down('hiddenfield[name=active_application_id]').getValue(),
            progress = wizardPnl.down('#progress_tbar'),
            progressItems = progress.items.items;

        // if (step > 1) {
        //     var thisItem = progressItems[step];
        //     if (!application_id) {
        //         thisItem.setPressed(false);
        //         toastr.warning('Please save application details first!!', 'Warning Response');
        //         return false;
        //     }
        // }
        if (step == 0) {
            wizardPnl.down('button[name=save_btn]').setDisabled(true);
            motherPnl.getViewModel().set('atBeginning', true);
        } else if (step == 1) {
            wizardPnl.down('button[name=save_btn]').setDisabled(false);
            motherPnl.getViewModel().set('atBeginning', false);
        } else {
            motherPnl.getViewModel().set('atBeginning', false);
        }

        if (step === 3) {
            motherPnl.getViewModel().set('atEnd', true);
            // wizardPnl.down('button[name=save_screening_btn]').setVisible(false);
            // motherPnl.getViewModel().set('atEnd', true);

        }
        else {
            motherPnl.getViewModel().set('atEnd', false);
        }
        
        wizardPnl.getLayout().setActiveItem(step);
        var layout = wizardPnl.getLayout(),
            item = null,
            i = 0,
            activeItem = layout.getActiveItem();

        for (i = 0; i < progressItems.length; i++) {
            item = progressItems[i];

            if (step === item.step) {
                item.setPressed(true);
            }
            else {
                item.setPressed(false);
            }

            if (Ext.isIE8) {
                item.btnIconEl.syncRepaint();
            }
        }
        activeItem.focus();
    },
    showUploadEvaluationDocuments: function (item) {
        this.fireEvent('showUploadEvaluationDocuments', item);
    },
    showSelectedApplicationMoreDetails: function(btn) {
         var button = btn.up('button'),
            grid = button.up('grid'),
            container = grid.up('panel'),
            record = button.getWidgetRecord(),
            application_code = record.get('application_code');
        container.down('hiddenfield[name=active_application_code]').setValue(application_code);
        this.fireEvent('showApplicationMoreDetails', btn);
    },
 
    viewApplicationRecommendationLogs:function(btn) {
        this.fireEvent('viewApplicationRecommendationLogs', btn);
    },
    reloadParentGridOnChange: function (combo) {
        var grid = combo.up('grid'),
            store = grid.getStore();
        store.load();
    },
    // funcActiveOtherInformationTab: function (tab) {
    //     this.fireEvent('funcActiveOtherPsurInformationTab', tab);

    // },
    funcActivePsurProductsOtherInformationTab: function (tab) {

        this.fireEvent('funcActivePsurProductsOtherInformationTab', tab);

    },
    showApplicationUploadedDocument: function(btn) {
         this.fireEvent('showPreviousUploadedDocs', btn);
        
    },
   showPreviousNonGridPanelUploadedDocs: function (item) {
        this.fireEvent('showPreviousNonGridPanelUploadedDocs', item);
    },
    // showPreviousNonGridPanelUploadedDocs: function (item) {
    //     this.fireEvent('showPreviousNonGridPanelUploadedDocs', item);
    // },
    previewpsureAssessmentDetails: function (item) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            childXtype = item.childXtype,
            winTitle=item.winTitle,
            winWidth=item.winWidth,
            form = Ext.widget(childXtype);
            form.loadRecord(record);
            form.down('button[name=save_btn]').setDisabled(true);
        funcShowCustomizableWindow(winTitle, winWidth, form, 'customizablewindow');
    
    },
    viewApplicationRecommendationLogs:function(btn) {
        var button = btn.up('button'),
            grid = button.up('grid'),
            grid = Ext.widget('applicationRecommendationLogGrid'),
            record = button.getWidgetRecord(),
            application_code = record.get('application_code'),
            module_id = record.get('module_id');
      
       
        grid.down('hiddenfield[name=application_code]').setValue(application_code);
        grid.down('hiddenfield[name=module_id]').setValue(module_id);
        
        funcShowCustomizableWindow('Assement Comments', '60%', grid, 'customizablewindow', btn);
        
    },
    previewPreviousPsurDetails: function (item) {
        var me = this
            mainTabPnl = item.up('#contentPanel'),
            containerPnl = mainTabPnl.getActiveTab();
            console.log(containerPnl);
            product_id = containerPnl.down('hiddenfield[name=product_id]').getValue(),
            childXtype = item.childXtype,
            winTitle=item.winTitle,
            winWidth=item.winWidth,
            pnl = Ext.widget(childXtype);
            pnl.down('hiddenfield[name=product_id]').setValue(product_id);
        funcShowCustomizableWindow(winTitle, winWidth, pnl, 'customizablewindow');
    
    },
});