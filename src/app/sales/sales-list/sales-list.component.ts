import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { SalesService } from 'src/app/services/sales.service';
import { ClientsService } from 'src/app/services/clients.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.css']
})
export class SalesListComponent implements OnInit {

  sales: Array<any> = [];
  isEdit = false;
  isAdd = false;
  formSale: FormGroup;
  formProduct: FormGroup;
  clients: Array<any>;
  products: Array<any>;
  numericRegex = '^-?[0-9]\\d*(\\.\\d{1,2})?$';
  saleId: number;
  isEditDetail = false;
  index: number;

  constructor(
    private salesService: SalesService,
    private clientService: ClientsService,
    private productService: ProductsService
  ) {
    this.formSale = new FormGroup({
      clientId: new FormControl('', Validators.required),
      total: new FormControl('', Validators.required),
      detail: new FormArray([], Validators.required)
    });

    this.formProduct = new FormGroup({
      detailDetailSaleId: new FormControl(''),
      productDesc: new FormControl('', Validators.required),
      productId: new FormControl(0, Validators.required),
      amount: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.pattern(this.numericRegex)
      ]),
      price: new FormControl(0, Validators.required),
      total: new FormControl(0),
    });
  }

  ngOnInit() {
    this.getSales();
    this.getClients();
    this.getProducts();
  }

  getSales() {
    this.salesService.getSales().subscribe(
      resp => {
        if (resp.status === 1) {
          this.sales = resp.data;
        }
      }
    );
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

  getProducts() {
    this.productService.getProducts().subscribe(
      resp => {
        if (resp.status === 1) {
          this.products = resp.data;
        }
      }
    );
  }

  getPrice() {
    this.formProduct.patchValue({price: 0});
    const data = this.formProduct.value;
    const product = this.products.find( (e) => e.productId === data.productId);

    if (product) {
      this.formProduct.patchValue({
        productDesc: product.productDesc,
        price: product.price,
        productId: product.productId,
      });
    }
  }

  insertItem(data: any) {
    if (this.formProduct.valid) {
      const product = JSON.parse(JSON.stringify(this.formProduct.value));

      if (this.saleId > 0) {
        if (product.detailDetailSaleId > 0) {
          this.update();
        } else {
          this.add();
        }
      } else {
        if (this.isEditDetail) {
          this.updateItem(product);
          // this.toastr.success('Actualizado correctamente');
        } else {
          this.addItem(product);
        }
      }

    }
  }

  updateItem(item: any) {
    item.total = (+item.amount) * (+item.price);
    const product = item;
    (<FormArray>this.formSale.get('detail')).at(this.index).patchValue(product);
  }

  addItem(item: any) {
    item.total = (+item.amount) * (+item.price);
    const product = item;
  }

  add() {

  }
  update() {

  }

  showAdd() {
    this.isAdd = true;
    this.isEdit = false;
  }

  showEdit() {
    this.isAdd = true;
    this.isEdit = true;
  }

  cancel() {
    this.isAdd = false;
    this.isEdit = false;
  }

}
