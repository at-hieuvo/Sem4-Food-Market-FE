import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { routing } from './app.route';
import { CATEGORYCOMPONENTS } from './component/category';
import { PRODUCTCOMPONENTS } from './component/product';
import { SEARCHCOMPONENTS } from './component/search';
import { CARTCOMPONENTS } from './component/cart';
import { TEMPLATECOMPONENTS } from './component/template';
import { HOMECOMPONENTS } from './component/home';
import { RegisterComponent } from './component/register/register.component';
import { PaymentComponent } from './component/payment/payment.component';
import { LoginComponent } from './component/login/login.component';
import {HttpModule} from '@angular/http';
@NgModule({
  declarations: [
    AppComponent,
    CATEGORYCOMPONENTS,
    PRODUCTCOMPONENTS,
    SEARCHCOMPONENTS,
    CARTCOMPONENTS,
    TEMPLATECOMPONENTS,
    HOMECOMPONENTS,
    // ProductListComponent
    LoginComponent,
     RegisterComponent,
    PaymentComponent
  ],
  imports: [
   routing,
    BrowserModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
