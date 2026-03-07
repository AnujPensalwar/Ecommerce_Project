import { Component } from '@angular/core';
import { AddressCart } from '../../../shared/address-cart/address-cart';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';
import { inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatLabel } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OrderService } from '../../../../State/Order/order.service';
import { UserService } from '../../../../State/user/user.service';
import {select, Store} from '@ngrx/store'
import { AppState } from '../../../../Models/AppState';
import { ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-address-form',
  standalone:true,
  imports: [AddressCart,MatDividerModule,CommonModule,ReactiveFormsModule,FormsModule,MatLabel,MatFormFieldModule,MatInputModule],
  templateUrl: './address-form.html',
  styleUrl: './address-form.css',
})
export class AddressForm {

  address: any[]=[];
  
  selectedAddress: any = null;

  private formBuilder = inject(FormBuilder);


  
myForm:FormGroup=this.formBuilder.group({
    firstName:["",Validators.required],
    lastName:["",Validators.required],
    streetAddress:["",Validators.required],
    city:["",Validators.required],
    state:["",Validators.required],
    zipCode:["",Validators.required],
    mobile:["",Validators.required],

  })
   constructor (private orderService:OrderService,
    private userService:UserService,
    private store:Store<AppState>,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
    
   ){}
  

  handelCreateOrder(item:any){

  }

  handleSubmit=()=>{
    
    const formValue=this.myForm.value
    this.orderService.createOrder(formValue)
    console.log("form data:",formValue)
  }


ngOnInit() {

  if(localStorage.getItem("jwt")) {
    this.userService.getUserProfile();  
  }

  this.store.pipe(select(state => state.user.userProfile))
  .subscribe((userProfile) => {

    if(userProfile?.address) {
      this.address = [...userProfile.address]; 
       this.cdr.detectChanges(); 
      console.log("Saved Addresses 👉", this.address);
    }

  });


}



deliverHere(address: any) {

  console.log("Selected Address 👉", address);
  const payload = {
    firstName: address.firstName,
    lastName: address.lastName,
    streetAddress: address.streetAddress,
    city: address.city,
    state: address.state,
    zipCode: address.zipCode,
    mobile: address.mobile
  };

  this.orderService.createOrder(address);
}

// this is for remove the address from user screen if user want 
// removeAddress(addressId: Number){
//     console.log("REMOVE CLICKED", addressId);
//    const headers = new HttpHeaders({
//     Authorization: `Bearer ${localStorage.getItem('jwt')}`
//   });

//   this.http.delete(`http://localhost:8080/api/address/${addressId}`, {headers})
//     .subscribe(() => {
//       location.reload(); 
//     });
// }


}
