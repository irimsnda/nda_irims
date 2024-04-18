import { Component, OnInit, ViewChild, ViewContainerRef, ElementRef, Inject, Input } from '@angular/core';
import { SharedProductregistrationclassComponent } from '../../../shared-productregistrationclass/shared-productregistrationclass.component';
import { ModalDialogService } from 'ngx-modal-dialog';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { ProductApplicationService } from 'src/app/services/product-applications/product-application.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ArchwizardModule } from 'ng2-archwizard';
import { WizardComponent } from 'ng2-archwizard';
import { AuthService } from 'src/app/services/auth.service';
import { Utilities } from 'src/app/services/common/utilities.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from "devextreme/data/array_store";
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { AppSettings } from 'src/app/app-settings';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-packaging-selection',
  templateUrl: './packaging-selection.component.html',
  styleUrls: ['./packaging-selection.component.css']
})
export class PackagingSelectionComponent extends SharedProductregistrationclassComponent {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
@ViewChild(ArchwizardModule)

  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  initWizardPanel:number = 0;

  @Input() application_code: number;
  @Input() status_id: number;
  @Input() sub_module_id: number;
  @Input() section_id: number;
  @Input() module_id: number;
  @Input() product_id: number;
  @Input()isReadOnly:boolean;
  drugsPackagingData:any;
  containerTypeData:any;
  primaryPackagingdetailsfrm: FormGroup;
  secondaryPackagingdetailsfrm:FormGroup;
  productTertiarydetailsfrm:FormGroup;

  productPackagingModal:boolean= false;
  is_container_type_vial:boolean = false;
 containerMaterialData:any;
  containerData:any;
  siUnitsData:any;
  packagingUnitsData:any;
  product_resp:any;

  ngOnInit() {

    this.primaryPackagingdetailsfrm = new FormGroup({
      container_type_id: new FormControl(1, Validators.compose([])),
      container_id: new FormControl('', Validators.compose([Validators.required])),
      container_material_id: new FormControl('', Validators.compose([Validators.required])),
      no_of_units: new FormControl('', Validators.compose([Validators.required])),
      no_of_packs: new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([])),
      si_unit_id: new FormControl('', Validators.compose([Validators.required])),
      product_strength:new FormControl('', Validators.compose([])),
      description_of_packaging: new FormControl('', Validators.compose([Validators.required]))

    });
  this.secondaryPackagingdetailsfrm = new FormGroup({
      containers_type_id: new FormControl(2, Validators.compose([])),
      containers_id: new FormControl('', Validators.compose([Validators.required])),
      containers_material_id: new FormControl('', Validators.compose([Validators.required])),
      no_of_packs: new FormControl('', Validators.compose([Validators.required])),
      secondary_description_of_packaging: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([]))
    });
     this.productTertiarydetailsfrm = new FormGroup({
      container_type_ids: new FormControl(3, Validators.compose([])),
      container_ids: new FormControl('', Validators.compose([])),
      container_material_ids: new FormControl('', Validators.compose([])),
      no_of_packs_tertiary: new FormControl('', Validators.compose([])),
      id: new FormControl('', Validators.compose([]))
    });
    this.onLoadSiUnits(this.section_id);
    this.onLoadpackagingUnitsData(this.section_id);
    this.onLoadcontainerMaterialData(this.section_id)
    this.onLoadcontainerData(this.section_id);
    this.onLoadcontainerTypeDataData(this.section_id)
    this.OnLoadProductsPackagingMaterials(this.product_id);
  }
  refreshDataGrid() {
    this.dataGrid.instance.refresh();
  }
  onProdPackagingPreparing(e) {
    //this.tbisReadOnly = this.isReadOnly;
    this.functDataGridToolbar(e, this.funcAddProductPackagingDetails, 'Product Packaging');
  }  
  funcAddProductPackagingDetails() {
    this.productPackagingModal= true;
    this.primaryPackagingdetailsfrm.reset();
    this.secondaryPackagingdetailsfrm.reset();
    this.productTertiarydetailsfrm.reset();
    this.wizard.model.navigationMode.goToStep(0);


  } onLoadcontainerMaterialData(section_id) {
    var data = {
      table_name: 'par_containers_materials'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.containerMaterialData = data;
        });
  }  onLoadcontainerTypeDataData(section_id) {
    var data = {
      table_name: 'par_containers_types'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.containerTypeData = data;
        });
  }onLoadpackagingUnitsData(section_id) {
    var data = {
      table_name: 'par_packaging_units',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.packagingUnitsData = data;
        });
  }
  OnLoadProductsPackagingMaterials(product_id) {

  this.appService.getProductsOtherDetails({ product_id: product_id }, 'getProductsDrugsPackaging')
    //.pipe(first())
    .subscribe(
      data => {
        this.drugsPackagingData = data.data;
      },
      error => {
        return false
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
        //disabled: this.tbisReadOnly,
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
      
  }
funcEditPackagingDetails(data) {
  this.primaryPackagingdetailsfrm.patchValue(data.data);
  this.productPackagingModal = true;
}funcDeletePackDetails(data) {
  //func_delete records 
  let record_id = data.data.id;
  let appproduct_id = data.data.product_id;
  let table_name = 'wb_product_packaging';
  this.funcDeleteDetailhelper(record_id, appproduct_id, table_name, 'product_packaging', 'Product Packaging');

}
funcDeleteDetailhelper(record_id, appproduct_id, table_name, reload_type, title) {
  this.modalDialogue.openDialog(this.viewRef, {
    title: 'Are You sure You want to delete ' + title + '?',
    childComponent: '',
    settings: {
      closeButtonClass: 'fa fa-close'
    },
    actionButtons: [
      {
        text: 'Yes',
        buttonClass: 'btn btn-danger',
        onAction: () => new Promise((resolve: any, reject: any) => {
        this.spinner.show();
          this.appService.onDeleteProductsDetails(record_id, table_name, appproduct_id, title)
            //.pipe(first())
            .subscribe(
              data_response => {
                let resp = data_response.json();

                if (resp.success) {
                  
                    this.OnLoadProductsPackagingMaterials(appproduct_id);
                  
                  this.spinner.hide();
                  this.toastr.success(resp.message, 'Response');
                }
                else {
                  this.toastr.error(resp.message, 'Alert');
                }
              },
              error => {
                return false
              });
          resolve();
        })
      },
      {
        text: 'no',
        buttonClass: 'btn btn-default',
        onAction: () => new Promise((resolve: any) => {

          resolve();

        })
      }
    ]
  });
}
 onLoadSiUnits(section_id) {
    var data = {
      table_name: 'par_si_units'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.siUnitsData = data;
        });
  }

onLoadcontainerData(section_id) {
    var data = {
      table_name: 'par_containers'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.containerData = data;
        });
    }
