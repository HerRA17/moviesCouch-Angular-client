import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'; 
import { Observable, throwError} from 'rxjs';
import { map } from 'rxjs/operators';

/** Api declaration that will provide the data */ 
const apiURL = 'https://movies-couch-api.vercel.app';
@Injectable({  providedIn: 'root' })

export class RetrivingServiceAPIDataService {
/** injected HttpClient module to constructor params */ 
  constructor(private http: HttpClient) {}

/** Making api call for user registration endpoint 
 * @params userDetails object with details of the user
 * @return an observable with the created data
 */ 
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiURL + '/users',  userDetails).pipe(
      catchError(this.handleError)
    );
  }

/** Making api call for user login
 * @params userDetails object with details of the user
 * @return token and user info
 */ 
public userLogin(userDetails: any): Observable<any> {
  console.log(userDetails); 
  return this.http.post(apiURL + '/login', userDetails).pipe( catchError(this.handleError) );
}

/** Making api call to get user
 * @return token and user object
 */ 
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

/** Making api call to edit user data
 * @params updatedDetails
 * @return token,  username, and user updated details  
 */ 
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
/** Making api call to delete user
 * deletes all info from user
 * @returns
 */ 
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

/** Making api call to add favorite movies to the user
 * @params username and movie id
 * @return user object
 */ 
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
/** Making api call to delete favorite movies to the user
 * @params username and movie id
 * @return user object without the movie within the favorite movies array
 */ 
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
/** Making api call to get all movies
 * @return Movies array
 */ 
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
      return this.http.get(`${apiURL}/movies`, {
      headers: new HttpHeaders(
        { Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  } 
  /** Making api call to get a movie
   * @params title of the movie
   * @return token and title string
  */
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
  /** Making api call to get the director
   * @params director name info
   * @returns token and name of the director
  */
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
  /** Making api call to get the genre
   * @params genre name info
   * @returns token and the genre name
  */
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
  /** Making api call to get the description
   * @return token and description of movie
  */
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