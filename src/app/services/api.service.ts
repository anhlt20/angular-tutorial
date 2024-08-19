import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options, Product } from '../../type';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  get<T>(url: string, option: Options): Observable<T> {
    return this.httpClient.get<T>(url, option) as Observable<T>
  }

  post<T>(url: string, body: Product, option: Options): Observable<T> {
    return this.httpClient.post<T>(url, body, option) as Observable<T>
  }

  put<T>(url: string, body: Product, option: Options): Observable<T> {
    return this.httpClient.put<T>(url, body, option) as Observable<T>
  }

  delete<T>(url: string, option: Options): Observable<T> {
    return this.httpClient.delete<T>(url, option) as Observable<T>
  }
}
