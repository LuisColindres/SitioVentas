import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../app-config.service';
import { HandleError } from '../common/handle-error';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService,
    private handleError: HandleError
  ) { }

  public getProducts() {
    return this.http.get<any>(this.appConfig.getUrlBase() + 'product/all').pipe(
      catchError(this.handleError.handleError<any>(`getProducts`)));
  }

  public getProduct(productId: number) {
    return this.http.get<any>(this.appConfig.getUrlBase() + 'product/' + productId).pipe(
      catchError(this.handleError.handleError<any>(`getProduct`)));
  }

  public postProduct(product: any) {
    return this.http.put<any>(this.appConfig.getUrlBase() + 'product/add', product).pipe(
      catchError(this.handleError.handleError<any>(`postProduct`)));
  }

  public putProduct(product: any, productId: number) {
    return this.http.post<any>(this.appConfig.getUrlBase() + 'product/' + productId, product).pipe(
      catchError(this.handleError.handleError<any>(`putProduct`)));
  }
}
