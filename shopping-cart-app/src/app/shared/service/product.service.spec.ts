import { TestBed, inject } from '@angular/core/testing';

import { ProductService } from './product.service';
import { Http} from '@angular/http';
import {Product} from 'app/shared/model/Product';

describe('ProductService', () => {
  const httpSpy = jasmine.createSpyObj('Http', ['get', 'post']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        {provide: Http, useValue: httpSpy}
      ]
    });
    httpSpy.get.and.returnValue(null);
    httpSpy.post.and.returnValue(null);
  });

  it ('should call the http get method when getProduct is called', inject([ProductService], (service: ProductService) => {
    service.getProduct(1);
    expect(httpSpy.get).toHaveBeenCalled();
  }));

  it ('should call the http get method when getProducts is called', inject([ProductService], (service: ProductService) => {
    service.getProducts();
    expect(httpSpy.get).toHaveBeenCalled();
  }));

  it ('should call the http post method when addProduct is called', inject([ProductService], (service: ProductService) => {
    const sampleProduct: Product = new Product();
    service.addProduct(sampleProduct);
    expect(httpSpy.post).toHaveBeenCalled();
  }));
});
