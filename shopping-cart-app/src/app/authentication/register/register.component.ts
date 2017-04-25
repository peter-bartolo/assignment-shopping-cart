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

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  private submitRegisterForm(registerForm: NgForm) {
    const user: User = new User();
    user.name = registerForm.controls.name.value;
    user.surname = registerForm.controls.surname.value;
    user.email = registerForm.controls.email.value;
    user.password = registerForm.controls.password.value;
    user.isLoggedIn = 0;
    user.cartId = 0;

    this.userService.addUser(user).subscribe();
  }
}
