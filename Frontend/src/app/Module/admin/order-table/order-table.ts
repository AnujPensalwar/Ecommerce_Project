import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../admin.service';
import { ChangeDetectorRef } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-order-table',
  standalone: true,
  imports: [CommonModule,MatIcon],
  templateUrl: './order-table.html',
  styleUrl: './order-table.css'
})
export class OrderTable {

  orders: any[] = [];

  constructor(private adminService: AdminService,private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadOrders();
    
  }

  loadOrders() {
    this.adminService.getAllOrders()
      .subscribe((data: any) => {
        this.orders = data;
        this.cdr.detectChanges();
      });
  }

updateStatus(id: number, action: string) {

  this.adminService.updateOrderStatus(id, action)
    .subscribe((res: any) => {

      console.log("UPDATED STATUS 👉", res.orderStatus);

      
      this.adminService.getAllOrders()
        .subscribe((data: any) => {
          this.orders = data.reverse();
          
        });

    });

}




  deleteOrder(id: number) {
    if(confirm("Are you sure you want to delete this order?")) {
      this.adminService.deleteOrder(id)
        .subscribe(() => {
          this.loadOrders();
        });
    }
  }

}
