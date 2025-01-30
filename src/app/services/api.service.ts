import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _http= inject(HttpClient);
  //constructor( private _httpClient: HttpClient) { }
  private urlBase: string= 'https://localhost:7267/api/v1/Product';

  getProducts():Observable<IProduct[]>{
    return this._http.get<IProduct[]>(this.urlBase);
  }

  getProduct(id: number):Observable<IProduct>{
    return this._http.get<IProduct>(`${this.urlBase}/${id}`);
  }
}
