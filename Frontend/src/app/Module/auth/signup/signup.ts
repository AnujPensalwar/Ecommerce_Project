import { Component, Input, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store'
import { AuthService } from '../../../State/Auth/auth.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,
    MatFormFieldModule, MatInputModule, MatButtonModule
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {

  @Input() changeTemplete: any;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService,private cd: ChangeDetectorRef) { }
  private formBuilder = inject(FormBuilder);
  private store = inject(Store);

  loginForm: FormGroup = this.formBuilder.group({
    firstName: ["", [Validators.required]],
    lastName: ["", [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(8)]],
    mobile: ["", [Validators.required, Validators.minLength(10)]]
  })


 ngOnInit(): void {
  

  this.store.select('auth').subscribe((authState: any) => {

    console.log("AUTH STATE:", authState);

    // Success condition
    if (authState.user && authState.user.message === "Signup Success") {
      this.successMessage = authState.user.message;
      this.errorMessage = '';
      this.cd.detectChanges();
      return;
      
    }

    // Failure condition
    if (authState.error) {
      this.errorMessage = "Registration failed";
      this.successMessage = '';
      this.cd.detectChanges();
      return;
    }

  });

}

  submitForm(): void {
    if (this.loginForm.valid) {
      console.log("login req data ,", this.loginForm.value)
      this.authService.register(this.loginForm.value);
    }
  }
}
