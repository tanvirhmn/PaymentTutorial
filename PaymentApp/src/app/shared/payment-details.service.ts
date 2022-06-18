import { Injectable } from '@angular/core';
import { PaymentDetails } from './payment-details.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailsService {

  constructor(private httpClient:HttpClient) { }

  fromData:PaymentDetails= new PaymentDetails();
  list:PaymentDetails[];

  readonly baseURL= "http://localhost:32821/";
  readonly postURL = this.baseURL + "api/PaymentDetails";
  readonly putURL = this.baseURL + "api/PaymentDetails";
  readonly deleteURL = this.baseURL + "api/PaymentDetails";
  readonly getListURL = this.baseURL + "api/PaymentDetails";

  postPaymentDetails(){
    return this.httpClient.post(this.postURL,this.fromData)
  }
  
  putPaymentDetails(){
    return this.httpClient.put(`${this.putURL}/${this.fromData.paymentDetailId}`,this.fromData)
  }

  deletePaymentDetails(id:number){
    return this.httpClient.delete(`${this.deleteURL}/${id}`)
  }

  refreshPaymentDetailsList(){
    this.httpClient.get(this.getListURL)
    .toPromise()
    .then(res=>this.list = res as PaymentDetails[]);
  }
}
