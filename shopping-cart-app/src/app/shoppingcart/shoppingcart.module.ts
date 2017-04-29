import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import {RouterModule} from '@angular/router';
import {shoppingcartRoutes} from './routes';
import { OrderComponent } from './order/order.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(shoppingcartRoutes),
  ],
  exports: [
    ShoppingCartComponent
  ],
  declarations: [ShoppingCartComponent, OrderComponent]
})
export class ShoppingcartModule { }
