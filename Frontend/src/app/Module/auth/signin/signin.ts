import { Component, Input, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {Store} from '@ngrx/store'
import { AuthService } from '../../../State/Auth/auth.service';
import { ChangeDetectorRef } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-signin',
  standalone:true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatIcon],
  templateUrl: './signin.html',
  styleUrl: './signin.css',
})
export class Signin {

  loginError: string = '';

  @Input() changeTemplete:any;

  constructor(private authService:AuthService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private dialog: MatDialog
  ){}

    private formBuilder = inject(FormBuilder);
    private store = inject(Store);
    
    

  loginForm: FormGroup=this.formBuilder.group({
    email:['',[Validators.required,Validators.email]],
    password:["",[Validators.required,Validators.minLength(8)]]
  })


  ngOnInit() {
  this.store.select((state: any) => state.auth.error)
    .subscribe((error) => {
      if (error) {
        this.loginError = "Invalid email or password";
        
      }
    });
}


submitForm(): void {
  if (this.loginForm.valid) {

    this.loginError = '';
    localStorage.removeItem('jwt');

    this.authService.login(this.loginForm.value);

 setTimeout(() => {

  const token = localStorage.getItem('jwt');

  if (!token) {
    return; 
  }

  const payload = JSON.parse(atob(token.split('.')[1]));

  if (payload.authorities === 'ROLE_ADMIN') {
     window.location.href = '/admin/dashboard';
    
  } else {
   window.location.href = '/';
   
  }

  this.dialog.closeAll();
 

}, 300);
  }
  

}
}

