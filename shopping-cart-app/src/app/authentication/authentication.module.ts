import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import {RouterModule} from '@angular/router';
import {authenticationRoutes} from './routes';
import {HttpModule} from '@angular/http';
import {AuthService} from './service/auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterModule.forChild(authenticationRoutes),
    HttpModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    AuthService
  ]
})
export class AuthenticationModule { }
