import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { navigation } from '../../../../data/images/navcontent';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-content',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './nav-content.html',
  styleUrl: './nav-content.css',
})
export class NavContent {
category:any
@Input() selectedSection:any

ngOnInit(){
  this.category=navigation
}

constructor(private router:Router){}

handleNavigate=(path:any)=>{
  this.router.navigate([path])
}
}
