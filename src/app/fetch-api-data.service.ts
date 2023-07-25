import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'; 
import { Observable, throwError} from 'rxjs';
import { map } from 'rxjs/operators';

// Api declaration
const apiURL = 'https://movies-couch-api.vercel.app/movies';
@Injectable({
  providedIn: 'root'
})
export class RetrivingServiceAPIDataService {
// injected HttpClient module to constructor params
  constructor(private http: HttpClient) { }

// Making api call for user registration endpoints
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiURL + '/users',  userDetails).pipe(
      catchError(this.handleError)
    );
  }

  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiURL} + /movies `, {
      headers: new HttpHeaders(
        { Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
  public getMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiURL} + /movies/` +  title, {
      headers: new HttpHeaders(
        { Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
  public getDirector(director: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiURL} + /movies/` + director + `/:name `, {
      headers: new HttpHeaders(
        { Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
  public getGenre(genre: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiURL} + /movies/`+ genre + `/:name ` , {
      headers: new HttpHeaders(
        { Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  // user CRUD operations
  public Userlogin(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiURL} + /login`  + userDetails, {
      headers: new HttpHeaders
      ({
        Authorization: 'Bearer ' + token,
      }) }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
  public Getuser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiURL} + /users/:Username`  + userDetails, {
      headers: new HttpHeaders
      ({
        Authorization: 'Bearer ' + token,
      }) }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
  public Edituser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(`${apiURL} + /users/:Username` + userDetails, {
      headers: new HttpHeaders
      ({
        Authorization: 'Bearer ' + token,
      }) }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
  public Deleteuser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${apiURL} + /users/:Username` + userDetails, {
      headers: new HttpHeaders
      ({
        Authorization: 'Bearer ' + token,
      }) }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
  public AddfavMovie(MovieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(`${apiURL} + /users/:Username/favMovies/` + MovieID, {
      headers: new HttpHeaders
      ({
        Authorization: 'Bearer ' + token,
      }) }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  public DeletefavMovie(MovieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${apiURL} + /users/:Username/favMovies/` + MovieID, {
      headers: new HttpHeaders
      ({
        Authorization: 'Bearer ' + token,
      }) }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error ocurred:', error.error.message);
    } else {
      console.error(`Error Status code ${error.status}, ` + `Error body is: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

}