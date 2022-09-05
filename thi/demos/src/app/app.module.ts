import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {ListDemoComponent} from './component/list-demo/list-demo.component';
import {CreateDemoComponent} from './component/create-demo/create-demo.component';
import {UpdateDemoComponent} from './component/update-demo/update-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    ListDemoComponent,
    CreateDemoComponent,
    UpdateDemoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
