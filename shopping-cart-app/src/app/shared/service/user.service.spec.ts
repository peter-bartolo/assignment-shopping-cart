import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import {Http} from '@angular/http';
import {User} from '../model/User';

describe('UserService', () => {
  const httpSpy = jasmine.createSpyObj('Http', ['get', 'post', 'put']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        {provide: Http, useValue: httpSpy}
      ]
    });
    httpSpy.get.and.returnValue(null);
    httpSpy.post.and.returnValue(null);
    httpSpy.put.and.returnValue(null);
  });

  it ('should call the http get method when getUser is called', inject([UserService], (service: UserService) => {
    service.getUser(1);
    expect(httpSpy.get).toHaveBeenCalled();
  }));

  it ('should call the http get method when getUsers is called', inject([UserService], (service: UserService) => {
    service.getUsers();
    expect(httpSpy.get).toHaveBeenCalled();
  }));

  it ('should call the http post method when addUser is called', inject([UserService], (service: UserService) => {
    const sampleUser: User = new User();
    service.addUser(sampleUser);
    expect(httpSpy.post).toHaveBeenCalled();
  }));

  it ('should call the http put method when updateUser is called', inject([UserService], (service: UserService) => {
    const sampleUser: User = new User();
    service.updateUser(sampleUser);
    expect(httpSpy.put).toHaveBeenCalled();
  }));
});
