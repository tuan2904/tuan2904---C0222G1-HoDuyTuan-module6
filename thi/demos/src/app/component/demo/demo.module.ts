import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
// @ts-ignore

import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [],
  imports: [
    NgxPaginationModule,
    CommonModule,
    DemoRoutingModule,
  ]
})
export class DemoModule { }
