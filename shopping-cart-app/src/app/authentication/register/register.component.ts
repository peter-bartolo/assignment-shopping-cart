import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private registerMessage = 'Registration';

  constructor() { }

  ngOnInit() {
  }

  private submitRegisterForm(registerForm: NgForm)
  {
    debugger;
  }
}
