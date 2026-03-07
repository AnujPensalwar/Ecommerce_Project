import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../State/user/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone:true,
  imports: [RouterModule,CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {

   constructor(private userService: UserService) {}

   handleLogout() {
  this.userService.logout();
}
   

}
