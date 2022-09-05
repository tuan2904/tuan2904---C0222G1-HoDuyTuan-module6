import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {TicketListComponent} from "./ticket/component/ticket-list/ticket-list.component";
import {TicketCreateComponent} from "./ticket/component/ticket-create/ticket-create.component";
import {TicketEditComponent} from "./ticket/component/ticket-edit/ticket-edit.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    AppComponent,
    TicketListComponent,
    TicketCreateComponent,
    TicketEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
