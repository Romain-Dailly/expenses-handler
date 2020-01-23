import { environment } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private token: string = environment.TOKEN;
  private api_url: string = environment.API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'accept': 'application/json',
      })
  };

  constructor(private http:HttpClient) { }
  
  getExpenseItems(): Observable<Object> {
    return this.http.get(this.api_url, this.httpOptions)
  }

}
