import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoryComponent} from './component/category/category.component';
import {ProductComponent} from './component/product/product.component';
import {CartComponent} from './component/cart/cart.component';
import { HomeComponent } from './component/home/home.component';
import {NotFoundComponent} from './component/template/not-found/not-found.component';
import {LoginComponent} from './component/login/login.component';
import {AccountComponent} from './component/account/account.component';
import {SupplierGuard} from './security/supplier.guard';
import {ActivateGuard} from './security/activate.guard';
import {NoLoggedGuard} from './security/no-logged.guard';
import {PaymentComponent} from './component/payment/payment.component';
const appRoutes: Routes = [

  { path: 'category', children: [
    {path: '', component: CategoryComponent },
    {path: ':page', component: CategoryComponent }]
  },
  { path: 'login',
    component: LoginComponent,
    canActivate: [NoLoggedGuard]
  },
  { path: '', component: HomeComponent },
  { path: 'product',
    children: [
      { path: ':id', component: ProductComponent}
    ]
  },
  {
    path: 'cart',
    component: CartComponent,
    data: { title: 'Cart List'},
  },
  {
    path: 'checkout',
    component: PaymentComponent,
    data: { title: 'Cart List'},
  },
  {
    path: 'account',
    component: AccountComponent,
    data: { title: 'Cart List' },
    canActivate: [ActivateGuard]
  },
  { path: 'sss',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {path: 'home', component: HomeComponent },
  { path: '**', component: NotFoundComponent }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
