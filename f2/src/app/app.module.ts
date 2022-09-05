import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import { ListBookComponent } from './component/list-book/list-book.component';
import { CreateBookComponent } from './component/create-book/create-book.component';
import { HeaderComponent } from './component/header/header.component';
import { ListDrinkComponent } from './component/list-drink/list-drink.component';
import { CreateDrinkComponent } from './component/create-drink/create-drink.component';
import { FoodListComponent } from './component/food-list/food-list.component';
import { FoodCreateComponent } from './component/food-create/food-create.component';

@NgModule({
  declarations: [
    AppComponent,
    ListBookComponent,
    CreateBookComponent,
    HeaderComponent,
    ListDrinkComponent,
    CreateDrinkComponent,
    FoodListComponent,
    FoodCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      closeButton: true,
      positionClass: 'toast-top-center',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
