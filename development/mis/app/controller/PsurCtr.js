Ext.define('Admin.controller.PsurCtr', {
    extend: 'Ext.app.Controller',
    stores: [],
    config: {
        refs: [{
            ref: 'mainPanel',
            selector: 'maincontainerwrap'
        }, {
            ref: 'mainTabPanel',
            selector: '#contentPanel'
        }
        ],
        control: {
            'psurTb button[name=psurHomeBtn]': {
                click: 'psurHome'
            },
            'pvgrid': {
                refresh: 'refreshPvMainGrids'
            },
            // 'newPvReceivingWizard': {
            //     afterrender: 'preparePvReceiving'
            // },

            'newpsurreceivingwizard button[name=process_submission_btn]': {
                click: 'showReceivingApplicationSubmissionWin'
            },
            'psurAssessmentPnl button[name=process_submission_btn]': {
                click: 'showReceivingApplicationSubmissionWin'
            },
            'newPsurReceivingPnl': {
                afterrender: 'preparenewPsurReceiving'
            },
            'psurAssessmentPnl': {
                afterrender: 'preparenewPsurAssessment'
            },

        }

    },
    /**
     * Called when the view is created
     */
    init: function () {

    },

    listen: {
        controller: {
            '*': {
                onNewPsurApplication: 'onNewPsurApplication',
                loadPsurWizardFromRecord: 'loadPsurWizardFromRecord',
                //showPreviousNonGridPanelUploadedDocs:'showPreviousNonGridPanelUploadedDocs',
                funcActivePsurProductsOtherInformationTab: 'funcActivePsurProductsOtherInformationTab',
            }
        }
    },
    onNewPsurApplication: function (sub_module_id, btn, section_id) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            is_dataammendment_request = btn.is_dataammendment_request,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down('#psurDashWrapperPnl'),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            workflow_details = getInitialWorkflowDetails(module_id, section_id, sub_module_id);

        if (!workflow_details || workflow_details.length < 1) {
            Ext.getBody().unmask();
            toastr.warning('Problem encountered while fetching workflow details-->Possibly workflow not set!!', 'Warning Response');
            return false;
        }
        dashboardWrapper.removeAll();
        var workflowContainer = Ext.widget(workflow_details.viewtype);
        workflowContainer.down('displayfield[name=process_name]').setValue(workflow_details.processName);
        workflowContainer.down('displayfield[name=workflow_stage]').setValue(workflow_details.initialStageName);
        workflowContainer.down('displayfield[name=application_status]').setValue(workflow_details.initialAppStatus);
        workflowContainer.down('hiddenfield[name=process_id]').setValue(workflow_details.processId);
        workflowContainer.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_details.initialStageId);
        workflowContainer.down('hiddenfield[name=module_id]').setValue(module_id);
        workflowContainer.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        workflowContainer.down('hiddenfield[name=section_id]').setValue(section_id);
        dashboardWrapper.add(workflowContainer);
        Ext.Function.defer(function () {
            Ext.getBody().unmask();
        }, 300);
    },
     psurHome: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            sec_dashboard = btn.sec_dashboard,
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down('#psurDashWrapperPnl');
        if (!dashboardWrapper.down(sec_dashboard)) {
            dashboardWrapper.removeAll();
            dashboardWrapper.add({xtype: sec_dashboard});
        }
    },
    loadPsurWizardFromRecord: function (view, record) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            grid = view.grid,
            process_id = record.get('process_id'),
            workflow_stage_id = record.get('workflow_stage_id'),
            sub_module_id = 116,
            module_id = 32,
            section_id ='',
            workflow_stage = record.get('workflow_stage'),
            prodclass_category_id = record.get('prodclass_category_id'),
            ref_no = record.get('tracking_no'),
             view_id = record.get('view_id'),
            title = 'Psur/Pbrer Application',
            workflow_details = getInitialWorkflowDetails(module_id, section_id, sub_module_id, null); //getAllWorkflowDetails(process_id, workflow_stage_id);
        if (!workflow_details) {
            Ext.getBody().unmask();
            toastr.warning('Problem encountered while fetching workflow details-->Possibly workflow not set!!', 'Warning Response');
            return false;
        }
        var tab = mainTabPanel.getComponent(view_id);
        if (!tab) {
            var newTab = Ext.widget(workflow_details.viewtype, {
                title: title,
                closable: true
            });
            record.set('sub_module_id', sub_module_id);
            record.set('process_id', workflow_details.processId);
            record.set('workflow_stage_id', workflow_details.initialStageId);
            record.set('workflow_stage', workflow_details.initialStageName);
            record.set('application_status', workflow_details.initialAppStatus);
            record.set('process_name', workflow_details.processName);
        //set prerequisites
        me.preparePsurApplicationBaseDetails(newTab, record);
        //load form
            mainTabPanel.add(newTab);
            var lastTab = mainTabPanel.items.length - 1;
            mainTabPanel.setActiveTab(lastTab);
        } else {
            mainTabPanel.setActiveTab(tab);
        }

        //loading prefilled form
        me.onRegisteredProductsgridDblClick(newTab, record);

        //close pop up if there
        grid = Ext.ComponentQuery.query("#registeredProductsListGrid")[0];
        if(grid){
            grid.up('window').close();
        }
        Ext.Function.defer(function () {
            Ext.getBody().unmask();
        }, 300);
    },

    preparePsurApplicationBaseDetails: function (tab, record) {
        var me = this,
            process_name = record.get('process_name'),
            workflow_stage = record.get('workflow_stage'),
            application_status = record.get('application_status'),
            reference_no = record.get('reference_no'),
            process_id = record.get('process_id'),
            product_id = record.get('product_id'),
            tra_product_id = record.get('tra_product_id'),
            module_id = 25,
            sub_module_id = 100,
            section_id = 2,
            workflow_stage_id = record.get('workflow_stage_id');
        if(tab.down('hiddenfield[name=prodclass_category_id]')){
             tab.down('hiddenfield[name=prodclass_category_id]').setValue(record.get('prodclass_category_id'));
        }
        tab.down('hiddenfield[name=process_id]').setValue(process_id);
        tab.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
        tab.down('hiddenfield[name=module_id]').setValue(module_id);
        tab.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        tab.down('hiddenfield[name=section_id]').setValue(section_id);
        tab.down('hiddenfield[name=product_id]').setValue(tra_product_id);
        tab.down('displayfield[name=process_name]').setValue(process_name);
        tab.down('displayfield[name=workflow_stage]').setValue(workflow_stage);
        tab.down('displayfield[name=application_status]').setValue(application_status);
        tab.down('displayfield[name=reference_no]').setValue(reference_no);
    },
    onRegisteredProductsgridDblClick: function (grid, record) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            // win = grid.up('window'),
            activeTab = mainTabPanel.getActiveTab(),
            reg_product_id = record.get('reg_product_id'),
            tra_product_id = record.get('tra_product_id'),
            app_doc_types_store = activeTab.down('combo[name=applicable_documents]'),
            applicantFrm = activeTab.down('productapplicantdetailsfrm'),
            localagentFrm = activeTab.down('productlocalapplicantdetailsfrm'),
            products_detailsfrm = activeTab.down('#productsDetailsFrm'),
            is_populate_primaryappdata = false,
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            zone_cbo = activeTab.down('combo[name=branch_id]');
            assessmentprocedure_type_id = activeTab.down('combo[name=assessmentprocedure_type_id]');
            assessment_procedure_id = activeTab.down('combo[name=assessment_procedure_id]');
            if(activeTab.down('hiddenfield[name=is_populate_primaryappdata]')){

                is_populate_primaryappdata = activeTab.down('hiddenfield[name=is_populate_primaryappdata]').getValue();
            }
        filter = {section_id: section_id},
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();
        
        
        if (reg_product_id || sub_module_id == 70) {
            app_doc_types_store.getStore().removeAll();
            app_doc_types_store.getStore().load({
                params: {
                    process_id: process_id,
                    workflow_stage: workflow_stage_id
                }
            });
            Ext.Ajax.request({
                method: 'GET',
                url: 'productregistration/onRegisteredProductsSearchdetails',
                params: {
                    reg_product_id: reg_product_id,
                    tra_product_id: tra_product_id
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        ltrResults = resp.ltrDetails,
                        branch_id = results.branch_id,
                        model = Ext.create('Ext.data.Model', results);
                    ltr_model = Ext.create('Ext.data.Model', ltrResults);

                    if (success == true || success === true) {

                        applicantFrm.loadRecord(model);
                        localagentFrm.loadRecord(ltr_model);
                        products_detailsfrm.loadRecord(model);
                        // zone_cbo.setReadOnly(true);
                        zone_cbo.setValue(branch_id);
                        assessmentprocedure_type_id.setValue(results.assessmentprocedure_type_id);
                        assessment_procedure_id.setValue(results.assessment_procedure_id);
                        if(is_populate_primaryappdata == 1){
                            
                            activeTab.down('hiddenfield[name=active_application_code]').setValue(results.active_application_code);
                            activeTab.down('hiddenfield[name=active_application_id]').setValue(results.active_application_id);
                            activeTab.down('displayfield[name=tracking_no]').setValue(results.tracking_no);
                            activeTab.down('displayfield[name=reference_no]').setValue(results.reference_no);
                            
                            activeTab.down('hiddenfield[name=product_id]').setValue(results.tra_product_id);
                            
                            activeTab.down('#product_panel').getViewModel().set('isReadOnly', true);
                           console.log('here onRegisteredProductsSearchdetails');
                        }
                        // win.close();
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }

    },





    refreshPvMainGrids: function (me) {
        var store = me.store,
            grid = me.up('grid'),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = (activeTab.down('hiddenfield[name=section_id]')) ? grid.down('combo[name=section_id]').getValue() : null,
            sub_module_id = (grid.down('combo[name=sub_module_id]')) ? grid.down('combo[name=sub_module_id]').getValue() : null,
            workflow_stage_id = (grid.down('combo[name=workflow_stage_id]')) ? grid.down('combo[name=workflow_stage_id]').getValue() : null;

            store.getProxy().extraParams = {
                module_id: module_id,
                sub_module_id: sub_module_id,
                section_id: section_id,
                workflow_stage_id: workflow_stage_id
            };

    },
    preparePvReceiving: function (me) {
        // this.updateVisibilityAccess(me);
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_status_id = activeTab.down('hiddenfield[name=application_status_id]').getValue(),

            app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore(),
            //applicantFrm = activeTab.down('productapplicantdetailsfrm'),
            // localagentFrm = activeTab.down('productlocalapplicantdetailsfrm'),
            detailsFrm = activeTab.down('#DetailsFrm'),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            filter = {section_id: section_id},
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();

        app_doc_types_store.removeAll();
        app_doc_types_store.load({
            params: {
                process_id: process_id,
                workflow_stage: workflow_stage_id
            }
        });
        

        if (application_status_id == 4 || application_status_id === 4) {
            activeTab.down('button[name=queries_responses]').setVisible(true);
        }

        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'pv/prepareNewPvReceivingStage',
                params: {
                    application_id: application_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        // ltrResults = resp.ltrDetails,
                        model = Ext.create('Ext.data.Model', results);
                        // ltr_model = Ext.create('Ext.data.Model', ltrResults);

                    if (success == true || success === true) {
                        detailsFrm.loadRecord(model);
                        //applicantFrm.loadRecord(model);
                        // localagentFrm.loadRecord(ltr_model);
                        activeTab.down('hiddenfield[name=invoice_id]').setValue(results.invoice_id);

                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },
    showReceivingApplicationSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        var mainTabPanel = this.getMainTabPanel(),
            storeID = btn.storeID,
            table_name = btn.table_name,
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab();
            console.log(activeTab);
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            is_dataammendment_request =0,
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue();
            //storeID = getApplicationStore(module_id, section_id);
            if(activeTab.down('hiddenfield[name=is_dataammendment_request]')){
                is_dataammendment_request = activeTab.down('hiddenfield[name=is_dataammendment_request]').getValue();
            }
            showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsreceivingfrm', winWidth, storeID,'','','',workflow_stage_id,is_dataammendment_request);
    },
    preparenewPsurReceiving: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
        application_status_id = activeTab.down('hiddenfield[name=application_status_id]').getValue(),
  
        app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore(),
            psurdetailsFrm = activeTab.down('psurdetailsFrm'),
           // app_check_types_store = activeTab.down('combo[name=applicable_checklist]').getStore(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            
        filter = {section_id: section_id},
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();

        app_doc_types_store.removeAll();
        app_doc_types_store.load({
            params: {
                process_id: process_id,
                workflow_stage: workflow_stage_id
            }
        });
        is_populate_primaryappdata= 0;
        if(activeTab.down('hiddenfield[name=is_populate_primaryappdata]')){
            is_populate_primaryappdata= activeTab.down('hiddenfield[name=is_populate_primaryappdata]').getValue();
        }
        if (application_status_id == 4 || application_status_id === 4) {
            activeTab.down('button[name=queries_responses]').setVisible(true);
        }
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'psur/preparenewPsurReceiving',
                params: {
                    application_id: application_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        ltrResults = resp.ltrDetails,
                        branch_id = results.branch_id,
                        model = Ext.create('Ext.data.Model', results);
                    ltr_model = Ext.create('Ext.data.Model', ltrResults);

                    if (success == true || success === true) {

                        psurdetailsFrm.loadRecord(model)
                   
                        if(is_populate_primaryappdata ==1){
                            activeTab.down('hiddenfield[name=sub_module_id]').setValue(results.sub_module_id);
                        }
                       
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },
    preparenewPsurAssessment: function () {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
           application_status_id = activeTab.down('hiddenfield[name=application_status_id]').getValue(),
            // stores = '[]',
            // storeArray = eval(stores),
            app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore(),
            // applicantFrm = activeTab.down('productapplicantdetailsfrm'),
            // localagentFrm = activeTab.down('productlocalapplicantdetailsfrm'),
            products_detailsfrm = activeTab.down('drugsProductsDetailsFrm'),
            psurdetailsFrm = activeTab.down('psurdetailsFrm'),
            psurEvaluationFrm = activeTab.down('psurEvaluationFrm'),
           // app_check_types_store = activeTab.down('combo[name=applicable_checklist]').getStore(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
            
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
        filter = {section_id: section_id},
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();

        app_doc_types_store.removeAll();
        app_doc_types_store.load({
            params: {
                process_id: process_id,
                workflow_stage: workflow_stage_id
            }
        });
        is_populate_primaryappdata= 0;
        if(activeTab.down('hiddenfield[name=is_populate_primaryappdata]')){
            is_populate_primaryappdata= activeTab.down('hiddenfield[name=is_populate_primaryappdata]').getValue();
        }
        if (application_status_id == 4 || application_status_id === 4) {
            activeTab.down('button[name=queries_responses]').setVisible(true);
        }
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'psur/preparenewPsurAssessment',
                params: {
                    application_id: application_id
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        results = resp.results,
                        ltrResults = resp.ltrDetails,
                        psurAssessmentDetails = resp.psurAssessmentDetails,
                        product_id = results.product_id,
                        model = Ext.create('Ext.data.Model', results);
                        ltr_model = Ext.create('Ext.data.Model', ltrResults);
                        assessment_model = Ext.create('Ext.data.Model', psurAssessmentDetails);
                    if (success == true || success === true) {

                        // applicantFrm.loadRecord(model);
                        // localagentFrm.loadRecord(ltr_model);
                        products_detailsfrm.loadRecord(model);
                        psurdetailsFrm.loadRecord(model);
                        psurEvaluationFrm.loadRecord(assessment_model)
                        // zone_cbo.setReadOnly(true);
                        //zone_cbo.setValue(branch_id);
                        activeTab.down('hiddenfield[name=product_id]').setValue(product_id);
                        if(is_populate_primaryappdata ==1){
                            activeTab.down('hiddenfield[name=sub_module_id]').setValue(results.sub_module_id);
                        }
                       
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        } else {
            Ext.getBody().unmask();
            //It's a new application
        }
    },
    // showPreviousNonGridPanelUploadedDocs: function (btn) {
    //     var document_type_id = btn.document_type_id,
    //         winTitle = btn.winTitle,
    //         winWidth = btn.winWidth,
    //         mainTabPanel = this.getMainTabPanel(),
    //         activeTab = mainTabPanel.getActiveTab(),
    //         sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
    //         section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
    //         module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
    //         process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
    //         application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();

    //     //for manager previews
    //     if(btn.is_manager == 1){
    //         var button = btn.up('button'),
    //             record = button.getWidgetRecord(),
    //             application_code = record.get('application_code');
    //     }
    //     grid = Ext.widget('previewproductDocUploadsGrid');//('previewproductDocUploadsGrid'applicationdocuploadsgrid);
    //    // store = grid.store;
    //     grid.height = Ext.Element.getViewportHeight() - 118;
    //    // grid.setController('productregistrationvctr');
    //     grid.down('hiddenfield[name=process_id]').setValue(process_id);
    //     grid.down('hiddenfield[name=section_id]').setValue(section_id);
    //     grid.down('hiddenfield[name=module_id]').setValue(module_id);
    //     grid.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
    //     grid.down('hiddenfield[name=application_code]').setValue(application_code);

    //     grid.down('combo[name=applicable_documents]').setValue(document_type_id);
    //     grid.down('hiddenfield[name=is_original_dossier]').setValue(btn.is_original_dossier);
        
    //     funcShowStatelessCustomizableWindow(winTitle , winWidth, grid, 'customizablewindow', btn);

    // },

    funcActivePsurProductsOtherInformationTab: function (tab) {
        var mainTabPnl = this.getMainTabPanel(),
            activeTab = mainTabPnl.getActiveTab();
            drugsProductsDetailsFrm=tab.down('drugsProductsDetailsFrm');
            product_id = activeTab.down('hiddenfield[name=product_id]').getValue();
    },
});