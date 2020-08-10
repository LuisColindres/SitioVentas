import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesListComponent } from './sales-list/sales-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

@NgModule({
  declarations: [SalesListComponent],
  imports: [
    CommonModule,
    SalesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class SalesModule { }
