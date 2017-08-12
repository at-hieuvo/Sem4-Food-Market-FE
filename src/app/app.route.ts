import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoryComponent} from './component/category/category.component';
import {SearchComponent} from './component/search/search.component';
import {ProductComponent} from './component/product/product.component';
import {CartComponent} from './component/cart/cart.component';
import { HomeComponent } from './component/home/home.component';

import {NotFoundComponent} from './component/template/not-found/not-found.component';
const appRoutes: Routes = [

  { path: 'category', component: CategoryComponent },
  { path: '', component: HomeComponent },
  { path: 'detail',
    children: [
      { path: '', component: ProductComponent },
      { path: ':id', component: ProductComponent }
    ]
  },
  {
    path: 'cart',
    component: CartComponent,
    data: { title: 'Cart List' }
  },
  { path: 'sss',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {path: 'home', component: HomeComponent },
  { path: '**', component: NotFoundComponent }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
