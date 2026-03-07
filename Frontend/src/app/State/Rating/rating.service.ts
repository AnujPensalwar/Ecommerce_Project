import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_API_URL } from '../../config/api';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  BASE_API_URL=BASE_API_URL;
  // private BASE_URL = "http://localhost:8080/api/ratings";

  constructor(private http: HttpClient) {}

  createRating(data:any): Observable<any> {

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(
      `${this.BASE_API_URL}/api/ratings/create`,
      data,
      { headers }
    );
  }

  getProductRatings(productId:number): Observable<any> {

    return this.http.get(
      `${this.BASE_API_URL}/api/ratings/product/${productId}`
    );
  }
}