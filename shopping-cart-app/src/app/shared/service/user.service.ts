import { Injectable } from '@angular/core';
import {Http, RequestOptions, RequestOptionsArgs, Headers} from '@angular/http';
import {User} from '../model/User';

@Injectable()
export class UserService {

  private url: string;

  constructor(private http: Http) {
    this.url = 'http://5.189.142.170:3000';
  }

  public getUser(id: number) {
    return this.http.get(this.url + '/users/' + id);
  }

  public getUsers() {
    return this.http.get(this.url + '/users');
  }

  public addUser(user: User) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.url + '/users', user.toJson(), options);
  }

  public updateUser(user: User) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.put(this.url + '/users/' + user.id, user.toJson(), options);
  }
}
