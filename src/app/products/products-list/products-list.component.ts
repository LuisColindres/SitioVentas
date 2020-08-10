import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Array<any> = [];
  isEdit = false;
  isAdd = false;
  productForm: FormGroup;
  numericRegex = '^-?[0-9]\\d*(\\.\\d{1,2})?$';
  productId: number;

  constructor(
    private productService: ProductsService
  ) {
    this.productForm = new FormGroup({
      productId: new FormControl(''),
      productDesc: new FormControl('', [
        Validators.required,
      ]),
      price: new FormControl('', [
        Validators.required,
        Validators.pattern(this.numericRegex)
      ]),
      sku: new FormControl('', [
        Validators.required,
        Validators.pattern(this.numericRegex)
      ])
    });
  }

  ngOnInit() {
    this.getProducts();
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

  save() {
    if (this.productForm.valid) {
      const data = this.productForm.value;
      if (this.isEdit) {
        this.update(data, this.productId);
      } else {
        this.add(data);
      }
    }
  }

  update(data: any, clientId: number) {
    this.productService.putProduct(data, clientId).subscribe(
      resp => {
        if (resp.status === 1) {
          this.getProducts();
          this.cancel();
        } else {
          console.log(resp);
        }
      }
    );
  }

  add(data: any) {
    this.productService.postProduct(data).subscribe(
      resp => {
        if (resp.status === 1) {
          this.getProducts();
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

  showEdit(productId: number) {
    this.productService.getProduct(productId).subscribe(
      resp => {
        if (resp.status === 1) {
          this.productForm.patchValue(resp.data[0]);
          this.productId = productId;
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
