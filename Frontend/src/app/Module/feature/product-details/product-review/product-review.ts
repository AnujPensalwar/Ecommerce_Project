import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StarRating } from '../../../shared/star-rating/star-rating';





@Component({
  selector: 'app-product-review',
  standalone:true,
  imports: [FormsModule,CommonModule,StarRating],
  templateUrl: './product-review.html',
  styleUrl: './product-review.css',
})
export class ProductReview {

  reviews=[1,1,1,1,1,]
}
