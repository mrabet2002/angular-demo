import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { Page } from '../models/Page';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) { }

  // Get all products from the server "http://localhost:8888/products"
  getProducts(page: number = 1, size: number = 25) {
    return this.http.get<Page<Product>>(`http://localhost:8888/products?_page=${page}&_per_page=${size}`);
  }

  getProduct(id: string) {
    return this.http.get<Product>(`http://localhost:8888/products/${id}`);
  }

  // Add a new product to the server "http://localhost:8888/products"
  addProduct(product: Product) {
    return this.http.post('http://localhost:8888/products', product);
  }

  // Delete a product from the server "http://localhost:8888/products"
  deleteProduct(id: string) {
    return this.http.delete(`http://localhost:8888/products/${id}`);
  }

  // Update a product on the server "http://localhost:8888/products"
  updateProduct(product: Product, id: string) {
    return this.http.put(`http://localhost:8888/products/${id}`, product);
  }

  // Set Product Checked
  setProductChecked(id: string, checked: boolean) {
    return this.http.patch(`http://localhost:8888/products/${id}`, { checked });
  }
  
  // Search From Product By keyword
  searchProduct(keyword: string) {
    return this.http.get<Product[]>(`http://localhost:8888/products?name_like=${keyword}`);
  }
}
