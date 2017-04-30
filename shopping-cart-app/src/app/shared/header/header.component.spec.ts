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
    authServiceSpy.getUser.and.returnValue({name: 'test name', surname: 'test surname'});
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
});
