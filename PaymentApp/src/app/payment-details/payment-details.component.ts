import { Component, OnInit, ViewChild  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetails } from '../shared/payment-details.model';
import { PaymentDetailsService } from '../shared/payment-details.service';
import { PaymentDetailsFormComponent } from "./payment-details-form/payment-details-form.component";

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styles: [
  ]
})
export class PaymentDetailsComponent implements OnInit {

  @ViewChild(PaymentDetailsFormComponent)
  private paymentDetailsFormComponent = {} as PaymentDetailsFormComponent;

  constructor(public service:PaymentDetailsService, public toaster:ToastrService) { }

  ngOnInit(): void {
    this.service.refreshPaymentDetailsList();
  }

  resetDetailEntry(){
    this.paymentDetailsFormComponent.resetFormData();
  }

  pupulatePaymentDetails(selectedPayment:PaymentDetails){
    this.service.fromData = Object.assign({},selectedPayment);
  }

  onDelete(id:number){
    if(confirm('Are you sure, you want this deleted?')){
      this.service.deletePaymentDetails(id).subscribe(
        res=>{
          this.service.refreshPaymentDetailsList();
          this.toaster.warning("Deleted Sucessfully", "Payment Details Registered");
        },
        err=>{
          console.log(err);
          this.toaster.error(err);
        }
      );
    }
  }
}
