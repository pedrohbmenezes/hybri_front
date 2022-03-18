import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, pipe, catchError } from 'rxjs';
import Swal from 'sweetalert2';


const AUTH_API = 'http://localhost:3001';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};
@Injectable({
  providedIn: 'root'
})
  
  
export class AuthService {
 
handleError(error: HttpErrorResponse) {
  if (error.status === 0) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    
    console.error(
      `Backend returned code ${error.status}, body was: `, error.error);
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast:any) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'error',
      title: error.error.message
    })
  }
  // Return an observable with a user-facing error message.
  return throwError(() => new Error('Something bad happened; please try again later.'));
}

  constructor(private http: HttpClient) { }
  
  login(username: string, password: string): Observable<any> {
    const data = `username=${username}&password=${password}`
    return this.http.post(`${AUTH_API}/auth/login`, data, httpOptions)
    .pipe(
      catchError(this.handleError)
    );

  }
  sign(username: string, password: string): Observable<any> {
    const data = `username=${username}&password=${password}`
    return this.http.post(`${AUTH_API}/auth/sign`, data, httpOptions)
    .pipe(
      catchError(this.handleError)
    );

  }

  
}
