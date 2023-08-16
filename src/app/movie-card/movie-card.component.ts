import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
// imported TS components
import { RetrivingServiceAPIDataService } from '../retrieve-api-data.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';

/** Component for displaying and managing movie card information */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any = [];
  favoriteMovies: any[] = [];

  constructor(
    public retrivingServiceApiData :RetrivingServiceAPIDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
    ) {}

  ngOnInit(): void {
    this.getMovies()
    }

 
  
  /** Gets all movies  
   * @returns movies array
   */ 
  getMovies(): void {
    this.retrivingServiceApiData.getAllMovies().subscribe((resp: any) => {
      console.log('movies', resp);
      this.movies = resp;
      return this.movies;
    })
  }
  /** Gets a movie with the Title
   * @returns movie object with title
   */
  getMovie(title: string): void{
    this.retrivingServiceApiData.getMovie(title).subscribe((resp: string) => {
      console.log('title', resp);
      this.movies = resp;
      return this.movies;
    })
  }
  /** Gets the directors information
   * @returns directors name, bio, birthdate, and deathdate
  */
  getDirector(name: string, bio: string, birthdate: string, deaththdate: string): void {
    this.dialog.open(DirectorComponent, {
      data:{
        Name: name,
        Bio: bio,
        Birthdate: birthdate,
        Deaththdate: deaththdate  
    },
      width: '25rem'
    });
  }
  /** Gets the genre information
   * @returns name and description of the genre
  */
  getGenre(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description
      },
      width: '25rem'
    });
  }
  /** Gets the description information
   * @returns title and description
  */
  getSynopsis(title: string, description: string): void {
    this.dialog.open(MovieDetailsComponent,  {
      data: {
        Title: title,
        Description: description 
      },
      width: '25rem'
    });
  }
   /** Adds the movie to the array of favorite movies
    * @returns movie array with the added movie
   */
  addFavoriteMovies(movieID: string): void{
    let username = localStorage.getItem('user');
      if (username) {
      this.retrivingServiceApiData.addFavMovie(username, movieID).subscribe((resp) => { //error
        console.log(resp)
        this.snackBar.open('Movie has been added to favorite Movies', 'OK', {
          duration: 2000
        });
        this.favoriteMovies = resp.FavoriteMovies;
      })
    } 
  }
/** Determinates whether the movie is already within the array favorite movies
 * @returns true or false
*/
  isFavMovie(movieID: string): boolean {
    return this.favoriteMovies.includes(movieID);
  }

  /** Deletes the movie from the array of favorite movies
   * @returns the array without the movie deleted
  */
  deleteFavoriteMovies(movieID: string): void {
    let username = localStorage.getItem('user');
      if (username) {
      this.retrivingServiceApiData.deleteFavMovie(username, movieID).subscribe((resp) => {
        console.log(resp)
        this.snackBar.open('Movie removed from favorite Movies', 'OK', {
          duration: 2000
        })
        this.favoriteMovies = resp.FavoriteMovies;
    });
    }
}
}