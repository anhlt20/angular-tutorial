import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { PaginationParams, Product, Products } from '../../type';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private apiService: ApiService
  ) { }

  getProducts = (url: string, params: PaginationParams): Observable<Products> => {
    return this.apiService.get(url, {
      params,
      responseType: 'json'
    })
  }

  addProduct = (url: string, product: Product): Observable<Products> => {
    return this.apiService.post(url, product, {})
  }

  updateProduct = (url: string, product: Product): Observable<Products> => {
    return this.apiService.put(url, product, {})
  }

  deleteProduct = (url: string): Observable<Products> => {
    return this.apiService.delete(url, {})
  }
}
