import { Injectable } from "@angular/core";
import { BASE_API_URL } from "../../config/api";
import { HttpClient } from "@angular/common/http";
import {Store} from '@ngrx/store'
import { catchError, map, of, throwError } from "rxjs";
import { loginFailure,register, loginSuccess, registerFailure, registerSuccess } from "./auth.action";

@Injectable({
    providedIn: 'root'
})

export class AuthService{
    private apiUrl=BASE_API_URL+"/auth";

    constructor(private http: HttpClient,private store: Store){}

    login(logindata:any){
        return this.http.post(`${this.apiUrl}/signin`,logindata).pipe(
            map((user:any)=>{
                 console.log('login user',user)
                 if(user.jwt){
                    localStorage.setItem("jwt",user.jwt);


                 }
                 return loginSuccess({user})
            
     } ),
        catchError((error)=>{
              return throwError(() => error); 
        
     } )

    ).subscribe((action)=>this.store.dispatch(action))
    }


register(user:any){

  this.store.dispatch(register({ user }));

  this.http.post(`${this.apiUrl}/signup`, user).pipe(

    map((response:any)=>{

      return registerSuccess({ user: response });

    }),

    catchError((error)=>{
      return of(registerFailure({ error: error.message }));
    })

  ).subscribe((action)=> this.store.dispatch(action));
}
}