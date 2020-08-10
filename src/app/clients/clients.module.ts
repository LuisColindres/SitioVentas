import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientsEditComponent } from './clients-edit/clients-edit.component';
import { MaterialModule } from '../app.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ClientsListComponent, ClientsEditComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class ClientsModule { }
