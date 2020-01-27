import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestOptionsService {

  public initialState: {
    filters: {
      numberPerPage: 50,
      orderBy: 'date'
    }
  }
  /**Filters store with its initial state */
  private requestOptions$ = new BehaviorSubject(this.initialState);

  constructor() { }

  getState$():Observable<Object> {
    return this.requestOptions$.asObservable();
  }
  setState$(value):void {
    this.requestOptions$.next({filters:value})
  }
  resetState$():void {
    this.requestOptions$.next(this.initialState)
  }

}
