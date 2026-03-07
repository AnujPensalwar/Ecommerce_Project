import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Home } from './Module/feature/home/home';
import { Navbar } from './Module/shared/navbar/navbar';
import {MatMenuModule} from '@angular/material/menu';
import { Footer } from './Module/shared/footer/footer';
import { Products } from './Module/feature/products/products';
import { ChangeDetectorRef } from '@angular/core';
import { Store} from '@ngrx/store';
import  { select } from '@ngrx/store'
import { MatDialog } from '@angular/material/dialog';
import { AppState } from './Models/AppState';
import { UserService } from './State/user/user.service';
import { CartService } from './State/cart/cart.service';





@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet, Home,Navbar,MatMenuModule,Footer,Products],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ecommerce');
  userProfile:any;

  constructor(private dialog : MatDialog,
  private userService:UserService,private store:Store<AppState>,
  private cartService:CartService,
  private cd: ChangeDetectorRef,
  private router:Router
){

}

 ngOnInit() {
  const jwt = localStorage.getItem("jwt");

  if (jwt) {

    try {
      const payload = JSON.parse(atob(jwt.split('.')[1]));

     
      if (payload.authorities === 'ROLE_ADMIN' &&
          window.location.pathname === '/') {
        this.router.navigate(['/admin/dashboard']);
      }

    } catch (e) {
      console.error("JWT decode error");
    }

    // your existing logic (unchanged)
    this.userService.getUserProfile();
    this.cartService.getCart();
  }

  this.store.pipe(select((store) => store.auth))
    .subscribe((auth) => {
      if (auth.user && !this.userProfile) {
        this.userProfile = auth.user;
      }
    });
}

ngAfterViewInit() {
  setTimeout(() => {
    this.cd.detectChanges();
  });
}
}
