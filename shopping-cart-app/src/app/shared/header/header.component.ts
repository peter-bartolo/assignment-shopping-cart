import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../authentication/service/auth.service';
import {CurrentCartService} from 'app/shared/service/current-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private currentCartService: CurrentCartService) { }

  ngOnInit() {
  }

  public signOut() {
    this.authService.logout();
    this.currentCartService.setCurrentCart(null);
  }

  public loggedInUserHasCart() {
    const currentCart = this.currentCartService.getCurrentCart();
    if (currentCart && currentCart !== null) {
      return true;
    }

    return false;
  }

  public getNumberOfCartItems() {
    let numberOfItems = 0;
    const currentCart = this.currentCartService.getCurrentCart();
    if (currentCart && currentCart !== null) {
      for (const item of currentCart.items) {
        numberOfItems += item.qty;
      }
    }
    return numberOfItems;
  }

  public getUser() {
    return this.authService.getUser();
  }
}
