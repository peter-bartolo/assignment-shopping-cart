import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import {productRoutes} from './routes';
import {RouterModule} from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(productRoutes),
  ],
  exports: [
    ProductListComponent,
    ProductDetailComponent
  ],
  declarations: [ProductListComponent, ProductDetailComponent]
})
export class ProductModule { }
