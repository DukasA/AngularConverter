import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  private serverUrl: string = 'https://api.currencyapi.com/v3/latest?apikey=7DJuFsrqRmFuaFtvF6zewmubN8zUYP3vGiSylfm5';

  constructor(private httpClient: HttpClient) {
  }

  public getCurrencies():Observable<any> {
    let dataURL:string = `${this.serverUrl}`;
    return this.httpClient.get<any>(dataURL).pipe(catchError(this.handleError));
  }

  public handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Status: ${error.status} \n Message: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
