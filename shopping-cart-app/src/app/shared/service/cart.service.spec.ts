import { TestBed, inject } from '@angular/core/testing';

import { CartService } from './cart.service';
import { Http} from '@angular/http';
import {Cart} from '../model/Cart';

describe('CartService', () => {
  const httpSpy = jasmine.createSpyObj('Http', ['get', 'post', 'put']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartService,
        {provide: Http, useValue: httpSpy}
      ]
    });
    httpSpy.get.and.returnValue(null);
    httpSpy.post.and.returnValue(null);
    httpSpy.put.and.returnValue(null);
  });

  it ('should call the http get method when getCart is called', inject([CartService], (service: CartService) => {
    service.getCart(1);
    expect(httpSpy.get).toHaveBeenCalled();
  }));

  it ('should call the http get method when getCarts is called', inject([CartService], (service: CartService) => {
    service.getCarts();
    expect(httpSpy.get).toHaveBeenCalled();
  }));

  it ('should call the http post method when addCart is called', inject([CartService], (service: CartService) => {
    const sampleCart: Cart = new Cart();
    service.addCart(sampleCart);
    expect(httpSpy.post).toHaveBeenCalled();
  }));

  it ('should call the http put method when updateCart is called', inject([CartService], (service: CartService) => {
    const sampleCart: Cart = new Cart();
    service.updateCart(sampleCart);
    expect(httpSpy.put).toHaveBeenCalled();
  }));
});
