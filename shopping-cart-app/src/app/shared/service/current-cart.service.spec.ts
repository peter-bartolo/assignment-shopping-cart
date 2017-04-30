import { TestBed, inject } from '@angular/core/testing';

import { CurrentCartService } from './current-cart.service';

describe('CurrentCartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentCartService]
    });
  });

  // it('should ...', inject([CurrentCartService], (service: CurrentCartService) => {
  //   expect(service).toBeTruthy();
  // }));
});
