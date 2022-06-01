import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../shared/employee';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RestApiService {
  
  apiURL = 'http://localhost:3000';
  constructor(private http: HttpClient) {}
  
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  //   get() employees list
  getEmployees(): Observable<Employee> {
    return this.http
      .get<Employee>(this.apiURL + '/employees')
      .pipe(retry(1), catchError(this.handleError));
  }
  // get()  employee
  getEmployee(id: any): Observable<Employee> {
    return this.http
      .get<Employee>(this.apiURL + '/employees/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }
  // post() method => Create employee
  createEmployee(employee: any): Observable<Employee> {
    return this.http
      .post<Employee>(
        this.apiURL + '/employees',
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  //  put() method => Update employee
  updateEmployee(id: any, employee: any): Observable<Employee> {
    return this.http
      .put<Employee>(
        this.apiURL + '/employees/' + id,
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  // delete() method => Delete employee
  deleteEmployee(id: any) {
    return this.http
      .delete<Employee>(this.apiURL + '/employees/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
