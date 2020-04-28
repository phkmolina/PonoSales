import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, empty } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {
  }

  private getHeaders(headersConfig?: object): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjo4NzQ4MjEsImVtYWlsIjoicGVkcm8ubW9saW5hQHBvbm90ZWNub2xvZ2lhLmNvbS5iciIsImFwcGxpY2F0aW9uIjo1NTczMn19.4SPMObMwwCJ6KAw6vMKWN6x2PUVeBUewEsfleSXGWnC0qSD4j8J7gK_YU-Ha9Gm7flJgM86VPqij8fw3GqMk1g',
    });
  }

  get(url: string, params: HttpParams = new HttpParams(), headers: Object): Observable<any> {
    let finalHeaders = this.getHeaders();
    if (headers) {
      for (let key in headers) {
        finalHeaders = finalHeaders.append(key, headers[key]);
      }
    }
    return this.http.get(
      url,
      { headers: finalHeaders, params }
    ).pipe(timeout(10000)).pipe(catchError(this.handleError('Get request')));
  }

  put(url: string, body: Object = {}, headers: Object): Observable<any> {
    let finalHeaders = this.getHeaders();
    if (headers) {
      for (let key in headers) {
        finalHeaders = finalHeaders.append(key, headers[key]);
      }
    }
    return this.http.put(
      url,
      body,
      { headers: finalHeaders }
    ).pipe(timeout(10000)).pipe(catchError(this.handleError<any>('put request')));
  }

  post(url: string, body: Object, headers: Object): Observable<any> {
    let finalHeaders = this.getHeaders();
    if (headers) {
      for (let key in headers) {
        finalHeaders = finalHeaders.append(key, headers[key]);
      }
    }
    return this.http.post(
      url,
      body,
      { headers: finalHeaders }
    ).pipe(timeout(10000)).pipe(catchError(this.handleError<any>('post request')));
  }


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return empty();//of(result as T);
    };
  }
}

