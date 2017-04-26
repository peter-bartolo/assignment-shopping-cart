import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../shared/service/product.service';
import {Product} from 'app/shared/model/Product';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  private product: Product;
  private errorMessage: string;

  constructor(private productService: ProductService, private route: ActivatedRoute) {
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
          },
        );
    } else {
      this.errorMessage = 'Failed to Load Product from Database';
    }
  }

}
