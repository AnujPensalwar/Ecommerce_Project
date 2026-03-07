import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_API_URL } from '../../config/api';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

   
BASE_API_URL=BASE_API_URL;
  constructor(private http: HttpClient,
  
  ) {}

  createReview(data:any): Observable<any> {

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(
      `${this.BASE_API_URL}/api/reviews/create`,
      data,
      { headers }
    );
  }

  getProductReviews(productId:number): Observable<any> {

    return this.http.get(
      `${this.BASE_API_URL}/api/reviews/product/${productId}`
    );
  }
}