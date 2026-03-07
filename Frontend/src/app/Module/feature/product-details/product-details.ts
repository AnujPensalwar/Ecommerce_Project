import { ChangeDetectorRef, Component } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { ProductReview } from './product-review/product-review';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProductCart } from '../../shared/product-cart/product-cart';
import { StarRating } from '../../shared/star-rating/star-rating';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../State/Product/product.service';
import { select, Store } from '@ngrx/store'
import { AppState } from '../../../Models/AppState';
import { CartService } from '../../../State/cart/cart.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Auth } from '../../auth/auth';
import { MatIcon } from '@angular/material/icon';
import { ReviewService } from '../../../State/Review/review.service';
import { RatingService } from '../../../State/Rating/rating.service';
import { BASE_API_URL } from '../../../config/api';



@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [MatRadioModule,
    FormsModule,
    ProductReview,
    CommonModule,
    MatProgressBarModule,
    ProductCart,
    StarRating,
    MatIcon
  ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {

  selectedSize: any;
  relatedProducts: any;
  product: any;
  productId: any;
  showNotification: boolean = false;


  reviews: any[] = [];
  rating: number = 0;
  comment: string = '';

  constructor(private router: Router, private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private cartService: CartService,
    private cd: ChangeDetectorRef,
    private http: HttpClient,
    private dialog: MatDialog,
    private ratingService: RatingService,
    private reviewService: ReviewService
  ) { }
  ngOnInit() {



    this.activatedRoute.paramMap.subscribe(params => {

      const id = params.get("id");
      this.productId = id;


      this.productService.findProductsById(id);
      this.loadReviews();

    });

    this.store.pipe(select(store => store.product))
      .subscribe((productState: any) => {

        this.product = productState?.product;


        if (this.product?.category?.name) {

          this.loadReviews();
          const token = localStorage.getItem("jwt");

          const headers = new HttpHeaders().set(
            "Authorization", `Bearer ${token}`
          );

          const params = new HttpParams()
            .set("topLevel", this.product.category.parentCategory.parentCategory.name)
            .set("secondLevel", this.product.category.parentCategory.name)
            .set("thirdLevel", this.product.category.name)
            .set("color", "")
            .set("size", "")
            .set("minPrice", 0)
            .set("maxPrice", 100000)
            .set("minDiscount", 0)
            .set("stock", "")
            .set("sort", "")
            .set("pageNumber", 0)
            .set("pageSize", 10);

          this.http.get(`${BASE_API_URL}/api/products`, { headers, params })
            .subscribe((res: any) => {
              this.relatedProducts = res?.content?.filter(
                (p: any) => p.id !== this.product.id
              ) || [];
              this.cd.detectChanges();
            });
        }

        this.cd.detectChanges();
      });
  }


  handleAddToCart() {

    const token = localStorage.getItem("jwt");
    if (!token) {
      this.dialog.open(Auth, {
        width: "400px",
        disableClose: false
      });
      return;
    }

    if (!this.selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    const data = { size: this.selectedSize, quentity: 1, productId: this.productId }


    this.cartService.addItemToCart(data);
    this.cartService.getCart()

    this.showNotification = true;

    setTimeout(() => {
      this.showNotification = false;
      this.cd.detectChanges();
    }, 2000);

    this.cd.detectChanges();
  }





  // reviews and rating


  loadReviews() {

    if (!this.productId) return;

    this.reviewService
      .getProductReviews(this.productId)
      .subscribe(res => {
        console.log("Reviews from backend:", res);
        this.reviews = res;
      });
  }

  submitRating() {

    if (!this.rating || this.rating < 1 || this.rating > 5) {
      alert("Please select rating between 1 and 5");
      return;
    }


    const body = {
      productId: this.productId,
      rating: this.rating
    };

    this.ratingService.createRating(body)
      .subscribe(() => {
        console.log("Rating added");
      });
  }

  submitReview() {

    if (!this.productId) {
      console.log("Product ID missing");
      return;
    }

    if (!this.comment || this.comment.trim() === '') {
      alert("Please write review");
      return;
    }

    const body = {
      productId: this.productId,
      review: this.comment
    };

    this.reviewService.createReview(body)
      .subscribe(() => {
        this.comment = '';
        this.loadReviews();
      });
  }



}
