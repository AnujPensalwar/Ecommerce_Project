import { Component, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { ChangeDetectorRef } from '@angular/core';

import { NavContent } from './nav-content/nav-content';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Auth } from '../../auth/auth';
import { UserService } from '../../../State/user/user.service';
import { Store} from '@ngrx/store';
import { AppState } from '../../../Models/AppState';
import  { select } from '@ngrx/store'


@Component({
  selector: 'app-navbar',
  standalone:true,
  imports: [MatIconModule,MatButtonModule,MatMenuModule,NavContent,CommonModule ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  selectedSection:any;
currentSection:any
isNavbarContentOpen:any
userProfile:any;
isAdmin: boolean = false;
isLoggedIn: boolean = false;


constructor(private router:Router,private dialog : MatDialog,
  private userService:UserService,private store:Store<AppState>,private cd: ChangeDetectorRef
){

}

openNavbarContent(section:any){
  console.log("CLICKED:", section); 
this.isNavbarContentOpen=true;
 this.selectedSection = section; ;
}
closeNavbarContent(){
  this.isNavbarContentOpen=false;
}

navigateTo(path:any){
  this.router.navigate([path])

}




ngOnInit(){

  if(localStorage.getItem("jwt")) this.userService.getUserProfile()

    this.store.pipe(select((store)=>store.user)).subscribe((user)=>{
      this.userProfile=user.userProfile;
      if(user.userProfile){
        this.isLoggedIn = true;

          const token = localStorage.getItem("jwt");
      if(token){
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.isAdmin = payload.authorities === "ROLE_ADMIN";
      }
      this.dialog.closeAll();
        
      }else {
    this.isLoggedIn = false;
    this.isAdmin = false;
  }
      this.cd.detectChanges();
    })
}





 @HostListener('document:click',['$event'])
onDocumentClick(event:MouseEvent){
    const modalContainer =document.querySelector(".modal-container");
    const openButtons=document.querySelectorAll(".open-button");

    let clickInsideButton=false;

    openButtons.forEach((button:Element)=>{
      if(button.contains(event.target as Node)){
      clickInsideButton=true
      }
    })

    if(modalContainer && !clickInsideButton && this.isNavbarContentOpen){
      this.closeNavbarContent();
    }


}

handleOpenLoginModal=()=>{
  this.dialog.open(Auth,{
    width:"400px",
    disableClose:false
  })
}

handleLogout=()=>{
  this.isLoggedIn = false;
  this.isAdmin = false;
  this.userService.logout()
}


}


