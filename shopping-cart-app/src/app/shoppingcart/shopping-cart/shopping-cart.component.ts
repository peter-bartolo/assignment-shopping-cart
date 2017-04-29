import { Component, OnInit } from '@angular/core';
import {CurrentCartService} from 'app/shared/service/current-cart.service';
import {ProductService} from '../../shared/service/product.service';
import {Product} from '../../shared/model/Product';
import {Cart} from '../../shared/model/Cart';
import {CartService} from '../../shared/service/cart.service';
import {UserService} from '../../shared/service/user.service';
import {AuthService} from '../../authentication/service/auth.service';
import {User} from '../../shared/model/User';
import {Order} from '../../shared/model/Order';
import {OrderService} from '../../shared/service/order.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  private products: Array<Product>;
  private errorMessage: string;

  constructor(
    private currentCartService: CurrentCartService,
    private productService: ProductService,
    private cartService: CartService,
    private userService: UserService,
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router) {
    this.products = new Array<Product>();
    this.errorMessage = '';
  }

  ngOnInit() {
    this.productService.getProducts()
      .map((response) => response.json())
      .mergeMap((dbProduct: Array<Product>) => dbProduct)
      .map((dbProduct) => {
        const product = new Product();
        product.id = dbProduct.id;
        product.name = dbProduct.name;
        product.ingredients = dbProduct.ingredients;
        product.description = dbProduct.description;
        product.volume = dbProduct.volume;
        product.price = dbProduct.price;
        product.image = dbProduct.image;
        return product;
      })
      .subscribe(
        (product) => {
          this.products.push(product);
        },
        (err) => {
          this.errorMessage = 'Failed to get Products from Database';
        }
      );
  }

  public getProduct(productId: number) {
    for (const product of this.products) {
      if (product.id === productId) {
        return product;
      }
    }
    return null;
  }

  public removeCartItem(cartItemId: number, totalToDeduce: number) {
    const currentCart: Cart = this.currentCartService.getCurrentCart();
    currentCart.total -= totalToDeduce;
    currentCart.items = currentCart.items.filter( item => item.id !== cartItemId);
    this.cartService.updateCart(currentCart).subscribe(
      (cartData) => {
        this.currentCartService.setCurrentCart(currentCart);
      },
      (err) => {
        this.errorMessage = 'Failed to update cart object';
      }
    );
  }

  public createOrder() {
    const currentCart: Cart = this.currentCartService.getCurrentCart();
    currentCart.convertedToOrder = 1;
    this.cartService.updateCart(currentCart).subscribe(
      (cartData) => {
        this.currentCartService.setCurrentCart(null);

        const loggedInUser: User = this.authService.getUser();
        loggedInUser.cartId = 0;
        this.userService.updateUser(loggedInUser).subscribe(
          (userData) => {
            this.authService.setUser(loggedInUser);

            const order = new Order();
            order.userId = loggedInUser.id;
            order.cartId = currentCart.id;
            this.orderService.addOrder(order).subscribe(
              (orderData) => {
                this.router.navigate(['/order']);
              },
              (err) => {
                this.errorMessage = 'Failed to create order object.';
              }
            );
          },
          (err) => {
            this.errorMessage = 'Failed to update the user object';
          }
        );
      },
      (err) => {
        this.errorMessage = 'Failed to update cart object';
      }
    );
  }
}
