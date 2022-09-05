import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListBookComponent} from './component/list-book/list-book.component';
import {CreateBookComponent} from './component/create-book/create-book.component';
import {ListDrinkComponent} from './component/list-drink/list-drink.component';
import {CreateDrinkComponent} from './component/create-drink/create-drink.component';
import {FoodListComponent} from './component/food-list/food-list.component';
import {FoodCreateComponent} from './component/food-create/food-create.component';
import {HeaderComponent} from './component/header/header.component';


const routes: Routes = [
  {path: 'list-book', component: ListBookComponent},
  {path: 'create', component: CreateBookComponent},
  {path: 'drink-list', component: ListDrinkComponent},
  {path: 'create-drink', component: CreateDrinkComponent},
  {path: 'food-list', component: FoodListComponent},
  {path: 'create-food', component: FoodCreateComponent},
  {path: 'err', component: HeaderComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
