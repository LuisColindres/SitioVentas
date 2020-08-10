import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {

  // @ViewChild('formDirective', { }) private formDirective: NgForm;
  clients: Array<any> = [];
  isEdit = false;
  isAdd = false;
  clientId: number;
  formClient: FormGroup;

  constructor(
    private clientService: ClientsService
  ) {
    this.formClient = new FormGroup({
      clientId: new FormControl(''),
      clientDesc: new FormControl('', Validators.required),
      nit: new FormControl('', Validators.required),
      address: new FormControl(''),
      phone: new FormControl('', Validators.required),
      birthday: new FormControl('')
    });
  }

  ngOnInit() {
    this.getClients();
  }

  getClients() {
    this.clientService.getClients().subscribe(
      resp => {
        if (resp.status === 1) {
          this.clients = resp.data;
        }
      }
    );
  }

  save() {
    if (this.formClient.valid) {
      const data = this.formClient.value;
      if (this.isEdit) {
        this.update(data, this.clientId);
      } else {
        this.add(data);
      }
    }
  }

  update(data: any, clientId: number) {
    this.clientService.putClient(data, clientId).subscribe(
      resp => {
        if (resp.status === 1) {
          this.getClients();
          this.cancel();
        } else {
          console.log(resp);
        }
      }
    );
  }

  add(data: any) {
    this.clientService.postClient(data).subscribe(
      resp => {
        if (resp.status === 1) {
          this.getClients();
          this.cancel();
        } else {
          console.log(resp);
        }
      }
    );
  }

  showAdd() {
    this.isAdd = true;
    this.isEdit = false;
  }

  showEdit(clientId: number) {
    this.clientService.getclient(clientId).subscribe(
      resp => {
        if (resp.status === 1) {
          this.formClient.patchValue(resp.data[0]);
          this.clientId = clientId;
          this.isAdd = true;
          this.isEdit = true;
        }
      }
    );
  }

  cancel() {
    this.isAdd = false;
    this.isEdit = false;
  }

}
