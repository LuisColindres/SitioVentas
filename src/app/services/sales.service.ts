import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../app-config.service';
import { HandleError } from '../common/handle-error';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService,
    private handleError: HandleError
  ) { }

  public getSales() {
    return this.http.get<any>(this.appConfig.getUrlBase() + 'sale/all').pipe(
      catchError(this.handleError.handleError<any>(`getSales`)));
  }

  public getSale(saleId: number) {
    return this.http.get<any>(this.appConfig.getUrlBase() + 'sale/' + saleId).pipe(
      catchError(this.handleError.handleError<any>(`getSales`)));
  }

  public postSale(sale: any) {
    return this.http.put<any>(this.appConfig.getUrlBase() + 'sale', sale).pipe(
      catchError(this.handleError.handleError<any>(`getSales`)));
  }

  public putSale(sale: any, saleId: number) {
    return this.http.put<any>(this.appConfig.getUrlBase() + 'sale/' + saleId, sale).pipe(
      catchError(this.handleError.handleError<any>(`getSales`)));
  }
}
