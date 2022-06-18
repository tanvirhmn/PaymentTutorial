import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetails } from 'src/app/shared/payment-details.model';
import { PaymentDetailsService } from 'src/app/shared/payment-details.service';

@Component({
  selector: 'app-payment-details-form',
  templateUrl: './payment-details-form.component.html',
  styles: [
  ]
})
export class PaymentDetailsFormComponent implements OnInit {

  constructor(public service:PaymentDetailsService, public toaster:ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    if(this.service.fromData.paymentDetailId==0){
      this.insertPayment(form);
    }
    else{
      this.updatePayment(form);
    }
  }

  insertPayment(form:NgForm){
    this.service.postPaymentDetails().subscribe(
      res=>{
        this.resetForm(form);
        this.service.refreshPaymentDetailsList();
        this.toaster.success("Saved Sucessfully", "Payment Details Registered");
      },
      err=>{
        console.log(err);
        this.toaster.error(err);
      }
    );
  }

  updatePayment(form:NgForm){
    this.service.putPaymentDetails().subscribe(
      res=>{
        this.resetForm(form);
        this.service.refreshPaymentDetailsList();
        this.toaster.info("Updated Sucessfully", "Payment Details Registered");
      },
      err=>{
        console.log(err);
        this.toaster.error(err);
      }
    );
  }

  resetForm(form:NgForm){
    form.form.reset();
    this.service.fromData = new PaymentDetails();
  }

  resetFormData(){
    this.service.fromData = new PaymentDetails();
  }
}
