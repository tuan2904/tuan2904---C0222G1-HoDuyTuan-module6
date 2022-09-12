import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './component/login/login.component';
import {HomeComponent} from './component/home/home.component';
import {DetailComponent} from './component/detail/detail.component';
import {CartComponent} from './component/cart/cart.component';
import {Page401Component} from './component/error/page401/page401.component';
import {Page404Component} from './component/error/page404/page404.component';
import {Page403Component} from './component/error/page403/page403.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'detail', component: DetailComponent},
  {path: 'cart', component: CartComponent},
  {path: '401', component: Page401Component},
  {path: '403', component: Page403Component},
  {path: '404', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
