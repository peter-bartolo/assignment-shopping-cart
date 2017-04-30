import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../shared/service/user.service';
import {User} from '../../shared/model/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private registerMessage = 'Registration';
  private errorMessage = '';
  private successMessage = '';

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  public getRegisterMessage() {
    return this.registerMessage;
  }

  public getErrorMessage() {
    return this.errorMessage;
  }

  public getSuccessMessage() {
    return this.successMessage;
  }

  public submitRegisterForm(registerForm: NgForm) {
    this.errorMessage = '';
    this.successMessage = '';
    let emailAlreadyExists = false;
    let errorWhileGettingUsers = false;

    const user = new User();
    user.name = registerForm.controls.name.value;
    user.surname = registerForm.controls.surname.value;
    user.email = registerForm.controls.email.value;
    user.password = registerForm.controls.password.value;
    user.isLoggedIn = 0;
    user.cartId = 0;

    this.userService.getUsers()
      .map((response) => response.json())
      .mergeMap((dbUser: Array<User>) => dbUser)
      .map((dbUser) => {
        const u = new User();
        u.id = dbUser.id;
        u.name = dbUser.name;
        u.surname = dbUser.surname;
        u.email = dbUser.email;
        u.password = dbUser.password;
        u.isLoggedIn = dbUser.isLoggedIn;
        u.cartId = dbUser.cartId;
        return u;
      })
      .filter((u) => {
        return u.email === user.email;
      })
      .subscribe(
        (u) => {
          if (u !== null) {
            emailAlreadyExists = true;
          }
        },
        (err) => {
          errorWhileGettingUsers = true;
        },
        () => {
          if (errorWhileGettingUsers) {
            this.errorMessage = 'Failed to check whether email already exists';
          } else if (emailAlreadyExists) {
            this.errorMessage = 'Email already exists';
          } else {
            this.userService.addUser(user).subscribe(
              (data) => {
                this.successMessage = 'You have been successfully Registered';
              },
              (err) => {
                this.errorMessage = 'Registration Failed, please try again';
              }
            );
          }
        }
      );
  }
}
