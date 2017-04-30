import { Injectable } from '@angular/core';
import {Http, RequestOptions, RequestOptionsArgs, Headers} from '@angular/http';
import {Product} from '../model/Product';

@Injectable()
export class ProductService {

  private url: string;

  constructor(private http: Http) {
    this.url = 'http://5.189.142.170:3000';
  }

  public getProduct(id: number) {
    return this.http.get(this.url + '/products/' + id);
  }

  public getProducts() {
    return this.http.get(this.url + '/products');
  }

  public addProduct(product: Product) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.url + '/products', product.toJson(), options);
  }
}
