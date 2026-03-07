import { Injectable } from "@angular/core";
import { BASE_API_URL } from "../../config/api";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Store} from '@ngrx/store'
import { catchError, map, of } from "rxjs";
import { getUserProfileFailure, getUserProfileSuccess, logOutSuccess } from "./user.action";
import { loginSuccess } from "../Auth/auth.action";
import { getCartRequest } from "../cart/cart.action";
import { Router } from "@angular/router";


@Injectable({
    providedIn: 'root'
})

export class UserService{
    private apiUrl=BASE_API_URL+"/api";
    headers:any;

    constructor(private http: HttpClient,private store: Store,private router: Router){
         
    }

   

    getUserProfile(){

        const headers=new HttpHeaders().set("Authorization",`Bearer ${localStorage.getItem("jwt")}`)
        return this.http.get(`${this.apiUrl}/users/profile`,{headers}).pipe(
            map((user:any)=>{
                 console.log('user Profile Success',user)
               
                 return getUserProfileSuccess({userProfile:user})
            
     } ),
        catchError((error)=>{
              return of(
            getUserProfileFailure(
                    error.response && error.response.data.message ? error.response.data.message : error.message
                )
              )
        
     } )

    ).subscribe((action)=>this.store.dispatch(action))
    }


    logout(){
        localStorage.removeItem("jwt");
        this.store.dispatch(logOutSuccess());
        this.router.navigate(["/"]);
    }


    getUserAddresses() {

  const headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem("jwt")}`
  });

  return this.http
    .get(`${this.apiUrl}/users/addresses`, { headers })
    .pipe(
      map((data: any) => {
        console.log("USER ADDRESSES", data);
        return data;
      })
    );
}





    
}