import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {DemoComponent} from './component/demo/demo.component';
import {ListDemoComponent} from './component/list-demo/list-demo.component';
import {CreateDemoComponent} from './component/create-demo/create-demo.component';
import {UpdateDemoComponent} from './component/update-demo/update-demo.component';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
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
export class AppModule {
}
