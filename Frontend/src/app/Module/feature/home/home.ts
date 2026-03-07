import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { MainCarousel } from './main-carousel/main-carousel';
import { ProductSliderCart } from './product-slider-cart/product-slider-cart';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BASE_API_URL } from '../../../config/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MainCarousel,
    ProductSliderCart
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {

  menJeans:any[] = [];
  womenGouns:any[] = [];
  lenghaCholi:any[] = [];
  mensKurta:any[] = [];
  mensShoes:any[] = [];
  menWatch:any[] = [];
  Shoes:any[] = [];

   @Input() product:any;

  constructor(private http: HttpClient,
    private cd:ChangeDetectorRef,
    private router:Router
  ){}
  

  ngOnInit(){

    this.http.get(`${BASE_API_URL}/api/products/all`)
    .subscribe((products: any)=>{

    
      this.menJeans = products
      .filter((p: any) => p.category?.name === "jeans")
      .slice(0,5);

    this.menWatch = products
      .filter((p: any) => p.category?.name === "watch")
      .slice(0,5);

    this.lenghaCholi = products
      .filter((p: any) => p.category?.name === "lehenga")
      .slice(0,5);

    this.mensKurta = products
      .filter((p: any) => p.category?.name === "kurta")
      .slice(0,5);

    this.Shoes = products
      .filter((p: any) => p.category?.name === "shoes")
      .slice(0,5);

      this.cd.detectChanges();

    });

  }



}