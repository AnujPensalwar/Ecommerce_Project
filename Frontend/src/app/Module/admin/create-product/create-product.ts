import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, FormsModule,MatIcon],
  templateUrl: './create-product.html',
  styleUrl: './create-product.css'
})
export class CreateProduct implements OnInit {
  product: any = {
    title: '',
    discription: '',
    price: 0,
    discountPrice: 0,
    discountPercent: 0,
    quentity: 0,
    brand: '',
    color: '',
    imageUrl: '',
    numRating: 0,
    createdAt: '',
    size: [
      { name: 'S', quentity: '0' },
      { name: 'M', quentity: '0' },
      { name: 'L', quentity: '0' }
    ]
  };

  // UI Category Levels
  topLevel: string = '';
  secondLevel: string = '';
  thirdLevel: string = '';

  isEditMode = false;
  productId: any;
  successMessage: string | null = null;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.isEditMode = true;
        this.productId = id;
        this.adminService.getProductById(id).subscribe((data: any) => {
          this.product = data;

          if (data.category) {
            this.thirdLevel = data.category.name;

            if (data.category.parentCategory) {
              this.secondLevel = data.category.parentCategory.name;

              if (data.category.parentCategory.parentCategory) {
                this.topLevel = data.category.parentCategory.parentCategory.name;
              }
            }
          }
        });
      } else {
       
        this.isEditMode = false;
        this.productId = null;
        this.product = {
          title: '',
          discription: '',
          price: 0,
          discountPrice: 0,
          discountPercent: 0,
          quentity: 0,
          brand: '',
          color: '',
          imageUrl: '',
          numRating: 0,
          size: [
            { name: 'S', quentity: '0' },
            { name: 'M', quentity: '0' },
            { name: 'L', quentity: '0' }
          ]
        };

        this.thirdLevel = '';
      }
    });
  }

  onSubmit() {

    const cleanedSizes = (this.product.size || []).map((s: any) => ({
      name: s.name,
      quentity: String(s.quentity || '0')
    }));

    if (this.isEditMode && this.productId) {

      // UPDATE PAYLOAD 
      const updatePayload: any = {
        id: this.product.id,
        title: this.product.title,
        description: this.product.discription,
        price: Number(this.product.price) || 0,
        discountedPrice: Number(this.product.discountPrice) || 0,
        discountPercent: Number(this.product.discountPercent) || 0,
        quentity: Number(this.product.quentity) || 0,
        brand: this.product.brand,
        color: this.product.color,
        imageUrl: this.product.imageUrl,
        numRating: Number(this.product.numRating) || 0,
        size: cleanedSizes,
        createdAt: this.product.createdAt,
        topLevelCategory: this.topLevel,
        secondLevelCategory: this.secondLevel,
        thirdLevelCategory: this.thirdLevel,
      };

      this.adminService.updateProduct(this.productId, updatePayload).subscribe({
        next: () => {
          alert("Product Updated Successfully!");
          this.router.navigate(['/admin/products']);
        },
        error: (err) => {
          console.error("Update Error:", err);
          alert("Update Failed!");
        }
      });

    } else {

      // CREATE PAYLOAD
      const createPayload: any = {
        title: this.product.title,
        description: this.product.discription,
        price: Number(this.product.price) || 0,
        discountedPrice: Number(this.product.discountPrice) || 0,
        discountPercent: Number(this.product.discountPercent) || 0,
        quentity: Number(this.product.quentity) || 0,
        brand: this.product.brand,
        color: this.product.color,
        imageUrl: this.product.imageUrl,
        topLevelCategory: this.topLevel,
        secondLevelCategory: this.secondLevel,
        thirdLevelCategory: this.thirdLevel,
        size: cleanedSizes
      };

      this.adminService.createProduct(createPayload).subscribe({
        next: () => {
          alert("Product Added Successfully!");
          this.router.navigate(['/admin/products']);
        },
        error: (err) => {
          console.error("Creation Error:", err);
          alert("Creation Failed! Check console.");
        }
      });
    }
  }

}