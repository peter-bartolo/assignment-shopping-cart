import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {UserService} from './service/user.service';
import {CartService} from './service/cart.service';
import {OrderService} from './service/order.service';
import {ProductService} from './service/product.service';
import {CurrentCartService} from './service/current-cart.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpModule
  ],
  exports: [
    HeaderComponent
  ],
  declarations: [
    HeaderComponent
  ],
  providers: [
    UserService,
    CartService,
    OrderService,
    ProductService,
    CurrentCartService
  ]
})
export class SharedModule { }
