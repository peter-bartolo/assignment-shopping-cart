import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {RouterModule} from '@angular/router';
import {homeRoutes} from './routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(homeRoutes)
  ],
  exports: [
    HomeComponent
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
