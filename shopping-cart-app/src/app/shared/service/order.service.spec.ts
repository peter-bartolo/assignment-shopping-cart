import { TestBed, inject } from '@angular/core/testing';

import { OrderService } from './order.service';
import { Http} from '@angular/http';
import {Order} from '../model/Order';

describe('OrderService', () => {
  const httpSpy = jasmine.createSpyObj('Http', ['get', 'post']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderService,
        {provide: Http, useValue: httpSpy}
      ]
    });
    httpSpy.get.and.returnValue(null);
    httpSpy.post.and.returnValue(null);
  });

  it ('should call the http get method when getOrder is called', inject([OrderService], (service: OrderService) => {
    service.getOrder(1);
    expect(httpSpy.get).toHaveBeenCalled();
  }));

  it ('should call the http get method when getOrders is called', inject([OrderService], (service: OrderService) => {
    service.getOrders();
    expect(httpSpy.get).toHaveBeenCalled();
  }));

  it ('should call the http post method when addOrder is called', inject([OrderService], (service: OrderService) => {
    const sampleOrder: Order = new Order();
    service.addOrder(sampleOrder);
    expect(httpSpy.post).toHaveBeenCalled();
  }));
});
