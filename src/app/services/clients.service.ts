import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../app-config.service';
import { catchError } from 'rxjs/operators';
import { HandleError } from '../common/handle-error';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService,
    private handleError: HandleError
  ) { }

  public getClients() {
    return this.http.get<any>(this.appConfig.getUrlBase() + 'client/all').pipe(
      catchError(this.handleError.handleError<any>(`getClients`)));
  }

  public getclient(clientId: number) {
    return this.http.get<any>(this.appConfig.getUrlBase() + 'client/' + clientId).pipe(
      catchError(this.handleError.handleError<any>(`getclient`)));
  }

  public postClient(client: any) {
    return this.http.put<any>(this.appConfig.getUrlBase() + 'client/add', client).pipe(
      catchError(this.handleError.handleError<any>(`postClient`)));
  }

  public putClient(client: any, clientId: number) {
    return this.http.post<any>(this.appConfig.getUrlBase() + 'client/' + clientId, client).pipe(
      catchError(this.handleError.handleError<any>(`putClient`)));
  }
}
