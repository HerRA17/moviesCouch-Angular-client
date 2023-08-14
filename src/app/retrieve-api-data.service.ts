import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'; 
import { Observable, throwError} from 'rxjs';
import { map } from 'rxjs/operators';

// Api declaration
const apiURL = 'https://movies-couch-api.vercel.app';
@Injectable({  providedIn: 'root' })

export class RetrivingServiceAPIDataService {
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

public getUser(): Observable<any> {
  const user = localStorage.getItem('user') || '{}';
  const token = localStorage.getItem('token');
  if (!user || !token) {
    return throwError('User or token not found');
  }
  return this.http.get(`${apiURL}/users/${user}`, {
    headers: new HttpHeaders
    ({
      Authorization: 'Bearer ' + token,
    }) }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

public editeUser(updatedDetails: any): Observable<any> {
  const username = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  console.log(updatedDetails)
  return this.http.put(`${apiURL}/users/${username}`, updatedDetails, {
    headers: new HttpHeaders
    ({
      Authorization: 'Bearer ' + token,
    }) }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

public deleteUser(): Observable<any> {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  return this.http.delete(`${apiURL}/users/${user}`, {
    headers: new HttpHeaders
    ({
      Authorization: 'Bearer ' + token,
    }) }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}


public addFavMovie(username: string, movieID: string): Observable<any> {
  const token = localStorage.getItem('token');
  
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token,
  });

  const url = `${apiURL}/users/${username}/favMovies/${movieID}`;

  return this.http.post(url, {}, { headers }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

public deleteFavMovie(username: string, movieID: string): Observable<any> {
  const token = localStorage.getItem('token');
  
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token,
  });

  const url = `${apiURL}/users/${username}/favMovies/${movieID}`;

  return this.http.delete( url, { headers}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}
// movies CRUD operations
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    // console.log()
    return this.http.get(`${apiURL}/movies`, {
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
    return this.http.get(`${apiURL}/movies/${title}`, {
      headers: new HttpHeaders(
        { Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
  public getDirector(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiURL}/movies/Director/${name}`, {
      headers: new HttpHeaders(
        { Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
  public getGenre(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiURL}/movies/Genre/${name}` , {
      headers: new HttpHeaders(
        { Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

    public getSynopsis(description: string): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(`${apiURL}/movies/${description}`, {
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