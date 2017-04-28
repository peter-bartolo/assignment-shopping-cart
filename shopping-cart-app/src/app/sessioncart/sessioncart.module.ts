import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import {RouterModule} from '@angular/router';
import {sessioncartRoutes} from 'app/sessioncart/routes';
import {CurrentCartService} from './service/current-cart.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(sessioncartRoutes),
  ],
  declarations: [
    CartComponent
  ],
  providers: [
    CurrentCartService
  ]
})
export class SessioncartModule { }
