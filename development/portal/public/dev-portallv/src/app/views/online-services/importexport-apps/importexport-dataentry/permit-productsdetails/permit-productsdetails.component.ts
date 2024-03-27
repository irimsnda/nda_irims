import { Component, OnInit, ViewChild, ViewContainerRef, Inject, Input, EventEmitter, Output } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { DxDataGridComponent } from 'devextreme-angular';
import { takeUntil } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';

import CustomStore from 'devextreme/data/custom_store';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/app-settings';
import { SharedImportexportclassComponent } from '../../shared-importexportclass/SharedImportexportclassComponent';

import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'app-permit-productsdetails',
  templateUrl: './permit-productsdetails.component.html',
  styleUrls: ['./permit-productsdetails.component.css']
})
export class PermitProductsdetailsComponent extends SharedImportexportclassComponent implements OnInit {
  requireUnitPackData:boolean=false;
  trader_id:number;
  mistrader_id:number;
  dataGrid: DxDataGridComponent;printiframeUrl:any;
  @Input() permitProductsData: any;
  @Input() declaredProductsData: any;
  @Input() isPermitproductsPopupVisible: boolean;
  @Input() isBatchPopupVisible: boolean ;
  isApprovedVisaproductsPopupVisible:boolean;
  @Input() registeredProductsData: any;
  @Input() permitDrugDetailsData: any;
  approvedVisaProducts:any={};
  @Input() isPermitproductsAddPopupVisible: boolean;
  @Input() isNarcoticproductsAddPopupVisible: boolean;
  @Input() isAddBatchPopupVisible: boolean; 
 isManufacturingSiteProductsDetails: boolean;
 isApprovedProductsDetails: boolean;
  @Input() confirmDataParam: any;
  @Input() premisesOtherDetailsRows: any;
  @Input() is_regulatedproducts: boolean;
  @Input() productCategoryData: any;
   @Input() deviceTypeData: any;
   @Input() verificationData: any;
   @Input() dosageFormData: any;
   @Input() packagingUnitsData: any;
   @Input() siUnitsData: any;
   @Input() weightsUnitData: any;
   @Input() currencyData: any;
   @Input() permitProductsFrm: FormGroup;
   @Input() narcoticProductsFrm: FormGroup;
   @Input() productGeneraldetailsfrm: FormGroup;
   @Input() classificationData: any;
   @Input() commonNamesData: any;
   @Input() application_code: number;
   @Input() declaration_application_code: number;
   @Input() product_category_id: number;
   @Input() common_name_id: number;
   @Input() port_id: number;
   @Input() importation_reason_id: number;
   @Input() enabled_newproductadd: boolean;
   @Input() sub_module_id: number;
   @Input() tracking_no: string;

