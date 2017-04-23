import {Routes} from '@angular/router';
import {LoginComponent} from './authentication/login/login.component';
import {HomeComponent} from './home/home/home.component';
import {RegisterComponent} from './authentication/register/register.component';


export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];
