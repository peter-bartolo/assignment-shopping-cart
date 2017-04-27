import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import {RouterModule} from '@angular/router';
import {cartRoutes} from 'app/cart/routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(cartRoutes),
  ],
  declarations: [CartComponent]
})
export class CartModule { }