   @Input() module_id: number;
   @Input() section_id: number;
   @Input() proforma_currency_id: number;
   @Input() countries: any;
   manufacturersData: any ={};
   isManufacturerSitePopupVisible:boolean= false;
   manSiteRegisteredProductsData: any={};
   UnRegisteredProductsData: any={};
   approvedProductsData: any={};
   isproductManufacturerModalShow:boolean;
   isnewmanufacturerModalShow:boolean= false;
   addproductCommonNameModal:boolean;
   isRegisteredLevel:boolean;
  addProductParamsdetailsfrm:FormGroup;
  isRegisteredProductsWinshow:boolean = false;
  isUnRegisteredProductsDetails:boolean = false;
  registeredProductsDetails:any = {};
   isFoodPermitProducts:boolean;
   isnewproductAddWinVisible:boolean;
   loading:boolean;
   enabled_productadd:boolean;
   product_batch_no: number;
   isPermitVisaLicProductsAddPopupVisible:boolean;
   region:any;
  districts:any;
  doseData: any;
  productTypeDta:any;
  classcategoryData: any;
   ingredientsData: any;
   therapeuticGroupData: any;
   distributionCateoryData: any;
   routeOfAdministrationData:any;
   atcCodeData:any;
  app_resp:any;
  permit_product_id:number;
  product_id:number;
  product_origin_id: number;
  regions:any;
  mis_url:string = AppSettings.mis_url;
  isInvoiceProductsUploadVisable:boolean;
  isUploadedInvoiceProductsWin:boolean;
   permitProductMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        { text: "Preview/Edit Record", action: 'edit_record', icon: 'fa fa-edit' },
        { text: "Delete Record", action: 'delete_record', icon: 'fa fa-trash' }
      ]
    }
  ];
  permitApprovedVisaProductMenuItems = [
    {
      text: "Action",
      icon: 'menu',
      items: [
        { text: "Update Batch and Manufacturing Date(s)", action: 'edit_record', icon: 'fa fa-edit' },
        //{ text: "Delete Record", action: 'delete_record', icon: 'fa fa-trash' }
      ]
    }
  ];
  
  consignee_sendertitle:string;
  manufacturerFrm:FormGroup;
  issenderreceiverSearchWinVisible: boolean;
  issenderreceiverAddWinVisible:boolean;

  product_resp:any;
  is_visaapplication:boolean;
  commonNameData:any;
  controlledSubstanceData: any;
  filesToUpload: Array<File> = [];  
  printReportTitle:string;
  isPrintReportVisible:boolean = false;
  document_previewurl: any;
  specificationData: any;
  formattedProduct: string;
  safetyFactor: number = 1000;
 
  isReadOnlyProduct:boolean = false;
  isDocumentPreviewDownloadwin: boolean = false;
  is_brandreadonly:boolean = true;
  common_name_title: string = 'Common Name';
  productSubCategoryData: any;
  document_type_id:number=25;
  @Output() premitProductIdEvent = new EventEmitter();
  invoiceProductsUploadFrm:FormGroup;
  private isFetchingData = false;

  private destroy$ = new Subject<void>();

 
  ngOnInit(){

     this.permitProductsFrm.get('no_of_packs_tertiary').valueChanges.subscribe(() => {
      this.updateTotalUnits();
    });
    this.permitProductsFrm.get('no_of_packs_secondary').valueChanges.subscribe(() => {
      this.updateTotalUnits();
    });

    this.permitProductsFrm.get('no_of_packs').valueChanges.subscribe(() => {
      this.updateTotalUnits();
    });
    this.permitProductsFrm.get('no_of_units').valueChanges.subscribe(() => {
      this.updateTotalUnits();
    });
      this.permitProductsFrm.get('unit_price').valueChanges.subscribe(() => {
      this.updateTotalUnits();
    });    
    this.permitProductsFrm.get('quantity').valueChanges.subscribe(() => {
      this.updateTotalUnits();
    });

     if (this.is_registered == 1 && this.product_category_id == 8) {
          this.isRegisteredLevel = true;
        } 
    
    this.onLoadImportReasons(this.business_type_id, this.licence_type_id);
   // this.onLoadVerificationData(this.business_type_id , this.licence_type_id, this.importation_reason_id, this.product_category_id, this.is_registered, this.country_oforigin_id);
    this.onLoadingredientsData();
    this.onLoadspecificationData();
    this.onLoadDeviceTypeData();
    this.onLoaddoseDataParm();
    this.onLoadclassificationDataDataParm();
    this.onLoadclasscategoryData();
    this.onLoadAtcCodeData();
    this.onLoadTherapeuticGroupData();
    this.onLoadDistributionCategoryData();
    this.onLoadRouteOfAdministrationData();
    this.onLoadControlledSubstanceData();
    this.onLoadproductTypeDta();
    this.invoiceProductsUploadFrm = this.formBuilder.group({
      file: null,
      description:null,
      currency_id:null
    });

    this.manufacturerFrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
      region_id: new FormControl('', Validators.compose([])),
      district_id: new FormControl('', Validators.compose([])),
      email_address: new FormControl('', Validators.compose([])),
      postal_address: new FormControl('', Validators.compose([])),
      telephone_no: new FormControl('', Validators.compose([])),
      mobile_no: new FormControl('', Validators.compose([])),
      physical_address: new FormControl('', Validators.compose([]))
    });

    if (this.is_registered == 1) {
      this.permitProductsFrm.get('product_registration_no').setValidators([Validators.required]);
      this.permitProductsFrm.get('product_registration_no').updateValueAndValidity();

    }else{
      this.permitProductsFrm.get('product_registration_no').clearValidators();
      this.permitProductsFrm.get('product_registration_no').updateValueAndValidity();
    }



    this.onLoadcommonNameData();
    if(this.section_id == 2 || this.section_id == 7){
      this.requireUnitPackData = true;
      this.isFoodPermitProducts =false;
      this.common_name_title = 'Generic Name';
    }
    else if(this.section_id == 1){

      this.isFoodPermitProducts =true;
      this.requireUnitPackData = false;
    }
    else{
      
      this.isFoodPermitProducts =false;
      this.requireUnitPackData = false;
    }
    if(this.sub_module_id == 78){
      this.enabled_productadd = true;
      this.is_visaapplication = false;
    }
    else if(this.sub_module_id == 81){
      this.enabled_productadd = true;
      this.is_visaapplication = false;
    }
    
    else if (this.sub_module_id == 82){
      this.enabled_productadd = false;
      this.is_visaapplication = false;

    }
    else{
      this.enabled_productadd = true;
      this.is_visaapplication = true;
    }

    let user = this.authService.getUserDetails();
    this.trader_id = user.trader_id;
    this.mistrader_id = user.mistrader_id;
    this.addProductParamsdetailsfrm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([Validators.required])),
      section_id: new FormControl('', Validators.compose([Validators.required])),
      tablename: new FormControl('', Validators.compose([Validators.required]))

    });

    this.setupSearchByControlledSubstanceHandler();
  }
  


  onProductCategoryCboSelect($event) {

    this.onLoadproductSubCategory($event.selectedItem.id);

  }

   private setupSearchByControlledSubstanceHandler(): void {
    this.narcoticProductsFrm
      .get('controlled_substance_id')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((ControlledSubstance) => {
        if (!this.isFetchingData) {
          this.isFetchingData = true;
          this.searchByControlledSubstance(ControlledSubstance);
        }
      });
  } 
    searchByControlledSubstance(ControlledSubstance){
    this.appService.onLoadControlledSubstance(ControlledSubstance).subscribe(
      (response: any) => {
        if (response && Array.isArray(response.data) && response.data.length > 0) {
          const dataItem = response.data[0];
           this.narcoticProductsFrm.get('scheduled_number').setValue(dataItem.scheduled_number);
           this.narcoticProductsFrm.get('convertion_factor').setValue(dataItem.convertion_factor);
           this.narcoticProductsFrm.get('controlled_substance_schedule').setValue(dataItem.controlled_substance_schedule);


        } else {
          
          this.toastr.error('No data found');
        }

        this.isFetchingData = false;
      },
      (error) => {
        this.isFetchingData = false;
      }
    );
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

 onLoadRouteOfAdministrationData() {
    var data = {
      table_name: 'par_route_of_administration'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.routeOfAdministrationData = data;
        });

  }

  
  onLoadDistributionCategoryData() {
    var data = {
      table_name: 'par_distribution_categories'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.distributionCateoryData = data;
        });

  }

  onLoadTherapeuticGroupData() {
    var data = {
      table_name: 'par_therapeutic_group'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.therapeuticGroupData = data;
        });

  }


  onLoadAtcCodeData() {
    var data = {
      table_name: 'par_atc_codes'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.atcCodeData = data;
        });

  }
  onLoadControlledSubstanceData() {
    var data = {
      table_name: 'par_controlled_substance_active_ingredient_salt',
      //section_id: this.section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.controlledSubstanceData = data;
        });
  
  }

  onLoadDeviceTypeData() {
    var data = {
      table_name: 'par_containers'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.deviceTypeData = data;
        });

  }
  onLoadclasscategoryData() {
    var data = {
      table_name: 'par_prodclass_categories'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.classcategoryData = data;
        });

  }

  onLoadclassificationDataDataParm() {
    var data = {
      table_name: 'classification',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.classificationData = data;
        });
  }

  onLoaddoseDataParm() {
    var data = {
      table_name: 'par_product_fdc',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.doseData = data;
        });
  }

  onLoadingredientsData() {
    var data = {
      table_name: 'par_ingredients_details',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          //this.commonNamesData = data;
          this.ingredientsData = new DataSource({
              paginate: true,
              pageSize: 200,
              store: {
                type: "array",
                  data: data,
                  key: "id"
              }
          });
        });
  }

  // onLoadVerificationData(business_type_id , licence_type_id, importation_reason_id, product_category_id, is_registered, product_origin_id) {
  //   this.configService.onLoadVerificationDataDetails(business_type_id, licence_type_id, importation_reason_id, product_category_id, is_registered, product_origin_id)
  //     //.pipe(first())
  //     .subscribe(
  //       data => {
  //         this.verificationData = data.data;
  //         console.log(this.verificationData)
  //       },
  //       error => {
  //         return false;
  //       });
  // }

  onGetNarcoticPopUp($event){

    if ($event.value == 2) {
      this.isNarcoticproductsAddPopupVisible = true;
       this.isRegisteredLevel = true;

    }
    else {

      this.isNarcoticproductsAddPopupVisible = false;
      this.isRegisteredLevel = false;
    }

  }

  onCountriesSelectionChange($event){
    this.product_origin_id = $event.selectedItem.id;
    this.onLoadVerificationData(this.business_type_id , this.licence_type_id, this.importation_reason_id, this.product_category_id, this.is_registered, this.product_origin_id)
   
    
  }





  updateNarcoticUnits(){

    const tertiary = this.narcoticProductsFrm.get('no_of_packs_tertiary').value;
    const secondary = this.narcoticProductsFrm.get('no_of_packs_secondary').value;
    const tertiaryPack = this.narcoticProductsFrm.get('packs_per_tertiary_pack').value;
    const primarySecondary = this.narcoticProductsFrm.get('no_of_packs').value;
    const units = this.narcoticProductsFrm.get('no_of_units').value;
    const saltQuantity = this.narcoticProductsFrm.get('total_salt_quantity').value;
    console.log(saltQuantity);
    

    const totalUnits = tertiary * secondary * tertiaryPack * primarySecondary * units
    const totalSalt = (totalUnits * saltQuantity) / (this.safetyFactor * (1000))
    console.log(this.safetyFactor);
    console.log(totalSalt);

    this.narcoticProductsFrm.get('total_narcotic_units').setValue(totalUnits);
    this.narcoticProductsFrm.get('total_narcotic_base').setValue(totalSalt);

  }



  updateTotalUnits() {
    const tertiary = this.permitProductsFrm.get('no_of_packs_tertiary').value || 0;
    const secondary = this.permitProductsFrm.get('no_of_packs_secondary').value || 0;
    const primary = this.permitProductsFrm.get('no_of_packs').value || 0;
    const units = this.permitProductsFrm.get('no_of_units').value || 0;
    const unitcost = this.permitProductsFrm.get('unit_price').value || 0;
    const verification = this.permitProductsFrm.get('verification_fee_percent').value;
    const quantity = this.permitProductsFrm.get('quantity').value;


     // Build the formatted string
    this.formattedProduct = `${tertiary} x ${secondary} x ${primary} x ${units}`;

     // Convert verification fee percentage to decimal if needed
   //const verificationMultiplier = (verification / 100);
    const verificationMultiplier = (verification !== 0) ? (verification / 100) : 0;
       // const totalValue = tertiary * secondary * primary * units * unitcost * verificationMultiplier;

        const totalValue = unitcost * quantity ;
        const VCQuantity = tertiary * secondary * primary;
        const totalQuantity = tertiary * secondary * primary * units;

    // Set the calculated total value to the form control
    this.permitProductsFrm.get('total_value').setValue(totalValue);
    this.permitProductsFrm.get('vc_quantity').setValue(VCQuantity);

    this.permitProductsFrm.get('quantity').patchValue(totalQuantity);


   // this.permitProductsFrm.get('total_value').setValue(tertiary * secondary * primary * units * unitcost * verificationAsNumber);
    //console.log( this.permitProductsFrm.get('total_value').setValue(tertiary * secondary * primary * units * unitcost * verificationAsNumber));
    // this.formattedProduct = `${this.permitProductsFrm.get('number_of_tertiary_packs').value} x
    // ${this.permitProductsFrm.get('number_of_secondary_packs').value} x 
    // ${this.permitProductsFrm.get('number_of_primary_packs').value} x ${this.permitProductsFrm.get('number_of_units_packs').value}`;
  }

  // get batchQtyArray() {
  //   return this.permitProductsFrm.get('batch_qty') as FormArray;
  // }
  // get batchNoArray() {
  //   return this.permitProductsFrm.get('product_batch_no') as FormArray;
  // }
  // get ExpiryDateArray() {
  //   return this.permitProductsFrm.get('product_expiry_date') as FormArray;
  // }

  // generateBatchQtyFields() {
  //   const numberOfBatches = this.permitProductsFrm.get('no_of_batches').value;

  //   // Clear existing batch_qty fields
  //   while (this.batchQtyArray.length !== 0) {
  //     this.batchQtyArray.removeAt(0);
  //   }

  //   while (this.batchNoArray.length !== 0) {
  //     this.batchNoArray.removeAt(0);
  //   }

  //   while (this.ExpiryDateArray.length !== 0) {
  //     this.ExpiryDateArray.removeAt(0);
  //   }

  //   // Generate new batch_qty fields
  //   for (let i = 0; i < numberOfBatches; i++) {
  //     this.batchQtyArray.push(this.fb.control(''));
  //   }
  //   for (let i = 0; i < numberOfBatches; i++) {
  //     this.batchNoArray.push(this.fb.control(''));
  //   }
  //   for (let i = 0; i < numberOfBatches; i++) {
  //     this.ExpiryDateArray.push(this.fb.control(''));
  //   }
  // }


  onLoadspecificationData() {
    var data = {
      table_name: 'par_specification_types',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.specificationData = data;
        });
  }



  // onSelectRegistrationLevel($event){
  //    if($event.value == 1){
  //       this.isRegisteredLevel = true;

  //   }else{
  //     this.isRegisteredLevel = false;
  //   }
    
  // }
  onLoadproductSubCategory(product_category_id) {
    var data = {
      table_name: 'par_subproduct_categories',
      product_category_id: product_category_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.productSubCategoryData = data;
        });
  }
  onAddNewGenericDetails(){

  
    this.addproductCommonNameModal = true;
  }
  funcPermitsProductPreviewedit(data) {
    this.permitProductsFrm.patchValue(data);
    //load the personnel qualifiations
  //  this.permitProductsFrm.get('currency_id').setValue(this.proforma_currency_id);
    this.permit_product_id = data.id;
    this.premitProductIdEvent.emit(this.permit_product_id);

    this.isPermitproductsAddPopupVisible = true;

  }
  
  funcpopHeight(percentage_height) {
    return window.innerHeight * percentage_height/100;
  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  permitProductsActionColClick(e, data) {
    var action_btn = e.itemData;
    if (action_btn.action === 'edit_record') {
      this.funcPermitsProductPreviewedit(data.data);
    // this.funcVisaLisPermitsProductPreviewedit(data);
    }
    else if (action_btn.action == 'delete_record') {
      this.funcDeletePermitsProducts(data.data);
    }
  }
  funcSelectApprovedVisaProduct(data){
      let permitprod_recommendation_id = data.permitprod_recommendation_id;
      let visabalance_quantity = data.visabalance_quantity;
      
      if(visabalance_quantity <1){
        this.toastr.success('The Approved Visa Product Quantity has been depleted.', 'Alert');
        return;
      }
      if(permitprod_recommendation_id != 2){
       // this.toastr.success('The selected product is not accepted for Importation as a result of '+data.permitprod_recommendation_remarks, 'Alert');
       // return;
      }
      this.permitProductsFrm.patchValue(data);
      this.permit_product_id = data.id;
      this.premitProductIdEvent.emit(this.permit_product_id);

      this.isPermitproductsAddPopupVisible = true;

      this.isPermitVisaLicProductsAddPopupVisible = true;

  }
  funcREmoveProductDetails(data){
    this.funcDeletePermitsProducts(data);

  }
  funcUpdateLicenseVisaprod(data){
    this.funcVisaLisPermitsProductPreviewedit(data);

  }funcVisaLisPermitsProductPreviewedit(data) {
    this.permitProductsFrm.patchValue(data);
    //load the personnel qualifiations
   // this.permitProductsFrm.get('currency_id').setValue(this.proforma_currency_id);
    this.isPermitVisaLicProductsAddPopupVisible = true;

  }
  funcDeletePermitsProducts(app_data) {

    let record_id = app_data.id;
    this.modalServ.openDialog(this.viewRef, {
      title: 'Do you want remove the selected Permit Product with ' + app_data.brand_name + '?',
      childComponent: '',
      settings: {
        closeButtonClass: 'fa fa-close'
      },
      actionButtons: [{
        text: 'Yes',
        buttonClass: 'btn btn-danger',
        onAction: () => new Promise((resolve: any, reject: any) => {
          this.spinner.show();
          this.appService.onDeletePermitProductsDetails(record_id, 'wb_permits_products', this.application_code, 'Permit products Details')
            .subscribe(
              response => {

                this.spinner.hide();
                let response_data = response.json();
                if (response_data.success) {

                  this.onLoadPermitProductsData();
                  this.toastr.success(response_data.message, 'Response');
                }
                else {

                  this.toastr.success(response_data.message, 'Response');

                }

              },
              error => {
                this.loading = false;
              });
          resolve();
        })
      }, {
        text: 'no',
        buttonClass: 'btn btn-default',
        onAction: () => new Promise((resolve: any) => {
          resolve();
        })
      }
      ]
    });

  }

   

  onSearchUnRegisteredRegisteredProductApplication(){
  this.isUnRegisteredProductsDetails = true;
  var me = this;
 

this.UnRegisteredProductsData.store = new CustomStore({
  load: function (loadOptions: any) {
    console.log(loadOptions)
      var params = '?';
      params += 'skip=' + loadOptions.skip;
      params += '&take=' + loadOptions.take;//searchValue
      var headers = new HttpHeaders({
        "Accept": "application/json",
        "Authorization": "Bearer " + me.authService.getAccessToken(),
      });
    
      this.configData = {
        headers: headers,
        params: { skip: loadOptions.skip,take:loadOptions.take, searchValue:loadOptions.filter }
      };
      return me.httpClient.get(AppSettings.base_url + 'importexportapp/getUnRegisteredProductsDetails',this.configData)
          .toPromise()
          .then((data: any) => {
              return {
                  data: data.data,
                  totalCount: data.totalCount
              }
          })
          .catch(error => { throw 'Data Loading Error' });
  }
});
    
  }

  onSearchRegisteredProductApplication(){

      // let man_site_id = this.gmpapplicationGeneraldetailsfrm.get('man_site_id').value;
    //the loading
    
      this.isManufacturingSiteProductsDetails = true;
      let me = this;
      this.manSiteRegisteredProductsData.store = new CustomStore({
        load: function (loadOptions: any) {
          console.log(loadOptions)
            var params = '?';
            params += 'skip=' + loadOptions.skip;
            params += '&take=' + loadOptions.take;//searchValue
            var headers = new HttpHeaders({
              "Accept": "application/json",
              "Authorization": "Bearer " + me.authService.getAccessToken(),
            });
          
            this.configData = {
              headers: headers,
              params: { skip: loadOptions.skip,take:loadOptions.take, searchValue:loadOptions.filter} //,man_site_id:man_site_id ,section_id:me.section_id
            };
            return me.httpClient.get(AppSettings.base_url + 'importexportapp/getManufacturingSiteRegisteredProductsData',this.configData)
                .toPromise()
                .then((data: any) => {
                    return {
                        data: data.data,
                        totalCount: data.totalCount
                    }
                })
                .catch(error => { throw 'Data Loading Error' });
        }
    });
    
  }

  onAddBatches(product_id){
    this.product_id = product_id; 
    this.spinner.show();
    this.isBatchPopupVisible = true;
    this.permitProductsData = [];
    this.appService.getPermitsOtherDetails({ 'application_code': this.application_code,'product_id':this.product_id }, 'getBatchPermitProductsDetails')
      .subscribe(
        data => {
          if (data.success) {
            this.permitProductsData = data.data;
            this.permitProductsFrm.get('no_of_batches').setValue(data.no_of_batches);
            this.permitProductsFrm.get('qty_shipped').setValue(data.qty_shipped);

          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          return false
        });
    
  }

  onSearchApprovedProductDetails(){

      let port_id  = this.port_id;
    //the loading
    
      this.isApprovedProductsDetails = true;
      let me = this;
      this.approvedProductsData.store = new CustomStore({
        load: function (loadOptions: any) {
          console.log(loadOptions)
            var params = '?';
            params += 'skip=' + loadOptions.skip;
            params += '&take=' + loadOptions.take;//searchValue
            var headers = new HttpHeaders({
              "Accept": "application/json",
              "Authorization": "Bearer " + me.authService.getAccessToken(),
            });
          
            this.configData = {
              headers: headers,
              params: { skip: loadOptions.skip,take:loadOptions.take, searchValue:loadOptions.filter, port_id:port_id} //,man_site_id:man_site_id ,section_id:me.section_id
            };
            return me.httpClient.get(AppSettings.base_url + 'importexportapp/getApprovedProductsDetails',this.configData)
                .toPromise()
                .then((data: any) => {
                    return {
                        data: data.data,
                        totalCount: data.totalCount
                    }
                })
                .catch(error => { throw 'Data Loading Error' });
        }
    });
    
  }

  // funcSelectPremiseDetails(data) {
  //   //check if there any pending detail
  //   let status_id = data.data.validity_status_id;
  //   let has_registered_outlets = this.applicationGeneraldetailsfrm.get('has_registered_outlets').value;

  //  // if (status_id == 2 || has_registered_outlets == 2) {
  //     this.applicationGeneraldetailsfrm.get('premise_id').setValue(data.data.premise_id);
  //     this.applicationGeneraldetailsfrm.get('premises_name').setValue(data.data.premises_name);
  //     this.applicationGeneraldetailsfrm.get('full_names').setValue(data.data.full_names);
  //     this.applicationGeneraldetailsfrm.get('product_classification_id').setValue(data.data.product_classification_id);
  //     this.applicationGeneraldetailsfrm.get('business_type_id').setValue(data.data.business_type_id); 
  //     this.applicationGeneraldetailsfrm.get('psu_date').setValue(data.data.psu_date);
  //     this.applicationGeneraldetailsfrm.get('psu_no').setValue(data.data.psu_no);
  //     this.applicationGeneraldetailsfrm.get('pharmacist_telephone').setValue(data.data.pharmacist_telephone);
  //     this.applicationGeneraldetailsfrm.get('pharmacist_email').setValue(data.data.pharmacist_email);
  //     this.applicationGeneraldetailsfrm.get('pharmacist_qualification').setValue(data.data.pharmacist_qualification);
  //     this.applicationGeneraldetailsfrm.get('pharmacist_country_id').setValue(data.data.pharmacist_country_id);
  //     this.applicationGeneraldetailsfrm.get('pharmacist_district_id').setValue(data.data.pharmacist_district_id);
  //     this.applicationGeneraldetailsfrm.get('pharmacist_region_id').setValue(data.data.pharmacist_region_id);
  //     this.ispremisesSearchWinVisible = false;
  //   /*
  //   }
  //   else {
  //     this.toastr.error('The selected premises has an inactive Validity Status. Current Status :' + data.data.status_name + '. Instatiate a premises renewal or contact Authority for further guidelines.', 'Alert');
  //   }

  //   */
  // }

  funcSelectApprovedProductDetails(data){
    let productdata = data.data;
    this.permitProductsFrm.get('vc_no').setValue(productdata.vc_no);
    this.permitProductsFrm.get('brand_name').setValue(productdata.brand_name);
    this.permitProductsFrm.get('common_name_id').setValue(productdata.common_name_id);
    this.permitProductsFrm.get('si_unit_id').setValue(productdata.si_unit_id);
    this.permitProductsFrm.get('ingredient_id').setValue(productdata.ingredient_id);
    this.permitProductsFrm.get('dosage_form_id').setValue(productdata.dosage_form_id);
    this.permitProductsFrm.get('currency_id').setValue(productdata.currency_id);
    this.permitProductsFrm.get('product_strength').setValue(productdata.product_strength);
    this.permitProductsFrm.get('product_id').setValue(productdata.product_id);
    this.permitProductsFrm.get('id').setValue(productdata.id);
    this.productBatchdetailsfrm.get('product_id').setValue(productdata.id);
    this.permitProductsFrm.get('approved_qty').setValue(productdata.vc_quantity);
    this.permitProductsFrm.get('total_units').setValue(productdata.total_units);

     
    // this.permitProductsFrm.patchValue({brand_name:productdata.brand_name, product_registration_no:productdata.product_registration_no,specification_type_id:productdata.specification_type_id,unit_cost_per_unit:productdata.unit_cost_per_unit,
    //   common_name:productdata.common_name,ingredient_id:productdata.ingredient_id, product_strength:productdata.product_strength, weights_units_id:productdata.weights_units_id, standard:productdata.standard, packaging_unit_id: productdata.packaging_unit_id,
    //   device_type_id:productdata.device_type_id, currency_name:productdata.currency_name,dosage_form:productdata.dosage_form,
    //   product_id:data.tra_product_id,product_category_id:productdata.product_category_id,product_subcategory_id:productdata.product_subcategory_id,registration_no:productdata.certificate_no,registrant_name:productdata.applicant_name});

    this.isApprovedProductsDetails = false;

  }
  public shouldDisplaySelectBox(): boolean {
    const approvedQty = this.permitProductsFrm.get('approved_qty').value;
    const qtyShipped = this.permitProductsFrm.get('qty_shipped').value;
    const subModuleId = this.sub_module_id; // Assuming this is available in your component

    return (subModuleId === 115 || subModuleId === 49) && approvedQty !== qtyShipped;
  }
  funcSelectProductDetails(data){
    let productdata = data.data;
    this.permitProductsFrm.get('product_registration_no').setValue(productdata.product_registration_no);
    this.permitProductsFrm.get('common_name_id').setValue(productdata.common_name_id);
    this.permitProductsFrm.get('product_origin_id').setValue(productdata.product_origin_id);
    this.permitProductsFrm.get('brand_name').setValue(productdata.brand_name);
    this.permitProductsFrm.get('specification_type_id').setValue(productdata.specification_type_id);
    this.permitProductsFrm.get('ingredient_id').setValue(productdata.ingredient_id);
    this.permitProductsFrm.get('dosage_form_id').setValue(productdata.dosage_form_id);
    this.permitProductsFrm.get('product_strength').setValue(productdata.product_strength);
    this.permitProductsFrm.get('si_unit_id').setValue(productdata.si_unit_id);
    this.permitProductsFrm.get('no_of_packs_tertiary').setValue(productdata.no_of_packs_tertiary);
    this.permitProductsFrm.get('no_of_packs_secondary').setValue(productdata.no_of_packs_secondary);
    this.permitProductsFrm.get('no_of_packs').setValue(productdata.no_of_packs);
    this.permitProductsFrm.get('no_of_units').setValue(productdata.no_of_units);
    this.permitProductsFrm.get('container_type_id').setValue(productdata.container_type_id);

    this.narcoticProductsFrm.get('product_registration_no').setValue(productdata.product_registration_no);
    this.narcoticProductsFrm.get('common_name_id').setValue(productdata.common_name_id);
    this.narcoticProductsFrm.get('product_origin_id').setValue(productdata.product_origin_id);
    this.narcoticProductsFrm.get('brand_name').setValue(productdata.brand_name);
    this.narcoticProductsFrm.get('specification_type_id').setValue(productdata.specification_type_id);
    this.narcoticProductsFrm.get('ingredient_id').setValue(productdata.ingredient_id);
    this.narcoticProductsFrm.get('dosage_form_id').setValue(productdata.dosage_form_id);
    this.narcoticProductsFrm.get('product_strength').setValue(productdata.product_strength);
    this.narcoticProductsFrm.get('si_unit_id').setValue(productdata.si_unit_id);
    this.narcoticProductsFrm.get('no_of_packs_tertiary').setValue(productdata.no_of_packs_tertiary);
    this.narcoticProductsFrm.get('no_of_packs_secondary').setValue(productdata.no_of_packs_secondary);
    this.narcoticProductsFrm.get('no_of_packs').setValue(productdata.no_of_packs);
    this.narcoticProductsFrm.get('no_of_units').setValue(productdata.no_of_units);
    this.narcoticProductsFrm.get('container_type_id').setValue(productdata.container_type_id);
     
    // this.permitProductsFrm.patchValue({brand_name:productdata.brand_name, product_registration_no:productdata.product_registration_no,specification_type_id:productdata.specification_type_id,unit_cost_per_unit:productdata.unit_cost_per_unit,
    //   common_name:productdata.common_name,ingredient_id:productdata.ingredient_id, product_strength:productdata.product_strength, weights_units_id:productdata.weights_units_id, standard:productdata.standard, packaging_unit_id: productdata.packaging_unit_id,
    //   device_type_id:productdata.device_type_id, currency_name:productdata.currency_name,dosage_form:productdata.dosage_form,
    //   product_id:data.tra_product_id,product_category_id:productdata.product_category_id,product_subcategory_id:productdata.product_subcategory_id,registration_no:productdata.certificate_no,registrant_name:productdata.applicant_name});

    this.isManufacturingSiteProductsDetails = false;

  }

  funcSelectUnRegisteredProductDetails(data){
    let productdata = data.data;
    this.permitProductsFrm.get('brand_name').setValue(productdata.proprietary_name);
    this.permitProductsFrm.get('common_name_id').setValue(productdata.common_name_id);
    this.permitProductsFrm.get('product_type_id').setValue(productdata.product_type_id);
    this.permitProductsFrm.get('classification').setValue(productdata.classification);
    this.permitProductsFrm.get('class_category').setValue(productdata.class_category);
    this.permitProductsFrm.get('atc_code_id').setValue(productdata.atc_code_id);
    this.permitProductsFrm.get('product_strength').setValue(productdata.product_strength);
    this.permitProductsFrm.get('si_unit_id').setValue(productdata.si_unit_id);
    this.permitProductsFrm.get('atc_desciption').setValue(productdata.atc_desciption);
    this.permitProductsFrm.get('therapeutic_group').setValue(productdata.therapeutic_group);
    this.permitProductsFrm.get('distribution_category').setValue(productdata.distribution_category);
    this.permitProductsFrm.get('route_of_administarion').setValue(productdata.route_of_administarion);
    this.permitProductsFrm.get('dosage_form_id').setValue(productdata.dosage_form_id);    this.narcoticProductsFrm.get('atc_code_id').setValue(productdata.atc_code_id);
    this.narcoticProductsFrm.get('product_strength').setValue(productdata.product_strength);
    this.narcoticProductsFrm.get('si_unit_id').setValue(productdata.si_unit_id);
    this.narcoticProductsFrm.get('atc_desciption').setValue(productdata.atc_desciption);
    this.narcoticProductsFrm.get('therapeutic_group').setValue(productdata.therapeutic_group);
    this.narcoticProductsFrm.get('distribution_category').setValue(productdata.distribution_category);
    this.narcoticProductsFrm.get('route_of_administarion').setValue(productdata.route_of_administarion);
     
    // this.permitProductsFrm.patchValue({brand_name:productdata.brand_name, product_registration_no:productdata.product_registration_no,specification_type_id:productdata.specification_type_id,unit_cost_per_unit:productdata.unit_cost_per_unit,
    //   common_name:productdata.common_name,ingredient_id:productdata.ingredient_id, product_strength:productdata.product_strength, weights_units_id:productdata.weights_units_id, standard:productdata.standard, packaging_unit_id: productdata.packaging_unit_id,
    //   device_type_id:productdata.device_type_id, currency_name:productdata.currency_name,dosage_form:productdata.dosage_form,
    //   product_id:data.tra_product_id,product_category_id:productdata.product_category_id,product_subcategory_id:productdata.product_subcategory_id,registration_no:productdata.certificate_no,registrant_name:productdata.applicant_name});

    this.isUnRegisteredProductsDetails = false;

  }
  onLoadproductTypeDta() {
    var data = {
      table_name: 'par_product_type'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.productTypeDta = data;
        });
  }
  funSelectRegisteredProdcustsApp(data){
    let productdata = data.data;

    this.permitProductsFrm.patchValue({brand_name:productdata.brand_name, product_registration_no:productdata.product_registration_no,
      common_name:productdata.common_name,active_ingredient:productdata.active_ingredient, product_strength:productdata.product_strength, weights_units_id:productdata.weights_units_id, standard:productdata.standard, packaging_unit_id: productdata.packaging_unit_id,
      device_type_id:productdata.device_type_id, currency_name:productdata.currency_name,dosage_form_id:productdata.dosage_form_id,
      product_id:data.tra_product_id,product_category_id:productdata.product_category_id,product_subcategory_id:productdata.product_subcategory_id,registration_no:productdata.certificate_no,registrant_name:productdata.applicant_name});
    this.isRegisteredProductsWinshow = false;

  }

  
  onLoadPermitProductsData() {
    this.spinner.show();
    this.appService.getPermitsOtherDetails({ 'application_code': this.application_code }, 'getPermitProductsDetails')
      .subscribe(
        data => {
          if (data.success) {

            this.permitProductsData = data.data;

          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          return false
        });
  }
  
  onRegisteredProductGridToolbar(e) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Add New Batch',
        type: 'default',
        icon: 'fa fa-plus',
        visible: this.enabled_newproductadd,
        onClick: this.funAddNewPermitProducts.bind(this)
      }
    }, {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.refreshDataGrid.bind(this)
        }
      });

  }
  refreshDataGrid() {
  //  this.dataGrid.instance.refresh();
  }
  funAddNewPermitProducts(){
    this.isAddBatchPopupVisible = true;
    this.is_brandreadonly = false;
  }

  funcSelectRegisteredProduct(data) {
    this.permitProductsFrm.reset();
    console.log(data.data.product_id);
    let validitystatus_id = data.data.validity_status_id;
    let retentionstatus_id = data.data.retentionstatus_id;
    
    if (this.sub_module_id == 12 || this.sub_module_id == 115) {
       this.permitProductsFrm.get('currency_id').setValue(this.proforma_currency_id);
        this.permitProductsFrm.get('product_registration_no').setValue(data.data.product_registration_no);
        this.permitProductsFrm.get('active_ingredient').setValue(data.data.active_ingredient);
        this.permitProductsFrm.get('brand_name').setValue(data.data.brand_name);
        this.permitProductsFrm.get('dosage_form').setValue(data.data.dosage_form);
        
        this.permitProductsFrm.get('product_strength').setValue(data.data.product_strength);
        this.permitProductsFrm.get('common_name_id').setValue(data.data.common_name_id);
        this.permitProductsFrm.get('packaging_unit_id').setValue(data.data.packaging_unit_id);
        this.permitProductsFrm.get('standard').setValue(data.data.standard);
        this.permitProductsFrm.get('quantity').setValue(data.data.quantity);
        this.permitProductsFrm.get('unit_price').setValue(data.data.unit_price);
        this.permitProductsFrm.get('number_of_primary_packs').setValue(data.data.number_of_primary_packs);
        this.permitProductsFrm.get('number_of_units_packs').setValue(data.data.number_of_units_packs);
        this.permitProductsFrm.get('device_type_id').setValue(data.data.device_type_id);
        this.permitProductsFrm.get('unit_price').setValue(data.data.unit_price);
        this.permitProductsFrm.get('manufacturer_name').setValue(data.data.manufacturer_name);
        this.permitProductsFrm.get('manufacturer_id').setValue(data.data.manufacturer_id);
        this.permitProductsFrm.get('country_oforigin_id').setValue(data.data.country_oforigin_id);
        this.isPermitproductsAddPopupVisible = false;
        this.isPermitproductsPopupVisible = false;

        this.toastr.success('Product Selection', 'The following product has been selected: ' + data.data.brand_name);
      
    }
    else {
      //validate the datasets
      if (validitystatus_id != 2) {
        this.toastr.error('Product Registration Alert', 'The product must be registered, confirm the registration status or submit Permit as a special case application.');
        return;

      } else if (retentionstatus_id == 2) {
        this.toastr.error('Product Retention Payment Alert', 'The selected product has a pending retention payment, pay the pending retention or contact Authority for further guidelines.');
        return;
      }
      else {
        this.permitProductsFrm.get('currency_id').setValue(this.proforma_currency_id);
        this.isPermitproductsAddPopupVisible = true;
             this.permitProductsFrm.get('product_registration_no').setValue(data.data.product_registration_no);
        this.permitProductsFrm.get('active_ingredient').setValue(data.data.active_ingredient);
        this.permitProductsFrm.get('brand_name').setValue(data.data.brand_name);
        this.permitProductsFrm.get('dosage_form').setValue(data.data.dosage_form);
        
        this.permitProductsFrm.get('product_strength').setValue(data.data.product_strength);
        this.permitProductsFrm.get('common_name_id').setValue(data.data.common_name_id);
        this.permitProductsFrm.get('packaging_unit_id').setValue(data.data.packaging_unit_id);
        this.permitProductsFrm.get('standard').setValue(data.data.standard);
        this.permitProductsFrm.get('quantity').setValue(data.data.quantity);
        this.permitProductsFrm.get('unit_price').setValue(data.data.unit_price);
        this.permitProductsFrm.get('number_of_primary_packs').setValue(data.data.number_of_primary_packs);
        this.permitProductsFrm.get('number_of_units_packs').setValue(data.data.number_of_units_packs);
        this.permitProductsFrm.get('device_type_id').setValue(data.data.device_type_id);
        this.permitProductsFrm.get('unit_price').setValue(data.data.unit_price);
        this.permitProductsFrm.get('manufacturer_name').setValue(data.data.manufacturer_name);
        this.permitProductsFrm.get('manufacturer_id').setValue(data.data.manufacturer_id);
        this.permitProductsFrm.get('country_oforigin_id').setValue(data.data.country_oforigin_id);

        this.toastr.success('Product Selection', 'The following product has been selected: ' + data.data.brand_name);

      }
    }
  }
  onLoadcommonNameData() {
    var data = {
      table_name: 'par_common_names',
      //section_id: this.section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.commonNameData = new DataSource({
              paginate: true,
              pageSize: 200,
              store: {
                type: "array",
                  data: data,
                  key: "id"
              }
          });
        });
  
  }

  
  functDataGridToolbar(e, funcBtn, btn_title) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: btn_title,
        type: 'default',
        icon: 'fa fa-plus',
        onClick: funcBtn.bind(this)

      }
    }, {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.refreshDataGrid.bind(this)
        }
      });
  }onSaveNewGenericDetails(){
    this.addProductParamsdetailsfrm.get('tablename').setValue('par_common_names')
    // this.addProductParamsdetailsfrm.get('section_id').setValue(this.section_id);
    this.utilityService.onsaveApplicationUniformDetails('', this.addProductParamsdetailsfrm.value, 'onsaveProductConfigData')
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.onLoadcommonNameData();
         
          this.addproductCommonNameModal = false;
          this.permitProductsFrm.get('common_name_id').setValue(this.product_resp.record_id);
  
          this.toastr.success(this.product_resp.message, 'Response');
  
        } else {
          this.toastr.error(this.product_resp.message, 'Alert');
        }
        this.spinner.hide();
      },
      error => {
        this.toastr.error('Error Occurred', 'Alert');
      });
  
  } 
  fileChangeEvent(fileInput: any) {
      this.filesToUpload = <Array<File>>fileInput.target.files;
  }
  
  funcDownloadUploadedDocuments(data) {
    
    this.premitProductIdEvent.emit(data.id);
    this.isDocumentPreviewDownloadwin = true;
      
  }
  private prepareIMPSave(): any {
    let input = new FormData();
    const files: Array<File> = this.filesToUpload;
   // input.append('file', this.uploadpaymentdetailsfrm.get('file').value);
    for(let i =0; i < files.length; i++){
        input.append("file", files[i], files[i]['name']);
    }
    input.append('brand_name', this.permitProductsFrm.get('brand_name').value);
    input.append('product_category_id', this.permitProductsFrm.get('product_category_id').value);
    input.append('product_batch_no', this.permitProductsFrm.get('product_batch_no').value);
    input.append('product_strength', this.permitProductsFrm.get('product_strength').value);
    input.append('product_manufacturing_date', this.permitProductsFrm.get('product_manufacturing_date').value);
    input.append('product_expiry_date', this.permitProductsFrm.get('product_expiry_date').value);
    input.append('country_oforigin_id', this.permitProductsFrm.get('country_oforigin_id').value);

    
    input.append('unit_price', this.permitProductsFrm.get('unit_price').value);
    input.append('currency_id', this.permitProductsFrm.get('currency_id').value);
    input.append('packaging_unit_id', this.permitProductsFrm.get('packaging_unit_id').value);
    input.append('quantity', this.permitProductsFrm.get('quantity').value);
    input.append('laboratory_no', this.permitProductsFrm.get('laboratory_no').value);
    input.append('regulated_prodpermit_id', this.permitProductsFrm.get('regulated_prodpermit_id').value);
    input.append('prodcertificate_no', this.permitProductsFrm.get('prodcertificate_no').value);
    input.append('product_id', this.permitProductsFrm.get('product_id').value);
    input.append('unitpack_unit_id', this.permitProductsFrm.get('unitpack_unit_id').value);
    input.append('unitpack_size', this.permitProductsFrm.get('unitpack_size').value);
    input.append('vc_quantity', this.permitProductsFrm.get('vc_quantity').value);
    input.append('total_weight', this.permitProductsFrm.get('total_weight').value);
    input.append('weights_units_id', this.permitProductsFrm.get('weights_units_id').value);
    input.append('id', this.permitProductsFrm.get('id').value);
    input.append('device_type_id', this.permitProductsFrm.get('device_type_id').value);
    input.append('is_regulated_product', this.permitProductsFrm.get('is_regulated_product').value);
    input.append('productphysical_description', this.permitProductsFrm.get('productphysical_description').value);
    input.append('common_name_id', this.permitProductsFrm.get('common_name_id').value);
    input.append('manufacturer_id', this.permitProductsFrm.get('manufacturer_id').value);
    input.append('manufacturer_name', this.permitProductsFrm.get('manufacturer_name').value);
    return input;
  }
  onsavePermitProductdetails() {
    //validate the visa Quoantity
    if(this.sub_module_id == 115){
      // let vc_quantity = this.permitProductsFrm.get('vc_quantity').value;
      // let declaration_quantity = this.permitProductsFrm.get('declaration_quantity').value;

      // if(declaration_quantity > vc_quantity){
      //   this.toastr.error("The product's quantities should be equal or less that the Visa Application Product Details. VC Product Quantity is "+vc_quantity, 'Alert');
      //   return;
      // }
    }
    const invalid = [];
    const controls = this.permitProductsFrm.controls;
    
    for (const name in controls) {
        if (controls[name].invalid) {
          this.toastr.error('Fill In All Mandatory fields with (*), missing value on '+ name.replace('_id',''), 'Alert');
            return;
        }
    }
   
    if (this.permitProductsFrm.invalid) {
      return;
    }
    this.spinner.show();
    this.appService.onsavePermitProductdetails(this.application_code, this.permitProductsFrm.value, this.tracking_no, 'savePermitProductdetails')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
           this.permitProductsFrm.reset();
            this.isPermitproductsAddPopupVisible = false;
            this.isPermitproductsPopupVisible = false;
            this.isPermitVisaLicProductsAddPopupVisible = false;
            this.onLoadPermitProductsData();
            this.permit_product_id = this.app_resp.record_id;
            this.premitProductIdEvent.emit(this.permit_product_id);

            this.toastr.success(this.app_resp.message, 'Response');
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
          this.spinner.hide();

        });
  }

  onsaveNarcoticPermitProductdetails() {
    const invalid = [];
    const controls = this.narcoticProductsFrm.controls;
    
    for (const name in controls) {
        if (controls[name].invalid) {
          this.toastr.error('Fill In All Mandatory fields with (*), missing value on '+ name.replace('_id',''), 'Alert');
            return;
        }
    }
   
    if (this.narcoticProductsFrm.invalid) {
      return;
    }
    this.spinner.show();
    this.appService.onsavePermitProductdetails(this.application_code, this.narcoticProductsFrm.value, this.tracking_no, 'savePermitProductdetails')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
           this.narcoticProductsFrm.reset();
            this.isPermitproductsAddPopupVisible = false;
            this.isNarcoticproductsAddPopupVisible = false;
            this.isPermitproductsPopupVisible = false;
            this.isPermitVisaLicProductsAddPopupVisible = false;
            this.onLoadPermitProductsData();
            this.permit_product_id = this.app_resp.record_id;
            this.premitProductIdEvent.emit(this.permit_product_id);

            this.toastr.success(this.app_resp.message, 'Response');
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
          this.spinner.hide();

        });
  }

  onsaveBatchProductdetails(){
    this.spinner.show();
    this.appService.onsaveBatchProductdetails(this.application_code, this.productBatchdetailsfrm.value, this.tracking_no,'saveBatchProductdetails')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {
            this.productBatchdetailsfrm.reset();
            this.isPermitproductsAddPopupVisible = true;
            this.isPermitproductsPopupVisible = false;
            this.isPermitVisaLicProductsAddPopupVisible = false;
            this.isAddBatchPopupVisible = false;
            this.isBatchPopupVisible=true;
            this.onAddBatches(this.app_resp.product_id);
            this.permit_product_id = this.app_resp.record_id;
            this.premitProductIdEvent.emit(this.permit_product_id);

            this.toastr.success(this.app_resp.message, 'Response');
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
          this.spinner.hide();

        });
  }

  
  onupdatePermitProductdetails() {
    if (this.permitProductsFrm.invalid) {
      return;
    }
    this.spinner.show();
    this.appService.onsavePermitProductdetails(this.application_code, this.permitProductsFrm.value, this.tracking_no,'savePermitProductdetails')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details 
          this.spinner.hide();

          if (this.app_resp.success) {

            this.onLoadPermitProductsData();
            this.toastr.success(this.app_resp.message, 'Response');
            this.isPermitproductsAddPopupVisible = false;

          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });
  }
   onPermitVisaLicenseProductGridToolbar(e) {
   
   
    //sub_module_id
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Add Visa(Approved) Products',
        type: 'default',
        icon: 'fa fa-plus',
        onClick: this.funAddApprovedVisaPermitProducts.bind(this)

      }
    },  {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.refreshDataGrid.bind(this)
        }
      });

  }

  funcUploadOptionProducts(){
      
      this.onpermitUploadedProductsData();

  }
  funcDownloadOptionProducts(){
      
    let report_url = this.mis_url+'reports/onDownloadImportInvoiceProductstemplate?module_id='+this.module_id+'&sub_module_id='+this.sub_module_id+'&section_id='+this.section_id;
    this.funcGenerateRrp(report_url,"Download Invoice Template");

  }
  
  funcGenerateRrp(report_url,title){
    
    this.printiframeUrl =  this.configService.returnReportIframe(report_url);
    this.printReportTitle= title;
    this.isPrintReportVisible = true;

}
funcSynchronisedUploadedProducts(){
  if(this.permitUploadedProductsData.length  ==  0){
    this.toastr.success('No Uploaded Invoice Products Found', 'Response');

      return;
  }

  this.modalServ.openDialog(this.viewRef, {
    title: 'Do you want to syncronise/Save the uploaded Products()',
    childComponent: '',
    settings: {
      closeButtonClass: 'fa fa-close'
    },
    actionButtons: [{
      text: 'Yes',
      buttonClass: 'btn btn-danger',
      onAction: () => new Promise((resolve: any, reject: any) => {
        this.spinner.show();
        this.appService.onSynchronisedUploadedProducts('wb_uploadpermits_products', this.application_code, 'Permit products Details')
          .subscribe(
            response => {

              this.spinner.hide();
              let response_data = response.json();
              if (response_data.success) {
                this.onLoadpermitUploadedProductsData(this.application_code);
                this.isUploadedInvoiceProductsWin= false;
              
                this.onLoadPermitProductsData();
                this.toastr.success(response_data.message, 'Response');
              }
              else {
                this.isUploadedInvoiceProductsWin= false;
              
                this.toastr.success(response_data.message, 'Response');

              }

            },
            error => {
              this.loading = false;
            });
        resolve();
      })
    }, {
      text: 'no',
      buttonClass: 'btn btn-default',
      onAction: () => new Promise((resolve: any) => {
        this.isUploadedInvoiceProductsWin= true;
        
         resolve();
      })
    }
    ]
  });


}
funcClearUploadedProducts(){
    if(this.permitUploadedProductsData.length  ==  0){
      this.toastr.success('No Uploaded Invoice Products Found', 'Response');

        return;
    }

    this.modalServ.openDialog(this.viewRef, {
      title: 'Do you want remove the uploaded Products()',
      childComponent: '',
      settings: {
        closeButtonClass: 'fa fa-close'
      },
      actionButtons: [{
        text: 'Yes',
        buttonClass: 'btn btn-danger',
        onAction: () => new Promise((resolve: any, reject: any) => {
          this.spinner.show();
          this.appService.onDeletePermitUploadedProductsDetails('wb_uploadpermits_products', this.application_code, 'Permit products Details')
            .subscribe(
              response => {

                this.spinner.hide();
                let response_data = response.json();
                if (response_data.success) {
                  this.onLoadpermitUploadedProductsData(this.application_code);
                  this.toastr.success(response_data.message, 'Response');
                }
                else {

                  this.toastr.success(response_data.message, 'Response');

                }

              },
              error => {
                this.loading = false;
              });
          resolve();
        })
      }, {
        text: 'no',
        buttonClass: 'btn btn-default',
        onAction: () => new Promise((resolve: any) => {
          this.isUploadedInvoiceProductsWin= true;
          resolve();
        })
      }
      ]
    });


}
funcUploadOptionProductsWin(){

    this.isInvoiceProductsUploadVisable = true;

}
  onPermitUploadProductGridToolbar(e) {
   
    //sub_module_id
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Download Upload Form(Template)',
        type: 'default',
        icon: 'fa fa-upload',
        onClick: this.funcDownloadOptionProducts.bind(this)

      }
    }, {
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Upload Products',
        type: 'default',
        icon: 'fa fa-upload',
        onClick: this.funcUploadOptionProductsWin.bind(this)
      }
    },{
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Synchronised Validated Products',
        type: 'success',
        icon: 'fa fa-upload',
        onClick: this.funcSynchronisedUploadedProducts.bind(this)
      }
    },{
      location: 'after',
      widget: 'dxButton',
      options: {
        text: 'Clear Uploaded Products',
        type: 'danger',
        icon: 'fa fa-upload',
        onClick: this.funcClearUploadedProducts.bind(this)
      }
    }, {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.onpermitUploadedProductsData.bind(this)
        }
      });

  } 
  onpermitUploadedProductsData(){
      this.onLoadpermitUploadedProductsData(this.application_code);
  }

  onPermitProductGridToolbar(e) {
   
    //sub_module_id
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Add Products and Information',
        type: 'default',
        icon: 'fa fa-plus',
        visible: this.enabled_productadd,
        onClick: this.funAddPermitProducts.bind(this)

      }
    //} 

    // {
    //   location: 'before',
    //   widget: 'dxButton',
    //   options: {
    //     text: 'Upload Invoice Products(Templated Option)',
    //     type: 'success',
    //     icon: 'fa fa-upload',
    //     onClick: this.onpermitUploadedProductsData.bind(this)
    //   }

    }, {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.refreshDataGrid.bind(this)
        }
      });

  }
  funAddPermitProducts() {
   
    this.OnReloadPermitProducts();
    this.permitProductsFrm.reset();
    this.isPermitproductsAddPopupVisible = true;
    
  }
  funUploadPermitProducts() {
   
    this.OnReloadPermitProducts();
    this.isPermitproductsPopupVisible = true;
    
  }
  
  funAddApprovedVisaPermitProducts() {
    this.spinner.show();
    this.appService.getPermitsOtherDetails({ 'application_code': this.application_code }, 'getApprrovedVisaProducts')
      .subscribe(
        data => {
          if (data.success) {

            this.approvedVisaProducts = data.data;
            this.isApprovedVisaproductsPopupVisible = true;
   
          }
          else {
            this.toastr.success(data.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          return false
        });

   
  }

OnReloadPermitDrugProducts(){

    let me = this;
            this.permitDrugDetailsData.store = new CustomStore({
              load: function (loadOptions: any) {
                  var params = '?';
                  params += 'skip=' + loadOptions.skip;
                  params += '&take=' + loadOptions.take;//searchValue
                  var headers = new HttpHeaders({
                    "Accept": "application/json",
                    "Authorization": "Bearer " + me.authService.getAccessToken(),
                  });
                  console.log(loadOptions.filter);
                  this.configData = {
                    headers: headers,
                    params: { skip: loadOptions.skip,take:loadOptions.take, searchValue:loadOptions.filter, table_name: 'registered_products'}
                  };
                  return me.httpClient.get(AppSettings.base_url + 'importexportapp/getRegisteredNonRegisteredProducts',this.configData)
                            .toPromise()
                            .then((data: any) => {
                                return {
                                    data: data.data,
                                    totalCount: data.totalCount
                                }
                            })
                            .catch(error => {
                               throw 'Data Loading Error' 
                            });
              }
          });
      }
  
  
  OnReloadPermitProducts(){

    let me = this;
            this.registeredProductsData.store = new CustomStore({
              load: function (loadOptions: any) {
                  var params = '?';
                  params += 'skip=' + loadOptions.skip;
                  params += '&take=' + loadOptions.take;//searchValue
                  var headers = new HttpHeaders({
                    "Accept": "application/json",
                    "Authorization": "Bearer " + me.authService.getAccessToken(),
                  });
                  console.log(loadOptions.filter);
                  this.configData = {
                    headers: headers,
                    params: { skip: loadOptions.skip,take:loadOptions.take, searchValue:loadOptions.filter, table_name: 'registered_products', 'module_id': me.module_id, 'sub_module_id': me.sub_module_id,section_id:me.section_id,trader_id:me.trader_id, mistrader_id:me.mistrader_id}
                  };
                  return me.httpClient.get(AppSettings.base_url + 'importexportapp/getRegisteredNonRegisteredProducts',this.configData)
                            .toPromise()
                            .then((data: any) => {
                                return {
                                    data: data.data,
                                    totalCount: data.totalCount
                                }
                            })
                            .catch(error => {
                               throw 'Data Loading Error' 
                            });
              }
          });
      }
      onAddNewProductinformation() {
 
        if (this.productGeneraldetailsfrm.invalid) {
          return;
        }
        this.productGeneraldetailsfrm.get('section_id').setValue(this.section_id);
        let brand_name =  this.productGeneraldetailsfrm.get('brand_name').value;
        this.spinner.show();
        this.appService.onAddNewProductinformation(this.productGeneraldetailsfrm.value, 'onAddNewProductinformation')
          .subscribe(
            response => {
              this.product_resp = response.json();
              
              if (this.product_resp.success) {
                
                //reload prodct details
                this.isnewproductAddWinVisible = false;
                //this.OnReloadPermitProducts();
                this.OnReloadPermitDrugProducts();
                this.permitProductsFrm.get('currency_id').setValue(this.proforma_currency_id);
                this.isPermitproductsAddPopupVisible = true;
                this.permitProductsFrm.get('brand_name').setValue(brand_name);
                this.permitProductsFrm.get('product_id').setValue(this.product_resp.record_id);
                
                this.toastr.success(this.product_resp.message, 'Response');
              } else {
                this.toastr.error(this.product_resp.message, 'Alert');
              }
              this.spinner.hide();
            },
            error => {
              this.loading = false;
            });
      }
      
onAddManufacturerDetails() {
  this.spinner.show();
  let manufacturer_name = this.manufacturerFrm.get('name').value;
  this.appProdService.onAddManufacturingSite('tra_manufacturers_information',  this.manufacturerFrm.value)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.isnewmanufacturerModalShow = false;
          this.isproductManufacturerModalShow = false;
          let manufacturer_id =this.product_resp.record_id;
          //load Manufactureing Sites 
          this.permitProductsFrm.patchValue({manufacturer_name:manufacturer_name,manufacturer_id:manufacturer_id});
   
         this.isManufacturerSitePopupVisible = false;

          this.toastr.success(this.product_resp.message, 'Response');

        } else {
          this.toastr.error(this.product_resp.message, 'Alert');
        }
        this.spinner.hide();
      },
      error => {
        this.toastr.error('Error Occurred', 'Alert');
      });
}
funcSearchManufacturingSite() {

  this.isManufacturerSitePopupVisible = true;
  var me = this;
 

this.manufacturersData.store = new CustomStore({
  load: function (loadOptions: any) {
    console.log(loadOptions)
      var params = '?';
      params += 'skip=' + loadOptions.skip;
      params += '&take=' + loadOptions.take;//searchValue
      var headers = new HttpHeaders({
        "Accept": "application/json",
        "Authorization": "Bearer " + me.authService.getAccessToken(),
      });
    
      this.configData = {
        headers: headers,
        params: { skip: loadOptions.skip,take:loadOptions.take, searchValue:loadOptions.filter }
      };
      return me.httpClient.get(AppSettings.base_url + 'productregistration/getManufacturersInformation',this.configData)
          .toPromise()
          .then((data: any) => {
              return {
                  data: data.data,
                  totalCount: data.totalCount
              }
          })
          .catch(error => { throw 'Data Loading Error' });
  }
});
} funcAddManufacturerSite() {
  this.isnewmanufacturerModalShow = true;
  this.manufacturerFrm.reset();
}
funcSelectManufacturer(data) {
  let data_resp = data.data;
  this.permitProductsFrm.patchValue({manufacturer_name:data_resp.manufacturer_name,manufacturer_id:data_resp.manufacturer_id,country_oforigin_id:data_resp.country_id});
   
  this.isManufacturerSitePopupVisible = false;

}
// onManufacturerPreparing(e) {
//   this.functDataGridToolbar(e, this.funcAddManufacturerSite, 'Manufacturers');
// }
onCoutryCboSelect($event) {


  this.onLoadRegions($event.selectedItem.id);

}onLoadRegions(country_id) {

  var data = {
    table_name: 'par_regions',
    country_id: country_id
  };
  this.config.onLoadConfigurationData(data)
    //.pipe(first())
    .subscribe(
      data => {
        console.log(data);
        this.regions = data;
      },
      error => {
        return false
      });
}
onRegionsCboSelect($event) {

  this.onLoadDistricts($event.selectedItem.id);

}
onLoadDistricts(region_id) {
  var data = {
    table_name: 'par_districts',
    region_id: region_id
  };
  this.config.onLoadConfigurationData(data)
    //.pipe(first())
    .subscribe(
      data => {
        this.districts = data
      },
      error => {
        return false;
      });
}
onPermitsProductsTabCLick(e: any){
  //this.funcSelectApprovedProductDetails(ta)

  console.log(e.itemIndex);

}
onVisaProductCellPrepared(e) {
  if(e.rowType === "data" && e.column.dataField === "status_name") {
    let visabalance_quantity =e.data.visabalance_quantity;

      if(visabalance_quantity >0){
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#64B0F2';    
      }
      else{
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#FF5D48';  
      
      }
    }
    if(e.rowType === "data" && e.column.dataField === "permitprod_recommendation") {
      let permitprod_recommendation_id =e.data.permitprod_recommendation_id;
  
        if(permitprod_recommendation_id == 2){
          e.cellElement.style.color = 'white';
          e.cellElement.style.backgroundColor = '#64B0F2';    
        }
        else{
          e.cellElement.style.color = 'white';
          e.cellElement.style.backgroundColor = '#FF5D48';  
        
        }
      }

}


