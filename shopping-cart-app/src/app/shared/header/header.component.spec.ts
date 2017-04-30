import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {CurrentCartService} from 'app/shared/service/current-cart.service';
import {AuthService} from '../../authentication/service/auth.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const authServiceSpy = jasmine.createSpyObj('AuthService', ['logout', 'getUser']);
  const currentCartServiceSpy = jasmine.createSpyObj('CurrentCartService', ['setCurrentCart', 'getCurrentCart']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [
        {provide: AuthService, useValue: authServiceSpy},
        {provide: CurrentCartService, useValue: currentCartServiceSpy},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    authServiceSpy.getUser.and.returnValue({
      id: 1,
      name: 'test name',
      surname: 'test surname',
      email: 'test@test.com',
      password: '123456',
      isLoggedIn: 1,
      cartId: 1
    });
    currentCartServiceSpy.getCurrentCart.and.returnValue({
      id: 1,
      userId: 1,
      total: 7,
      convertedToOrder: 0,
      items: [
        {
          id: 1,
          qty: 1
        },
        {
          id: 2,
          qty: 4
        }
      ]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call AuthService.logout and CurrentCartService.setCurrentCart in Signout method', () => {
    authServiceSpy.logout.and.returnValue(null);
    currentCartServiceSpy.setCurrentCart.and.returnValue(null);

    component.signOut();

    expect(authServiceSpy.logout).toHaveBeenCalled();
    expect(currentCartServiceSpy.setCurrentCart).toHaveBeenCalled();
  });

  it('should call CurrentCartService.getCurrentCart and if cart is available return true in loggedInUserHasCart method', () => {
    const output = component.loggedInUserHasCart();

    expect(currentCartServiceSpy.getCurrentCart).toHaveBeenCalled();
    expect(output).toBe(true);
  });

  it('should call CurrentCartService.getCurrentCart and return the number of cart items in getNumberOfCartItems method', () => {
    const output = component.getNumberOfCartItems();

    expect(currentCartServiceSpy.getCurrentCart).toHaveBeenCalled();
    expect(output).toEqual(5);
  });
});
