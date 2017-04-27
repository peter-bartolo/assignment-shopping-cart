import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';
import {AuthenticationModule} from './authentication/authentication.module';
import {appRoutes} from './routes';
import {RouterModule} from '@angular/router';
import {HomeModule} from 'app/home/home.module';
import {ProductModule} from './product/product.module';
import {CartModule} from 'app/cart/cart.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    SharedModule,
    HomeModule,
    ProductModule,
    AuthenticationModule,
    CartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
