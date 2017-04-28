import { Injectable } from '@angular/core';
import {Cart} from 'app/shared/model/Cart';
import {CartService} from 'app/shared/service/cart.service';
import {Item} from 'app/shared/model/Item';

@Injectable()
export class CurrentCartService {
  private currentCart: Cart;

  constructor(private cartService: CartService) {
    this.currentCart = null;
  }

  public getCurrentCart() {
    return this.currentCart;
  }

  public setCurrentCart(currentCart: Cart) {
    this.currentCart = currentCart;
  }

  public setCurrentCartById(cartId: number) {
    this.cartService.getCart(cartId)
      .map((response) => response.json())
      .map((dbCart) => {
        const cart = new Cart();
        cart.id = dbCart.id;
        cart.userId = dbCart.userId;
        cart.total = dbCart.total;
        cart.convertedToOrder = dbCart.convertedToOrder;

        const items: Array<Item> = new Array<Item>();
        for (const itemJson of dbCart.items) {
          const item = new Item();
          item.id = itemJson.id;
          item.qty = itemJson.qty;
          items.push(item);
        }
        cart.items = dbCart.items;
        return cart;
      })
      .subscribe(
        (cart) => {
          this.currentCart = cart;
        }
      );
  }
}
