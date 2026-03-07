import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { filters, singleFilters } from './filterData';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { ProductCart } from '../../shared/product-cart/product-cart';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../State/Product/product.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../Models/AppState';
import { combineLatest } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatMenuModule, CommonModule, MatButtonModule, MatDividerModule, MatIconModule, MatCheckboxModule, MatRadioModule, ProductCart],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {

  filterData: any
  singleFilterData: any
  products: any[] = [];
  menPants: any
  levelThree: any


  constructor(private activatedRoute: ActivatedRoute,
    private router: Router, private productService: ProductService,
    private store: Store<AppState>, private cd: ChangeDetectorRef) { }

  ngOnInit() {

    this.filterData = filters;
    this.singleFilterData = singleFilters;
    this.cd.detectChanges();


    combineLatest([
      this.activatedRoute.paramMap,
      this.activatedRoute.queryParams
    ]).subscribe(([params, queryParams]) => {


      const topLevel = params.get('topLevel');
      const secondLevel = params.get('secondLevel');
      const thirdLevel = params.get('thirdLevel');

      const color = queryParams["color"];
      const size = queryParams["size"];
      const price = queryParams["price"];
      const discount = queryParams["discount"];
      const stock = queryParams["stock"];
      const sort = queryParams["sort"];
      const pageNumber = queryParams["pageNumber"];

      const minPrice = price ? price.split("-")[0] : 0;
      const maxPrice = price ? price.split("-")[1] : 10000;

      const reqData = {
        topLevel: topLevel ?? null,
        secondLevel: secondLevel ?? null,
        thirdLevel: thirdLevel ?? null,
        colors: color ? (Array.isArray(color) ? color : [color]) : [],
        sizes: size ? (Array.isArray(size) ? size : [size]) : [],
        minPrice: minPrice,
        maxPrice: maxPrice,
        minDiscount: discount ? discount : 0,
        pageNumber: pageNumber ? Number(pageNumber) : 0,
        pageSize: 10,
        sort: sort ? sort : "price_low",
        stock: stock || ""
      };


      this.productService.findProductsByCategory(reqData);
    });




    this.store.pipe(select(store => store.product))
      .subscribe((product) => {

        this.products = product?.products?.content || [];
        this.cd.detectChanges();
        
      });
  }

  handleMultipleSelectFilter(value: string, sectionId: string) {
    const queryParams = { ...this.activatedRoute.snapshot.queryParams };

    const filterValues = queryParams[sectionId] ? queryParams[sectionId].split(",") : [];

    const valueIndex = filterValues.indexOf(value);

    if (valueIndex != -1) {
      filterValues.splice(valueIndex, 1)
    }
    else {
      filterValues.push(value);
    }

    if (filterValues.length > 0) {
      queryParams[sectionId] = filterValues.join(",")
    }
    else {
      delete queryParams[sectionId];
    }

    this.router.navigate([], { queryParams })
  }

  handleSingleSelectFilter(value: string, sectionId: string) {
    const queryParams = { ...this.activatedRoute.snapshot.queryParams };
    queryParams[sectionId] = value;

    this.router.navigate([], { queryParams })
  }

  trackByProduct(index: number, item: any): number {
    return item.id;
  }


}
