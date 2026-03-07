import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Signin } from './signin/signin';
import { Signup } from './signup/signup';

@NgModule({
  declarations: [],
  
  imports: [Signin,Signup,
    CommonModule
  ]
})
export class AuthModule { }
