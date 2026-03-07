import { Component } from '@angular/core';
import { Signin } from './signin/signin';
import { Signup } from './signup/signup';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone:true,
  imports: [Signin,Signup,CommonModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {


  isLoggedIn=true;


  changeTemplete=()=>{
    this.isLoggedIn=!this.isLoggedIn;
    
  }
}