onSaveProductPackaging() {
  this.spinner.show();
  this.primaryPackagingdetailsfrm.get('container_type_id').setValue(1); 
  this.appService.onSaveProductOtherDetails('wb_product_packaging', this.primaryPackagingdetailsfrm.value, this.product_id)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.toastr.success(this.product_resp.message, 'Response');
          this.wizard.model.navigationMode.goToStep(1);
        } else {
          this.toastr.error(this.product_resp.message, 'Alert');
        }
        this.spinner.hide();
      },
      error => {
        this.toastr.error('Error Occurred', 'Alert');
 
      });
}

  onContainerTypeDetails($event) {
  if($event.value == 1){
      this.is_container_type_vial = true;
      this.primaryPackagingdetailsfrm.get('product_strength').setValidators(Validators.required);
      this.primaryPackagingdetailsfrm.get('product_strength').updateValueAndValidity();
  }
  else{
    this.is_container_type_vial = false;
      this.primaryPackagingdetailsfrm.get('product_strength').clearValidators();
      this.primaryPackagingdetailsfrm.get('product_strength').updateValueAndValidity();
  }
}
onSaveSecondaryPackaging() {
  this.spinner.show();
  this.secondaryPackagingdetailsfrm.get('containers_type_id').setValue(2); 
  this.appService.onSaveProductOtherDetails('wb_secondary_packaging', this.secondaryPackagingdetailsfrm.value, this.product_id)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.toastr.success(this.product_resp.message, 'Response');
          this.OnLoadProductsPackagingMaterials(this.product_id);
          this.productPackagingModal=false;
        } else {
          this.toastr.error(this.product_resp.message, 'Alert');
        }
        this.spinner.hide();
      },
      error => {
        this.toastr.error('Error Occurred', 'Alert');
 
      });
}
onSaveTertiaryPackaging() {
  this.spinner.show();
  this.productTertiarydetailsfrm.get('container_type_ids').setValue(3); // Set the value to 2
  this.appService.onSaveProductOtherDetails('wb_tertiary_packaging', this.productTertiarydetailsfrm.value, this.product_id)
    .subscribe(
      response => {
        this.product_resp = response.json();
        //the details 
        if (this.product_resp.success) {
          this.toastr.success(this.product_resp.message, 'Response');
          this.OnLoadProductsPackagingMaterials(this.product_id);
          this.productPackagingModal=false;
        } else {
          this.toastr.error(this.product_resp.message, 'Alert');
        }
        this.spinner.hide();
      },
      error => {
        this.toastr.error('Error Occurred', 'Alert');
 
      });
}

}
