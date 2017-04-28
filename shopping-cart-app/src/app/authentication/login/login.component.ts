import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';
import {CurrentCartService} from '../../sessioncart/service/current-cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginMessage = 'Welcome';
  private errorMessage = '';

  constructor(private authService: AuthService, private router: Router, private currentCartService: CurrentCartService) { }

  ngOnInit() {
  }

  private submitLoginForm(loginForm: NgForm) {
    this.authService.setUser(null);
    this.errorMessage = '';
    const loginObservable = this.authService.login(loginForm.controls.email.value, loginForm.controls.password.value);
    loginObservable.subscribe(
      (user) => {
        this.authService.setUser(user);
        if (user.cartId !== 0) {
          this.currentCartService.setCurrentCartById(user.cartId);
        }
        this.router.navigate(['/home']);
      },
      (err) => {
        this.authService.setUser(null);
        this.errorMessage = 'Failed to Access Database';
      },
      () => {
        if (this.authService.getUser() === null && this.errorMessage === '') {
          this.errorMessage = 'Incorrect Credentials';
        }
      }
    );
  }
}