public prepareUploadSave(): any {
  let input = new FormData();
  const files: Array<File> = this.filesToUpload;
 // input.append('file', this.uploadpaymentdetailsfrm.get('file').value);
  for(let i =0; i < files.length; i++){
      input.append("file", files[i], files[i]['name']);
  }

  input.append('description', this.invoiceProductsUploadFrm.get('description').value);
  input.append('currency_id', this.invoiceProductsUploadFrm.get('currency_id').value);
 
  return input;
}

onunInvoiceProductsUpload() {
  if(this.invoiceProductsUploadFrm.get('currency_id').value == ''){
    this.toastr.error('Select Invoice Products Currency', 'Error');
    return;
  }
  const uploadData = this.prepareUploadSave();
  this.spinner.show();
  this.dmsService.uploadApplicationDMSDocument(uploadData,  this.module_id, this.sub_module_id, '',this.application_code, '','onunInvoiceProductsUpload')
    //.pipe(first())
    .subscribe(
      response => {
        this.spinner.hide();
        let response_data = response.json();

        if (response_data.success) {

           this.onLoadpermitUploadedProductsData(this.application_code);
           this.isInvoiceProductsUploadVisable = false;

          this.toastr.success(response_data.message, 'Response');

        }
        else {
          this.toastr.error(response_data.message, 'Response');

        }

      },
      error => {
        this.spinner.hide();
        this.toastr.success('Error occurred', 'Response');

      });
} 

}
