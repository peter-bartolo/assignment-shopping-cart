import { Injectable } from '@angular/core';
import {Http, RequestOptions, RequestOptionsArgs, Headers} from '@angular/http';
import {Cart} from '../model/Cart';

@Injectable()
export class CartService {

  private url: string;

  constructor(private http: Http) {
    this.url = 'http://localhost:3000';
  }

  public getCart(id: number) {
    return this.http.get(this.url + '/carts/' + id);
  }

  public getCarts() {
    return this.http.get(this.url + '/carts');
  }

  public addCart(cart: Cart) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.url + '/carts', cart.toJson(), options);
  }
}
