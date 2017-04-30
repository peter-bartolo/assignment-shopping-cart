import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../shared/service/product.service';
import {Product} from '../../shared/model/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  private products: Product[];
  private rows: number[];
  private errorMessage: string;

  constructor(private productService: ProductService) {
    this.errorMessage = '';
    this.products = new Array();
  }

  public getProducts() {
    return this.products;
  }

  public getRows() {
    return this.rows;
  }

  public getErrorMessage() {
    return this.errorMessage;
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
        },
        () => {
          this.rows = new Array();
          for (let i = 0; i <= (this.products.length / 3); i++) {
            this.rows[i] = i;
          }
        }
      );
  }

}
