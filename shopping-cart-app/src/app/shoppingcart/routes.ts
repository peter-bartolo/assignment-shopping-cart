import {Routes} from '@angular/router';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {OrderComponent} from './order/order.component';

export const shoppingcartRoutes: Routes = [
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'order', component: OrderComponent }
];
