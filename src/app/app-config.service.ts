import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  public urlBase = 'http://45.77.199.154:8080/sale/';

  constructor() { }

  public getUrlBase() {
    return this.urlBase;
  }
}
