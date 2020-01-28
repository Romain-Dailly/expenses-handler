import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConversionService {

  currencyLayerFinalUrl :string;
  
  httpOptions = {
    headers: new HttpHeaders({
      'accept': 'application/json',
      })
  };

  constructor(private http:HttpClient) { }

  // Call to currency converter api to get the selected currency conversion coefficient
  getCoefficientToEuros(currency): Observable<Object> {
    
    this.currencyLayerFinalUrl = `${environment.CURRENCYCONVERTER_URL}?q=${currency}_EUR&compact=ultra&apiKey=${environment.CURRENCYCONVERTER_APIKEY}`;
    return this.http.get(this.currencyLayerFinalUrl, this.httpOptions);
  }
}
