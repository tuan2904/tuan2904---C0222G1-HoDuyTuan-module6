import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ShopComponent} from './shop/shop.component';
import {DetailComponent} from './detail/detail.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'detail', component: DetailComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
