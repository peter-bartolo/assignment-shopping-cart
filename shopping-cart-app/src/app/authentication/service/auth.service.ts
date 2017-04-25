import { Injectable } from '@angular/core';
import {User} from 'app/shared/model/User';
import {UserService} from '../../shared/service/user.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';

@Injectable()
export class AuthService {

  private user: User;

  constructor(private userService: UserService) {
    this.user = null;
  }

  public login(email: string, password: string) {
    this.user = null;

    return this.userService.getUsers()
      .map((response) => response.json())
      .mergeMap((dbUser: Array<User>) => dbUser)
      .map((dbUser) => {
        const user = new User();
        user.id = dbUser.id;
        user.name = dbUser.name;
        user.surname = dbUser.surname;
        user.email = dbUser.email;
        user.password = dbUser.password;
        user.isLoggedIn = dbUser.isLoggedIn;
        user.cartId = dbUser.cartId;
        return user;
      })
      .filter((user) => {
         return user.email === email && user.password === password;
      });
  }

  public logout() {
    this.user = null;
  }

  public getUser() {
    return this.user;
  }

  public setUser(user: User) {
    return this.user = user;
  }
}
