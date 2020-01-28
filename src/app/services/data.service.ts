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
  private get_api_url: string;
  private put_delete_api_url: string;

 httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'accept': 'application/json',
      })
  }; 

  constructor(private http:HttpClient) { }
  
  // Get the filters as parameter and set the request url
  getExpenseItems(filters): Observable<Object> {
    this.get_api_url = `${this.api_url}?offset=${filters.offset}&limit=${filters.numberPerPage}`;
    return this.http.get(this.get_api_url, this.httpOptions)
  }

  postNewExpenseItem(body): Observable<Object> {
    return this.http.post(this.api_url, body, this.httpOptions)
  }

  deleteExpenseItem(id): Observable<Object> {
    this.put_delete_api_url = `${this.api_url}/${id}`;
    return this.http.delete(this.put_delete_api_url, this.httpOptions);
  }
  
  putExpenseItem(id, body): Observable<Object> {
    this.put_delete_api_url = `${this.api_url}/${id}`;
    return this.http.put(this.put_delete_api_url, body, this.httpOptions)
  }
}
