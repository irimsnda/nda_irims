Ext.define('Admin.view.psur.views.forms.PsurEvaluationFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'psurEvaluationFrm',
    controller: 'psurVctr',
    height: Ext.Element.getViewportHeight() - 118,
    layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        columnWidth: 1,
        margin: 5,
        allowBlank: true,
        labelAlign: 'top'
    },
    scrollable: true,
    autoScroll: true,
    items: [{
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
          xtype: 'hiddenfield',
          name: 'assessment_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_code'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        }, 
        {
            xtype: 'htmleditor',
            name: 'introduction',
            fieldLabel: 'Introduction',
            columnWidth: 1,
            resizable: true,
          },
          {
            xtype: 'htmleditor',
            name: 'marketing_approval_status',
            fieldLabel: 'Worldwide marketing approval status',
            columnWidth: 1,
            resizable: true,
          }, {
            xtype: 'htmleditor',
            name: 'actions_reporting_interval',
            fieldLabel: 'Actions taken in the reporting interval for safety reasons',
            columnWidth: 1,
            resizable: true,
          },
          {
            xtype: 'htmleditor',
            name: 'reference_safety_information',
            fieldLabel: 'Changes to reference safety information',
            columnWidth: 1,
            resizable: true,
          },
          {
            xtype:'fieldset',
            columnWidth: 1,
            title: 'Estimated exposure and use patterns',
            collapsible: true,
            defaults: {
                labelAlign: 'top',
                allowBlank: true,
                labelAlign: 'top',
                margin: 5,
                xtype: 'textfield',
                columnWidth: 1,
            },
            layout: 'column',
            items :[
                {
                    xtype: 'htmleditor',
                    name: 'cumulative_exposure_clinical',
                    fieldLabel: 'Cumulative subject exposure in clinical trials',
                    columnWidth: 1,
                    resizable: true,
                  },
                  {
                    xtype: 'htmleditor',
                    name: 'cumulative_exposure_marketing',
                    fieldLabel: 'Cumulative and interval patient exposure from marketing experience',
                    columnWidth: 1,
                    resizable: true,
                  },
        ]
        },{
            xtype:'fieldset',
            columnWidth: 1,
            title: 'Data in summary tabulations',
            collapsible: true,
            defaults: {
                labelAlign: 'top',
                allowBlank: true,
                labelAlign: 'top',
                margin: 5,
                xtype: 'textfield',
                columnWidth: 1,
            },
            layout: 'column',
            items :[
                {
                    xtype: 'htmleditor',
                    name: 'cumulative_summary_clinical',
                    fieldLabel: 'Cumulative summary tabulations of serious adverse events from clinical trials',
                    columnWidth: 1,
                    resizable: true,
                  },
                  {
                    xtype: 'htmleditor',
                    name: 'cumulative_summary_marketing',
                    fieldLabel: 'Cumulative and interval summary tabulations from post-marketing data sources',
                    columnWidth: 1,
                    resizable: true,
                  },
        ]
        },{
            xtype:'fieldset',
            columnWidth: 1,
            title: 'Summaries of significant safety findings from clinical trials during the reporting period',
            collapsible: true,
            defaults: {
                labelAlign: 'top',
                allowBlank: true,
                labelAlign: 'top',
                margin: 5,
                xtype: 'textfield',
                columnWidth: 1,
            },
            layout: 'column',
            items :[
                {
                    xtype: 'htmleditor',
                    name: 'completed_clinical_trials',
                    fieldLabel: 'Completed clinical trials',
                    columnWidth: 1,
                    resizable: true,
                  },
                  {
                    xtype: 'htmleditor',
                    name: 'ongoing_clinical_trials',
                    fieldLabel: 'Ongoing clinical trials',
                    columnWidth: 1,
                    resizable: true,
                  },
                  {
                    xtype: 'htmleditor',
                    name: 'long_time_followup',
                    fieldLabel: 'Long-term follow-up',
                    columnWidth: 1,
                    resizable: true,
                  },
                  {
                    xtype: 'htmleditor',
                    name: 'other_therapeutic_product_use',
                    fieldLabel: 'Other therapeutic use of medicinal product',
                    columnWidth: 1,
                    resizable: true,
                  },
                  {
                    xtype: 'htmleditor',
                    name: 'safety_data_related_to_fixed_combination_therapies',
                    fieldLabel: 'New safety data related to fixed combination therapies',
                    columnWidth: 1,
                    resizable: true,
                  },
        ]
        },
      
        {
            xtype:'fieldset',
            columnWidth: 1,
            title: 'Information from other clinical trials and sources ',
            collapsible: true,
            defaults: {
                labelAlign: 'top',
                allowBlank: true,
                labelAlign: 'top',
                margin: 5,
                xtype: 'textfield',
                columnWidth: 1,
            },
            layout: 'column',
            items :[
                {
                    xtype: 'htmleditor',
                    name: 'other_clinical_trials',
                    fieldLabel: 'Other clinical trials',
                    columnWidth: 1,
                    resizable: true,
                  },
                  {
                    xtype: 'htmleditor',
                    name: 'medication_errors',
                    fieldLabel: 'Medication errors',
                    columnWidth: 1,
                    resizable: true,
                  },
        ]
        },
        {
            xtype: 'htmleditor',
            name: 'findings_non_interventional_studies',
            fieldLabel: 'Findings from non-interventional studies',
            columnWidth: 1,
            resizable: true,
        },
        {
            xtype: 'htmleditor',
            name: 'non_clinical_data',
            fieldLabel: 'Non-clinical data',
            columnWidth: 1,
            resizable: true,
          },
          {
            xtype: 'htmleditor',
            name: 'literature',
            fieldLabel: 'Literature ',
            columnWidth: 1,
            resizable: true,
          },
          {
            xtype: 'htmleditor',
            name: 'other_periodic_reports',
            fieldLabel: 'Other periodic reports',
            columnWidth: 1,
            resizable: true,
          },
          {
            xtype: 'htmleditor',
            name: 'Lack_of_efficacy_in_controlled_ct',
            fieldLabel: 'Lack of efficacy in controlled clinical trials',
            columnWidth: 1,
            resizable: true,
          },
          {
            xtype: 'htmleditor',
            name: 'late_breaking_information',
            fieldLabel: 'Late-breaking information',
            columnWidth: 1,
            resizable: true,
          },
          {
            xtype: 'htmleditor',
            name: 'overview_of_signals',
            fieldLabel: 'Overview of signals: new, ongoing, or closed ',
            columnWidth: 1,
            resizable: true,
          },
          {
            xtype:'fieldset',
            columnWidth: 1,
            title: 'Signal and risk evaluation',
            collapsible: true,
            defaults: {
                labelAlign: 'top',
                allowBlank: true,
                labelAlign: 'top',
                margin: 5,
                xtype: 'textfield',
                columnWidth: 1,
            },
            layout: 'column',
            items :[
                {
                    xtype: 'htmleditor',
                    name: 'summary_of_safety_concerns',
                    fieldLabel: 'Summary of safety concerns',
                    columnWidth: 1,
                    resizable: true,
                  },
                  {
                    xtype: 'htmleditor',
                    name: 'signal_evaluation',
                    fieldLabel: 'Signal evaluation',
                    columnWidth: 1,
                    resizable: true,
                  },
                  {
                    xtype: 'htmleditor',
                    name: 'evaluation_risks_and_new_information',
                    fieldLabel: 'Evaluation of risks and new information',
                    columnWidth: 1,
                    resizable: true,
                  },
                  {
                    xtype: 'htmleditor',
                    name: 'characterization_of_risks',
                    fieldLabel: 'Characterization of risks',
                    columnWidth: 1,
                    resizable: true,
                  },
                  {
                    xtype: 'htmleditor',
                    name: 'effectiveness_of_risk_minimization',
                    fieldLabel: 'Effectiveness of risk minimization',
                    columnWidth: 1,
                    resizable: true,
                  },
        ]
        }, {
            xtype:'fieldset',
            columnWidth: 1,
            title: 'Benefit evaluation',
            collapsible: true,
            defaults: {
                labelAlign: 'top',
                allowBlank: true,
                labelAlign: 'top',
                margin: 5,
                xtype: 'textfield',
                columnWidth: 1,
            },
            layout: 'column',
            items :[
                {
                    xtype: 'htmleditor',
                    name: 'important_baseline_efficacy',
                    fieldLabel: 'Important baseline efficacy/effectiveness information ',
                    columnWidth: 1,
                    resizable: true,
                  },
                  {
                    xtype: 'htmleditor',
                    name: 'newly_identified_information',
                    fieldLabel: 'Newly identified information on efficacy/effectiveness ',
                    columnWidth: 1,
                    resizable: true,
                  },
                  {
                    xtype: 'htmleditor',
                    name: 'characterization_of_benefits',
                    fieldLabel: 'Characterization of benefits',
                    columnWidth: 1,
                    resizable: true,
                  },
        ]
        },{
            xtype:'fieldset',
            columnWidth: 1,
            title: 'Integrated benefit-risk analysis for approved Indications ',
            collapsible: true,
            defaults: {
                labelAlign: 'top',
                allowBlank: true,
                labelAlign: 'top',
                margin: 5,
                xtype: 'textfield',
                columnWidth: 1,
            },
            layout: 'column',
            items :[
                {
                    xtype: 'htmleditor',
                    name: 'benefit_risk_context',
                    fieldLabel: 'Benefit-risk context - medical need and important alternatives',
                    columnWidth: 1,
                    resizable: true,
                  },
                  {
                    xtype: 'htmleditor',
                    name: 'benefit_risk_analysis',
                    fieldLabel: 'Benefit-risk analysis evaluation ',
                    columnWidth: 1,
                    resizable: true,
                  }, 
        ]
        }	,
        {
          xtype: 'htmleditor',
          name: 'draft_response ',
          fieldLabel: 'Draft Response',
          columnWidth: 1,
          resizable: true,
        }, 
        {
          xtype:'fieldset',
          columnWidth: 1,
          title: 'Overall Discussion',
          collapsible: true,
          defaults: {
              labelAlign: 'top',
              allowBlank: true,
              labelAlign: 'top',
              margin: 5,
              xtype: 'textfield',
              columnWidth: 1,
          },
          layout: 'column',
          items :[
              {
                  xtype: 'htmleditor',
                  name: 'overall_conclusion',
                  fieldLabel: 'Overall conclusion',
                  columnWidth: 1,
                  resizable: true,
                },
                {
                  xtype: 'htmleditor',
                  name: 'questions_comments',
                  fieldLabel: 'Questions or comments',
                  columnWidth: 1,
                  resizable: true,
                }, 
                {
                  xtype: 'htmleditor',
                  name: 'recommendations',
                  fieldLabel: 'Recommendations',
                  columnWidth: 1,
                  resizable: true,
                },
      ]
      },
     
    ],
    dockedItems: [{
        xtype: 'toolbar',
        ui: 'footer',
        dock: 'bottom',
        items: [
            '->', {
                text: 'Save Details',
                iconCls: 'x-fa fa-save',
                action: 'save',
                name:'save_btn',
                table_name: 'tra_psur_evaluation_details',
                storeID: 'psurAssessmentStr',
                formBind: true,
                ui: 'soft-blue',
                action_url: 'psur/onSavePsurAssessmentDetails',
                handler: 'savepsurAssessmentdetails'
            }
        ]
    }
    ]
});