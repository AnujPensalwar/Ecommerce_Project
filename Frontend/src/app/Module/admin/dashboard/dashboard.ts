import { Component, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../admin.service';
import { MatIcon } from '@angular/material/icon';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,MatIcon],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  totalOrders: number = 0;
totalRevenue: number = 0;
totalUsers: number = 0;
totalProducts: number = 0;

  orders: any[] = [];
  recentCustomers: any[] = [];

  constructor(private adminService: AdminService,
    private cd:ChangeDetectorRef
  ) {}
ngOnInit() {

  
  this.adminService.getAllOrders()
    .subscribe((data: any) => {

      console.log("ADMIN ORDERS 👉", data);

      const latestOrders = data.slice(-5).reverse();
      this.orders = latestOrders;

      this.cd.detectChanges();

    });

 
  this.adminService.getAllUsers()
    .subscribe((data: any) => {

      console.log("ADMIN USERS 👉", data);

      
      this.recentCustomers = data.slice(-5).reverse();

    });

}

}

