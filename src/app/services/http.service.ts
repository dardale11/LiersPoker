import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient,
    private cookieService: CookieService,
    private router: Router) { }

  public get<T>(url: string, options = {}): Observable<T> {
    return this.http.get<T>(url, options).pipe(
      catchError(this.handleError<T>()));
  }

  public post<T>(url: string, body = {}, options = {}): Observable<T> {
    return this.http.post<T>(url, body, options).pipe(
      catchError(this.handleError<T>()));
  }


  public put<T>(url: string, body = {}, options = {}): Observable<T> {
    return this.http.put<T>(url, body, options).pipe(
      catchError(this.handleError<T>()));
  }

  public patch<T>(url: string, body = {}, options = {}): Observable<T> {
    return this.http.patch<T>(url, body, options).pipe(
      catchError(this.handleError<T>()));
  }

  public delete<T>(url: string, options = {}): Observable<T> {
    return this.http.delete<T>(url, options).pipe(
      catchError(this.handleError<T>()));
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      switch (error.status) {
        case 0:
          if (error.error.currentTarget.readyState === 4) {
            console.log("Access to resources is denied! Check permissions.");
          } else {
            console.log("Server is unreachable");
          }

          break;
        case 401:
          // this.authenticationService.logout();
          this.cookieService.deleteAll();
          this.router.navigate(['login']);
          break;
        case 500:
          if (error.error.title == "ConnectionError") {
            console.log("Server is unreachable");
            break;
          }
        default:
          let strError = (typeof error.error == 'object' ? JSON.stringify(error.error) : error.error);
          if (strError != undefined) {
            if (strError != "{}") {
              console.log(strError);
            } else {
              console.log("Unknown Error");
            }

          }
          break;
      }
      return of(result as T);
    };
  }
}
