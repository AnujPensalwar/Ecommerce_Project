import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../admin.service';
import { MatIcon } from '@angular/material/icon';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-admin-customers',
  standalone: true,
  imports: [CommonModule,MatIcon],
  templateUrl: './customers.html',
  styleUrl: './customers.css'
})
export class AdminCustomers implements OnInit {

  users: any[] = [];

  constructor(private adminService: AdminService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadUsers();
    
  }

  loadUsers() {
    this.adminService.getAllUsers()
      .subscribe((data: any) => {
        console.log("CUSTOMERS 👉", data);
        this.users = data;
        this.cdr.detectChanges();
      });
  }

}
