import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import {productRoutes} from './routes';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(productRoutes),
  ],
  exports: [
    ProductListComponent
  ],
  declarations: [ProductListComponent]
})
export class ProductModule { }
