import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../shared/service/product.service';
import {Product} from 'app/shared/model/Product';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../authentication/service/auth.service';
import {NgForm} from '@angular/forms';
import {UserService} from '../../shared/service/user.service';
import {Cart} from '../../shared/model/Cart';
import {Item} from '../../shared/model/Item';
import {CartService} from 'app/shared/service/cart.service';
import {CurrentCartService} from '../../sessioncart/service/current-cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  private product: Product;
  private errorMessage: string;

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private currentCartService: CurrentCartService) {
    this.product = null;
    this.errorMessage = '';
  }

  ngOnInit() {
    const productId = this.route.snapshot.params.id;
    if (productId > 0) {
      this.productService.getProduct(productId)
        .map((response) => response.json())
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
            this.product = product;
          },
          (err) => {
            this.errorMessage = 'Failed to Load Product from Database';
          }
        );
    } else {
      this.errorMessage = 'Failed to Load Product from Database';
    }
  }

  private submitAddToCartForm(addToCartForm: NgForm) {
    const qty = addToCartForm.controls.qty.value;
    if (qty <= 0) {
      this.errorMessage = 'Quantity field cannot have a value less than zero';
      return;
    }

    const loggedInUser = this.authService.getUser();
    if (loggedInUser === null) {
      this.errorMessage = 'Cannot add Products to Cart unless Logged In';
      return;
    }

    if (loggedInUser.cartId === 0) {
      // create new cart and assign it to loggedInUser, redirect to cart page
      const newCart = new Cart();
      newCart.userId = loggedInUser.id;
      newCart.total = this.product.price * qty;
      newCart.convertedToOrder = 0;
      const items: Array<Item> = new Array<Item>();
      const item: Item = new Item();
      item.id = this.product.id;
      item.qty = qty;
      items.push(item);
      newCart.items = items;

      this.cartService.addCart(newCart).subscribe(
        (data) => {
          loggedInUser.cartId = data.json().id;
          this.userService.updateUser(loggedInUser).subscribe(
            (userData) => {
              this.currentCartService.setCurrentCart(newCart);
              this.router.navigate(['/cart']);
            },
            (err) => {
              this.errorMessage = 'Failed to update logged in user with cart id';
            }
          );
        },
        (err) => {
          this.errorMessage = 'Failed to create cart object in database';
        }
      );

    } else {
      // update existing cart and redirect to cart page
      this.cartService.getCart(loggedInUser.cartId)
        .map((response) => response.json())
        .map((dbCart) => {
          const existingCart = new Cart();
          existingCart.id = dbCart.id;
          existingCart.userId = dbCart.userId;
          existingCart.total = dbCart.total;
          existingCart.convertedToOrder = dbCart.convertedToOrder;

          const items: Array<Item> = new Array<Item>();
          for (const itemJson of dbCart.items) {
            const item = new Item();
            item.id = itemJson.id;
            item.qty = itemJson.qty;
            items.push(item);
          }
          existingCart.items = items;
          return existingCart;
        })
        .subscribe(
          (existingCart) => {
            const item: Item = new Item();
            item.id = this.product.id;
            item.qty = qty;
            existingCart.updateCart(item, this.product.price);
            this.cartService.updateCart(existingCart).subscribe(
              (cartData) => {
                this.currentCartService.setCurrentCart(existingCart);
                this.router.navigate(['/cart']);
              },
              (err) => {
                this.errorMessage = 'Failed to update cart object';
              }
            );
          },
          (err) => {
            this.errorMessage = 'Failed to load cart object from database';
          }
        );
    }


  }
}
