import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'; 
import { Observable, Subject, throwError} from 'rxjs';
import { map } from 'rxjs/operators';

// Api declaration
const apiURL = 'https://movies-couch-api.vercel.app';
@Injectable({  providedIn: 'root' })

export class RetrivingServiceAPIDataService {
  // setting the logic for the user-data
  private user: any;
  setUser(userData: any): void{
    this.user = userData;
  } 
// injected HttpClient module to constructor params
  constructor(private http: HttpClient) {}

// Making api call for user registration endpoints
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiURL + '/users',  userDetails).pipe(
      catchError(this.handleError)
    );
  }

// user CRUD operations user
public userLogin(userDetails: any): Observable<any> {
  console.log(userDetails); 
  return this.http.post(apiURL + '/login', userDetails).pipe( catchError(this.handleError) );
}

// whenever there is an update, a value get emitted to subscriber
updateUserObject: Subject<void> = new Subject<void>();

public getUser(): Observable<any> {
  const Username = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');
  return this.http.get(apiURL + '/users/' + Username, {
    headers: new HttpHeaders
    ({
      Authorization: 'Bearer ' + token,
    }) }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

public editeUser(updatedDetails: any): Observable<any> {
  const token = localStorage.getItem('token');
  console.log(updatedDetails)
  return this.http.put(apiURL + '/users/' + this.getUsername(), updatedDetails, {
    headers: new HttpHeaders
    ({
      Authorization: 'Bearer ' + token,
    }) }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

private getUsername(): string {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const Username =  user?.Username;
  return Username;
}

public deleteUser(): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.delete(apiURL + '/users/' + this.getUsername() , {
    headers: new HttpHeaders
    ({
      Authorization: 'Bearer ' + token,
    }) }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

public addFavMovie(MovieID: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.put(`${apiURL} + /users/ + ${this.getUsername()} + /favMovies/ + ${MovieID}`, 
    { FavoriteMovies: MovieID} ,
    {
      headers: new HttpHeaders
      ({
        Authorization: 'Bearer ' + token,
      }) }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
}

public deleteFavMovie(MovieID: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.delete(`${apiURL} + /users/ + ${this.getUsername()}+ /favMovies/ + ${MovieID}`, {
    headers: new HttpHeaders
    ({
      Authorization: 'Bearer ' + token,
    }) }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}
// movies CRUD operations
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    // console.log()
    return this.http.get(apiURL + '/movies', {
      headers: new HttpHeaders(
        { Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  } 
  
  public getMovie(Title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiURL + '/movies/' +  Title, {
      headers: new HttpHeaders(
        { Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
  public getDirector(Name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiURL} + /movies/Director/ + ${Name}`, {
      headers: new HttpHeaders(
        { Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
  public getGenre(Name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiURL} + /movies/Genre/ + ${Name}` , {
      headers: new HttpHeaders(
        { Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

    public getSynopsis(Description: string): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(`${apiURL} + /movies/` + Description, {
        headers: new HttpHeaders(
          { Authorization: 'Bearer ' + token,
        })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      )
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