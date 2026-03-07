import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_API_URL } from '../../config/api';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private API_BASE_URL = BASE_API_URL;

  constructor(private http: HttpClient) {}

  getAllOrders() {

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      'Content-Type': 'application/json'
    });

    return this.http.get(
      `${this.API_BASE_URL}/api/admin/orders/`,
      { headers }
    );
  }


  getAllUsers() {
  return this.http.get("http://localhost:8080/api/admin/users/", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`
    }
  });
}



updateOrderStatus(id: number, action: string) {
  return this.http.put(
    `http://localhost:8080/api/admin/orders/${id}/${action}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    }
  );
}

deleteOrder(id: number) {
  return this.http.delete(
    `http://localhost:8080/api/admin/orders/${id}/delete`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    }
  );
}





getAllProducts() {
  return this.http.get(
    `${this.API_BASE_URL}/api/admin/products/all`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    }
  );
}


deleteProduct(id: number) {
  return this.http.delete(
    `${this.API_BASE_URL}/api/admin/products/${id}/delete`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    }
  );
}



getProductById(id: string) {
  return this.http.get(
    `${this.API_BASE_URL}/api/admin/products/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    }
  );
}

updateProduct(id: string, data: any) {
  return this.http.put(
    `${this.API_BASE_URL}/api/admin/products/${id}/update`,
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    }
  );
}

createProduct(data: any) {
  return this.http.post(
    `${this.API_BASE_URL}/api/admin/products/`,
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      }
    }
  );
}




}
