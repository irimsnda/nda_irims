import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DisposalSharedclassComponent } from '../../disposal-sharedclass/disposal-sharedclass.component';

@Component({
  selector: 'app-disposal-generaldetails',
  templateUrl: './disposal-generaldetails.component.html',
  styleUrls: ['./disposal-generaldetails.component.css']
})
export class DisposalGeneraldetailsComponent  extends DisposalSharedclassComponent  {
  @Input() dispapplicationGeneraldetailsfrm: FormGroup;

  @Input() isRegisteredProductsWinshow: boolean;
  @Input() registeredProductsData: any;
  @Input() section_id: number;
  @Input() module_id: number;
  @Input() status_id: number;
  @Input() isOtherDisposalClass:boolean;
  @Input() isOtherDisposalReason:boolean;
  @Input() sub_module_id: number;
  @Input() application_code: number;
  isReadOnly:boolean;
  ispremisesSearchWinVisible:boolean;
  registered_premisesData:any;
  is_readonly:boolean;
  isReadOnlyPremise:boolean=false;
  minDate:Date=new Date();

  ngOnInit() {
  }

  onRegisteredPremisesSearch() {

    this.premappService.onLoadRegisteredPremises({})
      .subscribe(
        data_response => {
          this.ispremisesSearchWinVisible = true;
          this.registered_premisesData = data_response.data;
        },
        error => {
          return false
        });

  }  
  onOtherPremisesnChange($event) {
    
    if($event.value == 1){
        this.isReadOnlyPremise = false;

    }else{
      this.isReadOnlyPremise = true;
    }
    

  }
  onOtherDisposalProdClassChange($event) {
    
    if($event.selectedItem.id == 4){
        this.isOtherDisposalClass = true;

    }else{
      this.isOtherDisposalClass = false;
    }
    

  }
   onOtherDisposalReasonsChange($event) {
    
    if($event.selectedItem.id == 2){
        this.isOtherDisposalReason = true;

    }else{
      this.isOtherDisposalReason = false;
    }
    

  }

  funcSelectPremiseDetails(data) {
      this.dispapplicationGeneraldetailsfrm.get('premise_id').setValue(data.data.premise_id);
      this.dispapplicationGeneraldetailsfrm.get('premises_name').setValue(data.data.premises_name);
      this.ispremisesSearchWinVisible = false;
  
  }
}
