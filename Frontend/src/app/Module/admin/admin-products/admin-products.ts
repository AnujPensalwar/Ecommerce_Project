import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-admin-products',
  standalone:true,
  imports: [CommonModule,MatIcon],
  templateUrl: './admin-products.html',
  styleUrl: './admin-products.css',
})
export class AdminProducts {


  products: any[] = [];

  constructor(private adminService:AdminService,
    private router: Router,
  private cd:ChangeDetectorRef){}

ngOnInit() {
  this.loadProducts();

  
}

loadProducts() {
  this.adminService.getAllProducts()
    .subscribe((data: any) => {
       console.log("🔥 PRODUCTS FROM BACKEND:", data);
      this.products = data;
      this.cd.detectChanges();
    });
}



deleteProduct(id: number) {
  if(confirm("Delete this product?")) {
    this.adminService.deleteProduct(id)
      .subscribe(() => {
        this.loadProducts();
      });
  }
}

editProduct(id: number) {
  this.router.navigate(['/admin/edit-product', id]);
}

}
